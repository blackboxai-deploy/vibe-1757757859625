"use client";

import { useState } from "react";
import Link from "next/link";

export default function BookingPage() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const bookings = [
    {
      id: "b001",
      patientName: "Maria Rodriguez",
      date: "2024-01-20",
      startTime: "10:00",
      endTime: "12:15",
      status: "confirmed",
      services: ["Botox", "Consultation"],
      doctor: "Dr. Sarah Wilson",
      amount: 3700000
    },
    {
      id: "b002",
      patientName: "Sarah Kim",
      date: "2024-01-20",
      startTime: "14:00",
      endTime: "17:15",
      status: "in-progress",
      services: ["Hydrafacial"],
      doctor: "Luna Park",
      amount: 1200000
    },
    {
      id: "b003",
      patientName: "Amanda Chen",
      date: "2024-01-21",
      startTime: "11:00",
      endTime: "12:00",
      status: "pending",
      services: ["Carbon Laser"],
      doctor: "Dr. Sarah Wilson",
      amount: 1800000
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const stats = {
    total: bookings.length,
    today: bookings.filter(b => b.date === "2024-01-20").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending: bookings.filter(b => b.status === "pending").length,
    inProgress: bookings.filter(b => b.status === "in-progress").length,
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getBookingsForDate = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return bookings.filter(booking => booking.date === dateStr);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setSelectedDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking System</h1>
          <p className="text-gray-600 mt-1">Kelola appointment dan jadwal treatment pasien</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              viewMode === "calendar" 
                ? "bg-blue-600 text-white" 
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>📅</span>
            <span>Calendar</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              viewMode === "list" 
                ? "bg-blue-600 text-white" 
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>📋</span>
            <span>List</span>
          </button>
          <Link href="/services/booking/new">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <span>➕</span>
              <span>New Booking</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{stats.today}</div>
          <div className="text-xs text-gray-500">Today</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-emerald-600">{stats.confirmed}</div>
          <div className="text-xs text-gray-500">Confirmed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-xs text-gray-500">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          <div className="text-xs text-gray-500">In Progress</div>
        </div>
      </div>

      {/* Calendar or List View */}
      {viewMode === "calendar" ? (
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Appointment Calendar - {selectedDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => navigateMonth("prev")}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  ←
                </button>
                <button 
                  onClick={() => setSelectedDate(new Date())}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Today
                </button>
                <button 
                  onClick={() => navigateMonth("next")}
                  className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const dayBookings = getBookingsForDate(day);
                
                return (
                  <div
                    key={index}
                    className={`min-h-20 p-2 border border-gray-200 ${
                      day ? "bg-white hover:bg-gray-50 cursor-pointer" : "bg-gray-50"
                    } ${day === new Date().getDate() && selectedDate.getMonth() === new Date().getMonth() ? "ring-2 ring-blue-500" : ""}`}
                  >
                    {day && (
                      <>
                        <div className="text-sm font-medium mb-1">{day}</div>
                        <div className="space-y-1">
                          {dayBookings.slice(0, 2).map((booking) => (
                            <div
                              key={booking.id}
                              className={`text-xs p-1 rounded truncate ${getStatusColor(booking.status)}`}
                            >
                              <div className="font-medium">{formatTime(booking.startTime)}</div>
                              <div className="truncate">{booking.patientName.split(" ")[0]}</div>
                            </div>
                          ))}
                          {dayBookings.length > 2 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{dayBookings.length - 2}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Confirmed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>In Progress</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Appointment List</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {booking.patientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{booking.patientName}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.date).toLocaleDateString('id-ID')} • {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                      </p>
                      <div className="flex space-x-1 mt-1">
                        {booking.services.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">with {booking.doctor}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded ${getStatusColor(booking.status)} mb-2 inline-block`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <p className="text-sm font-medium">{formatCurrency(booking.amount)}</p>
                    <div className="flex space-x-2 mt-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded hover:bg-gray-200">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}