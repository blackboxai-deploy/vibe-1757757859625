"use client";

export default function PrescriptionsPage() {
  const prescriptions = [
    {
      id: "rx001",
      prescriptionNumber: "RX-2024-001",
      patientName: "Maria Rodriguez",
      doctorName: "Dr. Sarah Wilson",
      diagnosis: "Post-botox injection care",
      medications: [
        { name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "3x daily", duration: "3 days" },
        { name: "Anti-inflammatory cream", dosage: "Apply thin", frequency: "2x daily", duration: "7 days" }
      ],
      createdDate: "2024-01-20",
      status: "active"
    },
    {
      id: "rx002",
      prescriptionNumber: "RX-2024-002",
      patientName: "Jessica Tan",
      doctorName: "Dr. Michael Chen",
      diagnosis: "Acne treatment regimen",
      medications: [
        { name: "Tretinoin 0.025%", dosage: "Pea-sized", frequency: "Once nightly", duration: "30 days" },
        { name: "Moisturizer SPF 30", dosage: "Apply liberally", frequency: "Every morning", duration: "Daily" }
      ],
      createdDate: "2024-01-17",
      status: "active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "expired": return "bg-red-100 text-red-800";
      case "dispensed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: prescriptions.length,
    active: prescriptions.filter(p => p.status === "active").length,
    thisMonth: prescriptions.filter(p => p.createdDate.startsWith("2024-01")).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Digital Prescriptions</h1>
          <p className="text-gray-600 mt-1">Kelola resep obat digital dengan signature dokter</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>💊</span>
          <span>Create Prescription</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Prescriptions</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            </div>
            <span className="text-2xl">💊</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active</h3>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
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

      {/* Prescriptions List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Prescription Database</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="border rounded-lg p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl">💊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{prescription.prescriptionNumber}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>Patient: {prescription.patientName}</span>
                        <span>•</span>
                        <span>Doctor: {prescription.doctorName}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Diagnosis:</strong> {prescription.diagnosis}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 text-sm rounded ${getStatusColor(prescription.status)}`}>
                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{prescription.createdDate}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Prescribed Medications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prescription.medications.map((medication, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-blue-600">{medication.name}</h5>
                        <div className="space-y-1 text-sm text-gray-600 mt-2">
                          <p><strong>Dosage:</strong> {medication.dosage}</p>
                          <p><strong>Frequency:</strong> {medication.frequency}</p>
                          <p><strong>Duration:</strong> {medication.duration}</p>
                        </div>
                      </div>
                    ))}
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