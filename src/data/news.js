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
  {title:"Mauricio Pochettino wants to beat Tottenham to a striker with 19 goals already this season", source:"SpursWeb", date:"21 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/man-united-and-tottenham-go-head-to-head-in-vangelis-pavlidis-battle-83m-release-clause/"},
  {title:"Roberto's latest on Savio's injury - Tottenham Hotspur", source:"Google News", date:"21 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMihAFBVV95cUxPSjBuRUVjWkNjQk0wS0VNakhqZXpub2VkUW1Pd1F1STBadEpjOUNvVVNtRGlnNThpRWNaWWdTNlVsc05EbkpZWG1OdzVkdFFhalp1NDdBQjZuTFdJVUpDbWR5TVE1UGVKWGtZaU5MQUNYbkZXc3ZyUFViYl9lNFNfdDRsc0Y?oc=5"},
  {title:"Tottenham 2-0 Ipswich: Teenager Luca Williams-Barnett scores on first Spurs start as 18-year-old shines - Sky Sports", source:"Google News", date:"21 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi2AFBVV95cUxORHpoR2Vua1EtQUdoZ2Q5RnljWU9VM0lkRTk0WDQ2MzZ1YnpZLWxzVWlCMEp0TGtwTW1kVURDU0dsTk03bDQ4a2x3Vi1uOU9GYlZoRm14WUt2QXdCMzFUY19DU1RKNmZib2NfY3VfS29jdGJvY2hqdGF2WnhNX2NNT3piU0tmR2RXcDB6QkltX2JVaFRZNk9ZVjFhbG45TE5BT1dtR3BhOXlSR2psZnRLWFRqLURwRWdfeFhHQ2g4Z09zbDZMdTFCVVZ2M29HV0lLcmNqNG5mRTg?oc=5"},
  {title:"Tottenham Hotspur 2-0 Ipswich Town: Gary O'Neil post-match interview - BBC", source:"Google News", date:"21 Nov 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE1ON09kVzR2OS1Tb05pclZzOGJrcEtNckhNek5ZeDJrYVFEODA5ZkdsUUpLYW90M3NpQnFDeWIzNmtIM2FXOXpHUXpqN2lxTmNmYmtrQklMMlNNLWtQU3RkOTNXc2gwUQ?oc=5"},
  {title:"Tottenham 2-0 Ipswich: Five things we learned as Williams-Barnett shines", source:"SpursWeb", date:"21 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/tottenham-2-0-ipswich-five-things-we-learned-as-williams-barnett-shines/"},
  {title:"Liverpool and Newcastle join Tottenham in six-horse race for £35m Gustavo Varela", source:"SpursWeb", date:"21 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/liverpool-and-newcastle-join-tottenham-in-six-horse-race-for-35m-gustavo-varela/"},
  {title:"Roberto De Zerbi ‘very angry’ in Savio injury update after Tottenham star left in tears", source:"football.london", date:"21 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-savio-injury-news-ipswich-34948475"},
  {title:"Every word Roberto De Zerbi said on Williams-Barnett, Yamal comparisons and Tottenham injury blow", source:"football.london", date:"21 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-every-word-de-zerbi-34948518"},
  {title:"Tottenham Hotspur 2-0 Ipswich Town | Premier League highlights - Sky Sports", source:"Google News", date:"21 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirwFBVV95cUxORmc2OVM0VklIZ2pyMVhUakxPNGpZWGlhQUt4TmVnODhubXZLektKaVFxLW5GNEhRTm9ndUZ0MkRKUkxxQ3owcENqUGxtTnZLRFM0Q3VoR2lXV2kxMGNFNnJTclVqYzB0Mi1wLWp5QUdxN0hpQUNUS3laQlRPQ3VXV1BuX3k3c2J0WGFFM3JqbWV2bmZ3VGE2YlQ1bjI3dTJjMGExS0QyQzVNaDhEMGRv?oc=5"},
  {title:"Tottenham vs Ipswich Town highlights: Williams-Barnett and Solanke score as Savio injured", source:"football.london", date:"21 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-vs-ipswich-town-live-34934031"},
  {title:"Luca Williams-Barnett deals second blow to Mykhalio Mudryk in days as Tottenham fans furious", source:"football.london", date:"21 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/luca-williams-barnett-tottenham-mudryk-34948137"},
  {title:"Tottenham player ratings from 2-0 win against Ipswich Town &#8211; 9/10 dream first PL start", source:"SpursWeb", date:"21 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/tottenham-player-ratings-from-2-0-win-against-ipswich-town-9-10-dream-first-pl-start/"},
  {title:"Tottenham player ratings vs Ipswich as Luca Williams-Barnett brilliant and three 8/10s shine", source:"football.london", date:"21 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-player-ratings-williams-barnett-34948176"},
  {title:"Tottenham first-half player ratings vs Ipswich Town &#8211; 8/10 winger catches the eye", source:"SpursWeb", date:"21 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/tottenham-first-half-player-ratings-vs-ipswich-town-8-10-winger-catches-the-eye/"},
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
