import { useState } from 'react';
import {
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  Calendar,
  Download,
  Filter,
  Search,
  ChevronDown,
  BarChart3,
  PieChart,
  LineChart,
  FileBarChart,
  Receipt,
  Wallet,
  CreditCard,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Settings,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Reports() {
  const [activeCategory, setActiveCategory] = useState('overview');
  const [dateRange, setDateRange] = useState('this-month');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const reportCategories = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'financial', label: 'Financial Reports', icon: DollarSign },
    { id: 'sales', label: 'Sales & Revenue', icon: TrendingUp },
    { id: 'invoices', label: 'Invoice Reports', icon: Receipt },
    { id: 'payments', label: 'Payment Reports', icon: Wallet },
    { id: 'customers', label: 'Customer Reports', icon: Users },
    { id: 'branch', label: 'Branch Performance', icon: Building2 },
  ];

  // Quick Stats Data
  const quickStats = [
    {
      label: 'Total Revenue',
      value: '฿2,847,500',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
    },
    {
      label: 'Outstanding Invoices',
      value: '฿458,920',
      change: '-8.3%',
      trend: 'down',
      icon: Receipt,
      color: 'amber',
    },
    {
      label: 'Total Customers',
      value: '1,247',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Payment Success Rate',
      value: '94.8%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle2,
      color: 'green',
    },
  ];

  // Financial Reports
  const financialReports = [
    {
      id: 1,
      name: 'Profit & Loss Statement',
      description: 'Detailed income and expense report',
      icon: TrendingUp,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 2,
      name: 'Balance Sheet',
      description: 'Assets, liabilities, and equity overview',
      icon: FileBarChart,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel'],
    },
    {
      id: 3,
      name: 'Cash Flow Statement',
      description: 'Track cash inflows and outflows',
      icon: Wallet,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 4,
      name: 'General Ledger',
      description: 'Complete transaction history',
      icon: FileText,
      frequency: 'Daily',
      lastGenerated: '2026-01-19',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 5,
      name: 'Trial Balance',
      description: 'Account balances verification',
      icon: BarChart3,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel'],
    },
    {
      id: 6,
      name: 'Tax Summary Report',
      description: 'VAT and tax obligations summary',
      icon: Receipt,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel'],
    },
  ];

  // Sales Reports
  const salesReports = [
    {
      id: 1,
      name: 'Sales by Period',
      description: 'Revenue breakdown by time period',
      icon: LineChart,
      frequency: 'Custom',
      lastGenerated: '2026-01-19',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 2,
      name: 'Sales by Product/Service',
      description: 'Top performing products and services',
      icon: Package,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 3,
      name: 'Sales by Customer',
      description: 'Revenue breakdown by customer',
      icon: Users,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 4,
      name: 'Sales by Branch',
      description: 'Performance comparison across branches',
      icon: Building2,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 5,
      name: 'Revenue Forecast',
      description: 'Projected revenue based on trends',
      icon: TrendingUp,
      frequency: 'Quarterly',
      lastGenerated: '2026-01-10',
      format: ['PDF', 'Excel'],
    },
  ];

  // Invoice Reports
  const invoiceReports = [
    {
      id: 1,
      name: 'Invoice Aging Report',
      description: 'Outstanding invoices by age',
      icon: Clock,
      frequency: 'Weekly',
      lastGenerated: '2026-01-18',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 2,
      name: 'Paid Invoices Summary',
      description: 'All paid invoices in period',
      icon: CheckCircle2,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 3,
      name: 'Overdue Invoices',
      description: 'Invoices past due date',
      icon: AlertCircle,
      frequency: 'Weekly',
      lastGenerated: '2026-01-18',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 4,
      name: 'Voided/Cancelled Invoices',
      description: 'Cancelled and voided invoices',
      icon: XCircle,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 5,
      name: 'Invoice Summary by Status',
      description: 'Invoice breakdown by current status',
      icon: PieChart,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
  ];

  // Payment Reports
  const paymentReports = [
    {
      id: 1,
      name: 'Payment Collection Report',
      description: 'All payments received in period',
      icon: Wallet,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 2,
      name: 'Payment Method Analysis',
      description: 'Breakdown by payment method',
      icon: CreditCard,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 3,
      name: 'Failed Payments Report',
      description: 'Failed and declined transactions',
      icon: XCircle,
      frequency: 'Weekly',
      lastGenerated: '2026-01-18',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 4,
      name: 'Payment Gateway Reconciliation',
      description: 'Match payments with gateway records',
      icon: RefreshCw,
      frequency: 'Daily',
      lastGenerated: '2026-01-19',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 5,
      name: 'Refund & Chargeback Report',
      description: 'All refunds and chargebacks',
      icon: AlertCircle,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
  ];

  // Customer Reports
  const customerReports = [
    {
      id: 1,
      name: 'Customer List',
      description: 'Complete customer directory',
      icon: Users,
      frequency: 'On-demand',
      lastGenerated: '2026-01-19',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 2,
      name: 'Top Customers by Revenue',
      description: 'Highest value customers',
      icon: TrendingUp,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 3,
      name: 'Customer Acquisition Report',
      description: 'New customers by period',
      icon: Users,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 4,
      name: 'Customer Payment Behavior',
      description: 'Payment patterns and tendencies',
      icon: Clock,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 5,
      name: 'Inactive Customers',
      description: 'Customers with no recent activity',
      icon: AlertCircle,
      frequency: 'Quarterly',
      lastGenerated: '2026-01-10',
      format: ['PDF', 'Excel', 'CSV'],
    },
  ];

  // Branch Performance Reports
  const branchReports = [
    {
      id: 1,
      name: 'Branch Revenue Comparison',
      description: 'Compare revenue across all branches',
      icon: Building2,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 2,
      name: 'Branch Expense Analysis',
      description: 'Operating expenses by branch',
      icon: DollarSign,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 3,
      name: 'Branch Profitability',
      description: 'Profit margins by location',
      icon: TrendingUp,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
    {
      id: 4,
      name: 'Branch User Activity',
      description: 'User engagement by branch',
      icon: Users,
      frequency: 'Monthly',
      lastGenerated: '2026-01-15',
      format: ['PDF', 'Excel', 'CSV'],
    },
  ];

  const getReportsByCategory = () => {
    switch (activeCategory) {
      case 'financial':
        return financialReports;
      case 'sales':
        return salesReports;
      case 'invoices':
        return invoiceReports;
      case 'payments':
        return paymentReports;
      case 'customers':
        return customerReports;
      case 'branch':
        return branchReports;
      default:
        return [];
    }
  };

  const renderReportCard = (report: any) => {
    const Icon = report.icon;
    return (
      <Card key={report.id} className="border border-gray-200 hover:border-gray-300 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 bg-[#2f2d77]/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-[#2f2d77]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{report.frequency}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Last: {report.lastGenerated}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100 h-8 w-8 p-0"
            >
              <Settings className="h-4 w-4 text-gray-600" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-9 flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View Report
            </Button>
            <div className="relative">
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-9 px-3">
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">Export as:</span>
            {report.format.map((format: string) => (
              <Badge
                key={format}
                variant="outline"
                className="bg-gray-50 text-gray-700 border-gray-300 text-xs cursor-pointer hover:bg-gray-100"
              >
                {format}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generate and download business reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10">
            <FileText className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Date Range</Label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="this-week">This Week</option>
                <option value="last-week">Last Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="this-year">This Year</option>
                <option value="last-year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Branch</Label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
              >
                <option value="all">All Branches</option>
                <option value="hq-bkk">Bangkok Headquarters</option>
                <option value="br-cnx">Chiang Mai Branch</option>
                <option value="br-pkt">Phuket Branch</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Currency</Label>
              <select
                className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
              >
                <option value="thb">THB (฿)</option>
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 w-full">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      {activeCategory === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.trend === 'up';
            const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
            
            return (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 bg-${stat.color}-50 flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        isPositive
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      } text-xs`}
                    >
                      <TrendIcon className="h-3 w-3 mr-1" />
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Report Categories */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 overflow-x-auto">
          {reportCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${isActive 
                    ? 'border-[#2f2d77] text-[#2f2d77] bg-[#2f2d77]/5' 
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'}
                `}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Dashboard */}
      {activeCategory === 'overview' && (
        <div className="space-y-6">
          {/* Revenue Chart Placeholder */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">
                  Revenue Trend (Last 12 Months)
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-8">
                    <LineChart className="h-4 w-4 mr-1" />
                    Line
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-8">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Bar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Chart</h3>
              <p className="text-gray-500">Chart visualization will be displayed here</p>
            </CardContent>
          </Card>

          {/* Quick Access Reports */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Most Used Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {financialReports.slice(0, 3).map(renderReportCard)}
            </div>
          </div>

          {/* Recent Reports */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">
                Recently Generated Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Report Name
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Generated
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Period
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: 'General Ledger', type: 'Financial', date: '2026-01-19 09:30', period: 'Jan 2026' },
                      { name: 'Invoice Aging Report', type: 'Invoices', date: '2026-01-18 14:15', period: 'Jan 2026' },
                      { name: 'Sales by Period', type: 'Sales', date: '2026-01-18 11:20', period: 'Dec 2025' },
                      { name: 'Payment Collection', type: 'Payments', date: '2026-01-17 16:45', period: 'Dec 2025' },
                      { name: 'Profit & Loss', type: 'Financial', date: '2026-01-15 10:00', period: 'Dec 2025' },
                    ].map((report, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <p className="text-sm font-medium text-gray-900">{report.name}</p>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 text-xs">
                            {report.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-gray-600">{report.date}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-gray-600">{report.period}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <Download className="h-4 w-4 text-gray-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Report Lists */}
      {activeCategory !== 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {reportCategories.find(c => c.id === activeCategory)?.label}
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reports..."
                  className="pl-10 h-10 w-64 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getReportsByCategory().map(renderReportCard)}
          </div>
        </div>
      )}
    </div>
  );
}