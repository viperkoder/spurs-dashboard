// Overview tab — season stats, EPL table, last 5 results, top scorers.
// Edit ONLY this file to change anything on the Overview tab.
import { P } from '../data/theme.js';
import { STANDINGS, LAST5, SCORERS } from '../data/standings.js';
import { ANON_BRIEFS } from '../data/transfers.js';
import { WH, Chip } from '../lib/shared.js';
import { RadialGauge, CompareBar, InlineBar } from '../lib/charts.js';

// Parses "2 Aug" style dates (no year) into a sortable value, assuming
// current year. Used to sort ANON_BRIEFS newest-first regardless of
// array insertion order (automation appends to the end of ANON_BRIEFS,
// so index 0 is not reliably the newest entry).
function parseWhisperDate(d){
  const months={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  const [day,mon]=d.split(" ");
  return new Date(new Date().getFullYear(),months[mon]??0,parseInt(day,10)).getTime();
}

export function OverviewPanel({liveNews}){
  // Derived analyst stats — computed from the STANDINGS data that's already
  // here, not fabricated. This is the "why it matters" layer: raw GF/GA are
  // just numbers, but GF/GA against the league average is an actual insight
  // (e.g. did Spurs concede more than a mid-table team should?).
  const spurs = STANDINGS.find(r=>r.isSpurs);
  const leagueAvgGF = STANDINGS.reduce((s,r)=>s+r.gf,0)/STANDINGS.length;
  const leagueAvgGA = STANDINGS.reduce((s,r)=>s+r.ga,0)/STANDINGS.length;
  const played = spurs ? spurs.w+spurs.d+spurs.l : 0;
  const topScorerGA = Math.max(...SCORERS.map(s=>s.g+s.a), 1);
  // Same live-fetched, already-filtered source the News Centre tab uses —
  // fetched once in App.js and passed down, so this always agrees with the
  // News Centre tab and doesn't re-fetch every time you switch to this tab.
  const { items: liveNewsItems } = liveNews;
  const sortedWhispers = [...ANON_BRIEFS].sort((a,b)=>parseWhisperDate(b.date)-parseWhisperDate(a.date));

  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:18}}>

      {/* DAILY WHISPERS — horizontal swipeable strip, replaces the old single
          merged card in LATEST and the full vertical list in RightFeed.js */}
      {sortedWhispers.length>0 && (
        <div>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:11,color:P.purple,fontWeight:900,letterSpacing:"0.12em"}}>DAILY WHISPERS</span>
            <div style={{flex:1,height:1,background:P.border}}/>
          </div>
          <div style={{display:"flex",gap:10,overflowX:"auto",scrollSnapType:"x mandatory",paddingBottom:4,WebkitOverflowScrolling:"touch"}}>
            {sortedWhispers.map((w,i)=>(
              <div key={i} style={{flex:"0 0 82%",maxWidth:320,scrollSnapAlign:"start",padding:"10px 12px",
                background:P.bgCard,borderRadius:6,border:`1px solid ${P.purple}44`,borderLeft:`3px solid ${P.purple}`}}>
                <div style={{fontSize:12,color:P.text,lineHeight:1.5,fontStyle:"italic"}}>{w.text}</div>
                <div style={{fontSize:10,color:P.muted,marginTop:5}}>{w.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LATEST — 3 live news items, no longer shares the row with a whisper card */}
      <div>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:11,color:P.gold,fontWeight:900,letterSpacing:"0.12em"}}>LATEST</span>
          <div style={{flex:1,height:1,background:P.border}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {liveNewsItems.slice(0,3).map((n,i)=>(
            <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
              style={{display:"block",padding:"10px 12px",background:P.bgCard,borderRadius:6,
                border:`1px solid ${P.border}`,borderLeft:`3px solid ${P.gold}`,textDecoration:"none",
                transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background=P.bgHover}
              onMouseLeave={e=>e.currentTarget.style.background=P.bgCard}>
              <div style={{fontSize:12,fontWeight:700,color:P.white,lineHeight:1.4,
                display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{n.title}</div>
              <div style={{fontSize:10,color:P.muted,marginTop:5}}>{n.source} · {n.date}</div>
            </a>
          ))}
        </div>
      </div>

      {/* STATS ROW — moved down, now sits directly above Season Analysis */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:8}}>
        {[["P",played,P.white],["W",spurs?.w||0,P.green],["D",spurs?.d||0,P.amber],["L",spurs?.l||0,P.red],["GF",spurs?.gf||0,P.white],["GA",spurs?.ga||0,P.muted],["PTS",spurs?.pts||0,P.gold]].map(([l,v,c])=>(
          <div key={l} style={{textAlign:"center",padding:"12px 6px",background:P.bgCard,borderRadius:6,border:`1px solid ${P.border}`}}>
            <div style={{fontSize:26,fontWeight:900,color:c,lineHeight:1}}>{v}</div>
            <div style={{fontSize:11,color:P.muted,letterSpacing:"0.15em",marginTop:5,fontWeight:700}}>{l}</div>
          </div>
        ))}
      </div>

      <div>
        <WH lg>Season Analysis</WH>
        <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:24,padding:"16px",background:P.bgCard,borderRadius:6,border:`1px solid ${P.border}`,alignItems:"center"}}>
          {spurs && played>0 ? (
            <RadialGauge
              label="RESULTS"
              segments={[
                {name:"W",value:spurs.w,color:P.green},
                {name:"D",value:spurs.d,color:P.amber},
                {name:"L",value:spurs.l,color:P.red},
              ]}
            />
          ) : <div style={{width:120,textAlign:"center",color:P.muted,fontSize:12,lineHeight:1.6}}>Analysis begins after Matchday 1.</div>}
          <div>
            <CompareBar label="Goals Scored (season)" teamValue={spurs?spurs.gf:0} avgValue={leagueAvgGF} color={P.green}/>
            <CompareBar label="Goals Conceded (season)" teamValue={spurs?spurs.ga:0} avgValue={leagueAvgGA} color={P.red}/>
            <div style={{fontSize:11,color:P.muted,lineHeight:1.6,marginTop:8,paddingTop:10,borderTop:`1px solid ${P.border}`}}>
              {played===0
                ? <><strong style={{color:P.amber}}>Pre-season:</strong> Competitive analysis will populate automatically once league results are entered.</>
                : spurs && spurs.ga>leagueAvgGA && spurs.gf>=leagueAvgGF*0.9
                ? <><strong style={{color:P.amber}}>Read:</strong> Attack was roughly league-average, but the defence conceded {(spurs.ga-leagueAvgGA).toFixed(1)} more goals than a typical side — the table position is a defensive problem more than an attacking one.</>
                : <><strong style={{color:P.amber}}>Read:</strong> Comparing output to the {played}-game league average shows where the points actually went missing.</>}
            </div>
          </div>
        </div>
      </div>

      <div>
        <WH lg>2026/27 Premier League — Pre-Season Table</WH>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr style={{color:P.muted,fontSize:10,letterSpacing:"0.12em"}}>
              {["#","TEAM","P","W","D","L","GF","GA","GD","PTS",""].map((h,i)=>(
                <th key={i} style={{textAlign:h==="TEAM"?"left":"center",padding:"6px",fontWeight:700,borderBottom:`1px solid ${P.border}`}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {STANDINGS.map((row,i)=>{
                const ucl=played>0&&row.pos<=5,uel=played>0&&(row.pos===6||row.pos===7),uecl=played>0&&row.pos===8;
                return (
                  <tr key={i} style={{background:row.isSpurs?P.gold+"14":row.rel?P.red+"08":i%2?P.bgCard:"transparent",borderLeft:`3px solid ${row.isSpurs?P.gold:row.rel?P.red:"transparent"}`}}>
                    <td style={{textAlign:"center",padding:"6px",fontWeight:800,fontSize:13,color:ucl?P.green:uel?P.amber:uecl?P.cyan:row.rel?P.red:P.muted}}>{row.pos}</td>
                    <td style={{padding:"6px",fontWeight:row.isSpurs?900:500,fontSize:13,color:row.isSpurs?P.gold:row.rel?"#FF7788":P.text}}>{row.isSpurs?"⚡ ":""}{row.team}</td>
                    <td style={{textAlign:"center",padding:"6px",color:P.muted}}>{row.w+row.d+row.l}</td>
                    {[row.w,row.d,row.l,row.gf,row.ga].map((v,j)=><td key={j} style={{textAlign:"center",padding:"6px",color:P.muted}}>{v}</td>)}
                    <td style={{textAlign:"center",padding:"6px",fontWeight:700,color:row.gd>0?P.green:row.gd<0?P.red:P.muted}}>{row.gd>0?"+"+row.gd:row.gd}</td>
                    <td style={{textAlign:"center",padding:"6px",fontWeight:900,fontSize:14,color:row.isSpurs?P.gold:P.white}}>{row.pts}</td>
                    <td style={{padding:"6px 4px"}}>
                      {ucl&&<Chip label="UCL" color={P.cyan}/>}{uel&&<Chip label="UEL" color={P.amber}/>}
                      {uecl&&<Chip label="UECL" color={P.purple}/>}{row.rel&&<Chip label="REL" color={P.red}/>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,marginTop:10,fontSize:11,color:P.muted}}>
          <span>All clubs start level; alphabetical order until Matchday 1.</span>
          <span><span style={{color:P.gold}}>■</span> Tottenham</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
        <div>
          <WH lg>Recent Form — Last 5</WH>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {LAST5.map((r,i)=>{
              const c=r.r==="W"?P.green:r.r==="D"?P.amber:P.red;
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:P.bgCard,borderRadius:5,border:`1px solid ${P.border}`,borderLeft:`3px solid ${c}`}}>
                  <div style={{width:28,height:28,borderRadius:4,background:c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:P.bg,flexShrink:0}}>{r.r}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700,color:P.white}}>{r.home} {r.score} {r.away}</div>
                    <div style={{fontSize:11,color:P.muted,marginTop:1}}>{r.date}</div>
                  </div>
                  {r.scorer&&<span style={{fontSize:11,color:P.gold}}>⚽ {r.scorer}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <WH lg>Top Scorers 2026/27</WH>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {SCORERS.length===0 && <div style={{padding:"18px",background:P.bgCard,borderRadius:6,border:`1px solid ${P.border}`,color:P.muted,fontSize:12}}>Competitive scorer totals begin after Matchday 1.</div>}
            {SCORERS.map((p,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:P.bgCard,borderRadius:5,border:`1px solid ${P.border}`}}>
                <div style={{width:26,height:26,borderRadius:4,background:i===0?P.gold:i===1?"#C0C0C0":i===2?"#CD7F32":P.dim,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:i<3?P.bg:P.muted,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600,color:P.white,marginBottom:3}}>{p.name}</div>
                  <InlineBar pct={((p.g+p.a)/topScorerGA)*100} color={P.gold} width={90}/>
                </div>
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900,color:P.gold,lineHeight:1}}>{p.g}</div><div style={{fontSize:9,color:P.muted,fontWeight:700}}>G</div></div>
                  <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900,color:P.cyan,lineHeight:1}}>{p.a}</div><div style={{fontSize:9,color:P.muted,fontWeight:700}}>A</div></div>
                  <span style={{fontSize:11,color:P.muted}}>{p.apps}app</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
