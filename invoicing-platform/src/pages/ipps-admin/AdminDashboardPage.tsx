// src/pages/admin/AdminDashboardPage.tsx
import { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  DollarSign,
  FileText,
  Settings,
  Package,
  Activity,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LucideIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Import all admin page components
import AdminDashboard from './AdminDashboard';
import TenantList from './tenants/TenantList';
import FeeConfiguration from './tenants/FeeConfiguration';
import AllowedPayments from './tenants/AllowedPayments';
import TransactionList from './transactions/TransactionList';
import SubscriptionReport from './reports/SubscriptionReport';

// ========================
// TYPES
// ========================
interface MenuItem {
  id: string;
  name: string;
  icon: LucideIcon;
  badge?: number;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  name: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeMenu: string;
  onMenuChange: (menuId: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  expandedMenus: string[];
  onToggleExpand: (menuId: string) => void;
}

interface HeaderProps {
  onMenuClick: () => void;
  isCollapsed: boolean;
}

// ========================
// SIDEBAR COMPONENT
// ========================
function Sidebar({
  isOpen,
  onClose,
  activeMenu,
  onMenuChange,
  isCollapsed,
  onToggleCollapse,
  expandedMenus,
  onToggleExpand,
}: SidebarProps) {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'tenants',
      name: 'Tenant Management',
      icon: Building2,
      badge: 5,
      subItems: [
        { id: 'all-tenants', name: 'All Tenants' },
        { id: 'fee-config', name: 'Fee Configuration' },
        { id: 'allowed-payments', name: 'Allowed Payments' },
      ],
    },
    { id: 'subscriptions', name: 'Subscriptions', icon: CreditCard },
    { id: 'plans', name: 'Plans & Pricing', icon: Package },
    { id: 'transactions', name: 'Transactions', icon: DollarSign },
    {
      id: 'reports',
      name: 'Reports',
      icon: FileText,
      subItems: [
        { id: 'subscription-report', name: 'Subscription Report' },
        { id: 'revenue-report', name: 'Revenue Report' },
        { id: 'usage-report', name: 'Usage Report' },
      ],
    },
    { id: 'analytics', name: 'Analytics', icon: Activity },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const isMenuActive = (menuId: string, subItems?: SubMenuItem[]) => {
    if (activeMenu === menuId) return true;
    if (subItems) {
      return subItems.some((item) => activeMenu === item.id);
    }
    return false;
  };

  return (
    <>
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'w-16' : 'w-64'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div
          className={`flex items-center justify-between h-16 border-b border-gray-200 transition-all duration-300 ${
            isCollapsed ? 'px-2' : 'px-4'
          }`}
        >
          <div className="flex items-center gap-2 w-full">
            <div className="w-8 h-8 bg-[#2f2d77] rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">IP</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-sm font-semibold text-gray-900">IPPS Admin</h1>
                <p className="text-xs text-gray-500">Management Portal</p>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors ml-2 flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 px-2 py-4 space-y-1 overflow-y-auto"
          style={{ height: 'calc(100vh - 140px)' }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isMenuActive(item.id, item.subItems);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus.includes(item.id);

            return (
              <div key={item.id}>
                <div className="relative group">
                  <button
                    onClick={() => {
                      if (hasSubItems && !isCollapsed) {
                        onToggleExpand(item.id);
                      } else if (!hasSubItems) {
                        onMenuChange(item.id);
                        onClose();
                      } else {
                        // Collapsed state with submenu - go to first submenu item
                        onMenuChange(item.subItems![0].id);
                        onClose();
                      }
                    }}
                    className={`
                      w-full flex items-center ${
                        isCollapsed ? 'justify-center' : 'justify-between'
                      } px-3 py-2.5 text-sm font-medium transition-all rounded
                      ${
                        isActive
                          ? 'bg-[#2f2d77] text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
                      <Icon
                        className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'} ${
                          isCollapsed ? '' : 'flex-shrink-0'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className={`
                              ml-auto flex-shrink-0 text-xs
                              ${
                                isActive
                                  ? 'bg-white/20 text-white border-0'
                                  : 'bg-gray-100 text-gray-600 border-0'
                              }
                            `}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {hasSubItems && (
                          <ChevronDown
                            className={`h-4 w-4 ml-2 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge && (
                      <span
                        className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                          isActive ? 'bg-white text-[#2f2d77]' : 'bg-[#2f2d77] text-white'
                        }`}
                      >
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

                {/* Submenu Items */}
                {hasSubItems && !isCollapsed && isExpanded && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          onMenuChange(subItem.id);
                          onClose();
                        }}
                        className={`
                          w-full text-left px-3 py-2 text-sm transition-colors rounded
                          ${
                            activeMenu === subItem.id
                              ? 'text-[#2f2d77] font-medium bg-[#2f2d77]/5'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }
                        `}
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-3 bg-white border-t border-gray-200">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3 p-2.5 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer rounded">
              <div className="w-9 h-9 bg-[#2f2d77] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 rounded">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@ipps.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-9 h-9 bg-[#2f2d77] flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:bg-[#252351] transition-colors rounded">
                  AD
                </div>
                {/* Tooltip */}
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap pointer-events-none z-50">
                  Admin User
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
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>
    </>
  );
}

// ========================
// HEADER COMPONENT
// ========================
function Header({ onMenuClick, isCollapsed }: HeaderProps) {
  const handleLogout = () => {
    // Add logout logic here
    window.location.href = '/admin/login';
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all rounded"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? 'lg:max-w-3xl' : 'lg:max-w-2xl'
          } mx-4`}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search tenants, transactions, subscriptions..."
              className="pl-10 h-10 border-gray-300 bg-white focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] transition-all text-sm"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all rounded">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-all rounded"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ========================
// MAIN ADMIN DASHBOARD PAGE
// ========================
export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['tenants', 'reports']);

  const toggleExpand = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]
    );
  };

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'all-tenants':
        return <TenantList />;
      case 'fee-config':
        return <FeeConfiguration />;
      case 'allowed-payments':
        return <AllowedPayments />;
      case 'transactions':
        return <TransactionList />;
      case 'subscription-report':
        return <SubscriptionReport />;
      case 'subscriptions':
      case 'plans':
      case 'revenue-report':
      case 'usage-report':
      case 'analytics':
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4 rounded">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeMenu.charAt(0).toUpperCase() +
                  activeMenu.slice(1).replace('-', ' ')}
              </h3>
              <p className="text-gray-500">This section is under development</p>
            </div>
          </div>
        );
      default:
        return <AdminDashboard />;
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
        expandedMenus={expandedMenus}
        onToggleExpand={toggleExpand}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} isCollapsed={isCollapsed} />

        {/* Page Content */}
        <main className="p-6 bg-gray-50 min-h-screen">{renderContent()}</main>
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