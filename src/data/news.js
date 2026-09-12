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
  {title:"How to watch Tottenham v Everton", source:"Sky Sports Spurs", date:"12 Sept 2026", tag:"Club", url:"https://www.skysports.com/football/news/12040/13583635/tottenham-vs-everton-how-to-watch-premier-league-contest-tv-channel-live-stream-now-tv-and-score-prediction"},
  {title:"“It’s more important than football” | This is the story of Joe Lyons | Together Against Suicide - Tottenham Hotspur", source:"Google News", date:"12 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiggFBVV95cUxQTmpSOVUySDVrMWczUE03dEVWcUs0emxvTHFpMU90ZFo4LU1MWDlva1lCOEhvWGdqbkF4QXlIcmM5S1doVFNsRzJER2xZZ2tFX1IxOEFQR2huZVFvbnNRTmlLX29pd1BhZXlVX3hneHliWk1PTVpxMVZUeFA3UElHNGVn?oc=5"},
  {title:"De Zerbi reveals he wanted to sign Tottenham star at Brighton, now he finally has him", source:"SpursWeb", date:"12 Sept 2026", tag:"Official", url:"https://www.spurs-web.com/spurs-news/de-zerbi-reveals-he-wanted-to-sign-tottenham-star-at-brighton-now-he-finally-has-him/"},
  {title:"Catching up with... Darren Caskey - Tottenham Hotspur", source:"Google News", date:"12 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMiggFBVV95cUxOZjdvVFoyQ2JNMFd0OWFfUDNSaUJ1UWczbWhXZHFiNFppQnFNNEQteW9sdWRldHJDaFU2cGZRRG8zWnZ3MkhTTHJnenpfc284WXJFdVdIOFBDLXhsYlZ0U0NxNEZFRnZET0pnMWtCR2hRdG1VYnZlLXJZWHQtbEQ4N1l3?oc=5"},
  {title:"De Zerbi was not the one who &#8216;decided&#8217; to leave Richarlison out of Tottenham squad", source:"SpursWeb", date:"12 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/de-zerbi-was-not-the-one-who-decided-to-leave-richarlison-out-of-tottenham-squad/"},
  {title:"Richarlison breaks silence on Vasco da Gama transfer as he blames Tottenham issue - Football London", source:"Google News", date:"12 Sept 2026", tag:"Transfer", url:"https://news.google.com/rss/articles/CBMipgFBVV95cUxQZGZ2TGszMWVPWkxnMHJONmJ6M3l5Mkp2TXRTSmwwOUJzM2JTeEpFdDhiclNuLUh4dW9sbHZZVkpUZ0hhZ2Vad09lcnBTWGdYNWtUODl3THkybVQ0enRPclJXMkt6S1VfSmpuX3dTTnpKRzhQRjJWLXF4V1NsU1p6Tl9LWXJqa2tyWER2b1MzTHNTUW1NSHFTTDZzdk1zQ193U2FNYVJR0gGrAUFVX3lxTE82emVRWHN4WWt4eWdnLTZwU01kXzlxMVN1aTFQN0tOTzhQVjdTd3dLd2NOQzlNaVdpd1M1OWppenJWVEhER2VYYUl2d2hjeWl5T0JUbWN0bHlMdm5qNmZPMFFsUld1dUEwSXFvMm9zZ09DbHY5emI5U3BxNFM2V3JmRW1kcUlwUEZMSTI2Z3FNV0FETkxhNUxzdTJyREo2RXlvTjRDaDdJYzk1UQ?oc=5"},
  {title:"Tottenham XI vs Everton: Predicted lineup and confirmed team news - London Evening Standard", source:"Google News", date:"12 Sept 2026", tag:"Official", url:"https://news.google.com/rss/articles/CBMi7AFBVV95cUxNM3ZEZU95ZHFmYURUazlTWkphb3JVZVE0MjEyRkoxV0lrRG40MGthOUMyZU5iRUVxdEN1TGFKbmVzNHdYNkQzOWdpSGl5SC00aldmRW11ZzhmTzBhZUlzODBGTExtdU5TQ3ZScG1LVEdUd3h2bU8xcTM0Vkc2NTIzLUF4SlpVT0VLUVBacWkwbDZFRTVsdnFJQXV1dEthSEV1RUJ4Nk04QnI3cG9oV09MMDZScnRVZ1JWRHdrX0ppVmJCcl9CV1B1RVdoMlktR0k5a3kzcjUwU2hlR0RSdEVkeU1CZ3pxNEFQbV9zTA?oc=5"},
  {title:"Pedro Porro and second Tottenham defender could miss Everton clash with &#8216;muscular problems&#8217;", source:"SpursWeb", date:"12 Sept 2026", tag:"Club", url:"https://www.spurs-web.com/spurs-news/pedro-porro-and-second-tottenham-defender-could-miss-everton-clash-with-muscular-problems/"},
  {title:"Tottenham v Everton tips: Our 19/1 Saturday Bet Builder - Paddy Power News", source:"Google News", date:"12 Sept 2026", tag:"Club", url:"https://news.google.com/rss/articles/CBMitAFBVV95cUxOQXVOeF9mMDNGUGFPbDhrdjIxa1k1NFBkcGVvSjV2TkZyWHMzQVRQTzRiUG5jMXFWZTJjRE5wWmFKNHRZNVJXaFJaeHlhbFZ4bERia0FDM01mMzE3a1dnelcxMWlUUGtNSDhMLXBZSl9qUVkxTU1xM3d5T1E1YWRaQ1N0QU0wQVdBM3NPYVZVQTZxRzkycm9MR05uRFVKY20xOHpuRXkyX3M1enYxUWpObFFOeVo?oc=5"},
  {title:"Spurs and Villa hunt first league wins, Arsenal face Sunderland test – matchday live - The Guardian", source:"Google News", date:"12 Sept 2026", tag:"Fixtures", url:"https://news.google.com/rss/articles/CBMizgFBVV95cUxPYkFVRUQxOFV6OVhHQU5fc3YycG1GYW41QlBVQzhVczV3YnhNcnVmWHRWVlBMWW9lbG0zdEc4cTExT0V3dFF3aG1sMTNqYU1BLVFWVFA4VG1rOTZqT21rYXJ6MFo0eTdXMFA5N09sM0EyeXZtd05qQWxfYWJ2ZFVXcFRoUzJRemJqemNlOHJ1RlBjeDlXOVduTVRLa1FOUElOdjVSdnpPNGlNcW5yNzlyaTM5UHA0Q1BOalJkLXd1Vy1IQjJuX2k1TEVVckE2UQ?oc=5"},
  {title:"Tottenham given vital Everton verdict and told why they must win &apos;cup final&apos;", source:"football.london", date:"12 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-spurs-everton-premier-league-34606862"},
  {title:"I left Tottenham for Everton after telling Spurs boss I&apos;d never play for the club ever again", source:"football.london", date:"12 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/left-tottenham-everton-after-telling-34598340"},
  {title:"Tottenham predicted team vs Everton - Pedro Porro surprise with Solanke and Kudus decisions", source:"football.london", date:"12 Sept 2026", tag:"Club", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-predicted-team-vs-everton-34606665"},
  {title:"Five players to miss Tottenham vs Everton as Roberto De Zerbi gives &apos;stupid&apos; injury update", source:"football.london", date:"12 Sept 2026", tag:"Injury", url:"https://www.football.london/tottenham-hotspur-fc/news/tottenham-everton-injury-news-mudryk-34605260"},
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
