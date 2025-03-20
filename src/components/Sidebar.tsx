
import { LayoutDashboard, DollarSign, CreditCard, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-[280px] border-r border-border bg-white shadow-sm p-4 flex flex-col animate-slide-in">
      <div className="flex flex-col items-center mb-8 mt-4">
        <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden mb-3">
          <img 
            src="/lovable-uploads/4631c719-bfe5-4755-9c71-3ac3caef203c.png" 
            alt="User avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold">Mike William</h2>
      </div>
      
      <nav className="space-y-2 flex-1">
        <NavLink to="/dashboard" className={({ isActive }) => 
          `nav-link ${isActive ? 'active' : ''}`
        }>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/income" className={({ isActive }) => 
          `nav-link ${isActive ? 'active' : ''}`
        }>
          <DollarSign size={20} />
          <span>Income</span>
        </NavLink>
        
        <NavLink to="/expenses" className={({ isActive }) => 
          `nav-link ${isActive ? 'active' : ''}`
        }>
          <CreditCard size={20} />
          <span>Expenses</span>
        </NavLink>
      </nav>
      
      <button className="nav-link mt-auto mb-4 text-red-500 hover:bg-red-50 hover:text-red-600">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
