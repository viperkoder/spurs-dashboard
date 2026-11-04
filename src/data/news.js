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
  {title:"Dejan Kulusevski reaches major recovery milestone but it may worry Tottenham", source:"SpursWeb", date:"04 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/dejan-kulusevski-reaches-major-recovery-milestone-but-it-may-worry-tottenham/"},
  {title:"11 players could miss Leeds vs Tottenham through injury in the Premier League on Saturday", source:"SpursWeb", date:"04 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/11-players-could-miss-leeds-vs-tottenham-through-injury-in-the-premier-league-on-saturday/"},
  {title:"Luca Williams-Barnett names Tottenham summer signing as best he&#8217;s played against", source:"SpursWeb", date:"04 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/luca-williams-barnett-names-tottenham-summer-signing-as-best-hes-played-against/"},
  {title:"Tottenham only have one choice to make with Savio - Hotspur HQ", source:"Google News", date:"04 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijAFBVV95cUxPSFhBaldnQ0RnZHRLSzktdU1nb0x3NnNvSDZ2VEtIRFVpczdxR1M3MjFuUWJEbHJrR1l0WUlUS3gtZ3Zlc3kxa0xnaFA3X2s4OVI0ZUJhZ0xFb0dDbW5sVVdiMXgzdG1UTW02QXNXenpNZVdWOTljU2pSc2JZdW5kaEl0VnpSRDZrX1RXZw?oc=5"},
  {title:"Tottenham have a star nominated for Player of the Week for third week in a row", source:"SpursWeb", date:"04 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jan-paul-van-hecke-nominated-for-player-of-the-week-after-tottenham-masterclass/"},
  {title:"Tottenham set to welcome back two players for Leeds as Roberto De Zerbi faces midfield headache", source:"football.london", date:"04 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-set-welcome-back-two-34860236"},
  {title:"Jamie O'Hara hails Spurs' turnaround - Sky Sports", source:"Google News", date:"04 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxQN1Y1ZkdQQkVGREtNWENyeDVhaXNJM3pFQUhqUXRLUFBtcTVnX0VvRGlKUURxcHVkeG5BclBCNTRrQm83RS1telc1eFk1WWhPQUJlTExfaEpHeEtNQ1lBSjhfSUFpZ09JYVNyYjNfWm5IYTJYSERuTkdSUHpSUjNUMXFTNWlxRjFCNXc0ZkJickl0WU9DT0NDckRFWFF0YUU?oc=5"},
  {title:"Tottenham&#8217;s Mathys Tel rewarded with France promotion after setting record for U21s", source:"SpursWeb", date:"04 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-mathys-tel-rewarded-with-france-promotion-after-setting-record-for-u21s/"},
  {title:"Tottenham get huge injury boost before Leeds clash as Roberto De Zerbi welcomes back £85m star - Football London", source:"Google News", date:"04 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMingFBVV95cUxPNTRiZEt0NkJuUHBBU2FsVW5qcUlVWjJhWjdtb1dsbHR4VjlkRW1zLUVQbUxGQUlOX2kyUksxVzF6REdWNnlDaVU1UVh2eU5KRFdVeWJMbFhScWhuSjBCbFh2V200eEVTU0Z6RmJXV2lNbDRkcGdBb0hqWVB1VlZleFpDU0ZkQU1CT0g2QnBSQ0VlR1hiQ3B4NmVSbGlQZ9IBowFBVV95cUxQMnhSWUJnTEhtVUR6Tms5cGlHSW15UllTd0Z2OUpKb19PLWlPbW5CdDh4Y293enNnNkdNRGl4Z0ltU09HV1dvTFFMYXFWOXB2RGUxRzhRU3dtdnhUWWE4R20xdkNYNzdRMEhNeUlfMHc5QldyTnZrV1RfSlUtcURQX2NDNE8yTWJqNlhoVWxFekNFZHYta3BzaDVNWFZmVDdRRktB?oc=5"},
  {title:"Two Tottenham stars included in Alan Shearer&#8217;s Team of the Week, they cost £150m combined", source:"SpursWeb", date:"04 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/two-tottenham-stars-included-in-alan-shearers-team-of-the-week-they-cost-150m-combined/"},
  {title:"Tottenham Hotspur injury, suspension list and return dates vs. Leeds United: Savio, Lucas Bergvall, Mykhaylo Mudryk latest - Sports Mole", source:"Google News", date:"04 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMi8gFBVV95cUxPeTZmT1lGZk9fWk1EQndOR1BURk5PeUsxc1E2b0I0N0k2Q1BTN2psbzFISHVjWWZoalNQbThmNlU2LVJqOUhDbHg1RGtqOFdMeTJxOFpIU2FXQ0N0Ukw4UkpQWm55bzM0bWIya0xWZDR1Tk1SamIycDdLbS1Ob0FsUlJ6NENic3NCSzAtODlEZ2hpU3BLR3d6S3pZVU9SNHpWQnVNNEFxeDNkOTI4aWRTRWd1YlItUHBHNzh4LXJ3ZGNBR1dTVFdpSDRXNS01YVBQWXFHX05XNFc0UlY1WEtDcFFwQWJBRXJEYlhlNUI4MFRGQQ?oc=5"},
  {title:"Data shows Tottenham midfield has jumped from 17th to fourth-best in Premier League", source:"SpursWeb", date:"04 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/numbers-suggest-tottenham-now-have-one-of-the-best-midfields-in-the-premier-league/"},
  {title:"Tottenham wonderkid Luca Williams-Barnett has been given the ultimate approval by Steven Gerrard", source:"football.london", date:"04 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-wonderkid-luca-williams-barnett-34855951"},
  {title:"Forget About Lankshear: Tottenham Already Have Next Harry Kane In Academy - GiveMeSport", source:"Google News", date:"04 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiowFBVV95cUxOMl9kRzRuNXdoZzV2ZlREeW9IZGdfMnNsbFVnQWo1X2J1THhobWM3RjdFeTlOa1F4S1AzTHBpWTZWOGJKbU14c1BTbmhlMVNibWJMb0ZvQXZBQ2tpSldiY3FXdkpzU2xoUXpIQnNxZWItb2dhcHVSNjJJVzh3UUpQWXNwMTJTQ0lOVnRmbm8xQWVrNzhJeXpsSXM2OUFWQWhnRXBn?oc=5"},
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
