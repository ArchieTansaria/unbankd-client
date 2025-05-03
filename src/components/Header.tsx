
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/lib/store";
import { WalletConnect } from "@/components/WalletConnect";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();
  
  // Handle scroll events to add/remove shadow from header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Define navigation items based on user authentication status
  const navItems = [
    { title: "About", href: "/#about" },
    ...(user.isLoggedIn
      ? [{ title: "Dashboard", href: "/dashboard" }]
      : [])
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full backdrop-blur transition-shadow ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">R</div>
          <span className="font-bold text-xl hidden sm:inline-block">RupeeLend</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.title} 
              to={item.href}
              className="text-sm font-medium hover:text-indigo-600 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <WalletConnect />
          
          {!user.isLoggedIn ? (
            <div className="hidden md:flex gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          ) : null}
          
          <button
            className="block md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 pb-6 bg-background border-t">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link 
                key={item.title} 
                to={item.href}
                className="text-sm font-medium p-2 hover:bg-muted rounded-md transition-colors"
              >
                {item.title}
              </Link>
            ))}
            
            {!user.isLoggedIn && (
              <>
                <Button 
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
