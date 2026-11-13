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
  {title:"&#8216;Very humble&#8217; &#8211; Luka Modric looks back on his time with Harry Kane at Tottenham", source:"SpursWeb", date:"13 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/very-humble-luka-modric-looks-back-on-his-time-with-harry-kane-at-tottenham/"},
  {title:"Graham Potter keeps Tottenham injury plan promise with Dejan Kulusevski decision", source:"football.london", date:"13 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/graham-potter-keeps-tottenham-injury-34907223"},
  {title:"Destiny Udogie is closer than ever to leaving Tottenham - LiveScore", source:"Google News", date:"13 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiwwFBVV95cUxPQTRndkpsR1hpS1hVZ1I2WmFVbTZDNGpRbVBfSnpCRXRjYmR4X0dvcGdfZjMyMkh6cWJpT2RULVpmR1dFcEdLcW80eG1qZjRKQzc0c1ljRjZLS0hzRC1ydDVxZWhsbEJpZVN4UVpsR2dIRW4yeEI0YlFlbE42OXlaOXdoLV9YM2YteHhqSEtFRC1DdHZzQlF2QWhnVHU1cTUwSW1xLVRtRmlrYVpMdG9hTWtNUG9GWmdzNHgwdzFOcGdyU00?oc=5"},
  {title:"Roberto De Zerbi picks up prestigious award, but Tottenham fans may fear Nuno curse", source:"SpursWeb", date:"13 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-picks-up-prestigious-award-but-tottenham-fans-may-fear-nuno-curse/"},
  {title:"Tottenham star Archie Gray receives big offer to switch international allegiance", source:"football.london", date:"13 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-news-archie-gray-scotland-34907339"},
  {title:"Xavi Simons provides new Tottenham injury update during &apos;dream&apos; visit to Netherlands camp", source:"football.london", date:"13 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/xavi-simons-provides-new-tottenham-34906344"},
  {title:"De Zerbi wins October's Premier League Manager of the Month - Tottenham Hotspur", source:"Google News", date:"13 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMipwFBVV95cUxOeFpCUHlDTC1tb0FtUlYwV2YwQkVxWTd6ZlA3SmtaTUNUUEVsTzJSZl83VUttUGtEaEVxMEdHNzNSLUZyelVBdXNzeUx1QXg5NjQ4TE1ZY1lTX0dpVUwzb0liQlp5d05kaTUyTFBaUTU0TVRVVHJiNFpKa25UQi10RTRsenJrNlQ3d2RMa1ZqMlBXZFplc1FVaTFNOUFRd19tUmJnb3RuMA?oc=5"},
  {title:"Five Tottenham players who could benefit most from November international break", source:"SpursWeb", date:"13 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/five-tottenham-players-who-could-benefit-most-from-november-international-break/"},
  {title:"Tottenham ready to consider drastic decision amid Mikey Moore&#039;s Köln struggles", source:"SpursWeb", date:"13 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-ready-to-consider-recalling-mikey-moore-amid-koln-loan-struggles/"},
  {title:"Jan Paul van Hecke reflects on Tottenham start and reveals Roberto De Zerbi&apos;s role in transfer", source:"football.london", date:"13 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/jan-paul-van-hecke-reflects-34905602"},
  {title:"Tottenham Hotspur's Tyrese Hall wins PL2 Player of the Month for October - Premier League", source:"Google News", date:"13 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiuAFBVV95cUxOV2ZmOUtmQ0x5bjRrVFEyMGZmUlBGejJBRXNmal85QmV2SVc0UmFrenBXdUwtNUdVOU1lU1Z2YXRlTDNtalk3Tkp3UHlROFBSV3gyZVkyUThUR25EYnpDTERGZll5cmIweldDS1l1UlluTVprNmFNLVZDUGp6cDgwZHdYczREek82NEdOZ0JQcHhXU0ZiV2ZnQ0lFOXNPTzlnYkJmLXF0SlFmVmhtWkw0dmwtVWRfUWMt?oc=5"},
  {title:"Vinai Venkatesham may be bang on about Tottenham&#8217;s medical overhaul ahead of mass returns", source:"SpursWeb", date:"13 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/vinai-venkatesham-may-be-bang-on-about-tottenhams-medical-overhaul-ahead-of-mass-returns/"},
  {title:"Viddal Riley: “When I step into the ring, I’m representing Tottenham - I want everyone to know that's where I'm from” - Tottenham Hotspur", source:"Google News", date:"13 Nov 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMi6gFBVV95cUxOVk5UUlB0ZF94eV9vR3Z5N2hFQzRpd041c0djNWpyUjc1N0tuSHl4MmFvcHNpNHBWLXlyRGlRUnE1elZrN3BfVVBIVE1sczVrT0RudVl6WThGd192Q2p5bHc0cU5nY2N3OFl6VnpkZmNDemdmM2cza1phVi12bEQyQlp1T0hYazFGcG55Zk0yY1lVdmJCUXZ0YXQzVVpiOUR2b09xX29qQ0xTcXlZZ3JIWGdEZlVaZkx0UEhpWEx6T0FOMGJTbmVfSDZBM2dhSHp2Y2cxRzBQa1hmUTRpdUlzSUFEVGlrVEpzc0E?oc=5"},
  {title:"&#8216;All in one place&#8217; &#8211; Antonin Kinsky was astonished when he arrived at Tottenham", source:"SpursWeb", date:"13 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/all-in-one-place-antonin-kinsky-was-astonished-when-he-arrived-at-tottenham/"},
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
