// Right column feed — countdown, transfer alerts, headlines button, injury alerts.
// Daily Whispers moved to OverviewPanel.js (horizontal swipe strip) — no longer duplicated here.
// Edit ONLY this file to change the right sidebar widgets or their order.
import { P } from '../data/theme.js';
import { TRANSFER_BRIEFS, CONFIRMED } from '../data/transfers.js';
import { INJURIES } from '../data/squad.js';
import { WH, Bar, Countdown } from '../lib/shared.js';

const rightFeedFee=fee=>/^(?:£|€|\$)|loan|free|undisclosed|tbc/i.test(fee)?fee:`£${fee}`;

export function RightFeed({onNews,liveNews}){
  const stC=s=>s==='hot'?P.green:s==='warm'?P.amber:P.muted;
  const now=new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});

  return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>

      {/* 1. COUNTDOWN */}
      <Countdown/>

      {/* 2. TRANSFER ALERTS */}
      <div style={{background:P.transferBg,border:`1px solid ${P.transferBorder}44`,
        borderRadius:6,padding:'12px'}}>
        <WH>Transfer Alerts</WH>
        <div style={{fontSize:10,color:P.muted,marginBottom:8,fontStyle:'italic'}}>
          AI-estimated confidence from today's reporting tone — editorial judgment, not betting odds
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {/* Latest confirmed signing — dynamic, always reflects newest CONFIRMED entry */}
          {CONFIRMED.length>0&&(()=>{const c=CONFIRMED[0];return(
            <div style={{padding:'9px 10px',background:P.bgCard,borderRadius:4,
              border:`1px solid ${P.green}55`,borderLeft:`3px solid ${P.green}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:3}}>
                <span style={{fontSize:13,fontWeight:800,color:P.white}}>{c.e} {c.player}</span>
                <span style={{fontSize:10,background:P.green,color:P.bg,padding:'2px 6px',
                  borderRadius:3,fontWeight:900}}>DONE ✓</span>
              </div>
              <div style={{fontSize:11,color:P.green,fontWeight:700}}>{rightFeedFee(c.fee)} — {c.from}</div>
              <div style={{fontSize:10,color:P.muted,marginTop:2}}>{c.role!=='TBC'?c.role+' · ':''}{c.date}</div>
            </div>
          );})()}
          {[...TRANSFER_BRIEFS].sort((a,b)=>b.like-a.like).slice(0,4).map((r,i)=>(
            <div key={i} style={{padding:'9px 10px',background:P.bgCard,borderRadius:4,
              border:`1px solid ${stC(r.st)}33`,borderLeft:`3px solid ${stC(r.st)}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                <span style={{fontSize:13,fontWeight:800,color:P.white}}>{r.e} {r.player}</span>
                <span style={{fontSize:18,fontWeight:900,color:stC(r.st)}}>{r.like}%</span>
              </div>
              <div style={{fontSize:11,color:P.muted,marginBottom:4}}>from {r.from} · {rightFeedFee(r.fee)}</div>
              <Bar pct={r.like} color={stC(r.st)}/>
            </div>
          ))}
        </div>
      </div>

      {/* 3. LATEST HEADLINES BUTTON */}
      <button className="news-flash" onClick={onNews} style={{padding:'12px 14px',borderRadius:6,
        border:`1px solid ${P.gold}`,background:P.goldGlow,cursor:'pointer',
        textAlign:'left',width:'100%'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:14,fontWeight:900,color:P.gold,letterSpacing:'0.12em'}}>
            LATEST HEADLINES
          </span>
          <span style={{fontSize:10,background:P.red,color:P.white,padding:'2px 8px',
            borderRadius:3,fontWeight:800,letterSpacing:'0.1em'}}>LIVE</span>
        </div>
        <div style={{fontSize:11,color:P.muted,marginTop:4}}>
          {liveNews.items.length}+ articles · Fetched fresh every load · Last: {now}
        </div>
      </button>

      {/* 4. INJURY ALERTS */}
      <div style={{background:P.injuryBg,border:`1px solid ${P.injuryBorder}55`,
        borderRadius:6,padding:'12px'}}>
        <WH>Injury Alerts</WH>
        <div style={{display:'flex',flexDirection:'column',gap:5}}>
          {INJURIES.map((inj,i)=>(
            <div key={i} style={{padding:'8px 10px',background:'#120800',borderRadius:4,
              border:`1px solid ${P.border}`,
              borderLeft:`3px solid ${inj.sev==='long'?P.red:P.amber}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:13,fontWeight:700,color:P.white}}>
                  {inj.emoji} {inj.name}
                </span>
                <span style={{fontSize:11,fontWeight:800,
                  color:inj.sev==='long'?P.red:P.amber}}>{inj.ret}</span>
              </div>
              <div style={{fontSize:11,color:'#FFD080',marginTop:2}}>{inj.issue}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
