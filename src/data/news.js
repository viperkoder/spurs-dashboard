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
  {title:"&#8216;He&#8217;s never coming back&#8217; &#8211; Tottenham fans emotional amid Mauricio Pochettino to Man United links", source:"SpursWeb", date:"10 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/hes-never-coming-back-tottenham-fans-emotional-amid-mauricio-pochettino-to-man-united-links/"},
  {title:"Prize Draw | Arsenal Women v Tottenham Hotspur - Arsenal.com", source:"Google News", date:"10 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijwFBVV95cUxOeXh0VkRiVDR2bGdWTWhfQ3ktNWI5WTJQVkEzTXd4ci1DdENqX0pVSVp3Vkl1bHMySzFEcExUb2NlMW5sWF9lRjFDb2NlLW5reWtkVWlVczhUM3FYbkVfdEE5ZlZNVFE0MDBKODhwUEg0d0dpZ0ZoUDIwMldmazA3SmY1SEtWQUJwUmx4Nk5RQQ?oc=5"},
  {title:"Tottenham fans will be relieved by Graham Potter&#8217;s latest Dejan Kulusevski statement", source:"SpursWeb", date:"10 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-will-be-relieved-by-graham-potters-latest-dejan-kulusevski-statement/"},
  {title:"Tottenham are weirdly represented in the FIFPRO list of top ten defenders", source:"SpursWeb", date:"10 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/four-red-cards-and-33-goals-conceded-cristian-romero-makes-fifpro-top-10-despite-tottenham-disaster/"},
  {title:"All 52 fixtures involving Tottenham players this November international break", source:"SpursWeb", date:"10 Nov 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/all-52-fixtures-involving-tottenham-players-this-november-international-break/"},
  {title:"Graham Potter sends Dejan Kulusevski classy message and confirms Tottenham injury plan", source:"football.london", date:"10 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/graham-potter-sends-dejan-kulusevski-34889122"},
  {title:"Tottenham star forced to withdraw from national team through injury", source:"SpursWeb", date:"10 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/significant-mathys-tel-update-following-latest-tottenham-left-wing-injury/"},
  {title:"Where Roberto De Zerbi ranks against past Tottenham managers on points-per-game", source:"SpursWeb", date:"10 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/where-roberto-de-zerbi-ranks-against-past-tottenham-managers-on-points-per-game/"},
  {title:"Tottenham get huge Mathys Tel injury update as French Football Federation issue statement - Football London", source:"Google News", date:"10 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMimwFBVV95cUxNZzhoZkk0X0NiRTB1M2YzWFhjMGJMd2dOZlJ0a3pXbEFRSmdpT3pYd0trZUJSMnkzQUQ0MDgyZHV1SUlwUjdneF9ob0tpWlpPSFM0d0dyWTlnUEh1eWpxVE5nZ1ROYmpVbzcyVGd4NkkzZWZIMldUbkotQk1PSkNxMzdxODZlemFMaXZPcFFidVp4Wm4zRmRuM003ONIBoAFBVV95cUxNaFZhaVB3Y0d1OHVoeEYwdThqc1YzMFF2UHF5TjNoNHlJMkhZdF9hUC1BNjduUWlmN2g0QWtKNjRfRG9RZTJ1Qk5JWHJUN3dKdjM1TTl3N3R3OTBaU0JvNjhkSlFOUEVFWEpEaENyTE1RSS1lNVFvX09FWE1PaElBekVBRHEyQWQ4WFMxRGFOVk42bTJibE0wMFhYaGRsbERH?oc=5"},
  {title:"Tottenham top the table after losing £85m and over 7,000 days to injury in last three years", source:"SpursWeb", date:"10 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-top-the-table-after-losing-85m-and-over-7000-days-to-injury-in-last-three-years/"},
  {title:"Five worrying Tottenham squad details that you may have missed against Leeds", source:"SpursWeb", date:"10 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/five-worrying-tottenham-squad-details-that-you-may-have-missed-against-leeds/"},
  {title:"Cult Heroes: Steffen Iversen, surely Spurs and Norway’s greatest ever striker - Planet Football", source:"Google News", date:"10 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiswFBVV95cUxOYnVEaU0tb0tMRzJCb01wM3lCUjVHSjB1dzlWM2xrS2dHWHpfdUxKNkFEUzVuclhVcUk3MWhsNXZLYzh3aW9MaGpBVjc2Y2pyUG51V2tGaGRrY18xTGRZdmZWODR0Wmg2WWJRUnJHaE85ZEZGNWtIdnl0RHNVcW9wbTB2ZTREcHYtcU1jTi1MMFB2cHUyNjkxdGh0dEZYbmoyWkVkd0hhZjVkWFEwSzhiRnd1QQ?oc=5"},
  {title:"Tottenham get major new Mathys Tel injury update as statement issued after squad announcement - London Evening Standard", source:"Google News", date:"10 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMirgFBVV95cUxPQmRxc0JSUjNWeFlaZWRRNU0zQWJ0X1pDaDhDN0dzQzNaSzRjNjBEZXd2NXF1NGNERDk5eXoyM29acV9tdzMtVGtfREtSWjJrZWNUWUhuLU1ueElFYzBFcUtaSDJlMUppWTlfUWZGN2kyOWRhcmVzQ2pZT2doZ3JMeS03OWtCUmVMd0xHMFpaODVxYUVNZEV0dnZxeTJhdWdsWVdEWUpGZS1RM21wbHc?oc=5"},
  {title:"Tottenham face being raided for four players by Thomas Frank at Crystal Palace - Daily Express", source:"Google News", date:"10 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilgFBVV95cUxOZWFfQWFnZUxTMmhySkdPX1NOQjFzTDUxUjBkWmRsbzBKb2R3WDVNTG03TDFiampRY3UyNVZBMFFwVVljV01mQThrYUQ0RWxpTkNhVWs0NEE5MU5COTBvYUNwOXhmMkkzYzdSZ0JwYmk0ZXV3T1FXSS0zalhBTmJpNFlQY1dRdWtBVU1jRTdyOVp1ZHpfN0HSAZsBQVVfeXFMUGsyT2pGNThZZTFRYm1GaENLdGZVc3FRVW5kRjRfS01ZRkg1SExsRC16Ml9oeFZydm9sNGNNQlVjYm55RFZTcWNaMF9JN1R5QVFQM2ZaMHJtdk8xRUFoWU9vaHVxcVdIUTRUeTBuaGt4UWFYRDc4aXZUemxJUVRSNUY4b1g5dHFWZXFyQUpmVWFQVFVRaUI2QWhFTEU?oc=5"},
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
