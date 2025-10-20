import { motion } from 'framer-motion';
import { Music, Heart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import YouTubeEmbed from '../components/playlist/YouTubeEmbed';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import playlistData from '../content/playlist.json';

const Playlist = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="romantic" size="lg" className="mb-4">
            השירים שלנו
          </Badge>
          <h1 className="text-5xl font-bold text-romantic-burgundy mb-6">
            {playlistData.title}
          </h1>
          <p className="text-xl text-romantic-burgundy/70 max-w-2xl mx-auto">
            {playlistData.description}
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <Music size={24} className="text-romantic-burgundy" />
            <Heart size={24} className="text-romantic-burgundy" fill="currentColor" />
            <Music size={24} className="text-romantic-burgundy" />
          </div>
        </motion.div>

        {/* Songs */}
        <div className="space-y-12">
          {playlistData.songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2 }}
            >
              <Card variant="romantic" className="p-8">
                {/* Song Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-romantic-burgundy/10 flex items-center justify-center">
                      <Music size={24} className="text-romantic-burgundy" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-romantic-burgundy">
                        {song.title}
                      </h2>
                      <p className="text-romantic-burgundy/70">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                  <p className="text-romantic-burgundy/80 leading-relaxed mt-4">
                    {song.description}
                  </p>
                </div>

                {/* YouTube Embed */}
                <YouTubeEmbed 
                  youtubeId={song.youtubeId}
                  title={`${song.title} - ${song.artist}`}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 p-8 bg-white/50 rounded-2xl"
        >
          <Music size={32} className="mx-auto text-romantic-burgundy mb-4" />
          <p className="text-romantic-burgundy/70 text-lg">
            כל שיר הוא רגע, כל מילה היא הרגשה
          </p>
          <p className="text-romantic-burgundy/50 text-sm mt-2">
            ואת המוזיקה הכי יפה בחיים שלי ❤️
          </p>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Playlist;

