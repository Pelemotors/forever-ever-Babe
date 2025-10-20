import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/he';

// Configure dayjs
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale('he');

// Check if a date is in the future
export const isFuture = (date) => {
  return dayjs(date).isAfter(dayjs());
};

// Check if content is unlocked
export const isUnlocked = (unlockAt) => {
  if (!unlockAt) return true;
  return !isFuture(unlockAt);
};

// Get countdown to date
export const getCountdown = (targetDate) => {
  const now = dayjs();
  const target = dayjs(targetDate);
  
  if (target.isBefore(now)) {
    return null; // Already passed
  }

  const diff = target.diff(now);
  const duration = dayjs.duration(diff);

  return {
    days: Math.floor(duration.asDays()),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
    total: diff,
  };
};

// Format date in Hebrew
export const formatDate = (date, format = 'D MMMM YYYY') => {
  return dayjs(date).format(format);
};

// Get relative time (e.g., "לפני 5 דקות")
export const getRelativeTime = (date) => {
  return dayjs(date).fromNow();
};

// Format countdown as string
export const formatCountdown = (countdown) => {
  if (!countdown) return 'פתוח!';

  const { days, hours, minutes } = countdown;

  if (days > 0) {
    return `עוד ${days} ימים`;
  }

  if (hours > 0) {
    return `עוד ${hours} שעות ו-${minutes} דקות`;
  }

  return `עוד ${minutes} דקות`;
};

export default dayjs;

