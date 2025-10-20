import { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const YouTubeEmbed = ({ youtubeId, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl aspect-video">
      {!isPlaying ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlay}
          className="relative w-full h-full group"
        >
          {/* Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-romantic-burgundy/90 group-hover:bg-romantic-burgundy flex items-center justify-center shadow-xl transition-all">
              <Play size={32} className="text-white mr-1" fill="currentColor" />
            </div>
          </div>
        </motion.button>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      )}
    </div>
  );
};

export default YouTubeEmbed;

