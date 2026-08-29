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
  {title:"PL Predictions: Back Spurs to bounce back against Newcastle", source:"Sky Sports Spurs", date:"29 Aug 2026", tag:"Club", url:"https://www.skysports.com/football/news/12040/13577786/premier-league-predictions-jones-knows-best-bets-crystal-palace-pain-man-city-to-make-it-back-to-back-wins"},
  {title:"Spurs agree deal with medical booked amid talks over Sarr exit - London Evening Standard", source:"Google News", date:"29 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxNSUJ2UVVYWFAtLW45dG1RRW1qeVZZdEdNQ2t1V1pvS0ExWFBNZm84WFFCVmNheTl6OW5hbVhOZ0hpUnVMSXp5RkR4NUw2WVlXOVE0MDZIUnhmOHdleVFHdnl3RUgtak1lQmlpYkVuRGxNUHJiMmFHaUdsUE5fYlYwdWR1dGkyUFdxQ0Q3OGFRV3VXVXRKM3NHZWcxNkFLakpZ?oc=5"},
  {title:"BBC: Spurs reject Sunderland loan for Kevin Danso - Cartilage Free Captain", source:"Google News", date:"29 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi7wFBVV95cUxOdkFfbnZVbXJRQ0kyc3RXbkxZMkFvSC1Eekx0Rjd5WHpmSmhZeU8xSmpkajNLeFk2VGhjeXM4LWF0T0Nmc1FaVlFpRFJjRUZoYnFLMWVYSTZYM0QxYjRIWHRieW1CdnZRdXdhaVZ2enJMNEZad0RqVGNrRGlZdmt6VzNCWnllLU5wYW1KVTZDYjRvb2ExajZXdjg4WEdsZFRTM19RNTJTVUJNc25BcExaMDJ3ZG1zbjJsTU9idXpIMmVDcGlQVHRlMHFHSHdZa3M4cW1YekJsSlN5dFFHNUt6V3FrVUlONWd2Snpad3ZGSQ?oc=5"},
  {title:"Tottenham reject Danso loan move to Sunderland", source:"BBC Sport Spurs", date:"28 Aug 2026", tag:"Club", url:"https://www.bbc.co.uk/sport/football/articles/cp3knknq5neo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Official Spurs Website - Tottenham Hotspur", source:"Google News", date:"28 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE5yZUNnampWTHlHR0pVUVlsT25SLTBNa1pHbHd3Qi0zZ2lEZHdhUHFLLThQVFhVaHFvREdXZDNwTVNfSFhSdGZFNWZ1MG5rVEZjZWJrSTlnYkZ1UFVPRWtVeHJ0NzE4Zw?oc=5"},
  {title:"De Zerbi opens up on transfer dinner with Tottenham owners and big Kulusevski update", source:"football.london", date:"28 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/de-zerbi-opens-up-transfer-34535109"},
  {title:"De Zerbi wants one more signing for Tottenham before transfer deadline - The Guardian", source:"Google News", date:"28 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxQUThtSExERV8yYmZSRWI2VjlxVTJrTVgzTUEyYVREQVVlRS1SS3FnbmNrdHdmTUdPMW1qeXEtdDNEUnRKejFnUXZjeG9mWmJCZDF3cDZXVzFyV00yaFl5SzlBX09CdjdFWFZ2WkVmNWNtQnU3NTFWbjlEYkFHYTZVWE8zZVE0dkZTQzItUkNoTExEaWowMmRNcmxNR1cxVS1FclhtR1ZVN25lMG9kdHZKU2RtY3VhZw?oc=5"},
  {title:"&#8216;Counter attack kings&#8217; &#8211; Chris Sutton predicts tight Tottenham vs Newcastle score", source:"SpursWeb", date:"28 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/counter-attack-kings-chris-sutton-predicts-tight-tottenham-vs-newcastle-score/"},
  {title:"Tottenham vs Newcastle referee revealed after controversial 2026 North London Derby", source:"SpursWeb", date:"28 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-vs-newcastle-referee-revealed-after-controversial-2026-north-london-derby/"},
  {title:"Tottenham: Roberto De Zerbi delighted with Spurs transfer business after dramatic Premier League survival last season - Sky Sports", source:"Google News", date:"28 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMigAJBVV95cUxOeDl6cUpQcEo4c1dJeC1XQy0zd0dZSTB1VTRidV9uN2FDSmpqTWF5OTVLTF9uNHlrZmdFU09TcFBQZU90RldMblRnNUxvSmRGM3haNXA0ZE1RcmJ0RHk5bUFtNE5uSEJLUk8zRlFsdlJiUFVwSjZSLURwWUc0eXBsb3ppZU5xMTVJTFhGMzR0VXdmY1NLbHhjckRuVWZVcVhWQThmTnF5dklYMEE1NzNPdW9NaDhDT0dIU0U3WnIwb1NUdHBMekpqeEFNX3dtd3BhelZISmVMS2FyZU5GMTd1dFROUVM2V2NXa1l3UGVwY2R5Yl93Q3hoLW0wZTFXRHB4?oc=5"},
  {title:"Tottenham fans will not like Alan Shearer&#8217;s score prediction for Newcastle clash", source:"SpursWeb", date:"28 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-will-not-like-alan-shearers-score-prediction-for-newcastle-clash/"},
  {title:"Tottenham XI Roberto De Zerbi must pick vs Newcastle as Savio and Omar Marmoush start calls made", source:"football.london", date:"28 Aug 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-lineup-savio-marmoush-newcastle-34535084"},
  {title:"Predicted Tottenham XI to face Newcastle as Savio makes his full debut", source:"SpursWeb", date:"28 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/predicted-tottenham-xi-vs-newcastle-premier-league/"},
  {title:"Tottenham explore late Jean-Philippe Mateta move as bargain price tag is revealed", source:"SpursWeb", date:"28 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-explore-late-jean-philippe-mateta-move-as-bargain-price-tag-is-revealed/"},
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
