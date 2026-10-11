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
  {title:"Roberto De Zerbi says three Tottenham new boys came to the party against Man Utd", source:"SpursWeb", date:"11 Oct 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-says-three-tottenham-new-boys-came-to-the-party-against-man-utd/"},
  {title:"&#039;He suffered too much&#039; - De Zerbi hits back at criticism of &#039;complete&#039; Tottenham player", source:"SpursWeb", date:"11 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/he-suffered-too-much-de-zerbi-hits-back-at-criticism-of-complete-player-dominic-solanke/"},
  {title:"De Zerbi has his Pochettino moment and the strange decision during Tottenham&apos;s draw at Man United", source:"football.london", date:"11 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/de-zerbi-pochettino-moment-strange-34748116"},
  {title:"Dominic Solanke admits he has to work on one attribute as Tottenham failed to beat Man United", source:"SpursWeb", date:"11 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/dominic-solanke-says-tottenham-should-have-been-3-0-up-at-half-time-vs-man-united/"},
  {title:"One Roberto De Zerbi quote aged horribly within 24 hours after Tottenham&#8217;s draw with Man United", source:"SpursWeb", date:"11 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/one-roberto-de-zerbi-quote-aged-horribly-within-24-hours-after-tottenhams-draw-with-man-united/"},
  {title:"Four strange things we noticed about Tottenham&#8217;s squad va Man United that you may have missed", source:"SpursWeb", date:"11 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/four-strange-things-we-noticed-about-tottenhams-squad-va-man-united-that-you-may-have-missed/"},
  {title:"Tottenham press conference LIVE - De Zerbi on Bentancur red card, Solanke and Man United", source:"football.london", date:"11 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-press-conference-live-de-34747164"},
  {title:"Roberto De Zerbi rubs salt into Richarlison wounds with Tottenham admission after Man Utd draw", source:"football.london", date:"11 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/spurs-roberto-de-zerbi-richarlison-34747536"},
  {title:"Response after red card 'builds mentality' at Spurs", source:"BBC Sport Spurs", date:"10 Oct 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/football/videos/cmqjnv52141po?at_medium=RSS&amp;at_campaign=rss"},
  {title:"'I kissed Rodrigo and said thanks' - De Zerbi 'liked' Spurs red card", source:"BBC Sport Spurs", date:"10 Oct 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/football/articles/cqn73g3pvezdo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Manchester United 1-1 Tottenham Match Report: 10-man Spurs will be frustrated and relieved", source:"SpursWeb", date:"10 Oct 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-match-reports/manchester-united-1-1-tottenham-match-report-10-man-spurs-will-be-frustrated-and-relieved/"},
  {title:"Five things we learned as Tottenham draw 1-1 with Man United and Bentancur sees red", source:"SpursWeb", date:"10 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-things-we-learned-as-tottenham-draw-1-1-with-man-united-and-bentancur-sees-red/"},
  {title:"Solanke saves wasteful Spurs - analysis", source:"BBC Sport Spurs", date:"10 Oct 2026", tag:"Club", url:"https://www.bbc.co.uk/sport/football/articles/c9dr8y80d7e5o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Tottenham player ratings vs Man United as senior 1/10 star lets his side down", source:"SpursWeb", date:"10 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-player-ratings-vs-manchester-united-premier-league-bentancur-red-card/"},
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
