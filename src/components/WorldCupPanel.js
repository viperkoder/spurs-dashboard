// World Cup tab — Spurs players tracker with full match stats.
// Edit ONLY this file to change anything on the World Cup tab.
import { P } from '../data/theme.js';
import { WC } from '../data/worldcup.js';
import { WH, Chip } from '../lib/shared.js';


export function WorldCupPanel(){
  const [exp,setExp]=useState(null);
  const active=WC.filter(p=>!p.out);
  const out=WC.filter(p=>p.out);
  const rc=r=>r.startsWith("W")?P.green:r.startsWith("L")?P.red:r.startsWith("D")?P.amber:P.muted;
  const rtgC=r=>{if(r==="—")return P.muted;const n=parseFloat(r);return n>=7.5?P.green:n>=7.0?P.gold:n>=6.5?P.amber:P.red;};

  const Card=(p,i)=>(
    <div key={i} style={{borderRadius:6,overflow:"hidden",marginBottom:8,border:`1px solid ${p.out?P.red+"44":P.gold+"44"}`,background:P.bgCard}}>
      <div style={{padding:"12px 14px",cursor:"pointer"}} onClick={()=>setExp(exp===i?null:i)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,marginBottom:8}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
              <span style={{fontSize:22}}>{p.e}</span>
              <span style={{fontSize:15,fontWeight:900,color:P.white}}>{p.name}</span>
              <Chip label={p.pos} color={P.cyan}/>
              <Chip label={p.out?"ELIMINATED":"IN TOURNAMENT"} color={p.out?P.red:P.green}/>
            </div>
            <div style={{fontSize:11,color:P.muted,marginBottom:6}}>{p.country} · Group {p.group} · {p.progress}</div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {p.results.map((r,j)=><span key={j} style={{fontSize:11,padding:"3px 8px",background:rc(r)+"22",border:`1px solid ${rc(r)}55`,borderRadius:3,color:rc(r),fontWeight:700}}>{r}</span>)}
            </div>
          </div>
          <div style={{textAlign:"center",flexShrink:0,minWidth:60}}>
            <div style={{fontSize:30,fontWeight:900,lineHeight:1,color:rtgC(p.rtg)}}>{p.rtg}</div>
            <div style={{fontSize:9,color:P.muted,fontWeight:700,letterSpacing:"0.1em",marginTop:2}}>AVG RTG</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6,padding:"10px",background:P.bgPanel,borderRadius:5}}>
          {[["GP",p.gp,P.white],["XI",p.xi,P.green],["SUB",p.sub,P.amber],["BENCH",p.bench,P.muted],["GOALS",p.goals,P.gold],["ASST",p.ast,P.cyan],["RTG",p.rtg,rtgC(p.rtg)]].map(([l,v,c],j)=>(
            <div key={j} style={{textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:900,color:c,lineHeight:1}}>{v}</div>
              <div style={{fontSize:9,color:P.muted,fontWeight:700,letterSpacing:"0.08em",marginTop:3}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:8,fontSize:10,color:P.muted}}>{exp===i?"▲ Collapse":"▾ Tap for match notes"}</div>
      </div>
      {exp===i&&<div style={{padding:"0 14px 12px",borderTop:`1px solid ${P.border}`}}><div style={{paddingTop:10,fontSize:13,color:P.text,lineHeight:1.8}}>{p.note}</div><div style={{marginTop:8,fontSize:12,fontWeight:700,color:p.out?P.red:P.green}}>{p.progress}</div></div>}
    </div>
  );

  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:16}}>
      <WH lg>2026 FIFA World Cup — Archived</WH>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
        {[[WC.length,"TRACKED PLAYERS",P.green],[out.length,"TOURNAMENT COMPLETE",P.red],[WC.reduce((a,p)=>a+p.goals,0),"TOTAL GOALS",P.gold],[WC.reduce((a,p)=>a+p.ast,0),"TOTAL ASSISTS",P.cyan]].map(([v,l,c],i)=>(
          <div key={i} style={{padding:"14px",background:P.bgCard,borderRadius:6,border:`1px solid ${P.border}`,borderTop:`3px solid ${c}`,textAlign:"center"}}>
            <div style={{fontSize:34,fontWeight:900,color:c,lineHeight:1}}>{v}</div>
            <div style={{fontSize:11,color:P.muted,fontWeight:700,letterSpacing:"0.12em",marginTop:5}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{padding:"8px 14px",background:P.bgCard,borderRadius:5,border:`1px solid ${P.borderGold}`,fontSize:11,color:P.muted,lineHeight:1.7}}>
        <span style={{color:P.gold,fontWeight:800}}>COLUMN GUIDE:</span> GP = Games Played · XI = Started First Eleven · SUB = Came on as substitute · BENCH = Unused sub · GOALS · ASST = Assists · RTG = Avg match rating (Sofascore-style 1-10)
      </div>
      {active.length>0 && <div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:P.green}}/>
          <span style={{fontSize:15,fontWeight:900,color:P.green,letterSpacing:"0.12em"}}>ACTIVE PLAYERS ({active.length})</span>
        </div>
        {active.map((p,i)=>Card(p,i))}
      </div>}
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:P.red}}/>
          <span style={{fontSize:15,fontWeight:900,color:P.red,letterSpacing:"0.12em"}}>FINAL TOURNAMENT STATUS ({out.length})</span>
        </div>
        {out.map((p,i)=>Card(p,active.length+i))}
      </div>
      <div style={{padding:"10px 14px",background:P.bgCard,borderRadius:5,border:`1px solid ${P.borderGold}`,fontSize:11,color:P.muted,lineHeight:1.7}}>
        <span style={{color:P.gold,fontWeight:800}}>ARCHIVED:</span> Tournament completed 19 Jul 2026. Spain beat Argentina 1-0 after extra time; England beat France 6-4 for third place.
      </div>
    </div>
  );
}
