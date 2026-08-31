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
  {title:"Tottenham told they should have had penalty against Newcastle after referee review", source:"football.london", date:"31 Aug 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-penalty-newcastle-premier-league-34545795"},
  {title:"Tottenham working on shock late move for Chelsea player to replace Kevin Danso", source:"SpursWeb", date:"31 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-working-on-shock-late-move-for-chelsea-player-to-replace-kevin-danso/"},
  {title:"Tottenham transfer news LIVE: Iliman Ndiaye agreement, Richarlison response, Kevin Danso latest", source:"football.london", date:"31 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-transfer-news-live-iliman-34544057"},
  {title:"Transfer news LIVE: Tottenham's Ndiaye deal at risk of Arsenal 'hijack', Fernandez UPDATE, Chelsea 'eye' Manu Kone - The Sun", source:"Google News", date:"31 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxOSWZPSng1ZHBURGRtdXZMcFJDbFBWdmxDMzRqOVpGeGFMZUg2OVdBUGhyRUxUQ19jQ1EyNlU1cVVVWFpkTXYwVlAzNzl2T0FmWjREN2I3VWd4bU5YSmwxVmk5dklJTEdlT3VGdmE2RDFzTkotUnBqTkJITGdIbUx2YXRlQndxT2xiN3FWZUVLTnFyRG9LZGFMNVBqMFpNWnM?oc=5"},
  {title:"Little-known Iliman Ndiaye detail could really boost Tottenham squad planning", source:"SpursWeb", date:"31 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/little-known-iliman-ndiaye-detail-could-really-boost-tottenham-squad-planning/"},
  {title:"Everton insider provides huge update on Iliman Ndiaye to Tottenham deal, and Richarlison", source:"SpursWeb", date:"31 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/everton-insider-provides-huge-update-on-iliman-ndiaye-to-tottenham-deal-and-richarlison/"},
  {title:"Kevin Danso to Sunderland transfer update: Tottenham talks &#8216;progressing&#8217; over shock exit", source:"SpursWeb", date:"31 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/kevin-danso-to-sunderland-transfer-update-tottenham-talks-progressing-over-shock-exit/"},
  {title:"How much Iliman Ndiaye earns at Everton and where it fits into Tottenham wage bill", source:"SpursWeb", date:"31 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-much-iliman-ndiaye-earns-at-everton-and-where-it-fits-into-tottenham-wage-bill/"},
  {title:"Tottenham receive positive Iliman Ndiaye update amid Arsenal hijack rumours", source:"SpursWeb", date:"31 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-receive-positive-iliman-ndiaye-update-amid-arsenal-hijack-rumours/"},
  {title:"Tottenham fans notice extremely ironic detail about Pape Sarr loan to Juventus", source:"SpursWeb", date:"31 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-notice-extremely-ironic-detail-about-pape-sarr-loan-to-juventus/"},
  {title:"Iliman Ndiaye, Richarlison and the Tottenham transfers to be completed before deadline day ends - Football London", source:"Google News", date:"31 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiswFBVV95cUxOVkJ3NldXQkM0SHQwOG0tMWFqYnZ4OWUtQ2hUa241T3AyWHdQTFRWTHpaMDVfS29Qc1drM2Q2VmpCVXJUWUxJT2NKX2VMMjJwVjZBRF9ucm9MVWtoTVBSa0hmQUpMMU1MOEhETXlfWlZUa2JKT0tWejlXRTlLWjFWb2hWdXJsUjZIX09lOWZtZW56U09mNm9lUFVCSFVNRUU1dmxhWEM5Z056LVlyMUc1Q29ZVdIBuAFBVV95cUxONGlNVDgzdzZyOE91YktpUTlwcnFfY25GenF1cU9RTjJTUEFEV1YtYmo3QXhmaFlUTFJpQWJDUXhKNlV6S3cyM3hPQmxjUmVLNHNtalJyY0F5NGlMLXZFX1JDdThPNktUVjctQzRsUHVkTTRreXB0MWFTdHdob1N4NjY3UUMxc2V5V3J1d0Y3TFQ3RHV3TjJoRUctUVl4QTM3N2ZiVlNNN0hYTDgwVV9Ca2FhbVdiRWRU?oc=5"},
  {title:"Fabrizio Romano reveals Tottenham are looking for tenth signing after Iliman Ndiaye", source:"SpursWeb", date:"31 Aug 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/fabrizio-romano-reveals-tottenham-are-looking-for-signing-number-10-after-iliman-ndiaye/"},
  {title:"REPORT: Tottenham’s Souza to be loaned to Porto - Cartilage Free Captain", source:"Google News", date:"31 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi1AFBVV95cUxOYklCMHRwaVdiZzI3UVNVRnRzc3RXcXJ4RTJ0c2d1MjlXc1l0Z3RGUEZkOFRLT2g2eFk2NVFnWnFoUi1obkp0bHhNU0RKV0lxTXhPaEcxREJRX21NNkh6aGlGTkJRU0dOWVdONldXSGNYdDdyeXdRcEY5dUZ6a3VveUFleUZ1d1c4NTE1RjFiaWtNS2lDeEFnWmNicVdLNE1EWG5NOHhYWWU0dEwwc3NKWjBaZDJaYXVjUmZvRTFiZXd3TDBtbGVlVFJEVGdGZEctTlNMRA?oc=5"},
  {title:"Worry for Tottenham as multiple sources report Iliman Ndiaye hijack possibility", source:"SpursWeb", date:"31 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/worry-for-tottenham-as-multiple-sources-report-iliman-ndiaye-hijack-possibility/"},
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
