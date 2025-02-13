# skyfall.dev

![Screenshot of the site](https://cdn.hack.pet/slackcdn/4cde3d37d983e8fb50c9fae8b841be46.png
)

## Features

### OpenGraph image generation

OG images are automatically generated for blog posts!

![image](https://cloud-qkxfegiat-hack-club-bot.vercel.app/0image.png)

### Discord status & local time

The website fetches my Discord online status and the time in the UK, and shows them on the homepage.

![image](https://cdn.hackclubber.dev/slackcdn/4047566bbcafbaa788b1adbbaf8d33a6.png)

### Blogposts

My site has a blogpost feature, powered by Astro Content Collections.

![image](https://cdn.hackclubber.dev/slackcdn/5089b0ff86fb4c6fe62d0493bcd07183.png)

## Simple Icons fork

My site uses a fork of [Simple Icons](https://simpleicons.org) for icons (`@skyfall-powered/simple-icons-astro`), forked to decrease build times.

## Development

```bash
echo "DISCORD_USER_ID=DISCORD_USER_ID_GOES_HERE" > .env
bun install
bun dev
```
