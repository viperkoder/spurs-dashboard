// Season Stats — Premier League player usage derived from completed matches.
import { P } from '../data/theme.js';
import { LEAGUE_MATCHES, getLeagueSummary, getPlayerUsage } from '../data/seasonStats.js';
import { getDefensiveCombinationStats, SAMPLE_MINUTES_FLOOR, SAMPLE_MATCHES_FLOOR } from '../data/defensiveCombinations.js';
import { getMidfieldUnitStats, getMidfieldDefensiveCombinationStats } from '../data/midfieldInfluence.js';
import { getAttackingCombinationStats } from '../data/attackingCombinations.js';
import { getRdzSeasons, getRdzCareerTotals, RDZ_UNRESOLVED_SPELLS } from '../data/managerRecord.js';
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
  const { combinations: defensiveCombinations } = getDefensiveCombinationStats(LEAGUE_MATCHES);
  const { units: midfieldUnits } = getMidfieldUnitStats(LEAGUE_MATCHES);
  const { combinations: midfieldDefensiveCombinations } = getMidfieldDefensiveCombinationStats(LEAGUE_MATCHES);
  const { combinations: attackingCombinations } = getAttackingCombinationStats(LEAGUE_MATCHES);
  const totalSpursGoals = LEAGUE_MATCHES.reduce((sum,match)=>sum+match.score.spurs,0);
  const totalOpponentGoals = LEAGUE_MATCHES.reduce((sum,match)=>sum+match.score.opponent,0);
  const attributedSpursGoals = attackingCombinations.reduce((sum,combo)=>sum+combo.goalsScored,0);
  const attributedOpponentGoalsDefence = defensiveCombinations.reduce((sum,combo)=>sum+combo.goalsConceded,0);
  const unresolvedMatches = LEAGUE_MATCHES.filter(match=>match.goals===undefined);
  const pointsReturnPct = summary.played ? (summary.points/(summary.played*3))*100 : null;
  const usageByMinutes = [...getPlayerUsage()].sort((a,b)=>b.minutes-a.minutes);
  const everPresent = usageByMinutes.filter(p=>p.apps===LEAGUE_MATCHES.length);
  const settledMidfield = midfieldUnits.find(u=>!u.smallSample);
  const settledDefence = defensiveCombinations.find(c=>!c.smallSample);
  const settledAttack = attackingCombinations.find(c=>!c.smallSample);
  const rdzSeasons = getRdzSeasons();
  const rdzTotals = getRdzCareerTotals();
  const rdzCurrent = rdzSeasons.find(row=>row.status==="ongoing");
  const coverage=LEAGUE_MATCHES.length
    ? `MD1–MD${Math.max(...LEAGUE_MATCHES.map(match=>match.mw))} · through ${new Date(LEAGUE_MATCHES[LEAGUE_MATCHES.length-1].date).toLocaleDateString("en-GB",{timeZone:"Europe/London",day:"numeric",month:"short",year:"numeric"})}`
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

      <div style={{background:P.bgCard,border:`1px solid ${P.border}`,borderRadius:7,overflow:"hidden"}}>
        <div style={{padding:"11px 14px",borderBottom:`1px solid ${P.border}`}}>
          <div style={{fontSize:12,fontWeight:900,color:P.gold,letterSpacing:"0.1em"}}>DEFENSIVE COMBINATIONS</div>
          <div style={{fontSize:9,color:P.muted,marginTop:3,letterSpacing:"0.04em"}}>CENTRE-BACKS &amp; FULL-BACKS/WING-BACKS ONLY · GOALKEEPER AND MIDFIELD EXCLUDED</div>
        </div>
        <div className="scroll" style={{overflowX:"auto"}}>
          <table style={{width:"100%",minWidth:620,borderCollapse:"collapse",fontVariantNumeric:"tabular-nums"}}>
            <thead>
              <tr>
                {["Combination","Minutes","Matches","Goals Conceded","GC/90"].map(label=>(
                  <th key={label} style={{padding:"9px 10px",fontSize:9,color:P.muted,textAlign:label==="Combination"?"left":"center",letterSpacing:"0.08em",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{label.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {defensiveCombinations.map((combo,index)=>(
                <tr key={combo.combination} style={{background:index%2?P.bgPanel:"transparent"}}>
                  <td style={{padding:"10px",fontSize:12,fontWeight:700,color:P.white,borderBottom:`1px solid ${P.border}`}}>{combo.combination}{combo.smallSample?<span style={{marginLeft:6,fontSize:9,fontWeight:800,color:P.muted,letterSpacing:"0.04em"}}>SMALL SAMPLE</span>:null}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.minutes}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.matches}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.goalsConceded}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:700,color:P.gold,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.gcPer90===null?"—":combo.gcPer90.toFixed(2)}</td>
                </tr>
              ))}
              {defensiveCombinations.length===0&&(
                <tr><td colSpan={5} style={{padding:14,fontSize:11,color:P.muted,textAlign:"center"}}>No completed matches with defensive on-pitch data yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{padding:"10px 14px",fontSize:10,color:P.muted,lineHeight:1.6,borderTop:`1px solid ${P.border}`}}>
          Small sample: a combination under {SAMPLE_MINUTES_FLOOR} shared minutes or {SAMPLE_MATCHES_FLOOR} matches is labelled "SMALL SAMPLE" and excluded from any best/worst ranking language — none is hidden. With only {LEAGUE_MATCHES.length} completed league matches so far, every combination currently qualifies. Descriptive only: on-pitch presence is not a claim that a combination caused a result.
          {attributedOpponentGoalsDefence<totalOpponentGoals&&` Spurs have conceded ${totalOpponentGoals} in the league so far, but only ${attributedOpponentGoalsDefence} of those are attributed to a combination above — the rest belong to ${unresolvedMatches.map(m=>`MD${m.mw}`).join(", ")}, where goal-by-goal evidence isn't yet reliably reconciled.`}
        </div>
      </div>

      <div style={{background:P.bgCard,border:`1px solid ${P.border}`,borderRadius:7,overflow:"hidden"}}>
        <div style={{padding:"11px 14px",borderBottom:`1px solid ${P.border}`}}>
          <div style={{fontSize:12,fontWeight:900,color:P.gold,letterSpacing:"0.1em"}}>CENTRAL MIDFIELD INFLUENCE</div>
          <div style={{fontSize:9,color:P.muted,marginTop:3,letterSpacing:"0.04em"}}>NO.6/NO.8/DEEPER CENTRAL MIDFIELD ONLY · ATTACKING MIDFIELD, WINGERS AND FORWARDS EXCLUDED</div>
        </div>
        <div style={{padding:"11px 14px 4px",fontSize:10,color:P.muted,fontWeight:800,letterSpacing:"0.08em"}}>MIDFIELD UNITS</div>
        <div className="scroll" style={{overflowX:"auto"}}>
          <table style={{width:"100%",minWidth:560,borderCollapse:"collapse",fontVariantNumeric:"tabular-nums"}}>
            <thead>
              <tr>
                {["Midfield","Minutes","Matches","Goals Conceded","GC/90"].map(label=>(
                  <th key={label} style={{padding:"9px 10px",fontSize:9,color:P.muted,textAlign:label==="Midfield"?"left":"center",letterSpacing:"0.08em",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{label.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {midfieldUnits.map((unit,index)=>(
                <tr key={unit.midfield} style={{background:index%2?P.bgPanel:"transparent"}}>
                  <td style={{padding:"10px",fontSize:12,fontWeight:700,color:P.white,borderBottom:`1px solid ${P.border}`}}>{unit.midfield}{unit.smallSample?<span style={{marginLeft:6,fontSize:9,fontWeight:800,color:P.muted,letterSpacing:"0.04em"}}>SMALL SAMPLE</span>:null}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{unit.minutes}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{unit.matches}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{unit.goalsConceded}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:700,color:P.gold,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{unit.gcPer90===null?"—":unit.gcPer90.toFixed(2)}</td>
                </tr>
              ))}
              {midfieldUnits.length===0&&(
                <tr><td colSpan={5} style={{padding:14,fontSize:11,color:P.muted,textAlign:"center"}}>No completed matches with central-midfield on-pitch data yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <details style={{borderTop:`1px solid ${P.border}`}}>
          <summary style={{cursor:"pointer",padding:"11px 14px",fontSize:10,color:P.muted,fontWeight:800,letterSpacing:"0.08em"}}>MIDFIELD + DEFENCE ({midfieldDefensiveCombinations.length} SHARED SPELLS) — EXPAND</summary>
          <div className="scroll" style={{overflowX:"auto"}}>
            <table style={{width:"100%",minWidth:760,borderCollapse:"collapse",fontVariantNumeric:"tabular-nums"}}>
              <thead>
                <tr>
                  {["Midfield","Defence","Shared Minutes","Matches","Goals Conceded","GC/90"].map(label=>(
                    <th key={label} style={{padding:"9px 10px",fontSize:9,color:P.muted,textAlign:label==="Midfield"||label==="Defence"?"left":"center",letterSpacing:"0.08em",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{label.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {midfieldDefensiveCombinations.map((combo,index)=>(
                  <tr key={`${combo.midfield} || ${combo.defence}`} style={{background:index%2?P.bgPanel:"transparent"}}>
                    <td style={{padding:"10px",fontSize:12,fontWeight:700,color:P.white,borderBottom:`1px solid ${P.border}`}}>{combo.midfield}{combo.smallSample?<span style={{marginLeft:6,fontSize:9,fontWeight:800,color:P.muted,letterSpacing:"0.04em"}}>SMALL SAMPLE</span>:null}</td>
                    <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,borderBottom:`1px solid ${P.border}`}}>{combo.defence}</td>
                    <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.minutes}</td>
                    <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.matches}</td>
                    <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.goalsConceded}</td>
                    <td style={{padding:"10px",fontSize:12,fontWeight:700,color:P.gold,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.gcPer90===null?"—":combo.gcPer90.toFixed(2)}</td>
                  </tr>
                ))}
                {midfieldDefensiveCombinations.length===0&&(
                  <tr><td colSpan={6} style={{padding:14,fontSize:11,color:P.muted,textAlign:"center"}}>No completed matches with shared midfield+defence on-pitch data yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </details>

        <div style={{padding:"10px 14px",fontSize:10,color:P.muted,lineHeight:1.6,borderTop:`1px solid ${P.border}`}}>
          Small sample: a unit or shared spell under {SAMPLE_MINUTES_FLOOR} shared minutes or {SAMPLE_MATCHES_FLOOR} matches is labelled "SMALL SAMPLE" and excluded from any best/worst ranking language — none is hidden. With only {LEAGUE_MATCHES.length} completed league matches so far, every row currently qualifies. These numbers describe what happened while units shared the pitch — they do not isolate central midfield's contribution from defensive personnel, opponent strength, game state, score effects, tactical instructions, red cards or other contextual factors. No influence score or composite rating is shown.
        </div>
      </div>

      <div style={{background:P.bgCard,border:`1px solid ${P.border}`,borderRadius:7,overflow:"hidden"}}>
        <div style={{padding:"11px 14px",borderBottom:`1px solid ${P.border}`}}>
          <div style={{fontSize:12,fontWeight:900,color:P.gold,letterSpacing:"0.1em"}}>ATTACKING COMBINATIONS</div>
          <div style={{fontSize:9,color:P.muted,marginTop:3,letterSpacing:"0.04em"}}>STRIKERS, WINGERS &amp; ATTACKING MIDFIELD ONLY · CENTRAL MIDFIELD AND DEFENCE EXCLUDED</div>
        </div>
        <div className="scroll" style={{overflowX:"auto"}}>
          <table style={{width:"100%",minWidth:620,borderCollapse:"collapse",fontVariantNumeric:"tabular-nums"}}>
            <thead>
              <tr>
                {["Combination","Minutes","Matches","Goals","GF/90"].map(label=>(
                  <th key={label} style={{padding:"9px 10px",fontSize:9,color:P.muted,textAlign:label==="Combination"?"left":"center",letterSpacing:"0.08em",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{label.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attackingCombinations.map((combo,index)=>(
                <tr key={combo.combination} style={{background:index%2?P.bgPanel:"transparent"}}>
                  <td style={{padding:"10px",fontSize:12,fontWeight:700,color:P.white,borderBottom:`1px solid ${P.border}`}}>{combo.combination}{combo.smallSample?<span style={{marginLeft:6,fontSize:9,fontWeight:800,color:P.muted,letterSpacing:"0.04em"}}>SMALL SAMPLE</span>:null}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.minutes}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.matches}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.goalsScored}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:700,color:P.gold,textAlign:"center",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{combo.gfPer90===null?"—":combo.gfPer90.toFixed(2)}</td>
                </tr>
              ))}
              {attackingCombinations.length===0&&(
                <tr><td colSpan={5} style={{padding:14,fontSize:11,color:P.muted,textAlign:"center"}}>No completed matches with attacking on-pitch data yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{padding:"10px 14px",fontSize:10,color:P.muted,lineHeight:1.6,borderTop:`1px solid ${P.border}`}}>
          {totalSpursGoals===0
            ? `Spurs have not yet scored in the currently audited league sample (${LEAGUE_MATCHES.length} completed matches), so this table currently measures attacking-unit usage — minutes shared on the pitch — rather than scoring effectiveness. Every real Spurs goal, once it occurs, will attribute automatically to the exact attacking combination on the pitch for it.`
            : attributedSpursGoals<totalSpursGoals
              ? `Spurs have scored ${totalSpursGoals} in the league this season, but only ${attributedSpursGoals} ${attributedSpursGoals===1?"is":"are"} attributed to a combination above — the rest belong to ${unresolvedMatches.map(m=>`MD${m.mw}`).join(", ")}, where goal-by-goal evidence isn't yet reliably reconciled (see Match history below). Not fabricated or estimated — this table will update automatically once that evidence is available.`
              : `Small sample: a combination under ${SAMPLE_MINUTES_FLOOR} shared minutes or ${SAMPLE_MATCHES_FLOOR} matches is labelled "SMALL SAMPLE" and excluded from any best/worst ranking language — none is hidden.`} Descriptive only: on-pitch presence and goals scored while sharing the pitch are not a claim that a combination caused those goals, and no combination here is ranked as most or least dangerous/effective.
        </div>
      </div>

      <div style={{background:P.bgCard,border:`1px solid ${P.border}`,borderRadius:7,padding:14}}>
        <WH lg>Team Diagnosis — What Is Happening?</WH>
        <div style={{fontSize:10,color:P.muted,marginBottom:12,lineHeight:1.6}}>
          Built only from the verified stats above — {LEAGUE_MATCHES.length} completed league matches. Descriptive, not causal: this never claims a combination caused a result, and says so explicitly where the sample is too small or the evidence incomplete.
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:900,color:P.gold,letterSpacing:"0.08em",marginBottom:4}}>RESULTS</div>
            <div style={{fontSize:12,color:P.text,lineHeight:1.7}}>
              {summary.played} played, {summary.w}W {summary.d}D {summary.l}L, {summary.points} points ({pointsReturnPct.toFixed(1)}% of available points). GF {totalSpursGoals}, GA {totalOpponentGoals}, GD {totalSpursGoals-totalOpponentGoals>0?`+${totalSpursGoals-totalOpponentGoals}`:totalSpursGoals-totalOpponentGoals}.
            </div>
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:900,color:P.gold,letterSpacing:"0.08em",marginBottom:4}}>STABILITY</div>
            <div style={{fontSize:12,color:P.text,lineHeight:1.7}}>
              {defensiveCombinations.length} distinct defensive groupings, {midfieldUnits.length} distinct central-midfield groupings and {attackingCombinations.length} distinct attacking groupings have appeared across just {LEAGUE_MATCHES.length} matches — selection has not settled in defence or attack yet.{" "}
              {settledMidfield
                ? `The one exception: ${settledMidfield.midfield} has now played together in every match (${settledMidfield.minutes} shared minutes) — the first combination in this dataset, in any area of the pitch, to cross the meaningful-sample floor.`
                : "No combination in any area of the pitch has yet crossed the meaningful-sample floor."}
            </div>
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:900,color:P.gold,letterSpacing:"0.08em",marginBottom:4}}>DEFENCE</div>
            <div style={{fontSize:12,color:P.text,lineHeight:1.7}}>
              {everPresent.length>0
                ? `${everPresent.map(p=>p.player).join(" and ")} ${everPresent.length===1?"is":"are"} the only player${everPresent.length===1?"":"s"} to feature in every match so far (${everPresent[0].minutes} minutes).`
                : "No player has featured in every match so far."}{" "}
              {settledDefence
                ? `${settledDefence.combination} is the first defensive combination to reach a meaningful sample (${settledDefence.minutes} minutes, ${settledDefence.goalsConceded} conceded).`
                : `No single back-line combination has reached a meaningful sample yet — none has both ${SAMPLE_MINUTES_FLOOR}+ shared minutes and ${SAMPLE_MATCHES_FLOOR}+ matches together.`}{" "}
              {attributedOpponentGoalsDefence<totalOpponentGoals&&`Spurs have conceded ${totalOpponentGoals} in the league, but only ${attributedOpponentGoalsDefence} ${attributedOpponentGoalsDefence===1?"is":"are"} attributed to a specific combination above — the rest (${unresolvedMatches.map(m=>`MD${m.mw}`).join(", ")}) don't yet have reliably reconciled goal evidence.`}
            </div>
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:900,color:P.gold,letterSpacing:"0.08em",marginBottom:4}}>ATTACK</div>
            <div style={{fontSize:12,color:P.text,lineHeight:1.7}}>
              Spurs have scored {totalSpursGoals} in the league so far.{" "}
              {attributedSpursGoals<totalSpursGoals
                ? `None of it is yet attributed to a specific attacking combination — the goal evidence for ${unresolvedMatches.map(m=>`MD${m.mw}`).join(", ")} isn't reliably reconciled. There is not yet enough evidence to say which attacking combination is producing Spurs goals.`
                : settledAttack
                  ? `${settledAttack.combination} is the first attacking combination to reach a meaningful sample (${settledAttack.minutes} minutes, ${settledAttack.goalsScored} scored).`
                  : "No attacking combination has reached a meaningful sample yet."}{" "}
              {attackingCombinations.length} different attacking groupings across {LEAGUE_MATCHES.length} matches is heavy rotation up front — consistent with a front line still being settled.
            </div>
          </div>
        </div>
      </div>

      <div style={{background:P.bgCard,border:`1px solid ${P.border}`,borderRadius:7,overflow:"hidden"}}>
        <div style={{padding:"11px 14px",borderBottom:`1px solid ${P.border}`}}>
          <div style={{fontSize:12,fontWeight:900,color:P.gold,letterSpacing:"0.1em"}}>RDZ — LEAGUE POINTS-RETURN CONTEXT</div>
          <div style={{fontSize:9,color:P.muted,marginTop:3,letterSpacing:"0.04em"}}>ROBERTO DE ZERBI · LEAGUE MATCHES ONLY, CUPS EXCLUDED · HISTORICAL CONTEXT, NOT A RATING OR PREDICTION</div>
        </div>
        <div className="scroll" style={{overflowX:"auto"}}>
          <table style={{width:"100%",minWidth:680,borderCollapse:"collapse",fontVariantNumeric:"tabular-nums"}}>
            <thead>
              <tr>
                {["Season","Club","League","GM","W","D","L","Pts","PPG","Pts Return %"].map(label=>(
                  <th key={label} style={{padding:"9px 10px",fontSize:9,color:P.muted,textAlign:label==="Season"||label==="Club"||label==="League"?"left":"center",letterSpacing:"0.08em",borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{label.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rdzSeasons.map((row,index)=>(
                <tr key={row.season+row.club} style={{background:row.status==="ongoing"?"rgba(200,155,60,0.08)":index%2?P.bgPanel:"transparent"}}>
                  <td style={{padding:"10px",fontSize:12,fontWeight:700,color:row.status==="ongoing"?P.gold:P.white,borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{row.season}{row.status==="ongoing"?" (ONGOING)":row.status==="partial"?" (PARTIAL)":""}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{row.club}</td>
                  <td style={{padding:"10px",fontSize:11,color:P.muted,borderBottom:`1px solid ${P.border}`,whiteSpace:"nowrap"}}>{row.league}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`}}>{row.played}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.green,textAlign:"center",borderBottom:`1px solid ${P.border}`}}>{row.w}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.amber,textAlign:"center",borderBottom:`1px solid ${P.border}`}}>{row.d}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.red,textAlign:"center",borderBottom:`1px solid ${P.border}`}}>{row.l}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:800,color:P.white,textAlign:"center",borderBottom:`1px solid ${P.border}`}}>{row.points}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:600,color:P.text,textAlign:"center",borderBottom:`1px solid ${P.border}`}}>{row.ppg.toFixed(2)}</td>
                  <td style={{padding:"10px",fontSize:12,fontWeight:700,color:P.gold,textAlign:"center",borderBottom:`1px solid ${P.border}`}}>{row.returnPct.toFixed(1)}%</td>
                </tr>
              ))}
              <tr style={{borderTop:`2px solid ${P.borderGold}`}}>
                <td colSpan={3} style={{padding:"10px",fontSize:11,fontWeight:800,color:P.gold,letterSpacing:"0.04em"}}>CAREER TOTAL (LISTED SEASONS)</td>
                <td style={{padding:"10px",fontSize:12,fontWeight:800,color:P.white,textAlign:"center"}}>{rdzTotals.played}</td>
                <td style={{padding:"10px",fontSize:12,fontWeight:800,color:P.green,textAlign:"center"}}>{rdzTotals.w}</td>
                <td style={{padding:"10px",fontSize:12,fontWeight:800,color:P.amber,textAlign:"center"}}>{rdzTotals.d}</td>
                <td style={{padding:"10px",fontSize:12,fontWeight:800,color:P.red,textAlign:"center"}}>{rdzTotals.l}</td>
                <td style={{padding:"10px",fontSize:12,fontWeight:900,color:P.white,textAlign:"center"}}>{rdzTotals.points}</td>
                <td style={{padding:"10px",fontSize:12,fontWeight:800,color:P.text,textAlign:"center"}}>{rdzTotals.ppg.toFixed(2)}</td>
                <td style={{padding:"10px",fontSize:12,fontWeight:800,color:P.gold,textAlign:"center"}}>{rdzTotals.returnPct.toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{padding:"10px 14px",fontSize:10,color:P.muted,lineHeight:1.6,borderTop:`1px solid ${P.border}`}}>
          {rdzCurrent&&`Current Spurs return (${rdzCurrent.returnPct.toFixed(1)}%) `}
          sits against a career league-points-return range of {Math.min(...rdzSeasons.filter(r=>r.status!=="ongoing").map(r=>r.returnPct)).toFixed(1)}%–{Math.max(...rdzSeasons.filter(r=>r.status!=="ongoing").map(r=>r.returnPct)).toFixed(1)}% across the seasons listed. Historical context only — not a rating, prediction or ranking. {RDZ_UNRESOLVED_SPELLS.length} known spell{RDZ_UNRESOLVED_SPELLS.length===1?"":"s"} (2013–2018 lower-division jobs; the partial 2025/26 stretches at Marseille and Tottenham) could not be reliably reconciled to a league-only W/D/L split from available sources and are deliberately left out rather than estimated, not silently dropped.
        </div>
      </div>

      <div style={{background:P.bgCard,border:`1px solid ${P.border}`,borderRadius:7,padding:14}}>
        <WH>Match history</WH>
        {[...LEAGUE_MATCHES].reverse().map(match=>(
          <details key={match.mw} style={{padding:"10px 0",borderBottom:`1px solid ${P.border}`,fontSize:11,color:P.text,lineHeight:1.7}}>
            <summary style={{cursor:"pointer",fontWeight:700,color:P.white}}>MD{match.mw} · {match.opponent} ({match.venue}) · Spurs {match.score.spurs}–{match.score.opponent}</summary>
            <div>Starting XI: {match.appearances.filter(p=>p.started).map(p=>p.player).join(", ")}</div>
            <div>Used substitutes: {match.appearances.filter(p=>!p.started).map(p=>`${p.player} (${p.on}–${p.off}, ${p.off-p.on} min)`).join(", ")||"None"}</div>
            <div>Unused bench: {match.unused.join(", ")||"None"}</div>
            <div>{match.appearances.map(p=>`${p.player}: ${p.off-p.on} min`).join(" · ")}</div>
            <a href={match.sources[0]} target="_blank" rel="noopener noreferrer" style={{color:P.gold}}>Match source</a>
          </details>
        ))}
      </div>
    </div>
  );
}
