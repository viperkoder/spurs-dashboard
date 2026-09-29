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
  {title:"Tottenham tracking mesmerising German forward who’s loved by Jurgen Klopp – Exclusive - LiveScore", source:"Google News", date:"29 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi5AFBVV95cUxQSWVrZWtJSWhBWnJqYjRDREE5UnZHY3FxQmVLQ2cxd0F0dm5FOU1KTWNpN0JDbF9iLVp2NmF0OHFGVFNCTm9xell2Z29uWjRTcGVNb2tnSmVOeV9Fb1hucEJod2NBSjRhVGpTSlJraFhmNm13YlJlTUljVTZYMjUtVUdfYl9zN3BZSmdCbXlzRVdxN1AyOXFSeklmdmsyRzB1UTlYYl9rY1MtVURTLXJ5MVh3REN2Y0hJc2tJRDE0SHVZRVhRUi1yM1ZSR3lsdUo2V0t4UDdDZEFXRW5TSnBJUUtYWDA?oc=5"},
  {title:"Tottenham star drops 7.3/10 performance with 91% passing to silence critics", source:"SpursWeb", date:"29 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-100m-sandro-tonali-does-his-talking-on-the-pitch-as-italy-silence-critics/"},
  {title:"Rodrigo Bentancur shows true colours with Son Heung-min gesture and Tottenham message", source:"football.london", date:"29 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/rodrigo-bentancur-shows-true-colours-34688135"},
  {title:"&#8216;Experiencing it firsthand at Tottenham&#8217; &#8211; Sandro Tonali on pressure of £100m price tag", source:"SpursWeb", date:"29 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/experiencing-it-firsthand-at-tottenham-sandro-tonali-on-pressure-of-100m-price-tag/"},
  {title:"Tottenham to get share of £27m UEFA pot of cash this week with £209m promised to clubs", source:"football.london", date:"29 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-share-27m-uefa-pot-34688193"},
  {title:"94% passing accuracy, Lucas Bergvall is playing himself into form for Tottenham", source:"SpursWeb", date:"29 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-lucas-bergvalls-performance-in-swedens-win-over-poland/"},
  {title:"Tottenham transfer update: Micky van de Ven worry, Dani Olmo opportunity, Morgan Gibbs-White", source:"SpursWeb", date:"29 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-transfer-update-micky-van-de-ven-worry-dani-olmo-opportunity-morgan-gibbs-white/"},
  {title:"Mauricio Pochettino speaks his mind on Man City 115 charges verdict with Tottenham reminder", source:"football.london", date:"29 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/mauricio-pochettino-man-city-charges-34686845"},
  {title:"Tottenham international round-up: How 11 Spurs stars have performed so far", source:"SpursWeb", date:"29 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-international-round-up-how-11-spurs-stars-have-performed-so-far/"},
  {title:"Kane opens door to Spurs return with special clause in new Bayern Munich deal - talkSPORT", source:"Google News", date:"29 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMilgFBVV95cUxNMndkM09FQl8tTlNvLXhscmJsUUNoRjd1Ul9DMTZ4Zmx1X3JxV3IySWFmV0FRcFJlZldIbzN0eW5kRUVvZC1KcVRPeVJpa2RLRjdGUVlkSGViNnV6djBGaVY5SnhOZzBwODVOU0FQWEVJSEg4ZnlHQnR2Q294T0ROUV95NkZGdVpNTW40SG9HcWJvaHRlbFE?oc=5"},
  {title:"Johan Lange's difficult situation at Tottenham and De Zerbi's Bill Nicholson struggle - football.london", source:"Google News", date:"29 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxNUFZmNWtaemlxcHdqdHMyWGVhOVQ5S1F4eWRnazNYWjRhdThXUTJ3M2E1WHJodzBDM2ZtZFFDUnRTZ0VRZV9wUEdjZFYtRzBnOE5TalZxR1NaSlpnS04zVkZxZFRyY0hwWlhJTFpRU0huLWNVcU9qTHJYOFVRbkw0XzRyS2RuamxxeHZmSXFCM0pvbE8xRUtZRm1QcklZb3RtaG1PSUlNZzlxRmRXTVpLT0FhNknSAboBQVVfeXFMUE82SGgzQnNfUnAwallRVjJua29Ybml3aTVtLU1QNjA5ZFN0QW1HbjlzVkI2bDdPdjU3LXV4bHJqc2w2NW1PRklpbUdlWFV6aDlCOXRhdWYyYmw1WDZUVENRN2I3a1Uxa2ZBRWZBdHZfQURXd3pfWXY5RktMeDdUMGFtWWVTQUJ4VXMxUkdxM0RYb3U4eGs4clJXQ3Z2aFN5Z0FxeThmWnBnV2xXQU9IamE5aURmeXBsUWd3?oc=5"},
  {title:"Johan Lange&apos;s difficult situation at Tottenham and De Zerbi&apos;s Bill Nicholson struggle", source:"football.london", date:"29 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/johan-langes-difficult-situation-tottenham-34686343"},
  {title:"The 11 transfers Tottenham missed out on this summer and how they&apos;re getting on", source:"football.london", date:"29 Sept 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/11-transfers-tottenham-missed-out-34680529"},
  {title:"What happened to Etienne Capoue after Tottenham? From the Bale 7 to living his NBA dream", source:"SpursWeb", date:"28 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/what-happened-to-etienne-capoue/"},
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
