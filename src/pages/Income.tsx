
import { ArrowDownToLine, DownloadIcon, Plus } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useTransactionsByType } from '@/hooks/useTransactions';
import { getMonthlyIncomeData } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Income = () => {
  const { data: incomeTransactions, isLoading, error } = useTransactionsByType('income');

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading income data...
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load income data");
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-destructive">
          Error loading data. Please try refreshing the page.
        </div>
      </div>
    );
  }

  const monthlyIncome = getMonthlyIncomeData(incomeTransactions || []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Income Overview</h1>
        <p className="text-muted-foreground">Track your earnings over time and analyze your income trends</p>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Income Overview</CardTitle>
              <CardDescription>Track your earnings over time</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-2" />
              Add Income
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            {monthlyIncome.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyIncome}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60} 
                    tick={{fontSize: 12}}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Amount']} />
                  <Bar 
                    dataKey="amount" 
                    fill="#8b5cf6" 
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No income data available yet. Add your first income transaction!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Income Sources</CardTitle>
          <Button variant="ghost" size="sm" className="text-sm">
            <DownloadIcon size={16} className="mr-2" /> Download
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {incomeTransactions && incomeTransactions.length > 0 ? (
              incomeTransactions.map(income => (
                <div key={income.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <income.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{income.title}</h4>
                      <p className="text-sm text-muted-foreground">{income.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-income flex items-center">
                    + ${income.amount.toLocaleString()}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No income transactions found. Add your first income!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Income;
