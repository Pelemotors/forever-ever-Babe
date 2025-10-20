import { useState } from 'react';
import { motion } from 'framer-motion';
import { Images } from 'lucide-react';
import Layout from '../components/layout/Layout';
import FilterBar from '../components/gallery/FilterBar';
import GalleryGrid from '../components/gallery/GalleryGrid';
import ImageModal from '../components/gallery/ImageModal';
import Badge from '../components/ui/Badge';
import galleryData from '../content/gallery.json';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter images
  const filteredImages = activeFilter === 'all'
    ? galleryData
    : galleryData.filter(img => img.tags.includes(activeFilter));

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleNext = () => {
    if (selectedIndex < filteredImages.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="romantic" size="lg" className="mb-4">
            הגלריה שלנו
          </Badge>
          <h1 className="text-5xl font-bold text-romantic-burgundy mb-6">
            הגלריה שלנו
          </h1>
          <p className="text-xl text-romantic-burgundy/70 max-w-2xl mx-auto mb-8">
            רגעים מתוקים, זכרונות יפים, וכל הסיפור שלנו בתמונות
          </p>
          <div className="flex justify-center gap-2 mb-12">
            <Images size={24} className="text-romantic-burgundy" />
          </div>

          {/* Filter Bar */}
          <FilterBar 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <GalleryGrid 
            images={filteredImages}
            onImageClick={handleImageClick}
          />
        </motion.div>

        {/* Note about placeholders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 p-6 bg-white/50 rounded-2xl max-w-2xl mx-auto"
        >
          <p className="text-romantic-burgundy/60 text-sm">
            💡 כרגע מוצגות תמונות דמו. החליפו אותן בתמונות האמיתיות שלכם בתיקייה public/media
          </p>
        </motion.div>
      </div>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedIndex < filteredImages.length - 1}
        hasPrev={selectedIndex > 0}
      />
    </Layout>
  );
};

export default Gallery;

