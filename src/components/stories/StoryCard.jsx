import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, BookOpen, ArrowLeft } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { getStoryExcerpt } from '../../lib/content';
import { shouldShowAsLocked } from '../../lib/content';
import useSession from '../../state/useSession';

const StoryCard = ({ story, index = 0 }) => {
  const { role } = useSession();
  const isLocked = shouldShowAsLocked(story, role);
  const excerpt = getStoryExcerpt(story, 120);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/stories/${story.id}`}>
        <Card 
          hover 
          className={`p-6 h-full ${isLocked ? 'relative overflow-hidden' : ''}`}
        >
          {isLocked && (
            <div className="absolute inset-0 backdrop-blur-sm bg-white/60 z-10 flex items-center justify-center">
              <div className="text-center">
                <Lock size={40} className="text-romantic-burgundy mx-auto mb-3" />
                <p className="text-romantic-burgundy font-medium">תוכן נעול</p>
              </div>
            </div>
          )}

          <div className="relative z-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-romantic-burgundy mb-2">
                  {story.title}
                </h3>
                {story.status && (
                  <Badge 
                    variant={story.status === 'public' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {story.status === 'public' ? 'זמין' : 'ממתין'}
                  </Badge>
                )}
              </div>
              <div className="w-12 h-12 rounded-xl bg-romantic-rose/30 flex items-center justify-center flex-shrink-0">
                <BookOpen size={24} className="text-romantic-burgundy" />
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-romantic-burgundy/80 leading-relaxed mb-4 line-clamp-3">
              {excerpt}
            </p>

            {/* Read More */}
            {!isLocked && (
              <div className="flex items-center gap-2 text-romantic-burgundy font-medium">
                <span>קרא עוד</span>
                <ArrowLeft size={18} />
              </div>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default StoryCard;

