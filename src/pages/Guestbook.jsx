import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import GreetingForm from '../components/guestbook/GreetingForm';
import GreetingList from '../components/guestbook/GreetingList';
import Badge from '../components/ui/Badge';
import useSession from '../state/useSession';

const Guestbook = () => {
  const { role } = useSession();
  const isGuest = role === 'guest';

  return (
    <Layout>
      {/* Background Image for entire page */}
      <div className="absolute inset-0 z-0 min-h-screen">
        <img
          src="/media/wedding_couple_ceremony.jpg"
          alt="גל ואירה בטקס החתונה"
          className="w-full h-full object-cover object-center opacity-20"
        />
      </div>

      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FFF8F0',
            color: '#8B4556',
            padding: '16px',
            borderRadius: '12px',
            border: '2px solid #FFE5E5',
          },
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="romantic" size="lg" className="mb-4">
            ספר ברכות
          </Badge>
          <h1 className="text-5xl font-bold text-romantic-burgundy mb-6">
            ספר ברכות
          </h1>
          <p className="text-xl text-romantic-burgundy/70 max-w-2xl mx-auto">
            מקום לברכות, מחשבות טובות, זכרונות משותפים ומילים חמות מכל המשפחה והחברים
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <MessageSquare size={24} className="text-romantic-burgundy" />
          </div>
        </motion.div>

        {/* Greeting Form - Only for guests */}
        {isGuest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16 max-w-3xl mx-auto"
          >
            <GreetingForm />
          </motion.div>
        )}

        {/* Greetings List - Only for admin/ira, not for guests */}
        {!isGuest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-romantic-burgundy mb-8 text-center">
              ברכות שהתקבלו
            </h2>
            <GreetingList />
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Guestbook;

