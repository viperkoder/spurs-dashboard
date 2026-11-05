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
  {title:"Tottenham will only consider Lucas Bergvall sale under one condition as Juventus join race", source:"SpursWeb", date:"05 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-will-only-consider-lucas-bergvall-sale-under-one-condition-as-juventus-join-race/"},
  {title:"Barcelona tell Pedro Porro he has to play a key role in £60m Tottenham exit", source:"SpursWeb", date:"05 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/barcelona-tell-pedro-porro-he-has-to-play-a-key-role-in-60m-tottenham-exit/"},
  {title:"Harry Kane contract details expose Daniel Levy oversight that has backfired on Tottenham", source:"SpursWeb", date:"05 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/harry-kane-contract-details-expose-daniel-levy-oversight-that-has-backfired-on-tottenham/"},
  {title:"Maddison and Tel up for Premier League Goal of the Month - Tottenham Hotspur", source:"Google News", date:"05 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxQUTNCZEltXzViUHRVRXI4dWJzYmJGYTVnY0pmYjRsd21JVTJKaHpfcjBxREtWaS1UdnM2TjZzZHlTNjhkUlh3eGVMalpUM3h0UmRxWExiSm5xcmtucC1aeF9OVTJkRVE2OTlRQWtJR1ZXSEF5VDNUQ3Qxa3diRklkV3hycmxHTVI0OUxWcUQxVTB1ZVBkanhXLUNNTDZIOEpWVnJKNw?oc=5"},
  {title:"Tottenham star nominated for Premier League Player of the Month for October", source:"SpursWeb", date:"05 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jan-paul-van-hecke-vs-luka-vuskovic-debate-rages-on-after-player-of-the-month-nominations/"},
  {title:"Roberto De Zerbi nominated for prestigious award after Tottenham&#8217;s unbeaten October", source:"SpursWeb", date:"05 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-nominated-for-prestigious-award-after-tottenhams-unbeaten-october/"},
  {title:"Jan Paul van Hecke gives one main reason behind Tottenham&apos;s improved form", source:"football.london", date:"05 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/jan-paul-van-hecke-gives-34866785"},
  {title:"Farke press conference: Okafor &amp; Rodon injury latest ahead of Leeds vs Spurs - Yorkshire Evening Post", source:"Google News", date:"05 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMi3AFBVV95cUxNY3U0MWRLZldiNUFIcUZ1YXY3a0luWEk1aTRlbmtHX0JZeFFjVzljQUFHYXR4RjN3RTEwYm5pRTEyNm9QSi1vN19YNGpXbExEMTFYcTFSVUlLNEZjWnZyd05xS1dqdldzZ0FiZXhHcnBmTXFzcEtBSTZlZ3UxR1U2bTJqZlNiNEwtaDVDQWZvWERPTFNoZjZWVTJGd01YTEhLeDQwVWNMdW14N3dGM1o2cFluUUk3N0V2Wi00Vk43ZXU5QTlNdTlJbF9UekFKcFpXbE9tRGRZd2dSVjVS?oc=5"},
  {title:"Important Matchday Travel Update: Tottenham Hotspur (H) - Leeds United | Official Website - Leeds United", source:"Google News", date:"05 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMikgFBVV95cUxOU0Y3M05HanVrc1hLZFFJVk5DSzVubWxxVl8xVE9QcjIwaUZIY19YQjl5czV6TjFlX2J6V2NlaV94RVo1ZjlGZkhwYWROQjRRLWR6d055NTB1ZjFrSHpwcExGNXlnNnpVYnhLRHBfVFUxcXpzV2tmX2Q4OXJkTVk0NDZRamxqR3pIemZ5MDdZclRRUQ?oc=5"},
  {title:"Spurs handed double injury boost as De Zerbi set to welcome back stars - London Evening Standard", source:"Google News", date:"05 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMilAFBVV95cUxObjUxX2dpb2tmc1VaSC1oaHA5TGdtSTlEMmpoNDZxcmJoMkI0N1A2MTdKdFgyRU93OTlKNXdtSEVjREN2VU5iTUhFYmVvU2ZQWm9JdjUwejdRY01BLTY3Y3RGUmt5NWNmNjRKM1lYTzdCTWlDZnoyVzBDLS1hOXFGZEV3RmNBMnQyMXdYZmNlOVR2X0xo?oc=5"},
  {title:"Leeds vs Tottenham head-to-head record leaves De Zerbi with big Elland Road task", source:"SpursWeb", date:"05 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/leeds-vs-tottenham-head-to-head-record-leaves-de-zerbi-with-big-elland-road-task/"},
  {title:"Mohammed Kudus will have to be evaluated differently when Tottenham face Leeds - Hotspur HQ", source:"Google News", date:"05 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiswFBVV95cUxQQl8yQUk0MHl5OHo1QzNoUUxzTVFYTXd5Mkpyd0otYXptbXRudzg0R19nYmlSYzl1MjBacXgtQVRWNWQtbzdJZEdkMG5rbElGS0dlSktNQ1lwUWd4WVVlN2wxcFBPOEd5ZE1fczJEX0tJb01uUURQWEZqRkJjTm5URkRzTjJqODlpLTJRc0hQLXNjcmhiZldLaURITHRxSl9FWVktQVNVYUZfMWpSZnBTcmdZOA?oc=5"},
  {title:"Tottenham make 'initial contact' to sign Sevilla's best player but Juventus battle brews - report - TEAMtalk", source:"Google News", date:"05 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiugFBVV95cUxOZVBFNmtwdTdUanVoSVhodDFWamI4VVFUWHU4RDNZWTJGSTN0c2dIbWM2VDZtOXNpSmNRRWoyWHJFNU1Feld2UlVzbklmTVNoU3A5RUxFMjc1eHoxZGFyR2YyNVV6NlpkTzJTd0VfOEx6WGQ3UThfTzJRWWkzd2tZYU56UW0zN1J4RW9yLXp3MTNORXd0QUh6TE00R3ZNWTk1dG52eWt4b01BeGJHLVphZXJFaVlSQkU0Qnc?oc=5"},
  {title:"Tottenham will sell midfielder to Barcelona in January on one condition as chances of transfer revealed - Football365", source:"Google News", date:"05 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxQcHQwNVRpLXVhODdsUVY1Z0V2dzVicTBpUVhrMEVmUENlSF9GVTJEb0tDUlhzVkYtUEpjX3M5a295emVMTFFvZ3ZseDA0QUMwdDVtZTZfd1I5LTRVOTVOWHlydTNSNzRXMUNhbUV0TU1vRDM4QnhpSXhxVGdNSlJJV1NXRmlVYTUtNm1iMEZldzBoMjZHeTZscHVmNUg5eU0?oc=5"},
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
