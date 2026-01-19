import { useState } from 'react';
import {
  X,
  FileCheck,
  AlertCircle,
  Plus,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface CreditNoteModalProps {
  open: boolean;
  onClose: () => void;
  invoice: any;
  onCreditNoteIssued: () => void;
}

export default function CreditNoteModal({
  open,
  onClose,
  invoice,
  onCreditNoteIssued,
}: CreditNoteModalProps) {
  const [creditType, setCreditType] = useState<'full' | 'partial'>('full');
  const [reason, setReason] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  if (!open || !invoice) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : currency === 'USD' ? '$' : currency;
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  const handleSubmit = () => {
    // Handle credit note issuance
    onCreditNoteIssued();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-3xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Issue Credit Note</h2>
            <p className="text-sm text-gray-500 mt-1">
              {invoice.invoiceNumber} - {invoice.customer}
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
          {/* Invoice Summary */}
          <div className="p-4 bg-gray-50 border border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Original Invoice</p>
                <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Invoice Amount</p>
                <p className="font-medium text-gray-900">
                  {formatCurrency(invoice.totalAmount, invoice.currency)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Issue Date</p>
                <p className="font-medium text-gray-900">{invoice.issueDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <Badge className="bg-green-50 text-green-700 border-0 text-xs">Paid</Badge>
              </div>
            </div>
          </div>

          {/* Credit Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Credit Type</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="creditType"
                  value="full"
                  checked={creditType === 'full'}
                  onChange={(e) => setCreditType(e.target.value as 'full' | 'partial')}
                  className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                />
                <span className="text-sm text-gray-700">Full Credit</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="creditType"
                  value="partial"
                  checked={creditType === 'partial'}
                  onChange={(e) => setCreditType(e.target.value as 'full' | 'partial')}
                  className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                />
                <span className="text-sm text-gray-700">Partial Credit</span>
              </label>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Reason for Credit Note <span className="text-red-500">*</span>
            </Label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
            >
              <option value="">Select reason</option>
              <option value="product_return">Product Return</option>
              <option value="service_cancellation">Service Cancellation</option>
              <option value="pricing_error">Pricing Error</option>
              <option value="discount_adjustment">Discount Adjustment</option>
              <option value="quality_issue">Quality Issue</option>
              <option value="duplicate_invoice">Duplicate Invoice</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Line Items - if partial */}
          {creditType === 'partial' && (
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Select Items to Credit</Label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">
                        <input type="checkbox" className="w-4 h-4" />
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">
                        Description
                      </th>
                      <th className="text-right py-2 px-3 text-xs font-medium text-gray-600">
                        Qty
                      </th>
                      <th className="text-right py-2 px-3 text-xs font-medium text-gray-600">
                        Amount
                      </th>
                      <th className="text-right py-2 px-3 text-xs font-medium text-gray-600">
                        Credit Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoice.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="py-2 px-3">
                          <input type="checkbox" className="w-4 h-4" />
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-900">
                          {item.description}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-900 text-right">
                          {item.qty}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-900 text-right">
                          {formatCurrency(item.lineTotal, invoice.currency)}
                        </td>
                        <td className="py-2 px-3">
                          <Input
                            type="number"
                            min="0"
                            max={item.qty}
                            defaultValue="0"
                            className="h-8 w-20 border-gray-300 text-right text-sm"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Credit Amount Summary */}
          <div className="p-4 bg-blue-50 border border-blue-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Credit Note Amount</span>
              <span className="text-xl font-bold text-[#2f2d77]">
                {formatCurrency(
                  creditType === 'full' ? invoice.totalAmount : 0,
                  invoice.currency
                )}
              </span>
            </div>
            {invoice.currency !== 'THB' && (
              <p className="text-xs text-gray-600 text-right mt-1">
                {formatCurrency(
                  creditType === 'full' ? invoice.expectedBaseAmount : 0,
                  'THB'
                )}{' '}
                @ {invoice.fxRate.toFixed(4)}
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Additional Notes
            </Label>
            <textarea
              rows={3}
              placeholder="Optional notes about this credit note..."
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
            />
          </div>

          {/* Info */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Credit Note Impact</p>
              <ul className="space-y-1">
                <li>• Credit note will be linked to the original invoice</li>
                <li>• Customer account balance will be credited</li>
                <li>• Accounting entries will be automatically reversed</li>
                <li>• Customer will receive credit note notification</li>
                <li>• Credit can be applied to future invoices</li>
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
            className="bg-purple-600 hover:bg-purple-700 text-white h-10 px-6"
            onClick={handleSubmit}
            disabled={!reason}
          >
            <FileCheck className="h-4 w-4 mr-2" />
            Issue Credit Note
          </Button>
        </div>
      </div>
    </div>
  );
}