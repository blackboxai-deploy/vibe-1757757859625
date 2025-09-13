"use client";

export default function MedicalDocumentsPage() {
  const documents = [
    {
      id: "rx001",
      type: "prescription",
      title: "Prescription - Post Botox Medication",
      patientName: "Maria Rodriguez",
      doctorName: "Dr. Sarah Wilson",
      date: "2024-01-20",
      status: "active"
    },
    {
      id: "ref001",
      type: "referral", 
      title: "Referral to Dermatology Specialist",
      patientName: "Amanda Chen",
      doctorName: "Dr. Sarah Wilson",
      date: "2024-01-19",
      status: "sent"
    },
    {
      id: "cert001",
      type: "certificate",
      title: "Medical Fitness Certificate",
      patientName: "Sarah Kim",
      doctorName: "Dr. Michael Chen", 
      date: "2024-01-18",
      status: "issued"
    }
  ];

  const stats = {
    total: documents.length,
    prescriptions: documents.filter(d => d.type === "prescription").length,
    referrals: documents.filter(d => d.type === "referral").length,
    certificates: documents.filter(d => d.type === "certificate").length
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "prescription": return "💊";
      case "referral": return "🏥";
      case "certificate": return "📋";
      default: return "📄";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "sent": return "bg-blue-100 text-blue-800";
      case "issued": return "bg-purple-100 text-purple-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dokumen Medis</h1>
          <p className="text-gray-600 mt-1">Kelola resep obat, surat rujukan, dan sertifikat medis</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <span>💊</span>
            <span>New Prescription</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <span>📋</span>
            <span>New Certificate</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Documents</h3>
              <div className="text-2xl font-bold text-blue-600 mt-2">{stats.total}</div>
            </div>
            <span className="text-2xl">📄</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Prescriptions</h3>
              <div className="text-2xl font-bold text-green-600 mt-2">{stats.prescriptions}</div>
            </div>
            <span className="text-2xl">💊</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Referrals</h3>
              <div className="text-2xl font-bold text-purple-600 mt-2">{stats.referrals}</div>
            </div>
            <span className="text-2xl">🏥</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Certificates</h3>
              <div className="text-2xl font-bold text-indigo-600 mt-2">{stats.certificates}</div>
            </div>
            <span className="text-2xl">📋</span>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Medical Documents</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Document</th>
                  <th className="text-left p-4">Patient</th>
                  <th className="text-left p-4">Doctor</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{getDocumentIcon(doc.type)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {doc.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{doc.patientName}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{doc.doctorName}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{doc.date}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                          📄 View
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                          📥 Download
                        </button>
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