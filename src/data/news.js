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
  {title:"Tottenham transfer news LIVE: Cody Gakpo latest, deal agreed, Kevin Danso exit decision", source:"football.london", date:"29 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/transfer-news/tottenham-transfer-news-live-cody-34537652"},
  {title:"Tottenham reject Sunderland bid for player who just scored his first goal for Spurs", source:"SpursWeb", date:"29 Aug 2026", tag:"Transfer", url:"https://www.spurs-web.com/spurs-news/tottenham-reject-sunderland-bid-for-player-who-just-scored-his-first-goal-for-spurs/"},
  {title:"Tottenham explore player-plus-cash deal for Premier League star - CaughtOffside", source:"Google News", date:"29 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMiqAFBVV95cUxNVnU1d0VyMXdmVTV3SFR2cUQwbHBfVDYxN2RyMVNMbjRpRllLZG1mb1NQSHB1dTBaQTlIdmhCSjJsWlltb0lfSlhNRlE0ZTZCY1BMQUZYRUVPQ3ZHbWdDbGVWd1FrYjIzT3BhTVgyNTZvbEVGUFFxUEN5cFdlOVZBeGJOcmV6aTB6SGxrVzZOSzlyVTBoazBwRUpFQ0NGY2swbGZTNmsyVV_SAa4BQVVfeXFMTVRMUlh6ZFNYT216UktQQXVTQUVvVk5yZGR5ZmZKMXZtWmVJMlZvMnJlZTd5bzU3WnE4Tk9XXzhzUzVlemEtUGZKZlpZM2RXbnAzckVnRERDSExtdzExczRUU2ZEaHV5d2pMNjJGLWFkYnl5dzg1VzliU3AyMGg0N2p3S1pEN3c5LUU3MmZPUGpFYkduOUpOZWZlVnFVREZHWlFNbVJDcHZvVy1EeFhn?oc=5"},
  {title:"Supercomputer predicts Tottenham&#8217;s chances of beating Newcastle at home", source:"SpursWeb", date:"29 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/supercomputer-predicts-tottenhams-chances-of-beating-newcastle-at-home/"},
  {title:"Tottenham CEO Vinai Venkatesham sends message about transfers, injuries and training ground changes - Football London", source:"Google News", date:"29 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMirgFBVV95cUxQME5XSFA1cGxQZHFuZnlUTHFWeWtRNVItaWxqdlRKaEN1MFZqZlJFZGswRmhBSENtdFJ5cGdKQ19lajBIWXdSVFA1aTB4WmFvb1R0TExicFhZRjR4UlFfYUdMOW1FNU5PcDBGWHJXa1M0OEg5R0JaS0ZVRk9uTjFZZEphYnRCNHdfQXNHamJjczlPU2ZGcmNBcTE4XzBEdEhGYXRQRWp5VWpTdU91S0HSAbMBQVVfeXFMT3ZCdWpRbDcxOEh2SzFMYjkzWmRNUGJ5cGRQTFhlYTh3Zm1McmN6MjQ1cko3dnlQX2twVlNXMVRWNWtVTnFmNG5ySklscFZxUnVoc0pZZHFyemJ5aW9kemVtLUtsZWtrUnpVUFVEQ1VNZTI0U255WHIzWUFMZWhXRDNRMWNBWDVDbDZHcjh4eTJsNTBHTENvcDNucmpMLXVPYlppUWJGbG56MmQtWUF1bU5BcTA?oc=5"},
  {title:"Tottenham vs Newcastle predictions: Chris Sutton on Premier League game - BBC", source:"Google News", date:"29 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiakFVX3lxTE5hZmdzc0JncWJjNmFLd0s0LXl6V1pzQjlKbE5ac2M5VjRCSWdHVW8yUnJfQ1RfNndIWGc1bWJxWTRJcmlUQ2ItSEZjZ0VYUUNfUHdvcnBBTGloQVVITXAxa1QybWJuVFpVbkE?oc=5"},
  {title:"Tottenham Hotspur vs Newcastle: Premier League preview and score prediction", source:"SpursWeb", date:"29 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/tottenham-match-previews/tottenham-hotspur-vs-newcastle-premier-league-preview-and-score-prediction/"},
  {title:"Liverpool deliver 'immediate' response to Tottenham '£69m bid' for Cody Gakpo - Football365", source:"Google News", date:"29 Aug 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMipAFBVV95cUxOMXd5djNUVmNjRlNKek52SzJvRzV4NU1RaE9EVVVHWTFmQVFKX25iTS1yTE9BWWhXOHlUcVQ5Qm40Q09LSkM5X3REQkd1aTZRUklLb3dtNmd5N3Y4OXJ3eUFJTlJJNi1vUE1Ic1dwcFJkckVnLThnb3B6VFpvTGxleV9LMVlNQmVoX2lvNklFMExhRFpqdF8wbFlienpCVms3MXFOXw?oc=5"},
  {title:"Tottenham fans finally receive huge Dejan Kulusevski boost after training return", source:"SpursWeb", date:"29 Aug 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/tottenham-fans-finally-receive-huge-dejan-kulusevski-boost-after-training-return/"},
  {title:"Tottenham reject bid from Premier League rivals for fan favourite one year after signing - talkSPORT", source:"Google News", date:"29 Aug 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMilwFBVV95cUxQUl80R1kzaVdSLWg0bGRKYWQtWDJqWEhISFZ4bjhHYmhhblpWdjVSZmpYak5DRUptc1gzcXhiOUwtVFpjSWw3bFNpTlBKQ3BEXzdzenhVNHJURmNOeWVIVHR6d3lTa2phQ29SZE02aVE4TnBIZkFBaW5xTGFQeUxDOFRON0w2TGwyUTBsbGJiblU4U3BHMnNB?oc=5"},
  {title:"How to watch Tottenham vs Newcastle: Team news, TV channel and prediction", source:"SpursWeb", date:"29 Aug 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/how-to-watch-tottenham-vs-newcastle-team-news-tv-channel-and-prediction/"},
  {title:"Fabrizio Romano reveals Tottenham response to Sunderland offer for Kevin Danso - TEAMtalk", source:"Google News", date:"29 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMioAFBVV95cUxPa1A4RndROVVFa1hheWlyV3N5Wi1LMW1OUk5IM2VMS2FqaTljQW9nLTN3b1ZacnY4ZXd1OGNzbEZROThfYU5zeVBTbUJ0Y1RGNl9Hby1jMDZvdjRfZVlIRFFMaEFQbW1QZEYweDhMOUZsV1lCNHBvYVpIQXhhU0xYVmlvMzZvSEFWdG9kZ0hCZ3FWMVZlRzlVMjI4andsZUVC?oc=5"},
  {title:"Tottenham Hotspur announce Sandro Tonali selection decision for Newcastle United game - NewcastleWorld", source:"Google News", date:"29 Aug 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiuwFBVV95cUxNWlRIQ3VYZHhaSGxURmc3a2JWVHlYYkVHYy1jZU9ZWUdkeWF1amRrX00yZnhVZ0xRSnRZdDB6TU1QRXlVWjV1aDRFZVBEWDNYS1Zub25QYVMtNWQ5T2FSUHBUNUZPM21WU3RLTGxteWNaSHU2dTlyRDhWelJ3RTA1bU5fNkxxRTR5SWJYUXFMS2VTSWpKMUpqVWZ0UGpQVWxIcDZYUTRQMDhUME5rWXFQV2JjZXdVTjNaUGFn?oc=5"},
  {title:"Tottenham transfer news recap: Cody Gakpo agreement, Neco Williams interest, new striker target", source:"football.london", date:"29 Aug 2026", tag:"Transfer", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-transfer-news-gakpo-deal-34523875"},
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
