import {
  X,
  Download,
  Printer,
  Mail,
  Building2,
  Phone,
  MapPin,
  CheckCircle,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ReceiptPreviewModalProps {
  open: boolean;
  onClose: () => void;
  receipt: any;
}

export default function ReceiptPreviewModal({
  open,
  onClose,
  receipt,
}: ReceiptPreviewModalProps) {
  if (!open || !receipt) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      THB: '฿',
      USD: '$',
      EUR: '€',
      GBP: '£',
      SGD: 'S$',
      RUB: '₽',
    };
    const symbol = symbols[currency] || currency;
    return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;
  };

  const numberToWords = (num: number): string => {
    // Simple implementation for Thai Baht
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    if (num === 0) return 'Zero';

    const convertHundreds = (n: number): string => {
      if (n === 0) return '';
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
      return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convertHundreds(n % 100) : '');
    };

    const parts = Math.floor(num).toString().split('').reverse();
    const groups = [];
    for (let i = 0; i < parts.length; i += 3) {
      groups.push(parts.slice(i, i + 3).reverse().join(''));
    }

    const labels = ['', ' Thousand', ' Million', ' Billion'];
    const result = groups
      .reverse()
      .map((group, i) => {
        const n = parseInt(group);
        return n ? convertHundreds(n) + labels[groups.length - 1 - i] : '';
      })
      .filter(Boolean)
      .join(' ');

    return result + ' Only';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Receipt Preview</h2>
            <Badge className="bg-green-50 text-green-700 border-0 text-xs px-3 py-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              PAID
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
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-9">
              <Mail className="h-4 w-4 mr-2" />
              Send
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto bg-white">
          {/* Receipt Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
            <div className="w-20 h-20 bg-[#2f2d77] rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#2f2d77] mb-2">IPPS Company Limited</h1>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center justify-center gap-2">
                <MapPin className="h-3 w-3" />
                123 Business Street, Bangkok 10110, Thailand
              </p>
              <p className="flex items-center justify-center gap-2">
                <Phone className="h-3 w-3" />
                +66 2 123 4567
              </p>
              <p>Tax ID: 0105558000000</p>
            </div>
          </div>

          {/* RECEIPT Title */}
          <div className="text-center mb-8">
            <div className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg">
              <h2 className="text-2xl font-bold">RECEIPT</h2>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Receipt Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Receipt Number:</span>
                  <span className="font-medium text-gray-900">{receipt.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Receipt Date:</span>
                  <span className="font-medium text-gray-900">{receipt.receiptDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="font-medium text-gray-900">{receipt.paymentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium text-gray-900">{receipt.paymentMethod}</span>
                </div>
                {receipt.paymentReference && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-medium text-gray-900">{receipt.paymentReference}</span>
                  </div>
                )}
                {receipt.cardLast4 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card:</span>
                    <span className="font-medium text-gray-900">
                      {receipt.cardBrand} •••• {receipt.cardLast4}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Received From</h3>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">{receipt.customer}</p>
                <p className="text-sm text-gray-600">456 Customer Street</p>
                <p className="text-sm text-gray-600">Bangkok 10120, Thailand</p>
              </div>
            </div>
          </div>

          {/* Payment For */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment For</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 uppercase">
                      Invoice Number
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-gray-700 uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {receipt.paidFor.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="py-3 px-4 text-sm text-gray-900">{item.invoiceNumber}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(item.amount, receipt.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Amount Summary */}
          <div className="mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total Amount Received</span>
                <span className="text-3xl font-bold text-[#2f2d77]">
                  {formatCurrency(receipt.amount, receipt.currency)}
                </span>
              </div>
              {receipt.currency !== 'THB' && receipt.thbAmount && (
                <div className="flex justify-between text-sm pt-4 border-t border-green-300">
                  <span className="text-gray-700">THB Equivalent:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(receipt.thbAmount, 'THB')} @ {receipt.fxRate}
                  </span>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-green-300">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Amount in Words:</span>{' '}
                  {receipt.currency === 'THB' && numberToWords(receipt.amount)} Baht
                  {receipt.currency === 'USD' && numberToWords(receipt.amount)} Dollars
                  {receipt.currency === 'EUR' && numberToWords(receipt.amount)} Euro
                </p>
              </div>
            </div>
          </div>

          {/* Payment Confirmation */}
          <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Payment Confirmed</h4>
                <p className="text-sm text-gray-700">
                  This receipt confirms that we have received your payment of{' '}
                  <strong>{formatCurrency(receipt.amount, receipt.currency)}</strong> on{' '}
                  <strong>{receipt.paymentDate}</strong> via{' '}
                  <strong>{receipt.paymentMethod}</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center pt-8">
              <div className="border-t-2 border-gray-300 pt-2">
                <p className="text-sm font-medium text-gray-900">Authorized Signature</p>
                <p className="text-xs text-gray-600 mt-1">IPPS Company Limited</p>
              </div>
            </div>
            <div className="text-center pt-8">
              <div className="border-t-2 border-gray-300 pt-2">
                <p className="text-sm font-medium text-gray-900">Date</p>
                <p className="text-xs text-gray-600 mt-1">{receipt.receiptDate}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
            <p className="mb-2">
              <strong>Thank you for your payment!</strong>
            </p>
            <p>
              This is a computer-generated receipt and does not require a signature.
            </p>
            <p className="mt-2">
              For any queries, please contact us at billing@ipps.com or +66 2 123 4567
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