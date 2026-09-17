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
  {title:"The Tottenham XI we want De Zerbi to pick for crucial Aston Villa clash", source:"SpursWeb", date:"17 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/the-tottenham-xi-we-want-de-zerbi-to-pick-for-crucial-aston-villa-clash/"},
  {title:"Tottenham XI vs Aston Villa: Confirmed team news, predicted lineup and injury latest for Premier League - standard.co.uk", source:"Google News", date:"17 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi6gFBVV95cUxQYWtVdjR4aUpueVRXVk9lLUVXTXgyMkR2dVkxVHgtbWZ4UWZjY0JpVUwtTGEyLXlfTE84TEJRYm9RdmhsSFRfWUFIZlZ1ZFVaeGF0VU9LVGM1azFLWFBEeUF1c0JjYWl1YzJHTGE3SXZjZFhsZmhhX2xqQ3ptN08yODh6ZE8xT3ExNVpLdTlLSTVSREswWDN4M1EwZVVkRXZWUTRfVnNnaHlDNzFxWDgzTUtnek9GNXBZSmNHRUUzSmZNeV9abkt4a0pPdWJBTURrQkJiS2hSUEptX0hkbG9fZnp0YmotcHZmUEE?oc=5"},
  {title:"Tottenham warned they have been victims of a costly &#8216;heist without a balaclava&#8217;", source:"SpursWeb", date:"17 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-warned-they-have-been-victims-of-a-costly-heist-without-a-balaclava/"},
  {title:"Three to watch | Crystal Palace Women - Tottenham Hotspur", source:"Google News", date:"17 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMikAFBVV95cUxQNUk4SUZPVjVpbFRMekhLenZsTVRCZlEtc1FVQzR2UXVJZExpUW1uUjlzOTNCUGZwX3BGZ1hRSFFYSlNZbU9Ja1NDRlhNb180bE92YW5qMk5GUTdqaExZM1dYU0ptdTlFVmw2cWpLV1AyRlFGM0dVeHJVc1JLVDJjSmpfRzZFc3dycmRockNSQ2w?oc=5"},
  {title:"Gareth Bale gives honest verdict on Tottenham, new signings and Roberto De Zerbi", source:"football.london", date:"17 Sept 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-news-gareth-bale-liverpool-34629964"},
  {title:"Richarlison rejected Tottenham exit that could have earned him £1.6m in just 6 months", source:"SpursWeb", date:"17 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/richarlison-rejected-tottenham-exit-that-could-have-earned-him-1-6m-in-just-6-months/"},
  {title:"Tottenham vs Aston Villa Prediction: Premier League Preview - Opta Analyst", source:"Google News", date:"17 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilAFBVV95cUxQdGVfcEd2ZDVfY2FVeXlwVk9GSnphX1dxZHJ2ZHp2N1dGSHBFcW42bzkxcjc1cGdaNG8zRU84SE1XOG0xeklMRHd0NkJaNFAzek9YTENOekVQYW11aERydm1NQW5JRFExWE5jR1FlRUt5LVFnYm9LZTJlV0lrTUYwUmNyRzZEWU1vUFp4amg1QWw5dFct?oc=5"},
  {title:"Grading every single Tottenham player this season, including one A and one F", source:"SpursWeb", date:"17 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/grading-every-single-tottenham-player-this-season-including-one-a-and-one-f/"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Thursday, September 17 - Cartilage Free Captain", source:"Google News", date:"17 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi3AFBVV95cUxOWVNDQWRVLUJyYm15M3hBUndzZ3VteFRWd1lFaUVGcWV2bHE0YXdUV2pWQ0dJbl9KR1hyWUsxbjlRTm1SdmQ1QzNGWUlYdTJCVHRoNU5IelhYUWotWm9sR2Q3ZDlrekdJSWJ2SzJZVUF0dEdoLUprV1JtdTk3Mm5LdUxUOGpaZ1hZZ2E2YXc0Q3I0ZWR0N0dzSDEwX0hwWm5qMFdYV3YxdkxKeVVoSEFsc3dIellsRG1QQ3RHS3ZrSkwzYl9sclZGaWJPbHRHV01VdUVCSFliVlNzYkZ0?oc=5"},
  {title:"Former Tottenham defender points out the clear flaw with Roberto De Zerbi&apos;s team", source:"football.london", date:"17 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/former-tottenham-defender-points-out-34628270"},
  {title:"Tottenham rub salt in West Ham wounds by poaching second highly-rated starlet", source:"SpursWeb", date:"16 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-rub-salt-in-west-ham-wounds-by-poaching-second-highly-rated-starlet/"},
  {title:"Tottenham eye £34.2m Mozambique international as January transfer target", source:"SpursWeb", date:"16 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-eye-34-2m-mozambique-international-as-january-transfer-target/"},
  {title:"Why Tottenham pivoted from Marcus Rashford to Mykhailo Mudryk despite Man United talks", source:"SpursWeb", date:"16 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/why-tottenham-pivoted-from-marcus-rashford-to-mykhailo-mudryk-despite-man-united-talks/"},
  {title:"Tottenham could battle Arsenal and Chelsea for totally unique Norway starlet after scouting trip", source:"SpursWeb", date:"16 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-could-battle-arsenal-and-chelsea-for-totally-unique-norway-starlet-after-scouting-trip/"},
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
