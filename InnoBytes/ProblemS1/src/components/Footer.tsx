import { ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <a href="/" className="text-2xl font-bold text-primary flex items-center gap-2 mb-4">
              <span className="text-3xl">📝</span>
              MockMaster
            </a>
            <p className="text-foreground/70 max-w-md mb-6">
              A community-driven mock test platform helping students and professionals prepare better for exams with interactive tests and AI-powered insights.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
              >
                <Twitter className="h-5 w-5 text-foreground/70" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
              >
                <Github className="h-5 w-5 text-foreground/70" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-foreground/70" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Test Library
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 mb-4 md:mb-0">
            © 2023 MockMaster. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors text-sm"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;