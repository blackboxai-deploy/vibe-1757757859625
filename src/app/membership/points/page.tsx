"use client";

export default function PointsPage() {
  const pointsTransactions = [
    {
      id: "pt001",
      memberName: "Maria Rodriguez",
      memberTier: "gold",
      type: "earn",
      points: 500,
      description: "Botox treatment purchase",
      relatedAmount: 5000000,
      date: "2024-01-20 10:30"
    },
    {
      id: "pt002",
      memberName: "Sarah Kim",
      memberTier: "silver",
      type: "redeem",
      points: -200,
      description: "Redeemed for consultation discount",
      relatedAmount: 200000,
      date: "2024-01-19 14:15"
    },
    {
      id: "pt003",
      memberName: "Priscilla Wijaya",
      memberTier: "platinum",
      type: "bonus",
      points: 1000,
      description: "Referral bonus - Jessica Tan",
      relatedAmount: 0,
      date: "2024-01-18 16:45"
    },
    {
      id: "pt004",
      memberName: "Amanda Chen",
      memberTier: "bronze",
      type: "birthday",
      points: 300,
      description: "Birthday bonus points",
      relatedAmount: 0,
      date: "2024-01-17 08:00"
    }
  ];

  const memberPoints = [
    {
      id: "mb001",
      memberName: "Maria Rodriguez",
      tier: "gold",
      currentPoints: 8500,
      earnedThisMonth: 1200,
      redeemedThisMonth: 300,
      nextDecay: "2024-12-31",
      multiplier: 2
    },
    {
      id: "mb002", 
      memberName: "Sarah Kim",
      tier: "silver",
      currentPoints: 3200,
      earnedThisMonth: 800,
      redeemedThisMonth: 200,
      nextDecay: "2024-12-31",
      multiplier: 1.5
    },
    {
      id: "mb003",
      memberName: "Priscilla Wijaya",
      tier: "platinum",
      currentPoints: 15600,
      earnedThisMonth: 2100,
      redeemedThisMonth: 500,
      nextDecay: "2024-12-31",
      multiplier: 3
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
      case "earn": return "bg-green-100 text-green-800";
      case "redeem": return "bg-red-100 text-red-800";
      case "bonus": return "bg-blue-100 text-blue-800";
      case "birthday": return "bg-purple-100 text-purple-800";
      case "decay": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "earn": return "➕";
      case "redeem": return "➖";
      case "bonus": return "🎉";
      case "birthday": return "🎂";
      case "decay": return "⏰";
      default: return "📊";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze": return "bg-orange-100 text-orange-800";
      case "silver": return "bg-gray-200 text-gray-800";
      case "gold": return "bg-yellow-100 text-yellow-800";
      case "platinum": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    totalTransactions: pointsTransactions.length,
    pointsEarned: pointsTransactions.filter(t => t.points > 0).reduce((sum, t) => sum + t.points, 0),
    pointsRedeemed: Math.abs(pointsTransactions.filter(t => t.points < 0).reduce((sum, t) => sum + t.points, 0)),
    activeMembers: memberPoints.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Loyalty Points Management</h1>
          <p className="text-gray-600 mt-1">Kelola point loyalty dengan auto-decay dan redemption</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <span>🎯</span>
          <span>Points Settings</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Points Earned</h3>
              <div className="text-2xl font-bold text-green-600">{stats.pointsEarned.toLocaleString()}</div>
            </div>
            <span className="text-2xl">➕</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Points Redeemed</h3>
              <div className="text-2xl font-bold text-red-600">{stats.pointsRedeemed.toLocaleString()}</div>
            </div>
            <span className="text-2xl">➖</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active Members</h3>
              <div className="text-2xl font-bold text-purple-600">{stats.activeMembers}</div>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Transactions</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.totalTransactions}</div>
            </div>
            <span className="text-2xl">📊</span>
          </div>
        </div>
      </div>

      {/* Member Points Overview */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Member Points Balance</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberPoints.map((member) => (
              <div key={member.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {member.memberName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member.memberName}</p>
                      <span className={`px-2 py-1 text-xs rounded ${getTierColor(member.tier)}`}>
                        {member.tier.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current Points:</span>
                    <span className="font-bold text-purple-600">{member.currentPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Earned This Month:</span>
                    <span className="font-medium text-green-600">+{member.earnedThisMonth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Redeemed:</span>
                    <span className="font-medium text-red-600">-{member.redeemedThisMonth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Multiplier:</span>
                    <span className="font-medium text-blue-600">{member.multiplier}x</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">
                    Next decay: {member.nextDecay} (30% reduction)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Points Transactions */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Points Transaction History</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {pointsTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{getTypeIcon(transaction.type)}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{transaction.memberName}</p>
                      <span className={`px-2 py-1 text-xs rounded ${getTierColor(transaction.memberTier)}`}>
                        {transaction.memberTier.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{transaction.date}</span>
                      {transaction.relatedAmount > 0 && (
                        <>
                          <span>•</span>
                          <span>Purchase: {formatCurrency(transaction.relatedAmount)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    transaction.points > 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.points > 0 ? "+" : ""}{transaction.points.toLocaleString()} pts
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${getTypeColor(transaction.type)}`}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
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