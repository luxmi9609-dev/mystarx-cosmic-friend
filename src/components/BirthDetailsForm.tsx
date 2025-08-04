import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface BirthDetailsFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BirthDetailsForm = ({ isOpen, onClose }: BirthDetailsFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    question: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If not authenticated, sign up anonymously or create guest session
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: `${Date.now()}@temp.com`, // temporary email
          password: 'temppassword123',
        });

        if (authError) {
          toast({
            title: "Error",
            description: "Failed to create account",
            variant: "destructive",
          });
          return;
        }

        // Create profile for the new user
        const nameParts = formData.fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: authData.user?.id,
            first_name: firstName,
            last_name: lastName,
            date_of_birth: formData.dateOfBirth,
            birth_time: formData.timeOfBirth,
            birth_place: formData.placeOfBirth,
          });

        if (profileError) {
          toast({
            title: "Error",
            description: "Failed to save profile",
            variant: "destructive",
          });
          return;
        }
      } else {
        // If authenticated, check if profile exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (!existingProfile) {
          // Create profile if it doesn't exist
          const nameParts = formData.fullName.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';

          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              user_id: session.user.id,
              first_name: firstName,
              last_name: lastName,
              date_of_birth: formData.dateOfBirth,
              birth_time: formData.timeOfBirth,
              birth_place: formData.placeOfBirth,
            });

          if (profileError) {
            toast({
              title: "Error",
              description: "Failed to save profile",
              variant: "destructive",
            });
            return;
          }
        }
      }

      toast({
        title: "Welcome to MyStarX! ✨",
        description: "Your cosmic journey begins now.",
      });
      
      onClose();
      navigate('/ask-the-stars');
      
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto cosmic-bg border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center cosmic-glow">
            Tell us about yourself...
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground flex items-center gap-2">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              required
              className="cosmic-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              required
              className="cosmic-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeOfBirth" className="text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Time of Birth
            </Label>
            <Input
              id="timeOfBirth"
              type="time"
              value={formData.timeOfBirth}
              onChange={(e) => handleInputChange("timeOfBirth", e.target.value)}
              required
              className="cosmic-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeOfBirth" className="text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Place of Birth
            </Label>
            <Input
              id="placeOfBirth"
              value={formData.placeOfBirth}
              onChange={(e) => handleInputChange("placeOfBirth", e.target.value)}
              placeholder="City, Country"
              required
              className="cosmic-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="question" className="text-foreground">
              Ask a Question (Optional)
            </Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) => handleInputChange("question", e.target.value)}
              placeholder="What would you like to know about your cosmic journey?"
              className="cosmic-input min-h-[80px]"
            />
          </div>

          <Button type="submit" variant="cosmic" size="lg" className="w-full" disabled={loading}>
            <Send className="mr-2 w-4 h-4" />
            {loading ? "Creating your cosmic profile..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BirthDetailsForm;