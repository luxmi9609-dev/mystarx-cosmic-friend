import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Send } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate WhatsApp message
    const message = `Hi! I'd like my cosmic reading ✨

Full Name: ${formData.fullName}
Date of Birth: ${formData.dateOfBirth}
Time of Birth: ${formData.timeOfBirth}
Place of Birth: ${formData.placeOfBirth}
${formData.question ? `Question: ${formData.question}` : ''}

Please provide my personalized reading!`;

    // WhatsApp business number - replace with actual number
        const phoneNumber = "+918954034374";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
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

          <Button type="submit" variant="cosmic" size="lg" className="w-full">
            <Send className="mr-2 w-4 h-4" />
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BirthDetailsForm;