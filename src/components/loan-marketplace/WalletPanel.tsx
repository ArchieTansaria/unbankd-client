
import { useState } from "react";
import { useWalletStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

export function WalletPanel() {
  const { connected, address, setConnected, setAddress } = useWalletStore();
  const { toast } = useToast();
  
  const truncateAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  const disconnectWallet = () => {
    setAddress(null);
    setConnected(false);
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
      duration: 3000,
    });
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border-none">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-1">Wallet Connected</h2>
        <p className="text-sm font-mono bg-background dark:bg-background/30 px-3 py-1 rounded-full mb-3">
          {address ? truncateAddress(address) : "0x0000...0000"}
        </p>
        <div className="flex flex-col gap-2 w-full">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Balance:</div>
            <div className="text-2xl font-bold">₹25,000</div>
          </div>
          <Button 
            variant="outline" 
            onClick={disconnectWallet}
            className="w-full mt-2"
          >
            Disconnect
          </Button>
        </div>
      </div>
    </Card>
  );
}
