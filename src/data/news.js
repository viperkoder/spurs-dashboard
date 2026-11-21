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
  {title:"Tottenham vs Ipswich Town LIVE: Team news as Maddison and Williams-Barnett start, no Tonali", source:"football.london", date:"21 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-vs-ipswich-town-live-34934031"},
  {title:"Tottenham XI vs Ipswich confirmed &#8211; Luca Williams-Barnett starts", source:"SpursWeb", date:"21 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-xi-vs-ipswich-confirmed-luca-williams-barnett-starts/"},
  {title:"Tottenham Hotspur vs Ipswich Town: Premier League preview, team news, stats &amp; head-to-head - BBC", source:"Google News", date:"21 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE1hNlhCYVIzNUpvRm9UTGJnczMwMnhNMGVwTHhiTTY2MkQwQW9QcE9feTRfbUJORWp4bUhYS3BKNVFmWWczR1ZOb2hnWUxCQ2FvSlItVE1FT3k3VHBoSkVlMm02Z2x5UQ?oc=5"},
  {title:"Spurs teenager Williams-Barnett handed first start vs Ipswich LIVE!", source:"Sky Sports Spurs", date:"21 Nov 2026", tag:"Club", url:"https://www.skysports.com/football/tottenham-hotspur-vs-ipswich-town/live/559553"},
  {title:"MATCHDAY LIVE | TOTTENHAM HOTSPUR (A) - Ipswich Town FC", source:"Google News", date:"21 Nov 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMiiwFBVV95cUxQZ3JuSW5rQ2R0MGJzc01pSndCMTVQUTl2dTRELXdrRnE5ZzhwN3YweUM0eHY0UjhkNUpiTWVaVmhQNkxSV1M0ZVVmeHFaR3VFNmRVb2hqck10cGVTem1FSHVyRlVzSnlBeHQ3Mkk1Vm1BaXFIb3p0UzdRTkx1YUUzRWtHTmVNMnBjU1Uw?oc=5"},
  {title:"Tottenham receive firm &#039;no&#039; from Barcelona director Deco over £33m January deal", source:"SpursWeb", date:"21 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-receive-firm-no-from-barcelona-director-deco-over-alejandro-balde-interest/"},
  {title:"Three to watch | Ipswich - Tottenham Hotspur", source:"Google News", date:"21 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMid0FVX3lxTE9vNGItS2F6SkRra3JzSTV3R1I3VE5lS0w0YlR5TnFEMnE3N05QeWpJdmViTzVUY1Z4OC10UEZZNllZUDRFem9vaHRHeTlxTXJNODQ2YVpvYzRuYWItbUVoOVVadUhKUEN3aktfdU5ab0tSUGItd3JZ?oc=5"},
  {title:"Eli Junior Kroupi transfer update: Tottenham and Arsenal may struggle even with &#8216;amazing offer&#8217;", source:"SpursWeb", date:"21 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/eli-junior-kroupi-transfer-update-tottenham-and-arsenal-may-struggle-even-with-amazing-offer/"},
  {title:"Jamie Redknapp makes bold Tottenham trophy prediction Postecoglou would be proud of", source:"SpursWeb", date:"21 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jamie-redknapp-makes-bold-tottenham-trophy-prediction-postecoglou-would-be-proud-of/"},
  {title:"Arsenal suffer injury blow that could leave them without star for Tottenham clash", source:"SpursWeb", date:"21 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/no-bukayo-saka-for-the-north-london-derby-advantage-tottenham-as-arsenal-suffer-blow/"},
  {title:"Micky Hazard thinks Tottenham could already have their next superstar like Glenn Hoddle", source:"SpursWeb", date:"21 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/youre-going-to-be-like-glenn-hoddle-micky-hazard-reveals-what-he-told-williams-barnett/"},
  {title:"Tottenham Christmas jumper donation could help provide 150,000 life-changing opportunities", source:"SpursWeb", date:"21 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-christmas-jumper-donation-could-help-provide-150000-life-changing-opportunities/"},
  {title:"Predicted Tottenham team vs Ipswich - Roberto De Zerbi makes Savio and James Maddison decisions", source:"football.london", date:"21 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-predicted-xi-ipswich-savio-34946301"},
  {title:"I was p***ed off with Tottenham chairman - he was f***ing me around", source:"football.london", date:"21 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-daniel-levy-darren-bent-34932896"},
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
