"use client";

import Link from "next/link";

export default function DashboardPage() {
  const kpiData = [
    { title: "Total Pasien", value: "1,247", change: "+12 bulan ini", icon: "👥", color: "text-blue-600" },
    { title: "Pasien Baru Hari Ini", value: "3", change: "dari target 5", icon: "✨", color: "text-green-600" },
    { title: "Appointment Hari Ini", value: "12", change: "sudah dikonfirmasi", icon: "📅", color: "text-purple-600" },
    { title: "Pendapatan Hari Ini", value: "Rp 18.5M", change: "+18.5% vs kemarin", icon: "💰", color: "text-emerald-600" },
    { title: "Pendapatan Bulan Ini", value: "Rp 485M", change: "85% dari target", icon: "📈", color: "text-indigo-600" },
    { title: "Member Growth", value: "+15.8%", change: "bulan ini", icon: "⭐", color: "text-yellow-600" },
  ];

  const quickActions = [
    { title: "Booking Baru", href: "/services/booking/new", icon: "📅", color: "bg-blue-500" },
    { title: "Daftar Pasien", href: "/patients/register", icon: "👤", color: "bg-green-500" },
    { title: "Check-in", href: "/patients/visits/checkin", icon: "🚪", color: "bg-purple-500" },
    { title: "Pembayaran", href: "/finance/payments", icon: "💳", color: "bg-emerald-500" },
    { title: "Stok Obat", href: "/inventory/medicines", icon: "📦", color: "bg-orange-500" },
    { title: "Laporan", href: "/reports", icon: "📊", color: "bg-pink-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening at your clinic today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric', 
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
                <div className={`text-2xl font-bold ${kpi.color} mt-2`}>{kpi.value}</div>
                <p className="text-xs text-gray-500 mt-1">{kpi.change}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{kpi.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <button className={`w-full h-20 ${action.color} hover:opacity-90 text-white rounded-lg flex flex-col items-center justify-center space-y-1 transition-all hover:scale-105`}>
                <span className="text-2xl">{action.icon}</span>
                <span className="text-sm font-medium">{action.title}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">📅 Today's Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">MR</span>
                </div>
                <div>
                  <p className="font-medium">Maria Rodriguez</p>
                  <p className="text-sm text-gray-500">Botox Treatment</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">10:00 AM</p>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Confirmed</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">SK</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Kim</p>
                  <p className="text-sm text-gray-500">Hydrafacial</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">2:00 PM</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">In Progress</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">AC</span>
                </div>
                <div>
                  <p className="font-medium">Amanda Chen</p>
                  <p className="text-sm text-gray-500">Carbon Laser</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">4:30 PM</p>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🚨 Stock Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-800">Glutathione 600mg</p>
                <p className="text-sm text-red-600">Critical: 3 units remaining</p>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Critical</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div>
                <p className="font-medium text-yellow-800">Disposable Syringe 1ml</p>
                <p className="text-sm text-yellow-600">Low: 45 units (min 50)</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Low</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div>
                <p className="font-medium text-orange-800">Botox Allergan</p>
                <p className="text-sm text-orange-600">Expires in 11 days</p>
              </div>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Expiring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}