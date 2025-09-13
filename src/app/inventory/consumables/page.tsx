"use client";

export default function ConsumablesPage() {
  const consumables = [
    {
      id: "c001",
      name: "Disposable Syringe 1ml",
      category: "disposable",
      brand: "BD",
      quantity: 45,
      unit: "pieces",
      costPerUnit: 3500,
      minStockLevel: 50,
      location: "Supply Room A - Shelf 1",
      usageTracking: true,
      dailyUsage: 12
    },
    {
      id: "c002",
      name: "Sterile Gauze 4x4",
      category: "supplies",
      brand: "Hansaplast",
      quantity: 120,
      unit: "pieces", 
      costPerUnit: 2500,
      minStockLevel: 100,
      location: "Supply Room A - Shelf 2",
      usageTracking: false,
      dailyUsage: 0
    },
    {
      id: "c003",
      name: "Alcohol Swabs",
      category: "supplies",
      brand: "Sensi",
      quantity: 180,
      unit: "pieces",
      costPerUnit: 1200,
      minStockLevel: 200,
      location: "Supply Room A - Drawer 1",
      usageTracking: false,
      dailyUsage: 0
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStockStatus = (quantity: number, minLevel: number) => {
    const percentage = (quantity / minLevel) * 100;
    if (percentage <= 50) return { label: "Critical", color: "text-red-600" };
    if (percentage <= 100) return { label: "Low", color: "text-yellow-600" };
    return { label: "Good", color: "text-green-600" };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "disposable": return "🗑️";
      case "equipment": return "🔧";
      case "supplies": return "📦";
      default: return "📋";
    }
  };

  const stats = {
    total: consumables.length,
    lowStock: consumables.filter(c => (c.quantity / c.minStockLevel) <= 1).length,
    critical: consumables.filter(c => (c.quantity / c.minStockLevel) <= 0.5).length,
    totalValue: consumables.reduce((sum, c) => sum + (c.quantity * c.costPerUnit), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bahan Habis Pakai (BHP)</h1>
          <p className="text-gray-600 mt-1">Manajemen alat medis dan supplies dengan usage tracking</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <span>🧴</span>
          <span>Tambah Item Baru</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Items</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </div>
            <span className="text-2xl">📦</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Low Stock</h3>
              <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
            </div>
            <span className="text-2xl">⚠️</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Critical</h3>
              <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
            </div>
            <span className="text-2xl">🚨</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
              <div className="text-lg font-bold text-emerald-600">{formatCurrency(stats.totalValue)}</div>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      {/* Consumables Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Consumables Inventory</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Item Details</th>
                  <th className="text-left p-4">Stock Level</th>
                  <th className="text-left p-4">Usage Tracking</th>
                  <th className="text-left p-4">Financial</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {consumables.map((item) => {
                  const stockStatus = getStockStatus(item.quantity, item.minStockLevel);
                  const stockPercentage = Math.min((item.quantity / item.minStockLevel) * 100, 100);
                  
                  return (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getCategoryIcon(item.category)}</span>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <div className="text-sm text-gray-500">
                              <span>{item.brand}</span>
                              <span className="mx-2">•</span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400">📍 {item.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{item.quantity} {item.unit}</span>
                            <span className={`px-2 py-1 text-xs rounded ${stockStatus.color.replace('text-', 'bg-').replace('-600', '-100')} ${stockStatus.color}`}>
                              {stockStatus.label}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                stockPercentage <= 50 ? "bg-red-500" :
                                stockPercentage <= 100 ? "bg-yellow-500" : "bg-green-500"
                              }`}
                              style={{ width: `${stockPercentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Min: {item.minStockLevel} {item.unit}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        {item.usageTracking ? (
                          <div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">📊 Tracked</span>
                            <p className="text-xs text-gray-500 mt-1">Daily usage: {item.dailyUsage}</p>
                          </div>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">🚫 Not Tracked</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-gray-500">Cost:</span>
                            <span className="font-medium ml-1">{formatCurrency(item.costPerUnit)}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Value:</span>
                            <span className="font-medium text-blue-600 ml-1">
                              {formatCurrency(item.quantity * item.costPerUnit)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col space-y-2">
                          <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                            📝 Edit
                          </button>
                          <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                            📦 Restock
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}