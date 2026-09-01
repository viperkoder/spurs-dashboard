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
  {title:"Tottenham transfer news LIVE: Lucas Bergvall latest, Mykhailo Mudryk move, Cody Gakpo update", source:"football.london", date:"01 Sept 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-transfer-deadline-day-live-34547991"},
  {title:"&#8216;See you again very soon&#8217; &#8211; Pape Sarr sends emotional message to Tottenham fans", source:"SpursWeb", date:"01 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/see-you-again-very-soon-pape-sarr-sends-emotional-message-to-tottenham-fans/"},
  {title:"Tottenham midfielder posts emotional message after completing deadline day transfer - Football London", source:"Google News", date:"01 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMitwFBVV95cUxPLXVpdndDNjlWOWlNNXFMNFRNSGU0SDFDdW04NjBBSENaVkExUW1qRmF1VlJMRlloS1B1UERqUm9MXzlyS1Jyd2QxMTJLcTgtLU5kSF9JNWZZQ0R4ZWFuWHVaT0VQOEZCYXJRMmFOVHNkRWVXV2RaYjZoZEpBLVd4MGVBVExTNDlxR3p0NzdtOEFLOWdSVTh2bTdDWlc3allxSXdtUWZTTlNCcWwxTHJFUnRqZGsySW_SAbwBQVVfeXFMTzVLX29NbTZkMnVWazBQTWV5TTI3TzZkRlRuX3pneHdSSEp6UVlqM3ZCTXRGN2FWMGJ0dXBTbHV0TXhCRjZNMXpIdVQ3Qkh1a19QelptWkxuNFY0TGFiYkVLNVRlc0J4NlBlQTRRYXE3VlhabXpLYXphV0pwS2pSQnNrazdqV0NwRG92cTNnOTZwbEJTVGpWSFhCa1RZSk90ZHdGSmJZdVhlckdVSVZZQWZtaTRma0RjTXBnSks?oc=5"},
  {title:"Why are Tottenham Hotspur doing Chelsea favours in the transfer window? - FourFourTwo", source:"Google News", date:"01 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMigAFBVV95cUxPOVVaZmZQRGIwS2JxMGo3ejBaWHFpLTJCVkwwcHhDMVB3WTlWMnpFVkVfSlgyNzgybVdqNXlsQXY3azQxS0s2SWRYQlAtdEhWNjhsNEFseU5HUTVuY1dYdUdzT3ROdG5jc2ZnVGtRZUhpcE1JV3hOT3dTTzdyNkUxcA?oc=5"},
  {title:"Tottenham confirm second Deadline Day transfer with more expected - London Evening Standard", source:"Google News", date:"01 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxPVHR0dndWcWxLbkFwcURtdUxOVEt1aFp0X1N5cUpsQTZYUmRTSkdSSnJVQUwzWUhRb3NTZVZua1hWdmw5b2NBNlZQdXlHMUNaWGFMcHozMlFZUnJxWVh5OFdOT0EtM3BsZGYyZ3BBT3pQMjZBaHk0RTJzZ1FpSTh0TXNVWkFUTDBQQ1VGcWdEUmJwaW1QZU1mbg?oc=5"},
  {title:"Tottenham star ‘open’ to shock deadline day Chelsea switch as midfielder signs for Juventus - TEAMtalk", source:"Google News", date:"01 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiygFBVV95cUxPdkZGOUJfWXdGemxYMUFHXzJBN0pvUmtXVjJQWlluRDA0MnpFaXNIbWdRbWN4QXVFTUI1T2E5VU1MVnBkSzhmai1SWjRuUUhrR0o3c3BTZnJJNmtoSTVLNG5LVkhiMW9oWjRKcG50RHZkb3FEcHdPMXI3YnJGbXBhRldZOXRJUVVEMHRnOW9XTzh6SHJQZ2ZKVG1oS2RSYy1TR1ZydUQtc1pQVFQwaTN4ODdCLVQzbkJudEhZb0RIZUxKMkhEVkVITm9n?oc=5"},
  {title:"Tottenham transfer news LIVE: Mykhailo Mudryk loan, £75m agreement, Tosin Adarabioyo medical - Football London", source:"Google News", date:"01 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxOLXZIRGVVYWNnbGdIcVR6TENva2ExQlVBb1BzVEVWOFg5c21CbkoxNVVybm9odXdMbms3MXBHcERaU1ZjTjFhRTVsV2JzZWk2RVJkV3dRVHZ3ZEdxTldpbFBiVllMLURITi1nR3hPTjl6M0RCeC1LU0NYUHdrS21aVmIxU184d1RiOXpCX2VfNXh0dlJvQjd3WEl6WTByRlE1?oc=5"},
  {title:"Tottenham insider reveals shock Lucas Bergvall update on deadline day", source:"SpursWeb", date:"01 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-insider-reveals-shock-lucas-bergvall-update-on-deadline-day/"},
  {title:"Mudryk, Gakpo hope, Adarabioyo, Richarlison - Tottenham transfer deadline day state of play", source:"football.london", date:"01 Sept 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/mudryk-gakpo-hope-adarabioyo-richarlison-34551043"},
  {title:"Liverpool v Tottenham Hotspur: Carabao Cup ticket details - Liverpool FC", source:"Google News", date:"01 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMikwFBVV95cUxPTlNiR2VOUEFiS3JwTFZGaTV4d1BSSHVoMzhaRVlyZFZJNjhubk55S2I4SmlONnpJQmYzQ1dTOFdDRGlMdTdJRElNRG93Q2V4cHcxOFRCUl9CMXI0ckY1bUp4R21kVlhIRE5nWmlSUnktLVdyelp2cDAxdzl1NWNDSC0xWVRNbnlGMm1NeHdoQ2h0YWPSAZsBQVVfeXFMT0VybTFFb094U3RqU3JURTdZVS1TcXZjRFM4R1lwcG50dWJPSFpVZ1prQms1X0JCRmZYODhpLUVZYzNoemFjbHpXY2c4SzZ5VXlOd2hZbFFtNUYzem5hcXNBZHdlT1k1eV9GSjk5Ynk1YmRNMjh4b2xnMTUxUVdzaXZHdFNQWVR4N3NqYWRLZ0dzdXoydmw4T3JVXzg?oc=5"},
  {title:"Official: Juventus sign Sarr from Tottenham in potential €30m deadline day deal - Football Italia", source:"Google News", date:"01 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMie0FVX3lxTE9BalNsRS1NYmhqM2Y4UTBKZVBMSkowOUhaX0Z4ek5ybHJzOU1qVHZ1RXB5TGxvU2Y5bm5tOXdqenpvcTZINkFCR1FwZWJvdFAwN0tuQmdLcl9TaWZTWWY5Qjh1YUtpM3RVdFY2RGdOMVNMTDBXenRIdmFPY9IBgAFBVV95cUxQMzJENlp5WXFGdFZtaHF0SWxYNU10b2JaY1dxM0dLM2ducGg3NUhhUUo4MUVyWHV2cnVKUEI4UWtrdGg5Nm53ZXcybzVSRkx2Z3F6YlJKcG11cnQ4aW9SdkRzQWphXzZYX3YyRFcyMEVoQnp4M3RqTmZ1eFR0MnJMVA?oc=5"},
  {title:"Tottenham announce £1.7m loan that could eventually net them an extra £22m", source:"SpursWeb", date:"01 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-announce-1-7m-loan-that-could-eventually-net-them-an-extra-22m/"},
  {title:"Chelsea&apos;s different move in mind for &apos;rusty&apos; Mykhailo Mudryk despite Tottenham agreement", source:"football.london", date:"01 Sept 2026", tag:"Club", url:"https://www.football.london/chelsea-fc/transfer-news/chelsea-tottenham-spurs-mykhailo-mudryk-34551745"},
  {title:"Tottenham respond to &#8216;a number of enquiries&#8217; into a late Archie Gray transfer", source:"SpursWeb", date:"01 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-archie-gray-update-after-rejected-deadline-day-approach/"},
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
