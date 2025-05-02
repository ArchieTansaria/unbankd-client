
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Upload, Shield, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";

export const ITRStep = () => {
  const [itrFile, setItrFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zeroKnowledgeEnabled, setZeroKnowledgeEnabled] = useState(true);
  const { toast } = useToast();
  const { setStep } = useOnboardingStore();
  const navigate = useNavigate();
  
  const handleItrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setItrFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itrFile) {
      toast({
        title: "Missing Document",
        description: "Please upload your Income Tax Return (ITR) document",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would upload the document to a secure server
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "ITR Verified",
        description: "Your income verification is complete",
        duration: 3000,
      });
      
      // Proceed to last KYC step
      setTimeout(() => setStep(5), 500);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not verify ITR document. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const skipVerification = () => {
    toast({
      title: "ITR Verification Skipped",
      description: "You can complete this step later from your profile",
      duration: 3000,
    });
    
    // Proceed to last KYC step
    setTimeout(() => setStep(5), 500);
  };
  
  return (
    <motion.div 
      className="max-w-md mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Income Verification</h1>
          <p className="text-muted-foreground">
            Please upload your Income Tax Return (ITR) for credit assessment
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3 mb-6">
          <div className="shrink-0 pt-1">
            <Shield className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Enhanced Privacy Protection</p>
            <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
              We <strong>do not store or retain</strong> your financial documents. Our Zero-Knowledge Proof 
              system only extracts the necessary income verification data without accessing your personal details.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-2">
            <label htmlFor="itr" className="text-sm font-medium">
              Income Tax Return (ITR)
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              {itrFile ? (
                <div className="flex items-center justify-center flex-col">
                  <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-full mb-2">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium truncate max-w-full">
                    {itrFile.name}
                  </p>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setItrFile(null)}
                  >
                    Change file
                  </Button>
                </div>
              ) : (
                <div>
                  <Input 
                    id="itr" 
                    type="file" 
                    accept="image/*,.pdf" 
                    className="hidden"
                    onChange={handleItrChange}
                  />
                  <label 
                    htmlFor="itr"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Click to upload your ITR document
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      JPG, PNG or PDF (max 5MB)
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-3 pt-2">
            <Checkbox 
              id="zkp" 
              checked={zeroKnowledgeEnabled}
              onCheckedChange={(checked) => {
                setZeroKnowledgeEnabled(checked as boolean);
              }}
            />
            <div className="grid gap-1">
              <label
                htmlFor="zkp"
                className="text-sm font-medium leading-none"
              >
                Enable Zero-Knowledge Proof verification
              </label>
              <p className="text-sm text-muted-foreground">
                Verify my income without storing the actual document or sensitive data
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 pt-2">
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700" 
            disabled={isSubmitting || !itrFile}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying Income...
              </>
            ) : (
              "Complete Income Verification"
            )}
          </Button>
          
          <Button 
            type="button"
            variant="ghost"
            onClick={skipVerification}
            className="text-sm"
          >
            I'll do this later
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
