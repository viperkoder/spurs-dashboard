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
  {title:"Van Hecke names one thing Tottenham are doing well and one thing that must improve", source:"SpursWeb", date:"13 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/van-hecke-names-one-thing-tottenham-are-doing-well-and-one-thing-that-must-improve/"},
  {title:"Roberto De Zerbi sheds light on his animated message to Matyhs Tel after Tottenham draw", source:"SpursWeb", date:"13 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-sheds-light-on-his-animated-message-to-matyhs-tel-after-tottenham-draw/"},
  {title:"&#8216;Sorry for the fans&#8217; &#8211; De Zerbi reveals why Tottenham can only play well for 30 minutes", source:"SpursWeb", date:"13 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/sorry-for-the-fans-de-zerbi-reveals-why-tottenham-can-only-play-well-for-30-minutes/"},
  {title:"Jamie Redknapp names &#8216;diabolical&#8217; problem he did not see coming at Tottenham", source:"SpursWeb", date:"13 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jamie-redknapp-names-diabolical-problem-he-did-not-see-coming-at-tottenham/"},
  {title:"&#8216;He agreed&#8217; &#8211; De Zerbi reveals what he told Lucas Bergvall before new Tottenham contract", source:"SpursWeb", date:"13 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/de-zerbi-reveals-what-he-told-lucas-bergvall-before-tottenham-contract-extension/"},
  {title:"Whether Richarlison can face Liverpool in Carabao Cup and the powerful people watching Tottenham", source:"football.london", date:"13 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/powerful-people-watching-tottenham-whether-34609385"},
  {title:"'I think these Spurs players look anxious'", source:"BBC Sport Spurs", date:"12 Sept 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/videos/cz7zpg321j1o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Tottenham's wait for league goal continues after Everton draw", source:"BBC Sport Spurs", date:"12 Sept 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/football/videos/cg49xg625n0o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Five things we learned from Tottenham&#8217;s 0-0 draw against Everton as De Zerbi goes goalless again", source:"SpursWeb", date:"12 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-things-we-learned-from-tottenham-0-0-draw-against-everton-as-tottenham-go-fourth-consecutive-premier-league-game-without-scoring-a-goal/"},
  {title:"Toothless Spurs blank again as new era turns into a false dawn", source:"BBC Sport Spurs", date:"12 Sept 2026", tag:"Club", url:"https://www.bbc.co.uk/sport/football/articles/cvgydkv0yxdo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Tottenham press conference LIVE - De Zerbi on making history, goal problems and Tel", source:"football.london", date:"12 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-press-conference-live-de-34609080"},
  {title:"Sky Sports pundit and former Spurs star sticks the boot into &apos;diabolical&apos; Tottenham reality", source:"football.london", date:"12 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-jamie-redknapp-34609180"},
  {title:"Every word Roberto De Zerbi said on what he told Mathys Tel and why Tottenham can&apos;t score goals", source:"football.london", date:"12 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/every-word-roberto-de-zerbi-34609231"},
  {title:"Tottenham 0-0 Everton Match Report: 6 hours without a goal for Spurs", source:"SpursWeb", date:"12 Sept 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-match-reports/tottenham-0-0-everton-match-report-6-hours-without-a-goal-for-spurs/"},
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
