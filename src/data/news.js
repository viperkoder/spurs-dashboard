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
  {title:"Tottenham sign Marmoush on loan with obligation to buy", source:"Sky Sports Spurs", date:"27 Aug 2026", tag:"Official", url:"https://www.skysports.com/football/news/12040/13577796/omar-marmoush-transfer-news-tottenham-sign-man-city-forward-on-loan-with-60m-obligation-to-buy"},
  {title:"Wantaway £35m Tottenham star could link up with Eric Dier after late loan talks", source:"SpursWeb", date:"27 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/wantaway-35m-tottenham-star-could-link-up-with-eric-dier-after-late-loan-talks/"},
  {title:"Tottenham transfer news LIVE: Gakpo deal next, Marmoush squad number, £10m offer made", source:"football.london", date:"27 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-transfer-news-gakpo-deal-34523875"},
  {title:"Tottenham in Three-Horse Race to Sign Giant Striker Despite Marmoush Transfer - GiveMeSport", source:"Google News", date:"27 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMikAFBVV95cUxQTzB1N1REemtSLWFkVjdnanhqYm01VzVDNjN3YWZuZzlqNnF3dWlKVnBtcHVRWE1DRmVMdC13Zm5iMWdNa0RGb3FCRk8yUDZ2YnNyMWY0TGlzZGgxcXVWbGE0MnN3LVhBaUpvd3RmQnBMcF9kT1VQdGdyUGR1MWNxR0lXNzlEdDBLT2hkT2lhZHc?oc=5"},
  {title:"Spurs still paying price for a punishing World Cup and pre-season trip to Australia - The Guardian", source:"Google News", date:"27 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxQMmRVYXJ1Zmdrall2b01nbDE5NGNJMExKaklkN1QyNlJoaUhlVUhuTGFYV290Q2pucTVEVlIxZU81TzNmTjl3VUZIVERHaVVtWGxWM3VuQm9qdE5ORDRGWUduNDVEbG9GeVhiUFBkSDBJLUJhSXZ5R3hWMlA5c3pNblVBQl9LelJsdXBqNFlGRU80bjJuVHpHb0FKU3lqT2pDTE0wMw?oc=5"},
  {title:"Fabrizio Romano pours cold water on Tottenham making late move for World Cup winner", source:"SpursWeb", date:"27 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/fabrizio-romano-pours-cold-water-on-tottenham-making-late-move-for-world-cup-winner/"},
  {title:"Rafael Leao gives clear response to Tottenham and Aston Villa interest amid £51m price tag", source:"SpursWeb", date:"27 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/rafael-leao-gives-clear-response-to-tottenham-and-aston-villa-interest-amid-51m-price-tag/"},
  {title:"Roberto De Zerbi reveals five things Omar Marmoush will bring to Tottenham", source:"SpursWeb", date:"27 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-reveals-five-things-omar-marmoush-will-bring-to-tottenham/"},
  {title:"Omar Marmoush transfer news: Tottenham sign Man City forward on loan with £60m obligation to buy - Sky Sports", source:"Google News", date:"27 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi5gFBVV95cUxQbGhnY0hqTDFhaXpkNXVUU2FTRnZ4NkIxQXFja0ptcmlBM0hzeGxVeEJZdjhwREdhelNQRTU4QkJKbmU2V29oS2VqWndmaUcxcE9VMnQ3d2xjMUVaVTRIWC1qaUtTbFhtZkRLOHhURzIzUG1uV0pUVWFsbWMxU0U5ckZWZGNQQ19TRWZYOGd4dEg1cWE2MHBnR0xuMXB6cWJCaDJ1dVFLQ3pYdjhLOU5EaGtlWGQweTdpU0o5Q0JuOVotTnlFd0lqYlhrSlZabjVfZW9pT3JsM2RkbjZNMWs5b2FGUTR1QQ?oc=5"},
  {title:"Omar Marmoush reveals why he chose to join Tottenham after £60m announcement", source:"SpursWeb", date:"27 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/omar-marmoush-reveals-why-he-chose-to-join-tottenham-after-60m-announcement/"},
  {title:"Tottenham sign Man City's Marmoush on loan", source:"BBC Sport Spurs", date:"27 Aug 2026", tag:"Official", url:"https://www.bbc.co.uk/sport/football/articles/clyj50j91xgo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Omar Marmoush: Tottenham sign Manchester City forward on season-long loan - BBC", source:"Google News", date:"27 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiakFVX3lxTFBWMjdIRlBDdDN6dWk2TkhIeXlEOHUtbWtGdGMzNXI2ZkVTNGV5blQ1VjZla2dLVTJMZjZESmZrOXk5Nnp3MVBBRC0yTHpIaGtJMmFrcVRhdjYybmFNUDF5Q2ZobkhyeGdXYlE?oc=5"},
  {title:"Omar Marmoush&#8217;s Tottenham shirt number confirmed, once worn by Robbie Keane", source:"SpursWeb", date:"27 Aug 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/omar-marmoushs-tottenham-shirt-number-confirmed-once-worn-by-robbie-keane/"},
  {title:"Transfer latest: Liverpool closing in on deal for Bradley Barcola, Omar Marmoush joins Tottenham on season-long loan - BBC", source:"Google News", date:"27 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE8tbTJiUnFoWGVvUkE4SWdVSlhOUElRcXVnS3V1cHZ3d1VaWU9VaXlJcVhBel94Z3ljTHk0X1FlMDljUjFjMkVNWWFLREJPRDZlLVdhWHRTZlRIdzJsX2VkT0t4YktTQQ?oc=5"},
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
