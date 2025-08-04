import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, User, Calendar, Clock, MapPin } from "lucide-react";
import { Session } from "@supabase/supabase-js";

const ProfileSetup = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication and get session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setSession(session);
      
      // Check if profile already exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();
      
      if (profile) {
        // Profile exists, redirect to main app
        navigate("/dashboard");
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/auth");
        } else {
          setSession(session);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    
    setLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .insert({
          user_id: session.user.id,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          birth_time: birthTime,
          birth_place: birthPlace,
        });

      if (error) {
        toast({
          title: "Profile creation failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome to MyStarX! ✨",
          description: "Your cosmic profile has been created successfully.",
        });
        navigate("/ask-the-stars");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-muted">
        <div className="floating-stars">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-lg cosmic-card">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
              <CardTitle className="text-2xl text-gradient">Complete Your Cosmic Profile</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              We need a few details to read your stars accurately
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthTime" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Birth Time
                </Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Exact birth time is crucial for accurate astrological readings
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthPlace" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Birth Place
                </Label>
                <Input
                  id="birthPlace"
                  placeholder="City, State/Province, Country"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Include city and country for accurate planetary positions
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-cosmic" 
                disabled={loading}
                size="lg"
              >
                {loading ? "Creating your cosmic profile..." : "Begin My Journey ✨"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-xs text-muted-foreground">
                Your information is secure and used only for astrological calculations
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;