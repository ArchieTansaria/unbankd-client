
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "./WalletConnect";

export function Hero() {
  return (
    <section className="py-16 px-4 md:py-28">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500">
              P2P Lending Platform for India
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0">
              Connecting lenders and borrowers directly, powered by blockchain technology and INR support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <WalletConnect />
              <Button variant="outline" className="flex items-center gap-2">
                Learn More <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 p-1">
              <div className="w-full h-full glass-card gradient-border p-6 md:p-8">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Platform Stats</h3>
                    <div className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full text-xs font-medium">
                      Live
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 dark:bg-background/20 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Total Loans</p>
                      <p className="text-2xl font-bold">₹12.6M</p>
                      <p className="text-xs text-emerald-500">+24% this month</p>
                    </div>
                    <div className="bg-background/50 dark:bg-background/20 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold">2,542</p>
                      <p className="text-xs text-emerald-500">+12% this month</p>
                    </div>
                    <div className="bg-background/50 dark:bg-background/20 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Avg. Interest</p>
                      <p className="text-2xl font-bold">12.5%</p>
                      <p className="text-xs text-orange-400">-2% this month</p>
                    </div>
                    <div className="bg-background/50 dark:bg-background/20 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold">97.8%</p>
                      <p className="text-xs text-emerald-500">+1.2% this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-emerald-500/20 blur-3xl rounded-full transform scale-95 -z-10 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
