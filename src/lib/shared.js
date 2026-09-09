export const MONTHS_SHORT=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export const MONTHS_LONG=["January","February","March","April","May","June","July","August","September","October","November","December"];

// Some RSS sources that are supposedly team-scoped (e.g. Sky Sports' /rss/12040
// "Spurs" feed) leak general sport content during quiet news periods — Wimbledon,
// rugby, F1, golf, NFL etc. This filter is the single source of truth for "is this
// headline actually about Tottenham Hotspur", applied to every headline before it
// reaches the UI or the automation pipeline. Kept deliberately simple (keyword match,
// zero-cost, no API call) rather than exhaustive — false negatives (a genuinely
// relevant headline that happens not to say Tottenham/Spurs) are rare and preferable
// to false positives (Wimbledon showing up on the front page).
export function isSpursRelevant(title){
  if(!title) return false;
  const t=title.toLowerCase();
  return t.includes("tottenham")||t.includes("spurs")||t.includes("hotspur")||t.includes("thfc");
}

// Shared small components used across every panel.
// Edit this file alone to change Chip, widget headers, or bar styling globally.
import { P } from '../data/theme.js';
import { getNextMatch } from '../data/fixtures.js';
import { NEWS, RSS_SOURCES, CORS_PROXIES } from '../data/news.js';

// ── Shared live-news hook ────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for "what's the latest Spurs news right now" — used
// by both NewsPanel (News Centre tab) and OverviewPanel (front-page strip).
// Previously each had its own copy: NewsPanel did a live fetch, OverviewPanel
// just read the static NEWS fallback array directly, so the two tabs could
// show different dates for "latest" (e.g. Overview stuck on a stale 04 Jul
// cache while News Centre correctly showed today's live-fetched headlines).
// Pulling this fetch/dedupe/filter logic into one hook means every consumer
// sees the exact same data, always in sync.
export function useLiveNews(){
  const [items,setItems]=useState(NEWS);
  const [loading,setLoading]=useState(true);
  const [live,setLive]=useState(false);
  const [liveSource,setLiveSource]=useState('');

  useEffect(()=>{
    let cancelled=false;

    const parseTag=title=>{
      const t=title.toLowerCase();
      if(t.includes('sign')||t.includes('official')||t.includes('done deal')||t.includes('confirmed')) return 'Official';
      if(t.includes('transfer')||t.includes('target')||t.includes('bid')||t.includes('link')||t.includes('deal')||t.includes('fee')||t.includes('million')||t.includes('contract')) return 'Transfer';
      if(t.includes('fixture')||t.includes('kick-off')||t.includes('match')) return 'Fixtures';
      if(t.includes('injury')||t.includes('injured')||t.includes('return')) return 'Injury';
      if(t.includes('says')||t.includes('interview')||t.includes("'")||t.includes('"')) return 'Interview';
      return 'Club';
    };

    const parseFeed=(txt,sourceName,isCommunity)=>{
      const parser=new DOMParser();
      const xml=parser.parseFromString(txt,'text/xml');
      const entries=Array.from(xml.querySelectorAll('item')).slice(0,8);
      return entries.map(e=>{
        const title=(e.querySelector('title')?.textContent||'').replace(/<!\[CDATA\[|\]\]>/g,'').trim();
        const link=e.querySelector('link')?.textContent||'#';
        const pubDate=e.querySelector('pubDate')?.textContent||'';
        const d=pubDate?new Date(pubDate):new Date();
        const dateStr=d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
        return {title,source:sourceName,date:dateStr,tag:parseTag(title),url:link,ts:d.getTime(),isCommunity:!!isCommunity};
      }).filter(i=>i.title.length>10);
    };

    // Race all proxies for a source in parallel — first success wins.
    // Previously these were tried one at a time (proxy A, wait up to 8s, THEN
    // try proxy B, etc), so a single slow/dead proxy could add several extra
    // seconds per source before even reaching a working one. Racing them
    // means the wait is bounded by whichever proxy is fastest, not slowest.
    const tryProxy=async(src,proxy)=>{
      const r=await fetch(proxy+encodeURIComponent(src.url),{signal:AbortSignal.timeout(6000)});
      if(!r.ok) throw new Error('bad status');
      const txt=await r.text();
      const items=parseFeed(txt,src.name,src.isCommunity);
      if(items.length===0) throw new Error('no items');
      return items;
    };

    const fetchViaProxies=async(src)=>{
      try{
        const items=await Promise.any(CORS_PROXIES.map(proxy=>tryProxy(src,proxy)));
        return {ok:true,items,name:src.name};
      }catch(e){
        return {ok:false,items:[],name:src.name};
      }
    };

    // Fire all sources simultaneously (each internally tries its proxy list)
    const fetches=RSS_SOURCES.map(src=>fetchViaProxies(src));

    Promise.all(fetches).then(results=>{
      if(cancelled) return;
      const allItems=results.flatMap(r=>r.items);
      const sources=results.filter(r=>r.ok&&r.items.length>0).map(r=>r.name);

      if(allItems.length===0){
        setItems(NEWS);
        setLive(false);
        setLoading(false);
        return;
      }

      // Filter out off-topic content that slips through loosely-scoped feeds,
      // then deduplicate by title similarity, sort newest first.
      const seen=new Set();
      const deduped=allItems
        .filter(item=>isSpursRelevant(item.title))
        .sort((a,b)=>b.ts-a.ts)
        .filter(item=>{
          const key=item.title.slice(0,40).toLowerCase();
          if(seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .slice(0,20);

      if(deduped.length===0){
        setItems(NEWS);
        setLive(false);
        setLoading(false);
        return;
      }

      setItems(deduped);
      setLive(true);
      setLiveSource(sources.slice(0,3).join(' · ')+(sources.length>3?' +more':''));
      setLoading(false);
    });

    return ()=>{ cancelled=true; };
  },[]);

  return { items, loading, live, liveSource };
}

// Responsive breakpoint hook — drives the switch from the 3-column desktop
// shell (nav rail + centre + right feed) to the mobile shell (single panel
// + bottom tab bar) in App.js. Import wherever screen width needs checking.
const MOBILE_BREAKPOINT = 820;
export function useIsMobile(){
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}


export function SpursLogo({size}){
  size=size||40;
  return (
    <svg width={size} height={size} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 8 L192 8 L192 155 Q192 200 100 215 Q8 200 8 155 L8 8 Z" fill="white" stroke="#132257" strokeWidth="10"/>
      <ellipse cx="100" cy="130" rx="32" ry="24" fill="#132257"/>
      <path d="M108 130 Q118 110 120 95 Q122 80 116 72" stroke="#132257" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <circle cx="112" cy="66" r="18" fill="#132257"/>
      <path d="M128 62 L148 65 L128 70 Z" fill="#132257"/>
      <circle cx="118" cy="62" r="4" fill="white"/>
      <circle cx="119" cy="62" r="2" fill="#132257"/>
      <path d="M106 50 Q110 38 115 48 Q118 36 122 46 Q126 34 128 50" fill="#132257"/>
      <ellipse cx="128" cy="74" rx="6" ry="9" fill="#132257"/>
      <path d="M68 120 Q42 95 50 72 Q62 98 70 112" fill="#132257"/>
      <path d="M68 128 Q36 108 38 82 Q55 108 66 122" fill="#132257"/>
      <path d="M70 136 Q32 128 36 100 Q52 122 68 134" fill="#132257"/>
      <path d="M72 122 Q86 108 108 118" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M70 130 Q90 115 112 126" stroke="white" strokeWidth="2.5" fill="none"/>
      <line x1="100" y1="153" x2="100" y2="175" stroke="#132257" strokeWidth="8"/>
      <circle cx="100" cy="190" r="24" fill="white" stroke="#132257" strokeWidth="5"/>
      <text x="100" y="196" textAnchor="middle" fontSize="14" fontWeight="900" fill="#132257" fontFamily="Georgia,serif" letterSpacing="1">HFC</text>
      <path d="M88 175 L75 172 L88 178 Z" fill="#132257"/>
      <line x1="88" y1="175" x2="75" y2="172" stroke="#132257" strokeWidth="4"/>
    </svg>
  );
}

// Error boundary — wraps each panel in App.js so a bad data entry (e.g. a
// malformed date in fixtures.js, or a missing field in squad.js) breaks only
// that one panel instead of white-screening the whole dashboard.
// Class component required — React error boundaries have no hook equivalent.
export class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(){ return { hasError: true }; }
  componentDidCatch(error, info){
    console.error(`[THFC Dashboard] ${this.props.name || "Panel"} crashed:`, error, info);
  }
  render(){
    if (this.state.hasError) {
      return (
        <div style={{padding:"24px",textAlign:"center",background:P.bgCard,borderRadius:8,border:`1px solid ${P.red}44`}}>
          <div style={{fontSize:32,marginBottom:8}}>{"\u26A0\uFE0F"}</div>
          <div style={{fontSize:14,fontWeight:800,color:P.red,marginBottom:6}}>
            {this.props.name || "This section"} couldn't load
          </div>
          <div style={{fontSize:12,color:P.muted,marginBottom:14}}>
            There's likely a data formatting issue. The rest of the dashboard is unaffected.
          </div>
          <button onClick={()=>this.setState({hasError:false})} style={{background:P.gold,color:P.bg,border:"none",borderRadius:5,padding:"8px 16px",fontSize:12,fontWeight:800,cursor:"pointer"}}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// FM/Championship-Manager style circular role badge — used on squad cards
// and the player detail header. Same position-colour convention used
// everywhere else (purple GK, cyan defence, green midfield, amber attack).
export function RoleBadge({pos,color,size}){
  size=size||36;
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:`radial-gradient(circle at 35% 30%,${color}33,${P.bgCard})`,border:`2px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:`0 0 10px ${color}33`}}>
      <span style={{fontSize:size*0.32,fontWeight:900,color,letterSpacing:"-0.02em"}}>{pos}</span>
    </div>
  );
}

export function Chip({label,color}){
  return <span style={{background:color+'18',color,fontSize:10,fontWeight:700,letterSpacing:"0.1em",padding:"3px 8px",borderRadius:3,textTransform:"uppercase",border:`1px solid ${color}44`,whiteSpace:"nowrap",display:"inline-block"}}>{label}</span>;
}

// Widget section header — the bold gold underlined title at the top of each block.
// pass lg for the bigger 17px version used on main panel titles.
export function WH({children,lg}){
  return (
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
      <div style={{width:3,height:lg?20:16,background:P.gold,borderRadius:2,flexShrink:0}}/>
      <span style={{fontSize:lg?17:14,fontWeight:900,letterSpacing:"0.15em",color:P.gold,textTransform:"uppercase"}}>{children}</span>
      <div style={{flex:1,height:1,background:P.borderGold}}/>
    </div>
  );
}

export function Bar({pct,color}){
  return <div style={{background:P.dim,borderRadius:2,height:5,overflow:"hidden",marginTop:5}}><div className="bar-fill" style={{"--w":`${pct}%`,width:`${pct}%`,height:5,background:color||P.gold,borderRadius:2}}/></div>;
}

export function Clock(){
  const [t,setT]=useState(new Date());
  useEffect(()=>{const i=setInterval(()=>setT(new Date()),1000);return()=>clearInterval(i);},[]);
  const time = new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Singapore",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}).format(t);
  return (
    <div style={{textAlign:"right"}}>
      <div style={{fontSize:26,fontWeight:900,color:P.gold,letterSpacing:"0.05em",lineHeight:1,fontVariantNumeric:"tabular-nums"}}>
        {time.slice(0,5)}<span className="blink" style={{color:P.goldDim}}>:</span>{time.slice(6,8)}
      </div>
      <div style={{fontSize:10,color:P.muted,letterSpacing:"0.15em",marginTop:3,fontWeight:600}}>
        {t.toLocaleDateString("en-GB",{timeZone:"Asia/Singapore",weekday:"short",day:"2-digit",month:"short",year:"numeric"}).toUpperCase()} · SGT
      </div>
    </div>
  );
}

// Next match countdown — big bold version, lives at the top of the right column.
// Dynamic: pulls the soonest not-yet-played fixture from fixtures.js (friendly
// or competitive) — never hardcode a specific match/date here again.
export function Countdown(){
  const match = getNextMatch();
  const target = match ? new Date(match.date) : null;
  const [diff,setDiff]=useState(target?Math.max(0,target-new Date()):0);
  useEffect(()=>{
    if(!target) return;
    const i=setInterval(()=>setDiff(Math.max(0,target-new Date())),1000);
    return()=>clearInterval(i);
  },[match&&match.date]);
  if(!match){
    return (
      <div style={{background:`linear-gradient(145deg,${P.bgCard},${P.bgPanel})`,border:`2px solid ${P.gold}`,borderRadius:8,padding:"14px 16px",textAlign:"center",boxShadow:`0 0 20px ${P.gold}22`}}>
        <div style={{fontSize:11,color:P.gold,letterSpacing:"0.18em",marginBottom:6,fontWeight:900}}>NEXT MATCH</div>
        <div style={{fontSize:12,color:P.muted}}>No upcoming fixtures loaded — add to fixtures.js</div>
      </div>
    );
  }
  const p=n=>String(Math.floor(n)).padStart(2,"0");
  const d=diff/86400000,h=(diff%86400000)/3600000,m=(diff%3600000)/60000,s=(diff%60000)/1000;
  const vs = match.venue==="H"?"(H)":match.venue==="A"?"(A)":"(N)";
  return (
    <div style={{background:`linear-gradient(145deg,${P.bgCard},${P.bgPanel})`,border:`2px solid ${P.gold}`,borderRadius:8,padding:"14px 16px",textAlign:"center",boxShadow:`0 0 20px ${P.gold}22`}}>
      <div style={{fontSize:11,color:P.gold,letterSpacing:"0.18em",marginBottom:10,fontWeight:900}}>NEXT MATCH</div>
      <div style={{fontSize:14,color:P.white,fontWeight:800,marginBottom:2}}>{match.opponent.toUpperCase()} {vs} · {match.comp}</div>
      <div style={{fontSize:10,color:P.muted,marginBottom:12}}>{match.note || new Intl.DateTimeFormat("en-SG",{timeZone:"Asia/Singapore",weekday:"short",day:"numeric",month:"short",hour:"numeric",minute:"2-digit",hour12:true}).format(target)+" SGT"}</div>
      <div style={{display:"flex",gap:8,justifyContent:"center",alignItems:"baseline"}}>
        {[[p(d),"DAYS"],[p(h),"HRS"],[p(m),"MIN"],[p(s),"SEC"]].map(([v,l])=>(
          <div key={l} style={{textAlign:"center",flex:1}}>
            <div style={{fontSize:34,fontWeight:900,color:P.gold,fontVariantNumeric:"tabular-nums",lineHeight:1,textShadow:`0 0 12px ${P.gold}66`}}>{v}</div>
            <div style={{fontSize:9,color:P.muted,marginTop:4,fontWeight:800,letterSpacing:"0.12em"}}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
