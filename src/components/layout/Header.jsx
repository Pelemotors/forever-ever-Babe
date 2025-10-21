import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, Heart } from 'lucide-react';
import useSession from '../../state/useSession';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user, role } = useSession();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'בית', roles: ['admin', 'ira'] },
    { path: '/story', label: 'הסיפור שלנו', roles: ['admin', 'ira'] },
    { path: '/stories', label: 'הסיפורים שלנו', roles: ['admin', 'ira'] },
    { path: '/guestbook', label: 'ספר ברכות', roles: ['admin', 'ira', 'guest'] },
    { path: '/timeline', label: 'ציר זמן', roles: ['admin', 'ira'] },
    { path: '/gallery', label: 'גלריה', roles: ['admin', 'ira'] },
    { path: '/playlist', label: 'פלייליסט', roles: ['admin', 'ira'] },
    { path: '/admin', label: 'ניהול', roles: ['admin'] },
  ];

  const visibleNavItems = navItems.filter(item => 
    !item.roles || item.roles.includes(role)
  );

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline */}
          <Link to={role === 'guest' ? '/guestbook' : '/'} className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <Heart className="text-romantic-burgundy" size={28} fill="currentColor" />
              <span className="text-2xl font-bold text-gradient-romantic hidden sm:inline">
                Happy 29
              </span>
            </motion.div>
            <Badge variant="romantic" size="sm" className="hidden md:inline-flex">
              For Ever & Ever Babe
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {visibleNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-romantic-burgundy text-white'
                    : 'text-romantic-burgundy hover:bg-romantic-rose'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Info & Logout (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated && user && (
              <div className="text-sm text-romantic-burgundy">
                שלום, <span className="font-bold">{user.username}</span>
              </div>
            )}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut size={18} />
                יציאה
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-romantic-burgundy hover:bg-romantic-rose rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-romantic-burgundy/10 bg-white"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-romantic-burgundy text-white'
                      : 'text-romantic-burgundy hover:bg-romantic-rose'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated && (
                <div className="border-t border-romantic-burgundy/10 pt-4 mt-2">
                  {user && (
                    <div className="px-4 py-2 text-sm text-romantic-burgundy">
                      שלום, <span className="font-bold">{user.username}</span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start gap-2"
                  >
                    <LogOut size={18} />
                    יציאה
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

