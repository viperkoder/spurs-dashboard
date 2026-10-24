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
  {title:"Roberto De Zerbi reveals when Tottenham could welcome Destiny Udogie back from injury", source:"SpursWeb", date:"24 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-reveals-when-tottenham-could-welcome-destiny-udogie-back-from-injury/"},
  {title:"Tottenham handed worrying relegation probability by Opta supercomputer", source:"SpursWeb", date:"24 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-handed-worrying-relegation-probability-by-opta-supercomputer/"},
  {title:"Chelsea v Tottenham Hotspur: Premier League preview and team news", source:"SpursWeb", date:"24 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-match-previews/chelsea-v-tottenham-hotspur-premier-league-preview-and-team-news/"},
  {title:"Tottenham set to accept offer for ‘first-choice’ star against De Zerbi’s wishes on one condition - Football365", source:"Google News", date:"24 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMisAFBVV95cUxOVGlTcjB2TmdEaTZiRDIzdC1idVRmMEFFdS03MjFkWHJCejduZ1B2d2lKa1RYRHVmclFTMWFuSm82ZWQza0hpSnE5UXJjaThvQU40YzZ1aThNQXJPbHVmM3BmQjl0WkxnWDdXVUhWRHh6SVJTY05UaVBkZ0s3U25Ba3ZCbWxGX19IdlFiLUJpc1QxTS1jN09JWExDalpIU01qR0c1aXJaSmpfRmFRRV85YQ?oc=5"},
  {title:"Man United and Tottenham could clash over three of the same striker targets", source:"SpursWeb", date:"24 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/man-united-and-tottenham-could-clash-over-three-of-the-same-striker-targets/"},
  {title:"Alan Shearer and Jamie Carragher agree on Chelsea vs Tottenham score prediction", source:"football.london", date:"24 Oct 2026", tag:"Club", url:"https://www.football.london/chelsea-fc/news/alan-shearer-jamie-carragher-agree-34811264"},
  {title:"Tottenham vs Arsenal: Why north London derby could define seasons - BBC", source:"Google News", date:"24 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiaEFVX3lxTE1zZmY0c1lRRUhvYUJRamZydVNKR0Z5TzZESFIyUWJfYWMxdUZpekx4bGN5eG4tMkFudFdoSzdJUVJJTkhST0g2cHptZjM2ZHZlVmhsNmRHeUtHUmRyY3Y5cVR4M0VJaHZm?oc=5"},
  {title:"I managed both Chelsea and Tottenham and felt zero connection towards one of them", source:"football.london", date:"24 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/managed-both-chelsea-tottenham-felt-34796228"},
  {title:"Dele Alli's new Twitch career: Is forgotten ex-Tottenham star's pivot to livestreaming a viable alternative to football or cause for concern? - Goal.com", source:"Google News", date:"24 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiwwFBVV95cUxNS1QteklCT0hZclBGd1hyQ0xIclN5VkN3bHhqdzEtQ1ZsdGlGUmxVbkpxN3dWMTlTQ0RiLTFaWWV2NGF0a21HblViTFN6NjVIaUlUTzBYSk5FSjdwamVaYVRMbDZQUE9lRlZpLXk4eVVrWkRiTWxoY3BUeF9nRnFTTi1WejM2WUdDWXc1UGlna0lhTUJCWjJlQlJwU3ktT0xQeEVfcWxpaGVaYllxNXRabkdDVDNMZDBhU2g2a2I2elVTU0U?oc=5"},
  {title:"Tottenham predicted team vs Chelsea - James Maddison decision made for derby", source:"football.london", date:"24 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-predicted-team-vs-chelsea-34810935"},
  {title:"11 players could miss Chelsea vs Tottenham as Xabi Alonso and Roberto De Zerbi give updates", source:"football.london", date:"24 Oct 2026", tag:"Club", url:"https://www.football.london/chelsea-fc/news/chelsea-spurs-injury-news-latest-34811038"},
  {title:"Chelsea vs Tottenham Hotspur: Premier League preview, team news, stats &amp; head-to-head - BBC", source:"Google News", date:"24 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE93TG1zclY4dVZjclktUWJWRmh6bHpCY2E4RWVmODJmUU5qTThQdXBzMmVBQks3WGRLdkhBODRZN0RZOG5ZUldsdmJNWEM1OWl3RWh4M2xhdFU5T2ZSVkpFajVwNXJmQQ?oc=5"},
  {title:"Premier League news: Spurs’ nine injuries ‘normal’, says De Zerbi; ‘emotional control’ keeps Blues red-free - The Guardian", source:"Google News", date:"23 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMi4gFBVV95cUxQRl9GOVdzSFFDWmJ1TWVYQk1xRW5CVWVuY0FsdlpWbmZ4ZlVOSkFOWXJNZWkzcjhuclQyUGU1YjUzRUhlb2lOeUFKMEpYa1hEYTdXa21oTHBEM0ExQnRaMHJMeDFlMkgxMW9zZUV3T0R5bk8xdGNRaTFaaHJfWlVyMlNtRlJRV1dWN0g4SThDTXBmMFQ1U19jcTNfb3N5YWlzbGJ2Q1dORHg2MF9xUU9COXNOU2R2VHBBdXptNEdBdlpfRnAxSFN0ZFJ4aEJQTXVndVJ3T1BBeEdwbGdrSWpKak5R?oc=5"},
  {title:"De Zerbi explains his Mateus Fernandes stance and defends Tottenham medical staff", source:"football.london", date:"23 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/de-zerbi-explains-mateus-fernandes-34809220"},
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
