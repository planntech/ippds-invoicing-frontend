import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  Building2,
  User,
  Mail,
  Phone,
  FileText,
  CreditCard,
  X,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Customer data
  const customers = [
    {
      id: 1,
      code: 'CUS-001',
      name: 'Acme Corporation',
      type: 'business',
      contactPerson: 'John Smith',
      email: 'john.smith@acme.com',
      phone: '+66 2 123 4567',
      taxId: '0105558000000',
      whtRate: 3,
      paymentTerms: 'Net 30',
      creditLimit: 500000,
      currency: 'THB',
      status: 'active',
      totalInvoices: 24,
      outstandingBalance: 125000,
    },
    {
      id: 2,
      code: 'CUS-002',
      name: 'Tech Solutions Ltd',
      type: 'business',
      contactPerson: 'Jane Doe',
      email: 'jane@techsolutions.com',
      phone: '+66 2 234 5678',
      taxId: '0105558000001',
      whtRate: 3,
      paymentTerms: 'Net 15',
      creditLimit: 300000,
      currency: 'THB',
      status: 'active',
      totalInvoices: 18,
      outstandingBalance: 87500,
    },
    {
      id: 3,
      code: 'CUS-003',
      name: 'Global Industries',
      type: 'business',
      contactPerson: 'Mike Wilson',
      email: 'mike@globalind.com',
      phone: '+66 2 345 6789',
      taxId: '0105558000002',
      whtRate: 5,
      paymentTerms: 'Net 60',
      creditLimit: 1000000,
      currency: 'USD',
      status: 'active',
      totalInvoices: 42,
      outstandingBalance: 245000,
    },
    {
      id: 4,
      code: 'CUS-004',
      name: 'Sarah Johnson',
      type: 'individual',
      contactPerson: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+66 81 234 5678',
      taxId: '1234567890123',
      whtRate: 0,
      paymentTerms: 'Immediate',
      creditLimit: 50000,
      currency: 'THB',
      status: 'active',
      totalInvoices: 5,
      outstandingBalance: 12000,
    },
    {
      id: 5,
      code: 'CUS-005',
      name: 'Ministry of Commerce',
      type: 'government',
      contactPerson: 'Admin Officer',
      email: 'procurement@moc.go.th',
      phone: '+66 2 456 7890',
      taxId: '0994000000000',
      whtRate: 1,
      paymentTerms: 'Net 90',
      creditLimit: 2000000,
      currency: 'THB',
      status: 'active',
      totalInvoices: 8,
      outstandingBalance: 450000,
    },
    {
      id: 6,
      code: 'CUS-006',
      name: 'Inactive Corp',
      type: 'business',
      contactPerson: 'Former Client',
      email: 'contact@inactive.com',
      phone: '+66 2 567 8901',
      taxId: '0105558000003',
      whtRate: 3,
      paymentTerms: 'Net 30',
      creditLimit: 200000,
      currency: 'THB',
      status: 'inactive',
      totalInvoices: 12,
      outstandingBalance: 0,
    },
  ];

  const getCustomerTypeConfig = (type: string) => {
    switch (type) {
      case 'business':
        return {
          label: 'Business',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Building2,
        };
      case 'individual':
        return {
          label: 'Individual',
          className: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: User,
        };
      case 'government':
        return {
          label: 'Government',
          className: 'bg-green-50 text-green-700 border-green-200',
          icon: Building2,
        };
      default:
        return {
          label: type,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: User,
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          className: 'bg-green-50 text-green-700 border-green-200',
          dot: 'bg-green-500',
        };
      case 'inactive':
        return {
          label: 'Inactive',
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          dot: 'bg-gray-400',
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          dot: 'bg-gray-400',
        };
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : '$';
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customer Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer records and information
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{customers.length}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Customers</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {customers.filter((c) => c.status === 'active').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Outstanding Balance</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  ฿{new Intl.NumberFormat('en-US').format(
                    customers.reduce((sum, c) => sum + c.outstandingBalance, 0)
                  )}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {customers.reduce((sum, c) => sum + c.totalInvoices, 0)}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search customers by name, email, or tax ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border-gray-300"
              />
            </div>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 h-10"
              onClick={() => setShowImportModal(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Customer Code
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Customer Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Payment Terms
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Outstanding
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
                {customers.map((customer) => {
                  const typeConfig = getCustomerTypeConfig(customer.type);
                  const statusConfig = getStatusConfig(customer.status);
                  const TypeIcon = typeConfig.icon;

                  return (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-[#2f2d77]">{customer.code}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                          <p className="text-xs text-gray-500">{customer.contactPerson}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${typeConfig.className} text-xs`}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {typeConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Mail className="h-3 w-3" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Phone className="h-3 w-3" />
                            <span>{customer.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-900">{customer.paymentTerms}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(customer.outstandingBalance, customer.currency)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} mr-1.5`}></span>
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50"
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
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

      {/* Create Customer Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Add New Customer</h2>
                <p className="text-sm text-gray-500 mt-1">Create a new customer record</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Customer Type <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="">Select type</option>
                      <option value="business">Business</option>
                      <option value="individual">Individual</option>
                      <option value="government">Government</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Customer Code
                    </Label>
                    <Input
                      placeholder="Auto-generated"
                      className="h-10 border-gray-300"
                      disabled
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Customer Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter customer or company name"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Contact Person <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter contact person name"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="customer@example.com"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+66 2 123 4567"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Mobile Phone
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+66 81 234 5678"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Tax Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Tax ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="0105558000000"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Withholding Tax Rate (%)
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="0">0% - No WHT</option>
                      <option value="1">1% - Government</option>
                      <option value="3">3% - Standard</option>
                      <option value="5">5% - Professional Services</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="tax-exempt"
                      className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                    />
                    <Label htmlFor="tax-exempt" className="text-sm text-gray-700">
                      Tax Exempt Customer
                    </Label>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Payment Terms <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="">Select payment terms</option>
                      <option value="immediate">Immediate</option>
                      <option value="net15">Net 15</option>
                      <option value="net30">Net 30</option>
                      <option value="net60">Net 60</option>
                      <option value="net90">Net 90</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Credit Limit
                    </Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Preferred Currency <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="THB">THB - Thai Baht</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="SGD">SGD - Singapore Dollar</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Billing Address</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Street Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter street address"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Enter city"
                        className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        State/Province
                      </Label>
                      <Input
                        placeholder="Enter state/province"
                        className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Postal Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="10110"
                        className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="TH">Thailand</option>
                      <option value="SG">Singapore</option>
                      <option value="MY">Malaysia</option>
                      <option value="VN">Vietnam</option>
                      <option value="ID">Indonesia</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="same-shipping"
                      className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                    />
                    <Label htmlFor="same-shipping" className="text-sm text-gray-700">
                      Shipping address same as billing address
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100 h-10 px-6"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
                Create Customer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Import Customers Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-2xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Import Customers</h2>
                <p className="text-sm text-gray-500 mt-1">Upload CSV or Excel file to import multiple customers</p>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2f2d77] transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Drop your file here or click to browse
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Supports CSV and Excel files (max 10MB)
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
              </div>

              {/* Template Download */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Need a template?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Download our template file to ensure your data is formatted correctly
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-blue-300 hover:bg-blue-100 h-8 text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Download CSV Template
                    </Button>
                    <Button variant="outline" size="sm" className="border-blue-300 hover:bg-blue-100 h-8 text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Download Excel Template
                    </Button>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Import Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• File must include headers: Name, Email, Phone, Tax ID, etc.</li>
                  <li>• Customer Name and Email are required fields</li>
                  <li>• Tax ID format: 13 digits for individuals, 10 digits for businesses</li>
                  <li>• Payment terms: immediate, net15, net30, net60, net90</li>
                  <li>• Customer type: business, individual, or government</li>
                  <li>• Duplicate email addresses will be skipped</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100 h-10 px-6"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
                <Upload className="h-4 w-4 mr-2" />
                Import Customers
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Edit Customer</h2>
                <p className="text-sm text-gray-500 mt-1">Update customer information</p>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedCustomer(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <p className="text-sm text-gray-600 mb-4">
                Editing: <span className="font-medium text-gray-900">{selectedCustomer.name}</span> ({selectedCustomer.code})
              </p>
              {/* Same form fields as Create Modal would go here */}
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center">
                <p className="text-sm text-gray-500">Edit form fields similar to Create Customer modal</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100 h-10 px-6"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedCustomer(null);
                }}
              >
                Cancel
              </Button>
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
                Update Customer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Customer
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-gray-900">{selectedCustomer.name}</span>?
                This action cannot be undone.
              </p>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-100 h-10"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCustomer(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white h-10"
                  onClick={() => {
                    // Handle delete
                    setShowDeleteModal(false);
                    setSelectedCustomer(null);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}