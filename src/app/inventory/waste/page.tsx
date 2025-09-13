"use client";

export default function WastePage() {
  const wasteRecords = [
    {
      id: "waste001",
      wasteType: "pharmaceutical",
      items: [
        { name: "Expired Glutathione", quantity: 3, unit: "vial" },
        { name: "Expired Vitamin C", quantity: 2, unit: "vial" }
      ],
      weight: 0.5,
      disposalCompany: "PT Medical Waste Solutions",
      disposalDate: "2024-01-18",
      handledBy: "Amanda Rodriguez",
      cost: 150000,
      status: "completed"
    },
    {
      id: "waste002",
      wasteType: "sharps",
      items: [
        { name: "Used syringes", quantity: 25, unit: "pieces" },
        { name: "Injection needles", quantity: 30, unit: "pieces" }
      ],
      weight: 1.2,
      disposalCompany: "PT Medical Waste Solutions",
      disposalDate: "2024-01-19",
      handledBy: "Dr. Sarah Wilson",
      cost: 200000,
      status: "completed"
    },
    {
      id: "waste003",
      wasteType: "solid",
      items: [
        { name: "Used gauze", quantity: 50, unit: "pieces" },
        { name: "Disposable gloves", quantity: 100, unit: "pairs" }
      ],
      weight: 2.8,
      disposalCompany: "Jakarta Medical Waste",
      disposalDate: "2024-01-20",
      handledBy: "Luna Park",
      cost: 180000,
      status: "pending"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getWasteTypeIcon = (type: string) => {
    switch (type) {
      case "pharmaceutical": return "💊";
      case "sharps": return "💉";
      case "solid": return "🗑️";
      case "liquid": return "💧";
      default: return "📦";
    }
  };

  const getWasteTypeColor = (type: string) => {
    switch (type) {
      case "pharmaceutical": return "bg-red-100 text-red-800";
      case "sharps": return "bg-yellow-100 text-yellow-800";
      case "solid": return "bg-blue-100 text-blue-800";
      case "liquid": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: wasteRecords.length,
    completed: wasteRecords.filter(w => w.status === "completed").length,
    pending: wasteRecords.filter(w => w.status === "pending").length,
    totalWeight: wasteRecords.reduce((sum, w) => sum + w.weight, 0),
    totalCost: wasteRecords.reduce((sum, w) => sum + w.cost, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Limbah Medis</h1>
          <p className="text-gray-600 mt-1">Tracking dan disposal limbah medis sesuai standar kesehatan</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2">
          <span>🗑️</span>
          <span>New Waste Record</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-xs text-gray-500">Total Records</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-xs text-gray-500">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-gray-600">{stats.totalWeight} kg</div>
          <div className="text-xs text-gray-500">Total Weight</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-sm font-bold text-red-600">{formatCurrency(stats.totalCost)}</div>
          <div className="text-xs text-gray-500">Disposal Cost</div>
        </div>
      </div>

      {/* Waste Records Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Waste Disposal Records</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Waste Type</th>
                  <th className="text-left p-4">Items</th>
                  <th className="text-left p-4">Weight</th>
                  <th className="text-left p-4">Disposal Info</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wasteRecords.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{getWasteTypeIcon(record.wasteType)}</span>
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-xs rounded ${getWasteTypeColor(record.wasteType)}`}>
                            {record.wasteType.toUpperCase()}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">ID: {record.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {record.items.map((item, index) => (
                          <div key={index} className="text-xs text-gray-600">
                            • {item.name} ({item.quantity} {item.unit})
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{record.weight} kg</p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium">{record.disposalCompany}</p>
                        <p className="text-xs text-gray-500">Date: {record.disposalDate}</p>
                        <p className="text-xs text-gray-500">Handler: {record.handledBy}</p>
                        <p className="text-xs text-blue-600">Cost: {formatCurrency(record.cost)}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                          📄 View
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                          📋 Certificate
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

      {/* Compliance Info */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">📋 Compliance Guidelines</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Disposal Methods</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span>💊</span>
                  <span><strong>Pharmaceutical:</strong> Incineration at ≥1100°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>💉</span>
                  <span><strong>Sharps:</strong> Autoclave + Sharps container</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🗑️</span>
                  <span><strong>Solid:</strong> Medical waste incineration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>💧</span>
                  <span><strong>Liquid:</strong> Chemical treatment</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Certified Partners</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-green-50 rounded">
                  <p className="font-medium">PT Medical Waste Solutions</p>
                  <p className="text-xs text-gray-600">License: MWS-2024-001 • Rating: ⭐⭐⭐⭐⭐</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <p className="font-medium">Jakarta Medical Waste</p>
                  <p className="text-xs text-gray-600">License: JMW-2024-002 • Rating: ⭐⭐⭐⭐</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}