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
  {title:"How to watch Liverpool vs Tottenham in Carabao Cup: TV details, team news and prediction", source:"SpursWeb", date:"14 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-to-watch-liverpool-vs-tottenham-in-carabao-cup-tv-details-team-news-and-prediction/"},
  {title:"Tottenham press conference LIVE - Roberto De Zerbi on Richarlison, Maddison, Tel and Liverpool", source:"football.london", date:"14 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-press-conference-live-roberto-34614314"},
  {title:"Tottenham fans split as De Zerbi hints at heavy squad rotation for Liverpool cup tie", source:"SpursWeb", date:"14 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-split-as-de-zerbi-hints-at-heavy-squad-rotation-for-liverpool-cup-tie/"},
  {title:"Nine Tottenham changes vs Liverpool as Roberto De Zerbi faces difficult Richarlison decision", source:"football.london", date:"14 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/nine-tottenham-changes-vs-liverpool-34613525"},
  {title:"How many times have Tottenham actually won at Anfield in their history?", source:"SpursWeb", date:"14 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-many-times-have-tottenham-actually-won-at-anfield-in-their-history/"},
  {title:"Liverpool press conference: Andoni Iraola to speak before EFL Cup game with Tottenham Hotspur - BBC", source:"Google News", date:"14 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiY0FVX3lxTE41NnQ3M1JkdlhiaTNUV3dhZG9MQW55V0JuakJ1V1ZsVGMwMzdYdE9WbHhDXzF2THBNcFpyZGhpeW1GUkJxREY1Ny1BQWxUUndyYVk1aUE3dU1rWXlsQkFOdXVkQQ?oc=5"},
  {title:"Liverpool vs Spurs | Carabao Cup | How to watch, team news, kit colours, key information - Tottenham Hotspur", source:"Google News", date:"14 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMixgFBVV95cUxOZDg4SUpydW1iVmZfMFdiOUFaNXhjcWk2N3U1eG92R2o3Q0wyYW5CbVR4ZjBMZDRXamxETjd6Mk9uRERfZnYzR210S1g4SmgyWHBVZWZia3BYd0FOa3RVR3VnY3pWSWUwRkxfUTY4a2pOVS1OZFlIVmtUaGh1MzNMendZbnJIek9DakowM1kzNlZydGUwQmFsQmt6YkJsSEh0TVRTY0NtY2lGVW1zajhVeXEwTm91NkxrZjdxZjBOT21iZVJ6aEE?oc=5"},
  {title:"Every Tottenham Carabao Cup third round result in the past decade, including one shock defeat", source:"SpursWeb", date:"14 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/every-tottenham-carabao-cup-third-round-result-in-the-past-decade-including-one-shock-defeat/"},
  {title:"Club announces Sportsbet.io as Official North America &amp; Africa Betting Partner - Tottenham Hotspur", source:"Google News", date:"14 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMivgFBVV95cUxPdWwyOHNFaDQ0NmxaTlVzWFg3SndiLW5NS1ZIR3ZWdkg3TzNud1R2ZGtIcjh3dUpNYlBhVWxaMmloeUNKZXNEanBqQm5IMUl4UC03MFRoc0FkWjhGNXJYdGsyUktLOGZKZWZQeHdESHZsOHpHbnpWWTVqN0hnQ1UxRXJKVjlnYjJfeHh4cVE5V0J6Q2E5V2ZsWkxiMHZSNTVoa2xibUdJSGFqVUtRcnVIWE5kTG5KMjVSZ1lqcVZn?oc=5"},
  {title:"'Bully' - Roberto De Zerbi cannot keep making scapegoats as Tottenham reign predicted to unravel in weeks - talkSPORT", source:"Google News", date:"14 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMilAFBVV95cUxNOUpfX3otT3o0RDJaZWVoS0xxam5rbXhHOFBhMDFzZkVpZXZINGZ2MVAxdHgzWk5ZUTFnSDhjSThZbVIteTZNVU9GYllQX0FtaFlyN0JRYWFTQnRnbXNLU1ZZN0hmemhhSmRJZExDa2Z5V3p1ZkRmU1lZVEh6cmU3SW1zdHFOWkFmSlNQN0RnT1lESXhT?oc=5"},
  {title:"Italian media tear into Roberto De Zerbi after sarcastic Tottenham remark as £317m spree slammed", source:"football.london", date:"14 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/italian-media-tear-roberto-de-34612871"},
  {title:"Can Richarlison play in Tottenham&#8217;s Carabao Cup clash against Liverpool?", source:"SpursWeb", date:"14 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/can-richarlison-play-in-tottenhams-carabao-cup-clash-against-liverpool/"},
  {title:"Midfielder deserves Tottenham debut vs Liverpool after 6 G/A in 3 games", source:"SpursWeb", date:"14 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/midfielder-deserves-tottenham-debut-vs-liverpool-after-6-g-a-in-3-games/"},
  {title:"De Zerbi Must Show More Faith in Bergvall at Tottenham as Big News Emerges - GiveMeSport", source:"Google News", date:"14 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMidkFVX3lxTE1pRm13ME9HOW9udUFSUnhtWTMtSThrXzdKM285VjlKZkxRVjdZOHEtLXVNOFpIOGtpRDZvLUxaU1pjX0F5MHpsNUFrR2xGdlk1RDJYYnpDTlVYRVAxYTVFVTlGaGRLbUczdFc1al9tTnV0OFlPdFE?oc=5"},
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
