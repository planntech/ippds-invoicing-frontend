import { useState, useRef } from 'react';
import {
  X,
  Check,
  FileSignature,
  Upload,
  Pen,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DigitalSignatureModalProps {
  open: boolean;
  onClose: () => void;
  quotation: any;
  onAccepted: () => void;
}

export default function DigitalSignatureModal({
  open,
  onClose,
  quotation,
  onAccepted,
}: DigitalSignatureModalProps) {
  const [signatureMethod, setSignatureMethod] = useState<'draw' | 'upload'>('draw');
  const [signatoryName, setSignatoryName] = useState('');
  const [signatoryTitle, setSignatoryTitle] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!open || !quotation) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : '$';
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasSignature(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
      }
    }
  };

  const handleAccept = () => {
    if (signatoryName && signatoryTitle && hasSignature && acceptTerms) {
      onAccepted();
    }
  };

  const isFormValid = signatoryName && signatoryTitle && hasSignature && acceptTerms;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-3xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Customer Acceptance</h2>
            <p className="text-sm text-gray-500 mt-1">Digital signature for quotation approval</p>
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
                <p className="text-gray-600">Valid Until</p>
                <p className="font-medium text-gray-900">{quotation.validUntil}</p>
              </div>
            </div>
          </div>

          {/* Signatory Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Signatory Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={signatoryName}
                  onChange={(e) => setSignatoryName(e.target.value)}
                  placeholder="Enter full name"
                  className="h-10 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Title/Position <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={signatoryTitle}
                  onChange={(e) => setSignatoryTitle(e.target.value)}
                  placeholder="e.g., CEO, Procurement Manager"
                  className="h-10 border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                placeholder="signatory@company.com"
                className="h-10 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Company Name (if different)
              </Label>
              <Input
                placeholder="Optional"
                className="h-10 border-gray-300"
              />
            </div>
          </div>

          {/* Signature Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">
                Digital Signature <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={signatureMethod === 'draw' ? 'default' : 'outline'}
                  onClick={() => setSignatureMethod('draw')}
                  className={
                    signatureMethod === 'draw'
                      ? 'bg-[#2f2d77] hover:bg-[#252351] text-white h-8'
                      : 'border-gray-300 hover:bg-gray-50 h-8'
                  }
                >
                  <Pen className="h-3 w-3 mr-1" />
                  Draw
                </Button>
                <Button
                  size="sm"
                  variant={signatureMethod === 'upload' ? 'default' : 'outline'}
                  onClick={() => setSignatureMethod('upload')}
                  className={
                    signatureMethod === 'upload'
                      ? 'bg-[#2f2d77] hover:bg-[#252351] text-white h-8'
                      : 'border-gray-300 hover:bg-gray-50 h-8'
                  }
                >
                  <Upload className="h-3 w-3 mr-1" />
                  Upload
                </Button>
              </div>
            </div>

            {signatureMethod === 'draw' ? (
              <div className="space-y-3">
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg bg-white">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={200}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full cursor-crosshair"
                    style={{ touchAction: 'none' }}
                  />
                  {!hasSignature && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center text-gray-400">
                        <FileSignature className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">Draw your signature here</p>
                      </div>
                    </div>
                  )}
                </div>
                {hasSignature && (
                  <Button
                    onClick={clearSignature}
                    size="sm"
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50 h-9 w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Signature
                  </Button>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#2f2d77] transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  id="signature-upload"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setHasSignature(true);
                    }
                  }}
                />
                <label htmlFor="signature-upload" className="cursor-pointer">
                  <FileSignature className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload signature image</p>
                  <p className="text-xs text-gray-500">PNG or JPG (max 2MB)</p>
                </label>
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-3 p-4 border border-gray-200 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900">Terms & Conditions</h4>
            <div className="max-h-32 overflow-y-auto text-xs text-gray-600 space-y-2 p-3 bg-gray-50 border border-gray-200">
              <p>
                By signing this quotation, I confirm that I have read, understood, and agree to
                the following terms:
              </p>
              <ul className="space-y-1 ml-4">
                <li>
                  • This quotation is valid until {quotation.validUntil} and may be subject to
                  change after this date
                </li>
                <li>
                  • Payment terms are as specified in the quotation (typically Net 30 days from
                  invoice date)
                </li>
                <li>
                  • The total amount of {formatCurrency(quotation.total, quotation.currency)}{' '}
                  includes all items, taxes, and fees as detailed
                </li>
                <li>
                  • Delivery timelines and service schedules are subject to the project scope
                  outlined
                </li>
                <li>
                  • Any modifications to the scope of work may result in revised pricing and
                  timelines
                </li>
                <li>
                  • Cancellation terms and conditions apply as per our standard agreement
                </li>
              </ul>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="accept-terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-1 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
              />
              <Label htmlFor="accept-terms" className="text-sm text-gray-700 cursor-pointer">
                I confirm that I have the authority to accept this quotation on behalf of{' '}
                <span className="font-medium">{quotation.customer}</span> and agree to the terms
                and conditions outlined above.
              </Label>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Legal Notice</p>
              <p>
                This digital signature has the same legal validity as a handwritten signature.
                Please ensure all information is accurate before accepting.
              </p>
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
            disabled={!isFormValid}
            onClick={handleAccept}
          >
            <Check className="h-4 w-4 mr-2" />
            Accept Quotation
          </Button>
        </div>
      </div>
    </div>
  );
}