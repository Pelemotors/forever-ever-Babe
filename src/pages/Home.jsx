import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Images, Music, Clock, MessageSquare } from 'lucide-react';
import useContent from '../state/useContent';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Home = () => {
  const { getHero, getBranding } = useContent();
  const hero = getHero();
  const branding = getBranding();

  const quickLinks = [
    {
      to: '/story',
      icon: Heart,
      title: 'הסיפור שלנו',
      description: 'המסע שלנו ביחד',
      color: 'from-romantic-burgundy to-romantic-bordeaux',
    },
    {
      to: '/stories',
      icon: BookOpen,
      title: 'הסיפורים שלנו',
      description: 'זכרונות מיוחדים',
      color: 'from-romantic-rose to-romantic-blush',
    },
    {
      to: '/guestbook',
      icon: MessageSquare,
      title: 'ספר ברכות',
      description: 'ברכות ומסרים',
      color: 'from-romantic-gold to-romantic-gold-muted',
    },
    {
      to: '/timeline',
      icon: Clock,
      title: 'ציר הזמן',
      description: 'הרגעים החשובים',
      color: 'from-romantic-burgundy to-romantic-gold',
    },
    {
      to: '/gallery',
      icon: Images,
      title: 'גלריה',
      description: 'התמונות שלנו',
      color: 'from-romantic-blush to-romantic-rose',
    },
    {
      to: '/playlist',
      icon: Music,
      title: 'השיר שלנו',
      description: 'המוזיקה שלנו',
      color: 'from-romantic-bordeaux to-romantic-burgundy',
    },
  ];

  return (
    <Layout>
      {/* Background Image for entire page */}
      <div className="absolute inset-0 z-0 min-h-screen">
        {hero?.image && (
          <img
            src={hero.image}
            alt={hero.image_alt || 'Hero'}
              className="w-full h-full object-cover object-[center_10%] opacity-25"
          />
        )}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden z-10">

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="mb-8"
            >
              <Badge variant="romantic" size="lg" className="text-lg px-6 py-2">
                {branding?.tagline || 'For Ever & Ever Babe'}
              </Badge>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-romantic-burgundy mb-6"
            >
              {hero?.title || 'הבית שלנו מתחיל בך'}
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="max-w-3xl mx-auto mb-10"
            >
              <p className="text-xl md:text-2xl text-romantic-burgundy/80 leading-relaxed whitespace-pre-line">
                {hero?.subtitle}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: 'spring' }}
            >
              <Link to="/story">
                <Button variant="primary" size="lg" className="text-xl px-10 py-5">
                  {hero?.cta || 'נכנסים לחגוג'}
                </Button>
              </Link>
            </motion.div>

            {/* Decorative Hearts */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mt-12"
            >
              <Heart 
                size={60} 
                className="mx-auto text-romantic-burgundy opacity-100" 
                fill="currentColor" 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl rounded-3xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-romantic-burgundy mb-4">
              מה מחכה בפנים?
            </h2>
            <p className="text-lg text-romantic-burgundy/70">
              גלי את הסיפור, הזכרונות והרגעים המיוחדים שלנו
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={link.to}>
                  <Card hover className="p-8 h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4`}>
                      <link.icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-romantic-burgundy mb-2">
                      {link.title}
                    </h3>
                    <p className="text-romantic-burgundy/70">
                      {link.description}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

