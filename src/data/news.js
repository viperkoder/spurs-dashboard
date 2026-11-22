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
  {title:"City’s unbeaten run ended by Spurs - Manchester City FC", source:"Google News", date:"22 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxNdDlkelRyWXRiUDJNWEdGNFM1YlpuS2gwY1BPZjI4SmxEVGt4SDJYOUtjbG56S1VVVDNya2MtazdrRWtoQy1CbXg1ZDZuUEF1Z1FFSGExTENJRjVyVDdSM1hUTGNJSnlHMnhqLUVLS2pqTTh4U19Va1p6aUltenVwSG1pc1pFaHdmTmR3Vm9OS29vbmk0aVhFSE90SEdsMjdwT0V5RQ?oc=5"},
  {title:"Roberto De Zerbi reveals why he is &#8216;very angry&#8217; after Savio&#8217;s latest Tottenham injury", source:"SpursWeb", date:"22 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-reveals-why-he-is-very-angry-after-savios-latest-tottenham-injury/"},
  {title:"Roberto De Zerbi reveals why Sandro Tonali was left out of Tottenham squad amid injury fears", source:"SpursWeb", date:"22 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-reveals-why-sandro-tonali-was-left-out-of-tottenham-squad-amid-injury-fears/"},
  {title:"Tottenham receive huge Luca Willaims-Barnett contract boost after lightning debut", source:"SpursWeb", date:"22 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/luca-williams-barnett-signs-new-long-term-tottenham-contract-after-debut-delight/"},
  {title:"Five Tottenham winners and one unfortunate loser from Ipswich Town victory", source:"SpursWeb", date:"22 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/five-tottenham-winners-and-one-unfortunate-loser-from-ipswich-town-victory/"},
  {title:"Manchester City v Tottenham, Birmingham v Manchester United: WSL clockwatch – live - The Guardian", source:"Google News", date:"22 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMihgJBVV95cUxOYTgwckQydU1jY0NhWFhmMUNfaVF1dkFPZ3VpRWVWVmZCc0NLNHdvd0lTaHpYV3h6VHdpdXplYlJDYnZBRHg0bnQ1VTlBcTBJelU0UTFUR2pLSFNxWnhvcEE5RERJNnNaUkp5bjBIM2tTTm4tRDlLa2d5a0I4TkFIa1JRZ0FZQTAwSXdEMkxlWXJBS1dQSnlCSDduRjR5M0wwZ2dQUWFNemZjZ3kxMi1YcnlQd2FicGZQd0xjam5SaS1GZFFrZkpTVWhiRzV3UzRYQTJ2Wm0zOTI5bTdjSWVpVlRybl85eVdITWZveTFmc1FLMHE1RkUxMTJaaVdnZk8xM3VVQ1p3?oc=5"},
  {title:"Live Commentary - Man City Women vs Tottenham Women | 22.11.2026 - Sky Sports", source:"Google News", date:"22 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimwFBVV95cUxNN05BT2ZrMC1IRGlGci1RVjg4Mkw1UnN4WV9iMlJwSVlHTl9pMTdOUmVpUUtaSmdSbWNJYllIbWU2M1hoQ29GdExlUVg0NHBIWTlUQ3dKVGdQRWRqTi1Ca3RaWUZ2bTNieEktamx0TXBjdW56YmFFM05XZmtLZ1d3U25TVV9DVEpNa25wcVM2VGpBSnpCVkJpNUkzdw?oc=5"},
  {title:"WSL: INCREDIBLE! Spurs beat Man City LIVE!", source:"Sky Sports Spurs", date:"22 Nov 2026", tag:"Club", url:"https://www.skysports.com/football/manchester-city-women-vs-tottenham-hotspur-women/live/575831"},
  {title:"Tottenham make big decision over Luca Williams-Barnett future", source:"football.london", date:"22 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-make-big-decision-over-34949726"},
  {title:"Arsenal enter race for £26m defender after Tottenham had bid rejected", source:"SpursWeb", date:"22 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/arsenal-emerge-as-tottenhams-main-competitor-to-sign-arthur-dias-after-brazil-debut/"},
  {title:"Tottenham&apos;s next five Premier League fixtures compared to top four rivals", source:"football.london", date:"22 Nov 2026", tag:"Fixtures", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenhams-next-five-premier-league-34941841"},
  {title:"Tottenham receive Mikautadze transfer boost but face another major obstacle", source:"SpursWeb", date:"22 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-may-have-a-free-run-at-georges-mikautadze-after-latest-everton-update/"},
  {title:"Tottenham suffer double Antonio Nusa transfer blow as price rises to £80m", source:"SpursWeb", date:"22 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-suffer-double-antonio-nusa-transfer-blow-as-price-rises-to-80m/"},
  {title:"The scary thing De Zerbi said about Williams-Barnett as heartwarming Tottenham moment spotted", source:"football.london", date:"22 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-williams-barnett-de-zerbi-34948921"},
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
