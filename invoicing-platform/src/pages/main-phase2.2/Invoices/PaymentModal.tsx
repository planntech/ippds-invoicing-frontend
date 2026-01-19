import { useState } from 'react';
import {
  X,
  CreditCard,
  Calendar,
  DollarSign,
  FileText,
  AlertCircle,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  invoice: any;
  onPaymentRecorded: () => void;
}

export default function PaymentModal({
  open,
  onClose,
  invoice,
  onPaymentRecorded,
}: PaymentModalProps) {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');

  if (!open || !invoice) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : currency === 'USD' ? '$' : currency;
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  const handleSubmit = () => {
    // Handle payment recording
    onPaymentRecorded();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Record Payment</h2>
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
                <p className="text-gray-600">Invoice Amount</p>
                <p className="font-medium text-gray-900">
                  {formatCurrency(invoice.total, invoice.currency)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Paid to Date</p>
                <p className="font-medium text-green-600">
                  {formatCurrency(invoice.paidAmount, invoice.currency)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Outstanding</p>
                <p className="font-medium text-amber-600">
                  {formatCurrency(invoice.outstanding, invoice.currency)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Currency</p>
                <p className="font-medium text-gray-900">{invoice.currency}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Payment Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="h-10 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Payment Amount ({invoice.currency}) <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  value={paymentAmount || ''}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  placeholder={formatCurrency(invoice.outstanding, invoice.currency)}
                  max={invoice.outstanding}
                  step="0.01"
                  className="h-10 border-gray-300"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 h-8 mt-1"
                  onClick={() => setPaymentAmount(invoice.outstanding)}
                >
                  Pay Full Amount
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Payment Method <span className="text-red-500">*</span>
              </Label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="cash">Cash</option>
                <option value="check">Check</option>
                <option value="paypal">PayPal</option>
                <option value="promptpay">PromptPay</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Reference / Transaction ID
              </Label>
              <Input
                placeholder="e.g., TXN123456, Check #789"
                className="h-10 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Payment Notes</Label>
              <textarea
                rows={3}
                placeholder="Optional notes about this payment..."
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Attach Receipt/Proof</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#2f2d77] transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG (max 5MB)</p>
              </div>
            </div>
          </div>

          {/* Previous Payments */}
          {invoice.payments && invoice.payments.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">Previous Payments</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Date</th>
                      <th className="text-right py-2 px-3 text-xs font-medium text-gray-600">Amount</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoice.payments.map((payment: any, index: number) => (
                      <tr key={index}>
                        <td className="py-2 px-3 text-sm text-gray-900">{payment.date}</td>
                        <td className="py-2 px-3 text-sm text-gray-900 text-right">
                          {formatCurrency(payment.amount, invoice.currency)}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-600">{payment.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Payment Recording</p>
              <ul className="space-y-1">
                <li>• Payment will be recorded against this invoice</li>
                <li>• A receipt will be automatically generated</li>
                <li>• Invoice status will update based on payment amount</li>
                <li>• Customer will receive payment confirmation email</li>
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
            className="bg-green-600 hover:bg-green-700 text-white h-10 px-6"
            onClick={handleSubmit}
            disabled={!paymentAmount || paymentAmount <= 0}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>
    </div>
  );
}