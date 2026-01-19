import {
  X,
  Clock,
  Eye,
  Copy,
  FileText,
  User,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface VersionHistoryModalProps {
  open: boolean;
  onClose: () => void;
  quotation: any;
  onViewVersion: (version: number) => void;
}

export default function VersionHistoryModal({
  open,
  onClose,
  quotation,
  onViewVersion,
}: VersionHistoryModalProps) {
  if (!open || !quotation) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : '$';
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  // Mock version history
  const versions = [
    {
      version: 3,
      date: '2026-01-07 14:30',
      modifiedBy: 'John Smith',
      status: 'sent',
      total: 535000,
      changes: [
        { type: 'increased', field: 'Line item discount', from: 0, to: 50000 },
        { type: 'modified', field: 'Valid until date', from: '2026-02-04', to: '2026-02-14' },
      ],
      comment: 'Adjusted discount per customer negotiation',
      isCurrent: true,
    },
    {
      version: 2,
      date: '2026-01-06 11:20',
      modifiedBy: 'Sarah Johnson',
      status: 'draft',
      total: 585000,
      changes: [
        { type: 'increased', field: 'Total amount', from: 500000, to: 585000 },
        { type: 'added', field: 'New line item', description: 'Additional services' },
      ],
      comment: 'Added premium support package',
      isCurrent: false,
    },
    {
      version: 1,
      date: '2026-01-05 09:15',
      modifiedBy: 'John Smith',
      status: 'draft',
      total: 500000,
      changes: [{ type: 'created', field: 'Initial quotation' }],
      comment: 'Initial quotation created',
      isCurrent: false,
    },
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'increased':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decreased':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'added':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'removed':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'modified':
        return <Minus className="h-4 w-4 text-amber-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'increased':
      case 'added':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'decreased':
      case 'removed':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'modified':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Version History</h2>
            <p className="text-sm text-gray-500 mt-1">
              {quotation.quotationNumber} - Revision tracking
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {versions.map((version, index) => (
            <div
              key={version.version}
              className={`border rounded-lg p-5 ${
                version.isCurrent
                  ? 'border-[#2f2d77] bg-[#2f2d77]/5'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Version Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      version.isCurrent ? 'bg-[#2f2d77] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span className="font-semibold">v{version.version}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">
                        Version {version.version}
                      </h4>
                      {version.isCurrent && (
                        <Badge className="bg-[#2f2d77] text-white border-0 text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {version.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {version.modifiedBy}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:bg-gray-50 h-9"
                    onClick={() => onViewVersion(version.version)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  {!version.isCurrent && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-50 h-9"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Restore
                    </Button>
                  )}
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 border border-gray-200 rounded">
                <span className="text-sm text-gray-600">Total Amount</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(version.total, quotation.currency)}
                  </span>
                  {index < versions.length - 1 && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        version.total > versions[index + 1].total
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : version.total < versions[index + 1].total
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'bg-gray-50 text-gray-600 border-gray-300'
                      }`}
                    >
                      {version.total > versions[index + 1].total && '+'}
                      {formatCurrency(
                        version.total - versions[index + 1].total,
                        quotation.currency
                      )}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Changes */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Changes:</h5>
                {version.changes.map((change, changeIndex) => (
                  <div
                    key={changeIndex}
                    className={`flex items-start gap-3 p-3 border rounded ${getChangeColor(
                      change.type
                    )}`}
                  >
                    {getChangeIcon(change.type)}
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{change.field}</p>
                       {"from" in change && "to" in change && change.from !== undefined && change.to !== undefined && (
                        <p className="text-xs mt-1">
                          {typeof change.from === 'number'
                            ? formatCurrency(change.from, quotation.currency)
                            : change.from}{' '}
                          →{' '}
                          {typeof change.to === 'number'
                            ? formatCurrency(change.to, quotation.currency)
                            : change.to}
                        </p>
                      )}
                      {'description' in change && change.description && (
                        <p className="text-xs mt-1">{change.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment */}
              {version.comment && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Note:</span> {version.comment}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Total {versions.length} version{versions.length !== 1 ? 's' : ''}
          </div>
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