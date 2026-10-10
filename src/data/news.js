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
  {title:"Tottenham star is available to start despite flying halfway around the world, De Zerbi reveals", source:"SpursWeb", date:"10 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-have-one-of-the-best-professional-mentalities-in-rodrigo-bentancur-de-zerbi-reveals/"},
  {title:"Premier League today: How to watch Manchester United v Spurs, TV channels &amp; live stream Saturday 10 October - The Guardian", source:"Google News", date:"10 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMisgFBVV95cUxQOUFPTUc4V3p4NjFjYkhMNVUxWVBrUWVCbElvOWFhZXpyRHhjTURyUl9NVTVPZ1NZZUFtQ05oZm10S0V1ZGN3ZldkVVZLc3dtQmgzTVlTeG5UclQzTkNueVFCTEZFN0lXSnNWUi1RcVc3VGlOdl9OMHV4ZjM4SmNFMTNXS0ZXU0xnMVgyS0VKZDY2Z2NROGNBVENwWlB3aG5FWE1KQm9YcGZTNDBPV09uY0Rn?oc=5"},
  {title:"Manchester United vs Tottenham LIVE: Premier League - Al Jazeera", source:"Google News", date:"10 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipgFBVV95cUxPQXFXT0c0MnhjUlVHZllnTlh5S2JMRVRWeGF3ZW9NNnJJOG82OTlReDZHSi1kY1RpVXZjMk9TZUJXdmpLaDNTV19ZM25KU3MyUWRfRk0yeUVVdDhzM2JoUG1fekhySHFONmgwZ1dyaXVzS1B5S0M0ZU93QmowZEpzUVBjT1FSZnBfVktyLS1QUlhHd3ZKNDhNaEJDcHB5cVBuRjJmb0VB0gGrAUFVX3lxTE1RMHlxNENfV2J2WnVGMUxXTHphV0ozZkF2SmYzSWdhVm8zNFZDcTZwekVkVTdxVmQ2bl95NDdiUWZNdm9ZWHNkYjd2UmhEU2RveEV5VDM4VGtWaTd4Tmt0SGJhUTcxZzdXMkh6cUUyblEzTVRYQm1jQlBzRHRZZHY4VHNtcVRoWmtWckJRQjdXaVFyZ2M4eXZyM1RHZkhfYklucWUycThPbWpZSQ?oc=5"},
  {title:"Dejan Kulusevski will be even better after injury as a Tottenham 10, says De Zerbi", source:"SpursWeb", date:"10 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/de-zerbi-believes-kulusevski-can-be-a-better-player-when-he-returns-tottenham/"},
  {title:"Roberto De Zerbi has already decided Tottenham&apos;s next step regardless of Man Utd result", source:"football.london", date:"10 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-roberto-de-zerbi-marbella-34745217"},
  {title:"Tottenham squad will fly out to Spain after Man Utd clash for team bonding camp", source:"SpursWeb", date:"10 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-squad-will-fly-out-to-spain-after-man-utd-clash-for-team-bonding-camp/"},
  {title:"Dion Dublin predicts Man United vs Tottenham score and urges Harry Kane signing", source:"SpursWeb", date:"10 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/dion-dublin-predicts-man-united-vs-tottenham-score-and-urges-harry-kane-signing/"},
  {title:"Thomas Frank lands new job after Tottenham exit as surprise decision confirmed - Football London", source:"Google News", date:"10 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMikwFBVV95cUxNT3FGOVF5SlhDSnYtbUlyZ0dhUTRxODA1N1JHa0dPVnIwSTlEZnVlUjB6bWJmZVQ2X0pMeEN1bVc5c0oxMTZoUElRalRoWXdGSm9STXlPbVl3WGcwUE02QWZBTHA2Wm1FNXVVSllYR2h1anV3WTZsWXRxX3J4WU95R2VqWkVTVEVvdld4aWJQekFvR03SAZgBQVVfeXFMTWVCcnRzX09oZkRpcDhBeTZaOFJNeVdkSVNyNGFSODU3eXkyTld3ajJlb0JibmdMbDRxMFZ0UlNYTEhla0NiVjNjN3Q2cWIySzRlTFlaYnFIdjBITm5JOXUtN3JkbGdTSVhIZ2p3YlhLRzF3d0NDZTRsak4xbXBCdllva2dVcklhZHlVSVhVLXRPeUhUVGpWSWM?oc=5"},
  {title:"Man United vs Tottenham Premier League preview, team news, score prediction", source:"SpursWeb", date:"10 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-match-previews/man-united-vs-tottenham-premier-league-preview-team-news-score-prediction/"},
  {title:"Tottenham to fly to Marbella for training camp", source:"BBC Sport Spurs", date:"10 Oct 2026", tag:"Club", url:"https://www.bbc.co.uk/sport/football/articles/cxr5y32r26l5o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Tottenham news: Tottenham fly to Marbella for team-bonding camp - BBC", source:"Google News", date:"10 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiaEFVX3lxTFA2UWluNlNDSUFtdjNFbDEyUnVmQ05PU2t0R0U0MDgyNjhINDFUUDV3TWdZQnlVNl96THBGQS05bDg4NlF4ak4tUGR3MTVnR3R1VUxvMzVqSnEyRkxVWUxQbDl0bmdUYzVD?oc=5"},
  {title:"Tottenham predicted team vs Man Utd - Kulusevski role clarified, Williams-Barnett chance", source:"football.london", date:"10 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-predicted-team-vs-man-34744691"},
  {title:"15 players could miss Man Utd vs Tottenham as Roberto De Zerbi provides triple update", source:"football.london", date:"10 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-man-united-injury-news-34744732"},
  {title:"Ole Gunnar Solskjaer agreed to join Tottenham – but one intervention changed everything", source:"football.london", date:"10 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/ole-gunnar-solskjaer-agreed-join-34721374"},
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
