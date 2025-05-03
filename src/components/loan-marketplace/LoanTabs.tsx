
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanCard } from "@/components/loan-marketplace/LoanCard";
import { EmptyState } from "@/components/loan-marketplace/EmptyState";

export function LoanTabs() {
  // Mock loan data
  const activeLoans = [
    {
      id: "loan1",
      amount: "0.5 ETH",
      amountInRupees: "₹85,000",
      interestRate: "5%",
      duration: "30 days",
      lender: "0x12De...8279",
      borrower: "0xf39F...2266",
      status: "active",
      date: "03/05/2025"
    },
    {
      id: "loan2",
      amount: "1.2 ETH",
      amountInRupees: "₹204,000",
      interestRate: "5%",
      duration: "30 days",
      lender: "0x12De...8279",
      borrower: "0x7099...79C8",
      status: "active",
      date: "03/05/2025"
    }
  ];
  
  return (
    <Tabs defaultValue="my-dashboard" className="w-full">
      <TabsList className="w-full grid grid-cols-3">
        <TabsTrigger value="my-dashboard">My Dashboard</TabsTrigger>
        <TabsTrigger value="loan-offers">Loan Offers</TabsTrigger>
        <TabsTrigger value="loan-requests">Loan Requests</TabsTrigger>
      </TabsList>
      
      <TabsContent value="my-dashboard">
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">My Active Loans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeLoans.map(loan => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">My Loan Offers</h3>
          <EmptyState message="You haven't created any loan offers" />
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">My Loan Requests</h3>
          <EmptyState message="You haven't created any loan requests" />
        </div>
      </TabsContent>
      
      <TabsContent value="loan-offers">
        <div className="mt-6">
          <EmptyState message="No loan offers available at this time" />
        </div>
      </TabsContent>
      
      <TabsContent value="loan-requests">
        <div className="mt-6">
          <EmptyState message="No loan requests available at this time" />
        </div>
      </TabsContent>
    </Tabs>
  );
}
