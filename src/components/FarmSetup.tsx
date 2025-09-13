"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createFarm } from "../app/actions/farm";

const KERALA_DISTRICTS = [
  "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam",
  "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram",
  "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
];

const SOIL_TYPES = [
  "Red Soil", "Black Soil", "Laterite Soil", "Alluvial Soil", "Sandy Soil", "Clay Soil"
];

const IRRIGATION_TYPES = [
  "Rain-fed", "Bore well", "Open well", "Canal irrigation", "Drip irrigation", "Sprinkler irrigation"
];

const COMMON_CROPS = [
  "Rice", "Coconut", "Rubber", "Pepper", "Cardamom", "Coffee", "Tea",
  "Banana", "Tapioca", "Ginger", "Turmeric", "Vegetables", "Areca nut"
];

export function FarmSetup() {
  const [formData, setFormData] = useState({
    farmName: "",
    district: "",
    village: "",
    landSizeAcres: "",
    soilType: "",
    irrigationType: "",
    primaryCrops: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.farmName || !formData.district || !formData.village ||
        !formData.landSizeAcres || !formData.soilType || !formData.irrigationType ||
        formData.primaryCrops.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('farm_name', formData.farmName);
      formDataToSend.append('land_size_acres', formData.landSizeAcres);
      formDataToSend.append('soil_type', formData.soilType);
      formDataToSend.append('irrigation_type', formData.irrigationType);
      formDataToSend.append('primary_crops', formData.primaryCrops.join(','));

      // Note: Location data handling might need adjustment based on server action
      const result = await createFarm({ message: '', errors: {} }, formDataToSend);

      if (result.errors) {
        alert(result.message || 'Failed to create farm profile');
      } else {
        alert('Farm profile created successfully! 🎉');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error("Error creating farm:", error);
      alert("Failed to create farm profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCropToggle = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      primaryCrops: prev.primaryCrops.includes(crop)
        ? prev.primaryCrops.filter(c => c !== crop)
        : [...prev.primaryCrops, crop]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Set Up Your Farm Profile</h3>
        <p className="text-gray-600">
          Tell us about your farm to get personalized advice and recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Farm Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Farm Name *
          </label>
          <input
            type="text"
            value={formData.farmName}
            onChange={(e) => setFormData(prev => ({ ...prev, farmName: e.target.value }))}
            placeholder="e.g., Green Valley Farm"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District *
            </label>
            <select
              value={formData.district}
              onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              aria-label="Select District"
            >
              <option value="">Select District</option>
              {KERALA_DISTRICTS.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Village/Town *
            </label>
            <input
              type="text"
              value={formData.village}
              onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
              placeholder="Enter village or town name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Land Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Land Size (in acres) *
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={formData.landSizeAcres}
            onChange={(e) => setFormData(prev => ({ ...prev, landSizeAcres: e.target.value }))}
            placeholder="e.g., 2.5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        {/* Soil Type and Irrigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soil Type *
            </label>
            <select
              value={formData.soilType}
              onChange={(e) => setFormData(prev => ({ ...prev, soilType: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              aria-label="Select Soil Type"
            >
              <option value="">Select Soil Type</option>
              {SOIL_TYPES.map(soil => (
                <option key={soil} value={soil}>{soil}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Irrigation Type *
            </label>
            <select
              value={formData.irrigationType}
              onChange={(e) => setFormData(prev => ({ ...prev, irrigationType: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              aria-label="Select Irrigation Type"
            >
              <option value="">Select Irrigation Type</option>
              {IRRIGATION_TYPES.map(irrigation => (
                <option key={irrigation} value={irrigation}>{irrigation}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Primary Crops */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Primary Crops * (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {COMMON_CROPS.map(crop => (
              <label
                key={crop}
                className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.primaryCrops.includes(crop)
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.primaryCrops.includes(crop)}
                  onChange={() => handleCropToggle(crop)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium">{crop}</span>
              </label>
            ))}
          </div>
          {formData.primaryCrops.length > 0 && (
            <p className="mt-2 text-sm text-green-600">
              Selected: {formData.primaryCrops.join(", ")}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating Farm Profile...</span>
              </div>
            ) : (
              "Create Farm Profile 🚀"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}