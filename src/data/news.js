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
  {title:"Jermain Defoe says &#8216;best I&#8217;ve ever seen&#8217; at Tottenham used to bring his own plastic cutlery", source:"SpursWeb", date:"30 Sept 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/best-ive-ever-seen-jermain-defoe-reveals-dimitar-berbatovs-strange-habit-tottenham/"},
  {title:"Tottenham&#8217;s next five Premier League fixtures compared to Arsenal, Chelsea and Man United", source:"SpursWeb", date:"30 Sept 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/tottenhams-next-five-premier-league-fixtures-compared-to-arsenal-chelsea-and-man-united/"},
  {title:"Tottenham legend Heung-min Son reveals dream job outside of football after MCU cameo", source:"SpursWeb", date:"30 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-legend-heung-min-son-reveals-dream-job-outside-of-football-after-mcu-cameo/"},
  {title:"Man United place £90m Tottenham star at the top of 2027 transfer wish list", source:"SpursWeb", date:"30 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/man-united-place-micky-van-de-ven-at-top-of-transfer-list-but-tottenham-want-a-big-fee/"},
  {title:"Tottenham Hotspur vs. the transfer market: Part 1 - Cartilage Free Captain", source:"Google News", date:"30 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMivwFBVV95cUxQZzhVeVpXZFJEbWNxc2lGQ0R1UmFzLUZfLTF3cWEzUzdTWFB0ZXN3NjZrMG50NERJaTU1STdwU3J0NnlDSXFJdVgtb1RmQVpMX1RmU0JHeFk4d21IeHU4a2J4clhKSGVMdHFpVWx5T1c0MkhOZ09OX1ByS25PSW5JUHdCVUlNaEpjNEVlNHFxeS01MkcwQThKWXZud3huX3g3UkE0TWFtVHg1a1RXRzNEOXFfQ1JLWm0wcEI3eEN2WQ?oc=5"},
  {title:"Nine Tottenham stars doing extra training with Roberto De Zerbi as Dejan Kulusevski update emerges - football.london", source:"Google News", date:"30 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxQblJ3akV3UHo3Q0pzb2JVVzlPcnJVWUtPVnAzMzFBQ1Nyd09JNjVtZ1NwUjBZMWk1bTVOMVZhX1BLYzVXYlBBQjZYamtTbTk0X0VsbUV2dHRQR0pzd1QwVC1kMEY4TEYxS2VLNkZJak9XM2s0bHhNUWpVRU05bm9oOHhrZzRFSmxfVjdOSTZPeWJ3TG9lUmh0WHE4OWw4UGlQX3JLbWVKNA?oc=5"},
  {title:"Video: Omar Marmoush scores brace for Egypt as Tottenham prepare for Man United", source:"SpursWeb", date:"30 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/video-omar-marmoush-scores-brace-for-egypt-as-tottenham-prepare-for-man-united/"},
  {title:"Who will be next manager of Tottenham Hotspur after Roberto De Zerbi sack? - football365.com", source:"Google News", date:"30 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijgFBVV95cUxNSkxKaEt2cURPZGlXSHdzc0p0UjdpeUJpWU5FamJkZ3k4eFBfbHpqeGlQdEx3T1ZHWndkdUloOEk1SFphMDlTNW5rYlJjRDdDd3pZSXJmSW1TeTNXQjl3YWdueERuYTlLZXRyZkZFVHNWWkRXbzZXSUFJUUdkNE9EQldPSFhTM2NrSy1GRUxR?oc=5"},
  {title:"Tottenham tracking brilliant Hull City star as ENIC hatch plan to oust struggling starter - Exclusive - TEAMtalk", source:"Google News", date:"30 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirAFBVV95cUxPeHNMeGVOOUlTbzRaQ1ltWUFTdllTeXRRdDRlY2FFMXQ3YW4xaUFmeTBOR3QwNkNVOWRQZWtYc1dYZENma2kxWnFpOU5sTDdNam84bm1ONHVWMUUxVjZfeHFSdDYyVEdEZ3RhSVJhUE9ZYTBEMmpJeDBCRktpX2UzZDRDQ0FlVnlDejR4R0QyUVlYTzR3bjJtRjJVRDdLSzJTc25qLVdPMWJuNW1I?oc=5"},
  {title:"Pat Jennings says one thing drives him mad about Tottenham and Antonin Kinsky", source:"SpursWeb", date:"30 Sept 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/pat-jennings-says-one-thing-drives-him-mad-about-tottenham-and-antonin-kinsky/"},
  {title:"Tottenham Hotspur transfer rumours: Kim Min-jae - BBC", source:"Google News", date:"30 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi4gFBVV95cUxOcE8tZmJNTXNoSmYxRzctemFMV3VmQkRYX0tVeTlFUVBpQm1vSXZTaG5NeXk2ZEc3dUxfYXlYVUhNbkVlZ0JxTm1HamhrS1k2MG5KaFhqMDJ5ZlI0R1hiQmg4bElyQ3NoSnNfNW02bi1JdFhtaTJoTDdUVno0UWZzeThMOVQtVDVCd1dDQm1Ma1NlUHRSd1dSSmZaYkg3bVhnc0JCU2ZkaXprWnhPa1AweWhWOE5GOUlLenNBck1jcm9Xc2tPaDI1OV9OMzRKelVWUnpzeVc0cXRRQmRKMGtKeEFR?oc=5"},
  {title:"Tottenham transfer deadline day star admits he made a mistake in leaving", source:"football.london", date:"30 Sept 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-transfer-deadline-day-star-34692262"},
  {title:"Every Premier League table without Man City as Tottenham and Hull left gutted - Daily Express", source:"Google News", date:"30 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilAFBVV95cUxOQmFRTXhBZm9Mb3BaQWJ5d3NlR0U3UnlweUFYM2o5TW82OHBuTlFpdXdMeXAzM29SNlhmSV9UMTlJRDZhRlFFWXUyb3VselZ2ckpDbXFKX3VWb3ZjQzQ3ci00NkQ4a093NVJ5UG1aZzdONHFvQW8wMUp5RnU3a1BCb1BTbGlObS1BZU50M2RIOXZMOXNy0gGaAUFVX3lxTFBhMkZvdzc0S01TTWlDWFVRaUlra1h0S1NQUW9ib253SHo0OW0tVXp2d2FJamp6aDJXMTc1aU1GUE43UzNHSFYtOHVEUG9XWHJTak5IblVSMjdmaS1PRjNUZjh1dEZJSlVWamNyWnBzbTlyREZIMnZ3aWx0c3dwcVl3RTJQMG9DREhEY2VkQUJSemNFb29aMm5qclE?oc=5"},
  {title:"Tottenham&#8217;s biggest issue analysed: Why decision-making is stopping Spurs in their tracks", source:"SpursWeb", date:"29 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-biggest-issue-analysed-why-decision-making-is-stopping-spurs-in-their-tracks/"},
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
