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
  {title:"Where to watch Tottenham vs. Crystal Palace live stream, TV channel, start time for Premier League match - Yahoo Sports", source:"Google News", date:"31 Oct 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMiiAFBVV95cUxNcjBXQ0tKTVBaVFNyWE16OE5va2ltR3NiQTlBNHcyelBfTUFjWjdzMEZsYnM0OGpYU2VKS1lnRzNxYkZ6SW1vWndZRlAtY0VadU9yOHdKWEc2dmpkcnV1Zy0xN2xyVERnNl8zbUEwcE0tSzhaTThheFY0U1FXVklmSVU2RDBZTnpW?oc=5"},
  {title:"&#8216;Improve the relationships&#8217; &#8211; De Zerbi reveals how Marbella boosted Tottenham", source:"SpursWeb", date:"31 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/improve-the-relationships-de-zerbi-reveals-how-marbella-boosted-tottenham/"},
  {title:"Alan Shearer and Tim Sherwood agree on Tottenham vs Crystal Palace score prediction", source:"football.london", date:"31 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/alan-shearer-tim-sherwood-agree-34838889"},
  {title:"&#8216;Passionate guy&#8217; &#8211; Roberto De Zerbi explains that Pedro Porro kiss after Tottenham win", source:"SpursWeb", date:"31 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/passionate-guy-roberto-de-zerbi-explains-that-pedro-porro-kiss-after-tottenham-win/"},
  {title:"Tottenham vs Crystal Palace Premier League preview, team news, prediction", source:"SpursWeb", date:"31 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-match-previews/tottenham-vs-crystal-palace-premier-league-preview-team-news-prediction/"},
  {title:"Tottenham XI vs Crystal Palace: Predicted lineup and confirmed team news - London Evening Standard", source:"Google News", date:"31 Oct 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi9gFBVV95cUxNZGliU09XZ3psVldWV2x5SjBlODlIMVBNeHNKc1IxaVE0YkNwTHNRaGptZTREVEp3WVBxNE5wbkQxVkZsWFo5a3RkNzQ0ZkItLUJJaS1PT2FZWGZTNU1sejlsU0lpOUVxVlBMREFhLW1UU3l3QjN6dDN6X3JkMXd3cE5uUWl3RXdndHNVeXdyU2hGZGVDQ2xueE5rd0RRZ1JLWXc5YWdDYUxmamx3bDFNWnlnWjlxUV9Qb0taZTZWcXM2LU4ybVYydmwtTXRnbWlzUnFENWU2SWNoa0NSUlJtM0VEazdWOWNWWTQ2LUtzRjd2Mk9zWkE?oc=5"},
  {title:"&apos;Ronaldinho sent me a signed poster but I rejected 10-year Barca contract to join Tottenham&apos;", source:"football.london", date:"31 Oct 2026", tag:"Official", url:"https://www.football.london/tottenham-hotspur-fc/news/ronaldinho-sent-signed-poster-rejected-34827613"},
  {title:"Why Tottenham will finish in the top six this season - The Telegraph", source:"Google News", date:"31 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMingFBVV95cUxNSFJmT29UOTdocnVMdkVIU0d1Z0x5a3BlMXdXbzMyNnkwb0Z0eWFwX0g1bmJtZ2lBMjlBYlo2aHUzZ2NjNnc2N3htMTZYNk1NSWtwMGUwVm9IYVBfWjh0R0JqWTNjS1Y3S2NUVXdpckZ1TVR6UzVxUVNQZC1YdWtBZGFvdXNtYXVvWFQ5WGRJVjhYNW16eHZHdGxObldQdw?oc=5"},
  {title:"Tottenham predicted team vs Crystal Palace - James Maddison surprise and Destiny Udogie decision", source:"football.london", date:"31 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/fixtures-results/tottenham-predicted-team-vs-crystal-34843283"},
  {title:"The Tottenham curse that Roberto De Zerbi will be hoping to inflict on Crystal Palace", source:"football.london", date:"31 Oct 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/crystal-palace-premier-league-spurs-34841216"},
  {title:"10 players to miss Tottenham vs Crystal Palace as Roberto De Zerbi confirms return of two stars", source:"football.london", date:"31 Oct 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-team-news-crystal-palace-34843108"},
  {title:"Harry Kane honoured by Tottenham as mural unveiled after Ballon d'Or victory - London Evening Standard", source:"Google News", date:"31 Oct 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMinAFBVV95cUxOSHhEdGlwYVVma0IwRURUZHUtcUJuMWpRYm41VWZiNVl3VVVjWEhTLXlpaWpiVjhRSy0wTlJxZV9va1VHa1M1djJ2ZjJ4NXpEYlJkV0llUlF3elJXR0luSHYtcDl3Q1FUaF9CTWQyT0VJWVMtWkF2czRLdzNBNldNTERWazNWVWt0MHhfc2hpLU45TEhmd1A3MlhmX1A?oc=5"},
  {title:"Spurs star makes transfer admission amid Real Madrid interest - London Evening Standard", source:"Google News", date:"30 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiqwFBVV95cUxNaU5fNXJwRU5hZnlBamljYU9UUnJwZVZsSTFqOEkwdkx1eVhBVThoeE4yS2pJV3dTMnhaeHpxQ09LSmJ1azRhRmg3aXdTQVl0bDY2elFJQnNkOFVJTFlRRzM3b1lRMmd1NmRjZlctUGN2em5KeUpUU0xYamR6Z0I4dEltSFN5T21RSHU4UkFveDRfczRSb3Z4aFlraHpOZktpMjhKQTN4WG5CTnc?oc=5"},
  {title:"Tottenham handed double blow in hopes of signing Ibrahim Maza from Leverkusen", source:"SpursWeb", date:"30 Oct 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/tottenham-handed-doubled-blow-in-hopes-of-signing-ibrahim-maza-from-leverkusen/"},
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
