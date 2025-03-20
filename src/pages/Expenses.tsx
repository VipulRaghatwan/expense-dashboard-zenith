
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { useTransactionsByType } from '@/hooks/useTransactions';
import { getExpenseCategoriesData } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const Expenses = () => {
  const { data: expenseTransactions, isLoading, error } = useTransactionsByType('expense');
  const COLORS = ['#f43f5e', '#fb923c', '#a3e635', '#06b6d4', '#8b5cf6'];
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading expense data...
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load expense data");
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-destructive">
          Error loading data. Please try refreshing the page.
        </div>
      </div>
    );
  }

  const expenseCategories = getExpenseCategoriesData(expenseTransactions || []);
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Expenses</h1>
          <p className="text-muted-foreground">Track and manage your expenses</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Add Expense
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>How your money is being spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {expenseCategories.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No expense data available yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <CardDescription>Your latest spending activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseTransactions && expenseTransactions.length > 0 ? (
                expenseTransactions.map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-expense/10 flex items-center justify-center text-expense">
                        <expense.icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium">{expense.title}</h4>
                        <p className="text-sm text-muted-foreground">{expense.date}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-expense">
                      - ${expense.amount.toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No expense transactions found. Add your first expense!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expense History</CardTitle>
          <CardDescription>Compare your monthly spending patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Coming Soon</p>
            <Button variant="outline">Generate Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
