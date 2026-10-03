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
  {title:"MEN: Carrick mulling over early line-up change vs Spurs as player who ‘can do it all’ poised to start for first time - LiveScore", source:"Google News", date:"03 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijwJBVV95cUxORlk0MVlSYzNOS0VzdDczNTNWWHJPNUM0OTA1TVRpckQ5amtweExhOXpqbk1aTDZpcEt2M25SbmU3VEJrRldxNWxEVGZha0xQOGdXcHFMb0t5cllDeGQ2Rk1udjczazJKUXgwSFEwUUd5eFl4RzJCNlBua1lQUjlmYXVwRW9TVDMyYmgzTzlXSE04ZUdLODBCZC1veE1LUVpDc1B4WkI3ajB3ZjM3dTFaQmFMblZIZ1R1R0pWQWxpcmJNSGlJREdhOERVOFYtYVQ4eE5TQllXSnA5UnhqN25iY1B1cS1lc0l6NnExVmoxQTVzVkZVWTlkTFFEOEpobV9zcUQ0RmdRMkQxOFJsbDEw?oc=5"},
  {title:"Watch as Tottenham&#8217;s Radu Dragusin sees red for harsh Lewandowski moment", source:"SpursWeb", date:"03 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/watch-as-tottenhams-radu-dragusin-sees-red-for-silly-lewandowski-moment/"},
  {title:"Gray captains England to Under-21 Euros - Tottenham Hotspur", source:"Google News", date:"03 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilwFBVV95cUxOc0hDSWFRUnFNaDZiRFhNTzcyR0cyeWlfRV9rR1RRcWRpdU53RkRMdjhEUGtIbEx1X0swZjN0TXdJSk1ONnhadGJnd1lJOHZiX3JvRWdZMFNPanQtLUZGb0hNdVdabVBCR19xMTZYWGlRWm0wbTdiX2dRV21aal9lZjgwQ2o4OWlpaXZNbWFOclpnRXoxWEtv?oc=5"},
  {title:"Heung-min Son just recommended &#039;ideal&#039; goalscorer for Tottenham to sign", source:"SpursWeb", date:"03 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/heung-min-son-just-told-tottenham-to-sign-12m-oh-hyeon-gyu-as-idea-tactical-fit/"},
  {title:"Man Utd get £70m injury boost ahead of Tottenham as behind-closed-doors friendly result confirmed", source:"football.london", date:"03 Oct 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/man-utd-70m-injury-boost-34711113"},
  {title:"Tottenham star suffers nightmare 22 minutes as Roberto De Zerbi summer decision vindicated", source:"football.london", date:"03 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-transfers-dragusin-nations-league-34711018"},
  {title:"Six Tottenham legends who deserve a statue after major update on club plans", source:"SpursWeb", date:"03 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/six-tottenham-legends-who-deserve-a-statue-after-major-update-on-club-plans/"},
  {title:"Tottenham could receive huge boost as Yang Min-hyeok prepares for Asian Games final", source:"SpursWeb", date:"03 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/why-the-upcoming-final-could-have-a-huge-impact-on-yang-min-hyeoks-career-at-tottenham/"},
  {title:"Tottenham Must Seal Deal for 'Amazing' Star in 2027 With Transfer Guaranteed - GiveMeSport", source:"Google News", date:"03 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMihwFBVV95cUxNUjJkUXk5NllvdkJoU1d5UDYwMFNWRlpkT0d0bHBSX1RnZXRpd0JBbmlsdFdEcW5wOEN5VkJUZWRUc19YbVZvandiczZHS3dzYnpyN3FoLUxKRV9aeUpMTWVmV1ktaEc5ZVF3aWhzcGRIV2dZenR1Y2R0VXJ0cEFxTXlyWGlHa00?oc=5"},
  {title:"Tottenham Will Regret Selling 'Special' Star Who Wanted to Return In Summer - GiveMeSport", source:"Google News", date:"03 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiiAFBVV95cUxOejZyUmFBSjROOHRUUmMyMDdidkpUX2ZfaEhJS3pwY3VVN2JOR2lFR0dDS3VCb0VSNTVOUjB0WWN0WUotdHM2RGJLLXRyRVd0MVdkWVlqR21UcTg2NHJYWVNMRHBjdURBaHJGd1RsaWlFVV9WVGJ0RjJJblV5eXNOOUEtX0lyVTlv?oc=5"},
  {title:"Van Hecke, Porro, Kulusevski, Mudryk and Xavi - Tottenham injury updates and return dates", source:"football.london", date:"03 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/van-hecke-porro-kulusevski-mudryk-34707438"},
  {title:"I had to beg to leave Tottenham – the manager didn&apos;t want to hear at first", source:"football.london", date:"03 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hotspur-transfer-manchester-city-34702052"},
  {title:"Tottenham played dirty when I wanted to leave for bigger club – I was so disappointed", source:"football.london", date:"03 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-played-dirty-wanted-leave-34697064"},
  {title:"Three Man City players Tottenham should target if they are punished, including Erling Haaland", source:"SpursWeb", date:"02 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/three-man-city-players-tottenham-should-target-if-they-are-punished-including-erling-haaland/"},
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
