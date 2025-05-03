
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWalletStore } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

const Borrow = () => {
  const navigate = useNavigate();
  const { connected } = useWalletStore();
  const { toast } = useToast();
  const [amount, setAmount] = useState("10000");
  const [duration, setDuration] = useState(30);
  const [interestRate, setInterestRate] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to proceed with the loan request.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Loan Request Submitted",
        description: `Your loan request for ₹${amount} has been submitted successfully.`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "There was an error submitting your loan request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Request a Loan</h1>
          <p className="text-muted-foreground">Fill out the form to request a loan from lenders</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Specify your loan requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Loan Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter loan amount"
                    min="1000"
                    step="1000"
                    required
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min: ₹1,000</span>
                    <span>Max: ₹100,000</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="duration">Loan Duration</Label>
                    <span className="text-sm font-medium">{duration} days</span>
                  </div>
                  <Slider
                    id="duration"
                    min={7}
                    max={90}
                    step={1}
                    value={[duration]}
                    onValueChange={(values) => setDuration(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>7 days</span>
                    <span>90 days</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="interest">Maximum Interest Rate</Label>
                    <span className="text-sm font-medium">{interestRate}%</span>
                  </div>
                  <Slider
                    id="interest"
                    min={1}
                    max={15}
                    step={0.5}
                    value={[interestRate]}
                    onValueChange={(values) => setInterestRate(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>15%</span>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Loan Request"}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Summary</CardTitle>
                <CardDescription>Review your loan details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Amount:</span>
                  <span className="font-medium">₹{Number(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Maximum Interest Rate:</span>
                  <span className="font-medium">{interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Maximum Interest Amount:</span>
                  <span className="font-medium">₹{((Number(amount) * interestRate * duration) / (100 * 365)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total Repayment:</span>
                  <span>₹{(Number(amount) + (Number(amount) * interestRate * duration) / (100 * 365)).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• All loans are facilitated through smart contracts on the blockchain</p>
                <p>• Funds will be transferred directly to your connected wallet</p>
                <p>• Late payments may incur additional fees</p>
                <p>• You can repay your loan earlier with no penalty</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Borrow;
