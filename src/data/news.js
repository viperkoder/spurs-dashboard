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
  {title:"&#8216;I have a lot of ambitions&#8217; &#8211; Omar Marmoush reveals small first step before big plans at Tottenham", source:"SpursWeb", date:"26 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/i-have-a-lot-of-ambitions-omar-marmoush-reveals-small-first-step-before-big-plans-at-tottenham/"},
  {title:"Gustavo Varela makes admission on his future as Arsenal join Tottenham in £42m race", source:"SpursWeb", date:"26 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/gustavo-varela-makes-admission-on-his-future-as-arsenal-join-tottenham-in-42m-race/"},
  {title:"Arsenal receive Antonio Nusa boost but Tottenham may still have a small opening", source:"SpursWeb", date:"26 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/arsenal-receive-antonio-nusa-boost-but-tottenham-may-still-have-a-small-opening/"},
  {title:"Five players Tottenham will sell next to make room for new De Zerbi signings in 2027", source:"SpursWeb", date:"26 Nov 2026", tag:"Official", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/five-players-tottenham-will-sell-next-to-make-room-for-new-de-zerbi-signings-in-2027/"},
  {title:"Richarlison reacts after learning Everton want to sign him after Tottenham decide January price-tag - TEAMtalk", source:"Google News", date:"26 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMijAFBVV95cUxQTVk5elhqaEg4QWlxYTNzaEI2R1ZJMml4VWo0aUZ5TDQ3TEt6X2kyektuT213RF9DMFFzSnRiWFd0a3ZOT2wyRHh1aEU0dWR1aS11LVgyOGg5Yi0yTjFtVXpmVy1sb19EODE4UmEwcFdBdVl1aU9Tbm8tblNOUGZpWTlsODlJWkRwbHo1Vg?oc=5"},
  {title:"&#8216;Really likes the idea&#8217; &#8211; Richarlison&#8217;s agent on Tottenham to Saudi transfer rumours", source:"SpursWeb", date:"26 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/really-likes-the-idea-richarlisons-agent-on-tottenham-to-saudi-transfer-rumours/"},
  {title:"Omar Marmoush injury update as new Tottenham footage emerges - London Evening Standard", source:"Google News", date:"26 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMikgFBVV95cUxNODRWNVk5UjNyUFNkbDJybkZkenVyUlMzWEd2RHBFS0NMRDdzbXdVbnk1X2l3NFdSdFkxS1FrcmhKTm5KYVRLbDdKcDE1SnR1UmdFZjRMSmZPYm9JT3Z6Z1oydlVoV1dBVjFPRkkya0NhczRXaVFnbjdtOGtGMlZvTmt3alUxaC1xMWZlcDh4NmFJQQ?oc=5"},
  {title:"Tottenham predicted XI vs Sunderland: Sandro Tonali and Andy Robertson return", source:"SpursWeb", date:"26 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-predicted-xi-vs-sunderland-sandro-tonali-and-andy-robertson-return/"},
  {title:"How to watch Sunderland vs Tottenham: Kick-off time, TV channel, team news, predictions", source:"SpursWeb", date:"26 Nov 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/how-to-watch-sunderland-vs-tottenham-kick-off-time-tv-channel-team-news-predictions/"},
  {title:"Adam Wharton makes a huge Luca Williams-Barnett claim - Hotspur HQ", source:"Google News", date:"26 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMifkFVX3lxTE9JM1EwenA5bHhKc0FySjJ3aUc1ek5rNnlvOUZ4ako1Z050TkIxWHptcS1Lcmg3VTU3ekFlV2pMSTEyQ3A5MlFhWEh6UG5FNHVVUTgtVHdMd3I3amZJLVE2dEJwaGd4MGd0NGJ1T3Jpc1p0dUVfYVBOQi01TUwxdw?oc=5"},
  {title:"Manchester United, Liverpool and Spurs using same law firm to set up legal claim against City - The Guardian", source:"Google News", date:"26 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi1AFBVV95cUxQb01xcTVvRmh4S0ZFbnNLVTQ5ZEZSLWhWRGhXUzRqazEyc3hnbl9Ra25SbU5nSm1wUF9VSURrX0ViZWdwMEFJdmZVeGlwbTBRN29UR3I4eWl5c29WNzlxNzdRWGJXTV9pLUV2alFZR25YXzRZbU5fOTFqWTdGcDZOM0s5bkJ1SGgtQkg1SE5RSTNMV1dRU1R3ZjZJSlBYTzBXTU5oS3lkcVo0R3Uxb3hXNF8zanVTYVVuLUJpRkhXSEVMVVQyeFlwRTgtNHdIblp2NWNFbw?oc=5"},
  {title:"Tottenham dispel social media injury rumours with latest training footage", source:"SpursWeb", date:"26 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-answer-social-media-injury-rumours-with-latest-omar-marmoush-footage/"},
  {title:"Tottenham answer social media injury rumours with latest Omar Marmoush footage - Spurs Web", source:"Google News", date:"26 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMitwFBVV95cUxQc1JiVEZwT05IOWJqdEMzM3c2NXNxSmJVRC04eDJrN0kyUGU0WEFkZ045LTUzUFNLREN5NW1SNXZUaHBWMWxONUk5UHZULWJPMnAtMHJJcm9ZdjFIQ292cFlHZjN4aUVxWEMyU1FhZjdMNTkzVGVXSXJ4VlU3Vjgxd1JfeUxyS0xKQ0Q0VVJ3TTI2czBqdFVvSEY5eXBwZVVOcWVqbW5ncFlYX01LMWhld2U1ZmVJS0k?oc=5"},
  {title:"Tottenham included unusual clause in Mikey Moore loan that may lose them money", source:"SpursWeb", date:"26 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-included-unusual-clause-in-mikey-moore-loan-that-may-lose-them-money/"},
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
