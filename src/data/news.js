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
  {title:"How a decision Tottenham made in 2024 could lead to a potential £200m payout", source:"SpursWeb", date:"27 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-a-decision-tottenham-made-in-2024-could-lead-to-a-potential-200m-payout/"},
  {title:"Arsenal accelerate bid to sign Bundesliga gem but Tottenham also in the mix - LiveScore", source:"Google News", date:"27 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi1gFBVV95cUxPZXRtQmM0dDN1M1B0TERhZXZ0WEJBb0k5R0Z1WEhPREtXM2NRQ09NZjBObzJOWldfZlFaQWNuMzdXUmJ0dFhOVVo5Y254UXJTT0x2LWhtbUVJbTFoQVNsN0o3bTRPSzVnTXVMRjhHY3RTYjJqV2JsWFdON0U3WENXdFNrdVJGWFl3MU1LdFZSeDd5bW9PYTFKbFpRZUh4a3dsUm4xNUZadDZsWjZaWUxjT2owVmw4WUU5dFJjUWY5ZDVudUZ1UkcxeVU0dmxpcXRHUnJVdEVR?oc=5"},
  {title:"Kim Hellberg review of &#8216;brilliant&#8217; Will Lankshear should haunt Tottenham decision-makers", source:"SpursWeb", date:"27 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/former-tottenham-forward-will-lankshear-has-been-tipped-to-make-it-to-the-very-top/"},
  {title:"What Tottenham could be planning after Manchester City&#8217;s 114 charges", source:"SpursWeb", date:"27 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/what-tottenham-could-be-planning-after-manchester-citys-114-charges/"},
  {title:"Tottenham Hotspur vs Aston Villa: Women's Super League stats &amp; head-to-head - BBC", source:"Google News", date:"27 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTFBYVkxCdzI1RXVtVUt1ZUFXbUhUQWNRRXZORWZfSm5uN1RhWVpWVWJDdXRRYXI0YlVvQTdROVo3N3VfeWhOMHc1SUFhNF8wckMtWGxkVjA0c0pzUkVUc1ZnM1gwYXgwQQ?oc=5"},
  {title:"Liverpool and Manchester United keep close eye on Tottenham defender Micky van de Ven - Liverpool FC", source:"Google News", date:"27 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxNdkZTeDU2dldpMV8telZ1NDdTcXJ1YXp3UmNiWVp4TXFTeTZtcVBieXZMZnpaTzJoYnAyUDc0OUx3Ym5mbllUSnl3WGJfRmpMMjEwMWwzQW9jTUFuU1NPS3d4RjZlekF2ZVVLZmRYM1FKVjF0eFdtY1h3cVJDUWlHcVdfWllBNUMyVmUtNGpEYjlmN1U4MHdZZFhsN3ZaLUFNN0JyNHRTX0RqTl9hRF80WGpvZ2hNd9IBvgFBVV95cUxNRWxoZWZ4VlF6bUN6YkdJbzZHTU43YzlVeXh5UGRsZ2lib1pjajNyd3lzdk43WDl2LU53dnhkV3BmaHY0TVUtc01EYktSME5JVm5uYjQtVVY4LUlzZVBJU2ZlVGo5ZXNLOUlfY3NsTzA4cXk0dEJZVlctcXU5dzhEMGZ6Z1ZrTnpRUXNwTGR1TXRmM2phMURtYU8wOWNDTHJZb19OZjliU2RmN3owQkpYdnRVWXFyRnB2c0k0c0ZB?oc=5"},
  {title:"Harry Redknapp reveals punishment he wants for Man City amid claims Spurs were 'cheated' - Metro.co.uk", source:"Google News", date:"27 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxPTHhJLVJSaDNfcGY1SmlCU3FjNWUwUVJ5Tm50VlVSNE90ZGZCRVhjdnpLX3UwWWJyX1JHUlVPdlZGVFpaTXQ5M1B1T3VOS1JQVWRsSkgxR0RYMjhnT0pfejVSTndOQmRMZWhuTEZzT1RvMzhfNERlVEl3Ulo0akFITlg2VFNXU0k1eVJENnpVQUdCZUh3QTVYaWNCTlhVYzNXRmdIQWYzaUFydmJoaG1ydUU4dHU5UdIBuwFBVV95cUxPQnphVjRVTTh2cm95S0stU3Nfd0ZMbW5tMjFwMU1lMk1Mb29fZXNfSm02NUZjbEo0WHVrNXVEbWhua1pBTldHY182V1QwVDVkdS1TSzBNUHFRY3dRT3lhX3FNYzZSYnpjdlhaODNIelB0YXJVcm1fQ3NNS2JfSnVnZzk0cklmcjFYNTMzTjE4S093Z0RtUXFSTVV0b3hESUM0dVBCOEtZaTdpWFZRWkxHcU1aek9oVDhvSlhz?oc=5"},
  {title:"&#8216;I played with a young Gareth Bale but one Tottenham star was even better&#8217; &#8211; Pascal Chimbonda", source:"SpursWeb", date:"27 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/i-played-with-a-young-gareth-bale-but-one-tottenham-star-was-even-better-pascal-chimbonda/"},
  {title:"Dominic Solanke tipped for leading Tottenham role as Roberto De Zerbi plan clear - Football London", source:"Google News", date:"27 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipgFBVV95cUxPMmVPRkMzb3JEZDBNamo3QTRyZDRnOGJNc1MzRUJPbjd2REZkQ0VZTmVhN2J3VGt6Zkl1WTNqNmJPaGZVNWhEYi1Ea3prVjEwTE1MMGFUSmc1ZXZJcHhPZF9XcWljVjQ3UktuMkVWYllGZVA2M1J6SjNLSFpqT3lvRmhLQjV3SWxZb0tKcjZhenlqcnh0ZmdWZklJcENJSTZoaGJkQ0530gGrAUFVX3lxTFA5OTZuR0dKU3Q0SWxZR3JjM0ZKZl9zakNfajUzc1BIbkJBTjBMTkdXa1IyTGRXQXdUbUdWbDFZQ2Q3UW1IMEQ4OFpxWWNYTUMtZ0ZHTVM5aHpkczU1a3VfNVhfc0I0NG16VkZUTmE2ZEkwZ0wyaTllNG1aSlhWU0k5ZUVXMWlFeXhhSUQzalZPcDFOOWdOTkpNYmFmVmhhWXN6Rmc4TWN0Q2xQOA?oc=5"},
  {title:"Porro, Kulusevski, Mudryk, Xavi and Odobert - Tottenham injury updates and return dates", source:"football.london", date:"27 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/porro-kulusevski-mudryk-xavi-odobert-34674988"},
  {title:"Hull City's impressive rank in Premier League transfer chart as Tottenham issue clear - Hull Live", source:"Google News", date:"27 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxPb1h5Y3pGMmJSR1lZNW9Gb1hGMVNfUXlaSFd0ZFJ0UGlVX0lxWGdRSWhGYi00T0V0dzhLYjhPVENMZkxWUS1iVGJVNjJ3YWZ2OWhSaGtPdkFUOVUtNElBcXROY1VXbjlIbWVVYWQ2X0pQS1BSN1ZRTjF4S1VhOVFGM0dtbTJocnA2Z3RqdDE3U3pIa2pncTZTeUtIT2gyd0NtakQzcEFYQdIBrAFBVV95cUxNUTlVRi1QZ05PcXktTFBrZVkyWXFLVzBXU0xqSks2aGNFSGhFVXJ6NlRBY1lRR2JyNkNMQkpLSUJzUjRCWTUzdVhlemdTSUhlTG51YWo3aXVQWnAwekIyMk9mLXhQYUk2LUp6Undma1VRWEZBWnhWbjE1UUdnZVU0Yzh6VmZ3Q1FXMTB6dkFXWmtOSHVsRnFzMGtnZ0ZyODVaUlY0b2ZkQmZ5MTlN?oc=5"},
  {title:"Chris Waddle says Tottenham players are &#039;too similar&#039; in one key area, Dele Alli name dropped", source:"SpursWeb", date:"26 Sept 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/chris-waddle-urges-tottenham-to-search-for-the-next-dele-alli-gazza-or-glenn-hoddle/"},
  {title:"Tottenham Hotspur Are Keeping A Keen Eye On This Brentford Winger: Should De Zerbi Snap Him Up? - The 4th Official", source:"Google News", date:"26 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiyAFBVV95cUxNZ1ZWTWJSb2Q3ZXFzNTlHODZlRDVEdUtBVFFsanRuZEJ6cW1Hai1fWnVwclVPaDVubC1Yb0dhRHdUaTNtdlNPUDY2Z2doR1lYaHdFX2I1eGZPY18tZVFyWng0RmhDN3VPaXJsRm5LMFZaRGJLa0dJdF93allMSV9wSlh4djlmQmNtN1NVR25xaDc4eDl3aDNfdF95dzFfT3NFTWpEek5vYnZhd3FQZ2RFYWpXUWIwaTdTUGVOT2EwNGRqVk45c1lGUQ?oc=5"},
  {title:"Tottenham have bought &#8216;pink shoes, brown trousers, a yellow shirt and an orange tie&#8217;, says Tony Pulis", source:"SpursWeb", date:"26 Sept 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/tottenham-have-bought-pink-shoes-brown-trousers-a-yellow-shirt-and-an-orange-tie-says-tony-pulis/"},
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
