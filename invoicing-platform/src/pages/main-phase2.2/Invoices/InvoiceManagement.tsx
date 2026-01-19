import { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Send,
  Copy,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign,
  Calendar,
  Users,
  CreditCard,
  FileCheck,
  Ban,
  Mail,
  CheckSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import modals
import InvoiceFormModal from './InvoiceFormModal';
import InvoicePreviewModal from './InvoicePreviewModal';
import SendInvoiceModal from './SendInvoiceModal';
import PaymentModal from './PaymentModal';
import CreditNoteModal from './CreditNoteModal';
import RecurringInvoiceModal from './RecurringInvoiceModal';

export default function InvoiceManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCreditNoteModal, setShowCreditNoteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<number>(2026);

  // Invoice data with multi-currency
  const invoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2026-001',
      customer: 'Acme Corporation',
      customerId: 1,
      issueDate: '2026-01-05',
      dueDate: '2026-02-04',
      currency: 'THB',
      fxRate: 1,
      subtotal: 500000,
      discount: 0,
      vat: 35000,
      wht: 0,
      whtRate: 0,
      totalAmount: 535000,
      paidAmount: 535000,
      outstanding: 0,
      expectedBaseAmount: 535000,
      status: 'paid',
      paymentTerms: 'Net 30',
      customerPO: 'PO-2026-123',
      source: 'manual',
      includeVat: true,
      items: [
        { id: 1, description: 'API Integration Service', qty: 1, unitPrice: 250000, discount: 0, lineTotal: 250000 },
        { id: 2, description: 'Custom Development (40 hours)', qty: 40, unitPrice: 5000, discount: 0, lineTotal: 200000 },
        { id: 3, description: 'Project Management', qty: 1, unitPrice: 100000, discount: 50000, lineTotal: 50000 },
      ],
      payments: [
        { date: '2026-01-20', amount: 535000, method: 'Bank Transfer', reference: 'TXN-123456' },
      ],
    },
    {
      id: 2,
      invoiceNumber: 'INV-2026-002',
      customer: 'Tech Solutions Ltd',
      customerId: 2,
      issueDate: '2026-01-06',
      dueDate: '2026-02-05',
      currency: 'USD',
      fxRate: 35.5,
      subtotal: 10000,
      discount: 500,
      vat: 665,
      wht: 285,
      whtRate: 0.03,
      totalAmount: 10165,
      paidAmount: 5000,
      outstanding: 5165,
      expectedBaseAmount: 360857.5,
      status: 'partially_paid',
      paymentTerms: 'Net 30',
      customerPO: '',
      source: 'quotation',
      quotationRef: 'QT-2026-002',
      includeVat: true,
      items: [
        { id: 1, description: 'Consulting Services', qty: 20, unitPrice: 500, discount: 0, lineTotal: 10000 },
      ],
      payments: [
        { date: '2026-01-15', amount: 5000, method: 'Credit Card', reference: 'CC-789012' },
      ],
    },
    {
      id: 3,
      invoiceNumber: 'INV-2026-003',
      customer: 'Global Industries',
      customerId: 3,
      issueDate: '2026-01-07',
      dueDate: '2026-02-06',
      currency: 'THB',
      fxRate: 1,
      subtotal: 800000,
      discount: 0,
      vat: 56000,
      wht: 0,
      whtRate: 0,
      totalAmount: 856000,
      paidAmount: 0,
      outstanding: 856000,
      expectedBaseAmount: 856000,
      status: 'sent',
      paymentTerms: 'Net 60',
      customerPO: 'PO-2026-456',
      source: 'manual',
      includeVat: true,
      items: [
        { id: 1, description: 'Enterprise Software License', qty: 5, unitPrice: 100000, discount: 0, lineTotal: 500000 },
        { id: 2, description: 'Implementation Services', qty: 1, unitPrice: 300000, discount: 0, lineTotal: 300000 },
      ],
      payments: [],
    },
    {
      id: 4,
      invoiceNumber: 'INV-2026-004',
      customer: 'Ministry of Commerce',
      customerId: 4,
      issueDate: '2025-12-20',
      dueDate: '2026-01-09',
      currency: 'THB',
      fxRate: 1,
      subtotal: 1200000,
      discount: 0,
      vat: 0,
      wht: 60000,
      whtRate: 0.05,
      totalAmount: 1200000,
      paidAmount: 0,
      outstanding: 1140000,
      expectedBaseAmount: 1140000,
      status: 'overdue',
      paymentTerms: 'Net 30',
      customerPO: 'GOV-2025-789',
      source: 'api',
      includeVat: false,
      items: [
        { id: 1, description: 'Government Solution Package', qty: 1, unitPrice: 1200000, discount: 0, lineTotal: 1200000 },
      ],
      payments: [],
      daysPastDue: 1,
    },
    {
      id: 5,
      invoiceNumber: 'INV-2026-005',
      customer: 'Startup Inc',
      customerId: 5,
      issueDate: '2026-01-08',
      dueDate: '2026-02-07',
      currency: 'EUR',
      fxRate: 38.2,
      subtotal: 5000,
      discount: 0,
      vat: 350,
      wht: 0,
      whtRate: 0,
      totalAmount: 5350,
      paidAmount: 0,
      outstanding: 5350,
      expectedBaseAmount: 204370,
      status: 'draft',
      paymentTerms: 'Net 15',
      customerPO: '',
      source: 'manual',
      includeVat: true,
      items: [
        { id: 1, description: 'Starter Package', qty: 1, unitPrice: 3000, discount: 0, lineTotal: 3000 },
        { id: 2, description: 'Setup & Training', qty: 1, unitPrice: 2000, discount: 0, lineTotal: 2000 },
      ],
      payments: [],
    },
    {
      id: 6,
      invoiceNumber: 'INV-2026-006',
      customer: 'Retail Corp',
      customerId: 6,
      issueDate: '2026-01-08',
      dueDate: '2026-02-07',
      currency: 'SGD',
      fxRate: 26.5,
      subtotal: 15000,
      discount: 1500,
      vat: 945,
      wht: 0,
      whtRate: 0,
      totalAmount: 14445,
      paidAmount: 0,
      outstanding: 14445,
      expectedBaseAmount: 382792.5,
      status: 'sent',
      paymentTerms: 'Net 30',
      customerPO: 'PO-SG-2026-01',
      source: 'recurring',
      includeVat: true,
      items: [
        { id: 1, description: 'Monthly Subscription', qty: 1, unitPrice: 15000, discount: 1500, lineTotal: 13500 },
      ],
      payments: [],
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'draft':
        return {
          label: 'Draft',
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: FileText,
        };
      case 'pending_approval':
        return {
          label: 'Pending Approval',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
        };
      case 'sent':
        return {
          label: 'Sent',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Send,
        };
      case 'viewed':
        return {
          label: 'Viewed',
          className: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: Eye,
        };
      case 'partially_paid':
        return {
          label: 'Partially Paid',
          className: 'bg-cyan-50 text-cyan-700 border-cyan-200',
          icon: CreditCard,
        };
      case 'paid':
        return {
          label: 'Paid',
          className: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle,
        };
      case 'overdue':
        return {
          label: 'Overdue',
          className: 'bg-red-50 text-red-600 border-red-200',
          icon: AlertCircle,
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: Ban,
        };
      case 'void':
        return {
          label: 'Void',
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: XCircle,
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: FileText,
        };
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'manual':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Manual</Badge>;
      case 'quotation':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">From Quote</Badge>;
      case 'api':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">API</Badge>;
      case 'recurring':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">Recurring</Badge>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      THB: '฿',
      USD: '$',
      EUR: '€',
      GBP: '£',
      SGD: 'S$',
      HKD: 'HK$',
    };
    const symbol = symbols[currency] || currency;
    return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;
  };

  // Filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !invoice.invoiceNumber.toLowerCase().includes(query) &&
        !invoice.customer.toLowerCase().includes(query) &&
        !(invoice.customerPO || '').toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Status filter
    if (filterStatus !== 'all' && invoice.status !== filterStatus) {
      return false;
    }

    return true;
  });

  // Calculate statistics
  const stats = {
    total: invoices.length,
    draft: invoices.filter((i) => i.status === 'draft').length,
    sent: invoices.filter((i) => i.status === 'sent').length,
    overdue: invoices.filter((i) => i.status === 'overdue').length,
    paid: invoices.filter((i) => i.status === 'paid').length,
    partiallyPaid: invoices.filter((i) => i.status === 'partially_paid').length,
    totalRevenue: invoices.reduce((sum, i) => sum + i.expectedBaseAmount, 0),
    outstanding: invoices.reduce((sum, i) => sum + (i.outstanding * i.fxRate), 0),
    collected: invoices.reduce((sum, i) => sum + (i.paidAmount * i.fxRate), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Invoice Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Multi-currency invoicing with payment tracking and automated reminders
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.total}</p>
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
                <p className="text-sm text-gray-600">Outstanding</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.sent + stats.overdue}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatCurrency(stats.outstanding, 'THB')}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-50 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.overdue}</p>
              </div>
              <div className="w-10 h-10 bg-red-50 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.paid}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatCurrency(stats.collected, 'THB')}
                </p>
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
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {formatCurrency(stats.totalRevenue, 'THB')}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by invoice #, customer, or PO..."
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
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="partially_paid">Partially Paid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 h-10"
                onClick={() => setShowRecurringModal(true)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Recurring
              </Button>
              <Button
                className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10"
                onClick={() => {
                  setEditingInvoice(null);
                  setShowCreateModal(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Invoice #
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Issue Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Paid
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Outstanding
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    THB Equivalent
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
                {filteredInvoices.map((invoice) => {
                  const statusConfig = getStatusConfig(invoice.status);
                  const StatusIcon = statusConfig.icon;
                  const hasPayments = ['paid', 'partially_paid'].includes(invoice.status);

                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#2f2d77]">
                            {invoice.invoiceNumber}
                          </span>
                          {getSourceBadge(invoice.source)}
                        </div>
                        {invoice.customerPO && (
                          <p className="text-xs text-gray-500 mt-1">PO: {invoice.customerPO}</p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-900">{invoice.customer}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{invoice.issueDate}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <span className="text-sm text-gray-600">{invoice.dueDate}</span>
                          {invoice.daysPastDue && (
                            <p className="text-xs text-red-600 mt-1">
                              {invoice.daysPastDue} days overdue
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(invoice.totalAmount, invoice.currency)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-green-600">
                          {formatCurrency(invoice.paidAmount, invoice.currency)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-sm font-medium ${
                            invoice.outstanding > 0 ? 'text-amber-600' : 'text-green-600'
                          }`}
                        >
                          {formatCurrency(invoice.outstanding, invoice.currency)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <span className="text-sm text-gray-900">
                            {formatCurrency(invoice.expectedBaseAmount, 'THB')}
                          </span>
                          {invoice.currency !== 'THB' && (
                            <p className="text-xs text-gray-500">
                              @ {invoice.fxRate.toFixed(4)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          {/* View */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setShowPreviewModal(true);
                            }}
                            title="View Invoice"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>

                          {/* Edit - disabled if paid or partially paid */}
                          {!hasPayments ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => {
                                setEditingInvoice(invoice);
                                setShowCreateModal(true);
                              }}
                              title="Edit Invoice"
                            >
                              <Edit className="h-4 w-4 text-gray-600" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 cursor-not-allowed opacity-40"
                              disabled
                              title="Cannot edit paid/partially paid invoice"
                            >
                              <Edit className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}

                          {/* Credit Note - only for paid invoices */}
                          {invoice.status === 'paid' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-purple-50"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                setShowCreditNoteModal(true);
                              }}
                              title="Issue Credit Note"
                            >
                              <FileCheck className="h-4 w-4 text-purple-600" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 cursor-not-allowed opacity-40"
                              disabled
                              title="Credit note only available for paid invoices"
                            >
                              <FileCheck className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}

                          {/* Send/Resend Email - only for draft and sent */}
                          {['draft', 'sent'].includes(invoice.status) ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                setShowSendModal(true);
                              }}
                              title={invoice.status === 'draft' ? 'Send Invoice' : 'Resend Invoice'}
                            >
                              <Mail className="h-4 w-4 text-blue-600" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 cursor-not-allowed opacity-40"
                              disabled
                              title="Send only available for draft/sent invoices"
                            >
                              <Mail className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}

                          {/* Delete - disabled if paid or partially paid */}
                          {!hasPayments ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50"
                              title="Delete Invoice"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 cursor-not-allowed opacity-40"
                              disabled
                              title="Cannot delete paid/partially paid invoice"
                            >
                              <Trash2 className="h-4 w-4 text-gray-400" />
                            </Button>
                          )}
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

      {/* All Modals */}
      
      {/* Create/Edit Invoice Modal */}
      <InvoiceFormModal
        open={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingInvoice(null);
        }}
        onSaved={() => {
          setShowCreateModal(false);
          setEditingInvoice(null);
          // Refresh invoice list
        }}
        editingInvoice={editingInvoice}
      />

      {/* Preview Invoice Modal */}
      <InvoicePreviewModal
        open={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
      />

      {/* Send Invoice Modal */}
      <SendInvoiceModal
        open={showSendModal}
        onClose={() => {
          setShowSendModal(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
        onSent={() => {
          // Don't close immediately - modal handles its own state
          // Refresh invoice list and update status
        }}
      />

      {/* Payment Modal */}
      <PaymentModal
        open={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
        onPaymentRecorded={() => {
          setShowPaymentModal(false);
          setSelectedInvoice(null);
          // Refresh invoice list
        }}
      />

      {/* Credit Note Modal */}
      <CreditNoteModal
        open={showCreditNoteModal}
        onClose={() => {
          setShowCreditNoteModal(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
        onCreditNoteIssued={() => {
          setShowCreditNoteModal(false);
          setSelectedInvoice(null);
          // Refresh invoice list
        }}
      />

      {/* Recurring Invoice Modal */}
      <RecurringInvoiceModal
        open={showRecurringModal}
        onClose={() => setShowRecurringModal(false)}
      />
    </div>
  );
}