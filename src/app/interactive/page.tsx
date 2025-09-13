"use client";

export default function InteractivePage() {
  const feedbacks = [
    {
      id: "1",
      patientName: "Jessica Tan",
      rating: 5,
      comment: "Excellent service! The botox treatment was painless and results are amazing.",
      date: "2024-01-20",
      status: "reviewed"
    },
    {
      id: "2",
      patientName: "Priscilla Wijaya",
      rating: 4,
      comment: "Clean facility but parking can be difficult during peak hours.",
      date: "2024-01-19", 
      status: "pending"
    }
  ];

  const shopProducts = [
    {
      id: "1",
      name: "Vitamin C Serum - Professional Grade",
      price: 850000,
      originalPrice: 1000000,
      discount: 15,
      rating: 4.8,
      stock: 15
    },
    {
      id: "2",
      name: "Hydrating Collagen Mask (5 pieces)",
      price: 350000,
      originalPrice: 400000,
      discount: 12,
      rating: 4.6,
      stock: 28
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getRatingStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating));
  };

  const stats = {
    activeChatSessions: 2,
    pendingFeedback: feedbacks.filter(f => f.status === "pending").length,
    averageRating: feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length,
    shopProducts: shopProducts.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fitur Interaktif</h1>
          <p className="text-gray-600 mt-1">AI Assistant, reward system, feedback, dan e-commerce integration</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 flex items-center space-x-2">
          <span>🎮</span>
          <span>Interactive Hub</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active Chats</h3>
              <div className="text-2xl font-bold text-green-600 mt-2">{stats.activeChatSessions}</div>
            </div>
            <span className="text-2xl">💬</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pending Feedback</h3>
              <div className="text-2xl font-bold text-orange-600 mt-2">{stats.pendingFeedback}</div>
            </div>
            <span className="text-2xl">⏳</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Avg Rating</h3>
              <div className="text-2xl font-bold text-yellow-600 mt-2">{stats.averageRating.toFixed(1)}</div>
            </div>
            <span className="text-2xl">⭐</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Shop Products</h3>
              <div className="text-2xl font-bold text-blue-600 mt-2">{stats.shopProducts}</div>
            </div>
            <span className="text-2xl">🛒</span>
          </div>
        </div>
      </div>

      {/* Interactive Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Assistant */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <span>🤖</span>
              <span>AI Assistant</span>
            </h2>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 h-40 overflow-y-auto mb-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Hello! I'm your clinic AI assistant. How can I help you?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 justify-end">
                  <div className="bg-green-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">What's the price for botox treatment?</p>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">👤</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Botox treatments start from Rp 3,500,000. Would you like to schedule a consultation?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Spinwheel Rewards */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <span>🎡</span>
              <span>Reward Spinwheel</span>
            </h2>
          </div>
          <div className="p-6 text-center">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">🎁</div>
                  <p className="text-xs font-medium">Spin to Win!</p>
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600">
              🎯 Spin Now
            </button>
          </div>
        </div>
      </div>

      {/* Feedback & Shop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Feedback */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <span>💬</span>
              <span>Patient Feedback</span>
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{feedback.patientName}</p>
                      <div className="flex items-center space-x-2">
                        <span>{getRatingStars(feedback.rating)}</span>
                        <span className="text-sm text-gray-500">({feedback.rating}/5)</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      feedback.status === "reviewed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {feedback.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{feedback.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">{feedback.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* E-commerce Shop */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <span>🛒</span>
              <span>Beauty Shop</span>
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {shopProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-3 border rounded-lg p-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💄</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-bold text-green-600">{formatCurrency(product.price)}</span>
                      {product.discount > 0 && (
                        <>
                          <span className="text-xs text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
                          <span className="px-1 py-0.5 bg-red-100 text-red-800 text-xs rounded">-{product.discount}%</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs">{getRatingStars(product.rating)}</span>
                      <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                    🛒 Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}