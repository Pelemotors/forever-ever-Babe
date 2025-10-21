import { motion } from 'framer-motion';
import { useEffect } from 'react';
import useGreetings from '../../state/useGreetings';
import useSession from '../../state/useSession';
import GreetingCard from './GreetingCard';

const GreetingList = () => {
  const { role } = useSession();
  const { getApproved, loadApprovedGreetings, loading, error } = useGreetings();
  const greetings = getApproved();

  // Load approved greetings on component mount
  useEffect(() => {
    // Only load from Supabase if user is admin (has Supabase auth)
    if (role === 'admin') {
      loadApprovedGreetings();
    }
  }, [loadApprovedGreetings, role]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-white/50 rounded-2xl"
      >
        <p className="text-romantic-burgundy/60 text-lg">
          טוען ברכות...
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-white/50 rounded-2xl"
      >
        <p className="text-red-600 text-lg">
          שגיאה בטעינת הברכות
        </p>
        <p className="text-red-400 text-sm mt-2">
          {error}
        </p>
      </motion.div>
    );
  }

  if (greetings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 bg-white/50 rounded-2xl"
      >
        <p className="text-romantic-burgundy/60 text-lg">
          עדיין אין ברכות מאושרות
        </p>
        <p className="text-romantic-burgundy/40 text-sm mt-2">
          היו הראשונים להשאיר ברכה!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {greetings.map((greeting, index) => (
        <GreetingCard 
          key={greeting.id} 
          greeting={greeting} 
          index={index}
        />
      ))}
    </div>
  );
};

export default GreetingList;

