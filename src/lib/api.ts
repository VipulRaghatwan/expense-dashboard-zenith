import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get monthly income data for charts
export const getMonthlyIncomeData = (transactions: Transaction[]) => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  
  // Group by date and sum amounts
  const grouped = incomeTransactions.reduce((acc: Record<string, number>, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += transaction.amount;
    return acc;
  }, {});
  
  // Convert to chart format
  return Object.entries(grouped).map(([name, amount]) => ({
    name,
    amount
  }));
};
