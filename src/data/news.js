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
  {title:"Tottenham v Newcastle United: Key stats and talking points - BBC", source:"Google News", date:"28 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi8AFBVV95cUxPZ09Zb3RKU0gxVmx3VDYydWw3blFOQXB0ZUJjb1ZBbVRZT2VEQjEzMDdaOENGRE5oT3pUQnFxLTlMY0VERFF3dDd5TU12Tm1WbE04UnZZOTVYSXdCZ2RRYkFlRzJqci11YlFvbXluY3AzMzFTSFJXbWx5a1lUblA0SXdoaGEweXpXREVtdHpQcThLVzFyQzZyVlRINElsWk4tTWRKU1ljM3Q1VzlqYUZ1VFBOdUpLa1BoeVhPOUc3dEtfQnlpVmFHeEZlTTc3bzlkZG1CS29OWmRlQUloWlRFblZLZGFBNDNjZzltN3pzQnk?oc=5"},
  {title:"Tottenham and Chelsea eye Jonathan Jesus transfer after £6.9m bid was turned down", source:"SpursWeb", date:"28 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-and-chelsea-eye-jonathan-jesus-transfer-after-6-9m-bid-was-turned-down/"},
  {title:"Tottenham eye striker market opportunity as Marseille may be forced to sell players", source:"SpursWeb", date:"28 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-eye-striker-market-opportunity-as-marseille-may-be-forced-to-sell-players/"},
  {title:"De Zerbi &#8216;insists&#8217; Tottenham push for ninth signing despite £60m rejected bid", source:"SpursWeb", date:"28 Aug 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/de-zerbi-insists-tottenham-push-for-ninth-signing-despite-60m-rejected-bid/"},
  {title:"&#8216;Same old Tottenham&#8217; &#8211; 2017 Carabao Cup runner-up says Spurs have wasted money this summer", source:"SpursWeb", date:"28 Aug 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/same-old-tottenham-2017-carabao-cup-runner-up-says-spurs-have-wasted-money-this-summer/"},
  {title:"Tottenham explore late move for Dominik Szoboszlai&#8217;s £21m teammate to bolster full-back ranks", source:"SpursWeb", date:"28 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-explore-late-move-for-dominik-szoboszlais-21m-teammate-to-bolster-full-back-ranks/"},
  {title:"Gallery: Preparing for Newcastle as Marmoush links up - Tottenham Hotspur", source:"Google News", date:"28 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxOdzFsYXZsMUhIU1NMU2pqYmpRTUF6eFAtRTV2V3ctWnVRWGlqcGcxaUFCZmYyeVV5Zi1CUHE5RmpLc2prTmpubTRDcVk5RG1tVVJSN3NWYVRwYjZCRUxvRTQ1QVlEeXNvbGs5b0htZjdCVGpocDdpckhRMG1BR3NpUnR3SWEzVjVuaDNneDdiQXh2ckJWdmpVdWhDZkZVV00?oc=5"},
  {title:"Everton now want to sign Tottenham midfielder after Roberto De Zerbi call - TEAMtalk", source:"Google News", date:"28 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxQRGc3V3d0cGktMmJVbDZObnU1VkluMkJNckJDM2F1MzFuUFV5UWtxbGtXVnQtUmZIX2tNMzR2a0hWRGlTdEtvS1YyZ2xNYWRYT0RFWXBtcVFOZUdDU05RTnRGcWc0Rmdoc1o1VWJFbVNaYkpTS1lBR1BWMmtMRzRvcEk3M1BLSEZwdzROajNldDhRVzcxX2lrRnlEMjljUXlfdkZWOQ?oc=5"},
  {title:"Man Utd to submit official bid in Aston Villa, Tottenham hijack once one deal is finalised - TEAMtalk", source:"Google News", date:"28 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiugFBVV95cUxQSHZNeUtNUkg5SEk1Q2Z3cXdnOUdqdHJuXzdkRnFpSzN2RmR0YXhGY1p0ekZ5MW9adzJtWEk3WHByQUdIRmw1M1FvUEFIUjRrUEZOemVJRnNnNjBIXzdiVVQtVGgtdE0tSjdPTVlNdlR5Y2s5Rlg2WGN2bGN0OFExcXlpQVZaZ3NkcEhlcEo4YlFKYlJBUjNOTXJUUF9nZmlZYTRVQjNvY0hBZ1JZTjZma19LbmVfd2hSRlE?oc=5"},
  {title:"Tottenham consider shock part-exchange deal for £80m winger, involving Richarlison", source:"SpursWeb", date:"28 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-consider-shock-part-exchange-deal-for-80m-winger-involving-richarlison/"},
  {title:"Maddison, Kudus, Sarr - Tottenham injury news and return dates ahead of Newcastle", source:"football.london", date:"28 Aug 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-injury-news-newcastle-united-34535541"},
  {title:"Club releases Fan Engagement Plan 2026/27 - Tottenham Hotspur", source:"Google News", date:"28 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijwFBVV95cUxNRlVpVGZCUUpEdFdaUnh5Q0dUcVVHcmlGT2ZWcmpMdzU2b0RkMGZHMmtWTlVVemFZOHBsNDlNaXloUFZxN2U0NkJRVUtOZ2pjRUlRNkdVdkoxSXlSdFRnREpMUFBKbDhKLXB3SUtXZTJES0p4czhEQWN5MWFGaVNMelFnN0NCSEhuWnNicFBNNA?oc=5"},
  {title:"Tottenham will have to move fast if they want to hijack £22m Nottingham Forest bid", source:"SpursWeb", date:"28 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-will-have-to-move-fast-if-they-want-to-hijack-22m-nottingham-forest-bid/"},
  {title:"Tottenham transfer news LIVE: Cody Gakpo agreement, Neco Williams interest, new striker target - Football London", source:"Google News", date:"28 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMingFBVV95cUxOc3JHTFBicmVWTkZvMkdBNnU3V2FaRjcxb29QdFZUNDNpQUVlQXdwamtUeHkxcTUxRmlLRDk5SFkwRDZ1ZnRUQVlZM2k5UktVbTZDY01YZFlhRFpwNXpwSERfd1Q0aHd5S2pOLUs5TWtLcGFucEoyaGhyUHlReGR2cUtvRlRtOEVIRUl3Mm5pYjVuQzc4RGN2TXpWdzJXQQ?oc=5"},
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
