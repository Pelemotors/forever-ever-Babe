import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useContent from '../../state/useContent';

const ResearchCards = () => {
  const { getResearchUI, getResearchCards } = useContent();
  const ui = getResearchUI();
  const cards = getResearchCards();
  
  const [current, setCurrent] = useState(null);
  const [showTruth, setShowTruth] = useState(false);
  const prevRef = useRef(null);

  // בחירה רנדומלית בלי חזרה על אותה כרטיסייה פעמיים ברצף
  const pickRandom = () => {
    if (cards.length === 0) return null;
    
    const available = cards.filter(c => c.id !== prevRef.current);
    if (available.length === 0) {
      // אם נגמרו הכרטיסיות, איפוס הזיכרון
      prevRef.current = null;
      return cards[Math.floor(Math.random() * cards.length)];
    }
    
    const next = available[Math.floor(Math.random() * available.length)];
    prevRef.current = next.id;
    return next;
  };

  // בחירת כרטיסייה ראשונה
  useEffect(() => {
    if (cards.length > 0 && !current) {
      setCurrent(pickRandom());
    }
  }, [cards, current]);

  const reveal = () => {
    setShowTruth(true);
  };

  const next = () => {
    setShowTruth(false);
    setCurrent(pickRandom());
  };

  if (!current) {
    return (
      <div className="text-center py-8">
        <p className="text-romantic-burgundy/60">אין כרטיסיות זמינות</p>
      </div>
    );
  }

  const verbatim = ui.verbatim === true;

  return (
    <div
      className="rounded-2xl p-6 md:p-8 bg-white/70 backdrop-blur border border-white/30 shadow-lg"
      role="group"
      aria-label={ui.title || "מחקרים אומרים…"}
      dir="rtl"
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={current.id + String(showTruth)} 
          initial={{ opacity: 0, y: 12 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -12 }} 
          transition={{ duration: 0.25 }}
        >
          {/* FAKE */}
          {!verbatim && (
            <div className="mb-3 text-sm font-semibold tracking-wide text-rose-700/80">
              מחקרים אומרים:
            </div>
          )}
          <p className="text-lg md:text-xl text-romantic-burgundy whitespace-pre-line">
            {current.fake}
          </p>

          {/* TRUTH */}
          <div className="mt-6">
            <motion.div 
              initial={false} 
              animate={{ 
                height: showTruth ? "auto" : 0, 
                opacity: showTruth ? 1 : 0 
              }} 
              className="overflow-hidden"
            >
              <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 px-4 py-3">
                {!verbatim && (
                  <div className="text-sm font-semibold text-emerald-800 mb-1">
                    האמת שלי:
                  </div>
                )}
                <p className="text-emerald-900 whitespace-pre-line">
                  {current.truth}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button 
              onClick={showTruth ? next : reveal} 
              className="rounded-xl px-4 py-2 bg-romantic-burgundy text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all"
            >
              {showTruth ? (ui.buttons?.next || "עוד אחד") : (ui.buttons?.showTruth || "האמת שלי")}
            </button>
            <button 
              onClick={next} 
              className="rounded-xl px-4 py-2 bg-white/80 backdrop-blur border border-white/40 text-romantic-burgundy hover:bg-white transition-all"
            >
              {ui.buttons?.next || "עוד אחד"}
            </button>
            
          </div>
        </motion.div>
      </AnimatePresence>
      
      {ui.note && (
        <div className="mt-4 text-xs text-rose-800/60">
          {ui.note}
        </div>
      )}
    </div>
  );
};

export default ResearchCards;
