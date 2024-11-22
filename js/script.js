window.quotes = [
    "code whisperer by day, chaos enthusiast by night",
    "freefalling through the internet",
    "the internet is a series of tubes",
    "welcome to the internet, have a look around",
    "it's time to <b>build</b>",
    "bashing bits and bytes",
    `enjoy your ${new Date()
        .toLocaleDateString("en-US", {
            weekday: "long",
        })
        .toLowerCase()}!`,
    "code is poetry (well, sometimes)",
    "it's time to sail the high seas!",
    "it's better to be a pirate than to join the navy!",
    "aye aye cap'n!",
];
window.randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
