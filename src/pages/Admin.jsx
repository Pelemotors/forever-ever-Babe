import { motion } from 'framer-motion';
import { Shield, MessageSquare } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import GreetingsPanel from '../components/admin/GreetingsPanel';
import Badge from '../components/ui/Badge';

const Admin = () => {
  return (
    <Layout>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FFF8F0',
            color: '#8B4556',
            padding: '16px',
            borderRadius: '12px',
            border: '2px solid #FFE5E5',
          },
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="gold" size="lg" className="mb-4">
            <Shield size={18} className="inline mr-2" />
            מנהל
          </Badge>
          <h1 className="text-5xl font-bold text-romantic-burgundy mb-6">
            לוח ניהול
          </h1>
          <p className="text-xl text-romantic-burgundy/70">
            ניהול ברכות ותכנים
          </p>
        </motion.div>

        {/* Greetings Moderation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare size={28} className="text-romantic-burgundy" />
            <h2 className="text-3xl font-bold text-romantic-burgundy">
              מודרציה של ברכות
            </h2>
          </div>
          <GreetingsPanel />
        </motion.div>
      </div>
    </Layout>
  );
};

export default Admin;

