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
  {title:"&#8216;I am Tottenham&#8217;s fastest player until Mudryk returns&#8217;: Micky van de Ven says the stats lie", source:"SpursWeb", date:"13 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/i-am-tottenhams-fastest-player-until-mudryk-returns-micky-van-de-ven-says-the-stats-lie/"},
  {title:"Women's Super League: Best goals from Chelsea vs Tottenham Hotspur! - Sky Sports", source:"Google News", date:"13 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxOdTRPRzk2SHJwaF9uQzBueFpEeVZlUkpPcWdvaEhmYk1SVlBweFRnOFpCSWhmT0JzbFNmRWw1NlpIYW9SY25ITVZPamNleFBSQlpBTWlqMGMwaEtkSi1qS3dsQmdqdjJHc0RKdTVpeXZfd1NEeVo1Y3BNSDBpaUtENnA1ZFpWay11eHhERmVUY3Y5a203X0Q4RUk5bnJoNC15LUo4cXNTWk1SOUNoR2lBdjRVWFY?oc=5"},
  {title:"Man United and Tottenham track striker after stunning run of 12 goals in 14 games - LiveScore", source:"Google News", date:"13 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi6gFBVV95cUxNRGVVejZXNkY2M2ZJUzY3cWNUU2NpY1N6Y0JLNFNmc0Y5ZlNUMDZfQ0o4QmpJLUttY0o1OWJ2Q2o4Q3NON1o3RENtdm90Zk5WN2hIUGdQbkwzYVZHQUtKaThJejhSZjFLdWpqRlBpTExaX1dqYXdtQ0dtcXItRjZkaHJsZ2V2blVpWDJMOGZMN0JKdjVyS1JBS3JKNGo2UHRXN2hRYm5OU3ZuMGxzNVp0NWNlXzlBLXh0dWUxUTZWdnVjQXludmI1TXd0UXNfaUZ4dzlCOE1ITi10TGgxeVN2WXFuWnRSZVdtVXc?oc=5"},
  {title:"Toby Alderweireld reveals why he felt &#8216;strange&#8217; after iconic Tottenham 3-2 Ajax win", source:"SpursWeb", date:"13 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/toby-alderweireld-reveals-why-he-felt-strange-after-iconic-tottenham-3-2-ajax-win/"},
  {title:"Tottenham&#8217;s attack is about to explode and the dribbling stats show exactly why", source:"SpursWeb", date:"13 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-attack-is-about-to-explode-and-the-dribbling-stats-show-exactly-why/"},
  {title:"Andy Robertson vs Destiny Udogie: Who should be Tottenham&#8217;s first-choice left-back?", source:"SpursWeb", date:"13 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/andy-robertson-vs-destiny-udogie-who-should-be-tottenhams-first-choice-left-back/"},
  {title:"Tottenham think they have the next Cole Palmer coming through the Hotspur Way ranks", source:"SpursWeb", date:"13 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-think-luca-williams-barnett-could-be-the-next-cole-palmer-after-de-zerbi-backing/"},
  {title:"Tottenham warned they could be about to lose another £75m in sponsorship revenue", source:"SpursWeb", date:"13 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-warned-of-75m-sponsorship-loss-if-poor-form-continues-after-aia-exit/"},
  {title:"Thomas Frank lined up for return to Premier League eight months after Tottenham sacking - The Sun", source:"Google News", date:"13 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMimwFBVV95cUxQRlFvRWNwM1JrbTNrT3R4czJmZVFPM01rTVpTaEJRaDlXZFNRcWRjRl9PVjVLaDEzdFB3eGJhQ21fUFVxVlZ6b0xRWUo3UEpkVmNjbFZXVGdrSks5ZTdnMk5GVE9XeWxIbXNWM3VwRVZNYk5MRExfbGMzdFFGVG9IX3Jxb2k0RVdHMVY4Ul93QThoZF9LYThsTkNNSQ?oc=5"},
  {title:"How Dominic Solanke feels about his Tottenham future as Spurs search for new striker", source:"SpursWeb", date:"13 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/dominic-solanke-determined-to-stay-at-tottenham-as-de-zerbi-hatches-new-striker-plan/"},
  {title:"Video: Tottenham&#039;s Yang Min-hyeok scores first Westerlo goal, and it&#039;s a corker", source:"SpursWeb", date:"13 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/watch-as-tottenhams-yang-min-hyeok-scores-first-westerlo-goal-and-its-a-corker/"},
  {title:"Five Tottenham squad changes we expect De Zerbi to make vs Coventry as Kulusevski returns", source:"SpursWeb", date:"13 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/five-tottenham-squad-changes-we-expect-de-zerbi-to-make-vs-coventry-as-kulusevski-returns/"},
  {title:"Tottenham&#8217;s hardest-working players revealed as three surprising names top the stats", source:"SpursWeb", date:"12 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/we-analysed-the-stats-to-find-tottenhams-three-hardest-working-players-under-de-zerbi/"},
  {title:"Tottenham make £85m 14-goal striker their &#039;top priority target&#039; for January transfer window", source:"SpursWeb", date:"12 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-may-have-their-85m-richarlison-replacement-in-14-goal-vangelis-pavlidis/"},
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
