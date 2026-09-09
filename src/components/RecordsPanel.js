// Records tab — trophy cabinet, domestic & European records.
// Edit ONLY this file to change anything on the Records tab.
import { P } from '../data/theme.js';
import { TROPHIES, DOM_RECORDS, EUR_RECORDS } from '../data/records.js';


export function RecordsPanel(){
  const [sec,setSec]=useState("trophies");
  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {[["trophies","TROPHY CABINET"],["domestic","DOMESTIC RECORDS"],["european","EUROPEAN RECORDS"]].map(([id,label])=>(
          <button key={id} onClick={()=>setSec(id)} style={{background:sec===id?P.gold:P.bgCard,color:sec===id?P.bg:P.muted,border:`1px solid ${sec===id?P.gold:P.border}`,borderRadius:5,padding:"8px 16px",fontSize:12,fontWeight:800,cursor:"pointer",letterSpacing:"0.1em"}}>{label}</button>
        ))}
      </div>
      {sec==="trophies"&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{padding:"10px 14px",background:P.bgCard,borderRadius:5,border:`1px solid ${P.borderGold}`,fontSize:12,color:P.muted,lineHeight:1.8}}>
            <span style={{color:P.gold,fontWeight:800}}>TOTAL HONOURS:</span> 2 League · 8 FA Cup · 4 League Cup · 3 European (UEFA Cup x2 + Europa League x1 + Cup Winners Cup x1) · 7 Shield
          </div>
          {TROPHIES.map((t,i)=>(
            <div key={i} style={{padding:"14px 16px",background:P.bgCard,borderRadius:6,border:`1px solid ${P.border}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:800,color:P.gold,marginBottom:6}}>{t.comp}</div>
                  <div style={{fontSize:12,color:P.muted,marginBottom:6}}>{t.years}</div>
                  <div style={{fontSize:13,color:P.text,lineHeight:1.6}}>{t.note}</div>
                </div>
                <div style={{textAlign:"center",flexShrink:0}}><div style={{fontSize:40,fontWeight:900,color:P.gold,lineHeight:1}}>{t.wins}</div><div style={{fontSize:10,color:P.muted,fontWeight:700,letterSpacing:"0.12em"}}>WINS</div></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {sec==="domestic"&&<div style={{display:"flex",flexDirection:"column",gap:6}}>{DOM_RECORDS.map((r,i)=>(
        <div key={i} style={{padding:"12px 14px",background:P.bgCard,borderRadius:5,border:`1px solid ${P.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
          <div style={{flex:1}}><div style={{fontSize:10,color:P.muted,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:4}}>{r.cat}</div><div style={{fontSize:16,fontWeight:800,color:P.gold}}>{r.record}</div></div>
          <span style={{background:P.amber+"18",color:P.amber,fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:3,border:`1px solid ${P.amber}44`,whiteSpace:"nowrap"}}>{r.when}</span>
        </div>
      ))}</div>}
      {sec==="european"&&<div style={{display:"flex",flexDirection:"column",gap:6}}>{EUR_RECORDS.map((r,i)=>(
        <div key={i} style={{padding:"12px 14px",background:P.bgCard,borderRadius:5,border:`1px solid ${P.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
          <div style={{flex:1}}><div style={{fontSize:10,color:P.muted,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:4}}>{r.cat}</div><div style={{fontSize:16,fontWeight:800,color:P.gold}}>{r.record}</div></div>
          <span style={{background:P.cyan+"18",color:P.cyan,fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:3,border:`1px solid ${P.cyan}44`,whiteSpace:"nowrap"}}>{r.when}</span>
        </div>
      ))}</div>}
    </div>
  );
}
