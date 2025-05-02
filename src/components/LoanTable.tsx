
import { useState } from "react";
import { LoanCard } from "./LoanCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockLoans = [
  {
    id: "1",
    amount: "50,000",
    apr: "12",
    collateral: "PAXG",
    collateralType: "Crypto",
    createdAt: "2 days ago",
    duration: "6 months",
    lenderName: "Priya",
    lenderScore: 4.8,
    progress: 65,
  },
  {
    id: "2",
    amount: "25,000",
    apr: "9.5",
    collateral: "Land Deed",
    collateralType: "Asset",
    createdAt: "5 days ago",
    duration: "12 months",
    lenderName: "Rahul",
    lenderScore: 4.2,
    progress: 80,
  },
  {
    id: "3",
    amount: "100,000",
    apr: "14",
    collateral: "ETH",
    collateralType: "Crypto",
    createdAt: "1 day ago",
    duration: "3 months",
    lenderName: "Neha",
    lenderScore: 5.0,
    progress: 45,
  },
  {
    id: "4",
    amount: "75,000",
    apr: "11",
    collateral: "Gold",
    collateralType: "Asset",
    createdAt: "3 days ago",
    duration: "9 months",
    lenderName: "Vikram",
    lenderScore: 4.5,
    progress: 90,
  },
];

export function LoanTable() {
  const [rateRange, setRateRange] = useState([0, 15]);
  const [searchTerm, setSearchTerm] = useState("");
  const [collateralFilter, setCollateralFilter] = useState("all");
  
  const filteredLoans = mockLoans.filter(loan => {
    const matchesSearch = searchTerm === "" || 
      loan.lenderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.amount.includes(searchTerm);
    
    const matchesCollateral = collateralFilter === "all" || 
      loan.collateralType.toLowerCase() === collateralFilter.toLowerCase();
    
    const rate = parseFloat(loan.apr);
    const matchesRate = rate >= rateRange[0] && rate <= rateRange[1];
    
    return matchesSearch && matchesCollateral && matchesRate;
  });

  return (
    <section id="marketplace" className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loan Marketplace</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through available loans or create your own listing to find the perfect match for your financial needs.
          </p>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="browse" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="browse">Browse Loans</TabsTrigger>
                <TabsTrigger value="my-loans">My Loans</TabsTrigger>
                <TabsTrigger value="create">Create Loan</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search loans..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  New Loan
                </Button>
              </div>
            </div>
            
            <TabsContent value="browse" className="mt-0">
              <div className="bg-muted/40 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="collateral-type">Collateral Type</Label>
                    <select
                      id="collateral-type"
                      className="w-full mt-1 p-2 border rounded-md bg-background"
                      value={collateralFilter}
                      onChange={(e) => setCollateralFilter(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="crypto">Crypto</option>
                      <option value="asset">Asset</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="rate-range">Interest Rate Range: {rateRange[0]}% - {rateRange[1]}%</Label>
                    <Slider
                      id="rate-range"
                      defaultValue={[0, 15]}
                      max={30}
                      step={0.5}
                      value={rateRange}
                      onValueChange={setRateRange}
                      className="mt-3"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((loan) => (
                    <LoanCard key={loan.id} {...loan} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No loans match your criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="my-loans">
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-xl mb-2">Connect Your Wallet</h3>
                <p className="text-muted-foreground mb-4">Connect your wallet to view your loans</p>
                <div className="flex justify-center">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Connect Wallet</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-xl mb-2">Create a New Loan</h3>
                <p className="text-muted-foreground mb-4">Connect your wallet to create a loan listing</p>
                <div className="flex justify-center">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Connect Wallet</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
