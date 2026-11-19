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
  {title:"What Luca Williams-Barnett needs to do to become Tottenham&apos;s next Harry Kane", source:"football.london", date:"19 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/luca-williams-barnett-harry-kane-34937450"},
  {title:"Arsenal, Chelsea and Tottenham vote for extra protection as Man City case rumbles on", source:"football.london", date:"19 Nov 2026", tag:"Club", url:"https://www.football.london/premier-league/arsenal-tottenham-chelsea-premier-league-34937171"},
  {title:"&#8216;Unreliable&#8217; £93m Tottenham duo told they are only good enough for mid-table", source:"SpursWeb", date:"19 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/unreliable-93m-tottenham-duo-told-they-are-only-good-enough-for-mid-table/"},
  {title:"Will Lankshear&apos;s two transfer clauses as Tottenham face making surprise decision", source:"football.london", date:"19 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/will-lankshear-premier-league-middlesbrough-34936704"},
  {title:"Our five favourite pieces from Tottenham&#8217;s new retro &#8216;heritage&#8217; clothing line", source:"SpursWeb", date:"19 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/spurs-heritage-collection-five-favourites/"},
  {title:"Tottenham predicted XI vs Ipswich as James Maddison misses out yet again", source:"SpursWeb", date:"19 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-predicted-xi-vs-ipswich-as-james-maddison-misses-out-yet-again/"},
  {title:"Tottenham and Pochettino both want Nathan Collins but Brentford hold all the cards", source:"SpursWeb", date:"19 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-and-pochettino-both-want-nathan-collins-but-brentford-hold-all-the-cards/"},
  {title:"Chelsea star reveals key Alonso message before Spurs loan move - London Evening Standard", source:"Google News", date:"19 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxNU1R6STZ3a0kwdDZPT09CU2JKc1F2OGJ1RHFDV1dJNzA1YXFtcy13N201aGwyaW50NWlYamZ6SG1lVndCTF9Uak0xbzhZVjFQVklYZzZiMW14bl85UVplLTJoQ21vakY3YUpuaHZaeUhTYU94TWo2TFJxZmVsQmdQOFcxUjNKcEpKN1puTFZYTlhCTmhhT20xV0tQTWZrVFE?oc=5"},
  {title:"&#8216;That&#8217;s his problem&#8217; &#8211; Omar Marmoush&#8217;s biggest issue diagnosed in time for Tottenham vs Ipswich", source:"SpursWeb", date:"19 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/thats-his-problem-omar-marmoushs-biggest-issue-diagnosed-in-time-for-tottenham-vs-ipswich/"},
  {title:"Xabi Alonso said something very telling to Mykhailo Mudryk before he joined Tottenham", source:"SpursWeb", date:"19 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/mykhailo-mudryk-rejected-three-clubs-for-tottenham-but-chelsea-want-him-back/"},
  {title:"Mykhailo Mudryk rejected three clubs for Tottenham but Chelsea want him back - Spurs Web", source:"Google News", date:"19 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxQTklZLTRubVFidENYS0VvRDV3R3liZkMwSXRxak5IbVVOZWNDd2k0S0lwaWZYSnhBQXBNZUE0dURPWDFGcW5jQWNlSld5SXdfSjl0cnIzbWpFRzRNQU9lMFpIcmFwZ0FLQk1ycFRxZmU0cGpXSjR5a3NVS3ZaaFNGWUJmYkt2T2RabnE3NlZrOVNtbDBsckFndE9CR3VQTEd4SGNRWWxmZXB2SUVpTWJTZ1ZqLVU?oc=5"},
  {title:"Fixture changes | January, 2027 - Tottenham Hotspur", source:"Google News", date:"19 Nov 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMif0FVX3lxTFAyN19ubXNiRzZrMGliUmgwbU9xMjUzV1QzNmlJVmdzM2tSYU5VZURZWVhCU1l1SFRlbFdNWTM3U2xSWWNCNXMybTBSTzlmNDlWTFB4Mnkwc2xXSGp2dXR3d3ZmSjlsM3ZnbFNSYTBtOXdwWFNuZms4TW5ZVXlBcWM?oc=5"},
  {title:"Supercomputer reveals Tottenham&#8217;s chances of beating Ipswich Town in Premier League", source:"SpursWeb", date:"19 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/supercomputer-reveals-tottenhams-chances-of-beating-ipswich-town-in-premier-league/"},
  {title:"The two-year Tottenham trophy target to finally put an end to 'Spursy' tag - Football London", source:"Google News", date:"19 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxPaHA1dUR3QjE2VXpsRElabjRWWmx5WFdXNEZsdS0wU0VnX29Oa2ZfZk5naGhmd3NlSzV4TGdJVVhQRzJkUlVUTlN1YjZQVlZxQTVYMUlfZU9QaVR6S3AzZy1UYXIyT2pPVTJsMXRtWkNScUVMbjgxZUIwUXJKX0RBZFM1N1JZbFVyZF9qYjFLdjBISjNvSElBdg?oc=5"},
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
