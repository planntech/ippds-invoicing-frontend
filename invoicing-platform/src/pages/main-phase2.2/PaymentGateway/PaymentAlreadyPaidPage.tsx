import { useNavigate } from 'react-router-dom';
import {
  Building2,
  CheckCircle,
  Mail,
  Phone,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PaymentAlreadyPaidPage() {
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
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Already Paid</h2>
              <p className="text-gray-600 mb-6">
                This invoice has already been paid. Thank you for your payment!
              </p>

              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6 text-left">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Payment Confirmed</p>
                  <p>Your payment has been successfully processed and recorded. A confirmation email has been sent to your registered email address.</p>
                </div>
              </div>

              <div className="space-y-4 mb-6 text-left">
                <h3 className="text-sm font-semibold text-gray-900">What's next:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2f2d77] font-bold">•</span>
                    <span>Check your email for the payment receipt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2f2d77] font-bold">•</span>
                    <span>Download your receipt for your records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2f2d77] font-bold">•</span>
                    <span>Contact us if you have any questions about your payment</span>
                  </li>
                </ul>
              </div>

              <Button
                className="w-full bg-[#2f2d77] hover:bg-[#252351] text-white h-12 mb-4"
                onClick={() => {
                  // TODO: Trigger receipt download
                  console.log('Download receipt');
                }}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Receipt
              </Button>

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