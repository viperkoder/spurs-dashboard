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
  {title:"Tottenham could face Thomas Frank reunion as manager &apos;warning&apos; sent", source:"football.london", date:"21 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/thomas-frank-tottenham-crystal-palace-34795354"},
  {title:"&#8216;They know who I am&#8217; &#8211; Dejan Kulusevski says Tottenham is starting to feel like home", source:"SpursWeb", date:"21 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/they-know-who-i-am-dejan-kulusevski-says-tottenham-is-starting-to-feel-like-home/"},
  {title:"Spurs vs Manchester United, Women’s Super League | Ticket Information - Tottenham Hotspur", source:"Google News", date:"21 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMisAFBVV95cUxNbGR3TW9iUHZnWm9HSUs3TVNZTmNnMml2aVJBRHhrMmJHRjZtdFAycmVfUzAxaWJjMnY5RDVGdGFGYzdzZVFMaFFZWmZpZkEySzgwbUN5RDkyQUstWGtnMVdTNWJVX2h0OWpyNUNfc0JmempnX2dpTXZTdUVJbDJ1d1FldkFGRGJ6dEptTVVyTGJsWjkyUllGbGhRQkVHNU15LW93T0otQlhkbFM3WkRiVQ?oc=5"},
  {title:"&#8216;Absolute toilet&#8217; &#8211; Jamie O&#8217;Hara tears into Tottenham star despite win over Coventry", source:"SpursWeb", date:"21 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/absolute-toilet-jamie-ohara-tears-into-tottenham-star-despite-win-over-coventry/"},
  {title:"Tottenham expected to receive big injury boost for huge Chelsea clash - Hotspur HQ", source:"Google News", date:"21 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMijAFBVV95cUxOZEU4Z1g3dDk5emoxMVl1dnBCclJhczR2dVVKcldIdXNaMVRHdjdfb0JWZ2piT3R4SHpfTnEteFZjLVpjOU5mOUhoSkxQa3BIanRYY2pnU1BCZDBSbGtJVVMtT2lnMC04Zkpxa0U4dlJ2bFFuWVdhTlJadk5XVTNSc3pJeHUtWE9VZVFnVg?oc=5"},
  {title:"Tim Sherwood predicts where Tottenham will finish in the Premier League compared to Man United", source:"SpursWeb", date:"21 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tim-sherwood-predicts-tottenham-will-finish-above-man-united-in-the-premier-league/"},
  {title:"Tottenham&#039;s three-goal Coventry win masks a concern Roberto De Zerbi cannot ignore - Opinion", source:"SpursWeb", date:"21 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/tottenhams-three-goal-coventry-win-masks-a-concern-roberto-de-zerbi-cannot-ignore/"},
  {title:"Poll: Should Dejan Kulusevski start against Chelsea after making emotional Tottenham return?", source:"football.london", date:"21 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/poll-should-dejan-kulusevski-start-34794551"},
  {title:"Tottenham star makes Team of the Week to give De Zerbi a Chelsea selection headache", source:"SpursWeb", date:"21 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-star-makes-team-of-the-week-to-give-de-zerbi-a-chelsea-selection-headache/"},
  {title:"Spurs urged to make immediate move for €18m-rated star outscoring Kane - talkSPORT", source:"Google News", date:"21 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxPZkZucHA1UGFvZGpQNTRhNnpXSVlTbzd5SFBCanpWMzFibk9oZFh4Y25Ia3hfdjVSWklXOFlKXy1YT0pfd3dOM01FblJnWHloVDZFN1UxbWFSMHFFaXNmYzFUaFlYZHVCd2FiZXRrX2VsaGYtWG5oaGZENnh3blcybDdvMTI3X2pKNHJMazBPb0cwWVVRRmxkRw?oc=5"},
  {title:"The ironic thing Roberto De Zerbi unwittingly told reporters after Tottenham win - Football London", source:"Google News", date:"21 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilwFBVV95cUxNQkJROW5Wc3BsQmVCRXBJdXluVjNTZ3BLQkxSY2Y3a1M1b3ZqTzFuREw5NEpsMjNBNDFmQmNoUThIU1ptQldmZWlUNzJ0enVjSmd3aGxOeVFSV2pQUW9pZWh6dkFXWEJMcnFIVmNQWDRkUXZqRGhZaTg2ZVBtdFF1TUV2VmswM3V0TkhpZ2NtOXg0bERNOXZB?oc=5"},
  {title:"Five things we noticed about De Zerbi&#8217;s Tottenham squad choice vs Coventry that you may have missed", source:"SpursWeb", date:"20 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-things-we-noticed-about-de-zerbis-tottenham-squad-choice-vs-coventry-that-you-may-have-missed/"},
  {title:"Jamie Carragher notices deep-rooted concern for Tottenham despite win over Coventry", source:"SpursWeb", date:"20 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jamie-carragher-notices-deep-rooted-concern-for-tottenham-despite-win-over-coventry/"},
  {title:"Frank Lampard says Tottenham got lucky with key decision on Monday", source:"SpursWeb", date:"20 Oct 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/frank-lampard-says-tottenham-got-lucky-with-key-decision-on-monday/"},
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
