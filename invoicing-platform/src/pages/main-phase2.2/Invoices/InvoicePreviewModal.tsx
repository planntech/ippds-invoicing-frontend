import {
  X,
  Download,
  Send,
  Printer,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface InvoicePreviewModalProps {
  open: boolean;
  onClose: () => void;
  invoice: any;
}

export default function InvoicePreviewModal({
  open,
  onClose,
  invoice,
}: InvoicePreviewModalProps) {
  if (!open || !invoice) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      THB: '฿',
      USD: '$',
      EUR: '€',
      GBP: '£',
      SGD: 'S$',
      HKD: 'HK$',
    };
    const symbol = symbols[currency] || currency;
    return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return { label: 'PAID', className: 'bg-green-600 text-white' };
      case 'partially_paid':
        return { label: 'PARTIALLY PAID', className: 'bg-cyan-600 text-white' };
      case 'sent':
        return { label: 'SENT', className: 'bg-blue-600 text-white' };
      case 'overdue':
        return { label: 'OVERDUE', className: 'bg-red-600 text-white' };
      case 'draft':
        return { label: 'DRAFT', className: 'bg-gray-600 text-white' };
      default:
        return { label: status.toUpperCase(), className: 'bg-gray-600 text-white' };
    }
  };

  const statusConfig = getStatusConfig(invoice.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Invoice Preview</h2>
            <Badge className={`${statusConfig.className} text-xs px-3 py-1`}>
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
            {invoice.status === 'draft' && (
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
              <div className="text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  123 Business Street, Bangkok 10110, Thailand
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  +66 2 123 4567
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  billing@ipps.com
                </p>
                <p>Tax ID: 0105558000000</p>
              </div>
            </div>

            <div className="text-right">
              <h1 className="text-3xl font-bold text-[#2f2d77] mb-2">INVOICE</h1>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Invoice #:</span> {invoice.invoiceNumber}
                </p>
                <p>
                  <span className="font-medium">Issue Date:</span> {invoice.issueDate}
                </p>
                <p>
                  <span className="font-medium">Due Date:</span> {invoice.dueDate}
                </p>
                {invoice.customerPO && (
                  <p>
                    <span className="font-medium">PO #:</span> {invoice.customerPO}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Bill To:</h4>
            <div className="bg-gray-50 border border-gray-200 p-4">
              <p className="font-semibold text-gray-900 mb-2">{invoice.customer}</p>
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
                {invoice.items.map((item: any, index: number) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">
                      {item.qty}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">
                      {formatCurrency(item.unitPrice, invoice.currency)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right">
                      {item.discount > 0 ? formatCurrency(item.discount, invoice.currency) : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(item.lineTotal, invoice.currency)}
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
                    {formatCurrency(invoice.subtotal, invoice.currency)}
                  </span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium text-red-600">
                      -{formatCurrency(invoice.discount, invoice.currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT (7%):</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(invoice.vat, invoice.currency)}
                  </span>
                </div>
                {invoice.wht > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Withholding Tax ({(invoice.whtRate * 100).toFixed(0)}%):
                    </span>
                    <span className="font-medium text-red-600">
                      -{formatCurrency(invoice.wht, invoice.currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t-2 border-gray-300">
                  <span className="font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-xl font-bold text-[#2f2d77]">
                    {formatCurrency(invoice.totalAmount, invoice.currency)}
                  </span>
                </div>
                {invoice.currency !== 'THB' && (
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                    <span className="text-gray-600">THB Equivalent:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(invoice.expectedBaseAmount, 'THB')}
                      <span className="text-xs text-gray-500 ml-1">
                        @ {invoice.fxRate.toFixed(4)}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Status */}
          {invoice.payments && invoice.payments.length > 0 && (
            <div className="mb-8 p-5 bg-green-50 border border-green-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Payment History</h4>
              <div className="space-y-2">
                {invoice.payments.map((payment: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {payment.date} - {payment.method}
                      {payment.reference && ` (${payment.reference})`}
                    </span>
                    <span className="font-medium text-green-700">
                      {formatCurrency(payment.amount, invoice.currency)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-2 border-t border-green-300 mt-2">
                  <span className="font-medium text-gray-900">Remaining Balance:</span>
                  <span className="font-bold text-amber-700">
                    {formatCurrency(invoice.outstanding, invoice.currency)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {invoice.notes && (
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Notes:</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}

          {/* Terms & Conditions */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Payment Terms & Instructions</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Payment is due within {invoice.paymentTerms || 'Net 30'} from invoice date</p>
              <p>• Please include invoice number in payment reference</p>
              <p>• Bank: Bangkok Bank, Account: 123-4-56789-0</p>
              <p>• PromptPay: 0105558000000</p>
              <p>• For any questions, contact billing@ipps.com</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              This is a computer-generated invoice and does not require a signature.
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