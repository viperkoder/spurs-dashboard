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
  {title:"Juventus good relationship with Tottenham could help them sign defender - Yahoo Sports", source:"Google News", date:"15 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMilgFBVV95cUxNZFFzR2pLUzdqcWdQeFhCYms5X0hob0lxR0E3dll2WTRNLXVlQlFRZDJIcHk3V3NySW1rYk41UThWVmZNYUdIQnFBY0ZQR1JxZ0xrVDFSVWkzMVhISHFYZkV0TVRmQXBac2g1UnZ6UGlQVWQ2T0VUTUxjaG55czlPRnBNd0FPSjVOWEtYX1NFZ21KOFNobXc?oc=5"},
  {title:"Savio is being unfairly lumped with the rest of Tottenham's problems - LiveScore", source:"Google News", date:"15 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMi0wFBVV95cUxNMlNXWVA3VHc5NmhxdFRPZUNzLWE2SDBsdUM1dUpPNno3a095U0Jnd0VvaTgwekc4MkJfN2xUME9xNmctZEtERndUYTRLMTFLV2RMX1RiREhRdHFEclpkV0tHNHoxSmE2ZG9sSjAzS2JnVFh3TkdxZXc0WE13V1N2SWdpSnhYcFpZanFnbUFoNk81OWpFdTdVZjdqby1uaVFDV014aE5VeDNkcTQzMlJlb0YzWGNWQ2RldlBBZkxibnpjY3c3a1AzMWpUSC1kLXhFc3lF?oc=5"},
  {title:"Video: Omar Marmoush scores for Egypt and Tottenham will be thrilled with 8.5/10 rating", source:"SpursWeb", date:"15 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/omar-marmoush-scores-for-egypt-and-tottenham-will-be-thrilled-with-8-5-10-rating/"},
  {title:"Tottenham legend gives Luca Williams-Barnett glowing verdict but Roberto De Zerbi has a problem", source:"football.london", date:"15 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-legend-gives-luca-williams-34908741"},
  {title:"Pedro Porro reaches final decision on Tottenham exit as price tag revealed - TEAMtalk", source:"Google News", date:"15 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMivwFBVV95cUxNT05TUGtCR04xVlAxOThQYnZKSV9PUHM2bGFxYmFPYVZ0MDZPT3d5RWNfeUJfOWxlVTJZbFpTeldrZ0NrSEk0SThCMk84SjFBek1sNDlldVVNRXRhQVgwcDZjZUpQNEFKN2Z2c2ZIZXFSY2FYZlRWNXZaUVlacEJIY3ZjVjJJbks2bXJtNm10aE4tZTR2a3BTWm9ITDk5RGFjemluOE91RU9zOFFZZ05lU1MxU1Q5cTM5OTYtVTFqbw?oc=5"},
  {title:"Middlesbrough make January Will Lankshear stance clear amid Tottenham transfer regret", source:"SpursWeb", date:"15 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/middlesbrough-make-january-will-lankshear-stance-clear-amid-tottenham-transfer-regret/"},
  {title:"Former Liverpool star explains what he doesn't like about Andy Robertson at Tottenham - Football London", source:"Google News", date:"15 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMinwFBVV95cUxQMlRycmlFQjZGNWtndk1tT1RCRjRRSUxDUUxXQksyN1M3M1Z5Rkltd0NMLXVSdm8xeFJSRzU2X0Y4RXltVEF1T0VIRmxodXV5SllDX3pQeEJWY3BXSUk1TmplSkpfMU5kUXJqeFdfM3d0WlZxallBeVlVZTFGbVA5Y25yRGdBelpxTUltRzlWSEtwV0xqVkYxcnIyY09UZFXSAaQBQVVfeXFMT3FzTGhDVkktNU15LTN3XzVKQ1B1STVXTUJuMlJLQXF3a1ZtUjkzWVJOZDdUZ0hWd3MxbUttZi1neDFYY01KcU9QOEpWU3AzQzdFcGtHOV9UMnhzZkU4eVdrUFQza2VqLTBFTkNVcTQ1a3BDbmlQVGh0ZkZNbkpVbTBDdF83bXhQVU4wYThXRlNsalljZHZ4Z2l3TDEyR0lDQ2wxSTU?oc=5"},
  {title:"Tottenham face January Mikey Moore loan obstacle as Köln make decision", source:"SpursWeb", date:"15 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-face-january-mikey-moore-loan-obstacle-as-koln-make-decision/"},
  {title:"Tottenham handed fresh Eli Junior Kroupi boost as Arsenal eye alternative striker", source:"SpursWeb", date:"15 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-handed-fresh-eli-junior-kroupi-boost-as-arsenal-eye-alternative-striker/"},
  {title:"Managing Tottenham: Kroupi deal and Real Madrid wonderkid replaces £65m star as three leave", source:"football.london", date:"15 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/managing-tottenham-kroupi-deal-real-34896077"},
  {title:"Mauricio Pochettino&#8217;s Man United move could hand Tottenham double transfer blow", source:"SpursWeb", date:"14 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/mauricio-pochettinos-man-united-move-could-hand-tottenham-double-transfer-blow/"},
  {title:"Tottenham mistake comes into focus after latest Luka Vuskovic £85m update", source:"SpursWeb", date:"14 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/luka-vuskovic-to-liverpool-update-tottenhams-85m-mistake-comes-into-focus/"},
  {title:"'Man Utd are so bad that Pochettino can't fail - just like me at Tottenham' - The Sun", source:"Google News", date:"14 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxPNTFqb0J1OW1CUHJ1eUtZTHNMZmZBMVNFTVFHeWxXSHpjNldTazlNaFlVOVhlbGpwNHBzNnoyNFVieGRCdkpwOTNReHFXMV9BRVk4aVFPYzhzX0xybnNoUnhWeEM2dF9jUGxhTlZ4MkZEc3VWdlpWc0VDczQxMGNmSzE4ZHM0MTRsY0xWYXpMVEgxUG1xeS1vRA?oc=5"},
  {title:"Four Tottenham players who deserve a bigger role under Roberto De Zerbi", source:"SpursWeb", date:"14 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/four-tottenham-players-who-deserve-a-bigger-role-under-roberto-de-zerbi/"},
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
