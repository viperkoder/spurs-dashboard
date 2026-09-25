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
  {title:"Official Spurs Website - Tottenham Hotspur", source:"Google News", date:"25 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxOdU5XbUotNzY2d1A0RTN5SERUcXdFNWRCVFBLSzNmbHAzcmRVc3Zqal9uQlBrdTlVT3duSnQ1ZHNQbGNCWUZzMXllLVdCSmU1VTNQZTNWQnlqVmtXcTNEUmdnSE9XTHV1NlcxbUIxU1NpTnhaZ1RQa2ZQUzRQMXF0R3dlaTAtMXMydFFDTEwyMlBlRVFOZXpxYQ?oc=5"},
  {title:"Big week for Rodrigo Bentancur as Diego Forlan makes Tottenham star captain", source:"SpursWeb", date:"25 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/big-week-for-rodrigo-bentancur-as-diego-forlan-makes-tottenham-star-captain/"},
  {title:"Tottenham legend makes big Harry Kane claim and gives telling advice to struggling forwards", source:"football.london", date:"25 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-legend-makes-big-harry-34670615"},
  {title:"Tottenham news: Give Roberto de Zerbi a proper chance - Tony Pulis - BBC", source:"Google News", date:"25 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi8gFBVV95cUxOU1pDSWljZkg1Q0JKR090ekd4N2NqMEJreUMtUzdLeWtFVHc0ZkZUbE1JVmpHV1c0ZklwRm16RVdJa3NtRnR5blRjaDBSTmNsSmNreHd2OXRGNmhhanFRaFBnV1dCWTU5ME9XRFBoZVp4NDJjOGNrYkhUR1RCOVNlamxFSU1pblFzTmtBekltUlNqUHd0cWNTNnQxcXFKYWk5YVdYSEFUckE3Rnp1Q00tVXBFOXM0cWZpMk1fZHRDekYtekRvSEplZVA0amNVUjl3LTltOFB4NHZFMUpud0VwQVhZeXpoaVhQXzh1OERORWdLdw?oc=5"},
  {title:"Tottenham set new price to sell Richarlison in January with club chiefs to accept cut-price offer - LiveScore", source:"Google News", date:"25 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi_AFBVV95cUxPT1lZVElyaTlETTVrb0xYSmQwanlRNG11dzdRZ1ZWLTVURWVPYzRsQ0lHLVppOWl2YnpsaF8wQTBOTTJsNGFHbVBHekxQWkJLb1lRTVA5ZTFYb3BVcmRHdWVFb1hyeVNwUmJhNDBPYWhoV0dCNDZyMUVhVndpWmdHU284by13REdnOWJLVERTbXQ0b2d0NGtPQWpOOEtTR1Jjd2VRYWRBWnJWM0F4c3BHTEN2OGw4ejd0X21ua0NjSTNNU1dBbHl0YUpMQk5odDAwT0hLSkdBenQ0YjIyRXdONDlCdWx6TGtsMThpX2MyOXVrTU9oLVNMYVBKRlA?oc=5"},
  {title:"Son Heung-min is reminding Tottenham fans of what they desperately miss - LiveScore", source:"Google News", date:"25 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi2AFBVV95cUxQdURFU1ZvWjRiR25tcnowUi1rMmRHUGVMSWYteV9fOWhQSHM1OS0xeDUxYmpsSW1EVzF2TTl6bHZXUENBbG9kMDNCclQ0dHQ5UTRkUVh4WlR2WmRJbUJRcHJKYXp0cHh6dmNTWkFIdTdoZ3ctRlk3dDVmTlhTTHl0TzRrd3Vyd2QtWWlsU1FDYlBRUU9Ma3VuQ0pyTEc0NlBBcFo4engwc21zVmFkVll1V2o3QklIcmRQSzM0NVFfWHBvX3FBRXJuc2o3VVJxYTB1ZWpGU3lDQ3E?oc=5"},
  {title:"How much Lucas Bergvall now earns at Tottenham after 200% pay rise", source:"SpursWeb", date:"25 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/lucas-bergvalls-new-tottenham-contract-comes-with-a-nice-200-pay-rise/"},
  {title:"Dejan Kulusevski court date adjourned as magistrates left asking questions over Tottenham star", source:"football.london", date:"25 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/players/dejan-kulusevski-court-date-adjourned-34669899"},
  {title:"&#8216;I gave Harry Kane his chance but Will Lankshear was right to leave Tottenham&#8217; &#8211; Tim Sherwood", source:"SpursWeb", date:"25 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/i-gave-harry-kane-his-chance-but-will-lankshear-was-right-to-leave-tottenham-tim-sherwood/"},
  {title:"Manager confirms Tottenham have clause to recall loanee who cannot stop scoring", source:"football.london", date:"25 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-news-oliver-irow-plymouth-34670028"},
  {title:"William Gallas says Tottenham miss Daniel Levy despite £394m spending spree", source:"SpursWeb", date:"25 Sept 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/william-gallas-says-tottenham-miss-daniel-levy-despite-394m-spending-spree/"},
  {title:"Tottenham sent clear Roberto De Zerbi timeline by former player", source:"football.london", date:"25 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hotspur-roberto-de-zerbi-34669272"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Friday, September 25 - Cartilage Free Captain", source:"Google News", date:"25 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi2gFBVV95cUxNTkJETXk0aFRKb0NzNTVNbzBUQ1JSN3ZxRnJzTnlzVjloa1otaFROWWg4NmFUMXZpd3I4NnJTcUdtdVoyMmFsRjVDaWtXQmE3QWg1WE1wb2QtSTE1OE9zZmp5cjV0NENLaWQtUmtiMWZqQUQ1Q213SlEwajFsZUhZU0p1WUVBZWpmNUdJbUhRTW5yZlVMcUhySmZtdEVQR1BHS1RycEQwZHhick9sVjJZX2pzdE53TFJjdVIza2hST29lMDdwNmZRQmJMMGtaNEcwZ2ZmbXhfbWpYdw?oc=5"},
  {title:"The 15 Tottenham players set for extra sessions with De Zerbi and when the internationals are playing - Football London", source:"Google News", date:"25 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxPQjlWd3hyYnYwdzVoZm9sbGx6R05fT0R1UXRZaU0xVjRBUWRoWl8waEFuYzhoTXFlQllReDBDUnZGNHlaM3FuQVQtbDJPbmtNZ0F5NUx0S01TNU9NVVBFU3Q5R0RWX2syLW8ySHBtM0xyVFp3VmhLQ1pQNXlEYzVCeXJMR1lkUmZWaVNXTHpKekZwSVI0QXZQR9IBngFBVV95cUxOWU9KYnZyYXRYVVpMNlRhU0hhWVI3U1d6VFhKa3JqMFpXT0NRZkN3LXQyT3RVZm05ejFKU0RuU2ExbTEydThLSFFDa0pjM1V6SW5wLVFzSEYxSHoxcFhnNTRKTXJsc2RhWFJPTC14V3RGcHJmdVBWTHRKOC0xNmt4SG9yNnEyRUtoRVE0YzdnaWkyMmFPQjZ3d2NFS0ZXQQ?oc=5"},
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
