// Season Stats — Premier League player usage derived from completed matches.
import { P } from '../data/theme.js';
import { LEAGUE_MATCHES, getLeagueSummary, getPlayerUsage } from '../data/seasonStats.js';
import { WH } from '../lib/shared.js';

const COLUMNS = [
  {key:"player",label:"Player",sortable:false},
  {key:"apps",label:"Apps",sortable:true},
  {key:"starts",label:"Starts",sortable:true},
  {key:"subApps",label:"Sub Apps",sortable:false},
  {key:"minutes",label:"Minutes",sortable:true},
  {key:"w",label:"W",sortable:true},
  {key:"d",label:"D",sortable:true},
  {key:"l",label:"L",sortable:true},
];

export function SeasonStatsPanel(){
  const [sort,setSort]=useState({key:"minutes",direction:"desc"});
  const summary=getLeagueSummary();
  const players=getPlayerUsage().sort((a,b)=>{
    const delta=(a[sort.key]||0)-(b[sort.key]||0);
    return (sort.direction==="asc"?delta:-delta)||a.player.localeCompare(b.player);
  });
  const setSortKey=key=>setSort(current=>({key,direction:current.key===key&&current.direction==="desc"?"asc":"desc"}));
  const coverage=LEAGUE_MATCHES.length
    ? `MD1–MD${Math.max(...LEAGUE_MATCHES.map(match=>match.mw))} · through ${new Date(LEAGUE_MATCHES[LEAGUE_MATCHES.length-1].date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}`
    : "No completed league matches";

  return (
    <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:16}}>
      <div>
        <WH lg>Season Stats</WH>
        <div style={{fontSize:11,color:P.muted,marginTop:5,letterSpacing:"0.04em"}}>PREMIER LEAGUE 2026/27 · {coverage.toUpperCase()}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,minmax(70px,1fr))",gap:7}}>
        {[
          ["PLAYED",summary.played,P.white],
          ["WON",summary.w,P.green],
          ["DRAWN",summary.d,P.amber],
          ["LOST",summary.l,P.red],
          ["POINTS",summary.points,P.gold],
        ].map(([label,value,color])=>(
          <div key={label} style={{background:P.bgCard,border:`1px solid ${label==="POINTS"?P.borderGold:P.border}`,borderRadius:6,padding:"11px 7px",textAlign:"center",minWidth:0}}>
            <div style={{fontSize:22,fontWeight:900,color,lineHeight:1}}>{value}</div>
            <div style={{fontSize:8,color:P.muted,fontWeight:800,letterSpacing:"0.1em",marginTop:6}}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{background:P.bgCard,border:`1px solid ${P.border}`,borderRadius:7,overflow:"hidden"}}>
        <div style={{padding:"11px 14px",borderBottom:`1px solid ${P.border}`,display:"flex",justifyContent:"space-between",gap:10,alignItems:"center"}}>
          <div style={{fontSize:12,fontWeight:900,color:P.gold,letterSpacing:"0.1em"}}>PLAYER USAGE</div>
          <div style={{fontSize:10,color:P.muted}}>SORTED BY {sort.key==="subApps"?"SUB APPS":sort.key.toUpperCase()} {sort.direction==="desc"?"↓":"↑"}</div>
        </div>
        <div className="scroll" style={{overflowX:"auto"}}>
          <table style={{width:"100%",minWidth:620,borderCollapse:"collapse",fontVariantNumeric:"tabular-nums"}}>
            <thead>
              <tr>
                {COLUMNS.map(column=>(
                  <th key={column.key} aria-sort={sort.key===column.key?(sort.direction==="desc"?"descending":"ascending"):"none"} style={{padding:"9px 10px",fontSize:9,color:sort.key===column.key?P.gold:P.muted,textAlign:column.key==="player"?"left":"center",letterSpacing:"0.08em",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>
                    {column.sortable
                      ? <button onClick={()=>setSortKey(column.key)} style={{background:"none",border:0,padding:0,color:"inherit",font:"inherit",fontWeight:800,letterSpacing:"inherit",cursor:"pointer"}}>{column.label.toUpperCase()}{sort.key===column.key?(sort.direction==="desc"?" ↓":" ↑"):""}</button>
                      : column.label.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {players.map((player,index)=>(
                <tr key={player.player} style={{background:index%2?P.bgPanel:"transparent"}}>
                  {COLUMNS.map(column=>(
                    <td key={column.key} style={{padding:"10px",fontSize:12,fontWeight:column.key==="player"?700:600,color:column.key==="player"?P.white:column.key==="minutes"?P.gold:P.text,textAlign:column.key==="player"?"left":"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>
                      {player[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{fontSize:10,color:P.muted,lineHeight:1.6}}>
        Apps include starts and substitute appearances only; unused substitutes do not count. Minutes use official substitution boundaries across regulation time.
      </div>
    </div>
  );
}
