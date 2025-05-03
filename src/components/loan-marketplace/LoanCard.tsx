
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LoanCardProps {
  loan: {
    id: string;
    amount: string;
    amountInRupees?: string;
    interestRate: string;
    duration: string;
    lender: string;
    borrower: string;
    status: string;
    date: string;
  };
}

export function LoanCard({ loan }: LoanCardProps) {
  return (
    <Card className="p-6 border-l-4 border-l-indigo-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-2xl font-bold">{loan.amount}</h4>
          {loan.amountInRupees && <p className="text-sm text-muted-foreground">{loan.amountInRupees}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
          </Badge>
          <span className="text-sm text-muted-foreground">{loan.date}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        <div>
          <p className="text-muted-foreground">Interest Rate:</p>
          <p className="font-medium">{loan.interestRate}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Duration:</p>
          <p className="font-medium">{loan.duration}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Lender:</p>
          <p className="font-medium font-mono text-xs">{loan.lender}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Borrower:</p>
          <p className="font-medium font-mono text-xs">{loan.borrower}</p>
        </div>
      </div>
    </Card>
  );
}
