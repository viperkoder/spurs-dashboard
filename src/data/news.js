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
  {title:"KMI panel reach shocking decision on Jayden Bogle red card controversy vs Tottenham", source:"SpursWeb", date:"18 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/kmi-panel-reach-shocking-decision-on-jayden-bogle-red-card-controversy-vs-tottenham/"},
  {title:"Mauricio Pochettino had a Tottenham clause in his USA contract before Man United move", source:"SpursWeb", date:"18 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/mauricio-pochettino-had-a-tottenham-clause-in-his-usa-contract-before-man-united-move/"},
  {title:"Four ways Tottenham can solve their James Maddison fitness problem", source:"SpursWeb", date:"18 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/four-ways-tottenham-can-solve-their-james-maddison-fitness-problem/"},
  {title:"Man United want Mauricio Pochettino to turn them into Tottenham – it won’t be easy - The Independent", source:"Google News", date:"18 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiqwFBVV95cUxQZTFDY0N3YV9Td01WbGtURUVWZmVHMWo1Z2lQSFNvbnUwNkZLeExxWUNZX3V5QV9oRDAxZEo4cW9pOGRDdUZQNE1aZEFrQ1JoRDdWQll4VnZSY1p4LUNCbGpaQ0QyT0pwMUN4Sk5adWxsRF9iZG5aZ0NvX19ZbGtfLXRxMHVkaXRfVVV4ZlBRWU85ay04LTJ4ZndfSzAzdm5DNWhnMWEzSnQwOXM?oc=5"},
  {title:"Tottenham get Premier League panel verdict on Jayden Bogle tackle that injured Mathys Tel", source:"football.london", date:"18 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-leeds-bogle-tel-injury-34929766"},
  {title:"Tottenham Hotspur injury, suspension list and return dates vs. Ipswich Town: Savio, Mathys Tel, Mykhaylo Mudryk latest - Sports Mole", source:"Google News", date:"18 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMi7gFBVV95cUxPbElXZ3ctdE1zTkFKQXhOcU9TT3djZVo2c2VUYnZheGoxZkpmLThaM0xaNkF3S0VBbjhQRkhneXE3X1I0SVBuamJvYm9VMEpPQl8xY2pmYW4yc3p0XzVmT1kxQVN1dGlfWi1CbmVjV3JRbjZXYmpacVRHV0dGRlZtbXZnTk9rT3FUTFd5RGVhWjdmam9NU2JvaWI4WjBtVUpsQXY5NGVucnpBdC1MMVdjOWNaTkxOVDBONHc3WHVwbTNTczZuS1d0ejljYlVRS0NUMFpzZE1LR2I2WjNrT290bVZ6STU5UnlkQ1pnZTB3?oc=5"},
  {title:"Yves Bissouma makes brutally honest admission over Tottenham exit after settling at new club", source:"football.london", date:"18 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-news-yves-bissouma-ajax-34929245"},
  {title:"Mateus Fernandes and Tottenham will have contrasting feelings over his international break", source:"SpursWeb", date:"18 Nov 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/mateus-fernandes-and-tottenham-will-have-contrasting-feelings-over-his-international-break/"},
  {title:"Leeds get split decision verdict on Bogle red card claims after Spurs Tel challenge - Yorkshire Evening Post", source:"Google News", date:"18 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi2gFBVV95cUxNYUM3aTIzWDBqQUJQYXR2TGpHN3JfZUVhUXkxU291UVA4YTV1UEhycWVoOGNtYmV0bnp4QmdkUk5uLW5iNC1QZjY4bzlSQlU0cWRBMGZKMU9DYXJiVmRXZmJ1eF9va3BEMWJmVHZPWTVieVpkdlM2NkktdW9xRGxSbkRtWXVaaFF2OHd4VXkwSkF3ei1SbUtTVVNBakNuN0ZMY3lUZmhwMW5qUlNLUG9iOVlsLXF6RnVkTjkyY2ptTF9QRWxDdHN5aWM5NmRoM1hrcmlHdGpIQ2p1QQ?oc=5"},
  {title:"Tottenham will be pleased by what Dejan Kulusevski did this week, including 100% statistic", source:"SpursWeb", date:"18 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-will-be-pleased-by-what-dejan-kulusevski-did-this-week-including-100-statistic/"},
  {title:"Five Tottenham players who must step up over Christmas to chase Champions League", source:"SpursWeb", date:"18 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/five-tottenham-players-who-must-step-up-over-christmas-to-chase-champions-league/"},
  {title:"The transfer masterstroke Tottenham missed out on and now Arsenal could benefit", source:"football.london", date:"18 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/alex-scott-transfer-chelsea-arsenal-34925483"},
  {title:"Tottenham’s plans for Mikey Moore as injury crisis mounts - The i Paper", source:"Google News", date:"18 Nov 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiggFBVV95cUxNdThQbG9oZGxzNkR2bTJoQXJRaVhIUlN3THRFT2RLNExhaW1VR2ljZWlibV8yaDlfV1dKWnE4cWtwSTBvb1dxOVhEX2NKTTJSdk45NXlGSlVOZHA5R2NjaHFDek5zT3VPbEdnZWQ1T0U2XzR5X1ZLVjROU0ZWTk5CUk13?oc=5"},
  {title:"How Spurs could sign their ideal Pedro Porro replacement - 3 Added Minutes", source:"Google News", date:"18 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMisgFBVV95cUxNVnR4V29hd2dSY3hOU2tlcmJKRHgtQ183V2JVVVNqeVEycVVZZ3pCbU41TGc0UjR4VFpxbEtlVnFXOFpPMGVXcU10Q2JsN3FZVy1RUVVJYkE2TkY1NDlnbENQalRWbWxNM1M1V0Z2a0tUN1EtNTVtWElFeWNKbU9fdkkwSXNrVWg0Q3RfcnBES1gzUWFDRzRYZDE2d2E1R0x0Um15S2tpU3JMLXlLdktINDNn?oc=5"},
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
