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
  {title:"Manzambi starts for Villa, Porro back for Spurs LIVE!", source:"Sky Sports Spurs", date:"19 Sept 2026", tag:"Club", url:"https://www.skysports.com/football/tottenham-hotspur-vs-aston-villa/live/559493"},
  {title:"Tottenham confirmed team vs Aston Villa - Mateus Fernandes starts with one change from Everton draw", source:"football.london", date:"19 Sept 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-confirmed-team-vs-aston-34641772"},
  {title:"Tottenham vs Aston Villa LIVE: Confirmed team as Savio and Marmoush both start", source:"football.london", date:"19 Sept 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-vs-aston-villa-live-34629894"},
  {title:"Tottenham vs Aston Villa &#8211; confirmed team line ups for Premier League fixture", source:"SpursWeb", date:"19 Sept 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-vs-aston-villa-confirmed-team-line-ups-for-premier-league-fixture/"},
  {title:"Tottenham vs Aston Villa: Paul Merson believes Saturday's 'huge' Premier League match is a 'momentum swinger' - Sky Sports", source:"Google News", date:"19 Sept 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMi7wFBVV95cUxOY2drQlQtRWtGMy1qbkJKcUkzaWI1NmpfdVlNMW1ROXIzaFotTzNYMTNDMVhnZWNYcFFRZ3B1dmlPcXRaa2JHVTdlOWRkVGN4RFR3U0U1cU9ldlhlNVlKc29qOER0dEo2LU9KRnlyZ3hWZGJub25aQjRSWERpb1lOMDQwVV9FZGJBUU9FZUxISFpNTFB3QUVZZzEtYm52R2hzcUV1b0ZXZVRuR055NWZua2ZFOFJ5WkFWZlVhRjNiTmcwbWt3a1JSRmE1ck90VmFueksxaF9DdEs1bVVpOUI4SGdNaDIxMGxyZTZlOGtKaw?oc=5"},
  {title:"Michael Owen urges Tuchel to consider Tottenham academy graduate for England squad", source:"SpursWeb", date:"19 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/michael-owen-urges-tuchel-to-consider-tottenham-academy-graduate-for-england-squad/"},
  {title:"Tottenham XI vs Aston Villa: Predicted lineup and confirmed team news - London Evening Standard", source:"Google News", date:"19 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi8gFBVV95cUxQM1NIcXpLWTdQYXlrcTUtUVRVQnh3aExHZEtObG45TDB2VHFMb1d0a0g4bmRmMldQcFdlSGkybXl4N2JwdlZ0UHlDOVQzNVpQNTVTenNVUmdjempybzRpM2dtSTZ2VkdWc1lwVlhpb2NZcU5xZG9kaXZ2WUNsMXBiTXZ3TEdCeWIyMjRoeWxJMUlWSTRKbmRIbDYwbTJJbmU5dVZzS05UUjdqWnJJYUljX3VrVTNjUFJYQTl3cjFMTWYwVHRfdmRNMDl6dEs3Q054cF9mQkNjUEpsT0x6N1drZTh4eGwtWmxJb1lFT1JMS0l4Zw?oc=5"},
  {title:"Alan Shearer finds one Roberto De Zerbi excuse &#8216;tough to understand&#8217; amid Tottenham woes", source:"SpursWeb", date:"19 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/alan-shearer-finds-one-roberto-de-zerbi-excuse-tough-to-understand-amid-tottenham-woes/"},
  {title:"Tottenham Hotspur player admits he wanted to join Arsenal but had no choice - now.arsenal", source:"Google News", date:"19 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiuAFBVV95cUxOVllWSXZlZTlnWUhEakcyUEREdWt3X2JfSTUyY2ZBYnBaLWN5aThINUlyRUxsSEkwUGp1bHEySk1rRG1LU282djN6UG5CS2JEMmlhV0hZQ3Q4Y1FRSlBZM1E2VEZsOTFCaGNZeERqT3FUWmFUWFNYbFQwNVJiNE1TY2tyc1ZfZWdLbVZUX1JiSGZoNGZOc0R5ck1EeS1RRlNvekU1Zy1IcEVRSEd6cl9kaTFmYk1UOS1v?oc=5"},
  {title:"Alan Shearer predicts Tottenham vs Aston Villa result in the winless derby", source:"SpursWeb", date:"19 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/alan-shearer-predicts-tottenham-vs-aston-villa-result-in-the-winless-derby/"},
  {title:"Mathys Tel is Tottenham Hotspur's worst ever signing - FourFourTwo", source:"Google News", date:"19 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxOR3JGTHhFN1I1NFVlSmFJOHo5UDFodkNLeHRjZkNhSndKX2o5QjNLSXBrMHp3ZV9WaGZET0daamM2TFozTlNoMlFVdXdyQkpVTTdmQ09DaVZmQ0c4NkpMQlBiSnVzdkdXV2xSVGRXQjVLQkxrZ2piRWliWXZGUjA1SmxQdWFBc3VLNzRPa0lJQUJLWGRndkhQWQ?oc=5"},
  {title:"Tottenham's £100m transfer mistake made clear as Omar Marmoush solution shot down before Aston Villa - Sports Mole", source:"Google News", date:"19 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi0AFBVV95cUxOOUZIUGVrb3N0UFZWSG1WcWdmTDJkSVBnekduRUxTOVZxd1R1TV82ampnNGVlaFZXWmFmNGhxampDbUhzVUtLNFBkVDFlVzZFbWFWakNvVm5uX0QyS0xROUpjR3BvbGxuQzFPdjcxVUpxbUNHTGxrdVExZmJLcWtkZ2h0d1ZZYWQtZW1OaUVsR1gzX09nblR6UkJFZjZKRzl4eG5YaGwzNW92QWxyWWhQVi1TNjM2WEt0VC1WTjZWZzVuTmdfZ2tkdTk0VDZtMVdH?oc=5"},
  {title:"Tonali, Maddison, Kulusevski - Tottenham injury news and return dates ahead of Aston Villa", source:"football.london", date:"19 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-injury-news-de-zerbi-34641317"},
  {title:"Tottenham vs Aston Villa Premier League preview, team news, and predictions", source:"SpursWeb", date:"19 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-match-previews/tottenham-vs-aston-villa-premier-league-preview-team-news-and-predictions/"},
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
