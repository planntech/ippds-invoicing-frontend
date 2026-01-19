import { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Split,
  AlertCircle,
  Calendar,
  Percent,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MilestoneInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  quotation: any;
  onCreated: () => void;
}

interface Milestone {
  id: number;
  name: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'completed' | 'invoiced';
  description: string;
}

export default function MilestoneInvoiceModal({
  open,
  onClose,
  quotation,
  onCreated,
}: MilestoneInvoiceModalProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      name: 'Initial Payment',
      percentage: 30,
      amount: 0,
      dueDate: '',
      status: 'pending',
      description: '30% upfront payment upon project initiation',
    },
    {
      id: 2,
      name: 'Progress Payment',
      percentage: 40,
      amount: 0,
      dueDate: '',
      status: 'pending',
      description: '40% payment upon project mid-point completion',
    },
    {
      id: 3,
      name: 'Final Payment',
      percentage: 30,
      amount: 0,
      dueDate: '',
      status: 'pending',
      description: '30% final payment upon project completion and delivery',
    },
  ]);

  if (!open || !quotation) return null;

  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'THB' ? '฿' : '$';
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now(),
      name: '',
      percentage: 0,
      amount: 0,
      dueDate: '',
      status: 'pending',
      description: '',
    };
    setMilestones([...milestones, newMilestone]);
  };

  const removeMilestone = (id: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((m) => m.id !== id));
    }
  };

  const updateMilestone = (id: number, field: string, value: any) => {
    setMilestones(
      milestones.map((m) => {
        if (m.id === id) {
          const updated = { ...m, [field]: value };
          // Auto-calculate amount when percentage changes
          if (field === 'percentage') {
            updated.amount = (quotation.total * value) / 100;
          }
          return updated;
        }
        return m;
      })
    );
  };

  const totalPercentage = milestones.reduce((sum, m) => sum + (m.percentage || 0), 0);
  const totalAmount = milestones.reduce(
    (sum, m) => sum + ((quotation.total * (m.percentage || 0)) / 100),
    0
  );

  const isValid = totalPercentage === 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Split into Milestone Invoices</h2>
            <p className="text-sm text-gray-500 mt-1">
              {quotation.quotationNumber} - {quotation.customer}
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
          {/* Total Amount Display */}
          <Card className="border border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Quotation Amount</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">
                    {formatCurrency(quotation.total, quotation.currency)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Items</p>
                  <p className="text-lg font-medium text-gray-900">
                    {Array.isArray(quotation.items) ? quotation.items.length : quotation.items}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestone Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Milestone Configuration</h3>
              <Button
                onClick={addMilestone}
                size="sm"
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 h-9"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </div>

            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="p-5 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-[#2f2d77] text-white border-0 text-xs">
                    Milestone {index + 1}
                  </Badge>
                  {milestones.length > 1 && (
                    <Button
                      onClick={() => removeMilestone(milestone.id)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Milestone Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={milestone.name}
                      onChange={(e) => updateMilestone(milestone.id, 'name', e.target.value)}
                      placeholder="e.g., Initial Payment"
                      className="h-10 border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Percentage <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type="number"
                          value={milestone.percentage || ''}
                          onChange={(e) =>
                            updateMilestone(milestone.id, 'percentage', Number(e.target.value))
                          }
                          placeholder="30"
                          min="0"
                          max="100"
                          className="h-10 border-gray-300 pr-8"
                        />
                        <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        value={
                          milestone.percentage
                            ? formatCurrency(
                                (quotation.total * milestone.percentage) / 100,
                                quotation.currency
                              )
                            : ''
                        }
                        className="h-10 border-gray-300 bg-gray-50 flex-1"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Due Date <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) => updateMilestone(milestone.id, 'dueDate', e.target.value)}
                        className="h-10 border-gray-300"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Status</Label>
                    <select
                      value={milestone.status}
                      onChange={(e) => updateMilestone(milestone.id, 'status', e.target.value)}
                      className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="invoiced">Invoiced</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Description</Label>
                    <textarea
                      value={milestone.description}
                      onChange={(e) =>
                        updateMilestone(milestone.id, 'description', e.target.value)
                      }
                      rows={2}
                      placeholder="Milestone description..."
                      className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <Card
            className={`border ${
              isValid
                ? 'border-green-200 bg-green-50'
                : 'border-red-200 bg-red-50'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Allocated</p>
                  <p
                    className={`text-xl font-semibold mt-1 ${
                      isValid ? 'text-green-700' : 'text-red-600'
                    }`}
                  >
                    {totalPercentage}%
                  </p>
                  {!isValid && (
                    <p className="text-xs text-red-600 mt-1">
                      Must equal 100% (
                      {totalPercentage > 100 ? 'over' : 'under'} by{' '}
                      {Math.abs(100 - totalPercentage)}%)
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-semibold text-gray-900 mt-1">
                    {formatCurrency(totalAmount, quotation.currency)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Milestone Invoicing</p>
              <ul className="space-y-1">
                <li>• Each milestone will generate a separate invoice when marked as completed</li>
                <li>• Total percentage must equal 100%</li>
                <li>• Milestone invoices are linked to the original quotation</li>
                <li>• Track completion status and payment for each milestone</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-100 h-10 px-6"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6"
            disabled={!isValid}
            onClick={() => {
              if (isValid) {
                onCreated();
              }
            }}
          >
            <Split className="h-4 w-4 mr-2" />
            Create Milestone Invoices
          </Button>
        </div>
      </div>
    </div>
  );
}