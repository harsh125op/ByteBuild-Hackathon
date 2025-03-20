import { BlurCard } from "../../components/ui/blur-card";
import { 
  Upload, 
  FileEdit, 
  BookOpen, 
  BarChart,
  Zap,
  Trophy,
  WifiOff,
  Shield,
  MessageSquare
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: <Upload className="h-6 w-6 text-primary" />,
      title: "Upload & Convert Sample Papers",
      description: "Convert PDFs of sample papers into interactive mock tests with ease."
    },
    {
      icon: <FileEdit className="h-6 w-6 text-primary" />,
      title: "Create & Share Tests",
      description: "Design custom tests with different question formats and share them with the community."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Take Tests & Compete",
      description: "Attempt tests created by other users and receive instant feedback on your performance."
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Leaderboard & Analytics",
      description: "Track performance, compare scores with peers, and get AI-powered insights."
    }
  ];

  const additionalFeatures = [
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Adaptive Testing",
      description: "Questions adjust dynamically based on your performance."
    },
    {
      icon: <Trophy className="h-5 w-5 text-primary" />,
      title: "Gamification",
      description: "Earn badges, maintain streaks, and receive rewards."
    },
    {
      icon: <WifiOff className="h-5 w-5 text-primary" />,
      title: "Offline Support",
      description: "Download tests to take without an internet connection."
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Anti-Cheating",
      description: "Plagiarism detection, time tracking, and proctoring solutions."
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      title: "Collaborative Learning",
      description: "Discuss solutions in community forums with peers."
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Effective Preparation
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Our platform combines powerful tools with community collaboration to enhance your exam preparation experience.
          </p>
        </div>

        {/* Core Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coreFeatures.map((feature, index) => (
            <BlurCard key={index} className="animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </BlurCard>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-secondary rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Additional Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="flex gap-4 p-4 rounded-xl bg-white shadow-sm animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-base mb-1">{feature.title}</h4>
                  <p className="text-sm text-foreground/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;