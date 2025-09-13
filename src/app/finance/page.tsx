"use client";

import Link from "next/link";

export default function FinancePage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const transactions = [
    {
      id: "1",
      type: "income",
      description: "Payment - Maria Rodriguez (Botox Treatment)",
      amount: 5247000,
      method: "Transfer",
      date: new Date("2024-01-20T10:30:00"),
      status: "completed"
    },
    {
      id: "2",
      type: "income", 
      description: "Payment - Sarah Kim (Hydrafacial)",
      amount: 1200000,
      method: "Cash",
      date: new Date("2024-01-20T09:15:00"),
      status: "completed"
    },
    {
      id: "3",
      type: "expense",
      description: "Inventory Purchase - Botox Allergan",
      amount: 14000000,
      method: "Transfer",
      date: new Date("2024-01-19T14:20:00"),
      status: "completed"
    }
  ];

  const summary = {
    monthlyRevenue: 485000000,
    monthlyProfit: 145500000,
    pendingPayments: 3200000,
    totalExpenses: 294000000
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Keuangan</h1>
          <p className="text-gray-600 mt-1">Dashboard keuangan, pembayaran, invoice, dan laporan</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/finance/payments">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <span>💳</span>
              <span>Payments</span>
            </button>
          </Link>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <span>📊</span>
            <span>Financial Reports</span>
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Revenue Bulan Ini</h3>
              <div className="text-2xl font-bold text-blue-600 mt-2">{formatCurrency(summary.monthlyRevenue)}</div>
              <p className="text-xs text-green-600 mt-1">↗ +8.5% vs bulan lalu</p>
            </div>
            <span className="text-2xl">📈</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Profit Bulan Ini</h3>
              <div className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(summary.monthlyProfit)}</div>
              <p className="text-xs text-gray-500 mt-1">Margin: 30%</p>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pending Payments</h3>
              <div className="text-2xl font-bold text-orange-600 mt-2">{formatCurrency(summary.pendingPayments)}</div>
              <p className="text-xs text-gray-500 mt-1">3 transaksi</p>
            </div>
            <span className="text-2xl">⏳</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Monthly Expenses</h3>
              <div className="text-2xl font-bold text-red-600 mt-2">{formatCurrency(summary.totalExpenses)}</div>
              <p className="text-xs text-gray-500 mt-1">Operating costs</p>
            </div>
            <span className="text-2xl">💸</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">
                      {transaction.method === "Cash" ? "💵" : 
                       transaction.method === "Transfer" ? "🏦" : "💳"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{transaction.date.toLocaleDateString('id-ID')}</span>
                      <span>•</span>
                      <span>{transaction.method}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "income" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    transaction.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}