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
  {title:"Tottenham fans will love Jamie Carragher&#039;s score prediction for Man United clash", source:"SpursWeb", date:"07 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jamie-carragher-expects-tottenham-to-shock-man-united-at-old-trafford/"},
  {title:"Tottenham have 'strong case' to claim '£50m' Man City compensation - Yahoo", source:"Google News", date:"07 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMihgFBVV95cUxPcFc0YTcyY2hIWDVvOGk0S0pfOFc1VWRKRHlDOEFHRHMzUHBmRGdPZWNhSzB3dmlJM3E2N0h5QW1RTXhrODhLWXBJYktFaHJWazktZHgySF96OU45ako5eXFiWmxWWGRRQXNhS2F5RC1VODBmLS0xOHJZdXY0VnpabnRtNFE0QQ?oc=5"},
  {title:"Tottenham reach a compromise with Richarlison after near-legal battle in the summer", source:"SpursWeb", date:"07 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-reach-a-compromise-with-richarlison-after-near-legal-battle-in-the-summer/"},
  {title:"Sky Sports: Man Utd Ready to Sign Future Old Trafford Superstar From Tottenham - GiveMeSport", source:"Google News", date:"07 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMimgFBVV95cUxNZFRVQnNjQmtCeWNQeHdEUVlGWmlCcmcxbzJxdVRjdUUyRDZZem9JZGdZcnlfY3BDOHZORUVCanNFTzZfRl9uSUVuYzdGclhKSWFvQkRpanFwckhoM2FwYURRRk9fLW5uck1xZ2tTakMtZ3RBMlhlQ25VeUlDZEx5RGVoNDJ1SFNFRXprRVk1cUtKd2gtNE4tRVhn?oc=5"},
  {title:"Concerning update on Luca Williams-Barnett as Tottenham fans call for him to get opportunity", source:"SpursWeb", date:"07 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-huge-clubs-scout-luca-williams-barnett-as-tottenham-face-nightmare-scenario/"},
  {title:"Cristiano Ronaldo's BRILLIANT hat trick against Tottenham in 2022! - Sky Sports", source:"Google News", date:"07 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxQS3d4S25aQWU1RDRYb3FRVXNhQ01mZDYwZ3FKOHMzbDRzSlMyZFdwbG5ob0tfWmp0bGFtMXlwa2dPZTV6UEdzZFVfNGtYNEVDZkpqOVY5UFJFajdKc015TDBOTG9KZFdKTEUxWmlmeVJLWmpYREhvalVybFIxeUQwcW9Ud2EzdW1VY1RzdWwyYWh6SmRLc015cDRFTmpXVHoxVG15ek4wNUdXdW0tcHpHMmlvdWQ?oc=5"},
  {title:"Tottenham ace sends message to Roberto De Zerbi at exactly the right time ahead of Man Utd clash", source:"football.london", date:"07 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-ace-sends-message-roberto-34728353"},
  {title:"Tottenham relief as Barcelona find cheaper alternative to Pedro Porro transfer in Liverpool", source:"SpursWeb", date:"07 Oct 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-relief-as-barcelona-find-cheaper-alternative-to-pedro-porro-transfer-in-liverpool/"},
  {title:"Tottenham Hotspur injury, suspension list and return dates vs. Man United: Micky van de Ven, Pedro Porro, Jan Paul van Hecke latest - Sports Mole", source:"Google News", date:"07 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMi_wFBVV95cUxNd2ZCYW5YMmU1WTFXNy05YXhJaXlrbXRHeVlqcXNmdTY0dFMtc0dmNmZ6WGNpUjIzNUctWVlkVHg4MjFxVjFMYU16cDRkX0wwekRoTmdGdHJodURySXc3TmhaNm1WMzR3OGFTZWZGVnRtSmgwcWFabHdTTTRyRzRhYl95UlVLNnpxWjlhejd5bXZOVkU0ZVZxdEtkRXZZRnR5STQ4TFlEeng1MG1DWUNZdjVfV21xVFBCQWRLUUVxZDBTY2xkRVVCd1daWVVxekVJOGdSd3FkVUgxbG5TcU9UX2t0bXBsMlFoSkY3eGkyS1dFZU5nM3ljRUZMM3NKWVU?oc=5"},
  {title:"Video: Tottenham star scores hat-trick to cap off outstanding international break", source:"SpursWeb", date:"07 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/watch-as-mathys-tel-scores-stunning-france-u21-hat-trick-ahead-of-tottenham-return/"},
  {title:"Tottenham ratchet up plan to sign 52-goal Espanyol striker - he's De Zerbi's top target in 2027 - Exclusive - TEAMtalk", source:"Google News", date:"07 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMivAFBVV95cUxOZm5KQ2xqMjJneDk5RTlYOHpmZ1R3S05sUlBlWTRjdFlqZXpFN0NiSFlvd09ra2N6TW9aYVRYVVo3dExMMktxWkdNXzBiQjFBc2lPTVNTaXdNbDAzSEdnUlZmc0V5VU5qcjJxQW9wc1AwY0FXejF3dkVidWNtWUtCQjBHYnI2VnVZVEdQTmJPRlU0U0V0dEVpMzF0Z3p0dTV1ZzFkY05EYlp2WlhUNjVGTzhFaURZTGsxdTlDZg?oc=5"},
  {title:"What Tottenham are thinking about Man City verdict as they prepare for &#039;a major fight&#039;", source:"SpursWeb", date:"07 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/daniel-levy-would-have-relished-man-city-scrap-as-tottenham-weigh-up-appetite-to-fight/"},
  {title:"How Could Tottenham Hotspur Spend So Much? - The Swiss Ramble", source:"Google News", date:"07 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMid0FVX3lxTE1JRk5LdWlYc3hlTk11bUJtZzFycGN0NF85OG1IeXFMVVFwazk1QnJ2QTZVU3dVcGtnWGtkQjNqeFVSUVEtVVBVQTZGUWZuOUFkRG9mZmpQUFV2c3czaFVEbjBCTEkyODBTaXdTa2lwNy1vWk4tZHdZ?oc=5"},
  {title:"Tottenham&apos;s part in £98m boost after NFL London Games dazzle at their stadium", source:"football.london", date:"07 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenhams-part-98m-boost-after-34726210"},
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
