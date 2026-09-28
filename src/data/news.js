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
  {title:"Tottenham, Arsenal, and Chelsea all want the same number 10 with 3 G/A in five games", source:"SpursWeb", date:"28 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-arsenal-and-chelsea-all-want-ibrahim-maza-after-electric-start-to-the-season/"},
  {title:"Bobby Zamora predicts where Tottenham will finish after Solanke starts to &#8216;thrive&#8217;", source:"SpursWeb", date:"28 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/bobby-zamora-predicts-where-tottenham-will-finish-after-solanke-starts-to-thrive/"},
  {title:"Gallery | WSL unbeaten run continues after Villa victory - Tottenham Hotspur", source:"Google News", date:"28 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiogFBVV95cUxPdGFFM1JlbHltRmhBeUxPUkt3SUhYRnRTcHRSZ1hWT01OWEVENnJUNVlkeWZHZ1BucE1rQXhhTEdzVF9TenJMMzZUaFZXcW1zSEJhbVRlTHR2ZXBkd2RYZHN1TXBGSWR3MzlQOHYwOVRIQVQxcWR3QlVCZFZMeldBa0x3QTNGQWY3ZnJmRDhJNDh5Q2lYQk1KVHo4d1pObUZSd2c?oc=5"},
  {title:"Dejan Kulusevski drops Tottenham update after injury scare derails Roberto De Zerbi plan", source:"football.london", date:"28 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/dejan-kulusevski-drops-tottenham-update-34681967"},
  {title:"Tottenham and Man United are in a seven-horse race to sign a £50m striker in January", source:"SpursWeb", date:"28 Sept 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/watch-out-tottenham-and-man-united-brian-brobbey-has-sparked-a-seven-horse-race/"},
  {title:"10 outstanding Jan Paul van Hecke stats as Tottenham star silences critics vs Serbia", source:"SpursWeb", date:"28 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/10-outstanding-jan-paul-van-hecke-stats-as-tottenham-star-silences-critics-vs-serbia/"},
  {title:"Tottenham legend admits there's one thing about Roberto De Zerbi's team that 'drives me mad' - football.london", source:"Google News", date:"28 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMingFBVV95cUxNemttZWdVc0dhaWtWWnNSNmVza0tEUnpVNjJNMkx4U0pJZ0xOZDZCS0NJRUtaM3UxM191M1ZHSmxQM1BGeWZuSFp5c1BJUFBoOU5pSHdHSllRUzJ1NWFneldOay0xMWhBeHNEb0NBRzNDbnhKODBJNzM1S0ktUTQwd1hzVFM0bHZkVzRQTjJ1VU9BWFRqU3lUVlUxdV9WZ9IBowFBVV95cUxQTHExbVFUbVFtTFpvUFFDRF9CbXBFQUFhNElKeEhPdmE3M0JQdmp6SEZMR1ZqcXdUWGdOSGQzVzRnbm8wOGpaRG1vR3JZbmZJS1l6VDVrMktNM1lZbkkySi1YUlo3MEswck1SaWpQUVJpUFJwd1kwS3VRN1ZkTXdOcFVsb0FqcHNqWk95RW1kZmtEQ3cxZFRqZEZXaDNvbjBIbkMw?oc=5"},
  {title:"Tottenham legend admits there&apos;s one thing about Roberto De Zerbi&apos;s team that &apos;drives me mad&apos;", source:"football.london", date:"28 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-legend-admits-theres-one-34681867"},
  {title:"Man United and Liverpool are tempted to give Tottenham a £90m transfer headache", source:"SpursWeb", date:"28 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/man-united-and-liverpool-eyeing-move-for-senior-tottenham-star-micky-van-de-ven/"},
  {title:"How much Man City could owe Arsenal, Chelsea and Tottenham in compensation after charges verdict", source:"football.london", date:"28 Sept 2026", tag:"Club", url:"https://www.football.london/premier-league/how-much-man-city-could-34681151"},
  {title:"Dutch media outlet destroys £52m Tottenham flop after ‘sloppy’ Netherlands showing - TEAMtalk", source:"Google News", date:"28 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirgFBVV95cUxNVUpxSGNuOUQtLXk3NGJ4Wjdsb3lNNGNwTDdKcEl1cjZkUTJuWjVNSURGVW9WOUk0TlJEc2lNZTRxM1ljNWhLN292TUd5eXM2VUhQeEIyS05sMTJJMXQ5N3pveHF1bFZSTzgzM1ZEd2RJLVBLdTlXZ3lSZWtUdm90TzM1SEx3ZC1weHhId3FJOHBwcFRNWVRHVElHN2c5b2ROMUV1TTJEQllvRTg1Tmc?oc=5"},
  {title:"Sandro Tonali speaks out on Tottenham struggles as Italian media point the finger", source:"football.london", date:"28 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/sandro-tonali-tottenham-italy-media-34680828"},
  {title:"Man United and Tottenham enter race to sign £50m Netherlands star in January", source:"SpursWeb", date:"28 Sept 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/man-united-and-tottenham-embark-on-50m-race-for-brian-brobbey-deal-in-january/"},
  {title:"Dutch media tears into Tottenham star Jan Paul van Hecke after ‘sloppy’ showing vs Serbia - Football365", source:"Google News", date:"28 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiqgFBVV95cUxPYlJ6ellOVmp1T3RQOFhaVUgwN2dnNV9nem5DdzhOUTUxUzBTXzh5Q1lYM2FEeFBidzJTaEt2V0JHbjdIWUNCVnVtSm5jZktxR0VRbFByZTdWMEMtVFppcVhWbXFjb3dFRVI0QjBMcDh6czFsS0YxTm1peVd6ODJVYVBTNGZtTHViaHBfeC1aZ3Qtcl9sUFR4bUx2ckxweS1od2dvUi1ZR3dhZw?oc=5"},
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
