import { Sparkles, Instagram, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/20">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary animate-twinkle" />
              <span className="text-2xl font-bold text-gradient">MyStarX</span>
            </div>
            <p className="text-muted-foreground">
              Your cosmic best friend for emotional, intelligent, and brutally honest astrology.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-card/50 flex items-center justify-center hover:bg-card transition-colors cursor-pointer">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 rounded-full bg-card/50 flex items-center justify-center hover:bg-card transition-colors cursor-pointer">
                <Twitter className="w-5 h-5 text-accent" />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Features</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Compatibility Readings</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Astrology Chat</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Birth Chart Analysis</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Daily Horoscopes</li>
            </ul>
          </div>

          {/* Astrology */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Astrology Types</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-secondary transition-colors cursor-pointer">Vedic Astrology</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Western Astrology</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Mystical Traditions</li>
              <li className="hover:text-secondary transition-colors cursor-pointer">Combined Wisdom</li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="hover:text-primary transition-colors cursor-pointer">Contact Us</li>
              <li className="hover:text-primary transition-colors cursor-pointer">FAQ</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © 2024 MyStarX. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary animate-pulse" />
            <span>and cosmic energy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;