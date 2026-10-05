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
  {title:"Tottenham could &#8216;drift into a Chelsea-type situation&#8217; if new sponsor is not revealed soon", source:"SpursWeb", date:"05 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-could-drift-into-a-chelsea-type-situation-if-new-sponsor-is-not-revealed-soon/"},
  {title:"NFL star discovers the &apos;coolest thing&apos; about the Tottenham Hotspur Stadium", source:"football.london", date:"05 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/nfl-star-discovers-coolest-thing-34718721"},
  {title:"What Bayern Munich are thinking as Tottenham chase £30m Kim Min-jae transfer", source:"SpursWeb", date:"05 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/bayern-munich-unlikely-to-buckle-to-30m-tottenham-bid-in-kim-min-jae-january-race/"},
  {title:"Tottenham winger releases apology after controversial comments cause anger - Football London", source:"Google News", date:"05 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxNcGtNTVE4cExVZjdWN2RJVmJiNkJLVmllM203bG5lYmpJWVJyRUlTVkxha2lUS0ZTUDMwR0hxVW5HQXRydzloTXRFOXJacjZpV3ZoaUV1MjFKcEE3ekp1czlEVXJmY01kUU5wWlRmWGpOa01GcVlqV1Q2OUgzQ1J1TmtobDFqSGJYTXFxUXZTUklqSEl5YTNWT0NCUkg3QTJBVkQ3UtIBqgFBVV95cUxOejRHNzA5T0oyUnphWXB4OWRiSjlYd2w0Y3UtYzJHVkhQZ3AxNGIzYUszTE1JakFwaFlnWC1nYkVsNGZBM1ZuN2cwUXluRjRSOFZWU2lYaU9sVkhGaktZXzhvbnlBcVVPVzN2RXFGQzFYNWFPWXdTVG02ZG91Rl9wMy1GTGpUTlFLbHh5M3puc1pBbFFlSU9LWmVCZ3N4WmpvZUFWSjVheUNFQQ?oc=5"},
  {title:"Tottenham injury update: Potential return dates for Van de Ven, Van Hecke, Pedro Porro", source:"SpursWeb", date:"05 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-injury-update-potential-return-dates-for-van-de-ven-van-hecke-pedro-porro/"},
  {title:"Worry for Tottenham as Omar Marmoush rated worst player on the pitch for Egypt", source:"SpursWeb", date:"05 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/worry-for-tottenham-as-omar-marmoush-rated-worst-player-on-the-pitch-for-egypt/"},
  {title:"&#8216;De Zerbi doesn&#8217;t have the credentials to turn things around at Tottenham&#8217; &#8211; Charlie Austin", source:"SpursWeb", date:"05 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/de-zerbi-doesnt-have-the-credentials-to-turn-things-around-at-tottenham-charlie-austin/"},
  {title:"Tottenham captain Micky van de Ven breaks silence with six-word message after injury scare", source:"football.london", date:"05 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/players/micky-van-de-ven-injury-34717996"},
  {title:"Tottenham suffer new Micky van de Ven injury blow in bizarre accident - Football London", source:"Google News", date:"05 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMilgFBVV95cUxQSC1tcUVGb0ZSOV9HbkdUSTVpSXVNdGtMRjhxNVo0cmRaWHRkU1RpRENmRFZvLThnYTg1NjZwdWg3NnpIWk5jajNZdmVpNGdEQkdjQzFGa1RWcElDN2RXTmF2cmlOWVBoQVV4NWVibjl2MWktX2MydTkxOUcwemRMQ0VIV3U3OUx6Z2V5dTZhYjJSWWRrekHSAZsBQVVfeXFMT2RKV2NjRWdhcFdkZVpITzNGUi1DUWptNUlNWW5TRzFqc0VBYUltc011bGFKejlJT013bXdpMnVyNjlmOVhrU1VqemozVUZUYXB3dFQzS2NwUjJha3lrVmQ0UGVIa0tqT3hsVFJadTNTbktKckx5OTZOOFJlWUlVTEFHbGZQTkJpak9xNXEyWC1EQmxYZDlNWEdrd2c?oc=5"},
  {title:"When Tottenham&#8217;s 15 internationals return to Hotspur Way for training", source:"SpursWeb", date:"05 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/when-tottenhams-15-internationals-return-to-hotspur-way-for-training/"},
  {title:"Tottenham legend explains important thing injured Micky van de Ven brings as captain", source:"football.london", date:"05 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-legend-explains-important-thing-34717620"},
  {title:"John Terry confirmed for Chelsea FC Legends vs Tottenham Hotspur Legends as ticket sales commence - Chelsea", source:"Google News", date:"05 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxQR0ZEZS1lSkUzNk1yTVJaMXQ1WDQ0VWczMERPcFlZcjl5dFc0aXllc0FMQWtxdnpjSHctM0lQaXJLeS1rekJoSHpxMEl5Zm1fbTBXZ09PWXRqMzNwQUd1eXBNbnItRm5EV0NQVXZkUVNrZnlYWFVRT0tUV1hQQ05LU3FteXlfYmhsVExCcG5DZjhOVnZSancxcC16TndSTE5XdEN0SU1PdFF4LVFoamtubkdjRi0?oc=5"},
  {title:"Micky van de Ven reaches decision on leaving Tottenham to join Man Utd in January - Football365", source:"Google News", date:"05 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMixAFBVV95cUxNN2lpdHAxVDBnakRKQUpjaUh0N05weTR0b2lPdGM2SGxMaXhjcFdIcGI0UDZDYUxzSXozQUZRSXdJX3BVMUxtQjBoTU5vcHUxd1Fib25CejBmaWt1OHc3cFhQajV6YWFoWUE0T3FOWjFkcnctbnNuRG5UcjRPWmZyd1V0YTc3dHl6M3RJTWZPNF9menlHbEtRVU5wRG8tWlpaYUVsN0JQVXZLWEZQU1c4S2RCRXB6bGRlSGsxR21PSmM5c0pC?oc=5"},
  {title:"How Tottenham could line up vs Man United if Van de Ven and Van Hecke miss out", source:"SpursWeb", date:"05 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-tottenham-could-line-up-vs-man-united-if-van-de-ven-and-van-hecke-miss-out/"},
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
