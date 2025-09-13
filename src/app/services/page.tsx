"use client";

import { useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    {
      id: "s001",
      name: "Botox Injection - Forehead",
      category: "injection",
      description: "Anti-aging botox treatment untuk mengurangi kerutan di dahi",
      duration: 45,
      price: 3500000,
      popularity: 95,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop"
    },
    {
      id: "s002",
      name: "Filler Injection - Lips", 
      category: "injection",
      description: "Hyaluronic acid filler untuk membentuk bibir lebih penuh",
      duration: 60,
      price: 4500000,
      popularity: 88,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: "s003",
      name: "Carbon Laser Facial",
      category: "laser",
      description: "Treatment laser carbon untuk mengecilkan pori dan mencerahkan kulit",
      duration: 90,
      price: 1800000,
      popularity: 92,
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop"
    },
    {
      id: "s004",
      name: "Eyelid Surgery (Blepharoplasty)",
      category: "surgery", 
      description: "Operasi kelopak mata untuk menghilangkan kantung mata",
      duration: 180,
      price: 15000000,
      popularity: 75,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd718e4?w=400&h=300&fit=crop"
    },
    {
      id: "s005",
      name: "IV Vitamin Drip - Glow",
      category: "infusion",
      description: "Infus vitamin C, glutathione, dan kolagen untuk glowing skin",
      duration: 120,
      price: 850000,
      popularity: 89,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: "s006",
      name: "Hydrafacial Premium",
      category: "facial",
      description: "Deep cleansing facial dengan teknologi hydradermabrasion",
      duration: 75,
      price: 1200000,
      popularity: 94,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop"
    }
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      injection: "💉",
      laser: "⚡",
      facial: "✨",
      surgery: "🏥",
      infusion: "💧",
      consultation: "👨‍⚕️"
    };
    return icons[category as keyof typeof icons] || "💎";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      injection: "bg-blue-100 text-blue-800",
      laser: "bg-purple-100 text-purple-800", 
      facial: "bg-pink-100 text-pink-800",
      surgery: "bg-red-100 text-red-800",
      infusion: "bg-teal-100 text-teal-800",
      consultation: "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const stats = {
    total: services.length,
    injection: services.filter(s => s.category === "injection").length,
    laser: services.filter(s => s.category === "laser").length,
    facial: services.filter(s => s.category === "facial").length,
    surgery: services.filter(s => s.category === "surgery").length,
    infusion: services.filter(s => s.category === "infusion").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Layanan Klinik</h1>
          <p className="text-gray-600 mt-1">Kelola layanan treatment dan prosedur kecantikan</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/services/booking">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <span>📅</span>
              <span>Booking System</span>
            </button>
          </Link>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <span>➕</span>
            <span>Tambah Layanan</span>
          </button>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-xl mb-1">💉</div>
          <div className="text-lg font-bold">{stats.injection}</div>
          <div className="text-xs text-gray-500">Injection</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-xl mb-1">⚡</div>
          <div className="text-lg font-bold">{stats.laser}</div>
          <div className="text-xs text-gray-500">Laser</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-xl mb-1">✨</div>
          <div className="text-lg font-bold">{stats.facial}</div>
          <div className="text-xs text-gray-500">Facial</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-xl mb-1">🏥</div>
          <div className="text-lg font-bold">{stats.surgery}</div>
          <div className="text-xs text-gray-500">Surgery</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-xl mb-1">💧</div>
          <div className="text-lg font-bold">{stats.infusion}</div>
          <div className="text-xs text-gray-500">Infusion</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <input
          type="text"
          placeholder="Cari nama layanan atau deskripsi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow border hover:shadow-lg transition-shadow">
            <img 
              src={service.image} 
              alt={service.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(service.category)}`}>
                  {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Durasi:</span>
                  <span className="font-medium">{service.duration} menit</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Popularitas:</span>
                  <span>{"⭐".repeat(Math.round(service.popularity / 20))}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(service.price)}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link href={`/services/booking/new?serviceId=${service.id}`} className="flex-1">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-1">
                    <span>📅</span>
                    <span>Book</span>
                  </button>
                </Link>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}