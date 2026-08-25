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
  {title:"Tottenham transfer news LIVE: Omar Marmoush update, Gakpo latest, deadline closing in", source:"football.london", date:"25 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-transfer-news-live-omar-34511664"},
  {title:"Tottenham transfer news: Omar Marmoush agreement reached, Cody Gakpo blow, £30m exit", source:"football.london", date:"25 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-transfer-news-live-omar-34505963"},
  {title:"Tottenham approach Man City transfer deadline as Roberto De Zerbi eyes boost", source:"football.london", date:"25 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-approach-man-city-transfer-34510523"},
  {title:"Spurs &amp; Forest battle for full-back with Newcastle in ‘negotiations’ for £34m star - 3 Added Minutes", source:"Google News", date:"25 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi1wFBVV95cUxOal9iRUNHLWtpREd1WWsyR2RMbmlmMXlvbmlvbVhhQjdYR0R1dmFyYTBUX3JJSFhLelJTWE5JeHFvRGlLM1pFOUV4bVNHelNpV0hZTUxPWFUybDhuYnVRTEhWSk92dzJQSEEySFRQM0NydEdPMjhUaF81WEI5T0JZdjNpTEVIa1ZuNDJWVXJ3c2JrbHlfUHhNbDQwSEdRT0tvbGM1Y2FpaHRHS0JKTjlwcy00R2pZRm9ENDFXR0lsempOVENPUFB5V3p0NTlvM0E0SkNUQW9qMA?oc=5"},
  {title:"‘A Bit Mental’ – Tottenham Hotspur Loanee Makes Lincoln City Transfer Admission - The Stacey West", source:"Google News", date:"25 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMirwFBVV95cUxORlREWEloUktQVlhRVFZuRHQzYmVWT08xODFWdDhXX01LTC0tcmFlWGZMbjJETEttWU9kTkIyUTVPRk9OaUJULVplREFyOGc5d0hIa1ZIYWhDMnZhNDJzX3JTY1dnWnNXM1QzZDhEcTRvakl5cENZaHlVMlVTTHlKZGF1U1Rtal9xc0Z6MXdQSGRnXzg5VndtTlZjRHBQRkhZNlJfLXd2NTdQTVM2UmxN?oc=5"},
  {title:"Tottenham Hotspur vs Charlton Athletic: League Cup stats &amp; head-to-head - BBC", source:"Google News", date:"25 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiY0FVX3lxTE5jRFhtbk5XNGRfRldqN1NDN0gzTHlfVW5GWlRsckxCTVdTTHhBQkttc1hVbXZlWGtJT0pyVWRJOVc4WW1qZXVHUjVfRC1tTDd4UGhldGt4b0V6S1ZIam9lQ1czcw?oc=5"},
  {title:"Transfer news LIVE: Palace prepare £50m Bowen bid, Marmoush to join Tottenham - The Sun", source:"Google News", date:"25 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxQS0Q4VDlvbkdCa3hIV3hreG1rYllfenV4QVBTV25SOXFUdU9vN3htczBzQ3BkRWFtWDAzX05SRmcwajdNTkc0RVRaMnBqQ2tQNzhGUi1Vb0tNNG05MlUwSDJNT1BqdG5mS3VNSFlSN0lBRFFoc2Qxa0hycUxSaU9XRFhkc0ZjcDhWLXZOMjMyWDJmanlmU0dMcGE5V05kVmc?oc=5"},
  {title:"De Zerbi urged to sign World Cup winner to instantly upgrade on £12.5m Tottenham star", source:"SpursWeb", date:"24 Aug 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/pundit-believes-de-zerbi-has-made-a-big-mistake-by-not-replacing-a-senior-tottenham-man/"},
  {title:"Cody Gakpo transfer news: Man City interested in signing Tottenham target from Liverpool but Reds don't want to sell - Sky Sports", source:"Google News", date:"24 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi_gFBVV95cUxNZjUzNUpTcE13WDl2S29mVnBEcEVHTHNXbUxCMTY0ajY4VG5SX1d5Rm4xVjh5S1ZYSGpfeklJWjN6cXdRM0lJMGtxX3Q0dXFvckVTQncwRk1XRl9HT3o1OFNmYlVGdHA2a3ZhZjlVN2tCeW5UcFo2OEhyY2o5Rl84cGN2czdrb0ZnM0tiQkcyalFrWnR4dEpuT2ltakM1V2xLZzBTTU1Fb3JrbmxLbUplb3Z1bzdLLVU0WFhTcFlyV2FENUQ1c2VRUTJLNmxCSkd4VlJ4OV9FQ0s4YXJVUm53M0hMem9leEN3emo2Wi1fdWxRbGowTnZmNmo4QkRidw?oc=5"},
  {title:"Supercomputer predicts where Tottenham will finish in Premier League after 3-0 defeat", source:"SpursWeb", date:"24 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/supercomputer-predicts-where-tottenham-will-finish-in-premier-league-after-3-0-defeat/"},
  {title:"Tottenham contacted about signing 16-goal Premier League striker after tribunal drama", source:"SpursWeb", date:"24 Aug 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-contacted-about-signing-16-goal-premier-league-striker-after-tribunal-drama/"},
  {title:"Cody Gakpo transfer twist as Tottenham target gets new Liverpool exit option after &apos;agreement&apos;", source:"football.london", date:"24 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/cody-gakpo-tottenham-transfer-mancity-34511267"},
  {title:"Tottenham shown how £72m star could change their XI after 9 line-breaking passes", source:"SpursWeb", date:"24 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-shown-how-72m-star-could-change-their-xi-after-9-line-breaking-passes/"},
  {title:"Tottenham prepare new bid over £60m for Cody Gakpo bid as Man City join race", source:"SpursWeb", date:"24 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-prepare-new-bid-over-60m-for-cody-gakpo-bid-as-man-city-join-race/"},
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
