import { motion } from 'framer-motion';
import { Heart, Plane, Users, Baby, Cake, Circle } from 'lucide-react';
import { formatDate } from '../../lib/time';
import Card from '../ui/Card';

const TimelineItem = ({ item, index, isLast }) => {
  const icons = {
    heart: Heart,
    plane: Plane,
    ring: Circle,
    users: Users,
    baby: Baby,
    cake: Cake,
  };

  const Icon = icons[item.icon] || Circle;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <div className="flex items-center gap-6">
        {/* Timeline line & icon */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-romantic-burgundy to-romantic-bordeaux flex items-center justify-center z-10">
            <Icon size={28} className="text-white" fill="currentColor" />
          </div>
          {!isLast && (
            <div className="w-1 h-full bg-romantic-burgundy/20 min-h-[100px]" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-12">
          <Card hover className="p-6">
            <div className="text-sm text-romantic-burgundy/60 mb-2">
              {formatDate(item.date, 'MMMM YYYY')}
            </div>
            <h3 className="text-2xl font-bold text-romantic-burgundy mb-3">
              {item.title}
            </h3>
            <p className="text-romantic-burgundy/80 leading-relaxed mb-4 whitespace-pre-line text-center">
              {item.description}
            </p>
            {item.image && (
              <div className="mt-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-contain rounded-lg shadow-lg bg-white/20"
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;

