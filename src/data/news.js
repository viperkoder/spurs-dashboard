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
  {title:"&#8216;That race is over&#8217; &#8211; Johan Lange makes admission about Tottenham&#8217;s big summer spend", source:"SpursWeb", date:"22 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/that-race-is-over-johan-lange-makes-admission-about-tottenhams-big-summer-spend/"},
  {title:"Cathinka Tandberg: ‘Spurs fans hate Arsenal. That’s how it is’ - The Guardian", source:"Google News", date:"22 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiywFBVV95cUxObm01TnFZZW0wMnhPcE1pdVllMnYtbElaQjZxd0xDdjROdEFQNVFhOGZLYW10U3dCd1hiZE9HOWlUcTdUZTl4RTM3RlJSM2xVNHpKdkV6c2lzNEhFNGxPYUdnZ2otWmEwZVE0d1J2VUlTTl9xUmRaeEZmMGZiRDhQNUs5ZTUzMTlxSXNyYVloSVZUcjZ0dzhjYkswRnVQNlY3WlVEakNfWGk5aU5JYWo0ZmdlOG54akduTFV6V3ZqM1V1M01nWHJhX2tEdw?oc=5"},
  {title:"WSL Fantasy | Spurs Gameweek 7 Preview - Tottenham Hotspur", source:"Google News", date:"22 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiigFBVV95cUxPUl94SXp3QTlpQS1nY1ZYY0FlWWR4WkJaVWpKT1JfZldzcEx4NnJjRTJGQlBpNE44eXBBVk9ybHBFYTIzTE90S2FQM1c4eG82TmJzMFJvNXhiU21tbjZFVm5saEktNDJ2Wm9kQ3M5M1UwMzQ1anlSLWgxUTZ6b2EwcXpsRXZFTjFqWkE?oc=5"},
  {title:"Tottenham receive worrying Destiny Udogie injury update ahead of Chelsea clash", source:"SpursWeb", date:"22 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-receive-worrying-destiny-udogie-injury-update-ahead-of-chelsea-clash/"},
  {title:"Tottenham and Chelsea combined XI: Not a single Blues defender makes the cut", source:"SpursWeb", date:"22 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-and-chelsea-combined-xi-not-a-single-blues-defender-makes-the-cut/"},
  {title:"Tottenham must break eight-year Chelsea curse and Roberto De Zerbi may just know how", source:"football.london", date:"22 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-must-break-eight-year-34796314"},
  {title:"Roberto De Zerbi unlocks undroppable Tottenham star just in time for huge Chelsea clash - Football London", source:"Google News", date:"22 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxOQjJZUE5lblo4ZDhLN29BUkhieGs3NERBc1NsekpzUmhIOEhudTFKUVJka0RLOVFHVXJ4d2kzRTQ2dzZOTFFuU29WZENjaWhYZWhwYTFmdHpmR1k3aWlsTmFpakVaVndYUF85Y25qc29WR3N1YlR1Mm1Sbmp0cEFScXZ5dk9aSUE5d0xIV0pxeU96ZExmcmE4SnhaT2FEcm9N0gGmAUFVX3lxTFBTUVpPZHJGV2ZjWkxLU01aSmxNQVVyWXdUSURYelhud3AxQmZ4b0U0MERRV0dRUTB4VUNVVmExLU52S0xnUnhweUV4OFdHWVNGLXpISGhaZVJuTDh2UF9Xc1JzV0pSYUx4UVI1ZVRTeEp4VXl1NHpsT1dIeDlHU0dYWUR2RV96WFpRRlVXVXpRcGRwOFBLQUVQV1YzeHBXY0paZXNYeGc?oc=5"},
  {title:"Tottenham target £67m Chelsea right-back in January after Pedro Porro wants out - Football365", source:"Google News", date:"21 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMivAFBVV95cUxNeHloZ0cybzZ0bkFPLXROQ284SHU1N2RKenZleHdTaWNiMlV3dkpwcnlNOWM0WW9jcE5Cam5NNFZ3STRaRGFWbWFaS2Nmdjc4bUVQN3JKTFRYeUNHdGo3T3NpRllZR1ppZGxXVllWcVJKRi0wSWJIOEZJM3VqQXJnQ3BZdmt3RWNaRGJwQzA4Z2hfOFRmNktjQTgwS2xJTHVyd09DRF93U21iSEJ5ZTBHNkQ3SGNaVEFHN041aw?oc=5"},
  {title:"Tottenham scouts in attendance at Porto yet again as Souza makes his debut", source:"SpursWeb", date:"21 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-scouts-in-attendance-at-porto-yet-again-as-souza-makes-his-debut/"},
  {title:"Tottenham asked to foot part of £67m bill after European Super League decision", source:"SpursWeb", date:"21 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-asked-to-foot-part-of-67m-bill-after-european-super-league-decision/"},
  {title:"Video: Tottenham striker target passes his Premier League audition with goal vs Liverpool", source:"SpursWeb", date:"21 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-target-georges-mikautadze-passes-his-premier-league-audition-with-goal-vs-liverpool/"},
  {title:"Tottenham&#039;s former club record signing is on shock trial with a Russian club", source:"SpursWeb", date:"21 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-flop-tanguy-ndombele-is-on-a-shock-trial-with-a-russian-club/"},
  {title:"£60m Tottenham transfer failure will sting forever as superstar tears Man Utd to shreds", source:"football.london", date:"21 Oct 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/nico-paz-spurs-transfer-como-34798807"},
  {title:"Tottenham fans are all saying the same thing about Tosin Adarabioyo after full debut", source:"SpursWeb", date:"21 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-are-all-saying-the-same-thing-about-tosin-adarabioyo-after-full-debut/"},
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
