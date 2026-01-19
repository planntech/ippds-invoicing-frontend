import { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Send,
  Search,
  Filter,
  Printer,
  CheckCircle,
  Clock,
  Mail,
  CreditCard,
  Calendar,
  DollarSign,
  Users,
  Receipt as ReceiptIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import modal
import ReceiptPreviewModal from './ReceiptPreviewModal';

export default function ReceiptManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<number>(2026);

  // Receipt data
  const receipts = [
    {
      id: 1,
      receiptNumber: 'RCP-2026-001',
      invoiceNumber: 'INV-2026-001',
      customer: 'Acme Corporation',
      customerId: 1,
      receiptDate: '2026-01-20',
      paymentDate: '2026-01-20',
      amount: 535000,
      currency: 'THB',
      paymentMethod: 'Bank Transfer',
      paymentReference: 'TXN-123456',
      status: 'sent',
      createdAt: '2026-01-20 14:30',
      sentAt: '2026-01-20 14:35',
      sentTo: 'finance@acme.com',
      paidFor: [
        { invoiceNumber: 'INV-2026-001', amount: 535000 },
      ],
    },
    {
      id: 2,
      receiptNumber: 'RCP-2026-002',
      invoiceNumber: 'INV-2026-002',
      customer: 'Tech Solutions Ltd',
      customerId: 2,
      receiptDate: '2026-01-15',
      paymentDate: '2026-01-15',
      amount: 5000,
      currency: 'USD',
      fxRate: 35.5,
      thbAmount: 177500,
      paymentMethod: 'Credit Card',
      paymentReference: 'CC-789012',
      cardLast4: '4242',
      cardBrand: 'Visa',
      status: 'sent',
      createdAt: '2026-01-15 16:20',
      sentAt: '2026-01-15 16:22',
      sentTo: 'accounts@techsolutions.com',
      paidFor: [
        { invoiceNumber: 'INV-2026-002', amount: 5000 },
      ],
    },
    {
      id: 3,
      receiptNumber: 'RCP-2026-003',
      invoiceNumber: 'INV-2026-001',
      customer: 'Acme Corporation',
      customerId: 1,
      receiptDate: '2026-01-18',
      paymentDate: '2026-01-18',
      amount: 250000,
      currency: 'THB',
      paymentMethod: 'PromptPay QR',
      paymentReference: 'QR-456789',
      status: 'draft',
      createdAt: '2026-01-18 10:15',
      sentAt: null,
      sentTo: null,
      paidFor: [
        { invoiceNumber: 'INV-2026-001', amount: 250000 },
      ],
    },
    {
      id: 4,
      receiptNumber: 'RCP-2026-004',
      invoiceNumber: 'Multiple',
      customer: 'Global Industries',
      customerId: 3,
      receiptDate: '2026-01-19',
      paymentDate: '2026-01-19',
      amount: 1200000,
      currency: 'THB',
      paymentMethod: 'Bank Transfer',
      paymentReference: 'WIRE-111222',
      status: 'sent',
      createdAt: '2026-01-19 11:30',
      sentAt: '2026-01-19 11:35',
      sentTo: 'billing@global.com',
      paidFor: [
        { invoiceNumber: 'INV-2026-003', amount: 856000 },
        { invoiceNumber: 'INV-2026-005', amount: 344000 },
      ],
    },
  ];

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      THB: '฿',
      USD: '$',
      EUR: '€',
      GBP: '£',
      SGD: 'S$',
      RUB: '₽',
    };
    const symbol = symbols[currency] || currency;
    return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'sent':
        return {
          label: 'Sent',
          className: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle,
        };
      case 'draft':
        return {
          label: 'Draft',
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: FileText,
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: FileText,
        };
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    if (method.includes('Card')) return '💳';
    if (method.includes('QR')) return '📱';
    if (method.includes('Transfer')) return '🏦';
    if (method.includes('Cash')) return '💵';
    return '💰';
  };

  // Filter receipts
  const filteredReceipts = receipts.filter((receipt) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !receipt.receiptNumber.toLowerCase().includes(query) &&
        !receipt.invoiceNumber.toLowerCase().includes(query) &&
        !receipt.customer.toLowerCase().includes(query) &&
        !(receipt.paymentReference || '').toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    if (filterStatus !== 'all' && receipt.status !== filterStatus) {
      return false;
    }

    return true;
  });

  // Calculate statistics
  const stats = {
    totalReceipts: receipts.length,
    sent: receipts.filter((r) => r.status === 'sent').length,
    draft: receipts.filter((r) => r.status === 'draft').length,
    todayAmount: receipts
      .filter((r) => r.receiptDate === '2026-01-20')
      .reduce((sum, r) => sum + (r.thbAmount || r.amount), 0),
    thisMonthAmount: receipts.reduce((sum, r) => sum + (r.thbAmount || r.amount), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Receipt Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Auto-generated payment receipts with professional templates
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Receipts</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalReceipts}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <ReceiptIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sent</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.sent}</p>
              </div>
              <div className="w-10 h-10 bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Draft</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.draft}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {formatCurrency(stats.todayAmount, 'THB')}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {formatCurrency(stats.thisMonthAmount, 'THB')}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by receipt #, invoice #, customer, or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border-gray-300"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="sent">Sent</option>
                <option value="draft">Draft</option>
              </select>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipts Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Receipt #
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Invoice / Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Receipt Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Payment Method
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReceipts.map((receipt) => {
                  const statusConfig = getStatusConfig(receipt.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <tr key={receipt.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#2f2d77]">
                            {receipt.receiptNumber}
                          </span>
                        </div>
                        {receipt.paymentReference && (
                          <p className="text-xs text-gray-500 mt-1">
                            Ref: {receipt.paymentReference}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {receipt.invoiceNumber}
                          </p>
                          <p className="text-xs text-gray-600">{receipt.customer}</p>
                          {receipt.paidFor.length > 1 && (
                            <p className="text-xs text-blue-600 mt-1">
                              {receipt.paidFor.length} invoices
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{receipt.receiptDate}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(receipt.amount, receipt.currency)}
                          </p>
                          {receipt.currency !== 'THB' && receipt.thbAmount && (
                            <p className="text-xs text-gray-500">
                              {formatCurrency(receipt.thbAmount, 'THB')} @ {receipt.fxRate}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getPaymentMethodIcon(receipt.paymentMethod)}</span>
                          <div>
                            <p className="text-sm text-gray-900">{receipt.paymentMethod}</p>
                            {receipt.cardLast4 && (
                              <p className="text-xs text-gray-500">
                                {receipt.cardBrand} •••• {receipt.cardLast4}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* View */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedReceipt(receipt);
                              setShowPreviewModal(true);
                            }}
                            title="View Receipt"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>

                          {/* Download PDF */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                            title="Download PDF"
                          >
                            <Download className="h-4 w-4 text-blue-600" />
                          </Button>

                          {/* Print */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            title="Print Receipt"
                          >
                            <Printer className="h-4 w-4 text-gray-600" />
                          </Button>

                          {/* Send/Resend Email */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-green-50"
                            title={receipt.status === 'sent' ? 'Resend Email' : 'Send Email'}
                          >
                            <Mail className="h-4 w-4 text-green-600" />
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

      {/* Receipt Preview Modal */}
      <ReceiptPreviewModal
        open={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setSelectedReceipt(null);
        }}
        receipt={selectedReceipt}
      />
    </div>
  );
}