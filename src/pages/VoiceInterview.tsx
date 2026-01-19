import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, 
  MicOff, 
  Timer, 
  Phone,
  PhoneOff,
  Lightbulb,
  Send,
  Zap
} from "lucide-react";
import { useVapi } from "@/hooks/useVapi";
import { VoicePulseOrb } from "@/components/ui/VoiceWaveAnimation";
import { MainLayout } from "@/components/layout/MainLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Question data - in production this would come from route params/Supabase
const currentQuestion = {
  title: "Design a feature to increase Uber driver retention",
  prompt: "You're a PM at Uber. Driver churn has increased 15% year-over-year. The executive team is concerned about the long-term sustainability of the marketplace. Design a feature or set of features to improve driver retention and satisfaction. Context: Uber operates in 70+ countries with 5M+ active drivers. Key competitors include Lyft (US), Ola (India), and Didi (China).",
  company: "Uber",
  category: "Product Sense",
  difficulty: "Hard"
};

const VoiceInterview = () => {
  const [answer, setAnswer] = useState("");
  const [confidence, setConfidence] = useState([50]);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stressMode, setStressMode] = useState(false);

  // Vapi integration
  const {
    isCallActive,
    isSpeaking,
    isConnecting,
    volumeLevel,
    startCall,
    endCall,
    transcript,
  } = useVapi({
    questionTitle: currentQuestion.title,
    questionPrompt: currentQuestion.prompt,
  });

  const toggleVoice = useCallback(() => {
    if (isCallActive) {
      endCall();
    } else {
      startCall();
    }
  }, [isCallActive, startCall, endCall]);

  // Append transcript to answer
  useEffect(() => {
    if (transcript.trim()) {
      setAnswer(prev => prev + transcript);
    }
  }, [transcript]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen">
        {/* Left Panel - Question */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-[40%] border-r border-border/50 p-8"
        >
          <div className="sticky top-8">
            {/* Timer & Controls */}
            <div className="mb-6 flex items-center justify-between">
              <div className={`flex items-center gap-2 rounded-full px-4 py-2 ${stressMode ? "bg-red-500/10 text-red-400" : "bg-secondary/50"}`}>
                <Timer className={`h-4 w-4 ${stressMode ? "text-red-400" : "text-muted-foreground"}`} />
                <span className={`font-mono text-lg font-semibold ${stressMode ? "text-red-400" : ""}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              
              <button
                onClick={() => setStressMode(!stressMode)}
                className={`chip ${stressMode ? "border-red-400/50 bg-red-500/20 text-red-400" : ""}`}
              >
                <Zap className="h-3.5 w-3.5" />
                Stress Test
              </button>
            </div>

            {/* Company Tag */}
            <div className="mb-4 flex items-center gap-2">
              <div className="chip chip-active">Uber</div>
              <div className="chip">Product Sense</div>
              <div className="chip">Hard</div>
            </div>

            {/* Question */}
            <GlassCard className="mb-6 p-6">
              <h2 className="mb-4 text-xl font-semibold tracking-tight">
                Design a feature to increase Uber driver retention
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                You're a PM at Uber. Driver churn has increased 15% year-over-year. The executive team is concerned about the long-term sustainability of the marketplace. Design a feature or set of features to improve driver retention and satisfaction.
              </p>
              <div className="mt-4 border-t border-border/50 pt-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Context:</strong> Uber operates in 70+ countries with 5M+ active drivers. Key competitors include Lyft (US), Ola (India), and Didi (China).
                </p>
              </div>
            </GlassCard>

            {/* Framework Hints */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="framework" className="border-border/50">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    Framework Hints
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p><strong className="text-foreground">1. Clarify:</strong> Understand the problem scope and constraints</p>
                    <p><strong className="text-foreground">2. User Segments:</strong> Identify different driver personas</p>
                    <p><strong className="text-foreground">3. Pain Points:</strong> Map key reasons for churn</p>
                    <p><strong className="text-foreground">4. Solutions:</strong> Brainstorm and prioritize features</p>
                    <p><strong className="text-foreground">5. Metrics:</strong> Define success criteria</p>
                    <p><strong className="text-foreground">6. Trade-offs:</strong> Discuss risks and mitigations</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Voice AI Button */}
            <motion.div className="mt-6 space-y-4">
              {/* Voice Orb Animation */}
              <AnimatePresence>
                {(isCallActive || isConnecting) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex justify-center py-4"
                  >
                    <VoicePulseOrb 
                      isActive={isCallActive} 
                      volumeLevel={volumeLevel}
                      isConnecting={isConnecting}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                onClick={toggleVoice}
                variant={isCallActive ? "destructive" : "default"}
                className={`w-full gap-3 py-6 ${isCallActive ? "" : "glow-pulse"}`}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                    />
                    Connecting...
                  </>
                ) : isCallActive ? (
                  <>
                    <PhoneOff className="h-5 w-5" />
                    End Interview
                  </>
                ) : (
                  <>
                    <Phone className="h-5 w-5" />
                    Start Voice AI Interview
                  </>
                )}
              </Button>
              
              {isCallActive && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-primary/10 p-3 text-center"
                >
                  <p className="text-sm text-primary">
                    {isSpeaking ? "🎤 AI is speaking..." : "🎧 Listening to you..."}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Speak naturally. The AI will ask follow-up questions.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Panel - Answer Editor */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 p-8"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Response</h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {answer.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
            </div>

            <GlassCard className="mb-6 p-1">
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Structure your answer here...

## Clarifying Questions
- What is the current driver churn rate by region?
- What feedback have we received from churned drivers?

## User Segments
1. Full-time drivers (40+ hrs/week)
2. Part-time drivers (10-20 hrs/week)
3. Occasional drivers (<10 hrs/week)

## Key Pain Points
..."
                className="min-h-[500px] resize-none border-0 bg-transparent p-5 text-base leading-relaxed focus-visible:ring-0"
              />
            </GlassCard>

            {/* Confidence Meter */}
            <GlassCard className="mb-6 p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium">Confidence Level</label>
                <span className="text-sm text-primary font-semibold">{confidence[0]}%</span>
              </div>
              <Slider
                value={confidence}
                onValueChange={setConfidence}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Unsure</span>
                <span>Very Confident</span>
              </div>
            </GlassCard>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !answer.trim()}
              className="w-full gap-2 py-6"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                  />
                  Analysing your strategy via PM Agent...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit for AI Review
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default VoiceInterview;
