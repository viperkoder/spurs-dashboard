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
  {title:"Tottenham transfer news LIVE: Done deal, Marmoush latest, new winger on radar", source:"football.london", date:"26 Aug 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-transfer-news-live-omar-34511664"},
  {title:"He's a Mix of Kane and Son: Tottenham Pushing to Sign Underrated Forward - GiveMeSport", source:"Google News", date:"26 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMihgFBVV95cUxPeHNXa0VrZVJpMlo1cDR3YXdpNXVwaHR0aDA3dkczck96Ui13S1QyMC1qQlFoeWtWTF9lS0dlbWF4QlNZc1dRb2otSHc3a3l3OGpOZmY4bEtYYXZuVXo2NWk5Rk1QeEpkNGZFWGo1dEItSjM0NkRRUzFCS1N3aG5qMEZTRE9mdw?oc=5"},
  {title:"Tottenham predicted team vs Charlton - Savio and Luca Williams-Barnett decisions made - Football London", source:"Google News", date:"26 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMisAFBVV95cUxQZDRadFRCbWhRRTZYMFhhdm90RnJ4eHFVSjBHT1dFQm56Yl9hUUxkSXY0TnBTbmJrMXk0Vkg3WVJwSDg0Z2xDcXZzZVBWSnhCVDFuVE9ocG50MGljY1Z5bW9NRzEzM3Zxcmw4c0NfQ3VsOGxKeXQ3S29Da1A5d0wwZWNtY3dUMXEtRWxVMlRRYkZKZldWRHBJbUw0R2VWYTZDa1huM2RHamFmNHJ5eC1OVdIBtgFBVV95cUxQem9fM0hNTl9rZXdzajduOEFOdXRDdjVoc0pmakNlWlUycjh0b1dSRXRrbjRud0lPbmstVW1QRllaWmpPNmJSSkhsRjUwUVBkY1VVQWZkaGdjUTRMZTJtOFpsZUNFcEQyUWQ0aThISmhWVHRXYkV6NldGOUZvbzBOTElISGNzRFFjQWs5NHlZY1ZHR0R4ZW5RUUJhdDFXMDRTRmtmZFgwcmZON2R5ckhxWGppWUtMUQ?oc=5"},
  {title:"Xavi Simons provides Tottenham injury update before Carabao Cup clash in transfer message", source:"football.london", date:"26 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/xavi-simons-provides-tottenham-injury-34516243"},
  {title:"Tottenham handed boost just hours after confirming £85m transfer as club give update - Football London", source:"Google News", date:"26 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxQZWZzNXhsX1lLUHBJbjV4clVrSjg4YUJ0YkxGbTZaOGQ4WmY1bExIVExlVllZTnp0TGRfVWVwRVE1Zlg1LXpxeFJCSVU4TlhfaVRpY3FkTTVxWTdoamRTV01ON0szX2FyeTRCejR4X0FFbzdOWUxCREFndWxrX19sOGotNHdtYW9uVEMwOHZKX2ZxQUxFREtfR2xZU3JHZXYx0gGmAUFVX3lxTE5STDVxbDUtWjhCM2lqQzM1TV83bDdvRUdjcTdGdDdkRUZ4TVhhSU5wclRqQnRTTWNINTdDa0M5NGNxUkhKRy1QX3VacWs3d2JNbFlDWHI0eVBKeWFOT0xuVkZ2eUNQQlJTZUplS0xPRFZKclJLeEEzWlR1NFEzT21BVXlGZ1lQOVdQNEUxdjNJLWZoc0FJZUJ3bk1YRHZkOF9HTkFIc1E?oc=5"},
  {title:"Tottenham Hotspur vs Charlton Athletic: League Cup stats &amp; head-to-head - BBC", source:"Google News", date:"25 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE5xdmYxNnVMLWlKUE5UbDlpS0pPTF9Bem5JOE1XaFFWQjhLN29jY1djZGExV1Q3bHRoRG1tcHk3djkyU2FYTE94Y1pqY2dJMy0wNl91ZGxVdXFHZUdTZHNaOEVUN3ZSUQ?oc=5"},
  {title:"De Zerbi warns Premier League he wants Tottenham to keep spending and sets Savio challenge", source:"football.london", date:"25 Aug 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/de-zerbi-premier-league-savio-34516554"},
  {title:"Meet Sávio: All you need to know about the Tottenham and Brazil winger", source:"SpursWeb", date:"25 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/meet-savio-all-you-need-to-know-about-the-tottenham-and-brazil-winger/"},
  {title:"James Maddison suffers fractured shoulder in Tottenham's horror defeat to Brentford as injury update issued - The Sun", source:"Google News", date:"25 Aug 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxQanNqbGFQZEdiSXRjUzIxUzhid0dXYXRMajVycU1QUGdfMk9hNlp3NjAwWUxvdG50NDZhaUJhbFNMWWNwbGxqeWxUdEFfdFJ4SjA1aWFrWWZuZUdpYmhoNHQtXzdFZDBwRkg5V3ZzRFZ2b2pfVlhsSUp0ZFVhcTBSanBTNTVKd0N3NDg5SUxSRTBRcFM0WWR0azAwOGFxazQ0Y2w4TEp0QWN1bGo3MGt2SlhiMC1VZw?oc=5"},
  {title:"Tottenham predicted XI vs Charlton as three players make full debuts in Carabao Cup", source:"SpursWeb", date:"25 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-predicted-xi-vs-charlton-athletic-carabao-cup/"},
  {title:"How to watch Tottenham vs Charlton: Carabao Cup team news, TV channel and prediction", source:"SpursWeb", date:"25 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-to-watch-tottenham-vs-charlton-carabao-cup-team-news-tv-channel-and-prediction/"},
  {title:"Positive James Maddison injury update after scan for Tottenham playmaker", source:"football.london", date:"25 Aug 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/positive-james-maddison-injury-update-34517307"},
  {title:"Tottenham explore late deal for Jean-Philippe Mateta after failed Aston Villa bid", source:"SpursWeb", date:"25 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-explore-late-deal-for-jean-philippe-mateta-after-failed-aston-villa-bid/"},
  {title:"Spurs vs Charlton | How to watch, team news, kit colours, key information - Tottenham Hotspur", source:"Google News", date:"25 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxQeXFFZF9ydUd4YTdycTUyRlRxX184dGpkaUpRVmdQT2p3amgyNnRycU1yZ3kwQVBFWVoxYTMxOFJWdWVrQjdzbmN1WkhhVWRPNVZmSGdMSk8tR3I5OHNSWDQ4WDN1WjFPV3Vma01EMk1xOWxMOUhDdVhuV3NrNjBQTEV2ZGtTZ0R0NWt3SmVIelR0ZTZqOEpIRFFkZHZ3eGRJYXIzUVpRbzVCQzVEamtySDE1dnc?oc=5"},
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
