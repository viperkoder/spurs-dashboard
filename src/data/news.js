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
  {title:"Four Tottenham academy youngsters travel to Marbella with senior squad", source:"SpursWeb", date:"14 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/four-tottenham-academy-youngsters-travel-to-marbella-with-senior-squad/"},
  {title:"Tottenham Hotspur celebrates Black History Month by honouring club trailblazers - Tottenham Hotspur", source:"Google News", date:"14 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiwwFBVV95cUxNRE83bEVMQU9TZ1YwMXdvRHBZYmd3NGJnYnNnUWZjajcwdEhPQ1FxdXRucktrcWZfZGhOQlpsSFNHRzNhdnJmOWVhbjJTYm5IbjVnR2VFZmtIVVVzNzB2ZGU2RGpOZnJtME5FU1BSaDRxX0NDOW1odVdJNEdrSnhkUVRtbFRsYi1NRUJsUFVkSVFTWlpkbTBESGdDSWJ6MU1IX0psVkk0RVd1U2lxTUtVSC1QLVcwSTFZSk1JUVlvNFRYQU0?oc=5"},
  {title:"Richarlison did something classy after shock Tottenham U21s appearance", source:"SpursWeb", date:"14 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/richarlison-did-something-classy-after-shock-tottenham-u21s-appearance/"},
  {title:"&apos;Immaculate&apos; - Unseen Richarlison moment speaks volumes as forgotten Tottenham star praised", source:"football.london", date:"14 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/immaculate-unseen-richarlison-moment-speaks-34762185"},
  {title:"Watch: Richarlison scores for Tottenham U21s as striker omission raises questions", source:"SpursWeb", date:"14 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/richarlison-scores-for-tottenham-u21s-as-striker-omission-raises-questions/"},
  {title:"Tottenham’s forgotten man Richarlison scores for under-21s: ‘I was missing it’ - The Guardian", source:"Google News", date:"14 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxOazdWUmxZUWl1bmt6WmU2MWZEbnF3M25MQWp5cW1NcHJZdVdNSHpham1CRF8yZUR6dE9OY09CZTUxcTk5cWNGeVoyTjVBYnJ2cXNqZUZvNnlzZDhfN01JRFJqM3dVYUhwRERBeGtlQS1pZGxCVWNYTERRZk4wMFVWVER0N2VJcFBkZXhNZW83QmtrcmZSV3NJN2lnT1lnZ0V1ckEyNg?oc=5"},
  {title:"Tottenham injury update: Pedro Porro and Mudryk near return as Kulusevski set for November comeback", source:"SpursWeb", date:"14 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-injury-update-pedro-porro-and-mudryk-near-return-as-kulusevski-set-for-november-comeback/"},
  {title:"Trent Alexander-Arnold rocked as Tottenham right-back ready to join Real Madrid – report - TEAMtalk", source:"Google News", date:"14 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimgFBVV95cUxPM081b2dwOGUwYmZhNXlTY2lOZWFBeGdLU0w5ZjN1bXY4ZmFYMXQzTy1ESDQ5U09rUXN2dXljd1hiZEtZRjI2dmJ0N2dJWWxrSk5xci1WakE4bkM2UjlTX3ZRTGFTRW40aWtDY2ZaSFJFZWMwTlp6aHdNS3ZLTzFXMTlvc2M2UUtXdnlfb0Rja2ZMdUdkenJ1MEN3?oc=5"},
  {title:"Richarlison posts 13-word message after Tottenham U21s goal as Joao Pedro makes feelings known", source:"football.london", date:"14 Oct 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/richarlison-posts-13-word-message-34760855"},
  {title:"Pedro Porro is &#8216;increasingly convinced&#8217; his time at Tottenham is coming to an end", source:"SpursWeb", date:"14 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/pedro-porro-is-increasingly-convinced-his-time-at-tottenham-is-coming-to-an-end/"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Wednesday, October 14 - Cartilage Free Captain", source:"Google News", date:"14 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi2wFBVV95cUxQSjZ2cjJ5UGE0bzB2VFFEYlpOM2dobk93TGFpY1czODRaTThHYnp1VENZSm1SUmVqTzB0RWpheGs5c1VMd0hrNk5MVnVnU1pTbUx1aVVWWmNOYzI5NDctRlJPTG00a1ZRbXpTRlBVNWd3NVFkb0psWU01a2tPcS11ZU1Odm9EYW1EM2djNVFybzc4ZThtSVlGYXVWR2VMcnpZZFYtcm9PUGwwTXU5cEZ5MFpMRGF4NXNjXzZ0dUt6S1QwWmVReXFDbDhTZFAyaWcwZHNMWWc4RTVTUW8?oc=5"},
  {title:"The remarkable Richarlison situation that brought classy moment with Tottenham U21s - Football London", source:"Google News", date:"14 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxOeTVoQUNYbnZucEJmblZtWExpeTN6dUxma05fbHdRRWRvVW5UUTAzQjdOV0NSSFJqYU9HOUp2S0ZBZGZUTUhjQWJRQXotNEhKTXJIM09hZ254LVRscXZpTWpIa2Jad2FIb2c4ZzlOSDItWWJ1Z1BVUEhWeVN0cTEzdk5rUHhhd09qVTZCcDBSS2FGX3RBMEN0bnR1UjQxXy1VY0FhLWdvVQ?oc=5"},
  {title:"Why was Richarlison playing for Tottenham Under-21s?", source:"BBC Sport Spurs", date:"13 Oct 2026", tag:"Club", url:"https://www.bbc.co.uk/sport/football/videos/c6dxwgpvjr8do?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Richarlison scores as Spurs under-21s lose in EFL Trophy", source:"BBC Sport Spurs", date:"13 Oct 2026", tag:"Club", url:"https://www.bbc.co.uk/sport/football/articles/cx4g141vpe3eo?at_medium=RSS&amp;at_campaign=rss"},
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
