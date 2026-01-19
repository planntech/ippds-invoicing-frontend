import {
  X,
  FileText,
  Calendar,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ConvertToInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  quotation: any;
  onConverted: () => void;
}

export default function ConvertToInvoiceModal({
  open,
  onClose,
  quotation,
  onConverted,
}: ConvertToInvoiceModalProps) {
  if (!open || !quotation) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : '$';
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  const handleConvert = () => {
    // Handle conversion logic
    onConverted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Convert to Invoice</h2>
            <p className="text-sm text-gray-500 mt-1">
              Generate invoice from accepted quotation
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
          {/* Quotation Info */}
          <div className="p-4 bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">Source Quotation</span>
              </div>
              <Badge className="bg-green-50 text-green-700 border-0 text-xs">Accepted</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Quotation #</p>
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
                <p className="text-gray-600">Items</p>
                <p className="font-medium text-gray-900">
                  {Array.isArray(quotation.items) ? quotation.items.length : quotation.items} items
                </p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-[#2f2d77] rounded-full flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Invoice Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Invoice Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Invoice Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="h-10 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Due Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  className="h-10 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Payment Terms
                </Label>
                <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                  <option value="net30">Net 30</option>
                  <option value="net15">Net 15</option>
                  <option value="net60">Net 60</option>
                  <option value="immediate">Immediate</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Invoice Number
                </Label>
                <Input
                  placeholder="Auto-generated"
                  className="h-10 border-gray-300 bg-gray-50"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Reference / PO Number
              </Label>
              <Input
                placeholder="Optional reference number"
                className="h-10 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Notes</Label>
              <textarea
                rows={3}
                placeholder="Additional notes for the invoice..."
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 p-4 bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="send-email"
                defaultChecked
                className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
              />
              <Label htmlFor="send-email" className="text-sm text-gray-700 cursor-pointer">
                Send invoice email to customer automatically
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="mark-quotation"
                defaultChecked
                className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
              />
              <Label htmlFor="mark-quotation" className="text-sm text-gray-700 cursor-pointer">
                Mark quotation as invoiced
              </Label>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Important Information</p>
              <ul className="space-y-1">
                <li>• All line items, pricing, and tax settings will be copied from the quotation</li>
                <li>• The invoice will be linked to this quotation for reference</li>
                <li>• You can modify the invoice after creation if needed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-100 h-10 px-6"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6"
            onClick={handleConvert}
          >
            <FileText className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}