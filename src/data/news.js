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
  {title:"Merson: Spurs, Man City and Man Utd have defining games this weekend", source:"Sky Sports Spurs", date:"11 Sept 2026", tag:"Club", url:"https://www.skysports.com/football/news/12040/13582801/spurs-man-city-and-man-utd-face-defining-premier-league-matches-this-weekend-says-paul-merson"},
  {title:"No wins and no goals - how concerned should Spurs be over PL start?", source:"Sky Sports Spurs", date:"11 Sept 2026", tag:"Club", url:"https://www.skysports.com/football/news/12040/13583499/how-concerned-should-big-spending-tottenham-be-after-winless-and-goalless-start-to-premier-league-season"},
  {title:"View from our legends | Everton - Tottenham Hotspur", source:"Google News", date:"11 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMigAFBVV95cUxNdVBtS2YtOHI3d0NzMTYzTjJIM0Jfb3VUVHBhOHYxTGIyYWxOZDMwQVd1ZGJLUEdyRXJzM3dFS3BsOWJ4LXdfQ2Q3WlpSMy0tQVRPbGpEUVZ1TFlFV3NOOTd3bG9mb2w5eGhsemc5d0dFSWNQYzQ5S210cWx1bkt1Vw?oc=5"},
  {title:"&#8216;Deal is still alive&#8217; &#8211; Tottenham could still land another £17m this summer", source:"SpursWeb", date:"11 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/deal-is-still-alive-tottenham-could-still-land-another-17m-this-summer/"},
  {title:"Richarlison weighs legal action against Tottenham as transfer dispute intensifies", source:"SpursWeb", date:"11 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/richarlison-weighs-legal-action-against-tottenham-as-transfer-dispute-intensifies/"},
  {title:"Tottenham discover who they will play on Boxing Day 2026 in hectic festive calendar", source:"SpursWeb", date:"11 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-discover-who-they-will-play-on-boxing-day-2026-in-hectic-festive-calendar/"},
  {title:"Richarlison to learn transfer fate today as Tottenham primed for last-chance offer", source:"football.london", date:"11 Sept 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/richarlison-tottenham-vasco-transfer-today-34601232"},
  {title:"How concerned should big-spending Tottenham be after winless and goalless start to Premier League season? - Sky Sports", source:"Google News", date:"11 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi8AFBVV95cUxOSmR6Mi1wRkdnR0Q0NjMtOV9jUHZBSDBuMUMxN3FaUmVaOVVLeExJaE5tTHVSMlBlNW1MT1JmaDJkYXJxcHJpcWM4ZHFQQi1qbldrTEhPREIzS2dmeE10d3MtNzRtN1FyWHJPc0xGOGdhcHhLTU1ydDA0TEV2Zm0zS0JPdWx5U01YRDN2dDAyWjVUdDhTMG9lRUxoUjVqWEREWElDQlFjeEJxR244R0FSa2JWek0yRVRiTlJrbTZUM3BzcjdmWlROQVExcS13UEtWYkkxYkJmNEQ1WVZkczA0cXh4WUVONV9wTzZLbmVReHM?oc=5"},
  {title:"Everton weigh up Icardi move before Tottenham trip - LiveScore", source:"Google News", date:"11 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMingFBVV95cUxQSTV5aGxVN21pajU1NHFMSlN1a1BKY0FfMUhyaWlKb0V0YmozQXBNVzE0VGNRVkJ4Rm1wZDM3UkZDYlFtaGxXdzM3V0s0b0lVRmowTWhmWThOOENxWDRuYlpzZlpzd1NsZ0xhMzdjSDg2X09uTk4wdVFZVmRwd0lMVlJqaTZMVFdKTmxhSThjc2tYMnh2SWlVaXdyNk9oZw?oc=5"},
  {title:"Tottenham Hotspur Daily News Roundup - LiveScore", source:"Google News", date:"11 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiuAFBVV95cUxOckZfd1M5cHZzai1kd0FHcHN2TTZmZlBDWjFFbFh5Yi1sYTJtZkpXLTVhbklwNG1UWmlWOUJwS3BjRTdNVUYzMDdWdVR2LU5weVFMaGpqUnpRWEM4VDZxcVFRekwyVFQ1alkxNnBNc0VjaTU3bVpjSHN4TVAwMHprMXBfQnBpeUhQZERsaEpyV1pHWEVzZVQ1ZEFFY3dhVzQzQVg3UVdmVVhNaDZvYUJFN1lBNmVSd3p2?oc=5"},
  {title:"Scan results reveal injury nightmare for Tottenham wonderkid", source:"football.london", date:"11 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/injury-nightmare-tottenham-wonderkid-just-34600621"},
  {title:"&#8216;It&#8217;s getting a bit weird&#8217; &#8211; What Tottenham think about &#8216;mole&#8217; leaking matchday line-ups", source:"SpursWeb", date:"10 Sept 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/its-getting-a-bit-weird-what-tottenham-think-about-mole-leaking-matchday-line-ups/"},
  {title:"Man United and Tottenham eye German goal sensation after Champions League scouting trip", source:"SpursWeb", date:"10 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/man-united-and-tottenham-eye-german-goal-sensation-after-champions-league-scouting-trip/"},
  {title:"Spurs vs Everton | How to watch, team news, kit colours, key information - Tottenham Hotspur", source:"Google News", date:"10 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiswFBVV95cUxOc2VwUzJYMkJYRkFvYmVMWmE0X1Q1MjBnODI1dHVCcjNXaGZWd1JOdDVldGhGRWMzb053VVRyNmVvZFptQTVrMmIxN25ueVVSRldvTFRmLXVxNnlYQXJDVVY0VUZfb3ZyV3VyU3pJS1gyN3NaNno4Um1vYmRZUWxyXzR1ZmFxbHlSOG9mTjNhc1dvY193WF9ZYS1LcmJaSjgyUHlXOUJuQnB1N2VrSWlyckJLMA?oc=5"},
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
