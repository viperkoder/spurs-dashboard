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
  {title:"Six Tottenham legends named in Kieran Trippier&#8217;s career XI as Pochettino calls for Chelsea title to be stripped", source:"SpursWeb", date:"06 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/six-tottenham-legends-named-in-kieran-trippiers-career-xi-as-pochettino-calls-for-chelsea-title-to-be-stripped/"},
  {title:"&#039;Tremendous footballer&#039; - Ledley King backs under-fire Tottenham signing to come good", source:"SpursWeb", date:"06 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tremendous-footballer-ledley-king-backs-van-hecke-to-thrive-at-tottenham/"},
  {title:"&#8216;Nobody better&#8217; &#8211; Tottenham source says Roberto De Zerbi is not at risk of winning sack race", source:"SpursWeb", date:"06 Oct 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/nobody-better-tottenham-source-says-roberto-de-zerbi-is-not-at-risk-of-winning-sack-race/"},
  {title:"Tottenham warned re-signing electric former striker will cost €100m – fans are split - TEAMtalk", source:"Google News", date:"06 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMifkFVX3lxTFBITTVTZ1dmRHlQRlkwaHRmSTVBYWpZQkw3RXNyRkZmeDVoaWVRNHZJVEdQR25uaEpLS2hnNGV3R0kwT3loZnhmZEZxZ1dEYWR2cFRSRkQ5NlJjcmRlZGpJc1RLdl93c1dORTBkd01pVXNGQlY1SmxCMW1ZSVUwUQ?oc=5"},
  {title:"The Tottenham XI we are desperate to see vs Man United as De Zerbi seeks first win", source:"SpursWeb", date:"06 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/the-tottenham-xi-we-are-desperate-to-see-vs-man-united-as-de-zerbi-seeks-first-win/"},
  {title:"Mystery man in Tottenham squad photo named after AC Milan switch - football.london", source:"Google News", date:"06 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMinAFBVV95cUxPaUQycHZXU0k2aW5Pek9zbVFiSjBRMFJrYk54dVVJbjNhcnFOZVJkakN5TjdZNm04cjJ5QnZ5SlpYMWVnRVpSbGpOeG9tWWVUSklJclBwc2pYYlZGRktnZUZfZWlmY2JmX1hGMkpGNFR4djI5WkI0YTZnNHl2M3l1RmlrX2NyVXcwTmR0Rk0wcGZpVlBmUzRLaDY2ckQ?oc=5"},
  {title:"Tottenham&#8217;s Yang Min-hyeok issues long apology after controversial gold medal statement", source:"SpursWeb", date:"06 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-yang-min-hyeok-issues-long-apology-after-controversial-gold-medal-statement/"},
  {title:"Ledley King reveals what he thinks of Micky van de Ven as Tottenham captain", source:"SpursWeb", date:"06 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/manage-the-group-ledley-king-gives-tottenham-captain-advice-to-micky-van-de-ven/"},
  {title:"Van de Ven, Van Hecke &amp; Porro: Latest Tottenham injury news and return dates ahead of key Man Utd match - 3 Added Minutes", source:"Google News", date:"06 Oct 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMixAFBVV95cUxOWmJaQWE3N3pUN0hUNWZ0OXVGVHRxeDdsLXE0bWFFeHJNX0NTR1MyY20tTjZHcEM1US1wU09GWWJPZGVka1dfR3doZF9xMlVpRk9TTGgyZnZTZGQtZEtiV1hpU0Z6RW5qNXh5bjlPcWRLLWNMVkYwaU5KZDYwY1AyQjBxSXMzQ3UzLXZjVkV6ZkQtV1F5bDFpOXlubG1yeHh4b01veE4yZjg2SGtRbGllU19YcmNJbkIzUlJQNEpwX2R3aGY3?oc=5"},
  {title:"Nine Man United players face late fitness test to face Tottenham Hotspur", source:"SpursWeb", date:"06 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/nine-man-united-players-face-late-fitness-test-to-face-tottenham-hotspur/"},
  {title:"Tottenham blacklist major signing who’ll leave in January – Fabrizio Romano - Football365", source:"Google News", date:"06 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMimgFBVV95cUxONnhTRGR5ajNqaDdhMzRqekM4Z1JTSUNIcXVKWVROUHF4OE9lUTF4VWhSRG1KVUd2S3BZcDVGclNhNjlGak1fYmV1Wk13N2hDTFdkMUZNV205VzI3YUlKN3dpTDNOdS1RU2VPcXFuaWdhSFF3TXFILUpyLS1MUWxqZG5JRHhkRkpKY19Tb3htV1JReFFHcFRDekJ3?oc=5"},
  {title:"The 17 players who could miss Man Utd vs Tottenham with Van de Ven and Van Hecke worries", source:"football.london", date:"06 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/17-players-who-could-miss-34720618"},
  {title:"Van de Ven, Porro, Van Hecke - Tottenham injury news latest and return dates ahead of Man Utd", source:"football.london", date:"06 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/spurs-injury-news-manchester-united-34720925"},
  {title:"Rashford, Baleba, Mainoo - Man United injury news latest and return dates ahead of Tottenham - Manchester Evening News", source:"Google News", date:"06 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiqgFBVV95cUxQY0tNZ2dDS3dYRW1YQVE5UElsMnhlUmhlUUwzMng5X0FYSTYtMC1FTFJRUUhtQnJkYXUtcmxvVFdmRjRGVzhoWjlWOExFa3ByMENObHFQbTRGS25WM2l1T25nS2xvWHk5dmlZRlRHZ3FEZDROR1liVXNkTWNyWlI2TTVuRXAydHo4ZFRLMXBHU2dKU2RiSDVlVmE0UkJrRHRvZENUNUZZNDVWUdIBrwFBVV95cUxPd0xNdGZRNHZfeXh3UjRpdS1OTndIbkdkTVZMUWpoZGN4a0FtTS1keTJRSVVUTG9tc01RdVUtbC1oYnQySGVDTktveDBZTVJBWEhLUGdHSWUzTWNXeWdpOVNlOVJxYUJseDdpWXAySURsQTl6UjI2STVGMmUyZXVFcy02bGdlVTQ1NEZmT0JTMUdKam5jWXc3X2hVYnNGTHhNeFNJYU5WWG1heDEyQ1JB?oc=5"},
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
