// Transfers tab — confirmed signings, departures, intelligence briefs.
// Edit ONLY this file to change anything on the Transfers tab.
import { P } from '../data/theme.js';
import { TRANSFER_BRIEFS, CONFIRMED, DEPARTURES } from '../data/transfers.js';
import { WH, Chip, Bar, MONTHS_SHORT } from '../lib/shared.js';

const transferPanelFee=fee=>/^(?:£|€|\$)|loan|free|undisclosed|tbc/i.test(fee)?fee:`£${fee}`;

// Parses "6 Jul" style dates (year assumed 2026, matching the rest of this
// season's data) so the header below can show the true latest brief date
// instead of a hand-typed one that goes stale every time a brief is added.
function parseBriefDate(d){
  const [day,mon]=d.split(" ");
  return new Date(2026,MONTHS_SHORT.indexOf(mon),parseInt(day,10));
}
function latestBriefDateLabel(briefs){
  const latest=briefs.reduce((a,b)=>parseBriefDate(b.date)>parseBriefDate(a.date)?b:a);
  const d=parseBriefDate(latest.date);
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} 2026`;
}

export function TransfersPanel(){
  const [exp,setExp]=useState(null);
  const stC=s=>s==="hot"?P.green:s==="warm"?P.amber:P.muted;
  // Sorted by confidence (%) descending, highest first — recompute here so
  // TRANSFER_BRIEFS in transfers.js can stay in whatever order you add to it.
  const sortedBriefs=[...TRANSFER_BRIEFS].sort((a,b)=>b.like-a.like);
  const departureStatus=note=>/COMPLETED|SOLD|Released|Sale to .* agreed|Loan ended/i.test(note)?"CONFIRMED":/confirmed per|confirmed by/i.test(note)?"CONFIRMED":"LIVE";
  const departureType=note=>/loan/i.test(note)?"LOAN":/released|contract expired/i.test(note)?"RELEASED":/interest|bid|sell|sale|permanent|SOLD|COMPLETED/i.test(note)?"PERMANENT":"DEPARTURE";
  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:18}}>
      <div>
        <WH lg>Confirmed Signings — Summer 2026</WH>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:8}}>
          {CONFIRMED.map((s,i)=>(
            <div key={i} style={{padding:"14px 16px",background:P.transferBg,borderRadius:6,border:`1px solid ${P.green}44`,borderLeft:`3px solid ${P.green}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:15,fontWeight:800,color:P.white}}>{s.e} {s.player}</div>
                  <div style={{fontSize:12,color:P.muted,marginTop:3}}>From: {s.from}</div>
                  <div style={{fontSize:11,color:P.muted,marginTop:1}}>{s.note}</div>
                  <div style={{display:"flex",gap:6,marginTop:8}}><Chip label={s.role} color={P.cyan}/><Chip label="CONFIRMED" color={P.green}/></div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:16,fontWeight:900,color:P.gold}}>{transferPanelFee(s.fee)}</div>
                  <div style={{fontSize:10,color:P.muted,marginTop:3}}>{s.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <WH lg>Departures</WH>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:8}}>
          {DEPARTURES.map((d,i)=>(
            <div key={i} style={{padding:"14px 16px",background:P.bgCard,borderRadius:6,border:`1px solid ${P.red}44`,borderLeft:`3px solid ${P.red}`}}>
              <div style={{fontSize:15,fontWeight:800,color:P.white}}>{d.player}</div>
              <div style={{fontSize:11,color:P.muted,lineHeight:1.55,marginTop:6}}>{d.note}</div>
              <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                <Chip label={departureType(d.note)} color={P.red}/>
                <Chip label={departureStatus(d.note)} color={departureStatus(d.note)==="CONFIRMED"?P.green:P.amber}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <WH lg>Transfer Intelligence Briefs — {latestBriefDateLabel(TRANSFER_BRIEFS)}</WH>
        <div style={{fontSize:12,color:P.muted,marginBottom:10}}>Intelligence from verified club sources. Tap to expand.</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {sortedBriefs.map((r,i)=>(
            <div key={i} style={{borderRadius:6,overflow:"hidden",border:`1px solid ${stC(r.st)}44`,background:P.transferBg}}>
              <div style={{padding:"12px 14px",cursor:"pointer"}} onClick={()=>setExp(exp===i?null:i)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:6}}>
                      <span style={{fontSize:18}}>{r.e}</span>
                      <span style={{fontSize:15,fontWeight:800,color:P.white}}>{r.player}</span>
                      <Chip label={r.st==="hot"?"FIRE HOT":r.st==="warm"?"WARM":"COLD"} color={stC(r.st)}/>
                      <span style={{fontSize:12,color:P.muted}}>from {r.from}</span>
                      <span style={{fontSize:13,color:P.gold,fontWeight:800}}>{transferPanelFee(r.fee)}</span>
                    </div>
                    <Bar pct={r.like} color={stC(r.st)}/>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:24,fontWeight:900,color:stC(r.st)}}>{r.like}%</div>
                    <div style={{fontSize:10,color:P.muted,marginTop:2}}>{r.date}</div>
                    <div style={{fontSize:11,color:P.muted,marginTop:4}}>{exp===i?"▲":"▾"}</div>
                  </div>
                </div>
              </div>
              {exp===i&&<div style={{padding:"0 14px 12px",borderTop:`1px solid ${P.border}`}}><div style={{paddingTop:10,fontSize:13,color:P.text,lineHeight:1.8}}>{r.brief}</div><div style={{marginTop:6,fontSize:10,color:P.muted,fontStyle:"italic"}}>Intelligence from verified club sources</div></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
