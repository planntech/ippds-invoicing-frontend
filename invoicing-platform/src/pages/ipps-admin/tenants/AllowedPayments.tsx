// src/pages/admin/tenants/AllowedPayments.tsx
import { useState } from 'react';
import { CreditCard, QrCode, Save, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AllowedPayments() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'thaiqr',
      name: 'Thai QR Payment',
      description: 'PromptPay QR code payments',
      icon: '🇹🇭',
      enabled: true,
      countries: ['Thailand'],
      fee: '1.5%',
      settlementTime: '1-2 business days',
    },
    {
      id: 'sbpqr',
      name: 'SBP QR Payment',
      description: 'Russian SBP QR code payments',
      icon: '🇷🇺',
      enabled: true,
      countries: ['Russia'],
      fee: '2.0%',
      settlementTime: '1-3 business days',
    },
    {
      id: 'creditcard-domestic',
      name: 'Credit Card (Domestic)',
      description: 'Visa, Mastercard, JCB (Thai issued)',
      icon: '💳',
      enabled: true,
      countries: ['Thailand'],
      fee: '2.5%',
      settlementTime: '2-3 business days',
    },
    {
      id: 'creditcard-international',
      name: 'Credit Card (International)',
      description: 'Visa, Mastercard, JCB (International)',
      icon: '🌍',
      enabled: true,
      countries: ['Global'],
      fee: '3.5%',
      settlementTime: '3-5 business days',
    },
    {
      id: 'banktransfer',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: '🏦',
      enabled: false,
      countries: ['Thailand'],
      fee: '฿25 fixed',
      settlementTime: '1 business day',
    },
    {
      id: 'alipay',
      name: 'Alipay',
      description: 'Alipay payments',
      icon: '🇨🇳',
      enabled: false,
      countries: ['China'],
      fee: '2.8%',
      settlementTime: '2-4 business days',
    },
    {
      id: 'wechatpay',
      name: 'WeChat Pay',
      description: 'WeChat Pay payments',
      icon: '💬',
      enabled: false,
      countries: ['China'],
      fee: '2.8%',
      settlementTime: '2-4 business days',
    },
    {
      id: 'paynow',
      name: 'PayNow',
      description: 'Singapore PayNow QR',
      icon: '🇸🇬',
      enabled: false,
      countries: ['Singapore'],
      fee: '1.8%',
      settlementTime: '1-2 business days',
    },
  ]);

  const togglePaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  const enabledCount = paymentMethods.filter((m) => m.enabled).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Allowed Payment Methods</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure which payment methods tenants can use
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {enabledCount} of {paymentMethods.length} enabled
          </Badge>
          <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={`border-2 transition-all ${
              method.enabled
                ? 'border-[#2f2d77] bg-[#2f2d77]/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{method.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePaymentMethod(method.id)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    method.enabled ? 'bg-[#2f2d77]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                      method.enabled ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Countries:</span>
                  <span className="font-medium text-gray-900">{method.countries.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Fee:</span>
                  <span className="font-medium text-gray-900">{method.fee}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Settlement:</span>
                  <span className="font-medium text-gray-900">{method.settlementTime}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <Badge
                  variant="outline"
                  className={`w-full justify-center ${
                    method.enabled
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-gray-50 text-gray-600 border-gray-300'
                  }`}
                >
                  {method.enabled ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Enabled for Tenants
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Disabled
                    </>
                  )}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
          <CardTitle className="text-base font-semibold text-gray-900">
            Payment Method Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Enabled Methods</p>
              <p className="text-2xl font-semibold text-gray-900">{enabledCount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Available Regions</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(paymentMethods.flatMap((m) => m.countries)).size}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">QR Methods</p>
              <p className="text-2xl font-semibold text-gray-900">
                {paymentMethods.filter((m) => m.id.includes('qr')).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}