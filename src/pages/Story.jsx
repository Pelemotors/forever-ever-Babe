import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Heart, Coffee, Music, MessageCircle } from 'lucide-react';
import useContent from '../state/useContent';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Story = () => {
  const { getStory } = useContent();
  const story = getStory();

  if (!story) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="romantic" size="lg" className="mb-4">
            {story.title || 'הסיפור שלנו'}
          </Badge>
          <h1 className="text-5xl font-bold text-romantic-burgundy mb-6">
            {story.title || 'הסיפור שלנו'}
          </h1>
          <div className="flex justify-center gap-2">
            <Heart size={24} className="text-romantic-burgundy" fill="currentColor" />
            <Heart size={24} className="text-romantic-burgundy opacity-70" fill="currentColor" />
            <Heart size={24} className="text-romantic-burgundy opacity-40" fill="currentColor" />
          </div>
        </motion.div>

        {/* Intro Section */}
        {story.intro && story.intro.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card variant="romantic" className="p-10">
              <div className="prose prose-lg max-w-none text-right">
                {story.intro.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-romantic-burgundy/90 leading-relaxed mb-6 last:mb-0"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </Card>
          </motion.section>
        )}

        {/* House Rules Section */}
        {story.house_rules && story.house_rules.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-romantic-burgundy/10 flex items-center justify-center">
                  <HomeIcon size={24} className="text-romantic-burgundy" />
                </div>
                <h2 className="text-3xl font-bold text-romantic-burgundy">
                  כללים לבית
                </h2>
              </div>
              <div className="space-y-4">
                {story.house_rules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-romantic-rose/30"
                  >
                    <span className="text-2xl font-bold text-romantic-burgundy">
                      {index + 1}.
                    </span>
                    <p className="text-lg text-romantic-burgundy/90 leading-relaxed">
                      {rule}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>
        )}

        {/* Gratitude Section */}
        {story.gratitude && story.gratitude.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card variant="romantic" className="p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-romantic-burgundy/10 flex items-center justify-center">
                  <Heart size={24} className="text-romantic-burgundy" fill="currentColor" />
                </div>
                <h2 className="text-3xl font-bold text-romantic-burgundy">
                  מודה עלייך
                </h2>
              </div>
              <div className="space-y-4">
                {story.gratitude.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="p-5 rounded-xl bg-white/50 backdrop-blur-sm"
                  >
                    <p className="text-lg text-romantic-burgundy/90 leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>
        )}

        {/* Habits Section */}
        {story.habits && story.habits.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-romantic-burgundy/10 flex items-center justify-center">
                  <Coffee size={24} className="text-romantic-burgundy" />
                </div>
                <h2 className="text-3xl font-bold text-romantic-burgundy">
                  הרגלים של אנחנו
                </h2>
              </div>
              <div className="grid gap-4">
                {story.habits.map((habit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-3 p-4 rounded-xl hover:bg-romantic-rose/20 transition-colors"
                  >
                    <MessageCircle size={20} className="text-romantic-burgundy mt-1 flex-shrink-0" />
                    <p className="text-romantic-burgundy/90">
                      {habit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.section>
        )}

        {/* Playlist Blurb Section */}
        {story.playlist?.blurb && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card variant="glass" className="p-10 bg-gradient-to-br from-romantic-burgundy/10 to-romantic-gold/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-romantic-burgundy/20 flex items-center justify-center">
                  <Music size={24} className="text-romantic-burgundy" />
                </div>
                <h2 className="text-3xl font-bold text-romantic-burgundy">
                  השיר שלנו
                </h2>
              </div>
              <p className="text-lg text-romantic-burgundy/90 leading-relaxed mb-6">
                {story.playlist.blurb}
              </p>
              <Link to="/playlist">
                <Button variant="primary" className="gap-2">
                  <Music size={20} />
                  עברו להאזנה
                </Button>
              </Link>
            </Card>
          </motion.section>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4"
        >
          <Link to="/stories">
            <Button variant="secondary" size="lg">
              עברו לסיפורים שלנו →
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Story;

