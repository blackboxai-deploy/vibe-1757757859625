"use client";

export default function CertificatesPage() {
  const certificates = [
    {
      id: "cert001",
      certificateNumber: "CERT-2024-001",
      patientName: "Sarah Kim",
      doctorName: "Dr. Michael Chen",
      type: "fitness",
      title: "Medical Fitness Certificate",
      purpose: "Employment medical check-up",
      validFrom: "2024-01-18",
      validTo: "2025-01-18",
      createdDate: "2024-01-18",
      status: "issued"
    },
    {
      id: "cert002",
      certificateNumber: "CERT-2024-002",
      patientName: "Priscilla Wijaya",
      doctorName: "Dr. Sarah Wilson",
      type: "sick_leave",
      title: "Sick Leave Certificate",
      purpose: "Recovery from eyelid surgery",
      validFrom: "2024-01-16",
      validTo: "2024-01-23",
      recommendedRest: 7,
      createdDate: "2024-01-16",
      status: "issued"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "issued": return "bg-blue-100 text-blue-800";
      case "expired": return "bg-red-100 text-red-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "fitness": return "💪";
      case "sick_leave": return "🏥";
      case "medical_condition": return "🩺";
      case "treatment_completion": return "✅";
      default: return "📋";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "fitness": return "bg-green-100 text-green-800";
      case "sick_leave": return "bg-red-100 text-red-800";
      case "medical_condition": return "bg-blue-100 text-blue-800";
      case "treatment_completion": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: certificates.length,
    issued: certificates.filter(c => c.status === "issued").length,
    thisMonth: certificates.filter(c => c.createdDate.startsWith("2024-01")).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Certificates</h1>
          <p className="text-gray-600 mt-1">Kelola surat keterangan medis dan kesehatan</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>📋</span>
          <span>Create Certificate</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Certificates</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </div>
            <span className="text-2xl">📋</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Issued</h3>
              <div className="text-2xl font-bold text-green-600">{stats.issued}</div>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">This Month</h3>
              <div className="text-2xl font-bold text-purple-600">{stats.thisMonth}</div>
            </div>
            <span className="text-2xl">📅</span>
          </div>
        </div>
      </div>

      {/* Certificates List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Certificate Database</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="border rounded-lg p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">{getTypeIcon(certificate.type)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{certificate.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Patient: {certificate.patientName}</span>
                        <span>•</span>
                        <span>Doctor: {certificate.doctorName}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Purpose:</strong> {certificate.purpose}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${getTypeColor(certificate.type)}`}>
                        {certificate.type.replace("_", " ").toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(certificate.status)}`}>
                        {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{certificate.certificateNumber}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Valid From:</span>
                      <p className="font-medium">{new Date(certificate.validFrom).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Valid To:</span>
                      <p className="font-medium">{new Date(certificate.validTo).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <p className="font-medium">{new Date(certificate.createdDate).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>

                  {certificate.recommendedRest && (
                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm">
                        <strong>Recommended Rest:</strong> {certificate.recommendedRest} days
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                  <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                    📄 View Full
                  </button>
                  <button className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200">
                    📥 Download PDF
                  </button>
                  <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200">
                    ✏️ Edit
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