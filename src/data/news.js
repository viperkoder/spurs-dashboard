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
  {title:"What Tottenham are thinking about James Maddison&#039;s future as injury frustration continues", source:"SpursWeb", date:"18 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-hotspur-will-not-give-up-on-james-maddison-despite-injury-frustrations/"},
  {title:"Tottenham press conference LIVE - De Zerbi on Porro, Kulusevski, Richarlison and Marbella training", source:"football.london", date:"18 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-press-conference-live-de-34780662"},
  {title:"Chelsea v Tottenham: Women’s Super League – live - The Guardian", source:"Google News", date:"18 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxOVVVqbmZBazF1SDdwYWdJYWtJaTExNXpVd0wxZzFDT2k5ZldwR2VMSVFZcWwzYmR0WkJjRUlwZXJ0TkNXYTZtR0htNWZJLVA3NDdETjZ1ZXIzOG9HQlZldUNKdnFfTFU0SVZNcUl3eXZKdElHV1RyQ0t5SXRFNUJJME9BMnNUeG1QSjN4OE51bkc3bWNlMG5PQ0pNNDkzX2M?oc=5"},
  {title:"Chelsea vs. Tottenham, Women’s Super League: Confirmed lineups; how to watch - We Ain't Got No History", source:"Google News", date:"18 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi5gFBVV95cUxQTThwTkNTRFFJZzhNd0xCY29Fay1oSXRkdDZiNUQ3VU9naUJqcEtmOUdSUjdFUDJDUmVpWmJVMnRQRkxKVHVDR2NpMExfYzAwYXlVYzZRLVA2SFdVeVpxUksyYy1uN2laWUxCM0NaVTdzLWRTWlAwaTZBNHBQaDRNczhwRFNidXQ1QWZ2SjBVeklrQnU1WjJIZUZKUUVocmkzWDZxazI3ek10dzV6WGZ5RVFYeWtnUnY3bHU2ZWduZDQ2amxVb3BnREVmZm1qZFdSY1JRcXp4M21oZUdjSWZFX1lYTWtsUQ?oc=5"},
  {title:"Chelsea vs Tottenham Hotspur: Women's Super League stats &amp; head-to-head - BBC", source:"Google News", date:"18 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE45RVVCT2t5SVJHcklCb295VUItTDY2WjNBb1RIUFlFREZsZDlaTi1VYm0ySHlBVGlCR1pMT0laTGJZMDNrTm5ualp0aXBtRDkzVlBGOUg3cTNWSmphLUlWTEF3TjdpZw?oc=5"},
  {title:"Roberto: “Deki suffered too much – he deserves to feel emotion on the pitch” - Tottenham Hotspur", source:"Google News", date:"18 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiuAFBVV95cUxQdXhvbHNkaEdGU3NhaEtmdFdhMC11LWlNekZBTG1BTm9FOFQ3MkdraTI1THFxbHltYXh1THY1SUJTamtaNE0wYThKanpkdXBLRnk0QkNxZ2lXOGltZ2lPclNVMVVfal9XOF9qOERZX1pldUwxY1o4NHhIZG9VWktYV0dHbHFrNUtRX3Zlc2g0YzNhdkZ1dnVadnN3Zmh6TC1KanpaVVFGaTAzdU5XWE1Tc1Z1dnZnbkZv?oc=5"},
  {title:"De Zerbi finally gives Tottenham fans the Dejan Kulusevski news they&#039;ve been waiting for", source:"SpursWeb", date:"18 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/dejan-kulusesvki-is-back-de-zerbi-to-name-tottenham-star-on-bench-after-500-days-out/"},
  {title:"Team news | Bergvall, Savio out of Coventry clash, Porro update - Tottenham Hotspur", source:"Google News", date:"18 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiqAFBVV95cUxOdm1TUVZFbjlPNzhndEtJVzdoUkZPazU3eHdZbWJITjBlcEljZ0Y2b1VWeUtnc19rOG5iQmp6dXRobVd6VVYycS1vRDh2SkdpcF8zUVpzczYyNUxmcU85Qm1XQWYyc051a19PMHQyZjM5VXdfSERsdlZaWHFCWU1GOUNzTFNyNTJPN0pkRktRa2pOUXFQR0xSenRDT1JaMElRQnE3NWRuR2U?oc=5"},
  {title:"Roberto De Zerbi gives blunt Richarlison response when asked about Tottenham star&apos;s future", source:"football.london", date:"18 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/de-zerbi-spurs-richarlison-future-34781429"},
  {title:"&#8216;No Savio&#8217; &#8211; Roberto De Zerbi reveals fresh double Tottenham injury blow", source:"SpursWeb", date:"18 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/no-savio-roberto-de-zerbi-reveals-fresh-double-tottenham-injury-blow/"},
  {title:"Tottenham suffer double injury blow but Roberto De Zerbi confirms huge Dejan Kulusevski boost", source:"football.london", date:"18 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/roberto-de-zerbi-kulusevski-statement-34781181"},
  {title:"Alan Shearer makes positive Tottenham vs Coventry prediction after relegation claim", source:"SpursWeb", date:"18 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/alan-shearer-makes-positive-tottenham-vs-coventry-prediction-after-relegation-claim/"},
  {title:"&#8216;Coventry are a dangerous team&#8217; &#8211; Chris Sutton predicts Tottenham vs Coventry score", source:"SpursWeb", date:"17 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/coventry-are-a-dangerous-team-chris-sutton-predicts-tottenham-vs-coventry-score/"},
  {title:"Journalist reveals whether Tottenham or Man United could sign Troy Parrott in January", source:"SpursWeb", date:"17 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/cold-water-poured-on-tottenham-and-man-united-hopes-of-signing-68m-troy-parrott/"},
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
