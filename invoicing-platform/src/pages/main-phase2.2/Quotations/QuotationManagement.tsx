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
  Check,
  X as XIcon,
  Clock,
  Split,
  FileSignature,
  AlertCircle,
  DollarSign,
  History,
  CheckSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import all modals
import QuotationFormModal from './QuotationFormModal';
import QuotationPreviewModal from './QuotationPreviewModal';
import ConvertToInvoiceModal from './ConvertToInvoiceModal';
import MilestoneInvoiceModal from './MilestoneInvoiceModal';
import DigitalSignatureModal from './DigitalSignatureModal'
import ApprovalWorkflowModal from './ApprovalWorkflowModal';
import VersionHistoryModal from './VersionHistoryModal'



export default function QuotationManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [editingQuotation, setEditingQuotation] = useState<any>(null);

  // Quotation data
  const quotations = [
    {
      id: 1,
      quotationNumber: 'QT-2026-001',
      customer: 'Acme Corporation',
      customerId: 1,
      issueDate: '2026-01-05',
      validUntil: '2026-02-04',
      subtotal: 500000,
      vat: 35000,
      total: 535000,
      discount: 0,
      whtRate: 0,
      whtAmount: 0,
      currency: 'THB',
      fxRate: 1,
      status: 'sent',
      version: 1,
      approvalStatus: 'approved',
      customerAccepted: false,
      items: [
        { id: 1, description: 'API Integration Service', quantity: 1, unitPrice: 250000, discount: 0 },
        { id: 2, description: 'Custom Development (40 hours)', quantity: 40, unitPrice: 5000, discount: 0 },
        { id: 3, description: 'Project Management', quantity: 1, unitPrice: 100000, discount: 0 },
      ],
    },
    {
      id: 2,
      quotationNumber: 'QT-2026-002',
      customer: 'Tech Solutions Ltd',
      customerId: 2,
      issueDate: '2026-01-06',
      validUntil: '2026-02-05',
      subtotal: 350000,
      vat: 24500,
      total: 374500,
      discount: 0,
      whtRate: 0,
      whtAmount: 0,
      currency: 'THB',
      fxRate: 1,
      status: 'accepted',
      version: 2,
      approvalStatus: 'approved',
      customerAccepted: true,
      acceptedDate: '2026-01-07',
      items: [
        { id: 1, description: 'Consulting Services', quantity: 20, unitPrice: 15000, discount: 0 },
        { id: 2, description: 'Technical Support (Annual)', quantity: 1, unitPrice: 50000, discount: 0 },
      ],
    },
    {
      id: 3,
      quotationNumber: 'QT-2026-003',
      customer: 'Global Industries',
      customerId: 3,
      issueDate: '2026-01-07',
      validUntil: '2026-02-06',
      subtotal: 800000,
      vat: 56000,
      total: 856000,
      discount: 0,
      whtRate: 0,
      whtAmount: 0,
      currency: 'THB',
      fxRate: 1,
      status: 'draft',
      version: 1,
      approvalStatus: 'pending',
      customerAccepted: false,
      items: [
        { id: 1, description: 'Enterprise License', quantity: 5, unitPrice: 100000, discount: 0 },
        { id: 2, description: 'Implementation Services', quantity: 1, unitPrice: 300000, discount: 0 },
      ],
    },
    {
      id: 4,
      quotationNumber: 'QT-2026-004',
      customer: 'Ministry of Commerce',
      customerId: 4,
      issueDate: '2025-12-20',
      validUntil: '2026-01-19',
      subtotal: 1200000,
      vat: 0,
      total: 1200000,
      discount: 0,
      whtRate: 0,
      whtAmount: 0,
      currency: 'THB',
      fxRate: 1,
      status: 'expired',
      version: 1,
      approvalStatus: 'approved',
      customerAccepted: false,
      items: [
        { id: 1, description: 'Government Solution Package', quantity: 1, unitPrice: 1200000, discount: 0 },
      ],
    },
    {
      id: 5,
      quotationNumber: 'QT-2026-005',
      customer: 'Startup Inc',
      customerId: 5,
      issueDate: '2026-01-03',
      validUntil: '2026-02-02',
      subtotal: 250000,
      vat: 17500,
      total: 267500,
      discount: 0,
      whtRate: 0,
      whtAmount: 0,
      currency: 'THB',
      fxRate: 1,
      status: 'rejected',
      version: 1,
      approvalStatus: 'approved',
      customerAccepted: false,
      rejectedDate: '2026-01-05',
      items: [
        { id: 1, description: 'Starter Package', quantity: 1, unitPrice: 150000, discount: 0 },
        { id: 2, description: 'Setup & Training', quantity: 1, unitPrice: 100000, discount: 0 },
      ],
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
      case 'sent':
        return {
          label: 'Sent',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Send,
        };
      case 'accepted':
        return {
          label: 'Accepted',
          className: 'bg-green-50 text-green-700 border-green-200',
          icon: Check,
        };
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-50 text-red-600 border-red-200',
          icon: XIcon,
        };
      case 'expired':
        return {
          label: 'Expired',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: FileText,
        };
    }
  };

  const getApprovalConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved',
          className: 'bg-green-50 text-green-700 border-green-200',
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-50 text-red-600 border-red-200',
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
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
          <h1 className="text-2xl font-semibold text-gray-900">Quotation Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create and manage quotations with milestone invoicing
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Quotations</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{quotations.length}</p>
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
                <p className="text-sm text-gray-600">Sent</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {quotations.filter((q) => q.status === 'sent').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
                <Send className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {quotations.filter((q) => q.status === 'accepted').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {quotations.filter((q) => q.approvalStatus === 'pending').length}
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
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  ฿{new Intl.NumberFormat('en-US').format(
                    quotations.reduce((sum, q) => sum + q.total, 0)
                  )}
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
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search quotations by number or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border-gray-300"
              />
            </div>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
              <Filter className="h-4 w-4 mr-2" />
              Filter
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
              Create Quotation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quotations Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Quotation #
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Issue Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Valid Until
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Total Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Approval
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quotations.map((quotation) => {
                  const statusConfig = getStatusConfig(quotation.status);
                  const approvalConfig = getApprovalConfig(quotation.approvalStatus);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <tr key={quotation.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#2f2d77]">
                            {quotation.quotationNumber}
                          </span>
                          {quotation.version > 1 && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-300 text-xs">
                              v{quotation.version}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-900">{quotation.customer}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{quotation.issueDate}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{quotation.validUntil}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(quotation.total, quotation.currency)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${approvalConfig.className} text-xs`}>
                          {approvalConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* View Button - Always visible */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedQuotation(quotation);
                              setShowPreviewModal(true);
                            }}
                            title="View Quotation"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>
                          
                          {/* Edit Button - Not for accepted/rejected/expired */}
                          {!['accepted', 'rejected', 'expired'].includes(quotation.status) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => {
                                setEditingQuotation(quotation);
                                setShowCreateModal(true);
                              }}
                              title="Edit Quotation"
                            >
                              <Edit className="h-4 w-4 text-gray-600" />
                            </Button>
                          )}

                          {/* Version History Button */}
                          {quotation.version > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-purple-50"
                              onClick={() => {
                                setSelectedQuotation(quotation);
                                setShowVersionModal(true);
                              }}
                              title="Version History"
                            >
                              <History className="h-4 w-4 text-purple-600" />
                            </Button>
                          )}

                          {/* Approval Workflow Button - For draft/pending approval */}
                          {quotation.approvalStatus === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-amber-50"
                              onClick={() => {
                                setSelectedQuotation(quotation);
                                setShowApprovalModal(true);
                              }}
                              title="Approval Workflow"
                            >
                              <CheckSquare className="h-4 w-4 text-amber-600" />
                            </Button>
                          )}

                          {/* Convert to Invoice Button - Only for accepted */}
                          {quotation.status === 'accepted' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50"
                              onClick={() => {
                                setSelectedQuotation(quotation);
                                setShowConvertModal(true);
                              }}
                              title="Convert to Invoice"
                            >
                              <FileText className="h-4 w-4 text-blue-600" />
                            </Button>
                          )}

                          {/* Milestone Button - Only for accepted */}
                          {quotation.status === 'accepted' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-purple-50"
                              onClick={() => {
                                setSelectedQuotation(quotation);
                                setShowMilestoneModal(true);
                              }}
                              title="Split into Milestones"
                            >
                              <Split className="h-4 w-4 text-purple-600" />
                            </Button>
                          )}

                          {/* Customer Signature Button - Only for sent and not yet accepted */}
                          {quotation.status === 'sent' && !quotation.customerAccepted && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-green-50"
                              onClick={() => {
                                setSelectedQuotation(quotation);
                                setShowSignatureModal(true);
                              }}
                              title="Customer Acceptance"
                            >
                              <FileSignature className="h-4 w-4 text-green-600" />
                            </Button>
                          )}

                          {/* Delete Button - Not for accepted */}
                          {quotation.status !== 'accepted' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-red-50"
                              onClick={() => {
                                setSelectedQuotation(quotation);
                                setShowDeleteModal(true);
                              }}
                              title="Delete Quotation"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
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

      {/* Create/Edit Quotation Modal */}
      <QuotationFormModal
        open={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingQuotation(null);
        }}
        onSaved={() => {
          setShowCreateModal(false);
          setEditingQuotation(null);
          // Refresh quotations list
        }}
        editingQuotation={editingQuotation}
      />

      {/* Preview Modal */}
      <QuotationPreviewModal
        open={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setSelectedQuotation(null);
        }}
        quotation={selectedQuotation}
      />

      {/* Convert to Invoice Modal */}
      <ConvertToInvoiceModal
        open={showConvertModal}
        onClose={() => {
          setShowConvertModal(false);
          setSelectedQuotation(null);
        }}
        quotation={selectedQuotation}
        onConverted={() => {
          setShowConvertModal(false);
          setSelectedQuotation(null);
          // Refresh quotations list
        }}
      />

      {/* Milestone Invoice Modal */}
      <MilestoneInvoiceModal
        open={showMilestoneModal}
        onClose={() => {
          setShowMilestoneModal(false);
          setSelectedQuotation(null);
        }}
        quotation={selectedQuotation}
        onCreated={() => {
          setShowMilestoneModal(false);
          setSelectedQuotation(null);
          // Refresh quotations list
        }}
      />

      {/* Digital Signature Modal */}
      <DigitalSignatureModal
        open={showSignatureModal}
        onClose={() => {
          setShowSignatureModal(false);
          setSelectedQuotation(null);
        }}
        quotation={selectedQuotation}
        onAccepted={() => {
          setShowSignatureModal(false);
          setSelectedQuotation(null);
          // Refresh quotations list
        }}
      />

      {/* Approval Workflow Modal */}
      <ApprovalWorkflowModal
        open={showApprovalModal}
        onClose={() => {
          setShowApprovalModal(false);
          setSelectedQuotation(null);
        }}
        quotation={selectedQuotation}
        onApproved={() => {
          setShowApprovalModal(false);
          setSelectedQuotation(null);
          // Refresh quotations list
        }}
        onRejected={() => {
          setShowApprovalModal(false);
          setSelectedQuotation(null);
          // Refresh quotations list
        }}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        open={showVersionModal}
        onClose={() => {
          setShowVersionModal(false);
          setSelectedQuotation(null);
        }}
        quotation={selectedQuotation}
        onViewVersion={(version) => {
          // Handle view version
          console.log('View version:', version);
        }}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedQuotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Quotation
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Are you sure you want to delete quotation{' '}
                <span className="font-medium text-gray-900">
                  {selectedQuotation.quotationNumber}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-100 h-10"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedQuotation(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white h-10"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedQuotation(null);
                    // Handle delete
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