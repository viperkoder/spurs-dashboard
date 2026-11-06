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
  {title:"Arsenal &#039;confident&#039; of beating Tottenham to Bundesliga winger despite £58.5m price", source:"SpursWeb", date:"06 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/arsenal-confident-of-beating-tottenham-to-antonio-nusa-despite-58-5m-price/"},
  {title:"&#8216;I am a fan&#8217; &#8211; Brad Friedel makes exciting prediction on Tottenham&#8217;s Europe hopes and Antonin Kinsky", source:"SpursWeb", date:"06 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/i-am-a-fan-brad-friedel-makes-exciting-prediction-on-tottenhams-europe-hopes-and-antonin-kinsky/"},
  {title:"Vote Williams-Barnett for Premier League's Creative Moment of the Month - Tottenham Hotspur", source:"Google News", date:"06 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxPV2J2NGNLNmpPZHFtVC1UVXZaOUM0RmE2LTRPX1UtZWFTTWpDa0p1Z0RzcXlyYklhYnI4OEVUMjR4WGVoOUpKd04xSGhtMFBFejFSMktET19vV25TWHJFbGcwZUd0b3BHcVNQYzFrU2Fic3NjNHVzdjBpekIwOUZrT2s4WnNwa2QyLXZlc2FVWk5MYmRacFV5NGVIcjlGYWFw?oc=5"},
  {title:"&#8216;Spurs swagger&#8217; &#8211; Chris Sutton predicts Leeds vs Tottenham score at Elland Road", source:"SpursWeb", date:"06 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/spurs-swagger-chris-sutton-predicts-leeds-vs-tottenham-score-at-elland-road/"},
  {title:"Tottenham are surprisingly close to getting another super sub for Roberto De Zerbi - Hotspur HQ", source:"Google News", date:"06 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiuAFBVV95cUxNVDh5aDVrRzNmUDlpTlQyWmdqSGVUU0YtRlNZWk1LbFBOMUtQSEJQM2E0S1kxUUFUa241ZE5FSHpaWUJjVzVKQURrLUxZeTRqNXhCUGpaTU9jTjhWeld3WlJCOGVXbzlsME5aUWY1ZmJUZENUYVRUamtBLW9tWFpJQUZ4Q2lNOXdSd053eFc3V0VVMWNuQXgtQmdsYlgxQ3dWbEgzbkU4czVfbF9mamNIdVFYVmRYc1Fs?oc=5"},
  {title:"&#8216;We were planning for relegation&#8217; &#8211; Tottenham CEO Vinai Venkatesham opens up on 25/26 nightmare", source:"SpursWeb", date:"06 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/we-were-planning-for-relegation-tottenham-ceo-vinai-venkatesham-opens-up-on-25-26-nightmare/"},
  {title:"What has frustrated Vinai Venkatesham and the 'irresponsible' thing Tottenham avoided - Football London", source:"Google News", date:"06 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiqgFBVV95cUxORkQzTHFMSm1aS2h2RDRON01fVXpROEREcV9VZlBaV0hka0tzQlRkQW05UGNVbFprU05JNEVFZE1VbjllR29BQ3FJdlYxXzJaM2JEREJsSXA1eG05VGFjODNYQTdDcERVcUNhQmEtVEZxem1JQU1xeHFwN2NpbDZuTHI2bUlJWFFEZnpiRGJQVkZBZVBOd2QxVURGMmhpa01zdEwwcXlOMjVhUQ?oc=5"},
  {title:"Everton and Fulham join race to sign £8.4m Tottenham outcast ahead of January transfer window", source:"SpursWeb", date:"06 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/everton-and-fulham-join-richarlison-race-but-tottenham-star-has-his-eye-on-a-more-lucrative-move/"},
  {title:"Roberto De Zerbi urged to make Luca Williams-Barnett Tottenham starting XI call for Leeds", source:"football.london", date:"06 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/roberto-de-zerbi-urged-make-34867923"},
  {title:"I became hedge fund boss after leaving Tottenham – now I want to replace Gianni Infantino", source:"football.london", date:"06 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/became-hedge-fund-boss-after-34865406"},
  {title:"Predicted Leeds XI vs Spurs with Wilson promise, ban risk &amp; Calvert-Lewin demand - Yorkshire Evening Post", source:"Google News", date:"06 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi3gFBVV95cUxOdnNIWWtTNnBfR3ZPRkNRcVFWUTNqeDcyeEt5Ni1kQ0dZbDB6MlF6N05hVlR6aFJiZkZCS19OYllLWmRfMXoybXZDMk5LV3FzVXR1QnQ0YW9qTmxWSVJJU3ZRb2d1dGJLcVFtMDZyZmdOOExGekExbTJoWFVtYmFFWkcwYmtjaXVEOGF0dDZqY1FLNmgyMkpMVnZ1UEhiX0lKMmdzREV1ZTc3ZlczY0dCU2hEd1ZYQThBVlczZW1tR29hMEw2UUZabTlVRkdHV3dHMlNaaWhWR0pQNFVDLVE?oc=5"},
  {title:"Spurs handed hope of re-signing Kane from Bayern - Paper Round - TNT Sports", source:"Google News", date:"05 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi3AFBVV95cUxNSl9CTF9FVEdjN2p4U0UzNkVDcDZMNGdXV1ZvZG1yZDNGT3c3SmZWTVNJZ19wWVdQcFlkXzJhNkIybTE0UnZVTkpDN1FEVTAwdGs2alotWnJVdlM2VU90ZTRrQlo2QU5QcWpiRVVNLW4wT2RLT1hUQVFLTUNLOUsxVWlMRjVrcTRoSnFFMnYzX1FoRHNvY0R6X0VVM0NNRnVDbzBGaU1jcUl1a0psTzZ1ZTJXc1RhWnQyQkpoWW5lRDBTbTc0MTliNmZteHVOc1hLNERCOVZzWnZVOGZS?oc=5"},
  {title:"Leeds could be without three key players vs Tottenham, including Calvert-Lewin", source:"SpursWeb", date:"05 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-boost-as-daniel-farke-confirms-three-leeds-injury-doubts-including-calvert-lewin/"},
  {title:"Tottenham&apos;s Harry Kane transfer clause after mega Bayern Munich contract announced", source:"football.london", date:"05 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/harry-kane-tottenham-transfer-bayern-34869949"},
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
