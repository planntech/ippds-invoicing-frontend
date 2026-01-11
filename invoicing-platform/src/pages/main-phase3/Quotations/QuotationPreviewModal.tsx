import {
  X,
  Download,
  Send,
  Printer,
  Building2,
  Calendar,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuotationPreviewModalProps {
  open: boolean;
  onClose: () => void;
  quotation: any;
}

export default function QuotationPreviewModal({
  open,
  onClose,
  quotation,
}: QuotationPreviewModalProps) {
  if (!open || !quotation) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : '$';
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'draft':
        return { label: 'Draft', className: 'bg-gray-50 text-gray-600 border-gray-300' };
      case 'sent':
        return { label: 'Sent', className: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'accepted':
        return { label: 'Accepted', className: 'bg-green-50 text-green-700 border-green-200' };
      case 'rejected':
        return { label: 'Rejected', className: 'bg-red-50 text-red-600 border-red-200' };
      case 'expired':
        return { label: 'Expired', className: 'bg-amber-50 text-amber-700 border-amber-200' };
      default:
        return { label: status, className: 'bg-gray-50 text-gray-600 border-gray-300' };
    }
  };

  const statusConfig = getStatusConfig(quotation.status);

  // Mock line items
  const lineItems = [
    {
      description: 'API Integration Service',
      quantity: 1,
      unitPrice: 250000,
      discount: 0,
      lineTotal: 250000,
    },
    {
      description: 'Custom Development (40 hours)',
      quantity: 40,
      unitPrice: 5000,
      discount: 50000,
      lineTotal: 150000,
    },
    {
      description: 'Project Management',
      quantity: 1,
      unitPrice: 100000,
      discount: 0,
      lineTotal: 100000,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Quotation Preview</h2>
            <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
              {statusConfig.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-9">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-9">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            {quotation.status === 'draft' && (
              <Button size="sm" className="bg-[#2f2d77] hover:bg-[#252351] text-white h-9">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto bg-white">
          {/* Company Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
            <div>
              <div className="w-32 h-12 bg-[#2f2d77] flex items-center justify-center mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">IPPS Company Limited</h3>
              <p className="text-sm text-gray-600">123 Business Street</p>
              <p className="text-sm text-gray-600">Bangkok 10110, Thailand</p>
              <p className="text-sm text-gray-600">Tel: +66 2 123 4567</p>
              <p className="text-sm text-gray-600">Tax ID: 0105558000000</p>
            </div>

            <div className="text-right">
              <h1 className="text-3xl font-bold text-[#2f2d77] mb-2">QUOTATION</h1>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Quotation #:</span> {quotation.quotationNumber}
                </p>
                <p>
                  <span className="font-medium">Issue Date:</span> {quotation.issueDate}
                </p>
                <p>
                  <span className="font-medium">Valid Until:</span> {quotation.validUntil}
                </p>
                {quotation.version > 1 && (
                  <p>
                    <span className="font-medium">Version:</span> {quotation.version}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Bill To:</h4>
            <div className="bg-gray-50 border border-gray-200 p-4">
              <p className="font-semibold text-gray-900 mb-2">{quotation.customer}</p>
              <p className="text-sm text-gray-600">456 Customer Street</p>
              <p className="text-sm text-gray-600">Bangkok 10120, Thailand</p>
              <p className="text-sm text-gray-600">contact@customer.com</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="mb-8">
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase border-b border-gray-200">
                    Description
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase border-b border-gray-200">
                    Qty
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase border-b border-gray-200">
                    Unit Price
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase border-b border-gray-200">
                    Discount
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase border-b border-gray-200">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">
                      {formatCurrency(item.unitPrice, quotation.currency)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">
                      {item.discount > 0 ? formatCurrency(item.discount, quotation.currency) : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(item.lineTotal, quotation.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex justify-end mb-8">
            <div className="w-full max-w-sm">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(quotation.subtotal, quotation.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT (7%):</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(quotation.vat, quotation.currency)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-xl font-bold text-[#2f2d77]">
                    {formatCurrency(quotation.total, quotation.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Terms & Conditions</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• This quotation is valid until {quotation.validUntil}</li>
              <li>• Payment terms: Net 30 days from invoice date</li>
              <li>• Prices are exclusive of any applicable taxes unless stated</li>
              <li>• All services subject to availability</li>
              <li>• This quotation is subject to our standard terms and conditions</li>
            </ul>
          </div>

          {/* Acceptance Section */}
          {quotation.customerAccepted && (
            <div className="mt-8 p-5 bg-green-50 border border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 mb-1">Customer Accepted</p>
                  <p className="text-sm text-gray-600">
                    Accepted on: {quotation.acceptedDate}
                  </p>
                  {quotation.signatory && (
                    <p className="text-sm text-gray-600">
                      Signed by: {quotation.signatory} ({quotation.signatoryTitle})
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              For any questions regarding this quotation, please contact us at sales@ipps.com
            </p>
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