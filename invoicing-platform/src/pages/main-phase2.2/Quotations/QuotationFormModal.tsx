import { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  AlertCircle,
  Calculator,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface QuotationFormModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  editingQuotation?: any;
}

export default function QuotationFormModal({
  open,
  onClose,
  onSaved,
  editingQuotation,
}: QuotationFormModalProps) {
  const [includeVat, setIncludeVat] = useState(true);
  const [currency, setCurrency] = useState('THB');
  const [fxRate, setFxRate] = useState(1);
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, unitPrice: 0, discount: 0 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [whtRate, setWhtRate] = useState(0);

  useEffect(() => {
    if (editingQuotation) {
      // Load editing data
      setIncludeVat(editingQuotation.vat > 0);
      setCurrency(editingQuotation.currency || 'THB');
      setItems(editingQuotation.items || []);
      setDiscount(editingQuotation.discount || 0);
      setWhtRate(editingQuotation.whtRate || 0);
      setFxRate(editingQuotation.fxRate || 1);
    } else {
      // Reset form
      setIncludeVat(true);
      setCurrency('THB');
      setFxRate(1);
      setItems([{ id: 1, description: '', quantity: 1, unitPrice: 0, discount: 0 }]);
      setDiscount(0);
      setWhtRate(0);
    }
  }, [editingQuotation, open]);

  const getCurrencySymbol = (curr: string) => {
    const symbols: Record<string, string> = {
      THB: '฿',
      USD: '$',
      EUR: '€',
      GBP: '£',
      SGD: 'S$',
    };
    return symbols[curr] || '';
  };

  const calculateTotals = () => {
    // 1. Calculate line totals
    const lineItems = items.map((item) => {
      const lineTotal = item.quantity * item.unitPrice - (item.discount || 0);
      return lineTotal;
    });

    // 2. Subtotal (sum of all line items)
    const subtotal = lineItems.reduce((sum, line) => sum + line, 0);

    // 3. Apply quotation-level discount
    const discountedSubtotal = Math.max(0, subtotal - discount);

    // 4. VAT (7%)
    const vat = includeVat ? discountedSubtotal * 0.07 : 0;

    // 5. Total before WHT
    const total = discountedSubtotal + vat;

    // 6. Withholding tax (on discounted subtotal, before VAT)
    const whtAmount = discountedSubtotal * whtRate;

    // 7. Net payable
    const netTotal = total - whtAmount;

    return {
      subtotal,
      discountedSubtotal,
      vat,
      total,
      whtAmount,
      netTotal,
    };
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), description: '', quantity: 1, unitPrice: 0, discount: 0 },
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const totals = calculateTotals();
  const currencySymbol = getCurrencySymbol(currency);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-6xl shadow-xl max-h-[95vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {editingQuotation ? 'Edit Quotation' : 'Create Quotation'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Generate a new quotation for customer
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
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  Issue Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="h-10 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Valid Until <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  className="h-10 border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Currency & Settings */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Currency & Tax Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Currency <span className="text-red-500">*</span>
                </Label>
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    if (e.target.value === 'THB') setFxRate(1);
                  }}
                  className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                >
                  <option value="THB">THB (฿)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="SGD">SGD (S$)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Exchange Rate to THB
                </Label>
                <Input
                  type="number"
                  value={fxRate}
                  onChange={(e) => setFxRate(Number(e.target.value))}
                  disabled={currency === 'THB'}
                  placeholder={currency === 'THB' ? '1.0000' : 'e.g., 35.5000'}
                  step="0.0001"
                  className="h-10 border-gray-300"
                />
                {currency !== 'THB' && (
                  <p className="text-xs text-gray-500">
                    Enter rate: 1 {currency} = ___ THB
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Include VAT (7%)</Label>
                <div className="flex items-center gap-2 h-10">
                  <input
                    type="checkbox"
                    id="vat-toggle"
                    checked={includeVat}
                    onChange={(e) => setIncludeVat(e.target.checked)}
                    className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                  />
                  <Label htmlFor="vat-toggle" className="text-sm text-gray-700 cursor-pointer">
                    {includeVat ? 'VAT 7% Applied' : 'No VAT'}
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Line Items</h3>
              <Button
                onClick={addItem}
                size="sm"
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 h-9"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => {
                const lineTotal = item.quantity * item.unitPrice - (item.discount || 0);
                return (
                  <div
                    key={item.id}
                    className="p-4 border border-gray-200 bg-gray-50 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#2f2d77] text-white border-0 text-xs">
                        Item {index + 1}
                      </Badge>
                      {items.length > 1 && (
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-xs font-medium text-gray-700">
                          Description <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            updateItem(item.id, 'description', e.target.value)
                          }
                          placeholder="e.g., API Integration Service"
                          className="h-9 border-gray-300 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-700">Quantity</Label>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(item.id, 'quantity', Number(e.target.value))
                          }
                          min="1"
                          className="h-9 border-gray-300 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-700">
                          Unit Price ({currency})
                        </Label>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateItem(item.id, 'unitPrice', Number(e.target.value))
                          }
                          min="0"
                          step="0.01"
                          className="h-9 border-gray-300 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-700">
                          Discount ({currency})
                        </Label>
                        <Input
                          type="number"
                          value={item.discount}
                          onChange={(e) =>
                            updateItem(item.id, 'discount', Number(e.target.value))
                          }
                          min="0"
                          step="0.01"
                          className="h-9 border-gray-300 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-700">Line Total</Label>
                        <div className="h-9 flex items-center px-3 bg-white border border-gray-300 text-sm font-medium">
                          {currencySymbol}
                          {lineTotal.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Discount & WHT */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Discount & Tax</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Quotation Discount ({currency})
                </Label>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="h-10 border-gray-300"
                />
                <p className="text-xs text-gray-500">
                  Discount applied to the entire quotation
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Withholding Tax
                </Label>
                <select
                  value={whtRate}
                  onChange={(e) => setWhtRate(Number(e.target.value))}
                  className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                >
                  <option value={0}>No WHT</option>
                  <option value={0.01}>1% (Advertising)</option>
                  <option value={0.03}>3% (Services)</option>
                  <option value={0.05}>5% (Professional Fees)</option>
                </select>
                <p className="text-xs text-gray-500">
                  WHT deducted by customer (before VAT)
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="bg-gray-50 border border-gray-200 p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal (After Line Discounts)</span>
                <span className="font-medium text-gray-900">
                  {currencySymbol}
                  {totals.subtotal.toLocaleString()}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quotation Discount</span>
                  <span className="font-medium text-red-600">
                    - {currencySymbol}
                    {discount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  VAT (7%) {!includeVat && '- Not Applied'}
                </span>
                <span className="font-medium text-gray-900">
                  {currencySymbol}
                  {totals.vat.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm pt-2 border-t border-gray-300">
                <span className="text-gray-600">Total (Before WHT)</span>
                <span className="font-medium text-gray-900">
                  {currencySymbol}
                  {totals.total.toLocaleString()}
                </span>
              </div>

              {whtRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Withholding Tax ({(whtRate * 100).toFixed(0)}%)
                  </span>
                  <span className="font-medium text-red-600">
                    - {currencySymbol}
                    {totals.whtAmount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between pt-3 border-t-2 border-gray-300">
                <span className="font-semibold text-gray-900">Net Payable Amount</span>
                <span className="text-xl font-bold text-[#2f2d77]">
                  {currencySymbol}
                  {totals.netTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Notes (Optional)</Label>
            <textarea
              rows={3}
              placeholder="Additional notes or terms..."
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
            />
          </div>

          {/* Internal Approval */}
          <div className="p-4 bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Internal Approval Required
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                    />
                    <span className="text-sm text-gray-700">
                      Send for approval before sending to customer
                    </span>
                  </label>
                  <p className="text-xs text-gray-600 ml-6">
                    Quotation will be saved as Draft and require manager approval
                  </p>
                </div>
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
            Cancel
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-100 h-10 px-6"
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
            Create Quotation
          </Button>
        </div>
      </div>
    </div>
  );
}