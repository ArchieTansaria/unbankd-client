
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, Clock, IndianRupee, Calendar, BadgeIndianRupee } from "lucide-react";

interface LoanCardProps {
  amount: string;
  apr: string;
  collateral: string;
  collateralType: string;
  createdAt: string;
  duration: string;
  lenderName: string;
  lenderScore: number;
  progress: number;
}

export function LoanCard({
  amount,
  apr,
  collateral,
  collateralType,
  createdAt,
  duration,
  lenderName,
  lenderScore,
  progress
}: LoanCardProps) {
  const getStarRating = (score: number) => {
    const fullScore = Math.floor(score);
    const stars = [];
    
    for (let i = 0; i < fullScore; i++) {
      stars.push(<span key={i} className="text-orange-400">★</span>);
    }
    
    if (score - fullScore > 0) {
      stars.push(<span key="half" className="text-orange-400">★</span>);
    }
    
    return stars;
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-indigo-500/10 glass-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className="bg-indigo-600">{collateralType} Collateral</Badge>
          <div className="flex items-center">
            {getStarRating(lenderScore)}
            <span className="ml-1 text-sm text-muted-foreground">{lenderScore}</span>
          </div>
        </div>
        <CardTitle className="text-xl flex items-center">
          <BadgeIndianRupee className="w-5 h-5 mr-1 text-orange-400" />
          {amount}
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" /> {duration}
          </span>
          <span className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1" /> {createdAt}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Interest Rate</span>
            <span className="font-medium text-emerald-500">{apr}% APR</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Collateral</span>
            <span className="font-medium">{collateral}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Lender</span>
            <span className="font-medium">{lenderName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Funding</span>
            <div className="flex items-center gap-2">
              <Progress value={progress} className="h-2" />
              <span className="text-xs">{progress}%</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">View Details</Button>
        <Button variant="outline" className="w-full">Apply</Button>
      </CardFooter>
    </Card>
  );
}
