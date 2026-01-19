import { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Tag,
  BarChart3,
  AlertCircle,
  X,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'items' | 'pricing'>('items');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Product data
  const products = [
    {
      id: 1,
      code: 'PRD-001',
      sku: 'SOFT-LIC-001',
      name: 'Enterprise Software License',
      shortDesc: 'Annual software license',
      itemType: 'service',
      category: 'Software',
      unitOfMeasure: 'License',
      basePrice: 50000,
      currency: 'THB',
      taxTreatment: 'vat',
      accountCode: '4000-1000',
      status: 'active',
      stockQuantity: null, // Service item
      lastSold: '2026-01-05',
    },
    {
      id: 2,
      code: 'PRD-002',
      sku: 'CONS-HR-001',
      name: 'Consulting Services - Hourly',
      shortDesc: 'Professional consulting hourly rate',
      itemType: 'service',
      category: 'Services',
      unitOfMeasure: 'Hour',
      basePrice: 3000,
      currency: 'THB',
      taxTreatment: 'vat',
      accountCode: '4000-2000',
      status: 'active',
      stockQuantity: null,
      lastSold: '2026-01-06',
    },
    {
      id: 3,
      code: 'PRD-003',
      sku: 'HW-LAPTOP-001',
      name: 'Business Laptop - Standard',
      shortDesc: 'Standard business laptop configuration',
      itemType: 'product',
      category: 'Hardware',
      unitOfMeasure: 'Unit',
      basePrice: 35000,
      currency: 'THB',
      taxTreatment: 'vat',
      accountCode: '4000-3000',
      status: 'active',
      stockQuantity: 45,
      lastSold: '2026-01-07',
    },
    {
      id: 4,
      code: 'PRD-004',
      sku: 'TRAIN-DAY-001',
      name: 'Training Program - Full Day',
      shortDesc: 'On-site training full day session',
      itemType: 'service',
      category: 'Training',
      unitOfMeasure: 'Day',
      basePrice: 15000,
      currency: 'THB',
      taxTreatment: 'exempt',
      accountCode: '4000-4000',
      status: 'active',
      stockQuantity: null,
      lastSold: '2026-01-03',
    },
    {
      id: 5,
      code: 'PRD-005',
      sku: 'SUB-CLOUD-001',
      name: 'Cloud Storage - 1TB Monthly',
      shortDesc: 'Monthly cloud storage subscription',
      itemType: 'service',
      category: 'Subscription',
      unitOfMeasure: 'Month',
      basePrice: 500,
      currency: 'THB',
      taxTreatment: 'zero-rated',
      accountCode: '4000-5000',
      status: 'active',
      stockQuantity: null,
      lastSold: '2026-01-07',
    },
    {
      id: 6,
      code: 'PRD-006',
      sku: 'LEGACY-001',
      name: 'Legacy Product (Discontinued)',
      shortDesc: 'Old product no longer sold',
      itemType: 'product',
      category: 'Hardware',
      unitOfMeasure: 'Unit',
      basePrice: 10000,
      currency: 'THB',
      taxTreatment: 'vat',
      accountCode: '4000-3000',
      status: 'inactive',
      stockQuantity: 5,
      lastSold: '2025-10-15',
    },
  ];

  // Special pricing rules
  const pricingRules = [
    {
      id: 1,
      productCode: 'PRD-001',
      productName: 'Enterprise Software License',
      ruleType: 'customer',
      customerName: 'Acme Corporation',
      price: 45000,
      currency: 'THB',
      discount: 10,
      validFrom: '2026-01-01',
      validTo: '2026-12-31',
      status: 'active',
    },
    {
      id: 2,
      productCode: 'PRD-002',
      productName: 'Consulting Services - Hourly',
      ruleType: 'volume',
      minQuantity: 20,
      price: 2700,
      currency: 'THB',
      discount: 10,
      validFrom: null,
      validTo: null,
      status: 'active',
    },
    {
      id: 3,
      productCode: 'PRD-003',
      productName: 'Business Laptop - Standard',
      ruleType: 'seasonal',
      seasonName: 'Year-End Promotion',
      price: 31500,
      currency: 'THB',
      discount: 10,
      validFrom: '2026-11-01',
      validTo: '2026-12-31',
      status: 'active',
    },
    {
      id: 4,
      productCode: 'PRD-001',
      productName: 'Enterprise Software License',
      ruleType: 'volume',
      minQuantity: 10,
      price: 42500,
      currency: 'THB',
      discount: 15,
      validFrom: null,
      validTo: null,
      status: 'active',
    },
  ];

  const getItemTypeConfig = (type: string) => {
    switch (type) {
      case 'product':
        return {
          label: 'Product',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'service':
        return {
          label: 'Service',
          className: 'bg-purple-50 text-purple-700 border-purple-200',
        };
      default:
        return {
          label: type,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
        };
    }
  };

  const getTaxTreatmentConfig = (treatment: string) => {
    switch (treatment) {
      case 'vat':
        return {
          label: 'VAT 7%',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'exempt':
        return {
          label: 'Exempt',
          className: 'bg-green-50 text-green-700 border-green-200',
        };
      case 'zero-rated':
        return {
          label: 'Zero-Rated',
          className: 'bg-purple-50 text-purple-700 border-purple-200',
        };
      default:
        return {
          label: treatment,
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

  const getPricingRuleTypeConfig = (type: string) => {
    switch (type) {
      case 'customer':
        return {
          label: 'Customer-Specific',
          className: 'bg-blue-50 text-blue-700 border-blue-200',
        };
      case 'volume':
        return {
          label: 'Volume Discount',
          className: 'bg-purple-50 text-purple-700 border-purple-200',
        };
      case 'seasonal':
        return {
          label: 'Seasonal/Promo',
          className: 'bg-orange-50 text-orange-700 border-orange-200',
        };
      default:
        return {
          label: type,
          className: 'bg-gray-50 text-gray-600 border-gray-300',
        };
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      THB: '฿',
      USD: '$',
      EUR: '€',
      GBP: '£',
      SGD: 'S$',
    };
    const symbol = symbols[currency] || currency;
    return `${symbol}${new Intl.NumberFormat('en-US').format(amount)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Product Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage product catalog and pricing rules
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{products.length}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <Package className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {products.filter((p) => p.status === 'active').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 flex items-center justify-center">
                <Package className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pricing Rules</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{pricingRules.length}</p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <Tag className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {new Set(products.map((p) => p.category)).size}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('items')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'items'
                ? 'border-[#2f2d77] text-[#2f2d77] bg-[#2f2d77]/5'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Package className="h-4 w-4" />
            Item Master
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'pricing'
                ? 'border-[#2f2d77] text-[#2f2d77] bg-[#2f2d77]/5'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Tag className="h-4 w-4" />
            Pricing Rules
          </button>
        </div>
      </div>

      {/* Item Master Tab */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          {/* Search and Actions */}
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search products by code, name, or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 border-gray-300"
                  />
                </div>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" className="border-gray-300 hover:bg-gray-50 h-10">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="border border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Product Code
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Product Name
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Base Price
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Tax
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Stock
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => {
                      const itemTypeConfig = getItemTypeConfig(product.itemType);
                      const taxConfig = getTaxTreatmentConfig(product.taxTreatment);
                      const statusConfig = getStatusConfig(product.status);

                      return (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium text-[#2f2d77]">{product.code}</p>
                              <p className="text-xs text-gray-500">{product.sku}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-500">{product.shortDesc}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={`${itemTypeConfig.className} text-xs`}>
                              {itemTypeConfig.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300 text-xs">
                              {product.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm font-medium text-gray-900">
                              {formatPrice(product.basePrice, product.currency)}
                            </p>
                            <p className="text-xs text-gray-500">per {product.unitOfMeasure}</p>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={`${taxConfig.className} text-xs`}>
                              {taxConfig.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-gray-900">
                              {product.stockQuantity !== null ? product.stockQuantity : 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={`${statusConfig.className} text-xs`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} mr-1.5`}></span>
                              {statusConfig.label}
                            </Badge>
                          </td>
                         <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-1">
                            {/* View Button */}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              title="View Product"
                            >
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>

                            {/* Pricing History Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowPricingModal(true);
                              }}
                              title="Pricing History"
                            >
                              <DollarSign className="h-4 w-4 text-gray-600" />
                            </Button>

                            {/* Edit Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowEditModal(true);
                              }}
                              title="Edit Product"
                            >
                              <Edit className="h-4 w-4 text-gray-600" />
                            </Button>

                            {/* Delete Button - Disabled for active products */}
                            {product.status === 'inactive' ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-50"
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setShowDeleteModal(true);
                                }}
                                title="Delete Product"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 cursor-not-allowed opacity-40"
                                disabled
                                title="Can only delete inactive products"
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

      {/* Pricing Rules Tab */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          {/* Actions */}
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Manage customer-specific, volume, and seasonal pricing rules
                </p>
                <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pricing Rule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Rules Table */}
          <Card className="border border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Product
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Rule Type
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Condition
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Special Price
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Discount
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Validity
                      </th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pricingRules.map((rule) => {
                      const ruleConfig = getPricingRuleTypeConfig(rule.ruleType);

                      return (
                        <tr key={rule.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{rule.productName}</p>
                              <p className="text-xs text-gray-500">{rule.productCode}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={`${ruleConfig.className} text-xs`}>
                              {ruleConfig.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-900">
                              {rule.ruleType === 'customer' && rule.customerName}
                              {rule.ruleType === 'volume' && `Min ${rule.minQuantity} units`}
                              {rule.ruleType === 'seasonal' && rule.seasonName}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm font-medium text-gray-900">
                              {formatPrice(rule.price, rule.currency)}
                            </p>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-50 text-green-700 border-0 text-xs">
                              -{rule.discount}%
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-600">
                              {rule.validFrom && rule.validTo ? (
                                <>
                                  <p>{rule.validFrom}</p>
                                  <p className="text-xs">to {rule.validTo}</p>
                                </>
                              ) : (
                                <span>Ongoing</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-1">
                              {/* Edit Button */}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                title="Edit Pricing Rule"
                              >
                                <Edit className="h-4 w-4 text-gray-600" />
                              </Button>

                              {/* Delete Button */}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-red-50"
                                title="Delete Pricing Rule"
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
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
        </div>
      )}

      {/* Create Product Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-4xl shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Add New Product</h2>
                <p className="text-sm text-gray-500 mt-1">Create a new product or service item</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Item Type <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="">Select item type</option>
                      <option value="product">Product (Physical goods with inventory)</option>
                      <option value="service">Service (Non-inventory items)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      SKU <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter SKU"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Product Code
                    </Label>
                    <Input
                      placeholder="Auto-generated"
                      className="h-10 border-gray-300"
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="">Select category</option>
                      <option value="software">Software</option>
                      <option value="services">Services</option>
                      <option value="hardware">Hardware</option>
                      <option value="training">Training</option>
                      <option value="subscription">Subscription</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Product Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Enter product name"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Short Description <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Brief description for invoices"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Long Description
                    </Label>
                    <textarea
                      rows={3}
                      placeholder="Detailed product description"
                      className="w-full border border-gray-300 px-3 py-2 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Unit of Measure <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="">Select unit</option>
                      <option value="unit">Unit</option>
                      <option value="hour">Hour</option>
                      <option value="day">Day</option>
                      <option value="month">Month</option>
                      <option value="license">License</option>
                      <option value="piece">Piece</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Default Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Currency <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="THB">THB - Thai Baht (฿)</option>
                      <option value="USD">USD - US Dollar ($)</option>
                      <option value="EUR">EUR - Euro (€)</option>
                      <option value="GBP">GBP - British Pound (£)</option>
                      <option value="SGD">SGD - Singapore Dollar (S$)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Price <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500">
                      Note: You can set different prices for other currencies in the Pricing Rules tab
                    </p>
                  </div>
                </div>
              </div>

              {/* Tax & Accounting */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Tax & Accounting</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Tax Treatment <span className="text-red-500">*</span>
                    </Label>
                    <select className="w-full h-10 border border-gray-300 px-3 text-sm focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77] focus:outline-none">
                      <option value="">Select tax treatment</option>
                      <option value="vat">VAT 7% Applicable</option>
                      <option value="exempt">Tax Exempt</option>
                      <option value="zero-rated">Zero-Rated</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Chart of Accounts Code
                    </Label>
                    <Input
                      placeholder="e.g., 4000-1000"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Inventory (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="track-inventory"
                      className="w-4 h-4 text-[#2f2d77] border-gray-300 focus:ring-[#2f2d77]"
                    />
                    <Label htmlFor="track-inventory" className="text-sm text-gray-700">
                      Track inventory for this product
                    </Label>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Initial Stock Quantity
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      className="h-10 border-gray-300 focus:border-[#2f2d77] focus:ring-1 focus:ring-[#2f2d77]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100 h-10 px-6"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#2f2d77] hover:bg-[#252351] text-white h-10 px-6">
                Create Product
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricingModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-3xl shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Pricing History</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedProduct.name}</p>
              </div>
              <button
                onClick={() => {
                  setShowPricingModal(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500">Pricing history tracking feature</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100 h-10 px-6"
                onClick={() => {
                  setShowPricingModal(false);
                  setSelectedProduct(null);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md shadow-xl">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Product
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-gray-900">{selectedProduct.name}</span>?
                This action cannot be undone.
              </p>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-100 h-10"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProduct(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white h-10"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProduct(null);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}