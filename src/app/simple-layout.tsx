"use client";

import { useState } from "react";
import Link from "next/link";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard", 
    href: "/",
    icon: "📊",
  },
  {
    id: "patients",
    label: "Manajemen Pasien",
    href: "/patients", 
    icon: "👥",
    children: [
      { id: "patient-list", label: "Daftar Pasien", href: "/patients", icon: "📋" },
      { id: "patient-register", label: "Registrasi Baru", href: "/patients/register", icon: "✍️" },
      { id: "patient-visits", label: "Tracking Kunjungan", href: "/patients/visits", icon: "🚪" },
    ]
  },
  {
    id: "services", 
    label: "Layanan Klinik",
    href: "/services",
    icon: "💎",
    children: [
      { id: "service-catalog", label: "Katalog Layanan", href: "/services", icon: "📑" },
      { id: "bookings", label: "Booking System", href: "/services/booking", icon: "📅" },
    ]
  },
  {
    id: "inventory",
    label: "Manajemen Inventaris", 
    href: "/inventory",
    icon: "📦",
    children: [
      { id: "medicines", label: "Stok Obat", href: "/inventory/medicines", icon: "💊" },
      { id: "consumables", label: "Bahan Habis Pakai", href: "/inventory/consumables", icon: "🧴" },
      { id: "transactions", label: "Transaksi Stok", href: "/inventory/transactions", icon: "📝" },
      { id: "waste", label: "Manajemen Limbah", href: "/inventory/waste", icon: "🗑️" },
    ]
  },
  {
    id: "membership",
    label: "Sistem Keanggotaan",
    href: "/membership", 
    icon: "⭐",
  },
  {
    id: "finance",
    label: "Manajemen Keuangan",
    href: "/finance",
    icon: "💳",
    children: [
      { id: "payments", label: "Pembayaran", href: "/finance/payments", icon: "💸" },
    ]
  },
  {
    id: "medical-docs",
    label: "Dokumen Medis",
    href: "/medical-documents", 
    icon: "📄",
  },
  {
    id: "admin",
    label: "Sistem Administrasi",
    href: "/admin",
    icon: "⚙️",
  },
  {
    id: "interactive",
    label: "Fitur Interaktif",
    href: "/interactive",
    icon: "🎮", 
  },
  {
    id: "reports",
    label: "Laporan & Analisis",
    href: "/reports",
    icon: "📈",
  },
];

export function SimpleLayout({ children }: { children: React.ReactNode }) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["patients", "services", "inventory", "finance"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    return (
      <div key={item.id} className="space-y-1">
        {hasChildren ? (
          <button
            className="w-full flex items-center justify-between p-2 text-left hover:bg-blue-50 rounded-lg"
            onClick={() => toggleExpanded(item.id)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <span className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
              ▶️
            </span>
          </button>
        ) : (
          <Link href={item.href}>
            <button className="w-full flex items-center space-x-3 p-2 text-left hover:bg-blue-50 rounded-lg">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          </Link>
        )}
        
        {hasChildren && isExpanded && (
          <div className="ml-6 space-y-1">
            {item.children!.map(child => (
              <Link key={child.id} href={child.href}>
                <button className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-50 rounded-lg">
                  <span className="text-sm">{child.icon}</span>
                  <span className="text-sm">{child.label}</span>
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🏥</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Beauty Clinic</h1>
              <p className="text-sm text-gray-500">Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto p-4">
          <nav className="space-y-2">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>v1.0.0</span>
            <span>© 2024 Beauty Clinic</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex-1 max-w-xl">
            <input
              type="search"
              placeholder="🔍 Cari pasien, booking, atau layanan..."
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <span>👥 12 Pasien Hari Ini</span>
              <span>💰 Rp 8.5M Revenue</span>
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">DS</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-white">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}