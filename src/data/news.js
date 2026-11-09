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
  {title:"Tottenham join fierce Premier League race for AC Milan defender rated lower than Van Hecke", source:"SpursWeb", date:"09 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-join-fierce-premier-league-race-for-ac-milan-defender-koni-de-winter/"},
  {title:"Tottenham are expected to receive a letter of apology from Pro Ref this week", source:"SpursWeb", date:"09 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-are-expected-to-receive-a-letter-of-apology-from-pro-ref-this-week/"},
  {title:"Tottenham could face Thomas Frank in January but his record against Spurs is actually awful", source:"SpursWeb", date:"09 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-could-face-thomas-frank-in-january-but-his-record-against-spurs-is-actually-awful/"},
  {title:"Tottenham insider and David Ornstein both agree on Spurs&#039; January transfer plan", source:"SpursWeb", date:"09 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-insider-and-david-ornstein-both-agree-on-spurs-january-striker-plan/"},
  {title:"The 13 Tottenham players set for extra training as Roberto De Zerbi plans to solve three problems", source:"football.london", date:"09 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/13-tottenham-players-set-extra-34884055"},
  {title:"Tottenham injury news: Four stars could return to the pitch vs Ipswich Town", source:"SpursWeb", date:"09 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-injury-news-four-stars-could-return-to-the-pitch-vs-ipswich-town/"},
  {title:"&#8216;The press&#8217; &#8211; Sandro Tonali reveals what he found really difficult in Tottenham vs Leeds", source:"SpursWeb", date:"09 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/the-press-sandro-tonali-reveals-what-he-found-really-difficult-in-tottenham-vs-leeds/"},
  {title:"&#8216;Fraud&#8217; &#8211; Jamie O&#8217;Hara lashes out at Tottenham summer signing after Leeds loss", source:"SpursWeb", date:"09 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/fraud-jamie-ohara-lashes-out-at-tottenham-summer-signing-after-leeds-loss/"},
  {title:"Tottenham red card agreement as Mike Dean verdict backed up after formal complaint", source:"football.london", date:"09 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-hostpur-spurs-mike-dean-34884460"},
  {title:"Tottenham: Former Prem demands VAR change after Leeds controversy – ‘Didn’t feel right’ - Football365", source:"Google News", date:"09 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMisAFBVV95cUxNTFdKWUZFVko3eklDdU5tN09falVCS0FmSTFKRmxXaVNrMnJSU2VMREpRSEZZdmx2R0RjenhtM3NEWVlhWHBaWGVPZV9qeXFlUjRyQTdkQl9oV0h6SndCSlNTZTNjRUloR1ZCTDRzamhKdTZ3dXZiTkVlQlYwZXJTeHhjRlZPWmw0dkpSbjY5R18zTlRCYlExUHBOSGM1OEphM1ljUk5mV1Eza0hmU01sZA?oc=5"},
  {title:"&#8216;Not acceptable&#8217; &#8211; Danny Murphy reacts to Tottenham appealing VAR decision", source:"SpursWeb", date:"09 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/not-acceptable-danny-murphy-reacts-to-tottenham-appealing-var-decision/"},
  {title:"Sandro Tonali touched on a critical Roberto De Zerbi error - Hotspur HQ", source:"Google News", date:"09 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxOTENXRmJWV0hFazlYdGVmMlVkbnJ6clExTHBEX1J1UWtQODJMbUhaRW9tQlB2M3h2MlAtZUNtYTduRjhTc3VLa202bVBsX044SWhuc1FBdFRObTFic1ZZUW0zMlJaWnF3T1R6Z3BYV01nZUpyaXlOdkt6bi1TWUtnNVNVeXRZR0hwVVVLVXltZmM2dWVXVzlzMg?oc=5"},
  {title:"Tottenham duo were let down by their teammates vs Leeds, including 7.4/10 star", source:"SpursWeb", date:"09 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-duo-were-let-down-by-their-teammates-vs-leeds-including-7-4-10-star/"},
  {title:"Tottenham reach decision on selling Conor Gallagher in January amid Everton, Crystal Palace links - TEAMtalk", source:"Google News", date:"09 Nov 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMizgFBVV95cUxQOGdFZXY5UUhkQlpQT1JPcVYzV3ZlQXdPd2k1WUhkVTlfSmw1R2tHOThYNThOWjJVbHFOcE5BRnN4VkJQN1NuTFgyRzZEQW9jNmx6b2JwNkhHSU5PUTE5MWJNQUpIR3k0M0xoQzF3RTNlZy1xM1UyMUpsMWJZVDhJVXNMRURVbkh5VkV5MmhPZkR5ck9NTU0tSDdKQkp3S2dDTU0wVjRFYTJGUXFQLUZJMDhScWVaMWhMaUY3TERZaHpwSFR4TTZKdlYtN2Z2UQ?oc=5"},
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
