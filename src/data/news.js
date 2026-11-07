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
  {title:"Okafor the difference despite Van Hecke defiance - Leeds v Spurs ratings", source:"BBC Sport Spurs", date:"07 Nov 2026", tag:"Club", url:"https://www.bbc.co.uk/sport/football/articles/cq70p2w3j00jo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Tottenham player ratings from 1-0 defeat to Leeds United as 3/10 star struggles", source:"SpursWeb", date:"07 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-player-ratings-from-1-0-defeat-to-leeds-united-as-3-10-star-struggles/"},
  {title:"Tottenham player ratings vs Leeds as 3/10 flops but Luca Williams-Barnett makes impact", source:"football.london", date:"07 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-player-ratings-vs-leeds-34877789"},
  {title:"Leeds 1-0 Tottenham: Noah Okafor downs Tottenham to earn Leeds first win since September - BBC", source:"Google News", date:"07 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE41bGtZYXJvX21TbFBVcWw5eDhRUnpoVG9UR3hZbnp1TkNRVHBCTk15eGdxVDlKZVRpdHdKR3dOMDgzNlJ6VkJIRXZ6Zi1lY0NQTDRwQllHQmd2UmxoQUg1TnZZT1ZjQQ?oc=5"},
  {title:"VAR explains why Leeds escaped red card vs Tottenham as Roberto De Zerbi left furious", source:"football.london", date:"07 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hotspur-spurs-leeds-united-34878323"},
  {title:"Tottenham first-half player ratings vs Leeds United &#8211; 6/10 for defender who must improve", source:"SpursWeb", date:"07 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/tottenham-first-half-player-ratings-vs-leeds-united-6-10-for-defender-who-must-improve/"},
  {title:"Leeds United halt Tottenham’s revival after Jayden Bogle escapes red card - The Telegraph", source:"Google News", date:"07 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirAFBVV95cUxNSUN3WkVNN2MzSnFWNjY4TWdEVkg5UW5WU2h3a2xndW5aVXl3MmhmQWhXbDlocWxQUWI1bFVMZmVtdS1VUXVBdVM2aHFXbnFKb1ZIUk51TXI1NGNUOWFuVlZJTEVfcHZZU1hxZTA5ck5OM0t1N0h3cno5Z3NfM0NVbEwzS0JXRnc0MW5XRmdRMmdsOGVHZTNKOG02a0ozWkpLYmQ0dEdFUlFoNXMz?oc=5"},
  {title:"Gabriel Gudmundsson on Leeds United's preparations for Tottenham Hotspur challenges - Leeds United | Official Website - Leeds United", source:"Google News", date:"07 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiugFBVV95cUxOZGJ2MTA4Z2xWRjZvaHI5ZmFDT1RfRVhnTktvQk5NTGdVZTd0R2JKSDVUOXA4Z25mdV9PTHBfYXZBVzViUl9xenlUalpOaU91anREZFJGZ1g5M1RnWVp2eC1DalBFc0dKQkR6RFdXMk11cU5MMW5RU0dPWnVYdHpKaEMxS2phR1g3SVc5UWR6VGhxWnMzVGw4elhFUkFrMkRTT0ZhaU5YaWtjMkRJSkhCUmJ5dDJDV1lxZXc?oc=5"},
  {title:"Confirmed Tottenham team news vs Leeds as De Zerbi makes Pedro Porro decision", source:"SpursWeb", date:"07 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/confirmed-tottenham-team-news-vs-leeds-as-de-zerbi-makes-pedro-porro-decision/"},
  {title:"Tottenham make one change vs Leeds United as Luca Williams-Barnett decision confirmed", source:"football.london", date:"07 Nov 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-make-one-change-vs-34877651"},
  {title:"Two changes and pair return from injury as Farke reveals XI to face Tottenham Hotspur - Leeds United | Official Website - Leeds United", source:"Google News", date:"07 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMivgFBVV95cUxQc09kRlNwdEdUYzU0ZWRWY29LNThuME80VnF1elN0UW9UZEpFZHRaMjhtZjZlVEw3QVdJdnR5VjNWRWZReU1Nd3ozX2o4Mkcya1BDMUk1QUsyby0zMXRGUlJhYmdncTVlTThOMk1RZHBVbXpUamtQOGs0eUdZSFpxb2w0eWdUbWF6SC0tY2NpbmN1dGJ3cGxla2lFMzgwLW5BZnVaNWNwbzN0REZJbXNIdGJreTFVT1E0YmRiMzBB?oc=5"},
  {title:"Tottenham XI vs Leeds: Starting lineup and confirmed team news - London Evening Standard", source:"Google News", date:"07 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi6AFBVV95cUxPeU16V2tvRFNNVzV1OW0zWEtGd05lZk1ZcDVRaEptMV9fdllJNE9VWGZhSWFzaDZGeVVYRUkzN3dqMDMzWjhWdHFPNGtGbUwwQVEwc3c5UTk4X3RlX0EybzRNSzQtUHNZa3FfMFU2VkV1SklpNi1lWmczOFI1X1BsaXZwdktra1pjS3Q5aGpsUUdfSG10RmtvWFNjeDBkZDQ0blh6ODhiOFUtajNoaml2bl9reUgyS0RrYnIwQXpvLUhUWTZGclQtcHVzeUxjbzY5bTMwMDVQNkJLd280MzcwWlhfNGptUzNy?oc=5"},
  {title:"Leeds vs Tottenham LIVE! Premier League updates, news, prediction and line-ups - Sky Sports", source:"Google News", date:"07 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiyAFBVV95cUxNSV9ZOW5WRTlDNEVSQ3FmOG0yMnVzLUhLcGQySllHejlNYmowaE5SRmlIdjlBa3VEd1lWWUJjWWNBZDgxTGxzOG1GVzVsZDhVUHBfc2REclE0QVFOdjVSMWNrY3piQnhVUkxrT1lvYzV1eVZXR1lpUDBGRExKcEE4cUp6RnRiN0NndDJ6aFN5WkRUWm1tVDIwWldJcF9FTWo3WVFKOGpCakFBN3ZBNlZYSUt2LUowZjA1WUJXNUtYaHNJTFdKY3I1MQ?oc=5"},
  {title:"Leeds United 1-0 Tottenham Hotspur: Premier League – live - The Guardian", source:"Google News", date:"07 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi4AFBVV95cUxPeU1qczBUSTM1QzZuQTBuQWc3Q21MWmxldjNmck1zbmFaaFpZOWlwY2JFaWdZd1hCUUtsbE10RlAyUU5GaW9iNFJUNDVjWlpic09FVmMwV3VnU2x4UWZLWnlScmdMTUcwSjkzWjBMdG5aMXkwaEpVdklrbmItTjdva0Rvc1RfS0lsczFJNjh5cHUyZFVjd1dNYVpOa2VsUlRHMDJ3T24zU05hZUM3M2xSVC1Zb0tZRmdRVkw5VV9rdHdyLXFiSDJOZ21VZWFMYVZOREk4dlFYemxqbFNDU1YyZg?oc=5"},
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
