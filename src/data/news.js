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
  {title:"Tottenham Hotspur could offer joint-top scorer a new contract for next season", source:"SpursWeb", date:"25 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-could-extend-ben-davies-contract-to-take-his-n17-stay-beyond-12-years/"},
  {title:"Highlights: Tottenham Hotspur 1-2 Arsenal Women - Arsenal.com", source:"Google News", date:"25 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiX0FVX3lxTE5FRjlweWozYnhBMVpLSkVCOEhraE4xQ0ZkeFR6S3hyYzl0ZXV4SHh6Y0NZUmJpSmFYWjJBYW0zSndUdEx1cWEzNzM0emZOX1BHeS1NV2FKUllHUjN6OWZJ?oc=5"},
  {title:"Tottenham press conference LIVE - De Zerbi on Fernandes, Tel and Maddison injury", source:"football.london", date:"25 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-press-conference-live-de-34813578"},
  {title:"Arsenal enter race for £70m Tottenham target as January transfer battle emerges", source:"SpursWeb", date:"25 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/arsenal-enter-race-for-70m-tottenham-target-as-january-transfer-battle-emerges/"},
  {title:"'That is how De Zerbi wants to play' - Spurs fan on Chelsea win", source:"BBC Sport Spurs", date:"24 Oct 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/football/videos/c53984nzwkn8o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"The candid meeting that 'changed' Spurs - are they finally on way back?", source:"BBC Sport Spurs", date:"24 Oct 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/football/articles/cqev38dz34vxo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Tottenham Hotspur: Are Roberto de Zerbi's side finally on their way back after win at Chelsea? - BBC", source:"Google News", date:"24 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiaEFVX3lxTFBoN0VvNDAzc0p5ZXFNeEtLY2dtWVEzYnQxZ3pwWGNVX3hNdXZ2RDgwWFRoTnh0X1dDa3pVM1NXMk82UEdiVXFWRjRJMzFRN25sSHRTQURRM1Vpa3RXZjZXVzhlWnhJNVlr?oc=5"},
  {title:"Chelsea 0-2 Tottenham: Cole Palmer is sent off as Spurs stun Stamford Bridge - BBC", source:"Google News", date:"24 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE93TG1zclY4dVZjclktUWJWRmh6bHpCY2E4RWVmODJmUU5qTThQdXBzMmVBQks3WGRLdkhBODRZN0RZOG5ZUldsdmJNWEM1OWl3RWh4M2xhdFU5T2ZSVkpFajVwNXJmQQ?oc=5"},
  {title:"Four winners and one unlucky loser from Tottenham&#8217;s historic 2-0 win over Chelsea", source:"SpursWeb", date:"24 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/four-winners-and-one-unlucky-loser-from-tottenhams-historic-2-0-win-over-chelsea/"},
  {title:"Every word Roberto De Zerbi said on special Tottenham meeting, Maddison injury, Fernandes and Tel", source:"football.london", date:"24 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/every-word-roberto-de-zerbi-34813712"},
  {title:"Chelsea 0-2 Tottenham Match Report: Spurs finally break eight-year Stamford Bridge curse", source:"SpursWeb", date:"24 Oct 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-match-reports/chelsea-0-2-tottenham-match-report-spurs-finally-break-eight-year-stamford-bridge-curse/"},
  {title:"Five things we learned as Tottenham finally beat Chelsea 2-0 at Stamford Bridge", source:"SpursWeb", date:"24 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-things-we-learned-as-tottenham-finally-beat-chelsea-2-0-at-stamford-bridge/"},
  {title:"Roberto De Zerbi gives update on James Maddison after fresh Tottenham injury blow", source:"football.london", date:"24 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/de-zerbi-maddison-injury-update-34813528"},
  {title:"Premier League: Chelsea 0-2 Tottenham Hotspur - Roberto De Zerbi post-match interview - BBC", source:"Google News", date:"24 Oct 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMiaEFVX3lxTE1QNGp3WmtfS3NwTVlma0x0M01RaUZNQ2VwSnNkNy1TSTFoOVhaSFg1Tk5ZaGVvTGdoMlJ4NmRpNm1uUkdiUm4ySjBrR3NkVHFIMTBUeGJKdTA2UzFrLURya001QWNuOEhv?oc=5"},
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
