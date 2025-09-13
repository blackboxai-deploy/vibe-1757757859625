"use client";

export default function InventoryPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const inventory = [
    {
      id: "m001",
      name: "Botox Allergan 100 Units",
      type: "medicine",
      quantity: 12,
      minStock: 5,
      unit: "vial",
      cost: 2800000,
      expiry: "2025-06-30",
      status: "good"
    },
    {
      id: "m002", 
      name: "Glutathione 600mg",
      type: "medicine",
      quantity: 3,
      minStock: 8,
      unit: "vial", 
      cost: 180000,
      expiry: "2024-08-30",
      status: "critical"
    },
    {
      id: "c001",
      name: "Disposable Syringe 1ml",
      type: "consumable",
      quantity: 45,
      minStock: 50,
      unit: "pieces",
      cost: 3500,
      expiry: null,
      status: "low"
    }
  ];

  const stats = {
    totalItems: inventory.length,
    lowStock: inventory.filter(i => i.quantity <= i.minStock).length,
    critical: inventory.filter(i => i.quantity <= i.minStock * 0.5).length,
    totalValue: inventory.reduce((sum, i) => sum + (i.quantity * i.cost), 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-100 text-red-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      case "good": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Inventaris</h1>
          <p className="text-gray-600 mt-1">Kelola stok obat, bahan habis pakai, dan inventaris klinik</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <span>📦</span>
          <span>Add Inventory</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Items</h3>
              <div className="text-2xl font-bold text-blue-600 mt-2">{stats.totalItems}</div>
            </div>
            <span className="text-2xl">📦</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Low Stock</h3>
              <div className="text-2xl font-bold text-yellow-600 mt-2">{stats.lowStock}</div>
            </div>
            <span className="text-2xl">⚠️</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Critical Stock</h3>
              <div className="text-2xl font-bold text-red-600 mt-2">{stats.critical}</div>
            </div>
            <span className="text-2xl">🚨</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
              <div className="text-lg font-bold text-green-600 mt-2">{formatCurrency(stats.totalValue)}</div>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Inventory Items</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Item Details</th>
                  <th className="text-left p-4">Stock Level</th>
                  <th className="text-left p-4">Value</th>
                  <th className="text-left p-4">Expiry</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{item.type === "medicine" ? "💊" : "🧴"}</span>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <span className={`px-2 py-1 text-xs rounded ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium">{item.quantity} {item.unit}</p>
                        <p className="text-xs text-gray-500">Min: {item.minStock} {item.unit}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              item.quantity <= item.minStock * 0.5 ? "bg-red-500" :
                              item.quantity <= item.minStock ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min((item.quantity / item.minStock) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{formatCurrency(item.quantity * item.cost)}</p>
                      <p className="text-xs text-gray-500">@ {formatCurrency(item.cost)}/{item.unit}</p>
                    </td>
                    <td className="p-4">
                      {item.expiry ? (
                        <div>
                          <p className="text-sm">{new Date(item.expiry).toLocaleDateString('id-ID')}</p>
                          <p className="text-xs text-gray-500">
                            {Math.ceil((new Date(item.expiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                          </p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                          Restock
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}