// src/pages/admin/tenants/TenantList.tsx
import { useState } from 'react';
import {
  Building2,
  Search,
  Eye,
  Edit,
  MoreVertical,
  Plus,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TenantList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const tenants = [
    {
      id: 1,
      name: 'Acme Corporation Ltd.',
      email: 'admin@acme.com',
      plan: 'Enterprise',
      status: 'active',
      registeredDate: '2025-03-15',
      mrr: 499,
      users: 45,
      invoices: 1250,
      branches: 8,
      country: 'Thailand',
    },
    {
      id: 2,
      name: 'Global Trading Co.',
      email: 'contact@globaltrading.com',
      plan: 'Professional',
      status: 'active',
      registeredDate: '2025-06-20',
      mrr: 149,
      users: 18,
      invoices: 420,
      branches: 3,
      country: 'Singapore',
    },
    {
      id: 3,
      name: 'Tech Startup Inc.',
      email: 'hello@techstartup.io',
      plan: 'Starter',
      status: 'trial',
      registeredDate: '2026-01-10',
      mrr: 0,
      users: 3,
      invoices: 25,
      branches: 1,
      country: 'Thailand',
    },
    {
      id: 4,
      name: 'Manufacturing Plus Ltd.',
      email: 'admin@mfgplus.com',
      plan: 'Professional',
      status: 'active',
      registeredDate: '2025-01-08',
      mrr: 149,
      users: 12,
      invoices: 380,
      branches: 2,
      country: 'Malaysia',
    },
    {
      id: 5,
      name: 'Sunset Consulting',
      email: 'info@sunsetconsult.com',
      plan: 'Starter',
      status: 'suspended',
      registeredDate: '2024-11-12',
      mrr: 49,
      users: 5,
      invoices: 85,
      branches: 1,
      country: 'Thailand',
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          className: 'bg-green-50 text-green-700 border-green-200',
          dotColor: 'bg-green-500',
        };
      case 'trial':
        return {
          label: 'Trial',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          dotColor: 'bg-blue-500',
        };
      case 'suspended':
        return {
          label: 'Suspended',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
          dotColor: 'bg-amber-500',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          className: 'bg-red-50 text-red-700 border-red-200',
          dotColor: 'bg-red-500',
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-700 border-gray-300',
          dotColor: 'bg-gray-500',
        };
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'starter':
        return 'bg-gray-50 text-gray-700 border-gray-300';
      case 'professional':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'enterprise':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-300';
    }
  };

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    const matchesPlan = planFilter === 'all' || tenant.plan.toLowerCase() === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">All Tenants</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all business tenants</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10">
            <Plus className="h-4 w-4 mr-2" />
            Add Tenant
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label className="text-sm font-medium text-gray-700">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Status</Label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="suspended">Suspended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Plan</Label>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
              >
                <option value="all">All Plans</option>
                <option value="starter">Starter</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tenants Table */}
      <Card className="border border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    MRR
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Usage
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Registered
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTenants.map((tenant) => {
                  const statusConfig = getStatusConfig(tenant.status);
                  return (
                    <tr key={tenant.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#2f2d77]/10 flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-5 w-5 text-[#2f2d77]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{tenant.name}</p>
                            <p className="text-xs text-gray-500">{tenant.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${getPlanColor(tenant.plan)} text-xs`}>
                          {tenant.plan}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusConfig.dotColor}`}
                          ></span>
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-gray-900">
                          ${tenant.mrr}
                          {tenant.status === 'active' && (
                            <span className="text-gray-500">/mo</span>
                          )}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-xs text-gray-600">
                          <p>{tenant.invoices} invoices</p>
                          <p>
                            {tenant.users} users • {tenant.branches} branches
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-600">{tenant.registeredDate}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          {/* View */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>

                          {/* Edit */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </Button>

                          {/* More Actions */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            title="More Actions"
                          >
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredTenants.length} of {tenants.length} tenants
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-9">
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 bg-[#2f2d77] text-white h-9"
          >
            1
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-9">
            2
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-9">
            3
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-9">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}