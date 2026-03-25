import React, { useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  getNotices, addNotice, deleteNotice,
  getEvents, addEvent, deleteEvent,
  getResults, addResult, deleteResult,
  getAdmissions, deleteAdmission, updateAdmissionStatus,
  getEnquiries, deleteEnquiry,

} from "../../../services/storage";
import { Notice, Result, Enquiry, AdmissionApplication, Event } from "../../../types";
import {
  LogOut, Bell, Image, Trophy, Users, MessageSquare,
  Plus, Trash2, Upload, X, CheckCircle, Clock,
  LayoutDashboard, ChevronRight, Calendar,
  Download, Eye, Zap, BookOpen,
  Phone, FileText,
  GraduationCap, ClipboardList, RefreshCw, Search,
  Newspaper, XCircle, Star,
} from "lucide-react";

type Tab = "overview" | "notices" | "gallery" | "results" | "admissions" | "enquiries" | "events";

/* ─── HW type ─────────────────────────────────────────────── */
type HW = { id: string; cls: string; subject: string; task: string; dueDate: string; date: string; };

/* ─── CONFIRM DIALOG ─────────────────────────────────────── */
const ConfirmDialog = ({ msg, onYes, onNo }: { msg: string; onYes: () => void; onNo: () => void }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, backdropFilter:"blur(6px)" }}>
    <div style={{ background:"linear-gradient(135deg,#1e293b,#0f172a)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"32px", maxWidth:"380px", width:"90%", textAlign:"center", boxShadow:"0 40px 80px rgba(0,0,0,0.5)" }}>
      <div style={{ width:"52px", height:"52px", background:"rgba(239,68,68,0.15)", borderRadius:"14px", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
        <Trash2 size={24} color="#ef4444" />
      </div>
      <h3 style={{ color:"white", fontSize:"17px", fontWeight:"700", fontFamily:"'DM Sans',sans-serif", marginBottom:"8px" }}>Confirm Delete</h3>
      <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", marginBottom:"24px", lineHeight:"1.5" }}>{msg}</p>
      <div style={{ display:"flex", gap:"10px" }}>
        <button onClick={onNo} style={{ flex:1, padding:"11px", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.7)", cursor:"pointer", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", fontWeight:"600" }}>Cancel</button>
        <button onClick={onYes} style={{ flex:1, padding:"11px", borderRadius:"10px", border:"none", background:"linear-gradient(135deg,#ef4444,#dc2626)", color:"white", cursor:"pointer", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", fontWeight:"700", boxShadow:"0 6px 16px rgba(239,68,68,0.3)" }}>Delete</button>
      </div>
    </div>
  </div>
);

/* ─── TOAST ──────────────────────────────────────────────── */
const Toast = ({ msg, type }: { msg: string; type: "success"|"error" }) => (
  <div style={{ position:"fixed", bottom:"24px", right:"24px", zIndex:3000, background: type==="success" ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#ef4444,#dc2626)", color:"white", padding:"12px 20px", borderRadius:"12px", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", fontWeight:"600", boxShadow:"0 12px 32px rgba(0,0,0,0.3)", display:"flex", alignItems:"center", gap:"8px", animation:"slideUp 0.3s ease" }}>
    {type==="success" ? <CheckCircle size={16} /> : <XCircle size={16} />} {msg}
  </div>
);

/* ─── SIDEBAR ─────────────────────────────────────────────── */
const Sidebar = ({ active, onNavigate, onLogout }: { active: Tab; onNavigate: (t: Tab) => void; onLogout: () => void }) => {
  const sections = [
    { label:"MAIN", items:[
      { icon: LayoutDashboard, label:"Overview",    tab:"overview"   as Tab },
      { icon: Bell,            label:"Notices",     tab:"notices"    as Tab },
      { icon: Newspaper,       label:"Events/News", tab:"events"     as Tab },
    ]},
    { label:"ACADEMICS", items:[
      { icon: Trophy,          label:"Results",     tab:"results"    as Tab },
      { icon: Image,           label:"Gallery",     tab:"gallery"    as Tab },
    ]},
    { label:"STUDENTS", items:[
      { icon: GraduationCap,   label:"Admissions",  tab:"admissions" as Tab },
      { icon: MessageSquare,   label:"Enquiries",   tab:"enquiries"  as Tab },
    ]},
  ];

  return (
    <aside style={{ width:"260px", minHeight:"100vh", background:"linear-gradient(180deg,#0a0f1e 0%,#0d1425 60%,#0a0f1e 100%)", borderRight:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", position:"fixed", left:0, top:0, bottom:0, zIndex:100 }}>
      <div style={{ padding:"20px 18px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"11px", marginBottom:"14px" }}>
          <div style={{ width:"46px", height:"46px", borderRadius:"14px", background:"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden", border:"2px solid rgba(16,185,129,0.3)" }}>
            <img src="/logo.png" alt="Logo" style={{ width:"32px", height:"32px", objectFit:"contain" }} />
          </div>
          <div>
            <div style={{ color:"white", fontWeight:"800", fontSize:"12.5px", fontFamily:"'DM Sans',sans-serif", lineHeight:1.2 }}>The Study School</div>
            <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"10px", fontFamily:"'DM Sans',sans-serif", marginTop:"2px" }}>Aspur, Dungarpur</div>
          </div>
        </div>
        <div style={{ padding:"8px 12px", background:"rgba(16,185,129,0.08)", borderRadius:"8px", border:"1px solid rgba(16,185,129,0.15)", display:"flex", alignItems:"center", gap:"8px" }}>
          <div style={{ width:"7px", height:"7px", background:"#10b981", borderRadius:"50%", boxShadow:"0 0 8px #10b981", animation:"pulse 2s infinite", flexShrink:0 }} />
          <span style={{ color:"rgba(255,255,255,0.45)", fontSize:"10.5px", fontFamily:"'DM Sans',sans-serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>thestudyaspur@gmail.com</span>
        </div>
      </div>

      <nav style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
        {sections.map(sec => (
          <div key={sec.label} style={{ marginBottom:"20px" }}>
            <div style={{ color:"rgba(255,255,255,0.2)", fontSize:"10px", fontFamily:"'DM Sans',sans-serif", letterSpacing:"1.5px", textTransform:"uppercase", padding:"0 8px", marginBottom:"6px" }}>{sec.label}</div>
            {sec.items.map(item => {
              const isActive = active === item.tab;
              const Icon = item.icon;
              return (
                <button key={item.tab} onClick={() => onNavigate(item.tab)} style={{ width:"100%", display:"flex", alignItems:"center", gap:"11px", padding:"10px 12px", borderRadius:"10px", border:"none", cursor:"pointer", background: isActive ? "linear-gradient(135deg,rgba(16,185,129,0.18),rgba(16,185,129,0.05))" : "transparent", borderLeft:`2px solid ${isActive ? "#10b981" : "transparent"}`, transition:"all 0.18s ease", textAlign:"left", marginBottom:"2px" }}>
                  <Icon size={16} color={isActive ? "#10b981" : "rgba(255,255,255,0.38)"} />
                  <span style={{ color: isActive ? "white" : "rgba(255,255,255,0.45)", fontSize:"13px", fontWeight: isActive ? 600 : 400, fontFamily:"'DM Sans',sans-serif", flex:1 }}>{item.label}</span>
                  {isActive && <ChevronRight size={13} color="#10b981" />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{ padding:"12px 12px 16px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ padding:"10px 12px", marginBottom:"10px" }}>
          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"11px", fontFamily:"'DM Sans',sans-serif" }}>Developed by</div>
          <div style={{ color:"#10b981", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", fontWeight:"700" }}>MR DIGI</div>
        </div>
        <button onClick={onLogout} style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", borderRadius:"10px", border:"none", cursor:"pointer", background:"transparent", transition:"background 0.18s ease" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.1)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
          <LogOut size={16} color="rgba(239,68,68,0.6)" />
          <span style={{ color:"rgba(239,68,68,0.6)", fontSize:"13px", fontFamily:"'DM Sans',sans-serif" }}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

/* ─── SHARED UI ───────────────────────────────────────────── */
const G = ({ children, style={} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background:"linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", ...style }}>{children}</div>
);
const SH = ({ title, sub }: { title: string; sub?: string }) => (
  <div style={{ marginBottom:"22px" }}>
    <h2 style={{ color:"white", fontSize:"20px", fontWeight:"700", fontFamily:"'DM Sans',sans-serif", margin:0 }}>{title}</h2>
    {sub && <p style={{ color:"rgba(255,255,255,0.32)", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", marginTop:"4px" }}>{sub}</p>}
  </div>
);
const IS: React.CSSProperties = { width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"10px", padding:"11px 15px", color:"white", fontSize:"13.5px", fontFamily:"'DM Sans',sans-serif", outline:"none", boxSizing:"border-box" };
const fi = (e: React.FocusEvent<any>) => { e.target.style.borderColor = "#10b981"; };
const fo = (e: React.FocusEvent<any>) => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; };
const GBtn = ({ onClick, children, disabled=false, red=false }: { onClick?: () => void; children: React.ReactNode; disabled?: boolean; red?: boolean }) => (
  <button onClick={onClick} disabled={disabled} style={{ background: red ? "linear-gradient(135deg,#ef4444,#dc2626)" : "linear-gradient(135deg,#10b981,#059669)", color:"white", border:"none", cursor: disabled ? "not-allowed" : "pointer", padding:"10px 20px", borderRadius:"10px", fontSize:"13px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", gap:"7px", boxShadow: red ? "0 6px 16px rgba(239,68,68,0.25)" : "0 6px 16px rgba(16,185,129,0.25)", opacity: disabled ? 0.5 : 1, transition:"all 0.18s", whiteSpace:"nowrap" }}>{children}</button>
);
const StatCard = ({ icon: Icon, label, value, gradient, glow }: { icon: React.ElementType; label: string; value: number|string; gradient: string; glow: string }) => (
  <div style={{ background:"linear-gradient(135deg,#0f172a,#1a2744)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", padding:"20px", position:"relative", overflow:"hidden", transition:"transform 0.2s,box-shadow 0.2s", cursor:"default" }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 36px ${glow}`; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}>
    <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"70px", height:"70px", background:glow, borderRadius:"50%", filter:"blur(20px)", opacity:0.35 }} />
    <div style={{ width:"40px", height:"40px", background:gradient, borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"14px", boxShadow:`0 6px 16px ${glow}` }}>
      <Icon size={18} color="white" />
    </div>
    <div style={{ fontSize:"26px", fontWeight:"700", color:"white", fontFamily:"'DM Sans',sans-serif", lineHeight:1 }}>{value}</div>
    <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"11.5px", fontFamily:"'DM Sans',sans-serif", marginTop:"5px" }}>{label}</div>
  </div>
);

/* ─── OVERVIEW ────────────────────────────────────────────── */
const OverviewPanel = ({ onNavigate }: { onNavigate: (t: Tab) => void }) => {
  const [notices, setNotices]       = useState<Notice[]>([]);
  const [results, setResults]       = useState<Result[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [enquiries, setEnquiries]   = useState<Enquiry[]>([]);
  const [events, setEvents]         = useState<Event[]>([]);
  const [loading, setLoading]       = useState(true);

  const today = new Date().toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

  useEffect(() => {
    Promise.all([
      getNotices().then(setNotices),
      getResults().then(setResults),
      getAdmissions().then(setAdmissions),
      getEnquiries().then(setEnquiries),
      getEvents().then(setEvents),
    ]).finally(() => setLoading(false));
  }, []);

  const pending = admissions.filter(a => a.status === "pending").length;

  if (loading) return <div style={{ color:"rgba(255,255,255,0.4)", padding:"40px", textAlign:"center", fontFamily:"'DM Sans',sans-serif" }}>Loading dashboard...</div>;

  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#0d2818,#0a1f2f)", border:"1px solid rgba(16,185,129,0.18)", borderRadius:"20px", padding:"24px 28px", marginBottom:"24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, right:0, width:"280px", height:"100%", background:"radial-gradient(ellipse at right,rgba(16,185,129,0.12),transparent)" }} />
        <div style={{ position:"relative", display:"flex", alignItems:"center", gap:"16px" }}>
          <img src="/logo.png" alt="Logo" style={{ width:"48px", height:"48px", objectFit:"contain", background:"white", borderRadius:"12px", padding:"4px" }} />
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
              <Zap size={14} color="#10b981" />
              <span style={{ color:"#10b981", fontSize:"11px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif", letterSpacing:"1px", textTransform:"uppercase" }}>Admin Dashboard</span>
            </div>
            <h1 style={{ color:"white", fontSize:"20px", fontWeight:"800", fontFamily:"'DM Sans',sans-serif", margin:"0 0 2px", letterSpacing:"-0.3px" }}>Welcome back, Admin! 👋</h1>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", margin:0 }}>The Study School · {today}</p>
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", marginBottom:"24px" }}>
        <StatCard icon={Bell}          label="Notices"      value={notices.length}    gradient="linear-gradient(135deg,#3b82f6,#1d4ed8)" glow="rgba(59,130,246,0.4)"  />
        <StatCard icon={Newspaper}     label="Events"       value={events.length}     gradient="linear-gradient(135deg,#06b6d4,#0891b2)" glow="rgba(6,182,212,0.4)"  />
        <StatCard icon={Trophy}        label="Results"      value={results.length}    gradient="linear-gradient(135deg,#f59e0b,#d97706)" glow="rgba(245,158,11,0.4)" />
        <StatCard icon={Users}         label="Applications" value={admissions.length} gradient="linear-gradient(135deg,#10b981,#059669)" glow="rgba(16,185,129,0.4)" />
        <StatCard icon={MessageSquare} label="Enquiries"    value={enquiries.length}  gradient="linear-gradient(135deg,#ef4444,#dc2626)" glow="rgba(239,68,68,0.4)"  />
        <StatCard icon={Clock}         label="Pending"      value={pending}           gradient="linear-gradient(135deg,#f97316,#ea580c)" glow="rgba(249,115,22,0.4)" />
        <StatCard icon={Star}          label="Gallery"      value="📷"                gradient="linear-gradient(135deg,#8b5cf6,#6d28d9)" glow="rgba(139,92,246,0.4)" />
      </div>

      <G style={{ padding:"20px", marginBottom:"20px" }}>
        <div style={{ color:"rgba(255,255,255,0.25)", fontSize:"10px", fontFamily:"'DM Sans',sans-serif", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"14px" }}>Quick Actions</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px" }}>
          {([
            { label:"Post Notice",  icon:Bell,         tab:"notices"    as Tab, rgb:"59,130,246"  },
            { label:"Add Event",    icon:Newspaper,    tab:"events"     as Tab, rgb:"6,182,212"   },
            { label:"Add Result",   icon:Trophy,       tab:"results"    as Tab, rgb:"245,158,11"  },
            { label:"Upload Photo", icon:Image,        tab:"gallery"    as Tab, rgb:"139,92,246"  },
            { label:"Admissions",   icon:GraduationCap,tab:"admissions" as Tab, rgb:"16,185,129"  },
            { label:"Enquiries",    icon:MessageSquare,tab:"enquiries"  as Tab, rgb:"239,68,68"   },
            { label:"Gallery Mgmt", icon:ClipboardList,tab:"gallery"   as Tab, rgb:"168,85,247"  },
          ]).map(a => (
            <button key={a.label} onClick={() => onNavigate(a.tab)} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"12px", padding:"14px 8px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"8px", transition:"all 0.18s ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background=`rgba(${a.rgb},0.1)`; el.style.borderColor=`rgba(${a.rgb},0.5)`; el.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background="rgba(255,255,255,0.03)"; el.style.borderColor="rgba(255,255,255,0.07)"; el.style.transform=""; }}>
              <a.icon size={19} color={`rgba(${a.rgb},1)`} />
              <span style={{ color:"rgba(255,255,255,0.6)", fontSize:"11px", fontFamily:"'DM Sans',sans-serif", fontWeight:"500", textAlign:"center", lineHeight:1.2 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </G>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
        {notices.length > 0 && (
          <G>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ color:"white", fontSize:"13.5px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>Recent Notices</span>
              <button onClick={() => onNavigate("notices")} style={{ color:"#10b981", fontSize:"11.5px", fontFamily:"'DM Sans',sans-serif", background:"none", border:"none", cursor:"pointer" }}>View all →</button>
            </div>
            {notices.slice(0,4).map((n,i) => (
              <div key={n.id} style={{ padding:"12px 20px", borderBottom:i<3&&i<notices.length-1?"1px solid rgba(255,255,255,0.04)":"none", display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background: n.isImportant ? "#f59e0b" : "#10b981", boxShadow:`0 0 6px ${n.isImportant?"#f59e0b":"#10b981"}`, flexShrink:0 }} />
                <span style={{ color:"rgba(255,255,255,0.7)", fontSize:"12.5px", fontFamily:"'DM Sans',sans-serif", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{n.title}</span>
                <span style={{ color:"rgba(255,255,255,0.2)", fontSize:"10px", fontFamily:"'DM Sans',sans-serif", flexShrink:0 }}>{n.date}</span>
              </div>
            ))}
          </G>
        )}
        {admissions.length > 0 && (
          <G>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ color:"white", fontSize:"13.5px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>Recent Applications</span>
              <button onClick={() => onNavigate("admissions")} style={{ color:"#10b981", fontSize:"11.5px", fontFamily:"'DM Sans',sans-serif", background:"none", border:"none", cursor:"pointer" }}>View all →</button>
            </div>
            {admissions.slice(0,4).map((a,i) => (
              <div key={a.id} style={{ padding:"12px 20px", borderBottom:i<3&&i<admissions.length-1?"1px solid rgba(255,255,255,0.04)":"none", display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"30px", height:"30px", borderRadius:"8px", background:"rgba(16,185,129,0.15)", display:"flex", alignItems:"center", justifyContent:"center", color:"#10b981", fontWeight:"700", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", flexShrink:0 }}>{a.studentName.charAt(0)}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ color:"rgba(255,255,255,0.82)", fontSize:"12.5px", fontFamily:"'DM Sans',sans-serif", fontWeight:"500", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.studentName}</div>
                  <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"10.5px", fontFamily:"'DM Sans',sans-serif" }}>{a.grade}</div>
                </div>
                <span style={{ padding:"3px 8px", borderRadius:"5px", fontSize:"10px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif", background: a.status==="pending"?"rgba(245,158,11,0.13)":"rgba(16,185,129,0.13)", color: a.status==="pending"?"#f59e0b":"#10b981" }}>{a.status}</span>
              </div>
            ))}
          </G>
        )}
      </div>
    </div>
  );
};

/* ─── NOTICES PANEL ───────────────────────────────────────── */
const NoticesPanel = ({ toast }: { toast: (m:string,t:"success"|"error")=>void }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle]     = useState("");
  const [important, setImp]   = useState(false);
  const [confirm, setConfirm] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getNotices().then(setNotices);
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await addNotice({ title:title.trim(), date:new Date().toISOString().split("T")[0], isImportant:important });
      setTitle(""); setImp(false); await load(); toast("Notice posted successfully!","success");
    } catch { toast("Failed to post notice.","error"); }
    setLoading(false);
  };

  const del = async (id: string) => {
    try {
      await deleteNotice(id); await load(); setConfirm(null); toast("Notice deleted.","error");
    } catch { toast("Failed to delete.","error"); }
  };

  return (
    <div>
      {confirm && <ConfirmDialog msg="Are you sure you want to delete this notice?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
      <SH title="Notice Board" sub="Post and manage school announcements" />
      <G style={{ padding:"20px", marginBottom:"16px" }}>
        <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"10px", fontFamily:"'DM Sans',sans-serif", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"12px" }}>New Notice</div>
        <input type="text" placeholder="Notice title..." value={title} onChange={e => setTitle(e.target.value)} style={{ ...IS, marginBottom:"12px" }} onFocus={fi} onBlur={fo}
          onKeyDown={e => { if(e.key==="Enter") add(); }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <label style={{ display:"flex", alignItems:"center", gap:"8px", color:"rgba(255,255,255,0.55)", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}>
            <input type="checkbox" checked={important} onChange={e => setImp(e.target.checked)} style={{ accentColor:"#f59e0b", width:"15px", height:"15px" }} />
            Mark as Important
          </label>
          <GBtn onClick={add} disabled={loading || !title.trim()}><Plus size={14} />{loading ? "Posting..." : "Post Notice"}</GBtn>
        </div>
      </G>

      <G>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ color:"white", fontSize:"14px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>All Notices <span style={{ color:"rgba(255,255,255,0.28)", fontWeight:400 }}>({notices.length})</span></span>
          {notices.length > 0 && <button onClick={async () => { if(window.confirm("Delete ALL notices?")) { for(const n of notices) await deleteNotice(n.id); await load(); toast("All notices cleared.","error"); } }} style={{ color:"rgba(239,68,68,0.6)", fontSize:"11.5px", fontFamily:"'DM Sans',sans-serif", background:"none", border:"none", cursor:"pointer" }}>Clear All</button>}
        </div>
        {notices.length===0 ? <div style={{ padding:"40px", textAlign:"center", color:"rgba(255,255,255,0.2)", fontFamily:"'DM Sans',sans-serif" }}>No notices yet</div> :
          notices.map((n,i) => (
            <div key={n.id} style={{ padding:"14px 20px", borderBottom:i<notices.length-1?"1px solid rgba(255,255,255,0.04)":"none", display:"flex", alignItems:"center", gap:"12px" }}>
              <div style={{ width:"8px", height:"8px", borderRadius:"50%", background: n.isImportant ? "#f59e0b" : "#10b981", boxShadow:`0 0 8px ${n.isImportant?"#f59e0b":"#10b981"}`, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ color:"rgba(255,255,255,0.82)", fontSize:"13.5px", fontFamily:"'DM Sans',sans-serif", fontWeight:"500" }}>{n.title}</div>
                <div style={{ color:"rgba(255,255,255,0.25)", fontSize:"11px", fontFamily:"'DM Sans',sans-serif", marginTop:"2px" }}>{n.date}{n.isImportant && <span style={{ marginLeft:"8px", color:"#f59e0b", fontSize:"10px" }}>★ IMPORTANT</span>}</div>
              </div>
              <button onClick={() => setConfirm(n.id)} style={{ background:"none", border:"none", cursor:"pointer", padding:"6px", borderRadius:"7px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(239,68,68,0.14)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="none"; }}>
                <Trash2 size={14} color="rgba(239,68,68,0.55)" />
              </button>
            </div>
          ))}
      </G>
    </div>
  );
};

/* ─── EVENTS PANEL ────────────────────────────────────────── */
const EventsPanel = ({ toast }: { toast: (m:string,t:"success"|"error")=>void }) => {
  const [events, setEvents]   = useState<Event[]>([]);
  const [form, setForm]       = useState({ title:"", description:"", date:"", image:"" });
  const [confirm, setConfirm] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getEvents().then(setEvents);
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.title||!form.date) return;
    setLoading(true);
    try {
      await addEvent({ ...form, image: form.image || "https://picsum.photos/400/300?random="+Date.now() });
      setForm({ title:"", description:"", date:"", image:"" }); await load(); toast("Event added!","success");
    } catch { toast("Failed to add event.","error"); }
    setLoading(false);
  };

  const del = async (id: string) => {
    try { await deleteEvent(id); await load(); setConfirm(null); toast("Event deleted.","error"); }
    catch { toast("Failed to delete.","error"); }
  };

  return (
    <div>
      {confirm && <ConfirmDialog msg="Delete this event?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
      <SH title="Events & News" sub="Manage school events and news updates" />
      <G style={{ padding:"20px", marginBottom:"16px" }}>
        <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"10px", fontFamily:"'DM Sans',sans-serif", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"12px" }}>Add Event / News</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"10px" }}>
          <input placeholder="Event title *" value={form.title} onChange={e => setForm({...form,title:e.target.value})} style={IS} onFocus={fi} onBlur={fo} />
          <input type="date" value={form.date} onChange={e => setForm({...form,date:e.target.value})} style={{ ...IS, colorScheme:"dark" }} onFocus={fi} onBlur={fo} />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form,description:e.target.value})} rows={2} style={{ ...IS, marginBottom:"10px", resize:"vertical" }} onFocus={fi} onBlur={fo} />
        <div style={{ display:"flex", gap:"10px" }}>
          <input placeholder="Image URL (optional)" value={form.image} onChange={e => setForm({...form,image:e.target.value})} style={{ ...IS, flex:1 }} onFocus={fi} onBlur={fo} />
          <GBtn onClick={add} disabled={loading || !form.title || !form.date}><Plus size={14} />{loading?"Adding...":"Add Event"}</GBtn>
        </div>
      </G>

      <G>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ color:"white", fontSize:"14px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>All Events <span style={{ color:"rgba(255,255,255,0.28)", fontWeight:400 }}>({events.length})</span></span>
        </div>
        {events.length===0 ? <div style={{ padding:"40px", textAlign:"center", color:"rgba(255,255,255,0.2)", fontFamily:"'DM Sans',sans-serif" }}>No events yet</div> :
          events.map((ev,i) => (
            <div key={ev.id} style={{ padding:"14px 20px", borderBottom:i<events.length-1?"1px solid rgba(255,255,255,0.04)":"none", display:"flex", gap:"14px", alignItems:"flex-start" }}>
              {ev.image && <img src={ev.image} alt={ev.title} style={{ width:"56px", height:"42px", objectFit:"cover", borderRadius:"8px", flexShrink:0, border:"1px solid rgba(255,255,255,0.08)" }} />}
              <div style={{ flex:1 }}>
                <div style={{ color:"rgba(255,255,255,0.82)", fontSize:"13.5px", fontFamily:"'DM Sans',sans-serif", fontWeight:"600" }}>{ev.title}</div>
                {ev.description && <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", marginTop:"3px" }}>{ev.description}</div>}
                <div style={{ color:"rgba(255,255,255,0.22)", fontSize:"11px", fontFamily:"'DM Sans',sans-serif", marginTop:"4px" }}>📅 {ev.date}</div>
              </div>
              <button onClick={() => setConfirm(ev.id)} style={{ background:"none", border:"none", cursor:"pointer", padding:"6px", borderRadius:"7px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(239,68,68,0.14)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="none"; }}>
                <Trash2 size={14} color="rgba(239,68,68,0.55)" />
              </button>
            </div>
          ))}
      </G>
    </div>
  );
};

/* ─── HOMEWORK PANEL ──────────────────────────────────────── */

/* ─── GALLERY PANEL ───────────────────────────────────────── */
const CATS = [
  { slug:"sports-day",name:"Sports Day" },{ slug:"annual-function",name:"Annual Function" },
  { slug:"cultural-activities",name:"Cultural Activities" },{ slug:"staff-felicitation",name:"Staff Felicitation" },
  { slug:"class-activity",name:"Class Activity" },{ slug:"our-pride",name:"Our Pride" },
  { slug:"tours",name:"Tours & Trips" },{ slug:"festivals",name:"Festivals" },
];

const GalleryPanel = ({ toast }: { toast: (m:string,t:"success"|"error")=>void }) => {
  const [cat, setCat]     = useState("sports-day");
  const [url, setUrl]     = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <SH title="Photo Gallery" sub="Gallery photos are sourced from the old website. Add new photos via Firebase Storage URL." />
      <G style={{ padding:"20px", marginBottom:"20px" }}>
        <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"10px", fontFamily:"'DM Sans',sans-serif", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"12px" }}>Add Photo by URL</div>
        <div style={{ display:"flex", gap:"10px", marginBottom:"10px" }}>
          <select value={cat} onChange={e => setCat(e.target.value)} style={{ ...IS, flex:"0 0 200px" }} onFocus={fi} onBlur={fo}>
            {CATS.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
          <input placeholder="Image URL (https://...)" value={url} onChange={e => setUrl(e.target.value)} style={{ ...IS, flex:1 }} onFocus={fi} onBlur={fo} />
        </div>
        <div style={{ background:"rgba(59,130,246,0.07)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:"10px", padding:"12px 16px", color:"rgba(255,255,255,0.45)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", lineHeight:"1.6" }}>
          💡 To upload new photos: Go to <strong style={{ color:"#3b82f6" }}>Firebase Console → Storage</strong> → Upload image → Copy URL → Paste above. Or you can upload from your computer and Firebase Storage will give you a permanent URL.
        </div>
      </G>

      <G style={{ padding:"20px" }}>
        <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", marginBottom:"12px", fontWeight:"600" }}>Current Gallery Categories</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px" }}>
          {CATS.map(c => (
            <div key={c.slug} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", padding:"12px", textAlign:"center" }}>
              <div style={{ color:"rgba(255,255,255,0.65)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", fontWeight:"500" }}>{c.name}</div>
              <div style={{ color:"#10b981", fontSize:"10px", fontFamily:"'DM Sans',sans-serif", marginTop:"4px" }}>Live on website ✓</div>
            </div>
          ))}
        </div>
      </G>
    </div>
  );
};

/* ─── RESULTS PANEL ───────────────────────────────────────── */
const ResultsPanel = ({ toast }: { toast: (m:string,t:"success"|"error")=>void }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [form, setForm]       = useState({ title:"", className:"", year:"", pdfUrl:"" });
  const [confirm, setConfirm] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => getResults().then(setResults);
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.title||!form.className||!form.year) return;
    setLoading(true);
    try {
      await addResult({ ...form, date: new Date().toISOString().split("T")[0] });
      setForm({ title:"", className:"", year:"", pdfUrl:"" }); await load(); toast("Result added!","success");
    } catch { toast("Failed to add.","error"); }
    setLoading(false);
  };

  const del = async (id: string) => {
    try { await deleteResult(id); await load(); setConfirm(null); toast("Result deleted.","error"); }
    catch { toast("Failed.","error"); }
  };

  return (
    <div>
      {confirm && <ConfirmDialog msg="Delete this result entry?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}
      <SH title="Academic Results" sub="Post board and internal exam results" />
      <G style={{ padding:"20px", marginBottom:"16px" }}>
        <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"10px", fontFamily:"'DM Sans',sans-serif", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"12px" }}>Add Result</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginBottom:"10px" }}>
          <input placeholder="Title (e.g. Class X Board 2025) *" value={form.title} onChange={e => setForm({...form,title:e.target.value})} style={IS} onFocus={fi} onBlur={fo} />
          <input placeholder="Class *" value={form.className} onChange={e => setForm({...form,className:e.target.value})} style={IS} onFocus={fi} onBlur={fo} />
          <input placeholder="Year * (e.g. 2024-25)" value={form.year} onChange={e => setForm({...form,year:e.target.value})} style={IS} onFocus={fi} onBlur={fo} />
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <input placeholder="PDF URL (optional — link to result PDF)" value={form.pdfUrl} onChange={e => setForm({...form,pdfUrl:e.target.value})} style={{ ...IS, flex:1 }} onFocus={fi} onBlur={fo} />
          <GBtn onClick={add} disabled={loading}><Plus size={14} />{loading?"Adding...":"Add Result"}</GBtn>
        </div>
      </G>

      <G>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ color:"white", fontSize:"14px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>All Results <span style={{ color:"rgba(255,255,255,0.28)", fontWeight:400 }}>({results.length})</span></span>
        </div>
        {results.length===0 ? <div style={{ padding:"40px", textAlign:"center", color:"rgba(255,255,255,0.2)", fontFamily:"'DM Sans',sans-serif" }}>No results posted yet</div> :
          results.map((r,i) => (
            <div key={r.id} style={{ padding:"14px 20px", borderBottom:i<results.length-1?"1px solid rgba(255,255,255,0.04)":"none", display:"flex", alignItems:"center", gap:"12px" }}>
              <div style={{ width:"38px", height:"38px", background:"linear-gradient(135deg,rgba(245,158,11,0.18),rgba(245,158,11,0.05))", border:"1px solid rgba(245,158,11,0.2)", borderRadius:"9px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Trophy size={16} color="#f59e0b" />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ color:"rgba(255,255,255,0.82)", fontSize:"13.5px", fontFamily:"'DM Sans',sans-serif", fontWeight:"600" }}>{r.title}</div>
                <div style={{ color:"rgba(255,255,255,0.35)", fontSize:"11.5px", fontFamily:"'DM Sans',sans-serif", marginTop:"2px" }}>{r.className} · {r.year}</div>
              </div>
              {r.pdfUrl && <a href={r.pdfUrl} target="_blank" rel="noreferrer" style={{ background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.2)", padding:"6px 12px", borderRadius:"7px", color:"#3b82f6", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", textDecoration:"none", display:"flex", alignItems:"center", gap:"5px" }}><Download size={12} />PDF</a>}
              <button onClick={() => setConfirm(r.id)} style={{ background:"none", border:"none", cursor:"pointer", padding:"6px", borderRadius:"7px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="rgba(239,68,68,0.14)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="none"; }}>
                <Trash2 size={14} color="rgba(239,68,68,0.55)" />
              </button>
            </div>
          ))}
      </G>
    </div>
  );
};

/* ─── ADMISSIONS PANEL ────────────────────────────────────── */
const AdmissionsPanel = ({ toast }: { toast: (m:string,t:"success"|"error")=>void }) => {
  const [apps, setApps]         = useState<AdmissionApplication[]>([]);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState<"all"|"pending"|"reviewed">("all");
  const [confirm, setConfirm]   = useState<string|null>(null);
  const [selected, setSelected] = useState<AdmissionApplication|null>(null);

  const load = () => getAdmissions().then(setApps);
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    try { await deleteAdmission(id); await load(); setConfirm(null); setSelected(null); toast("Application deleted.","error"); }
    catch { toast("Failed.","error"); }
  };
  const markReviewed = async (id: string) => {
    try { await updateAdmissionStatus(id,"reviewed"); await load(); toast("Marked as reviewed!","success"); }
    catch { toast("Failed.","error"); }
  };

  const filtered = apps.filter(a => {
    const matchSearch = a.studentName.toLowerCase().includes(search.toLowerCase()) || a.parentName.toLowerCase().includes(search.toLowerCase()) || a.phone.includes(search);
    const matchFilter = filter==="all" || a.status===filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      {confirm && <ConfirmDialog msg="Delete this application permanently?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}

      {selected && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"24px", backdropFilter:"blur(8px)" }} onClick={() => setSelected(null)}>
          <div style={{ background:"linear-gradient(135deg,#0f172a,#1a2744)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"28px", maxWidth:"460px", width:"100%", boxShadow:"0 40px 80px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
              <h3 style={{ color:"white", fontSize:"17px", fontWeight:"700", fontFamily:"'DM Sans',sans-serif", margin:0 }}>Application Details</h3>
              <button onClick={() => setSelected(null)} style={{ background:"rgba(255,255,255,0.07)", border:"none", cursor:"pointer", padding:"7px", borderRadius:"7px" }}><X size={15} color="rgba(255,255,255,0.55)" /></button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"11px", marginBottom:"20px" }}>
              {[["Student Name",selected.studentName],["Parent Name",selected.parentName],["Phone",selected.phone],["Email",selected.email],["Grade",selected.grade],["Date",selected.date],["Status",selected.status]].map(([l,v]) => (
                <div key={l} style={{ display:"flex", gap:"12px", alignItems:"flex-start" }}>
                  <span style={{ color:"rgba(255,255,255,0.28)", fontSize:"11.5px", fontFamily:"'DM Sans',sans-serif", width:"100px", flexShrink:0 }}>{l}</span>
                  <span style={{ color:"rgba(255,255,255,0.82)", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", fontWeight:"500" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:"8px" }}>
              {selected.status==="pending" && <button onClick={() => { markReviewed(selected.id); setSelected(null); }} style={{ flex:1, background:"linear-gradient(135deg,#10b981,#059669)", color:"white", border:"none", cursor:"pointer", padding:"11px", borderRadius:"10px", fontSize:"13px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>✓ Mark as Reviewed</button>}
              <a href={`tel:${selected.phone}`} style={{ flex:1, textAlign:"center", background:"rgba(59,130,246,0.15)", border:"1px solid rgba(59,130,246,0.3)", color:"#3b82f6", textDecoration:"none", padding:"11px", borderRadius:"10px", fontSize:"13px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>📞 Call Parent</a>
              <button onClick={() => setConfirm(selected.id)} style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.25)", color:"#ef4444", cursor:"pointer", padding:"11px 14px", borderRadius:"10px" }}><Trash2 size={15} /></button>
            </div>
          </div>
        </div>
      )}

      <SH title="Admission Applications" sub="View, manage and respond to student applications" />

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", marginBottom:"16px" }}>
        <StatCard icon={Users}       label="Total"    value={apps.length}                            gradient="linear-gradient(135deg,#10b981,#059669)" glow="rgba(16,185,129,0.4)" />
        <StatCard icon={Clock}       label="Pending"  value={apps.filter(a=>a.status==="pending").length}  gradient="linear-gradient(135deg,#f59e0b,#d97706)" glow="rgba(245,158,11,0.4)" />
        <StatCard icon={CheckCircle} label="Reviewed" value={apps.filter(a=>a.status==="reviewed").length} gradient="linear-gradient(135deg,#3b82f6,#1d4ed8)" glow="rgba(59,130,246,0.4)" />
      </div>

      <G style={{ padding:"14px 18px", marginBottom:"14px", display:"flex", gap:"10px", alignItems:"center" }}>
        <div style={{ flex:1, position:"relative" }}>
          <Search size={14} color="rgba(255,255,255,0.25)" style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)" }} />
          <input placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...IS, paddingLeft:"36px" }} onFocus={fi} onBlur={fo} />
        </div>
        {["all","pending","reviewed"].map(f => (
          <button key={f} onClick={() => setFilter(f as any)} style={{ padding:"8px 14px", borderRadius:"8px", border:"none", cursor:"pointer", background: filter===f?"linear-gradient(135deg,#10b981,#059669)":"rgba(255,255,255,0.05)", color: filter===f?"white":"rgba(255,255,255,0.45)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", fontWeight:"500", textTransform:"capitalize" }}>{f}</button>
        ))}
      </G>

      <G style={{ overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ color:"white", fontSize:"14px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>Applications <span style={{ color:"rgba(255,255,255,0.28)", fontWeight:400 }}>({filtered.length})</span></span>
        </div>
        {filtered.length===0 ? <div style={{ padding:"40px", textAlign:"center", color:"rgba(255,255,255,0.22)", fontFamily:"'DM Sans',sans-serif" }}>No applications found</div> : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"rgba(255,255,255,0.02)" }}>
                  {["Student","Parent","Grade","Phone","Date","Status","Actions"].map(h => (
                    <th key={h} style={{ padding:"11px 16px", textAlign:"left", color:"rgba(255,255,255,0.28)", fontSize:"10.5px", fontFamily:"'DM Sans',sans-serif", fontWeight:"600", letterSpacing:"0.8px", textTransform:"uppercase", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a,i) => (
                  <tr key={a.id} style={{ borderBottom:i<filtered.length-1?"1px solid rgba(255,255,255,0.04)":"none" }}>
                    <td style={{ padding:"12px 16px", color:"white", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", fontWeight:"500" }}>{a.studentName}</td>
                    <td style={{ padding:"12px 16px", color:"rgba(255,255,255,0.55)", fontSize:"12.5px", fontFamily:"'DM Sans',sans-serif" }}>{a.parentName}</td>
                    <td style={{ padding:"12px 16px", color:"rgba(255,255,255,0.55)", fontSize:"12.5px", fontFamily:"'DM Sans',sans-serif" }}>{a.grade}</td>
                    <td style={{ padding:"12px 16px" }}>
                      <a href={`tel:${a.phone}`} style={{ color:"#3b82f6", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", textDecoration:"none", display:"flex", alignItems:"center", gap:"4px" }}>
                        <Phone size={11} />{a.phone}
                      </a>
                    </td>
                    <td style={{ padding:"12px 16px", color:"rgba(255,255,255,0.28)", fontSize:"11.5px", fontFamily:"'DM Sans',sans-serif" }}>{a.date}</td>
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ padding:"3px 9px", borderRadius:"5px", fontSize:"10.5px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif", background:a.status==="pending"?"rgba(245,158,11,0.13)":"rgba(16,185,129,0.13)", color:a.status==="pending"?"#f59e0b":"#10b981", border:`1px solid ${a.status==="pending"?"rgba(245,158,11,0.28)":"rgba(16,185,129,0.28)"}` }}>{a.status}</span>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", gap:"6px" }}>
                        <button onClick={() => setSelected(a)} style={{ background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.2)", padding:"6px", borderRadius:"6px", cursor:"pointer", display:"flex" }}><Eye size={13} color="#3b82f6" /></button>
                        {a.status==="pending" && <button onClick={() => markReviewed(a.id)} style={{ background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.2)", padding:"6px", borderRadius:"6px", cursor:"pointer", display:"flex" }}><CheckCircle size={13} color="#10b981" /></button>}
                        <button onClick={() => setConfirm(a.id)} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", padding:"6px", borderRadius:"6px", cursor:"pointer", display:"flex" }}><Trash2 size={13} color="rgba(239,68,68,0.7)" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </G>
    </div>
  );
};

/* ─── ENQUIRIES PANEL ─────────────────────────────────────── */
const EnquiriesPanel = ({ toast }: { toast: (m:string,t:"success"|"error")=>void }) => {
  const [enqs, setEnqs]       = useState<Enquiry[]>([]);
  const [sel, setSel]         = useState<Enquiry|null>(null);
  const [confirm, setConfirm] = useState<string|null>(null);
  const [search, setSearch]   = useState("");

  const load = () => getEnquiries().then(setEnqs);
  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    try { await deleteEnquiry(id); await load(); setConfirm(null); setSel(null); toast("Enquiry deleted.","error"); }
    catch { toast("Failed.","error"); }
  };

  const filtered = enqs.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.email.includes(search) || e.phone.includes(search)
  );

  return (
    <div>
      {confirm && <ConfirmDialog msg="Delete this enquiry permanently?" onYes={() => del(confirm)} onNo={() => setConfirm(null)} />}

      {sel && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"24px", backdropFilter:"blur(8px)" }} onClick={() => setSel(null)}>
          <div style={{ background:"linear-gradient(135deg,#0f172a,#1a2744)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"28px", maxWidth:"460px", width:"100%", boxShadow:"0 40px 80px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
              <h3 style={{ color:"white", fontSize:"17px", fontWeight:"700", fontFamily:"'DM Sans',sans-serif", margin:0 }}>Enquiry from {sel.name}</h3>
              <button onClick={() => setSel(null)} style={{ background:"rgba(255,255,255,0.07)", border:"none", cursor:"pointer", padding:"7px", borderRadius:"7px" }}><X size={15} color="rgba(255,255,255,0.55)" /></button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"11px", marginBottom:"16px" }}>
              {[["Email",sel.email],["Phone",sel.phone],["Date",sel.date]].map(([l,v]) => (
                <div key={l} style={{ display:"flex", gap:"12px" }}>
                  <span style={{ color:"rgba(255,255,255,0.28)", fontSize:"11.5px", fontFamily:"'DM Sans',sans-serif", width:"50px", flexShrink:0 }}>{l}</span>
                  <span style={{ color:"rgba(255,255,255,0.82)", fontSize:"13px", fontFamily:"'DM Sans',sans-serif" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", padding:"14px", color:"rgba(255,255,255,0.68)", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", lineHeight:"1.6", marginBottom:"20px" }}>{sel.message}</div>
            <div style={{ display:"flex", gap:"8px" }}>
              <a href={`mailto:${sel.email}`} style={{ flex:1, textAlign:"center", background:"linear-gradient(135deg,#10b981,#059669)", color:"white", textDecoration:"none", padding:"11px", borderRadius:"10px", fontSize:"13px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>✉ Reply via Email</a>
              <a href={`tel:${sel.phone}`} style={{ flex:1, textAlign:"center", background:"rgba(59,130,246,0.15)", border:"1px solid rgba(59,130,246,0.3)", color:"#3b82f6", textDecoration:"none", padding:"11px", borderRadius:"10px", fontSize:"13px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>📞 Call Now</a>
              <button onClick={() => setConfirm(sel.id)} style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.25)", color:"#ef4444", cursor:"pointer", padding:"11px 14px", borderRadius:"10px" }}><Trash2 size={15} /></button>
            </div>
          </div>
        </div>
      )}

      <SH title="Contact Enquiries" sub="View and respond to messages from the website" />

      <G style={{ padding:"14px 18px", marginBottom:"14px", display:"flex", gap:"10px", alignItems:"center" }}>
        <div style={{ flex:1, position:"relative" }}>
          <Search size={14} color="rgba(255,255,255,0.25)" style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)" }} />
          <input placeholder="Search by name, email or phone..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...IS, paddingLeft:"36px" }} onFocus={fi} onBlur={fo} />
        </div>
        {enqs.length>0 && <button onClick={async () => { if(window.confirm("Clear ALL enquiries?")) { for(const e of enqs) await deleteEnquiry(e.id); await load(); toast("All enquiries cleared.","error"); } }} style={{ padding:"8px 14px", borderRadius:"8px", border:"1px solid rgba(239,68,68,0.3)", cursor:"pointer", background:"rgba(239,68,68,0.08)", color:"rgba(239,68,68,0.7)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap" }}>Clear All</button>}
      </G>

      <G>
        <div style={{ padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ color:"white", fontSize:"14px", fontWeight:"600", fontFamily:"'DM Sans',sans-serif" }}>Enquiries <span style={{ color:"rgba(255,255,255,0.28)", fontWeight:400 }}>({filtered.length})</span></span>
        </div>
        {filtered.length===0 ? <div style={{ padding:"40px", textAlign:"center", color:"rgba(255,255,255,0.22)", fontFamily:"'DM Sans',sans-serif" }}>No enquiries found</div> :
          filtered.map((e,i) => (
            <div key={e.id} style={{ padding:"14px 20px", borderBottom:i<filtered.length-1?"1px solid rgba(255,255,255,0.04)":"none", display:"flex", alignItems:"center", gap:"14px" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"9px", background:"linear-gradient(135deg,rgba(59,130,246,0.18),rgba(59,130,246,0.05))", border:"1px solid rgba(59,130,246,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"#3b82f6", fontWeight:"700", fontSize:"14px", fontFamily:"'DM Sans',sans-serif" }}>
                {e.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ color:"rgba(255,255,255,0.82)", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", fontWeight:"500" }}>{e.name}</div>
                <div style={{ color:"rgba(255,255,255,0.28)", fontSize:"11px", fontFamily:"'DM Sans',sans-serif", marginTop:"2px" }}>{e.email} · {e.phone}</div>
                <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", marginTop:"3px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.message}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", flexShrink:0 }}>
                <span style={{ color:"rgba(255,255,255,0.2)", fontSize:"10.5px", fontFamily:"'DM Sans',sans-serif" }}>{e.date}</span>
                <button onClick={() => setSel(e)} style={{ background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.2)", padding:"6px", borderRadius:"7px", cursor:"pointer", display:"flex" }}><Eye size={13} color="#3b82f6" /></button>
                <button onClick={() => setConfirm(e.id)} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", padding:"6px", borderRadius:"7px", cursor:"pointer", display:"flex" }}><Trash2 size={13} color="rgba(239,68,68,0.7)" /></button>
              </div>
            </div>
          ))}
      </G>
    </div>
  );
};

/* ─── MAIN DASHBOARD ──────────────────────────────────────── */
const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [toastMsg, setToastMsg]   = useState<{msg:string;type:"success"|"error"}|null>(null);

  const logout = async () => { await signOut(auth); navigate("/admin/login"); };

  const showToast = (msg: string, type: "success"|"error") => {
    setToastMsg({msg,type});
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#070d1a;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        select option{background:#1e293b;color:white;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.09);border-radius:3px;}
      `}</style>

      {toastMsg && <Toast msg={toastMsg.msg} type={toastMsg.type} />}

      <div style={{ display:"flex", minHeight:"100vh", background:"#070d1a" }}>
        <Sidebar active={activeTab} onNavigate={setActiveTab} onLogout={logout} />
        <main style={{ marginLeft:"260px", flex:1, padding:"32px", minHeight:"100vh", overflowY:"auto" }}>
          <div style={{ maxWidth:"980px", margin:"0 auto" }}>
            {activeTab==="overview"   && <OverviewPanel onNavigate={setActiveTab} />}
            {activeTab==="notices"    && <NoticesPanel   toast={showToast} />}
            {activeTab==="events"     && <EventsPanel    toast={showToast} />}
            {activeTab==="gallery"    && <GalleryPanel   toast={showToast} />}
            {activeTab==="results"    && <ResultsPanel   toast={showToast} />}
            {activeTab==="admissions" && <AdmissionsPanel toast={showToast} />}
            {activeTab==="enquiries"  && <EnquiriesPanel toast={showToast} />}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;