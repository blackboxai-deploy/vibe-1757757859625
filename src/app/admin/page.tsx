"use client";

export default function AdminPage() {
  const users = [
    {
      id: "u001",
      name: "Dr. Sarah Wilson",
      username: "dr.sarah.wilson",
      email: "sarah.wilson@beautyclinic.com",
      role: "admin",
      lastLogin: "2024-01-20 08:30",
      isActive: true,
      twoFactorEnabled: true
    },
    {
      id: "u002",
      name: "Dr. Michael Chen", 
      username: "dr.michael.chen",
      email: "michael.chen@beautyclinic.com",
      role: "doctor",
      lastLogin: "2024-01-19 14:15",
      isActive: true,
      twoFactorEnabled: false
    },
    {
      id: "u003",
      name: "Amanda Rodriguez",
      username: "nurse.amanda",
      email: "amanda.rodriguez@beautyclinic.com",
      role: "staff",
      lastLogin: "2024-01-20 07:45",
      isActive: true,
      twoFactorEnabled: true
    }
  ];

  const systemLogs = [
    {
      id: "1",
      timestamp: "2024-01-20 10:30",
      user: "Dr. Sarah Wilson",
      action: "Patient record updated",
      severity: "info"
    },
    {
      id: "2",
      timestamp: "2024-01-20 10:15",
      user: "Dr. Michael Chen", 
      action: "Prescription created",
      severity: "info"
    },
    {
      id: "3",
      timestamp: "2024-01-20 09:45",
      user: "System",
      action: "Automated backup completed",
      severity: "success"
    }
  ];

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    adminUsers: users.filter(u => u.role === "admin").length,
    twoFactorEnabled: users.filter(u => u.twoFactorEnabled).length
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return "👑";
      case "doctor": return "👨‍⚕️";
      case "staff": return "👩‍💼";
      default: return "👤";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "doctor": return "bg-blue-100 text-blue-800";
      case "staff": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success": return "bg-green-100 text-green-800";
      case "info": return "bg-blue-100 text-blue-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistem Administrasi</h1>
          <p className="text-gray-600 mt-1">Kelola pengguna, permissions, settings, dan monitoring sistem</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2">
          <span>🔒</span>
          <span>Security Center</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <div className="text-2xl font-bold text-blue-600 mt-2">{stats.totalUsers}</div>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
              <div className="text-2xl font-bold text-green-600 mt-2">{stats.activeUsers}</div>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Administrators</h3>
              <div className="text-2xl font-bold text-red-600 mt-2">{stats.adminUsers}</div>
            </div>
            <span className="text-2xl">👑</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">2FA Enabled</h3>
              <div className="text-2xl font-bold text-purple-600 mt-2">{stats.twoFactorEnabled}</div>
              <p className="text-xs text-gray-500">{Math.round((stats.twoFactorEnabled / stats.totalUsers) * 100)}% coverage</p>
            </div>
            <span className="text-2xl">🔐</span>
          </div>
        </div>
      </div>

      {/* System Activity */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent System Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {systemLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{log.action}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{log.timestamp}</span>
                    <span>•</span>
                    <span>{log.user}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${getSeverityColor(log.severity)}`}>
                  {log.severity.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">User Management</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Last Login</th>
                  <th className="text-left p-4">Security</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">
                            {user.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">@{user.username}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getRoleIcon(user.role)}</span>
                        <span className={`px-2 py-1 text-xs rounded ${getRoleColor(user.role)}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm">{user.lastLogin}</p>
                      <span className={`px-2 py-1 text-xs rounded ${
                        user.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded ${
                        user.twoFactorEnabled 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.twoFactorEnabled ? "🔐 2FA On" : "🚫 2FA Off"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded hover:bg-gray-200">
                          Permissions
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