import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Mail,
  Shield,
  Edit,
  Trash2,
  CheckCircle2,
  Eye,
  LogOut,
  Download,
  Building2,
  Key,
  Activity,
  UserCheck,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // User data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'owner',
      status: 'active',
      branches: ['HQ-BKK'],
      primaryBranch: 'HQ-BKK',
      lastLogin: '2026-01-07 14:30',
      joinedDate: '2024-01-15',
      twoFactorEnabled: true,
      activeSessions: 2,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'admin',
      status: 'active',
      branches: ['HQ-BKK', 'BR-CNX'],
      primaryBranch: 'HQ-BKK',
      lastLogin: '2026-01-07 13:15',
      joinedDate: '2024-03-20',
      twoFactorEnabled: true,
      activeSessions: 1,
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      role: 'finance',
      status: 'active',
      branches: ['HQ-BKK'],
      primaryBranch: 'HQ-BKK',
      lastLogin: '2026-01-07 09:45',
      joinedDate: '2024-06-10',
      twoFactorEnabled: false,
      activeSessions: 1,
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'accounting',
      status: 'active',
      branches: ['BR-CNX'],
      primaryBranch: 'BR-CNX',
      lastLogin: '2026-01-06 16:20',
      joinedDate: '2024-08-05',
      twoFactorEnabled: true,
      activeSessions: 0,
    },
    {
      id: 5,
      name: 'Tom Anderson',
      email: 'tom.anderson@company.com',
      role: 'view_only',
      status: 'invited',
      branches: ['BR-PKT'],
      primaryBranch: 'BR-PKT',
      lastLogin: null,
      joinedDate: '2026-01-05',
      twoFactorEnabled: false,
      activeSessions: 0,
    },
    {
      id: 6,
      name: 'Emily Brown',
      email: 'emily.brown@company.com',
      role: 'finance',
      status: 'inactive',
      branches: ['HQ-BKK'],
      primaryBranch: 'HQ-BKK',
      lastLogin: '2025-12-15 11:30',
      joinedDate: '2024-04-12',
      twoFactorEnabled: false,
      activeSessions: 0,
    },
  ];

  // Activity logs
  const activityLogs = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Created invoice INV-2026-001',
      branch: 'HQ-BKK',
      timestamp: '2026-01-07 14:30',
      type: 'create',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Updated customer: Acme Corporation',
      branch: 'HQ-BKK',
      timestamp: '2026-01-07 13:15',
      type: 'update',
    },
    {
      id: 3,
      user: 'Mike Wilson',
      action: 'Approved payout request',
      branch: 'HQ-BKK',
      timestamp: '2026-01-07 09:45',
      type: 'approve',
    },
    {
      id: 4,
      user: 'Sarah Johnson',
      action: 'Exported financial report',
      branch: 'BR-CNX',
      timestamp: '2026-01-06 16:20',
      type: 'export',
    },
    {
      id: 5,
      user: 'John Doe',
      action: 'Added new team member: Tom Anderson',
      branch: 'HQ-BKK',
      timestamp: '2026-01-05 10:00',
      type: 'create',
    },
  ];

  const tabs = [
    { id: 'users', label: 'Team Members', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    { id: 'activity', label: 'Activity Logs', icon: Activity },
  ];

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'owner':
        return {
          label: 'Owner',
          className: 'bg-purple-50 text-purple-700 border-purple-200',
        };
      case 'admin':
        return {
          label: 'Admin',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'finance':
        return {
          label: 'Finance',
          className: 'bg-green-50 text-green-700 border-green-200',
        };
      case 'accounting':
        return {
          label: 'Accounting',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'view_only':
        return {
          label: 'View Only',
          className: 'bg-gray-50 text-gray-600 border-gray-300',
        };
      default:
        return {
          label: role,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          className: 'bg-green-50 text-green-700 border-green-200',
          dot: 'bg-green-500',
        };
      case 'invited':
        return {
          label: 'Invited',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
        };
      case 'inactive':
        return {
          label: 'Inactive',
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          dot: 'bg-gray-400',
        };
      default:
        return {
          label: status,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
          dot: 'bg-gray-400',
        };
    }
  };

  const getActionTypeIcon = (type: string) => {
    switch (type) {
      case 'create':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'update':
        return <Edit className="h-4 w-4 text-blue-600" />;
      case 'approve':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'export':
        return <Download className="h-4 w-4 text-gray-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const rolePermissions = [
    {
      role: 'owner',
      name: 'Owner',
      description: 'Full access to all features and settings. Cannot be removed.',
      permissions: ['All Permissions', 'Billing Management', 'Team Management', 'Branch Management'],
      count: 1,
      color: 'purple',
    },
    {
      role: 'admin',
      name: 'Admin',
      description: 'Full access except billing and critical actions.',
      permissions: ['Payments', 'Customers', 'Reports', 'Settings', 'Team Management'],
      count: 1,
      color: 'blue',
    },
    {
      role: 'finance',
      name: 'Finance',
      description: 'Manage transactions, refunds, payouts, and financial reports.',
      permissions: ['Payments', 'Refunds', 'Payouts', 'Financial Reports'],
      count: 2,
      color: 'green',
    },
    {
      role: 'accounting',
      name: 'Accounting',
      description: 'View transactions, issue refunds, and customer support.',
      permissions: ['View Transactions', 'Issue Refunds', 'Customer Support', 'Reports'],
      count: 1,
      color: 'amber',
    },
    {
      role: 'view_only',
      name: 'View Only',
      description: 'Read-only access to all data without modification rights.',
      permissions: ['View Payments', 'View Customers', 'View Reports'],
      count: 1,
      color: 'gray',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage team members, roles, and permissions
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{users.length}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {users.filter((u) => u.status === 'active').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Invites</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {users.filter((u) => u.status === 'invited').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">2FA Enabled</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {users.filter((u) => u.twoFactorEnabled).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <Key className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${
                    isActive
                      ? 'border-[#2f2d77] text-[#2f2d77] bg-[#2f2d77]/5'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Team Members Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 border-gray-300"
                  />
                </div>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10" onClick={() => setShowInviteModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        User
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Role
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Branches
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Last Login
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Security
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => {
                      const roleConfig = getRoleConfig(user.role);
                      const statusConfig = getStatusConfig(user.status);
                      return (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                                {user.name.split(' ').map((n) => n[0]).join('')}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={`${roleConfig.className} text-xs`}>
                              {roleConfig.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {user.branches.length === 1
                                  ? user.branches[0]
                                  : `${user.branches.length} branches`}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} mr-1.5`}></span>
                              {statusConfig.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            {user.lastLogin ? (
                              <span className="text-sm text-gray-600">{user.lastLogin}</span>
                            ) : (
                              <span className="text-sm text-gray-400">Never</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {user.twoFactorEnabled ? (
                                <Badge className="bg-green-50 text-green-700 border-0 text-xs">
                                  2FA
                                </Badge>
                              ) : (
                                <Badge className="bg-gray-50 text-gray-500 border-0 text-xs">
                                  No 2FA
                                </Badge>
                              )}
                              {user.activeSessions > 0 && (
                                <span className="text-xs text-gray-500">
                                  {user.activeSessions} session{user.activeSessions > 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-1">
                              {/* View User Details */}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-gray-100" 
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowUserDetailsModal(true);
                                }}
                                title="View User Details"
                              >
                                <Eye className="h-4 w-4 text-gray-600" />
                              </Button>

                              {/* Edit User */}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                title="Edit User"
                              >
                                <Edit className="h-4 w-4 text-gray-600" />
                              </Button>

                              {/* Resend Invitation - Only for invited users */}
                              {user.status === 'invited' ? (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 hover:bg-blue-50"
                                  title="Resend Invitation"
                                >
                                  <Mail className="h-4 w-4 text-blue-600" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 cursor-not-allowed opacity-40"
                                  disabled
                                  title="User already active"
                                >
                                  <Mail className="h-4 w-4 text-gray-400" />
                                </Button>
                              )}

                              {/* Delete User - Cannot delete owner */}
                              {user.role !== 'owner' ? (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 hover:bg-red-50"
                                  title="Remove User"
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 cursor-not-allowed opacity-40"
                                  disabled
                                  title="Cannot remove owner"
                                >
                                  <Trash2 className="h-4 w-4 text-gray-400" />
                                </Button>
                              )}
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
        </div>
      )}

      {/* Roles & Permissions Tab */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">
                Roles & Permissions
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Predefined roles with specific permission sets
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {rolePermissions.map((role) => (
                  <div key={role.role} className="p-5 border border-gray-200 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-gray-900">{role.name}</h4>
                            <Badge className={`bg-${role.color}-50 text-${role.color}-700 border-0 text-xs`}>
                              {role.count} user{role.count !== 1 ? 's' : ''}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((permission, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-600 border-gray-300 text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <Eye className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Permission Info */}
          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Role Management</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Owner role is unique and cannot be transferred or removed</li>
                    <li>• Admin users have full access except billing and critical operations</li>
                    <li>• Finance role can manage all financial transactions and reports</li>
                    <li>• Accounting role has view and limited refund capabilities</li>
                    <li>• View Only role provides read-only access to all data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Activity Logs Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-6">
          {/* Filters */}
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input type="search" placeholder="Search activities..." className="pl-10 h-10 border-gray-300" />
                </div>
                <select className="h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                  <option value="">All Users</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                </select>
                <select className="h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                  <option value="">All Branches</option>
                  <option value="hq">HQ-BKK</option>
                  <option value="cnx">BR-CNX</option>
                </select>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-200 bg-gray-50 py-4">
              <CardTitle className="text-base font-semibold text-gray-900">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-9 h-9 bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {getActionTypeIcon(log.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{log.user}</span> {log.action}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span>{log.timestamp}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          <span>{log.branch}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-2xl mx-4 shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Invite Team Member</h2>
                <p className="text-sm text-gray-500 mt-1">Send an invitation to join your organization</p>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@company.com"
                  className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                />
                <p className="text-xs text-gray-500">
                  Must use your organization's email domain (@company.com)
                </p>
              </div>

              {/* Full Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role <span className="text-red-500">*</span>
                </Label>
                <select
                  id="role"
                  className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin - Full access except billing</option>
                  <option value="finance">Finance - Manage transactions and reports</option>
                  <option value="accounting">Accounting - View and limited refunds</option>
                  <option value="view_only">View Only - Read-only access</option>
                </select>
              </div>

              {/* Branch Assignment */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Branch Assignment <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2 p-4 border border-gray-200 max-h-40 overflow-y-auto">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]" />
                    <span className="text-sm text-gray-700">All Branches (HQ Access)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]" />
                    <span className="text-sm text-gray-700">HQ-BKK - Bangkok Headquarters</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]" />
                    <span className="text-sm text-gray-700">BR-CNX - Chiang Mai Branch</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]" />
                    <span className="text-sm text-gray-700">BR-PKT - Phuket Branch</span>
                  </label>
                </div>
              </div>

              {/* Primary Branch */}
              <div className="space-y-2">
                <Label htmlFor="primary-branch" className="text-sm font-medium text-gray-700">
                  Primary Branch <span className="text-red-500">*</span>
                </Label>
                <select
                  id="primary-branch"
                  className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                >
                  <option value="">Select primary branch</option>
                  <option value="hq-bkk">HQ-BKK - Bangkok Headquarters</option>
                  <option value="br-cnx">BR-CNX - Chiang Mai Branch</option>
                  <option value="br-pkt">BR-PKT - Phuket Branch</option>
                </select>
                <p className="text-xs text-gray-500">
                  This will be the default branch for this user's activities
                </p>
              </div>

              {/* Invitation Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Invitation Message (Optional)
                </Label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Add a personal message to the invitation email..."
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100 h-10 px-6"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetailsModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-3xl mx-4 shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center text-base font-medium text-gray-600">
                  {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowUserDetailsModal(false);
                  setSelectedUser(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Status Cards */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Status</p>
                    <Badge
                      variant="outline"
                      className={`${getStatusConfig(selectedUser.status).className} text-xs`}
                    >
                      {getStatusConfig(selectedUser.status).label}
                    </Badge>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">Role</p>
                    <Badge
                      variant="outline"
                      className={`${getRoleConfig(selectedUser.role).className} text-xs`}
                    >
                      {getRoleConfig(selectedUser.role).label}
                    </Badge>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-600 mb-1">2FA Status</p>
                    <Badge className={`${selectedUser.twoFactorEnabled ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'} border-0 text-xs`}>
                      {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* User Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">User Information</h3>
                <div className="grid grid-cols-2 gap-4 p-4 border border-gray-200 bg-gray-50">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email Address</p>
                    <p className="text-sm text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Joined Date</p>
                    <p className="text-sm text-gray-900">{selectedUser.joinedDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Last Login</p>
                    <p className="text-sm text-gray-900">{selectedUser.lastLogin || 'Never'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Active Sessions</p>
                    <p className="text-sm text-gray-900">{selectedUser.activeSessions}</p>
                  </div>
                </div>
              </div>

              {/* Branch Assignment */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Branch Assignment</h3>
                <div className="p-4 border border-gray-200 bg-gray-50">
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Primary Branch</p>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-600" />
                      <p className="text-sm font-medium text-gray-900">{selectedUser.primaryBranch}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Assigned Branches</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.branches.map((branch: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-white text-gray-700 border-gray-300 text-xs">
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Security Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <Key className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">
                          {selectedUser.twoFactorEnabled ? 'Additional security layer enabled' : 'Not configured'}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${selectedUser.twoFactorEnabled ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'} border-0 text-xs`}>
                      {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  {selectedUser.activeSessions > 0 && (
                    <div className="flex items-center justify-between p-3 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Activity className="h-4 w-4 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Active Sessions</p>
                          <p className="text-xs text-gray-500">{selectedUser.activeSessions} active session(s)</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 h-8 text-xs">
                        <LogOut className="h-3 w-3 mr-1" />
                        Force Logout
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                {selectedUser.role !== 'owner' && (
                  <>
                    {selectedUser.status === 'invited' && (
                      <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10 px-4">
                        <Mail className="h-4 w-4 mr-2" />
                        Resend Invite
                      </Button>
                    )}
                    <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 h-10 px-4">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove User
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-100 h-10 px-6"
                  onClick={() => {
                    setShowUserDetailsModal(false);
                    setSelectedUser(null);
                  }}
                >
                  Close
                </Button>
                <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}