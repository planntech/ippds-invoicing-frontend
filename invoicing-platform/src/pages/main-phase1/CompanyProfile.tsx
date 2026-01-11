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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState('company');
  const [accountType, setAccountType] = useState<'individual' | 'business'>('business');
  const [wantsVirtualAccount, setWantsVirtualAccount] = useState(false);
  const [corporateEmailVerified, setCorporateEmailVerified] = useState(false);
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'head_office', address: '123 Business Street', city: 'Bangkok', country: 'Thailand', postalCode: '10110' },
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

  // KYC Status
  const kycStatus = {
    verificationType: 'kyb', // kyc (individual), kyb (business), kym (merchant)
    status: 'pending', // pending, approved, rejected, under_review
    completeness: 75,
    lastUpdated: '2026-01-05',
    hasVirtualAccount: false,
    corporateEmailVerified: false,
    documents: [
      { id: 1, name: 'Business Registration Certificate', status: 'approved', uploadedDate: '2026-01-02', size: '2.4 MB', required: 'business' },
      { id: 2, name: 'Tax Identification Certificate', status: 'approved', uploadedDate: '2026-01-02', size: '1.8 MB', required: 'both' },
      { id: 3, name: 'Bank Account Statement', status: 'under_review', uploadedDate: '2026-01-05', size: '3.2 MB', required: 'both' },
      { id: 4, name: 'Director ID Card', status: 'pending', uploadedDate: null, size: null, required: 'business' },
      { id: 5, name: 'Company Articles of Association', status: 'rejected', uploadedDate: '2026-01-03', size: '5.1 MB', rejectionReason: 'Document is expired. Please upload a recent version.', required: 'business' },
      { id: 6, name: 'Individual ID Card / Passport', status: 'approved', uploadedDate: '2026-01-02', size: '1.2 MB', required: 'individual' },
      { id: 7, name: 'Proof of Address (Utility Bill)', status: 'pending', uploadedDate: null, size: null, required: 'individual' },
      { id: 8, name: 'Merchant Agreement', status: 'pending', uploadedDate: null, size: null, required: 'merchant' },
      { id: 9, name: 'Business License', status: 'pending', uploadedDate: null, size: null, required: 'merchant' },
    ]
  };

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building2 },
    { id: 'branches', label: 'Branch Management', icon: Building2 },
    { id: 'branding', label: 'Branding', icon: Image },
    { id: 'banking', label: 'Banking', icon: FileText },
    { id: 'kyc', label: 'KYC Documents', icon: FileText, badge: kycStatus.documents.filter(d => d.status === 'pending' || d.status === 'rejected').length },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved',
          className: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle2,
          iconColor: 'text-green-600',
        };
      case 'pending':
        return {
          label: 'Pending Upload',
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: Clock,
          iconColor: 'text-gray-500',
        };
      case 'under_review':
        return {
          label: 'Under Review',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-600',
        };
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-50 text-red-600 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-500',
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: AlertCircle,
          iconColor: 'text-gray-500',
        };
    }
  };

  const getKYCStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: 'KYC Approved',
          badgeClass: 'bg-green-50 text-green-700 border-green-200',
          barClass: 'bg-green-600',
        };
      case 'pending':
        return {
          label: 'KYC Pending',
          badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
          barClass: 'bg-amber-500',
        };
      case 'under_review':
        return {
          label: 'Under Review',
          badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
          barClass: 'bg-blue-600',
        };
      case 'rejected':
        return {
          label: 'KYC Rejected',
          badgeClass: 'bg-red-50 text-red-600 border-red-200',
          barClass: 'bg-red-600',
        };
      default:
        return {
          label: 'Unknown',
          badgeClass: 'bg-gray-50 text-gray-600 border-gray-300',
          barClass: 'bg-gray-400',
        };
    }
  };

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

  const kycStatusConfig = getKYCStatusConfig(kycStatus.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Company Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your company information and KYC verification
          </p>
        </div>
      </div>

      {/* KYC Status Banner */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-gray-900">KYC Verification Status</h3>
                  <Badge variant="outline" className={`${kycStatusConfig.badgeClass} text-xs`}>
                    {kycStatusConfig.label}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Complete your KYC verification to unlock all payment features
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Completeness:</span>
                    <span className="font-medium text-gray-900">{kycStatus.completeness}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="font-medium text-gray-900">{kycStatus.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white">
                Complete KYC
              </Button>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                View Guidelines
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-gray-100 rounded overflow-hidden">
              <div 
                className={`h-full ${kycStatusConfig.barClass} transition-all duration-500`}
                style={{ width: `${kycStatus.completeness}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                {tab.badge && tab.badge > 0 && (
                  <Badge className="bg-red-500 text-white border-0 h-5 px-1.5 text-xs">
                    {tab.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'company' && (
        <div className="space-y-6">
          {/* Account Type Selection */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">Account Type & Verification</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Account Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Account Type <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setAccountType('individual');
                      setWantsVirtualAccount(false);
                    }}
                    className={`p-5 border-2 transition-all text-left ${
                      accountType === 'individual'
                        ? 'border-[#2f2d77] bg-[#2f2d77]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        accountType === 'individual' ? 'border-[#2f2d77]' : 'border-gray-300'
                      }`}>
                        {accountType === 'individual' && (
                          <div className="w-3 h-3 bg-[#2f2d77] rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Individual</h4>
                        <p className="text-sm text-gray-600">
                          Personal account for freelancers or sole proprietors
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 text-xs">
                            KYC Required
                          </Badge>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                            No Virtual Account
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setAccountType('business')}
                    className={`p-5 border-2 transition-all text-left ${
                      accountType === 'business'
                        ? 'border-[#2f2d77] bg-[#2f2d77]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        accountType === 'business' ? 'border-[#2f2d77]' : 'border-gray-300'
                      }`}>
                        {accountType === 'business' && (
                          <div className="w-3 h-3 bg-[#2f2d77] rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Business</h4>
                        <p className="text-sm text-gray-600">
                          Registered company or organization
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            KYB/KYM Required
                          </Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            Virtual Account Available
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Verification Type for Business */}
              {accountType === 'business' && (
                <div className="space-y-3 p-4 bg-blue-50 border border-blue-200">
                  <Label className="text-sm font-medium text-gray-700">
                    Business Verification Type <span className="text-red-500">*</span>
                  </Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="verification-type"
                        value="kyb"
                        defaultChecked
                        className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">KYB - Know Your Business</p>
                        <p className="text-xs text-gray-600">Standard business verification for registered companies</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="verification-type"
                        value="kym"
                        className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">KYM - Know Your Merchant</p>
                        <p className="text-xs text-gray-600">Enhanced verification for merchant/payment processor accounts</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Virtual Account Option */}
              {accountType === 'business' && (
                <div className="space-y-3 p-4 border-2 border-dashed border-gray-300">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="virtual-account"
                      checked={wantsVirtualAccount}
                      onChange={(e) => setWantsVirtualAccount(e.target.checked)}
                      className="w-4 h-4 mt-1 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                    />
                    <div className="flex-1">
                      <Label htmlFor="virtual-account" className="text-sm font-medium text-gray-900 cursor-pointer">
                        Enable Virtual Account (VA)
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Get a dedicated virtual account number for automated payment reconciliation
                      </p>
                      {wantsVirtualAccount && (
                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 space-y-3">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 mb-2">
                                Corporate Email Verification Required
                              </p>
                              <p className="text-sm text-gray-700 mb-3">
                                Virtual Account requires verification of your company's official email domain
                              </p>
                              {!corporateEmailVerified ? (
                                <Button
                                  size="sm"
                                  className="bg-[#2f2d77] hover:bg-[#252351] text-white h-9"
                                  onClick={() => {
                                    // Simulate verification
                                    alert('Verification email sent! Please check your inbox.');
                                    setCorporateEmailVerified(true);
                                  }}
                                >
                                  Verify Corporate Email
                                </Button>
                              ) : (
                                <div className="flex items-center gap-2 text-green-700">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span className="text-sm font-medium">Corporate email verified</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

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

      {activeTab === 'kyc' && (
        <div className="space-y-6">
          {/* Required Documents */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">KYC Documents</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Upload the following documents to complete your KYC verification. All documents should be clear, recent, and officially certified.
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {kycStatus.documents.map((doc) => {
                  const statusConfig = getStatusConfig(doc.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div key={doc.id} className="p-5 border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-10 h-10 ${statusConfig.className} flex items-center justify-center flex-shrink-0`}>
                            <StatusIcon className={`h-5 w-5 ${statusConfig.iconColor}`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-medium text-gray-900">{doc.name}</h4>
                              <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                                {statusConfig.label}
                              </Badge>
                            </div>
                            
                            {doc.uploadedDate && (
                              <p className="text-sm text-gray-600">
                                Uploaded: {doc.uploadedDate} • Size: {doc.size}
                              </p>
                            )}
                            
                            {doc.status === 'rejected' && doc.rejectionReason && (
                              <div className="mt-3 p-3 bg-red-50 border border-red-200">
                                <p className="text-sm text-red-700">
                                  <span className="font-medium">Rejection Reason:</span> {doc.rejectionReason}
                                </p>
                              </div>
                            )}
                            
                            {doc.status === 'pending' && (
                              <p className="text-sm text-gray-500 mt-1">
                                Required document - Please upload to continue verification
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {doc.status === 'pending' || doc.status === 'rejected' ? (
                            <label className="cursor-pointer">
                              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 hover:bg-gray-50 h-9 pointer-events-none"
                              >
                                <Upload className="h-4 w-4 mr-1" />
                                Upload
                              </Button>
                            </label>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-gray-100 h-9 w-9 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-gray-100 h-9 w-9 p-0"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              {doc.status !== 'approved' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:bg-red-50 h-9 w-9 p-0"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upload Guidelines */}
          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Document Guidelines</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Documents must be in PDF, JPG, or PNG format</li>
                    <li>• Maximum file size: 10MB per document</li>
                    <li>• Documents should be clear and readable</li>
                    <li>• All documents must be current and not expired</li>
                    <li>• Official stamps and signatures must be visible</li>
                    <li>• Processing time: 2-3 business days after submission</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit for Review */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10 px-6">
              Save as Draft
            </Button>
            <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
              Submit for Review
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
                    {accountType === 'business'
                      ? 'Each branch can have its own bank account for localized payment processing and reconciliation. This helps with branch-level accounting and cash flow management.'
                      : 'As an individual account, you can configure one primary bank account for all transactions.'}
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

                    {wantsVirtualAccount && corporateEmailVerified && (
                      <div className="md:col-span-2 p-4 bg-green-50 border border-green-200">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              Virtual Account Enabled
                            </p>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-700">
                                VA Number: <span className="font-mono font-medium">88001234567890</span>
                              </p>
                              <p className="text-xs text-gray-600">
                                Use this virtual account number for automated payment reconciliation
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                  <span>Virtual Account (VA) is only available for verified business accounts with corporate email</span>
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