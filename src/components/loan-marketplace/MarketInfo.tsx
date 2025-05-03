
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MarketInfo() {
  // This would typically come from an API
  const marketData = {
    availableLoans: 0,
    openRequests: 0,
    avgInterestRate: "N/A"
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Market Information</CardTitle>
        <p className="text-sm text-muted-foreground">Current loan market trends</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Available Loans:</span>
            <span className="font-medium">{marketData.availableLoans}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Open Requests:</span>
            <span className="font-medium">{marketData.openRequests}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Avg. Interest Rate:</span>
            <span className="font-medium">{marketData.avgInterestRate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
