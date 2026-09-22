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
  {title:"Tottenham have two fixtures moved for TV, including another Saturday 12:30 kick-off", source:"SpursWeb", date:"22 Sept 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/tottenham-have-two-fixtures-moved-for-tv-including-another-saturday-1230-kick-off/"},
  {title:"Tottenham legend explains why Spurs are struggling but is &apos;very confident&apos; in De Zerbi plan", source:"football.london", date:"22 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-legend-explains-spurs-struggling-34653602"},
  {title:"Tottenham may have to ponder a bold Souza decision sooner than they thought - LiveScore", source:"Google News", date:"22 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi3gFBVV95cUxQNHlTdGZwSy1UbGhjaHJCUEdaV3JjTWFQeUZGZC1qR1VFR2JDLXBYcU1HVW1Ha0hlSVB5a2ktUGRxSkFGeUpUTWw5aVBuMjF2eVl0WkpRVU16cFVsdXRCdHYwcHZUX09FX2Y2QzJNb3hsbkwxRHkyYTloRVhrdmNUczF5RGFyZmF5endiMUxSaGstWFVwWXJlYUhUZ2wxSXNPU2J6M3ZQems3MlVKb3VQZUl1Ul9FeWJWV1NiWkZILUNOb3FSOTRBcGMzd3FfbW1sN3U1Y0ZseU5keEtaNXc?oc=5"},
  {title:"Jan Paul van Hecke criticises Tottenham teammate for mistake in Aston Villa defeat", source:"SpursWeb", date:"22 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jan-paul-van-hecke-criticises-tottenham-teammate-for-mistake-in-aston-villa-defeat/"},
  {title:"Catching up with… Jamie Kenna - Tottenham Hotspur", source:"Google News", date:"22 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMif0FVX3lxTE1JcTNBRXJVdUEtM2NlemkxNUYyNmIyX2p0T21YYzRieFU2b0VsMUlBNFN5Nkp1Z0FDcFpQaWh2S2pmM3locm1ob0w2aVY5cjh1ZHRxcUlIR0JpbzJvTFJyZ2haSXNILXByOTFuMXRyUXgwMFJnUDJHOWJMLXBYV00?oc=5"},
  {title:"Tottenham injury update as Pedro Porro joins five-man list during international break", source:"SpursWeb", date:"22 Sept 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-injury-update-as-pedro-porro-joins-five-man-list-during-international-break/"},
  {title:"Supercomputer reveals Tottenham&#8217;s chances of Premier League relegation", source:"SpursWeb", date:"22 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/supercomputer-reveals-tottenhams-chances-of-premier-league-relegation/"},
  {title:"The 15 Tottenham players set for extra work after controversial De Zerbi decision", source:"football.london", date:"22 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/15-tottenham-players-set-extra-34651582"},
  {title:"Daniel Levy Struggles to Cash Out of Spurs Year After His Ouster - Bloomberg.com", source:"Google News", date:"22 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMixAFBVV95cUxOa0dJNU1jVERNWi1Pd3FTQ2RmRWtxc0loblVZeUlmd3hDbG5fSmI5dzN6alRqazZGNnZnTFlJTGlCZFJvendVdHdDR3BHLVJpcU1tcFlQSkJfR19jYWhXTnM5Xy13RGRxSzJKcV9UQ3lFaUdWZDBnUTNFQ2NLQWNoLU0xdUE5RGgwSWcyMU9BdnhEeFlmb2JkOTdSRmtaYldmVnc3cERIVE1mQldTVFBQaWN4cUZGUzNraFk0Wm1yUVhZdW90?oc=5"},
  {title:"Tottenham bottom of Premier League despite £300m summer spend - where do they go from here? - Sky Sports", source:"Google News", date:"22 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi1AFBVV95cUxQQUpiVDE4NGVkb3NyQlBnVGc0MFhfanZnT3BzSXd3WVI0VDRBWE5qTUkyNFRQc3h0Sm9XUHoySWNndzhReC16Y21TZHNqb1doWVdITjdEVmlCaHZOV0tHR2xKalVoYXlpdUUxblk2emhfUDI4Xy16SXFTdS1RVVVUbmhPdlNVS29KZ0RCWG9XV0ZGNjhvbHpmOFRscGtnMG5hNlZmcG1WemJ6RHVmVUUwN0RWS3RWMnJXeXlaNWRpcERhYVI3NjhIbnhWcTBhRGY0czVHQg?oc=5"},
  {title:"The last two seasons were grim for Spurs. This is as bad as it’s ever been | Jonathan Wilson - theguardian.com", source:"Google News", date:"21 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiiAFBVV95cUxNclk3N0NrUm5QZllaRGg1ejdoRnIwZHRQcjBldGNqX1JORmdOelczY2VRMDhha3JUVGkzS0RKMnRGNHVhQmR0eS1jS0phcktJNVhiR3Qyb1duXzNpbGNHZlhpQjlIRHFTWEMzQ2tZN3JRc0ltTGtBRkNTalRrUHpmcUNhSnlLamJp?oc=5"},
  {title:"Tottenham might have next Will Lankshear as 17-year-old scores four in one game", source:"SpursWeb", date:"21 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-might-have-next-will-lankshear-as-17-year-old-scores-four-in-one-game/"},
  {title:"How much Tottenham would have to pay to sack Roberto De Zerbi? Might be less than you think", source:"SpursWeb", date:"21 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-much-tottenham-would-have-to-pay-to-sack-roberto-de-zerbi-might-be-less-than-you-think/"},
  {title:"Tottenham are &#8216;best-placed&#8217; to beat Newcastle to exciting £26m defender", source:"SpursWeb", date:"21 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-are-best-placed-to-beat-newcastle-to-exciting-26m-defender/"},
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
