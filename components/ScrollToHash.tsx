import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    const id = location.hash.slice(1);
    let tries = 0;

    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const navbar = document.querySelector("header");
        const offset = navbar ? navbar.getBoundingClientRect().height + 8 : 70;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        return true;
      }
      return false;
    };

    // Try after small delay (page render)
    const timer = setTimeout(() => {
      if (!scroll()) {
        // Page still loading - keep retrying
        const interval = setInterval(() => {
          if (scroll() || ++tries > 25) clearInterval(interval);
        }, 100);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToHash;