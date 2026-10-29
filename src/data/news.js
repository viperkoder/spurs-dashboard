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
  {title:"Conor Gallagher actually makes sense at the 10 for Tottenham vs. Crystal Palace - LiveScore", source:"Google News", date:"29 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi4gFBVV95cUxNUUNvSXZXOGtaQUdvS0J5TXhVRHB3QUloelVMQWtqMWlSaWlfdldsb1Mwc2RjZk9aRkRHSlNpUWNSVWtXSF9NLU1VempUUkVNRC12VGM0cEhPMGFxVXpEZVZBOVhOWjBmeFJkblhEV1ZGMVJRT1hqRWRPRWpwYjlwS3NXQzBSdno4X0trbXJpVHVjYXRyYzN0bmlkdi0yVkt4UkViblZxNnRGNy1BSU0zS20xSjlBcmh4SVFOQXlYcWI2cFQzcXdOOWNZR3pDXzVUTUV6bmhIWDBDX2luZWpvRVpB?oc=5"},
  {title:"Cristian Romero says Tottenham have an &#039;incredible&#039; player who can reach the very top", source:"SpursWeb", date:"29 Oct 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/he-has-everything-cristian-romero-lauds-tottenhams-incredible-micky-van-de-ven/"},
  {title:"Jamie O'Hara thinks Tottenham Hotspur should have been built around Harry Kane - Sky Sports", source:"Google News", date:"29 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMixgFBVV95cUxPQUV3dExXOW9kWTJtVFZhYS15NkpYZ09zRzJsZXhUM1lQbjdfRHhVUUl5cjUwSEJ1d0hrNmNNODBUQ3VVWVhIZGoyM1JsRHNoU29vYXNid04zZ2F3SDNqaEc2U0JidjhOWnY5ZUxqaG95RWJCQktYVF83T2NQUkNYdFdfRm5Yam9PNk9MSmVYMDYwSEdDM1ByMFhWQzk2Q2RBY09hWjY5ZnRRN0JIb05LdkRRaGU2TG5YX2JJbmo3R1Q3bVlyY0E?oc=5"},
  {title:"Tottenham&#8217;s bizarre fixture data shows why they must take advantage of next five games", source:"SpursWeb", date:"29 Oct 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/tottenhams-bizarre-fixture-data-shows-why-they-must-take-advantage-of-next-five-games/"},
  {title:"Spurs Remembers - Tottenham Hotspur", source:"Google News", date:"29 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMinAFBVV95cUxPYkV3cUxZRmJrV3M3MUlPeXVEOUYxbjFKYWFOeHNsSXJtY0VaVFE5SUdUbUZjMXRWaU9JaExMZFNCUzFCVURoZW9URkdQdDNnZEMtX1JMU2pDd0RVSEZZX21nNDM3NFFKM2JRbWtucEQ3eUVGUmZ2TGI3SlRrOWNwQ0RCdXNXMDl3N3E4S0ZGSUxWMVBZemJTN0phamc?oc=5"},
  {title:"&#039;I&#039;m very optimistic&#039; - Bayern CEO makes Harry Kane contract claim amid Tottenham clause rumour", source:"SpursWeb", date:"29 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/bayern-ceo-reveals-harry-kane-is-close-to-new-contract-amid-tottenham-clause-rumour/"},
  {title:"Tottenham’s season has finally taken off. How far up the table can they go? - The Guardian", source:"Google News", date:"29 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMikwFBVV95cUxNc01PTjQ2RXJmbjAwMWNIN2FvbDV3RlBrX2NkQmI2VVdkUkV0aG1yczFEWVRsR1oxUTZZR2VKbWhYM05lcXotSFJXNGtjSllIWGFXT21SajJ5eW5HTkZMTER4MTk4VXQ5WFdKd0hnNkQ2VTFTTTZaNkJiYzk0dHFGdlc1N181MzI3WmJSMGJpZllzT3M?oc=5"},
  {title:"Double boost for Roberto De Zerbi amid updates on SEVEN injured Tottenham stars - TEAMtalk", source:"Google News", date:"29 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiqgFBVV95cUxNR1BKWVM4TjdLbUowNjdmV3JTS2NzYkZycExHczF3ZVJ0bFRfdG1JNGkxdWI0b2JDZWxqWUIxMnFMRGVrc3I3NWE1cVJXeVNfbFQxdXhZRmp6NFhidUp1bnplYm1UajVBU2ZBVTdLSlh6NVBSaGExTGl1N3gwdXFsTDRGRnVsXzlvNUg3dmdiN0EtRWhlbGU0Wk4wZkdwTW5VOUNsR3UtZkFfQQ?oc=5"},
  {title:"The £18m bargain transfer Tottenham refused to sanction and Patrick Vieira U-turn", source:"football.london", date:"29 Oct 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/patrick-vieira-eden-hazard-transfers-34831181"},
  {title:"Six Tottenham players guaranteed to miss Crystal Palace amid potential double injury boost - Football London", source:"Google News", date:"29 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiogFBVV95cUxOOWh6d1VkaHZIS2JUaWprdVJ4aGhEUXM4dkxjUjdXaUNjSHI3WXVkcjR3MmdQZENRX3JnN3AyMFZlbjBRRHpXbEllclltQmNURFY5WGx3ZWlvRmJLMFAtaFE5VHltSzhkTHYxdl9UQW55aURKMG5sNWw2bVNLbU5lXzk0eXNaSE1iY1FVUEZBQjR5ZU9fUXIyVmN1dWZ1Nkc1cFE?oc=5"},
  {title:"Crystal Palace without five players for trip to Tottenham, Spurs could miss nine", source:"SpursWeb", date:"28 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/crystal-palace-without-five-players-for-trip-to-tottenham-spurs-could-miss-nine/"},
  {title:"Tottenham scouts keep an eye on La Liga striker with 12 goals in 22 international matches", source:"SpursWeb", date:"28 Oct 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/tottenham-scouts-keep-an-eye-on-orri-oskarsson-after-red-hot-real-sociedad-form/"},
  {title:"Five questions we expect Roberto De Zerbi to answer ahead of Tottenham vs Crystal Palace", source:"SpursWeb", date:"28 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-questions-we-expect-roberto-de-zerbi-to-answer-ahead-of-tottenham-vs-crystal-palace/"},
  {title:"Tottenham shoot up Opta power rankings after Chelsea win, above Man United", source:"SpursWeb", date:"28 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-shoot-up-opta-power-rankings-after-chelsea-win-above-man-united/"},
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
