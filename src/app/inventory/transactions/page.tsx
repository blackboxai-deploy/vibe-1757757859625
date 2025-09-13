"use client";

export default function TransactionsPage() {
  const transactions = [
    {
      id: "tx001",
      itemName: "Botox Allergan 100 Units",
      transactionType: "in",
      quantity: 5,
      unit: "vial",
      reason: "Stock replenishment from supplier",
      performedBy: "Dr. Sarah Wilson",
      cost: 14000000,
      date: "2024-01-20 08:30"
    },
    {
      id: "tx002",
      itemName: "Disposable Syringe 1ml",
      transactionType: "out",
      quantity: -15,
      unit: "pieces",
      reason: "Used in treatments",
      performedBy: "Amanda Rodriguez",
      cost: 52500,
      date: "2024-01-19 16:45"
    },
    {
      id: "tx003",
      itemName: "Glutathione 600mg",
      transactionType: "out",
      quantity: -2,
      unit: "vial",
      reason: "Used in IV therapy",
      performedBy: "Amanda Rodriguez",
      cost: 360000,
      date: "2024-01-19 14:20"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "in": return "📥";
      case "out": return "📤";
      case "adjustment": return "⚖️";
      case "expired": return "⏰";
      default: return "📋";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "in": return "bg-green-100 text-green-800";
      case "out": return "bg-blue-100 text-blue-800";
      case "adjustment": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: transactions.length,
    stockIn: transactions.filter(t => t.transactionType === "in").length,
    stockOut: transactions.filter(t => t.transactionType === "out").length,
    totalValue: transactions.reduce((sum, t) => sum + Math.abs(t.cost), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Transactions</h1>
          <p className="text-gray-600 mt-1">Complete audit trail untuk semua pergerakan stock inventory</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>📝</span>
          <span>New Transaction</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Transactions</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </div>
            <span className="text-2xl">📋</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Stock In</h3>
              <div className="text-2xl font-bold text-green-600">{stats.stockIn}</div>
            </div>
            <span className="text-2xl">📥</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Stock Out</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.stockOut}</div>
            </div>
            <span className="text-2xl">📤</span>
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

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Transaction Log</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Transaction</th>
                  <th className="text-left p-4">Item & Quantity</th>
                  <th className="text-left p-4">Reason</th>
                  <th className="text-left p-4">Performed By</th>
                  <th className="text-left p-4">Value</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm">{getTransactionIcon(transaction.transactionType)}</span>
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-xs rounded ${getTransactionColor(transaction.transactionType)}`}>
                            {transaction.transactionType.toUpperCase()}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{transaction.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-sm">{transaction.itemName}</p>
                        <span className={`text-sm font-medium ${
                          transaction.quantity > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.quantity > 0 ? "+" : ""}{transaction.quantity} {transaction.unit}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{transaction.reason}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{transaction.performedBy}</p>
                    </td>
                    <td className="p-4">
                      <p className={`text-sm font-medium ${
                        transaction.transactionType === "in" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.transactionType === "in" ? "+" : "-"}{formatCurrency(transaction.cost)}
                      </p>
                    </td>
                    <td className="p-4">
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                        📄 View
                      </button>
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