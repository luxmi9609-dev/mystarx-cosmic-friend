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
      // Store form data in localStorage for now
      // We'll create the profile later when user wants the full report
      const userData = {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        timeOfBirth: formData.timeOfBirth,
        placeOfBirth: formData.placeOfBirth,
        question: formData.question,
        timestamp: Date.now()
      };

      localStorage.setItem('astro_user_data', JSON.stringify(userData));

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