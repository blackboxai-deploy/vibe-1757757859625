"use client";

export default function VouchersPage() {
  const vouchers = [
    {
      id: "v001",
      code: "BEAUTY20",
      memberName: "Maria Rodriguez",
      type: "discount",
      value: 20,
      description: "20% discount untuk semua treatment",
      minSpend: 1000000,
      expiryDate: "2024-03-20",
      isUsed: false,
      createdDate: "2024-01-20"
    },
    {
      id: "v002",
      code: "FREEFACIAL150",
      memberName: "Sarah Kim",
      type: "treatment",
      value: 150000,
      description: "Free consultation voucher",
      minSpend: 0,
      expiryDate: "2024-02-28",
      isUsed: true,
      createdDate: "2024-01-15",
      usedDate: "2024-01-19"
    },
    {
      id: "v003", 
      code: "BIRTHDAY500",
      memberName: "Priscilla Wijaya",
      type: "birthday",
      value: 500000,
      description: "Birthday special treatment voucher",
      minSpend: 0,
      expiryDate: "2024-03-28",
      isUsed: false,
      createdDate: "2024-01-28"
    },
    {
      id: "v004",
      code: "REFERRAL100",
      memberName: "Amanda Chen",
      type: "referral",
      value: 100000,
      description: "Referral bonus voucher",
      minSpend: 500000,
      expiryDate: "2024-04-15",
      isUsed: false,
      createdDate: "2024-01-15"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "discount": return "bg-green-100 text-green-800";
      case "treatment": return "bg-blue-100 text-blue-800";
      case "birthday": return "bg-purple-100 text-purple-800";
      case "referral": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "discount": return "🏷️";
      case "treatment": return "💎";
      case "birthday": return "🎂";
      case "referral": return "🤝";
      default: return "🎫";
    }
  };

  const getExpiryStatus = (expiryDate: string) => {
    const days = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days <= 0) return { label: "Expired", color: "text-red-600" };
    if (days <= 7) return { label: `${days}d left`, color: "text-red-600" };
    if (days <= 30) return { label: `${days}d left`, color: "text-yellow-600" };
    return { label: `${days}d left`, color: "text-green-600" };
  };

  const stats = {
    totalVouchers: vouchers.length,
    active: vouchers.filter(v => !v.isUsed && new Date(v.expiryDate) > new Date()).length,
    used: vouchers.filter(v => v.isUsed).length,
    expired: vouchers.filter(v => !v.isUsed && new Date(v.expiryDate) <= new Date()).length,
    totalValue: vouchers.filter(v => !v.isUsed).reduce((sum, v) => sum + v.value, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Voucher System</h1>
          <p className="text-gray-600 mt-1">Kelola voucher treatment dan discount untuk member</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <span>🎫</span>
          <span>Generate Voucher</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.totalVouchers}</div>
          <div className="text-xs text-gray-500">Total Vouchers</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-xs text-gray-500">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-gray-600">{stats.used}</div>
          <div className="text-xs text-gray-500">Used</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
          <div className="text-xs text-gray-500">Expired</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-sm font-bold text-emerald-600">{formatCurrency(stats.totalValue)}</div>
          <div className="text-xs text-gray-500">Active Value</div>
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Voucher Database</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Voucher Details</th>
                  <th className="text-left p-4">Member</th>
                  <th className="text-left p-4">Value & Terms</th>
                  <th className="text-left p-4">Expiry</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => {
                  const expiryStatus = getExpiryStatus(voucher.expiryDate);
                  
                  return (
                    <tr key={voucher.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">{getTypeIcon(voucher.type)}</span>
                          </div>
                          <div>
                            <p className="font-medium font-mono">{voucher.code}</p>
                            <p className="text-sm text-gray-600">{voucher.description}</p>
                            <span className={`px-2 py-1 text-xs rounded ${getTypeColor(voucher.type)}`}>
                              {voucher.type.charAt(0).toUpperCase() + voucher.type.slice(1)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">
                              {voucher.memberName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                            </span>
                          </div>
                          <p className="font-medium text-sm">{voucher.memberName}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-green-600">
                            {voucher.type === "discount" ? `${voucher.value}% OFF` : formatCurrency(voucher.value)}
                          </p>
                          {voucher.minSpend > 0 && (
                            <p className="text-xs text-gray-500">
                              Min spend: {formatCurrency(voucher.minSpend)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm">{new Date(voucher.expiryDate).toLocaleDateString('id-ID')}</p>
                          <p className={`text-xs ${expiryStatus.color}`}>{expiryStatus.label}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          voucher.isUsed 
                            ? "bg-gray-100 text-gray-800" 
                            : new Date(voucher.expiryDate) <= new Date()
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {voucher.isUsed ? "Used" : new Date(voucher.expiryDate) <= new Date() ? "Expired" : "Active"}
                        </span>
                        {voucher.usedDate && (
                          <p className="text-xs text-gray-500 mt-1">Used: {voucher.usedDate}</p>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                            View
                          </button>
                          {!voucher.isUsed && new Date(voucher.expiryDate) > new Date() && (
                            <button className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded hover:bg-red-200">
                              Deactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}