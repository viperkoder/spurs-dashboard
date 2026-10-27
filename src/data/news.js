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
  {title:"Tottenham fans will love how Heung-min Son reacted to Harry Kane&#8217;s Ballon d&#8217;Or", source:"SpursWeb", date:"27 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-will-love-how-heung-min-son-reacted-to-harry-kanes-ballon-dor/"},
  {title:"Harry Kane spotted celebrating at nightclub as Son Heung-min and former Spurs stars support", source:"football.london", date:"27 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/harry-kane-tottenham-ballon-dor-34822242"},
  {title:"Tottenham Hotspur have a 9.2/10 player who De Zerbi thinks is a match-winner", source:"SpursWeb", date:"27 Oct 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/tottenham-hotspur-have-a-9-2-10-player-who-de-zerbi-thinks-is-a-match-winner/"},
  {title:"Jamie Carragher can&apos;t help himself with Tottenham dig after Harry Kane&apos;s Ballon d&apos;Or triumph", source:"football.london", date:"27 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/jamie-carragher-cant-help-himself-34822124"},
  {title:"Alan Shearer names Tottenham duo in Team of the Week after famous Chelsea win", source:"SpursWeb", date:"27 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/alan-shearer-names-tottenham-duo-in-team-of-the-week-after-famous-chelsea-win/"},
  {title:"Harry Kane: Spurs pay tribute to ex-captain after 2026 Ballon d'Or win - Sky Sports", source:"Google News", date:"27 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMisgFBVV95cUxOWVRyNUJuamlhYVVzNzlEZUduM3RzLXlNVTUta19mdGxlc1dsbjRzLXJmSEw0ZkFReUtSNDNpSTFOUjA4TG5wV3VfbHNWNHh1bFktaEhLWkZySDBnSDBoQldHdFRJMlkzNG5tQ2Vfai1aay1RanVrQ3VTOTM3cTZzNktHMUxMOVdoV0I5SzJjaElfYXlQNTRTT2FOMzYwc2tzQno0MzhSTFo4NVozQ0xxSHlB?oc=5"},
  {title:"What Harry Kane said about Tottenham in emotional speech after winning Ballon d&apos;Or", source:"football.london", date:"27 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/what-harry-kane-said-tottenham-34821957"},
  {title:"Roberto De Zerbi left 'concerned' by latest Spurs injury blow as fresh update now emerges - Sports Mole", source:"Google News", date:"27 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMi4AFBVV95cUxNZlpscEptVExDTjU2eXh2RXV5bDJXM01sVEpIUEU1dWpkMDVkb2xCcERZN2ZyT3pBbXVaSU1qTFM0RFVUekNBSktrRDFrVDh3VWtTdGhCTWtvSmFjYmZmdXQ3R1YzMjU2SjlLM3pacEdJY1BfRjZKNEwwUTB6Qjk1WGNRaDNaZWF4NkxJdzY2bGFzWnU5V3NURnBzbEExYmJUTExWUmlDQ29ScE9JNUl4azczRTMxdTF0WlA3NjZoUURYNXNzb0pjLVA1NTRtOTFmWDhYSWtqM3VrdUVOWDMtTg?oc=5"},
  {title:"The remarkable quirk of Tottenham&apos;s victories this season that spells danger for Crystal Palace", source:"football.london", date:"27 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/remarkable-quirk-tottenhams-victories-season-34821302"},
  {title:"Tottenham Hotspur need the infectious joy of James Maddison – his new injury is a big blow for Roberto De Zerbi - FourFourTwo", source:"Google News", date:"27 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMi5gFBVV95cUxPTHJUUkhQbV95OXhsQkdTRHBoQzRtNjlYbmtvcDFUT1IwTVU3cEtOTUxUdjBxSHRzOHJSOUljVzcyRG5CQlg4NnRYajJ4SWFwR0xBQ2plYm8wNzRYM25wb1drT2JUak5Xakc0TmFMYmg2R3JQQnlPQjZneU5DYkVyVGhjR3VfanVjd0FhbjZpVTZZMjBQaDUwX1d5U05ua0VQWlVOT3hFVjhOek9oRUU0TWNOeWxrRUZabXZneWk3N01MOTdDd2hiM2dYWnFCdXNyRGNCS0pfcllnalFFSTF3Mzd6aU5sdw?oc=5"},
  {title:"Harry Kane thanks Tottenham Hotspur after Ballon d’Or win - Bavarian Football Works", source:"Google News", date:"27 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi1wFBVV95cUxOd2F5X2lCa3hkcGlVbThfZzFmSUplZmlOb0FYYXFFQm55UVlKYmNJZjdFUVlvZXNLYk9rS3V1VkFFelpDbnVxbmV5c1EzeDU4MlZ2TjE1dTdKY2c5QW5IS2NUZmhENlhTUHZiYkNyUElsaXBTVndfRks4ek84NHpSbkpBMEdZQjlkdmpvUFgyRXZnQ1p2Y2JRMno4VXRyNXBxMTlsRm53alZ4V29sVkdHb2hldXZaVUR4Q20xMnJuSlIxSkZuYzE1NE5ZRlR1dXlrdE9feUt4cw?oc=5"},
  {title:"Chelsea 0-2 Tottenham Hotspur, Player Ratings: Early-season Blues - We Ain't Got No History", source:"Google News", date:"27 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiwwFBVV95cUxQTHRXUmVySEI2bWg2LWs3aVh1eTBTcWh0eXZweHVzQ0lQdU5PUXdFVUdTeWNkUEQtQVhheUZGX01LVkJiU05kQjA5Ml9HS1U4UEdPWTBEMGZaUEREcXRmZ0tuMnJNdmRaQVdoWGdmQms1V2w2RWZHcnhCRk1pcTRqcUxXYy1lSW1VeFA2bk5tejhHQzFRVE1GTHo5ZzFCZWUtQ21LNUVBaTBVcGRCeE12UERDdG0zNWVjT3VJOWZESEN5Z0k?oc=5"},
  {title:"Ex-Tottenham striker Harry Kane wins Ballon d’Or 2026 as full top 30 revealed", source:"football.london", date:"26 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/harry-kane-ballon-dor-winner-34821591"},
  {title:"Academy graduate, record goalscorer, Harry Kane wins 2026 Ballon d'Or - Tottenham Hotspur", source:"Google News", date:"26 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMimwFBVV95cUxQVC1nN0dvUVhnYnFnNzVadzVOenFjenM3UkZSamRSaWs1ZE81cTVYMDZzWmxRWWExV0JSX0s5MjhYQzFzNDd6REN0YkN6R29SQzZDa1FRSlNtOEREVXRxWlpCVEk0VG16S09EWGYzS0toZ0lTTUxxN092OU1pcWFURndFUkIyUVRUMDNjR0lQRXUwMDRPTGM4OHZvSQ?oc=5"},
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
