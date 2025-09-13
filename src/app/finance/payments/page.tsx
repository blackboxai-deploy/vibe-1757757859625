"use client";

export default function PaymentsPage() {
  const payments = [
    {
      id: "pay001",
      patientName: "Maria Rodriguez",
      amount: 5247000,
      method: "Transfer",
      status: "completed",
      date: "2024-01-20 10:30",
      description: "Botox Treatment + Consultation",
      transactionId: "TXN-2024-001"
    },
    {
      id: "pay002",
      patientName: "Sarah Kim",
      amount: 1200000,
      method: "Cash",
      status: "completed",
      date: "2024-01-20 09:15",
      description: "Hydrafacial Premium",
      transactionId: null
    },
    {
      id: "pay003",
      patientName: "Amanda Chen",
      amount: 4500000,
      method: "Card",
      status: "pending",
      date: "2024-01-19 16:20",
      description: "Lip Filler Treatment",
      transactionId: "CARD-2024-001"
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
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Cash": return "💵";
      case "Transfer": return "🏦";
      case "Card": return "💳";
      case "QRIS": return "📱";
      default: return "💰";
    }
  };

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === "completed").length,
    pending: payments.filter(p => p.status === "pending").length,
    totalAmount: payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Processing</h1>
          <p className="text-gray-600 mt-1">Kelola pembayaran, refund, dan transaction monitoring</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <span>💳</span>
          <span>Process Payment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Completed</h3>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-gray-400">{formatCurrency(stats.totalAmount)}</p>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-xs text-gray-400">Awaiting payment</p>
            </div>
            <span className="text-2xl">⏳</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Payments</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <p className="text-xs text-gray-400">This month</p>
            </div>
            <span className="text-2xl">💳</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
              <div className="text-lg font-bold text-emerald-600">{formatCurrency(stats.totalAmount)}</div>
              <p className="text-xs text-gray-400">Collected</p>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Payment Transactions</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Patient & Description</th>
                  <th className="text-left p-4">Payment Method</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">
                            {payment.patientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{payment.patientName}</p>
                          <p className="text-sm text-gray-600">{payment.description}</p>
                          {payment.transactionId && (
                            <p className="text-xs text-blue-600">TXN: {payment.transactionId}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getMethodIcon(payment.method)}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {payment.method}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{formatCurrency(payment.amount)}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{payment.date}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                          📄 Receipt
                        </button>
                        {payment.status === "pending" && (
                          <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                            💳 Process
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