"use client";

export default function FinancialReportsPage() {
  const monthlyData = [
    { month: "Jan", revenue: 420000000, profit: 126000000, expenses: 294000000 },
    { month: "Feb", revenue: 380000000, profit: 114000000, expenses: 266000000 },
    { month: "Mar", revenue: 450000000, profit: 135000000, expenses: 315000000 },
    { month: "Apr", revenue: 520000000, profit: 156000000, expenses: 364000000 },
    { month: "May", revenue: 480000000, profit: 144000000, expenses: 336000000 },
    { month: "Jun", revenue: 550000000, profit: 165000000, expenses: 385000000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-1">Comprehensive financial analysis dan business intelligence</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <span>📊</span>
          <span>Export Report</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Monthly Revenue</h3>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(currentMonth.revenue)}</div>
              <p className={`text-xs mt-1 ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {revenueGrowth >= 0 ? '↗' : '↘'} {Math.abs(revenueGrowth).toFixed(1)}% vs last month
              </p>
            </div>
            <span className="text-2xl">📈</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Monthly Profit</h3>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(currentMonth.profit)}</div>
              <p className="text-xs text-gray-500 mt-1">Margin: {(currentMonth.profit / currentMonth.revenue * 100).toFixed(1)}%</p>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Monthly Expenses</h3>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(currentMonth.expenses)}</div>
              <p className="text-xs text-gray-500 mt-1">Operating costs</p>
            </div>
            <span className="text-2xl">💸</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Net Profit</h3>
              <div className="text-2xl font-bold text-emerald-600">
                {formatCurrency(currentMonth.revenue - currentMonth.expenses)}
              </div>
              <p className="text-xs text-gray-500 mt-1">After all expenses</p>
            </div>
            <span className="text-2xl">🎯</span>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">6-Month Financial Trend</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-blue-600">{data.month}</span>
                  </div>
                  <div>
                    <p className="font-medium">Month: {data.month}</p>
                    <p className="text-sm text-gray-500">
                      Profit Margin: {(data.profit / data.revenue * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-gray-500">Revenue:</span>
                        <span className="font-medium text-blue-600 ml-1">{formatCurrency(data.revenue)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Profit:</span>
                        <span className="font-medium text-green-600 ml-1">{formatCurrency(data.profit)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Expenses:</span>
                        <span className="font-medium text-red-600 ml-1">{formatCurrency(data.expenses)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Method Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Payment Method Distribution</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                <div className="flex items-center space-x-2">
                  <span>🏦</span>
                  <span className="font-medium">Bank Transfer</span>
                </div>
                <span className="font-bold text-green-600">45%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                <div className="flex items-center space-x-2">
                  <span>💵</span>
                  <span className="font-medium">Cash</span>
                </div>
                <span className="font-bold text-blue-600">30%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                <div className="flex items-center space-x-2">
                  <span>💳</span>
                  <span className="font-medium">Credit Card</span>
                </div>
                <span className="font-bold text-purple-600">20%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                <div className="flex items-center space-x-2">
                  <span>📱</span>
                  <span className="font-medium">QRIS</span>
                </div>
                <span className="font-bold text-orange-600">5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Expense Categories</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Staff Salaries</span>
                <span className="font-bold text-gray-600">35%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Inventory</span>
                <span className="font-bold text-gray-600">25%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Rent & Utilities</span>
                <span className="font-bold text-gray-600">20%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Marketing</span>
                <span className="font-bold text-gray-600">10%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">Other</span>
                <span className="font-bold text-gray-600">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}