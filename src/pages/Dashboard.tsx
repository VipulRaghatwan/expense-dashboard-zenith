
import { useState } from 'react';
import { 
  Wallet, 
  CreditCard, 
  DollarSign,
  ArrowRight,
  Plus
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

import { useTransactions } from '@/hooks/useTransactions';
import { calculateTotals, getIncomeSourcesData } from '@/lib/api';
import StatCard from '@/components/StatCard';
import TransactionItem from '@/components/TransactionItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Dashboard = () => {
  const { data: transactions, isLoading, error } = useTransactions();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const COLORS = ['#8b5cf6', '#f43f5e', '#fb923c', '#a3e635'];
  
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading dashboard data...
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load dashboard data");
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-destructive">
          Error loading data. Please try refreshing the page.
        </div>
      </div>
    );
  }
  
  const { income, expenses, balance } = calculateTotals(transactions || []);
  const incomeSourcesData = getIncomeSourcesData(transactions || []);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
        <p className="text-muted-foreground">Track your spending and increase your savings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          value={formatCurrency(balance)} 
          icon={Wallet} 
          className="border-l-4 border-balance" 
          iconClassName="bg-balance/10 text-balance"
        />
        <StatCard 
          title="Total Income" 
          value={formatCurrency(income)} 
          icon={DollarSign} 
          className="border-l-4 border-income" 
          iconClassName="bg-income/10 text-income"
        />
        <StatCard 
          title="Total Expenses" 
          value={formatCurrency(expenses)} 
          icon={CreditCard} 
          className="border-l-4 border-expense" 
          iconClassName="bg-expense/10 text-expense"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm">
              See All <ArrowRight size={16} className="ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {transactions && transactions.length > 0 ? (
              transactions.slice(0, 5).map(transaction => (
                <TransactionItem 
                  key={transaction.id}
                  title={transaction.title}
                  date={transaction.date}
                  amount={transaction.amount}
                  type={transaction.type}
                  icon={transaction.icon}
                />
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No transactions found. Add your first transaction!
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <div className="w-full h-[320px]">
              {incomeSourcesData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      data={incomeSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveIndex(index)}
                    >
                      {incomeSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
                    <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No income data available yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
