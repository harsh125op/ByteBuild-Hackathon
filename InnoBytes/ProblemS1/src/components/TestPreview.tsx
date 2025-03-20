import { useState } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Clock, ArrowRight, UserCircle, Flag } from "lucide-react";

const TestPreview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const questions = [
    {
      id: 1,
      question: "Which of the following is a characteristic of a community-driven platform?",
      options: [
        "Centralized content creation",
        "User-generated content",
        "Limited sharing capabilities",
        "Restricted access to resources"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "What is the primary purpose of a mock test platform?",
      options: [
        "Entertainment",
        "Social networking",
        "Exam preparation",
        "Content marketing"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "Which feature allows users to track their progress over time?",
      options: [
        "Leaderboard",
        "Analytics dashboard",
        "Gamification elements",
        "PDF conversion"
      ],
      correctAnswer: 1
    }
  ];

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <section id="preview" className="py-20 px-4 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Test Interface
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Get a preview of our intuitive and user-friendly test-taking experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test sidebar */}
          <div className="lg:col-span-1">
            <BlurCard className="sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sample Mock Test</h3>
                  <p className="text-sm text-foreground/70">Community edition</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <Clock className="w-4 h-4" />
                  <span>10:00 remaining</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/70">
                  <UserCircle className="w-4 h-4" />
                  <span>230 attempts</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="h-2 bg-secondary rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-foreground/70">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round((currentQuestion + 1) / questions.length * 100)}% complete</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((q, index) => (
                  <button
                    key={q.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentQuestion === index 
                        ? "bg-primary text-white" 
                        : selectedAnswers[index] !== undefined 
                          ? "bg-primary/10 text-primary" 
                          : "bg-secondary text-foreground/70"
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <Button variant="outline" className="w-full flex items-center gap-2 mb-2">
                <Flag className="w-4 h-4" />
                <span>Flag for review</span>
              </Button>
              
              <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                End Test
              </Button>
            </BlurCard>
          </div>

          {/* Test content */}
          <div className="lg:col-span-2 animate-fade-in">
            <BlurCard>
              <div className="mb-6">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                  Multiple Choice
                </span>
                <h3 className="text-xl font-bold mb-4">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-4 rounded-lg border transition-colors ${
                        selectedAnswers[currentQuestion] === optionIndex
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30 hover:bg-secondary/50"
                      } cursor-pointer`}
                      onClick={() => handleSelectAnswer(currentQuestion, optionIndex)}
                    >
                      <div className="flex items-start gap-3">
                        {selectedAnswers[currentQuestion] === optionIndex ? (
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span>{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                  className="group"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </BlurCard>
          </div>
        </div>
      </div>
    </section>
  );
};

// Custom FileIcon component
const FileIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export default TestPreview;