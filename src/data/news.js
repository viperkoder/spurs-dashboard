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
  {title:"Tottenham&#8217;s net spend is surprisingly low this summer after Pape Sarr and Danso deals", source:"SpursWeb", date:"01 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenhams-net-spend-is-surprisingly-low-this-summer-after-pape-sarr-and-danso-deals/"},
  {title:"‘I was scared to tell my old teammates’: Victoria Pelova on making leap from Arsenal to Spurs - The Guardian", source:"Google News", date:"01 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi1gFBVV95cUxPUi10ZFpCWC1pNlF5R0UtZTFXQmZxREI1X3FKSGdmZjc3anZvaGtLZVhCLUdKS2RBX1BES2RhUjRSR3oyTVh2aHc4MnJhdVItQ2l3aE1CSEwyREtnRmtVZ19YSFRPV20ybDM0eU9xWjBaVi1RQTFlWEY4MGtockFtQ01rWDFDMGRSc2t3VUJ2WlkzbFVWREVuRm9NM01sbXQxOEdEMlYwWVR2WVNueWM2c2tneFE3dkFqd01RUkE0TXp5Qk1kM1EtdGNJQXVXUzRYelN4bnhn?oc=5"},
  {title:"Tottenham transfer news LIVE: Mykhailo Mudryk loan, £75m agreement, Tosin Adarabioyo medical", source:"football.london", date:"01 Sept 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-transfer-deadline-day-live-34547991"},
  {title:"Tottenham transfer news: Tosin Adarabioyo and Mykhailo Mudryk agreements, Iliman Ndiaye twist - Football London", source:"Google News", date:"01 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiqwFBVV95cUxOOWpiZWZzQkgyRWJQRHJUR2piR29haHQ4OGZXZ2hWVk5TbUt0NVhFS25Sd1hhbExyMnpTZHN3N3BTVzZNZEhJa29jUHl1VnVsbGRUcXFOczNJb0pmMlNWNkpXdzJERHcxUzVQd1p5Z1FfbXgyd05jeDRZN3JCc3Fxc2RGSDhEQjdVenRtaFgxbVV0d2VfWGQ2dm84QnZqUWkzV04wS21nZmRobVU?oc=5"},
  {title:"Tottenham transfer news: Kota Takai joins Sint-Truidense VV on loan - BBC", source:"Google News", date:"01 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiakFVX3lxTE16bjczQThPeTFmX3I4Rlp5ajVDUW9sQzNYYm1aUlZQSVU4d3hlZzRYTS1jWml0eDZNemltdDRPRERUMlBpMjVWQ0UzRVl6V283cXl1bFNLLWhFLXktOE5lc19lTXdQWkhmbGc?oc=5"},
  {title:"Tottenham insider provides big Richarlison deadline day update after public outburst", source:"SpursWeb", date:"01 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-insider-provides-big-richarlison-deadline-day-update-after-public-outburst/"},
  {title:"The five players Tottenham tipped to sign on transfer deadline day", source:"football.london", date:"01 Sept 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/five-players-tottenham-tipped-sign-34548557"},
  {title:"Telling two-year Tottenham stat shows De Zerbi was right to point to mentality issue", source:"SpursWeb", date:"01 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/telling-two-year-tottenham-stat-shows-de-zerbi-was-right-to-point-to-mentality-issue/"},
  {title:"Takai joins Sint-Truidense VV on loan - tottenhamhotspur.com", source:"Google News", date:"01 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiiwFBVV95cUxPN0dRc1pHdlM5V1ZnS3Z2Q3dwa2Q4WUY0bnVwT3NTeXpaYmdRNjkxM1FZbDJJdk5jMThpYmIwbHE2OENMYm0teFV1OHJ3ZlBseXlrSl9VVUVUMTJqTnBmbWp5czJTUWY2VWhfb3l2ZXVFWHJBcEpvbEJKRExuVFdwaVBmUGpfWnFkazNF?oc=5"},
  {title:"Tottenham reject mystery late approach for £40m star who has started all three games", source:"SpursWeb", date:"01 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-reject-mystery-late-approach-for-40m-star-who-has-started-all-three-games/"},
  {title:"Tottenham should be keeping an eye on £80m star on transfer deadline day", source:"SpursWeb", date:"01 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-should-be-keeping-an-eye-on-80m-star-on-transfer-deadline-day/"},
  {title:"13 Tottenham Hotspur transfers that could happen on deadline day", source:"SpursWeb", date:"01 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/13-tottenham-hotspur-transfers-that-could-happen-on-deadline-day/"},
  {title:"Tottenham have just signed De Zerbi a player he thought could win the Ballon d&#8217;Or", source:"SpursWeb", date:"01 Sept 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-have-just-signed-de-zerbi-a-player-he-thought-could-win-the-ballon-dor/"},
  {title:"Tottenham star that requested transfer hurried for medical minutes after landing", source:"football.london", date:"01 Sept 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-transfer-deadline-day-juventus-34548688"},
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
