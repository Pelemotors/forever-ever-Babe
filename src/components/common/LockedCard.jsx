import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Clock } from 'lucide-react';
import { getCountdown, formatDate } from '../../lib/time';
import Card from '../ui/Card';

const LockedCard = ({ unlockAt, title, className = '' }) => {
  const [countdown, setCountdown] = useState(getCountdown(unlockAt));

  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdown = getCountdown(unlockAt);
      setCountdown(newCountdown);

      // If unlocked, clear interval
      if (!newCountdown) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [unlockAt]);

  if (!countdown) {
    // Already unlocked
    return null;
  }

  const { days, hours, minutes, seconds } = countdown;

  return (
    <Card
      variant="romantic"
      className={`relative overflow-hidden ${className}`}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/60 z-10" />

      {/* Content */}
      <div className="relative z-20 p-8 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-romantic-burgundy/10 mb-4"
        >
          <Lock size={32} className="text-romantic-burgundy" />
        </motion.div>

        <h3 className="text-2xl font-bold text-romantic-burgundy mb-2">
          {title || 'תוכן נעול'}
        </h3>

        <p className="text-romantic-burgundy/70 mb-4">
          יפתח ב: {formatDate(unlockAt, 'D MMMM YYYY, HH:mm')}
        </p>

        {/* Countdown */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-romantic-burgundy">
              {days}
            </div>
            <div className="text-sm text-romantic-burgundy/70">ימים</div>
          </div>
          <div className="text-2xl text-romantic-burgundy/50">:</div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-romantic-burgundy">
              {hours}
            </div>
            <div className="text-sm text-romantic-burgundy/70">שעות</div>
          </div>
          <div className="text-2xl text-romantic-burgundy/50">:</div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-romantic-burgundy">
              {minutes}
            </div>
            <div className="text-sm text-romantic-burgundy/70">דקות</div>
          </div>
          <div className="text-2xl text-romantic-burgundy/50">:</div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-romantic-burgundy">
              {seconds}
            </div>
            <div className="text-sm text-romantic-burgundy/70">שניות</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-romantic-burgundy/70">
          <Clock size={16} />
          <span className="text-sm">בקרוב יתגלה...</span>
        </div>
      </div>
    </Card>
  );
};

export default LockedCard;

