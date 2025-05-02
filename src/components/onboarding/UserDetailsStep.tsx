
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useWalletStore, useOnboardingStore, useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Schema for signup form
const signupSchema = z.object({
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
});

// Schema for login form
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export const UserDetailsStep = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address } = useWalletStore();
  const { setStep, isReturningUser, setIsReturningUser } = useOnboardingStore();
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  
  const truncateAddress = (address: string) => {
    return address?.slice(0, 6) + "..." + address?.slice(-4);
  };
  
  // Setup form for signup
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      age: "",
      email: "",
    },
  });
  
  // Setup form for login
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle signup submission
  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would create a user account
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update user state with form values
      setUser({
        name: values.name,
        email: values.email,
        age: values.age,
      });
      
      toast({
        title: "Account details saved",
        description: "Let's proceed to the KYC verification.",
        duration: 3000,
      });
      
      // Proceed to KYC step
      setTimeout(() => setStep(3), 500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save account details. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle login submission
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would authenticate the user
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock successful login
      setUser({
        email: values.email,
        isLoggedIn: true,
      });
      
      toast({
        title: "Login successful",
        description: "Welcome back to RupeeLend!",
        duration: 3000,
      });
      
      // Navigate to dashboard
      setTimeout(() => navigate("/"), 500);
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

  // Toggle between signup and login forms
  const toggleForm = (isReturning: boolean) => {
    setIsReturningUser(isReturning);
  };

  return (
    <motion.div 
      className="max-w-md mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {isReturningUser === null ? "Welcome to RupeeLend" :
           isReturningUser ? "Welcome Back" : "Create Your Account"}
        </h1>
        <p className="text-muted-foreground">
          {isReturningUser === null ? "Do you already have an account with us?" :
           isReturningUser ? "Please login to continue" : "Please fill in your details"}
        </p>
        
        {isReturningUser === null && (
          <div className="flex justify-center gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => toggleForm(true)}
              className="px-6"
            >
              Yes, Log In
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 px-6"
              onClick={() => toggleForm(false)}
            >
              No, Sign Up
            </Button>
          </div>
        )}
      </div>
      
      {isReturningUser === false && (
        <Form {...signupForm}>
          <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
            <FormField
              control={signupForm.control}
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
              control={signupForm.control}
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
              control={signupForm.control}
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
            
            <div className="bg-muted/30 rounded-lg p-4 flex items-center gap-3">
              <div className="shrink-0">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse-slow">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                  Connected
                </Badge>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">Wallet Address</p>
                <p className="text-sm text-muted-foreground">{truncateAddress(address || "")}</p>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Continue to KYC"
              )}
            </Button>
            
            <div className="text-center">
              <Button 
                variant="link" 
                type="button"
                className="text-sm"
                onClick={() => toggleForm(true)}
              >
                Already have an account? Log in
              </Button>
            </div>
          </form>
        </Form>
      )}
      
      {isReturningUser === true && (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
            <FormField
              control={loginForm.control}
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
            
            <div className="bg-muted/30 rounded-lg p-4 flex items-center gap-3">
              <div className="shrink-0">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse-slow">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                  Connected
                </Badge>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">Wallet Address</p>
                <p className="text-sm text-muted-foreground">{truncateAddress(address || "")}</p>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
            
            <div className="text-center">
              <Button 
                variant="link" 
                type="button"
                className="text-sm"
                onClick={() => toggleForm(false)}
              >
                Don't have an account? Sign up
              </Button>
            </div>
          </form>
        </Form>
      )}
    </motion.div>
  );
};
