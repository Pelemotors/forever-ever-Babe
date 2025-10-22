import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import TimelineItem from '../components/timeline/TimelineItem';
import Badge from '../components/ui/Badge';
import timelineData from '../content/timeline.json';

const Timeline = () => {
  return (
    <Layout>
      {/* Background Image for entire page */}
      <div className="absolute inset-0 z-0 min-h-screen">
        <img
          src="/media/wedding_couple_romantic_2.jpg"
          alt="תמונה רומנטית של הזוג בחתונה"
          className="w-full h-full object-cover object-center opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="romantic" size="lg" className="mb-4">
            ציר הזמן שלנו
          </Badge>
          <h1 className="text-5xl font-bold text-romantic-burgundy mb-6">
            ציר הזמן שלנו
          </h1>
          <p className="text-xl text-romantic-burgundy/70 max-w-2xl mx-auto">
            המסע שלנו ביחד - מהיום הראשון ועד היום
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <Clock size={24} className="text-romantic-burgundy" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Timeline;

