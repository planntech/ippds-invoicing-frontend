// src/pages/admin/AdminDashboard.tsx
import { useState } from 'react';
import {
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  FileText,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  // Overview Stats
  const overviewStats = [
    {
      label: 'Total Tenants',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Building2,
      color: 'blue',
    },
    {
      label: 'Active Subscriptions',
      value: '2,634',
      change: '+8.3%',
      trend: 'up',
      icon: CheckCircle2,
      color: 'green',
    },
    {
      label: 'Monthly Recurring Revenue',
      value: '$284,750',
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
    },
    {
      label: 'Trial Accounts',
      value: '213',
      change: '+5.2%',
      trend: 'up',
      icon: Clock,
      color: 'amber',
    },
  ];

  const subscriptionPlans = [
    { name: 'Starter', count: 1245, revenue: 60905, color: 'gray' },
    { name: 'Professional', count: 983, revenue: 146467, color: 'blue' },
    { name: 'Enterprise', count: 406, revenue: 202594, color: 'purple' },
  ];

  const recentActivities = [
    {
      tenant: 'Acme Corporation Ltd.',
      action: 'Upgraded to Enterprise',
      time: '2 hours ago',
      type: 'upgrade',
    },
    {
      tenant: 'Tech Startup Inc.',
      action: 'Started trial period',
      time: '9 days ago',
      type: 'trial',
    },
    {
      tenant: 'Sunset Consulting',
      action: 'Payment failed - Account suspended',
      time: '1 day ago',
      type: 'warning',
    },
    {
      tenant: 'Global Trading Co.',
      action: 'Renewed subscription',
      time: '3 days ago',
      type: 'renewal',
    },
    {
      tenant: 'Quick Commerce Ltd.',
      action: 'Cancelled subscription',
      time: '50 days ago',
      type: 'cancellation',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here's what's happening with your tenants.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;

          return (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 bg-${stat.color}-50 flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      isPositive
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    } text-xs`}
                  >
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Distribution */}
        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
            <CardTitle className="text-base font-semibold text-gray-900">
              Subscription Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {subscriptionPlans.map((plan) => {
                const totalActive = subscriptionPlans.reduce((sum, p) => sum + p.count, 0);
                const percentage = ((plan.count / totalActive) * 100).toFixed(1);

                return (
                  <div key={plan.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{plan.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{plan.count} tenants</span>
                        <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded overflow-hidden">
                      <div
                        className={`h-full bg-${plan.color}-500 transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
            <CardTitle className="text-base font-semibold text-gray-900">
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{plan.name}</p>
                    <p className="text-xs text-gray-500">{plan.count} active subscriptions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${plan.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">/month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
          <CardTitle className="text-base font-semibold text-gray-900">
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded flex-shrink-0 ${
                    activity.type === 'upgrade'
                      ? 'bg-purple-50'
                      : activity.type === 'trial'
                      ? 'bg-blue-50'
                      : activity.type === 'warning'
                      ? 'bg-amber-50'
                      : activity.type === 'renewal'
                      ? 'bg-green-50'
                      : 'bg-red-50'
                  }`}
                >
                  {activity.type === 'upgrade' && (
                    <ArrowUpRight className="h-4 w-4 text-purple-600" />
                  )}
                  {activity.type === 'trial' && <Clock className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'warning' && (
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                  )}
                  {activity.type === 'renewal' && (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  )}
                  {activity.type === 'cancellation' && (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.tenant}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}