import { useNavigate } from 'react-router-dom';
import {
  Building2,
  XCircle,
  Clock,
  Mail,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PaymentExpiredPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2f2d77] rounded-lg flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">IPPS Company Limited</h1>
          <p className="text-gray-600">Secure Payment</p>
        </div>

        <Card className="border border-gray-200">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-10 w-10 text-gray-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Link Expired</h2>
              <p className="text-gray-600 mb-6">
                This payment link has expired and is no longer valid for payment.
              </p>

              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6 text-left">
                <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">What happened?</p>
                  <p>Payment links expire for security reasons. This ensures your payment information remains protected.</p>
                </div>
              </div>

              <div className="space-y-4 mb-6 text-left">
                <h3 className="text-sm font-semibold text-gray-900">What to do next:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2f2d77] font-bold">1.</span>
                    <span>Contact the merchant to request a new payment link</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2f2d77] font-bold">2.</span>
                    <span>Check your email for the latest invoice or payment instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2f2d77] font-bold">3.</span>
                    <span>Contact support if you need assistance with your payment</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">Need Help?</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:billing@ipps.com" className="text-[#2f2d77] hover:underline">
                      billing@ipps.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+6621234567" className="text-[#2f2d77] hover:underline">
                      +66 2 123 4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by IPPS Payment Gateway</p>
          <p className="mt-1">Secure payment processing</p>
        </div>
      </div>
    </div>
  );
}