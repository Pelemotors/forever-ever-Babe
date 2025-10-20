import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import { validateCredentials } from '../lib/auth';
import useSession from '../state/useSession';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = validateCredentials(username, password);

    if (result.valid) {
      login(result.username, result.role);
      navigate('/');
    } else {
      setError('שם משתמש או סיסמה שגויים');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-romantic-gradient flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4"
          >
            <Heart size={40} className="text-romantic-burgundy" fill="currentColor" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-romantic-burgundy mb-2">
            מזל טוב אירה
          </h1>
          
          <Badge variant="romantic" size="lg" className="mx-auto">
            forever&everbabe
          </Badge>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lock size={24} className="text-romantic-burgundy" />
            <h2 className="text-2xl font-bold text-romantic-burgundy">
              כניסה לאתר
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="שם משתמש"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="הזן שם משתמש"
              required
            />

            <Input
              label="סיסמה"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הזן סיסמה"
              required
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              {loading ? 'מתחבר...' : 'כניסה'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-romantic-burgundy/60">
            <p>ברוכים הבאים לאתר המיוחד של אירה 💕</p>
          </div>
        </div>

        {/* Hint */}
        <div className="mt-6 text-center text-romantic-burgundy/50 text-sm">
          <p>אתר זה מוגן בסיסמה</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

