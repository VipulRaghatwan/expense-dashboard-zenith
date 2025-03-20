
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionItemProps {
  title: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  icon: LucideIcon;
}

const TransactionItem = ({ title, date, amount, type, icon: Icon }: TransactionItemProps) => {
  return (
    <div className="transaction-item">
      <div className="flex items-center gap-3">
        <div className="expense-icon">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      <span className={cn(
        "font-semibold",
        type === 'income' ? 'text-income' : 'text-expense'
      )}>
        {type === 'income' ? '+' : '-'} ${amount.toLocaleString()}
      </span>
    </div>
  );
};

export default TransactionItem;
