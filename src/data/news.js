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
  {title:"Michael Carrick press conference LIVE reaction to Man City 115 verdict and Man United team news vs Tottenham - Manchester Evening News", source:"Google News", date:"09 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxOOURJa3pCSXNIVjJjbUtGd2pwQV9xNTU0TzBEd0ZQMTRpc2ZqMFFIenViMDM2Qy1JMlpJY0g3ZTZZWkdNYk51TmRDLUM5d2VZcG9XZ3VrNGRSSkV4bGw3UlFHcDBWR1JGQzBzUXczXzNhcHM2MC1HbWVNbTJWZVNjYmFkOVQ1TGhYVHg4N0R2aU02SmhMQktCejVZUmZfdGo3bnJ3TXFyWk1SQm5jdmswc281WGZYdw?oc=5"},
  {title:"Tottenham press conference LIVE - De Zerbi on Kulusevski, Van Hecke, injury news and Man United", source:"football.london", date:"09 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-press-conference-live-de-34739802"},
  {title:"Xavi Simons pursues new career during Tottenham injury layoff as he plans for retirement", source:"football.london", date:"09 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/xavi-simons-pursues-new-career-34741638"},
  {title:"Watch Under-18s’ cup clash with Fulham live on SPURSPLAY on Saturday - Tottenham Hotspur", source:"Google News", date:"09 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMivgFBVV95cUxOakRCbEtBQjZFNDdLX1VBV0JiQ19vSGNNVS00SHpHZWQtc1JQNXVEVTNDSDkzeHBxT0lFQy1BN21ZbHBQRmJLbTA3NWFtZzNLbWdKclJ2R0x6cEpXZnVQV2xlWjk4dC0zaFlFUXNwbVJiakVhaFo2WTVkX08zVU5lTjl6LXZaeXloYUJlNGcyS1pxcmtuMjNoYkdGYmt0ODFreTdibXhiZlhmRXN5Wml3U3lVU1c5b0xXcDQyc2xR?oc=5"},
  {title:"Five things spotted in Tottenham training before Man Utd as Roberto De Zerbi dealt injury blow", source:"football.london", date:"09 Oct 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/five-things-spotted-tottenham-training-34740381"},
  {title:"Roberto De Zerbi told he faces Tottenham sack with poor Man Utd result this weekend", source:"football.london", date:"09 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/roberto-de-zerbi-told-faces-34740659"},
  {title:"Tim Sherwood is Tottenham&#8217;s best points-per-game manager, and he has thoughts on De Zerbi", source:"SpursWeb", date:"09 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tim-sherwood-is-tottenhams-best-points-per-game-manager-and-he-has-thoughts-on-de-zerbi/"},
  {title:"&#8216;Tottenham are so flaky&#8217; &#8211; Chris Sutton shares score prediction for Man United v Spurs", source:"SpursWeb", date:"09 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-are-so-flaky-chris-sutton-shares-score-prediction-for-man-united-v-spurs/"},
  {title:"Tottenham Hotspur perform U-turn on what they want to be called as the T-word returns", source:"SpursWeb", date:"09 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-hotspur-perform-u-turn-on-what-they-want-to-be-called-as-the-t-word-returns/"},
  {title:"Manchester United vs. Tottenham Hotspur Premier League Preview - Cartilage Free Captain", source:"Google News", date:"09 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi1AFBVV95cUxOYjY4SlVteTBETmVsSktxLVZQSjFPSW1iajBxQS15WUhuUEtmTFZMOHk0UUxfOFRnelF0VjZGeld0Mk5xY0Y1d0U4WC1DbUZpampHUDFseVBLWW1DejFCa0RWQlBobHRLQk1ZdlI5OVgzSms5cUhzVzNFUTBnbnJnaW1lV24wczVZYlFzU3FUUTZrU3ZkZ0F6SHcwNFJWNnd2Z2cycGcxVkpjNVlPQk83N3J6UVgwVGFPQ0U1UlRPeXQzM2NnLXJVRU9qNUdGVTZGZGF5eQ?oc=5"},
  {title:"Tottenham may have just given a Jan Paul van Hecke injury hint from official video", source:"SpursWeb", date:"09 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-may-have-just-given-a-jan-paul-van-hecke-injury-hint-from-official-video/"},
  {title:"Tottenham fans snap up £40 retro shirt under £14.50 ahead of Man United clash", source:"football.london", date:"09 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hotspur-shirt-man-united-34739884"},
  {title:"Five Spurs questions we need answers to ahead of Man United vs Tottenham", source:"SpursWeb", date:"09 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-spurs-questions-we-need-answers-to-ahead-of-man-united-vs-tottenham/"},
  {title:"Tottenham fans sent new Kulusevski warning as comeback draws closer - London Evening Standard", source:"Google News", date:"09 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMinAFBVV95cUxQYU1QWHBya2tUUjYtWTlvM3pKNUxVVGlxeThYeDY1dVoySkpCdUtPR2g4SGZvSzJOeVkxeU1GNzk1cS1CUEtyNk5fY2k4UjRoOXZ6aDBSX09wNXpKeXU3NkNUMmp1OWVZTDA4U1dYUVlhajBFd0Y5aFBkVUladElaT1E3emliMVN4eUpLeDdkZjNtcF9iOENiSndNRFc?oc=5"},
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
