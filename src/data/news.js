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
  {title:"Exeter City vs Spurs U21 | Full Match | 2026/27 - Tottenham Hotspur", source:"Google News", date:"09 Sept 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxNd3AxRnNHYTZ6N2JjUWpiTTlzU2dRRnBMWVpXSGY2V2hyMFdmZTBPUXNKZVQxRWxZU0JTdWlJWHZGU1lZR3JjSlhSQjQ0bnl6UU9QWUZ6OHhIUHZlMG9fbjJUVlFuNXItOWVpaUhWRE54c25DNW1aYWtvX054QWRWOUptb2VzWmg5YzN0WGFEcW5EMWtBbTBDdi1MTWhzQ1BX?oc=5"},
  {title:"Tottenham train ahead of Everton as Savio fights with Pedro Porro and Dejan Kulusevski absent", source:"football.london", date:"09 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-train-ahead-everton-savio-34589009"},
  {title:"Man Utd and Tottenham scouts left stunned by German goal sensation - Exclusive - teamtalk.com", source:"Google News", date:"09 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMinAFBVV95cUxNZTM4ek4zTTBKQm9uVGx4ZElTUUFzOTg0MUdabzJwa0hoMXpHVkRxLWxmeG56UGtkckxYSmh3WHZzb1J3WFYtOFRSRGlNQ2ZiMzhSWEdSdUNFRWtPUmVoWXA3LUhTaGFVcGQ4V3ZoWk0zYWRNLTVyVExGMTVVSUo5N1BjVmdORGk0c3ZkTVdFaUM0U21FNWNtemdBTGE?oc=5"},
  {title:"The Tottenham XI we want Roberto De Zerbi to pick for crucial Everton clash", source:"SpursWeb", date:"09 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/the-tottenham-xi-we-want-roberto-de-zerbi-to-pick-for-crucial-everton-clash/"},
  {title:"When were Tottenham last awarded a penalty? Harry Kane stat is hard to believe", source:"SpursWeb", date:"09 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/when-were-tottenham-last-awarded-a-penalty-harry-kane-stat-is-hard-to-believe/"},
  {title:"Injury News Emerges As Tottenham Hotspur Loanee Misses Cup Defeat - The Stacey West", source:"Google News", date:"09 Sept 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiogFBVV95cUxOMFBqbHltVWs4Tm9EME9tMTYyZ3QwOF9SYzlRVmthSEtqam1hN0x2Ni1DMnhPU0VoVjFUX3VYeE4wMFBNTW56aUI1eV9HU2pweTI4TW1VaWF5UzExa2xybGVZRG5KQS1HZDcyTGpFclVPVmFXSWoyZ1prNmpmSDV4akdYaGxIZlpNTGZyOWh0VmlTT3RFbTktSXpScE4wVWh5UWc?oc=5"},
  {title:"Tottenham yellow card watch: Premier League suspension rules explained for 26/27", source:"SpursWeb", date:"09 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-yellow-card-watch-premier-league-suspension-rules-explained-for-26-27/"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Wednesday, September 9 - Cartilage Free Captain", source:"Google News", date:"09 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi3AFBVV95cUxQd0FjaDhmYTZtOF9EcnllNGY4RnY2eVptdnRqOFlUVjlOZlRWVXhYTUVCTEFDU094YVNma1pVUkxxTXZmaDQ3RGRmT2d6dVlDWm1Dd2tOd3NNRjBsMThxMFFzQVh2NmI3aEktWklwYXlqUG5uU2lBcmlRZ3MxTElBX1I4ZFhfYXVqRld1YUlkTzFJUGVqVmJDTmpYVkg3Y3U3Zk5jSTZpeERPTTVobElTTUkyS1lGNElDYmVkc0pINHRfa0dyWkZHZnUzNEhJSllXNHB2aWpSLUwtUXRX?oc=5"},
  {title:"Exeter City vs Tottenham Hotspur U21: EFL Trophy stats &amp; head-to-head - BBC", source:"Google News", date:"09 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiY0FVX3lxTE5NT0JGTnFhVzQ1RHJydm13RDFsTWpZNy1DOG5wNGR2WDhadU5uTVhoTXFkd2taUmJZdEFWZnRTR284cEkxNHQ2Vlg5SzluUHFKZlp4end2dDYwVG41ZUc4cDhjTQ?oc=5"},
  {title:"Tottenham&apos;s classy gesture as they deliver huge help to fellow club", source:"football.london", date:"09 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenhams-classy-gesture-deliver-huge-34587601"},
  {title:"Match Report: Exeter City 2 Tottenham Hotspur U21 0 - Exeter City Football", source:"Google News", date:"09 Sept 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMiV0FVX3lxTE14cGFCV3NtUWxIeEdYSzYwanBUUjN6aDJXZXZpWkxoSXdVaUZ1NmoyQXltQTRJcnpJREl0RUJnVjM5WEpDYzktR052UFFsaGtpVy02Xzhjcw?oc=5"},
  {title:"&#8216;Tottenham make excuses&#8217; &#8211; Troy Deeney slams De Zerbi for &#8216;not true&#8217; statement", source:"SpursWeb", date:"08 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-make-excuses-troy-deeney-slams-de-zerbi-for-not-true-statement/"},
  {title:"Richarlison’s Tottenham exit hits fresh setback", source:"SpursWeb", date:"08 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/richarlisons-tottenham-exit-hits-fresh-setback/"},
  {title:"Tottenham, Chelsea, and Man United all want the same Blackburn Rovers defender", source:"SpursWeb", date:"08 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-chelsea-and-man-united-all-want-the-same-blackburn-rovers-defender/"},
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
