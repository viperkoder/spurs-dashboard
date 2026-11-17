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
  {title:"Tottenham remain in £50m race to sign striker who scored a hat-trick against Man City", source:"SpursWeb", date:"17 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-keen-on-50m-brian-brobbey-but-sunderland-set-firm-january-stance/"},
  {title:"Tottenham will soon have to swallow a bitter Thomas Frank pill - LiveScore", source:"Google News", date:"17 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMizAFBVV95cUxOMllCdU5VUDJrMU1mU05vVXRPU0EyN283WEZLVFM3T0V6R21IUkVMUU1iaHE3NlotTnpSb0I5RHdXY0VIczZyd3NvTldUek42b3dlc0JTS3FycktDYkI4dzVINk5hc0E2ajVJd1BYVVRLeDdkcnFZSVhMT2lBZDk3bnU1UTUyaEFKZ19QeUVRaTYyVWRVLXRxRFhOUm9DWTY4bHZQTDlPV1NuUmVEV193d0NZa19OWmw4UllkeVhOVmJZemVvTVVqRUpDWnM?oc=5"},
  {title:"Tottenham discover Gustavo Varela asking price and main competitors in transfer race", source:"SpursWeb", date:"17 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-and-arsenal-battle-for-29m-gustavo-varela-after-nine-goals-in-10-games/"},
  {title:"Tottenham&#8217;s former youngest-ever player has just hung up his boots for good", source:"SpursWeb", date:"17 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-former-youngest-ever-player-has-just-hung-up-his-boots-for-good/"},
  {title:"Tottenham star Jan Paul van Hecke explodes at teammates - &apos;Everyone needs to look in mirror&apos;", source:"football.london", date:"17 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/spurs-van-hecke-nations-league-34924468"},
  {title:"Tottenham&#8217;s Luka Vuskovic regret grows as Real Madrid join big-money race", source:"SpursWeb", date:"17 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-luka-vuskovic-regret-grows-as-real-madrid-join-big-money-race/"},
  {title:"Eli Junior Kroupi transfer update: Tottenham could &#8216;accelerate&#8217; £66m move after recent events", source:"SpursWeb", date:"17 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/eli-junior-kroupi-transfer-update-tottenham-could-accelerate-66m-move-after-recent-events/"},
  {title:"Sandro Tonali promise but two 4/10s badly flop in Tottenham player ratings for season so far", source:"football.london", date:"17 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/totteham-player-ratings-tonali-marmoush-34924229"},
  {title:"Richarlison has three countries to choose from as Tottenham set January price tag", source:"SpursWeb", date:"17 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/richarlison-has-three-countries-to-choose-from-as-tottenham-set-january-price-tag/"},
  {title:"12 goals conceded, Tottenham defence has a horror show on international duty", source:"SpursWeb", date:"17 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/12-goals-conceded-tottenham-defence-has-a-horror-show-on-international-duty/"},
  {title:"Fabrizio Romano drops bombshell on Pedro Porro leaving Tottenham for Barcelona - TEAMtalk", source:"Google News", date:"17 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirwFBVV95cUxPM0dFWFN3dndSbFJudW4wMm1CU2lWeDBrYXNreVR5RFlwSi1NLUFnWVdIRWVRRS1UV1NPQVJSS0ZZVEtsckJZR1lIWkVmempkVUp1bzdDSldBSVhiUmVRaFBFMjZzd3V2c0Nkd2dxTWNZZEUtYXJOMWlxcFM1aUVYR3I3LWtzSGR6bUNqWENGREVUUXZDV1locmhfOUx4YXBLRVFYSHZpWEwwUm1QSnBR?oc=5"},
  {title:"Transfer Talk: Why Mauricio Pochettino won't be the same coach he was at Tottenham Hotspur - Sky Sports", source:"Google News", date:"17 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi1AFBVV95cUxOeTV6SFVIV3BqUHFucmxWSV9DZ3YxTWdIWmtOa3V4RmpWSWQxUk5MTHhwZG14MzU4WFVKcmtFY3E1NENoWThERlJUSWRkdjcySG1QTnlsaHY3d055T2JYYXVmaDlERE8zVXl6YlhfazVubHMyT18wOTVvTUd3dW44eDMzSHBWRDc3QVlwN2thOWlUVGJXY0V6dThueU9kazZlVDRoRHdCSndKSF9rNGRxeEpUdHNPUFhrYXJNLXNSeXN3VVlxclI3dV84dUdIUGpCdUs5bQ?oc=5"},
  {title:"Video: Tottenham&#039;s Mikey Moore silences critics with first goal for England U21s", source:"SpursWeb", date:"17 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/watch-tottenhams-mikey-moore-silence-critics-with-first-goal-for-england-u21s/"},
  {title:"Tottenham&#8217;s main problem happens in 50% of games, but it predates Roberto De Zerbi", source:"SpursWeb", date:"17 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-main-problem-happens-in-50-of-games-but-it-predates-roberto-de-zerbi/"},
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
