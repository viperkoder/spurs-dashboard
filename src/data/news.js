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
  {title:"Tottenham vs Crystal Palace LIVE! Premier League match updates, news, score, stream and highlights - Sky Sports", source:"Google News", date:"31 Oct 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMi4gFBVV95cUxQTWZiOG1zZ0hfUmg2XzF3ekNudXpsUU9uUFY0R3A4cm03YVl0MWU5Z1huTWxKTEl0ODVCSkpmaEJyTUxoUzBnMlluMnpSOXkxRjBTUkx3Vk5Rc01PR1d3cWl3SEp1Z1kzMGFQQVRscEhMUWFpN2dKZ0lzc2d1LXZWY0dGd3VvTjVkZHh1bzVSVDM2MjNqN1BRcGJ4c0R2RFJDdGdrQnBkQTFSZ3NtQi1UUGRsUUFPRXpiVVVaNkNGTXB0TVlpTW1sSHlYd1poOVdZdFFMVTc2ZFpBOWJPMUVXeVdR?oc=5"},
  {title:"Tottenham punish Jean-Philippe Mateta’s moment of madness to earn third straight win - The Independent", source:"Google News", date:"31 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxOUHh6SWg1T2RuRDdoUkJ2WHRfNWpITXhEellvUDFZR3dZVHFNV00ySXo5T2tmTUFhZ2FRcTFGUVZRZEQ5UjNvUjhsWmc5eENqOVRBQ1l5bU01VUNQT2tTa0NLSXoxQmRaandic3c4WlV0RXZaMm9fcTVYRXhJV3A3RjB3eHpMeE1EY0M5bXdxM1l2bTBuMHh2TUg0RlRnNklhUWNYRTZ3Tjd5LU5JXzFFdWZPSEU?oc=5"},
  {title:"Tottenham player ratings vs Crystal Palace as 8/10 Spurs trio get the job done", source:"SpursWeb", date:"31 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-player-ratings-vs-crystal-palace-as-8-10-spurs-trio-get-the-job-done/"},
  {title:"Spurs beat 10-man Palace to keep up Sage pressure as Eagles fall into drop zone", source:"Sky Sports Spurs", date:"31 Oct 2026", tag:"Club", url:"https://www.skysports.com/football/tottenham-hotspur-vs-crystal-palace/report/559533"},
  {title:"Tottenham vs Crystal Palace highlights - Archie Gray and Van Hecke score after Mateta red card", source:"football.london", date:"31 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-vs-crystal-palace-live-34840581"},
  {title:"Mateta's early red proves costly as Palace lose 2-0 at Tottenham - Yahoo", source:"Google News", date:"31 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMihgFBVV95cUxQcFlJTEV4QXlXazVwUHF4aG4zSVBHNmhKckpTOEdnUEFMeUZzU0xfOHhiVzBFd25LMlhUT0hWMWdyX2ZLa2RtdFpSQ0dIa0p5S25vOERRb3lMN0ZfVlJCTV85dUtMNFJabUdXNE05c0ZEQlota1dSV3dhdkFOd25Oa2o5dmZaZw?oc=5"},
  {title:"Tottenham half-time player ratings vs Crystal Palace – Two stars earn 8/10 as Spurs lead", source:"SpursWeb", date:"31 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-half-time-player-ratings-vs-crystal-palace-two-stars-earn-8-10-as-spurs-lead/"},
  {title:"Tottenham Hotspur vs Crystal Palace | Archie Gray heads in to put Spurs ahead - Sky Sports", source:"Google News", date:"31 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiowFBVV95cUxPazJmWTM0OXpRR25ubWdzdmRFbzJpbjVYbEt6NXJ5ck5OMllDaXotTjhoS2RQS3BhRzRBT3pPSTltRExseFgwSGpqR2pxeXRxLTBfc0RLdkNlR1ZOZjR2aGdfYVQ5TElUakVvdkpfYy1HX3AtOWZaVkI3aktxMU10M014dEdKQmlQWC1YLWM2Ukh0blRoX3ZuNm5YeUpvblRGLXYw?oc=5"},
  {title:"Tottenham confirmed team vs Crystal Palace - Maddison on bench as one change made", source:"football.london", date:"31 Oct 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-confirmed-team-vs-crystal-34844775"},
  {title:"Tottenham Hotspur confirmed team XI vs Crystal Palace &#8211; Maddison decision made", source:"SpursWeb", date:"31 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-hotspur-confirmed-team-xi-vs-crystal-palace-maddison-decision-made/"},
  {title:"Confirmed line-ups: Spurs vs Crystal Palace - Tottenham Hotspur", source:"Google News", date:"31 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxPSlN3WjBQbmdvMDNGdEtYSU5fNU5UWHhOUXBuMmx0UnAwX1lzSlpyNFNCZFY5V3RWZkVTQzc4N25PdG4tU1ZYajc1VEwwSkZUVUJaX3NTSldwSVlLMzdrWjBrd0FyaDRFc3RfcEZZUlBocGZZdURPV3pfRTJNdnN0Z3Fla3JVb2VkYTgtTG1DYU5ZSzdkNVFwQWNCbGRZMDhSUjBnSmpDQkhBWDFCRUVCUExDVEU4dw?oc=5"},
  {title:"De Zerbi reveals Spurs plan as Savio return timeline revealed - London Evening Standard", source:"Google News", date:"31 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMilwFBVV95cUxOTFZxNzMxNk9SZW1RR1dSZlJtNVAzSktDdGswWlNIYjVoNlR3cWdqeDZNUVdzNEE5eVBnUmNPbGJUbC13QVB4Nk9nQWY1YjNBbjR5ZGd3VFY1MFlJZmtOMjl1V0JWbGtFNmlLYmFTZHROY2J2X3RLbWNrSWJwQ2tkRUhkZXlYRnJLaVhPVTJISnlKOTdWM3dv?oc=5"},
  {title:"Tottenham honour Harry Kane at Hotspur Way after historic Ballon d&#8217;Or win", source:"SpursWeb", date:"31 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-honour-harry-kane-at-hotspur-way-after-historic-ballon-dor-win/"},
  {title:"Newcastle United icon takes subtle Tottenham Hotspur &amp; Sandro Tonali swipe with 'average players' claim - Shields Gazette", source:"Google News", date:"31 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiwgFBVV95cUxQVlJ3REh0dUVBT0lzVTFFckRqaXN0VnV2VDRZSWg5ckt0d25DTk5UVlhtcnl3X1BnbnIxZHVsSmF3cWdxNEdqVmhaYng5UE9YRTg0OU92bzRkZlhtdmUydGx0MURYb3ZhS0ZJVnpGcDN2SDBMeUFZdjh2a0tGNGMxT3lMOHY2cTZvbUc1aVVjNzdwQ3F1aXo5UkhwS2pnZEh3bV83TzVZemJETE5KaXlkdmRjQkh6SlRPVVVUZWFLOGpudw?oc=5"},
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
