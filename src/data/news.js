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
  {title:"Tottenham have two of the best U23 stars in the Premier League this season", source:"SpursWeb", date:"26 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-have-two-of-the-best-u23-stars-in-the-premier-league-this-season/"},
  {title:"Video: Mathys Tel finally nets his first goal of season but it isn&#039;t in a Tottenham shirt", source:"SpursWeb", date:"26 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/mathys-tel-finally-nets-his-first-goal-of-season-but-it-isnt-in-a-tottenham-shirt/"},
  {title:"How Lucas Bergvall fits right in at Tottenham after what he 'dared' to do in Sweden vs Romania - uk.sports.yahoo.com", source:"Google News", date:"26 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiiwFBVV95cUxQQ0I4aUExOVJMcjI1XzV5QlBhalFmXzAtWXpYZXRDV09CWmVXU0U2UTlqeG9qTDF2QVRvVVBNVGNvcnNIS1RscjdKWUwwWDVVOHM1WWJMSUQyQV9zWHpaUGZnSTF5Z09pOFdfb3pSbERuY2RucWZGYnVUT045N0xCM3poUVh1ZHQ1LTZB?oc=5"},
  {title:"Five Tottenham players with a point to prove to Roberto De Zerbi while on international duty", source:"football.london", date:"26 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/five-tottenham-players-point-prove-34666730"},
  {title:"The Tottenham XI Roberto De Zerbi must pick to beat Manchester United as four changes made - Football London", source:"Google News", date:"26 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMikgFBVV95cUxNUkVhd0Z3TUEtNFhTOE5mZ2o4ZDJRVGR3Wng3TC1hMnpwTXFBbDV3eXdaWVVQenVwYlJIN1N1Z291NlJLQllXUmxubDVFa2hzUEJFVGF6M19fbi1ObWZYNUg5N2k5XzFMQzRSNGx3ZHVJTjFzQVozQVdfaW9ZeXZuSGQ3eXg4WFNaUlc2dHBWYWUyUdIBlwFBVV95cUxOazNweEM4TTdMRy1XeXBzemVHUFNSWWZwMlJzcTQ4b3h1UTFIZzRRa1d0eDdJd1liY1V0TWdWbHJfQkVTNFdvLWpwdjNaMXg2OEVCZkNiMVVLMjVPTFU2bFVHbERmUFMtdWw5MlRHbU40SnVfdUd6cVN6MFZMRkNidURIdk1STGYyNDVNM3F5MkpYVUY5VGY0?oc=5"},
  {title:"How Manchester City&#8217;s 114 breaches may have cost Tottenham over £100m", source:"SpursWeb", date:"26 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-manchester-citys-114-breaches-may-have-cost-tottenham-over-100m/"},
  {title:"Six faulty Roberto De Zerbi decisions behind Tottenham&apos;s unthinkable situation", source:"football.london", date:"26 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-roberto-de-zerbi-crisis-34666255"},
  {title:"Will Lankshear told why he was RIGHT to leave Tottenham as club slammed for 'blocking' youth pathways - TEAMtalk", source:"Google News", date:"26 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMivwFBVV95cUxQb3djNm45SllOVzJ5ZjZLeUZESTF3LVRtN3BaWjF4QnFNQmJCTDh5b1VmR2tkeGotb0pEUXQ2cDBNTkl2NEY4NFVBMk1Pb0lIc014TmItMndFcjAzZjNWT2FTYmZmU3JjV1ZTVm5EeFMyaEtUR0s4amxiVlJyRDdXRHc4MVFTb3hFenFPWDhMN0ZXcXNrQVc5ZGlMazdsT09YYnY3UHJuYTdDblFNdk5sWWU1NW1NRVUtSzR1V1lGdw?oc=5"},
  {title:"Troy Deeney gives Tottenham players advice to avoid a big Ruben Amorim problem", source:"SpursWeb", date:"25 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-stars-urged-to-hold-meeting-without-de-zerbi-to-avoid-ruben-amorim-problem/"},
  {title:"Tim Sherwood predicts who Harry Kane will join instead of Tottenham with six years left at the top", source:"SpursWeb", date:"25 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tim-sherwood-tips-harry-kane-for-barcelona-move-over-tottenham-return-as-striker-chases-ballon-dor/"},
  {title:"Internationals | A day for young leaders - Tottenham Hotspur", source:"Google News", date:"25 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijAFBVV95cUxORTZnb2VYdkZIV0JSWThZaENWd0p2Z3lnOUtjRllzVm5ZRDZ6UTVDOHFtR3pEQk9lRm80eHRtVDgzX01wOWpjM1dLekRYSXJNMW52RjIxU0hNNTY2OE8tQ1p0V3E2MFhieTBEVVdGMFlRMkdzMHJibmNEbDRMVVNnckZWMWdNRElBcXE4dg?oc=5"},
  {title:"The numbers behind Tottenham&#8217;s biggest problem at least show a glimmer of hope", source:"SpursWeb", date:"25 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/the-numbers-behind-tottenhams-biggest-problem-at-least-show-a-glimmer-of-hope/"},
  {title:"Arsenal and Tottenham could demand millions after Man City 115 charges verdict", source:"football.london", date:"25 Sept 2026", tag:"Transfer", url:"https://www.football.london/arsenal-fc/news/arsenal-spurs-man-city-charges-34675146"},
  {title:"Tottenham backed to make &#039;smart&#039; hire to replace Roberto De Zerbi if he is sacked", source:"SpursWeb", date:"25 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-under-sack-threat-as-mauricio-pochettino-tipped-for-tottenham-return/"},
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
