---
title: "Why AI browsers haven't taken off"
description: "In theory, AI browsers are huge time-savers. So why aren't they more popular?"
pubDate: "October 22, 2025 18:00"
draft: false
tags: ["ai", "chatgpt", "openai"]
---

Recently OpenAI released [ChatGPT Atlas](http://chatgpt.com/atlas), their AI browser for macOS. It’s got some interesting features (like the UI being written in SwiftUI), but for the most part I think despite ChatGPT's huge userbase (800 million active users a _week!_), reception to Atlas (and other browsers like Perplexity Comet) has been pretty mixed. Here’s why I think that’s been the case.

## Privacy concerns

I like AI, but I personally don’t trust it enough to let it read my entire search history and send my browsing data to OpenAI. My browsing data has private stuff I’d rather not have VC-backed companies to know about. Sure, the web has a *lot* of tracking, but the data these companies have is more limited and is spread out across multiple companies (plus I use an adblocker anyway, which helps somewhat). I’m personally not comfortable enough to share it all with a single company.

I think asking users for consent before sending the data is a very good thing to do

## They aren’t good enough

Unfortunately, AI browsers, for the most part, aren’t smart enough that most people will want to switch over from Chrome/Safari/Firefox/whatever to use something different. They make a lot of mistakes, are slow, and in the case of “finding the best deal/thing/whatever”, often don’t actually find the best thing - rather they find something well-known, which might not fit your criteria.

To give an example: I asked a relatively popular AI browser to find me the cheapest Raspberry Pi Zero 2W in Estonia. What it did was open the stores for the wrong country or fail to take things like shipping into account ($10 + $10 shipping is more expensive than $12 + $5 shipping!), even after careful prompting, which made it a bad experience overall.

It’s also worth bearing in mind that while being able to do these tasks in theory is quite useful, in practice a human needs to be in the loop anyway to make the best decision or steer the browser towards the user’s end goal (unless you spend a long time prompting). There are some cases where it would be useful in theory, like with travel (where you can just give it some dates and the home/return location), which is why I think nearly every single AI company includes booking flights and/or hotels in their demos, but these are rare cases, and honestly not worth installing a new browser to do.

## Prompting can take time

Here’s an example: let’s say that I want to buy PC parts, so I go off and ask AI to make me a part list. The problem with this is that AI is not a mindreader (yet!) and won’t know my exact requirements. Maybe it chooses an NVIDIA GPU, but I’m a Linux user, I want an AMD one! Or maybe it chooses a case, but I want one that’s cheaper, looks better, or maybe has better airflow. Or maybe it puts more money into the GPU than the rest of the build, but I don’t do GPU-intensive tasks so I’d rather have a faster CPU or SSD.

Now, can you solve this with prompting? Well, yes, but it takes time to tell the AI every single thing that is important to you, and as mentioned previously, it’s not a mindreader - it will likely choose parts that you aren’t interested in. The time needed to prompt it well enough would likely make choosing them yourself/remixing someone else’s part list a lot quicker than asking the AI to do it.

## They’re slow

Links back to my last point, but AI is really slow with this sort of thing. With code, sure, for a lot of cases AI can write the code faster than it’d take me to write it, but for browsing, AI has problems, such as the frontier models taking 10+ seconds just to click a link in search results. In theory, if the AI knew exactly what your task was, it wouldn’t be an issue (just leave it to run and get a coffee or something!), but with the steering issue I mentioned previously, a human has to be in the loop so it doesn’t do the wrong thing. As it stands though, with AI’s slowness, it’s often easier to just do the task yourself!

## They can be jailbroken

I don’t think this is why AI browsers haven’t taken off, but AI browsers can be jailbroken by.. writing on the page! Here’s an example: Brave showed how it’s possible to [steal someone’s Perplexity account](https://brave.com/blog/comet-prompt-injection) by getting them to view a Reddit post and ask for a summarisation. Then the browser reads the comment, thinks that the user wants them to change their Perplexity account’s email to one of an attacker, and dutifully follows the attacker’s instructions. And in theory, this could be taken even further (e.g. by telling the browser to send money via PayPal to an attacker), and so it’s not something I’d personally feel comfortable leaving unattended.

---

I think it’s worth pointing out that I’m genuinely excited for AI browsers to evolve to be more secure, private, and smart, because in the right situation, I can definitely see them saving me time (that is why I tried them in the first place!) However, as it stands, I do think that they need some work, but I’m excited to see how they improve as time goes on.

Thanks for reading, I’ll see you around!
