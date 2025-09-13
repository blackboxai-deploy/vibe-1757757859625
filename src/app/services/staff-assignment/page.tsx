"use client";

export default function StaffAssignmentPage() {
  const assignments = [
    {
      id: "1",
      staffName: "Dr. Sarah Wilson",
      position: "Chief Medical Officer",
      todayBookings: 4,
      specialties: ["Botox", "Surgery", "Consultation"],
      status: "available",
      nextAvailable: "15:30"
    },
    {
      id: "2", 
      staffName: "Dr. Michael Chen",
      position: "Aesthetic Doctor",
      todayBookings: 3,
      specialties: ["Filler", "Laser", "Consultation"],
      status: "busy",
      nextAvailable: "16:00"
    },
    {
      id: "3",
      staffName: "Luna Park",
      position: "Beauty Therapist", 
      todayBookings: 5,
      specialties: ["Hydrafacial", "Facial", "Skin Care"],
      status: "available",
      nextAvailable: "14:00"
    },
    {
      id: "4",
      staffName: "Amanda Rodriguez",
      position: "Senior Nurse",
      todayBookings: 2,
      specialties: ["IV Therapy", "Post-care", "Assistance"],
      status: "available",
      nextAvailable: "13:00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "busy": return "bg-red-100 text-red-800";
      case "break": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    totalStaff: assignments.length,
    available: assignments.filter(s => s.status === "available").length,
    busy: assignments.filter(s => s.status === "busy").length,
    totalBookings: assignments.reduce((sum, s) => sum + s.todayBookings, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Assignment</h1>
          <p className="text-gray-600 mt-1">Kelola penugasan dokter dan staff untuk layanan</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>👨‍⚕️</span>
          <span>Schedule Management</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Staff</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.totalStaff}</div>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Available</h3>
              <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Busy</h3>
              <div className="text-2xl font-bold text-red-600">{stats.busy}</div>
            </div>
            <span className="text-2xl">🔴</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Today's Bookings</h3>
              <div className="text-2xl font-bold text-purple-600">{stats.totalBookings}</div>
            </div>
            <span className="text-2xl">📅</span>
          </div>
        </div>
      </div>

      {/* Staff Assignment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((staff) => (
          <div key={staff.id} className="bg-white rounded-lg shadow border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold">
                      {staff.staffName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{staff.staffName}</h3>
                    <p className="text-sm text-gray-500">{staff.position}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm rounded ${getStatusColor(staff.status)}`}>
                  {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Today's Bookings:</span>
                  <span className="font-medium">{staff.todayBookings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Next Available:</span>
                  <span className="font-medium">{staff.nextAvailable}</span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {staff.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                    View Schedule
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200">
                    Assign Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}