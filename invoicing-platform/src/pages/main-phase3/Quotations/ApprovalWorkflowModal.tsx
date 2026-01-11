import {
  X,
  Check,
  XIcon as XCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ApprovalWorkflowModalProps {
  open: boolean;
  onClose: () => void;
  quotation: any;
  onApproved: () => void;
  onRejected: () => void;
}

export default function ApprovalWorkflowModal({
  open,
  onClose,
  quotation,
  onApproved,
  onRejected,
}: ApprovalWorkflowModalProps) {
  if (!open || !quotation) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : '$';
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  // Mock approval workflow data
  const approvalLevels = [
    {
      level: 1,
      approverName: 'Sarah Johnson',
      approverTitle: 'Sales Manager',
      status: 'approved',
      date: '2026-01-05 10:30',
      comment: 'Pricing looks good. Approved for next level.',
    },
    {
      level: 2,
      approverName: 'Michael Chen',
      approverTitle: 'Finance Director',
      status: 'pending',
      date: null,
      comment: null,
    },
    {
      level: 3,
      approverName: 'David Williams',
      approverTitle: 'CEO',
      status: 'pending',
      date: null,
      comment: null,
      required: quotation.total >= 500000, // Only required for large amounts
    },
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
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-50 text-red-600 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-500',
        };
      case 'pending':
        return {
          label: 'Pending',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
          iconColor: 'text-amber-600',
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          icon: Clock,
          iconColor: 'text-gray-500',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-3xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Approval Workflow</h2>
            <p className="text-sm text-gray-500 mt-1">
              {quotation.quotationNumber} - Internal approval status
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quotation Summary */}
          <div className="p-4 bg-gray-50 border border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Quotation Number</p>
                <p className="font-medium text-gray-900">{quotation.quotationNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Customer</p>
                <p className="font-medium text-gray-900">{quotation.customer}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Amount</p>
                <p className="font-medium text-gray-900">
                  {formatCurrency(quotation.total, quotation.currency)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Created By</p>
                <p className="font-medium text-gray-900">John Smith (Sales Rep)</p>
              </div>
            </div>
          </div>

          {/* Approval Workflow Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Approval Chain</h3>

            {approvalLevels
              .filter((level) => level.required !== false)
              .map((level, index, filteredLevels) => {
                const statusConfig = getStatusConfig(level.status);
                const StatusIcon = statusConfig.icon;
                const isLast = index === filteredLevels.length - 1;

                return (
                  <div key={level.level}>
                    <div className="flex gap-4">
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            level.status === 'approved'
                              ? 'bg-green-100'
                              : level.status === 'rejected'
                              ? 'bg-red-100'
                              : 'bg-gray-100'
                          }`}
                        >
                          <StatusIcon className={`h-5 w-5 ${statusConfig.iconColor}`} />
                        </div>
                        {!isLast && (
                          <div
                            className={`w-0.5 h-full min-h-12 ${
                              level.status === 'approved' ? 'bg-green-300' : 'bg-gray-300'
                            }`}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{level.approverName}</p>
                            <p className="text-sm text-gray-600">{level.approverTitle}</p>
                          </div>
                          <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                            {statusConfig.label}
                          </Badge>
                        </div>

                        {level.date && (
                          <p className="text-xs text-gray-500 mb-2">{level.date}</p>
                        )}

                        {level.comment && (
                          <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded">
                            <div className="flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-gray-700">{level.comment}</p>
                            </div>
                          </div>
                        )}

                        {level.status === 'pending' && level.level === 2 && (
                          <div className="mt-4 space-y-3">
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-700">
                                  This quotation is awaiting your approval
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">
                                Approval Comment
                              </Label>
                              <textarea
                                rows={3}
                                placeholder="Add your comment (optional)..."
                                className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
                              />
                            </div>

                            <div className="flex gap-3">
                              <Button
                                className="bg-green-600 hover:bg-green-700 text-white h-10 flex-1"
                                onClick={onApproved}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50 h-10 flex-1"
                                onClick={onRejected}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Approval Rules Info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Approval Rules</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Quotations under ฿500,000 require 2 levels of approval</li>
                  <li>• Quotations ฿500,000 and above require CEO approval (3 levels)</li>
                  <li>• All approvers receive email notifications</li>
                  <li>• Rejected quotations return to the creator for revision</li>
                  <li>• Approved quotations can be sent to customers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Activity History</h4>
            <div className="space-y-3">
              <div className="flex gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-gray-900">
                    <span className="font-medium">John Smith</span> created quotation
                  </p>
                  <p className="text-xs text-gray-500">2026-01-05 09:15</p>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-gray-900">
                    <span className="font-medium">John Smith</span> submitted for approval
                  </p>
                  <p className="text-xs text-gray-500">2026-01-05 09:20</p>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-gray-900">
                    <span className="font-medium">Sarah Johnson</span> approved (Level 1)
                  </p>
                  <p className="text-xs text-gray-500">2026-01-05 10:30</p>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-gray-900">
                    Notification sent to <span className="font-medium">Michael Chen</span>
                  </p>
                  <p className="text-xs text-gray-500">2026-01-05 10:31</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-100 h-10 px-6"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}