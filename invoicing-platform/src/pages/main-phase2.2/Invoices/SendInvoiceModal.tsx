import { useState } from 'react';
import {
  X,
  Send,
  Mail,
  UserPlus,
  AlertCircle,
  FileText,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface SendInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  invoice: any;
  onSent: () => void;
}

export default function SendInvoiceModal({
  open,
  onClose,
  invoice,
  onSent,
}: SendInvoiceModalProps) {
  const [toEmail, setToEmail] = useState('');
  const [ccEmails, setCcEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachPDF, setAttachPDF] = useState(true);
  const [sendCopy, setSendCopy] = useState(true);

  if (!open || !invoice) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : currency === 'USD' ? '$' : currency;
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  const defaultSubject = `Invoice ${invoice.invoiceNumber} from IPPS Company Limited`;
  const defaultMessage = `Dear ${invoice.customer},

Please find attached invoice ${invoice.invoiceNumber} for ${formatCurrency(invoice.totalAmount, invoice.currency)}.

Invoice Details:
- Issue Date: ${invoice.issueDate}
- Due Date: ${invoice.dueDate}
- Amount: ${formatCurrency(invoice.totalAmount, invoice.currency)}
${invoice.currency !== 'THB' ? `- THB Equivalent: ${formatCurrency(invoice.expectedBaseAmount, 'THB')} @ ${invoice.fxRate.toFixed(4)}` : ''}

Payment Terms: ${invoice.paymentTerms || 'Net 30'}

Please make payment by the due date to avoid any late fees. If you have any questions regarding this invoice, please don't hesitate to contact us.

Thank you for your business!

Best regards,
IPPS Company Limited
billing@ipps.com
+66 2 123 4567`;

  const handleSend = () => {
    // Validation
    if (!toEmail) {
      alert('Please enter recipient email');
      return;
    }

    // Handle send logic
    console.log('Sending invoice:', {
      to: toEmail,
      cc: ccEmails,
      subject: subject || defaultSubject,
      message: message || defaultMessage,
      attachPDF,
      sendCopy,
    });

    onSent();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-3xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Send Invoice</h2>
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
                <p className="text-gray-600">Invoice Number</p>
                <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Customer</p>
                <p className="font-medium text-gray-900">{invoice.customer}</p>
              </div>
              <div>
                <p className="text-gray-600">Amount</p>
                <p className="font-medium text-gray-900">
                  {formatCurrency(invoice.totalAmount, invoice.currency)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Due Date</p>
                <p className="font-medium text-gray-900">{invoice.dueDate}</p>
              </div>
            </div>
          </div>

          {/* Email Recipients */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                To <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  value={toEmail}
                  onChange={(e) => setToEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="pl-10 h-10 border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                CC (Optional)
              </Label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  value={ccEmails}
                  onChange={(e) => setCcEmails(e.target.value)}
                  placeholder="email1@example.com, email2@example.com"
                  className="pl-10 h-10 border-gray-300"
                />
              </div>
              <p className="text-xs text-gray-500">Separate multiple emails with commas</p>
            </div>
          </div>

          {/* Email Subject */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Subject
            </Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={defaultSubject}
              className="h-10 border-gray-300"
            />
          </div>

          {/* Email Message */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Message
            </Label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={defaultMessage}
              rows={12}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none font-mono"
            />
            <p className="text-xs text-gray-500">
              Preview the default message above. Edit as needed.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <Label className="text-sm font-semibold text-gray-900">Email Options</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={attachPDF}
                  onChange={(e) => setAttachPDF(e.target.checked)}
                  className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                />
                <span className="text-sm text-gray-700">
                  Attach invoice as PDF
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sendCopy}
                  onChange={(e) => setSendCopy(e.target.checked)}
                  className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                />
                <span className="text-sm text-gray-700">
                  Send copy to billing@ipps.com
                </span>
              </label>
            </div>
          </div>

          {/* Tracking Info */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200">
            <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Email Tracking</p>
              <ul className="space-y-1">
                <li>• You'll receive a notification when the customer opens the email</li>
                <li>• Invoice status will automatically update to "Sent"</li>
                <li>• Customer can view and pay invoice through secure link</li>
                <li>• Email delivery and open rates are tracked in activity log</li>
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
            onClick={handleSend}
            disabled={!toEmail}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}