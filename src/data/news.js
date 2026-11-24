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
  {title:"&#8216;A player I think the world of&#8217; &#8211; De Zerbi on Luca Williams-Barnett&#8217;s new Tottenham contract", source:"SpursWeb", date:"24 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-reacts-as-luca-williams-barnett-signs-new-tottenham-deal/"},
  {title:"Luca Williams-Barnett makes exciting Tottenham promise after signing new contract", source:"football.london", date:"24 Nov 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/luca-williams-barnett-makes-exciting-34960506"},
  {title:"Brentford want to sign a £40m Tottenham star who has played 12 times already this season", source:"SpursWeb", date:"24 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/brentford-want-to-poach-archie-gray-from-tottenham-de-zerbi-would-be-foolish-to-let-him-leave/"},
  {title:"Tottenham draw level with Chelsea and Leeds in global power rankings after 2-0 win", source:"SpursWeb", date:"24 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-draw-level-with-chelsea-and-leeds-in-global-power-rankings-after-2-0-win/"},
  {title:"Worry for Tottenham as three players are inching closer to one-game suspensions", source:"SpursWeb", date:"24 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/worry-for-tottenham-as-three-players-are-inching-closer-to-one-game-suspensions/"},
  {title:"Sandro Tonali returns to training but Tottenham receive double blow after Ipswich win", source:"SpursWeb", date:"24 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/sandro-tonali-returns-to-training-but-tottenham-receive-double-blow-after-ipswich-win/"},
  {title:"Tottenham are about to receive an £8.4m bid in January as forgotten player changes his mind", source:"SpursWeb", date:"24 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-may-only-get-8-4m-as-richarlison-changes-his-mind-on-transfer/"},
  {title:"Tottenham player returns but three key stars missing from latest training session - Football London", source:"Google News", date:"24 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMingFBVV95cUxNMDVZQ3NMY0FMOHdWbkI3NkZva2JjaW10anBORkZoRXBNUG4tMHJEYS04eUtJMjlGSlNLWDFWWWdtUGdBVHpnbnpkb1ZrT3loYy1KQkxiTDlqOENtbFFKU2pPMHBEQlNEcVlJMVJRZGdDRkdjcnFOY0Fja29IMmhMemNkRnRUM0VROWVOWG0yMkhNeE5nTlROMXlXaW1Udw?oc=5"},
  {title:"Marcos Senesi vs Micky van de Ven: Who should Roberto De Zerbi start for Tottenham?", source:"SpursWeb", date:"24 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/marcos-senesi-vs-micky-van-de-ven-who-should-roberto-de-zerbi-start-for-tottenham/"},
  {title:"Tottenham defender opens new trading card store with backing from Kyle Walker-Peters and more", source:"SpursWeb", date:"24 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tosin-adarabioyo-opens-new-trading-card-store-with-backing-from-former-tottenham-defender/"},
  {title:"Tosin Adarabioyo opens new trading card store with backing from former Tottenham defender - Spurs Web", source:"Google News", date:"24 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMixgFBVV95cUxPOTFoMmlOZTRCenJRUjNZM1REWjhxVkl4ME9PeHNNYlhnUnRrQ2FFYUo0MXctSkhmMGRPaW4xUDZEa1E3X2NzVUtxeVFrMVVuVE5aeUJWNW5ORFJ2ZW5WQkp0cTVWV2JzdmFYSXpSTGlsWjZyTDZnbXNWdkdPTXN3Y3lVNlByNDlUUFQ3b2RyYUN6c3pLVldtVll1UXdQWmxtcXVkbEdOOHV6eF9yeEthYmJZVXVUbTlFXzVGYWplcmpSbjJsYkE?oc=5"},
  {title:"Tottenham sent fresh Dejan Kulusevski warning ahead of 38-day fixture nightmare", source:"football.london", date:"24 Nov 2026", tag:"Fixtures", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-sent-fresh-dejan-kulusevski-34958531"},
  {title:"Spurs handed Luca Williams-Barnett warning despite comparisons with club legends - talkSPORT", source:"Google News", date:"24 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilwFBVV95cUxPOW1sWXFlUFhzd0d1ZnlqcVB1aVVtLXdWQUduSEtYbGZXdFpPbnNyU1lsNnRXZUlhNHNadkVaTXB3dzBKWkJ1WGNERVZ5d1loYU1NSDNTYVlQcUtxaTJmYTNpR0NNZmRWX0Q5VG4yYXhtNUlMMkJnRDJQdEtaZ2pPUllEZzk3NElaZ0Fwb0d3Z0x5TU51akpZ?oc=5"},
  {title:"Former referee gives Mohammed Kudus &#8216;red card&#8217; verdict during Tottenham vs Ipswich", source:"SpursWeb", date:"24 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/former-referee-gives-mohammed-kudus-red-card-verdict-during-tottenham-vs-ipswich/"},
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
