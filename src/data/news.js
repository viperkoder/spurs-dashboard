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
  {title:"Forget a transfer away, De Zerbi may just change Conor Gallagher&#8217;s position at Tottenham", source:"SpursWeb", date:"12 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/forget-a-transfer-away-de-zerbi-may-just-change-conor-gallaghers-position-at-tottenham/"},
  {title:"Tottenham fans get another huge Xavi Simons injury update - LiveScore", source:"Google News", date:"12 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMixgFBVV95cUxQak5Xb2ZfRURjT3NWZHRuNGszbEQxRTJQUUpudS1JNW9qcXRqVUdINGZFM1JYTnk5VXNQRGRIbGo2ZGQzbnNSNG03Mm5oM24tTU9VdFYxRXppUllSVnU0VF8xdnl4a2VBQmxpd2h4RXJNUnVrUmhvYklEVTlHUk9rYnhiQTQwbVBMN2tfYTF4ZXBwSzJQWE8tY3lEMklHaGYtMkpnMlpmUURSUjBjVEpBVGJRVHJYVjU2NEpxd1YwZnY4YUpuRlE?oc=5"},
  {title:"Tottenham rank first in one Premier League statistic but 18th in another – and it exposes De Zerbi&#8217;s biggest problem", source:"SpursWeb", date:"12 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-rank-first-in-one-premier-league-statistic-but-18th-in-another-and-it-exposes-de-zerbis-biggest-problem/"},
  {title:"Luca Williams-Barnett left red-faced as Tottenham wonderkid fluffs party trick - Football London", source:"Google News", date:"12 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxOc2ltSzI4RjFQSGpVcmRteW0xd0I2bjgxNUJMMnlIclZHTE1vYmlUYlRnbXRhMzdJWjVFYXRlbk82clVLbGJvbmxMZEdfbGlFQXpUc3l1TTRIS1NnSmlCZ0NQUDhrdmMwZzZoZ0Y0TVFyZnlqQWtBOE9UVkF3N3d3anJRSnJqRVJfaWJPLUpVemJDS3dIeWVkRdIBngFBVV95cUxPQ1ZkSXIwRnBNUXhXekZsc1dRemlJMHgwdzlfTC1GR2xxamh6ZFQ5SzFESGxJeHRwZGttYXhwaGlTRmtWM1Q0eWxsVzRhUnVidXVoMkRXLXJQdGVNdlVoenVfRXBkNEwtYm9KV0I1eTM3bmJPQkZvSEFvTERfeDJYSnRBRXcteEUtaUlXRVI3MWdUWVQ5REgtS0hJMHAwdw?oc=5"},
  {title:"Everton will only call Tottenham about January Richarlison transfer under one condition", source:"SpursWeb", date:"12 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/everton-will-only-call-tottenham-about-january-richarlison-transfer-under-one-condition/"},
  {title:"Star of Mauricio Pochettino's Spurs side reveals how he will change Man Utd - Metro.co.uk", source:"Google News", date:"12 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiqAFBVV95cUxORWxqS2w4LXI4ZEozRl9mY0pLbkFoNHdFelhiM0p6eFhiRjBlUTFFN090anV3d19OcFNsYWpOX3luNzRleE1hOF9taVBaVE5lRXNhVC1vMVp6ekhwVWpjd3U4X2xVSUJ5Sm1tY09FUkx6TXNXWEtjSDZLVU0zMzQ1b0xQd2J6SXBaSk1sdlB2b2U1ZnF0cEhjZExUM04tbmoxWExXQ1c1NELSAa4BQVVfeXFMTkFRbGE4MWZ0Tm9NT3UzVXpIWGk4ZTQ0Mmw0UTVhc0VmSUVjQ21LWHpoVkFuWm0wTUh0bk53NGFNem5vazRraEtyMFREUm9NSjd0MXRYdFB2UnZIek5UQk91b0xQLU5KYXdRdjMxc1NiWm9FaHRhYUlYNVNGaGdFY0RwVE9EdWpVWFF0Zm9tTXd0TlFvYmktMkZIQnA1WXhhRTllLWdtSVFNU0IteW13?oc=5"},
  {title:"Harry Kane refuses to rule out playing against Tottenham in future Premier League return", source:"SpursWeb", date:"12 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/harry-kane-refuses-to-rule-out-playing-against-tottenham-in-future-premier-league-return/"},
  {title:"Tottenham encounter Will Lankshear nightmare scenario as transfer priority becomes obvious", source:"football.london", date:"12 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-encounter-lankshear-nightmare-scenario-34899898"},
  {title:"Tottenham transfer round-up: Conor Gallagher stance, Barcelona defender linked and Spurs&#8217; January plan", source:"SpursWeb", date:"12 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-transfer-round-up-conor-gallagher-stance-barcelona-defender-linked-and-spurs-january-plan/"},
  {title:"Talking Tottenham announces Christmas live show with Alasdair Gold and Ryan Taylor", source:"football.london", date:"12 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/talking-tottenham-christmas-live-event-34890086"},
  {title:"How Tottenham feel about Mikey Moore&#039;s Bundesliga loan, Köln are &#039;unimpressed&#039; so far", source:"SpursWeb", date:"12 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-keep-close-eye-on-mikey-moore-loan-as-former-scout-makes-damning-prediction/"},
  {title:"Mikey Moore makes &apos;dream&apos; transfer wish as Tottenham loan decision explained", source:"football.london", date:"12 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/mikey-moore-makes-rangers-dream-34897963"},
  {title:"Harry Kane thinks Tottenham just let a player with &#039;goalscoring instinct&#039; walk out the Hotspur Way doors", source:"SpursWeb", date:"11 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/harry-kane-reveals-what-he-likes-about-will-lankshear-but-issues-warning-about-tottenham-graduate/"},
  {title:"What Roberto De Zerbi privately thinks about Dominic Solanke may worry Tottenham fans", source:"SpursWeb", date:"11 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/according-to-my-information-de-zerbi-is-a-big-dominic-solanke-fan-at-tottenham/"},
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
