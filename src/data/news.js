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
  {title:"FPL | Spurs Gameweek 7 preview - Tottenham Hotspur", source:"Google News", date:"15 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMif0FVX3lxTE5fUnYyZmktVzVySDVnQTh0czJoeXZUR0t0TkxuWkFzalJFTjYwa21zNWxHbTVMck5ZTUVQUmlPR3JiWm4tNWc5M05OU0taaURCMGpzQURvdVZwc1BPNTVBTEtyb2h5YWF2UlhmamI0SVh3MVByWlJLOG15R3YtNFk?oc=5"},
  {title:"Eli Junior Kroupi update comes with perfect timing for Tottenham and Arsenal", source:"SpursWeb", date:"15 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/eli-junior-kroupi-update-comes-with-perfect-timing-for-tottenham-and-arsenal/"},
  {title:"Tottenham youngster impressing De Zerbi as first-team chances boosted - London Evening Standard", source:"Google News", date:"15 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimgFBVV95cUxPSHJHdlFMYjZaLWxHUVNzWE1xcWE1TUNFeDg4V0RvYVdrei1xSzZsREdjU2NTMmphNnBmaXA3US1FQ3NTemN6UmVIM3hQMURaN3hvaUxhM3cwVGFINFhOZVVNX2t3VlptRzZ2Z29hMzVLUTkzNVJJbXpXWjdvNUZ2YkpaMGVFdFhUbjUyZUpwY09oTmZfZkVfSTB3?oc=5"},
  {title:"Tottenham accused of &#039;big club snobbery&#039; that cost them a £20m &#039;physical powerhouse&#039;", source:"SpursWeb", date:"15 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-accused-of-big-club-snobbery-that-cost-them-their-next-harry-kane/"},
  {title:"Tottenham set world-record Pedro Porro asking price as Barcelona, Real Madrid plan stunning 2027 swoop - Exclusive - TEAMtalk", source:"Google News", date:"15 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiwwFBVV95cUxNLWN4aFRPVjJCd0R5bTB6Nkxod0dHSGZ6dWVSYVlUUGttdGRYWVRHdG9jeGktVUphWEN2M29WVHpNODkxUlFCZkJNeno3YzNNSmNuQTVPX0RfWHJOakE5QXlMbE4xZzQtWjZ0NGlBQ1oyQjBoMWdGZ0Z2ajhaZDR0RWdRNzZ2WUxwemgxWk1ULUhPSmJZUFgwODdqMFZQOVBEdktlc21xb0RiczJXeTZTY0FQYjB1ZWtZTHA2SlFIY0JyVjA?oc=5"},
  {title:"Tottenham consider big Luca Williams-Barnett decision for 2027", source:"SpursWeb", date:"15 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-consider-luca-williams-barnett-loan-to-solve-game-time-problem/"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Thursday, October 15 - Cartilage Free Captain", source:"Google News", date:"15 Oct 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi2gFBVV95cUxPekI2ZG1PS05ScWhHLXNrOHJPZ1g5NjFGeTdmU1RmU0U3RjdPZHZtY19oWlVTRVd6Y3JudlFVdGhFcGx4cEhNdzlHbVVJbkRhOUo3MnNLdmYyUFZFMWpoeURzeVoxNHJ0SmpXX2RZcVM4TVQzSEJmSkdHVjVfQXk5NElEQ3hsT1lNckJGcjdXVk12aUpuT0lSZ0lKZ2NCUWJpdVAxbWFYNUk2WnlUOXg5NkVVQUZ1N3ZhVHlnYURuaF91eGExbnhkQVpwRjdGNEZ3cHE1bGNTcUp4Zw?oc=5"},
  {title:"“Great player” wants to leave Tottenham as Barca and Real Madrid step up interest - CaughtOffside", source:"Google News", date:"15 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMipgFBVV95cUxNSXZsbWYzQmVjX0h2aUhpRExHb1VqVU1sZ2hDYkJzZ0JrTlowdzNWRS1kNjR5YXNFcFVsclFQZnJfeUljQV9JRTI0eTRtdHhtbTI2bzBkTGEyZHdMYmVKM2Z1ckpKMjR0RWFvZ3E2SzFGVTQ2NHp4NGF1SEZoVkN4eE1ZTjdZcG9aYllNeE1LendCNWFfQXdBamQ5X19qOG9UbkdrNE5B0gGrAUFVX3lxTE9GSkRHek9vMDUxN3hITWRBQVhCSlBmamREWks1VWZKd0JLZWFRS3pIOTBTcHA5dFhLM0laVGRXRlRCVEJaOGhoUHRkX2d3RFQ2blAyTGhtNmhLQ0wyLXl3aVI4M3doTGNOUmhLbnZhRHJZaGNMZGpkdUNnVkNHOV9GZ0NWRGc5ZGNSSzh1emlDLVROenVHSmtidXBLWDdSVko3dERLQUdBX1BMWQ?oc=5"},
  {title:"Roberto De Zerbi told why Tottenham are struggling as Mauricio Pochettino and Arsenal point made - Football London", source:"Google News", date:"15 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMimgFBVV95cUxQTlVEUHhMZG1TczMzcG1tVzhMdHNyb2d6QzMzSnZiMFNlSXdDVWdMWnJ0SG1TUHItNHBnYlkxLXNaXy02cWZtWEEwbTlIX0lidzJFbHI3S3FDcmJ6VkNmcnU0aGtXV2ZSbnZOdTR6MjRrU2poWGNWVmVtUUppS19NU0ZvSUM2TE5lUGE5Uk1PRU0yd3FuM1prLUhR0gGfAUFVX3lxTFBrYnhWTmFEV0cyQTlkT1N5OW9rN2Y2dXNaTkpQMERCUEVOLS1YYnlwSGpJbDNFRVdmWFVtUTJIckhuNmwxSDFjS2x3OURaQVpuaHlUdm5WellwTTRJV0k4cFZpeXVqbmZzbnVYc01EcjFQdlh2SXNmaVc4ZWNQTTdnUE52dVktQWpTQkZLakM2QWtYckN0b1pTb2o4WWllcw?oc=5"},
  {title:"Tottenham suffer £86,000 blow after former sponsorship partner liquidates", source:"SpursWeb", date:"14 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-suffer-86000-blow-after-sponsorship-partner-liquidates/"},
  {title:"Tottenham: Barcelona, Real Madrid rocked as world-record Pedro Porro asking price set - Football365", source:"Google News", date:"14 Oct 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMitgFBVV95cUxPRUVHTmVqTm9maVRYNzExbHduMm5HbEZzb0oyQldTNDV4Qzh0M3ZJQ3gwTklnMkI3Yjl6aEk3V0owN1FFamdmQnRZOFM3ckI3V05oQzZGTzc4T3REbEZDbXZPejQ2TkZTRmxSdXVLVjFHSXM4YThxWnBSanpqMGVlZndaaG4yRzdDRDl6emdPVF9Qdm5VZDV4eDhpMXFhYWJuak8xOXg4RFpZSVMyOHpLWEZhVnQ0QQ?oc=5"},
  {title:"Tottenham have a 15-minute window that has cost them five points this season", source:"SpursWeb", date:"14 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-have-a-15-minute-window-that-has-cost-them-five-points-this-season/"},
  {title:"Julian Alvarez&#8217;s price tag has just declined well within Tottenham&#8217;s striker budget", source:"SpursWeb", date:"14 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/julian-alvarezs-price-tag-has-just-declined-well-within-tottenhams-striker-budget/"},
  {title:"Tottenham battle Aston Villa for 20-year-old Bundesliga striker with three goals in six games", source:"SpursWeb", date:"14 Oct 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-battle-aston-villa-for-20-year-old-bundesliga-striker-christian-kofane/"},
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
