
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

const StatCard = ({ title, value, icon: Icon, className, iconClassName }: StatCardProps) => {
  return (
    <div className={cn("statistic-card", className)}>
      <div className={cn("expense-icon", iconClassName)}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
