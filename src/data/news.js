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
  {title:"&#8216;I won&#8217;t be happy&#8217; &#8211; Postecoglou will be shocked by what is happening with Tottenham duo", source:"SpursWeb", date:"25 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/i-wont-be-happy-postecoglou-will-be-shocked-by-what-is-happening-with-tottenham-duo/"},
  {title:"Tottenham battle Premier League trio to sign Mohamed Simakan from Al-Nassr", source:"SpursWeb", date:"25 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-battle-premier-league-trio-to-sign-mohamed-simakan-from-al-nassr/"},
  {title:"The next Harry Kane is emerging at Tottenham to solve huge Roberto De Zerbi problem", source:"football.london", date:"25 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/next-harry-kane-emerging-tottenham-34964412"},
  {title:"Injury expert warns Tottenham about giving Dejan Kulusevski more than 30 minutes", source:"SpursWeb", date:"25 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/injury-expert-warns-tottenham-about-giving-dejan-kulusevski-more-than-30-minutes/"},
  {title:"Supercomputer predicts Sunderland vs Tottenham result as Spurs could go sixth", source:"SpursWeb", date:"25 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/supercomputer-predicts-sunderland-vs-tottenham-result-as-spurs-could-go-sixth/"},
  {title:"Omar Marmoush reacts to Mido message as Tottenham striker struggles to score goals", source:"SpursWeb", date:"25 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/omar-marmoush-reacts-to-mido-message-as-tottenham-striker-struggles-to-score-goals/"},
  {title:"Video: Tottenham fans will love Heung-min Son&#039;s response to Arsenal remark", source:"SpursWeb", date:"25 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-will-love-heung-min-sons-response-to-arsenal-remark/"},
  {title:"Tottenham fans will love Heung-min Son’s response to Arsenal remark - Spurs Web", source:"Google News", date:"25 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxQRlpock0xMW5XM3RSMjgxZ3l5WmJfbURtTUFpV0VZZzlXWHk1Z1B6UXJWQnlCYV9DaU1WdjZyR2hrZGU1SWN6TGwwREJRVjVUd3JxZldCS2lNU2ZvY184M3lIa0QtVWc0UXBndzRIYUw2cFhTemFFVTgwRUxpWFFhTUl3Rk9SN045QlVLWmJDSElScFZSOUJFQWN4b2VpUXhfd3MzdWowUQ?oc=5"},
  {title:"Luca Williams-Barnett ignored interest from three clubs to sign new Tottenham contract", source:"SpursWeb", date:"25 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/luca-williams-barnett-ignored-interest-from-three-clubs-to-sign-new-tottenham-contract/"},
  {title:"Tottenham Open Talks To Complete £8m Transfer, De Zerbi Wants It Done - GiveMeSport", source:"Google News", date:"25 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMif0FVX3lxTE1aOURvTTVVTGl2bXl4UDdQMXdfYWdLNWVkOW5ybnhBNzZ2OWpzMkxsWm1NT3p5NEZQX21yUjVISnItSkp5Y3B6dFc0aDIzMW9OQ3VPTzFEVjV1X0ZUaldEd3IwNHpDUmZQS0JaU2xxdEFxWi1vWVNuVlBGd2NFZEk?oc=5"},
  {title:"Everton now well placed to seal bargain Richarlison return after Tottenham discount update - Goodison News", source:"Google News", date:"25 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiyAFBVV95cUxPWEEyMzBwNW82ZGFtamNHaWo1dEFOcFYyNlFWVy1Rb2ZTWHNDdHlMb1JiMER5QmdDSTd5VkNpTXBjdG1mb3RBQTd2NVFJOXVlN094Y2FHeEFoMzVMS3JxdG14cXlReThiV21wRDQxdzdvX3lFQmNvRi1iU3dOeUFSUlBWTlp1TFZnc1NJZGUtY2YzZGp5c2FjRUN4WWlXWEFzTWtPV1g4RnNqVFk5TnczZmgxWFViTVc1bkp1dzNIUmFWNXQzU2s5eg?oc=5"},
  {title:"Pochettino eyes Champions League redemption with Man Utd after Spurs heartbreak - The Sun", source:"Google News", date:"25 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirwFBVV95cUxQaWUtQl9vUzlGNk51YWtGbjM3VExoLTNKY1NEbWdKMEdEel91T2N5ZGVpdlAwTzRLazlkQXpNT3QwNlpDNENKMThrUG8yLTU1UTFMSXRLMEJHVGt6UnQyaHBHaml6OG1HVWJEUUV3Z0tWZmttZHJrX1I4cmJVcUctQnkwRkQwbE0zVUdzV2didllmQ1B2T3k2YmhzREpLd0FqVk82OElMV0NNcEhGX3lF?oc=5"},
  {title:"Luca Williams-Barnett nominated for second Premier League award in a month - Spurs Web", source:"Google News", date:"25 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMisgFBVV95cUxNaXhLMHRKMlQ2akFKc0ZBYi0tZkhtQTZUYVo3SFl5aHpuZk13R0VhN0Fab1RhQTVxbWVVTWE4elF4dEZ6cnhHT3Mwb0I3akU4a213SHFmRXp6ZGJYb3ZiV0JwMVZ6blhuLVMxR2lucE9TcklmWGg2Q05sUzA2XzZxbEVBNmVRLVVzWU9hekNVSkFwTm5ramNqVHdoRlpYWldIWHg4UzdBMlFxbnJqZ3dId05R?oc=5"},
  {title:"The eight players who missed Tottenham training as Roberto De Zerbi made to sweat", source:"football.london", date:"25 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/eight-players-who-missed-tottenham-34963901"},
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
