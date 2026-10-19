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
  {title:"Dejan Kulusevski&apos;s 526 days of injury hell as Tottenham ace finally returns to squad vs Coventry", source:"football.london", date:"19 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/dejan-kulusevskis-526-days-injury-34783560"},
  {title:"Dejan Kulusevski could return as a &#8216;better&#8217; and &#8216;stronger&#8217; Tottenham player &#8211; De Zerbi", source:"SpursWeb", date:"19 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-says-dejan-kulusevski-could-return-as-a-better-and-stronger-tottenham-player/"},
  {title:"First Richarlison lost his Tottenham place, now he&#8217;s lost an entire private island", source:"SpursWeb", date:"19 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/first-richarlison-lost-his-tottenham-place-now-hes-lost-an-entire-private-island/"},
  {title:"Video: Tyrese Hall scores delightful chip for Tottenham U21s fresh from Marbella", source:"SpursWeb", date:"19 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/watch-tyrese-hall-score-delightful-chip-for-tottenham-u21s-fresh-from-marbella/"},
  {title:"Ticketing | Bournemouth and Brighton matches go on sale - Tottenham Hotspur", source:"Google News", date:"19 Oct 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMi1wFBVV95cUxOZ1FMcm9sWXFacWp0Z0NNbWFkNFpoSDM0TGtEN1JLX1IzZ3BwOGU4YS00RDRZNkRCNE1ybGlSd2M1WldqM180MFd6enl4MVJIR0stcUVOeFAyWjRGT0tHN2ZWMUozaG1LMG9tSVNlRThRbVVyQlZCaHhjRnNVd3RTd280RHpmUXRPN0g3czluUS1ON3R4Rkx1MW5Hc0xTYVVtendmWTlYM1p3eHAzVS0wN183TnV6YkNMdU9CTWR0ZDVneURfLXZGVE9CU1F6ZHVtTG1wb2tNWQ?oc=5"},
  {title:"Roberto De Zerbi reveals if James Maddison could start for Tottenham vs Coventry City", source:"SpursWeb", date:"19 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-reveals-if-james-maddison-could-start-for-tottenham-vs-coventry-city/"},
  {title:"Three ways Tottenham could line up against Coventry City without Savio", source:"SpursWeb", date:"19 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/three-ways-tottenham-could-line-up-against-coventry-city-without-savio/"},
  {title:"De Zerbi bans Spurs players from key item in bid to turn form around - talkSPORT", source:"Google News", date:"19 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMikwFBVV95cUxQOGpKd3VFNHZ1dXh1aDExRk5jbjZGM3hEOHMxSVJCWFEzMW1hVndaVVJ2ejBrUE5GT2xPbVdXd0hHMkdub0l0Uko0Y0ZpNElGVFh3bWJ3ZDFZU1Q0WFZnb0RiQmwxNE1aZ0NFZkd4R24tVzB1YVVES1hKbFFJMW1SWDdSZWFPUzlGdTVRZUd3TGwtUDQ?oc=5"},
  {title:"Tottenham: De Zerbi delivers huge James Maddison news vs Coventry as Marbella ban revealed - TEAMtalk", source:"Google News", date:"19 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiqgFBVV95cUxPOGg5X2YwSEhrSUJ5YTY4NDlTX0VjZ1VieDlFZU9Nd0NtdUdBc0gyT2JHQWpjLTMyd0VZRkdlTV83SEFxMUV1bElmdDczSFlEUUJ4MGlmMVU3Y2FwVUt1aEJWc2FGNkFpQnY0Z0NxZHZGZU5GWGpidUFBSWJRSE9aTkZGcFNxTXFtX2tzdThwNmZwYkhkTEtVOHU1SV93Y3pzMFpQQUloYWhHUQ?oc=5"},
  {title:"Chelsea send &#8216;nice&#8217; warning to Tottenham amid woeful Stamford Bridge record", source:"SpursWeb", date:"19 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/chelsea-send-nice-warning-to-tottenham-amid-woeful-stamford-bridge-record/"},
  {title:"&#8216;I&#8217;m the biggest Spurs supporter&#8217; &#8211; Heung-min Son is still thinking of his beloved Tottenham", source:"SpursWeb", date:"19 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/im-the-biggest-spurs-supporter-heung-min-son-is-still-thinking-of-his-beloved-tottenham/"},
  {title:"Tottenham predicted team vs Coventry - Mateus Fernandes and Williams-Barnett chance after new injuries", source:"football.london", date:"19 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-predicted-team-vs-coventry-34781910"},
  {title:"11 players to miss Tottenham vs Coventry after Dejan Kulusevski injury update - Football London", source:"Google News", date:"19 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxPLVNHdmVESDEzYXJIZzRiTDR1ZnNSR3MxTnhJbElfbmh1NWd5VWFGdGt3SFJaNE9jYUxnaE52UkxFbXQ5VTBMNXV2a3hEb0t3WllFUmg4LW1VRExZOS1Vc2I4TDFIb0FzUjBNakY4a09FZ1UxNkRqX1hIYzFsRjEwTy1Fb00yY3p3S2hqQ2pFWDA5bklBYU5Cek5jR0dTYm9kRkN5NHBVTdIBrAFBVV95cUxNRkJSQnIyaklnajRGMFhnelVoQlBNRHdjNWh1RXRzc2RWUzYwSWZMNUlhTE9OR1luZlZhX25GaGhBVXJEQTd3d2UtZWZSOWJfdTAzYW5NeVZxRXoybW9LVlV0a0xueVEtNDl3cmNNRHl1bUU0djFJU0Rma0xrVWNJeFctS21DRlJLcmJIZ3IyQ24xUkxLemZjaW5XeTFnNU52WmFjNGVxbU9FZ1J3?oc=5"},
  {title:"De Zerbi had just one rule at Tottenham&apos;s Marbella training camp and gives James Maddison update", source:"football.london", date:"18 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/de-zerbi-one-rule-tottenhams-34781696"},
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
