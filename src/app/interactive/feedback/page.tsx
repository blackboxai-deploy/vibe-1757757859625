"use client";

export default function FeedbackPage() {
  const feedbacks = [
    {
      id: "fb001",
      patientName: "Jessica Tan",
      type: "service_rating",
      rating: 5,
      comment: "Excellent service! The botox treatment was painless and the results are amazing. Dr. Sarah is very professional.",
      category: "Treatment Quality",
      date: "2024-01-20",
      status: "reviewed",
      response: "Thank you for your kind words! We're delighted you're happy with your results."
    },
    {
      id: "fb002",
      patientName: "Priscilla Wijaya",
      type: "facility",
      rating: 4,
      comment: "The clinic is very clean and modern. However, parking can be difficult during peak hours.",
      category: "Facility",
      date: "2024-01-19",
      status: "pending",
      response: null
    },
    {
      id: "fb003",
      patientName: "Maria Rodriguez",
      type: "staff",
      rating: 5,
      comment: "All staff members are very friendly and accommodating. Luna did an amazing hydrafacial!",
      category: "Staff Service",
      date: "2024-01-18",
      status: "reviewed",
      response: "We're so happy to hear about your positive experience with our team!"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reviewed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "service_rating": return "bg-blue-100 text-blue-800";
      case "facility": return "bg-green-100 text-green-800";
      case "staff": return "bg-purple-100 text-purple-800";
      case "suggestion": return "bg-yellow-100 text-yellow-800";
      case "complaint": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  const stats = {
    total: feedbacks.length,
    pending: feedbacks.filter(f => f.status === "pending").length,
    averageRating: feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length,
    thisMonth: feedbacks.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Feedback</h1>
          <p className="text-gray-600 mt-1">Kelola feedback, kritik, dan saran dari pasien</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>💬</span>
          <span>Feedback Analytics</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Feedback</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </div>
            <span className="text-2xl">💬</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pending Review</h3>
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            </div>
            <span className="text-2xl">⏳</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Average Rating</h3>
              <div className="text-2xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}</div>
            </div>
            <span className="text-2xl">⭐</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">This Month</h3>
              <div className="text-2xl font-bold text-purple-600">{stats.thisMonth}</div>
            </div>
            <span className="text-2xl">📊</span>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Patient Feedback</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {feedback.patientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{feedback.patientName}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm">{getRatingStars(feedback.rating)}</span>
                        <span className={`px-2 py-1 text-xs rounded ${getTypeColor(feedback.type)}`}>
                          {feedback.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded ${getStatusColor(feedback.status)}`}>
                      {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{feedback.date}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700">{feedback.comment}</p>
                </div>

                {feedback.response && (
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                    <p className="text-sm font-medium text-blue-800 mb-1">Response:</p>
                    <p className="text-sm text-blue-700">{feedback.response}</p>
                  </div>
                )}

                {feedback.status === "pending" && (
                  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                    <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                      💬 Reply
                    </button>
                    <button className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200">
                      ✅ Mark Resolved
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}