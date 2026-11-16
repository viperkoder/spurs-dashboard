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
  {title:"Tottenham legend predicts Mauricio Pochettino will get Man United sack in 18 months", source:"SpursWeb", date:"16 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-legend-predicts-mauricio-pochettino-will-get-man-united-sack-in-18-months/"},
  {title:"Tottenham are scouting £70m Will Lankshear, special clause could help re-sign him", source:"SpursWeb", date:"16 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-are-scouting-70m-will-lankshear-special-clause-could-help-re-sign-him/"},
  {title:"Thomas Frank: Crystal Palace agree deal in principle with former Spurs and Brentford boss as Pierre Sage's successor - Sky Sports", source:"Google News", date:"16 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi9gFBVV95cUxNSERRckdTTjd6YkJubWJmWW5wZHJ3V1BnQ3dBd1gydDRLLTVkSGQzLUNRNzdzUU9PTEFuVWlZLWE5cXJ4Z3paNWx4MWZZclZrM0UxQk9FbU9uM0NacVJwQVV0R1F6MHg5LUt4VFdGMEZZSGQwNVN3T2hzaWVXR01JTzFEb3Y0YlFJMjQ4MkpjckVfc2N3N0pBSTg4N0pRNTRsbXEyZDRBSzRUYl9vM2tXa3ZnOGlXN3R2VERZYWNJU2FVVGtpWndUQnY5MGpPREtVS0JoOFBZX2hXeFNXd213Umszc1gyVTVMOVpRaTFNZWFZS1RwbUE?oc=5"},
  {title:"Antonin Kinsky just had his best-ever game for Czechia and Tottenham will be thrilled", source:"SpursWeb", date:"16 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/antonin-kinsky-just-had-his-best-ever-game-for-czechia-and-tottenham-will-be-thrilled/"},
  {title:"Andy Burnham issues statement as Arsenal, Chelsea and Tottenham braced over 3pm blackout", source:"football.london", date:"16 Nov 2026", tag:"Club", url:"https://www.football.london/premier-league/andy-burnham-arsenal-tottenham-chelsea-34918936"},
  {title:"Tottenham injury news may pave the way for Luca Williams-Barnett&#8217;s next big step", source:"SpursWeb", date:"16 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-injury-news-may-pave-the-way-for-luca-williams-barnetts-next-big-step/"},
  {title:"Tottenham may find themselves the victims of a quest for revenge on January 23rd", source:"SpursWeb", date:"16 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/thomas-frank-must-wait-for-tottenham-revenge-as-crystal-palace-prepare-announcement/"},
  {title:"Will Lankshear to Arsenal? Second source backs up nightmare Tottenham situation", source:"SpursWeb", date:"16 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/tottenham-dealt-fresh-will-lankshear-blow-as-middlesbrough-set-january-stance/"},
  {title:"Four players set to leave Tottenham at end of season as major decisions near", source:"football.london", date:"16 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-expiring-contracts-richarlison-davies-34918223"},
  {title:"Five Tottenham stars could return to action against Ipswich after fitness update", source:"SpursWeb", date:"16 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/five-tottenham-stars-could-return-to-action-against-ipswich-after-fitness-update/"},
  {title:"Thomas Frank agrees Premier League return nine months after Tottenham exit - talkSPORT", source:"Google News", date:"16 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMimgFBVV95cUxOVVYxUzB5ZVlPNzJiUzREYTVTT3d2UjBQX0hNaVBNaG5UQmRjN0M1SzlfNkZZOTI2ZXdXM3BLOVdRcTIwaVVtYzVBaWZwUjRKWm5FWUdOS01WcGZhTUVZUUk4dHR3R3g1dWd5bmk0TU10X3NjNlJHSHVFTk5zT1g1YzRmcmxwSlBOMjlCazgyc1UxajlKNmg4TlVB?oc=5"},
  {title:"Tottenham report: Striker transfer is ON, as Eli Junior Kroupi's future is decided - FourFourTwo", source:"Google News", date:"16 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMitwFBVV95cUxPX29hM3BvYmNSSC1zTy1YSmRxQndYcE9lNzJKZnpQdGR6aTVBNVNpMnhNYXZhZW5teGpfMF9VaGpWMkU2ZDRhWWVqMXdMdDNaMF8zOHpqamllZkZieVUzX09IUVJnNTFKdi1FazczeVZOb2xuM1FEejJyalJuZmZndDYtWTVlSDJxanJXZkttTXZzeHpqTGF5akdueUZzYlctQ2JsX2xLSTFGa1R1R2poMk41eWlpcjg?oc=5"},
  {title:"Tottenham news: 'Timing has never aligned' for Pochettino to return - BBC", source:"Google News", date:"16 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMi8gFBVV95cUxOUkdlTEJSU3RJRmdxU085ZE9iYzk1a3dvWWtSS1MyTXhaRVBLSGJ4TXdnYlVLWU5VdHRZdHlySkNSZWpQYzc2cnU3OXdJT0dQOWRzRlVzSS01eVFpanhRelA5RlptcFhVU29LNnpFaEczZTFWenZvdWU4TDFrVDNiMHhFd1I0X2xoajc0NG5WUmRRbTJPSFhVVEVKN2hxaVpKRTVnb2dOdUxrajVTWncyeFpXeVNxenhEbE0tNko3RlRLUWdtbVFSZ3REOFdQU01QZHhxS2k3ZWFFUkpVT09rMjVOVFM1Y3BURnh4Qm5OQnJ0Zw?oc=5"},
  {title:"Chris Waddle urges Tottenham to use Chelsea and Arsenal blueprint for next big signing", source:"SpursWeb", date:"16 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/chris-waddle-urges-tottenham-to-use-chelsea-and-arsenal-blueprint-for-next-big-signing/"},
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
