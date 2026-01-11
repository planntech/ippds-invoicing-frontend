import { useEffect, useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Calculator,
  Save,
  AlertCircle,
  Percent,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface InvoiceFormModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  editingInvoice?: any;
  sourceQuotation?: any; // For converting from quotation
}

export default function InvoiceFormModal({
  open,
  onClose,
  onSaved,
  editingInvoice,
  sourceQuotation,
}: InvoiceFormModalProps) {
  const [customerId, setCustomerId] = useState('');
  const [currency, setCurrency] = useState('THB');
  const [fxRate, setFxRate] = useState(1);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [includeVat, setIncludeVat] = useState(true);
  const [whtRate, setWhtRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [items, setItems] = useState<any[]>([
    { id: 1, description: '', qty: 1, unitPrice: 0, discount: 0 },
  ]);
  const [notes, setNotes] = useState('');
  const [customerPO, setCustomerPO] = useState('');

  useEffect(() => {
    if (editingInvoice) {
      // Load editing data
      setCustomerId(editingInvoice.customerId);
      setCurrency(editingInvoice.currency);
      setFxRate(editingInvoice.fxRate);
      setIssueDate(editingInvoice.issueDate);
      setDueDate(editingInvoice.dueDate);
      setIncludeVat(editingInvoice.includeVat);
      setWhtRate(editingInvoice.whtRate);
      setDiscount(editingInvoice.discount);
      setItems(editingInvoice.items);
      setNotes(editingInvoice.notes || '');
      setCustomerPO(editingInvoice.customerPO || '');
    } else if (sourceQuotation) {
      // Load from quotation
      setCustomerId(sourceQuotation.customerId);
      setCurrency(sourceQuotation.currency);
      setFxRate(sourceQuotation.fxRate);
      setIncludeVat(sourceQuotation.includeVat);
      setWhtRate(sourceQuotation.whtRate);
      setDiscount(sourceQuotation.discount);
      setItems(sourceQuotation.items);
      setNotes(sourceQuotation.notes || '');
    } else {
      // Reset form
      setCustomerId('');
      setCurrency('THB');
      setFxRate(1);
      setIssueDate(new Date().toISOString().split('T')[0]);
      setDueDate('');
      setIncludeVat(true);
      setWhtRate(0);
      setDiscount(0);
      setItems([{ id: 1, description: '', qty: 1, unitPrice: 0, discount: 0 }]);
      setNotes('');
      setCustomerPO('');
    }
  }, [editingInvoice, sourceQuotation, open]);

  const getCurrencySymbol = (curr: string) => {
    const symbols: Record<string, string> = {
      THB: '฿',
      USD: '$',
      EUR: '€',
      GBP: '£',
      SGD: 'S$',
      HKD: 'HK$',
    };
    return symbols[curr] || '';
  };

  const calculateTotals = () => {
    // 1. Calculate line totals
    const lineItems = items.map((item) => {
      const lineTotal = item.qty * item.unitPrice - (item.discount || 0);
      return lineTotal;
    });

    // 2. Subtotal (sum of all line items)
    const subtotal = lineItems.reduce((sum, line) => sum + line, 0);

    // 3. Apply invoice-level discount
    const discountedSubtotal = Math.max(0, subtotal - discount);

    // 4. VAT (7%)
    const vat = includeVat ? discountedSubtotal * 0.07 : 0;

    // 5. Total before WHT
    const total = discountedSubtotal + vat;

    // 6. Withholding tax (on discounted subtotal, before VAT)
    const whtAmount = discountedSubtotal * whtRate;

    // 7. Net payable
    const netTotal = total - whtAmount;

    // 8. THB equivalent
    const expectedBaseAmount = total * fxRate;

    return {
      subtotal: discountedSubtotal,
      vat,
      total,
      whtAmount,
      netTotal,
      expectedBaseAmount,
    };
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), description: '', qty: 1, unitPrice: 0, discount: 0 },
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

  const handleSubmit = () => {
    // Validate
    if (!customerId || !issueDate || !dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    const totals = calculateTotals();
    
    const payload = {
      customerId,
      currency,
      fxRate,
      issueDate,
      dueDate,
      includeVat,
      whtRate,
      discount,
      items: items.map(item => ({
        ...item,
        lineTotal: item.qty * item.unitPrice - (item.discount || 0),
      })),
      subtotal: totals.subtotal,
      vat: totals.vat,
      totalAmount: totals.total,
      whtAmount: totals.whtAmount,
      totalDue: totals.netTotal,
      expectedBaseAmount: totals.expectedBaseAmount,
      notes,
      customerPO,
      status: editingInvoice ? editingInvoice.status : 'draft',
    };

    console.log('Saving invoice:', payload);
    onSaved();
    onClose();
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
              {editingInvoice ? 'Edit Invoice' : sourceQuotation ? 'Create Invoice from Quotation' : 'Create Invoice'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {sourceQuotation && `Converting from ${sourceQuotation.quotationNumber}`}
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
                <select
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none"
                >
                  <option value="">Select customer</option>
                  <option value="1">Acme Corporation</option>
                  <option value="2">Tech Solutions Ltd</option>
                  <option value="3">Global Industries</option>
                  <option value="4">Ministry of Commerce</option>
                  <option value="5">Startup Inc</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Issue Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="h-10 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Due Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-10 border-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Customer PO Number
                </Label>
                <Input
                  value={customerPO}
                  onChange={(e) => setCustomerPO(e.target.value)}
                  placeholder="Optional"
                  className="h-10 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Payment Terms
                </Label>
                <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                  <option value="net15">Net 15</option>
                  <option value="net30">Net 30</option>
                  <option value="net60">Net 60</option>
                  <option value="immediate">Due on Receipt</option>
                </select>
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
                  <option value="HKD">HKD (HK$)</option>
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
                const lineTotal = item.qty * item.unitPrice - (item.discount || 0);
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
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updateItem(item.id, 'description', e.target.value)
                          }
                          placeholder="e.g., API Integration Service"
                          rows={2}
                          className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-gray-700">Quantity</Label>
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            updateItem(item.id, 'qty', Number(e.target.value))
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
                  Invoice Discount ({currency})
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
                  Discount applied to the entire invoice
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
                  <option value={0.10}>10% (Dividends/Interest)</option>
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
                <span className="text-gray-600">Subtotal (After Discounts)</span>
                <span className="font-medium text-gray-900">
                  {currencySymbol}
                  {totals.subtotal.toLocaleString()}
                </span>
              </div>

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

              {currency !== 'THB' && (
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-600">THB Equivalent</span>
                  <span className="font-medium text-gray-900">
                    ฿{totals.expectedBaseAmount.toLocaleString()} @ {fxRate.toFixed(4)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Notes / Payment Terms</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Optional notes, payment instructions, or additional information..."
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
            />
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
            onClick={() => {
              handleSubmit();
              // Save as draft logic
            }}
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6" onClick={handleSubmit}>
            {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
          </Button>
        </div>
      </div>
    </div>
  );
}