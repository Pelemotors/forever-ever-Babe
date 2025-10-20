import { motion } from 'framer-motion';
import useGreetings from '../../state/useGreetings';
import GreetingCard from './GreetingCard';

const GreetingList = () => {
  const { getApproved } = useGreetings();
  const greetings = getApproved();

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

