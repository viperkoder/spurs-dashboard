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
  {title:"Roberto De Zerbi faces nightmare scenario as Tottenham star walks suspension tightrope", source:"football.london", date:"02 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/roberto-de-zerbi-faces-nightmare-34850283"},
  {title:"Napoli shortlist Tottenham star as potential replacement for Kevin De Bruyne and co", source:"SpursWeb", date:"02 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/lucas-bergvall-in-kevin-de-bruyne-out-napoli-shortlist-tottenham-star-as-midfield-target/"},
  {title:"Tottenham have four players who are almost as dangerous as Jeremy Doku", source:"SpursWeb", date:"02 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-have-four-players-who-are-almost-as-dangerous-as-jeremy-doku/"},
  {title:"Tottenham&#8217;s Savio tops Premier League for surprise stat that shows he is more than a dribbler", source:"SpursWeb", date:"02 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-savio-tops-premier-league-for-surprise-stat-that-shows-he-is-more-than-a-dribbler/"},
  {title:"The Roberto De Zerbi decision that left Tottenham star Archie Gray feeling &apos;gutted&apos;", source:"football.london", date:"02 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/archie-gray-roberto-de-zerbi-34850740"},
  {title:"Barcelona contact Pedro Porro&#8217;s agent but Tottenham Hotspur hold all the cards", source:"SpursWeb", date:"02 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/barcelona-contact-pedro-porros-agent-but-tottenham-hotspur-hold-all-the-cards/"},
  {title:"Trabzonspor to return for Tottenham star after reaching an agreement in the summer", source:"SpursWeb", date:"02 Nov 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/trabzonspor-reignite-richarlison-interest-after-tottenham-slash-january-price-tag/"},
  {title:"James Maddison shows true colours as Tottenham star sends Luca Williams-Barnett classy message", source:"football.london", date:"02 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/james-maddison-shows-true-colours-34849244"},
  {title:"Ticket Info: Arsenal Women v Tottenham Hotspur - Arsenal.com", source:"Google News", date:"02 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiowFBVV95cUxNZnBnLUVpMVE0UzZkZnpybnNNOThVdjFNenBQNC1BaS04bDV5bnY1Z0RfRURfaUhGRkxvUy1ETExwNV8zdm4wRUNRbVNCTHNzY2k0M18tZWQxRENldksyRDBYZWlySmJKYklWSlh5VF9aWDhzbTFRN05LWHNIMV9wQjA1cEN6NkVjU3pZaVRZZ0daeUotYVZQdk53SlZvOE4tZEx3?oc=5"},
  {title:"Tottenham sources are saying something very exciting about Luca Williams-Barnett behind the scenes", source:"SpursWeb", date:"02 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/luca-williams-barnett-leaves-tottenham-sources-blown-away-by-what-he-is-doing-behind-the-scenes/"},
  {title:"758 - Premier League passing record broken in Palace win - Tottenham Hotspur", source:"Google News", date:"02 Nov 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiwAFBVV95cUxQekRJMW5DeVUyaURrZnNKd0ZCWW95LU9KZUFCQVVNRU5QYVJhcEFKcXBHeXpkU1FmMllfa1FzNWxaU3R1Y2dxV1NJR0hGTkZVb2Y0VDZORnVWdURGUkcyMS1wRnA2Q1ZQSWpxcU83YWRVQk53Zmk2ZGxWaHBzck00dGJNcGdpVTh5UUtyN0VacU1aTkJGUXhIRGFqVlBYODhWdzVFMzNIemJOVmtuUWpmVFkzekJNUG9acTRGcjlLdGY?oc=5"},
  {title:"Tottenham&#8217;s Jan Paul van Hecke is now the top-rated player in the Premier League", source:"SpursWeb", date:"02 Nov 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-jan-paul-van-hecke-is-now-the-top-rated-player-in-the-premier-league/"},
  {title:"POLL: Should Tottenham hand Luca Williams-Barnett his full debut against Leeds United?", source:"football.london", date:"02 Nov 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/luca-williams-barnett-premier-league-34849300"},
  {title:"Luca Williams-Barnett passes Tottenham test as Roberto De Zerbi faces easy £75m transfer call", source:"football.london", date:"02 Nov 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/luca-williams-barnett-passes-tottenham-34848580"},
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
