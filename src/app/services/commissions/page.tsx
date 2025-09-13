"use client";

export default function CommissionsPage() {
  const commissions = [
    {
      id: "1",
      staffName: "Dr. Sarah Wilson",
      month: "January 2024",
      treatments: 28,
      revenue: 125000000,
      commissionRate: 20,
      commissionEarned: 25000000,
      status: "calculated"
    },
    {
      id: "2",
      staffName: "Dr. Michael Chen", 
      month: "January 2024",
      treatments: 22,
      revenue: 89000000,
      commissionRate: 18,
      commissionEarned: 16020000,
      status: "calculated"
    },
    {
      id: "3",
      staffName: "Luna Park",
      month: "January 2024",
      treatments: 35,
      revenue: 42000000,
      commissionRate: 12,
      commissionEarned: 5040000,
      status: "paid"
    },
    {
      id: "4",
      staffName: "Amanda Rodriguez",
      month: "January 2024", 
      treatments: 18,
      revenue: 15300000,
      commissionRate: 8,
      commissionEarned: 1224000,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "calculated": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    totalCommissions: commissions.reduce((sum, c) => sum + c.commissionEarned, 0),
    totalRevenue: commissions.reduce((sum, c) => sum + c.revenue, 0),
    totalTreatments: commissions.reduce((sum, c) => sum + c.treatments, 0),
    averageRate: commissions.reduce((sum, c) => sum + c.commissionRate, 0) / commissions.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commission Management</h1>
          <p className="text-gray-600 mt-1">Tracking komisi staff berdasarkan layanan yang diberikan</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <span>💰</span>
          <span>Process Commissions</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Commissions</h3>
              <div className="text-lg font-bold text-green-600">{formatCurrency(stats.totalCommissions)}</div>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              <div className="text-lg font-bold text-blue-600">{formatCurrency(stats.totalRevenue)}</div>
            </div>
            <span className="text-2xl">📈</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Treatments</h3>
              <div className="text-2xl font-bold text-purple-600">{stats.totalTreatments}</div>
            </div>
            <span className="text-2xl">💉</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Average Rate</h3>
              <div className="text-2xl font-bold text-orange-600">{stats.averageRate.toFixed(1)}%</div>
            </div>
            <span className="text-2xl">📊</span>
          </div>
        </div>
      </div>

      {/* Commission Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Staff Commission Report</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Staff Member</th>
                  <th className="text-center p-4">Treatments</th>
                  <th className="text-center p-4">Revenue</th>
                  <th className="text-center p-4">Rate</th>
                  <th className="text-center p-4">Commission</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-center p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commissions.map((commission) => (
                  <tr key={commission.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">
                            {commission.staffName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{commission.staffName}</p>
                          <p className="text-sm text-gray-500">{commission.month}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-lg font-bold text-blue-600">{commission.treatments}</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-sm font-medium">{formatCurrency(commission.revenue)}</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-sm font-medium text-purple-600">{commission.commissionRate}%</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-sm font-bold text-green-600">{formatCurrency(commission.commissionEarned)}</div>
                    </td>
                    <td className="text-center p-4">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(commission.status)}`}>
                        {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                      </span>
                    </td>
                    <td className="text-center p-4">
                      <div className="flex justify-center space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                          Details
                        </button>
                        {commission.status === "calculated" && (
                          <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                            Pay
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