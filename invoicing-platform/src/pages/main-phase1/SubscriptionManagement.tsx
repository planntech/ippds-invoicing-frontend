import { useState } from 'react';
import {
  CreditCard,
  Check,
  Crown,
  Building2,
  Users,
  FileText,
  Calendar,
  AlertCircle,
  ChevronRight,
  Download,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SubscriptionManagement() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  // Current subscription
  const currentSubscription = {
    plan: 'small',
    status: 'active',
    billingCycle: 'monthly',
    nextBillingDate: '2026-02-07',
    amount: 1990,
    currency: '฿',
    usage: {
      invoices: 87,
      users: 6,
      branches: 2,
    },
  };

  // Subscription tiers
  const subscriptionTiers = [
    {
      id: 'trial',
      name: 'Trial',
      description: 'Perfect for testing',
      price: { monthly: 0, annually: 0 },
      invoiceLimit: 50,
      features: {
        users: 1,
        branches: 1,
        support: 'Email only',
        features: ['Basic invoicing', 'Email support', '7 days trial'],
      },
      badge: null,
      disabled: true,
      color: 'gray',
    },
    {
      id: 'small',
      name: 'Small Business',
      description: 'Great for small teams',
      price: { monthly: 1990, annually: 19900 },
      invoiceLimit: 100,
      features: {
        users: 20,
        branches: 3,
        support: 'Email & Chat',
        features: [
          'Up to 100 invoices/month',
          '20 team members',
          '3 branch locations',
          'Email & Chat support',
          'Basic reports',
          'Payment gateway integration',
        ],
      },
      badge: null,
      disabled: false,
      color: 'blue',
    },
    {
      id: 'medium',
      name: 'Medium Business',
      description: 'For growing companies',
      price: { monthly: 4990, annually: 49900 },
      invoiceLimit: 500,
      features: {
        users: 50,
        branches: 10,
        support: 'Priority support',
        features: [
          'Up to 500 invoices/month',
          '50 team members',
          '10 branch locations',
          'Priority support',
          'Advanced reports & analytics',
          'Multi-currency support',
          'Custom branding',
          'API access',
        ],
      },
      badge: 'Popular',
      disabled: false,
      color: 'green',
    },
    {
      id: 'large',
      name: 'Enterprise',
      description: 'Unlimited everything',
      price: { monthly: 9990, annually: 99900 },
      invoiceLimit: null,
      features: {
        users: 'Unlimited',
        branches: 'Unlimited',
        support: 'Dedicated account manager',
        features: [
          'Unlimited invoices',
          'Unlimited team members',
          'Unlimited branches',
          'Dedicated account manager',
          'Advanced analytics & insights',
          'Custom integrations',
          'White-label options',
          'SLA guarantee',
          'Training & onboarding',
        ],
      },
      badge: 'Best Value',
      disabled: false,
      color: 'purple',
    },
  ];

  // Payment history
  const paymentHistory = [
    {
      id: 1,
      date: '2026-01-07',
      description: 'Small Business Plan - Monthly',
      amount: 1990,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: 2,
      date: '2025-12-07',
      description: 'Small Business Plan - Monthly',
      amount: 1990,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: 3,
      date: '2025-11-07',
      description: 'Small Business Plan - Monthly',
      amount: 1990,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: 4,
      date: '2025-10-07',
      description: 'Trial Plan',
      amount: 0,
      status: 'paid',
      invoiceUrl: '#',
    },
  ];

  const getCurrentPlan = () => {
    return subscriptionTiers.find((tier) => tier.id === currentSubscription.plan);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  const getUsagePercentage = (current: number, limit: number | null) => {
    if (limit === null) return 0;
    return Math.round((current / limit) * 100);
  };

  const getBadgeColor = (planColor: string) => {
    const colors: Record<string, string> = {
      gray: 'bg-gray-50 text-gray-700 border-gray-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
    };
    return colors[planColor] || colors.gray;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Subscription & Billing</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your subscription plan and billing information
          </p>
        </div>
      </div>

      {/* Current Plan Overview */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Crown className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {getCurrentPlan()?.name || 'No Plan'}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`${
                      currentSubscription.status === 'active'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-50 text-gray-600 border-gray-300'
                    } text-xs`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        currentSubscription.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      } mr-1.5`}
                    ></span>
                    {currentSubscription.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {getCurrentPlan()?.description || 'Select a plan to get started'}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Next billing date</p>
                    <p className="font-medium text-gray-900">{currentSubscription.nextBillingDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-medium text-gray-900">
                      {currentSubscription.currency}
                      {formatPrice(currentSubscription.amount)}/month
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
                <Settings className="h-4 w-4 mr-2" />
                Manage Plan
              </Button>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10 px-6">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600">Invoice Usage</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {currentSubscription.usage.invoices}
                  <span className="text-sm font-normal text-gray-500">
                    /{getCurrentPlan()?.invoiceLimit || '∞'}
                  </span>
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            {getCurrentPlan()?.invoiceLimit && (
              <div className="w-full bg-gray-100 h-2 rounded overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{
                    width: `${getUsagePercentage(
                      currentSubscription.usage.invoices,
                      getCurrentPlan()!.invoiceLimit
                    )}%`,
                  }}
                ></div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600">Team Members</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {currentSubscription.usage.users}
                  <span className="text-sm font-normal text-gray-500">
                    /{getCurrentPlan()?.features.users || '∞'}
                  </span>
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            {typeof getCurrentPlan()?.features.users === 'number' && (
              <div className="w-full bg-gray-100 h-2 rounded overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all"
                  style={{
                    width: `${getUsagePercentage(
                      currentSubscription.usage.users,
                      getCurrentPlan()!.features.users as number
                    )}%`,
                  }}
                ></div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600">Branch Locations</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {currentSubscription.usage.branches}
                  <span className="text-sm font-normal text-gray-500">
                    /{getCurrentPlan()?.features.branches || '∞'}
                  </span>
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            {typeof getCurrentPlan()?.features.branches === 'number' && (
              <div className="w-full bg-gray-100 h-2 rounded overflow-hidden">
                <div
                  className="h-full bg-purple-600 transition-all"
                  style={{
                    width: `${getUsagePercentage(
                      currentSubscription.usage.branches,
                      getCurrentPlan()!.features.branches as number
                    )}%`,
                  }}
                ></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 border border-gray-200">
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-6 py-2 text-sm font-medium transition-colors ${
            billingCycle === 'monthly'
              ? 'bg-[#2f2d77] text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle('annually')}
          className={`px-6 py-2 text-sm font-medium transition-colors ${
            billingCycle === 'annually'
              ? 'bg-[#2f2d77] text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Annually
          <span className="ml-2 text-xs px-2 py-0.5 bg-green-500 text-white rounded">Save 17%</span>
        </button>
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionTiers.map((tier) => {
          const isCurrentPlan = tier.id === currentSubscription.plan;
          const price = billingCycle === 'monthly' ? tier.price.monthly : tier.price.annually;

          return (
            <Card
              key={tier.id}
              className={`border-2 transition-all ${
                isCurrentPlan
                  ? 'border-[#2f2d77] shadow-lg'
                  : tier.disabled
                  ? 'border-gray-200 opacity-60'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold text-gray-900">{tier.name}</CardTitle>
                    {tier.badge && (
                      <Badge className={`${getBadgeColor(tier.color)} text-xs border`}>
                        {tier.badge}
                      </Badge>
                    )}
                    {isCurrentPlan && (
                      <Badge className="bg-[#2f2d77] text-white border-0 text-xs">Current</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{tier.description}</p>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      ฿{formatPrice(price)}
                    </span>
                    <span className="text-sm text-gray-500">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {billingCycle === 'annually' && tier.price.annually > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      ฿{formatPrice(Math.round(tier.price.annually / 12))}/month billed annually
                    </p>
                  )}
                </div>

                {/* Key Limits */}
                <div className="space-y-2 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Invoices/month</span>
                    <span className="font-medium text-gray-900">
                      {tier.invoiceLimit ? tier.invoiceLimit : 'Unlimited'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Team members</span>
                    <span className="font-medium text-gray-900">{tier.features.users}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Branch locations</span>
                    <span className="font-medium text-gray-900">{tier.features.branches}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {tier.features.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  className={`w-full h-10 ${
                    isCurrentPlan
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : tier.disabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#2f2d77] hover:bg-[#252351] text-white'
                  }`}
                  disabled={tier.disabled || isCurrentPlan}
                >
                  {isCurrentPlan ? 'Current Plan' : tier.disabled ? 'Trial Expired' : 'Upgrade'}
                  {!isCurrentPlan && !tier.disabled && <ChevronRight className="h-4 w-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Payment History */}
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">Payment History</CardTitle>
            <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-9">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{payment.date}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">{payment.description}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-900">
                        ฿{formatPrice(payment.amount)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 text-xs"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Paid
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 hover:bg-gray-100"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border border-blue-200 bg-blue-50">
        <CardContent className="p-5">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Subscription Information</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• You can upgrade or downgrade your plan at any time</li>
                <li>• Changes take effect immediately, with prorated billing adjustments</li>
                <li>• Annual plans include a 17% discount compared to monthly billing</li>
                <li>• All plans include free updates and basic email support</li>
                <li>• Cancel anytime - no long-term commitments required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}