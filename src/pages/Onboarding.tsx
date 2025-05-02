
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWalletStore, useOnboardingStore, useUserStore } from "@/lib/store";
import { ConnectWalletStep } from "@/components/onboarding/ConnectWalletStep";
import { UserDetailsStep } from "@/components/onboarding/UserDetailsStep";
import { KYCStep } from "@/components/onboarding/KYCStep";
import { AnimatePresence } from "framer-motion";

const Onboarding = () => {
  const { connected } = useWalletStore();
  const { step, resetOnboarding } = useOnboardingStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  
  // Reset onboarding state when component mounts
  useEffect(() => {
    resetOnboarding();
    
    // If user is already logged in, redirect to dashboard
    if (user.isLoggedIn) {
      navigate("/");
    }
  }, [resetOnboarding, user.isLoggedIn, navigate]);
  
  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <ConnectWalletStep />;
      case 2:
        return <UserDetailsStep />;
      case 3:
        return <KYCStep />;
      default:
        return <ConnectWalletStep />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow flex items-center justify-center py-10">
        {/* Progress indicator */}
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  s === step 
                    ? 'bg-indigo-600 scale-125' 
                    : s < step 
                      ? 'bg-emerald-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Step content with animations */}
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
