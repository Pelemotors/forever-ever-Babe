import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import useContent from '../state/useContent';
import useSession from '../state/useSession';
import { filterStories } from '../lib/content';
import Layout from '../components/layout/Layout';
import StoryCard from '../components/stories/StoryCard';
import Badge from '../components/ui/Badge';

const Stories = () => {
  const { getStories } = useContent();
  const { role } = useSession();
  const allStories = getStories();
  const visibleStories = filterStories(allStories, role);

  return (
    <Layout>
      {/* Background Image for entire page */}
      <div className="absolute inset-0 z-0 min-h-screen">
        <img
          src="/media/wedding_couple_smile.jpg"
          alt="גל ואירה מחייכים בחתונה"
          className="w-full h-full object-cover object-center opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="romantic" size="lg" className="mb-4">
            הסיפורים שלנו
          </Badge>
          <h1 className="text-5xl font-bold text-romantic-burgundy mb-6">
            הסיפורים שלנו
          </h1>
          <p className="text-xl text-romantic-burgundy/70 max-w-2xl mx-auto">
            כל סיפור הוא רגע בזמן, זיכרון שנשמר, חוויה שהפכה לחלק מאיתנו
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <BookOpen size={24} className="text-romantic-burgundy" />
          </div>
        </motion.div>

        {/* Stories Grid */}
        {visibleStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {visibleStories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-romantic-burgundy/60 text-lg">
              אין סיפורים זמינים כרגע
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Stories;

