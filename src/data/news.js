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
  {title:"Mudryk, Maddison, Kulusevski - Tottenham injury news and return dates after new blow", source:"football.london", date:"10 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/mudryk-maddison-kulusevski-tottenham-injury-34595703"},
  {title:"&#8216;Tottenham called me&#8217; &#8211; Mauricio Pochettino reveals what really happened during relegation scrap", source:"SpursWeb", date:"10 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-called-me-mauricio-pochettino-reveals-what-really-happened-during-relegation-scrap/"},
  {title:"Mauricio Pochettino claims Tottenham should be given Chelsea&#8217;s 2017 title", source:"SpursWeb", date:"10 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/mauricio-pochettino-claims-tottenham-should-be-given-chelseas-2017-title/"},
  {title:"Richarlison takes bold step to force exit after Tottenham demotion as terms agreed - Football365", source:"Google News", date:"10 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMingFBVV95cUxQTUhveG8ybFRLcHhuNWFyaW1qTXI2bThvUFhNWElrRVZXMzlING05aHktbjFLYlVHT3VwOUtpNFkyTDVpUDZNZUdxU2R6eGZFYnZiQTYyR3VrUEhIZENjYmtRQmNmbkNRbkhGajNQak5Sek55QnREcl9JMG9fQVVYdHNOQkxvd1pwdExnNzE2WDVpdU1IaGJVa1pzejNXUQ?oc=5"},
  {title:"Preview: Tottenham Hotspur vs Everton - prediction, team news, lineups - Sports Mole", source:"Google News", date:"10 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirgFBVV95cUxQaGNfOU1ha3NseEwybnBSSDZzN3ZFbnFrTm44ZEtiWEtGb3pINHcxRUtnbGxOSW53NkRzY1QybkloODRzc2E0Rm1PbmxGM2lpMTlvLXB2ZGJaMmU4NUlrMUI0WXpDV2lETzlkazBIWTVpMlhxSDNacEY3Ni00R0lGcEc4WmdVTmpJVWtrODFGV09WM1JuNFRBQU9JRW9Ra0Y2cDZQVDVPeS1MZ20yLWc?oc=5"},
  {title:"Club announces HP as Official Workplace Solutions Partner - Tottenham Hotspur", source:"Google News", date:"10 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMipgFBVV95cUxQVFg1am1fMDVtTlhHTlJmNktuZUNheTBKZGR0TDMxUXF2RW5hVm44UENxTllsWnE2d0FfMUZFZVVqR295YkI3S0xkYmR1RXg1LV8xRXM1YkFrSDNSeWlDVFhIUDYyTVppSGVFOWM3ZDZ2bHEwOXJqX3FQYTUtYld5QzFObXNJSmFLY2psTENkRENiOUdvMzJabXY0OGhXVkxzVTJpNGZR?oc=5"},
  {title:"Tottenham&#8217;s asking price for Richarlison revealed as Vasco push for late deal", source:"SpursWeb", date:"10 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenhams-asking-price-for-richarlison-revealed-as-vasco-push-for-late-deal/"},
  {title:"Opposition Report: Winless, goalless, Spurs up next for Everton - ToffeeWeb", source:"Google News", date:"10 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiZEFVX3lxTE5aQ0hzR084TDNURDFUNjhsMldvMkZQNmhFeFAtWUxNNTNHNTdfZ3pHUUdsc1hMUEJEXzBCd2JEa3V1ZWs3RnJxWEtEN25lME8tWmdMX1hoQWZQVDd5Ny1PeWxXVmU?oc=5"},
  {title:"Spurs should be awarded 2016-17 title - Pochettino", source:"BBC Sport Spurs", date:"10 Sept 2026", tag:"Club", url:"https://www.bbc.co.uk/sport/football/articles/c783ndd7ge2o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Tottenham should be awarded 2016-17 Premier League title after Chelsea breaches, says Mauricio Pochettino - BBC", source:"Google News", date:"10 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiakFVX3lxTE1jaGROZkdfakJrcFBqWkp2WVh3UExEYUFPT1NzcUJtenV2dVF2NVl6Y2ttMVc2Q19Rb2ZMcndUeE5Va3g1NGJzWmJna0M4LTAwUzdoN0VkamhxSG5fblBsY2lqLTcxOVA1ZVE?oc=5"},
  {title:"Supercomputer reveals how likely Tottenham are to beat Everton to earn first Premier League win", source:"SpursWeb", date:"10 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/supercomputer-reveals-how-likely-tottenham-are-to-beat-everton-to-earn-first-premier-league-win/"},
  {title:"Tottenham discover 'one big problem' about Mykhailo Mudryk as Roberto De Zerbi talks revealed - Football London", source:"Google News", date:"10 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMingFBVV95cUxQNjlSbEhtLWxjY19qZGh4U1JxMUZUZDRSUmRLUGpmQm1QX2Rvek9Jb1B0MFV5c280bEt5TjU4VDktLVZPTWpaMGpBT0ItYUpVWUd6ZTRacWhtT1RrV1REcEROdVNrUmtULXFnOUh3YmhsaS1kd3cyaWxTdUl1NDJXajVGa3JJS3cxZDhGbzMyckQ5bGlvYjA0S0NKLWhtUdIBowFBVV95cUxNWkt5cHhIMF92YnBVSTBZUUtQR1pOckxRbVNvRHVzblRhNC1tZGx2VjIteVJXcVU5d2hyWHQ1V095eWRSMHk5a3RFOG1jSzFQVWxPN2h6bUg1WV9wbXVKTjlDSHZuSXhUWGxKRHRqZjNVSTVqUC1uZnFOdnR0UzYwVjc1UVZPRjFxSGQwVEotRk5ob2Z2S0o4cF9VU0ZVYmMxcHJF?oc=5"},
  {title:"Mauricio Pochettino makes stance on Tottenham return clear as approach confirmed", source:"football.london", date:"10 Sept 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hotspur-maurico-pochettino-manager-34594909"},
  {title:"Tottenham discover &apos;one big problem&apos; about Mykhailo Mudryk as Roberto De Zerbi talks revealed", source:"football.london", date:"10 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-discover-one-big-problem-34592913"},
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
