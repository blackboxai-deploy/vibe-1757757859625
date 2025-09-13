"use client";

import { useState } from "react";

export default function SpinwheelPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const rewards = [
    { id: "1", name: "10% Discount Voucher", type: "discount", value: 10, probability: 30, color: "#22c55e" },
    { id: "2", name: "Free Consultation", type: "treatment", value: 200000, probability: 20, color: "#3b82f6" },
    { id: "3", name: "100 Loyalty Points", type: "points", value: 100, probability: 25, color: "#8b5cf6" },
    { id: "4", name: "Free Basic Facial", type: "treatment", value: 500000, probability: 15, color: "#f59e0b" },
    { id: "5", name: "20% Discount Voucher", type: "discount", value: 20, probability: 8, color: "#ef4444" },
    { id: "6", name: "Free Premium Facial", type: "treatment", value: 1000000, probability: 2, color: "#06b6d4" },
  ];

  const recentWins = [
    {
      id: "1",
      memberName: "Maria Rodriguez",
      reward: "Free Consultation",
      timestamp: "10:30 AM",
      claimed: true
    },
    {
      id: "2",
      memberName: "Sarah Kim", 
      reward: "10% Discount Voucher",
      timestamp: "Yesterday",
      claimed: false
    },
    {
      id: "3",
      memberName: "Amanda Chen",
      reward: "100 Loyalty Points",
      timestamp: "2 days ago",
      claimed: true
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedReward(null);

    setTimeout(() => {
      // Select random reward based on probability
      const randomValue = Math.random() * 100;
      let cumulativeProbability = 0;
      let winner = null;

      for (const reward of rewards) {
        cumulativeProbability += reward.probability;
        if (randomValue <= cumulativeProbability) {
          winner = reward;
          break;
        }
      }

      setSelectedReward(winner);
      setIsSpinning(false);
    }, 3000);
  };

  const stats = {
    totalSpins: 245,
    todaySpins: 12,
    rewardsGiven: 89,
    totalValue: 15750000
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Spinwheel Rewards</h1>
          <p className="text-gray-600 mt-1">Sistem hadiah berputar untuk member klinik</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 flex items-center space-x-2">
          <span>🎡</span>
          <span>Reward Settings</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Spins</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.totalSpins}</div>
            </div>
            <span className="text-2xl">🎯</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Today's Spins</h3>
              <div className="text-2xl font-bold text-green-600">{stats.todaySpins}</div>
            </div>
            <span className="text-2xl">📅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Rewards Given</h3>
              <div className="text-2xl font-bold text-purple-600">{stats.rewardsGiven}</div>
            </div>
            <span className="text-2xl">🎁</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Value</h3>
              <div className="text-lg font-bold text-emerald-600">{formatCurrency(stats.totalValue)}</div>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spinwheel */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">🎡 Reward Spinwheel</h2>
          </div>
          <div className="p-6 text-center">
            {/* Spinwheel Visual */}
            <div className="relative mb-8">
              <div className={`w-64 h-64 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center transition-transform duration-3000 ${isSpinning ? 'animate-spin' : ''}`}>
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎁</div>
                    <p className="text-lg font-medium">
                      {isSpinning ? "Spinning..." : selectedReward ? "🎉 Winner!" : "Spin to Win!"}
                    </p>
                    {selectedReward && (
                      <p className="text-sm text-green-600 mt-2">{selectedReward.name}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-800"></div>
              </div>
            </div>

            <button 
              onClick={handleSpin}
              disabled={isSpinning}
              className={`px-8 py-4 rounded-lg font-bold text-lg ${
                isSpinning 
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                  : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              }`}
            >
              {isSpinning ? "🌀 Spinning..." : "🎯 Spin Now"}
            </button>
          </div>
        </div>

        {/* Recent Wins & Rewards */}
        <div className="space-y-6">
          {/* Available Rewards */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Available Rewards</h2>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                {rewards.map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: reward.color }}
                      ></div>
                      <span className="text-sm font-medium">{reward.name}</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {reward.probability}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Wins */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Recent Winners</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentWins.map((win) => (
                  <div key={win.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">
                          {win.memberName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{win.memberName}</p>
                        <p className="text-xs text-gray-500">{win.reward}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{win.timestamp}</p>
                      <span className={`px-2 py-1 text-xs rounded ${
                        win.claimed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {win.claimed ? "Claimed" : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}