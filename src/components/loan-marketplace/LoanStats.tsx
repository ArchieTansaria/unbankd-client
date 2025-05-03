
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LoanStats() {
  // This would typically come from an API or state
  const stats = {
    activeLoans: 2,
    openOffers: 0,
    pendingRequests: 0
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Loan Stats</CardTitle>
        <p className="text-sm text-muted-foreground">Your lending activity</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Active Loans:</span>
            <span className="font-medium">{stats.activeLoans}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Open Offers:</span>
            <span className="font-medium">{stats.openOffers}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pending Requests:</span>
            <span className="font-medium">{stats.pendingRequests}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
