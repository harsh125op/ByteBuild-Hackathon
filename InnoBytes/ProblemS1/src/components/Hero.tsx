import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Users, Award } from "lucide-react";
import { BlurCard } from "@/components/ui/blur-card";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[50%] -right-[25%] w-[80%] h-[150%] bg-gradient-radial from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[25%] w-[80%] h-[150%] bg-gradient-radial from-purple-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block animate-fade-in">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 inline-block">
            Community-Driven Mock Test Platform
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Prepare Better with{" "}
          <span className="text-gradient">Collaborative Testing</span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Create, share, and attempt interactive mock tests. Get instant feedback, compete on leaderboards, and enhance your exam preparation with our AI-powered insights.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline">
            Explore Tests
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <BlurCard className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold text-2xl mb-1">5,000+</h3>
          <p className="text-foreground/70">Mock Tests Available</p>
        </BlurCard>

        <BlurCard className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold text-2xl mb-1">50,000+</h3>
          <p className="text-foreground/70">Active Users</p>
        </BlurCard>

        <BlurCard className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-full mb-4">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold text-2xl mb-1">90%</h3>
          <p className="text-foreground/70">Success Rate</p>
        </BlurCard>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-light"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;