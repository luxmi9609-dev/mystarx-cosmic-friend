import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Star, Sparkles, RefreshCw, Home, MessageCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const questions = [
  {
    id: 1,
    question: "When will I get married?",
    answer: "Marriage doesn't arrive by a date — it arrives when your heart is aligned. Venus and the 7th house must bless your path, but your soul must be ready. Love waits for timing, not pressure."
  },
  {
    id: 2,
    question: "Will I have a love or arranged marriage?",
    answer: "Your chart reflects karmic choices. Love marriage shows when the 5th house is active; arranged comes with Saturn and tradition. But remember — it's not about how you meet, but how deep you go."
  },
  {
    id: 3,
    question: "Will my future partner be loyal?",
    answer: "Faithfulness isn't written — it's mirrored. If your chart carries stability, you attract it. If there's fear, you attract chaos. Heal your trust, and loyalty will flow like moonlight."
  },
  {
    id: 4,
    question: "What career path is destined for me?",
    answer: "Your 10th house and Saturn whisper your karmic work. But no matter your title — your work must align with your inner truth. Do what feels like purpose, not pressure."
  },
  {
    id: 5,
    question: "Will I ever live abroad?",
    answer: "The 12th house and Rahu reveal foreign lands. But going abroad isn't escape — it's expansion. Grow inward, and the world will call you outward."
  },
  {
    id: 6,
    question: "When will I find true love?",
    answer: "True love appears when your heart stops searching and starts radiating. When Venus smiles and Jupiter blesses, someone enters — not to complete you, but to reflect you."
  },
  {
    id: 7,
    question: "Will I become rich in life?",
    answer: "The 2nd and 11th houses tell of wealth, but true abundance starts in your beliefs. The richer your energy, the greater your magnetism. Value yourself, and the world will follow."
  },
  {
    id: 8,
    question: "Will my ex come back?",
    answer: "Retrograde Venus can bring returns, but karmic cycles don't always deserve a sequel. If it was real, it wouldn't break you. Heal — don't rewind."
  },
  {
    id: 9,
    question: "What is my soul's purpose?",
    answer: "Look to your Atmakaraka — your soul planet — and the 12th house of moksha. But know this: Purpose is not found. It is lived. Be who you were afraid to be."
  },
  {
    id: 10,
    question: "Am I under the effect of evil eye or black magic?",
    answer: "Rahu in the 8th or sudden life crashes can hint at energetic attacks. But no darkness survives where your aura shines strong. Salt, silence, and sacredness are your shields."
  }
];

const AskTheStars = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserData = async () => {
      // First check localStorage for user data
      const storedData = localStorage.getItem('astro_user_data');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }

      // Also check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);

        // Get user profile if authenticated
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        setProfile(profileData);
      }

      // If no user data at all, redirect to home
      if (!storedData && !session) {
        navigate('/');
      }
    };

    checkUserData();
  }, [navigate]);

  const handleQuestionClick = (question: any) => {
    setSelectedQuestion(question);
    setIsLoading(true);
    setShowAnswer(false);

    // Show loading animation for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      setShowAnswer(true);
      setAnsweredQuestions(prev => [...prev, question.id]);
    }, 2000);
  };

  const handleUnlockReport = () => {
    // Use profile data if available, otherwise use localStorage data
    const currentUserData = profile || userData;
    
    if (!currentUserData) return;

    let message = `🌟 Hello MyStarX Team!

I would like to unlock my personalized MyStarX Report.

📝 My Details:`;

    if (profile) {
      // If user has a profile in database
      message += `
Name: ${profile.first_name} ${profile.last_name}
Date of Birth: ${profile.date_of_birth}
Birth Time: ${profile.birth_time}
Birth Place: ${profile.birth_place}`;
    } else if (userData) {
      // If user data is from localStorage
      message += `
Name: ${userData.fullName}
Date of Birth: ${userData.dateOfBirth}
Birth Time: ${userData.timeOfBirth}
Birth Place: ${userData.placeOfBirth}`;
      
      if (userData.question) {
        message += `
Question: ${userData.question}`;
      }
    }

    message += `

I'm ready for my complete astrological reading and insights!

✨ Please provide my detailed MyStarX Report.`;

    const phoneNumber = "+919149175509";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const getNextQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === selectedQuestion.id);
    const nextIndex = (currentIndex + 1) % questions.length;
    return questions[nextIndex];
  };

  const handleNextQuestion = () => {
    const nextQ = getNextQuestion();
    setSelectedQuestion(null);
    setTimeout(() => handleQuestionClick(nextQ), 300);
  };

  const currentUserData = profile || userData;
  
  if (!currentUserData) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-lg">
            {(profile?.first_name?.[0] || userData?.fullName?.[0])?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="font-semibold">{profile?.first_name || userData?.fullName?.split(' ')[0] || 'User'}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 relative overflow-hidden">
        {/* Animated Background Stars */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-1/3 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-32 left-1/6 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-60 left-1/3 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-80 right-1/6 w-1 h-1 bg-indigo-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
            ✨ What do the stars say about you? ✨
          </h1>
          <p className="text-gray-400 text-center mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>Asking for yourself</p>
        </div>

        {/* Questions List */}
        <div className="space-y-3 mb-6">
          {questions.map((question) => (
            <Card 
              key={question.id}
              className="bg-gray-800 border-gray-700 p-4 cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => handleQuestionClick(question)}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-200">{question.question}</span>
                {answeredQuestions.includes(question.id) && (
                  <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mb-6">
          <Button variant="outline" className="text-gray-400 border-gray-600">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Questions Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs">{10 - answeredQuestions.length}</span>
            </div>
            <span>{10 - answeredQuestions.length} Questions left</span>
          </div>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={handleUnlockReport}
          >
            Buy More Questions
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex justify-around">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 text-gray-400"
            onClick={() => navigate('/')}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center gap-1 text-purple-400">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">Questions</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 text-gray-400"
            onClick={() => setShowReportDialog(true)}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Reports</span>
          </Button>
        </div>
      </div>

      {/* Answer Modal */}
      <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {isLoading ? "The stars are aligning..." : "💬 The stars say:"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Sparkles className="w-12 h-12 text-purple-400 animate-spin" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
                </div>
                <p className="text-gray-300 text-center">Reading your cosmic blueprint...</p>
              </div>
            ) : showAnswer ? (
              <div className="space-y-6">
                <p className="text-gray-200 leading-relaxed text-center">
                  {selectedQuestion?.answer}
                </p>
                
                {/* CTA Section */}
                <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-center space-y-3">
                    <p className="text-yellow-300 font-semibold">🌟 Want your personal reading?</p>
                    <Button 
                      onClick={handleUnlockReport}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Unlock MyStarX Report →
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedQuestion(null)}
                    className="flex-1 border-gray-600 text-gray-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to List
                  </Button>
                  <Button 
                    onClick={handleNextQuestion}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Next Question
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              📊 Your MyStarX Report
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-lg p-6 border border-purple-500/30">
              <div className="text-center space-y-4">
                <p className="text-yellow-300 font-semibold text-lg">🌟 Want your personal reading?</p>
                <p className="text-gray-300 text-sm">Get your complete astrological analysis with personalized insights, predictions, and guidance from expert astrologers.</p>
                <Button 
                  onClick={() => {
                    handleUnlockReport();
                    setShowReportDialog(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Unlock MyStarX Report →
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AskTheStars;