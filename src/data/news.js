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
  {title:"Tottenham tipped for title charge this season by former Premier League centre-back", source:"SpursWeb", date:"03 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/ashley-williams-makes-bold-title-prediction-for-tottenham-hotspur-this-season/"},
  {title:"Troy Deeney names Tottenham duo in his Team of the Week, including &#8216;overpriced&#8217; star", source:"SpursWeb", date:"03 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/troy-deeney-names-tottenham-duo-in-his-team-of-the-week-including-overpriced-star/"},
  {title:"&#8216;Like Alan Shearer&#8217; &#8211; Archie Gray reveals funny truth behind his Tottenham goal celebration", source:"SpursWeb", date:"03 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/like-alan-shearer-archie-gray-reveals-funny-truth-behind-his-tottenham-goal-celebration/"},
  {title:"It took Jan Paul van Hecke just nine games to break all-time Tottenham record", source:"SpursWeb", date:"03 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/it-took-jan-paul-van-hecke-just-nine-games-to-break-all-time-tottenham-record/"},
  {title:"Archie Gray and Mateus Fernandes agree on what helped Tottenham finally click", source:"football.london", date:"03 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/archie-grayand-mateus-fernandes-agree-34855270"},
  {title:"Double Tottenham Hotspur injury boost ahead of Leeds United clash as pair set for Elland Road return - Yorkshire Evening Post", source:"Google News", date:"03 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiygFBVV95cUxONC1zVUgwRVNnRzNpU3o1bWJscnllVm1TNzRHYWVPM0JfSUtnaF90TDRRQ00wMTZoTkdLck5qV1YwYXItTmxSTHBQeEs1UjBCTklBMzR3cmpVRlcwei1TbmhqUlIzSldqLTVvMlBoV0xqRk90dG1sUEY4bzFsWUhRRC1MYWdKeGwxVG9QUUhHdkVWMVBROWRFYWNJUFpidjNwZDNsOEgtVmI0QWg5STJqNEt6MWlSWFpKUWFlMHNMSEREVkk5LUd2M0F3?oc=5"},
  {title:"Conor Gallagher to Everton is unlikely, but two other clubs want £35m Tottenham star", source:"SpursWeb", date:"03 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/conor-gallagher-to-everton-is-unlikely-but-two-other-clubs-want-35m-tottenham-star/"},
  {title:"Tottenham continue to rue Will Lankshear decision as Middlesbrough transfer plan pays dividends - Football London", source:"Google News", date:"03 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxNRzdrX3EtTHJMSHBwNHZKQ0FtZUNlMW1SdjZ5WVRYQ2ItamdNbmRlM1NQSHplU0NrWmk0d09Ib0JENDlUdTdGQjBOcl9FTVhZdjJBbjV3XzhxNzVvNjNVLWdsYUFsY200SktSOVRaU0ZpbUY1UVNBRTBMY0FaN1lvbjZsSjBvTk5YSVE4UHZWblpJUVY0NGJ0cDk4RjdfYnIyTTdhR1pPRdIBrAFBVV95cUxORnp1eDYzZEZRVllOWmY3SmtsbWNubzhqcl9ZZjRUM1REWkgyU3ZveE5TdHpyQklNNGJzRGp6ellWcnlDWm1WSklDTU5IZXZ0S2lOVC1GR2R6eW1ZRGFWTVk1dnpVREE3WE1IZ1FHTkJhYXowTHBTSllEdFRsZjZObkpYbkVNbVRGQ1FuUng3NzhnSnFTRVpVWlFCUTlnV2d2cU8weW5FTzFrdTA5?oc=5"},
  {title:"Yinka Ilori reveals Tottenham Hotspur away shirt - Dezeen", source:"Google News", date:"03 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMigAFBVV95cUxQTWd6VFBtMktqLVNFanNrZG9wZ3AySFdGT05UbXVWbFNES1E1TWhfVGNkRUY0STY2eWpEM1FNWmFyV0dEdVpqZVY2VkQ5WXQ2YmEzVHlycXBSWmFldmlmRERfZHk1eFhJd2VzQlRfakZTQVpfUUJNbE5UREEybjEwZw?oc=5"},
  {title:"Tottenham: Gerrard says Spurs have their own Rio Ngumoha who 'crosses like Declan Rice' - Football365", source:"Google News", date:"03 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMijwFBVV95cUxOLUZUNWxQS00xdEJSQl82aUdwb1ZWNU80dGlrVmppa2sxcDlBc1A4NFlscmJvYzA4dnlIYW1yai1RZmpCSTZRWWtkMVM2ZkpWTUZlQU5UcFlhZlRyY2FFU1BPcVQ3ZkJ5M0ZpYi0wVnROclZ2QkJlbUJMNjhWTlc4NVFSQ2pHZWdyU2NmMmlwWQ?oc=5"},
  {title:"&#8216;He&#8217;s exactly the same&#8217; &#8211; Tottenham made huge Will Lankshear mistake as England call-up is questioned", source:"SpursWeb", date:"03 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/hes-exactly-the-same-tottenham-made-huge-will-lankshear-mistake-as-england-call-up-is-questioned/"},
  {title:"Spurs Nike X Yinka Ilori Away Shirt 2026/27 - Tottenham Hotspur", source:"Google News", date:"03 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMivwFBVV95cUxQQXEwc1JQWUlWcmQ1QjI2OEtyTEdmS29mY0tjUUh6amZ3VzhjXzJ3dURnbDVwOGtKaXpoUWpkVHFqaEZHU0JuVURyTk1zQ2hTQ29MWGhvTGp2TTZnWHU1c0t1Y0phaXZONTgtZUFpZW96WE9kMGk2MjFJMi1MdElGcWRpUkVyeElYNEU3ZEZWR3VOaU9lUEZHVUxZS1NLQTBuUG5lQzhuempaOUY3Y0xEOUZ0WE5CUldIeDc5bnhoVQ?oc=5"},
  {title:"Tottenham scout Brazil goalkeeper as £17m transfer obstacle emerges", source:"SpursWeb", date:"03 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-scout-brazil-goalkeeper-as-17m-transfer-obstacle-emerges/"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Tuesday, November 3 - Cartilage Free Captain", source:"Google News", date:"03 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi2AFBVV95cUxOdkdYU0kyQ1JicVhwVnRnR2NINFFkaWtGOFNaNzZzdEVwZTF4am1YbmtDX1NuM1liWUJ3SXVpWTdFQW0wRF80Z1dlaG1fOHh1alBwOWQ3RWVKLUF0Q2Z5d2dvLUZscWh2aVh1a3VUUlA4VVZlcWRncXNiVkZBNFhfSFl0c0ZsSGFHdlIwWFhFaFBvU18tOURzTFBpM1lWVERJV0wybjZqcG5DWExfX0tmOXM3RjFDNzdlMTdUSVV6emVPUzE2Zkw0eTNVdmwzV2g5RFVIc3A5SnE?oc=5"},
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
