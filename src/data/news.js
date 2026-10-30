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
  {title:"‘I don&#8217;t think I can play anymore’ – Dejan Kulusevski opens up on Tottenham injury nightmare", source:"SpursWeb", date:"30 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/i-dont-think-i-can-play-anymore-dejan-kulusevski-opens-up-on-tottenham-injury-nightmare/"},
  {title:"Jamie O&#8217;Hara makes bold Tottenham Champions League prediction after Chelsea win", source:"SpursWeb", date:"30 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jamie-ohara-makes-bold-tottenham-champions-league-prediction-after-chelsea-win/"},
  {title:"View from our legends | Palace - Clive Allen special - Tottenham Hotspur", source:"Google News", date:"30 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimgFBVV95cUxPOFZLckMtNWQ1WERTZlpwY19jZk1yTHZGekNSSGVWMjRRM0Z0VFphQm1MQnAtdFc3dmdQNkZlQkpYY1JtVVM2NEVWVzB1YkFmZFpwMHNjY3dJOGRCMlctRUZKOGtzTUFFbUltNFZHSWpZdzZMQTlPLTBfSExTQk83bS1MMU1aNDlEaGV4bjJDTHNueVFIT0hRTWVB?oc=5"},
  {title:"Tottenham face Arsenal and Man Utd competition as Bournemouth make Kroupi transfer decision", source:"SpursWeb", date:"30 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-face-arsenal-and-man-utd-competition-as-bournemouth-make-kroupi-transfer-decision/"},
  {title:"Tottenham Hotspur vs. Crystal Palace Premier League Preview - Yahoo Sports", source:"Google News", date:"30 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijAFBVV95cUxOLVFlbWptNjVFcW9DV0ttNXZFei1kaS1uUzk1WXBYa3NZY2ZRYlBuTzR3QzM1alNNRUZtZ1VrS3FhSmxySk5ZODItYVFaNVpzMEplU0FWTTlHRjloZUVqWVFfbWhOeDE0ZHo4cnlUajBFN2hJeWliOTQySGxpa0NURXNobEdRQVRkclk3Qw?oc=5"},
  {title:"WSL Fantasy | Spurs Matchweek 8 Preview - Tottenham Hotspur", source:"Google News", date:"30 Oct 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMiiwFBVV95cUxNSDJlZkh1SWtON0RVMjZXeGNSUnVGNk85RTRvdjlGUWkxcHVaekF4blcwYzhUUVRuOEp1bFBOQnVJMVRMZTM1YzJOd0RaMXZNeU1yODJCczFXTy1IaUw5ZVhqMWlwSV8wZUgwWFhUYU1tdXhWRFNIT1V4bURXdDZDS0lkc0EyOUZoVHJR?oc=5"},
  {title:"Tottenham battling six PL clubs for Sporting Lisbon star as release clause comes to light", source:"SpursWeb", date:"30 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-and-six-premier-league-rivals-eye-geny-catamo-as-sporting-demand-51m/"},
  {title:"Tottenham Hotspur defender responds to Barcelona transfer links: 'Would love to return to Spain' - Barca Universal", source:"Google News", date:"30 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMivgFBVV95cUxOcG5jWnU2Z0RfOENVeDQ4ejRSSHg0b1lUTkNOS0dIQ3doMHFuYXRMVjBXRXM2TnFRWkNsTWhIa3VWUndBWXdRcnJBZWhEVnF1bUFjRkxxVEQtaXlkR01PYUtZTVk4TVdPbkxhQXVPSi01S3BJLXJDNGtucHh5S3VXc1AwUDJBUVpSRkZxLTNSMHRGTUFITnNUTUhOYmxHWFFuM3pfcGNkOWVMVEZZeW9WWmprS0Vhd3dlSXFUMWpR?oc=5"},
  {title:"Tottenham handed James Maddison injury update ahead of Crystal Palace", source:"SpursWeb", date:"30 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-handed-james-maddison-injury-update-ahead-of-crystal-palace/"},
  {title:"Tottenham defender Ben Davies admits he may make unusual move in the future - Football London", source:"Google News", date:"30 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxPRWpla0ZEakM0WUthOWhfdjJ2TXgtOVRwaFh1MTRURUdPZ3RSQjZQVVFqcUpyUG5fNGwtYVhVZ3c1NmZmNDVVN0k0S2xGME5kRGV1M1JhaTBESmhoSTZyNnJaQVBJQWZIV0VYUkZoeTc3NHRjYUN3N0xDekh6MkRnNzBWVW5hX2FwYWZkMXp5aV81UnZTcmJYT2VpaG5acmkx0gGmAUFVX3lxTFBPSGlMYWU4YkxIcXo0dk1kR2p2cU1HMzFUZmxWTWRRdWdSOGZhdWJzRHRkenBxNVdoMHppRTdLeG52S0ZLMDlMcG1WeDVjZDA4MUpKYUxYUEhxRFNVdGVfNFhKRV9Cc2F4bktHSC1ncXlxOG9PNnZpUTc2aEtHZURYLVJBa1ZiS2V5SHJsMzdYdjBUdXBIYkNaR0dGbzJwd2ZQSHVOQVE?oc=5"},
  {title:"Spurs XI vs Crystal Palace: Confirmed team news and predicted lineup - London Evening Standard", source:"Google News", date:"30 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi5wFBVV95cUxORGlxb1FFNWZ4b3ZXLWZTMjJzWDlMbXhsNFZ2cXBtV2RiZVJWd19lY2pmMGY1X3U2UDVQd2E4bWVfM1NxUkFqaGtDZjdiRXBZWllOa2trbm8yOEdvRGt4bUZzc09hTTR6YTlDaHVlTXFnRDZQbnI5SDRtaVMwOUdrLXEtT0diTXVkMHEwcnYyTE9oUmxEVHE3R3JWc2h5SlEwcklZOXViVzlZVVItZkgzWmVaVmd0b3FFRnJ0b21lTEtmdDM1WldpTVB6UkRxZExvUld6Y1dYUlVCaUR2cTAyQ0JCZGY2WGs?oc=5"},
  {title:"Tottenham Hotspur Get ‘Fairly Minor’ Injury Boost For Key Man - Inside Futbol", source:"Google News", date:"29 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMipgFBVV95cUxNUGpwSGVucUE4R3N0dDVzQ2JBTjFHVmJIUnF0cGFrRDdjcWt6S25UcXAyWVQ0c0xLSFpyWVZRN3B0T0NRVV9pVXZjdHI3aVQxaVY2QnBjbl9yWGxPUXRxOFlvUlRsUUZvYzBfOF95U1h5ajRNZFhOY0dxbzhkeVdtR0x1TmNrWGt3RG4zbzFBaGlXamhrWU16QVdpQV9jSXVjVDNwSVpR?oc=5"},
  {title:"Tim Sherwood says former Tottenham star should have played for Real Madrid", source:"SpursWeb", date:"29 Oct 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/tim-sherwood-says-former-tottenham-star-should-have-played-for-real-madrid/"},
  {title:"Tottenham transfer target Nicolo Tresoldi&#039;s goalscoring stats compared with Solanke and Marmoush", source:"SpursWeb", date:"29 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/nicolo-tresoldi-stats-how-reported-tottenham-target-compares-with-solanke-and-marmoush/"},
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
