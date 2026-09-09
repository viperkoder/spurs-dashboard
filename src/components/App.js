// App shell — top bar, left nav rail, panel router, status bar.
// Edit ONLY this file to change layout structure, nav order, or top/bottom bars.
import { P } from '../data/theme.js';
import { SpursLogo, Clock, useIsMobile, useLiveNews, ErrorBoundary } from '../lib/shared.js';
import { SQUAD } from '../data/squad.js';
import { OverviewPanel } from './OverviewPanel.js';
import { SquadPanel } from './SquadPanel.js';
import { InjuriesPanel } from './InjuriesPanel.js';
import { FixturesPanel } from './FixturesPanel.js';
import { TransfersPanel } from './TransfersPanel.js';
import { FinancesPanel } from './FinancesPanel.js';
import { RecordsPanel } from './RecordsPanel.js';
import { NewsPanel } from './NewsPanel.js';
import { WorldCupPanel } from './WorldCupPanel.js';
import { RightFeed } from './RightFeed.js';
import { PlayerDetail } from './PlayerDetail.js';


// Nav order — edit this array to reorder or rename tabs.
const NAV = [
  {id:"overview",  icon:"◈", label:"OVERVIEW"},
  {id:"squad",     icon:"▦", label:"SQUAD"},
  {id:"injuries",  icon:"✚", label:"INJURIES"},
  {id:"fixtures",  icon:"▤", label:"FIXTURES"},
  {id:"transfers", icon:"⇄", label:"TRANSFERS"},
  {id:"finances",  icon:"£", label:"FINANCES"},
  {id:"records",   icon:"★", label:"RECORDS"},
];

// Mobile bottom tab bar — same tabs as the desktop nav rail, plus the
// World Cup shortcut and a dedicated FEED tab (news/transfers/whispers,
// which live in the right sidebar on desktop but need their own tab here).
const NAV_MOBILE = [
  ...NAV,
  {id:"worldcup", icon:"🏆", label:"CUP"},
  {id:"feed",     icon:"📰", label:"FEED"},
];

export function App(){
  const [active,setActive]=useState("overview");
  const [selectedPlayer,setSelectedPlayer]=useState(null);
  const [query,setQuery]=useState("");
  const isMobile = useIsMobile();
  // Fetched ONCE here, for the whole App's lifetime, and passed down to
  // whichever panel needs it. Previously OverviewPanel and NewsPanel each
  // called useLiveNews() themselves — since only the active tab is mounted
  // (see `panels[active]` below), switching tabs unmounted/remounted whichever
  // panel you left, re-triggering its RSS fetch from scratch every time. Now
  // the fetch survives tab switches; you only ever wait for it once per visit.
  const liveNews = useLiveNews();

  // Escape closes the player detail modal or clears an open search.
  useEffect(()=>{
    const onKey=e=>{
      if(e.key!=="Escape") return;
      if(selectedPlayer) setSelectedPlayer(null);
      else if(query) setQuery("");
    };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[selectedPlayer,query]);

  const openPlayer=(name)=>{ setSelectedPlayer(name); setQuery(""); };
  const searchResults = query.trim().length>0
    ? SQUAD.filter(p=>p.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0,7)
    : [];
  const posC=pos=>pos==="GK"?P.purple:["CB","RB","LB"].includes(pos)?P.cyan:["DM","CM","AM"].includes(pos)?P.green:P.amber;

  // Every panel is wrapped in its own ErrorBoundary — a data bug in one tab
  // (e.g. a malformed date in fixtures.js) shows a small inline "couldn't
  // load" card instead of white-screening the entire dashboard.
  const panels={
    overview:<ErrorBoundary name="Overview"><OverviewPanel liveNews={liveNews}/></ErrorBoundary>,
    squad:<ErrorBoundary name="Squad"><SquadPanel onSelect={openPlayer}/></ErrorBoundary>,
    injuries:<ErrorBoundary name="Injuries"><InjuriesPanel/></ErrorBoundary>,
    fixtures:<ErrorBoundary name="Fixtures"><FixturesPanel/></ErrorBoundary>,
    transfers:<ErrorBoundary name="Transfers"><TransfersPanel/></ErrorBoundary>,
    finances:<ErrorBoundary name="Finances"><FinancesPanel/></ErrorBoundary>,
    records:<ErrorBoundary name="Records"><RecordsPanel/></ErrorBoundary>,
    news:<ErrorBoundary name="News"><NewsPanel liveNews={liveNews}/></ErrorBoundary>,
    worldcup:<ErrorBoundary name="World Cup"><WorldCupPanel/></ErrorBoundary>,
    // "feed" isn't a real panel — on mobile it reuses the same RightFeed
    // widget that sits in the desktop sidebar, shown full-screen instead.
    feed:<ErrorBoundary name="Feed"><RightFeed onNews={()=>setActive("news")} liveNews={liveNews}/></ErrorBoundary>,
  };

  return (
    <div className="app-shell" style={{display:"flex",flexDirection:"column",background:P.bg,overflow:"hidden"}}>

      {/* TOP BAR — logo/name on left, clock on right */}
      <div style={{background:`linear-gradient(90deg,${P.bgPanel},#0A1530)`,borderBottom:`1px solid ${P.borderGold}`,display:"flex",alignItems:"stretch",padding:isMobile?"0 12px":"0 16px",gap:16,flexShrink:0,minHeight:isMobile?60:80,WebkitAppRegion:"drag"}}>
        <div style={{display:"flex",alignItems:"center",gap:isMobile?8:14,paddingRight:isMobile?12:20,borderRight:`1px solid ${P.border}`}}>
          <div style={{filter:`drop-shadow(0 0 12px ${P.gold}66)`}}><SpursLogo size={isMobile?36:58}/></div>
          <div>
            <div style={{fontSize:isMobile?14:20,fontWeight:900,letterSpacing:"0.1em",background:`linear-gradient(90deg,${P.white},${P.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>TOTTENHAM HOTSPUR</div>
            {!isMobile && <div style={{fontSize:10,color:P.muted,letterSpacing:"0.22em",fontWeight:700,marginTop:4}}>AUDERE EST FACERE · SEASON HUB</div>}
          </div>
        </div>
        <div style={{flex:1,display:"flex",justifyContent:"center",padding:isMobile?"0 4px":"0 20px",position:"relative"}}>
          <div style={{width:"100%",maxWidth:340,position:"relative"}}>
            <input
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder={isMobile?"Search players…":"Quick search — search the squad…"}
              style={{width:"100%",background:P.bgCard,border:`1px solid ${query?P.gold:P.border}`,borderRadius:6,padding:isMobile?"7px 10px":"9px 12px",color:P.white,fontSize:12,outline:"none",letterSpacing:"0.02em"}}
            />
            {searchResults.length>0 && (
              <div style={{position:"absolute",top:"110%",left:0,right:0,background:P.bgPanel,border:`1px solid ${P.borderGold}`,borderRadius:6,boxShadow:"0 12px 30px #000A",zIndex:150,overflow:"hidden"}}>
                {searchResults.map((p,i)=>(
                  <div key={i} onClick={()=>{ setActive("squad"); openPlayer(p.name); }} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",cursor:"pointer",borderBottom:i<searchResults.length-1?`1px solid ${P.border}`:"none"}}
                    onMouseEnter={e=>e.currentTarget.style.background=P.bgHover}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{fontSize:10,fontWeight:900,color:posC(p.pos),width:26,flexShrink:0}}>{p.pos}</span>
                    <span style={{fontSize:13,color:P.white,fontWeight:600,flex:1}}>{p.name}</span>
                    <span style={{fontSize:14}}>{p.e}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",paddingLeft:isMobile?12:20,borderLeft:`1px solid ${P.border}`}}>
          <Clock/>
        </div>
      </div>

      {/* BODY */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>

        {/* LEFT NAV RAIL — desktop only; mobile uses the bottom tab bar instead */}
        {!isMobile && (
          <div style={{width:78,background:P.bgPanel,borderRight:`1px solid ${P.border}`,display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 0",gap:2,flexShrink:0}}>
            {NAV.map(item=>(
              <button key={item.id} className={`nav-btn${active===item.id?" nav-btn-active":""}`} onClick={()=>setActive(item.id)} style={{width:64,padding:"12px 4px",borderRadius:6,border:"none",cursor:"pointer",background:active===item.id?P.gold+"1A":"transparent",color:active===item.id?P.gold:P.muted,borderLeft:active===item.id?`3px solid ${P.gold}`:"3px solid transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:4,boxShadow:active===item.id?`0 0 12px ${P.gold}33`:"none",transition:"all 0.15s"}}>
                <span style={{fontSize:18}}>{item.icon}</span>
                <span style={{fontSize:7,letterSpacing:"0.12em",fontWeight:800}}>{item.label}</span>
              </button>
            ))}
            <div style={{width:40,height:1,background:P.border,margin:"10px 0"}}/>
            {/* World Cup — separate, once-every-4-years special button */}
            <button className={`nav-btn${active==="worldcup"?" nav-btn-active":""}`} onClick={()=>setActive("worldcup")} style={{width:64,padding:"12px 4px",borderRadius:6,border:"none",cursor:"pointer",background:active==="worldcup"?P.gold+"1A":"transparent",color:active==="worldcup"?P.gold:P.amber,borderLeft:active==="worldcup"?`3px solid ${P.gold}`:"3px solid transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:4,transition:"all 0.15s"}}>
              <span style={{fontSize:20}}>🏆</span>
              <span style={{fontSize:7,letterSpacing:"0.1em",fontWeight:800,textAlign:"center",lineHeight:1.4}}>WORLD CUP</span>
            </button>
            <div style={{flex:1}}/>
            <div style={{fontSize:7,color:P.dim,letterSpacing:"0.1em",textAlign:"center",lineHeight:2,padding:"0 6px"}}>TO<br/>DARE<br/>IS<br/>TO<br/>DO</div>
            <div style={{marginTop:8,opacity:0.5}}><SpursLogo size={28}/></div>
          </div>
        )}

        {/* CENTRE PANEL — full width on mobile; on desktop shares the row with the rail + feed */}
        <div className="scroll" style={{flex:1,padding:isMobile?"14px 14px":"18px 22px",overflowY:"auto"}}>{panels[active]}</div>

        {/* RIGHT FEED — desktop only; mobile reaches the same content via the FEED tab below */}
        {!isMobile && (
          <div className="scroll" style={{width:320,background:P.bgPanel,borderLeft:`1px solid ${P.border}`,padding:"16px 14px",overflowY:"auto",flexShrink:0}}>
            <RightFeed onNews={()=>setActive("news")} liveNews={liveNews}/>
          </div>
        )}
      </div>

      {/* STATUS BAR (desktop) / BOTTOM TAB BAR (mobile) */}
      {isMobile ? (
        <div className="scroll" style={{display:"flex",overflowX:"auto",background:P.bgPanel,borderTop:`1px solid ${P.border}`,flexShrink:0,padding:"6px 4px",gap:2}}>
          {NAV_MOBILE.map(item=>(
            <button key={item.id} className={`nav-btn${active===item.id?" nav-btn-active":""}`} onClick={()=>setActive(item.id)} style={{flex:"1 0 auto",minWidth:52,padding:"6px 2px",borderRadius:6,border:"none",cursor:"pointer",background:active===item.id?P.gold+"1A":"transparent",color:active===item.id?P.gold:P.muted,borderTop:active===item.id?`2px solid ${P.gold}`:"2px solid transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:2,transition:"all 0.15s"}}>
              <span style={{fontSize:16}}>{item.icon}</span>
              <span style={{fontSize:8,letterSpacing:"0.06em",fontWeight:800}}>{item.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div style={{height:26,background:P.bgPanel,borderTop:`1px solid ${P.border}`,display:"flex",alignItems:"center",padding:"0 16px",gap:16,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:7,height:7,borderRadius:"50%",background:P.green}}/><span style={{fontSize:10,color:P.green,fontWeight:700,letterSpacing:"0.1em"}}>SYSTEM ONLINE</span></div>
          <span style={{fontSize:10,color:P.muted}}>DATA VERIFIED {BUILD_DATE}</span>
          <span style={{fontSize:10,color:P.muted}}>SOURCES: PREMIERINJURIES.COM · THFC OFFICIAL · ROMANO · MORETTO · TEAMTALK · ESPN · WIKIPEDIA</span>
          <div style={{flex:1}}/>
          <span style={{fontSize:10,color:P.gold,fontWeight:800,letterSpacing:"0.1em"}}>THFC DASHBOARD v6.0 — MODULAR</span>
          <span style={{fontSize:10,color:P.muted}}>COYS</span>
        </div>
      )}
      {selectedPlayer && (
        <ErrorBoundary name="Player Detail">
          <PlayerDetail name={selectedPlayer} onClose={()=>setSelectedPlayer(null)}/>
        </ErrorBoundary>
      )}
    </div>
  );
}
