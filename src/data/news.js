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
  {title:"Mateus Fernandes snubbed from Team of the Week but one Tottenham star makes it", source:"SpursWeb", date:"26 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-mathys-tel-makes-troy-deeneys-team-of-the-week-but-mateus-fernandes-overlooked-despite-chelsea-heroics/"},
  {title:"Chelsea sent Cole Palmer red card verdict after Spurs ref review - &apos;know what he&apos;s doing&apos;", source:"football.london", date:"26 Oct 2026", tag:"Club", url:"https://www.football.london/chelsea-fc/news/cole-palmer-chelsea-red-card-34817025"},
  {title:"Forget just Cole Palmer, Chelsea should have been down to 9 men vs Tottenham &#8211; Gary Neville", source:"SpursWeb", date:"26 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/forget-just-cole-palmer-chelsea-should-have-been-down-to-9-men-vs-tottenham-gary-neville/"},
  {title:"&#039;Beat the top teams&#039; - Mateus Fernandes just sent a huge warning to Tottenham&#039;s rivals", source:"SpursWeb", date:"26 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/we-are-here-to-change-tottenhams-mentality-and-beat-the-top-teams-mateus-fernandes/"},
  {title:"Mathys Tel must do two things to mature from a mere Tottenham &#8216;talent&#8217; &#8211; Roberto De Zerbi", source:"SpursWeb", date:"26 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/mathys-tel-must-do-two-things-to-mature-from-a-mere-tottenham-talent-roberto-de-zerbi/"},
  {title:"Mauricio Pochettino&apos;s statement on Harry Kane and Ballon d&apos;Or speaks volumes of Tottenham legend", source:"football.london", date:"26 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/mauricio-pochettinos-statement-harry-kane-34815384"},
  {title:"The Tottenham boost Roberto De Zerbi must not waste in the next five days", source:"football.london", date:"26 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-boost-roberto-de-zerbi-34809805"},
  {title:"Tottenham injury update: Maddison, Udogie, Savio latest return dates - London Evening Standard", source:"Google News", date:"26 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMixAFBVV95cUxNVHJ5eDN2RXV3YURZLUZ0U0JVQ3pMUFNwcHp0ZmlXbGV6WFVvNXJLZEM1dEZnSTlzTHpJR3lFTTFtYnVUc2E1eTZNQk81TjhZQjFLSlFqZWtNZTRFQ010aTdHOTVMRXlKclZOU0tQZ0FnTVJhM21oMThwOW93T2pOS2pIc2d2a21WZVY3dzBjVjNEajY4QlFWNHlUZjdMVG1pdVBMQlpxdFdaZ1AydXZzSTVrS25lWXJZZ0hnUWhWZkdtT01t?oc=5"},
  {title:"Tottenham consider £70m Chelsea star as a potential Pedro Porro replacement", source:"SpursWeb", date:"25 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-monitor-chelseas-70m-malo-gusto-as-potential-pedro-porro-replacement/"},
  {title:"Chelsea, Barcelona and Bayern Munich all fight to pounce on Tottenham&#039;s £50m mistake", source:"SpursWeb", date:"25 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-50m-luka-vuskovic-blunder-chelsea-barcelona-and-bayern-munich-enter-race/"},
  {title:"Tottenham are relaxed as Barcelona and Real Madrid eye world-record Pedro Porro deal", source:"SpursWeb", date:"25 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/world-record-pedro-porro-transfer-tottenham-relaxed-as-barcelona-and-real-madrid-chase/"},
  {title:"Köln boss reveals what Tottenham&#8217;s Mikey Moore must do to rediscover goalscoring form", source:"SpursWeb", date:"25 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/koln-boss-reveals-what-tottenhams-mikey-moore-must-do-to-rediscover-goalscoring-form/"},
  {title:"Tottenham may be open to £43m sale of senior star as injury struggles continue", source:"SpursWeb", date:"25 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-may-be-open-to-43m-destiny-udogie-sale-as-injury-struggles-continue/"},
  {title:"Tottenham's best option for replacing James Maddison involves a major position change - Hotspur HQ", source:"Google News", date:"25 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMivAFBVV95cUxOeXU2a0s4TnlvWHlES3J5WVIyaFRxb201WU9VRXBvOE9taWV6cnY5QVhVU3Rrc1ZUMHZwZmNVd3p0RDQxY1Rwak9oYU9BVW1iRXduemgyaHJWTWk1akVXWmFTRzlscGREUTB6YmR1TzFCS0g1aE1VSkxCM2JDbUNkMjFaYUJuTDM4YlJNUHNlOXJNa3lkZ2hvQVoxQWRmZmp2VTFkUm1XZjBKaFJVWDJlVGdObEFsTURBdDdaUQ?oc=5"},
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
