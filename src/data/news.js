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
  {title:"Spurs and Everton in advanced talks over Ndiaye and Richarlison", source:"Sky Sports Spurs", date:"30 Aug 2026", tag:"Club", url:"https://www.skysports.com/football/news/12040/13578971/iliman-ndiaye-and-richarlison-transfer-news-tottenham-and-everton-in-advanced-talks-over-separate-deals"},
  {title:"Tottenham and Man United look at late deal for 6ft 5 monster with 19 G/A last season", source:"SpursWeb", date:"30 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-and-man-united-look-at-late-deal-for-6ft-5-monster-with-19-g-a-last-season/"},
  {title:"Tottenham transfer news LIVE: Iliman Ndiaye bombshell, Richarlison exit, Cody Gakpo latest", source:"football.london", date:"30 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-transfer-news-live-cody-34537652"},
  {title:"Key details as Juventus seal move for Tottenham’s Pape Sarr - Get Italian Football News", source:"Google News", date:"30 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiowFBVV95cUxOVFlrSzFodXN2NDA1U1MzWEpJMHdDQTg0cGpQaEZ4aG9UNVhvZDdOOXFtaDA3ZU42cER6cDdvUDRUR0NySmFkQjR0OXJUZG5kd293U2VzREVaX3dXYWJaX2Q3ck1aWm01OUxYVmVzOWoyMUhVRVBiZUF6b1BiLWV4ZFhyemZ2VG9BVlBfVWlSTV9KYnNtUFRHQmVZc3ljTzhqWkZz?oc=5"},
  {title:"De Zerbi in dreamland after Tottenham agree Iliman Ndiaye signing as Everton close in on double deal - TEAMtalk", source:"Google News", date:"30 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiqgFBVV95cUxON1ZqZm9UeTBGdjk1NXc1b2txajVzaF9oaTRhM25uZjB3UzkxWkZmNFllMmhwdm15RTVvaUI0STk0d0QyMkZMeU9BVk9uMElRR29PQ3I5S3BhZDRrSTQ4dWNWQ1hDd1EwdlI3aDVCN29vR1F3cGFxNDNkNUxhOHRqNEVoeTZBci1VY0R1NTlZQ2NDaTdXZUQ5eS1xX1FzeU1LWXRSSDVhQnQ3QQ?oc=5"},
  {title:"Tottenham consider late move for La Liga right-back with £51m release clause", source:"SpursWeb", date:"30 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-consider-late-move-for-la-liga-right-back-with-51m-release-clause/"},
  {title:"Spurs agree stunning double deal with Premier League rivals after Cody Gakpo decision - SPORTbible", source:"Google News", date:"30 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMisgFBVV95cUxQYU5PNHcxbEM1SF82MUozMWdIQUFRaTZHVnFBNGFqZFJuMVd2QmRmaXhqZjFRb0c5RjlkNkxjd0ZvcDI3RUIwN1lta3lIQUJzVVR5bnNQNUdSOVlhaXlrSWhpS0t0SFFKTUZPSVpvWHUybGd3VFU2UTRURm9US20wQ3FILUh3RFItTWpBVWJPRTB1SHExYnFlMWFQb1NMZG9FamtpazJBQy1YaE80V19mWUJB?oc=5"},
  {title:"Tottenham respond to Cody Gakpo snub by raiding Everton – ‘Agreement in principle reached’ - Football365", source:"Google News", date:"30 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMieEFVX3lxTE8xdTdiSElGZWFDQk45b3FjUWtfcnNEZUxfTmpMd3d5eWF4cW9OX0pZUlV1aFVPWGdYb3NtM3plM3BJZGlGeWtUQzNCZXk1VkhwelJKallFRlprbFJzMFpkeTlVWTkxNTVPejRxVW9Vb2dyMHlLRzA2cw?oc=5"},
  {title:"Tottenham transfer news live - Ndiaye bombshell and Richarlison exit - Football London", source:"Google News", date:"30 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiqAFBVV95cUxNS01MM2VKaS1vVUQ1ZkNBNHFTaDRoVzcwNERiSHRGYmQ4ZmxXbHpsUEFmWnN1eloxM1JOT2hOSjg2WjJQOGVVaXRCRk1BdlhlMDZ6dHNwM2RNZ25wbUJoOHhvTXFMckZ1dkxueGVrbmxCZEVHQkdrTG5zZS1lSTF6QTQ2V1R6LXBUUFl0WGEzMzlZMzF3SFZUeXhpTURYM0F4QVNUUDdFUF8?oc=5"},
  {title:"&#8216;Moody&#8217; Tottenham star is dubbed &#8216;certain to leave&#8217; amid £40m price tag", source:"SpursWeb", date:"30 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/moody-tottenham-star-is-dubbed-certain-to-leave-amid-40m-price-tag/"},
  {title:"Tottenham reach agreement for Richarlison &#8216;double deal&#8217; with Everton man joining Spurs", source:"SpursWeb", date:"30 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-reach-agreement-for-richarlison-double-deal-with-everton-man-joining-spurs/"},
  {title:"Tottenham reach Iliman Ndiaye agreement with Richarlison transfer decision made", source:"football.london", date:"30 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-spurs-everton-ndiaye-richarlison-34541279"},
  {title:"Tottenham 0-2 Newcastle: First Premier League win for boss Matthias Jaissle - BBC", source:"Google News", date:"30 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE5jeVIySm4zVjF1d3Yzc0RMaWd3ZUVlV0RkRk1MS04xS0gxWHh4QmtvR3J6U1VXVC1uek9aVVJ5RnRCVTVnMUZSemdWc01yOTRWZkRQcDJtRDdXUDdSSWwyaFhvTWNUdw?oc=5"},
  {title:"Tottenham v Newcastle LIVE: Score and latest updates from Premier League - The Independent", source:"Google News", date:"30 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiugFBVV95cUxQX19yalJlVEw2Yk5FLWZkZkN4WDNFRHZXcVZ5SEJPYXo5VnlEbXpRTFN6Sm5DVEZJWkotYmg1UGJOUDZhaldfbHRLVDZlUmQ2aUJwYUlOUWR0T3VDU1RvRG1LOHRObjJMMzhNU083dWVOa3ZIMXNudlJ3bzEwMFMwRjBWcS1PcklsQVowakVoYThHTUt5OGlKSGxSbmdkTlZEdzliS09POXJ0Z29oN3hheXVXLWZ5aThSTWc?oc=5"},
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
