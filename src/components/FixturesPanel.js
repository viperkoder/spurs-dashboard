// Fixtures tab — Pre-Season / Premier League / Cups sub-tabs.
// Edit ONLY this file to change anything on the Fixtures tab's layout.
// Edit src/data/fixtures.js to change the actual match data.
import { P } from '../data/theme.js';
import { PRESEASON, PREMIER_LEAGUE, CUPS } from '../data/fixtures.js';
import { WH, Chip, MONTHS_LONG } from '../lib/shared.js';

function monthKey(dateStr){
  const d=new Date(dateStr);
  return `${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

function FixtureRow({f, label}){
  const played = f.score !== null && f.score !== undefined;
  const venueLabel = f.venue==="H"?"(H)":f.venue==="A"?"(A)":"(N)";
  const d = new Date(f.date);
  const dateLabel = d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});
  const timeLabel = d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:P.bgCard,borderRadius:5,border:`1px solid ${P.border}`,borderLeft:`3px solid ${played?P.green:P.muted}`,gap:10}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          {label && <span style={{fontSize:10,color:P.gold,fontWeight:800}}>{label}</span>}
          <span style={{fontSize:13,fontWeight:700,color:P.white}}>{f.opponent} {venueLabel}</span>
          {f.provisional && <span title="Official date, provisional — subject to TV rescheduling" style={{fontSize:9,color:P.muted,border:`1px solid ${P.border}`,borderRadius:3,padding:"1px 5px"}}>PROV</span>}
        </div>
        <div style={{fontSize:11,color:P.muted,marginTop:2}}>{dateLabel} · {timeLabel}{f.note?` — ${f.note}`:""}</div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        {played
          ? <div style={{fontSize:18,fontWeight:900,color:P.green}}>{f.score}</div>
          : <Chip label="Upcoming" color={P.muted}/>}
      </div>
    </div>
  );
}

// Groups a flat fixture list by month, auto-collapsing any month where every
// fixture already has a score (fully played) so the page doesn't open as one
// giant scroll — you land near whatever's actually still relevant.
function MonthGroups({fixtures, labelFn}){
  const [open,setOpen]=useState(null); // month key of the one manually toggled, if any
  const groups = {};
  fixtures.forEach(f=>{
    const k=monthKey(f.date);
    (groups[k]=groups[k]||[]).push(f);
  });
  const keys = Object.keys(groups).sort((a,b)=>new Date(groups[a][0].date)-new Date(groups[b][0].date));
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {keys.map(k=>{
        const items=groups[k];
        const allPlayed = items.every(f=>f.score!==null && f.score!==undefined);
        const isOpen = open===k ? true : open===k+"-closed" ? false : !allPlayed;
        return (
          <div key={k}>
            <div onClick={()=>setOpen(isOpen?k+"-closed":k)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",padding:"6px 2px"}}>
              <span style={{fontSize:12,fontWeight:800,color:P.gold,letterSpacing:"0.1em",textTransform:"uppercase"}}>{k}{allPlayed?" — played":""}</span>
              <span style={{fontSize:11,color:P.muted}}>{isOpen?"▲":"▾"}</span>
            </div>
            {isOpen && (
              <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:4}}>
                {items.map((f,i)=><FixtureRow key={i} f={f} label={labelFn?labelFn(f):null}/>)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function FixturesPanel(){
  const [tab,setTab]=useState("pl");
  const tabs=[
    {id:"preseason", label:"Pre-Season"},
    {id:"pl",        label:"Premier League"},
    {id:"cups",      label:"Cups"},
  ];
  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:16}}>
      <WH lg>Fixtures</WH>
      <div style={{display:"flex",gap:6,borderBottom:`1px solid ${P.border}`,paddingBottom:8}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 14px",borderRadius:5,border:"none",cursor:"pointer",background:tab===t.id?P.gold+"1A":"transparent",color:tab===t.id?P.gold:P.muted,fontSize:12,fontWeight:800,letterSpacing:"0.05em"}}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>
      {tab==="preseason" && <MonthGroups fixtures={PRESEASON}/>}
      {tab==="pl" && <MonthGroups fixtures={PREMIER_LEAGUE} labelFn={f=>`MD${f.mw}`}/>}
      {tab==="cups" && <MonthGroups fixtures={CUPS} labelFn={f=>f.comp==="Carabao Cup"?"CARABAO":"FA CUP"}/>}
    </div>
  );
}
