import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-romantic-cream to-romantic-rose py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Tagline */}
          <div className="flex items-center gap-2 text-romantic-burgundy">
            <Heart size={20} fill="currentColor" />
            <span className="font-heading font-medium">For Ever & Ever Babe</span>
            <Heart size={20} fill="currentColor" />
          </div>

          {/* Message */}
          <p className="text-romantic-burgundy/70 text-center text-sm">
            הסיפור שלנו ממשיך להיכתב, רגע אחרי רגע 💕
          </p>

          {/* Copyright */}
          <p className="text-romantic-burgundy/50 text-xs">
            © {currentYear} כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

