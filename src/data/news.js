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
  {title:"Tottenham have a new fastest player after 35 km/h barrier is broken against Man United", source:"SpursWeb", date:"12 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/omar-marmoush-is-tottenhams-new-fastest-player-as-sandro-tonali-enters-top-three/"},
  {title:"Daniel Levy sees his ENIC shares dwindle after Tottenham owners inject £120m", source:"SpursWeb", date:"12 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/daniel-levy-sees-his-enic-shares-dwindle-after-tottenham-owners-inject-120m/"},
  {title:"How many games will Rodrigo Bentancur miss for Tottenham after red card?", source:"SpursWeb", date:"12 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-many-games-will-rodrigo-bentancur-miss-for-tottenham-after-red-card/"},
  {title:"Manchester United 1-1 Tottenham Hotspur: player ratings to the theme of Spooky Season songs - Cartilage Free Captain", source:"Google News", date:"12 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi9gFBVV95cUxOOVY3UUc1N25nQ3lkZnRpSmdEckl1U29ZcjJLbkJLVHFxWGlSZ0duYVZrTkZiM21aZUVhc1hOck1HTHhPaElRMy1yNWV6MmhSWGEwdDhBVndiSWxjOFp5WTRNc09VUHJpVTlCVURqbWF3eEZSV2VDOWFadkVIZmVSU2pwX2JmcFRfVE8wbkFmRTFmYktobVpmMnZ1MmxnMktUM09xZ0NiRDF6QnBwaE1NTVlGUFJrNzktcllOTnV6SnFvcDFQcW9GZ20wakxYU1ZuNnhyMXNqLVVycGt3dGltcEt1WE5MNzlMOGZUME84a1pNUEFkSEE?oc=5"},
  {title:"Tottenham keep an eye on loan move for Real Madrid star who has played just four minutes", source:"SpursWeb", date:"12 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-monitor-endrick-loan-as-real-madrid-make-january-transfer-decision/"},
  {title:"Tottenham want £25m Roberto Fernandez as Espanyol director confirms release clause", source:"SpursWeb", date:"12 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-want-25m-roberto-fernandez-as-espanyol-director-confirms-release-clause/"},
  {title:"Rodrigo Bentancur agreement reached as Tottenham sent clear verdict on Man Utd red card - Football London", source:"Google News", date:"12 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMinAFBVV95cUxOeXAtSkVOYUJ5ZUN3em01VnBadWk5QXAtWGNOU29sUjJiY2dVaUx0a01GbVgySHY5ZWs4c3EyeVItaGd1OEJXNmtTQ20zVS1fbEVRNnVtbk9BN3dsSUVWVHVadmdSVm5TVWtjNERXdUZyd2dWa25rRVN5U19DY1p2ZnQtY1dUSWVDV2ZHSjdSMnpQWFZOTzBnd1ctbDHSAaIBQVVfeXFMTkY2YWQtVzJUYjI2dmRoX0dFVGs5UjJtNVlxcHF5d21JQXB3NmIzdGlRejB3NHc4cHBGWlU3N0wwbTd2X0NCbkhNZmFTdkFTMXA2SUZ6ckI2cmpkM2FGY1F2UUNhczhXM2phVTFlSVJ0M1Rhcmo4VjNtbWJZUGVsRkp4bXNfcGFScEFNV1pNcHJuR1BxcnF2S2IzdnlBYnpxUzlB?oc=5"},
  {title:"Tottenham battle Hull City for £12m striker who Heung-min Son recommended", source:"SpursWeb", date:"12 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-battle-hull-city-for-12m-oh-hyeon-gyu-who-heung-min-son-recommended/"},
  {title:"Sol Campbell fans the flame after pleading with Tottenham fans to forgive him", source:"SpursWeb", date:"12 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/sol-campbell-fans-the-flame-after-pleading-with-tottenham-fans-to-forgive-him/"},
  {title:"Lewis family increase Tottenham stake after £320m injection as Daniel Levy share shrinks", source:"football.london", date:"12 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/lewis-family-increase-tottenham-stake-34751736"},
  {title:"Chris Waddle issues warning to Tottenham fans about Dejan Kulusevski return", source:"SpursWeb", date:"12 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/chris-waddle-issues-warning-to-tottenham-fans-about-dejan-kulusevski-return/"},
  {title:"Manchester United: Viral clip shows Spurs beat the press at Old Trafford - and exposes other issues - Sky Sports", source:"Google News", date:"12 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi3gFBVV95cUxPWWluRkZNWFUxZG1ZYTQtV0JhSnVLM2sxQkhSR0IwYW0xbF9JV1NNeGd3amFsdzNpU29INWpqWFZwMmlESFRUZFQ2UGhuc2psRVFZT1dJekhsdC1VMm55Y2Ezbm1ocmI4RnNMRE1aTDFZWFoxeGpveThRS3VqYUpnMFRxcDRndTRDbDA3NF9UeHJUQTBiWkVGRFVqN3U3VzFqbjExM1B1ZjZDbC1mVWx2WVk5ak1Sa252OG85QmdqU0xmTVRzV3hhQkdiZjRZdXdzc1ZtUWwzZlZnN1NHcUE?oc=5"},
  {title:"NFL star delivers verdict on Harry Kane&apos;s future career in American football after Tottenham drama", source:"football.london", date:"12 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/nfl-star-delivers-verdict-harry-34751247"},
  {title:"How much money Tottenham may generate from record-breaking NFL Sunday - Yahoo", source:"Google News", date:"12 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiiAFBVV95cUxNY3o5Nm5wSHlGdVRkSWVGWlJwUnNzSXplNGkyc0JkeUhSRXI4djliNHJBQ29IbUMzUkNJbWxqUTZwbk9sdDhLQUxoeGhBd2FOUXpsQjZ6X0J3TlVaUTN2dWIwZVd0QnNWLWVXcks5MWtmM2t6V0pOeGlGVDcyX3pwSWs2UVJVYk1Y?oc=5"},
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
