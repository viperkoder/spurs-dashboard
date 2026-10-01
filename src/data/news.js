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
  {title:"Tottenham starlet admits he was &#039;pushed away&#039; by De Zerbi after £185m spending spree", source:"SpursWeb", date:"01 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/jamie-donley-admits-he-was-pushed-away-by-de-zerbi-after-tottenham-spending-spree/"},
  {title:"Vinai Venkatesham admits there&apos;s one key thing he wants to fix at Tottenham", source:"football.london", date:"01 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/vinai-venkatesham-admits-theres-one-34700872"},
  {title:"Man Utd star who’s averaged a 7.29 rating in five PL starts in line to be dropped vs Spurs - LiveScore", source:"Google News", date:"01 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi7gFBVV95cUxNVkxLVkdac1RIU2pzWGRHVGlVLU0zZkNVTGNZbEZiVFFMakc0emc3Z21oT3l1eTI3OWhqM3lOYmtBdFdTNHlmS0N6aTBCN2UxSkRoNDhOVGlvUHpzcGxSdUQ1bVpKTGV0ck41RGV1cVhBRmVJRmktQ2NIT2xBU2ZIdlpjYmNud0F1MmwxUWpzb3M1clhTRGNCWmNLT1pMOV94ZVZkdXFjMUlJUVVKVS0xUHZyWUYyTHlBWnJYc1Fqekw3OF9nN3VxUE9Td2pKeWlGWTJVRW95elVRSTRZeWh1MTR0Q3NaWENtREtZbC1B?oc=5"},
  {title:"Roberto Carlos says &#039;top-level&#039; Tottenham player will deliver on the pitch this season", source:"SpursWeb", date:"01 Oct 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/roberto-carlos-backs-souza-to-succeed-at-porto-as-tottenham-starlet-waits-for-debut/"},
  {title:"Tottenham&#8217;s Yang Min-hyeok is one step from repeating historic Heung-min Son feat", source:"SpursWeb", date:"01 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-yang-min-hyeok-is-one-step-from-repeating-historic-heung-min-son-feat/"},
  {title:"Sandro Tonali says Tottenham have a faster player than Micky Van de Ven", source:"SpursWeb", date:"01 Oct 2026", tag:"Interview", url:"https://www.spurs-web.com/spurs-news/sandro-tonali-gives-surprising-answer-on-fastest-player-in-tottenham-squad/"},
  {title:"Tottenham news: CEO Vinai Venkatesham backs Roberto De Zerbi - bbc.com", source:"Google News", date:"01 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi8gFBVV95cUxPdEZuY0pTU01CS1RodTBEWjA4UjRPbVRLSjltLTBFLUttQkwtYmFCU19iTFl2bHNFVjlmbEk1LWFkM2JHTENZa2hmekxJVWNUU3VKdTU0NGV6Unp3LVJhSHk1djN2UEhJSEk5ZXNFTDRHSURRWE51R3Nfay05UFN3VFVqLU9URTUxNXBPcWtSR2wyY1FrUkRQSDFqNU1ZWGhWclVHbGpuSTNVbDFyNVBkcjdwWTI3ZjNJdWtrb25reFVWVUxtRUIybXJVTVFvd3k1M3F2NGFxcm5qWTM4OW84b25Md3JnM1FwdEZCell4d3ZwQQ?oc=5"},
  {title:"Olivia Holdt: Tottenham forward on second place in the WSL, tough London City, Chelsea and Arsenal tests, and life under Martin Ho - Sky Sports", source:"Google News", date:"01 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMi4wFBVV95cUxQUnVZMEpoY2NFSGpoNHl1S3BqRjZSSkgzaHgtM1ZaVklIOHF4YzZyZkFtY29pQkU1WlNER1ZUVm1zUDFjN2pvMnFsNExGN1pmNzBIdDVPZ201TDdtVXBoTi1wcDZWOHFYeHRWVGk1NDVOZXB6Z0JjTmF1WjgwOTVXUHlHN05ELU5tTE83OHlDZ0d3QmNQeHl4MWZLYXhRUWJrdkxxeDRTa0ZzMy1WRnFzTjhMWHAxaGZ0VGN1QzhLZThCVzRWblUtM2tKUURZcWhnX1JnRHhaWUxEZ1ROSDhIenRsZw?oc=5"},
  {title:"Tottenham CEO Vinai Venkatesham outlines De Zerbi stance and admits future transfer issues - Football London", source:"Google News", date:"01 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMipgFBVV95cUxOSHluaXFDZVJCQU1NUy1BQzRJYmJCV3UtaDU2VzB5ZUVTZmNnRkJva2dXd3J2cm5NRW1KOHd0REg1T0lBcFZZU0huT0pISU56Q3dsTjhfeEJ1NmpUYU1kTVZCcVpQMFVBemRBQy02TS1hN05YanBKUm1fSVZ0S2tnTVFqekJlcmVwSUljaURYNWZfcGF1WGNMYjdNVFdyLWZscVpTTDZB?oc=5"},
  {title:"Tottenham&#8217;s Mateus Fernandes is proving a point after Portugal squad snub", source:"SpursWeb", date:"01 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-mateus-fernandes-is-proving-a-point-after-portugal-squad-snub/"},
  {title:"&apos;Lot of pain&apos; - Jan Paul van Hecke injury update as scale of problem is confirmed for Tottenham man", source:"football.london", date:"01 Oct 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/lot-pain-jan-paul-van-34699770"},
  {title:"Tottenham make decision on sacking Roberto De Zerbi as CEO delivers major update - Daily Express", source:"Google News", date:"01 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMijgFBVV95cUxNeFUwY1I4NGdYZnh4endjcXlCc1hVSWpUNEVpMnhLWmtWUFNfZVg5amFUNXVtWmRFamZGcXlIUzdjQnh4M1hzaC1sTkFoZkhudTlGOU5VVTZ1OG5GbUVWSXR2WWZScEkzdDVPU05OQm5IT0ZIM1E4OUl1bUpidHljaG4tQXFKcURXWlNJekhB0gGTAUFVX3lxTE1UUE5LbnJYUERNbjhmc1pkaGRyek1ETG1fZWNWQlhwOHY5MUpIODBlbzVKbUJLR2ZIOGRoa2cwQ0I3QTdjVFJRQ1o0OUZCeGlyZ2FaZFZ0cWFCd2ZaYkI4bk1fN2JOa1dLRENnU1lOem9zbjE1X2RHWEJWejN1X3JKa0tCX0N3MGthOXFGTDY0LWdROA?oc=5"},
  {title:"Tottenham fans will love Xavi Simons&#8217; latest injury update on social media", source:"SpursWeb", date:"01 Oct 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-will-love-xavi-simons-latest-injury-update-on-social-media/"},
  {title:"De Zerbi tipped to spring Tottenham surprise after another injury scare rocks squad - TEAMtalk", source:"Google News", date:"01 Oct 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiswFBVV95cUxPYmNMUTlvQlQzQXVTaUp0N2dlRHdfYjBVeHNuVm94ckNhaUhwNmlFSnZRSFpDVHdVdm5NUXNva1BJZVBNZjgzUzZtVFFjb3hqVHJvVVNPTGlWWVlzNEhPeXE1NFgwRldIdFhSOXpybnhRTEMzbWpGT1FRVHpEQVNuV2V4akFvRUdmeDF0WjJmNkNyQnZkTVpvUEVBYU5sMXBNVVNEbHJKRE84ZlAwbldialdvcw?oc=5"},
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
