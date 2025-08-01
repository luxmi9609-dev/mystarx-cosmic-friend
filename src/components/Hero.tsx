import { Button } from "@/components/ui/button";
import { Sparkles, Stars, Moon } from "lucide-react";
import cosmicHero from "@/assets/cosmic-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cosmicHero})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      
      {/* Floating Stars Animation */}
      <div className="floating-stars">
        <div className="star w-1 h-1 top-1/4 left-1/4" style={{ animationDelay: '0s' }} />
        <div className="star w-2 h-2 top-1/3 right-1/4" style={{ animationDelay: '1s' }} />
        <div className="star w-1 h-1 bottom-1/3 left-1/3" style={{ animationDelay: '2s' }} />
        <div className="star w-2 h-2 top-1/2 right-1/3" style={{ animationDelay: '1.5s' }} />
        <div className="star w-1 h-1 bottom-1/4 right-1/2" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-float">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary animate-twinkle" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 cosmic-glow">
          <span className="text-gradient">MyStarX</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-foreground/90 font-light">
          Your cosmic best friend
        </p>
        
        <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          Emotional, intelligent, and brutally honest astrology that combines 
          <span className="text-secondary font-semibold"> Vedic</span>, 
          <span className="text-accent font-semibold"> Western</span>, and 
          <span className="text-primary font-semibold"> mystical</span> wisdom
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="cosmic" size="lg" className="text-lg px-8 py-4">
            <Stars className="mr-2" />
            See My Stars
          </Button>
          <Button variant="mystical" size="lg" className="text-lg px-8 py-4">
            <Moon className="mr-2" />
            Start My Reading
          </Button>
        </div>

        {/* Floating icons */}
        <div className="absolute -top-20 -left-20 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-8 h-8 text-secondary" />
        </div>
        <div className="absolute -top-10 -right-20 opacity-30 animate-float" style={{ animationDelay: '2s' }}>
          <Moon className="w-12 h-12 text-accent" />
        </div>
        <div className="absolute -bottom-20 left-10 opacity-30 animate-float" style={{ animationDelay: '0.5s' }}>
          <Stars className="w-10 h-10 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;