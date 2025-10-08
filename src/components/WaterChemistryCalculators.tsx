import React, { useState } from 'react';
import { Droplet, TestTube, Beaker, FlaskRound, MapPin } from 'lucide-react';
import CalculatorCard from './CalculatorCard';

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

const WATER_PROFILES: WaterProfile[] = [
  {
    name: 'Pilsen',
    location: 'Czech Republic',
    calcium: 7,
    magnesium: 2,
    sodium: 2,
    sulfate: 5,
    chloride: 5,
    bicarbonate: 15,
    description: 'Very soft water, ideal for Pilsners and light lagers'
  },
  {
    name: 'Burton on Trent',
    location: 'England',
    calcium: 295,
    magnesium: 45,
    sodium: 55,
    sulfate: 725,
    chloride: 25,
    bicarbonate: 300,
    description: 'Hard water with high sulfate, perfect for IPAs and pale ales'
  },
  {
    name: 'Dublin',
    location: 'Ireland',
    calcium: 115,
    magnesium: 4,
    sodium: 12,
    sulfate: 55,
    chloride: 19,
    bicarbonate: 319,
    description: 'High bicarbonate, excellent for stouts and dark beers'
  },
  {
    name: 'Dortmund',
    location: 'Germany',
    calcium: 225,
    magnesium: 40,
    sodium: 60,
    sulfate: 120,
    chloride: 60,
    bicarbonate: 220,
    description: 'Moderately hard water, great for export lagers'
  },
  {
    name: 'Munich',
    location: 'Germany',
    calcium: 75,
    magnesium: 18,
    sodium: 2,
    sulfate: 10,
    chloride: 2,
    bicarbonate: 150,
    description: 'Moderately soft with carbonate, ideal for Dunkel and Märzen'
  },
  {
    name: 'Vienna',
    location: 'Austria',
    calcium: 200,
    magnesium: 60,
    sodium: 8,
    sulfate: 125,
    chloride: 12,
    bicarbonate: 120,
    description: 'Moderate hardness, suited for Vienna lagers and Amber beers'
  },
  {
    name: 'London',
    location: 'England',
    calcium: 90,
    magnesium: 4,
    sodium: 20,
    sulfate: 40,
    chloride: 40,
    bicarbonate: 104,
    description: 'Balanced profile, good for bitters and milds'
  },
  {
    name: 'Edinburgh',
    location: 'Scotland',
    calcium: 125,
    magnesium: 25,
    sodium: 55,
    sulfate: 140,
    chloride: 65,
    bicarbonate: 225,
    description: 'Well-suited for Scottish ales and strong ales'
  }
];

interface pHAdjustmentInputs {
  currentPH: string;
  targetPH: string;
  volume: string;
  acidType: 'lactic' | 'phosphoric' | 'sulfuric';
}

interface SaltAdditionInputs {
  volume: string;
  calciumTarget: string;
  magnesiumTarget: string;
  sulfateTarget: string;
  chlorideTarget: string;
}

interface AlkalinityInputs {
  volume: string;
  currentAlkalinity: string;
  targetAlkalinity: string;
}

interface WaterBlendingInputs {
  volume1: string;
  calcium1: string;
  magnesium1: string;
  volume2: string;
  calcium2: string;
  magnesium2: string;
}

function WaterChemistryCalculators() {
  const [pHInputs, setPHInputs] = useState<pHAdjustmentInputs>({
    currentPH: '',
    targetPH: '',
    volume: '',
    acidType: 'lactic'
  });

  const [saltInputs, setSaltInputs] = useState<SaltAdditionInputs>({
    volume: '',
    calciumTarget: '',
    magnesiumTarget: '',
    sulfateTarget: '',
    chlorideTarget: ''
  });

  const [alkalinityInputs, setAlkalinityInputs] = useState<AlkalinityInputs>({
    volume: '',
    currentAlkalinity: '',
    targetAlkalinity: ''
  });

  const [blendingInputs, setBlendingInputs] = useState<WaterBlendingInputs>({
    volume1: '',
    calcium1: '',
    magnesium1: '',
    volume2: '',
    calcium2: '',
    magnesium2: ''
  });

  // pH Adjustment Calculator
  const calculateAcidAddition = (): string => {
    const current = parseFloat(pHInputs.currentPH);
    const target = parseFloat(pHInputs.targetPH);
    const volume = parseFloat(pHInputs.volume);
    
    if (isNaN(current) || isNaN(target) || isNaN(volume) || target >= current) return '';
    
    const pHDifference = current - target;
    let acidStrength = 0.88; // Default for lactic acid
    
    switch (pHInputs.acidType) {
      case 'phosphoric':
        acidStrength = 0.85;
        break;
      case 'sulfuric':
        acidStrength = 0.96;
        break;
    }
    
    // Simplified calculation - actual brewing software uses more complex buffering equations
    const acidNeeded = (pHDifference * volume * 0.1) / acidStrength;
    return acidNeeded.toFixed(2);
  };

  // Salt Addition Calculator (simplified)
  const calculateSaltAdditions = (): { gypsum: string; epsom: string; caCl2: string } => {
    const volume = parseFloat(saltInputs.volume);
    const caTarget = parseFloat(saltInputs.calciumTarget);
    const mgTarget = parseFloat(saltInputs.magnesiumTarget);
    const so4Target = parseFloat(saltInputs.sulfateTarget);
    const clTarget = parseFloat(saltInputs.chlorideTarget);
    
    if (isNaN(volume) || volume <= 0) {
      return { gypsum: '', epsom: '', caCl2: '' };
    }
    
    // Simplified calculations for common brewing salts
    const gypsum = isNaN(so4Target) ? 0 : (so4Target * volume * 0.00172); // CaSO4·2H2O
    const epsom = isNaN(mgTarget) ? 0 : (mgTarget * volume * 0.00406); // MgSO4·7H2O
    const caCl2 = isNaN(clTarget) ? 0 : (clTarget * volume * 0.00158); // CaCl2·2H2O
    
    return {
      gypsum: gypsum > 0 ? gypsum.toFixed(2) : '',
      epsom: epsom > 0 ? epsom.toFixed(2) : '',
      caCl2: caCl2 > 0 ? caCl2.toFixed(2) : ''
    };
  };

  // Alkalinity Adjustment
  const calculateAlkalinityAdjustment = (): string => {
    const volume = parseFloat(alkalinityInputs.volume);
    const current = parseFloat(alkalinityInputs.currentAlkalinity);
    const target = parseFloat(alkalinityInputs.targetAlkalinity);
    
    if (isNaN(volume) || isNaN(current) || isNaN(target) || target >= current) return '';
    
    const alkDifference = current - target;
    // Simplified calculation for acid needed to reduce alkalinity
    const acidNeeded = (alkDifference * volume * 0.05);
    return acidNeeded.toFixed(2);
  };

  // Water Blending Calculator
  const calculateBlending = (): { calcium: string; magnesium: string; ratio: string } => {
    const vol1 = parseFloat(blendingInputs.volume1);
    const ca1 = parseFloat(blendingInputs.calcium1);
    const mg1 = parseFloat(blendingInputs.magnesium1);
    const vol2 = parseFloat(blendingInputs.volume2);
    const ca2 = parseFloat(blendingInputs.calcium2);
    const mg2 = parseFloat(blendingInputs.magnesium2);
    
    if (isNaN(vol1) || isNaN(vol2) || vol1 <= 0 || vol2 <= 0) {
      return { calcium: '', magnesium: '', ratio: '' };
    }
    
    const totalVolume = vol1 + vol2;
    const blendedCa = ((ca1 * vol1) + (ca2 * vol2)) / totalVolume;
    const blendedMg = ((mg1 * vol1) + (mg2 * vol2)) / totalVolume;
    const ratio = `${((vol1 / totalVolume) * 100).toFixed(1)}:${((vol2 / totalVolume) * 100).toFixed(1)}`;
    
    return {
      calcium: isNaN(blendedCa) ? '' : blendedCa.toFixed(1),
      magnesium: isNaN(blendedMg) ? '' : blendedMg.toFixed(1),
      ratio: ratio
    };
  };

  const saltResults = calculateSaltAdditions();
  const blendingResults = calculateBlending();

  return (
    <div className="space-y-8">
      {/* Water Profiles Section */}
      <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Classic Water Profiles</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Famous brewing water profiles from around the world. Use these as reference for crafting traditional beer styles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {WATER_PROFILES.map((profile) => (
            <div
              key={profile.name}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-gray-200"
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-800">{profile.name}</h3>
                <p className="text-sm text-gray-500">{profile.location}</p>
              </div>
              <p className="text-sm text-gray-600 mb-4 min-h-[40px]">{profile.description}</p>
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 rounded px-2 py-1">
                    <span className="font-medium text-gray-700">Ca</span>
                    <span className="text-gray-600 ml-1">{profile.calcium} ppm</span>
                  </div>
                  <div className="bg-green-50 rounded px-2 py-1">
                    <span className="font-medium text-gray-700">Mg</span>
                    <span className="text-gray-600 ml-1">{profile.magnesium} ppm</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-yellow-50 rounded px-2 py-1">
                    <span className="font-medium text-gray-700">Na</span>
                    <span className="text-gray-600 ml-1">{profile.sodium} ppm</span>
                  </div>
                  <div className="bg-orange-50 rounded px-2 py-1">
                    <span className="font-medium text-gray-700">SO₄</span>
                    <span className="text-gray-600 ml-1">{profile.sulfate} ppm</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-teal-50 rounded px-2 py-1">
                    <span className="font-medium text-gray-700">Cl</span>
                    <span className="text-gray-600 ml-1">{profile.chloride} ppm</span>
                  </div>
                  <div className="bg-slate-50 rounded px-2 py-1">
                    <span className="font-medium text-gray-700">HCO₃</span>
                    <span className="text-gray-600 ml-1">{profile.bicarbonate} ppm</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* pH Adjustment Calculator */}
        <CalculatorCard
        title="pH Adjustment"
        description="Calculate acid additions to adjust mash pH"
        icon={<TestTube className="w-6 h-6 text-blue-600" />}
        result={calculateAcidAddition() ? `Add ${calculateAcidAddition()} mL of ${pHInputs.acidType} acid` : ''}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current pH
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="7.0"
              value={pHInputs.currentPH}
              onChange={(e) => setPHInputs(prev => ({ ...prev, currentPH: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target pH
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="5.4"
              value={pHInputs.targetPH}
              onChange={(e) => setPHInputs(prev => ({ ...prev, targetPH: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Volume (L)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="20"
              value={pHInputs.volume}
              onChange={(e) => setPHInputs(prev => ({ ...prev, volume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Acid Type
            </label>
            <select
              value={pHInputs.acidType}
              onChange={(e) => setPHInputs(prev => ({ ...prev, acidType: e.target.value as 'lactic' | 'phosphoric' | 'sulfuric' }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="lactic">Lactic Acid (88%)</option>
              <option value="phosphoric">Phosphoric Acid (85%)</option>
              <option value="sulfuric">Sulfuric Acid (96%)</option>
            </select>
          </div>
        </div>
      </CalculatorCard>

      {/* Salt Addition Calculator */}
      <CalculatorCard
        title="Salt Additions"
        description="Calculate brewing salt additions for water treatment"
        icon={<Beaker className="w-6 h-6 text-blue-600" />}
        result={saltResults.gypsum || saltResults.epsom || saltResults.caCl2 ? (
          <div className="space-y-1">
            {saltResults.gypsum && <div>Gypsum: {saltResults.gypsum} g</div>}
            {saltResults.epsom && <div>Epsom Salt: {saltResults.epsom} g</div>}
            {saltResults.caCl2 && <div>Calcium Chloride: {saltResults.caCl2} g</div>}
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Volume (L)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="20"
              value={saltInputs.volume}
              onChange={(e) => setSaltInputs(prev => ({ ...prev, volume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Calcium (ppm)
            </label>
            <input
              type="number"
              step="1"
              placeholder="150"
              value={saltInputs.calciumTarget}
              onChange={(e) => setSaltInputs(prev => ({ ...prev, calciumTarget: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Sulfate (ppm)
            </label>
            <input
              type="number"
              step="1"
              placeholder="300"
              value={saltInputs.sulfateTarget}
              onChange={(e) => setSaltInputs(prev => ({ ...prev, sulfateTarget: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Chloride (ppm)
            </label>
            <input
              type="number"
              step="1"
              placeholder="150"
              value={saltInputs.chlorideTarget}
              onChange={(e) => setSaltInputs(prev => ({ ...prev, chlorideTarget: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Alkalinity Adjustment */}
      <CalculatorCard
        title="Alkalinity Adjustment"
        description="Calculate acid needed to reduce water alkalinity"
        icon={<Droplet className="w-6 h-6 text-blue-600" />}
        result={calculateAlkalinityAdjustment() ? `Add ${calculateAlkalinityAdjustment()} mL acid` : ''}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Volume (L)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="20"
              value={alkalinityInputs.volume}
              onChange={(e) => setAlkalinityInputs(prev => ({ ...prev, volume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Alkalinity (ppm CaCO₃)
            </label>
            <input
              type="number"
              step="1"
              placeholder="200"
              value={alkalinityInputs.currentAlkalinity}
              onChange={(e) => setAlkalinityInputs(prev => ({ ...prev, currentAlkalinity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Alkalinity (ppm CaCO₃)
            </label>
            <input
              type="number"
              step="1"
              placeholder="50"
              value={alkalinityInputs.targetAlkalinity}
              onChange={(e) => setAlkalinityInputs(prev => ({ ...prev, targetAlkalinity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Water Blending Calculator */}
      <CalculatorCard
        title="Water Blending"
        description="Calculate mineral content when blending two water sources"
        icon={<FlaskRound className="w-6 h-6 text-blue-600" />}
        result={blendingResults.calcium ? (
          <div className="space-y-1">
            <div>Blended Ca: {blendingResults.calcium} ppm</div>
            <div>Blended Mg: {blendingResults.magnesium} ppm</div>
            <div>Ratio: {blendingResults.ratio}%</div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water 1 Volume (L)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="10"
                value={blendingInputs.volume1}
                onChange={(e) => setBlendingInputs(prev => ({ ...prev, volume1: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water 2 Volume (L)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="10"
                value={blendingInputs.volume2}
                onChange={(e) => setBlendingInputs(prev => ({ ...prev, volume2: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water 1 Ca (ppm)
              </label>
              <input
                type="number"
                step="1"
                placeholder="100"
                value={blendingInputs.calcium1}
                onChange={(e) => setBlendingInputs(prev => ({ ...prev, calcium1: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water 2 Ca (ppm)
              </label>
              <input
                type="number"
                step="1"
                placeholder="200"
                value={blendingInputs.calcium2}
                onChange={(e) => setBlendingInputs(prev => ({ ...prev, calcium2: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water 1 Mg (ppm)
              </label>
              <input
                type="number"
                step="1"
                placeholder="20"
                value={blendingInputs.magnesium1}
                onChange={(e) => setBlendingInputs(prev => ({ ...prev, magnesium1: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water 2 Mg (ppm)
              </label>
              <input
                type="number"
                step="1"
                placeholder="40"
                value={blendingInputs.magnesium2}
                onChange={(e) => setBlendingInputs(prev => ({ ...prev, magnesium2: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </CalculatorCard>
      </div>
    </div>
  );
}

export default WaterChemistryCalculators;