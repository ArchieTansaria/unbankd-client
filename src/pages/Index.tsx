
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LoanTable } from "@/components/LoanTable";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <LoanTable />
        <Dashboard />
        
        <section id="about" className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About RupeeLend</h2>
            <p className="text-lg text-muted-foreground mb-8">
              RupeeLend is India's first P2P lending platform powered by blockchain technology, 
              connecting lenders and borrowers directly without intermediaries. Our platform offers 
              transparent, secure, and efficient lending solutions for Indians.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg glass-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-600/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast & Transparent</h3>
                <p className="text-muted-foreground">
                  Get loans approved quickly with full transparency on terms and conditions.
                </p>
              </div>
              
              <div className="p-6 rounded-lg glass-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your data and transactions are secured with blockchain technology.
                </p>
              </div>
              
              <div className="p-6 rounded-lg glass-card">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-400/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Indian Focus</h3>
                <p className="text-muted-foreground">
                  Built specifically for Indian users with INR support and UPI integration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
