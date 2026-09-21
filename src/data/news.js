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
  {title:"Roberto De Zerbi makes controversial decision as Tottenham squad enter international break", source:"SpursWeb", date:"21 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-hands-tottenham-stars-one-week-off-despite-five-game-winless-run/"},
  {title:"Tottenham star withdraws from international duty in order to help Roberto De Zerbi", source:"football.london", date:"21 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-star-withdraws-international-duty-34648688"},
  {title:"Three winners and three losers from Tottenham&#8217;s 3-2 defeat to Aston Villa", source:"SpursWeb", date:"21 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/three-winners-and-three-losers-from-tottenhams-2-3-to-aston-villa/"},
  {title:"Sombath receives Legacy Number - tottenhamhotspur.com", source:"Google News", date:"21 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMikgFBVV95cUxQbGVPa3VCTmpyOUp2MkdKRWd6RFRQWFJ0c2oxVGVwYkV2SUNueG5JTmxTWmhvVW15a3BVcGx2QjlzUmo0dVU1eDAzQ1dQYy1RSkhXV2VTODBzZEdxWXZXMk5UVXNEVnMxX1pCZWx5c3NOVXNKTThlNzh4dklraDdlU2dZd2I1VUpVYmNHWk5YalpZUQ?oc=5"},
  {title:"&#8216;Come back stronger&#8217; &#8211; Pedro Porro makes ominous statement on Tottenham injury", source:"SpursWeb", date:"21 Sept 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/come-back-stronger-pedro-porro-makes-ominous-statement-on-tottenham-injury/"},
  {title:"14 Tottenham players Roberto De Zerbi will be without during three-week international break", source:"SpursWeb", date:"21 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/14-tottenham-players-roberto-de-zerbi-will-be-without-during-three-week-international-break/"},
  {title:"Tottenham&apos;s final Premier League position and exact points tally predicted after horror start", source:"football.london", date:"21 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-premier-league-relegation-predicted-34647250"},
  {title:"Tottenham star rejects national team call up to focus on club fitness instead", source:"SpursWeb", date:"21 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/mohammed-kudus-rejects-ghana-call-up-to-focus-on-tottenham-fitness-instead/"},
  {title:"Tottenham reject Shabab Al Ahli bid as Richarlison faces long January wait", source:"SpursWeb", date:"21 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-reject-shabab-al-ahli-bid-as-richarlison-faces-long-january-wait/"},
  {title:"Pedro Porro breaks silence after Tottenham injury blow and official statement - Football London", source:"Google News", date:"21 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxOdmV3LWxYNWhHNkt2X09qV3h2Zklfb2ZFelZhX1pNVmp1R1JETUNVbmQ1SnpPOENFaVlWaVNSbi1wRmh0R3FyRW5VZEZvTkZpX3Yzc3Z1d3A1MW9uZmhGTWxDa0pBOHItYm16dnRSZ0xQMS1lUUNsdlp5LS1Tc2Rrc19xbGZwbUxFVmttSlZzZEdUUmNuRUZCWnVGRmstX0lC0gGmAUFVX3lxTFAzTjJpa1pMSjdSaTJqVktoUG03RVR2X3BZeGJSMWhwMlh2RnZWU3hMR21DdmhMWUFZODZ4ampQRXZYZ01EUlF0bXJiNmprQ1Yxd0F6ZkJQX0xPMVBEYkVLYVFtazdMbDBncVduTUJLdFVJRkZ5MWhuOVgtOVYweE10b29GNGNqcnRqVC1hR0NXeDNzTEYwdEFZUUJxbjZ5aG5xdndSQ2c?oc=5"},
  {title:"Tottenham injury update: Porro, Kulusevski, Mudryk latest return dates - London Evening Standard", source:"Google News", date:"21 Sept 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMixwFBVV95cUxPTVVzcUJ0QnpuUTRlUTBtclNHVU1PU3k3NGVETS1FSFVNeHg4THY5NE1DRDRKMURIeFRBUVBTcDR2LXRLWXR3WGhDSmJvWm9weHE3ZlRqcmdtZW9mT052Y2c5NFZzMlFPaXhHcVpsaWZrZTlTajViRGFyU2FMOVBIOEQwYkJ1SjFEM2h3NnZWWEcxOFpnUl9yXzMtUU5nSjVaN3JxNXA1anJzbmd5Mjh3VWhSYTdtdy1jeV9pV2VYaGRfVUNTVlo4?oc=5"},
  {title:"Tottenham get new Pedro Porro injury update as official statement issued - Football London", source:"Google News", date:"21 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxPekZDVTF5ZjJ0ajR3bzFLNC1ZeE5QblVOQ3VtWE8tbWJ2Z2ZqdVg3T3cxT0RyT05wSmxUV3Vyb2lKS2xyajlIMTZZVFJHNlE1NzVGbVBmWndhV1Y5U2dsVFQtQWVvSEFYellvbk56eVA4bTNScG9pZ1RCaWdMbG9nR3Mwb0lEcEJRYklzSlNZeGpXak56TEtXSG4xQmUyVUXSAaQBQVVfeXFMTkRXdU4zSGNtXzdac3owbE9Ua2dIN2tNQ2FueEVWWUU1TnJYNWl4NE96cTIxeXVZY056RElSU3BfYlEtNzRTTmNlOUphOWMyaFpCQjhmVUwySW0ySTA1TFh4SFFuSEw3YnFnUmctQ3YxRnpkWllWQV84NVZfVzRhNk81aDRfTGQxU1ZPdVdJWGhUZWt3UHAxNnFKQk42TXcwMWFkZGQ?oc=5"},
  {title:"Joe Cole just made a prediction that no Tottenham Hotspur fan will want to hear", source:"SpursWeb", date:"20 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/joe-cole-just-made-a-prediction-that-no-tottenham-hotspur-fan-will-want-to-hear/"},
  {title:"Chris Sutton says Tottenham need to start asking themselves one difficult question", source:"SpursWeb", date:"20 Sept 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/chris-sutton-says-tottenham-need-to-start-asking-themselves-one-difficult-question/"},
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
