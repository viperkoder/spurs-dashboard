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
  {title:"Tottenham&#8217;s Mykhailo Mudryk shoots himself in the foot with shocking Arsenal comment", source:"SpursWeb", date:"20 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-mykhailo-mudryk-shoots-himself-in-the-foot-with-shocking-arsenal-comment/"},
  {title:"Tottenham press conference LIVE: Roberto De Zerbi on injuries, Ipswich, Mudryk interview and more", source:"football.london", date:"20 Nov 2026", tag:"Interview", url:"https://www.football.london/tottenham-hotspur-fc/news/roberto-de-zerbi-press-conference-34940137"},
  {title:"Roberto De Zerbi reveals positive Tottenham injury news for three key stars", source:"SpursWeb", date:"20 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/roberto-de-zerbi-reveals-positive-tottenham-injury-news-for-three-key-stars/"},
  {title:"Roberto De Zerbi confirms triple Tottenham injury boost but two stars ruled out vs Ipswich", source:"football.london", date:"20 Nov 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/spurs-injury-news-ipswich-town-34942221"},
  {title:"Third injured Tottenham star spotted back in training after Savio and Destiny Udogie", source:"SpursWeb", date:"20 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-handed-lucas-bergvall-injury-boost-ahead-of-ipswich-clash-savio-and-udogie-too/"},
  {title:"Tottenham eye Chelsea flop who is worth £75m despite two goals in 41 games last season", source:"SpursWeb", date:"20 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-learn-75m-liam-delap-price-tag-after-two-goals-in-41-games-last-season/"},
  {title:"Giorgio Chiellini finally clarifies his infamous &#8216;history of the Tottenham&#8217; comment", source:"SpursWeb", date:"20 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/giorgio-chiellini-finally-clarifies-his-infamous-history-of-the-tottenham-comment/"},
  {title:"Tottenham XI vs Ipswich: Confirmed team news and predicted lineup - London Evening Standard", source:"Google News", date:"20 Nov 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi3gFBVV95cUxQcGpFUUR1cWFfODZTUllMdUthdkNsVEZ6NE5YVk9fOF92M0NqYkVjSGZOcWdJd3B2NU9YdGhLTjhyS1Jna2FHamxROVNxWXBncl9tM0dCZGp6UnB1MlB1M0hYMlEtYUp0ZlUyQnFFdDAwRFlRd0VMWVhTS3Q1UVozaDMyeV92SVNRbDNhMnl4UEFFbjAtcThiaEFXaEdXNm5hNFY3Z2toTkRESURfbnA2dUMwb1VodmlPb0JEU1JLS2pnVzdlQ1AxR2NwYk5EOHJac2Z1eS1zSHFPWmlNakE?oc=5"},
  {title:"Spurs winger: Agents ruined my dream to play for Arsenal - Daily Cannon", source:"Google News", date:"20 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMib0FVX3lxTE5FaF9JMGpuMW5HcTZGQ1dYS2lyenVCVkxoNzFaS1o1WVhZWThoX015Qno1eW04U19rN0VJeE9vcTZwNnlOSkJxb19lSHFXWjNITXA3ZjY1a3FpNDhJWHp0S0N3Nm0yemZxS3RUbHZQWQ?oc=5"},
  {title:"Mateus Fernandes picks himself as Tottenham&#8217;s best passer but the stats disagree", source:"SpursWeb", date:"20 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/mateus-fernandes-picks-himself-as-tottenhams-best-passer-but-the-stats-disagree/"},
  {title:"Ballon d’Or winner Harry Kane visits our Academy - Tottenham Hotspur", source:"Google News", date:"20 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiowFBVV95cUxPaE92MWlfMkRsckt2aGdYbWUwYkxZay1YdUJlTDduYkJWSXdTNmVWVHVjc292UjRHa3lIdmJsN2l0LTBMUWFBMzZ5SEdBdmJlX28yYll2ei12b3hVSmpseEF5Yk5CRjZnbWVicE1HMG5XeDZWMWFGWWF6c2ZTTjRYVEpDZmZBQVVWSloxUXk5OWNoSDdvcHBRaDBKQXh5azMzaWVB?oc=5"},
  {title:"Thomas Frank will reveal more about Tottenham exit in brutally honest admission - Football London", source:"Google News", date:"20 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMinAFBVV95cUxNcUFIRVFPN2ZibUxYQkt3RmxHZ0pnSnhuT2oyN0tOSVBPSlROOU1NeXRxU3BQazVOTmNZV28tQUlaMGVjalEyN1Y5bEpuT3o1X0FfVWI3MjRhbGR5bktlRThEUDlkcGRIVjd6X2tiLXkwMlV3MXVrUFZpOHlIb284dFlySUtOTHpkc25BX1FhdHdaM1VFVnpvMkZUR2rSAaIBQVVfeXFMTVBnOVhnSVVRdnQyMHhzS1BoTVduc0FmUXhCYmd1QmRIQ1NOMEZpdTVhYUhaQmVWcVlDZFQ4NWZtVzRBTUxCMnE4eXdLbWx2MUlaeU1UM0FacFZ2QlJVYWUtc1ZDQkZ4bzROLU5vZWxQclBrZW5uVGFqZ1RnNmIwVkFMOVNKaDIwYTNNN3VYelZOd0VvVE5WcnlvQm5KSDl3aG13?oc=5"},
  {title:"Middlesbrough tried to poach a second Tottenham starlet after Will Lankshear bargain", source:"SpursWeb", date:"20 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/middlesbrough-tried-to-poach-a-second-tottenham-starlet-after-will-lankshear-bargain/"},
  {title:"Men vs the Machine: Our Spurs v Ipswich predictions - versus AI! - East Anglian Daily Times", source:"Google News", date:"20 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxQTmV3LUNOY3VtWXlCMVdReVlsaEU0bkZ4VjA2a29KOXY1cGpOdk1Wc3VvNW52SkZlWkhHZTFhWXRreUFVN1hmQWVZdWhTLUhCSXVORFBXalNHeGdVbEVIcDY5SU9HNElTQnl0dGdqY0NhdGdyVi1XMUZ2VXJSeDhyblZSVi1YSFVyWExvbmRTVm93RTdKSk5DMTJaRDZsSEND?oc=5"},
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
