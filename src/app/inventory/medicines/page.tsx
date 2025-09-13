"use client";

export default function MedicinesPage() {
  const medicines = [
    {
      id: "m001",
      name: "Botox Allergan 100 Units",
      manufacturer: "Allergan",
      batchNumber: "BTX2024A",
      expiryDate: "2025-06-30",
      quantity: 12,
      unit: "vial",
      costPerUnit: 2800000,
      sellingPrice: 3500000,
      minStockLevel: 5,
      location: "Refrigerator A - Shelf 1"
    },
    {
      id: "m002",
      name: "Hyaluronic Acid Filler 1ml",
      manufacturer: "Juvederm",
      batchNumber: "JUV2024B", 
      expiryDate: "2025-12-31",
      quantity: 8,
      unit: "syringe",
      costPerUnit: 3200000,
      sellingPrice: 4500000,
      minStockLevel: 3,
      location: "Refrigerator A - Shelf 2"
    },
    {
      id: "m003",
      name: "Glutathione 600mg",
      manufacturer: "Tationil",
      batchNumber: "GLU2024D",
      expiryDate: "2024-08-30",
      quantity: 3,
      unit: "vial",
      costPerUnit: 180000,
      sellingPrice: 300000,
      minStockLevel: 8,
      location: "Refrigerator A - Shelf 3"
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

  const getExpiryStatus = (expiryDate: string) => {
    const days = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return { label: "EXPIRED", color: "text-red-700" };
    if (days <= 30) return { label: `${days}d left`, color: "text-red-600" };
    if (days <= 90) return { label: `${days}d left`, color: "text-yellow-600" };
    return { label: `${days}d left`, color: "text-green-600" };
  };

  const stats = {
    total: medicines.length,
    lowStock: medicines.filter(m => (m.quantity / m.minStockLevel) <= 1).length,
    critical: medicines.filter(m => (m.quantity / m.minStockLevel) <= 0.5).length,
    totalValue: medicines.reduce((sum, m) => sum + (m.quantity * m.costPerUnit), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stok Obat</h1>
          <p className="text-gray-600 mt-1">Manajemen stok obat-obatan dengan tracking expiry dan batch</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>💊</span>
          <span>Tambah Obat Baru</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Medicines</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </div>
            <span className="text-2xl">💊</span>
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

      {/* Medicines Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Medicine Inventory</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Medicine Details</th>
                  <th className="text-left p-4">Stock Level</th>
                  <th className="text-left p-4">Expiry</th>
                  <th className="text-left p-4">Financial</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => {
                  const stockStatus = getStockStatus(medicine.quantity, medicine.minStockLevel);
                  const expiryStatus = getExpiryStatus(medicine.expiryDate);
                  const stockPercentage = Math.min((medicine.quantity / medicine.minStockLevel) * 100, 100);
                  
                  return (
                    <tr key={medicine.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{medicine.name}</p>
                          <div className="text-sm text-gray-500">
                            <span>{medicine.manufacturer}</span>
                            <span className="mx-2">•</span>
                            <span>Batch: {medicine.batchNumber}</span>
                          </div>
                          <p className="text-xs text-gray-400">📍 {medicine.location}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{medicine.quantity} {medicine.unit}</span>
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
                          <p className="text-xs text-gray-500 mt-1">Min: {medicine.minStockLevel} {medicine.unit}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm">{new Date(medicine.expiryDate).toLocaleDateString('id-ID')}</p>
                          <span className={`px-2 py-1 text-xs rounded ${expiryStatus.color.replace('text-', 'bg-').replace('-600', '-100').replace('-700', '-100')} ${expiryStatus.color}`}>
                            {expiryStatus.label}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-gray-500">Cost:</span>
                            <span className="font-medium ml-1">{formatCurrency(medicine.costPerUnit)}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Sell:</span>
                            <span className="font-medium text-green-600 ml-1">{formatCurrency(medicine.sellingPrice)}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Value:</span>
                            <span className="font-medium text-blue-600 ml-1">
                              {formatCurrency(medicine.quantity * medicine.costPerUnit)}
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