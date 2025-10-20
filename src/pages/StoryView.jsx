import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Home, Lock } from 'lucide-react';
import useContent from '../state/useContent';
import useSession from '../state/useSession';
import { shouldShowAsLocked } from '../lib/content';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LockedCard from '../components/common/LockedCard';

const StoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStoryById, getStories } = useContent();
  const { role } = useSession();
  
  const story = getStoryById(id);
  const allStories = getStories();
  
  const currentIndex = allStories.findIndex(s => s.id === id);
  const prevStory = currentIndex > 0 ? allStories[currentIndex - 1] : null;
  const nextStory = currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null;

  if (!story) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-romantic-burgundy mb-4">
            סיפור לא נמצא
          </h1>
          <Link to="/stories">
            <Button variant="secondary">חזרה לסיפורים</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const isLocked = shouldShowAsLocked(story, role);

  if (isLocked) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <LockedCard 
              unlockAt={story.unlockAt} 
              title={story.title}
              className="mb-8"
            />
            <div className="text-center">
              <Link to="/stories">
                <Button variant="secondary" className="gap-2">
                  <ArrowRight size={20} />
                  חזרה לסיפורים
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/stories')}
            className="flex items-center gap-2 text-romantic-burgundy hover:text-romantic-bordeaux transition-colors"
          >
            <ArrowRight size={20} />
            <span>חזרה לסיפורים</span>
          </button>
        </motion.div>

        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <Badge variant="romantic" size="lg" className="mb-4">
            סיפור
          </Badge>
          <h1 className="text-5xl font-bold text-romantic-burgundy mb-4">
            {story.title}
          </h1>
          {story.status && (
            <Badge 
              variant={story.status === 'public' ? 'success' : 'info'}
              size="md"
            >
              {story.status}
            </Badge>
          )}
        </motion.div>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card variant="romantic" className="p-10">
            <div className="prose prose-lg max-w-none text-right">
              {story.body && story.body.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-romantic-burgundy/90 leading-relaxed mb-6 last:mb-0"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-center"
        >
          <div>
            {prevStory && (
              <Link to={`/stories/${prevStory.id}`}>
                <Button variant="outline" className="gap-2">
                  <ArrowRight size={20} />
                  {prevStory.title}
                </Button>
              </Link>
            )}
          </div>

          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <Home size={20} />
              בית
            </Button>
          </Link>

          <div>
            {nextStory && (
              <Link to={`/stories/${nextStory.id}`}>
                <Button variant="outline" className="gap-2">
                  {nextStory.title}
                  <ArrowLeft size={20} />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default StoryView;

