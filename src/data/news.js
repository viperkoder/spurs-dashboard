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
  {title:"Leeds United v Tottenham Hotspur: Premier League – live - The Guardian", source:"Google News", date:"07 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiqgFBVV95cUxQemkzUzlPbzRKQVA1eDZwUDRXcUJGa3dqXzdYdV8yNnQxZjBPOFVNMTc5N1dSMnUxdW9ybzl4Q2M1am9kV1pucVAtU2p0Vm1HVGExWk82ak02ZFhqbTZQbE9rTWF3cmhwLUVaWXN5Ykc1d2UzOHRrcFF3cXRiT2VoU1dpdU14YjdITEpDQnE2MWI2MURqT01zb3p0V2VoYV9CSTJwcWNjd2FEUQ?oc=5"},
  {title:"Gabriel Gudmundsson on Leeds United's preparations for Tottenham Hotspur challenges - Leeds United | Official Website - Leeds United", source:"Google News", date:"07 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiugFBVV95cUxOZGJ2MTA4Z2xWRjZvaHI5ZmFDT1RfRVhnTktvQk5NTGdVZTd0R2JKSDVUOXA4Z25mdV9PTHBfYXZBVzViUl9xenlUalpOaU91anREZFJGZ1g5M1RnWVp2eC1DalBFc0dKQkR6RFdXMk11cU5MMW5RU0dPWnVYdHpKaEMxS2phR1g3SVc5UWR6VGhxWnMzVGw4elhFUkFrMkRTT0ZhaU5YaWtjMkRJSkhCUmJ5dDJDV1lxZXc?oc=5"},
  {title:"Confirmed Tottenham team news vs Leeds as De Zerbi makes Pedro Porro decision", source:"SpursWeb", date:"07 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/confirmed-tottenham-team-news-vs-leeds-as-de-zerbi-makes-pedro-porro-decision/"},
  {title:"Tottenham make one change vs Leeds United as Luca Williams-Barnett decision confirmed", source:"football.london", date:"07 Nov 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-make-one-change-vs-34877651"},
  {title:"‘Suffering’ - Sandro Tonali honest about life at Spurs after Newcastle United exit - NewcastleWorld", source:"Google News", date:"07 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiqgFBVV95cUxQX1BIN3lid0xEN2pkaEtPLWRibTRDWERQcEZJV0RLaEpPbEE0U04wVHV0aDROalVYZ21TN2pwcVFaY21OYlVhSE1DR3dfcHRDcXY3ZDF0RkpwZE0wQ0VJVXJrbzJUN29ESkdNd003R3pONWdudHN2aFFzLVJ3a0VmLVlaVVpMd0hxYmxlV0UyYzc3aUpCaGhDNFI2TzhPSnZmcFpaelZtcmxMUQ?oc=5"},
  {title:"Leeds United vs Tottenham Hotspur: Premier League preview, team news, stats &amp; head-to-head - BBC", source:"Google News", date:"07 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE41bGtZYXJvX21TbFBVcWw5eDhRUnpoVG9UR3hZbnp1TkNRVHBCTk15eGdxVDlKZVRpdHdKR3dOMDgzNlJ6VkJIRXZ6Zi1lY0NQTDRwQllHQmd2UmxoQUg1TnZZT1ZjQQ?oc=5"},
  {title:"Leeds vs Tottenham LIVE!", source:"Sky Sports Spurs", date:"07 Nov 2026", tag:"Club", url:"https://www.skysports.com/football/leeds-united-vs-tottenham-hotspur/live/559540"},
  {title:"Confirmed line-ups: Leeds vs Spurs - Tottenham Hotspur", source:"Google News", date:"07 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxQVDBNMmJIUnNEQ0NPaTlMRm0tSjdmMl9CeHpfX3J4VWZxQWdKTHZVNjdEazZ2U0pCLTVKT1dxNEhtWmVZMmE5VTgwaXRTZ09kbFVfdzZnZEl6eXJGYlNSTHQtSGVFQ25GSzZaajJCemY2UjN4OUQ4MmlTZUUtM3d1V3BiSWZFekdiU1cyOGtwQTQwa1hSamxPVk5xQ2pwbkhZNnQzYzNUOGZ4RW1WdnJ1WXpXaHV4Zw?oc=5"},
  {title:"&#8216;Feel valued&#8217; &#8211; Andy Robertson on his mission to get Tottenham back where they belong", source:"SpursWeb", date:"07 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/feel-valued-andy-robertson-on-his-mission-to-get-tottenham-back-where-they-belong/"},
  {title:"James Maddison reveals how Tottenham squad reacted to Postecoglou&#8217;s second-season promise", source:"SpursWeb", date:"07 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/james-maddison-reveals-how-tottenham-squad-reacted-to-postecoglous-second-season-promise/"},
  {title:"'Not too many teams in the world' - Tottenham Hotspur boss Roberto De Zerbi highlights Leeds United threat - Yorkshire Post", source:"Google News", date:"07 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxPOGQ0QWFpaUhQLV84Q2RVdFE5VGlUMnRodzg2QlloRDB0RzlJTWhIc0lxeUxZclRZamtBRG1RRlc1X1NqdjhMb0Rtc2FzcU8tWW16ZW55SmVGMkg0U2w5cGVpcWp3ZFlZbVM1MXFiSEhqYXFNS3J4RlY4aklXQWF2U0hEYXZFQ0xicGIybUlaaXYwUVpQNVhSTTM4ekVybUo0Z0ZtQg?oc=5"},
  {title:"Liverpool Hold Talks Over Signing Top Man Utd and Tottenham Transfer Target - GiveMeSport", source:"Google News", date:"07 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMimwFBVV95cUxOQUVfWkhqOTRzY1VxS2xIc0xYX3p2ak16b0pkbElfRjRsOGdCUE9GMWxLMWh5eF9wNEljNU5ZaDFIdVpuVGRWOW93akJIaXl3eERCUDhDRWs2MUNQNF9UZmJrNmVYa2YzUnNDbXF1SVBOQVNTV210dDVMRWFmTlV3WGZnTnNkaVkxZXVuQ1NxZ25WZFNZRzBETHpWSQ?oc=5"},
  {title:"Tottenham predicted line-up vs Leeds with two changes and Luca Williams-Barnett decision", source:"football.london", date:"07 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/spurs-predicted-team-leeds-united-34874267"},
  {title:"I was homesick after taking pay cut to join Tottenham from Leeds – but I never wanted to leave", source:"football.london", date:"07 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hotspur-leeds-transfer-lennon-34860483"},
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
