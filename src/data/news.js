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
  {title:"Three winners and three losers from Tottenham&#8217;s dreadful defeat to Leeds United", source:"SpursWeb", date:"08 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/three-winners-and-three-losers-from-tottenhams-dreadful-defeat-to-leeds-united/"},
  {title:"Daniel Farke post-match interview - Leeds v Spurs", source:"BBC Sport Spurs", date:"08 Nov 2026", tag:"Fixtures", url:"https://www.bbc.co.uk/sport/football/videos/ck62yp50glv3o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Roberto De Zerbi post-match interview - Leeds v Spurs", source:"BBC Sport Spurs", date:"08 Nov 2026", tag:"Fixtures", url:"https://www.bbc.co.uk/sport/football/videos/cmn4ekyg5en0o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Why Roberto De Zerbi will miss Ipswich Town clash as Tottenham face nightmare scenario", source:"football.london", date:"08 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/roberto-de-zerbi-miss-ipswich-34880522"},
  {title:"Tottenham star spotted leaving Elland Road on crutches in latest injury blow", source:"SpursWeb", date:"08 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-receive-worrying-injury-update-on-mathys-tel-after-jayden-bogle-escaped-red/"},
  {title:"What Sandro Tonali found &apos;tough&apos; and the big mistake Tottenham kept making in Leeds defeat", source:"football.london", date:"08 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/sandro-tonali-premier-league-leeds-34880583"},
  {title:"Mathys Tel exposed another huge problem with Omar Marmoush and Dominic Solanke - Hotspur HQ", source:"Google News", date:"08 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiswFBVV95cUxPVFlRV1REUk1DVXVDTjBMM19yZnR3cEYxT3ZLT2VEWVIxbVRSZWZlalEtUUhoREJTSlF6VV9vcFp3UFU2WkxoODFQaldvY0ZJQUwyMTZzUHk0R0M2cjk5R19Fb1pRb2pGZmdFcVBueGdDUnB0Y21VejRxQzlqQ1ZQN3hrTUJkOV90TGRSNURsbU51WFIzb0U5NDRUaGJDZ3h3ZFdyblVJN09KR3FZVGF4U19wTQ?oc=5"},
  {title:"Richarlison risks winding up Tottenham fans with timing of latest post", source:"SpursWeb", date:"08 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/richarlison-risks-winding-up-tottenham-fans-with-timing-of-latest-post/"},
  {title:"Tottenham demand media ban for Brazilian reporter after footage emerges of anti-Spurs chanting with Arsenal fans - Goal.com", source:"Google News", date:"08 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiqAFBVV95cUxQbTF3THlRdVBLOFRLMUktQm9NU280aXhjazVaMlpMeGtJeVFYWjZOWUg1d1VKMmlRU01IZEt5YUlqQU5hOUpkd0M3OGUtb1FvRFpSSk5abU5TdURXSVNjODF4c2N5Snk0RVBSVXc4UUQ0YW1sS1hMLTl3X21kLVlZRWVZTmlhRXAwTVVLRS04cGZlbjJqdjRKNDZrTWtYYXRCbDYwMnJ1bEY?oc=5"},
  {title:"'Absolutely garbage' Tottenham star slammed after Leeds loss - 'Did we sign his twin brother?' - Football365", source:"Google News", date:"08 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxOeUNnZThBSTRXbHZnYVBLVnR5TV9vYTBjeFl0TmNDbkk4a0U5MXFjbXg1UlUyVUNJbC1kUTRMRjZKUDN6WWlmR25CVzhsenF5d0YyVV9wZlpvWC1SVTFJQ0R0SGFMc2dtNmF1UUhzN29kTmZGUUp2cW9idTl1QUtiOHRILU1GOFB6X3N2aHppYW1leVdUdk9VZg?oc=5"},
  {title:"Leeds United 1-0 Tottenham Match Report: De Zerbi got the whole game wrong", source:"SpursWeb", date:"08 Nov 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-match-reports/leeds-united-1-0-tottenham-match-report-de-zerbi-got-the-whole-game-wrong/"},
  {title:"Roberto De Zerbi given Tottenham wake-up call as Luca Williams-Barnett puts teammate to shame - Football London", source:"Google News", date:"08 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijgFBVV95cUxNUDJuMEZVcWYtblFNYUxZdXJoQ1pXcEc4NTlDVjFPa0lNV1cxYXVfVmhQM0oxN1ZKZzBNTl96ejVMYnczRmJPazBNTzhEX0pvM1VERk44NGtHMVBKZnpMNmYycnBhN0FQSWJGSlBTS212Nkk3Mm9yT0NJM25mX1dZX2MwWHZCQTc4WEdPZ21n0gGTAUFVX3lxTE5FOGZuS1lLQkZvSWIyaERfeWM0eUl3eFVOSzNIWWdfVUJnSFFsb3FKSkszOXZzeVRsM2hOLVU1SENkcWxMUmMyWmIzcmZhTEtSQ2VzOGZUelNkZ3RGbFl1dThqZ2JsNVpVTlg4WW43QTZIMzM2NGZ2MHQyVU9BcGtLNTNXRmhfSThSc2doVTRVb2xiMA?oc=5"},
  {title:"Tottenham summer signing branded a ‘fraud’ as alarming streak continues - talkSPORT", source:"Google News", date:"07 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiiwFBVV95cUxObi1ndHJRbDZ5eDRCb3JrTzhuUDZWLUtwX0tWSFhmZEpvR19mQjhrRm1tYXYzX2w1Rm5FeWNnRl8wdG9DazdSWnNNdVZZSGUxMGxPNWFRMEZlX2dGS3IydnFJYlZQWmt6dGtuWndjb3RPWlloQ01NYl9aS1U2NlU1QzZpS3YxTjRaRkJV?oc=5"},
  {title:"Tottenham must battle Juventus and Everton to sign a striker Pochettino loves in January", source:"SpursWeb", date:"07 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-must-battle-juventus-and-everton-to-sign-folarin-balogun-in-january/"},
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
