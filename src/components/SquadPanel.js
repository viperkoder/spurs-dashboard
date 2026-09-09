// Squad tab — position filter, player cards, contract status.
// Edit ONLY this file to change anything on the Squad tab.
// Cards are clickable — onSelect (passed from App.js) opens the FM-style
// PlayerDetail card for that player.
import { P } from '../data/theme.js';
import { SQUAD } from '../data/squad.js';
import { WH, Chip, RoleBadge } from '../lib/shared.js';

export function SquadPanel({onSelect}){
  const [filter,setFilter]=useState("ALL");
  const positions=["ALL","GK","CB","RB","LB","DM","CM","AM","RW","LW","FW","ST"];
  const filtered=filter==="ALL"?SQUAD:SQUAD.filter(p=>p.pos===filter);
  const posC=pos=>pos==="GK"?P.purple:["CB","RB","LB"].includes(pos)?P.cyan:["DM","CM","AM"].includes(pos)?P.green:P.amber;
  const stC=c=>c==="green"?P.green:c==="cyan"?P.cyan:c==="red"?P.red:c==="amber"?P.amber:P.muted;
  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
        {positions.map(pos=>(
          <button key={pos} onClick={()=>setFilter(pos)} style={{background:filter===pos?P.gold:P.bgCard,color:filter===pos?P.bg:P.muted,border:`1px solid ${filter===pos?P.gold:P.border}`,borderRadius:4,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer",letterSpacing:"0.1em",transition:"all 0.15s"}}>{pos}</button>
        ))}
      </div>
      <WH lg>First Team Squad 2026/27 — {filtered.length} Players</WH>
      <div style={{padding:"10px 14px",background:P.bgCard,borderRadius:5,borderLeft:`3px solid ${P.gold}`,fontSize:12,color:P.muted,lineHeight:1.8}}>
        <strong style={{color:P.gold}}>Season reset:</strong> Competitive appearances and goals are zeroed. Romero, Spence and Solomon departures are reflected; transfer-window movement remains live.
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:8}}>
        {filtered.map((p,i)=>(
          <div key={i} onClick={()=>onSelect&&onSelect(p.name)} className="squad-card" style={{padding:"12px 14px",background:P.bgCard,borderRadius:6,border:`1px solid ${p.wc?P.gold+"55":P.border}`,borderTop:`3px solid ${posC(p.pos)}`,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <RoleBadge pos={p.pos} color={posC(p.pos)} size={32}/>
              <span style={{fontSize:20}}>{p.e}</span>
            </div>
            <div style={{fontSize:14,fontWeight:800,color:P.white,marginBottom:2}}>{p.name}</div>
            {p.wc&&<div style={{fontSize:11,color:P.gold,fontWeight:700,marginBottom:4}}>WC {p.wc}</div>}
            {p.apps>0&&<div style={{display:"flex",gap:10,marginBottom:5}}><span style={{fontSize:12,color:P.muted}}>{p.apps} apps</span><span style={{fontSize:12,color:P.gold,fontWeight:700}}>Goals {p.g}</span></div>}
            <div style={{fontSize:11,fontWeight:700,color:stC(p.sc)}}>{p.st}</div>
            <div style={{marginTop:4,fontSize:10,color:p.con==="2026"?P.red:p.con==="2027"?P.amber:P.muted,fontWeight:600}}>Contract: {p.con}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
