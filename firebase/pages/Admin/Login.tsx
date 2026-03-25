import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, Loader } from "lucide-react";

const AdminLogin: React.FC = () => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user) navigate("/admin/dashboard", { replace: true });
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #070d1a 0%, #0d1425 50%, #070d1a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", position: "relative", overflow: "hidden",
      }}>
        {/* Background blobs */}
        <div style={{ position:"absolute", top:"-100px", left:"-100px", width:"400px", height:"400px", background:"rgba(16,185,129,0.06)", borderRadius:"50%", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", bottom:"-100px", right:"-100px", width:"400px", height:"400px", background:"rgba(59,130,246,0.06)", borderRadius:"50%", filter:"blur(60px)" }} />

        <div style={{ width:"100%", maxWidth:"420px", position:"relative", zIndex:10 }}>

          {/* Logo + School name */}
          <div style={{ textAlign:"center", marginBottom:"32px" }}>
            <div style={{
              width:"72px", height:"72px", borderRadius:"20px",
              background:"linear-gradient(135deg, #10b981, #059669)",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 16px",
              boxShadow:"0 0 40px rgba(16,185,129,0.35)",
            }}>
              <img src="/logo.png" alt="Logo" style={{ width:"44px", height:"44px", objectFit:"contain", filter:"brightness(10)" }} />
            </div>
            <h1 style={{ color:"white", fontSize:"20px", fontWeight:"800", fontFamily:"'DM Sans',sans-serif", letterSpacing:"-0.3px" }}>
              The Study School
            </h1>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", marginTop:"4px" }}>
              Aspur, Dungarpur · Admin Panel
            </p>
          </div>

          {/* Card */}
          <div style={{
            background:"linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border:"1px solid rgba(255,255,255,0.1)",
            borderRadius:"24px",
            padding:"36px",
            backdropFilter:"blur(20px)",
            boxShadow:"0 40px 80px rgba(0,0,0,0.4)",
          }}>
            {/* Header */}
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"28px" }}>
              <div style={{ width:"36px", height:"36px", background:"rgba(16,185,129,0.15)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <ShieldCheck size={18} color="#10b981" />
              </div>
              <div>
                <h2 style={{ color:"white", fontSize:"17px", fontWeight:"700", fontFamily:"'DM Sans',sans-serif" }}>Admin Login</h2>
                <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"11px", fontFamily:"'DM Sans',sans-serif" }}>Secure access — authorized personnel only</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)",
                borderRadius:"10px", padding:"12px 14px",
                display:"flex", alignItems:"center", gap:"8px",
                marginBottom:"20px",
              }}>
                <AlertCircle size={15} color="#ef4444" style={{ flexShrink:0 }} />
                <span style={{ color:"#ef4444", fontSize:"13px", fontFamily:"'DM Sans',sans-serif" }}>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* Email */}
              <div style={{ marginBottom:"16px" }}>
                <label style={{ display:"block", color:"rgba(255,255,255,0.5)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", fontWeight:"600", letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:"8px" }}>
                  Email Address
                </label>
                <div style={{ position:"relative" }}>
                  <Mail size={16} color="rgba(255,255,255,0.25)" style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                  <input
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="admin@thestudyschool.com"
                    style={{
                      width:"100%", padding:"12px 14px 12px 42px",
                      background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                      borderRadius:"10px", color:"white", fontSize:"14px",
                      fontFamily:"'DM Sans',sans-serif", outline:"none",
                      transition:"border-color 0.2s",
                    }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#10b981"; }}
                    onBlur={e  => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom:"24px" }}>
                <label style={{ display:"block", color:"rgba(255,255,255,0.5)", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", fontWeight:"600", letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:"8px" }}>
                  Password
                </label>
                <div style={{ position:"relative" }}>
                  <Lock size={16} color="rgba(255,255,255,0.25)" style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                  <input
                    type={showPass ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    style={{
                      width:"100%", padding:"12px 44px 12px 42px",
                      background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
                      borderRadius:"10px", color:"white", fontSize:"14px",
                      fontFamily:"'DM Sans',sans-serif", outline:"none",
                      transition:"border-color 0.2s",
                    }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "#10b981"; }}
                    onBlur={e  => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", padding:"2px" }}>
                    {showPass
                      ? <EyeOff size={16} color="rgba(255,255,255,0.35)" />
                      : <Eye     size={16} color="rgba(255,255,255,0.35)" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} style={{
                width:"100%", padding:"13px",
                background: loading ? "rgba(16,185,129,0.5)" : "linear-gradient(135deg, #10b981, #059669)",
                border:"none", borderRadius:"12px",
                color:"white", fontSize:"14px", fontWeight:"700",
                fontFamily:"'DM Sans',sans-serif", cursor: loading ? "not-allowed" : "pointer",
                display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
                boxShadow: loading ? "none" : "0 8px 24px rgba(16,185,129,0.35)",
                transition:"all 0.2s",
              }}>
                {loading
                  ? <><Loader size={17} style={{ animation:"spin 1s linear infinite" }} /> Signing in...</>
                  : <><ShieldCheck size={17} /> Sign In to Dashboard</>}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <p style={{ textAlign:"center", color:"rgba(255,255,255,0.2)", fontSize:"11px", fontFamily:"'DM Sans',sans-serif", marginTop:"20px" }}>
            © {new Date().getFullYear()} The Study School, Aspur · Developed by MR DIGI
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </>
  );
};

export default AdminLogin;