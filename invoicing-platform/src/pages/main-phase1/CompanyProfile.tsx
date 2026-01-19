// src/pages/main-phase1/CompanyProfile.tsx
import { useState } from 'react';
import {
  Building2,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileText,
  Image,
  Download,
  Eye,
  Trash2,
  Save,
  Plus,
  MapPin,
  Edit,
  Power,
  Users,
  CreditCard,
  QrCode,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState('company');
  const [accountType, setAccountType] = useState<'individual' | 'business'>('business');
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'head_office', address: '123 Business Street', city: 'Bangkok', country: 'Thailand', postalCode: '10110' },
  ]);

  // Payment Rails Configuration
  const [paymentRails, setPaymentRails] = useState([
    {
      id: 'thaiqr',
      name: 'Thai QR (PromptPay)',
      icon: '🇹🇭',
      enabled: true,
      description: 'Accept payments via Thai QR code',
      fee: '1.5% + ฿4',
    },
    {
      id: 'sbpqr',
      name: 'SBP QR (Russia)',
      icon: '🇷🇺',
      enabled: true,
      description: 'Accept payments via Russian SBP QR',
      fee: '2.0% + ฿10',
    },
    {
      id: 'mircard',
      name: 'MIR Card',
      icon: '💳',
      enabled: false,
      description: 'Russian payment card system',
      fee: '2.5% + ฿15',
    },
    {
      id: 'thaicreditcard',
      name: 'Thai Credit Card',
      icon: '💳',
      enabled: true,
      description: 'Visa, Mastercard, JCB (Thai issued)',
      fee: '2.5% + ฿10',
    },
    {
      id: 'internationalcard',
      name: 'International Credit Card',
      icon: '🌍',
      enabled: false,
      description: 'International Visa, Mastercard',
      fee: '3.5% + ฿15',
    },
  ]);

  // Branch Management Data
  const [branches, setBranches] = useState([
    {
      id: 1,
      code: 'HQ-BKK',
      name: 'Bangkok Headquarters',
      type: 'headquarters',
      address: '123 Business Street, Sukhumvit Road',
      city: 'Bangkok',
      country: 'Thailand',
      postalCode: '10110',
      phone: '+66 2 123 4567',
      email: 'bkk@company.com',
      taxId: '0105558000000',
      manager: 'John Doe',
      users: 24,
      status: 'active',
      isDefault: true,
      operatingHours: '09:00 - 18:00',
      bankAccount: {
        bankName: 'Bangkok Bank',
        accountNumber: '123-4-56789-0',
        accountName: 'IPPS Company Limited',
        branchName: 'Sukhumvit Branch',
        swiftCode: 'BKKBTHBK',
      },
    },
    {
      id: 2,
      code: 'BR-CNX',
      name: 'Chiang Mai Branch',
      type: 'branch',
      address: '456 Nimman Road',
      city: 'Chiang Mai',
      country: 'Thailand',
      postalCode: '50200',
      phone: '+66 53 123 4567',
      email: 'cnx@company.com',
      taxId: '',
      manager: 'Jane Smith',
      users: 12,
      status: 'active',
      isDefault: false,
      operatingHours: '09:00 - 17:00',
      bankAccount: {
        bankName: 'Kasikorn Bank',
        accountNumber: '234-5-67890-1',
        accountName: 'IPPS Company Limited - Chiang Mai',
        branchName: 'Nimman Branch',
        swiftCode: 'KASITHBK',
      },
    },
    {
      id: 3,
      code: 'BR-PKT',
      name: 'Phuket Branch',
      type: 'branch',
      address: '789 Beach Road, Patong',
      city: 'Phuket',
      country: 'Thailand',
      postalCode: '83150',
      phone: '+66 76 123 4567',
      email: 'pkt@company.com',
      taxId: '',
      manager: 'Mike Wilson',
      users: 8,
      status: 'inactive',
      isDefault: false,
      operatingHours: '10:00 - 19:00',
      bankAccount: null,
    },
  ]);

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'payment-rails', label: 'Payment Methods', icon: CreditCard },
    { id: 'branches', label: 'Branch Management', icon: Building2 },
    { id: 'branding', label: 'Branding', icon: Image },
    { id: 'banking', label: 'Banking', icon: FileText },
  ];

  const addAddress = () => {
    const newAddress = {
      id: addresses.length + 1,
      type: 'branch',
      address: '',
      city: '',
      country: 'Thailand',
      postalCode: '',
    };
    setAddresses([...addresses, newAddress]);
  };

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const togglePaymentRail = (id: string) => {
    setPaymentRails(paymentRails.map(rail => 
      rail.id === id ? { ...rail, enabled: !rail.enabled } : rail
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Company Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your company information and preferences
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${isActive 
                    ? 'border-[#2f2d77] text-[#2f2d77] bg-[#2f2d77]/5' 
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'}
                `}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'company' && (
        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="legal-name" className="text-sm font-medium text-gray-700">
                    Legal Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="legal-name"
                    placeholder="Enter legal company name"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trading-name" className="text-sm font-medium text-gray-700">
                    Trading Name
                  </Label>
                  <Input
                    id="trading-name"
                    placeholder="Enter trading name (if different)"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-id" className="text-sm font-medium text-gray-700">
                    Tax ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="tax-id"
                    placeholder="Enter tax identification number"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vat-number" className="text-sm font-medium text-gray-700">
                    VAT Number
                  </Label>
                  <Input
                    id="vat-number"
                    placeholder="Enter VAT registration number"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registration" className="text-sm font-medium text-gray-700">
                    Business Registration No. <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="registration"
                    placeholder="Enter registration number"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                    Industry Type <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="industry"
                    className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="services">Professional Services</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fiscal-year" className="text-sm font-medium text-gray-700">
                    Fiscal Year Start
                  </Label>
                  <select
                    id="fiscal-year"
                    className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                  >
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                    Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.example.com"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Business Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@company.com"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+66 2 123 4567"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fax" className="text-sm font-medium text-gray-700">
                    Fax Number
                  </Label>
                  <Input
                    id="fax"
                    type="tel"
                    placeholder="+66 2 123 4568"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-email" className="text-sm font-medium text-gray-700">
                    Support Email
                  </Label>
                  <Input
                    id="support-email"
                    type="email"
                    placeholder="support@company.com"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">Business Addresses</CardTitle>
                <Button
                  onClick={addAddress}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-50 h-9"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Address
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {addresses.map((address, index) => (
                <div key={address.id} className="p-5 border border-gray-200 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-[#2f2d77] text-white border-0">
                        {address.type === 'head_office' ? 'Head Office' : `Branch ${index}`}
                      </Badge>
                      {address.type === 'head_office' && (
                        <span className="text-xs text-gray-500">(Primary)</span>
                      )}
                    </div>
                    {address.type !== 'head_office' && (
                      <Button
                        onClick={() => removeAddress(address.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Street Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Enter street address"
                        className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                        defaultValue={address.address}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Enter city"
                        className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                        defaultValue={address.city}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Postal Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Enter postal code"
                        className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                        defaultValue={address.postalCode}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <select
                        className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                        defaultValue={address.country}
                      >
                        <option value="Thailand">Thailand</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Indonesia">Indonesia</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white px-6 h-10">
              <Save className="h-4 w-4 mr-2" />
              Save Company Profile
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'payment-rails' && (
        <div className="space-y-6">
          {/* Info Banner */}
          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Payment Method Configuration</h4>
                  <p className="text-sm text-gray-700">
                    Enable or disable payment methods for your business. Fees are configured by the admin and may vary based on your subscription plan. Only enabled payment methods will be available at checkout for your customers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Rails Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentRails.map((rail) => (
              <Card
                key={rail.id}
                className={`border-2 transition-all ${
                  rail.enabled
                    ? 'border-[#2f2d77] bg-[#2f2d77]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{rail.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{rail.name}</h3>
                        <p className="text-sm text-gray-600">{rail.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePaymentRail(rail.id)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                        rail.enabled ? 'bg-[#2f2d77]' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                          rail.enabled ? 'right-0.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Transaction Fee:</span>
                      <span className="font-medium text-gray-900">{rail.fee}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Badge
                      variant="outline"
                      className={`w-full justify-center ${
                        rail.enabled
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-gray-50 text-gray-600 border-gray-300'
                      }`}
                    >
                      {rail.enabled ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Enabled
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Disabled
                        </>
                      )}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Active Payment Methods Summary */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">
                Active Payment Methods Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Enabled Methods</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {paymentRails.filter((r) => r.enabled).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Methods</p>
                  <p className="text-2xl font-semibold text-gray-900">{paymentRails.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Status</p>
                  <Badge
                    variant="outline"
                    className={`${
                      paymentRails.filter((r) => r.enabled).length > 0
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {paymentRails.filter((r) => r.enabled).length > 0
                      ? 'Ready to Accept Payments'
                      : 'No Payment Methods Enabled'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white px-6 h-10">
              <Save className="h-4 w-4 mr-2" />
              Save Payment Settings
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'branches' && (
        <div className="space-y-6">
          {/* Branch Directory */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-gray-900">Branch Directory</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage all your business branches and locations
                  </p>
                </div>
                <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-9 px-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Branch
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Branch Code
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Branch Name
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Location
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Manager
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Users
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
                    {branches.map((branch) => (
                      <tr key={branch.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#2f2d77]">
                              {branch.code}
                            </span>
                            {branch.isDefault && (
                              <Badge className="bg-blue-50 text-blue-700 border-0 text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Building2 className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{branch.name}</p>
                              <p className="text-xs text-gray-500">
                                {branch.type === 'headquarters' ? 'Headquarters' : 'Branch'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-gray-600">
                              <p>{branch.city}</p>
                              <p className="text-xs text-gray-500">{branch.country}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-gray-900">{branch.manager}</p>
                          <p className="text-xs text-gray-500">{branch.email}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-gray-900">{branch.users}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              branch.status === 'active'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-gray-50 text-gray-600 border-gray-300'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                branch.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                              }`}
                            ></span>
                            {branch.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                              <Edit className="h-4 w-4 text-gray-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-8 w-8 p-0 ${
                                branch.status === 'active'
                                  ? 'hover:bg-red-50'
                                  : 'hover:bg-green-50'
                              }`}
                            >
                              <Power
                                className={`h-4 w-4 ${
                                  branch.status === 'active' ? 'text-red-600' : 'text-green-600'
                                }`}
                              />
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

          {/* Branch Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Branches</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {branches.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Branches</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {branches.filter(b => b.status === 'active').length}
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
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {branches.reduce((sum, b) => sum + b.users, 0)}
                    </p>
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
                    <p className="text-sm text-gray-600">Locations</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">
                      {new Set(branches.map(b => b.city)).size}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Info */}
          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Branch Management Tips</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Each branch can have its own invoice numbering sequence</li>
                    <li>• Assign users to specific branches for access control</li>
                    <li>• Set operating hours for customer reference</li>
                    <li>• Default branch is used for new transactions by default</li>
                    <li>• Branch-level reports help track performance by location</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'branding' && (
        <Card className="border border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Image className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Branding Section</h3>
            <p className="text-gray-500">This section is under development</p>
          </CardContent>
        </Card>
      )}

      {activeTab === 'banking' && (
        <div className="space-y-6">
          {/* Banking Information Note */}
          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Branch-Specific Bank Accounts</h4>
                  <p className="text-sm text-gray-700">
                    Each branch can have its own bank account for localized payment processing and reconciliation. This helps with branch-level accounting and cash flow management.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Accounts by Branch */}
          {branches.map((branch) => (
            <Card key={branch.id} className="border border-gray-200">
              <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="text-base font-semibold text-gray-900">
                        {branch.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{branch.code}</p>
                    </div>
                    {branch.isDefault && (
                      <Badge className="bg-blue-50 text-blue-700 border-0 text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  {branch.bankAccount ? (
                    <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-9">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Account
                    </Button>
                  ) : (
                    <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-9">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Bank Account
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {branch.bankAccount ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Bank Name</Label>
                      <Input
                        value={branch.bankAccount.bankName}
                        className="h-10 border-gray-300"
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Account Number</Label>
                      <Input
                        value={branch.bankAccount.accountNumber}
                        className="h-10 border-gray-300"
                        readOnly
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Account Name</Label>
                      <Input
                        value={branch.bankAccount.accountName}
                        className="h-10 border-gray-300"
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Branch Name</Label>
                      <Input
                        value={branch.bankAccount.branchName}
                        className="h-10 border-gray-300"
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">SWIFT Code</Label>
                      <Input
                        value={branch.bankAccount.swiftCode}
                        className="h-10 border-gray-300"
                        readOnly
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      No bank account configured for this branch yet
                    </p>
                    <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Bank Account
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Banking Guidelines */}
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <h4 className="font-medium text-gray-900 mb-3">Banking Information Guidelines</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#2f2d77] font-bold">•</span>
                  <span>Bank account name must match your registered business name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2f2d77] font-bold">•</span>
                  <span>Each branch should have a dedicated bank account for better financial tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2f2d77] font-bold">•</span>
                  <span>SWIFT code is required for international transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2f2d77] font-bold">•</span>
                  <span>Bank verification typically takes 1-2 business days</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}