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
  {title:"Tottenham news: Can James Maddison 'connect everything together' for Spurs? - BBC", source:"Google News", date:"16 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMi8gFBVV95cUxNeDRmclNiOWZLdmYzWnQ2UFp4TjMwRDlzclF5UUxvdXIzdUNnXzlRemtDalVfVUhFeVYtajFtczNPSnlzYTR6RHM2a1NFSF9GVkR5ZlRUQURFR2lwVVVmbi0tbkgtRFpDU3lUV2EyTUZILWxPckNIVmlBb3haZjNNdHFUeHQ3YlUyazRSc2ZqXzR1alVONFBOYkZGWTYwS0sxSHJHdnZEUTQteXIzSFZQakFzU1QwekNNbGVmV1FUVVhWNWluNXk4aXh2TzMwMU9IZ3pxQXdBbmEzd2xScFpzaHJkcHNqaWxyNzQxbVZkUld3dw?oc=5"},
  {title:"Tottenham climb in global power rankings despite Premier League struggles", source:"SpursWeb", date:"16 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-climb-to-23rd-in-global-power-rankings-despite-premier-league-struggles/"},
  {title:"Tottenham set world record Pedro Porro asking price as Barcelona and Real Madrid plot 2027 swoop", source:"SpursWeb", date:"16 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-set-75m-pedro-porro-asking-price-as-barcelona-and-real-madrid-plot-2027-swoop/"},
  {title:"Tottenham Hotspur's first Black XI (Olivia's Version) - Tottenham Hotspur", source:"Google News", date:"16 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxNSlo0NlhCSUJGYUx2Z0l0WER5c1FXQXVwTjMzbjlXUGhiRmVSVlgzSDhURVhtSkRqT041RGE0QklPMS1Ec24tanNUX3B6UEJUd3RtYTE0aV8xVEQtN0VYME9jY0JSeTh0cl9MMGUyZGhSLVRlZnZzS3AyY2xXbVNLRE1uTFNOMFZpNDVCSE1RelV2VkxWZGtNV3R4TkplZzFkUWc4WEVGOA?oc=5"},
  {title:"Alan Shearer has made Tottenham prediction no fan wants to hear - Hotspur HQ", source:"Google News", date:"16 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiiAFBVV95cUxOVkJRZ3ByaDZKTWswbmljZklUd014aW04N3dqdWVWOEFSMXZaRmNuMVdtZlJRazdiaG10b2V6VzEyRHdPcTlZcGJmMlVVd05reURjS0tKVkR1ZFF5amJ5WGJLeTdQUmktR1kySkVSMktGWTRBb3ZRTkJySW5XcVRMTUF3TUZBREV4?oc=5"},
  {title:"Five places Tottenham could send Luca Williams-Barnett on loan in January", source:"SpursWeb", date:"16 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-places-tottenham-could-send-luca-williams-barnett-on-loan-in-january/"},
  {title:"Tottenham Hotspur injury, suspension list and return dates vs. Coventry: Pedro Porro, Dejan Kulusevski latest - Sports Mole", source:"Google News", date:"16 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMi7wFBVV95cUxQVS0yUE5TaFZQNHRTVTlhUXZ3dEFLWlhFb3dQU1BZY19rVXMtTzBzQ2tKOG1Sc1BUSk5QSmgwRE5WOWowX2QyS3RNa3JRci1QMXphTkFEeHZMd29IbFl5VzhMS1NUZlJuZ0xsVHJsYzVaRXBxTnpDcUJuQ3hvU28tbXdBZmtWLUVrSVhNNm9EWTBVUDRrMk40QVREY1Rqakp5cllxXzl1YzNGaEhxZWwwZWFSclpBNmxOX0lWajFCUjg5R09vR1Nnc0w2X3huRHZ3VlFIdF8tc19Lc19xb0tTNVJka3NBUzliTEp5UzBKdw?oc=5"},
  {title:"Mateus Fernandes&apos; Tottenham absence explained ahead of Marbella training camp", source:"football.london", date:"16 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/mateus-fernandes-tottenham-absence-explained-34772354"},
  {title:"Full match | Arsenal v Tottenham Hotspur | 2018/19 - Arsenal.com", source:"Google News", date:"15 Oct 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMiX0FVX3lxTFBIbjJMZlhSRTkza2ZrVjl2UTJCRFFSdnNmSW5Jb0FoUFFRSmNTOFRLRmV4ajE3bEJFV0NOajNNYklhQ0JkRXlDanhYaEVOcDBGbVJPcTJQS050YnNJUkJR?oc=5"},
  {title:"Tottenham XI vs Coventry: Confirmed team news, predicted lineup and injury latest for Premier League - London Evening Standard", source:"Google News", date:"15 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiywFBVV95cUxOLXJ2Y2Zkb0x5TXJMVkFxYk9QYWc0ZW9aemZiRmRCMm1tQV9KUHZyUHh1MHZlR3p6ZU1TTXFlQ1EyUk03OXk4elduNFh4OEM3TjVkVG9hcXBVS2NpQldnSy0zTUE3MXJnVDlZX3JqaWlVc1I2c0JYM21lWWlzX0hGVkc1YXRvUS1yTmxyTU5ZQkJBbEJocG1jcE5xNGVhSXVFOXhkTDIwZGVUSFBiMWQwOGt6UC1TZ3g5SE1HUkZwTnJYRjN1WW9SMjhqZw?oc=5"},
  {title:"Tottenham disaster is forgotten as three Premier League clubs race for Thomas Frank", source:"SpursWeb", date:"15 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-disaster-is-forgotten-as-three-premier-league-clubs-race-for-thomas-frank/"},
  {title:"Every Tottenham top scorer from 10 years of Premier League shows a worrying decline", source:"SpursWeb", date:"15 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/every-tottenham-top-scorer-from-10-years-of-premier-league-shows-a-worrying-decline/"},
  {title:"Micky van de Ven&#8217;s latest Omar Marmoush claim may surprise Tottenham fans", source:"SpursWeb", date:"15 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/micky-van-de-vens-latest-omar-marmoush-claim-may-surprise-tottenham-fans/"},
  {title:"Tottenham need a win but the stats show Coventry are a historical bogey team", source:"SpursWeb", date:"15 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-need-a-win-but-the-stats-show-coventry-are-a-historical-bogey-team/"},
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
