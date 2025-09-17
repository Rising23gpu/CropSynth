"use client";

import { useState } from "react";
import { ExpenseTracker } from '@/components/ExpenseTracker'

interface Farm {
  id: string;
  farm_name: string;
  location: {
    village: string;
    district: string;
  };
}

interface ExpensesClientProps {
  farms: Farm[];
}

export default function ExpensesClient({ farms }: ExpensesClientProps) {
  const [selectedFarmId, setSelectedFarmId] = useState<string>(farms.length > 0 ? farms[0].id : "");

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

        {/* ExpenseTracker Component */}
        <ExpenseTracker farmId={selectedFarmId} />
      </div>
    </div>
  );
}