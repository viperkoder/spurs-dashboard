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
  {title:"Tottenham fans spot a cheeky COYS detail in Declan Rice&#8217;s latest photoshoot", source:"SpursWeb", date:"14 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-spot-a-cheeky-coys-detail-in-declan-rices-latest-photoshoot/"},
  {title:"Tottenham Hotspur vs Everton: Women's Super League stats &amp; head-to-head - BBC", source:"Google News", date:"14 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE9DRmJGLTNGMW1OVlB0b09GOXJNZ3pKeTFKeEVwYmd0ZnlaLWlvcXh4ak01NTJ2UXJTQUdQV1VtR3VEaVZPYm1WS3dZVG1ZTDM3U0lXR1NSemNMc0VyellaZ2loaTJoUQ?oc=5"},
  {title:"Tottenham slip even further down the Global Power Rankings after Leeds defeat", source:"SpursWeb", date:"14 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-slip-even-further-down-the-global-power-rankings-after-leeds-defeat/"},
  {title:"Where is Son Heung-min? Lionel Messi record, Tottenham return, Mauricio Pochettino relationship", source:"football.london", date:"14 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/son-heung-min-lionel-messi-34894731"},
  {title:"Teddy Sheringham says Tottenham failed to make a point with Elliot Anderson transfer", source:"SpursWeb", date:"14 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/teddy-sheringham-says-tottenham-failed-to-make-a-point-with-elliot-anderson-transfer/"},
  {title:"Tottenham Hotspur players who left in the summer and where they are now - Planet Football", source:"Google News", date:"14 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxNeW9ic0Q0TUxmOHZSMUdsWWJoTkl4OUV3b21qTlBvZjYwMExKQ0hDUDFQN1pmdGQwSkl4YWVYU09hbzg0LVZnUzQxcU5tV0M4eVZvSE9JRDc1NmJVNWxxVVFxMzUtVEs0VnY2dFI4d1ZqY2hRQ1V6X1llOTY0Y2NNOVVqa2Q4eFQ3U3dDejZ6dU54OFNSZUhsLVdmN1hTQ2RzNVdqdg?oc=5"},
  {title:"Jamie O&#8217;Hara names the secret behind Tottenham&#8217;s potential revival this season", source:"SpursWeb", date:"14 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jamie-ohara-names-the-secret-behind-tottenhams-potential-revival-this-season/"},
  {title:"Former Liverpool star makes brutal £185m Tottenham point Roberto De Zerbi will disagree with", source:"football.london", date:"14 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/former-liverpool-star-makes-brutal-34896004"},
  {title:"Jamie O’Hara names the secret behind Tottenham’s potential revival this season - Spurs Web", source:"Google News", date:"14 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxPWHcyeXpmRjhmeWZwTXVNSmhyemlvZ09iR0FGRkE2QnQ5RTlmd3pQSXBibXVPMUpqbmg2SUlXUVNNVjVabm9VSVlfSjR6VjlJTmVpRU5leEp6Tl9QbkswUExfRVBLdWVzc2YxRVpPRlFjU291akxCcGdralpEMjVWRWV2ZElqY0R2dlRpUENseHNxYlIxd1Z3cjFvYUNOWG1zOUFTd004c2hGRnhhYnBxam02SUU?oc=5"},
  {title:"&#8216;Favourite things about London&#8217; &#8211; Even Beyoncé loves the Tottenham High Road journey from Seven Sisters", source:"SpursWeb", date:"14 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/favourite-things-about-london-even-beyonce-loves-the-tottenham-high-road-journey-from-seven-sisters/"},
  {title:"'Favourite things about London' - Even Beyoncé loves the Tottenham High Road journey from Seven Sisters - Spurs Web", source:"Google News", date:"14 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMi0wFBVV95cUxPaU5NbnVGcG96RU1DaTZmYVZVRF9PeWE2bjBhY2dLUVp4VzY0ZVBoZV9mMnY5by1Oc21VaXpqd1pvVjVzUFA1aDFBRFRvZG5DWmNGWEFoZldwYkxNZFZwY3VoY1RyaDdqTFdBQm1hTGlmYjhKYV9TUE5fZENOcTh1cGtydWp5akswcW1rUkVwZHNEbTYycVRiMGF4eGtKRi00LVZIRjJBNVFNcVFLLUNDUWVHWGdFYlVkMzdTaTVvbVRmc09JdEY3OWNkelBUQ093TXJj?oc=5"},
  {title:"The one player Tottenham rely on far too much as Roberto De Zerbi urged to fix big problem", source:"football.london", date:"14 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/one-player-tottenham-rely-far-34891873"},
  {title:"Johan Lange gets Tottenham transfer instruction as Arsenal star backed to unlock Dominic Solanke - Football London", source:"Google News", date:"14 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxOWF9ETGpkNkFVd2M4ZmFLSjljb3JKaXZHbEZySXpNa1IzRHlVWlJtRnRLUF9UeHJJNHBfcHlqUVdCYl9tRXhHTmhQQmlXX0lCeVJsQTNYTnEtN0locUUydTRzZzdWUkVWaEFhN1ROVXZOUUtEUmIzbTloTzIyc3lIY1VoM3RnbmhNUnRDWUJNeVFJUWxxSXBpNlh3ZjQxR3fSAaQBQVVfeXFMUDFudEEtMmNHLWgwS3o3dXVtNFg0djM4RVRGXzJ1Y2c4NW1sWlEwZC1yaW9HSW1mMGtsWmwxei15V2Y4SzdzYy1DQmlZRFlFYWxZcURYNUhiVVVCVG0wSVA3MVE5ODhXQlg3OTRJRmRFeTZTVVU2d010SXplRFg5X2EwTlZHUXdzY1Vkam5jMU1kU2dfMmFIM1VfTjlrVzRiUE5Ybjg?oc=5"},
  {title:"Internationals | Marmoush scores, big night for defenders - Tottenham Hotspur", source:"Google News", date:"13 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiogFBVV95cUxQaWNJWEpDNXVYZzFLdlRKcm1uLXZvSGllTUpWWXlVV015eHFMcFBqQ0V1WGtlRjg3QjdXWlAtaEVKS2hYdDZ5VFNSWm5CZk9XZUszYWpIS3VtdDJKY1dYQmlpejJITTdDSk9aSndFaEFLcG5tb21XVS1pVmpWb0JMc09DV1hObXdJUS1zWndGTElDMkVkQjI3eFRZcEQtczI4OGc?oc=5"},
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
