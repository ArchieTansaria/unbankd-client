
import { ArrowRight, BadgeIndianRupee, ArrowUp, ArrowDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export function Dashboard() {
  return (
    <section id="dashboard" className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Dashboard Preview</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center">
            Get insights into your lending and borrowing activities with our comprehensive dashboard.
          </p>
        </div>
        
        <div className="glass-card gradient-border p-6 md:p-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 bg-background/50 dark:bg-background/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="lending">Lending</TabsTrigger>
              <TabsTrigger value="borrowing">Borrowing</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Balance</CardDescription>
                    <CardTitle className="text-2xl flex items-center">
                      <BadgeIndianRupee className="w-5 h-5 mr-1 text-orange-400" />
                      85,400
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-emerald-500 text-sm">
                      <ArrowUp className="h-3.5 w-3.5 mr-1" />
                      <span>12% from last month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Active Loans</CardDescription>
                    <CardTitle className="text-2xl">5</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">As Lender</span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">As Borrower</span>
                      <span>2</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Earnings (MTD)</CardDescription>
                    <CardTitle className="text-2xl flex items-center">
                      <BadgeIndianRupee className="w-5 h-5 mr-1 text-orange-400" />
                      4,250
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-emerald-500 text-sm">
                      <ArrowUp className="h-3.5 w-3.5 mr-1" />
                      <span>8.5% from last month</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Collateral Health</CardDescription>
                    <CardTitle className="text-2xl">92%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Progress value={92} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Danger</span>
                        <span>Safe</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent lending and borrowing activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <ArrowUp className="h-4 w-4 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-medium">Loan Repayment Received</p>
                            <p className="text-sm text-muted-foreground">From Rahul S.</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-emerald-500">+₹1,250</p>
                          <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-orange-400/10 flex items-center justify-center">
                            <ArrowDown className="h-4 w-4 text-orange-400" />
                          </div>
                          <div>
                            <p className="font-medium">Loan Payment Made</p>
                            <p className="text-sm text-muted-foreground">To Neha P.</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-orange-400">-₹2,500</p>
                          <p className="text-xs text-muted-foreground">Yesterday, 2:15 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pb-2 border-b">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-indigo-600/10 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium">Loan Request</p>
                            <p className="text-sm text-muted-foreground">From Vikram M.</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹50,000</p>
                          <p className="text-xs text-muted-foreground">Sep 12, 4:30 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <ArrowUp className="h-4 w-4 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-medium">Interest Earned</p>
                            <p className="text-sm text-muted-foreground">From active loans</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-emerald-500">+₹850</p>
                          <p className="text-xs text-muted-foreground">Sep 10, 11:45 AM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  View Full Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="lending">
              <div className="text-center py-12">
                <h3 className="text-xl mb-2">Connect to View Lending Data</h3>
                <p className="text-muted-foreground mb-4">Connect your wallet to view your lending activity</p>
              </div>
            </TabsContent>
            
            <TabsContent value="borrowing">
              <div className="text-center py-12">
                <h3 className="text-xl mb-2">Connect to View Borrowing Data</h3>
                <p className="text-muted-foreground mb-4">Connect your wallet to view your borrowing activity</p>
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="text-center py-12">
                <h3 className="text-xl mb-2">Connect to View Activity</h3>
                <p className="text-muted-foreground mb-4">Connect your wallet to view your recent activity</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
