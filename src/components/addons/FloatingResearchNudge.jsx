import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import useContent from "../../state/useContent";
import useSession from "../../state/useSession";
import ResearchCards from "./ResearchCards";

const KEY_DISABLE_UNTIL = "research:nudge:disableUntilMs";

function msUntilTonight() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  return midnight.getTime();
}

export default function FloatingResearchNudge() {
  const { pathname } = useLocation();
  const { role } = useSession();
  const { getResearchNudge } = useContent();
  const cfg = getResearchNudge();
  
  const enabled = cfg.enabled !== false;
  const probability = cfg.probability ?? 0.12;
  const maxPerSession = cfg.maxPerSession;
  const excluded = cfg.excludedRoutes ?? ["/login", "/admin"];

  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);

  // בדיקה שהמשתמש הוא אירה בלבד
  if (!enabled || role !== 'ira' || excluded.includes(pathname)) {
    return null;
  }

  // בדיקת "לא היום"
  const disableUntilMs = Number(localStorage.getItem(KEY_DISABLE_UNTIL) || "0");
  if (Date.now() < disableUntilMs) {
    return null;
  }

  // הגבלת סשן (אם מוגדרת)
  const sessionCount = Number(sessionStorage.getItem("research:nudge:sessionCount") || "0");
  const canShow = !shownRef.current && (maxPerSession === null || sessionCount < maxPerSession);

  useEffect(() => {
    if (!canShow) return;
    
    if (Math.random() < probability) {
      shownRef.current = true;
      if (maxPerSession !== null) {
        sessionStorage.setItem("research:nudge:sessionCount", String(sessionCount + 1));
      }
      setOpen(true);
    }
  }, [pathname, canShow, probability, maxPerSession, sessionCount]);

  const onLater = () => {
    localStorage.setItem(KEY_DISABLE_UNTIL, String(msUntilTonight()));
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (!open) return null;

  return createPortal(
    <div 
      dir="rtl" 
      className="fixed inset-0 z-40 flex items-end justify-center" 
      role="dialog" 
      aria-modal="true"
    >
      <button 
        className="absolute inset-0 bg-black/20" 
        onClick={onClose} 
        aria-label="סגור"
      />
      <div
        className="relative mb-2 w-[min(560px,92vw)] rounded-2xl bg-white/80 backdrop-blur border border-white/40 shadow-xl p-4 md:p-6"
        style={{ 
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" 
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-rose-700/80">מחקרים אומרים…</div>
          <div className="flex gap-2">
            <button 
              onClick={onLater} 
              className="text-sm rounded-xl px-3 py-1 bg-white/70 border border-white/40 hover:bg-white transition-colors"
            >
              לא היום
            </button>
            <button 
              onClick={onClose} 
              className="text-sm rounded-xl px-3 py-1 bg-rose-600 text-white hover:bg-rose-700 transition-colors"
            >
              סגור
            </button>
          </div>
        </div>
        <ResearchCards />
      </div>
    </div>,
    document.body
  );
}
