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
  {title:"Roberto De Zerbi could use his Brescia links again to bring Inter Milan striker to Tottenham", source:"SpursWeb", date:"23 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-add-pio-esposito-and-samu-aghehowa-to-january-striker-shortlist/"},
  {title:"Jorge Mendes tells Tottenham how much Alejandro Balde will cost them in 2027", source:"SpursWeb", date:"23 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jorge-mendes-tells-tottenham-how-much-alejandro-balde-will-cost-them-in-2027/"},
  {title:"The key man Tottenham wonderkid Luca Williams-Barnett went to find after Roberto De Zerbi joke", source:"football.london", date:"23 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/key-man-tottenham-wonderkid-luca-34955178"},
  {title:"Tottenham suffer Gustavo Varela transfer twist as Liverpool burst into the race", source:"SpursWeb", date:"23 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-suffer-gustavo-varela-transfer-twist-as-liverpool-burst-into-the-race/"},
  {title:"Tottenham and Chelsea force Leeds to jump into action over £2.9m midfielder", source:"SpursWeb", date:"23 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/leeds-jump-into-action-as-tottenham-and-chelsea-show-interest-in-ao-tanaka/"},
  {title:"Tottenham no longer front-runners for Kevin Schade, but Antonio Nusa could change things", source:"SpursWeb", date:"23 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-no-longer-front-runners-for-kevin-schade-but-antonio-nusa-could-change-things/"},
  {title:"Tottenham Hotspur Stadium included as candidate host venue for FIFA Women’s World Cup 2035 - Tottenham Hotspur", source:"Google News", date:"23 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi0AFBVV95cUxOTEFIMVgtZk4zN2xJRHZsb3hqaUpzVDJ2bG4zYVVVTVJLSFQzdTRtYzQyaXV5S1o4cVFDdmpQNk04UzBGVVpkSE9SNlFTTzJYbTcyUFNrUDdDUmFjb2IzekZKVHJPY2FIQnd2bFNXU0J3SVkyOUR6SEtQanJSQ0NJNE9vSTJZUHI5aW1TSE1hQWZGbV9kWWJfbnIxRG0xWmc1WFVDRGdtQUQ2Z25yR3BYcUVhd2I5RmQ3NHllc184NV9HeXJuMEpzTm1CMm1DcDdH?oc=5"},
  {title:"Fabrizio Romano reveals what Tottenham have to do to win Gustavo Varela race", source:"SpursWeb", date:"23 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/fabrizio-romano-confirms-tottenham-interest-in-gustavo-varela-after-nine-goals-in-10-games/"},
  {title:"‘I don’t think I’ll stay in football much longer’ – Roberto De Zerbi opens up on his future - Spurs Web", source:"Google News", date:"23 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMixwFBVV95cUxNVjYtRjZvcGpwQi1IdTRfNnUtNVBPZEJHel9CY3lyOVRtUUFtc0JNbzV3bnJlUF9qbFJicGdtOGRubXdjeUFaRmhZUUswa3hrLXB3TVZ0N3FlckkxSUREeEhocXR5ZDdTclFEUlY1ZUJfU045UExXUzNBNEw1R1lrN3pDWENjUE9aWjYxclp2MUlxVlhJUXdFeVdQUFd6ODR0aUFpajhLQWVqQUFQLXB3WExpa1J6dzA0SFNVbVN6RW81em9KYVQ4?oc=5"},
  {title:"Juventus ready attempt to sign Tottenham star as top January target after he started vs Ipswich", source:"SpursWeb", date:"23 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/juventus-ready-attempt-to-sign-tottenhams-destiny-udogie-as-top-january-target/"},
  {title:"James Maddison&apos;s five-word joke as Luca Williams-Barnett Tottenham change confirmed", source:"football.london", date:"23 Nov 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/james-maddisons-six-word-joke-34953850"},
  {title:"&#8216;Tottenham&#8217;s James Maddison is better than £116m midfielder&#8217; says Alan Pardew", source:"SpursWeb", date:"23 Nov 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/tottenhams-james-maddison-is-better-than-116m-midfielder-says-alan-pardew/"},
  {title:"Tottenham fans will love what Ryan Mason just said about Luca Williams-Barnett", source:"SpursWeb", date:"23 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-will-love-what-ryan-mason-just-said-about-luca-williams-barnett/"},
  {title:"WSL talking points: Captain Spence inspires Spurs shock win at City and Lionesses impress - The Guardian", source:"Google News", date:"23 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxNUnRPeDB1OEpBampjemVpeTExazltSEp2d1ViU3h1X0w0NVRidUYzUWtjVTA4bVdZQUxSUWdNTTlVZUNyRF9fWXRJVlVYbUNiMERlcjNTb001djYwQnN4YXkycklBalFPRV9SQ0FPYTQzSUx4OFJrU0pCS2ZfXzVQeUdZNTJwb2ZhMmJJVnQxbUp6b1JMbE5jQ1BWUDNhWjBqalhIN1huWlJfanpfY3VjWXRNdnJJZw?oc=5"},
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
