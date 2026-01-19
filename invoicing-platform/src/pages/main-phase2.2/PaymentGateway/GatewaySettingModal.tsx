import { useState } from 'react';
import {
  X,
  Settings,
  Key,
  Webhook,
  Shield,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface GatewaySettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GatewaySettingsModal({
  open,
  onClose,
}: GatewaySettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'thai_qr' | 'ktc_card' | 'sbp_qr' | 'mir_card'>('thai_qr');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  if (!open) return null;

  const gateways = {
    thai_qr: {
      name: 'Thai QR Payment',
      icon: '🇹🇭',
      status: 'active',
      config: {
        merchantId: 'IPPS-TH-001',
        apiKey: 'pk_live_51H8ZqDAbCdEfGhIjK',
        secretKey: 'sk_live_51H8ZqDAbCdEfGhIjK',
        webhookUrl: 'https://api.ipps.com/webhooks/thai-qr',
        webhookSecret: 'whsec_51H8ZqDAbCdEfGhIjK',
      },
      features: [
        'PromptPay QR',
        'ThaiQR Standard',
        'Real-time confirmation',
        'No processing fees',
      ],
    },
    ktc_card: {
      name: 'KTC Card Gateway',
      icon: '💳',
      status: 'active',
      config: {
        merchantId: 'KTC-IPPS-001',
        apiKey: 'pk_live_ktc_51AbCdEfGhIjKlMn',
        secretKey: 'sk_live_ktc_51AbCdEfGhIjKlMn',
        webhookUrl: 'https://api.ipps.com/webhooks/ktc-card',
        webhookSecret: 'whsec_ktc_51AbCdEfGhIjKlMn',
      },
      features: [
        'Visa / Mastercard / JCB',
        '3D Secure authentication',
        'Tokenization support',
        '2.5% processing fee',
      ],
    },
    sbp_qr: {
      name: 'SBP QR Payment',
      icon: '🇷🇺',
      status: 'active',
      config: {
        merchantId: 'SBP-IPPS-001',
        apiKey: 'pk_live_sbp_51OpQrStUvWxYz',
        secretKey: 'sk_live_sbp_51OpQrStUvWxYz',
        webhookUrl: 'https://api.ipps.com/webhooks/sbp-qr',
        webhookSecret: 'whsec_sbp_51OpQrStUvWxYz',
      },
      features: [
        'Russian Fast Payment System',
        'QR code payments',
        'Instant settlement',
        '0.4% processing fee',
      ],
    },
    mir_card: {
      name: 'MIR Card Gateway',
      icon: '🇷🇺',
      status: 'active',
      config: {
        merchantId: 'MIR-IPPS-001',
        apiKey: 'pk_live_mir_51AbCdEfGhIjKlMn',
        secretKey: 'sk_live_mir_51AbCdEfGhIjKlMn',
        webhookUrl: 'https://api.ipps.com/webhooks/mir-card',
        webhookSecret: 'whsec_mir_51AbCdEfGhIjKlMn',
      },
      features: [
        'MIR card network',
        'Secure card processing',
        'Local currency support',
        '1.8% processing fee',
      ],
    },
  };

  const currentGateway = gateways[activeTab];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Gateway Settings</h2>
            <p className="text-sm text-gray-500 mt-1">
              Configure payment gateways and webhook endpoints
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Gateway Tabs */}
          <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
            <div className="space-y-2">
              {(Object.keys(gateways) as Array<keyof typeof gateways>).map((key) => {
                const gateway = gateways[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeTab === key
                        ? 'bg-[#2f2d77] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{gateway.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{gateway.name}</p>
                        <Badge
                          className={`mt-1 text-xs ${
                            activeTab === key
                              ? 'bg-white/20 text-white border-0'
                              : 'bg-green-50 text-green-700 border-0'
                          }`}
                        >
                          {gateway.status}
                        </Badge>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gateway Configuration */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Gateway Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{currentGateway.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {currentGateway.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Configuration and integration settings
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {currentGateway.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Credentials */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  API Credentials
                </h4>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Merchant ID</Label>
                    <div className="flex gap-2">
                      <Input
                        value={currentGateway.config.merchantId}
                        readOnly
                        className="h-10 border-gray-300 bg-gray-50"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 h-10 px-3"
                        onClick={() => copyToClipboard(currentGateway.config.merchantId)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">API Key (Public)</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          value={currentGateway.config.apiKey}
                          type={showApiKey ? 'text' : 'password'}
                          readOnly
                          className="h-10 border-gray-300 bg-gray-50 pr-10"
                        />
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 h-10 px-3"
                        onClick={() => copyToClipboard(currentGateway.config.apiKey)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Secret Key</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          value={currentGateway.config.secretKey}
                          type={showSecretKey ? 'text' : 'password'}
                          readOnly
                          className="h-10 border-gray-300 bg-gray-50 pr-10"
                        />
                        <button
                          onClick={() => setShowSecretKey(!showSecretKey)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showSecretKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 h-10 px-3"
                        onClick={() => copyToClipboard(currentGateway.config.secretKey)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Webhook Configuration */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Webhook className="h-4 w-4" />
                  Webhook Configuration
                </h4>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Webhook URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={currentGateway.config.webhookUrl}
                        readOnly
                        className="h-10 border-gray-300 bg-gray-50 font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 h-10 px-3"
                        onClick={() => copyToClipboard(currentGateway.config.webhookUrl)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Webhook Secret</Label>
                    <div className="flex gap-2">
                      <Input
                        value={currentGateway.config.webhookSecret}
                        type="password"
                        readOnly
                        className="h-10 border-gray-300 bg-gray-50"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 h-10 px-3"
                        onClick={() => copyToClipboard(currentGateway.config.webhookSecret)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">Webhook Events</p>
                    <ul className="space-y-1">
                      <li>• <code className="bg-white px-1 rounded">payment.success</code> - Payment completed successfully</li>
                      <li>• <code className="bg-white px-1 rounded">payment.failed</code> - Payment failed or declined</li>
                      <li>• <code className="bg-white px-1 rounded">payment.pending</code> - Payment is being processed</li>
                      <li>• <code className="bg-white px-1 rounded">refund.completed</code> - Refund processed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security Settings
                </h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Signature Verification</p>
                      <p className="text-xs text-gray-600">Validate webhook signatures</p>
                    </div>
                    <Badge className="bg-green-50 text-green-700 border-0">Enabled</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Auto-Retry Failed Webhooks</p>
                      <p className="text-xs text-gray-600">Retry up to 3 times with exponential backoff</p>
                    </div>
                    <Badge className="bg-green-50 text-green-700 border-0">Enabled</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">IP Whitelist</p>
                      <p className="text-xs text-gray-600">Only accept webhooks from gateway IPs</p>
                    </div>
                    <Badge className="bg-green-50 text-green-700 border-0">Enabled</Badge>
                  </div>
                </div>
              </div>

              {/* Test Connection */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-50 h-10"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-50 h-10"
                >
                  <Webhook className="h-4 w-4 mr-2" />
                  Send Test Webhook
                </Button>
              </div>
            </div>
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
          <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
            <Settings className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}