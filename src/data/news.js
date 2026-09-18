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
  {title:"Merson: 'Huge game' between Spurs and Aston Villa is a 'momentum swinger'", source:"Sky Sports Spurs", date:"18 Sept 2026", tag:"Interview", url:"https://www.skysports.com/football/news/12040/13589087/tottenham-vs-aston-villa-paul-merson-believes-saturdays-huge-premier-league-match-is-a-momentum-swinger"},
  {title:"Tottenham given Dejan Kulusevski injury boost before Aston Villa clash as recovery plan clear", source:"football.london", date:"18 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-given-dejan-kulusevski-injury-34636137"},
  {title:"Tottenham press conference LIVE - De Zerbi on injury news, Dejan Kulusevski and Aston Villa", source:"football.london", date:"18 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-press-conference-live-de-34636054"},
  {title:"Two key injured Tottenham stars return to training ahead of Aston Villa clash", source:"SpursWeb", date:"18 Sept 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/two-key-injured-tottenham-stars-return-to-training-ahead-of-aston-villa-clash/"},
  {title:"Presser Points | Crystal Palace vs Spurs (WSL) | Martin Ho - Tottenham Hotspur", source:"Google News", date:"18 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxOS1MwNlUzYnAxZ2Vob0s1YnFrcHYxM0JtMWM1WVRvX2ttdE1Za0RidlhkUTRUX2FLVVBRRVhraDh1RzJSYUpaamRWV2JHV0ZNVmowenB5NUwzeFJJZHZreEZBZHpuVndoLW1fMlZabFR0V2tXWmtGcUhaT0o3dXJKakItbHBadDJtZGhvTkNiRDlhUm52d1lHNDlzd3ZLUHZIYVlxT1FWRQ?oc=5"},
  {title:"Domino’s poke fun at Tottenham's poor start to season with ad outside stadium - Harrow Times", source:"Google News", date:"18 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxOMHVlSjc0S2hhb3YtUzNXSk9VTzJRMGZfSFNtV09TdWFZWERuOHBMUl9OWFF4cGVBaW9RcHFpVlRlMkwtTzNHY2hZc3FXakVuRlRaOHFid1ZCOGlPckFBajI5S3BuemNpS2NvZUd6ZmxqemlNelI4VzZCOXdpS1dZNDdXNE52ZWhVd2RiS0JUVGZGSk92X29sb2JuR3N6eWs?oc=5"},
  {title:"Dejan Kulusevski update as Tottenham get more good news on injury return", source:"SpursWeb", date:"18 Sept 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/dejan-kulusevski-update-as-tottenham-get-more-good-news-on-injury-return/"},
  {title:"Tottenham predicted XI vs Aston Villa as Pedro Porro returns and Kudus benched", source:"SpursWeb", date:"18 Sept 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-predicted-xi-vs-aston-villa-as-pedro-porro-returns-and-kudus-benched/"},
  {title:"Tottenham vs Aston Villa: Paul Merson believes Saturday's 'huge' Premier League match is a 'momentum swinger' - Sky Sports", source:"Google News", date:"18 Sept 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMi7wFBVV95cUxOY2drQlQtRWtGMy1qbkJKcUkzaWI1NmpfdVlNMW1ROXIzaFotTzNYMTNDMVhnZWNYcFFRZ3B1dmlPcXRaa2JHVTdlOWRkVGN4RFR3U0U1cU9ldlhlNVlKc29qOER0dEo2LU9KRnlyZ3hWZGJub25aQjRSWERpb1lOMDQwVV9FZGJBUU9FZUxISFpNTFB3QUVZZzEtYm52R2hzcUV1b0ZXZVRuR055NWZua2ZFOFJ5WkFWZlVhRjNiTmcwbWt3a1JSRmE1ck90VmFueksxaF9DdEs1bVVpOUI4SGdNaDIxMGxyZTZlOGtKaw?oc=5"},
  {title:"Tottenham 'plot' move for 280-goal striker in bargain deal - but there's a twist - Daily Express", source:"Google News", date:"18 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMijgFBVV95cUxORWFlYy13UUczLTV6ZTUyX1F4Q3pPZ0xfQzlwU3RpTEYxSG9yTjRPRmhCaXZIc055VkxwQ1dBaXY4cmhZTlFoVzBXYWM2dWlULVE1bDZTalZrMXJnVm1ZYUdzbExGY2FSR3R5SXRRVzdIMlkwdmhGeXBDdDdEcV9HSTdXdzM1cUUteG5KS19n0gGTAUFVX3lxTE5Wb2QyM0p1UHZTSjJtalJ3ZGNsbnR1TGRlOGI3WFAtUDYtc1ZrWEY5ZlUxNHNsVExaX185cXlyX21SdHR4TnlZZzhqcW5uR3hzLUZmdTdfRnlNNnFZQ3dXNTVJTHVrcTRQUnlmX291bTlSalJERTdEWEZvd2xyalZnNmRENnVKQU1tUFdRWk1Kc294aw?oc=5"},
  {title:"Tottenham 'plot shock transfer move for free agent striker' - but there's a catch - Football London", source:"Google News", date:"18 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMirAFBVV95cUxQRHZfTkZVMHJNdUw4Z0lqVGtNZXYwZmhQTGkySTZMbkxKNUhIN1lMTG5kTnVSY3l1U1hyc0lrUzdTTTE1T2VFQnBfeHcwSlZFc0QtNWZsQ1gyZFQxMkZZa2tXeXd5Z3BRSlFRdmlLRE9JbVQ4VzNNTWVmY25ydjd2QWVLSGM5ZFRVTHRfUWxtMGRLWDJEbjFqaFNoTGRnQ2JFM2dPOVJ2VGQ1QmtL0gGyAUFVX3lxTFB0UjZtWFMya2F6bHYyRkRzenA3cmNHNmtLelYwRlhnUkJka2JjQVBreFdOYTRkQlM2NzI3TEZLeUVDVlpDLVM5SjBTZkxsMFFvRHRJXzJfdFU5dnk2UElxdGN1Tllkbjc0anNDTnV4cjI4UUhYWW5oSHVFS0V5WVFZUG5mSzlrYmVSdTlfUGNuMXBJVHA0eEYta3QyTEktWFFZZDMzTGNOQ01kREdIU1JIVlE?oc=5"},
  {title:"Tottenham &apos;plot shock transfer move for free agent striker&apos; - but there&apos;s a catch", source:"football.london", date:"18 Sept 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/mauro-icardi-tottenham-transfer-news-34634922"},
  {title:"How does De Zerbi fix Spurs' scoring troubles?", source:"BBC Sport Spurs", date:"18 Sept 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/football/articles/cmx2zyv3x5rpo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Why Spurs are struggling to score goals and what next? - bbc.co.uk", source:"Google News", date:"18 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMia0FVX3lxTFAwQ3MzNUM4dGVwZzdVV094a1Zsb0dYa0gtQTZMVUhWMDgyYS1KblJsV2ZVcW55V3FaQkpHV3lkX0JDZldMZTdfN3k5eGNMbUtzSzNHanlOWlZqdFhSVnMwa0o5cUlveU9TdzRR?oc=5"},
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
