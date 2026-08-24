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
  {title:"Tottenham transfer news LIVE: Omar Marmoush agreement reached, Cody Gakpo boost, £30m exit", source:"football.london", date:"24 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-transfer-news-live-omar-34505963"},
  {title:"Tottenham transfer news: Omar Marmoush agreement, new Cody Gakpo bid, £140m double deal", source:"football.london", date:"24 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-transfer-news-live-new-34503083"},
  {title:"Cody Gakpo will cost Tottenham an extra £10m after Liverpool latest - Yahoo Sports UK", source:"Google News", date:"24 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMihgFBVV95cUxQX3VzMmk4UWRIU0Jqd21aVWxNQjZkcVJBa0xqZWpzRVV1WjVlUi1mR2RhbUJEbTc1U1c4QjBlcC1CTGtDLS1tRzBHWUhQWkJJMVdfUnV0SnNkVWV2X1o3WlFFdG5wRldYMDRNZ1AySlYyUjh0bVNEWXJBZ0hEM2hZRk1ZX1R1UQ?oc=5"},
  {title:"Transfer news LIVE: Palace prepare £50m Bowen bid, Marmoush to join Tottenham - The Sun", source:"Google News", date:"24 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxQS0Q4VDlvbkdCa3hIV3hreG1rYllfenV4QVBTV25SOXFUdU9vN3htczBzQ3BkRWFtWDAzX05SRmcwajdNTkc0RVRaMnBqQ2tQNzhGUi1Vb0tNNG05MlUwSDJNT1BqdG5mS3VNSFlSN0lBRFFoc2Qxa0hycUxSaU9XRFhkc0ZjcDhWLXZOMjMyWDJmanlmU0dMcGE5V05kVmc?oc=5"},
  {title:"Tottenham close in on double transfer as medicals booked - London Evening Standard", source:"Google News", date:"24 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxNNlI4Mm5pOTN0NzZuM3R5bFdaR25jdXlmcENpMHhZTUtsOW1HeU1LUUpCU3Z4X1o5V2tWbVRyeGkxNm52NjlMQkNaSHgtcWFnYThQSzdla0lxeUhBTW5TQnlmYmxjdmJZZUNJR041cm9jalpyTUpwbEtSYjVybjkxUVl2eTAtbWhhNjBCNDlYcnB1TncxYmdaUnNNNGRoTVNvaFVQR29QTQ?oc=5"},
  {title:"7 transfers Tottenham can complete this week as attacking trio join in £221m splurge", source:"football.london", date:"24 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/7-transfers-tottenham-can-complete-34503647"},
  {title:"Are Tottenham really weaker after spending more than £200m this summer?", source:"SpursWeb", date:"23 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/are-tottenham-really-weaker-after-spending-more-than-200m-this-summer/"},
  {title:"Tottenham agree £50m transfer with medical set as stunning double deal moves closer", source:"football.london", date:"23 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-transfer-omar-marmoush-savinho-34505616"},
  {title:"Tottenham told they may have found their very own Sir Alex due to &#8216;permanent anger&#8217;", source:"SpursWeb", date:"23 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-told-they-may-have-found-their-very-own-sir-alex-due-to-permanent-anger/"},
  {title:"Tottenham Hotspur Are In The Running To Land This Chelsea Striker: What Will He Add To De Zerbi's Side? - The 4th Official", source:"Google News", date:"23 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiowFBVV95cUxPZWdHOXVKaHo1MjY5YW5PV2FnWThBaW5LSzk0eFIyN0hhbFpHV1V0cnF0YTU2a1JBWVdBcE05RURWT0NTa1hmS2Z1R0trRUlsUkt5N2o4dTluRHF4UlgwTVZYQVdRU2lremE3dVlobExiUUFPNDM5SkwyNkZ0SzBxaUw1V2R4dlFlMjhESk5zMzA1VjFiNHZHeUFSNkloMWdsOTVj?oc=5"},
  {title:"Tottenham warned they just sold a future £100m star for one fifth the price", source:"SpursWeb", date:"23 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-warned-they-just-sold-a-future-100m-star-for-one-fifth-the-price/"},
  {title:"Cody Gakpo sends Tottenham perfect message after Liverpool transfer update - Football London", source:"Google News", date:"23 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMirgFBVV95cUxNc0pGSDNKUXBjdFlpaUVMckdncGQ4R1lqT25GVlJ4a0hMZEg5dGdTMmcxYjlZVTBLVEtfMnN3VHF3T2x2OHlIVnVPaXI2MmFPN3RncFJTU0ZiZGpYamZHOFFNSGNiRDVUdmJIODhGS2JGSnBKTTJIcGU3VGNRU3VPUDRYUjBzSXFsTzJ4bWRzNWtGU2dIN3VQZEQ1NERVR2lwSmJYSlNyTVJCQUtYSkHSAbMBQVVfeXFMUHR2R015cUdyeUEzTXY4RjlXNUFybW8tY0luR0MzQWhLX0x3TWtsRnQxZXBIRS1neHFMTWx6Yl83cm9NZHZBNEFadFl0bUR5TmhqQmdFS2I1RzZEQkUxWG95OXZNMUdjdDd5NlFnZXRnR0J1UXZLYlcxd1VsUzNTWjdsa1FfNnhRTXpCR0ZaLVlhU1Q1bDg5Y2lYUHVoMWZEeVN2cWVZTU9nMGc4N0tGWDVMLTg?oc=5"},
  {title:"Tottenham insider predicts there is a secret clause in Roberto De Zerbi&#8217;s contract", source:"SpursWeb", date:"23 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-insider-predicts-there-is-a-secret-clause-in-roberto-de-zerbis-contract/"},
  {title:"Man United lead Tottenham and Newcastle in race for £42.8m Bundesliga winner", source:"SpursWeb", date:"23 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/man-united-lead-tottenham-and-newcastle-in-race-for-42-8m-bundesliga-winner/"},
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
