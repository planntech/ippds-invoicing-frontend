// src/pages/admin/reports/SubscriptionReport.tsx
import { useState } from 'react';
import {
  Download,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubscriptionReport() {
  const [dateRange, setDateRange] = useState('this-month');

  const metrics = [
    { label: 'New Subscriptions', value: '127', change: '+12.5%', trend: 'up' },
    { label: 'Renewals', value: '1,234', change: '+8.3%', trend: 'up' },
    { label: 'Cancellations', value: '45', change: '-5.2%', trend: 'down' },
    { label: 'MRR Growth', value: '$12,450', change: '+15.2%', trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Subscription Reports</h1>
          <p className="text-sm text-gray-500 mt-1">
            Analyze subscription metrics and trends
          </p>
        </div>
        <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Date Range Filter */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Date Range</Label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
              >
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Plan</Label>
              <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                <option value="all">All Plans</option>
                <option value="starter">Starter</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Region</Label>
              <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                <option value="all">All Regions</option>
                <option value="thailand">Thailand</option>
                <option value="singapore">Singapore</option>
                <option value="malaysia">Malaysia</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 w-full">
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <p className="text-2xl font-semibold text-gray-900 mb-2">{metric.value}</p>
              <p
                className={`text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
            <CardTitle className="text-base font-semibold text-gray-900">
              Subscription Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Line chart visualization</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
            <CardTitle className="text-base font-semibold text-gray-900">
              MRR Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Bar chart visualization</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}