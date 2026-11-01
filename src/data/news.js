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
  {title:"Tottenham handed chance to swoop for Antonio Nusa as Arsenal hit £12.5m hurdle", source:"SpursWeb", date:"01 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-handed-chance-to-swoop-for-antonio-nusa-as-arsenal-hit-12-5m-hurdle/"},
  {title:"Roberto on why he substituted goalscorer Archie Gray at half-time against Palace - Tottenham Hotspur", source:"Google News", date:"01 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMixAFBVV95cUxPMlU5MGt1M01ka05kanJ4bTJJT25nSzBwN3hOMVNRRzdTdzVYcXZ4OU9yekp4NnhNdlBKN3VOeDQ1VVRJYTRrMEoyWWhKc2x4M3RLbDJzRmZDdkQxeWcteTNOMUk2MS1PWFBRUElVRHZwQzNyRjJzSDZTX0RMdFVnMnR5eXJGSnJPaklzNzk2QnZITWVEbHVrMk1EWFlLT3g2Z1B2ZExNdllRQTJMejRPUC1FeDB5elZpaUhSTDNHbm5SZTVp?oc=5"},
  {title:"Tottenham interested in £125m statement signing, but Arsenal could lead the race", source:"SpursWeb", date:"01 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-interested-in-125m-kenan-yildiz-statement-but-arsenal-could-lead-race/"},
  {title:"Roberto on when Pedro and Destiny will be ready to start matches - Tottenham Hotspur", source:"Google News", date:"01 Nov 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMirwFBVV95cUxNa0hsWkVjY3haZUoyTy11QnV2Ml9JaUxJZUllYXJDUDkwY2NaaXFBWEVZUG53bzRUbWVKUTJMV1FmUEh4ZnFXSVd3c2x4N0VzTmVkdXVWMzE1M21JdUxiWmdPZE5VSlVBYUlENWlZUXpHNThSaEZVMGFBRFlXRG4wbFB3cnhVQi1NUXBuTUo1RW1GVGdKR2hRakxfUmM1ZEVlSnNJM0hMTDh0dmktc0lz?oc=5"},
  {title:"Tottenham receive comforting news out of Barcelona amid Pedro Porro transfer rumours", source:"SpursWeb", date:"01 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/dont-worry-tottenham-barcelona-are-not-moving-for-75m-pedro-porro/"},
  {title:"Tottenham almost had their own Sol Campbell moment by signing iconic Arsenal captain", source:"SpursWeb", date:"01 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/he-was-an-arsenal-legend-harry-redknapp-almost-signed-patrick-vieira-for-tottenham/"},
  {title:"Tottenham receive a nibble after slashing Richarlison asking price for January", source:"SpursWeb", date:"01 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-receive-a-nibble-after-slashing-richarlison-asking-price-to-just-8-3m/"},
  {title:"Former Tottenham defender spotted at Hotspur Way after earning UEFA B coaching license", source:"SpursWeb", date:"01 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/vlad-chiriches-spotted-back-at-tottenham-after-earning-uefa-b-coaching-license/"},
  {title:"The huge Luca Williams-Barnett mistake Tottenham can&apos;t make and Van Hecke&apos;s remarkable visitors", source:"football.london", date:"01 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/huge-luca-williams-barnett-mistake-34845939"},
  {title:"Highlights - Premier League - Tottenham Hotspur 2-0 Crystal Palace - BBC", source:"Google News", date:"31 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiaEFVX3lxTE9LLVRockZvTGQ5Y2R1R3FrcE44N3FEQTd0U0YzZEM1amFwRnBVTm4zc2N4MWdNN01GNmxzMHpFeExJVVI0QUtLcEFMVWpyUUZIMTlKUEl6dE9nMkN5SmY4Tkh2bTZqNHEy?oc=5"},
  {title:"Tottenham should be concerned by what Mykhailo Mudryk has planned for November", source:"SpursWeb", date:"31 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-should-be-concerned-by-what-mykhailo-mudryk-has-planned-for-november/"},
  {title:"Extended Highlights: Tottenham Hotspur 2-0 Crystal Palace | Palace TV+ - Crystal Palace F.C.", source:"Google News", date:"31 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi1AFBVV95cUxNTHZyX3NuR3hUYVJtcktyblZ4NXhoZVZQTm81cE90RTllR05QaXBEQzlNZnZHRl9HZlZMU0hiU1lDQzJ4WXJqNUd5T181dFdSbVJsZGl4Y1ozaklBdU54YWhlNkRKWmVFWlpOeExBVTBkSEFhWVNKZ3pRa2dPa0NaS2s1MXo4Vi1wdml1SzRlZ3NEVmJoS3RybWdkV1BTV1lKN0xFM19rMGtSaTRyUExzcndIN21WQzNvS0lLNFlNS0drWDJ0ejdiNnhfLUU4M1Flb21NRg?oc=5"},
  {title:"Are De Zerbi's Spurs finding elusive consistency? - BBC", source:"Google News", date:"31 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiaEFVX3lxTE5nSFEzLUdsRm1XUUw5cm1QU21oRUd0ZzB0TzZVQ2xzLThtQTJYa29uVU82Q1JJSExKNUpoYjJHY281VVVNQ2tSX3daNzJtajFKVVhvZFRvOG9vcXFWU05VSlZDbGJGUzds?oc=5"},
  {title:"Spurs 2-0 Palace | Roberto De Zerbi’s verdict - Tottenham Hotspur", source:"Google News", date:"31 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMikgFBVV95cUxPSmVuWWtIWWtXYXZCUllaa3RUMVpsQkt3U1JSMkl4WjBvSjU2aVNpYXhoX3JhN1ItQzlvSkZncUNLdXZNTS0za2xXbjV2VC0tSGJSXzlGZE9jckQ1bU1jQUQ3XzhzRnAxVjBqRXFqWElORndrZFNqV01EUHJzX2NDM3Y3d293NzhReWNhRkFFTDBCUQ?oc=5"},
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
