import React, { useState } from 'react';
import { Droplets, TrendingDown, Layers, Thermometer, Zap, FlaskConical, Blend, Bot as Bottle, Eye, BarChart3, Snowflake, Calculator, Percent, TestTube2, Activity, Beaker, Settings, TrendingUp, Gauge, Timer, Wind } from 'lucide-react';
import CalculatorCard from './CalculatorCard';

interface ABVInputs {
  specificGravity: string;
  unitSystem: 'metric' | 'sae';
}

interface DilutionInputs {
  currentABV: string;
  targetABV: string;
  currentVolume: string;
  unitSystem: 'metric' | 'sae';
}

interface CutsInputs {
  totalVolume: string;
  headsPercent: string;
  tailsPercent: string;
  showChemicals: boolean;
  unitSystem: 'metric' | 'sae';
}

interface PotStillInputs {
  washVolume: string;
  washABV: string;
  heatingPower: string;
  powerUnit: 'watts' | 'btu' | 'kj';
  startTemp: string;
  tempUnit: 'celsius' | 'fahrenheit';
  unitSystem: 'metric' | 'sae';
}

interface DistillationSimulatorInputs {
  stillType: 'pot' | 'column';
  washVolume: string;
  washABV: string;
  theoreticalPlates: string;
  refluxRatio: string;
  unitSystem: 'metric' | 'sae';
}

interface CongenersInputs {
  compound: 'acetaldehyde' | 'ethyl_acetate' | 'methanol' | 'fusel_oils';
  initialConcentration: string;
  distillationRun: string;
  cutPoint: string;
  unitSystem: 'metric' | 'sae';
}

interface BoilingPointInputs {
  ethanolPercent: string;
  atmosphericPressure: string;
  pressureUnit: 'kpa' | 'psi' | 'mmhg';
  unitSystem: 'metric' | 'sae';
}

interface SugarWashInputs {
  targetABV: string;
  washVolume: string;
  sugarType: 'white' | 'brown' | 'dextrose' | 'honey';
  unitSystem: 'metric' | 'sae';
}

interface BoilTimeInputs {
  washVolume: string;
  startTemp: string;
  targetTemp: string;
  heatingPower: string;
  powerUnit: 'watts' | 'btu' | 'kj';
  unitSystem: 'metric' | 'sae';
}

interface VaporSpeedInputs {
  heatingPower: string;
  powerUnit: 'watts' | 'btu' | 'kj';
  innerDiameter: string;
  unitSystem: 'metric' | 'sae';
}

interface MinglingInputs {
  volume1: string;
  abv1: string;
  volume2: string;
  abv2: string;
  unitSystem: 'metric' | 'sae';
}

interface BottleYieldInputs {
  distillateVolume: string;
  bottleSize: string;
  unitSystem: 'metric' | 'sae';
}

interface RefractometerInputs {
  reading: string;
  temperature: string;
  calibrationTemp: string;
  unitSystem: 'metric' | 'sae';
}

interface CondenserInputs {
  distillationRate: string;
  coolingWaterTemp: string;
  targetCondensateTemp: string;
  condenserType: 'liebig' | 'shotgun';
  unitSystem: 'metric' | 'sae';
}

interface CoolingWaterInputs {
  waterVolume: string;
  flowRate: string;
  heatingPower: string;
  powerUnit: 'watts' | 'btu' | 'kj';
  unitSystem: 'metric' | 'sae';
}

interface RelativeVolatilityInputs {
  compound1VaporPressure: string;
  compound2VaporPressure: string;
  temperature: string;
  unitSystem: 'metric' | 'sae';
}

interface MoleFractionInputs {
  relativeVolatility: string;
  liquidMoleFraction: string;
  unitSystem: 'metric' | 'sae';
}

interface PercentRecoveryInputs {
  originalVolume: string;
  recoveredVolume: string;
  unitSystem: 'metric' | 'sae';
}

interface DistillationEfficiencyInputs {
  lowBoilingRecovery: string;
  intermediateRecovery: string;
  highBoilingRecovery: string;
  unitSystem: 'metric' | 'sae';
}

interface PycnometerInputs {
  emptyWeight: string;
  waterWeight: string;
  waterTemp: string;
  unitSystem: 'metric' | 'sae';
}

function DistillationCalculators() {
  const [abvInputs, setAbvInputs] = useState<ABVInputs>({
    specificGravity: '',
    unitSystem: 'metric'
  });

  const [dilutionInputs, setDilutionInputs] = useState<DilutionInputs>({
    currentABV: '',
    targetABV: '',
    currentVolume: '',
    unitSystem: 'metric'
  });

  const [cutsInputs, setCutsInputs] = useState<CutsInputs>({
    totalVolume: '',
    headsPercent: '10',
    tailsPercent: '15',
    showChemicals: false,
    unitSystem: 'metric'
  });

  const [potStillInputs, setPotStillInputs] = useState<PotStillInputs>({
    washVolume: '',
    washABV: '',
    heatingPower: '',
    powerUnit: 'watts',
    startTemp: '',
    tempUnit: 'celsius',
    unitSystem: 'metric'
  });

  const [simulatorInputs, setSimulatorInputs] = useState<DistillationSimulatorInputs>({
    stillType: 'pot',
    washVolume: '',
    washABV: '',
    theoreticalPlates: '3',
    refluxRatio: '2',
    unitSystem: 'metric'
  });

  const [congenersInputs, setCongenersInputs] = useState<CongenersInputs>({
    compound: 'acetaldehyde',
    initialConcentration: '',
    distillationRun: '1',
    cutPoint: '80',
    unitSystem: 'metric'
  });

  const [boilingPointInputs, setBoilingPointInputs] = useState<BoilingPointInputs>({
    ethanolPercent: '',
    atmosphericPressure: '101.325',
    pressureUnit: 'kpa',
    unitSystem: 'metric'
  });

  const [sugarWashInputs, setSugarWashInputs] = useState<SugarWashInputs>({
    targetABV: '',
    washVolume: '',
    sugarType: 'white',
    unitSystem: 'metric'
  });

  const [boilTimeInputs, setBoilTimeInputs] = useState<BoilTimeInputs>({
    washVolume: '',
    startTemp: '',
    targetTemp: '78.4',
    heatingPower: '',
    powerUnit: 'watts',
    unitSystem: 'metric'
  });

  const [vaporSpeedInputs, setVaporSpeedInputs] = useState<VaporSpeedInputs>({
    heatingPower: '',
    powerUnit: 'watts',
    innerDiameter: '',
    unitSystem: 'metric'
  });

  const [minglingInputs, setMinglingInputs] = useState<MinglingInputs>({
    volume1: '',
    abv1: '',
    volume2: '',
    abv2: '',
    unitSystem: 'metric'
  });

  const [bottleYieldInputs, setBottleYieldInputs] = useState<BottleYieldInputs>({
    distillateVolume: '',
    bottleSize: '750',
    unitSystem: 'metric'
  });

  const [refractometerInputs, setRefractometerInputs] = useState<RefractometerInputs>({
    reading: '',
    temperature: '',
    calibrationTemp: '20',
    unitSystem: 'metric'
  });

  const [condenserInputs, setCondenserInputs] = useState<CondenserInputs>({
    distillationRate: '',
    coolingWaterTemp: '',
    targetCondensateTemp: '',
    condenserType: 'liebig',
    unitSystem: 'metric'
  });

  const [coolingWaterInputs, setCoolingWaterInputs] = useState<CoolingWaterInputs>({
    waterVolume: '',
    flowRate: '',
    heatingPower: '',
    powerUnit: 'watts',
    unitSystem: 'metric'
  });

  const [relativeVolatilityInputs, setRelativeVolatilityInputs] = useState<RelativeVolatilityInputs>({
    compound1VaporPressure: '',
    compound2VaporPressure: '',
    temperature: '',
    unitSystem: 'metric'
  });

  const [moleFractionInputs, setMoleFractionInputs] = useState<MoleFractionInputs>({
    relativeVolatility: '',
    liquidMoleFraction: '',
    unitSystem: 'metric'
  });

  const [percentRecoveryInputs, setPercentRecoveryInputs] = useState<PercentRecoveryInputs>({
    originalVolume: '',
    recoveredVolume: '',
    unitSystem: 'metric'
  });

  const [distillationEfficiencyInputs, setDistillationEfficiencyInputs] = useState<DistillationEfficiencyInputs>({
    lowBoilingRecovery: '',
    intermediateRecovery: '',
    highBoilingRecovery: '',
    unitSystem: 'metric'
  });

  const [pycnometerInputs, setPycnometerInputs] = useState<PycnometerInputs>({
    emptyWeight: '',
    waterWeight: '',
    waterTemp: '',
    unitSystem: 'metric'
  });

  // Unit conversion functions
  const convertVolume = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 0.264172 : value * 3.78541; // L to gal or gal to L
  };

  const convertWeight = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 2.20462 : value * 0.453592; // kg to lbs or lbs to kg
  };

  const convertSmallWeight = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 0.035274 : value * 28.3495; // g to oz or oz to g
  };

  const convertTemperature = (value: number, toCelsius: boolean): number => {
    return toCelsius ? (value - 32) * 5/9 : (value * 9/5) + 32;
  };

  const convertDiameter = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 0.0393701 : value * 25.4; // mm to inches or inches to mm
  };

  const convertFlowRate = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 0.264172 : value * 3.78541; // L/h to gal/h or gal/h to L/h
  };

  const convertSmallVolume = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 0.033814 : value * 29.5735; // mL to fl oz or fl oz to mL
  };

  // Helper functions for unit labels
  const getVolumeUnit = (unitSystem: string) => unitSystem === 'metric' ? 'L' : 'gal';
  const getWeightUnit = (unitSystem: string) => unitSystem === 'metric' ? 'kg' : 'lbs';
  const getSmallWeightUnit = (unitSystem: string) => unitSystem === 'metric' ? 'g' : 'oz';
  const getTempUnit = (unitSystem: string) => unitSystem === 'metric' ? '°C' : '°F';
  const getDiameterUnit = (unitSystem: string) => unitSystem === 'metric' ? 'mm' : 'inches';
  const getFlowRateUnit = (unitSystem: string) => unitSystem === 'metric' ? 'L/h' : 'gal/h';
  const getSmallVolumeUnit = (unitSystem: string) => unitSystem === 'metric' ? 'mL' : 'fl oz';

  // Unit toggle component
  const UnitToggle = ({ unitSystem, onChange }: { unitSystem: string; onChange: (unit: 'metric' | 'sae') => void }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onChange('metric')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
            unitSystem === 'metric'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-orange-600 hover:bg-white'
          }`}
        >
          Metric
        </button>
        <button
          onClick={() => onChange('sae')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
            unitSystem === 'sae'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-orange-600 hover:bg-white'
          }`}
        >
          SAE
        </button>
      </div>
    </div>
  );

  // ABV from Specific Gravity
  const calculateABVFromSG = (): string => {
    const sg = parseFloat(abvInputs.specificGravity);
    if (isNaN(sg) || sg < 0.7 || sg > 1.0) return '';
    
    // Simplified formula for ethanol-water mixtures
    const abv = (1 - sg) * 129.8;
    return Math.max(0, Math.min(100, abv)).toFixed(2);
  };

  // Dilution Calculator
  const calculateDilution = (): { waterNeeded: string; finalVolume: string } => {
    const current = parseFloat(dilutionInputs.currentABV);
    const target = parseFloat(dilutionInputs.targetABV);
    const volume = parseFloat(dilutionInputs.currentVolume);
    
    if (isNaN(current) || isNaN(target) || isNaN(volume) || target >= current || target <= 0) {
      return { waterNeeded: '', finalVolume: '' };
    }
    
    // Convert volume to liters if needed
    const volumeL = dilutionInputs.unitSystem === 'sae' ? convertVolume(volume, false) : volume;
    
    const finalVolumeL = (current * volumeL) / target;
    const waterNeededL = finalVolumeL - volumeL;
    
    // Convert back to display units
    const finalVolume = dilutionInputs.unitSystem === 'sae' ? convertVolume(finalVolumeL, true) : finalVolumeL;
    const waterNeeded = dilutionInputs.unitSystem === 'sae' ? convertVolume(waterNeededL, true) : waterNeededL;
    
    return {
      waterNeeded: waterNeeded.toFixed(2),
      finalVolume: finalVolume.toFixed(2)
    };
  };

  // Cuts Calculator
  const calculateCuts = (): { 
    heads: string; 
    hearts: string; 
    tails: string;
    headsPercent: number;
    heartsPercent: number;
    tailsPercent: number;
  } => {
    const total = parseFloat(cutsInputs.totalVolume);
    const headsPercent = parseFloat(cutsInputs.headsPercent);
    const tailsPercent = parseFloat(cutsInputs.tailsPercent);
    
    if (isNaN(total) || isNaN(headsPercent) || isNaN(tailsPercent) || 
        headsPercent + tailsPercent >= 100) {
      return { 
        heads: '', 
        hearts: '', 
        tails: '',
        headsPercent: 0,
        heartsPercent: 0,
        tailsPercent: 0
      };
    }
    
    // Convert volume to liters if needed
    const totalL = cutsInputs.unitSystem === 'sae' ? convertVolume(total, false) : total;
    
    const headsL = (totalL * headsPercent) / 100;
    const tailsL = (totalL * tailsPercent) / 100;
    const heartsL = totalL - headsL - tailsL;
    const heartsPercent = 100 - headsPercent - tailsPercent;
    
    // Convert back to display units
    const heads = cutsInputs.unitSystem === 'sae' ? convertVolume(headsL, true) : headsL;
    const hearts = cutsInputs.unitSystem === 'sae' ? convertVolume(heartsL, true) : heartsL;
    const tails = cutsInputs.unitSystem === 'sae' ? convertVolume(tailsL, true) : tailsL;
    
    return {
      heads: heads.toFixed(2),
      hearts: hearts.toFixed(2),
      tails: tails.toFixed(2),
      headsPercent: headsPercent,
      heartsPercent: heartsPercent,
      tailsPercent: tailsPercent
    };
  };

  // Sugar Wash Calculator
  const calculateSugarWash = (): { sugarNeeded: string; waterNeeded: string } => {
    const targetABV = parseFloat(sugarWashInputs.targetABV);
    const washVolume = parseFloat(sugarWashInputs.washVolume);
    
    if (isNaN(targetABV) || isNaN(washVolume) || targetABV <= 0 || targetABV > 20) {
      return { sugarNeeded: '', waterNeeded: '' };
    }
    
    // Convert volume to liters if needed
    const washVolumeL = sugarWashInputs.unitSystem === 'sae' ? convertVolume(washVolume, false) : washVolume;
    
    // Sugar factors (kg sugar per liter for 1% ABV)
    const sugarFactors = {
      white: 0.017,
      brown: 0.018,
      dextrose: 0.016,
      honey: 0.020
    };
    
    const sugarNeededKg = washVolumeL * targetABV * sugarFactors[sugarWashInputs.sugarType];
    const waterNeededL = washVolumeL - (sugarNeededKg * 0.6); // Account for sugar volume
    
    // Convert to display units
    const sugarNeeded = sugarWashInputs.unitSystem === 'sae' ? convertWeight(sugarNeededKg, true) : sugarNeededKg;
    const waterNeeded = sugarWashInputs.unitSystem === 'sae' ? convertVolume(waterNeededL, true) : waterNeededL;
    
    return {
      sugarNeeded: sugarNeeded.toFixed(2),
      waterNeeded: Math.max(0, waterNeeded).toFixed(2)
    };
  };

  // Boil Time Calculator
  const calculateBoilTime = (): string => {
    const volume = parseFloat(boilTimeInputs.washVolume);
    const startTemp = parseFloat(boilTimeInputs.startTemp);
    const targetTemp = parseFloat(boilTimeInputs.targetTemp);
    const power = parseFloat(boilTimeInputs.heatingPower);
    
    if (isNaN(volume) || isNaN(startTemp) || isNaN(targetTemp) || isNaN(power) || targetTemp <= startTemp) {
      return '';
    }
    
    // Convert to metric units
    const volumeL = boilTimeInputs.unitSystem === 'sae' ? convertVolume(volume, false) : volume;
    let startTempC = startTemp;
    let targetTempC = targetTemp;
    
    if (boilTimeInputs.unitSystem === 'sae') {
      startTempC = convertTemperature(startTemp, true);
      targetTempC = convertTemperature(targetTemp, true);
    }
    
    // Convert power to watts
    let powerWatts = power;
    if (boilTimeInputs.powerUnit === 'btu') {
      powerWatts = power * 0.293071;
    } else if (boilTimeInputs.powerUnit === 'kj') {
      powerWatts = power * 277.778;
    }
    
    // Heat capacity calculation
    const heatCapacity = 4186; // J/kg·K for water
    const density = 0.95; // kg/L for wash
    const tempRise = targetTempC - startTempC;
    
    const energyNeeded = volumeL * density * heatCapacity * tempRise;
    const timeSeconds = energyNeeded / powerWatts;
    const timeMinutes = timeSeconds / 60;
    
    return timeMinutes.toFixed(1);
  };

  // Vapor Speed Calculator
  const calculateVaporSpeed = (): string => {
    const power = parseFloat(vaporSpeedInputs.heatingPower);
    const diameter = parseFloat(vaporSpeedInputs.innerDiameter);
    
    if (isNaN(power) || isNaN(diameter) || diameter <= 0) return '';
    
    // Convert power to watts
    let powerWatts = power;
    if (vaporSpeedInputs.powerUnit === 'btu') {
      powerWatts = power * 0.293071;
    } else if (vaporSpeedInputs.powerUnit === 'kj') {
      powerWatts = power * 277.778;
    }
    
    // Convert diameter to meters
    const diameterM = vaporSpeedInputs.unitSystem === 'sae' ? 
      convertDiameter(diameter, false) / 1000 : diameter / 1000;
    
    // Calculate cross-sectional area
    const area = Math.PI * Math.pow(diameterM / 2, 2);
    
    // Vapor speed calculation (simplified)
    const latentHeat = 2260000; // J/kg for water
    const vaporDensity = 0.6; // kg/m³ for ethanol vapor
    
    const vaporMassFlow = powerWatts / latentHeat;
    const vaporSpeed = vaporMassFlow / (vaporDensity * area);
    
    return vaporSpeed.toFixed(2);
  };

  // Mingling Spirits Calculator
  const calculateMingling = (): string => {
    const vol1 = parseFloat(minglingInputs.volume1);
    const abv1 = parseFloat(minglingInputs.abv1);
    const vol2 = parseFloat(minglingInputs.volume2);
    const abv2 = parseFloat(minglingInputs.abv2);
    
    if (isNaN(vol1) || isNaN(abv1) || isNaN(vol2) || isNaN(abv2)) return '';
    
    // Convert volumes to liters if needed
    const vol1L = minglingInputs.unitSystem === 'sae' ? convertVolume(vol1, false) : vol1;
    const vol2L = minglingInputs.unitSystem === 'sae' ? convertVolume(vol2, false) : vol2;
    
    const totalVolume = vol1L + vol2L;
    const finalABV = ((vol1L * abv1) + (vol2L * abv2)) / totalVolume;
    
    return finalABV.toFixed(2);
  };

  // Bottle Yield Calculator
  const calculateBottleYield = (): string => {
    const distillateVolume = parseFloat(bottleYieldInputs.distillateVolume);
    const bottleSize = parseFloat(bottleYieldInputs.bottleSize);
    
    if (isNaN(distillateVolume) || isNaN(bottleSize) || bottleSize <= 0) return '';
    
    // Convert to mL for calculation
    const distillateVolumeML = bottleYieldInputs.unitSystem === 'sae' ? 
      convertSmallVolume(distillateVolume, false) : distillateVolume;
    const bottleSizeML = bottleYieldInputs.unitSystem === 'sae' ? 
      convertSmallVolume(bottleSize, false) : bottleSize;
    
    const numberOfBottles = Math.floor(distillateVolumeML / bottleSizeML);
    
    return numberOfBottles.toString();
  };

  // Refractometer Temperature Correction
  const calculateRefractometerCorrection = (): string => {
    const reading = parseFloat(refractometerInputs.reading);
    const temp = parseFloat(refractometerInputs.temperature);
    const calibTemp = parseFloat(refractometerInputs.calibrationTemp);
    
    if (isNaN(reading) || isNaN(temp) || isNaN(calibTemp)) return '';
    
    // Convert temperatures to Celsius if needed
    const tempC = refractometerInputs.unitSystem === 'sae' ? convertTemperature(temp, true) : temp;
    const calibTempC = refractometerInputs.unitSystem === 'sae' ? convertTemperature(calibTemp, true) : calibTemp;
    
    // Temperature correction for alcohol solutions
    const correction = 0.00045 * (tempC - calibTempC);
    const correctedReading = reading + correction;
    
    return correctedReading.toFixed(3);
  };

  // Condenser Dimensioning Calculator
  const calculateCondenserDimensioning = (): { 
    coolingWaterFlow: string; 
    condenserLength: string; 
    heatTransferArea: string 
  } => {
    const distillationRate = parseFloat(condenserInputs.distillationRate);
    const coolingWaterTemp = parseFloat(condenserInputs.coolingWaterTemp);
    const targetCondensateTemp = parseFloat(condenserInputs.targetCondensateTemp);
    
    if (isNaN(distillationRate) || isNaN(coolingWaterTemp) || isNaN(targetCondensateTemp)) {
      return { coolingWaterFlow: '', condenserLength: '', heatTransferArea: '' };
    }
    
    // Convert units to metric
    const distillationRateL = condenserInputs.unitSystem === 'sae' ? 
      convertFlowRate(distillationRate, false) : distillationRate;
    const coolingWaterTempC = condenserInputs.unitSystem === 'sae' ? 
      convertTemperature(coolingWaterTemp, true) : coolingWaterTemp;
    const targetCondensateTempC = condenserInputs.unitSystem === 'sae' ? 
      convertTemperature(targetCondensateTemp, true) : targetCondensateTemp;
    
    // Heat load calculation
    const latentHeat = 2260; // kJ/kg
    const density = 0.789; // kg/L for ethanol
    const heatLoad = distillationRateL * density * latentHeat / 3600; // kW
    
    // Cooling water flow calculation
    const waterHeatCapacity = 4.186; // kJ/kg·K
    const tempRise = 10; // Assumed 10°C rise in cooling water
    const coolingWaterFlowL = (heatLoad / (waterHeatCapacity * tempRise)) * 3600; // L/h
    
    // Condenser sizing (simplified)
    const heatTransferCoeff = 500; // W/m²·K (typical for water-ethanol)
    const logMeanTempDiff = ((78.4 - coolingWaterTempC) - (targetCondensateTempC - (coolingWaterTempC + tempRise))) / 
                           Math.log((78.4 - coolingWaterTempC) / (targetCondensateTempC - (coolingWaterTempC + tempRise)));
    
    const heatTransferArea = (heatLoad * 1000) / (heatTransferCoeff * logMeanTempDiff); // m²
    
    // Condenser length (assuming 25mm tube diameter)
    const tubeCircumference = Math.PI * 0.025; // m
    const condenserLength = heatTransferArea / tubeCircumference; // m
    
    // Convert back to display units
    const coolingWaterFlow = condenserInputs.unitSystem === 'sae' ? 
      convertFlowRate(coolingWaterFlowL, true) : coolingWaterFlowL;
    const condenserLengthDisplay = condenserInputs.unitSystem === 'sae' ? 
      condenserLength * 3.28084 : condenserLength;
    
    return {
      coolingWaterFlow: coolingWaterFlow.toFixed(1),
      condenserLength: condenserLengthDisplay.toFixed(2),
      heatTransferArea: heatTransferArea.toFixed(2)
    };
  };

  // Cooling Water Warming Calculator
  const calculateCoolingWaterWarming = (): string => {
    const waterVolume = parseFloat(coolingWaterInputs.waterVolume);
    const flowRate = parseFloat(coolingWaterInputs.flowRate);
    const power = parseFloat(coolingWaterInputs.heatingPower);
    
    if (isNaN(waterVolume) || isNaN(flowRate) || isNaN(power) || flowRate <= 0) return '';
    
    // Convert to metric units
    const waterVolumeL = coolingWaterInputs.unitSystem === 'sae' ? 
      convertVolume(waterVolume, false) : waterVolume;
    const flowRateL = coolingWaterInputs.unitSystem === 'sae' ? 
      convertFlowRate(flowRate, false) : flowRate;
    
    // Convert power to watts
    let powerWatts = power;
    if (coolingWaterInputs.powerUnit === 'btu') {
      powerWatts = power * 0.293071;
    } else if (coolingWaterInputs.powerUnit === 'kj') {
      powerWatts = power * 277.778;
    }
    
    // Calculate temperature rise
    const waterDensity = 1; // kg/L
    const waterHeatCapacity = 4186; // J/kg·K
    const massFlowRate = (flowRateL / 3600) * waterDensity; // kg/s
    
    const tempRise = powerWatts / (massFlowRate * waterHeatCapacity);
    
    return tempRise.toFixed(1);
  };

  // Relative Volatility Calculator
  const calculateRelativeVolatility = (): string => {
    const vp1 = parseFloat(relativeVolatilityInputs.compound1VaporPressure);
    const vp2 = parseFloat(relativeVolatilityInputs.compound2VaporPressure);
    
    if (isNaN(vp1) || isNaN(vp2) || vp2 === 0) return '';
    
    const relativeVolatility = vp1 / vp2;
    
    return relativeVolatility.toFixed(3);
  };

  // Mole Fraction Calculator
  const calculateMoleFraction = (): string => {
    const alpha = parseFloat(moleFractionInputs.relativeVolatility);
    const x = parseFloat(moleFractionInputs.liquidMoleFraction);
    
    if (isNaN(alpha) || isNaN(x) || x < 0 || x > 1) return '';
    
    const y = (alpha * x) / (1 + (alpha - 1) * x);
    
    return y.toFixed(4);
  };

  // Percent Recovery Calculator
  const calculatePercentRecovery = (): string => {
    const original = parseFloat(percentRecoveryInputs.originalVolume);
    const recovered = parseFloat(percentRecoveryInputs.recoveredVolume);
    
    if (isNaN(original) || isNaN(recovered) || original === 0) return '';
    
    // Convert to same units
    const originalL = percentRecoveryInputs.unitSystem === 'sae' ? 
      convertVolume(original, false) : original;
    const recoveredL = percentRecoveryInputs.unitSystem === 'sae' ? 
      convertVolume(recovered, false) : recovered;
    
    const recovery = (recoveredL / originalL) * 100;
    
    return recovery.toFixed(1);
  };

  // Distillation Efficiency Calculator
  const calculateDistillationEfficiency = (): string => {
    const lowBoiling = parseFloat(distillationEfficiencyInputs.lowBoilingRecovery);
    const intermediate = parseFloat(distillationEfficiencyInputs.intermediateRecovery);
    const highBoiling = parseFloat(distillationEfficiencyInputs.highBoilingRecovery);
    
    if (isNaN(lowBoiling) || isNaN(intermediate) || isNaN(highBoiling)) return '';
    
    const efficiency = (lowBoiling + highBoiling) / (lowBoiling + intermediate + highBoiling) * 100;
    
    return efficiency.toFixed(1);
  };

  // Pycnometer Volume Calculator
  const calculatePycnometerVolume = (): string => {
    const emptyWeight = parseFloat(pycnometerInputs.emptyWeight);
    const waterWeight = parseFloat(pycnometerInputs.waterWeight);
    const waterTemp = parseFloat(pycnometerInputs.waterTemp);
    
    if (isNaN(emptyWeight) || isNaN(waterWeight) || isNaN(waterTemp) || waterWeight <= emptyWeight) {
      return '';
    }
    
    // Convert temperature to Celsius if needed
    const waterTempC = pycnometerInputs.unitSystem === 'sae' ? 
      convertTemperature(waterTemp, true) : waterTemp;
    
    // Water density at temperature (simplified)
    const waterDensity = 1 - (waterTempC - 4) * 0.0002; // g/mL
    
    // Calculate volume
    const waterMass = waterWeight - emptyWeight;
    const volume = waterMass / waterDensity;
    
    return volume.toFixed(3);
  };

  // Pot Still Calculator
  const calculatePotStill = (): { 
    heatUpTime: string; 
    estimatedABV: string; 
    collectionTime: string;
    totalTime: string;
  } => {
    const volume = parseFloat(potStillInputs.washVolume);
    const washABV = parseFloat(potStillInputs.washABV);
    const power = parseFloat(potStillInputs.heatingPower);
    const startTemp = parseFloat(potStillInputs.startTemp);
    
    if (isNaN(volume) || isNaN(washABV) || isNaN(power) || isNaN(startTemp)) {
      return { heatUpTime: '', estimatedABV: '', collectionTime: '', totalTime: '' };
    }
    
    // Convert to metric units
    const volumeL = potStillInputs.unitSystem === 'sae' ? convertVolume(volume, false) : volume;
    let startTempC = startTemp;
    
    if (potStillInputs.tempUnit === 'fahrenheit') {
      startTempC = convertTemperature(startTemp, true);
    }
    
    // Convert power to watts
    let powerWatts = power;
    if (potStillInputs.powerUnit === 'btu') {
      powerWatts = power * 0.293071;
    } else if (potStillInputs.powerUnit === 'kj') {
      powerWatts = power * 277.778;
    }
    
    // Heat capacity of ethanol-water mixture
    const heatCapacity = 4186; // J/kg·K
    const density = 0.95; // kg/L
    
    // Calculate heat-up time to boiling
    const boilingPoint = 78.4 + (100 - 78.4) * (1 - washABV/100);
    const tempRise = boilingPoint - startTempC;
    const energyNeeded = volumeL * density * heatCapacity * tempRise;
    const heatUpTime = energyNeeded / powerWatts / 3600; // hours
    
    // Estimate distillate ABV
    const estimatedABV = washABV * 2.5;
    
    // Collection time
    const collectionVolume = volumeL * 0.2;
    const collectionTime = collectionVolume * 0.1;
    
    const totalTime = heatUpTime + collectionTime;
    
    return {
      heatUpTime: heatUpTime.toFixed(1),
      estimatedABV: Math.min(95, estimatedABV).toFixed(1),
      collectionTime: collectionTime.toFixed(1),
      totalTime: totalTime.toFixed(1)
    };
  };

  // Distillation Simulator
  const calculateDistillationSimulator = (): {
    stages: Array<{ stage: number; abv: string; temp: string; volume: string }>;
    finalYield: string;
  } => {
    const volume = parseFloat(simulatorInputs.washVolume);
    const washABV = parseFloat(simulatorInputs.washABV);
    const plates = parseFloat(simulatorInputs.theoreticalPlates);
    const reflux = parseFloat(simulatorInputs.refluxRatio);
    
    if (isNaN(volume) || isNaN(washABV) || isNaN(plates) || isNaN(reflux)) {
      return { stages: [], finalYield: '' };
    }
    
    // Convert volume to liters if needed
    const volumeL = simulatorInputs.unitSystem === 'sae' ? convertVolume(volume, false) : volume;
    
    const stages = [];
    let currentABV = washABV;
    let currentVolume = volumeL;
    
    // Simplified distillation model
    for (let i = 1; i <= Math.min(plates, 10); i++) {
      const alpha = 2.5; // Relative volatility
      const x = currentABV / 100;
      const y = (alpha * x) / (1 + (alpha - 1) * x);
      
      currentABV = Math.min(95, y * 100 * (1 + reflux / 10));
      currentVolume = currentVolume * 0.85;
      
      const temp = 78.4 + (100 - 78.4) * (1 - currentABV/100);
      
      // Convert volume back to display units
      const displayVolume = simulatorInputs.unitSystem === 'sae' ? 
        convertVolume(currentVolume, true) : currentVolume;
      
      stages.push({
        stage: i,
        abv: currentABV.toFixed(1),
        temp: temp.toFixed(1),
        volume: displayVolume.toFixed(1)
      });
    }
    
    const finalYield = ((currentVolume / volumeL) * 100).toFixed(1);
    
    return { stages, finalYield };
  };

  // Congeners Simulator
  const calculateCongeners = (): {
    concentration: string;
    cutRecommendation: string;
    flavorProfile: string;
  } => {
    const initial = parseFloat(congenersInputs.initialConcentration);
    const run = parseFloat(congenersInputs.distillationRun);
    const cutPoint = parseFloat(congenersInputs.cutPoint);
    
    if (isNaN(initial) || isNaN(run) || isNaN(cutPoint)) {
      return { concentration: '', cutRecommendation: '', flavorProfile: '' };
    }
    
    const compoundData = {
      acetaldehyde: { volatility: 2.8, flavor: 'Green apple, sharp' },
      ethyl_acetate: { volatility: 2.2, flavor: 'Fruity, solvent-like' },
      methanol: { volatility: 3.2, flavor: 'Toxic, no flavor' },
      fusel_oils: { volatility: 0.3, flavor: 'Heavy, oily, medicinal' }
    };
    
    const compound = compoundData[congenersInputs.compound];
    
    const concentration = initial * Math.pow(compound.volatility, run - 1);
    
    let cutRecommendation = '';
    if (congenersInputs.compound === 'acetaldehyde' || congenersInputs.compound === 'methanol') {
      cutRecommendation = 'Remove in heads cut';
    } else if (congenersInputs.compound === 'fusel_oils') {
      cutRecommendation = 'Remove in tails cut';
    } else {
      cutRecommendation = 'Monitor throughout run';
    }
    
    return {
      concentration: concentration.toFixed(2),
      cutRecommendation,
      flavorProfile: compound.flavor
    };
  };

  // Boiling Point Calculator
  const calculateBoilingPoint = (): {
    boilingPoint: string;
    vaporPressure: string;
    theoreticalPlates: string;
  } => {
    const ethanol = parseFloat(boilingPointInputs.ethanolPercent);
    const pressure = parseFloat(boilingPointInputs.atmosphericPressure);
    
    if (isNaN(ethanol) || isNaN(pressure)) {
      return { boilingPoint: '', vaporPressure: '', theoreticalPlates: '' };
    }
    
    // Convert pressure to kPa
    let pressureKPa = pressure;
    if (boilingPointInputs.pressureUnit === 'psi') {
      pressureKPa = pressure * 6.89476;
    } else if (boilingPointInputs.pressureUnit === 'mmhg') {
      pressureKPa = pressure * 0.133322;
    }
    
    const x_ethanol = ethanol / 100;
    const x_water = 1 - x_ethanol;
    
    const bp_ethanol = 78.4;
    const bp_water = 100.0;
    
    const pressureCorrection = (pressureKPa - 101.325) * 0.04;
    
    const boilingPoint = (x_ethanol * bp_ethanol + x_water * bp_water) + pressureCorrection;
    
    const vaporPressure = pressureKPa * (x_ethanol * 1.8 + x_water * 1.0);
    
    const alpha = 2.5;
    const theoreticalPlates = Math.log(0.99 / 0.01) / Math.log(alpha);
    
    return {
      boilingPoint: boilingPoint.toFixed(1),
      vaporPressure: vaporPressure.toFixed(1),
      theoreticalPlates: theoreticalPlates.toFixed(0)
    };
  };

  // Chemical breakdown data
  const getChemicalBreakdown = () => {
    return {
      heads: [
        { name: 'Acetone', range: '15-25%', description: 'Nail polish remover smell' },
        { name: 'Methanol', range: '5-15%', description: 'Toxic, wood alcohol' },
        { name: 'Ethyl Acetate', range: '10-20%', description: 'Fruity, solvent-like' },
        { name: 'Aldehydes', range: '5-10%', description: 'Sharp, pungent aroma' }
      ],
      hearts: [
        { name: 'Ethanol', range: '85-95%', description: 'Desired drinking alcohol' },
        { name: 'Water', range: '5-15%', description: 'H₂O content' },
        { name: 'Congeners', range: '0.1-2%', description: 'Flavor compounds' }
      ],
      tails: [
        { name: 'Fusel Oils', range: '20-40%', description: 'Heavy, oily compounds' },
        { name: 'Propanol', range: '10-20%', description: 'Solvent-like alcohol' },
        { name: 'Butanol', range: '5-15%', description: 'Medicinal smell' },
        { name: 'Fatty Acids', range: '5-10%', description: 'Rancid, soapy notes' }
      ]
    };
  };

  const dilutionResult = calculateDilution();
  const cutsResult = calculateCuts();
  const sugarWashResult = calculateSugarWash();
  const minglingResult = calculateMingling();
  const condenserResult = calculateCondenserDimensioning();
  const potStillResult = calculatePotStill();
  const simulatorResult = calculateDistillationSimulator();
  const congenersResult = calculateCongeners();
  const boilingPointResult = calculateBoilingPoint();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* ABV from Specific Gravity */}
      <CalculatorCard
        title="ABV from Specific Gravity"
        description="Calculate alcohol content from specific gravity"
        icon={<Droplets className="w-6 h-6 text-orange-600" />}
        result={calculateABVFromSG() ? `${calculateABVFromSG()}% ABV` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={abvInputs.unitSystem} 
            onChange={(unit) => setAbvInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="0.950"
              value={abvInputs.specificGravity}
              onChange={(e) => setAbvInputs(prev => ({ ...prev, specificGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Typical range: 0.700 - 1.000
            </p>
          </div>
        </div>
      </CalculatorCard>

      {/* Dilution Calculator */}
      <CalculatorCard
        title="Dilution Calculator"
        description="Calculate water needed to reduce alcohol content"
        icon={<TrendingDown className="w-6 h-6 text-orange-600" />}
        result={dilutionResult.waterNeeded ? (
          <div className="space-y-1">
            <div>Water needed: {dilutionResult.waterNeeded} {getVolumeUnit(dilutionInputs.unitSystem)}</div>
            <div>Final volume: {dilutionResult.finalVolume} {getVolumeUnit(dilutionInputs.unitSystem)}</div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={dilutionInputs.unitSystem} 
            onChange={(unit) => setDilutionInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current ABV (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="60"
              value={dilutionInputs.currentABV}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, currentABV: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target ABV (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="40"
              value={dilutionInputs.targetABV}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, targetABV: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Volume ({getVolumeUnit(dilutionInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="1"
              placeholder={dilutionInputs.unitSystem === 'metric' ? '1' : '0.26'}
              value={dilutionInputs.currentVolume}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, currentVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Cuts Calculator */}
      <CalculatorCard
        title="Cuts Calculator"
        description="Calculate heads, hearts, and tails with chemical breakdown"
        icon={<Layers className="w-6 h-6 text-orange-600" />}
        result={cutsResult.heads ? (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 bg-red-50 rounded border-l-4 border-red-400">
                <div className="font-semibold text-red-700">Heads</div>
                <div className="text-red-600">{cutsResult.heads} {getVolumeUnit(cutsInputs.unitSystem)}</div>
                <div className="text-xs text-red-500">{cutsResult.headsPercent}%</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded border-l-4 border-green-400">
                <div className="font-semibold text-green-700">Hearts</div>
                <div className="text-green-600">{cutsResult.hearts} {getVolumeUnit(cutsInputs.unitSystem)}</div>
                <div className="text-xs text-green-500">{cutsResult.heartsPercent}%</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded border-l-4 border-gray-400">
                <div className="font-semibold text-gray-700">Tails</div>
                <div className="text-gray-600">{cutsResult.tails} {getVolumeUnit(cutsInputs.unitSystem)}</div>
                <div className="text-xs text-gray-500">{cutsResult.tailsPercent}%</div>
              </div>
            </div>
            
            {cutsInputs.showChemicals && (
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <h5 className="text-sm font-semibold text-gray-700">Chemical Composition</h5>
                
                <div className="bg-red-50 p-3 rounded-lg">
                  <h6 className="text-xs font-semibold text-red-700 mb-2">Heads - Discard (Toxic)</h6>
                  <div className="space-y-1">
                    {getChemicalBreakdown().heads.map((chemical, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-red-600">{chemical.name}</span>
                        <span className="text-red-500">{chemical.range}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <h6 className="text-xs font-semibold text-green-700 mb-2">Hearts - Keep (Drinking)</h6>
                  <div className="space-y-1">
                    {getChemicalBreakdown().hearts.map((chemical, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-green-600">{chemical.name}</span>
                        <span className="text-green-500">{chemical.range}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h6 className="text-xs font-semibold text-gray-700 mb-2">Tails - Discard (Off-flavors)</h6>
                  <div className="space-y-1">
                    {getChemicalBreakdown().tails.map((chemical, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-gray-600">{chemical.name}</span>
                        <span className="text-gray-500">{chemical.range}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={cutsInputs.unitSystem} 
            onChange={(unit) => setCutsInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Distillate Volume ({getVolumeUnit(cutsInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="1"
              placeholder={cutsInputs.unitSystem === 'metric' ? '2' : '0.53'}
              value={cutsInputs.totalVolume}
              onChange={(e) => setCutsInputs(prev => ({ ...prev, totalVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heads Percentage (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={cutsInputs.headsPercent}
              onChange={(e) => setCutsInputs(prev => ({ ...prev, headsPercent: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tails Percentage (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={cutsInputs.tailsPercent}
              onChange={(e) => setCutsInputs(prev => ({ ...prev, tailsPercent: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={cutsInputs.showChemicals}
                onChange={(e) => setCutsInputs(prev => ({ ...prev, showChemicals: e.target.checked }))}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="text-sm font-medium text-gray-700">Show Chemical Breakdown</span>
            </label>
          </div>
        </div>
      </CalculatorCard>

      {/* Sugar Wash Calculator */}
      <CalculatorCard
        title="Sugar Wash Calculator"
        description="Calculate sugar and water needed for target ABV wash"
        icon={<Calculator className="w-6 h-6 text-orange-600" />}
        result={sugarWashResult.sugarNeeded ? (
          <div className="space-y-1">
            <div>Sugar needed: {sugarWashResult.sugarNeeded} {getWeightUnit(sugarWashInputs.unitSystem)}</div>
            <div>Water needed: {sugarWashResult.waterNeeded} {getVolumeUnit(sugarWashInputs.unitSystem)}</div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={sugarWashInputs.unitSystem} 
            onChange={(unit) => setSugarWashInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target ABV (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="8"
              value={sugarWashInputs.targetABV}
              onChange={(e) => setSugarWashInputs(prev => ({ ...prev, targetABV: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wash Volume ({getVolumeUnit(sugarWashInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={sugarWashInputs.unitSystem === 'metric' ? '50' : '13.2'}
              value={sugarWashInputs.washVolume}
              onChange={(e) => setSugarWashInputs(prev => ({ ...prev, washVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sugar Type
            </label>
            <select
              value={sugarWashInputs.sugarType}
              onChange={(e) => setSugarWashInputs(prev => ({ ...prev, sugarType: e.target.value as any }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            >
              <option value="white">White Sugar</option>
              <option value="brown">Brown Sugar</option>
              <option value="dextrose">Dextrose</option>
              <option value="honey">Honey</option>
            </select>
          </div>
        </div>
      </CalculatorCard>

      {/* Boil Time Calculator */}
      <CalculatorCard
        title="Boil Time Calculator"
        description="Calculate time to heat wash to boiling point"
        icon={<Timer className="w-6 h-6 text-orange-600" />}
        result={calculateBoilTime() ? `${calculateBoilTime()} minutes` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={boilTimeInputs.unitSystem} 
            onChange={(unit) => setBoilTimeInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wash Volume ({getVolumeUnit(boilTimeInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={boilTimeInputs.unitSystem === 'metric' ? '50' : '13.2'}
              value={boilTimeInputs.washVolume}
              onChange={(e) => setBoilTimeInputs(prev => ({ ...prev, washVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Temp ({getTempUnit(boilTimeInputs.unitSystem)})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={boilTimeInputs.unitSystem === 'metric' ? '20' : '68'}
                value={boilTimeInputs.startTemp}
                onChange={(e) => setBoilTimeInputs(prev => ({ ...prev, startTemp: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Temp ({getTempUnit(boilTimeInputs.unitSystem)})
              </label>
              <input
                type="number"
                step="0.1"
                value={boilTimeInputs.targetTemp}
                onChange={(e) => setBoilTimeInputs(prev => ({ ...prev, targetTemp: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heating Power
              </label>
              <input
                type="number"
                step="100"
                placeholder="5000"
                value={boilTimeInputs.heatingPower}
                onChange={(e) => setBoilTimeInputs(prev => ({ ...prev, heatingPower: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Power Unit
              </label>
              <select
                value={boilTimeInputs.powerUnit}
                onChange={(e) => setBoilTimeInputs(prev => ({ ...prev, powerUnit: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              >
                <option value="watts">Watts</option>
                <option value="btu">BTU/h</option>
                <option value="kj">kJ/h</option>
              </select>
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Vapor Speed Calculator */}
      <CalculatorCard
        title="Vapor Speed Calculator"
        description="Calculate vapor velocity in still column"
        icon={<Wind className="w-6 h-6 text-orange-600" />}
        result={calculateVaporSpeed() ? `${calculateVaporSpeed()} m/s` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={vaporSpeedInputs.unitSystem} 
            onChange={(unit) => setVaporSpeedInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heating Power
              </label>
              <input
                type="number"
                step="100"
                placeholder="5000"
                value={vaporSpeedInputs.heatingPower}
                onChange={(e) => setVaporSpeedInputs(prev => ({ ...prev, heatingPower: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Power Unit
              </label>
              <select
                value={vaporSpeedInputs.powerUnit}
                onChange={(e) => setVaporSpeedInputs(prev => ({ ...prev, powerUnit: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              >
                <option value="watts">Watts</option>
                <option value="btu">BTU/h</option>
                <option value="kj">kJ/h</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inner Diameter ({getDiameterUnit(vaporSpeedInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={vaporSpeedInputs.unitSystem === 'metric' ? '50' : '2'}
              value={vaporSpeedInputs.innerDiameter}
              onChange={(e) => setVaporSpeedInputs(prev => ({ ...prev, innerDiameter: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Mingling Spirits Calculator */}
      <CalculatorCard
        title="Mingling Spirits Calculator"
        description="Calculate final ABV when blending two spirits"
        icon={<Blend className="w-6 h-6 text-orange-600" />}
        result={minglingResult ? `${minglingResult}% ABV` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={minglingInputs.unitSystem} 
            onChange={(unit) => setMinglingInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spirit 1 Volume ({getVolumeUnit(minglingInputs.unitSystem)})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={minglingInputs.unitSystem === 'metric' ? '1' : '0.26'}
                value={minglingInputs.volume1}
                onChange={(e) => setMinglingInputs(prev => ({ ...prev, volume1: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spirit 1 ABV (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="60"
                value={minglingInputs.abv1}
                onChange={(e) => setMinglingInputs(prev => ({ ...prev, abv1: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spirit 2 Volume ({getVolumeUnit(minglingInputs.unitSystem)})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={minglingInputs.unitSystem === 'metric' ? '1' : '0.26'}
                value={minglingInputs.volume2}
                onChange={(e) => setMinglingInputs(prev => ({ ...prev, volume2: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spirit 2 ABV (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="40"
                value={minglingInputs.abv2}
                onChange={(e) => setMinglingInputs(prev => ({ ...prev, abv2: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Bottle Yield Calculator */}
      <CalculatorCard
        title="Bottle Yield Calculator"
        description="Calculate number of bottles from distillate volume"
        icon={<Bottle className="w-6 h-6 text-orange-600" />}
        result={calculateBottleYield() ? `${calculateBottleYield()} bottles` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={bottleYieldInputs.unitSystem} 
            onChange={(unit) => setBottleYieldInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distillate Volume ({getSmallVolumeUnit(bottleYieldInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="1"
              placeholder={bottleYieldInputs.unitSystem === 'metric' ? '5000' : '169'}
              value={bottleYieldInputs.distillateVolume}
              onChange={(e) => setBottleYieldInputs(prev => ({ ...prev, distillateVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bottle Size ({getSmallVolumeUnit(bottleYieldInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="1"
              value={bottleYieldInputs.bottleSize}
              onChange={(e) => setBottleYieldInputs(prev => ({ ...prev, bottleSize: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Standard: {bottleYieldInputs.unitSystem === 'metric' ? '750 mL' : '25.4 fl oz'}
            </p>
          </div>
        </div>
      </CalculatorCard>

      {/* Refractometer Temperature Correction */}
      <CalculatorCard
        title="Refractometer Temperature Correction"
        description="Adjust refractometer readings for temperature"
        icon={<Thermometer className="w-6 h-6 text-orange-600" />}
        result={calculateRefractometerCorrection() ? `Corrected: ${calculateRefractometerCorrection()}` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={refractometerInputs.unitSystem} 
            onChange={(unit) => setRefractometerInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Refractometer Reading
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.350"
              value={refractometerInputs.reading}
              onChange={(e) => setRefractometerInputs(prev => ({ ...prev, reading: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample Temperature ({getTempUnit(refractometerInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={refractometerInputs.unitSystem === 'metric' ? '25' : '77'}
              value={refractometerInputs.temperature}
              onChange={(e) => setRefractometerInputs(prev => ({ ...prev, temperature: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calibration Temperature ({getTempUnit(refractometerInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              value={refractometerInputs.calibrationTemp}
              onChange={(e) => setRefractometerInputs(prev => ({ ...prev, calibrationTemp: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Condenser Dimensioning Calculator */}
      <CalculatorCard
        title="Condenser Dimensioning Calculator"
        description="Calculate cooling water requirements and condenser size"
        icon={<Snowflake className="w-6 h-6 text-orange-600" />}
        result={condenserResult.coolingWaterFlow ? (
          <div className="space-y-1">
            <div>Water flow: {condenserResult.coolingWaterFlow} {getFlowRateUnit(condenserInputs.unitSystem)}</div>
            <div>Length: {condenserResult.condenserLength} {condenserInputs.unitSystem === 'metric' ? 'm' : 'ft'}</div>
            <div>Area: {condenserResult.heatTransferArea} m²</div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={condenserInputs.unitSystem} 
            onChange={(unit) => setCondenserInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distillation Rate ({getFlowRateUnit(condenserInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={condenserInputs.unitSystem === 'metric' ? '5' : '1.3'}
              value={condenserInputs.distillationRate}
              onChange={(e) => setCondenserInputs(prev => ({ ...prev, distillationRate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cooling Water Temp ({getTempUnit(condenserInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={condenserInputs.unitSystem === 'metric' ? '15' : '59'}
              value={condenserInputs.coolingWaterTemp}
              onChange={(e) => setCondenserInputs(prev => ({ ...prev, coolingWaterTemp: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Condensate Temp ({getTempUnit(condenserInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={condenserInputs.unitSystem === 'metric' ? '25' : '77'}
              value={condenserInputs.targetCondensateTemp}
              onChange={(e) => setCondenserInputs(prev => ({ ...prev, targetCondensateTemp: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condenser Type
            </label>
            <select
              value={condenserInputs.condenserType}
              onChange={(e) => setCondenserInputs(prev => ({ ...prev, condenserType: e.target.value as any }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            >
              <option value="liebig">Liebig Condenser</option>
              <option value="shotgun">Shotgun Condenser</option>
            </select>
          </div>
        </div>
      </CalculatorCard>

      {/* Cooling Water Warming Calculator */}
      <CalculatorCard
        title="Cooling Water Warming Calculator"
        description="Calculate temperature rise in cooling water"
        icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
        result={calculateCoolingWaterWarming() ? `${calculateCoolingWaterWarming()}°C rise` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={coolingWaterInputs.unitSystem} 
            onChange={(unit) => setCoolingWaterInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Volume ({getVolumeUnit(coolingWaterInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={coolingWaterInputs.unitSystem === 'metric' ? '100' : '26.4'}
              value={coolingWaterInputs.waterVolume}
              onChange={(e) => setCoolingWaterInputs(prev => ({ ...prev, waterVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flow Rate ({getFlowRateUnit(coolingWaterInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={coolingWaterInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={coolingWaterInputs.flowRate}
              onChange={(e) => setCoolingWaterInputs(prev => ({ ...prev, flowRate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heating Power
              </label>
              <input
                type="number"
                step="100"
                placeholder="5000"
                value={coolingWaterInputs.heatingPower}
                onChange={(e) => setCoolingWaterInputs(prev => ({ ...prev, heatingPower: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Power Unit
              </label>
              <select
                value={coolingWaterInputs.powerUnit}
                onChange={(e) => setCoolingWaterInputs(prev => ({ ...prev, powerUnit: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              >
                <option value="watts">Watts</option>
                <option value="btu">BTU/h</option>
                <option value="kj">kJ/h</option>
              </select>
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Relative Volatility Calculator */}
      <CalculatorCard
        title="Relative Volatility Calculator"
        description="Calculate separation ease between compounds"
        icon={<BarChart3 className="w-6 h-6 text-orange-600" />}
        result={calculateRelativeVolatility() ? `α = ${calculateRelativeVolatility()}` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={relativeVolatilityInputs.unitSystem} 
            onChange={(unit) => setRelativeVolatilityInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compound 1 Vapor Pressure (kPa)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="101.3"
              value={relativeVolatilityInputs.compound1VaporPressure}
              onChange={(e) => setRelativeVolatilityInputs(prev => ({ ...prev, compound1VaporPressure: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compound 2 Vapor Pressure (kPa)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="40.5"
              value={relativeVolatilityInputs.compound2VaporPressure}
              onChange={(e) => setRelativeVolatilityInputs(prev => ({ ...prev, compound2VaporPressure: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temperature ({getTempUnit(relativeVolatilityInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={relativeVolatilityInputs.unitSystem === 'metric' ? '78.4' : '173'}
              value={relativeVolatilityInputs.temperature}
              onChange={(e) => setRelativeVolatilityInputs(prev => ({ ...prev, temperature: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Mole Fraction Calculator */}
      <CalculatorCard
        title="Mole Fraction Calculator"
        description="Calculate vapor mole fraction from liquid composition"
        icon={<Percent className="w-6 h-6 text-orange-600" />}
        result={calculateMoleFraction() ? `y = ${calculateMoleFraction()}` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={moleFractionInputs.unitSystem} 
            onChange={(unit) => setMoleFractionInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relative Volatility (α)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="2.5"
              value={moleFractionInputs.relativeVolatility}
              onChange={(e) => setMoleFractionInputs(prev => ({ ...prev, relativeVolatility: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Liquid Mole Fraction (x)
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.08"
              value={moleFractionInputs.liquidMoleFraction}
              onChange={(e) => setMoleFractionInputs(prev => ({ ...prev, liquidMoleFraction: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Range: 0.0 - 1.0
            </p>
          </div>
        </div>
      </CalculatorCard>

      {/* Percent Recovery Calculator */}
      <CalculatorCard
        title="Percent Recovery Calculator"
        description="Calculate distillation yield efficiency"
        icon={<Activity className="w-6 h-6 text-orange-600" />}
        result={calculatePercentRecovery() ? `${calculatePercentRecovery()}% recovery` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={percentRecoveryInputs.unitSystem} 
            onChange={(unit) => setPercentRecoveryInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Volume ({getVolumeUnit(percentRecoveryInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={percentRecoveryInputs.unitSystem === 'metric' ? '50' : '13.2'}
              value={percentRecoveryInputs.originalVolume}
              onChange={(e) => setPercentRecoveryInputs(prev => ({ ...prev, originalVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recovered Volume ({getVolumeUnit(percentRecoveryInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={percentRecoveryInputs.unitSystem === 'metric' ? '10' : '2.6'}
              value={percentRecoveryInputs.recoveredVolume}
              onChange={(e) => setPercentRecoveryInputs(prev => ({ ...prev, recoveredVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Distillation Efficiency Calculator */}
      <CalculatorCard
        title="Distillation Efficiency Calculator"
        description="Calculate overall distillation efficiency"
        icon={<Gauge className="w-6 h-6 text-orange-600" />}
        result={calculateDistillationEfficiency() ? `${calculateDistillationEfficiency()}% efficiency` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={distillationEfficiencyInputs.unitSystem} 
            onChange={(unit) => setDistillationEfficiencyInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Low Boiling Recovery (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="85"
              value={distillationEfficiencyInputs.lowBoilingRecovery}
              onChange={(e) => setDistillationEfficiencyInputs(prev => ({ ...prev, lowBoilingRecovery: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intermediate Recovery (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="10"
              value={distillationEfficiencyInputs.intermediateRecovery}
              onChange={(e) => setDistillationEfficiencyInputs(prev => ({ ...prev, intermediateRecovery: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              High Boiling Recovery (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="5"
              value={distillationEfficiencyInputs.highBoilingRecovery}
              onChange={(e) => setDistillationEfficiencyInputs(prev => ({ ...prev, highBoilingRecovery: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Pycnometer Volume Calculator */}
      <CalculatorCard
        title="Pycnometer Volume Calculator"
        description="Calculate pycnometer volume for precise measurements"
        icon={<TestTube2 className="w-6 h-6 text-orange-600" />}
        result={calculatePycnometerVolume() ? `${calculatePycnometerVolume()} mL` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={pycnometerInputs.unitSystem} 
            onChange={(unit) => setPycnometerInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Empty Weight ({getSmallWeightUnit(pycnometerInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={pycnometerInputs.unitSystem === 'metric' ? '25.0' : '0.88'}
              value={pycnometerInputs.emptyWeight}
              onChange={(e) => setPycnometerInputs(prev => ({ ...prev, emptyWeight: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Weight ({getSmallWeightUnit(pycnometerInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={pycnometerInputs.unitSystem === 'metric' ? '50.0' : '1.76'}
              value={pycnometerInputs.waterWeight}
              onChange={(e) => setPycnometerInputs(prev => ({ ...prev, waterWeight: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Temperature ({getTempUnit(pycnometerInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={pycnometerInputs.unitSystem === 'metric' ? '20' : '68'}
              value={pycnometerInputs.waterTemp}
              onChange={(e) => setPycnometerInputs(prev => ({ ...prev, waterTemp: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Pot Still Calculator */}
      <CalculatorCard
        title="Pot Still Calculator"
        description="Simulate pot still distillation with heat-up and collection times"
        icon={<Beaker className="w-6 h-6 text-orange-600" />}
        result={potStillResult.heatUpTime ? (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 p-2 rounded">
                <div className="font-semibold text-blue-700">Heat-up Time</div>
                <div className="text-blue-600">{potStillResult.heatUpTime} hours</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="font-semibold text-green-700">Est. ABV</div>
                <div className="text-green-600">{potStillResult.estimatedABV}%</div>
              </div>
              <div className="bg-amber-50 p-2 rounded">
                <div className="font-semibold text-amber-700">Collection</div>
                <div className="text-amber-600">{potStillResult.collectionTime} hours</div>
              </div>
              <div className="bg-purple-50 p-2 rounded">
                <div className="font-semibold text-purple-700">Total Time</div>
                <div className="text-purple-600">{potStillResult.totalTime} hours</div>
              </div>
            </div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={potStillInputs.unitSystem} 
            onChange={(unit) => setPotStillInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wash Volume ({getVolumeUnit(potStillInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={potStillInputs.unitSystem === 'metric' ? '50' : '13.2'}
              value={potStillInputs.washVolume}
              onChange={(e) => setPotStillInputs(prev => ({ ...prev, washVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wash ABV (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="8"
              value={potStillInputs.washABV}
              onChange={(e) => setPotStillInputs(prev => ({ ...prev, washABV: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heating Power
              </label>
              <input
                type="number"
                step="100"
                placeholder="5000"
                value={potStillInputs.heatingPower}
                onChange={(e) => setPotStillInputs(prev => ({ ...prev, heatingPower: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Power Unit
              </label>
              <select
                value={potStillInputs.powerUnit}
                onChange={(e) => setPotStillInputs(prev => ({ ...prev, powerUnit: e.target.value as 'watts' | 'btu' | 'kj' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              >
                <option value="watts">Watts</option>
                <option value="btu">BTU/h</option>
                <option value="kj">kJ/h</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Temperature
              </label>
              <input
                type="number"
                step="1"
                placeholder={potStillInputs.tempUnit === 'celsius' ? '20' : '68'}
                value={potStillInputs.startTemp}
                onChange={(e) => setPotStillInputs(prev => ({ ...prev, startTemp: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature Unit
              </label>
              <select
                value={potStillInputs.tempUnit}
                onChange={(e) => setPotStillInputs(prev => ({ ...prev, tempUnit: e.target.value as 'celsius' | 'fahrenheit' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
              </select>
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Distillation Simulator */}
      <CalculatorCard
        title="Distillation Simulator"
        description="Model pot still or column distillation with stage-by-stage analysis"
        icon={<Settings className="w-6 h-6 text-orange-600" />}
        result={simulatorResult.stages.length > 0 ? (
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm font-semibold text-green-700 mb-2">
                Final Yield: {simulatorResult.finalYield}%
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-2 py-1 text-left">Stage</th>
                    <th className="px-2 py-1 text-left">ABV%</th>
                    <th className="px-2 py-1 text-left">Temp°C</th>
                    <th className="px-2 py-1 text-left">Vol({getVolumeUnit(simulatorInputs.unitSystem)})</th>
                  </tr>
                </thead>
                <tbody>
                  {simulatorResult.stages.map((stage, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="px-2 py-1 font-medium">{stage.stage}</td>
                      <td className="px-2 py-1 text-blue-600">{stage.abv}</td>
                      <td className="px-2 py-1 text-red-600">{stage.temp}</td>
                      <td className="px-2 py-1 text-green-600">{stage.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={simulatorInputs.unitSystem} 
            onChange={(unit) => setSimulatorInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Still Type
            </label>
            <select
              value={simulatorInputs.stillType}
              onChange={(e) => setSimulatorInputs(prev => ({ ...prev, stillType: e.target.value as 'pot' | 'column' }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            >
              <option value="pot">Pot Still</option>
              <option value="column">Column Still</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wash Volume ({getVolumeUnit(simulatorInputs.unitSystem)})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={simulatorInputs.unitSystem === 'metric' ? '100' : '26.4'}
                value={simulatorInputs.washVolume}
                onChange={(e) => setSimulatorInputs(prev => ({ ...prev, washVolume: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wash ABV (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="8"
                value={simulatorInputs.washABV}
                onChange={(e) => setSimulatorInputs(prev => ({ ...prev, washABV: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theoretical Plates
              </label>
              <input
                type="number"
                step="1"
                value={simulatorInputs.theoreticalPlates}
                onChange={(e) => setSimulatorInputs(prev => ({ ...prev, theoreticalPlates: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reflux Ratio
              </label>
              <input
                type="number"
                step="0.1"
                value={simulatorInputs.refluxRatio}
                onChange={(e) => setSimulatorInputs(prev => ({ ...prev, refluxRatio: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Congeners Simulator */}
      <CalculatorCard
        title="Congeners Simulator"
        description="Predict aroma compound behavior during distillation"
        icon={<TestTube2 className="w-6 h-6 text-orange-600" />}
        result={congenersResult.concentration ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-semibold text-blue-700">Final Concentration</div>
                <div className="text-blue-600 text-lg">{congenersResult.concentration} ppm</div>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg">
                <div className="text-sm font-semibold text-amber-700">Recommendation</div>
                <div className="text-amber-600 text-sm">{congenersResult.cutRecommendation}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm font-semibold text-purple-700">Flavor Profile</div>
                <div className="text-purple-600 text-sm">{congenersResult.flavorProfile}</div>
              </div>
            </div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={congenersInputs.unitSystem} 
            onChange={(unit) => setCongenersInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compound Type
            </label>
            <select
              value={congenersInputs.compound}
              onChange={(e) => setCongenersInputs(prev => ({ ...prev, compound: e.target.value as any }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            >
              <option value="acetaldehyde">Acetaldehyde</option>
              <option value="ethyl_acetate">Ethyl Acetate</option>
              <option value="methanol">Methanol</option>
              <option value="fusel_oils">Fusel Oils</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Concentration (ppm)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="100"
              value={congenersInputs.initialConcentration}
              onChange={(e) => setCongenersInputs(prev => ({ ...prev, initialConcentration: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distillation Run
              </label>
              <input
                type="number"
                step="1"
                value={congenersInputs.distillationRun}
                onChange={(e) => setCongenersInputs(prev => ({ ...prev, distillationRun: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cut Point (%)
              </label>
              <input
                type="number"
                step="1"
                value={congenersInputs.cutPoint}
                onChange={(e) => setCongenersInputs(prev => ({ ...prev, cutPoint: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Boiling Point Calculator */}
      <CalculatorCard
        title="Boiling Point Calculator"
        description="Calculate boiling points for ethanol-water mixtures"
        icon={<Thermometer className="w-6 h-6 text-orange-600" />}
        result={boilingPointResult.boilingPoint ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-sm font-semibold text-red-700">Boiling Point</div>
                <div className="text-red-600 text-lg">{boilingPointResult.boilingPoint}°C</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-semibold text-blue-700">Vapor Pressure</div>
                <div className="text-blue-600">{boilingPointResult.vaporPressure} kPa</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm font-semibold text-green-700">Theoretical Plates</div>
                <div className="text-green-600">{boilingPointResult.theoreticalPlates} plates</div>
                <div className="text-xs text-green-500 mt-1">For 99% purity separation</div>
              </div>
            </div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={boilingPointInputs.unitSystem} 
            onChange={(unit) => setBoilingPointInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ethanol Percentage (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="40"
              value={boilingPointInputs.ethanolPercent}
              onChange={(e) => setBoilingPointInputs(prev => ({ ...prev, ethanolPercent: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Atmospheric Pressure
              </label>
              <input
                type="number"
                step="0.1"
                value={boilingPointInputs.atmosphericPressure}
                onChange={(e) => setBoilingPointInputs(prev => ({ ...prev, atmosphericPressure: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pressure Unit
              </label>
              <select
                value={boilingPointInputs.pressureUnit}
                onChange={(e) => setBoilingPointInputs(prev => ({ ...prev, pressureUnit: e.target.value as 'kpa' | 'psi' | 'mmhg' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              >
                <option value="kpa">kPa</option>
                <option value="psi">PSI</option>
                <option value="mmhg">mmHg</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Standard atmospheric pressure: 101.325 kPa (14.7 PSI, 760 mmHg)
          </p>
        </div>
      </CalculatorCard>
    </div>
  );
}

export default DistillationCalculators;