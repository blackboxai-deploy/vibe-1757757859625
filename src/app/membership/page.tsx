"use client";

export default function MembershipPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const members = [
    {
      id: "mb001",
      patientName: "Maria Isabella Rodriguez",
      membershipNumber: "GOLD001",
      tier: "gold",
      points: 8500,
      totalSpent: 25000000,
      joinDate: "2023-01-20",
      referralCode: "MARIA2024"
    },
    {
      id: "mb002",
      patientName: "Sarah Kim Johnson", 
      membershipNumber: "SILVER001",
      tier: "silver",
      points: 3200,
      totalSpent: 8500000,
      joinDate: "2023-06-15",
      referralCode: "SARAH2024"
    },
    {
      id: "mb003",
      patientName: "Priscilla Wijaya",
      membershipNumber: "PLAT001", 
      tier: "platinum",
      points: 15600,
      totalSpent: 45000000,
      joinDate: "2022-05-20",
      referralCode: "PRISC2024"
    }
  ];

  const memberBenefits = {
    bronze: { icon: "🥉", discount: 5, points: 1, color: "bg-orange-100 text-orange-800" },
    silver: { icon: "🥈", discount: 10, points: 1.5, color: "bg-gray-200 text-gray-800" },
    gold: { icon: "🥇", discount: 15, points: 2, color: "bg-yellow-100 text-yellow-800" },
    platinum: { icon: "💎", discount: 20, points: 3, color: "bg-purple-100 text-purple-800" }
  };

  const stats = {
    totalMembers: members.length,
    bronze: 0,
    silver: members.filter(m => m.tier === "silver").length,
    gold: members.filter(m => m.tier === "gold").length, 
    platinum: members.filter(m => m.tier === "platinum").length,
    totalSpent: members.reduce((sum, m) => sum + m.totalSpent, 0),
    totalPoints: members.reduce((sum, m) => sum + m.points, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistem Keanggotaan</h1>
          <p className="text-gray-600 mt-1">Kelola membership tiers, loyalty points, dan benefit program</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
          <span>⭐</span>
          <span>Membership Program</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.totalMembers}</div>
          <div className="text-xs text-gray-500">Total Members</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-xl mb-1">🥉</div>
          <div className="text-lg font-bold text-orange-600">{stats.bronze}</div>
          <div className="text-xs text-gray-500">Bronze</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-xl mb-1">🥈</div>
          <div className="text-lg font-bold text-gray-600">{stats.silver}</div>
          <div className="text-xs text-gray-500">Silver</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-xl mb-1">🥇</div>
          <div className="text-lg font-bold text-yellow-600">{stats.gold}</div>
          <div className="text-xs text-gray-500">Gold</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-xl mb-1">💎</div>
          <div className="text-lg font-bold text-purple-600">{stats.platinum}</div>
          <div className="text-xs text-gray-500">Platinum</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-sm font-bold text-green-600">{formatCurrency(stats.totalSpent)}</div>
          <div className="text-xs text-gray-500">Total Spending</div>
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Object.entries(memberBenefits).map(([tier, benefits]) => (
          <div key={tier} className="bg-white rounded-lg shadow border">
            <div className="p-6 text-center">
              <div className="text-4xl mb-2">{benefits.icon}</div>
              <h3 className="text-lg font-semibold">{tier.charAt(0).toUpperCase() + tier.slice(1)} Member</h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="font-medium text-green-600">{benefits.discount}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Points:</span>
                  <span className="font-medium">{benefits.points}x</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Members List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Member Directory</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Member</th>
                  <th className="text-left p-4">Tier</th>
                  <th className="text-left p-4">Points</th>
                  <th className="text-left p-4">Spending</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => {
                  const tierInfo = memberBenefits[member.tier as keyof typeof memberBenefits];
                  return (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">
                              {member.patientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{member.patientName}</p>
                            <p className="text-sm text-gray-500">{member.membershipNumber}</p>
                            <p className="text-xs text-blue-600">Ref: {member.referralCode}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{tierInfo.icon}</span>
                          <span className={`px-2 py-1 text-xs rounded ${tierInfo.color}`}>
                            {member.tier.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {tierInfo.discount}% discount • {tierInfo.points}x points
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium">{member.points.toLocaleString()} pts</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium">{formatCurrency(member.totalSpent)}</p>
                        <p className="text-xs text-gray-500">Lifetime spending</p>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                            Profile
                          </button>
                          <button className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded hover:bg-purple-200">
                            Points
                          </button>
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