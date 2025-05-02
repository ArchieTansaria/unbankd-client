
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Shield } from "lucide-react";
import { motion } from "framer-motion";

export const AadharPanStep = () => {
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { setStep } = useOnboardingStore();
  
  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAadharFile(e.target.files[0]);
    }
  };
  
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPanFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aadharFile || !panFile) {
      toast({
        title: "Missing Documents",
        description: "Please upload both Aadhar and PAN card documents",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would upload the documents to a secure server
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Documents Uploaded",
        description: "Your identity documents have been verified",
        duration: 3000,
      });
      
      // Proceed to next step (ITR verification)
      setTimeout(() => setStep(4), 500);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Could not upload documents. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-3xl font-bold mb-2">Identity Verification</h1>
          <p className="text-muted-foreground">
            Please upload your Aadhar and PAN card documents
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3 mb-6">
          <div className="shrink-0 pt-1">
            <Shield className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Privacy Notice</p>
            <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
              We use Zero-Knowledge Proof technology to verify your documents without storing the actual data. 
              Your documents are encrypted and only used for verification purposes.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-2">
            <label htmlFor="aadhar" className="text-sm font-medium">
              Aadhar Card
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              {aadharFile ? (
                <div className="flex items-center justify-center flex-col">
                  <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-full mb-2">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium truncate max-w-full">
                    {aadharFile.name}
                  </p>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setAadharFile(null)}
                  >
                    Change file
                  </Button>
                </div>
              ) : (
                <div>
                  <Input 
                    id="aadhar" 
                    type="file" 
                    accept="image/*,.pdf" 
                    className="hidden"
                    onChange={handleAadharChange}
                  />
                  <label 
                    htmlFor="aadhar"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Click to upload your Aadhar Card
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      JPG, PNG or PDF (max 5MB)
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="pan" className="text-sm font-medium">
              PAN Card
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              {panFile ? (
                <div className="flex items-center justify-center flex-col">
                  <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-full mb-2">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium truncate max-w-full">
                    {panFile.name}
                  </p>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setPanFile(null)}
                  >
                    Change file
                  </Button>
                </div>
              ) : (
                <div>
                  <Input 
                    id="pan" 
                    type="file" 
                    accept="image/*,.pdf" 
                    className="hidden"
                    onChange={handlePanChange}
                  />
                  <label 
                    htmlFor="pan"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Click to upload your PAN Card
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      JPG, PNG or PDF (max 5MB)
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700" 
          disabled={isSubmitting || !aadharFile || !panFile}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying Documents...
            </>
          ) : (
            "Continue to ITR Verification"
          )}
        </Button>
      </form>
    </motion.div>
  );
};
