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
  {title:"Reds progress at Anfield — Liverpool 3-1 Spurs", source:"THFC Official", date:"16 Sept 2026", tag:"Match", url:"https://www.tottenhamhotspur.com/news/1090195/reds-progress-at-anfield"},
  {title:"Pedro Porro available for Villa clash", source:"THFC Official", date:"16 Sept 2026", tag:"Injury", url:"https://www.tottenhamhotspur.com/news/1090198/team-news-pedro-porro-available-for-villa-clash"},
  {title:"Tottenham without seven players for Liverpool Carabao Cup tie, but one key return", source:"SpursWeb", date:"15 Sept 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-without-seven-players-for-liverpool-carabao-cup-tie-but-one-key-return/"},
  {title:"Tonali, Porro, Kulusevski - Tottenham injury news and return dates for Liverpool clash", source:"football.london", date:"15 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-injuries-porro-tonali-liverpool-34619051"},
  {title:"De Zerbi reveals if Kudus and Maddison can start for Tottenham vs Liverpool", source:"SpursWeb", date:"15 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/de-zerbi-reveals-if-kudus-and-maddison-can-start-for-tottenham-vs-liverpool/"},
  {title:"Can Richarlison play for Tottenham again as Carabao Cup and Premier League rules explained", source:"football.london", date:"15 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/can-richarlison-play-tottenham-again-34618283"},
  {title:"Richarlison posts crying emoji after Spurs cup snub", source:"BBC Sport Spurs", date:"15 Sept 2026", tag:"Club", url:"https://www.bbc.co.uk/sport/football/articles/cmrl6errl1p6o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Spurs' Richarlison posts 'Why?' and a tearful emoji after he is left out of Liverpool Carabao Cup tie - BBC", source:"Google News", date:"15 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMia0FVX3lxTFBhM19mdXZBd3VzTWJ0bWhTa2R1aXB5TTl3U1YwVmw3RFVuS0VtU1FfZEhJS2djS2t2dVdBNHJmZlFCdnhRRlVyZGI3ZFl5ZEk2SkxNVEE5TTNSUVRRYzdEUzFuZTdDeGptTUxv?oc=5"},
  {title:"Tottenham&#8217;s League Cup record vs Liverpool is way better than you would think", source:"SpursWeb", date:"15 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-league-cup-record-vs-liverpool-is-way-better-than-you-would-think/"},
  {title:"Tottenham boost as Liverpool set to be without four players for Carabao Cup clash", source:"SpursWeb", date:"15 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-boost-as-liverpool-set-to-be-without-four-players-for-carabao-cup-clash/"},
  {title:"Roberto De Zerbi can plug Tottenham injury problem by unleashing &apos;precious diamond&apos; vs Liverpool", source:"football.london", date:"15 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/roberto-de-zerbi-can-plug-34616375"},
  {title:"Richarlison handed shock Tottenham exit route as talks open over last-gasp transfer raid – Exclusive - TEAMtalk", source:"Google News", date:"15 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxNei1qdUdXMGhkZlNNMTJiNE1ndXU0WVpyTkxobG54d0VSZXowWGgwTHBacEJQWVZKaXBPRDJGU3pjbndKeHdHMHhGaVVJR0tlbU1XYU1WZUZScURJNzZJek5UckQ4b1dPUVhkekRNWFpJQWtGRVZFMGg4alczQlY4c0ZZNHZLejNuR3RRenFWajRyWXFHTklCbTAxUUZPS1R6NkxCNDFnR08yVFpqY1B6VThjR0o?oc=5"},
  {title:"Big Midweek: Liverpool v Spurs, Man Utd, Lampard, Bouaddi, Sunderland &amp; Bournemouth in Europe - Football365", source:"Google News", date:"15 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMivwFBVV95cUxPQnR3R0pZU1dwLUFrRTlZQTdHVzVlelQ2WGRpN1JQZkxwNUFJMDd6ZnN3S2VDenpSN0MxaXktczcyeFNTQzV2WURLUjBaeGVPWXREcWptMUpSdk02XzlPQkZHWVFkaDVSUk9ZZ1FBbEJlMm5RT3dHazJTc1BLTVVSYnhDc1RZNkd3QzNvTHZqYm5DdjZJSUZ2dVRjbDFrQ2preUR4eWZOTkxkaDM1RkcteTFqTXVqYVdLVG1OSVFWSQ?oc=5"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Tuesday, September 15 - Cartilage Free Captain", source:"Google News", date:"15 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi2wFBVV95cUxNamlhc2hsQlRLckJVOTc2dHRMT3NIN0NIeS1VSUc2aGd5S0l5T2RGSUtfTTlrTWxpcW0yREV1N0pfNDVXUnlKMGJZdmx2OGdHQkYzUC1rdl8zMXJBdl9fT01SSFpkajFzY3FsRnhObkYtZkk1aExqYlVrR1pnandiNk1OODEyUUlKY1JsRkhOSm5JWFo5RnJveDhtZzhLby10NktzNm1KbW5fUWNXV1pOdjREN3NhNjUwT3Bpc0Q4N09yUFFpTWZmUHhTV3RhY3hPRERLWWMzSWxzU1U?oc=5"},
  {title:"Tottenham predicted team vs Liverpool as De Zerbi makes eight changes and Kudus starts", source:"football.london", date:"15 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-predicted-team-vs-liverpool-34617467"},
  {title:"11 players to miss Liverpool vs Tottenham as Roberto De Zerbi faces injury issues", source:"football.london", date:"15 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/liverpool-tottenham-carabao-cup-injury-34616970"},
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
