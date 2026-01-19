import { useState, ReactNode } from 'react';
import {
  LayoutDashboard,
  FileText,
  FileEdit,
  Users,
  Package,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
  Building2,
  Crown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import logo from '@/assets/logo.png';
import DashboardContent from './DashboardContent';
import CompanyProfile from './CompanyProfile';
import UserManagement from './UserManagement';
import SubscriptionManagement from './SubscriptionManagement';
import CustomerManagement from '../main-phase2/CustomerManagement';
import ProductManagement from '../main-phase2/ProductManagement';
import QuotationManagement from '../main-phase2.2/Quotations/QuotationManagement';
import InvoiceManagement from '../main-phase2.2/Invoices/InvoiceManagement';
import ReceiptManagement from '../main-phase2.2/Receipts/ReceiptManagement';

// ========================
// TYPES
// ========================
interface MenuItem {
  id: string;
  name: string;
  icon: LucideIcon;
  badge?: number;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface HeaderProps {
  onMenuClick: () => void;
  isCollapsed: boolean;
  onNavigateToProfile: () => void;
}

interface DashboardPageProps {
  children: ReactNode;
}

// ========================
// SIDEBAR COMPONENT
// ========================
function Sidebar({ isOpen, onClose, activeMenu, onMenuChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices', name: 'Invoices', icon: FileText, badge: 12 },
    { id: 'quotations', name: 'Quotations', icon: FileEdit, badge: 3 },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'settings', name: 'User Settings', icon: Settings },
  ];

  const bottomMenuItems: MenuItem[] = [
    { id: 'subscription', name: 'Subscription', icon: Crown },
  ];

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'w-16' : 'w-60'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className={`flex items-center justify-between h-16 border-b border-gray-200 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
          <div className="flex items-center w-full">
            <img 
              src={logo} 
              alt="IPPS Logo" 
              className={`w-full object-contain transition-all duration-300 ${isCollapsed ? 'h-10' : 'h-10'}`}
            />
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors ml-2 flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100vh - 204px)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => {
                    onMenuChange(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 text-sm font-medium transition-all
                    ${
                      isActive
                        ? 'bg-[#2f2d77] text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'} ${isCollapsed ? '' : 'flex-shrink-0'}`} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </div>
                  {!isCollapsed && item.badge && (
                    <Badge
                      variant="secondary"
                      className={`
                        ml-auto flex-shrink-0 text-xs
                        ${isActive ? 'bg-white/20 text-white border-0' : 'bg-gray-100 text-gray-600 border-0'}
                      `}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {isCollapsed && item.badge && (
                    <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-white text-[#2f2d77]' : 'bg-[#2f2d77] text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
                    {item.name}
                    {item.badge && <span className="ml-2 text-xs">({item.badge})</span>}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Menu (Subscription) */}
        <div className="px-2 py-3 border-t border-gray-200">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => {
                    onMenuChange(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 text-sm font-medium transition-all
                    ${
                      isActive
                        ? 'bg-[#2f2d77] text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'} ${isCollapsed ? '' : 'flex-shrink-0'}`} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </div>
                </button>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
                    {item.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-3 bg-white border-t border-gray-200">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3 p-2.5 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
              <div className="w-9 h-9 bg-[#2f2d77] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 truncate">john@company.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-9 h-9 bg-[#2f2d77] flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:bg-[#252351] transition-colors">
                  JD
                </div>
                {/* Tooltip */}
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
                  John Doe
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button - Desktop Only */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-300 rounded-full items-center justify-center text-gray-500 hover:text-[#2f2d77] hover:border-[#2f2d77] transition-all z-50"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </button>
      </aside>
    </>
  );
}

// ========================
// HEADER COMPONENT
// ========================
function Header({ onMenuClick, isCollapsed, onNavigateToProfile }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'lg:max-w-3xl' : 'lg:max-w-2xl'} mx-4`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search invoices, customers, products..."
              className="pl-10 h-10 border-gray-300 bg-white focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] transition-all text-sm"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <button 
            onClick={onNavigateToProfile}
            className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <Building2 className="h-4 w-4" />
            <span>Company Profile</span>
          </button>

          <button className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ========================
// MAIN DASHBOARD LAYOUT
// ========================
export default function DashboardPage({ children }: DashboardPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Render content based on active menu
  const renderContent = () => {
    if (children) {
      return children;
    }

    // Default content routing based on active menu
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardContent />;
      case 'customers':
        return <CustomerManagement />;
      case 'company-profile':
        return <CompanyProfile />;
      case 'invoices':
        return <InvoiceManagement />;
      case 'products':
        return <ProductManagement />;
      case 'quotations':
        return <QuotationManagement />;
      case 'payments':
        return <ReceiptManagement />;
      case 'settings':
        return <UserManagement />;
      case 'subscription':
        return <SubscriptionManagement />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
              </h3>
              <p className="text-gray-500">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:pl-16' : 'lg:pl-60'}`}>
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          isCollapsed={isCollapsed}
          onNavigateToProfile={() => setActiveMenu('company-profile')}
        />

        {/* Page Content */}
        <main className="p-6 bg-gray-50 min-h-screen">
          {renderContent()}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}