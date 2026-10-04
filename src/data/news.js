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
  {title:"Tottenham wonderkid wows club on debut and backs Thomas Frank message", source:"football.london", date:"04 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-wonderkid-wows-club-debut-34714347"},
  {title:"Critics rave over ‘man possessed’ Tottenham star giving De Zerbi a huge dilemma - TEAMtalk", source:"Google News", date:"04 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirwFBVV95cUxQQ21TMmwxTXlRRGlpOW44N0J3VGFUQUw2ZGlTTkxSVDVCa3lTdFNRZ0gtaXRUSkhOWDRIVEUtVGdRNjdVRnJNQm5HWjRBaktCNlNjVVhfa21yY09YTWdUMmRIVTNSanNabk9lczZDSjFGRUR5TkJFVUlwQzU5TlBiY1FzbkNjR2hKaHVzMVdSUDdOUFR2cjV4YXZTcnVielR4X3JwRjVvS2Q4ZFNWb2hZ?oc=5"},
  {title:"Tottenham delighted as loan star &#039;leaves fans drooling&#039; with &#039;real deal&#039; display", source:"SpursWeb", date:"04 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/souza-leaves-fans-drooling-with-real-deal-porto-display-tottenham-will-be-delighted/"},
  {title:"Tottenham's Antonin Kinsky sticks up for himself after Lamine Yamal moment on Czechia debut - Yahoo", source:"Google News", date:"04 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMikgFBVV95cUxQVU0wY0lDc1hOZ2JEZElKUnlvbDR2TF92YkJZNTNOUnhDZEZsZ0VEbmk1d0NtQnZoWmc0MXRQWmpwRHNyeFZ1Z3k5ZUlGQ0lRbUtnTGNqNmNJZWVGWjQzdGw5bTZCNEJwX1lHeEJtYmhXT3VOMHRQb21lalBUbG1reGhta2x6RFdLSHhHcnJiRll4Zw?oc=5"},
  {title:"Tottenham might be worried about Sandro Tonali&#039;s latest reviews from Italian press", source:"SpursWeb", date:"04 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/sandro-tonali-reviews-are-in-but-casual-tottenham-star-is-no-pirlo-after-italy-vs-france/"},
  {title:"Former Tottenham star now runs a barber shop in shock career change after retirement", source:"football.london", date:"04 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/former-tottenham-star-now-runs-34713844"},
  {title:"Tottenham will like what Sweden did with Lucas Bergvall after strong form vs Poland", source:"SpursWeb", date:"04 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/why-lucas-bergvall-was-benched-for-sweden-as-tottenham-prepare-for-man-united-clash/"},
  {title:"Tottenham Hotspur vs London City Lionesses: Women's Super League stats &amp; head-to-head - BBC", source:"Google News", date:"04 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE9aVEdBZ1BjQjlTX082aW1mOEkwN3VGQ0ZKNHJPSEhVUUN6MWtXM2tieklXb1VDWnduVmpKS2NGQkt1UFRTVnVFbkszX3FLZnE0UkFLUjVKS3JKWmpDTDVhdV9WZlNodw?oc=5"},
  {title:"Chelsea face Tottenham and Man United competition in pursuit of 20-year-old winger - LiveScore", source:"Google News", date:"04 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi6wFBVV95cUxNUHlOMlRUZW53aFhPRS1YQW83VFhqWjJ4WHNraVZ6RUViWmowaFpXb3dEUUJUaTNIWUdVdXZISVU0d1dtN3lCNkRPZUhtbVd1UnZRdHY2d1NkTm5zMVFKcHRKUHhLRWpBN3NjaXR5UEsxRGdqTlRvWTYxY3JhajMxY0cwRExHVXJrSkpaZXB3TFNCV0lkWkNvYzZVdXFobHNWX3VTbFN6ZFgwS2F3NUtiOWgtOUppUGI0TDNEOWRENlNEYy1oQkNtbFFYS19wczZMa2R0bUNIa3duaDc1VFgwNDI3V09TNTFSaHZ3?oc=5"},
  {title:"Exclusive: Pascal Chimbonda says one Tottenham star &#8216;doesn&#8217;t fit in the team&#8217;", source:"SpursWeb", date:"04 Oct 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/exclusive-pascal-chimbonda-says-one-tottenham-star-doesnt-fit-in-the-team/"},
  {title:"Tottenham prepared to accept £13.1m transfer hit as 'door opens' for defender exit - Sports Mole", source:"Google News", date:"04 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi0gFBVV95cUxPeHJQU0xJd0FTMjZ6czhBLVpxeHF2MjR1ZGlRS0o1aDBUMU5FMHpoSjBaZlhZdnlFeVRsb3RhVkJSUjRIYWVzQTliVnIyMFlMalJJOGhiMDF2WlZMQUFTV1lCeDNsVjJWd2tVamFpcTZWVjRDNm9WeGZyRHVleHR0U251el80c2JzdFFnUXg1WFhoRy01NldHeC16NG9XNXI5NmJsTEpLQU9zSUV3RnVRY1V1b0dUY3F5VEZzOEstR1JJVWthVXpmNGxVdmZYNW04Y2c?oc=5"},
  {title:"Premier League agent explains Roberto De Zerbi's role in Tottenham transfer race with Man City - Football London", source:"Google News", date:"04 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiogFBVV95cUxPMGktOVNoY3RISzZ6cFI5SklfNEZoMk1Wc05zZW9zZ0tDeGdtbnR1c1lHV0hya1drV0M1NzcyVVJJRDJ5SWFwdnk5WW4waXB1MlJxV3NrWXA5cDdhdXV3ZENROW1pcVYtdHpjTDU5dWE2VW4ycERtRWNGMFpIenJUbVk2cF9kZUVSQldwSldEdWoyVmJhbUtibUpERG5Uc0lXM1HSAacBQVVfeXFMT05wT082Vy14TEpudG40c2Q0OGJ6Y1B6RVVqWjBpNGhjXzIybWNsemZqRXZWRTJHSE1hYm1YYjR4Mnk2dk5XaW5Pb19YQVc2LXQ1XzZWV2RWX0VLc01KUjJPNGF2c1I4RjZtUnc1dDR6VGJ5OHhfdmtjLS1LeGNKcm9PclJrcm1iMjZEQ1hOUHQtczRYaE1WcEhtYkVUM2JRV1hFWHdsZWM?oc=5"},
  {title:"Internationals | Kinsky earns first cap as Robertson reaches century - Tottenham Hotspur", source:"Google News", date:"03 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMisgFBVV95cUxNSVBiU0RvSkpsR2dJYS1Sc182VkxEdlZzWHk1T1VLNWVaV2tVOU1ZbHduUTFETXZZTjdEWUpfUnB1SDJscFdNRWZDaDhaTjJQZWFEUkIzWlJMYl8xRU1kb3lQZUVGb29DRWlaNTA4THBSMEpETWNGXy1vc1FtTVVDNjNEYmtGQjMxRERKUk56NkdhR0VSTEJGNmotNmt6QUtGRnRSWlFwVHBsZmozSWI5QVNn?oc=5"},
  {title:"Tottenham Hotspur Have Been Offered A Chance To Land This AC Milan Defender: Should De Zerbi Go For Him? - The 4th Official", source:"Google News", date:"03 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMisAFBVV95cUxQbVlIMDJES3R5T1A5UVp5SGhNbVZ6MUdSajRRVm9OdXBxeHp5RFlmdno4YnVqNnlEWmNjbWdjTHZyOGxtWDFDMUtFX2wxalF4eUo5dkVoaFc2Wm9oUFdSODdwMk1sUjlrTFFWUEtnZ1BYcnU1WUhYeTFUUElHVTVVbFdNVVM0NmU4ZzhHQWE3dzRZeHZRdW91TDBIVzdMTnVXRmh1LVYwa2tOVXFRVTh2eg?oc=5"},
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
