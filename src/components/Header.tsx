
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { WalletConnect } from "./WalletConnect";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-200 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold">
            RL
          </div>
          <h1 className="text-xl font-bold">RupeeLend</h1>
        </div>
        
        {!isMobile ? (
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="font-medium hover:text-indigo-600 transition-colors">Home</a>
            <a href="#marketplace" className="font-medium hover:text-indigo-600 transition-colors">Marketplace</a>
            <a href="#dashboard" className="font-medium hover:text-indigo-600 transition-colors">Dashboard</a>
            <a href="#about" className="font-medium hover:text-indigo-600 transition-colors">About</a>
          </nav>
        ) : null}
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {!user.isLoggedIn ? (
            !isMobile ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => navigate("/onboarding")}>
                  Get Started
                </Button>
              </div>
            ) : null
          ) : (
            !isMobile ? (
              <div className="flex items-center gap-2">
                <WalletConnect />
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : <WalletConnect />
          )}
          
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 py-4">
                    <div className="bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold">
                      RL
                    </div>
                    <h1 className="text-xl font-bold">RupeeLend</h1>
                  </div>
                  <nav className="flex flex-col space-y-4 py-4">
                    <a href="#" className="font-medium hover:text-indigo-600 transition-colors">Home</a>
                    <a href="#marketplace" className="font-medium hover:text-indigo-600 transition-colors">Marketplace</a>
                    <a href="#dashboard" className="font-medium hover:text-indigo-600 transition-colors">Dashboard</a>
                    <a href="#about" className="font-medium hover:text-indigo-600 transition-colors">About</a>
                  </nav>
                  <div className="mt-auto py-4 space-y-2">
                    {!user.isLoggedIn ? (
                      <>
                        <Button className="w-full" variant="outline" onClick={() => {
                          navigate("/login");
                        }}>
                          Login
                        </Button>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => {
                          navigate("/onboarding");
                        }}>
                          Get Started
                        </Button>
                      </>
                    ) : (
                      <>
                        <WalletConnect />
                        <Button className="w-full" variant="outline" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
