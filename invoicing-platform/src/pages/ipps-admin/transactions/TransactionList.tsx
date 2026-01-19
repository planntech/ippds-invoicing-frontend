// src/pages/admin/transactions/TransactionList.tsx
import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TransactionList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const transactions = [
    {
      id: 'TXN-2026-001234',
      tenant: 'Acme Corporation Ltd.',
      amount: 15750.0,
      currency: 'THB',
      method: 'Thai QR',
      status: 'completed',
      date: '2026-01-19 14:35:22',
      fee: 236.25,
      net: 15513.75,
    },
    {
      id: 'TXN-2026-001233',
      tenant: 'Global Trading Co.',
      amount: 8920.5,
      currency: 'THB',
      method: 'Credit Card',
      status: 'completed',
      date: '2026-01-19 13:20:15',
      fee: 223.01,
      net: 8697.49,
    },
    {
      id: 'TXN-2026-001232',
      tenant: 'Tech Startup Inc.',
      amount: 2450.0,
      currency: 'THB',
      method: 'Thai QR',
      status: 'pending',
      date: '2026-01-19 12:15:30',
      fee: 36.75,
      net: 2413.25,
    },
    {
      id: 'TXN-2026-001231',
      tenant: 'Digital Solutions Co.',
      amount: 12300.0,
      currency: 'THB',
      method: 'SBP QR',
      status: 'completed',
      date: '2026-01-19 11:45:10',
      fee: 246.0,
      net: 12054.0,
    },
    {
      id: 'TXN-2026-001230',
      tenant: 'Manufacturing Plus Ltd.',
      amount: 5670.0,
      currency: 'THB',
      method: 'Credit Card',
      status: 'failed',
      date: '2026-01-19 10:30:45',
      fee: 0,
      net: 0,
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          className: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle2,
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
        };
      case 'failed':
        return {
          label: 'Failed',
          className: 'bg-red-50 text-red-700 border-red-200',
          icon: XCircle,
        };
      case 'refunded':
        return {
          label: 'Refunded',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: AlertCircle,
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-700 border-gray-300',
          icon: AlertCircle,
        };
    }
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.tenant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalVolume = transactions
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalFees = transactions
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.fee, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">All Transactions</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor all payment transactions</p>
        </div>
        <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 mb-1">Total Volume</p>
            <p className="text-2xl font-semibold text-gray-900">
              ฿{totalVolume.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 mb-1">Total Fees</p>
            <p className="text-2xl font-semibold text-gray-900">฿{totalFees.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 mb-1">Transactions</p>
            <p className="text-2xl font-semibold text-gray-900">{transactions.length}</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 mb-1">Success Rate</p>
            <p className="text-2xl font-semibold text-gray-900">
              {(
                (transactions.filter((t) => t.status === 'completed').length /
                  transactions.length) *
                100
              ).toFixed(1)}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-medium text-gray-700">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by transaction ID or tenant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Status</Label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Date Range</Label>
              <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Transaction ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Tenant
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Method
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Fee
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((txn) => {
                  const statusConfig = getStatusConfig(txn.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <p className="text-sm font-mono font-medium text-[#2f2d77]">{txn.id}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{txn.tenant}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-gray-900">
                          {txn.currency === 'THB' ? '฿' : '$'}
                          {txn.amount.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 text-xs">
                          {txn.method}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600">฿{txn.fee.toLocaleString()}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600">{txn.date}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <Eye className="h-4 w-4 text-gray-600" />
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
    </div>
  );
}