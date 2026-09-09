// Lightweight SVG chart components — analyst-style visuals built from data
// already in data/standings.js, with no charting library dependency. This is
// a deliberate choice: build.js compiles JSX via esbuild.transformSync (JSX
// -> JS only, no module bundling), so a package like recharts can't be
// `import`ed here without switching the whole pipeline to a real bundler.
// Hand-rolled SVG keeps every future chart on the same zero-dependency,
// zero-extra-install build you already have.
import { P } from '../data/theme.js';

// Donut gauge — used for Win/Draw/Loss share of the season.
export function RadialGauge({segments,size,label}){
  size=size||120;
  const r=size/2-10, cx=size/2, cy=size/2, circ=2*Math.PI*r;
  const total=segments.reduce((s,seg)=>s+seg.value,0)||1;
  let offset=0;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={P.dim} strokeWidth="10"/>
        {segments.map((seg,i)=>{
          const frac=seg.value/total;
          const dash=frac*circ;
          const el=(
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth="10"
              strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-offset}
              transform={`rotate(-90 ${cx} ${cy})`} strokeLinecap="butt"/>
          );
          offset+=dash;
          return el;
        })}
        <text x={cx} y={cy-2} textAnchor="middle" fontSize={size*0.19} fontWeight="900" fill={P.white}>
          {Math.round((segments[0].value/total)*100)}%
        </text>
        <text x={cx} y={cy+16} textAnchor="middle" fontSize={size*0.08} fontWeight="700" fill={P.muted} letterSpacing="0.1em">
          {label||"WIN RATE"}
        </text>
      </svg>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
        {segments.map((seg,i)=>(
          <span key={i} style={{fontSize:10,color:P.muted,fontWeight:700,display:"flex",alignItems:"center",gap:4}}>
            <span style={{width:8,height:8,borderRadius:2,background:seg.color,display:"inline-block"}}/>{seg.name} {seg.value}
          </span>
        ))}
      </div>
    </div>
  );
}

// Diverging horizontal comparison bar — e.g. "Spurs GF vs League Average".
// Shows two values on the same scale so the gap is immediately visible,
// which is the actual analyst insight (not just the raw number).
export function CompareBar({label,teamValue,avgValue,color,suffix}){
  const max=Math.max(teamValue,avgValue)*1.15||1;
  const teamPct=(teamValue/max)*100;
  const avgPct=(avgValue/max)*100;
  const delta=teamValue-avgValue;
  return (
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:P.muted,fontWeight:700,marginBottom:4}}>
        <span>{label}</span>
        <span style={{color:delta>=0?P.green:P.red,fontWeight:800}}>{delta>=0?"+":""}{delta.toFixed(1)}{suffix||""} vs league avg</span>
      </div>
      <div style={{position:"relative",height:16,background:P.dim,borderRadius:3,overflow:"hidden"}}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:`${teamPct}%`,background:color,borderRadius:3}}/>
        <div style={{position:"absolute",left:`${avgPct}%`,top:-2,bottom:-2,width:2,background:P.white,opacity:0.7}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:P.dim,marginTop:2}}>
        <span style={{color:P.text}}>{teamValue}{suffix||""} Spurs</span>
        <span>{avgValue.toFixed(1)}{suffix||""} league avg</span>
      </div>
    </div>
  );
}

// Compact horizontal bar used inside list rows (e.g. scorer G+A relative to
// the squad's top scorer) — thinner than <Bar> in shared.js, sits inline.
export function InlineBar({pct,color,width}){
  return (
    <div style={{width:width||60,height:6,background:P.dim,borderRadius:3,overflow:"hidden",flexShrink:0}}>
      <div style={{width:`${Math.max(2,Math.min(100,pct))}%`,height:"100%",background:color,borderRadius:3}}/>
    </div>
  );
}
