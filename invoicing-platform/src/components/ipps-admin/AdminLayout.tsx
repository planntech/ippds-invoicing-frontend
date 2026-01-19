// src/components/admin/AdminLayout.tsx
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['tenants']);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
    },
    {
      id: 'tenants',
      label: 'Tenant Management',
      icon: Building2,
      subItems: [
        { id: 'all-tenants', label: 'All Tenants', path: '/admin/tenants' },
        { id: 'fee-config', label: 'Fee Configuration', path: '/admin/tenants/fees' },
        { id: 'allowed-payments', label: 'Allowed Payments', path: '/admin/tenants/payments' },
      ],
    },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      icon: CreditCard,
      path: '/admin/subscriptions',
    },
    {
      id: 'plans',
      label: 'Plans & Pricing',
      icon: Package,
      path: '/admin/plans',
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: DollarSign,
      path: '/admin/transactions',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      subItems: [
        { id: 'subscription-report', label: 'Subscription Report', path: '/admin/reports/subscriptions' },
        { id: 'revenue-report', label: 'Revenue Report', path: '/admin/reports/revenue' },
        { id: 'usage-report', label: 'Usage Report', path: '/admin/reports/usage' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: Activity,
      path: '/admin/analytics',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
  ];

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-gray-900 lg:hidden"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#2f2d77] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">IP</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">IPPS Admin</h1>
                <p className="text-xs text-gray-500">Tenant Management Portal</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@ipps.com</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedMenus.includes(item.id);

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleSubmenu(item.id);
                    } else {
                      setActiveMenu(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors ${
                    activeMenu === item.id
                      ? 'bg-[#2f2d77]/10 text-[#2f2d77]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {hasSubItems && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isExpanded ? 'transform rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {hasSubItems && isExpanded && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => setActiveMenu(subItem.id)}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                          activeMenu === subItem.id
                            ? 'text-[#2f2d77] font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        <div className="p-6">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}