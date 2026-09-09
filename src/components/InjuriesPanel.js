// Injuries tab — summary counts + detailed injury list.
// Edit ONLY this file to change anything on the Injuries tab.
import { P } from '../data/theme.js';
import { INJURIES } from '../data/squad.js';
import { WH, Chip } from '../lib/shared.js';

export function InjuriesPanel(){
  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
        <div style={{padding:"14px",background:P.bgCard,borderRadius:6,borderTop:`3px solid ${P.red}`,textAlign:"center"}}><div style={{fontSize:34,fontWeight:900,color:P.red}}>{INJURIES.filter(x=>x.sev==="long").length}</div><div style={{fontSize:11,color:P.muted,fontWeight:700,letterSpacing:"0.12em",marginTop:4}}>LONG-TERM ACL</div></div>
        <div style={{padding:"14px",background:P.bgCard,borderRadius:6,borderTop:`3px solid ${P.amber}`,textAlign:"center"}}><div style={{fontSize:34,fontWeight:900,color:P.amber}}>{INJURIES.filter(x=>x.sev==="medium").length}</div><div style={{fontSize:11,color:P.muted,fontWeight:700,letterSpacing:"0.12em",marginTop:4}}>MEDIUM-TERM</div></div>
        <div style={{padding:"14px",background:P.bgCard,borderRadius:6,borderTop:`3px solid ${P.green}`,textAlign:"center"}}><div style={{fontSize:13,fontWeight:800,color:P.green,marginTop:4}}>premierinjuries.com</div><div style={{fontSize:11,color:P.muted,fontWeight:700,letterSpacing:"0.12em",marginTop:4}}>VERIFIED SOURCE</div></div>
      </div>
      <WH lg>Current Injury List — Verified 16 Aug 2026</WH>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {INJURIES.map((inj,i)=>(
          <div key={i} style={{padding:"14px 16px",background:P.injuryBg,borderRadius:6,border:`1px solid ${P.injuryBorder}55`,borderLeft:`4px solid ${inj.sev==="long"?P.red:P.amber}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:22}}>{inj.emoji}</span>
                  <span style={{fontSize:16,fontWeight:800,color:P.white}}>{inj.name}</span>
                  <Chip label={inj.pos} color={P.cyan}/>
                  <Chip label={inj.sev==="long"?"LONG-TERM ACL":"MEDIUM-TERM"} color={inj.sev==="long"?P.red:P.amber}/>
                </div>
                <div style={{fontSize:13,color:"#FFD080",lineHeight:1.5}}>{inj.issue}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:10,color:P.muted,letterSpacing:"0.12em",fontWeight:700,marginBottom:4}}>EST. RETURN</div>
                <div style={{fontSize:15,fontWeight:900,color:inj.sev==="long"?P.red:P.amber}}>{inj.ret}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{padding:"12px 14px",background:P.injuryBg,borderRadius:6,border:`1px solid ${P.red}44`,fontSize:12,color:"#FFD080",lineHeight:1.8}}>
        <strong style={{color:P.red}}>CONTEXT:</strong> At peak Spurs had 8 first-team players out simultaneously. Manager has flagged a complete review of the medical and sports science department this summer.
      </div>
    </div>
  );
}
