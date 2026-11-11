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
  {title:"Five Tottenham Hotspur stars who could be handed new contracts this season", source:"SpursWeb", date:"11 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/five-tottenham-hotspur-stars-who-could-be-handed-new-contracts-this-season/"},
  {title:"Tottenham are watching the first signs of Pedro Porro becoming the next Cristian Romero - LiveScore", source:"Google News", date:"11 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi4AFBVV95cUxPTzJZWHRFWnNvNzAwbmdBV1ZGQ0p0ZGROMWtoY0RZZE9iOUdpU2NwZkNWQmg1a09qdGxHZzdXUU1icFJiVGhCNV9QSWd5RXJDRElrZ0Zic20waUw3TXdKM1VRNWNUeWprM2lreGxrUzVHcVM2cjRCTlRyMDZTTU9FUzc3eWtjQnZONFpwYnhOUGJPSjladjNZTjliTzNNMEh6a3U1Um1lMUNUem8waV9HamJPUS0xOThRTzNuNVFqem1GQXRHc01hb3MwOWV1bjZtaWRSUlA0NTNneWRzdVdPMA?oc=5"},
  {title:"Tottenham striker upgrade would cost around half the price of Dominic Solanke", source:"football.london", date:"11 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/tottenham-dominic-solanke-nicolo-tresoldi-34896079"},
  {title:"&#8216;I&#8217;ve cried&#8217; &#8211; Xavi Simons finally reveals good news on Tottenham injury after nightmare 2026", source:"SpursWeb", date:"11 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/ive-cried-xavi-simons-finally-reveals-good-news-on-tottenham-injury-after-nightmare-2026/"},
  {title:"Tottenham ready to stun Arsenal with sensational TRIPLE SWAP offer for Eli Junior Kroupi - TEAMtalk", source:"Google News", date:"11 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxOV05CSk16QVhxZlc2WUdiNmRUOG9CbE9EN2lCT2JEYWZiYmwwY29Fb0hfS1JRWllfLUpIaFhueFNZQUdGUnFTRVU4LWo2OVlwSjJDWTUtU0hFTlBXTHc4UlNZU2xQOGswMHQxaVlHS01pSm81cEZuREY3dzZyNWpRXzRseFF5ZXoyWXlSS2l6Z2ZPUDhnMVF3dFNTbEJPSE5IWkNkTWQ4TQ?oc=5"},
  {title:"Danny Kelly dies aged 69 as Tottenham pay tribute to legendary presenter", source:"football.london", date:"11 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/danny-kelly-talksport-spurs-tributes-34895351"},
  {title:"Pedro Porro provides update on Tottenham future and fires Barcelona chief clear transfer message - Football London", source:"Google News", date:"11 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiogFBVV95cUxPOEM4ekpoQjhxQ29RaUhqOFlsOEtfZlpJaU5RelJNZGpKOG9rZDRFeS00QTJFbkxPSHE2Z1lTVlRlMFdlaGkyUjdlVXhRdW5vaUphaFhROE16UkVQbDJFSHZpQ19RTGVOamZRajk5QkFOaThWam0wMWhaSXhZOTN6bWlBVU5IaFhoM3JSR29DSFl0Z285REQxbVNEelpwWGd0TXfSAacBQVVfeXFMTm9IZmtTc3ZTSDVIMDh1SkFKeGkwQktQZTJna1VPRVNkUkx2cXF2MWZPM2dOc2taNmRSWm51MUQtdDdtcURZU1M5VWthQ3BOMGlRTDFDN1ZfZTl5bGk3R0pkUWI5SUFxRWVwR2dUYlhrWDRmZ29BNXNpMEljR0FuV2lzWVN3S2E5bmRTTllzb3paRWp3TWpUX0dmUlpvU1Z5V3NLOGlMZ2s?oc=5"},
  {title:"Five Tottenham players Thomas Frank could sign for Crystal Palace, including Wilson Odobert", source:"SpursWeb", date:"11 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/five-tottenham-players-thomas-frank-could-sign-for-crystal-palace-including-wilson-odobert/"},
  {title:"Dejan Kulusevski takes aim at Tottenham with damning comments - &apos;Disappointed in people&apos;", source:"football.london", date:"11 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/players/tottenham-dejan-kulusevski-injury-spurs-34893829"},
  {title:"Tottenham fans can finally put the Mauricio Pochettino reunion to rest - Hotspur HQ", source:"Google News", date:"11 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijgFBVV95cUxOdXJmWGpmU3NraWF4S09oVklfNVYzU09zeDY4XzdWMUJqRFFFdnV2dU5iUGM2VWZ5WC1YcjVHOW5mVGJZVndWU1FZeUlQZmx0Q3lNWE5KNjg3RE9hTGRxb01yc2RvQl9DSVlBUS1VRXowbEVkMTFGRkcwenVDSWNoNjExS3UyTXNEeVBZWW5R?oc=5"},
  {title:"Predicting Tottenham&#8217;s next five Premier League results, including North London Derby", source:"SpursWeb", date:"11 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/predicting-tottenhams-next-five-premier-league-results-including-north-london-derby/"},
  {title:"Mauricio Pochettino: What could ex-Chelsea and Spurs boss bring to Man United if he replaces Michael Carrick? - Sky Sports", source:"Google News", date:"11 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMizgFBVV95cUxOVHBndjFUd0tLTVVNcnExUmhWQlVUbnpRVGZBa2JnV3JOSnlQY2dla3BGQVpTUzY2b2dwZ1RKNTIxVW9kcGVWb0VzZWpmaEo1Nm5lWVdKUUMtQmd2TV9WaWJyeTNTaWJlWG1Zd3lFODJNdmEyTTNWYVcwenpWY3pDN0lhbExPYmp3bG5qYkNyWUZNVzBRbFBSeTAwbnFzTzdmaS1vdDEta25SdlFlcVBiOElWc2ZrZ291NW0zdWtqLTRwZjBjRFdneE4zYnNydw?oc=5"},
  {title:"Xavi Simons provides new Tottenham injury update and lifts lid on &apos;hospital bed&apos; nightmare", source:"football.london", date:"11 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/xavi-simons-provides-new-tottenham-34892203"},
  {title:"Mauricio Pochettino could raid Tottenham and Chelsea for five stars if he takes Man Utd job", source:"football.london", date:"11 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/mauricio-pochettino-could-raid-tottenham-34889791"},
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
