import React, { useState } from 'react';
import { Calculator, Beaker, Thermometer, Droplets, Scale, Clock } from 'lucide-react';
import CalculatorCard from './CalculatorCard';
import { useUserSettings } from '../hooks/useUserSettings';

interface ABVInputs {
  originalGravity: string;
  finalGravity: string;
}

interface GravityInputs {
  grainWeight: string;
  grainPotential: string;
  batchSize: string;
  efficiency: string;
}

interface DilutionInputs {
  currentVolume: string;
  currentABV: string;
  targetABV: string;
}

interface BoilOffInputs {
  preBoilVolume: string;
  boilTime: string;
  evaporationRate: string;
}

interface PrimingInputs {
  beerVolume: string;
  targetCO2: string;
  temperature: string;
  sugarType: 'corn' | 'table' | 'dme';
}

interface HydrometerInputs {
  observedGravity: string;
  observedTemp: string;
  calibrationTemp: string;
}

function BrewingCalculators() {
  const { settings, getVolumeUnit, getWeightUnit, getTemperatureUnit, convertTemperature, formatNumber } = useUserSettings();
  
  const [abvInputs, setABVInputs] = useState<ABVInputs>({
    originalGravity: '',
    finalGravity: ''
  });

  const [gravityInputs, setGravityInputs] = useState<GravityInputs>({
    grainWeight: '',
    grainPotential: '',
    batchSize: settings?.defaultValues?.batchSize?.toString() || '20',
    efficiency: settings?.defaultValues?.efficiency?.toString() || '75'
  });

  const [dilutionInputs, setDilutionInputs] = useState<DilutionInputs>({
    currentVolume: '',
    currentABV: '',
    targetABV: ''
  });

  const [boilOffInputs, setBoilOffInputs] = useState<BoilOffInputs>({
    preBoilVolume: '',
    boilTime: settings?.defaultValues?.boilTime?.toString() || '60',
    evaporationRate: '10'
  });

  const [primingInputs, setPrimingInputs] = useState<PrimingInputs>({
    beerVolume: '',
    targetCO2: '2.4',
    temperature: settings?.defaultValues?.fermentationTemp?.toString() || '20',
    sugarType: 'corn'
  });

  const [hydrometerInputs, setHydrometerInputs] = useState<HydrometerInputs>({
    observedGravity: '',
    observedTemp: '',
    calibrationTemp: '20'
  });

  // Update default values when settings change
  React.useEffect(() => {
    if (settings?.defaultValues) {
      setGravityInputs(prev => ({
        ...prev,
        batchSize: prev.batchSize || settings.defaultValues.batchSize.toString(),
        efficiency: prev.efficiency || settings.defaultValues.efficiency.toString()
      }));
      setBoilOffInputs(prev => ({
        ...prev,
        boilTime: prev.boilTime || settings.defaultValues.boilTime.toString()
      }));
      setPrimingInputs(prev => ({
        ...prev,
        temperature: prev.temperature || settings.defaultValues.fermentationTemp.toString()
      }));
    }
  }, [settings?.defaultValues]);

  // ABV Calculator
  const calculateABV = (): string => {
    const og = parseFloat(abvInputs.originalGravity);
    const fg = parseFloat(abvInputs.finalGravity);
    if (isNaN(og) || isNaN(fg) || og <= fg) return '';
    
    const abv = (og - fg) * 131.25;
    return formatNumber(abv, 1);
  };

  // Original Gravity Calculator
  const calculateOriginalGravity = (): string => {
    const weight = parseFloat(gravityInputs.grainWeight);
    const potential = parseFloat(gravityInputs.grainPotential);
    const volume = parseFloat(gravityInputs.batchSize);
    const efficiency = parseFloat(gravityInputs.efficiency);
    
    if (isNaN(weight) || isNaN(potential) || isNaN(volume) || isNaN(efficiency)) return '';
    
    const points = (weight * potential * efficiency / 100) / volume;
    const og = 1 + (points / 1000);
    return formatNumber(og, 3);
  };

  // Dilution Calculator
  const calculateDilution = (): string => {
    const currentVol = parseFloat(dilutionInputs.currentVolume);
    const currentABV = parseFloat(dilutionInputs.currentABV);
    const targetABV = parseFloat(dilutionInputs.targetABV);
    
    if (isNaN(currentVol) || isNaN(currentABV) || isNaN(targetABV) || targetABV >= currentABV) return '';
    
    const waterNeeded = currentVol * ((currentABV - targetABV) / targetABV);
    return `Add ${formatNumber(waterNeeded, 1)} ${getVolumeUnit()} of water`;
  };

  // Boil-off Calculator
  const calculateBoilOff = (): string => {
    const preBoil = parseFloat(boilOffInputs.preBoilVolume);
    const time = parseFloat(boilOffInputs.boilTime);
    const rate = parseFloat(boilOffInputs.evaporationRate);
    
    if (isNaN(preBoil) || isNaN(time) || isNaN(rate)) return '';
    
    const evaporated = preBoil * (rate / 100) * (time / 60);
    const postBoil = preBoil - evaporated;
    return `${formatNumber(postBoil, 1)} ${getVolumeUnit()} (${formatNumber(evaporated, 1)} ${getVolumeUnit()} evaporated)`;
  };

  // Priming Sugar Calculator
  const calculatePriming = (): string => {
    const volume = parseFloat(primingInputs.beerVolume);
    const co2 = parseFloat(primingInputs.targetCO2);
    const temp = parseFloat(primingInputs.temperature);
    
    if (isNaN(volume) || isNaN(co2) || isNaN(temp)) return '';
    
    // Convert temperature if needed
    const tempC = settings?.units?.temperature === 'fahrenheit' ? 
      convertTemperature(temp, 'fahrenheit') : temp;
    
    // Residual CO2 calculation
    const residualCO2 = 3.0378 - (0.050062 * tempC) + (0.00026555 * tempC * tempC);
    const neededCO2 = co2 - residualCO2;
    
    if (neededCO2 <= 0) return 'No priming sugar needed';
    
    // Sugar calculations (grams per liter)
    let sugarPerLiter = 0;
    switch (primingInputs.sugarType) {
      case 'corn':
        sugarPerLiter = neededCO2 * 3.57;
        break;
      case 'table':
        sugarPerLiter = neededCO2 * 4.0;
        break;
      case 'dme':
        sugarPerLiter = neededCO2 * 4.5;
        break;
    }
    
    const totalSugar = sugarPerLiter * volume;
    const sugarName = primingInputs.sugarType === 'corn' ? 'corn sugar' : 
                     primingInputs.sugarType === 'table' ? 'table sugar' : 'DME';
    
    return `${formatNumber(totalSugar, 1)} ${getWeightUnit()} of ${sugarName}`;
  };

  // Hydrometer Temperature Correction
  const calculateHydrometerCorrection = (): string => {
    const observed = parseFloat(hydrometerInputs.observedGravity);
    const obsTemp = parseFloat(hydrometerInputs.observedTemp);
    const calTemp = parseFloat(hydrometerInputs.calibrationTemp);
    
    if (isNaN(observed) || isNaN(obsTemp) || isNaN(calTemp)) return '';
    
    // Convert temperatures if needed
    const obsTempC = settings?.units?.temperature === 'fahrenheit' ? 
      convertTemperature(obsTemp, 'fahrenheit') : obsTemp;
    const calTempC = settings?.units?.temperature === 'fahrenheit' ? 
      convertTemperature(calTemp, 'fahrenheit') : calTemp;
    
    // Temperature correction formula
    const correction = 1.00130346 - (0.000134722124 * obsTempC) + (0.00000204052596 * obsTempC * obsTempC) - (0.00000000232820948 * obsTempC * obsTempC * obsTempC);
    const correctedGravity = observed * correction / (1.00130346 - (0.000134722124 * calTempC) + (0.00000204052596 * calTempC * calTempC) - (0.00000000232820948 * calTempC * calTempC * calTempC));
    
    return formatNumber(correctedGravity, 3);
  };

  const showAdvanced = settings?.display?.showAdvancedCalculators !== false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* ABV Calculator */}
      <CalculatorCard
        title="ABV Calculator"
        description="Calculate alcohol by volume from gravity readings"
        icon={<Calculator className="w-6 h-6 text-amber-600" />}
        result={calculateABV() ? `${calculateABV()}% ABV` : ''}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Gravity (OG)
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.050"
              value={abvInputs.originalGravity}
              onChange={(e) => setABVInputs(prev => ({ ...prev, originalGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Final Gravity (FG)
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.010"
              value={abvInputs.finalGravity}
              onChange={(e) => setABVInputs(prev => ({ ...prev, finalGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Original Gravity Calculator */}
      <CalculatorCard
        title="Original Gravity"
        description="Calculate expected OG from grain bill"
        icon={<Scale className="w-6 h-6 text-amber-600" />}
        result={calculateOriginalGravity() ? `OG: ${calculateOriginalGravity()}` : ''}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grain Weight ({getWeightUnit()})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="5000"
              value={gravityInputs.grainWeight}
              onChange={(e) => setGravityInputs(prev => ({ ...prev, grainWeight: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grain Potential (points/pound/gallon)
            </label>
            <input
              type="number"
              step="1"
              placeholder="37"
              value={gravityInputs.grainPotential}
              onChange={(e) => setGravityInputs(prev => ({ ...prev, grainPotential: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Size ({getVolumeUnit()})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="20"
              value={gravityInputs.batchSize}
              onChange={(e) => setGravityInputs(prev => ({ ...prev, batchSize: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Efficiency (%)
            </label>
            <input
              type="number"
              step="1"
              placeholder="75"
              value={gravityInputs.efficiency}
              onChange={(e) => setGravityInputs(prev => ({ ...prev, efficiency: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Dilution Calculator */}
      <CalculatorCard
        title="Dilution Calculator"
        description="Calculate water needed to reduce ABV"
        icon={<Droplets className="w-6 h-6 text-amber-600" />}
        result={calculateDilution()}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Volume ({getVolumeUnit()})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="20"
              value={dilutionInputs.currentVolume}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, currentVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current ABV (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="6.5"
              value={dilutionInputs.currentABV}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, currentABV: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target ABV (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="5.0"
              value={dilutionInputs.targetABV}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, targetABV: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Boil-off Calculator */}
      {showAdvanced && (
        <CalculatorCard
          title="Boil-off Calculator"
          description="Calculate post-boil volume"
          icon={<Clock className="w-6 h-6 text-amber-600" />}
          result={calculateBoilOff()}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pre-boil Volume ({getVolumeUnit()})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="25"
                value={boilOffInputs.preBoilVolume}
                onChange={(e) => setBoilOffInputs(prev => ({ ...prev, preBoilVolume: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Boil Time (minutes)
              </label>
              <input
                type="number"
                step="5"
                placeholder="60"
                value={boilOffInputs.boilTime}
                onChange={(e) => setBoilOffInputs(prev => ({ ...prev, boilTime: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evaporation Rate (%/hour)
              </label>
              <input
                type="number"
                step="1"
                placeholder="10"
                value={boilOffInputs.evaporationRate}
                onChange={(e) => setBoilOffInputs(prev => ({ ...prev, evaporationRate: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </CalculatorCard>
      )}

      {/* Priming Sugar Calculator */}
      {showAdvanced && (
        <CalculatorCard
          title="Priming Sugar"
          description="Calculate priming sugar for carbonation"
          icon={<Beaker className="w-6 h-6 text-amber-600" />}
          result={calculatePriming()}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beer Volume ({getVolumeUnit()})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="20"
                value={primingInputs.beerVolume}
                onChange={(e) => setPrimingInputs(prev => ({ ...prev, beerVolume: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target CO₂ (volumes)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="2.4"
                value={primingInputs.targetCO2}
                onChange={(e) => setPrimingInputs(prev => ({ ...prev, targetCO2: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature ({getTemperatureUnit()})
              </label>
              <input
                type="number"
                step="1"
                placeholder="20"
                value={primingInputs.temperature}
                onChange={(e) => setPrimingInputs(prev => ({ ...prev, temperature: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sugar Type
              </label>
              <select
                value={primingInputs.sugarType}
                onChange={(e) => setPrimingInputs(prev => ({ ...prev, sugarType: e.target.value as 'corn' | 'table' | 'dme' }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              >
                <option value="corn">Corn Sugar (Dextrose)</option>
                <option value="table">Table Sugar (Sucrose)</option>
                <option value="dme">Dry Malt Extract</option>
              </select>
            </div>
          </div>
        </CalculatorCard>
      )}

      {/* Hydrometer Temperature Correction */}
      {showAdvanced && (
        <CalculatorCard
          title="Hydrometer Correction"
          description="Temperature correction for hydrometer readings"
          icon={<Thermometer className="w-6 h-6 text-amber-600" />}
          result={calculateHydrometerCorrection() ? `Corrected: ${calculateHydrometerCorrection()}` : ''}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observed Gravity
              </label>
              <input
                type="number"
                step="0.001"
                placeholder="1.050"
                value={hydrometerInputs.observedGravity}
                onChange={(e) => setHydrometerInputs(prev => ({ ...prev, observedGravity: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sample Temperature ({getTemperatureUnit()})
              </label>
              <input
                type="number"
                step="1"
                placeholder="25"
                value={hydrometerInputs.observedTemp}
                onChange={(e) => setHydrometerInputs(prev => ({ ...prev, observedTemp: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calibration Temperature ({getTemperatureUnit()})
              </label>
              <input
                type="number"
                step="1"
                placeholder="20"
                value={hydrometerInputs.calibrationTemp}
                onChange={(e) => setHydrometerInputs(prev => ({ ...prev, calibrationTemp: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </CalculatorCard>
      )}
    </div>
  );
}

export default BrewingCalculators;