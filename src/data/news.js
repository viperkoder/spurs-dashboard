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
  {title:"De Zerbi admits 'we're not a team yet' as Redknapp labels Spurs 'strangers'", source:"Sky Sports Spurs", date:"23 Aug 2026", tag:"Interview", url:"https://www.skysports.com/football/news/12040/13575888/roberto-de-zerbi-tottenham-boss-admits-were-not-a-team-yet-after-new-look-side-suffer-dismal-brentford-loss"},
  {title:"Transfer news LIVE: Liverpool get Barcola and Mbaye BOOSTS, Savinho to Spurs - The Sun", source:"Google News", date:"23 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiogFBVV95cUxQc05lcTlLMUNYb3NfUUlqNmk3Z3hETnp1bmd1TmhhczlhOUtSbWxfVEZUNW1pQ1FoaGhNd0t1NWFiREZDWVFxRXJGSE8wSEdOMGR6cGlHN3UxRWU1X2RqSHRzSlJIbmtLV1lyeE5CUHpFSEdBX0tmVW5kdEtEbW5SWmFVX1prZHZoTnRFWENZdWZYM3pVa2lGWl9iMjJXeWJqa3c?oc=5"},
  {title:"Brentford 3-0 Tottenham: Spurs make nightmare start - BBC", source:"Google News", date:"23 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiZkFVX3lxTE5DaHB6T0VNNVlfdzBmT2ZEU3AwNE9YeUNQQlZqcFFFdXRDY19Fc3JvYVlhVVdMTThDOTJpdzdibnl1djkxV3NiTzhCLXZ1YUQwR1RqRXBwWE5kYlB0eFc3TDlYZThrQQ?oc=5"},
  {title:"Brentford 3-0 Tottenham: Big-spending Spurs start new Premier League season with dismal defeat - Sky Sports", source:"Google News", date:"23 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi4gFBVV95cUxNbVdudGFScnVrVXY3RDcyNmtkUTQxU3ZuYnV4Wm03cVhxWjU5bmVFakhJdDAyd25JVVZQbUxNaHF1blpwdEdGRWdXYWZZdUx6NExtVHJGNi03VXJ0TmZkQnZXd3VKNWt1Rm1EdU83SFQzc2I3ajFXWHZUQUh5ZThmQUVjTnZGWmYzWkJmOElJTENrekdCYmhmcVlhUmZVbldycWNodFdYSVlSTE0zRHdTbGdxQWphU1drX1lidHdSWDg5YUgzUWtOcFZvckluLXdfbkZlNXdDRDZPZ1NjZWR0dEZ3?oc=5"},
  {title:"Why Spurs' defeat to Brentford is 'worrying' after summer signings", source:"BBC Sport Spurs", date:"22 Aug 2026", tag:"Official", url:"https://www.bbc.co.uk/sport/football/videos/cr494we52ddo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"De Zerbi admits he does not know if £50m-rated Tottenham player will stay or leave", source:"SpursWeb", date:"22 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/de-zerbi-admits-he-does-not-know-if-50m-rated-tottenham-player-will-stay-or-leave/"},
  {title:"Tottenham press conference LIVE - Roberto De Zerbi on transfers, Bergvall and defeat - Football London", source:"Google News", date:"22 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxNY1ZBX0htbXVwdzZwcE9wcEk0ekpzX0FLcVFzMDdaVHZkNGRrN1hnSnFVRXd2ZDlKbGpucmd4YkZCTVRoZll0ejN2S0NYMUFiLWVjZUw3NHlPVDlSdVNhdFQyYzhYYWZGQmVXRFhrZnprczVReFJPTDB5YW9kN2dMTmlSb1J3dDdabVBxYm9oR3JRWHQxMkVPUTRDcDNiR0tUd2RsdmtoejhVdXdQV25LVl9Uc0XSAboBQVVfeXFMT0lsWC00SVkzTmczWTVCdDRZeExWNjZnN2gxal9pOHQ3aTZqZ3owaUYxV1l6NHZteDdURFFKTjc4V2pXekh0U1V2bm9qckhjeHYtTlJVUVJ6S0dhTEpqWVFnUXloRU5KbnhVcnR6Mjh1a0hTZnJaZ3NPekx6eTFjTDZoZE5YUkxkSV83SV9WckZQWExybUlXekhMRXhEck5vR2RVYlZpRGxZdUk3U0tlNnVZdk4wN01Qd0h3?oc=5"},
  {title:"Every word De Zerbi said on the transfer market and why he knew Tottenham might lose", source:"football.london", date:"22 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/de-zerbi-transfer-tottenham-lose-34502876"},
  {title:"De Zerbi learns cash alone cannot fix Spurs' losing mentality", source:"BBC Sport Spurs", date:"22 Aug 2026", tag:"Interview", url:"https://www.bbc.co.uk/sport/football/articles/cd696j44jqyo?at_medium=RSS&amp;at_campaign=rss"},
  {title:"Roberto De Zerbi gives &#8216;100 per cent&#8217; answer on Lucas Bergvall&#8217;s Tottenham future", source:"SpursWeb", date:"22 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-gives-100-per-cent-answer-on-lucas-bergvalls-tottenham-future/"},
  {title:"Five things we learned as Tottenham suffer 3-0 opening day defeat to Brentford", source:"SpursWeb", date:"22 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-things-we-learned-as-tottenham-suffer-3-0-opening-day-defeat-to-brentford/"},
  {title:"Same old Spurs given reality check of epic proportions - The Telegraph", source:"Google News", date:"22 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirAFBVV95cUxPVFlMQTFESExnSzNSeTV1T2JyNThCb3FPa3g0UlFTMmdNT01DR1NtZ3NPMVFlNU8xSkVnU2FXN2RacThtTFlUbDUyUUV3SkRzUHd3Q1UzN2NXN3RqZi1PaDc3MkpHSjF2VFAxVzg4dG1qNzNrQlNLbG9tTnB2R1BNRzBKQ0NseGRvSWZqWnRyYXFPSnNGUUxXbW8xanFJaE5jM1JHY3F5OTJxUUtP?oc=5"},
  {title:"Tottenham told to immediately sell player as Spurs go bottom after unwanted 78-year first - talkSPORT", source:"Google News", date:"22 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilAFBVV95cUxOaGp4cm55SjRpWlA5S1lOUDFLVlpJYWRBWHBfQnRrUlF0dV9jWXNQaWp3SW5kNTczcTdFemp2YkdEaUVVeURwRjk0QmN3Y0ZzMEY1c2hnU0tncktGdy01N3lISjJSUlRtTGR0R0x3T2RzZlR4clRtbDZyNmhYT2JhUDV4NGkzRmtVaFBtQjF1bkFhMmxL?oc=5"},
  {title:"Brentford vs Tottenham LIVE: Premier League latest score and updates - London Evening Standard", source:"Google News", date:"22 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMizgFBVV95cUxORTJqcXFDclNYTHRVa01yWTRPZFBfQ0VkYVVsNHc0ZlFPRDZkNG0wUzNOb3FuMFdTeGJZVy00VHRra0F0QWgxNDVzaFhWZTlUZ3lkdFdWYkVtRUZpRW02X1pSMllaVzJYSktnTDlzbVRyQUxBSTRfQVozZWo0NUJSMUtvYnFYNkRTT3lfdWk4U3JDVWJpRUFnZ2Q1VXlLOEExQzAzSzhzUzRFM1hjSVFjbWJCWThsY2NITTZzMzFnTzlQM0F4aWZxSmZDX3B2UQ?oc=5"},
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
