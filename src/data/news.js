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
  {title:"'Void of leaders' - The problems for bottom-side Spurs after winless start", source:"Sky Sports Spurs", date:"08 Oct 2026", tag:"Interview", url:"https://www.skysports.com/football/news/12040/13596052/tottenham-sky-sports-special-podcast-tim-sherwood-and-michael-bridge-assess-spurs-problems-after-winless-start"},
  {title:"Tottenham fans will not be pleased to discover the officials for Man United v Spurs", source:"SpursWeb", date:"08 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-will-not-be-pleased-to-discover-the-officials-for-man-united-v-spurs/"},
  {title:"&#8216;A move is being planned&#8217; &#8211; Tottenham receive big Luca Williams-Barnett threat amid contract talks", source:"SpursWeb", date:"08 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/a-move-is-being-planned-tottenham-receive-big-luca-williams-barnett-threat/"},
  {title:"Dejan Kulusevski takes big step towards Tottenham return in 11-sided training match", source:"SpursWeb", date:"08 Oct 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/dejan-kulusevski-takes-big-step-towards-tottenham-return-in-11-sided-training-match/"},
  {title:"Rashford loves scoring against Spurs! - Manchester United", source:"Google News", date:"08 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiiAFBVV95cUxPWFMzOWhYTFhDQU5MMjhwaUtnaTJxeVBMRVNlbzNFbWNwdDdoQkVJRlE5M2JqVm5VR1MzYlA1Q3h6SVVZQmFTZ29fWFYtZFJjSktaY1NwbHRjMnVMakxCMTR3TVlRTkRxdHlBckp5SDRqRkNVb1VHRGRHcklCbnVsSkdOUUpxQV9z?oc=5"},
  {title:"Where Roberto De Zerbi ranks among Premier League&#8217;s highest paid managers with £8m Tottenham contract", source:"SpursWeb", date:"08 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-ranks-seventh-among-premier-leagues-highest-paid-managers-at-8m-a-year-tottenham/"},
  {title:"Dejan Kulusevski boost emerges as Roberto De Zerbi faces decision for Man Utd vs Tottenham", source:"football.london", date:"08 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/dejan-kulusevski-boost-emerges-roberto-34734457"},
  {title:"Man Utd put Tottenham on red alert as Roberto De Zerbi faces Luca Williams-Barnett dilemma", source:"football.london", date:"08 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/man-utd-put-tottenham-red-34733560"},
  {title:"Three winners and three losers from Tottenham&#8217;s international break", source:"SpursWeb", date:"08 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/three-winners-and-three-losers-from-tottenhams-international-break/"},
  {title:"Tottenham Sky Sports special podcast: Tim Sherwood and Michael Bridge assess Spurs' problems after winless start - Sky Sports", source:"Google News", date:"08 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMi8AFBVV95cUxPdEpxeFQwX09HdHhLTS0xSElOanN1RDRLc0JUNkhlcHlFSmtySEhFZGFRaXUxcFJ2TmI4dkpaU29vcURIUUhQc18wTEhoa0pxVGh2Nl9KandiU1hZVUZwXzZuZE1NcWkwb1JBZUtObDA1R3Y4VmxsVzFWOTRNZ1hpd2tWT3ZlRkR1bll1RmlnU3FGLTh3d1N0Z2lGZFJUZFJvVjRWNV9qa2twUVd4dW5NWE9rWXdMd2JvNDlnZWd3cTQ0X05YUENaWGJDbTJxckNLdlpSbVFWbXRWUmt4X0p5eWdXbnVEVlFSTzhQWlZnWlM?oc=5"},
  {title:"Arne Slot stance on replacing Roberto De Zerbi at Tottenham emerges amid Man Utd claim - TEAMtalk", source:"Google News", date:"08 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiywFBVV95cUxNSkh5blZxRjZsVkJDVW5UbDBpSEgxWnB6dzlQYXFZQmlrdEdpMEstSjlSdlZHbkJ2eFBjYzRRa2dxY0JVZHVVSDFKcWpyQ2wwN2dhbTR2ekFYM2ltQUlhWWhzN0doMTQwWlpDSVdnRm8xejFCaDl3MlhQN2d1TjhEenB0ZGV1M1h4VDgzNGZLVUJaRzh2VmNSaG92QkRqM1h1ZFdhM3ZINHlhRHVhVDBPdmVkOEhJd2lPZGczRWxGS1hVTmNkbnJIQkJVWQ?oc=5"},
  {title:"Spurs boost as Kulusevski plays first game after 500-day injury hell - London Evening Standard", source:"Google News", date:"08 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMinAFBVV95cUxPaWJ0WjE4ajZpX1hFNldfTEVBRW85bEpoVXljTTJob3Y1SFRxVFByc3MxZjBTT3ZRbGkySUc0akxkb2dhWkluMGY5enQzR1VILS1PN0JQYklkT2pxZE0ydTJDbHRaemQ3cWhrRE5qekUwWWxZeVlQZE1BUERRZ3oyVjdUaVZLWFNNdWVjcGtFWnRLUDdLU3pLUDBlS1I?oc=5"},
  {title:"Predicted Tottenham XI vs Man United as James Maddison finally starts a game", source:"SpursWeb", date:"08 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/predicted-tottenham-xi-vs-man-united-as-james-maddison-finally-starts-a-game/"},
  {title:"Tottenham open new contract talks with one of their most exciting young players", source:"SpursWeb", date:"08 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-respond-instantly-as-transfer-interest-grows-in-luca-williams-barnett/"},
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
