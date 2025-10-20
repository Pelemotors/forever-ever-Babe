import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

const ImageModal = ({ image, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasNext) onNext();
      if (e.key === 'ArrowRight' && hasPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!image) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
            >
              <X size={28} />
            </button>

            {/* Previous Button */}
            {hasPrev && (
              <button
                onClick={onPrev}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <ChevronRight size={32} />
              </button>
            )}

            {/* Next Button */}
            {hasNext && (
              <button
                onClick={onNext}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-7xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-contain rounded-lg"
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                <p className="text-white text-center text-lg">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;

