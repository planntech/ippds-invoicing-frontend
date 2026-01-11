import { useState } from 'react';
import {
  Link as LinkIcon,
  CreditCard,
  QrCode,
  Smartphone,
  Globe,
  Copy,
  Eye,
  Settings,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Plus,
  RefreshCw,
  Webhook,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import modals
import CreatePaymentLinkModal from './CreatePaymentLinkModal';
import GatewaySettingsModal from './GatewaySettingModal';

export default function PaymentGatewayManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
  const [showGatewaySettingsModal, setShowGatewaySettingsModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Payment gateway configurations
  const gateways = [
    {
      id: 1,
      name: 'Thai QR Payment',
      code: 'thai_qr',
      type: 'qr',
      status: 'active',
      icon: '🇹🇭',
      methods: ['PromptPay', 'ThaiQR'],
      currency: 'THB',
      fees: '0%',
      transactionsToday: 45,
      amountToday: 125000,
    },
    {
      id: 2,
      name: 'KTC Card Gateway',
      code: 'ktc_card',
      type: 'card',
      status: 'active',
      icon: '💳',
      methods: ['Visa', 'Mastercard', 'JCB'],
      currency: 'THB',
      fees: '2.5%',
      transactionsToday: 23,
      amountToday: 456000,
    },
    {
      id: 3,
      name: 'SBP QR (Russia)',
      code: 'sbp_qr',
      type: 'qr',
      status: 'active',
      icon: '🇷🇺',
      methods: ['SBP QR'],
      currency: 'RUB',
      fees: '0.4%',
      transactionsToday: 12,
      amountToday: 89000,
    },
    {
      id: 4,
      name: 'MIR Card',
      code: 'mir_card',
      type: 'card',
      status: 'active',
      icon: '🇷🇺',
      methods: ['MIR Card'],
      currency: 'RUB',
      fees: '1.8%',
      transactionsToday: 8,
      amountToday: 156000,
    },
  ];

  // Payment links
  const paymentLinks = [
    {
      id: 1,
      linkCode: 'PL-2026-001',
      invoiceNumber: 'INV-2026-001',
      customer: 'Acme Corporation',
      amount: 535000,
      currency: 'THB',
      status: 'paid',
      createdAt: '2026-01-05 09:00',
      paidAt: '2026-01-05 14:30',
      expiresAt: '2026-01-12 23:59',
      paymentMethod: 'Thai QR',
      transactionId: 'TXN-TH-20260105-001',
      gatewayFees: 0,
      netAmount: 535000,
      link: `${window.location.origin}/pay/abc123def456`,
      linkToken: 'abc123def456',
      allowedMethods: ['thai_qr', 'ktc_card'],
    },
    {
      id: 2,
      linkCode: 'PL-2026-002',
      invoiceNumber: 'INV-2026-002',
      customer: 'Tech Solutions Ltd',
      amount: 10165,
      currency: 'USD',
      status: 'pending',
      createdAt: '2026-01-06 10:15',
      paidAt: null,
      expiresAt: '2026-01-13 23:59',
      paymentMethod: null,
      transactionId: null,
      gatewayFees: 0,
      netAmount: 0,
      link: `${window.location.origin}/pay/xyz789ghi012`,
      linkToken: 'xyz789ghi012',
      allowedMethods: ['thai_qr', 'ktc_card', 'sbp_qr', 'mir_card'],
    },
    {
      id: 3,
      linkCode: 'PL-2026-003',
      invoiceNumber: 'INV-2026-003',
      customer: 'Global Industries',
      amount: 856000,
      currency: 'THB',
      status: 'pending',
      createdAt: '2026-01-07 11:20',
      paidAt: null,
      expiresAt: '2026-01-14 23:59',
      paymentMethod: null,
      transactionId: null,
      gatewayFees: 0,
      netAmount: 0,
      link: `${window.location.origin}/pay/mno345pqr678`,
      linkToken: 'mno345pqr678',
      allowedMethods: ['thai_qr', 'ktc_card'],
    },
    {
      id: 4,
      linkCode: 'PL-2026-004',
      invoiceNumber: 'INV-2026-004',
      customer: 'Russian Client LLC',
      amount: 125000,
      currency: 'RUB',
      status: 'expired',
      createdAt: '2025-12-28 15:00',
      paidAt: null,
      expiresAt: '2026-01-04 23:59',
      paymentMethod: null,
      transactionId: null,
      gatewayFees: 0,
      netAmount: 0,
      link: `${window.location.origin}/pay/stu901vwx234`,
      linkToken: 'stu901vwx234',
      allowedMethods: ['sbp_qr', 'mir_card'],
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          label: 'Paid',
          className: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle,
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
        };
      case 'expired':
        return {
          label: 'Expired',
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: XCircle,
        };
      case 'failed':
        return {
          label: 'Failed',
          className: 'bg-red-50 text-red-600 border-red-200',
          icon: AlertCircle,
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: Clock,
        };
    }
  };

  const getGatewayIcon = (code: string) => {
    const gateway = gateways.find(g => g.code === code);
    return gateway?.icon || '💳';
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      THB: '฿',
      USD: '$',
      EUR: '€',
      RUB: '₽',
    };
    const symbol = symbols[currency] || currency;
    return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  // Calculate statistics
  const stats = {
    totalLinks: paymentLinks.length,
    pending: paymentLinks.filter(l => l.status === 'pending').length,
    paid: paymentLinks.filter(l => l.status === 'paid').length,
    expired: paymentLinks.filter(l => l.status === 'expired').length,
    todayRevenue: paymentLinks
      .filter(l => l.status === 'paid' && l.paidAt?.startsWith('2026-01-05'))
      .reduce((sum, l) => sum + l.netAmount, 0),
    activeGateways: gateways.filter(g => g.status === 'active').length,
  };

  // Filter links
  const filteredLinks = paymentLinks.filter((link) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !link.linkCode.toLowerCase().includes(query) &&
        !link.invoiceNumber.toLowerCase().includes(query) &&
        !link.customer.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    if (filterStatus !== 'all' && link.status !== filterStatus) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Payment Gateway</h1>
          <p className="text-sm text-gray-500 mt-1">
            Multi-gateway payment links with Thai QR, Credit Card, SBP QR, and MIR Card
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-50 h-10"
            onClick={() => setShowGatewaySettingsModal(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button
            className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10"
            onClick={() => setShowCreateLinkModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Payment Link
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Links</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.totalLinks}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <LinkIcon className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.pending}</p>
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
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.paid}</p>
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
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.expired}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today Revenue</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  {formatCurrency(stats.todayRevenue, 'THB')}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Gateways</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.activeGateways}</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Gateways */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Gateways</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {gateways.map((gateway) => (
            <Card key={gateway.id} className="border border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{gateway.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{gateway.name}</h3>
                      <p className="text-xs text-gray-500">{gateway.methods.join(', ')}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      gateway.status === 'active'
                        ? 'bg-green-50 text-green-700 border-green-200 text-xs'
                        : 'bg-gray-50 text-gray-600 border-gray-300 text-xs'
                    }
                  >
                    {gateway.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Currency:</span>
                    <span className="font-medium text-gray-900">{gateway.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fees:</span>
                    <span className="font-medium text-gray-900">{gateway.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Today:</span>
                    <span className="font-medium text-gray-900">{gateway.transactionsToday} txns</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(gateway.amountToday, gateway.currency)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by link code, invoice, or customer..."
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
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="expired">Expired</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Links Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Link Code
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Invoice / Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Payment Method
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Created / Expires
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
                {filteredLinks.map((link) => {
                  const statusConfig = getStatusConfig(link.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <tr key={link.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#2f2d77]">
                            {link.linkCode}
                          </span>
                        </div>
                        {link.transactionId && (
                          <p className="text-xs text-gray-500 mt-1">TXN: {link.transactionId}</p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{link.invoiceNumber}</p>
                          <p className="text-xs text-gray-600">{link.customer}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(link.amount, link.currency)}
                          </p>
                          {link.gatewayFees > 0 && (
                            <p className="text-xs text-gray-500">
                              Net: {formatCurrency(link.netAmount, link.currency)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {link.paymentMethod ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {getGatewayIcon(link.allowedMethods[0])}
                            </span>
                            <span className="text-sm text-gray-900">{link.paymentMethod}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            {link.allowedMethods.map((method, idx) => (
                              <span key={idx} className="text-lg">
                                {getGatewayIcon(method)}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <p className="text-gray-600">{link.createdAt}</p>
                          <p className="text-xs text-gray-500">Expires: {link.expiresAt}</p>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => copyToClipboard(link.link)}
                            title="Copy Link"
                          >
                            <Copy className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => window.open(link.link, '_blank')}
                            title="Open Link"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>
                          {link.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50"
                              title="Resend Link"
                            >
                              <RefreshCw className="h-4 w-4 text-blue-600" />
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

      {/* Modals */}
      <CreatePaymentLinkModal
        open={showCreateLinkModal}
        onClose={() => setShowCreateLinkModal(false)}
        onCreated={() => {
          setShowCreateLinkModal(false);
          // Refresh payment links list
        }}
      />

      <GatewaySettingsModal
        open={showGatewaySettingsModal}
        onClose={() => setShowGatewaySettingsModal(false)}
      />
    </div>
  );
}