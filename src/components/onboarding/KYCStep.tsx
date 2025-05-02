
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Loader2 } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export const KYCStep = () => {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      
      // Update user state to logged in
      setUser({
        isLoggedIn: true,
      });
      
      toast({
        title: "KYC Verification Complete",
        description: "Your identity has been verified successfully!",
        duration: 3000,
      });
      
      // Redirect to dashboard after completion
      setTimeout(() => navigate("/"), 2000);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate, setUser, toast]);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center max-w-md mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">KYC Verification</h1>
        <p className="text-muted-foreground">
          {loading 
            ? "Your KYC documents are being processed..."
            : "Your identity has been verified successfully!"}
        </p>
      </div>
      
      <div className="w-24 h-24 flex items-center justify-center">
        {loading ? (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <Loader2 className="h-24 w-24 text-indigo-600 animate-spin" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircle className="h-24 w-24 text-emerald-500" strokeWidth={1.5} />
          </motion.div>
        )}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-xl font-medium mb-2">
          {loading 
            ? "Please wait while we verify your information" 
            : "KYC Submitted ✅"}
        </p>
        {completed && (
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Redirecting you to the dashboard...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};
