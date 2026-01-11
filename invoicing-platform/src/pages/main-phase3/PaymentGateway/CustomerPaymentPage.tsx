import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Building2,
  CreditCard,
  QrCode,
  CheckCircle,
  AlertCircle,
  Lock,
  Clock,
  Shield,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CustomerPaymentPage() {
  const { linkToken } = useParams<{ linkToken: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Fetch payment link data on mount
  useEffect(() => {
    const fetchPaymentLink = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/payment-links/${linkToken}`);
        // const data = await response.json();
        
        // Mock data for now
        const mockInvoice = {
          linkCode: 'PL-2026-001',
          invoiceNumber: 'INV-2026-001',
          merchant: 'IPPS Company Limited',
          customer: 'Acme Corporation',
          amount: 535000,
          currency: 'THB',
          expiresAt: '2026-01-12 23:59',
          description: 'API Integration Service, Custom Development',
          allowedMethods: ['thai_qr', 'ktc_card'],
          status: 'pending', // pending, paid, expired
        };
        
        // Check if link is expired
        const expiryDate = new Date(mockInvoice.expiresAt);
        if (expiryDate < new Date()) {
          navigate('/pay/expired');
          return;
        }
        
        // Check if already paid
        if (mockInvoice.status === 'paid') {
          navigate('/pay/completed');
          return;
        }
        
        setInvoice(mockInvoice);
      } catch (error) {
        console.error('Error fetching payment link:', error);
        navigate('/pay/expired');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentLink();
  }, [linkToken, navigate]);

  const paymentMethods = [
    {
      code: 'thai_qr',
      name: 'Thai QR Payment',
      icon: '🇹🇭',
      description: 'Pay with PromptPay or any Thai banking app',
      processor: 'Instant',
      fees: 'No fees',
    },
    {
      code: 'ktc_card',
      name: 'Credit / Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, JCB accepted',
      processor: 'KTC Gateway',
      fees: '2.5% processing fee',
    },
    {
      code: 'sbp_qr',
      name: 'SBP QR Payment',
      icon: '🇷🇺',
      description: 'Russian Fast Payment System',
      processor: 'Instant',
      fees: '0.4% fee',
    },
    {
      code: 'mir_card',
      name: 'MIR Card',
      icon: '🇷🇺',
      description: 'Russian payment card system',
      processor: 'MIR Gateway',
      fees: '1.8% processing fee',
    },
  ];

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : currency === 'RUB' ? '₽' : currency;
    return `${symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)}`;
  };

  const filteredMethods = paymentMethods.filter(m => 
    invoice?.allowedMethods.includes(m.code)
  );

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // TODO: Call actual payment API
    // await processPayment(linkToken, selectedMethod, cardDetails);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 2000);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border border-gray-200">
          <CardContent className="p-8 text-center">
            <RefreshCw className="h-12 w-12 text-[#2f2d77] animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading payment information...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No invoice data
  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border border-gray-200">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Link Not Found</h2>
            <p className="text-gray-600">This payment link is invalid or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isPaid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-gray-200">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your payment. Your transaction has been completed successfully.
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-medium text-gray-900">TXN-{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice:</span>
                    <span className="font-medium text-gray-900">{invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium text-gray-900">
                      {paymentMethods.find(m => m.code === selectedMethod)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium text-gray-900">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p>A confirmation email has been sent to your registered email address.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2f2d77] rounded-lg flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{invoice.merchant}</h1>
          <p className="text-gray-600">Secure Payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                {!selectedMethod ? (
                  <>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Select Payment Method
                    </h2>
                    <div className="space-y-3">
                      {filteredMethods.map((method) => (
                        <div
                          key={method.code}
                          onClick={() => setSelectedMethod(method.code)}
                          className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#2f2d77] cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">{method.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{method.name}</h3>
                              <p className="text-sm text-gray-600">{method.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">
                                  {method.processor}
                                </Badge>
                                <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">
                                  {method.fees}
                                </Badge>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : selectedMethod === 'thai_qr' ? (
                  /* Thai QR Payment */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Thai QR Payment</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300"
                        onClick={() => setSelectedMethod(null)}
                      >
                        Change Method
                      </Button>
                    </div>

                    <div className="bg-white border-2 border-[#2f2d77] rounded-lg p-6 text-center">
                      <div className="w-64 h-64 bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="h-32 w-32 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Scan QR code with your mobile banking app
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>QR code valid for 15 minutes</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-1">How to pay:</p>
                        <ol className="list-decimal ml-4 space-y-1">
                          <li>Open your mobile banking app</li>
                          <li>Scan the QR code above</li>
                          <li>Confirm the payment amount</li>
                          <li>Complete the transaction</li>
                        </ol>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-[#2f2d77] hover:bg-[#252351] text-white h-12"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                          Waiting for Payment...
                        </>
                      ) : (
                        'I Have Completed Payment'
                      )}
                    </Button>
                  </div>
                ) : selectedMethod === 'ktc_card' ? (
                  /* Credit Card Payment */
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Card Payment</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300"
                        onClick={() => setSelectedMethod(null)}
                      >
                        Change Method
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Card Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="h-12 border-gray-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Cardholder Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="JOHN DOE"
                          className="h-12 border-gray-300"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Expiry Date <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="h-12 border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            CVV <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            type="password"
                            className="h-12 border-gray-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <Lock className="h-5 w-5 text-gray-600" />
                      <p className="text-sm text-gray-600">
                        Your card details are encrypted and secure
                      </p>
                    </div>

                    <Button
                      className="w-full bg-[#2f2d77] hover:bg-[#252351] text-white h-12"
                      onClick={handlePayment}
                      disabled={isProcessing || !cardNumber || !cardName || !cardExpiry || !cardCvv}
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Pay {formatCurrency(invoice.amount, invoice.currency)}
                        </>
                      )}
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border border-gray-200 sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Invoice Number</p>
                    <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium text-gray-900">{invoice.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-sm text-gray-900">{invoice.description}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(invoice.amount, invoice.currency)}
                    </span>
                  </div>
                  {selectedMethod === 'ktc_card' && (
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Processing Fee (2.5%)</span>
                      <span className="text-sm text-gray-900">
                        {formatCurrency(invoice.amount * 0.025, invoice.currency)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-[#2f2d77]">
                      {formatCurrency(
                        selectedMethod === 'ktc_card' ? invoice.amount * 1.025 : invoice.amount,
                        invoice.currency
                      )}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span>Data encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Expires: {invoice.expiresAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by IPPS Payment Gateway</p>
          <p className="mt-1">Secure payment processing</p>
        </div>
      </div>
    </div>
  );
}