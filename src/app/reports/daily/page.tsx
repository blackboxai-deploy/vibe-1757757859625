"use client";

export default function DailyReportsPage() {
  const dailyData = {
    date: "2024-01-20",
    revenue: 18500000,
    profit: 5550000,
    expenses: 12950000,
    patients: {
      new: 3,
      returning: 9,
      total: 12,
      noShow: 1
    },
    appointments: {
      scheduled: 15,
      completed: 12,
      cancelled: 2,
      inProgress: 1
    },
    treatments: {
      botox: 5,
      facial: 4,
      laser: 2,
      consultation: 1,
      infusion: 3
    },
    staff: {
      present: 4,
      absent: 0,
      avgUtilization: 85
    },
    inventory: {
      lowStock: 3,
      expiring: 1,
      restocked: 2,
      criticalAlerts: 1
    }
  };

  const topTreatments = [
    { name: "Botox Injection", count: 5, revenue: 17500000 },
    { name: "Hydrafacial Premium", count: 4, revenue: 4800000 },
    { name: "IV Vitamin Drip", count: 3, revenue: 2550000 },
    { name: "Carbon Laser", count: 2, revenue: 3600000 }
  ];

  const staffPerformance = [
    { name: "Dr. Sarah Wilson", treatments: 6, revenue: 12500000, utilization: 90 },
    { name: "Dr. Michael Chen", treatments: 4, revenue: 8200000, utilization: 80 },
    { name: "Luna Park", treatments: 5, revenue: 6000000, utilization: 85 },
    { name: "Amanda Rodriguez", treatments: 3, revenue: 2550000, utilization: 75 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Report</h1>
          <p className="text-gray-600 mt-1">
            Comprehensive daily summary - {new Date(dailyData.date).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long', 
              day: 'numeric'
            })}
          </p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <span>📊</span>
          <span>Export Report</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{formatCurrency(dailyData.revenue)}</div>
            <p className="text-sm text-gray-500 mb-2">Revenue Today</p>
            <div className="text-lg font-semibold text-blue-600">{formatCurrency(dailyData.profit)}</div>
            <p className="text-xs text-gray-400">Profit</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{dailyData.patients.total}</div>
            <p className="text-sm text-gray-500 mb-2">Total Patients</p>
            <div className="flex justify-center space-x-4 text-sm">
              <div>
                <span className="font-semibold text-green-600">{dailyData.patients.new}</span>
                <p className="text-xs text-gray-400">New</p>
              </div>
              <div>
                <span className="font-semibold text-blue-600">{dailyData.patients.returning}</span>
                <p className="text-xs text-gray-400">Returning</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{dailyData.appointments.completed}</div>
            <p className="text-sm text-gray-500 mb-2">Completed</p>
            <p className="text-xs text-gray-400">
              Scheduled: {dailyData.appointments.scheduled} • Cancelled: {dailyData.appointments.cancelled}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {Object.values(dailyData.treatments).reduce((a, b) => a + b, 0)}
            </div>
            <p className="text-sm text-gray-500 mb-2">Treatments</p>
            <p className="text-xs text-gray-400">
              Botox: {dailyData.treatments.botox} • Facial: {dailyData.treatments.facial}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Treatments */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">🏆 Top Treatments Today</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topTreatments.map((treatment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{treatment.name}</p>
                      <p className="text-sm text-gray-500">{treatment.count} treatments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{formatCurrency(treatment.revenue)}</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Performance */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">👨‍⚕️ Staff Performance Today</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {staffPerformance.map((staff, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">
                        {staff.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{staff.name}</p>
                      <p className="text-sm text-gray-500">{staff.treatments} treatments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{formatCurrency(staff.revenue)}</p>
                    <p className="text-xs text-gray-500">Utilization: {staff.utilization}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Operational Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Staff Summary */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">👥 Staff Summary</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Present Today:</span>
                <span className="font-bold text-green-600">{dailyData.staff.present}</span>
              </div>
              <div className="flex justify-between">
                <span>Absent:</span>
                <span className="font-bold text-red-600">{dailyData.staff.absent}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Utilization:</span>
                <span className="font-bold text-blue-600">{dailyData.staff.avgUtilization}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">📦 Inventory Status</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Low Stock Items:</span>
                <span className="font-bold text-yellow-600">{dailyData.inventory.lowStock}</span>
              </div>
              <div className="flex justify-between">
                <span>Expiring Soon:</span>
                <span className="font-bold text-orange-600">{dailyData.inventory.expiring}</span>
              </div>
              <div className="flex justify-between">
                <span>Critical Alerts:</span>
                <span className="font-bold text-red-600">{dailyData.inventory.criticalAlerts}</span>
              </div>
              <div className="flex justify-between">
                <span>Restocked:</span>
                <span className="font-bold text-green-600">{dailyData.inventory.restocked}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">💰 Financial Breakdown</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Revenue:</span>
                <span className="font-bold text-green-600">{formatCurrency(dailyData.revenue)}</span>
              </div>
              <div className="flex justify-between">
                <span>Expenses:</span>
                <span className="font-bold text-red-600">{formatCurrency(dailyData.expenses)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Net Profit:</span>
                <span className="font-bold text-blue-600">{formatCurrency(dailyData.profit)}</span>
              </div>
              <div className="flex justify-between">
                <span>Profit Margin:</span>
                <span className="font-bold text-purple-600">
                  {((dailyData.profit / dailyData.revenue) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}