// News Centre — cached fallback headlines + RSS configuration
// The dashboard fetches ALL RSS_SOURCES simultaneously on every load.
// Falls back to NEWS array below if all feeds fail.
// NO 24-hour cache — fresh on every load so you never miss breaking news.
//
// NOTE: this array is intentionally kept short right now. It previously
// contained 14 entries pulled from Sky Sports' /rss/12040 feed, but that
// feed leaks general Sky Sports content (Wimbledon, rugby, F1, golf, NFL)
// during quiet news periods rather than staying Spurs-only — 12 of the 14
// were off-topic. Rather than fabricate replacement headlines with unverified
// URLs, this was trimmed to the entries that were confirmed accurate.
// Tomorrow's automation run will repopulate this properly via
// updateNewsFallback(), which now filters every headline through
// isSpursRelevant() before writing here (see shared.js + update-dashboard.js).
export const NEWS = [
  {title:"Tottenham head into the international break without a win in the Premier League after losing 3-2 at home to Aston Villa. - Sky Sports", source:"Google News", date:"20 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi6wFBVV95cUxQSWhCeW5oanlNd3ctaUFicWJQa0dDd2h6c0xPbEt6SVlXOWkyb0ZkVUVHU0p5VXVHZnllcTlNLUU3dzY3dXNRVXdwUTliVjBXWXBDNldLcDlCWURwVFdEVkdLSmtxQ1VUbXdqekFYYmI5M1F0RU8ySXhMQV9MUHFKS3FXQl93Mzkzc3h4aFpRaGN0TFprWTZqa2pWVkZNNUcwbjhYVWpkc19KdzRyMUFTT0xRcWNHTzl6dWs0aF9KSDN1QkVwTGRDZmozWXRiakczd0NFMnpYRDJ4Q1pRQ3I3dVJZSzZtVTJNX2ZF?oc=5"},
  {title:"Why Savio is Tottenham&#8217;s biggest weapon and biggest problem at the same time", source:"SpursWeb", date:"20 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/why-savio-is-tottenhams-biggest-weapon-and-biggest-problem-at-the-same-time/"},
  {title:"Tottenham boss Roberto De Zerbi wants more from Dominic Solanke: 'Not good enough' - ESPN", source:"Google News", date:"20 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMixAFBVV95cUxOWjcxX0tvWXBHbFhRSktUWGpQazZUX19OOGN6cjFjejd2MUZhYzZpSjZLOWg4TWpqTGdoUFF0REJtODdTN1oxN1BKQXh4NzhZazlqaElNRFlDT2V6dWJrVTVUZlJKM0hueW03Y0NyOGlXQWtvMGtXQ2x5U3E4Um5NUXMxdDQ4b1N4QjBkZDdscnFmUVB3WFF6MVpYU3JIQkNZSkJtZ2VRR2ZmT1BKMWRJbzBES3B5Y1RJQzNFbGdmUmh6X201?oc=5"},
  {title:"Man Utd or Spurs to appoint Howe next as Kane blamed but Glazers 'not the problem' - football365.com", source:"Google News", date:"20 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMirgFBVV95cUxPWl9fbmc4VWl3MUtja2Z2TU51by1BRm5wNEZERVc4a3haVTE5eTZNd1VraUh0TDVtem9pWEpvQUl5bkhQQU4wblJOako2Tm1xUTFrWS1aOGRkSlUwemt5b1Z2MTYtVFJGaWs4V3VGa0dqX3dVX1VlNFVBTTlUbHY2ck5KQ0EwdVF6VmFHcDNoVkFiYldxSzB2ZFI0MnU3LTlkYnFOcThlYjVWNEs0WEE?oc=5"},
  {title:"Steven Gerrard explains Tottenham&#8217;s biggest problem, and it involves Kane, Son, and Bale", source:"SpursWeb", date:"20 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/steven-gerrard-explains-tottenhams-biggest-problem-and-it-involves-kane-son-and-bale/"},
  {title:"Alan Shearer points out brutal Roberto De Zerbi reality as Tottenham blame dished out", source:"football.london", date:"20 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/alan-shearer-roberto-de-zerbi-34643970"},
  {title:"Tottenham will love what German media is saying about Mikey Moore after £25m reveal", source:"SpursWeb", date:"20 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-will-love-what-german-media-is-saying-about-mikey-moore-after-25m-reveal/"},
  {title:"Richarlison sends pointed message just hours after latest Tottenham humiliation", source:"football.london", date:"20 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/richarlison-tottenham-hotspur-de-zerbi-34643721"},
  {title:"&#8216;There are things that are unacceptable&#8217; &#8211; Tottenham captain sends strong message to squad", source:"SpursWeb", date:"19 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/there-are-things-that-are-unacceptable-tottenham-captain-sends-strong-message-to-squad/"},
  {title:"Roberto De Zerbi hints FFP rules prevented Tottenham from making big 11th signing", source:"SpursWeb", date:"19 Sept 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-hints-ffp-rules-prevented-tottenham-from-making-big-11th-signing/"},
  {title:"Interesting reason Mathys Tel missed Tottenham vs Aston Villa revealed by De Zerbi", source:"SpursWeb", date:"19 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/interesting-reason-mathys-tel-missed-tottenham-vs-aston-villa-revealed-by-de-zerbi/"},
  {title:"Micky van de Ven fumes at Tottenham teammates after unacceptable Aston Villa defeat", source:"football.london", date:"19 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hotspur-spurs-aston-villa-34643276"},
  {title:"&#8216;I will stay with him until the end&#8217; &#8211; De Zerbi needs more from Tottenham star he &#8216;loves&#8217;", source:"SpursWeb", date:"19 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/i-will-stay-with-him-until-the-end-de-zerbi-needs-more-from-tottenham-star-he-loves/"},
  {title:"John McGinn aims accidental dig at Tottenham as Aston Villa pull off shock leapfrog", source:"SpursWeb", date:"19 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/john-mcginn-aims-accidental-dig-at-tottenham-as-aston-villa-pull-off-shock-leapfrog/"},
];

// RSS sources — ALL fetched simultaneously on every page load.
// These sites carry breaking news from Romano, Ornstein, O'Keefe, Jacobs, Moretto, Szy, Gold
// within minutes of their posts on X.
// r/coys is a COMMUNITY source (isCommunity:true) — often reposts/quotes the same
// journalists above, so it's treated as a corroborating signal in the automation's
// confidence scoring, never a standalone primary source. See NewsPanel for the
// "Community" badge shown on its items.
export const RSS_SOURCES = [
  { name:"Sky Sports Spurs",   url:"https://www.skysports.com/rss/12040",                                                                    priority:1 },
  { name:"BBC Sport Spurs",    url:"https://feeds.bbci.co.uk/sport/football/teams/tottenham-hotspur/rss.xml",                                priority:1 },
  { name:"TEAMtalk",           url:"https://www.teamtalk.com/feed",                                                                          priority:2 },
  { name:"SpursWeb",           url:"https://www.spurs-web.com/feed",                                                                         priority:2 },
  { name:"football.london",    url:"https://www.football.london/tottenham-hotspur-fc/?service=rss",                                          priority:2 },
  { name:"Google News Spurs",  url:"https://news.google.com/rss/search?q=Tottenham+Hotspur&hl=en-GB&gl=GB&ceid=GB:en",                      priority:3 },
  { name:"r/coys (Reddit)",    url:"https://www.reddit.com/r/coys/new.rss",                                                                   priority:3, isCommunity:true },
];

// CORS proxies for browser-based RSS fetching, tried in order per source.
// Free public proxies (allorigins, codetabs, corsproxy) are unreliable/rate-limited
// individually, but trying several in sequence makes live fetch far more resilient —
// only fails for a source if ALL of these are down at once.
export const CORS_PROXIES = [
  "https://api.allorigins.win/raw?url=",
  "https://api.codetabs.com/v1/proxy?quest=",
  "https://corsproxy.io/?url=",
];

// Journalists monitored for Spurs intelligence.
// Their breaking news reaches the RSS_SOURCES above within 5-30 minutes.
export const JOURNALISTS = [
  { name:"Fabrizio Romano",   handle:"@FabrizioRomano",  beat:"Transfer confirmations — Here We Go",         platform:"X / Substack"      },
  { name:"David Ornstein",    handle:"@David_Ornstein",   beat:"Official club confirmations",                  platform:"The Athletic / X"  },
  { name:"Paul O'Keefe",      handle:"@pokeefe1",         beat:"Spurs-specific daily intel and replies",       platform:"X"                 },
  { name:"Alasdair Gold",     handle:"@AlasdairGold",     beat:"Dedicated Spurs correspondent — club, squad, boardroom", platform:"football.london / X" },
  { name:"Matteo Moretto",    handle:"@MatteMoretto",     beat:"European transfers, Italian and Spanish links",platform:"Relevo / X"        },
  { name:"Ben Jacobs",        handle:"@JacobsBen",        beat:"Transfer intel, Premier League",               platform:"CBS Sports / X"    },
  { name:"Szy",               handle:"@SzymonStefanik",   beat:"Central European player links",                platform:"X"                 },
  { name:"Gianluca Di Marzio",handle:"@DiMarzio",         beat:"Italian club and player transfers",            platform:"Sky Sport Italia"  },
];
