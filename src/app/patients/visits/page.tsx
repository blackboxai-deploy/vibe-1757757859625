"use client";

import Link from "next/link";

export default function PatientVisitsPage() {
  const visits = [
    {
      id: "v001",
      patientName: "Maria Rodriguez",
      checkInTime: "09:30",
      checkOutTime: "11:45",
      status: "completed",
      services: ["Botox Injection", "Consultation"],
      doctor: "Dr. Sarah Wilson",
      amount: 3700000,
      date: "2024-01-20"
    },
    {
      id: "v002",
      patientName: "Sarah Kim",
      checkInTime: "14:15",
      checkOutTime: null,
      status: "in-progress",
      services: ["Hydrafacial Premium"],
      doctor: "Luna Park",
      amount: 1200000,
      date: "2024-01-20"
    },
    {
      id: "v003",
      patientName: "Amanda Chen",
      checkInTime: "16:20",
      checkOutTime: "17:45",
      status: "completed",
      services: ["Carbon Laser", "IV Vitamin"],
      doctor: "Dr. Sarah Wilson",
      amount: 2650000,
      date: "2024-01-19"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const stats = {
    total: visits.length,
    inProgress: visits.filter(v => v.status === "in-progress").length,
    completed: visits.filter(v => v.status === "completed").length,
    totalRevenue: visits.filter(v => v.status === "completed").reduce((sum, v) => sum + v.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tracking Kunjungan Pasien</h1>
          <p className="text-gray-600 mt-1">Monitor check-in, check-out, dan status kunjungan real-time</p>
        </div>
        <Link href="/patients/visits/checkin">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
            <span>🚪</span>
            <span>Check-in Pasien</span>
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Visits</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </div>
            <span className="text-2xl">🏥</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">In Progress</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            </div>
            <span className="text-2xl">🔄</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Completed</h3>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
              <div className="text-lg font-bold text-emerald-600">{formatCurrency(stats.totalRevenue)}</div>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      {/* Visits Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Visit Records</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Patient</th>
                  <th className="text-left p-4">Services</th>
                  <th className="text-left p-4">Time</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={visit.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">
                            {visit.patientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{visit.patientName}</p>
                          <p className="text-sm text-gray-500">{visit.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        {visit.services.map((service, index) => (
                          <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mr-1 mb-1">
                            {service}
                          </span>
                        ))}
                        <p className="text-xs text-gray-500 mt-1">with {visit.doctor}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm"><strong>In:</strong> {visit.checkInTime}</p>
                        <p className="text-sm"><strong>Out:</strong> {visit.checkOutTime || "In Progress"}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(visit.status)}`}>
                        {visit.status.charAt(0).toUpperCase() + visit.status.slice(1).replace("-", " ")}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{formatCurrency(visit.amount)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                          View
                        </button>
                        {visit.status === "in-progress" && (
                          <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                            Check-out
                          </button>
                        )}
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