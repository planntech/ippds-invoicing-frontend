import { useState } from 'react';
import {
  X,
  RefreshCw,
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface RecurringInvoiceModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RecurringInvoiceModal({
  open,
  onClose,
}: RecurringInvoiceModalProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (!open) return null;

  // Mock recurring templates
  const recurringTemplates = [
    {
      id: 1,
      name: 'Monthly Subscription - Retail Corp',
      customer: 'Retail Corp',
      amount: 15000,
      currency: 'SGD',
      frequency: 'monthly',
      startDate: '2026-01-01',
      nextInvoice: '2026-02-01',
      status: 'active',
      itemsCount: 1,
      generated: 12,
    },
    {
      id: 2,
      name: 'Quarterly Support - Acme Corp',
      customer: 'Acme Corporation',
      amount: 150000,
      currency: 'THB',
      frequency: 'quarterly',
      startDate: '2026-01-01',
      nextInvoice: '2026-04-01',
      status: 'active',
      itemsCount: 3,
      generated: 4,
    },
    {
      id: 3,
      name: 'Annual License - Global Industries',
      customer: 'Global Industries',
      amount: 500000,
      currency: 'THB',
      frequency: 'yearly',
      startDate: '2026-01-01',
      nextInvoice: '2027-01-01',
      status: 'paused',
      itemsCount: 2,
      generated: 1,
    },
  ];

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      THB: '฿',
      USD: '$',
      EUR: '€',
      SGD: 'S$',
    };
    const symbol = symbols[currency] || currency;
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  const getFrequencyBadge = (frequency: string) => {
    const config: Record<string, { label: string; className: string }> = {
      monthly: { label: 'Monthly', className: 'bg-blue-50 text-blue-700 border-blue-200' },
      quarterly: { label: 'Quarterly', className: 'bg-purple-50 text-purple-700 border-purple-200' },
      yearly: { label: 'Yearly', className: 'bg-green-50 text-green-700 border-green-200' },
    };
    const c = config[frequency] || config.monthly;
    return (
      <Badge variant="outline" className={`${c.className} text-xs`}>
        {c.label}
      </Badge>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-5xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recurring Invoices</h2>
            <p className="text-sm text-gray-500 mt-1">
              Automate invoice generation with recurring templates
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {!showCreateForm ? (
            <>
              {/* Header Actions */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    {recurringTemplates.length} recurring invoice templates
                  </p>
                </div>
                <Button
                  className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10"
                  onClick={() => setShowCreateForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>

              {/* Templates List */}
              <div className="space-y-3">
                {recurringTemplates.map((template) => (
                  <Card key={template.id} className="border border-gray-200">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-medium text-gray-900">{template.name}</h3>
                            {getFrequencyBadge(template.frequency)}
                            <Badge
                              variant="outline"
                              className={
                                template.status === 'active'
                                  ? 'bg-green-50 text-green-700 border-green-200 text-xs'
                                  : 'bg-gray-50 text-gray-600 border-gray-300 text-xs'
                              }
                            >
                              {template.status === 'active' ? 'Active' : 'Paused'}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Customer</p>
                              <p className="font-medium text-gray-900">{template.customer}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Amount</p>
                              <p className="font-medium text-gray-900">
                                {formatCurrency(template.amount, template.currency)}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600">Next Invoice</p>
                              <p className="font-medium text-gray-900">{template.nextInvoice}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Start Date</p>
                              <p className="text-gray-900">{template.startDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Items</p>
                              <p className="text-gray-900">{template.itemsCount} items</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Generated</p>
                              <p className="text-gray-900">{template.generated} invoices</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            title="View Template"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            title="Edit Template"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </Button>
                          {template.status === 'active' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-amber-50"
                              title="Pause Template"
                            >
                              <Pause className="h-4 w-4 text-amber-600" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-green-50"
                              title="Activate Template"
                            >
                              <Play className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-red-50"
                            title="Delete Template"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Info */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Recurring Invoice Automation</p>
                  <ul className="space-y-1">
                    <li>• Invoices are automatically generated based on schedule</li>
                    <li>• Templates can be edited anytime without affecting past invoices</li>
                    <li>• Pause templates to temporarily stop generation</li>
                    <li>• Customers receive automatic email notifications</li>
                    <li>• Review and approve before sending (optional)</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            /* Create Template Form */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Create Recurring Template</h3>
                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                  onClick={() => setShowCreateForm(false)}
                >
                  Back to List
                </Button>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Template Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="e.g., Monthly Subscription - Customer Name"
                    className="h-10 border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Customer <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="">Select customer</option>
                      <option value="1">Acme Corporation</option>
                      <option value="2">Tech Solutions Ltd</option>
                      <option value="3">Global Industries</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Currency <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="THB">THB (฿)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="SGD">SGD (S$)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Frequency <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Start Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="h-10 border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">End Date (Optional)</Label>
                    <Input type="date" className="h-10 border-gray-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Payment Terms</Label>
                  <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                    <option value="net15">Net 15</option>
                    <option value="net30">Net 30</option>
                    <option value="net60">Net 60</option>
                    <option value="immediate">Due on Receipt</option>
                  </select>
                </div>

                {/* Automation Options */}
                <div className="space-y-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <Label className="text-sm font-semibold text-gray-900">Automation Options</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                      />
                      <span className="text-sm text-gray-700">
                        Auto-send invoice to customer
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                      />
                      <span className="text-sm text-gray-700">
                        Send reminder emails for unpaid invoices
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                      />
                      <span className="text-sm text-gray-700">
                        Require approval before sending
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Notes</Label>
                  <textarea
                    rows={3}
                    placeholder="Optional notes or payment instructions..."
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> After creating the template, you'll need to add line items
                  before it can generate invoices.
                </p>
                </div>
              </div>
            )}
          </div>
  
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 h-10 px-6"
              onClick={onClose}
            >
              Close
            </Button>
            {showCreateForm && (
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
                <RefreshCw className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            )}
          </div>
        </div>
      </div>
    );
}