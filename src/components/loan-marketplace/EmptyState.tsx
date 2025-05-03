
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <Card className="border border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 13h6" />
          </svg>
        </div>
        <p className="text-muted-foreground text-center">{message}</p>
      </CardContent>
    </Card>
  );
}
