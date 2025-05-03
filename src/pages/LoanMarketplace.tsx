
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWalletStore, useUserStore } from "@/lib/store";
import { WalletPanel } from "@/components/loan-marketplace/WalletPanel";
import { LoanStats } from "@/components/loan-marketplace/LoanStats";
import { MarketInfo } from "@/components/loan-marketplace/MarketInfo";
import { LoanTabs } from "@/components/loan-marketplace/LoanTabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const LoanMarketplace = () => {
  const { connected } = useWalletStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  
  // Redirect to login if not logged in
  useEffect(() => {
    if (!user.isLoggedIn) {
      navigate("/login");
    }
  }, [user.isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">RupeeLend Dashboard</h1>
            <p className="text-muted-foreground">Manage your loans and funding requests</p>
          </div>
          <div className="flex gap-3">
            <button 
              className="inline-flex items-center px-4 py-2 border border-indigo-600 rounded-md text-indigo-600 bg-transparent hover:bg-indigo-50 transition-colors"
              onClick={() => navigate("/borrow")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 2v20M2 12h20"></path>
              </svg>
              Request a Loan
            </button>
            <button 
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => navigate("/lend")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 2v20M2 12h20"></path>
              </svg>
              Create Loan Offer
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LoanTabs />
          </div>
          <div className="space-y-6">
            <WalletPanel />
            <LoanStats />
            <MarketInfo />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoanMarketplace;
