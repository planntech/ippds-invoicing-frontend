import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Users,
  FileEdit,
  MoreVertical,
  Download,
  Send,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DashboardContent() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '฿2,345,678',
      change: '+12.5%',
      changeType: 'positive',
      period: 'vs last month',
      icon: DollarSign,
      trend: [40, 45, 38, 55, 62, 58, 72],
    },
    {
      title: 'Outstanding',
      value: '฿456,789',
      change: '-3.1%',
      changeType: 'negative',
      period: 'vs last month',
      icon: Clock,
      trend: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      title: 'Paid Invoices',
      value: '142',
      change: '+8.2%',
      changeType: 'positive',
      period: 'this month',
      icon: CheckCircle2,
      trend: [30, 40, 35, 50, 49, 60, 70],
    },
    {
      title: 'Overdue',
      value: '14',
      change: '+2',
      changeType: 'negative',
      period: 'requires attention',
      icon: AlertTriangle,
      trend: [10, 12, 8, 15, 13, 14, 14],
    },
  ];

  const recentInvoices = [
    {
      id: 'INV-2026-001',
      customer: 'Acme Corporation',
      amount: '฿45,000.00',
      status: 'paid',
      dueDate: '2026-01-02',
    },
    {
      id: 'INV-2026-002',
      customer: 'Tech Solutions Ltd',
      amount: '฿32,500.00',
      status: 'pending',
      dueDate: '2026-01-15',
    },
    {
      id: 'INV-2025-156',
      customer: 'Global Industries',
      amount: '฿67,800.00',
      status: 'overdue',
      dueDate: '2025-12-28',
    },
    {
      id: 'INV-2026-003',
      customer: 'Smart Systems Co',
      amount: '฿28,900.00',
      status: 'paid',
      dueDate: '2025-12-30',
    },
    {
      id: 'INV-2026-004',
      customer: 'Innovation Labs',
      amount: '฿54,200.00',
      status: 'pending',
      dueDate: '2026-01-20',
    },
  ];

  const recentActivities = [
    {
      type: 'payment',
      message: 'Payment received from Acme Corporation',
      amount: '฿45,000',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-green-600',
    },
    {
      type: 'invoice',
      message: 'Invoice sent to Innovation Labs',
      amount: '฿54,200',
      time: '4 hours ago',
      icon: Send,
      color: 'text-blue-600',
    },
    {
      type: 'customer',
      message: 'New customer added: Digital Ventures Ltd',
      amount: null,
      time: '1 day ago',
      icon: Users,
      color: 'text-gray-600',
    },
    {
      type: 'overdue',
      message: 'Invoice INV-2025-156 is now overdue',
      amount: '฿67,800',
      time: '2 days ago',
      icon: AlertTriangle,
      color: 'text-red-600',
    },
  ];

  const upcomingPayments = [
    { 
      customer: 'Tech Solutions Ltd', 
      amount: '฿32,500', 
      dueDate: '2026-01-15', 
      daysLeft: 8,
    },
    { 
      customer: 'Innovation Labs', 
      amount: '฿54,200', 
      dueDate: '2026-01-20', 
      daysLeft: 13,
    },
    { 
      customer: 'Future Corp', 
      amount: '฿41,000', 
      dueDate: '2026-01-25', 
      daysLeft: 18,
    },
  ];

  const quickActions = [
    {
      title: 'Create Invoice',
      description: 'Generate new invoice',
      icon: FileText,
    },
    {
      title: 'Create Quotation',
      description: 'Prepare new quote',
      icon: FileEdit,
    },
    {
      title: 'Add Customer',
      description: 'New customer record',
      icon: Users,
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          label: 'Paid',
          className: 'bg-green-50 text-green-700 border-green-200',
          dot: 'bg-green-500',
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'overdue':
        return {
          label: 'Overdue',
          className: 'bg-red-50 text-red-600 border-red-200',
          dot: 'bg-red-500',
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          dot: 'bg-gray-500',
        };
    }
  };

  const MiniChart: React.FC<{ data: number[] }> = ({ data = [] }) => {
    const max = data.length ? Math.max(...data) : 1;
    const points = data.map((value: number, index: number) => {
      const x = (index / Math.max(1, data.length - 1)) * 100;
      const y = 100 - (value / Math.max(1, max)) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back, John
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's what's happening with your business today
          </p>
        </div>
        <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.changeType === 'positive';
          return (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={`flex items-center font-medium ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-gray-500">{stat.period}</span>
                </div>
                <div className={`mt-3 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  <MiniChart data={stat.trend} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invoices */}
        <Card className="lg:col-span-2 border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-900">Recent Invoices</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#2f2d77] hover:bg-gray-100 font-medium h-9"
              >
                View all
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                      Invoice
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                      Due Date
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentInvoices.map((invoice) => {
                    const statusConfig = getStatusConfig(invoice.status);
                    return (
                      <tr key={invoice.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-[#2f2d77]">
                            {invoice.id}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-900">
                            {invoice.customer}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-gray-900">
                            {invoice.amount}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} mr-1.5`}></span>
                            {statusConfig.label}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">
                            {invoice.dueDate}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <Download className="h-4 w-4 text-gray-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
            <CardTitle className="text-base font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.message}
                      </p>
                      {activity.amount && (
                        <p className="text-sm font-medium text-gray-700 mt-0.5">
                          {activity.amount}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Payments */}
        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
            <CardTitle className="text-base font-semibold text-gray-900">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {payment.customer}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Due: {payment.dueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {payment.amount}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {payment.daysLeft} days left
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
            <CardTitle className="text-base font-semibold text-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="w-full flex items-center gap-4 p-4 border border-gray-200 hover:border-[#2f2d77] hover:bg-gray-50 transition-all group"
                  >
                    <div className="w-12 h-12 bg-[#2f2d77] flex items-center justify-center">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {action.description}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#2f2d77] transition-colors" />
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}