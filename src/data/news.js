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
  {title:"Unbeaten EFL side make Tottenham icon Dele Alli training offer as manager speaks out", source:"football.london", date:"24 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/dele-alli-next-club-training-34665334"},
  {title:"Morgan Gibbs-White open to stunning £125m Tottenham move on one condition - LiveScore", source:"Google News", date:"24 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMizgFBVV95cUxORU9weDhXaTVxcXNTQkxQbTdlUXBNd3J5NUNXSFNwNllxMHdOSFlqdkJpdEVUM193bjI5T2xIbWVmc25ETGhMdWsxNnI5QXk2WWtzU1dKblg3bFI1TGxnZWo3R25uNUYtSWQ3UzA0b2V4bmVVd1YzUlBxQXhSQXJIVHoxV19rak5DV1M2V1g1QTcwOTlHS0NxcVpWdElRUEU3bEZYSWVEUThJSnNTVWM2dUgyTF9PTWJWSFVHazVmczZlMExMZzdLS0JaXzdQZw?oc=5"},
  {title:"What Tottenham&#039;s last five post-international break matches tell us before Man Utd - Opinion", source:"SpursWeb", date:"24 Sept 2026", tag:"Fixtures", url:"https://www.spurs-web.com/tottenham-hotspur-fan-articles/the-tottenham-trend-roberto-de-zerbi-will-be-desperate-to-end-against-man-utd/"},
  {title:"£100m Tottenham star Sandro Tonali caught in &apos;downed tools&apos; row as four players singled out", source:"football.london", date:"24 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/sandro-tonali-tottenham-transfer-newcastle-34664862"},
  {title:"&#8216;It was always Tottenham&#8217; &#8211; Andy Robertson reveals why he supported Spurs last season", source:"SpursWeb", date:"24 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/it-was-always-tottenham-andy-robertson-reveals-why-he-supported-spurs-last-season/"},
  {title:"Panengstuen earns Legacy Number - Tottenham Hotspur", source:"Google News", date:"24 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMigwFBVV95cUxQNV84cF9Xa3llbUU0ajVuSWJhVFdyNEY3SmprZGpHaDBKZE5VeXhkMWc0QjFRa1lnUWlXTVRGWVJtbTlQV2FtQXZud2ZfSkpxQmo5bjNLTDZhU1ptbUJxYXdPUnkwTU5ucXdvTlZsblYzSmR1ZF8xMjFTeWdIWXhsdm5MZw?oc=5"},
  {title:"&#8216;He&#8217;s making progress&#8217; &#8211; Tottenham fans will love latest Dejan Kulusevski update", source:"SpursWeb", date:"24 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/hes-making-progress-tottenham-fans-will-love-latest-dejan-kulusevski-update/"},
  {title:"Tottenham Hotspur Daily News Roundup - LiveScore", source:"Google News", date:"24 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiuwFBVV95cUxOVmNBdEFjbjloV1ozZkxNckd1MllLN2dJT2VKQlQ4Qk1RSk5GSU0zLS01b2NnY04xdV9DUEFBdWdxU0w5bTJBSDBVWHlwR0VjeFA2dnUtcVRzbGhham9WZkx3c3JtMWRFcll2YjV3WWlOYzJSWDhiNGhPOFZYV3IyNm1vbVJSWUZWZVBDMGpfNThUNlNyVXdrMEdOMEtYa0hNYlFqOFRDNDQwNTNrd1dBRkV0RWJzeUotd3E0?oc=5"},
  {title:"Tottenham handed critical Dejan Kulusevski boost as date set for return - Football365", source:"Google News", date:"24 Sept 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMimAFBVV95cUxOMkh1TWk3YW5GQ0tHb3ZOOFJ5LTNIX3RCUE51VENRY2VwbDYtM29rdTJTN3dyWUxVSndackl3VXUwcEIzWTNHVm82NGNuTGJIazllUXRSMzJETlV1NlJyQ1hDSm90TkJPUTZPTG1fNkJ1X3lUZ3hxRHdyQ0xUbzhGdlAybHRVMW1nSkUxZFl4VUd3aG50bjZwbA?oc=5"},
  {title:"Tottenham missed their &#8216;Saliba moment&#8217; &#8211; 66% of Spurs fans have a lingering summer regret", source:"SpursWeb", date:"24 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-missed-their-saliba-moment-66-of-spurs-fans-have-a-lingering-summer-regret/"},
  {title:"Tottenham fan explains the club's midfield dilemma - BBC", source:"Google News", date:"24 Sept 2026", tag:"Interview", url:"https://news.google.com/rss/articles/CBMiaEFVX3lxTFBvamx5aE1sRl9GbXk0QmViWFB6T01NcWFMZmpRMEV3ZGtUc0FUYzRRelZLR3dseWRrbngzSUQ1NDlVU3o1Qldub3FlZWNrX3JZNGpRVWRZRDYtRnYzREFaTGl2NDJpRUlY?oc=5"},
  {title:"Tottenham handed shock Dejan Kulusevski return update after 500-plus day ‘knock’ - TEAMtalk", source:"Google News", date:"24 Sept 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMivgFBVV95cUxQd1NEUkU1WHpVdUxBTXk4VHBVN2xJbHhlbmRzYVNKSVZEMWRFak1tTjR6dk4zSG9yVEJfeTNLdHRWcGRVd1U4SjhsdXEzWmQxeF9NUGlmaWhXaEhobXk4dkdybHY4TmdvZm9IVVBEU3JMeDJJQ0M1MENoeUptOWdLSVZsaVhPZTgxOXBKblY5WHM2MkN3VUhucGxLRFVKQksyMVNrZnltdl9ZMEdCb1dlamw4dDRVNjVGOVNoNHNn?oc=5"},
  {title:"How Tottenham&#8217;s £400m summer spree may have cost them a huge 40% goal threat", source:"SpursWeb", date:"24 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-hotspurs-400m-summer-spree-may-have-come-at-a-cost-in-one-key-area/"},
  {title:"Tottenham told Harry Kane transfer terms as Bayern Munich scratch Premier League return 'itch' - Football London", source:"Google News", date:"24 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMingFBVV95cUxPRFhCemR0YS1NLUR0Rm5BWUdNQi1vNW1pLTJ3bmx2dzJKb2Z4c3d6eGxaRThBWkpzWkItb21yalJ4V082b2diWTBGenFwTWJKeDZ0emd6cGN1ZF9Camx1YUk1QlF0N1E2US1ndkNYYU5OcEw2RG9CNkQ3MThaRXgtblFKT0gwZDBMZTdjNDd3ck9nR0VEelBPckFsZkhUUdIBowFBVV95cUxQX1hWUkpMZEdHWlVlUkc4T1BIMzVyMGVLLTVMQjhZYXpHeXhSc1lncTVaWmJNbVN1LVNvSEx1b1JfejRlVy1xUXdiMHA5QTdPaU80VTBoZjdDcE0yaGVMd1pWNklmamZKbmdZWEZ4S3VSbVVVczNzcVVySjRCd1JYQWR2RlVNRG9aTi1HR3N6QmY1bkVPSGl4RDlId1JBYlpKdW1J?oc=5"},
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
