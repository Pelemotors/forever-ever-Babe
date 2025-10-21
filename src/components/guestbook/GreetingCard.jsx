import { motion } from 'framer-motion';
import { User, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import { formatDate } from '../../lib/time';

const GreetingCard = ({ greeting, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-romantic-burgundy/10 flex items-center justify-center">
              <User size={24} className="text-romantic-burgundy" />
            </div>
            <div>
              <h3 className="font-bold text-romantic-burgundy text-lg">
                {greeting.full_name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-romantic-burgundy/60">
                <Calendar size={14} />
                <span>{formatDate(greeting.created_at, 'D MMMM YYYY')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="text-romantic-burgundy/90 leading-relaxed mb-4 whitespace-pre-wrap">
          {greeting.content}
        </p>

        {/* Media */}
        {greeting.mediaUrl && (
          <div className="mt-4 rounded-xl overflow-hidden">
            {greeting.mediaUrl.includes('video') || greeting.mediaUrl.endsWith('.mp4') ? (
              <video 
                src={greeting.mediaUrl} 
                controls 
                className="w-full max-h-96 object-cover"
              />
            ) : (
              <img 
                src={greeting.mediaUrl} 
                alt="תמונה מצורפת" 
                className="w-full max-h-96 object-cover"
              />
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default GreetingCard;

