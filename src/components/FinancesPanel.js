// Finances tab — PSR/SCR-lens view of the summer window: confirmed spend
// and income, in-progress business, and a projected net position.
// Edit ONLY this file to change anything on the Finances tab.
// Edit src/data/finances.js to change the underlying numbers.
import { P } from '../data/theme.js';
import { CONFIRMED_SPEND, CONFIRMED_INCOME, IN_PROGRESS_SALES, IN_PROGRESS_BUYS, FINANCE_CONTEXT } from '../data/finances.js';
import { WH, Chip, Bar } from '../lib/shared.js';

const fmt = n => `£${n.toLocaleString('en-GB',{minimumFractionDigits:n%1?1:0,maximumFractionDigits:1})}m`;
const fmtSigned = n => `${n>=0?'+':'−'}${fmt(Math.abs(n))}`;
const sum = (arr,key) => arr.reduce((t,x)=>t+x[key],0);
const weightedSum = (arr,feeKey) => arr.reduce((t,x)=>t+x[feeKey]*(x.likelihood/100),0);

function MoneyCard({title,total,color,items,feeKey,subLabel}){
  return (
    <div style={{background:P.bgCard,border:`1px solid ${color}44`,borderRadius:6,padding:'14px 16px',flex:1,minWidth:220}}>
      <div style={{fontSize:11,color:P.muted,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>{title}</div>
      <div style={{fontSize:28,fontWeight:900,color,marginTop:4}}>{fmt(total)}</div>
      {subLabel && <div style={{fontSize:10,color:P.muted,marginTop:2}}>{subLabel}</div>}
      <div style={{display:'flex',flexDirection:'column',gap:4,marginTop:10}}>
        {items.map((it,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:11,padding:'4px 0',borderTop:i>0?`1px solid ${P.border}`:'none'}}>
            <span style={{color:P.text}}>{it.player}{it[feeKey]===0?' (free)':''}</span>
            <span style={{color:it[feeKey]===0?P.muted:color,fontWeight:700}}>{it[feeKey]===0?'—':fmt(it[feeKey])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InProgressRow({label,to,fee,askOrFee,likelihood,note}){
  const c = likelihood>=65?P.green:likelihood>=45?P.amber:P.muted;
  return (
    <div style={{padding:'10px 12px',background:P.bgCard,borderRadius:5,border:`1px solid ${c}33`,borderLeft:`3px solid ${c}`,marginBottom:6}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8}}>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:800,color:P.white}}>{label}</div>
          <div style={{fontSize:11,color:P.muted,marginTop:2}}>{to}</div>
          {note && <div style={{fontSize:10,color:P.muted,marginTop:3,fontStyle:'italic'}}>{note}</div>}
        </div>
        <div style={{textAlign:'right',flexShrink:0}}>
          <div style={{fontSize:15,fontWeight:900,color:c}}>{fmt(askOrFee)}</div>
          <div style={{fontSize:10,color:c,fontWeight:700,marginTop:2}}>{likelihood}%</div>
        </div>
      </div>
      <Bar pct={likelihood} color={c}/>
    </div>
  );
}

export function FinancesPanel(){
  const confirmedSpend = sum(CONFIRMED_SPEND,'fee');
  const confirmedIncome = sum(CONFIRMED_INCOME,'fee');
  const confirmedNet = confirmedSpend - confirmedIncome;

  const salesCeiling = sum(IN_PROGRESS_SALES,'askGBP');
  const salesWeighted = weightedSum(IN_PROGRESS_SALES,'askGBP');
  const buysCeiling = sum(IN_PROGRESS_BUYS,'feeGBP');
  const buysWeighted = weightedSum(IN_PROGRESS_BUYS,'feeGBP');

  const projectedNetWeighted = confirmedNet + buysWeighted - salesWeighted;
  const projectedNetCeiling = confirmedNet + buysCeiling - salesCeiling;

  return (
    <div className="fade-in" style={{display:'flex',flexDirection:'column',gap:18}}>
      <div>
        <WH lg>Summer 2026 — Financial Position</WH>
        <div style={{fontSize:12,color:P.muted,lineHeight:1.7,marginBottom:4}}>{FINANCE_CONTEXT}</div>
      </div>

      {/* CONFIRMED */}
      <div>
        <WH>Confirmed Business</WH>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <MoneyCard title="Total Spend" total={confirmedSpend} color={P.red} items={CONFIRMED_SPEND} feeKey="fee"/>
          <MoneyCard title="Total Income" total={confirmedIncome} color={P.green} items={CONFIRMED_INCOME} feeKey="fee"/>
          <div style={{background:P.transferBg,border:`1px solid ${P.gold}55`,borderRadius:6,padding:'14px 16px',flex:1,minWidth:220,display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div style={{fontSize:11,color:P.muted,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>Net Spend (Confirmed)</div>
            <div style={{fontSize:32,fontWeight:900,color:P.gold,marginTop:4}}>{fmt(confirmedNet)}</div>
            <div style={{fontSize:10,color:P.muted,marginTop:6}}>Fees only — free transfers add wage cost, not shown here.</div>
          </div>
        </div>
      </div>

      {/* IN PROGRESS */}
      <div>
        <WH>In Progress — Outgoing (Potential Income)</WH>
        <div style={{fontSize:11,color:P.muted,marginBottom:8}}>Nothing here is booked. Figures are Spurs' asking prices, not agreed fees.</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:8,marginBottom:10}}>
          {IN_PROGRESS_SALES.map((s,i)=>(
            <InProgressRow key={i} label={s.player} to={s.to} askOrFee={s.askGBP} likelihood={s.likelihood} note={s.note}/>
          ))}
        </div>
        <div style={{display:'flex',gap:16,fontSize:12}}>
          <span style={{color:P.muted}}>If all sales complete at asking price: <b style={{color:P.green}}>{fmt(salesCeiling)}</b></span>
          <span style={{color:P.muted}}>Likelihood-weighted expected income: <b style={{color:P.green}}>{fmt(salesWeighted)}</b></span>
        </div>
      </div>

      <div>
        <WH>In Progress — Incoming Targets (Potential Spend)</WH>
        <div style={{fontSize:11,color:P.muted,marginBottom:8}}>Live targets only (≥25% likelihood) — see the Transfers tab for the full brief list.</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:8,marginBottom:10}}>
          {IN_PROGRESS_BUYS.map((b,i)=>(
            <InProgressRow key={i} label={b.player} to={`from ${b.from}`} askOrFee={b.feeGBP} likelihood={b.likelihood} note={b.note}/>
          ))}
        </div>
        <div style={{display:'flex',gap:16,fontSize:12}}>
          <span style={{color:P.muted}}>If all targets land: <b style={{color:P.red}}>{fmt(buysCeiling)}</b></span>
          <span style={{color:P.muted}}>Likelihood-weighted expected spend: <b style={{color:P.red}}>{fmt(buysWeighted)}</b></span>
        </div>
      </div>

      {/* PROJECTED NET */}
      <div>
        <WH lg>Projected Net Position</WH>
        <div style={{fontSize:11,color:P.muted,marginBottom:10,fontStyle:'italic'}}>
          Illustrative, not a forecast — combines confirmed net spend with in-progress business at two scenarios.
        </div>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <div style={{background:P.bgCard,border:`1px solid ${P.borderGold}`,borderRadius:6,padding:'16px 18px',flex:1,minWidth:240}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <Chip label="Weighted / Realistic" color={P.cyan}/>
            </div>
            <div style={{fontSize:30,fontWeight:900,color:projectedNetWeighted>=0?P.red:P.green}}>{fmtSigned(projectedNetWeighted)}</div>
            <div style={{fontSize:11,color:P.muted,marginTop:6}}>Confirmed net spend + likelihood-weighted incoming targets − likelihood-weighted outgoing sales.</div>
          </div>
          <div style={{background:P.bgCard,border:`1px solid ${P.border}`,borderRadius:6,padding:'16px 18px',flex:1,minWidth:240}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <Chip label="Ceiling / If Everything Lands" color={P.muted}/>
            </div>
            <div style={{fontSize:30,fontWeight:900,color:projectedNetCeiling>=0?P.red:P.green}}>{fmtSigned(projectedNetCeiling)}</div>
            <div style={{fontSize:11,color:P.muted,marginTop:6}}>Assumes every current target signs AND every current sale completes at asking price — an upper bound, not a prediction.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
