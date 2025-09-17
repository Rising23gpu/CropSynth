"use client";

import { useState } from "react";
import { WeatherDashboard } from '@/components/WeatherDashboard'

interface Farm {
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
}

interface WeatherClientProps {
  farms: Farm[];
}

export default function WeatherClient({ farms }: WeatherClientProps) {
  const [selectedFarmId, setSelectedFarmId] = useState<string>(farms.length > 0 ? farms[0].id : "");

  const selectedFarm = farms.find(farm => farm.id === selectedFarmId);

  if (!selectedFarm) {
    return <div>No farm selected</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
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

        {/* WeatherDashboard Component */}
        <WeatherDashboard
          farm={{
            ...selectedFarm,
            soil_type: selectedFarm.soil_type || 'Unknown',
            irrigation_type: selectedFarm.irrigation_type || 'Unknown'
          }}
        />
      </div>
    </div>
  );
}