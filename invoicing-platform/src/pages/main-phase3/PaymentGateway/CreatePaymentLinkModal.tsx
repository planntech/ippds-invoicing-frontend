import { useState } from 'react';
import {
  X,
  Link as LinkIcon,
  Calendar,
  CreditCard,
  QrCode,
  CheckCircle,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface CreatePaymentLinkModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreatePaymentLinkModal({
  open,
  onClose,
  onCreated,
}: CreatePaymentLinkModalProps) {
  const [invoiceId, setInvoiceId] = useState('');
  const [expiryHours, setExpiryHours] = useState(168); // 7 days default
  const [allowedMethods, setAllowedMethods] = useState<string[]>(['thai_qr', 'ktc_card']);
  const [generatedLink, setGeneratedLink] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  if (!open) return null;

  const paymentMethods = [
    {
      code: 'thai_qr',
      name: 'Thai QR',
      icon: '🇹🇭',
      description: 'PromptPay & ThaiQR',
      currency: 'THB',
      fees: '0%',
    },
    {
      code: 'ktc_card',
      name: 'Credit Card',
      icon: '💳',
      description: 'Visa, Mastercard, JCB',
      currency: 'THB',
      fees: '2.5%',
    },
    {
      code: 'sbp_qr',
      name: 'SBP QR',
      icon: '🇷🇺',
      description: 'Russian QR Payment',
      currency: 'RUB',
      fees: '0.4%',
    },
    {
      code: 'mir_card',
      name: 'MIR Card',
      icon: '🇷🇺',
      description: 'Russian Card Payment',
      currency: 'RUB',
      fees: '1.8%',
    },
  ];

  const toggleMethod = (code: string) => {
    if (allowedMethods.includes(code)) {
      setAllowedMethods(allowedMethods.filter(m => m !== code));
    } else {
      setAllowedMethods([...allowedMethods, code]);
    }
  };

  const handleGenerate = () => {
    // Generate unique link
    const linkCode = `PL-${Date.now()}`;
    const link = `https://pay.ipps.com/pl/${linkCode}`;
    setGeneratedLink(link);
    setIsGenerated(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    // Show success toast
  };

  const handleComplete = () => {
    onCreated();
    onClose();
    // Reset form
    setIsGenerated(false);
    setGeneratedLink('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Create Payment Link</h2>
            <p className="text-sm text-gray-500 mt-1">
              Generate secure payment link for invoice
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
          {!isGenerated ? (
            <>
              {/* Invoice Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Select Invoice <span className="text-red-500">*</span>
                </Label>
                <select
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                >
                  <option value="">Select invoice...</option>
                  <option value="1">INV-2026-001 - Acme Corporation - ฿535,000.00</option>
                  <option value="2">INV-2026-002 - Tech Solutions Ltd - $10,165.00</option>
                  <option value="3">INV-2026-003 - Global Industries - ฿856,000.00</option>
                  <option value="4">INV-2026-004 - Ministry of Commerce - ฿1,200,000.00</option>
                </select>
              </div>

              {/* Expiry Settings */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Link Expiry
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant={expiryHours === 24 ? 'default' : 'outline'}
                    className={`h-10 ${expiryHours === 24 ? 'bg-[#2f2d77] hover:bg-[#252351]' : 'border-gray-300'}`}
                    onClick={() => setExpiryHours(24)}
                  >
                    24 Hours
                  </Button>
                  <Button
                    variant={expiryHours === 72 ? 'default' : 'outline'}
                    className={`h-10 ${expiryHours === 72 ? 'bg-[#2f2d77] hover:bg-[#252351]' : 'border-gray-300'}`}
                    onClick={() => setExpiryHours(72)}
                  >
                    3 Days
                  </Button>
                  <Button
                    variant={expiryHours === 168 ? 'default' : 'outline'}
                    className={`h-10 ${expiryHours === 168 ? 'bg-[#2f2d77] hover:bg-[#252351]' : 'border-gray-300'}`}
                    onClick={() => setExpiryHours(168)}
                  >
                    7 Days
                  </Button>
                  <Button
                    variant={expiryHours === 720 ? 'default' : 'outline'}
                    className={`h-10 ${expiryHours === 720 ? 'bg-[#2f2d77] hover:bg-[#252351]' : 'border-gray-300'}`}
                    onClick={() => setExpiryHours(720)}
                  >
                    30 Days
                  </Button>
                </div>
                <Input
                  type="number"
                  value={expiryHours}
                  onChange={(e) => setExpiryHours(Number(e.target.value))}
                  placeholder="Custom hours"
                  className="h-10 border-gray-300"
                />
                <p className="text-xs text-gray-500">
                  Link expires on: {new Date(Date.now() + expiryHours * 3600000).toLocaleString()}
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                  Allowed Payment Methods <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.code}
                      onClick={() => toggleMethod(method.code)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        allowedMethods.includes(method.code)
                          ? 'border-[#2f2d77] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{method.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{method.name}</h4>
                            {allowedMethods.includes(method.code) && (
                              <CheckCircle className="h-5 w-5 text-[#2f2d77]" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{method.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">
                              {method.currency}
                            </Badge>
                            <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">
                              Fee: {method.fees}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {allowedMethods.length === 0 && (
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Please select at least one payment method
                  </p>
                )}
              </div>

              {/* Info */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Payment Link Features</p>
                  <ul className="space-y-1">
                    <li>• Secure HTTPS link with unique token</li>
                    <li>• Customer can choose from allowed payment methods</li>
                    <li>• Real-time payment status updates via webhooks</li>
                    <li>• Automatic invoice update on successful payment</li>
                    <li>• Email confirmation sent to customer</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            /* Generated Link Display */
            <div className="space-y-6">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Payment Link Generated!
                </h3>
                <p className="text-sm text-gray-600">
                  Share this link with your customer to receive payment
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Payment Link</Label>
                <div className="flex gap-2">
                  <Input
                    value={generatedLink}
                    readOnly
                    className="h-10 border-gray-300 font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 h-10 px-4"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600">Link Code</p>
                  <p className="text-sm font-medium text-gray-900">PL-{Date.now()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Expires</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(Date.now() + expiryHours * 3600000).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Invoice</p>
                  <p className="text-sm font-medium text-gray-900">INV-2026-001</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Payment Methods</p>
                  <div className="flex gap-1 mt-1">
                    {allowedMethods.map((code) => {
                      const method = paymentMethods.find(m => m.code === code);
                      return <span key={code} className="text-lg">{method?.icon}</span>;
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Next Steps</p>
                  <ul className="space-y-1">
                    <li>• Copy and share the link with your customer</li>
                    <li>• Customer selects payment method and completes payment</li>
                    <li>• You'll receive real-time notification on payment</li>
                    <li>• Invoice will be automatically marked as paid</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-100 h-10 px-6"
            onClick={onClose}
          >
            Cancel
          </Button>
          {!isGenerated ? (
            <Button
              className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6"
              onClick={handleGenerate}
              disabled={!invoiceId || allowedMethods.length === 0}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Generate Link
            </Button>
          ) : (
            <Button
              className="bg-green-600 hover:bg-green-700 text-white h-10 px-6"
              onClick={handleComplete}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}