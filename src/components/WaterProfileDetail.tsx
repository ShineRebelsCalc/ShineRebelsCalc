import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

interface WaterProfile {
  name: string;
  location: string;
  calcium: number;
  magnesium: number;
  sodium: number;
  sulfate: number;
  chloride: number;
  bicarbonate: number;
  description: string;
}

interface WaterProfileDetailProps {
  profile: WaterProfile;
  onBack: () => void;
}

interface CurrentWaterValues {
  calcium: string;
  magnesium: string;
  sodium: string;
  sulfate: string;
  chloride: string;
  bicarbonate: string;
}

interface SaltAdditions {
  gypsum: number;
  calciumChloride: number;
  epsomSalt: number;
  tableSalt: number;
  bakingSoda: number;
  chalkOrSlaked: number;
}

function WaterProfileDetail({ profile, onBack }: WaterProfileDetailProps) {
  const [currentWater, setCurrentWater] = useState<CurrentWaterValues>({
    calcium: '',
    magnesium: '',
    sodium: '',
    sulfate: '',
    chloride: '',
    bicarbonate: ''
  });

  const [waterVolume, setWaterVolume] = useState<string>('');

  const handleInputChange = (mineral: keyof CurrentWaterValues, value: string) => {
    setCurrentWater(prev => ({ ...prev, [mineral]: value }));
  };

  const calculateDifference = (target: number, current: string): number => {
    const currentValue = parseFloat(current);
    if (isNaN(currentValue)) return target;
    return Math.max(0, target - currentValue);
  };

  const calculateSaltAdditions = (): SaltAdditions | null => {
    const volume = parseFloat(waterVolume);
    if (isNaN(volume) || volume <= 0) return null;

    const caDiff = calculateDifference(profile.calcium, currentWater.calcium);
    const mgDiff = calculateDifference(profile.magnesium, currentWater.magnesium);
    const naDiff = calculateDifference(profile.sodium, currentWater.sodium);
    const so4Diff = calculateDifference(profile.sulfate, currentWater.sulfate);
    const clDiff = calculateDifference(profile.chloride, currentWater.chloride);
    const hco3Diff = calculateDifference(profile.bicarbonate, currentWater.bicarbonate);

    const gypsum = (so4Diff * volume * 0.00172);
    const calciumChloride = (clDiff * volume * 0.00158);
    const epsomSalt = (mgDiff * volume * 0.00406);
    const tableSalt = (naDiff * volume * 0.00254);
    const bakingSoda = (hco3Diff * volume * 0.00189);
    const chalkOrSlaked = (caDiff * volume * 0.00185);

    return {
      gypsum: Math.round(gypsum * 100) / 100,
      calciumChloride: Math.round(calciumChloride * 100) / 100,
      epsomSalt: Math.round(epsomSalt * 100) / 100,
      tableSalt: Math.round(tableSalt * 100) / 100,
      bakingSoda: Math.round(bakingSoda * 100) / 100,
      chalkOrSlaked: Math.round(chalkOrSlaked * 100) / 100
    };
  };

  const saltAdditions = calculateSaltAdditions();

  const minerals = [
    { key: 'calcium' as keyof CurrentWaterValues, name: 'Calcium (Ca²⁺)', unit: 'ppm', target: profile.calcium, color: 'bg-blue-50' },
    { key: 'magnesium' as keyof CurrentWaterValues, name: 'Magnesium (Mg²⁺)', unit: 'ppm', target: profile.magnesium, color: 'bg-green-50' },
    { key: 'sodium' as keyof CurrentWaterValues, name: 'Sodium (Na⁺)', unit: 'ppm', target: profile.sodium, color: 'bg-yellow-50' },
    { key: 'sulfate' as keyof CurrentWaterValues, name: 'Sulfate (SO₄²⁻)', unit: 'ppm', target: profile.sulfate, color: 'bg-orange-50' },
    { key: 'chloride' as keyof CurrentWaterValues, name: 'Chloride (Cl⁻)', unit: 'ppm', target: profile.chloride, color: 'bg-teal-50' },
    { key: 'bicarbonate' as keyof CurrentWaterValues, name: 'Bicarbonate (HCO₃⁻)', unit: 'ppm', target: profile.bicarbonate, color: 'bg-slate-50' }
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Water Profiles
      </button>

      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-lg text-gray-600">{profile.location}</p>
        </div>
        <p className="text-gray-700">{profile.description}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Water Volume</h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Water Volume (Liters)
          </label>
          <input
            type="number"
            step="0.1"
            placeholder="20"
            value={waterVolume}
            onChange={(e) => setWaterVolume(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
          <h3 className="text-xl font-bold text-white">Water Chemistry Comparison</h3>
          <p className="text-blue-100 text-sm mt-1">Enter your current water measurements to calculate required additions</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mineral</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Target Profile</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Current Water</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Difference</th>
              </tr>
            </thead>
            <tbody>
              {minerals.map((mineral, index) => {
                const difference = calculateDifference(mineral.target, currentWater[mineral.key]);
                const isDifferent = difference > 0;

                return (
                  <tr key={mineral.key} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${mineral.color}`}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{mineral.name}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-semibold text-blue-600 text-lg">
                        {mineral.target} {mineral.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          step="1"
                          placeholder="0"
                          value={currentWater[mineral.key]}
                          onChange={(e) => handleInputChange(mineral.key, e.target.value)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <span className="ml-2 self-center text-gray-600 text-sm">{mineral.unit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`inline-flex items-center gap-1 font-semibold ${isDifferent ? 'text-orange-600' : 'text-green-600'}`}>
                        {isDifferent ? (
                          <>
                            <Plus className="w-4 h-4" />
                            {difference.toFixed(1)} {mineral.unit}
                          </>
                        ) : (
                          <span className="text-green-600">Match</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {saltAdditions && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-green-500 to-green-600">
            <h3 className="text-xl font-bold text-white">Recommended Salt Additions</h3>
            <p className="text-green-100 text-sm mt-1">Add these brewing salts to match the target profile</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {saltAdditions.gypsum > 0 && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">Gypsum (CaSO₄·2H₂O)</div>
                  <div className="text-2xl font-bold text-blue-700">{saltAdditions.gypsum.toFixed(2)} g</div>
                  <div className="text-xs text-gray-500 mt-1">Adds Ca²⁺ and SO₄²⁻</div>
                </div>
              )}
              {saltAdditions.calciumChloride > 0 && (
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                  <div className="text-sm text-gray-600 mb-1">Calcium Chloride (CaCl₂·2H₂O)</div>
                  <div className="text-2xl font-bold text-teal-700">{saltAdditions.calciumChloride.toFixed(2)} g</div>
                  <div className="text-xs text-gray-500 mt-1">Adds Ca²⁺ and Cl⁻</div>
                </div>
              )}
              {saltAdditions.epsomSalt > 0 && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="text-sm text-gray-600 mb-1">Epsom Salt (MgSO₄·7H₂O)</div>
                  <div className="text-2xl font-bold text-green-700">{saltAdditions.epsomSalt.toFixed(2)} g</div>
                  <div className="text-xs text-gray-500 mt-1">Adds Mg²⁺ and SO₄²⁻</div>
                </div>
              )}
              {saltAdditions.tableSalt > 0 && (
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <div className="text-sm text-gray-600 mb-1">Table Salt (NaCl)</div>
                  <div className="text-2xl font-bold text-yellow-700">{saltAdditions.tableSalt.toFixed(2)} g</div>
                  <div className="text-xs text-gray-500 mt-1">Adds Na⁺ and Cl⁻</div>
                </div>
              )}
              {saltAdditions.bakingSoda > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="text-sm text-gray-600 mb-1">Baking Soda (NaHCO₃)</div>
                  <div className="text-2xl font-bold text-slate-700">{saltAdditions.bakingSoda.toFixed(2)} g</div>
                  <div className="text-xs text-gray-500 mt-1">Adds HCO₃⁻</div>
                </div>
              )}
              {saltAdditions.chalkOrSlaked > 0 && (
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="text-sm text-gray-600 mb-1">Chalk/Slaked Lime</div>
                  <div className="text-2xl font-bold text-orange-700">{saltAdditions.chalkOrSlaked.toFixed(2)} g</div>
                  <div className="text-xs text-gray-500 mt-1">Adds Ca²⁺</div>
                </div>
              )}
            </div>

            {Object.values(saltAdditions).every(val => val === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg font-medium">Your water already matches this profile!</p>
                <p className="text-sm mt-2">No salt additions needed.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WaterProfileDetail;
