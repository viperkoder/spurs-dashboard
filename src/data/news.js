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
  {title:"Tottenham just need to be patient as Savio tops Premier League charts for two big stats", source:"SpursWeb", date:"23 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-just-need-to-be-patient-as-savio-tops-premier-league-charts-for-two-big-stats/"},
  {title:"Chelsea FC Legends return to Stamford Bridge against Tottenham Hotspur Legends | News | Official Site - Chelsea Football Club", source:"Google News", date:"23 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMisgFBVV95cUxNcEtsV1E4a1QxVXBwQTB0SU5zR01SZWxQd1otRFV1LTNjX09POHpVU21uT3dLU2hwSFhQVmRIdnN5RE5zRWNzT0p5QzB1b2RCeVBDeVB0WUVQeEg3aVRjUW1GM0doQ2xCSlIwWC1iNDg0enFLN3pUd0tTSDY2c3ZOekRaa3ExQ0NiMFJfdUNaRV92NUJIclBlTF9kWEtVWVpudEc4T2V3RExDUmpZMHhBbW13?oc=5"},
  {title:"Xavi Simons provides Tottenham injury update as Roberto De Zerbi given much-needed boost - Football London", source:"Google News", date:"23 Sept 2026", tag:"Injury", url:"https://news.google.com/rss/articles/CBMiogFBVV95cUxNd0Y1eWM0N1p4WDZQRGhqQmhaZXVJUUJYdnJnX1h1c3dER1BfdEFQbnMwT0E1ZnNYdHZLSjU0cWJrTVUza1FueHRQVlF2ald6LWJreDVsMkNiQVU2ejM2emlWVEpWLTBOSzBzUmZrOGQ1N2tBbTV6clJOdmxrRnExcUNaVW5PSGpfUGphQy1NbGc4RVJwSU40d0ZoajBLa0lsWXfSAacBQVVfeXFMTjE2WFB1ckMzRlU3Qk5IaTc3UFV4UlhUdmZMSE9LUEt4cl84aTZVZFlQVElZMkZOTnZWY1F4LXVyNElIczhsc29mZzFscWZTUnpUTXFZVWFsVXdGR3pYWUtUd01taV9QOHFnNDl6cE5qa2V2aXhjMlo3UnBhZ1dkZno5QURHbFE0SVgwSkYxaHhxYjNScGdSanZSb2NYOWlBRWw2TkNRdlk?oc=5"},
  {title:"Tottenham asked to hand over percentage of club revenue under new Haringey Council proposal", source:"SpursWeb", date:"23 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-asked-to-hand-over-percentage-of-club-revenue-under-new-haringey-council-proposal/"},
  {title:"Forget the goal drought, one stat shows Tottenham spent £400m well this summer", source:"SpursWeb", date:"23 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/forget-the-goal-drought-one-stat-shows-tottenham-spent-400m-well-this-summer/"},
  {title:"Tottenham tipped to appoint dream successor with De Zerbi ‘fuming’ at Spurs - Football365", source:"Google News", date:"23 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMilwFBVV95cUxOWjFhUWN6MzNjenhIOTB0WE5XYjhja1hxSHNONmI3QUZrMzVYR2llaW5jT0Q5a3VPRGRxZ1U2RDFzd2s0VGVzUTExTEx6OVRkbl9BaUhLVElCS1ZERGVZdjFrSkRBZ0wxcUZibjBDT3FGT0VaaURzcTFPZWltYWFaWXh3Wk56UGN6UE84dHBnSUhraDZaUTNv?oc=5"},
  {title:"Tottenham to 'sacrifice' stars in January to sign 'proven' striker as De Zerbi sack decision made - teamtalk.com", source:"Google News", date:"23 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMiswFBVV95cUxQN0Vvckl0UmtOMVF1U2NDUnM1NENDdW1NaVZZcFZJbVpkV1NmWGc4Z1VRS2NJaHlobWRBRzRxWUZDbFJuS2g0QjQ5a1lUX0hXUGtBSWxWMENIZmxyVnFEam1YTlotc2I3WGh0bFJWbmZTNHlOamdEdERBLWJXNGdpVlc4MHVaUFJXX1FHQ0xlcnB6TmV0OVFjajVUNzRkQWlMNDFGbU04SU1fcWlpcTZKOHJRTQ?oc=5"},
  {title:"The Hoddle of Coffee: Tottenham Hotspur News and Links for Wednesday, September 23 - Cartilage Free Captain", source:"Google News", date:"23 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMi3gFBVV95cUxOTTRaRWYycnlCeHRXWk9XYk8wZWh4ZTRKZ2xyb0tLZlZtX0RRVUw4NklGeW9jZUpxRjNZN1ZxWEJaTmFpdkNKUEVrYllPVnFkb0JhVzhYa2IzaFUtbHFhc1MwbmRFZUZmSTZLa0k1TDRkdTA4c2hrM0hOdlRTX0VqLXltSFl2WUpEQ2c5SXA2VW5PWm9wb0RRUDNKZ1Fvcy1fRFRDZThoU3JzMXotTTZGSEsyNnBfVEdHRVI1dGpnYWNUQlBTTUgwcTJRQnNydlFIcmxhSFozb2JsaHA1bHc?oc=5"},
  {title:"Alan Shearer delivers Tottenham relegation verdict and makes Aston Villa comparison", source:"football.london", date:"23 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/alan-shearer-delivers-tottenham-relegation-34656940"},
  {title:"Daniel Levy Tottenham pay-off revealed as club count cost of shock decision to sack chief", source:"football.london", date:"22 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/daniel-levy-tottenham-pay-off-34657327"},
  {title:"What happened to Andros Townsend after Tottenham? From Goal of the Season to drying himself with a sock in Thailand", source:"SpursWeb", date:"22 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/what-happened-to-andros-townsend-after-tottenham-from-goal-of-the-season-to-drying-himself-with-a-sock-in-thailand/"},
  {title:"&#039;Abysmal&#039; Tottenham medical team criticised for &#039;bullying&#039; and injury mismanagement in 1993", source:"SpursWeb", date:"22 Sept 2026", tag:"Injury", url:"https://www.spurs-web.com/spurs-news/abysmal-tottenham-medical-team-bullied-me-and-mismanaged-two-year-injury-says-jason-cundy/"},
  {title:"Tottenham stats reveal distance flaw as Jan Paul van Hecke calls out energy issues", source:"SpursWeb", date:"22 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenham-stats-reveal-distance-flaw-as-jan-paul-van-hecke-calls-out-energy-issues/"},
  {title:"Tottenham&#8217;s Mikey Moore impresses with FC Köln stats despite slow Bundesliga start", source:"SpursWeb", date:"22 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/tottenhams-mikey-moore-impresses-with-fc-koln-stats-despite-slow-bundesliga-start/"},
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
