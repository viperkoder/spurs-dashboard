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
  {title:"Xavi Simons is targeting a return sooner than Tottenham&#8217;s medical team expects", source:"SpursWeb", date:"28 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/xavi-simons-is-targeting-a-return-sooner-than-tottenhams-medical-team-expects/"},
  {title:"Jack Wilshere has been proven right about Tottenham wonderkid Jamie Donley", source:"football.london", date:"28 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/jack-wilshere-been-proven-right-34828679"},
  {title:"Roberto Di Zerbi vindicated as new Tottenham undroppable emerges - London Evening Standard", source:"Google News", date:"28 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijwFBVV95cUxPcE1TQTk4MTd5SkRERFpBMnFiYU5sZEZpVkRPWFhIRlFmcTB1Mmt6ZVJTVHpQR2s2QmlFUFlRWDV6THZDcUlsckpkdnlhQmliOFVpU2VNZWR1eVhYbFNUNTdjZmVqdTYteWNKdjRXdzBWZnB0cDlyb3ppaDRqXzc5NjNrbkQyYm92bkIwTXUtRQ?oc=5"},
  {title:"Tottenham fans will be delighted with Mathys Tel&#039;s admission after Chelsea win", source:"SpursWeb", date:"28 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/i-believe-in-mathys-tel-more-than-he-believes-in-himself-roberto-de-zerbi/"},
  {title:"Former Tottenham captain Hugo Lloris hails 'role model' Harry Kane after Ballon d'Or triumph - LiveScore", source:"Google News", date:"28 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMi6AFBVV95cUxQVFhBVndyNlFvRTduQU5JMEE1TnpQcUV5bjlrTFFHNGptZ3dsZ2E4a254bmFsTHJfRldZYk14WC1FSmdVMWhJbjU0YkJvWHE5bnQ1S1FrN0tOaXhHdG1RVjlmMXFEZlJNU25SM0VMU0FkMEVZdjNWN3hHYzdnWWJDQ05OZHdkSlVhLUIwNTdFcDQyTm1tUzNNdE1PU1lSNWxjWDJ4VTZlUkpDc2lxTEVVaGNMR21DMVF6VmFtNnRsMzg3S043SXhhRkNURDVHMVVhV282QmpkOXhuUHZON0twdTQzUWRfSzRI?oc=5"},
  {title:"Video: Tottenham&#039;s Jamie Donley nets brilliant brace in 3-1 Luton win", source:"SpursWeb", date:"28 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/watch-tottenhams-jamie-donley-net-a-brilliant-brace-in-3-1-luton-win/"},
  {title:"Tottenham rival Man Utd, Chelsea and Man City in race for Villarreal right-back Alex Freeman as Spurs plan for potential Pedro Porro exit - Yahoo", source:"Google News", date:"28 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMihgFBVV95cUxNM0dXT0dEV1J5T19XTDVYVlB2VlhObjhJNDJFdXh0LWc2RXMzbEs2NHhvTUVqU3k3U2VUZVZjZ3ZTMi1aZVBZZ09xQ1NqMkVGcW5ScnFIXzBNaUpJNUFlUndXMGMxbUNfenpqcEtyLWRiTUE3Z1JlTmlIV0Fyem0xM2ZGaDJuZw?oc=5"},
  {title:"Jamie Carragher claims Manchester United made mistake in not signing Tottenham star", source:"football.london", date:"28 Oct 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/players/jamie-carragher-claims-man-united-34826221"},
  {title:"Roberto De Zerbi tried to sign his former 26-goal striker for Tottenham this summer", source:"SpursWeb", date:"28 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-tried-to-sign-his-old-striker-amine-gouiri-for-tottenham-this-summer/"},
  {title:"Tottenham targeting exciting LaLiga full-back to replace Pedro Porro - TEAMtalk", source:"Google News", date:"28 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMilwFBVV95cUxNR1YzMDZiVzBhTUtmQ3RXRy1wUzRqVnJLVHZ1cHJYLUhrcFh2TWR0eDNxbjIyWGlETGMtaHA5d2lHWTNWcVhLand5XzF2QWc0UkRxUjZPZFAwRGpaTTV0WUpUQmhud29leVZ3V1BmZG01VEx2RnQ5TXo4aHBPSHJlak4wcWZ5cG9vYVRaUVMtWmlYVlI3OTRJ?oc=5"},
  {title:"Tottenham Hotspur injury, suspension list and return dates vs. Crystal Palace: James Maddison, Savio, Lucas Bergvall latest - Sports Mole", source:"Google News", date:"28 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMi9gFBVV95cUxPZmpyeWExc1pMWnIybm9xSXVQSVJwUFR1dmg5bzRQdUJCdFN0SzZHak1hbWZzeG5paklERkYwa3M0X1MwZWU2OF9pNEVhX1lMVzlOcGJBRTVMN3c2M3BabHNPZ0F3YUVXdks0T3JJR1ZRc2VxOU1nLTU5eG9RbDA5UXM0Um1ZUHBOaWtIbXk5dEpySXlZb0QzWE9OWWtpdExLS19XX1JkNXBPQWctcy0yS25OY2Q2V1NuU1NXSEprdFJTSnFLNEllekJ5U3ZZcU91dDBVWTZUWlQ2ckJVdVZSdzhORGRGQ0ZNQ2ViVll6Njl4NWRfQmc?oc=5"},
  {title:"Barcelona plot shock move for struggling Tottenham star just weeks after he signed new contract until 2031 - Yahoo", source:"Google News", date:"28 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMijAFBVV95cUxNNjhSeUd0U3NoUDJNX2g2SlZ0NHdWdVZqNEJldXVGS3Mya3RyY1hPWlJSUnlKWjFwSHhJNEZlODdBWHlkcW54QlplTzNDRWFtcUJOUHp1cHplZ3d3T2xRNDg4aDR0U19RelZOX3dVSGpvUjlERmwxTllBYUhaNTB5MEplT3dZbUdlaUtSUw?oc=5"},
  {title:"Tottenham Hotspur Daily News Roundup - LiveScore", source:"Google News", date:"28 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMivAFBVV95cUxQZGdaY2xvX0hjQnRFd1BFSVF1RUtZX3FUajRCY0VFeHN6V3cwSkFvTy1RR2JNZUhVcGZTVVhyRTdqSWpFYXJnY2FaQlVLZUpTbmVkQTF2ZW5obm10VTlmMHVIM3BhNlBQTG1mWmppSW1oLVo3anYzb3FHd2c3OEJMQmNLMUdBM2VhWmk4Q1ZpcnFfUnBEajRtUnpYWjI5Mnd4MFVjVm1TRS15aXdzblQ3QllzTlFQMDJYMHdSeQ?oc=5"},
  {title:"The strange new tradition that has coincided with Tottenham&apos;s improved form", source:"football.london", date:"28 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/strange-new-tradition-coincided-tottenhams-34826668"},
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
