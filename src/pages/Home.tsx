
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // In a real app, this would handle authentication
    // For now, we'll just navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="w-8 h-8 text-primary mr-2"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-3.58 0-6.5-2.92-6.5-6.5h13c0 3.58-2.92 6.5-6.5 6.5z" />
          </svg>
          <h1 className="text-xl font-bold text-slate-900">ExpenseTracker</h1>
        </div>
        <Button onClick={handleLoginClick}>Login</Button>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Keep track of your finances with ease
            </h1>
            <p className="text-lg md:text-xl text-slate-600">
              Our platform helps you monitor your income and expenses, providing insights to make better financial decisions.
            </p>
            <div className="space-x-4">
              <Button size="lg" onClick={handleLoginClick}>
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-xl">
            <img 
              src="/lovable-uploads/4631c719-bfe5-4755-9c71-3ac3caef203c.png" 
              alt="Dashboard preview" 
              className="rounded-lg w-full"
            />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Expenses</h3>
            <p className="text-slate-600">Monitor all your expenses in one place with detailed categorization.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3"></path>
                <path d="M22 4L12 14 9 11"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analyze Income</h3>
            <p className="text-slate-600">Gain insights into your income sources and trends over time.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                <path d="M3 5c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                <path d="M3 5c0 1.66 4 3 9 3s9-1.34 9-3"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Budget Planning</h3>
            <p className="text-slate-600">Create and manage budgets to help you reach your financial goals.</p>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-12 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ExpenseTracker</h3>
              <p className="text-slate-400">Making personal finance management simple and effective.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>About us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400">
                <li>support@expensetracker.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
