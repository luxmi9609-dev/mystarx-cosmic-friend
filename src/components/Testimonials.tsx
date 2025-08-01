import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      sign: "Scorpio Sun, Cancer Moon",
      text: "MyStarX told me things about myself I didn't even know I needed to hear. The compatibility reading with my partner was brutally honest but so helpful!",
      rating: 5
    },
    {
      name: "Alex R.",
      sign: "Gemini Sun, Aquarius Rising",
      text: "Finally, an astrology app that doesn't sugarcoat things! The chat feature feels like talking to a wise cosmic friend who really gets me.",
      rating: 5
    },
    {
      name: "Maya P.",
      sign: "Virgo Sun, Pisces Moon",
      text: "The combination of Vedic and Western astrology blew my mind. MyStarX helped me understand my relationship patterns in ways therapy couldn't.",
      rating: 5
    },
    {
      name: "Jordan L.",
      sign: "Leo Sun, Taurus Moon",
      text: "I was skeptical at first, but MyStarX's insights about my career path were spot on. It's like having a cosmic life coach in my pocket!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-gradient">Cosmic Community</span> Says
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real people finding their cosmic truth
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="cosmic-card p-8 relative animate-float hover:shadow-starlight transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              {/* Stars Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-foreground/90 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cosmic-gradient flex items-center justify-center">
                  <span className="text-background font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.sign}</p>
                </div>
              </div>

              {/* Floating star decoration */}
              <div className="absolute bottom-4 right-8 opacity-30">
                <Star className="w-4 h-4 text-primary animate-twinkle" style={{ animationDelay: `${index * 0.5}s` }} />
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gradient">50K+</div>
            <div className="text-muted-foreground">Happy Cosmic Souls</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gradient">1M+</div>
            <div className="text-muted-foreground">Readings Given</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gradient">4.9★</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-gradient">24/7</div>
            <div className="text-muted-foreground">Cosmic Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;