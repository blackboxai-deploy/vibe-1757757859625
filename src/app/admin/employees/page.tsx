"use client";

export default function EmployeesPage() {
  const employees = [
    {
      id: "e001",
      employeeNumber: "EMP001",
      name: "Dr. Sarah Wilson",
      position: "Chief Medical Officer",
      department: "medical",
      email: "sarah.wilson@beautyclinic.com",
      phone: "+62821-1234-5678",
      hireDate: "2020-01-15",
      salary: 25000000,
      isActive: true,
      specializations: ["Aesthetic Medicine", "Dermatology", "Plastic Surgery"]
    },
    {
      id: "e002",
      employeeNumber: "EMP002",
      name: "Dr. Michael Chen",
      position: "Aesthetic Doctor",
      department: "medical",
      email: "michael.chen@beautyclinic.com",
      phone: "+62822-2345-6789",
      hireDate: "2021-03-01",
      salary: 18000000,
      isActive: true,
      specializations: ["Injectable Treatments", "Laser Therapy"]
    },
    {
      id: "e003",
      employeeNumber: "EMP003",
      name: "Amanda Rodriguez",
      position: "Senior Nurse",
      department: "medical",
      email: "amanda.rodriguez@beautyclinic.com",
      phone: "+62823-3456-7890",
      hireDate: "2019-06-15",
      salary: 8500000,
      isActive: true,
      specializations: ["IV Therapy", "Post-procedure Care"]
    },
    {
      id: "e004",
      employeeNumber: "EMP004", 
      name: "Luna Park",
      position: "Senior Beauty Therapist",
      department: "medical",
      email: "luna.park@beautyclinic.com",
      phone: "+62824-4567-8901",
      hireDate: "2022-01-10",
      salary: 6500000,
      isActive: true,
      specializations: ["Facial Treatments", "Hydrafacial"]
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case "medical": return "👨‍⚕️";
      case "admin": return "💼";
      case "finance": return "💰";
      case "marketing": return "📢";
      default: return "👤";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "medical": return "bg-blue-100 text-blue-800";
      case "admin": return "bg-purple-100 text-purple-800";
      case "finance": return "bg-green-100 text-green-800";
      case "marketing": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.isActive).length,
    medical: employees.filter(e => e.department === "medical").length,
    averageSalary: employees.reduce((sum, e) => sum + e.salary, 0) / employees.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600 mt-1">Kelola database karyawan dan human resources</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>👷</span>
          <span>Add Employee</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Employees</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.totalEmployees}</div>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active</h3>
              <div className="text-2xl font-bold text-green-600">{stats.activeEmployees}</div>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Medical Staff</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.medical}</div>
            </div>
            <span className="text-2xl">👨‍⚕️</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Avg Salary</h3>
              <div className="text-lg font-bold text-emerald-600">{formatCurrency(stats.averageSalary)}</div>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Employee Directory</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Employee</th>
                  <th className="text-left p-4">Position & Department</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Specializations</th>
                  <th className="text-left p-4">Salary</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">
                            {employee.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.employeeNumber}</p>
                          <span className={`px-2 py-1 text-xs rounded ${
                            employee.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {employee.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{employee.position}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg">{getDepartmentIcon(employee.department)}</span>
                          <span className={`px-2 py-1 text-xs rounded ${getDepartmentColor(employee.department)}`}>
                            {employee.department.charAt(0).toUpperCase() + employee.department.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Hired: {new Date(employee.hireDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm">{employee.email}</p>
                        <p className="text-sm text-gray-500">{employee.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {employee.specializations.slice(0, 2).map((spec, index) => (
                          <span key={index} className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded mr-1">
                            {spec}
                          </span>
                        ))}
                        {employee.specializations.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{employee.specializations.length - 2} more
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{formatCurrency(employee.salary)}</p>
                      <p className="text-xs text-gray-500">Monthly</p>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                          Schedule
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