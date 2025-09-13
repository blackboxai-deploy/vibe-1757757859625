"use client";

import { useState } from "react";
import Link from "next/link";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock patient data
  const patients = [
    {
      id: "p001",
      name: "Maria Isabella Rodriguez",
      phone: "+62812-3456-7890",
      email: "maria.rodriguez@email.com",
      registrationNumber: "REG001",
      gender: "female",
      age: 39,
      memberTier: "gold",
      lastVisit: "2024-01-15",
      totalSpent: 25000000
    },
    {
      id: "p002", 
      name: "Sarah Kim Johnson",
      phone: "+62813-2468-1357",
      email: "sarah.kim@email.com",
      registrationNumber: "REG002",
      gender: "female",
      age: 34,
      memberTier: "silver",
      lastVisit: "2024-01-10",
      totalSpent: 8500000
    },
    {
      id: "p003",
      name: "Amanda Chen Wei Ling", 
      phone: "+62814-5678-9012",
      email: "amanda.chen@email.com",
      registrationNumber: "REG003",
      gender: "female",
      age: 36,
      memberTier: null,
      lastVisit: "2024-01-05",
      totalSpent: 3200000
    },
    {
      id: "p004",
      name: "Jessica Tan Mei Hui",
      phone: "+62815-3456-7890", 
      email: "jessica.tan@email.com",
      registrationNumber: "REG004",
      gender: "female",
      age: 32,
      memberTier: "bronze",
      lastVisit: "2024-01-12",
      totalSpent: 5800000
    },
    {
      id: "p005",
      name: "Priscilla Wijaya",
      phone: "+62816-7890-1234",
      email: "priscilla.wijaya@email.com",
      registrationNumber: "REG005", 
      gender: "female",
      age: 37,
      memberTier: "platinum",
      lastVisit: "2024-01-08",
      totalSpent: 45000000
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery) ||
    patient.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getMemberBadgeColor = (tier: string | null) => {
    if (!tier) return "bg-gray-100 text-gray-800";
    const colors = {
      bronze: "bg-orange-100 text-orange-800",
      silver: "bg-gray-200 text-gray-800", 
      gold: "bg-yellow-100 text-yellow-800",
      platinum: "bg-purple-100 text-purple-800"
    };
    return colors[tier as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const stats = {
    total: patients.length,
    members: patients.filter(p => p.memberTier).length,
    female: patients.filter(p => p.gender === "female").length,
    male: patients.filter(p => p.gender === "male").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Pasien</h1>
          <p className="text-gray-600 mt-1">Kelola data pasien, riwayat kunjungan, dan informasi medis</p>
        </div>
        <Link href="/patients/register">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <span>👤</span>
            <span>Daftar Pasien Baru</span>
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Pasien</h3>
              <div className="text-2xl font-bold text-blue-600 mt-2">{stats.total}</div>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Member Aktif</h3>
              <div className="text-2xl font-bold text-yellow-600 mt-2">{stats.members}</div>
            </div>
            <span className="text-2xl">⭐</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pasien Wanita</h3>
              <div className="text-2xl font-bold text-pink-600 mt-2">{stats.female}</div>
            </div>
            <span className="text-2xl">👩</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pasien Pria</h3>
              <div className="text-2xl font-bold text-blue-600 mt-2">{stats.male}</div>
            </div>
            <span className="text-2xl">👨</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">Pencarian Pasien</h2>
        <input
          type="text"
          placeholder="Cari nama, nomor telepon, atau nomor registrasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Daftar Pasien ({filteredPatients.length})</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Pasien</th>
                  <th className="text-left p-4">Kontak</th>
                  <th className="text-left p-4">Info</th>
                  <th className="text-left p-4">Membership</th>
                  <th className="text-left p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">🔍</div>
                      <p>Tidak ada pasien yang sesuai dengan pencarian</p>
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">
                              {patient.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-500">{patient.registrationNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm">{patient.phone}</p>
                          <p className="text-sm text-gray-500">{patient.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm">{patient.age} tahun</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {patient.gender === 'female' ? '👩 Wanita' : '👨 Pria'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        {patient.memberTier ? (
                          <span className={`px-2 py-1 text-xs rounded ${getMemberBadgeColor(patient.memberTier)}`}>
                            ⭐ {patient.memberTier.toUpperCase()}
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Non-Member</span>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Spent: {formatCurrency(patient.totalSpent)}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Link href={`/patients/${patient.id}`}>
                            <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                              Detail
                            </button>
                          </Link>
                          <Link href={`/patients/${patient.id}/assessment`}>
                            <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                              Assessment
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}