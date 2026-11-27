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
  {title:"Spurs' Savio to miss festive fixtures after injury setback", source:"BBC Sport Spurs", date:"27 Nov 2026", tag:"Fixtures", url:"https://www.bbc.co.uk/sport/football/articles/cw4gnm4p3zxlo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Savio: Tottenham winger set to miss Christmas fixtures after injury setback - BBC", source:"Google News", date:"27 Nov 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMiaEFVX3lxTE9RQ2pveS1FenE0RUREOE1YMW1sRmxzcXJQUEhqaUZnOWtwMlQ5TVlhaUdfcVRqekVXeHRKeVVMeV9weV9ENnlxaXVPdFFxdGtfdUlKaDZ6UU1Ta2JpS3ZZcjNJSlVJUEE5?oc=5"},
  {title:"Roberto De Zerbi tells Luca Williams-Barnett to learn from four Tottenham stars", source:"SpursWeb", date:"27 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-gives-luca-williams-barnett-update-ahead-of-sunderland-tottenham/"},
  {title:"Tottenham: Roberto De Zerbi confirms new Dejan Kulusevski plan ahead of Sunderland trip - Yahoo Sports", source:"Google News", date:"27 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMikAFBVV95cUxPTmJUOTE5WE13R216Ry1OTmdjWUQ2TUlRYUlpcEdPY21iQjhnaGozeEo1a2s4ZVVDZEFEZ0ZLcGxkX0tBUzVpbGJPT2JtdkROOUxhRDNQcUt0dmVBLV96S1dGYnZ5YWhEWDJMaERJMGgwMU5iN2doSlhnWTRkVDhBa1pZZE9EbE4wdXpNRTQ3OU8?oc=5"},
  {title:"Every word De Zerbi said on the special thing Tottenham did with Luca Williams-Barnett", source:"football.london", date:"27 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/players/de-zerbi-luca-williams-barnett-34976558"},
  {title:"&#8217;50, 60, 80 days&#8217; &#8211; Roberto De Zerbi&#8217;s latest Savio update will worry Tottenham fans", source:"SpursWeb", date:"27 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/50-60-80-days-roberto-de-zerbis-latest-savio-update-will-worry-tottenham-fans/"},
  {title:"Team news | Roberto’s update on Savio - Tottenham Hotspur", source:"Google News", date:"27 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMihwFBVV95cUxOcThTNzdFeHBOeDJwQ1ZQcDU5OURjMS0xREtwYTFZWWdySnlIdUZUeGZhdGxDYms1N0x1VzZtMkJ5ZHVNMWkySDYwUUxweHMzaEZxMjBxMUQyWjRJOW9ueFFrRlZ0V2lBWnVVdGJMMmNJS0xmZGdHWEd4MmRWZnkwbmVzTkwyNmc?oc=5"},
  {title:"Dejan Kulusevski is close to first Tottenham start in 19 months, says Roberto De Zerbi", source:"SpursWeb", date:"27 Nov 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/dejan-kulusevski-is-close-to-first-tottenham-start-in-19-months-says-roberto-de-zerbi/"},
  {title:"Regis le Bris press conference: Sunderland vs Tottenham Hotspur - BBC", source:"Google News", date:"27 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMia0FVX3lxTE9teEgtc0RXblNVN2RUSllKa2RYdnFhUTMyNk54UDdmWVk0UU1yZk16VjA3MEw5SUJRdDktX3FNSl9qbFZncml5Qng3Wm9iV1NvYkRxdG5tTGwwQjJEaUhkVlZTTjZhM2tmUVJ3?oc=5"},
  {title:"Tottenham press conference LIVE - Roberto De Zerbi on Savio injury, Maddison and Williams-Barnett", source:"football.london", date:"27 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-press-conference-live-savio-34974633"},
  {title:"Roberto De Zerbi provides Tottenham injury update, awful news on Savio return", source:"SpursWeb", date:"27 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-provides-tottenham-injury-update-awful-news-on-savio-return/"},
  {title:"Roberto De Zerbi confirms huge Savio injury blow in four-player Tottenham update for Sunderland", source:"football.london", date:"27 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hotspur-injury-news-sunderland-34974885"},
  {title:"&#8216;They never called me&#8217; &#8211; Luka Vuskovic makes damning claim about four Tottenham managers", source:"SpursWeb", date:"27 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/they-never-called-me-luka-vuskovic-makes-damning-claim-about-four-tottenham-managers/"},
  {title:"'They never called me' - Luka Vuskovic makes damning claim about four Tottenham managers - Spurs Web", source:"Google News", date:"27 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMivwFBVV95cUxQbTZFUnMwMWJMTG1lQVJyMEVsV3B3ekVVOHg2WUxwd2c2c3lKTE1vY0tnVm0tZmtDekQ3bVdINUxHM19QUXZaVWJpV3paUktNeTFQZWhfVjR1Q3psOHpvNmhzN1kxWnlkLV9lMmViR0ZlTkpINDIxS3FaZmpBNVhrblZMVjRJSDBJRVFVZnEzSElrWk8wV1NPOTU1V1RNTElhVDAtcG93Zk03RnlmRkJSR1BRbmIzVXFPNFVQRG1udw?oc=5"},
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
