import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Star, Users, Sparkles, Moon } from "lucide-react";
import compatibilityImage from "@/assets/compatibility.jpg";

const Features = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Compatibility Reading */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Compatibility <span className="text-gradient">Readings</span>
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover the cosmic threads that connect you and your loved ones. 
              Our compatibility readings dive deep into your astrological synergy, 
              revealing both the magic and the challenges in your relationships.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-twinkle" />
                <span className="text-foreground">Romantic compatibility insights</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary animate-twinkle" style={{ animationDelay: '0.5s' }} />
                <span className="text-foreground">Friendship cosmic connections</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-twinkle" style={{ animationDelay: '1s' }} />
                <span className="text-foreground">Family dynamic analysis</span>
              </div>
            </div>

            <Button variant="cosmic" size="lg" className="mt-6">
              <Users className="mr-2" />
              Explore Compatibility
            </Button>
          </div>

          <div className="relative">
            <Card className="cosmic-card p-4 overflow-hidden">
              <img 
                src={compatibilityImage} 
                alt="Cosmic Compatibility" 
                className="w-full rounded-lg"
              />
              <div className="absolute inset-0 bg-starlight-gradient opacity-30" />
            </Card>
          </div>
        </div>

        {/* Astrology Chat */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative lg:order-2">
            <Card className="cosmic-card p-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">You</p>
                    <p className="text-foreground">What does my Venus in Leo mean for my love life?</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">MyStarX</p>
                    <p className="text-foreground">Your Venus in Leo makes you a cosmic romantic! You love being adored and giving grand gestures. You're drawn to partners who appreciate your dramatic flair and creative spirit...</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>MyStarX is typing...</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Astrology <span className="text-gradient">Chat</span>
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a cosmic conversation anytime. Our AI understands the nuances 
              of your chart and responds with the emotional intelligence and 
              brutal honesty you need to hear.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-foreground">Personalized to your unique chart</span>
              </div>
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-secondary" />
                <span className="text-foreground">Available 24/7 for cosmic guidance</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-foreground">Combines all astrological traditions</span>
              </div>
            </div>

            <Button variant="cosmic" size="lg" className="mt-6">
              <MessageCircle className="mr-2" />
              Start Chatting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;