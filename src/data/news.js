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
  {title:"&#8216;Talks are ongoing&#8217; as two clubs approach Tottenham over £8.4m Richarlison deal", source:"SpursWeb", date:"17 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/talks-are-ongoing-as-two-clubs-approach-tottenham-over-8-4m-richarlison-deal/"},
  {title:"Tottenham transfer update: Atleti double raid, Pedro Porro price tag and two-time Champions League winner", source:"SpursWeb", date:"17 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-transfer-update-atleti-double-raid-pedro-porro-price-tag-and-two-time-champions-league-winner/"},
  {title:"£159m Tottenham transfer truth leaves club bosses red-faced with only Man Utd worse off", source:"football.london", date:"17 Oct 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/spurs-transfers-depreciation-man-united-34778628"},
  {title:"Tottenham predicted lineup vs Coventry as Mateus Fernandes returns to the XI", source:"SpursWeb", date:"17 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-predicted-lineup-vs-coventry-as-mateus-fernandes-returns-to-the-xi/"},
  {title:"Maika Hamano outlines her 'big dream' ahead of facing former side Tottenham | News | Official Site - Chelsea Football Club", source:"Google News", date:"17 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxPZzV5UDZiaEVTemp1OC13VUdLb3hlSDFIOHV1cU14YWlUd3Q4N2JEVGM3X0RycEQwOXh1VlpoalhYVjNUbnAtTlc1Uzk5Ym1tVU5PRlNmaDdiYzZXcjRDbGNZQ0hnRjJJMFRsYUtVM3VtSjRUeE85c05rTVkzNDYxWFVwTWl5ZEtZSGJQWUMzWFNnTGNPSTFNSnQ2X1N1aC1aRzFTLUM1c3RKZVhKNXB0OXJrZk5vdw?oc=5"},
  {title:"Tottenham&apos;s missing piece of the puzzle that Roberto De Zerbi desperately needs back", source:"football.london", date:"17 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/james-maddison-roberto-de-zerbi-34778599"},
  {title:"Man Utd join Arsenal and Tottenham in race for Newcastle winger Bazoumana Toure as Liverpool links played down - Goal.com", source:"Google News", date:"17 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiwAFBVV95cUxORnBUYUVWanc0eVZiWHpiSkp1NVZKTkdBQXUxTFFmVW94M3Y0aHRqcjNRU3hwZ3Rzbi1NLU0wX1JDbXphaUtBeHZuZzVHSmVIYXF5Z05UeVFjUGo0R0xHamlHUXNyZWRyVTYtemVhZWZPWWdCV1IwNEpUbjVaaEdGQmZwejZQVnJ6aERBc2JQUGNvSkpQSFdnamtfSklwZHlKYndEQjlNTkdjb21RNUVWRlU3aTUwUThiMEFoenRvbEM?oc=5"},
  {title:"Roberto De Zerbi has big decision to make with Tottenham absence to be clarified - Football London", source:"Google News", date:"17 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilwFBVV95cUxOUC1EOWN5NlhDeGZ5UGhJMVVvTk4wWTZOdkZXQ2sxTkpSQXZ5bTVvVXFiMHdLX3lMYUI3T0RZd3FpRUx3Q3M1ZnZ3QU9tY1djY1FacnFidXZSRVZCUThaWXdPTWNXTzczZ0Roc0txUm9NanAtMFpTTnZGSDJ1bXVJZ1VLWXlDeWh3WEpUbFhtOUtFTXc0eG1v0gGcAUFVX3lxTE11cDZjbUFCdExGQjhnVXlqT3htQVRpTWxuRzlqdHpRbUxsTTNRcTVmeE9Ba0xzUC1KbUlHd0cwZkFTcEZpc0FramkyTXpnSkZHYXpsWE94RkVqQWpYNnNkbDQ5MG5XNnVMNi1WLWJlZlhrejRKbHhUR0p4aVJSSmJTb2N5UDE3T0hPX3JxbkZKR1NqakdlTW14OTM0WA?oc=5"},
  {title:"10 players to miss Tottenham vs Coventry after fresh Roberto De Zerbi setback - Football London", source:"Google News", date:"17 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiowFBVV95cUxQZkVYY0UyQXczTEh0V2tOZTJHeTVma1NvXzVKRWpUdDVtQ3RQS2g4NGppY0F1R25vUVFyRV9sczl0anFiM19PNUtyWjBmRWx0NUVxX1paRk1TYl9sUFc1Y2xqWkVrOUlkNkpkWDdQX3prWU9weTR3UFVYV2tCLXYtRjhYemxZUExhNXJYbE4xYVF0LXEtS2FMbnJURXcyVkVOa05n0gGoAUFVX3lxTFB3U21oaE9TOWg1OEhpTDBQM0ZLSmhMUlNhT0FMbDhjTWlWT3ZiQ2VzR1c4SGRLMFpJTC1XcXVRS3gyTWkyQkh5Z2U5MElFLU4tNndET0NvMU1TdVI3bHRnYWhLb1oyUGJaSzJDa2JrVlRLZWMzMXZ4MVdlSjFWUHFKT3NHWVBNN1lHR2N6NzF1S0xBNVA5M0FCNEZTa2pJMnNVMmJtbjZpSw?oc=5"},
  {title:"How to watch Tottenham vs Coventry: TV channel, team news and predictions", source:"SpursWeb", date:"16 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-to-watch-tottenham-vs-coventry-tv-channel-team-news-and-predictions/"},
  {title:"Tottenham receive sobering update on Antonio Nusa after failed summer pursuit", source:"SpursWeb", date:"16 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-receive-sobering-update-on-antonio-nusa-after-failed-summer-pursuit/"},
  {title:"Tottenham yellow card watch: Are any Spurs players close to a suspension?", source:"SpursWeb", date:"16 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-yellow-card-watch-are-any-spurs-players-close-to-a-suspension/"},
  {title:"Van de Ven To Start, Senesi On The Bench | 4-2-3-1 Tottenham Hotspur Predicted Lineup Vs Coventry City - The 4th Official", source:"Google News", date:"16 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi0AFBVV95cUxQU1BFNVAzX2JPZHROdlFyMWhsbzVzdUZvMUw1aHA1bl9QT2liWllBNEZvQ0RsRGhMcUJ0QmN4R2tPVHozazl3UURXQkhxa3hBSi01NDZCcjBtZERfbERXNURDWnVrS25kR3g3Rk1WemNVdUJaejNFamxPemlIQ0t0N2V1YjlvQml5UDQ3MG5INkRZMFJGLV82ekRQR3Z5S2lFQ01qakFfYU05R25WaTVmOHdIUmEtVXRJSVFMeTVWNG5QTFFXLUlqWDg4OVg2by01?oc=5"},
  {title:"Arsenal look to beat Tottenham to signing of Heung-min Son&#039;s &#039;monster&#039; teammate", source:"SpursWeb", date:"16 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/arsenal-look-to-beat-tottenham-to-monster-kim-min-jae-but-january-transfer-race-could-fall-flat/"},
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
