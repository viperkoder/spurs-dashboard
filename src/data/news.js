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
  {title:"Man United and Tottenham lead race for bargain Dion Beljo valued at just £21m", source:"SpursWeb", date:"20 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-and-man-united-lead-race-for-bargain-dion-beljo-valued-at-just-21m/"},
  {title:"What happened in Tottenham&apos;s dressing room after win and Maddison&apos;s classy Luca Williams-Barnett moment", source:"football.london", date:"20 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-dressing-room-maddison-barnett-34790272"},
  {title:"Tottenham considering shock signing of 250-goal striker - TEAMtalk", source:"Google News", date:"20 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxPZnZubWEwdFRzLTVkOExzSFJodmhOcXY2d0w2bmFwcTJiZzN2SFF3WmVKSFBqaDFuZ09Db3F3NmQyamh3UnRmbzZIWFVMNGpuYlRGVDhOX21DNllxTFBjUXhXX19oV3c4QzN0ZExpMWZTNkpxSzlqMzNkWkRrUGg2N2FmVmp2NGxKYnYtX2oyVlBCVWlSVGV4cGw4Q19hcFI0YldQbGtJaw?oc=5"},
  {title:"Tottenham could sign goalkeeper Otavio for £60m below his release clause", source:"SpursWeb", date:"20 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-could-sign-goalkeeper-otavio-for-60m-below-his-release-clause/"},
  {title:"Roberto De Zerbi provides cryptic Tottenham injury update on three players - Football London", source:"Google News", date:"20 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMinAFBVV95cUxOY0YyMUZBZEc0UnhfemJRQVZ4WkFPcnhNZDAwdGpxY0RkLWpuN3poWEo1ZmdUZWROYUs4WDU5cG04UDg0UlNLeEJYbXk4YVRrZUFDRjgzd1V5ZVJiUEw3dDBIMmtZLWd5ejdDSWQ4SUtYa0gwZ0FFZlJHdUZoS1NCZjlabGNTTHo5Wm8zR0Q4dTlkckdXU1RZeTVPN3M?oc=5"},
  {title:"Tottenham scouts watch in-form Bundesliga striker during Mikey Moore match", source:"SpursWeb", date:"20 Oct 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/tottenham-scouts-watch-six-goal-younes-ebnoutalib-during-mikey-moore-match/"},
  {title:"Tottenham fans dismiss Mauricio Pochettino Arsenal rumours as &#8216;attention seeking&#8217;", source:"SpursWeb", date:"20 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-dismiss-mauricio-pochettino-arsenal-rumours-as-attention-seeking/"},
  {title:"Tottenham icon Jan Vertonghen set for match in different sport he refused to let teammates play", source:"football.london", date:"20 Oct 2026", tag:"Fixtures", url:"https://www.football.london/tottenham-hotspur-fc/news/jan-vertonghen-tottenham-chess-match-34788935"},
  {title:"Tottenham Hotspur: Should Omar Marmoush's second goal in win over Coventry have been disallowed? - Sky Sports", source:"Google News", date:"20 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMi1AFBVV95cUxPVkZ2dENQTHo3Wm1IZnZ5cnpaNUVBTGpXd0hudzdlRm5yUWRCYVJzNnZ4UnNNQmg5UFlRZ1dmYTRMeGhncWJrdDg5VmtncWQ3VlRlUkdQNEhkTFZnYUJKYWtzZzNRanVlUlZkYlhLalpTWDBTazhnYzJ1ZVVjOWFsUHV6bVBhdWRqcmFIUGRudWNQMXJPZGJaZFVsVDNSTXFTeUFjUUl4TlpUcE9ub0U3ZGhlNWd2bDI2TThYY1U0bVVaQzVhR0dXRFFmQ0t2YlIxX01EOQ?oc=5"},
  {title:"'Excellent!' Spurs fan praises Maddison after crucial win", source:"BBC Sport Spurs", date:"20 Oct 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/football/videos/cm0e0z9q9zj3o?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Tottenham 3-1 Coventry: Spurs earn first Premier League win of season - BBC", source:"Google News", date:"19 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTFBpbFFLemx1TUJzaFBzdUV6VDRjcE1RY1N5QklmV1FxVG0xaFlSS2FWVDl6YjJFMVJxdmEzX3dqci1xWW5kMHhaQTFtR1A5Zkk0bTBVRTQ0VWNEYU9TT2ZrYjNKTlJUZw?oc=5"},
  {title:"Maddison's magic moment for Spurs - 18 months in the making", source:"BBC Sport Spurs", date:"19 Oct 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/football/articles/cwz0v8le7y3eo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Premier League: Tottenham Hotspur 3-1 Coventry City - Roberto De Zerbi post match interview - BBC", source:"Google News", date:"19 Oct 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMiaEFVX3lxTE82TEswa0lZNE43d0I1amlyblNkRHJiSE1FV0xGdi1TVzNnbGlMZXR0Sld1YjdmeDdLSWdsejd5NjNibUNKNWtrTE0xUmtha25ENlZSalpoNVhSdUhrbWhDWE1qN1VSa0Va?oc=5"},
  {title:"Tottenham press conference LIVE - De Zerbi on Maddison, Kulusevski and new injury problems", source:"football.london", date:"19 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-press-conference-live-de-34788745"},
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
