
import { useState, useEffect } from "react";
import { useWalletStore, useOnboardingStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Wallet, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export const ConnectWalletStep = () => {
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();
  const { setConnected, setAddress } = useWalletStore();
  const { setStep } = useOnboardingStore();
  
  const connectWallet = async () => {
    setConnecting(true);
    
    try {
      // Mock wallet connection - in real app would use wagmi/viem
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock address
      const mockAddress = "0x" + Math.floor(Math.random() * 10**40).toString(16).padStart(40, "0");
      
      setAddress(mockAddress);
      setConnected(true);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet was connected successfully!",
        duration: 3000,
      });
      
      // Proceed to next step after connection
      setTimeout(() => setStep(2), 500);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect wallet. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      setConnecting(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center max-w-md mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Connect Your Wallet</h1>
        <p className="text-muted-foreground">First, let's connect your crypto wallet to get started</p>
      </div>
      
      <div className="w-full space-y-4">
        <Button 
          onClick={connectWallet} 
          className="w-full h-16 text-lg bg-indigo-600 hover:bg-indigo-700 gap-3"
          disabled={connecting}
        >
          {connecting ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="h-6 w-6" />
              Connect Wallet
            </>
          )}
        </Button>
        
        <div className="text-center text-sm text-muted-foreground pt-6">
          <p>By connecting your wallet, you agree to our</p>
          <div className="flex justify-center space-x-1 mt-1">
            <Button variant="link" className="p-0 h-auto text-sm">Terms of Service</Button>
            <span>and</span>
            <Button variant="link" className="p-0 h-auto text-sm">Privacy Policy</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
