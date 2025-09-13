"use client";

export default function ReferralsPage() {
  const referrals = [
    {
      id: "ref001",
      referralNumber: "REF-2024-001",
      patientName: "Amanda Chen",
      doctorName: "Dr. Sarah Wilson",
      referToHospital: "RS Cipto Mangunkusumo",
      referToDepartment: "Dermatology",
      diagnosis: "Suspicious pigmented lesion",
      reason: "Further evaluation and possible biopsy",
      urgency: "routine",
      createdDate: "2024-01-19",
      status: "sent"
    },
    {
      id: "ref002",
      referralNumber: "REF-2024-002",
      patientName: "Maria Rodriguez",
      doctorName: "Dr. Michael Chen",
      referToHospital: "Jakarta Beauty Center",
      referToDepartment: "Advanced Aesthetic Medicine",
      diagnosis: "Complex facial rejuvenation planning",
      reason: "Advanced consultation for comprehensive treatment",
      urgency: "routine",
      createdDate: "2024-01-15",
      status: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent": return "bg-red-100 text-red-800";
      case "routine": return "bg-blue-100 text-blue-800";
      case "emergency": return "bg-red-200 text-red-900";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: referrals.length,
    sent: referrals.filter(r => r.status === "sent").length,
    pending: referrals.filter(r => r.status === "pending").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Surat Rujukan</h1>
          <p className="text-gray-600 mt-1">Kelola surat rujukan ke rumah sakit dan spesialis</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>🏥</span>
          <span>Create Referral</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Referrals</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </div>
            <span className="text-2xl">🏥</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Sent</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.sent}</div>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pending</h3>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </div>
            <span className="text-2xl">⏳</span>
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Referral Letters</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {referrals.map((referral) => (
              <div key={referral.id} className="border rounded-lg p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🏥</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{referral.referralNumber}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Patient: {referral.patientName}</span>
                        <span>•</span>
                        <span>Doctor: {referral.doctorName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(referral.status)}`}>
                        {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${getUrgencyColor(referral.urgency)}`}>
                        {referral.urgency.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{referral.createdDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Referral Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Hospital:</span>
                        <span className="font-medium ml-1">{referral.referToHospital}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Department:</span>
                        <span className="font-medium ml-1">{referral.referToDepartment}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Diagnosis:</span>
                        <span className="font-medium ml-1">{referral.diagnosis}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Reason for Referral</h4>
                    <p className="text-sm text-gray-600">{referral.reason}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                  <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                    📄 View Full
                  </button>
                  <button className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200">
                    📥 Download PDF
                  </button>
                  <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200">
                    📧 Send
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}