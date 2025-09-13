"use client";

import { useState } from "react";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your clinic AI assistant. How can I help you today?",
      timestamp: new Date("2024-01-20T10:00:00")
    },
    {
      id: "2", 
      type: "user",
      content: "What are the available treatments for anti-aging?",
      timestamp: new Date("2024-01-20T10:01:00")
    },
    {
      id: "3",
      type: "bot",
      content: "We offer several anti-aging treatments:\n\n• Botox Injection (Rp 3,500,000) - Reduces wrinkles\n• Filler Injection (Rp 4,500,000) - Restores volume\n• Carbon Laser Facial (Rp 1,800,000) - Skin rejuvenation\n• RF Skin Tightening (Rp 2,200,000) - Firms skin\n\nWould you like to know more about any specific treatment?",
      timestamp: new Date("2024-01-20T10:01:30")
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState("");

  const chatSessions = [
    {
      id: "chat001",
      patientName: "Maria Rodriguez",
      lastMessage: "Thank you for the information about botox",
      timestamp: "10:30 AM",
      status: "resolved",
      messageCount: 8
    },
    {
      id: "chat002",
      patientName: "Sarah Kim",
      lastMessage: "I'd like to book a consultation",
      timestamp: "9:15 AM", 
      status: "active",
      messageCount: 3
    },
    {
      id: "chat003",
      patientName: "Jessica Tan",
      lastMessage: "What are the side effects of laser treatment?",
      timestamp: "Yesterday",
      status: "pending",
      messageCount: 2
    }
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newUserMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setCurrentMessage("");

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: "bot" as const,
        content: "Thank you for your question! Let me help you with that. Would you like me to connect you with our medical team for a detailed consultation?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "resolved": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    totalSessions: chatSessions.length,
    activeSessions: chatSessions.filter(s => s.status === "active").length,
    resolvedToday: chatSessions.filter(s => s.status === "resolved").length,
    averageResponseTime: "2.3 minutes"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
          <p className="text-gray-600 mt-1">Chatbot AI untuk bantuan operasional dan customer service</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <span>🤖</span>
          <span>AI Settings</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Sessions</h3>
              <div className="text-2xl font-bold text-blue-600">{stats.totalSessions}</div>
            </div>
            <span className="text-2xl">💬</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Active Sessions</h3>
              <div className="text-2xl font-bold text-green-600">{stats.activeSessions}</div>
            </div>
            <span className="text-2xl">🟢</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Resolved Today</h3>
              <div className="text-2xl font-bold text-purple-600">{stats.resolvedToday}</div>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Avg Response</h3>
              <div className="text-lg font-bold text-orange-600">{stats.averageResponseTime}</div>
            </div>
            <span className="text-2xl">⚡</span>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <span>🤖</span>
              <span>AI Chat Interface</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Live</span>
            </h2>
          </div>
          <div className="p-6">
            {/* Chat Messages */}
            <div className="h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === "user" 
                        ? "bg-blue-500 text-white" 
                        : "bg-white border shadow-sm"
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Chat Sessions */}
        <div className="bg-white rounded-lg shadow border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Active Chat Sessions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {chatSessions.map((session) => (
                <div key={session.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">
                          {session.patientName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{session.patientName}</p>
                        <p className="text-xs text-gray-500">{session.messageCount} messages</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{session.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">{session.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}