import React, { useState } from 'react';
import { FlaskConical, Thermometer, Droplets, Calculator, Gauge, Beaker } from 'lucide-react';
import CalculatorCard from './CalculatorCard';
import { useUserSettings } from '../hooks/useUserSettings';

interface ProofInputs {
  abv: string;
}

interface DilutionInputs {
  currentVolume: string;
  currentProof: string;
  targetProof: string;
}

interface YieldInputs {
  mashVolume: string;
  mashABV: string;
  cutStart: string;
  cutEnd: string;
}

interface BlendingInputs {
  volume1: string;
  proof1: string;
  volume2: string;
  proof2: string;
}

interface HeadsAndTailsInputs {
  totalVolume: string;
  headsPercent: string;
  tailsPercent: string;
}

interface SpiritYieldInputs {
  grainWeight: string;
  grainType: 'corn' | 'wheat' | 'rye' | 'barley';
  efficiency: string;
}

function DistillationCalculators() {
  const { settings, getVolumeUnit, getWeightUnit, formatNumber } = useUserSettings();
  
  const [proofInputs, setProofInputs] = useState<ProofInputs>({
    abv: ''
  });

  const [dilutionInputs, setDilutionInputs] = useState<DilutionInputs>({
    currentVolume: '',
    currentProof: '',
    targetProof: ''
  });

  const [yieldInputs, setYieldInputs] = useState<YieldInputs>({
    mashVolume: '',
    mashABV: '',
    cutStart: '78',
    cutEnd: '60'
  });

  const [blendingInputs, setBlendingInputs] = useState<BlendingInputs>({
    volume1: '',
    proof1: '',
    volume2: '',
    proof2: ''
  });

  const [headsAndTailsInputs, setHeadsAndTailsInputs] = useState<HeadsAndTailsInputs>({
    totalVolume: '',
    headsPercent: '5',
    tailsPercent: '15'
  });

  const [spiritYieldInputs, setSpiritYieldInputs] = useState<SpiritYieldInputs>({
    grainWeight: '',
    grainType: 'corn',
    efficiency: '85'
  });

  // Proof to ABV and vice versa
  const calculateProofConversion = (): { proof: string; abv: string } => {
    const abv = parseFloat(proofInputs.abv);
    if (isNaN(abv)) return { proof: '', abv: '' };
    
    const proof = abv * 2;
    return {
      proof: formatNumber(proof, 1),
      abv: formatNumber(abv, 1)
    };
  };

  // Dilution Calculator
  const calculateDilution = (): string => {
    const currentVol = parseFloat(dilutionInputs.currentVolume);
    const currentProof = parseFloat(dilutionInputs.currentProof);
    const targetProof = parseFloat(dilutionInputs.targetProof);
    
    if (isNaN(currentVol) || isNaN(currentProof) || isNaN(targetProof) || targetProof >= currentProof) return '';
    
    const waterNeeded = currentVol * ((currentProof - targetProof) / targetProof);
    const finalVolume = currentVol + waterNeeded;
    
    return `Add ${formatNumber(waterNeeded, 2)} ${getVolumeUnit()} water (Final: ${formatNumber(finalVolume, 2)} ${getVolumeUnit()})`;
  };

  // Distillation Yield Calculator
  const calculateYield = (): string => {
    const mashVol = parseFloat(yieldInputs.mashVolume);
    const mashABV = parseFloat(yieldInputs.mashABV);
    const cutStart = parseFloat(yieldInputs.cutStart);
    const cutEnd = parseFloat(yieldInputs.cutEnd);
    
    if (isNaN(mashVol) || isNaN(mashABV) || isNaN(cutStart) || isNaN(cutEnd)) return '';
    
    // Simplified yield calculation
    const alcoholVolume = mashVol * (mashABV / 100);
    const avgCutStrength = (cutStart + cutEnd) / 2;
    const estimatedYield = alcoholVolume * (avgCutStrength / 100) * 2; // Rough approximation
    
    return `~${formatNumber(estimatedYield, 1)} ${getVolumeUnit()} at ${formatNumber(avgCutStrength, 1)}% ABV`;
  };

  // Spirit Blending Calculator
  const calculateBlending = (): string => {
    const vol1 = parseFloat(blendingInputs.volume1);
    const proof1 = parseFloat(blendingInputs.proof1);
    const vol2 = parseFloat(blendingInputs.volume2);
    const proof2 = parseFloat(blendingInputs.proof2);
    
    if (isNaN(vol1) || isNaN(proof1) || isNaN(vol2) || isNaN(proof2)) return '';
    
    const totalVolume = vol1 + vol2;
    const totalAlcohol = (vol1 * proof1) + (vol2 * proof2);
    const blendedProof = totalAlcohol / totalVolume;
    
    return `${formatNumber(totalVolume, 1)} ${getVolumeUnit()} at ${formatNumber(blendedProof, 1)} proof (${formatNumber(blendedProof / 2, 1)}% ABV)`;
  };

  // Heads and Tails Calculator
  const calculateHeadsAndTails = (): { heads: string; hearts: string; tails: string } => {
    const totalVol = parseFloat(headsAndTailsInputs.totalVolume);
    const headsPercent = parseFloat(headsAndTailsInputs.headsPercent);
    const tailsPercent = parseFloat(headsAndTailsInputs.tailsPercent);
    
    if (isNaN(totalVol) || isNaN(headsPercent) || isNaN(tailsPercent)) {
      return { heads: '', hearts: '', tails: '' };
    }
    
    const headsVol = totalVol * (headsPercent / 100);
    const tailsVol = totalVol * (tailsPercent / 100);
    const heartsVol = totalVol - headsVol - tailsVol;
    
    return {
      heads: formatNumber(headsVol, 2),
      hearts: formatNumber(heartsVol, 2),
      tails: formatNumber(tailsVol, 2)
    };
  };

  // Spirit Yield from Grain
  const calculateSpiritYield = (): string => {
    const grainWeight = parseFloat(spiritYieldInputs.grainWeight);
    const efficiency = parseFloat(spiritYieldInputs.efficiency);
    
    if (isNaN(grainWeight) || isNaN(efficiency)) return '';
    
    // Theoretical alcohol yield by grain type (liters per kg)
    const yieldRates = {
      corn: 0.47,
      wheat: 0.43,
      rye: 0.40,
      barley: 0.38
    };
    
    const theoreticalYield = grainWeight * yieldRates[spiritYieldInputs.grainType];
    const actualYield = theoreticalYield * (efficiency / 100);
    
    return `~${formatNumber(actualYield, 1)} ${getVolumeUnit()} of pure alcohol`;
  };

  const proofConversion = calculateProofConversion();
  const headsAndTails = calculateHeadsAndTails();
  const showAdvanced = settings?.display?.showAdvancedCalculators !== false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Proof/ABV Converter */}
      <CalculatorCard
        title="Proof ↔ ABV Converter"
        description="Convert between proof and ABV"
        icon={<Calculator className="w-6 h-6 text-orange-600" />}
        result={proofConversion.proof ? (
          <div className="space-y-1">
            <div>{proofConversion.abv}% ABV</div>
            <div>{proofConversion.proof} Proof</div>
          </div>
        ) : ''}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ABV (%)
          </label>
          <input
            type="number"
            step="0.1"
            placeholder="40.0"
            value={proofInputs.abv}
            onChange={(e) => setProofInputs({ abv: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>
      </CalculatorCard>

      {/* Dilution Calculator */}
      <CalculatorCard
        title="Dilution Calculator"
        description="Calculate water needed to reduce proof"
        icon={<Droplets className="w-6 h-6 text-orange-600" />}
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
              placeholder="10"
              value={dilutionInputs.currentVolume}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, currentVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Proof
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="120"
              value={dilutionInputs.currentProof}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, currentProof: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Proof
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="80"
              value={dilutionInputs.targetProof}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, targetProof: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Distillation Yield */}
      <CalculatorCard
        title="Distillation Yield"
        description="Estimate distillation output"
        icon={<FlaskConical className="w-6 h-6 text-orange-600" />}
        result={calculateYield()}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mash Volume ({getVolumeUnit()})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="100"
              value={yieldInputs.mashVolume}
              onChange={(e) => setYieldInputs(prev => ({ ...prev, mashVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mash ABV (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="8.0"
              value={yieldInputs.mashABV}
              onChange={(e) => setYieldInputs(prev => ({ ...prev, mashABV: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cut Start (% ABV)
              </label>
              <input
                type="number"
                step="1"
                placeholder="78"
                value={yieldInputs.cutStart}
                onChange={(e) => setYieldInputs(prev => ({ ...prev, cutStart: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cut End (% ABV)
              </label>
              <input
                type="number"
                step="1"
                placeholder="60"
                value={yieldInputs.cutEnd}
                onChange={(e) => setYieldInputs(prev => ({ ...prev, cutEnd: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Spirit Blending */}
      {showAdvanced && (
        <CalculatorCard
          title="Spirit Blending"
          description="Calculate blended spirit strength"
          icon={<Beaker className="w-6 h-6 text-orange-600" />}
          result={calculateBlending()}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume 1 ({getVolumeUnit()})
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="5"
                  value={blendingInputs.volume1}
                  onChange={(e) => setBlendingInputs(prev => ({ ...prev, volume1: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proof 1
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="120"
                  value={blendingInputs.proof1}
                  onChange={(e) => setBlendingInputs(prev => ({ ...prev, proof1: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume 2 ({getVolumeUnit()})
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="5"
                  value={blendingInputs.volume2}
                  onChange={(e) => setBlendingInputs(prev => ({ ...prev, volume2: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proof 2
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="80"
                  value={blendingInputs.proof2}
                  onChange={(e) => setBlendingInputs(prev => ({ ...prev, proof2: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </CalculatorCard>
      )}

      {/* Heads and Tails Calculator */}
      {showAdvanced && (
        <CalculatorCard
          title="Heads & Tails"
          description="Calculate cut volumes"
          icon={<Gauge className="w-6 h-6 text-orange-600" />}
          result={headsAndTails.heads ? (
            <div className="space-y-1">
              <div>Heads: {headsAndTails.heads} {getVolumeUnit()}</div>
              <div>Hearts: {headsAndTails.hearts} {getVolumeUnit()}</div>
              <div>Tails: {headsAndTails.tails} {getVolumeUnit()}</div>
            </div>
          ) : ''}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Run Volume ({getVolumeUnit()})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="20"
                value={headsAndTailsInputs.totalVolume}
                onChange={(e) => setHeadsAndTailsInputs(prev => ({ ...prev, totalVolume: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heads (%)
                </label>
                <input
                  type="number"
                  step="1"
                  placeholder="5"
                  value={headsAndTailsInputs.headsPercent}
                  onChange={(e) => setHeadsAndTailsInputs(prev => ({ ...prev, headsPercent: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tails (%)
                </label>
                <input
                  type="number"
                  step="1"
                  placeholder="15"
                  value={headsAndTailsInputs.tailsPercent}
                  onChange={(e) => setHeadsAndTailsInputs(prev => ({ ...prev, tailsPercent: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </CalculatorCard>
      )}

      {/* Spirit Yield from Grain */}
      {showAdvanced && (
        <CalculatorCard
          title="Grain to Spirit Yield"
          description="Estimate alcohol yield from grain"
          icon={<Thermometer className="w-6 h-6 text-orange-600" />}
          result={calculateSpiritYield()}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grain Weight ({getWeightUnit()})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="100"
                value={spiritYieldInputs.grainWeight}
                onChange={(e) => setSpiritYieldInputs(prev => ({ ...prev, grainWeight: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grain Type
              </label>
              <select
                value={spiritYieldInputs.grainType}
                onChange={(e) => setSpiritYieldInputs(prev => ({ ...prev, grainType: e.target.value as 'corn' | 'wheat' | 'rye' | 'barley' }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="corn">Corn (highest yield)</option>
                <option value="wheat">Wheat</option>
                <option value="rye">Rye</option>
                <option value="barley">Barley (lowest yield)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Efficiency (%)
              </label>
              <input
                type="number"
                step="1"
                placeholder="85"
                value={spiritYieldInputs.efficiency}
                onChange={(e) => setSpiritYieldInputs(prev => ({ ...prev, efficiency: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </CalculatorCard>
      )}
    </div>
  );
}

export default DistillationCalculators;