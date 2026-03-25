import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Layout from "./components/Layout";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import ScrollToHash from "./components/ScrollToHash";

// Public pages
import Home       from "./pages/Home";
import About      from "./pages/About";
import Academics  from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Gallery    from "./pages/Gallery";
import Leadership from "./pages/Leadership";
import Contact    from "./pages/Contact";
import CBSE       from "./pages/CBSE";

// Admin pages
import AdminLogin     from "./firebase/pages/Admin/Login";
import AdminDashboard from "./firebase/pages/Admin/Dashboard";

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>
        } />
      </Routes>
    );
  }

  return (
    <Layout>
      <ScrollToHash />
      <Routes>
        <Route path="/"           element={<Home />}       />
        <Route path="/about"      element={<About />}      />
        <Route path="/academics"  element={<Academics />}  />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/gallery"    element={<Gallery />}    />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/contact"    element={<Contact />}    />
        <Route path="/cbse"       element={<CBSE />}       />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;