import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a
          href="/"
          className="text-2xl font-bold text-primary flex items-center gap-2"
        >
          <span className="text-3xl">📝</span>
          <span className="hidden sm:inline">MockMaster</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            How It Works
          </a>
          <a
            href="#preview"
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Preview
          </a>
          <div className="flex items-center gap-3">
            <Button variant="outline">Log In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg animate-fade-in">
          <div className="flex flex-col p-4 space-y-4">
            <a
              href="#features"
              className="text-foreground/80 hover:text-primary transition-colors py-2 px-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-foreground/80 hover:text-primary transition-colors py-2 px-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#preview"
              className="text-foreground/80 hover:text-primary transition-colors py-2 px-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preview
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" className="w-full">
                Log In
              </Button>
              <Button className="w-full">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;