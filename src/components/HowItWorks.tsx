import { Card } from "@/components/ui/card";
import { MessageCircle, Users, Sparkles, Moon, Heart, Zap } from "lucide-react";
import zodiacWheel from "@/assets/zodiac-wheel.jpg";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Moon className="w-8 h-8" />,
      title: "Share Your Cosmic Details",
      description: "Tell us your birth time, place, and what's on your mind",
      color: "text-primary"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "We Read the Stars",
      description: "Our AI combines Vedic, Western, and mystical astrology",
      color: "text-secondary"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Get Real Insights",
      description: "Receive honest, emotional, and intelligent guidance",
      color: "text-accent"
    }
  ];

  const features = [
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Compatibility Readings",
      description: "Discover cosmic connections with your loved ones"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-accent" />,
      title: "Astrology Chat",
      description: "Real-time cosmic conversations tailored to you"
    },
    {
      icon: <Zap className="w-6 h-6 text-secondary" />,
      title: "Instant Insights",
      description: "Get answers when you need them most"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-gradient">MyStarX</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your journey to cosmic understanding starts here
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <Card key={index} className="cosmic-card p-8 text-center animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
              <div className={`${step.color} mb-4 flex justify-center`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              <div className="mt-6 text-4xl font-bold text-primary/20">
                {index + 1}
              </div>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-8">
              Experience Cosmic <span className="text-gradient">Connection</span>
            </h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-card/50 border border-primary/20">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="cosmic-card p-8 rounded-2xl">
              <img 
                src={zodiacWheel} 
                alt="Mystical Zodiac Wheel" 
                className="w-full rounded-lg opacity-90 animate-pulse-glow"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Combining ancient wisdom with modern insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;