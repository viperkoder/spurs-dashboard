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
  {title:"Tottenham latest: 'Couldn't have gone any worse' - Carragher assesses Spurs start", source:"Sky Sports Spurs", date:"29 Aug 2026", tag:"Interview", url:"https://www.skysports.com/football/live-blog/12040/13025489/tottenham-transfer-news-rumours-and-gossip-live-updates-and-latest-on-deals-signings-loans-and-contracts"},
  {title:"Another defeat for Spurs as Elanga and Wissa goals seal Magpies win", source:"Sky Sports Spurs", date:"29 Aug 2026", tag:"Club", url:"https://www.skysports.com/watch/video/13578834/tottenham-hotspur-0-2-newcastle-premier-league-highlights"},
  {title:"Spurs beaten again as Elanga and Wissa strike for Newcastle", source:"Sky Sports Spurs", date:"29 Aug 2026", tag:"Club", url:"https://www.skysports.com/football/tottenham-hotspur-vs-newcastle-united/report/559463"},
  {title:"Roberto De Zerbi explains why Savio missed Tottenham vs Newcastle", source:"SpursWeb", date:"29 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-explains-why-savio-missed-tottenham-vs-newcastle/"},
  {title:"Tottenham player ratings vs Newcastle - Sandro Tonali&apos;s bad day but Omar Marmoush bright", source:"football.london", date:"29 Aug 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-player-ratings-vs-newcastle-34539901"},
  {title:"Tottenham vs Newcastle LIVE: Anthony Elanga and Yoane Wissa score for visitors", source:"football.london", date:"29 Aug 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-hotspur-newcastle-live-marmoush-34524062"},
  {title:"Tottenham v Newcastle LIVE: Score and latest updates from Premier League - The Independent", source:"Google News", date:"29 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiugFBVV95cUxQX19yalJlVEw2Yk5FLWZkZkN4WDNFRHZXcVZ5SEJPYXo5VnlEbXpRTFN6Sm5DVEZJWkotYmg1UGJOUDZhaldfbHRLVDZlUmQ2aUJwYUlOUWR0T3VDU1RvRG1LOHRObjJMMzhNU083dWVOa3ZIMXNudlJ3bzEwMFMwRjBWcS1PcklsQVowakVoYThHTUt5OGlKSGxSbmdkTlZEdzliS09POXJ0Z29oN3hheXVXLWZ5aThSTWc?oc=5"},
  {title:"Tottenham Hotspur vs Newcastle | Magpies double lead against Spurs with Yoane Wissa goal - Sky Sports", source:"Google News", date:"29 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipgFBVV95cUxOc1g0aUdFeHJtRmdtV19hM3R5TFNhaHBmdWtOd0hTZ2xXNnZkUFpLOHozTGt3VmNtSGNGNUJ5cVBLRmgzcDgtVjcyazlIamhBME00RDZLSW5LWmJ3R0ZOQVlUWS01UUtkY25zWjJvLUtTM2hxSHBlVzd0alVxUVBJZ2cxYWY1VGkwYzlGVkxsTXdoanAxXzJUNHVhX2EwTFViUm1UOXJ3?oc=5"},
  {title:"Premier League club now &#8216;in advanced talks&#8217; to sign Matar Sarr from Tottenham", source:"SpursWeb", date:"29 Aug 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/premier-league-club-now-in-advanced-talks-to-sign-matar-sarr-from-tottenham/"},
  {title:"Jamie Carragher shares Tottenham transfer theory during Newcastle clash - &apos;The evidence&apos;", source:"football.london", date:"29 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hotspur-transfer-news-carragher-34540032"},
  {title:"Galatasaray in contact over third £26m Tottenham player as transfer deadline approaches", source:"SpursWeb", date:"29 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/galatasaray-in-contact-over-third-26m-tottenham-player-as-transfer-deadline-approaches/"},
  {title:"Tottenham v Newcastle: Premier League – live - The Guardian", source:"Google News", date:"29 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipgFBVV95cUxPMEpVeUoxREVfU1BQWXhEN3I5ZHFrNWZuRmhraXVSX1BHcGJEbm9LQTlYYzMybWFUZFpDd3IxMHJMVmdYbDQ4UFczU1Z5QmJVMmdrdlJYNmhEUnozMnJRV1hFSy14Wlc1OUhJR0s3bU1QLTlyUnlnd3hOTUZ1TzBYNzFNS3hpXzNHSGlXMDhJUldxRENadmh0NnF3U1pLVFkxcWxaanV3?oc=5"},
  {title:"Wilshere lands Spurs youngster on loan despite historic north London rivalry - talkSPORT", source:"Google News", date:"29 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilAFBVV95cUxOVzRCRXNOOGgtRGhxWTJtb2tDMkxuVFFUSnoyZXFoZkY3R2JqWC02N1VHVjRJYWhoLXdpSkQyRE9Hd0wxN1o5dUM3ZUhLUzlJWnhXcHlJRXVaYnNWa09QSWhheVNiUzl4QTlvTFB4cldsMDdzNXl2YkhGeVlKRWRHYTdyVzBrNnEtSzZVbUFyOEZJM00x?oc=5"},
  {title:"De Zerbi throws another big hint about Tottenham signing one more forward", source:"SpursWeb", date:"29 Aug 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/de-zerbi-throws-another-big-hint-about-tottenham-signing-one-more-forward/"},
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
