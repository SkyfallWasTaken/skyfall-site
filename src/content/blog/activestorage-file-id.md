---
title: "Getting Rails' ActiveStorage blob IDs from file URLs"
description: "Learn how to extract ActiveStorage blob IDs from expiring ActiveStorage URLs."
tags: ["rails", "activestorage", "blob", "url"]
pubDate: "December 12, 2025 18:00"
draft: false
---

When working with Rails' ActiveStorage, you might encounter situations where you need to extract the blob ID from an expiring ActiveStorage URL. In my case, it was because I was scraping images from a Rails application that used ActiveStorage, but I wanted to be polite about it and not download hundreds of images every few minutes unnecessarily.

I ran into a problem though, where the URLs I was getting were expiring URLs that looked like this:

```text
https://theapp.gg/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MzQwLCJwdXIiOiJibG9iX2lkIn19--8c59415975dbced2130a99575689db332f57b019/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwicmVzaXplX3RvX2xpbWl0IjpbMzYwLG51bGxdLCJzYXZlciI6eyJzdHJpcCI6dHJ1ZSwicXVhbGl0eSI6NzV9fSwicHVyIjoidmFyaWF0aW9uIn19--d6a39ad4705dc76c8821affe402d334558212c92/image.png
```

The expiring URLs meant that I couldn't just check equality with just the previous URL. That URL is a bit of a mess, right? However, hidden within that long string is a base64-encoded JSON object that contains a consistent **blob ID** we can use to identify the image and check inequalities with a previous URL.

```rust
use base64::prelude::*;
use color_eyre::{Result, eyre::eyre};
use reqwest::Url;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct BlobInfo {
    #[serde(rename = "_rails")]
    rails: RailsData,
}

#[derive(Deserialize, Debug)]
struct RailsData {
    #[serde(rename = "data")]
    blob_id: usize,
}

pub fn get_rails_blob_id(url: &Url) -> Result<usize> {
    let s3_info = url
        .path()
        .split('/')
        .rev()
        .nth(2) // Get the third element from the end (see the rev() above)
        .ok_or_else(|| eyre!("can't find raw s3"))?;
    let blob_info_b64 = s3_info
        .split("--")
        .next()
        .ok_or_else(|| eyre!("can't find the blob info"))?;
    let blob_info_bytes = BASE64_STANDARD.decode(blob_info_b64)?;
    let blob_info_string = String::from_utf8(blob_info_bytes)?;
    let blob_info: BlobInfo = serde_json::from_str(&blob_info_string)?;
    Ok(blob_info.rails.blob_id)
}
```

In this example, `get_rails_blob_id` will spit out the blob ID (`340` in this case) from the provided ActiveStorage URL.

In case you're curious, here's a quick breakdown of how it works:

1. We split the URL path by `/` and extract the third segment from the end, which contains the base64-encoded JSON.
2. We split that segment by `--` to isolate the base64 string. (in this case, `eyJfcmFpbHMiOnsiZGF0YSI6MzQwLCJwdXIiOiJibG9iX2lkIn19`)
3. We decode the base64 string to get the JSON representation.
4. And finally, we read `_rails.data` from the JSON to get the blob ID.

Since ActiveStorage won't reuse blob IDs, you can use this method to uniquely identify files even if the URLs change due to expiration. Bit of a niche use case, but hopefully this helps someone out there!
