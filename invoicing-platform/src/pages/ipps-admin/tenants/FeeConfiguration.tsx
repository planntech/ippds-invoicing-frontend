// src/pages/admin/tenants/FeeConfiguration.tsx
import { useState } from 'react';
import { DollarSign, Save, Plus, Trash2, AlertCircle, Search, Building2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeeTier {
  id: number;
  minAmount: number;
  maxAmount: number | null;
  fixedFee: number;
  percentageFee: number;
}

interface PaymentMethodFee {
  id: string;
  methodId: string;
  methodName: string;
  enabled: boolean;
  tiers: FeeTier[];
}

interface TenantFeeConfig {
  tenantId: number;
  tenantName: string;
  currency: string;
  paymentMethods: PaymentMethodFee[];
}

export default function FeeConfiguration() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<number | null>(null);

  // Available tenants
  const tenants = [
    { id: 1, name: 'Acme Corporation Ltd.', email: 'admin@acme.com' },
    { id: 2, name: 'Global Trading Co.', email: 'contact@globaltrading.com' },
    { id: 3, name: 'Tech Startup Inc.', email: 'hello@techstartup.io' },
    { id: 4, name: 'Digital Solutions Co.', email: 'contact@digitalsol.com' },
    { id: 5, name: 'Manufacturing Plus Ltd.', email: 'admin@mfgplus.com' },
  ];

  // Available payment methods
  const availablePaymentMethods = [
    { id: 'thaiqr', name: 'Thai QR (PromptPay)' },
    { id: 'sbpqr', name: 'SBP QR (Russia)' },
    { id: 'mircard', name: 'MIR Card' },
    { id: 'ktccard', name: 'KTC Card' },
    { id: 'visa', name: 'Visa' },
    { id: 'mastercard', name: 'Mastercard' },
    { id: 'banktransfer', name: 'Bank Transfer' },
  ];

  // Mock fee configurations for tenants
  const [feeConfigs, setFeeConfigs] = useState<TenantFeeConfig[]>([
    {
      tenantId: 1,
      tenantName: 'Acme Corporation Ltd.',
      currency: 'THB',
      paymentMethods: [
        {
          id: 'pm-1',
          methodId: 'thaiqr',
          methodName: 'Thai QR (PromptPay)',
          enabled: true,
          tiers: [
            { id: 1, minAmount: 0, maxAmount: 100, fixedFee: 4, percentageFee: 2 },
            { id: 2, minAmount: 100.01, maxAmount: null, fixedFee: 2, percentageFee: 1 },
          ],
        },
        {
          id: 'pm-2',
          methodId: 'sbpqr',
          methodName: 'SBP QR (Russia)',
          enabled: true,
          tiers: [
            { id: 1, minAmount: 0, maxAmount: 500, fixedFee: 10, percentageFee: 2.5 },
            { id: 2, minAmount: 500.01, maxAmount: null, fixedFee: 5, percentageFee: 1.5 },
          ],
        },
        {
          id: 'pm-3',
          methodId: 'ktccard',
          methodName: 'KTC Card',
          enabled: false,
          tiers: [
            { id: 1, minAmount: 0, maxAmount: null, fixedFee: 0, percentageFee: 2.5 },
          ],
        },
      ],
    },
  ]);

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTenantConfig = feeConfigs.find((config) => config.tenantId === selectedTenant);

  const addPaymentMethod = () => {
    if (!selectedTenant) return;

    const tenant = feeConfigs.find((config) => config.tenantId === selectedTenant);
    if (!tenant) return;

    const existingMethods = tenant.paymentMethods.map((pm) => pm.methodId);
    const availableMethod = availablePaymentMethods.find(
      (method) => !existingMethods.includes(method.id)
    );

    if (!availableMethod) {
      alert('All payment methods are already configured');
      return;
    }

    const newMethod: PaymentMethodFee = {
      id: `pm-${Date.now()}`,
      methodId: availableMethod.id,
      methodName: availableMethod.name,
      enabled: true,
      tiers: [
        { id: 1, minAmount: 0, maxAmount: null, fixedFee: 0, percentageFee: 0 },
      ],
    };

    setFeeConfigs((prev) =>
      prev.map((config) =>
        config.tenantId === selectedTenant
          ? {
              ...config,
              paymentMethods: [...config.paymentMethods, newMethod],
            }
          : config
      )
    );
  };

  const removePaymentMethod = (methodId: string) => {
    if (!selectedTenant) return;
    setFeeConfigs((prev) =>
      prev.map((config) =>
        config.tenantId === selectedTenant
          ? {
              ...config,
              paymentMethods: config.paymentMethods.filter((pm) => pm.id !== methodId),
            }
          : config
      )
    );
  };

  const togglePaymentMethod = (methodId: string) => {
    if (!selectedTenant) return;
    setFeeConfigs((prev) =>
      prev.map((config) =>
        config.tenantId === selectedTenant
          ? {
              ...config,
              paymentMethods: config.paymentMethods.map((pm) =>
                pm.id === methodId ? { ...pm, enabled: !pm.enabled } : pm
              ),
            }
          : config
      )
    );
  };

  const addTier = (methodId: string) => {
    if (!selectedTenant) return;
    setFeeConfigs((prev) =>
      prev.map((config) =>
        config.tenantId === selectedTenant
          ? {
              ...config,
              paymentMethods: config.paymentMethods.map((pm) =>
                pm.id === methodId
                  ? {
                      ...pm,
                      tiers: [
                        ...pm.tiers,
                        {
                          id: pm.tiers.length + 1,
                          minAmount: 0,
                          maxAmount: null,
                          fixedFee: 0,
                          percentageFee: 0,
                        },
                      ],
                    }
                  : pm
              ),
            }
          : config
      )
    );
  };

  const removeTier = (methodId: string, tierId: number) => {
    if (!selectedTenant) return;
    setFeeConfigs((prev) =>
      prev.map((config) =>
        config.tenantId === selectedTenant
          ? {
              ...config,
              paymentMethods: config.paymentMethods.map((pm) =>
                pm.id === methodId
                  ? {
                      ...pm,
                      tiers: pm.tiers.filter((tier) => tier.id !== tierId),
                    }
                  : pm
              ),
            }
          : config
      )
    );
  };

  const calculateFeeExample = (tiers: FeeTier[], amount: number) => {
    const applicableTier = tiers.find(
      (tier) =>
        amount >= tier.minAmount &&
        (tier.maxAmount === null || amount <= tier.maxAmount)
    );

    if (!applicableTier) return 0;

    return applicableTier.fixedFee + (amount * applicableTier.percentageFee) / 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Fee Configuration by Tenant</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure payment fees and tier structures for each tenant
          </p>
        </div>
        {selectedTenant && (
          <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        )}
      </div>

      {/* Info Banner */}
      <Card className="border border-blue-200 bg-blue-50">
        <CardContent className="p-5">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Fee Configuration Guidelines</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Configure fee structures per tenant and payment method</li>
                <li>
                  • Tiers allow different fees based on transaction amount ranges
                </li>
                <li>• Each tier can have both fixed fee (฿) and percentage fee (%)</li>
                <li>
                  • Example: 0-100 THB = ฿4 + 2%, 100.01+ THB = ฿2 + 1%
                </li>
                <li>• Changes apply immediately to all new transactions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tenant List */}
        <Card className="border border-gray-200 lg:col-span-1">
          <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
            <CardTitle className="text-base font-semibold text-gray-900">Select Tenant</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tenants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                />
              </div>
            </div>

            {/* Tenant List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredTenants.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => setSelectedTenant(tenant.id)}
                  className={`w-full text-left p-3 border transition-all rounded ${
                    selectedTenant === tenant.id
                      ? 'border-[#2f2d77] bg-[#2f2d77]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2f2d77]/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-[#2f2d77]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {tenant.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{tenant.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fee Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {!selectedTenant ? (
            <Card className="border border-gray-200">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select a Tenant
                </h3>
                <p className="text-gray-500">
                  Choose a tenant from the list to configure their fee structure
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Selected Tenant Info */}
              <Card className="border border-gray-200">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#2f2d77]/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-[#2f2d77]" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {selectedTenantConfig?.tenantName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Currency: {selectedTenantConfig?.currency}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={addPaymentMethod}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:bg-gray-50 h-9"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              {selectedTenantConfig?.paymentMethods.map((method) => (
                <Card key={method.id} className="border border-gray-200">
                  <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{method.methodName}</h3>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            method.enabled
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-gray-50 text-gray-600 border-gray-300'
                          }`}
                        >
                          {method.enabled ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePaymentMethod(method.id)}
                          className={`h-9 ${
                            method.enabled
                              ? 'border-gray-300 hover:bg-gray-50'
                              : 'border-green-300 bg-green-50 hover:bg-green-100 text-green-700'
                          }`}
                        >
                          {method.enabled ? 'Disable' : 'Enable'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePaymentMethod(method.id)}
                          className="h-9 w-9 p-0 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Fee Tiers */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium text-gray-700">
                            Fee Tiers
                          </Label>
                          <Button
                            onClick={() => addTier(method.id)}
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50 h-8"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Tier
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {method.tiers.map((tier, index) => (
                            <div
                              key={tier.id}
                              className="p-4 border border-gray-200 rounded space-y-3"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                  Tier {index + 1}
                                </span>
                                {method.tiers.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTier(method.id, tier.id)}
                                    className="h-7 w-7 p-0 text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label className="text-xs font-medium text-gray-600">
                                    Min Amount (฿)
                                  </Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    defaultValue={tier.minAmount}
                                    className="h-9 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-xs font-medium text-gray-600">
                                    Max Amount (฿)
                                  </Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Unlimited"
                                    defaultValue={tier.maxAmount || ''}
                                    className="h-9 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-xs font-medium text-gray-600">
                                    Fixed Fee (฿)
                                  </Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    defaultValue={tier.fixedFee}
                                    className="h-9 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-xs font-medium text-gray-600">
                                    Percentage Fee (%)
                                  </Label>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    defaultValue={tier.percentageFee}
                                    className="h-9 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                                  />
                                </div>
                              </div>

                              {/* Tier Description */}
                              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                                <span className="font-medium">Range:</span> ฿
                                {tier.minAmount.toFixed(2)} -{' '}
                                {tier.maxAmount ? `฿${tier.maxAmount.toFixed(2)}` : 'Unlimited'}{' '}
                                | <span className="font-medium">Fee:</span> ฿
                                {tier.fixedFee.toFixed(2)} + {tier.percentageFee}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fee Calculator Preview */}
                      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
                        <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                          Fee Calculator Preview
                        </p>
                        <div className="space-y-2 text-sm text-gray-700">
                          {[50, 100, 500, 1000, 5000].map((amount) => {
                            const fee = calculateFeeExample(method.tiers, amount);
                            return (
                              <div
                                key={amount}
                                className="flex items-center justify-between"
                              >
                                <span>฿{amount.toLocaleString()} transaction:</span>
                                <span className="font-medium">
                                  ฿{fee.toFixed(2)} fee (Net: ฿
                                  {(amount - fee).toFixed(2)})
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}