// Fixtures — Pre-Season, Premier League (all 38, official release 19 Jun 2026),
// and domestic Cups (Carabao Cup + Emirates FA Cup) for 2026/27.
// Edit this file alone to add/update fixtures, or to fill in a `score` once played.
//
// Source: tottenhamhotspur.com "Fixtures 2026/27 – list in full" (19 Jun 2026).
// All Premier League dates/kickoff times are OFFICIAL but explicitly marked
// provisional by the club — subject to change for TV selection. That caveat
// is kept in the `provisional` flag on every PL fixture rather than a one-off
// note, so it can't get lost as this file is edited over the season.
//
// `score` is null until played. The daily automation (update-dashboard.js)
// scans headlines for full-time results and fills this in automatically,
// matched by opponent name — see applyFixtureScores() there. If Spurs play
// the same opponent twice before either leg is played, it fills the earlier
// date first; worth a quick glance at update-log.txt on those weeks.

export const PRESEASON = [
  {opponent:"MK Dons",          venue:"N", date:"2026-07-22T15:00:00", score:"1-0", note:"Behind closed doors — Hotspur Way"},
  {opponent:"Auckland FC",      venue:"A", date:"2026-07-26T04:30:00", score:"2-0", note:"Auckland, New Zealand"},
  {opponent:"Sydney FC",        venue:"N", date:"2026-07-29T10:45:00", score:"1-1 (4-2 pens)", note:"Sydney, Australia"},
  {opponent:"Chelsea",          venue:"N", date:"2026-08-01T10:45:00", score:"2-1", note:"Sydney Super Cup — Sydney, Australia"},
  {opponent:"Getafe",           venue:"N", date:"2026-08-08T15:00:00", score:"1-1", note:"Behind closed doors — Hotspur Way (70 minutes)"},
  {opponent:"Hoffenheim",       venue:"H", date:"2026-08-15T15:00:00", score:"3-0", note:"Tottenham Hotspur Stadium"},
  {opponent:"Hoffenheim",       venue:"N", date:"2026-08-16T15:00:00", score:"2-2", note:"Behind closed doors — Training Centre"},
];

// mw = Premier League matchweek number (order as officially released).
export const PREMIER_LEAGUE = [
  {mw:1,  opponent:"Brentford",             venue:"A", date:"2026-08-22T17:30:00", score:"0-3", provisional:true, tv:"Sky Sports"},
  {mw:2,  opponent:"Newcastle United",      venue:"H", date:"2026-08-29T16:30:00Z", score:"0-2", provisional:false, tv:"Sky Sports", note:"Sun 30 Aug · 12:30 AM SGT"},
  {mw:3,  opponent:"Nottingham Forest",     venue:"A", date:"2026-09-05T15:00:00", score:null, provisional:true},
  {mw:4,  opponent:"Everton",               venue:"H", date:"2026-09-12T15:00:00", score:null, provisional:true},
  {mw:5,  opponent:"Aston Villa",           venue:"H", date:"2026-09-19T15:00:00", score:null, provisional:true},
  {mw:6,  opponent:"Manchester United",     venue:"A", date:"2026-10-10T15:00:00", score:null, provisional:true},
  {mw:7,  opponent:"Coventry City",         venue:"H", date:"2026-10-17T15:00:00", score:null, provisional:true},
  {mw:8,  opponent:"Chelsea",               venue:"A", date:"2026-10-24T15:00:00", score:null, provisional:true},
  {mw:9,  opponent:"Crystal Palace",        venue:"H", date:"2026-10-31T15:00:00", score:null, provisional:true},
  {mw:10, opponent:"Leeds United",          venue:"A", date:"2026-11-07T15:00:00", score:null, provisional:true},
  {mw:11, opponent:"Ipswich Town",          venue:"H", date:"2026-11-21T15:00:00", score:null, provisional:true},
  {mw:12, opponent:"Sunderland",            venue:"A", date:"2026-11-28T15:00:00", score:null, provisional:true, note:"May move to Sun/Mon — opponent's Europa League involvement"},
  {mw:13, opponent:"Fulham",                venue:"H", date:"2026-12-02T20:00:00", score:null, provisional:true},
  {mw:14, opponent:"Arsenal",               venue:"H", date:"2026-12-05T15:00:00", score:null, provisional:true, note:"North London Derby"},
  {mw:15, opponent:"Hull City",             venue:"A", date:"2026-12-12T15:00:00", score:null, provisional:true},
  {mw:16, opponent:"Liverpool",             venue:"A", date:"2026-12-19T15:00:00", score:null, provisional:true},
  {mw:17, opponent:"AFC Bournemouth",       venue:"H", date:"2026-12-26T15:00:00", score:null, provisional:true},
  {mw:18, opponent:"Brighton & Hove Albion",venue:"H", date:"2026-12-30T20:00:00", score:null, provisional:true},
  {mw:19, opponent:"Manchester City",       venue:"A", date:"2027-01-02T15:00:00", score:null, provisional:true},
  {mw:20, opponent:"Fulham",                venue:"A", date:"2027-01-06T20:00:00", score:null, provisional:true},
  {mw:21, opponent:"Leeds United",          venue:"H", date:"2027-01-16T15:00:00", score:null, provisional:true},
  {mw:22, opponent:"Crystal Palace",        venue:"A", date:"2027-01-23T15:00:00", score:null, provisional:true, note:"May move to Sun/Mon — opponent's Europa League involvement"},
  {mw:23, opponent:"Sunderland",            venue:"H", date:"2027-01-30T15:00:00", score:null, provisional:true, note:"May move to Sun/Mon — opponent's Europa League involvement"},
  {mw:24, opponent:"Ipswich Town",          venue:"A", date:"2027-02-06T15:00:00", score:null, provisional:true},
  {mw:25, opponent:"Manchester City",       venue:"H", date:"2027-02-10T20:00:00", score:null, provisional:true},
  {mw:26, opponent:"Brighton & Hove Albion",venue:"A", date:"2027-02-20T15:00:00", score:null, provisional:true},
  {mw:27, opponent:"Liverpool",             venue:"H", date:"2027-02-27T15:00:00", score:null, provisional:true},
  {mw:28, opponent:"AFC Bournemouth",       venue:"A", date:"2027-03-03T20:00:00", score:null, provisional:true},
  {mw:29, opponent:"Nottingham Forest",     venue:"H", date:"2027-03-13T15:00:00", score:null, provisional:true},
  {mw:30, opponent:"Everton",               venue:"A", date:"2027-03-20T15:00:00", score:null, provisional:true},
  {mw:31, opponent:"Brentford",             venue:"H", date:"2027-04-10T15:00:00", score:null, provisional:true},
  {mw:32, opponent:"Newcastle United",      venue:"A", date:"2027-04-17T15:00:00", score:null, provisional:true},
  {mw:33, opponent:"Hull City",             venue:"H", date:"2027-04-24T15:00:00", score:null, provisional:true, note:"Same weekend as FA Cup semi — may be moved"},
  {mw:34, opponent:"Arsenal",               venue:"A", date:"2027-05-01T15:00:00", score:null, provisional:true, note:"North London Derby"},
  {mw:35, opponent:"Chelsea",               venue:"H", date:"2027-05-08T15:00:00", score:null, provisional:true},
  {mw:36, opponent:"Coventry City",         venue:"A", date:"2027-05-15T15:00:00", score:null, provisional:true},
  {mw:37, opponent:"Manchester United",     venue:"H", date:"2027-05-23T15:00:00", score:null, provisional:true},
  {mw:38, opponent:"Aston Villa",           venue:"A", date:"2027-05-30T16:00:00", score:null, provisional:true, note:"Final day — all matches kick off simultaneously"},
];

// opponent is "TBD" until the relevant round's draw has happened.
export const CUPS = [
  {comp:"Carabao Cup", round:"Round 2",              opponent:"Charlton Athletic", venue:"H", date:"2026-08-26T18:45:00Z", score:"5-1", note:"Mikey Moore, Dominic Solanke, Kevin Danso, Savio, Ben Davies"},
  {comp:"Carabao Cup", round:"Round 3",              opponent:"Liverpool", venue:"A", date:"2026-09-15T19:00:00Z", score:null, note:"Tue 15 Sep · 8:00 PM BST / Wed 16 Sep · 3:00 AM SGT · Sky Sports Main Event and ITV4"},
  {comp:"Carabao Cup", round:"Round 4",               opponent:"TBD", venue:"TBD", date:"2026-10-28T19:45:00", score:null},
  {comp:"Carabao Cup", round:"Round 5",               opponent:"TBD", venue:"TBD", date:"2026-12-16T19:45:00", score:null},
  {comp:"Carabao Cup", round:"Semi-Final (1st Leg)",  opponent:"TBD", venue:"TBD", date:"2027-01-13T19:45:00", score:null},
  {comp:"Carabao Cup", round:"Semi-Final (2nd Leg)",  opponent:"TBD", venue:"TBD", date:"2027-02-03T19:45:00", score:null},
  {comp:"Carabao Cup", round:"Final",                 opponent:"TBD", venue:"N",   date:"2027-03-21T16:30:00", score:null, note:"Wembley Stadium"},
  {comp:"Emirates FA Cup", round:"Round 3",           opponent:"TBD", venue:"TBD", date:"2027-01-09T15:00:00", score:null},
  {comp:"Emirates FA Cup", round:"Round 4",           opponent:"TBD", venue:"TBD", date:"2027-02-13T15:00:00", score:null},
  {comp:"Emirates FA Cup", round:"Round 5",           opponent:"TBD", venue:"TBD", date:"2027-03-06T15:00:00", score:null},
  {comp:"Emirates FA Cup", round:"Round 6",           opponent:"TBD", venue:"TBD", date:"2027-04-03T15:00:00", score:null},
  {comp:"Emirates FA Cup", round:"Semi-Final",        opponent:"TBD", venue:"N",   date:"2027-04-24T15:00:00", score:null, note:"Wembley Stadium — same weekend as the Hull City PL fixture, which may be moved if Spurs reach this stage"},
  {comp:"Emirates FA Cup", round:"Final",             opponent:"TBD", venue:"N",   date:"2027-05-22T15:00:00", score:null, note:"Wembley Stadium"},
];

// Combines all three competitions to find the true next match, whatever it is.
export function getNextMatch(now){
  now = now || new Date();
  const all = [
    ...PRESEASON.map(f=>({...f, comp:"Pre-Season Friendly"})),
    ...PREMIER_LEAGUE.map(f=>({...f, comp:`Premier League · MD${f.mw}`})),
    ...CUPS.map(f=>({...f, comp:`${f.comp} — ${f.round}`})),
  ].sort((a,b)=>new Date(a.date)-new Date(b.date));
  return all.find(f => new Date(f.date) > now) || null;
}
