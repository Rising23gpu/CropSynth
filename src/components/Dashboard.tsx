"use client";

import { useState, useEffect } from "react";
import { getFarmStats } from "../app/actions/farm";
import { ChatBot } from "./ChatBot";
import { WeatherDashboard } from "./WeatherDashboard";
import { ActivityLogger } from "./ActivityLogger";
import { ExpenseTracker } from "./ExpenseTracker";
import { CropDoctor } from "./CropDoctor";
import { FarmOverview } from "./FarmOverview";

interface DashboardProps {
  farms: Array<{
    id: string;
    farm_name: string;
    location: {
      village: string;
      district: string;
    };
    land_size_acres: number;
    soil_type?: string;
    irrigation_type?: string;
    primary_crops: string[];
  }>;
  user: {
    id: string;
    email?: string;
    name?: string;
  };
}

type TabType = "overview" | "chat" | "weather" | "activities" | "expenses" | "health";

export function Dashboard({ farms, user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [selectedFarmId, setSelectedFarmId] = useState<string>(farms.length > 0 ? farms[0].id : "");
  const [farmStats, setFarmStats] = useState<{
    totalActivities: number;
    monthlyExpenses: number;
    healthRecords: number;
    recentActivities: Array<{
      id: string;
      activity_type: string;
      description: string;
      date: string;
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const selectedFarm = farms.find(farm => farm.id === selectedFarmId);

  useEffect(() => {
    const fetchFarmStats = async () => {
      if (selectedFarmId && selectedFarm) {
        setLoading(true);
        try {
          const stats = await getFarmStats(selectedFarmId);
          setFarmStats(stats);
        } catch (error) {
          console.error('Failed to fetch farm stats:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setFarmStats(null);
        setLoading(false);
      }
    };

    fetchFarmStats();
  }, [selectedFarmId, selectedFarm]);

  const tabs = [
    { id: "overview", label: "Overview", icon: "🏠" },
    { id: "chat", label: "Crop-Bot", icon: "🤖" },
    { id: "weather", label: "Weather", icon: "🌤️" },
    { id: "activities", label: "Activities", icon: "📝" },
    { id: "expenses", label: "Expenses", icon: "💰" },
    { id: "health", label: "Crop Doctor", icon: "🔍" },
  ];

  return (
    <div className="space-y-6">
      {/* Farm Selector */}
      {farms.length > 1 && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Farm
          </label>
          <select
            value={selectedFarmId}
            onChange={(e) => setSelectedFarmId(e.target.value)}
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Select Farm"
          >
            {farms.map((farm) => (
              <option key={farm.id} value={farm.id}>
                {farm.farm_name} - {farm.location?.village || 'Unknown'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg text-white p-6">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name || user?.email?.split('@')[0] || 'Farmer'}! 👋
        </h2>
        <p className="text-green-100">
          Managing <strong>{selectedFarm?.farm_name || 'No Farm Selected'}</strong> in {selectedFarm?.location?.village || 'Unknown'}, {selectedFarm?.location?.district || 'Unknown'}
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">Farm Size</div>
            <div className="text-lg">{selectedFarm?.land_size_acres || 0} acres</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">Primary Crops</div>
            <div className="text-lg">{selectedFarm?.primary_crops?.length || 0}</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">Activities</div>
            <div className="text-lg">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                farmStats?.totalActivities || 0
              )}
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-semibold">This Month</div>
            <div className="text-lg">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                `₹${farmStats?.monthlyExpenses || 0}`
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "overview" && selectedFarm && (
            <FarmOverview
              farm={{
                ...selectedFarm,
                soil_type: selectedFarm.soil_type || 'Unknown',
                irrigation_type: selectedFarm.irrigation_type || 'Unknown'
              }}
              stats={farmStats || { totalActivities: 0, monthlyExpenses: 0, healthRecords: 0, recentActivities: [] }}
            />
          )}
          {activeTab === "chat" && (
            <ChatBot farmId={selectedFarmId} />
          )}
          {activeTab === "weather" && selectedFarm && (
            <WeatherDashboard
              farm={{
                ...selectedFarm,
                soil_type: selectedFarm.soil_type || 'Unknown',
                irrigation_type: selectedFarm.irrigation_type || 'Unknown'
              }}
            />
          )}
          {activeTab === "activities" && (
            <ActivityLogger farmId={selectedFarmId} />
          )}
          {activeTab === "expenses" && (
            <ExpenseTracker farmId={selectedFarmId} />
          )}
          {activeTab === "health" && (
            <CropDoctor farmId={selectedFarmId} />
          )}
        </div>
      </div>
    </div>
  );
}