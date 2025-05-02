
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.string()
    .refine((val) => !isNaN(parseInt(val)), {
      message: "Age must be a number",
    })
    .refine((val) => parseInt(val) >= 18, {
      message: "You must be at least 18 years old",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  walletAddress: z.string().optional(),
});

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { connected, address, setConnected, setAddress } = useWalletStore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
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
      // In a real app, this would send data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
        duration: 3000,
      });
      
      // Navigate to dashboard or login
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create your account. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const truncateAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  return (
    <div className="container mx-auto max-w-md py-10">
      <Card className="glass-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
                    <FormDescription>
                      Connect your wallet to verify your ownership
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700" 
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" className="p-0" onClick={() => navigate("/login")}>
              Log in
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
