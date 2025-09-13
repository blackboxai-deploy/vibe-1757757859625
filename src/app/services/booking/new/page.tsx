"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewBookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patientId: "",
    serviceIds: [] as string[],
    appointmentDate: "",
    startTime: "",
    assignedStaffId: "",
    notes: "",
  });

  const patients = [
    { id: "p001", name: "Maria Rodriguez", phone: "+62812-3456-7890", regNumber: "REG001" },
    { id: "p002", name: "Sarah Kim", phone: "+62813-2468-1357", regNumber: "REG002" },
    { id: "p003", name: "Amanda Chen", phone: "+62814-5678-9012", regNumber: "REG003" },
  ];

  const services = [
    { id: "s001", name: "Botox Injection - Forehead", duration: 45, price: 3500000 },
    { id: "s002", name: "Filler Injection - Lips", duration: 60, price: 4500000 },
    { id: "s003", name: "Carbon Laser Facial", duration: 90, price: 1800000 },
    { id: "s006", name: "Hydrafacial Premium", duration: 75, price: 1200000 },
  ];

  const staff = [
    { id: "e001", name: "Dr. Sarah Wilson", position: "Chief Medical Officer" },
    { id: "e002", name: "Dr. Michael Chen", position: "Aesthetic Doctor" },
    { id: "e004", name: "Luna Park", position: "Beauty Therapist" },
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleServiceToggle = (serviceId: string) => {
    const currentServices = formData.serviceIds;
    const newServices = currentServices.includes(serviceId)
      ? currentServices.filter(id => id !== serviceId)
      : [...currentServices, serviceId];
    
    setFormData(prev => ({ ...prev, serviceIds: newServices }));
  };

  const calculateTotalDuration = () => {
    return formData.serviceIds.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.duration || 0);
    }, 0);
  };

  const calculateTotalAmount = () => {
    return formData.serviceIds.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const handleSubmit = () => {
    if (!formData.patientId || formData.serviceIds.length === 0 || !formData.appointmentDate || !formData.startTime || !formData.assignedStaffId) {
      alert("Please fill all required fields");
      return;
    }

    alert("Booking created successfully!");
    console.log("New booking:", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 1: Select Patient</h3>
            <div className="space-y-2">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    formData.patientId === patient.id ? "bg-blue-50 border-blue-300" : ""
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, patientId: patient.id }))}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {patient.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.phone} • {patient.regNumber}</p>
                    </div>
                  </div>
                  {formData.patientId === patient.id && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Selected</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 2: Select Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    formData.serviceIds.includes(service.id) ? "bg-green-50 border-green-300" : ""
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.duration} minutes</p>
                    <p className="text-sm font-medium text-green-600">{formatCurrency(service.price)}</p>
                    {formData.serviceIds.includes(service.id) && (
                      <span className="px-2 py-1 bg-green-600 text-white text-xs rounded mt-2 inline-block">
                        ✓ Selected
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {formData.serviceIds.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total Duration:</span>
                    <span>{calculateTotalDuration()} minutes</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total Amount:</span>
                    <span className="text-green-600">{formatCurrency(calculateTotalAmount())}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 3: Schedule & Staff</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
                <input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, appointmentDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <select
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{formatTime(time)}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Staff</label>
                <select
                  value={formData.assignedStaffId}
                  onChange={(e) => setFormData(prev => ({ ...prev, assignedStaffId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select staff member</option>
                  {staff.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.position}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="Special instructions or notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        const selectedPatient = patients.find(p => p.id === formData.patientId);
        const selectedServices = formData.serviceIds.map(id => services.find(s => s.id === id)).filter(Boolean);
        const selectedStaff = staff.find(s => s.id === formData.assignedStaffId);

        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 4: Confirm Booking</h3>
            
            <div className="bg-white border rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-bold">
                      {selectedPatient ? selectedPatient.name.split(" ").map(n => n[0]).join("").substring(0, 2) : ""}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-lg">{selectedPatient?.name}</p>
                    <p className="text-sm text-gray-500">{selectedPatient?.phone}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Selected Services</h4>
                  <div className="space-y-2">
                    {selectedServices.map((service, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm">{service?.name}</span>
                        <span className="text-sm font-medium">{formatCurrency(service?.price || 0)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <p className="font-medium">
                      {formData.appointmentDate ? new Date(formData.appointmentDate).toLocaleDateString('id-ID') : ""}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Time:</span>
                    <p className="font-medium">{formatTime(formData.startTime)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <p className="font-medium">{calculateTotalDuration()} minutes</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Staff:</span>
                    <p className="font-medium">{selectedStaff?.name}</p>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">{formatCurrency(calculateTotalAmount())}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">New Booking</h1>
        <p className="text-gray-600 mt-1">Create new appointment untuk pasien</p>
      </div>

      {/* Progress */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i + 1} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i + 1 <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                {i + 1}
              </div>
              {i < 3 && (
                <div className={`w-16 h-1 mx-2 ${i + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Patient</span>
          <span>Services</span>
          <span>Schedule</span>
          <span>Confirm</span>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Step {currentStep} of 4</h2>
        </div>
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <span>←</span>
          <span>Previous</span>
        </button>

        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>Next</span>
            <span>→</span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <span>✅</span>
            <span>Confirm Booking</span>
          </button>
        )}
      </div>
    </div>
  );
}