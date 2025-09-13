"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckInPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [walkInServices, setWalkInServices] = useState<string[]>([]);

  const patients = [
    { id: "p001", name: "Maria Rodriguez", phone: "+62812-3456-7890", regNumber: "REG001" },
    { id: "p002", name: "Sarah Kim", phone: "+62813-2468-1357", regNumber: "REG002" },
    { id: "p003", name: "Amanda Chen", phone: "+62814-5678-9012", regNumber: "REG003" },
  ];

  const walkInServiceOptions = [
    { id: "s008", name: "Consultation - First Visit", price: 200000 },
    { id: "s006", name: "Hydrafacial Premium", price: 1200000 },
    { id: "s005", name: "IV Vitamin Drip", price: 850000 },
    { id: "s003", name: "Carbon Laser Facial", price: 1800000 },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery) ||
    patient.regNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleServiceToggle = (serviceId: string) => {
    setWalkInServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return walkInServices.reduce((total, serviceId) => {
      const service = walkInServiceOptions.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const handleCheckIn = () => {
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (walkInServices.length === 0) {
      alert("Please select at least one service");
      return;
    }

    const selectedPatientData = patients.find(p => p.id === selectedPatient);
    alert(`Patient ${selectedPatientData?.name} checked in successfully!`);
    
    // Reset form
    setSelectedPatient("");
    setWalkInServices([]);
    setSearchQuery("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Check-in Pasien</h1>
          <p className="text-gray-600 mt-1">Proses check-in untuk appointment atau walk-in patients</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Current Time</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      {/* Patient Search */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">Step 1: Select Patient</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search patient by name, phone, or registration number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {searchQuery && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredPatients.slice(0, 5).map((patient) => (
                <div
                  key={patient.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedPatient === patient.id ? "bg-blue-50 border-blue-300" : ""
                  }`}
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {patient.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.regNumber} • {patient.phone}</p>
                    </div>
                  </div>
                  {selectedPatient === patient.id && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Selected</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Service Selection */}
      {selectedPatient && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Step 2: Select Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {walkInServiceOptions.map((service) => (
              <div
                key={service.id}
                className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  walkInServices.includes(service.id) ? "bg-green-50 border-green-300" : ""
                }`}
                onClick={() => handleServiceToggle(service.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{service.name}</p>
                    <p className="text-xs text-gray-500">Walk-in available</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">{formatCurrency(service.price)}</p>
                    {walkInServices.includes(service.id) && (
                      <span className="px-2 py-1 bg-green-600 text-white text-xs rounded mt-1 inline-block">
                        ✓ Added
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary & Check-in */}
      {selectedPatient && walkInServices.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Step 3: Confirm Check-in</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium mb-3">Check-in Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Patient:</span>
                <span className="font-medium">
                  {patients.find(p => p.id === selectedPatient)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Services:</span>
                <span className="font-medium">{walkInServices.length} selected</span>
              </div>
              <div className="flex justify-between">
                <span>Check-in Time:</span>
                <span className="font-medium">
                  {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total Amount:</span>
                <span className="text-green-600">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckIn}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
          >
            <span>✅</span>
            <span>Check-in Patient</span>
          </button>
        </div>
      )}

      {/* New Patient Registration */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">New Patient?</h2>
        <div className="text-center">
          <p className="text-gray-600 mb-4">If the patient is not registered yet</p>
          <Link href="/patients/register">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2 mx-auto">
              <span>👤</span>
              <span>Register New Patient First</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}