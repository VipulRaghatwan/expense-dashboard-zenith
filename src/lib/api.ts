
import { supabase } from './supabase';
import type { Database } from './supabase';
import { 
  ShoppingBag, 
  Plane, 
  Briefcase, 
  Lightbulb, 
  Home, 
  ShoppingCart, 
  Palette, 
  PiggyBank, 
  BadgeDollarSign,
  Landmark
} from 'lucide-react';

// Map to convert string icon names to Lucide components
const iconMap: Record<string, any> = {
  'ShoppingBag': ShoppingBag,
  'Plane': Plane,
  'Briefcase': Briefcase,
  'Lightbulb': Lightbulb,
  'Home': Home,
  'ShoppingCart': ShoppingCart,
  'Palette': Palette,
  'PiggyBank': PiggyBank,
  'BadgeDollarSign': BadgeDollarSign,
  'Landmark': Landmark,
};

export type Transaction = Database['public']['Tables']['transactions']['Row'] & {
  icon: any;
};

// Fetch all transactions
export const fetchTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, categories(name, icon)')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }

  return data.map(item => ({
    ...item,
    icon: iconMap[item.categories?.icon || 'ShoppingBag']
  }));
};

// Fetch transactions by type (income or expense)
export const fetchTransactionsByType = async (type: 'income' | 'expense'): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, categories(name, icon)')
    .eq('type', type)
    .order('date', { ascending: false });

  if (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }

  return data.map(item => ({
    ...item,
    icon: iconMap[item.categories?.icon || 'ShoppingBag']
  }));
};

// Add a new transaction
export const addTransaction = async (transaction: Database['public']['Tables']['transactions']['Insert']): Promise<Transaction> => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select('*, categories(name, icon)')
    .single();

  if (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }

  return {
    ...data,
    icon: iconMap[data.categories?.icon || 'ShoppingBag']
  };
};

// Delete a transaction
export const deleteTransaction = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// Calculate totals from transactions
export const calculateTotals = (transactions: Transaction[]) => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  const totalIncome = incomeTransactions.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseTransactions.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;
  
  return {
    income: totalIncome,
    expenses: totalExpenses,
    balance
  };
};

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

// Get income sources data for pie chart
export const getIncomeSourcesData = (transactions: Transaction[]) => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  
  // Group by category and sum amounts
  const grouped = incomeTransactions.reduce((acc: Record<string, number>, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});
  
  // Convert to chart format
  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value
  }));
};

// Get expense categories data for pie chart
export const getExpenseCategoriesData = (transactions: Transaction[]) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  // Group by category and sum amounts
  const grouped = expenseTransactions.reduce((acc: Record<string, number>, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});
  
  // Convert to chart format
  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value
  }));
};
