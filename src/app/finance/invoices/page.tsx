"use client";

export default function InvoicesPage() {
  const invoices = [
    {
      id: "inv001",
      invoiceNumber: "INV-2024-001",
      patientName: "Maria Rodriguez",
      services: ["Botox Injection", "Consultation"],
      subtotal: 3700000,
      discount: 370000,
      tax: 333000,
      total: 3663000,
      status: "paid",
      dueDate: "2024-01-27",
      paidDate: "2024-01-20",
      createdDate: "2024-01-20"
    },
    {
      id: "inv002",
      invoiceNumber: "INV-2024-002",
      patientName: "Sarah Kim",
      services: ["Hydrafacial Premium"],
      subtotal: 1200000,
      discount: 0,
      tax: 108000,
      total: 1308000,
      status: "paid",
      dueDate: "2024-01-27",
      paidDate: "2024-01-20",
      createdDate: "2024-01-20"
    },
    {
      id: "inv003",
      invoiceNumber: "INV-2024-003",
      patientName: "Amanda Chen",
      services: ["Carbon Laser Facial"],
      subtotal: 1800000,
      discount: 0,
      tax: 162000,
      total: 1962000,
      status: "overdue",
      dueDate: "2024-01-25",
      paidDate: null,
      createdDate: "2024-01-18"
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
      case "sent": return "bg-blue-100 text-blue-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === "paid").length,
    overdue: invoices.filter(i => i.status === "overdue").length,
    totalRevenue: invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.total, 0),
    pendingAmount: invoices.filter(i => i.status !== "paid").reduce((sum, i) => sum + i.total, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600 mt-1">Kelola invoice, pembayaran, dan tracking collection</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>🧾</span>
          <span>Generate Invoice</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-xs text-gray-500">Total Invoices</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
          <div className="text-xs text-gray-500">Paid</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          <div className="text-xs text-gray-500">Overdue</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-sm font-bold text-emerald-600">{formatCurrency(stats.totalRevenue)}</div>
          <div className="text-xs text-gray-500">Revenue</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-sm font-bold text-orange-600">{formatCurrency(stats.pendingAmount)}</div>
          <div className="text-xs text-gray-500">Pending</div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Invoice List</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Invoice Details</th>
                  <th className="text-left p-4">Patient</th>
                  <th className="text-left p-4">Services</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{invoice.invoiceNumber}</p>
                        <p className="text-sm text-gray-500">Created: {invoice.createdDate}</p>
                        <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">
                            {invoice.patientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                          </span>
                        </div>
                        <p className="font-medium">{invoice.patientName}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {invoice.services.map((service, index) => (
                          <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mr-1">
                            {service}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm">Subtotal: {formatCurrency(invoice.subtotal)}</p>
                        {invoice.discount > 0 && (
                          <p className="text-sm text-green-600">Discount: -{formatCurrency(invoice.discount)}</p>
                        )}
                        <p className="text-sm">Tax: {formatCurrency(invoice.tax)}</p>
                        <p className="text-sm font-bold">Total: {formatCurrency(invoice.total)}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className={`px-2 py-1 text-xs rounded ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                        {invoice.paidDate && (
                          <p className="text-xs text-green-600">Paid: {invoice.paidDate}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                          📄 View
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                          📥 Download
                        </button>
                        {invoice.status !== "paid" && (
                          <button className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded hover:bg-purple-200">
                            📧 Send
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