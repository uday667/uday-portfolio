import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  purple: "#c4b5fd",
  purpleDark: "#7c3aed",
  green:  "#6ee7b7",
  greenDark: "#059669",
  amber:  "#fcd34d",
  blue:   "#7dd3fc",
  pink:   "#f9a8d4",
  white:  "#f8fafc",
};
const SKILL_COLORS = [C.purple,"#6ee7b7","#fcd34d","#f9a8d4","#7dd3fc","#fb923c","#e879f9","#4ade80"];

const STATS = [
  { n: "4",    l: "Years Exp",    suffix: "+" },
  { n: "300",  l: "LeetCode",     suffix: "+" },
  { n: "3",    l: "AI Projects",  suffix: ""  },
  { n: "2",    l: "Cloud Certs",  suffix: ""  },
];

const SKILLS_MAP = {
  "Languages":       ["Java","Python","SQL","JavaScript"],
  "Backend":         ["Spring Boot","Spring AI","FastAPI","Spring MVC","JWT","HMAC-SHA256"],
  "AI / ML":         ["Claude API","LangChain","RAG","FAISS","Prompt Eng","OpenRouter"],
  "Frontend":        ["React.js","Tailwind CSS","HTML5","CSS3","Bootstrap"],
  "Cloud & DevOps":  ["AWS","GCP","Docker","Kubernetes","Jenkins","GitHub Actions"],
  "Messaging/Cache": ["Apache Kafka","Redis"],
  "Databases":       ["MySQL","MongoDB"],
  "Monitoring":      ["Grafana","Prometheus","ELK Stack","Splunk"],
};

const EXPERIENCE = [
  {
    co: "Accenture", role: "Software Developer", period: "Sep 2025 – Present", color: C.purple,
    bullets: [
      "Owned RESTful API development for Services Management — request creation, routing & status tracking used daily by banking ops teams.",
      "Enhanced Support Connect module with real-time ticket flows; cut manual follow-up effort for support agents.",
      "Delivered Card Program features: card issuance workflows, dynamic limit management, and transaction validation.",
      "Refactored SQL queries in Client Management for onboarding flows, cutting execution time on high-volume pages.",
      "Used GitHub Copilot for unit test generation — reduced development time on routine modules by ~35%.",
      "Coordinated with US-based client team through Agile standups; consistent on-time delivery in 2-week sprints.",
    ],
  },
  {
    co: "TCS — Transport for London", role: "Software Developer", period: "Jan 2024 – Sep 2025", color: C.green,
    bullets: [
      "Built RESTful & GraphQL APIs for driver detail validation, processing thousands of records per day.",
      "Implemented driver search with server-side sorting, cursor-based pagination & bulk CSV upload.",
      "Implemented RBAC for assessors, supervisors & admins — zero privilege escalation incidents post-release.",
      "Rebuilt CI/CD pipeline with Jenkins — deployment time cut from 40 min to under 6 min (85% reduction).",
      "AI-assisted log pattern analysis cut mean time to resolve critical incidents by ~55%.",
    ],
  },
  {
    co: "TCS — UIDAI Aadhaar", role: "Software Developer", period: "Aug 2022 – Dec 2023", color: C.amber,
    bullets: [
      "Built Spring Boot microservices processing millions of OTP-based verification transactions in production.",
      "Designed Kafka consumer/producer flows for async identity verification — eliminated blocking calls.",
      "Implemented Redis caching for identity records; reduced redundant DB hits under peak load.",
      "Configured Grafana dashboards & Prometheus alerts — caught two silent failures before production.",
      "Documented all APIs via Swagger; configured API Gateway for routing, rate limiting & auth enforcement.",
    ],
  },
];

const PROJECTS = [
  {
    icon: "🤖", title: "AI Banking Chatbot", color: C.purple,
    stack: ["LangChain","Claude API","FAISS","Spring Boot","RAG"],
    metric: "Production banking environment",
    desc: "RAG-based chatbot for banking staff — upload PDFs, query policies in natural language, answers stream in real time. FAISS vector search grounds responses in actual documents, measurably reducing hallucinated responses.",
  },
  {
    icon: "🔍", title: "AI Code Assistant & Debugger", color: C.green,
    stack: ["Spring Boot","Claude API","Prompt Engineering"],
    metric: "~60% less debug time",
    desc: "REST endpoint that accepts raw Java stack traces and returns structured root-cause analysis plus line-level fix suggestions. Tested on 40+ real Spring Boot & Kafka exceptions.",
  },
  {
    icon: "📊", title: "Automated Report Summarizer", color: C.amber,
    stack: ["Spring Scheduler","Claude API","XML/CSV"],
    metric: "70% less time on raw reports",
    desc: "AI summarizer wired into Spring Scheduler — large XML/CSV outputs are passed through the LLM and a plain-English summary is auto-emailed. Stakeholders stopped asking devs to explain report outputs.",
  },
];

const CONTACTS = [
  { icon: "✉",  label: "udaykadiri5@gmail.com",  href: "mailto:udaykadiri5@gmail.com", color: C.pink },
  { icon: "in", label: "linkedin.com/in/uday667", href: "https://linkedin.com/in/uday667", color: C.blue },
  { icon: "gh", label: "github.com/uday667",      href: "https://github.com/uday667",     color: C.purple },
];

const NAV = ["home","about","experience","projects","skills","contact"];
const PHRASES = [
  "Building Production-Grade Microservices",
  "AI-Powered Systems with Claude & LangChain",
  "Spring Boot · Kafka · Docker · Kubernetes",
  "4 Years. Real Scale. Real Impact.",
];

/* ═══ PARTICLE CANVAS ══════════════════════════════════════════════════════ */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, raf, pts = [];
    const N = 70;
    const init = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      pts = Array.from({length:N}, () => ({
        x: Math.random()*W, y: Math.random()*H,
        vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
        r: Math.random()*1.5+.5,
      }));
    };
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      for (let i=0;i<N;i++) {
        const p=pts[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W) p.vx*=-1;
        if(p.y<0||p.y>H) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(196,181,253,0.55)"; ctx.fill();
        for(let j=i+1;j<N;j++){
          const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
          if(d<120){
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
            ctx.strokeStyle=`rgba(196,181,253,${.18*(1-d/120)})`; ctx.lineWidth=.6; ctx.stroke();
          }
        }
      }
      raf=requestAnimationFrame(draw);
    };
    init(); draw();
    window.addEventListener("resize",init);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",init); };
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
}

/* ═══ RIPPLE BUTTON ════════════════════════════════════════════════════════ */
function RippleBtn({ children, href, style, onClick }) {
  const [ripples, setRipples] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(r => [...r, {id,x,y}]);
    setTimeout(() => setRipples(r => r.filter(rp=>rp.id!==id)), 700);
    if(onClick) onClick(e);
  };
  const base = {
    position:"relative", overflow:"hidden", cursor:"pointer",
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    textDecoration:"none", ...style
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} target={href&&!href.startsWith("mailto")?"_blank":undefined}
      rel="noopener noreferrer" style={base} onClick={handleClick}>
      {ripples.map(rp=>(
        <span key={rp.id} style={{
          position:"absolute", left:rp.x, top:rp.y,
          width:"12px", height:"12px", borderRadius:"50%",
          background:"rgba(255,255,255,0.35)",
          transform:"scale(0)", animation:"ripple 0.7s ease-out forwards",
          pointerEvents:"none", marginLeft:"-6px", marginTop:"-6px",
        }}/>
      ))}
      {children}
    </Tag>
  );
}

/* ═══ TYPEWRITER ═══════════════════════════════════════════════════════════ */
function Typewriter() {
  const [text,setText]=useState(""); const [ti,setTi]=useState(0); const [ci,setCi]=useState(0); const [del,setDel]=useState(false);
  useEffect(()=>{
    const cur=PHRASES[ti]; let t;
    if(!del){if(ci<cur.length){t=setTimeout(()=>{setText(cur.slice(0,ci+1));setCi(c=>c+1);},58);}else{t=setTimeout(()=>setDel(true),2000);}}
    else{if(ci>0){t=setTimeout(()=>{setText(cur.slice(0,ci-1));setCi(c=>c-1);},28);}else{setDel(false);setTi(t=>(t+1)%PHRASES.length);}}
    return ()=>clearTimeout(t);
  },[ci,del,ti]);
  return (
    <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(0.85rem,2.2vw,1.15rem)",color:"#94a3b8"}}>
      {text}<span style={{animation:"blink 1s step-end infinite",color:C.purple}}>|</span>
    </span>
  );
}

/* ═══ SCROLL REVEAL ════════════════════════════════════════════════════════ */
function Reveal({children,delay=0,from="bottom"}) {
  const ref=useRef(null); const [vis,setVis]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:0.08});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  const transforms={bottom:"translateY(32px)",left:"translateX(-32px)",right:"translateX(32px)",scale:"scale(0.92)"};
  return (
    <div ref={ref} style={{
      opacity:vis?1:0,
      transform:vis?"none":transforms[from]||"translateY(32px)",
      transition:`opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>{children}</div>
  );
}

/* ═══ COUNT-UP ═════════════════════════════════════════════════════════════ */
function CountUp({target,suffix}) {
  const [val,setVal]=useState(0); const ref=useRef(null); const started=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true;
        const n=parseInt(target); let start=0;
        const step=Math.ceil(n/40);
        const iv=setInterval(()=>{start+=step; if(start>=n){setVal(n);clearInterval(iv);}else setVal(start);},30);
      }
    },{threshold:0.5});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══ NAV ══════════════════════════════════════════════════════════════════ */
function Nav() {
  const [active,setActive]=useState("home"); const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const fn=()=>{
      setScrolled(window.scrollY>30);
      NAV.forEach(id=>{
        const el=document.getElementById(id); if(!el) return;
        const r=el.getBoundingClientRect();
        if(r.top<=90&&r.bottom>=90) setActive(id);
      });
    };
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);
  const go=useCallback((id)=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setOpen(false);},[]);

  return (
    <>
      <style>{`
        @media(max-width:680px){.nav-links{display:none!important;}.nav-burger{display:flex!important;}}
        .nav-link:hover{color:#c4b5fd!important;border-color:rgba(196,181,253,0.4)!important;}
      `}</style>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:300,
        background:scrolled?"rgba(5,5,15,0.95)":"rgba(5,5,15,0.5)",
        backdropFilter:"blur(20px)",
        borderBottom:scrolled?"1px solid rgba(196,181,253,0.2)":"1px solid transparent",
        transition:"all 0.4s",
      }}>
        <div style={{maxWidth:"1100px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(16px,4vw,40px)",height:"62px"}}>
          {/* BRAND NAME */}
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:"clamp(13px,2vw,16px)",letterSpacing:"0.04em",cursor:"pointer"}} onClick={()=>go("home")}>
            <span style={{color:"#475569"}}>{"< "}</span>
            <span style={{color:C.purple}}>Uday</span>
            <span style={{color:C.green}}></span>
            <span style={{color:"#475569"}}>{" />"}</span>
          </div>
          {/* Desktop links */}
          <div className="nav-links" style={{display:"flex",gap:"4px"}}>
            {NAV.map(id=>(
              <button key={id} className="nav-link" onClick={()=>go(id)} style={{
                background:active===id?"rgba(196,181,253,0.15)":"transparent",
                border:`1px solid ${active===id?"rgba(196,181,253,0.4)":"transparent"}`,
                color:active===id?C.purple:"#64748b",
                padding:"5px 14px",borderRadius:"6px",cursor:"pointer",
                fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",
                transition:"all 0.2s",
              }}>{id}</button>
            ))}
          </div>
          {/* Burger */}
          <button className="nav-burger" onClick={()=>setOpen(o=>!o)} style={{
            display:"none",background:"transparent",border:"1px solid rgba(196,181,253,0.25)",
            color:C.purple,borderRadius:"6px",padding:"6px 10px",cursor:"pointer",fontSize:"16px",
          }}>{open?"✕":"☰"}</button>
        </div>
        {/* Mobile menu */}
        {open&&(
          <div style={{background:"rgba(5,5,15,0.98)",borderTop:"1px solid rgba(196,181,253,0.12)",padding:"12px 16px",display:"flex",flexDirection:"column",gap:"4px"}}>
            {NAV.map(id=>(
              <button key={id} onClick={()=>go(id)} style={{
                background:active===id?"rgba(196,181,253,0.1)":"transparent",border:"none",
                color:active===id?C.purple:"#94a3b8",padding:"11px 14px",borderRadius:"6px",
                cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",textAlign:"left",
              }}>{id}</button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

/* ═══ HERO ═════════════════════════════════════════════════════════════════ */
function Hero() {
  const [imgLoaded,setImgLoaded]=useState(false);
  return (
    <section id="home" style={{
      minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      padding:"88px clamp(16px,5vw,48px) 60px",position:"relative",zIndex:1,
    }}>
      {/* Big background glow */}
      <div style={{position:"absolute",width:"600px",height:"600px",borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%)",pointerEvents:"none",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>

      <div style={{maxWidth:"1100px",width:"100%",margin:"0 auto",display:"flex",alignItems:"center",gap:"clamp(32px,6vw,80px)",flexWrap:"wrap",justifyContent:"center"}}>

        {/* LEFT — text */}
        <div style={{flex:"1 1 340px",minWidth:0}}>
          <Reveal>
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(196,181,253,0.1)",border:"1px solid rgba(196,181,253,0.3)",borderRadius:"999px",padding:"6px 16px",marginBottom:"24px",fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:C.purple}}>
              <div style={{width:"7px",height:"7px",borderRadius:"50%",background:C.green,animation:"float 2s ease-in-out infinite"}}/>
              Open to new opportunities
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(2.4rem,6vw,5rem)",fontWeight:700,lineHeight:1.05,marginBottom:"6px"}}>
              <span style={{color:"#f8fafc"}}>Uday </span>
              <span style={{background:"linear-gradient(135deg,#c4b5fd,#6ee7b7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Kadiri</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(0.85rem,2vw,1.05rem)",color:C.green,marginBottom:"16px",fontWeight:500}}>
              Software Developer · AI-Assisted Development
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div style={{marginBottom:"32px",minHeight:"2.2em"}}>
              <Typewriter/>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.24}>
            <div style={{display:"flex",gap:"clamp(8px,2vw,14px)",flexWrap:"wrap",marginBottom:"36px"}}>
              {STATS.map(({n,l,suffix})=>(
                <div key={l} style={{
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(196,181,253,0.2)",
                  borderRadius:"10px",padding:"clamp(10px,2vw,16px) clamp(14px,2.5vw,22px)",
                  textAlign:"center",minWidth:"72px",
                }}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(1.3rem,3vw,1.8rem)",fontWeight:700,color:C.purple,lineHeight:1}}>
                    <CountUp target={n} suffix={suffix}/>
                  </div>
                  <div style={{fontSize:"10px",color:"#475569",textTransform:"uppercase",letterSpacing:"0.1em",marginTop:"4px"}}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.30}>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
              <RippleBtn href="mailto:udaykadiri5@gmail.com" style={{background:"linear-gradient(135deg,#7c3aed,#c4b5fd)",color:"white",padding:"12px 28px",borderRadius:"8px",fontWeight:700,fontSize:"13px",fontFamily:"'JetBrains Mono',monospace",border:"none"}}>
                ✉ Contact Me
              </RippleBtn>
              <RippleBtn href="https://linkedin.com/in/uday667" style={{background:"rgba(125,211,252,0.1)",color:C.blue,padding:"12px 28px",borderRadius:"8px",fontWeight:700,fontSize:"13px",border:"1px solid rgba(125,211,252,0.35)",fontFamily:"'JetBrains Mono',monospace"}}>
                in LinkedIn ↗
              </RippleBtn>
              <RippleBtn href="https://github.com/uday667" style={{background:"rgba(196,181,253,0.08)",color:C.purple,padding:"12px 28px",borderRadius:"8px",fontWeight:700,fontSize:"13px",border:"1px solid rgba(196,181,253,0.3)",fontFamily:"'JetBrains Mono',monospace"}}>
                gh GitHub ↗
              </RippleBtn>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — photo */}
        <Reveal delay={0.1} from="right">
          <div style={{flexShrink:0,position:"relative"}}>
            {/* Spinning ring */}
            <div style={{
              position:"absolute",inset:"-12px",borderRadius:"50%",
              background:"conic-gradient(from 0deg,transparent 0%,rgba(196,181,253,0.6) 30%,rgba(110,231,183,0.6) 60%,transparent 100%)",
              animation:"borderRotate 4s linear infinite",
            }}/>
            {/* White mask */}
            <div style={{position:"absolute",inset:"-2px",borderRadius:"50%",background:"#05050f"}}/>
            {/* Photo */}
            <div style={{
              position:"relative",width:"clamp(200px,28vw,280px)",height:"clamp(200px,28vw,280px)",
              borderRadius:"50%",overflow:"hidden",
              border:"3px solid rgba(196,181,253,0.5)",
              animation:"glowPulse 3s ease-in-out infinite",
            }}>
              <img
                src="/uday.jpeg"
                alt="Uday Kadiri"
                onLoad={()=>setImgLoaded(true)}
                style={{
                  width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",
                  opacity:imgLoaded?1:0,transition:"opacity 0.5s",
                  filter:"brightness(1.05) contrast(1.05)",
                }}
              />
              {!imgLoaded&&(
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(196,181,253,0.08)"}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"2.5rem",fontWeight:700,color:C.purple}}>UK</div>
                </div>
              )}
            </div>
            {/* Floating badges */}
            <div style={{position:"absolute",top:"-10px",right:"-20px",background:"rgba(5,5,15,0.9)",border:"1px solid rgba(110,231,183,0.4)",borderRadius:"8px",padding:"6px 12px",fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:C.green,whiteSpace:"nowrap",boxShadow:"0 4px 24px rgba(0,0,0,0.5)"}}>
              ✦ 4 yrs exp
            </div>
            <div style={{position:"absolute",bottom:"10px",left:"-24px",background:"rgba(5,5,15,0.9)",border:"1px solid rgba(196,181,253,0.4)",borderRadius:"8px",padding:"6px 12px",fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:C.purple,whiteSpace:"nowrap",boxShadow:"0 4px 24px rgba(0,0,0,0.5)"}}>
              🤖 AI Builder
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll hint */}
      <div style={{position:"absolute",bottom:"28px",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px"}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",color:"#334155",letterSpacing:"0.12em",textTransform:"uppercase"}}>scroll</span>
        <div style={{width:"1px",height:"36px",background:"linear-gradient(to bottom,#c4b5fd55,transparent)"}}/>
      </div>
    </section>
  );
}

/* ═══ ABOUT — Card Split Layout ════════════════════════════════════════════ */
const TRAITS = [
  { icon: "⚙️",  label: "Backend-First",   desc: "Microservices, APIs, system design — where I thrive." },
  { icon: "🤖",  label: "AI Builder",       desc: "Shipped RAG chatbots & LLM tools into real workflows." },
  { icon: "☁️",  label: "Cloud-Native",     desc: "GCP & AWS certified. Docker, K8s, CI/CD daily driver." },
  { icon: "🔥",  label: "Scale Obsessed",   desc: "Kafka streams, Redis caches, millions of tx/day." },
  { icon: "📐",  label: "Clean Code",       desc: "300+ DSA problems. Complexity thinking in prod code." },
  { icon: "🚀",  label: "Agile Delivery",   desc: "On-time sprints, US client coordination, zero slippage." },
];

const HIGHLIGHTS = [
  { val: "4+",   label: "Years in Production",   color: C.purple },
  { val: "10M+", label: "Tx Processed (Aadhaar)", color: C.green  },
  { val: "85%",  label: "CI/CD Time Saved (TfL)", color: C.amber  },
  { val: "60%",  label: "Debug Time Reduced",      color: C.blue   },
];

function About() {
  const [activeTraitIdx, setActiveTraitIdx] = useState(null);

  return (
    <section id="about" style={{ padding:"90px clamp(16px,5vw,40px)", position:"relative", zIndex:1 }}>
      <div style={{ maxWidth:"1000px", margin:"0 auto" }}>

        {/* Header */}
        <Reveal>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:C.green, textTransform:"uppercase", letterSpacing:"0.18em", marginBottom:"10px" }}>// about_me</div>
          <h2 style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(1.6rem,3.5vw,2.5rem)", fontWeight:700, marginBottom:"48px", color:C.white }}>Who I Am</h2>
        </Reveal>

        {/* ── TOP: Bio card + Photo side-by-side ── */}
        <div style={{ display:"flex", gap:"clamp(20px,4vw,36px)", flexWrap:"wrap", marginBottom:"clamp(24px,4vw,36px)" }}>
<Reveal delay={0.14} from="right">
  <div style={{ display:"flex", flexDirection:"column", gap:"16px", flex:"0 1 260px" }}>
    
    {/* Photo card */}
    <div style={{
      background:"rgba(255,255,255,0.02)",
      border:"1px solid rgba(196,181,253,0.18)",
      borderRadius:"16px",
      overflow:"hidden",
      position:"relative",
    }}>
      <img
        src="/uday.jpeg"
        alt="Uday Kadiri"
        style={{
          width:"100%",
          height:"220px",
          objectFit:"cover",
          objectPosition:"center 15%",
          display:"block",
          filter:"brightness(1.05) saturate(1.1)"
        }}
      />

      <div
        style={{
          position:"absolute",
          bottom:0,
          left:0,
          right:0,
          height:"60px",
          background:"linear-gradient(to top,rgba(5,5,15,0.85),transparent)"
        }}
      />

      <div
        style={{
          position:"absolute",
          bottom:"10px",
          left:"14px",
          fontFamily:"'JetBrains Mono',monospace",
          fontSize:"11px",
          color:C.white,
          fontWeight:600
        }}
      >
        Uday Kadiri
        <span style={{ color:C.green, marginLeft:"8px" }}>
          · Bengaluru 🇮🇳
        </span>
      </div>
    </div>

    {/* About Me Card */}
    <div
      style={{
        background:"rgba(255,255,255,0.02)",
        border:"1px solid rgba(196,181,253,0.18)",
        borderRadius:"12px",
        padding:"16px"
      }}
    >
      <div
        style={{
          color:C.purple,
          fontSize:"12px",
          fontWeight:700,
          marginBottom:"10px",
          textTransform:"uppercase",
          letterSpacing:"1px"
        }}
      >
        About Me
      </div>

      <p
        style={{
          color:"#cbd5e1",
          fontSize:"13px",
          lineHeight:"1.7",
          margin:0
        }}
      >
        Software Engineer passionate about building scalable applications,
        solving complex technical challenges, and delivering reliable
        enterprise solutions. Open to Software Development, Mobile App
        Development, Freelance Projects, and Technical Consulting
        opportunities. Experienced in Java ecosystem, cloud technologies,
        distributed systems, and modernization initiatives including
        Monolith-to-Microservices migration projects.
      </p>
    </div>

    {/* Highlights */}
    <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
      {[
        {
          icon:"💻",
          text:"Open for Software & Mobile App Development",
          color:C.purple
        },
        {
          icon:"🚀",
          text:"Contributed to Monolith → Microservices Migration",
          color:C.green
        },
        {
          icon:"🤝",
          text:"Available for Freelance & Consulting Projects",
          color:C.blue
        },
        {
          icon:"⚡",
          text:"Java · Spring Boot · Kafka · REST APIs",
          color:C.green
        },
        {
          icon:"🤖",
          text:"AI Solutions · LangChain · Claude API",
          color:C.blue
        },
        {
          icon:"☁️",
          text:"Cloud Technologies · GCP & AWS",
          color:C.amber
        },
        {
          icon:"🏆",
          text:"Recognized for Ownership & Critical Issue Resolution",
          color:"#f97316"
        },
        {
          icon:"🌟",
          text:"Appreciated for Collaboration & Knowledge Sharing",
          color:"#ec4899"
        }
      ].map(({ icon, text, color }, i) => (
        <div
          key={i}
          style={{
            display:"flex",
            alignItems:"center",
            gap:"10px",
            background:`${color}0a`,
            border:`1px solid ${color}22`,
            borderRadius:"8px",
            padding:"8px 14px"
          }}
        >
          <span style={{ fontSize:"14px" }}>{icon}</span>
          <span
            style={{
              fontFamily:"'JetBrains Mono',monospace",
              fontSize:"11px",
              color:"#94a3b8"
            }}
          >
            {text}
          </span>
        </div>
      ))}
    </div>
  </div>
</Reveal>

          {/* PHOTO + QUICK FACTS */}
          <Reveal delay={0.14} from="right">
            <div style={{ display:"flex", flexDirection:"column", gap:"16px", flex:"0 1 260px" }}>
              {/* Photo card */}
              <div style={{
                background:"rgba(255,255,255,0.02)", border:"1px solid rgba(196,181,253,0.18)",
                borderRadius:"16px", overflow:"hidden", position:"relative",
              }}>
                <img
                  src="/uday.jpeg"
                  alt="Uday Kadiri"
                  style={{ width:"100%", height:"220px", objectFit:"cover", objectPosition:"center 15%", display:"block", filter:"brightness(1.05) saturate(1.1)" }}
                />
                {/* Overlay gradient */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"60px", background:"linear-gradient(to top,rgba(5,5,15,0.85),transparent)" }}/>
                <div style={{ position:"absolute", bottom:"10px", left:"14px", fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:C.white, fontWeight:600 }}>
                  Uday Kadiri
                  <span style={{ color:C.green, marginLeft:"8px" }}>· Bengaluru 🇮🇳</span>
                </div>
              </div>

              {/* Quick facts pill stack */}
              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                {[
                  { icon:"🏢", text:"Currently @ Accenture",     color:C.purple },
                  { icon:"⚡", text:"Java · Spring · Kafka",      color:C.green  },
                  { icon:"🤖", text:"Claude API · LangChain",     color:C.blue   },
                  { icon:"☁️", text:"GCP Certified · AWS Cert",   color:C.amber  },
                ].map(({icon,text,color},i)=>(
                  <div key={i} style={{
                    display:"flex", alignItems:"center", gap:"10px",
                    background:`${color}0a`, border:`1px solid ${color}22`,
                    borderRadius:"8px", padding:"8px 14px",
                  }}>
                    <span style={{ fontSize:"14px" }}>{icon}</span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:"#94a3b8" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── HIGHLIGHT NUMBERS ROW ── */}
        <Reveal delay={0.18}>
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",
            gap:"12px", marginBottom:"clamp(24px,4vw,36px)",
          }}>
            {HIGHLIGHTS.map(({val,label,color},i)=>(
              <div key={i} style={{
                background:`${color}08`, border:`1px solid ${color}25`,
                borderRadius:"12px", padding:"18px 14px", textAlign:"center",
                transition:"transform 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.borderColor=`${color}55`; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor=`${color}25`; }}
              >
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:700, color, lineHeight:1, marginBottom:"6px" }}>{val}</div>
                <div style={{ fontSize:"10px", color:"#475569", textTransform:"uppercase", letterSpacing:"0.08em", lineHeight:1.4 }}>{label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── TRAITS GRID ── */}
        <Reveal delay={0.22}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:"#334155", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:"14px" }}>
            what drives me
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,280px),1fr))", gap:"12px" }}>
            {TRAITS.map(({icon,label,desc},i)=>(
              <div
                key={i}
                onClick={()=>setActiveTraitIdx(activeTraitIdx===i?null:i)}
                style={{
                  background: activeTraitIdx===i ? "rgba(196,181,253,0.08)" : "rgba(255,255,255,0.025)",
                  border:`1px solid ${activeTraitIdx===i?"rgba(196,181,253,0.4)":"rgba(255,255,255,0.07)"}`,
                  borderRadius:"12px", padding:"16px 18px",
                  display:"flex", alignItems:"flex-start", gap:"12px",
                  cursor:"pointer", transition:"all 0.25s cubic-bezier(.22,1,.36,1)",
                  boxShadow: activeTraitIdx===i ? "0 0 24px rgba(196,181,253,0.1)" : "none",
                }}
                onMouseEnter={e=>{ if(activeTraitIdx!==i){ e.currentTarget.style.borderColor="rgba(196,181,253,0.25)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}}
                onMouseLeave={e=>{ if(activeTraitIdx!==i){ e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.background="rgba(255,255,255,0.025)"; }}}
              >
                <div style={{ fontSize:"22px", lineHeight:1, marginTop:"1px", flexShrink:0 }}>{icon}</div>
                <div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, fontSize:"13px", color: activeTraitIdx===i ? C.purple : C.white, marginBottom:"4px", transition:"color 0.2s" }}>{label}</div>
                  <div style={{
                    fontSize:"12px", color:"#64748b", lineHeight:1.6,
                    maxHeight: activeTraitIdx===i ? "80px" : "0",
                    overflow:"hidden",
                    transition:"max-height 0.35s cubic-bezier(.22,1,.36,1), opacity 0.3s",
                    opacity: activeTraitIdx===i ? 1 : 0,
                  }}>{desc}</div>
                  {activeTraitIdx!==i && (
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"10px", color:"#334155" }}>tap to expand</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ═══ EXPERIENCE ════════════════════════════════════════════════════════════ */
function Experience() {
  const [open, setOpen] = useState(null);
  return (
    <section id="experience" style={{padding:"90px clamp(16px,5vw,40px)",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"860px",margin:"0 auto"}}>
        <Reveal>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:C.green,textTransform:"uppercase",letterSpacing:"0.18em",marginBottom:"10px"}}>// work_history</div>
          <h2 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(1.6rem,3.5vw,2.5rem)",fontWeight:700,marginBottom:"48px",color:C.white}}>Experience</h2>
        </Reveal>
        <div style={{position:"relative",paddingLeft:"clamp(28px,5vw,50px)"}}>
          <div style={{position:"absolute",left:"7px",top:0,bottom:0,width:"1px",background:"linear-gradient(to bottom,rgba(196,181,253,0.5),transparent)"}}/>
          {EXPERIENCE.map((exp,i)=>(
            <Reveal key={i} delay={i*0.1}>
              <div style={{position:"relative",marginBottom:"28px"}}>
                {/* Timeline dot */}
                <div style={{position:"absolute",left:`calc(clamp(28px,5vw,50px) * -1 + 0px)`,top:"22px",width:"16px",height:"16px",borderRadius:"50%",border:`2px solid ${exp.color}`,background:`${exp.color}20`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div style={{width:"5px",height:"5px",borderRadius:"50%",background:exp.color}}/>
                </div>
                {/* Card */}
                <div
                  onClick={()=>setOpen(open===i?null:i)}
                  style={{
                    background: open===i?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.025)",
                    border:`1px solid ${open===i?exp.color+"66":"rgba(255,255,255,0.08)"}`,
                    borderRadius:"12px",padding:"clamp(16px,3vw,24px)",cursor:"pointer",
                    transition:"all 0.3s cubic-bezier(.22,1,.36,1)",
                    boxShadow:open===i?`0 0 30px ${exp.color}18`:"none",
                  }}
                  onMouseEnter={e=>{if(open!==i){e.currentTarget.style.borderColor=`${exp.color}44`;e.currentTarget.style.background="rgba(255,255,255,0.035)";}}}
                  onMouseLeave={e=>{if(open!==i){e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.background="rgba(255,255,255,0.025)";}}}
                >
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}>
                    <div>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:"clamp(0.85rem,2vw,1rem)",color:exp.color}}>{exp.co}</span>
                      <span style={{color:"#64748b",fontSize:"0.85rem",marginLeft:"8px"}}>· {exp.role}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                      <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:"#475569",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"4px",padding:"2px 9px",whiteSpace:"nowrap"}}>{exp.period}</span>
                      <span style={{color:exp.color,fontSize:"14px",transition:"transform 0.3s",transform:open===i?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
                    </div>
                  </div>
                  {/* Expanded bullets */}
                  {open===i&&(
                    <ul style={{listStyle:"none",marginTop:"16px",borderTop:`1px solid ${exp.color}22`,paddingTop:"14px"}}>
                      {exp.bullets.map((b,j)=>(
                        <li key={j} style={{display:"flex",gap:"10px",marginBottom:"8px",animation:`slideIn 0.3s ${j*0.05}s both`}}>
                          <span style={{color:exp.color,fontSize:"9px",marginTop:"5px",flexShrink:0}}>▶</span>
                          <span style={{fontSize:"clamp(12px,1.5vw,13.5px)",color:"#94a3b8",lineHeight:1.68}}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {open!==i&&(
                    <div style={{marginTop:"10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:"#334155"}}>
                      Click to expand {exp.bullets.length} highlights →
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PROJECTS ═════════════════════════════════════════════════════════════ */
function Projects() {
  return (
    <section id="projects" style={{padding:"90px clamp(16px,5vw,40px)",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"860px",margin:"0 auto"}}>
        <Reveal>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:C.green,textTransform:"uppercase",letterSpacing:"0.18em",marginBottom:"10px"}}>// ai_projects</div>
          <h2 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(1.6rem,3.5vw,2.5rem)",fontWeight:700,marginBottom:"44px",color:C.white}}>Projects</h2>
        </Reveal>
        <div style={{display:"grid",gap:"20px"}}>
          {PROJECTS.map((p,i)=>(
            <Reveal key={i} delay={i*0.1}>
              <div
                style={{
                  background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:"12px",padding:"clamp(18px,3vw,28px)",
                  transition:"transform 0.3s cubic-bezier(.22,1,.36,1), border-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor=`${p.color}55`;e.currentTarget.style.boxShadow=`0 12px 40px ${p.color}18`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.boxShadow="none";}}
              >
                <div style={{display:"flex",gap:"16px",alignItems:"flex-start"}}>
                  <div style={{width:"50px",height:"50px",borderRadius:"12px",flexShrink:0,background:`${p.color}15`,border:`1px solid ${p.color}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px"}}>
                    {p.icon}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <h3 style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:"clamp(0.9rem,2vw,1.05rem)",color:p.color,marginBottom:"9px"}}>{p.title}</h3>
                    <p style={{fontSize:"clamp(12px,1.5vw,13.5px)",color:"#64748b",lineHeight:1.7,marginBottom:"16px"}}>{p.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"8px",alignItems:"center"}}>
                      <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                        {p.stack.map(s=>(
                          <span key={s} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",background:`${p.color}12`,color:p.color,border:`1px solid ${p.color}30`,borderRadius:"4px",padding:"2px 9px"}}>{s}</span>
                        ))}
                      </div>
                      <span style={{marginLeft:"auto",fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:C.green,background:"rgba(110,231,183,0.08)",border:"1px solid rgba(110,231,183,0.22)",borderRadius:"4px",padding:"3px 10px",whiteSpace:"nowrap"}}>✦ {p.metric}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ SKILLS ═══════════════════════════════════════════════════════════════ */
function Skills() {
  const [hov,setHov]=useState(null);
  return (
    <section id="skills" style={{padding:"90px clamp(16px,5vw,40px)",position:"relative",zIndex:1}}>
      <div style={{maxWidth:"860px",margin:"0 auto"}}>
        <Reveal>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:C.green,textTransform:"uppercase",letterSpacing:"0.18em",marginBottom:"10px"}}>// tech_stack</div>
          <h2 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(1.6rem,3.5vw,2.5rem)",fontWeight:700,marginBottom:"44px",color:C.white}}>Skills</h2>
        </Reveal>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,240px),1fr))",gap:"16px"}}>
          {Object.entries(SKILLS_MAP).map(([cat,items],ci)=>{
            const color=SKILL_COLORS[ci%SKILL_COLORS.length];
            return (
              <Reveal key={cat} delay={ci*0.06}>
                <div style={{background:"rgba(255,255,255,0.025)",border:`1px solid ${color}18`,borderRadius:"12px",padding:"18px",transition:"border-color 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=`${color}40`}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=`${color}18`}
                >
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"12px",paddingBottom:"8px",borderBottom:`1px solid ${color}22`}}>{cat}</div>
                  <div>{items.map(item=>{
                    const id=`${ci}-${item}`;
                    return (
                      <span key={item} onMouseEnter={()=>setHov(id)} onMouseLeave={()=>setHov(null)} style={{
                        display:"inline-block",margin:"3px",padding:"4px 11px",borderRadius:"999px",
                        fontSize:"11px",fontFamily:"'JetBrains Mono',monospace",
                        border:`1px solid ${hov===id?color+"66":color+"28"}`,
                        background:hov===id?`${color}22`:`${color}0a`,
                        color:hov===id?color:"#94a3b8",
                        cursor:"default",transition:"all 0.18s",
                        transform:hov===id?"scale(1.05)":"scale(1)",
                      }}>{item}</span>
                    );
                  })}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* DSA Banner */}
        <Reveal delay={0.35}>
          <div style={{marginTop:"22px",background:"linear-gradient(135deg,rgba(196,181,253,0.08),rgba(110,231,183,0.05))",border:"1px solid rgba(196,181,253,0.22)",borderRadius:"12px",padding:"clamp(16px,3vw,22px) clamp(18px,3vw,28px)",display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap"}}>
            <div style={{fontSize:"2.2rem"}}>⚡</div>
            <div>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:C.purple,marginBottom:"4px",fontSize:"clamp(0.85rem,2vw,1rem)"}}>300+ LeetCode Problems Solved</div>
              <div style={{fontSize:"clamp(11px,1.4vw,12.5px)",color:"#475569"}}>Arrays · Trees · Graphs · DP · Sliding Window · BFS/DFS · Two Pointer · Binary Search</div>
            </div>
            <span style={{marginLeft:"auto",fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:C.green,background:"rgba(110,231,183,0.1)",border:"1px solid rgba(110,231,183,0.25)",borderRadius:"4px",padding:"4px 12px",whiteSpace:"nowrap"}}>HackerRank Java Certified</span>
          </div>
        </Reveal>

        {/* Certs */}
        <Reveal delay={0.42}>
          <div style={{display:"flex",gap:"12px",flexWrap:"wrap",marginTop:"18px"}}>
            {[{n:"Google Associate Cloud Engineer",s:"GCP",c:"#4285f4"},{n:"AWS Cloud Practitioner",s:"AWS",c:"#ff9900"},{n:"HackerRank Java Certified",s:"HR",c:"#2ec866"}].map(cert=>(
              <div key={cert.n} style={{background:"rgba(255,255,255,0.02)",border:`1px solid ${cert.c}33`,borderRadius:"10px",padding:"13px 18px",display:"flex",alignItems:"center",gap:"12px"}}>
                <div style={{width:"36px",height:"36px",borderRadius:"50%",background:`${cert.c}18`,border:`1px solid ${cert.c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:"10px",color:cert.c}}>{cert.s}</div>
                <div>
                  <div style={{fontWeight:600,fontSize:"clamp(11px,1.4vw,13px)",color:C.white}}>{cert.n}</div>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:cert.c}}>✓ verified</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ CONTACT ══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" style={{padding:"90px clamp(16px,5vw,40px) 80px",position:"relative",zIndex:1,background:"linear-gradient(to bottom,transparent,rgba(124,58,237,0.04),transparent)"}}>
      <div style={{maxWidth:"660px",margin:"0 auto",textAlign:"center"}}>
        <Reveal>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:C.green,textTransform:"uppercase",letterSpacing:"0.18em",marginBottom:"10px"}}>// contact</div>
          <h2 style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(1.6rem,3.5vw,2.5rem)",fontWeight:700,marginBottom:"16px",color:C.white}}>Let's Build Something</h2>
          <p style={{color:"#475569",fontSize:"clamp(13px,1.8vw,15px)",lineHeight:1.8,marginBottom:"48px"}}>
            Open to backend engineering roles, AI-integrated systems, and production-grade collaborations. Bengaluru-based; remote-friendly.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{display:"flex",flexDirection:"column",gap:"12px",alignItems:"center"}}>
            {CONTACTS.map(({icon,label,href,color})=>(
              <RippleBtn key={href} href={href} style={{
                display:"flex",alignItems:"center",gap:"14px",
                background:"rgba(255,255,255,0.03)",border:`1px solid ${color}25`,
                borderRadius:"10px",padding:"15px 24px",color:"#94a3b8",
                fontFamily:"'JetBrains Mono',monospace",fontSize:"clamp(11px,1.5vw,13px)",
                width:"100%",maxWidth:"380px",transition:"all 0.25s",
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=color+"66";e.currentTarget.style.color=color;e.currentTarget.style.background=`${color}0e`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=`${color}25`;e.currentTarget.style.color="#94a3b8";e.currentTarget.style.background="rgba(255,255,255,0.03)";}}
              >
                <div style={{width:"32px",height:"32px",borderRadius:"7px",background:`${color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",color,fontWeight:700,flexShrink:0}}>{icon}</div>
                {label}
                <span style={{marginLeft:"auto",opacity:0.4,fontSize:"12px"}}>↗</span>
              </RippleBtn>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ FOOTER ════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{borderTop:"1px solid rgba(196,181,253,0.1)",padding:"22px clamp(16px,5vw,40px)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px",position:"relative",zIndex:1}}>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:"#1e293b"}}>
        <span style={{color:"#334155"}}>{"< "}</span>
        <span style={{color:"#3730a3"}}>Uday</span>
        <span style={{color:"#065f46"}}></span>
        <span style={{color:"#334155"}}>{" />"}</span>
        <span style={{color:"#1e293b",marginLeft:"12px"}}>© 2025 · Bengaluru, India</span>
      </div>
      <div style={{display:"flex",gap:"18px"}}>
        {[{t:"LinkedIn",h:"https://linkedin.com/in/uday667",c:C.blue},{t:"GitHub",h:"https://github.com/uday667",c:C.purple},{t:"Email",h:"mailto:udaykadiri5@gmail.com",c:C.pink}].map(({t,h,c})=>(
          <a key={t} href={h} target={h.startsWith("mailto")?undefined:"_blank"} rel="noopener noreferrer"
            style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"11px",color:"#334155",textDecoration:"none",transition:"color 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.color=c}
            onMouseLeave={e=>e.currentTarget.style.color="#334155"}
          >{t}</a>
        ))}
      </div>
    </footer>
  );
}

/* ═══ ROOT APP ══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{background:"#05050f",color:"#f1f5f9",minHeight:"100vh",overflowX:"hidden"}}>
      <ParticleCanvas/>
      <Nav/>
      <Hero/>
      <About/>
      <Experience/>
      <Projects/>
      <Skills/>
      <Contact/>
      <Footer/>
    </div>
  );
}
