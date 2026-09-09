// News tab — fetches ALL RSS sources simultaneously on every load.
// No cache. Always fresh. Falls back to hardcoded NEWS if all feeds fail.
// Sources carry breaking news from Romano, Ornstein, O'Keefe, Jacobs, Moretto, Szy
// within 5-30 minutes of their original posts.
// Fetch/dedupe/filter logic lives in useLiveNews() (lib/shared.js), called ONCE
// in App.js and passed down here as a prop — see App.js for why.
import { P } from '../data/theme.js';
import { RSS_SOURCES, JOURNALISTS } from '../data/news.js';
import { WH } from '../lib/shared.js';

export function NewsPanel({liveNews}){
  const { items, loading, live, liveSource } = liveNews;
  const [showJournalists,setShowJournalists]=useState(false);

  const tagC=t=>t==='Official'?P.gold:t==='Transfer'?P.green:t==='Fixtures'?P.amber:t==='Injury'?P.red:P.muted;
  const tagB=t=>t==='Official'?P.gold:t==='Transfer'?P.green:t==='Fixtures'?P.amber:t==='Injury'?P.red:P.border;

  return (
    <div className="fade-in" style={{display:'flex',flexDirection:'column',gap:10}}>
      <WH lg>News Centre — Live Feed</WH>

      {/* Status bar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'8px 12px',background:P.bgCard,borderRadius:6,border:`1px solid ${P.border}`,
        flexWrap:'wrap',gap:8}}>
        <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
          {loading&&<span style={{fontSize:11,color:P.amber}}>● Fetching {RSS_SOURCES.length} live sources...</span>}
          {!loading&&live&&(
            <>
              <div style={{width:8,height:8,borderRadius:'50%',background:P.green}}/>
              <span style={{fontSize:11,color:P.green,fontWeight:700}}>LIVE</span>
              <span style={{fontSize:10,color:P.muted}}>via {liveSource}</span>
            </>
          )}
          {!loading&&!live&&(
            <>
              <div style={{width:8,height:8,borderRadius:'50%',background:P.amber}}/>
              <span style={{fontSize:11,color:P.amber,fontWeight:700}}>LIVE FETCH UNAVAILABLE — showing this morning's headlines</span>
            </>
          )}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:10,color:P.muted}}>Refreshes on every load · Tap headline to read</span>
          <button onClick={()=>setShowJournalists(v=>!v)} style={{
            background:P.gold+'18',border:`1px solid ${P.gold}44`,borderRadius:4,
            padding:'3px 10px',fontSize:10,fontWeight:700,color:P.gold,cursor:'pointer'}}>
            {showJournalists?'HIDE':'SOURCES'}
          </button>
        </div>
      </div>

      {/* Journalists panel */}
      {showJournalists&&(
        <div style={{padding:'12px 14px',background:P.bgCard,borderRadius:6,
          border:`1px solid ${P.purple}44`,borderLeft:`3px solid ${P.purple}`}}>
          <div style={{fontSize:11,color:P.gold,fontWeight:900,letterSpacing:'0.12em',marginBottom:10}}>
            MONITORED JOURNALISTS
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:6}}>
            {JOURNALISTS.map((j,i)=>(
              <div key={i} style={{padding:'8px 10px',background:P.bgPanel,borderRadius:4,
                border:`1px solid ${P.border}`}}>
                <div style={{fontSize:12,fontWeight:800,color:P.white}}>{j.name}
                  <span style={{fontSize:10,color:P.gold,marginLeft:6}}>{j.handle}</span>
                </div>
                <div style={{fontSize:10,color:P.muted,marginTop:2}}>{j.beat}</div>
                <div style={{fontSize:9,color:P.purple,marginTop:2}}>{j.platform}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:10,fontSize:10,color:P.muted,lineHeight:1.7}}>
            Breaking news from these journalists reaches the live RSS feeds above within
            <strong style={{color:P.gold}}> 5–30 minutes</strong> of their original posts on X.
          </div>
        </div>
      )}

      {/* News items */}
      {items.map((n,i)=>(
        <a key={i} href={n.url} target="_blank" rel="noopener noreferrer"
          style={{display:'block',padding:'12px 14px',background:P.bgCard,borderRadius:6,
            border:`1px solid ${P.border}`,borderLeft:`3px solid ${tagB(n.tag)}`,
            cursor:'pointer',transition:'background 0.15s'}}
          onMouseEnter={e=>e.currentTarget.style.background=P.bgHover}
          onMouseLeave={e=>e.currentTarget.style.background=P.bgCard}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'flex-start'}}>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:P.white,lineHeight:1.5}}>{n.title}</div>
              <div style={{display:'flex',gap:8,marginTop:6,alignItems:'center',flexWrap:'wrap'}}>
                <span style={{background:tagC(n.tag)+'18',color:tagC(n.tag),fontSize:10,
                  fontWeight:700,padding:'2px 7px',borderRadius:3,
                  border:`1px solid ${tagC(n.tag)}44`}}>{n.tag}</span>
                {n.isCommunity&&
                  <span style={{background:P.purple+'18',color:P.purple,fontSize:10,
                    fontWeight:700,padding:'2px 7px',borderRadius:3,
                    border:`1px solid ${P.purple}44`}} title="Community repost — corroborating signal, not a primary report">COMMUNITY</span>}
                <span style={{fontSize:11,color:P.muted}}>{n.source}</span>
                <span style={{fontSize:11,color:P.gold,fontWeight:700}}>↗ Read</span>
              </div>
            </div>
            <div style={{fontSize:10,color:P.muted,flexShrink:0,whiteSpace:'nowrap'}}>{n.date}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
