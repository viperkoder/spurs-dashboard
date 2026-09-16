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
  {title:"Pedro Porro injury update: Tottenham receive huge boost for Aston Villa clash", source:"SpursWeb", date:"16 Sept 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/pedro-porro-injury-update-tottenham-receive-huge-boost-for-aston-villa-clash/"},
  {title:"Tottenham receive £120m boost that could make January transfer window very interesting", source:"SpursWeb", date:"16 Sept 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-receive-120m-boost-that-could-make-january-transfer-window-very-interesting/"},
  {title:"Spurs latest: Jamie O'Hara says Tottenham Hotspur have to adopt a winning mentality - skysports.com", source:"Google News", date:"16 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMi1AFBVV95cUxPeHJNQ0pZSVlKNlYybTBpdjJFNnpCOVhyYVlaenNxRWw4cGRhYzItQWRERmZCbzEtaG5JSGlCZWF2STVSR19PT3BZczZ1eGJOV1BBVkFKcV9XdElnYlphejh4OW5VTFFpVW1seTJUMlN4OUVsOFpXMW5DcjYxWXExcUQwUDkwZkdqV3NtYkZielMxcEROZHZiTHRvNXd2dFZYUERZb1VnUlhXQWdBMlZOSlBIOTJwaV9MOGY1X3FqMTlnQ2NLNWlUWVVDbHE1V1VRTmRnVQ?oc=5"},
  {title:"Tottenham receive £120m boost despite Carabao Cup exit at Liverpool - Football London", source:"Google News", date:"16 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxPbkI1b3gwZ21Cbm5zTTVEZEhpRkJzcVZmQVh6bVE5NEZ2eXlwRThuQkxVRWMtNU1UeVhXeF8xRVg3U0x5cEQtTHU2S2I0M0xha1FJRExNVDNCWWluX0FSZmF0SnFZdHBlWHFoVDJJTHNGZzYzdnhJektrcG1XNWNxcFF0anZxdlQyYkc4YUNXbzBhMUo3VVJWTDUwdkhGX1VR0gGmAUFVX3lxTE5VZGY3QzRlLU16YVhmZGJ5a2R2MF9kZ2xlMFVPTk05ZFZQNVJFbWVsRVlPS0hfMHF0SHpuYmZuSFpvMHE2ME5qdEhVZ0RhZk01V1dNcS1ZZUFMSUx0OVNpMElVTGtHYlFaYWVrdDdhY3psNUN4cHdad3pSWlJWY0FkMjhMUGZPYV9IcmVnbEFIcG5RVnZ6cmhKQkxUMEY1Y055RmxRWVE?oc=5"},
  {title:"Roberto De Zerbi on misfiring Tottenham: 'We are going to win many games and score many goals' - ESPN", source:"Google News", date:"16 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMixAFBVV95cUxOdU93UnpwTW5tbXdaVjAwUUpKOTF5S3RRYVA1WU03d2RabTZNMnJUNmJ1SEV5N1NnUUtST3VtZndxLVJFWUZYaEl1aDRJR3JncTRpSmNPZWNGemZWZTFKdmRLQUptbEQ4N1k3czdiSlFqeDFkcmZlRDRTM0JhRzBxMGk5ZkJZc01TTzhtTzJpX3ZJYV9sOHhUSmNsTDk5dER6ampwMmQwVXh4SVllZkxpZTBZOWFya0RlNlFXX3huNGk3U0hY?oc=5"},
  {title:"Three reasons why Tottenham are about to go a month without a home fixture", source:"SpursWeb", date:"16 Sept 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-news/three-reasons-why-tottenham-are-about-to-go-a-month-without-a-home-fixture/"},
  {title:"Liverpool 3-1 Tottenham Match Report: Spurs suffer early Carabao Cup exit", source:"SpursWeb", date:"16 Sept 2026", tag:"Fixtures", url:"https://www.spurs-web.com/spurs-match-reports/liverpool-3-1-tottenham-match-report-spurs-suffer-early-carabao-cup-exit/"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Wednesday, September 16 - Cartilage Free Captain", source:"Google News", date:"16 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi3gFBVV95cUxOWjNHcGI4LWxwSzRSdlNXTW9JUG9LaHUzRm9xNVVKMUNHejNvSEVHazI2SXFaVzR2cm45UWk3anNxa1dqWlBlT2k1V3VKZmljNm9lQnRHTXE2MGRTV3JWUmxmU28zLUZDMkFmRXo1eUYzaDMzczg3akstR1VSclVBTGE4UGdYRjhMUTZfd3VPYzBqNmdfUG1reWRpa3FNLUVsajk1emtwTHJ5NjM1YkZkR0E4MUx3VTkzczRjZy1zYy1fb3E4ZnB3bHBRV0ptWkxGNmYxNzZxZHNqSU0tVEE?oc=5"},
  {title:"Roberto De Zerbi makes Tottenham claim after Liverpool defeat - 'I think it is unfair' - Liverpool Echo", source:"Google News", date:"16 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxOekdTY1JlZ3RSX2tqQVFIYnpzaDNKS2FzYzdSd3JpUmpRZ3V1TnlTYkhIMVk0MWJWOGg1MFNxZlkwTDBBbnhqSFpoRFdlZklFREk2c1djTWx3UW9MaUFrb2NsYTNjTmtPekFBNWZiQS05QnRSeC1NdVBLQ1BpWXdKbmplNVktMWVtMWQ4U3g3d2p0RXFiS3JITkt1SEphRW0zYTRVYtIBqgFBVV95cUxPMlVPSkV5dzJzOHgzcVZjYi00NGlMLTk1OFV6OVdJeFZJZHk3OGhYc3l1V04xMG4zQUUyVU1ncGRkUDZmWVRaVDV0TkRQeWFJdVhhRUJSLXBWeTNuem9kM2R2d0wtVXF4T0ZKRHBwYmhGSnVqaXcyaVpEUEY0aEZLUGJZU2ZudXVFLXRxc1hSQWcwY2s5UkUzMHJialh0bDQ1a3dka2UtSmVkQQ?oc=5"},
  {title:"Jamie O'Hara wishes Tottenham got relegated and storms out of studio after argument with Jason Cundy boils over - talkSPORT", source:"Google News", date:"15 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiowFBVV95cUxOd2NBbDVmdHZVWmNrZ1laaVk1TkltVDFtTmZhb0VqbTFVTXAtMTkzZ2FmRWZ1Z0RaTS10c29mZ2Y3N1ZMaDBDV1A3U3JDVFM4ZTM4dGZtMnVmV0xzZ2x5RV9ZTm1lY2hQUjBlMURHN2pCQzVlS3M1QUpTLTh1UTlGVkVQVFlvWFNmcXVlVzBHb0ZTZDJJakVndzh2TW5tZmdJWWZ3?oc=5"},
  {title:"Tottenham press conference LIVE - De Zerbi on Liverpool cup exit, Maddison and Porro injury", source:"football.london", date:"15 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-press-conference-live-de-34623411"},
  {title:"Every word De Zerbi said on Maddison problem, Porro update and hint at his key four Tottenham attackers", source:"football.london", date:"15 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/every-word-de-zerbi-said-34623562"},
  {title:"Five things we learned as Tottenham crash out of the Carabao Cup with 3-1 defeat at Liverpool", source:"SpursWeb", date:"15 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-things-we-learned-as-tottenham-crash-out-of-the-carabao-cup-with-3-1-defeat-at-liverpool/"},
  {title:"Spurs finally score... but still lose against Liverpool in Carabao Cup - The Telegraph", source:"Google News", date:"15 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMirAFBVV95cUxNNnJMUEZHZlNGYmxmV29HOFNsd0NNZFNJTlo2X3pHMzU2SkJuUnBmNURPNmtoekotc3B0eE5qWGN6NnV6dTNhNVpSUi1QQ21SVjVCd1FlXzhnT1pkTDVpYkdlVmtFWHctWVV6ZUhkdlBvaWpIZFV5eERZNE5IRVJ6WlVGckEwcThZM3JwanlYQTduVnRraVZXTHhJcXN2Ymk2dUU0Ymg2Z3gzNnZp?oc=5"},
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
