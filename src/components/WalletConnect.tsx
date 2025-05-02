
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useWalletStore } from "@/lib/store";

export function WalletConnect() {
  const { connected, address, setConnected, setAddress } = useWalletStore();
  const [walletOpen, setWalletOpen] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    // Mock wallet connection - in real app would use wagmi/viem
    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Mock address
      const mockAddress = "0x" + Math.floor(Math.random() * 10**40).toString(16).padStart(40, "0");
      
      setAddress(mockAddress);
      setConnected(true);
      setWalletOpen(false);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet was connected successfully!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect wallet. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
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

  const truncateAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  return (
    <>
      {!connected ? (
        <Dialog open={walletOpen} onOpenChange={setWalletOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect a Wallet</DialogTitle>
              <DialogDescription>
                Connect your wallet to access RupeeLend
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button onClick={connectWallet} className="flex items-center justify-center gap-2">
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-metamask-2728406-2261817.png" 
                     alt="MetaMask" 
                     className="h-5 w-5" />
                Connect with MetaMask
              </Button>
              <Button onClick={connectWallet} variant="outline" className="flex items-center justify-center gap-2">
                <img src="https://www.coinbase.com/assets/press/coinbase-mark-white-9c15b8c093d4c3685f3cc7d666127a06424223c52d58ee5de3851b188927402c.png" 
                     alt="Coinbase Wallet" 
                     className="h-5 w-5" />
                Connect with Coinbase
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse-slow gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Connected
          </Badge>
          <Button 
            variant="outline" 
            onClick={disconnectWallet}
            className="flex items-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            {truncateAddress(address || "")}
          </Button>
        </div>
      )}
    </>
  );
}
