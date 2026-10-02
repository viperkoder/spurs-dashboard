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
  {title:"Vinai Venkatesham issues warning to fans about state of Tottenham&#8217;s finances", source:"SpursWeb", date:"02 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/vinai-venkatesham-issues-warning-to-fans-about-state-of-tottenhams-finances/"},
  {title:"Tottenham gifted golden chance to sign ex-Chelsea duo to derail Lampard’s spectacular reunion - LiveScore", source:"Google News", date:"02 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi8gFBVV95cUxPMWRrTm03dXlaeVByNG5nTXZPX1plQzdsYVZueEtvZWxqM0F0TjdSdW0yN0c0S1hwbHlSRmFrSExIeE0xWl9GV3NVc1dXTmM2YVZCOFd4NVVDWGpfZnQ3UVlNSU5ITC12WVRqUERZWTJsWVl2cVVNMGNZQnhCcVUtN0ZqTDNwT0JEWnMxNzVXRFlnUGFFVmtfaWh3Q3A0andPNVRfZXpOaXYxR3o2cko1dUtLd3RzdllsZEo3SzFEN3NjVkZyaHZubWZYUjJIdnVtOGphcmppM0dSS29IelQ5bGtiZ1NkeG1EN0NsV0d1cFpEZw?oc=5"},
  {title:"Tottenham provide update on statue project, but a club museum is too &#8216;expensive&#8217;", source:"SpursWeb", date:"02 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-provide-update-on-statue-project-but-a-club-museum-is-too-expensive/"},
  {title:"Tottenham and Barcelona target just made senior Brazil debut as January race commences", source:"SpursWeb", date:"02 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/arthur-dias-transfer-update-tottenham-watch-on-as-centre-back-makes-brazil-debut/"},
  {title:"Tottenham are approaching a big decision over Dejan Kulusevski contract talks", source:"SpursWeb", date:"02 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-happy-to-discuss-new-dejan-kulusevski-contract-under-one-condition/"},
  {title:"Tottenham rue Troy Parrott transfer decision that could have solved Roberto De Zerbi problem", source:"football.london", date:"02 Oct 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-rue-troy-parrott-transfer-34705221"},
  {title:"Tottenham explain five steps they have taken to avoid another injury crisis", source:"SpursWeb", date:"02 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-explain-five-steps-they-have-taken-to-avoid-another-injury-crisis/"},
  {title:"Real Madrid legend Roberto Carlos makes big statement about Tottenham wonderkid", source:"football.london", date:"02 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/real-madrid-legend-roberto-carlos-34705791"},
  {title:"Vinai Venkatesham reveals next five areas of focus to grow Tottenham Hotspur", source:"SpursWeb", date:"02 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/vinai-venkatesham-reveals-next-five-areas-of-focus-to-grow-tottenham-hotspur/"},
  {title:"5Q | Reshmin Chowdhury: “Spurs – it’s just part of your identity, isn’t it?” - Tottenham Hotspur", source:"Google News", date:"02 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMisAFBVV95cUxPcXU3NlRZMk1DVmdLeFFJd09CSDBHbV9OajM5YWJ4LWU3WVk5ZzlMNF9MVWpuLW1EM1RjenQwRy12cW1RdXVCdXd0UENaR0FYSTExYzVMREFCcjkxR1B4RDh4TTJJNXlJVTduRWEyb3FLNVQ1TndvVzNYREtCUHE0MUVHUVB2VUNKTGhXcFpwSERfYXlJUnIxZnIxMl95TnhTb2xkTkZETl9Nai0yZnVsMw?oc=5"},
  {title:"&#8216;He looks delighted&#8217; &#8211; Tottenham fans all say same thing about shock Richarlison appearance", source:"SpursWeb", date:"02 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/he-looks-delighted-tottenham-fans-all-say-same-thing-about-shock-richarlison-appearance/"},
  {title:"Tottenham CEO issues public statement regarding De Zerbi after nightmare start - caughtoffside.com", source:"Google News", date:"02 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMikgFBVV95cUxOYVJYMUo1RkVxSVotc3BleWFsMXRPQWFXTmlsdTVZZkZueXM1aWZfYUY0MTFMeWczRFJGcUlnMEJsYkZydUlaaWplSFozbGRmbm0xM1I2YkhzbE1BMmp0UWhiRTJ5UHJ5SHZEQWF2bkdmTlBHTVBXcGFBUXZpOHBZQV9kWW9Dcnp1YkhOd1l3NmtxQdIBlwFBVV95cUxQQjNqcG1UTi1mYk1rdXdpLTRwTHhsMnNmemtBSGZieGxYenVRU2l2NmtQTUdaMnczTWZoaktueXZlaS04b0xRY3RITW9kS2pXczBib0tJY0FtcUExSEwweXhwS19Pb2FFVjhjNUdsOWc3eXZDbHlzcmo3bG93bWN5OVFjOGx6M3RhWjFQazR3bTBpTlhqQlNv?oc=5"},
  {title:"Tottenham Hotspur Daily News Roundup - LiveScore", source:"Google News", date:"02 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiuAFBVV95cUxOOXNXeXRpdU8wQUgyZVNEUC12aS1CcnZwSnZlcEcyMG9MRXRkandQM3IxWFRzVlFTNFJaYjhFWjJRWkRzWDJJazVaanc5aDdKNDJCc3E3VVpJb0EtQnEyZzhyRF9KUlFZRm1nd2t0UXlUWFEwdEVtZ0UyeWNydHE1THV4TzFNU25SNWJ2Z1Z2ZlQ1VFdaUDhNcEZFSEdCbGRSZlNFdjZWZXBrTzg0M1VNQU5MRzAzQm9X?oc=5"},
  {title:"Dejan Kulusevski drops hint of new role - Five things spotted in Tottenham training - Football London", source:"Google News", date:"02 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimgFBVV95cUxNY3FwNWN1Q2c3ZzV4ZVpBT0k0cFFxQzR0dTRHZ3AtZ3R3YXR0TjJKYThSWmNKdWkwLWxwalo4VmRxUzV1WjdHMk5yUHpLcEUwR2V1dXdzWjdrWG1VLXlfNW5GUERpZ0F0VlJnTlVvbnFSZmJjMU1Yc2ZwMlBnTUdGRVh3ZTZkeXhTbzE1TVQyam9WMkVZTVhKUGRn?oc=5"},
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
