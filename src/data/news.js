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
  {title:"&#039;I don’t know why Tottenham didn&#039;t want me&#039; - defender sheds light on Spurs exit", source:"SpursWeb", date:"23 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/i-dont-know-why-tottenham-didnt-want-me-luka-vuskovic-sheds-light-on-spurs-exit/"},
  {title:"Chelsea vs. Tottenham Hotspur Premier League Preview - Cartilage Free Captain", source:"Google News", date:"23 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiwAFBVV95cUxPX211c2thMlRaUE95d3N1S3RaeHFBVFUtLTJXdEFCVHptNmZrZzI3TVZHM1NsMGJYY1AyM0ZjQUhvcUQtYmd6WlpVZ1N1SEluQmludXVLNWZYcnliNU53dFQ4Nnh2V2QtSEg4M01HcnBSdkhsd0tVdUlwY0dwZVZDc3o3bFhkTTBVX3RXRVgwZUVVcHF4QlhZX3Vnc1F6SVoxS0N6SzZ1ZUdsLXNHLU9QRVJfclhGSHBKNmhRMzVUTjU?oc=5"},
  {title:"Official Spurs Website - Tottenham Hotspur", source:"Google News", date:"23 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiggFBVV95cUxPMVh2cDNOMkRscDJTdFVqbjdJT0xfeUczSTd4LTRXMTFMVDJCZUN4WEEzcUpYS2kzTTgzeEg0T1JzWHRpemNBek9FdWdiY05JWV95d2p6ZDVsVXVReGlqU0U0OWpxT2NJcHM1Z2hVWURBS21Cam9LMkktUVdBNXUxYkVB?oc=5"},
  {title:"Omar Marmoush needs to show his savvy if Tottenham want to upset Chelsea - LiveScore", source:"Google News", date:"23 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi2gFBVV95cUxQVm5vY0lkeWhod0lyR05Ya0E2dzlGV1g1cnozbmxwb2lEZ3NJSFdzN3NqMS1yOWdwVTJEQ1hJZ0xyU1ZoVFctTHBibXd6UklWTlVSUFJPdmJXRllMeFJsdXcyX2RSUndueF9YVVZrVG5DTUMzQmRZVktoNk5MV1VuZWttY1g5aFpucHE2bkNiU2NpTGNnYnRFUm5URFo0cWlwVE1UcVQ5SEVnMU50dVZ4eVY3QWZ1WE1iX0N3RTdDaVpLUkhjRU9NU3RlUzNaby1aRWZ0ZjhPSGJaUQ?oc=5"},
  {title:"Tottenham and Aston Villa enter battle for £75m-rated Brentford star after golden 2025/26", source:"SpursWeb", date:"23 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-and-aston-villa-enter-battle-for-igor-thiago-as-brentford-name-their-price/"},
  {title:"Tottenham react after best player decides to quit after losing faith in De Zerbi - TEAMtalk", source:"Google News", date:"23 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMivgFBVV95cUxPVHRCUXdjY0FYSVFQUXJPUnp4eHVpaWx6SXJEZ3NsRXdnRnJSMkJlMHZ5OS1EMmxMMkg0cHNNSVVQNzNzb2E3aG5sam1xek5FRktZdzh3MFpMcjE5cE1yX0pfQ0txQ1M0Mjc0RWEtWmI5YWZVNzlZNUEwVngtemkxUEdTckJKUlQwOUU2ekdWMTVoU3NtRDRmMWhwekpiUzhUQ0tfOEVoQm95dTJfMzJkOUFlU0tjTkFPRmZjdmJn?oc=5"},
  {title:"Roberto De Zerbi has three Tottenham left-back options – but each comes with a problem (opinion)", source:"SpursWeb", date:"23 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/tottenham-have-three-left-back-alternatives-for-chelsea-but-none-is-straightforward/"},
  {title:"Carrick prepares for final game in humiliation ritual as Spurs face Chelsea - Football365", source:"Google News", date:"23 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilwFBVV95cUxNQVhlM1gtZWlGNkp2WTd3cDk4RHhPZTF6SzRvbVQyemZXWE1GRk9BZnJJcjRKVUU1cTl6SDFwRmROZ0VIdDNzOW9QaVM2NG1WcjhtME1FYXhfRmxGYmRBOUV1dEdWQ3NqY2I5Q1FXRVROLTlHejEzc2VfLWVKSERrdVk4U09XUFp1blRtYU5VREY0ejE4bmVV?oc=5"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Friday, October 23 - Cartilage Free Captain", source:"Google News", date:"23 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi1wFBVV95cUxNdVZReFJWOFNwbnQwdkZqMTFiNU9UYTBWSWtlYmQyODhHcjdUTXdibkNLVXJyb3BtRTFBVl9WM1NOYXRZVVc4aUNkNWlEVHJVZ2JCYnRBcUQ4Z0JYWXBURno1YTVYaHJXQVJwSmdkazFTWV9VeDRxbGhMWUFvNXIwV1Z3S2ZJSDF4OU9rWTRPZl9pQ1d3bVpSelZlMXh1Q0ZJb1IzaEFzSnNaS3BRZUoxOC15TnZmdGtfc29yV0dvR0Z2MTg3aG5ESmRiUkN5VEprT1NoMnRobw?oc=5"},
  {title:"Tottenham wonderkid finally makes debut but another is recalled from loan - Football London", source:"Google News", date:"23 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxPT2EzTk1VWXJVY2wxdmdwU1ZHRzk0SXQwQ2F5SEdlOXpIejNlLTdDWEVtbU9TNDZZYWI4VmgxNmxDRU5hWEJISWpHSUI1QmhnOFRIclhBS1dLYmZ1dngwNWlLbGZtcm1ZR0E2NHd1enFGZTgtUERjci14b2dOcEUxR0dxTHdraHFKUWh3V1VRbndoZjUteUpVOEZDUDREMHB6WU5PZg?oc=5"},
  {title:"12 players could miss Chelsea vs Tottenham after double injury hint", source:"football.london", date:"23 Oct 2026", tag:"Injury", url:"https://www.football.london/chelsea-fc/players/chelsea-vs-tottenham-injury-news-34804802"},
  {title:"Five ways Tottenham could line up at Chelsea as Roberto De Zerbi faces left-back headache - Opinion", source:"SpursWeb", date:"22 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/five-ways-tottenham-could-line-up-at-chelsea-as-roberto-de-zerbi-faces-left-back-headache/"},
  {title:"Tottenham will have eye on Old Trafford on Sunday after Eli Junior Kroupi news", source:"SpursWeb", date:"22 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-will-have-eye-on-old-trafford-on-sunday-after-eli-junior-kroupi-news/"},
  {title:"Tottenham 2027/28 away kit leak reveals historic pink design for outfield players", source:"SpursWeb", date:"22 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-2027-28-away-kit-leak-reveals-historic-pink-design-for-outfield-players/"},
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
