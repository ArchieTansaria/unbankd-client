
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeIndianRupee, ArrowRight, Plus, FileText } from "lucide-react";
import { useWalletStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { WalletConnect } from "@/components/WalletConnect";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { connected, address, balance } = useWalletStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Mock functions for borrow and lend actions
  const handleBorrowRequest = () => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to continue",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Loan request submitted",
        description: "Your loan request has been submitted successfully",
      });
    }, 1500);
  };

  const handleLendOffer = () => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to continue",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Loan offer created",
        description: "Your loan offer has been created successfully",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">RupeeLend Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your loans and funding requests</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            <Button 
              onClick={handleBorrowRequest} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Request a Loan
            </Button>
            
            <Button 
              onClick={handleLendOffer} 
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              <FileText className="h-4 w-4" />
              Create Loan Offer
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main dashboard content - Left and Center (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="my-dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="my-dashboard">My Dashboard</TabsTrigger>
                <TabsTrigger value="loan-offers">Loan Offers</TabsTrigger>
                <TabsTrigger value="loan-requests">Loan Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-dashboard" className="mt-4">
                <h2 className="text-xl font-semibold mb-4">My Active Loans</h2>
                
                {connected ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="shadow-sm border-indigo-600/20">
                      <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                            Active
                          </span>
                          <CardTitle className="text-2xl flex items-center">
                            <BadgeIndianRupee className="w-5 h-5 mr-1 text-orange-400" />
                            50,000
                          </CardTitle>
                        </div>
                        <span className="text-sm text-muted-foreground">03/05/2025</span>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Interest Rate:</span>
                            <span className="font-medium text-emerald-500">5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>30 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lender:</span>
                            <span className="font-mono text-xs">0x120e...8279</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Borrower:</span>
                            <span className="font-mono text-xs">0xf39f...2266</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-sm border-indigo-600/20">
                      <CardHeader className="pb-2 flex flex-row items-start justify-between">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                            Active
                          </span>
                          <CardTitle className="text-2xl flex items-center">
                            <BadgeIndianRupee className="w-5 h-5 mr-1 text-orange-400" />
                            75,000
                          </CardTitle>
                        </div>
                        <span className="text-sm text-muted-foreground">03/05/2025</span>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Interest Rate:</span>
                            <span className="font-medium text-emerald-500">5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>30 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lender:</span>
                            <span className="font-mono text-xs">0x120e...8279</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Borrower:</span>
                            <span className="font-mono text-xs">0x7099...79C8</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground mb-4">Connect your wallet to view your active loans</p>
                      <WalletConnect />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="loan-offers">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    {connected ? (
                      <p className="text-muted-foreground">You haven't created any loan offers</p>
                    ) : (
                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">Connect your wallet to view your loan offers</p>
                        <WalletConnect />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="loan-requests">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    {connected ? (
                      <p className="text-muted-foreground">You haven't created any loan requests</p>
                    ) : (
                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">Connect your wallet to view your loan requests</p>
                        <WalletConnect />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Wallet and Stats - Right (1/3) */}
          <div className="space-y-6">
            {/* Wallet Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Wallet Connected</CardTitle>
              </CardHeader>
              <CardContent>
                {connected ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-sm">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}</span>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500">
                        Connected
                      </span>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Balance:</div>
                      <div className="text-xl font-medium flex items-center">
                        <BadgeIndianRupee className="w-5 h-5 mr-1 text-orange-400" />
                        {balance || '0.0000'}
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" onClick={() => navigate("/onboarding")}>
                      Complete KYC <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4">
                    <p className="text-muted-foreground mb-4">Connect your wallet to continue</p>
                    <WalletConnect />
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Loan Stats */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Loan Stats</CardTitle>
                <CardDescription>Your lending activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Loans:</span>
                    <span>2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open Offers:</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending Requests:</span>
                    <span>0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Market Information */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Market Information</CardTitle>
                <CardDescription>Current loan market trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Loans:</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open Requests:</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Interest Rate:</span>
                    <span>N/A</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
