# skyfall.dev

![Screenshot of the site](https://hc-cdn.hel1.your-objectstorage.com/s/v3/e9af1aa28d0d20d3056c281515db1843f43610af_image.png)

## Features

### OpenGraph image generation

OG images are automatically generated for blog posts!

![image](https://skyfall.dev/posts/astro-og-with-satori/og.png)

### Discord status & local time

The website fetches my Discord online status and the time in the UK, and shows them on the homepage.

![image](https://cdn.hackclubber.dev/slackcdn/4047566bbcafbaa788b1adbbaf8d33a6.png)

### Blogposts

My site has a blogpost feature, powered by Astro Content Collections.

![image](https://hc-cdn.hel1.your-objectstorage.com/s/v3/e53ec99741f2fd09980a9de55912efc3027aaea9_image.png)

## Simple Icons fork

My site uses a fork of [Simple Icons](https://simpleicons.org) for icons (`@skyfall-powered/simple-icons-astro`), forked to decrease build times.

## Development

```bash
echo "DISCORD_USER_ID=DISCORD_USER_ID_GOES_HERE" > .env
bun install
bun dev
```
