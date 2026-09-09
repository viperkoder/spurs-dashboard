// Player detail — FM/Championship-Manager style pop-up player card.
// Opened from a Squad card click or the top-bar search. Every stat shown
// here is derived from real fields already in data/squad.js, data/standings.js
// and data/squad.js's INJURIES list — nothing fabricated. Where there isn't
// real granular data (e.g. no per-90 xG), the bar is honestly labelled by
// what it actually measures (season involvement, goal contribution) rather
// than dressed up as an attribute rating that doesn't exist.
import { P } from '../data/theme.js';
import { SQUAD, INJURIES } from '../data/squad.js';
import { SCORERS } from '../data/standings.js';
import { Chip, RoleBadge } from '../lib/shared.js';

const POS_COLOR = pos => pos==="GK" ? P.purple
  : ["CB","RB","LB"].includes(pos) ? P.cyan
  : ["DM","CM","AM"].includes(pos) ? P.green
  : P.amber;

const STATUS_COLOR = sc => sc==="green" ? P.green : sc==="cyan" ? P.cyan
  : sc==="red" ? P.red : sc==="amber" ? P.amber : P.muted;

function AttrBar({label,pct,color}){
  return (
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:P.muted,fontWeight:700,marginBottom:3}}>
        <span>{label}</span><span style={{color}}>{Math.round(pct)}%</span>
      </div>
      <div style={{height:8,background:P.dim,borderRadius:4,overflow:"hidden"}}>
        <div className="bar-fill" style={{"--w":`${pct}%`,width:`${pct}%`,height:"100%",background:color,borderRadius:4}}/>
      </div>
    </div>
  );
}

export function PlayerDetail({name,onClose}){
  const p = SQUAD.find(x=>x.name===name);
  if (!p) return null;
  const color = POS_COLOR(p.pos);
  const injury = INJURIES.find(inj => inj.name.toLowerCase().includes(p.name.replace(/^[A-Z]\.\s*/,"").toLowerCase()));
  const scorerRow = SCORERS.find(s=>s.name===p.name);
  const involvementPct = Math.min(100, (p.apps/38)*100);
  const topGoals = Math.max(...SQUAD.map(x=>x.g), 1);
  const goalPct = Math.min(100, (p.g/topGoals)*100);
  // Contract timeline: map contract year text onto a 2025->2032 bar so a
  // "2026" (expiring soon) reads as visually urgent vs "2031" (long deal).
  const contractYear = parseInt(p.con, 10);
  const contractPct = p.con==="EXPIRED" ? 100 : p.con==="TBC" ? 0
    : !isNaN(contractYear) ? Math.min(100, Math.max(4, ((contractYear-2025)/7)*100)) : 0;
  const contractColor = p.con==="EXPIRED" ? P.red : p.con==="2026" ? P.red : p.con==="2027" ? P.amber : p.con==="TBC" ? P.cyan : P.green;

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"#000A",backdropFilter:"blur(3px)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} className="fade-in" style={{width:"min(480px,100%)",maxHeight:"88vh",overflowY:"auto",background:P.bgPanel,borderRadius:10,border:`1px solid ${P.borderGold}`,boxShadow:"0 20px 60px #000A"}}>

        {/* Header — pitch-green "team sheet" banner */}
        <div style={{background:`linear-gradient(135deg,${P.pitch},${P.bg} 70%)`,borderBottom:`2px solid ${color}`,padding:"20px 20px 16px",position:"relative"}}>
          <button onClick={onClose} style={{position:"absolute",top:12,right:12,width:28,height:28,borderRadius:"50%",border:`1px solid ${P.border}`,background:P.bgCard,color:P.muted,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <RoleBadge pos={p.pos} color={color} size={52}/>
            <div>
              <div style={{fontSize:20,fontWeight:900,color:P.white,lineHeight:1.1}}>{p.name} <span style={{fontSize:18}}>{p.e}</span></div>
              <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>
                <Chip label={p.pos} color={color}/>
                {p.wc && <Chip label={`WC ${p.wc}`} color={P.gold}/>}
                <Chip label={p.st} color={STATUS_COLOR(p.sc)}/>
              </div>
            </div>
          </div>
        </div>

        <div style={{padding:20}}>
          {/* Season involvement / goal threat — real, derived from apps & goals */}
          <AttrBar label="Season Involvement (apps out of 38)" pct={involvementPct} color={P.cyan}/>
          <AttrBar label="Goal Threat (goals vs squad top scorer)" pct={goalPct} color={P.gold}/>

          <div style={{display:"flex",gap:16,margin:"14px 0",padding:"12px",background:P.bgCard,borderRadius:6,border:`1px solid ${P.border}`}}>
            <div style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:900,color:P.white}}>{p.apps}</div>
              <div style={{fontSize:9,color:P.muted,fontWeight:700,letterSpacing:"0.1em"}}>APPS</div>
            </div>
            <div style={{flex:1,textAlign:"center",borderLeft:`1px solid ${P.border}`,borderRight:`1px solid ${P.border}`}}>
              <div style={{fontSize:22,fontWeight:900,color:P.gold}}>{p.g}</div>
              <div style={{fontSize:9,color:P.muted,fontWeight:700,letterSpacing:"0.1em"}}>GOALS</div>
            </div>
            <div style={{flex:1,textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:900,color:P.cyan}}>{scorerRow ? scorerRow.a : "—"}</div>
              <div style={{fontSize:9,color:P.muted,fontWeight:700,letterSpacing:"0.1em"}}>ASSISTS</div>
            </div>
          </div>

          {/* Contract timeline */}
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:P.muted,fontWeight:700,marginBottom:4}}>
              <span>Contract</span><span style={{color:contractColor,fontWeight:800}}>{p.con}</span>
            </div>
            <div style={{height:8,background:P.dim,borderRadius:4,overflow:"hidden",position:"relative"}}>
              <div style={{width:`${contractPct}%`,height:"100%",background:contractColor,borderRadius:4}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:P.dim,marginTop:2}}>
              <span>2025</span><span>2032+</span>
            </div>
          </div>

          {/* Injury cross-reference, only if this player is on the active injury list */}
          {injury && (
            <div style={{padding:"12px 14px",background:P.injuryBg,borderRadius:6,borderLeft:`3px solid ${P.injuryBorder}`,marginBottom:6}}>
              <div style={{fontSize:11,fontWeight:800,color:P.amber,letterSpacing:"0.1em",marginBottom:4}}>MEDICAL — {injury.sev.toUpperCase()} TERM</div>
              <div style={{fontSize:12,color:P.text,lineHeight:1.5,marginBottom:4}}>{injury.issue}</div>
              <div style={{fontSize:11,color:P.muted}}>Expected return: <strong style={{color:P.white}}>{injury.ret}</strong></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
