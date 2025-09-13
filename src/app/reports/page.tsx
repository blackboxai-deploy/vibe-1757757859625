"use client";

export default function ReportsPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const dailySummary = {
    date: "2024-01-20",
    revenue: 18500000,
    profit: 5550000,
    patients: { new: 3, returning: 9, total: 12 },
    appointments: { completed: 12, cancelled: 2 },
    treatments: { botox: 5, facial: 4, laser: 2 }
  };

  const staffPerformance = [
    {
      name: "Dr. Sarah Wilson",
      position: "Chief Medical Officer",
      treatments: 85,
      revenue: 298500000,
      rating: 4.9,
      commission: 59700000
    },
    {
      name: "Dr. Michael Chen",
      position: "Aesthetic Doctor",
      treatments: 72,
      revenue: 234000000,
      rating: 4.7,
      commission: 42120000
    },
    {
      name: "Luna Park",
      position: "Beauty Therapist",
      treatments: 68,
      revenue: 81600000,
      rating: 4.8,
      commission: 9792000
    }
  ];

  const treatmentPopularity = [
    { treatment: "Botox Injection", count: 45, revenue: 157500000 },
    { treatment: "Hydrafacial", count: 38, revenue: 45600000 },
    { treatment: "Carbon Laser", count: 28, revenue: 50400000 },
    { treatment: "Filler", count: 22, revenue: 99000000 }
  ];

  const getRatingStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan & Analisis</h1>
          <p className="text-gray-600 mt-1">Comprehensive business intelligence dan analytics dashboard</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <span>📊</span>
          <span>Export Reports</span>
        </button>
      </div>

      {/* Daily Summary */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">📈 Daily Summary - {dailySummary.date}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{formatCurrency(dailySummary.revenue)}</div>
              <p className="text-sm text-gray-500">Revenue Today</p>
              <div className="text-lg font-semibold text-blue-600 mt-1">{formatCurrency(dailySummary.profit)}</div>
              <p className="text-xs text-gray-400">Profit</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{dailySummary.patients.total}</div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <div className="flex justify-center space-x-4 text-sm mt-1">
                <div>
                  <span className="font-semibold text-green-600">{dailySummary.patients.new}</span>
                  <p className="text-xs text-gray-400">New</p>
                </div>
                <div>
                  <span className="font-semibold text-blue-600">{dailySummary.patients.returning}</span>
                  <p className="text-xs text-gray-400">Returning</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dailySummary.appointments.completed}</div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xs text-gray-400 mt-1">Cancelled: {dailySummary.appointments.cancelled}</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {Object.values(dailySummary.treatments).reduce((a, b) => a + b, 0)}
              </div>
              <p className="text-sm text-gray-500">Treatments</p>
              <div className="text-xs text-gray-500 mt-1">
                Botox: {dailySummary.treatments.botox} • Facial: {dailySummary.treatments.facial} • Laser: {dailySummary.treatments.laser}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Performance */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">👨‍⚕️ Staff Performance</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Staff Member</th>
                  <th className="text-center p-4">Treatments</th>
                  <th className="text-center p-4">Revenue</th>
                  <th className="text-center p-4">Rating</th>
                  <th className="text-center p-4">Commission</th>
                </tr>
              </thead>
              <tbody>
                {staffPerformance.map((staff, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.position}</p>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-lg font-bold text-blue-600">{staff.treatments}</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-sm font-medium">{formatCurrency(staff.revenue)}</div>
                    </td>
                    <td className="text-center p-4">
                      <div>
                        <div className="text-sm">{getRatingStars(staff.rating)}</div>
                        <div className="text-xs text-gray-500">{staff.rating}/5</div>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-sm font-medium text-green-600">{formatCurrency(staff.commission)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Treatment Popularity */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">🏆 Treatment Popularity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {treatmentPopularity.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.treatment}</p>
                  <p className="text-sm text-gray-500">{item.count} treatments</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCurrency(item.revenue)}</p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}