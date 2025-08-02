import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stars, Moon, Sparkles, ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="cosmic-card p-12 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-starlight-gradient opacity-50" />
          <div className="floating-stars">
            <div className="star w-2 h-2 top-1/4 left-1/4 animate-twinkle" />
            <div className="star w-1 h-1 top-1/3 right-1/4 animate-twinkle" style={{ animationDelay: '1s' }} />
            <div className="star w-2 h-2 bottom-1/3 left-1/3 animate-twinkle" style={{ animationDelay: '2s' }} />
            <div className="star w-1 h-1 top-1/2 right-1/3 animate-twinkle" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Sparkles className="w-16 h-16 text-primary animate-float" />
                <Stars className="absolute -top-2 -right-2 w-6 h-6 text-secondary animate-twinkle" />
                <Moon className="absolute -bottom-2 -left-2 w-6 h-6 text-accent animate-twinkle" style={{ animationDelay: '1s' }} />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-6xl font-bold mb-6 cosmic-glow">
              Ready to Meet Your
              <br />
              <span className="text-gradient">Cosmic Self?</span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands who've discovered their cosmic truth. 
              Your stars are waiting to tell their story.
            </p>

            {/* Features List */}
            <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Stars className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground">Instant cosmic insights</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-foreground">24/7 astrology chat</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <span className="text-foreground">Personal compatibility</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="cosmic" size="lg" className="text-xl px-12 py-6 group" onClick={() => window.location.href = '/auth'}>
                <Stars className="mr-3 group-hover:animate-twinkle" />
                See My Stars
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="mystical" size="lg" className="text-xl px-12 py-6" onClick={() => window.location.href = '/auth'}>
                <Moon className="mr-3" />
                Start Free Reading
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
                <span>Join 50K+ cosmic souls</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CallToAction;