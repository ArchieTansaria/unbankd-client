
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wallet } from "lucide-react";
import { useWalletStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  walletAddress: z.string().min(1, {
    message: "Wallet address is required",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { connected, address, setConnected, setAddress } = useWalletStore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      walletAddress: address || "",
    },
  });

  const connectWallet = async () => {
    try {
      // Mock wallet connection - in real app would use wagmi/viem
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Mock address
      const mockAddress = "0x" + Math.floor(Math.random() * 10**40).toString(16).padStart(40, "0");
      
      setAddress(mockAddress);
      setConnected(true);
      
      form.setValue("walletAddress", mockAddress);
      
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would authenticate with your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back to RupeeLend!",
        duration: 3000,
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Incorrect email or wallet address. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md py-10">
      <Card className="glass-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Log In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input 
                          placeholder="Connect your wallet" 
                          readOnly 
                          value={field.value} 
                          className="flex-grow bg-muted/30"
                        />
                      </FormControl>
                      {!connected ? (
                        <Button 
                          type="button" 
                          variant="outline"
                          className="shrink-0"
                          onClick={connectWallet}
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      ) : (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse-slow">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                          Connected
                        </Badge>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700" 
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" className="p-0" onClick={() => navigate("/signup")}>
              Sign up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
