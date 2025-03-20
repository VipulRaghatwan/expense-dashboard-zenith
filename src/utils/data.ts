
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

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  icon: any;
}

export interface IncomeSource {
  id: string;
  title: string;
  amount: number;
  date: string;
  icon: any;
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  icon: any;
}

export const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Shopping',
    amount: 450,
    type: 'expense',
    category: 'Shopping',
    date: '17th Feb 2025',
    icon: ShoppingBag
  },
  {
    id: '2',
    title: 'Travel',
    amount: 950,
    type: 'expense',
    category: 'Travel',
    date: '15th Feb 2025',
    icon: Plane
  },
  {
    id: '3',
    title: 'Salary',
    amount: 12000,
    type: 'income',
    category: 'Salary',
    date: '12th Feb 2025',
    icon: Briefcase
  },
  {
    id: '4',
    title: 'Electricity Bill',
    amount: 200,
    type: 'expense',
    category: 'Utilities',
    date: '11th Feb 2025',
    icon: Lightbulb
  },
  {
    id: '5',
    title: 'Loan Repayment',
    amount: 800,
    type: 'expense',
    category: 'Loan',
    date: '10th Feb 2025',
    icon: Home
  }
];

export const incomeSources: IncomeSource[] = [
  {
    id: '1',
    title: 'Salary',
    amount: 12000,
    date: '12th Feb 2025',
    icon: Briefcase
  },
  {
    id: '2',
    title: 'Interest from Savings',
    amount: 3600,
    date: '13th Jan 2025',
    icon: PiggyBank
  },
  {
    id: '3',
    title: 'E-commerce Sales',
    amount: 11900,
    date: '11th Jan 2025',
    icon: ShoppingCart
  },
  {
    id: '4',
    title: 'Graphic Design',
    amount: 10500,
    date: '10th Jan 2025',
    icon: Palette
  },
  {
    id: '5',
    title: 'Affiliate Marketing',
    amount: 8000,
    date: '9th Jan 2025',
    icon: BadgeDollarSign
  }
];

export const expenses: ExpenseItem[] = [
  {
    id: '1',
    title: 'Shopping',
    amount: 450,
    date: '17th Feb 2025',
    icon: ShoppingBag
  },
  {
    id: '2',
    title: 'Travel',
    amount: 950,
    date: '15th Feb 2025',
    icon: Plane
  },
  {
    id: '3',
    title: 'Electricity Bill',
    amount: 200,
    date: '11th Feb 2025',
    icon: Lightbulb
  },
  {
    id: '4',
    title: 'Loan Repayment',
    amount: 800,
    date: '10th Feb 2025',
    icon: Home
  },
  {
    id: '5',
    title: 'Groceries',
    amount: 320,
    date: '5th Feb 2025',
    icon: ShoppingCart
  }
];

export const monthlyIncome = [
  { name: '1st Jan', amount: 10500 },
  { name: '4th Jan', amount: 8800 },
  { name: '8th Jan', amount: 9200 },
  { name: '12th Jan', amount: 7500 },
  { name: '15th Jan', amount: 10800 },
  { name: '20th Jan', amount: 9100 },
  { name: '24th Jan', amount: 8000 },
  { name: '28th Jan', amount: 9800 },
  { name: '1st Feb', amount: 11200 },
  { name: '6th Feb', amount: 9500 },
  { name: '12th Feb', amount: 12000 },
];

export const incomeSourcesData = [
  { name: 'Salary', value: 48000 },
  { name: 'Interest from Savings', value: 7200 },
  { name: 'E-commerce Sales', value: 23800 },
  { name: 'Graphic Design', value: 19200 }
];

export const expenseCategories = [
  { name: 'Housing', value: 1500 },
  { name: 'Food', value: 850 },
  { name: 'Transportation', value: 400 },
  { name: 'Utilities', value: 350 },
  { name: 'Entertainment', value: 250 }
];

export const calculateTotals = () => {
  const totalIncome = incomeSources.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;
  
  return {
    income: totalIncome,
    expenses: totalExpenses,
    balance
  };
};
