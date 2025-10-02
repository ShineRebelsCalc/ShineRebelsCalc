import React, { useState } from 'react';
import { Calculator, Thermometer, Droplets, Beaker, FlaskConical, Scale, Gauge, Zap, TestTube, Activity, BarChart3, Percent, Timer, TrendingUp, Blend, Eye, Snowflake, Wind } from 'lucide-react';
import CalculatorCard from './CalculatorCard';

// Interfaces for all calculator inputs
interface ABVInputs {
  originalGravity: string;
  finalGravity: string;
  specificGravity: string;
  calculatorType: 'gravity' | 'sg';
  unitSystem: 'metric' | 'sae';
}

interface BrixInputs {
  brix: string;
  plato: string;
  specificGravity: string;
  conversionType: 'brix-to-sg' | 'plato-to-sg' | 'sg-to-brix';
  unitSystem: 'metric' | 'sae';
}

interface HydrometerInputs {
  reading: string;
  temperature: string;
  calibrationTemp: string;
  unitSystem: 'metric' | 'sae';
}

interface IBUInputs {
  hops: Array<{
    id: string;
    weight: string;
    alphaAcid: string;
    boilTime: string;
    hopType: 'pellet' | 'whole';
  }>;
  batchSize: string;
  boilGravity: string;
  unitSystem: 'metric' | 'sae';
}

interface SRMInputs {
  malts: Array<{
    id: string;
    weight: string;
    lovibond: string;
  }>;
  batchSize: string;
  unitSystem: 'metric' | 'sae';
}

interface YeastInputs {
  batchSize: string;
  originalGravity: string;
  yeastType: 'dry' | 'liquid' | 'slurry';
  viability: string;
  cellCount: string;
  pitchRate: string;
  unitSystem: 'metric' | 'sae';
}

interface MashInfusionInputs {
  grainWeight: string;
  grainTemp: string;
  targetTemp: string;
  mashRatio: string;
  unitSystem: 'metric' | 'sae';
}

interface CarbonationInputs {
  temperature: string;
  co2Volumes: string;
  unitSystem: 'metric' | 'sae';
}

interface PrimingSugarInputs {
  beerVolume: string;
  currentCO2: string;
  targetCO2: string;
  temperature: string;
  sugarType: 'corn' | 'table' | 'dme' | 'honey';
  unitSystem: 'metric' | 'sae';
}

interface DilutionInputs {
  originalVolume: string;
  originalGravity: string;
  targetGravity: string;
  unitSystem: 'metric' | 'sae';
}

interface ExtractConversionInputs {
  amount: string;
  conversionType: 'lme-to-dme' | 'dme-to-lme' | 'extract-to-grain' | 'grain-to-extract';
  efficiency: string;
  unitSystem: 'metric' | 'sae';
}

interface BrewhouseEfficiencyInputs {
  grainWeight: string;
  grainPotential: string;
  batchSize: string;
  originalGravity: string;
  unitSystem: 'metric' | 'sae';
}

interface CaloriesInputs {
  originalGravity: string;
  finalGravity: string;
  volume: string;
  unitSystem: 'metric' | 'sae';
}

interface BoilOffInputs {
  preBoilVolume: string;
  boilTime: string;
  evaporationRate: string;
  unitSystem: 'metric' | 'sae';
}

interface BeerLineInputs {
  temperature: string;
  co2Pressure: string;
  verticalRise: string;
  lineID: string;
  unitSystem: 'metric' | 'sae';
}

interface MashSpargeInputs {
  grainWeight: string;
  mashRatio: string;
  spargeRatio: string;
  grainTemp: string;
  targetMashTemp: string;
  unitSystem: 'metric' | 'sae';
}

interface MaltExtractInputs {
  targetGravity: string;
  batchSize: string;
  extractType: 'lme' | 'dme';
  extractPotential: string;
  unitSystem: 'metric' | 'sae';
}

interface HopExtractInputs {
  targetIBU: string;
  batchSize: string;
  boilGravity: string;
  extractAlphaAcid: string;
  unitSystem: 'metric' | 'sae';
}

function BrewingCalculators() {
  // State for all calculators
  const [abvInputs, setAbvInputs] = useState<ABVInputs>({
    originalGravity: '',
    finalGravity: '',
    specificGravity: '',
    calculatorType: 'gravity',
    unitSystem: 'metric'
  });

  const [brixInputs, setBrixInputs] = useState<BrixInputs>({
    brix: '',
    plato: '',
    specificGravity: '',
    conversionType: 'brix-to-sg',
    unitSystem: 'metric'
  });

  const [hydrometerInputs, setHydrometerInputs] = useState<HydrometerInputs>({
    reading: '',
    temperature: '',
    calibrationTemp: '20',
    unitSystem: 'metric'
  });

  const [ibuInputs, setIbuInputs] = useState<IBUInputs>({
    hops: [{ id: '1', weight: '', alphaAcid: '', boilTime: '', hopType: 'pellet' }],
    batchSize: '',
    boilGravity: '',
    unitSystem: 'metric'
  });

  const [srmInputs, setSrmInputs] = useState<SRMInputs>({
    malts: [{ id: '1', weight: '', lovibond: '' }],
    batchSize: '',
    unitSystem: 'metric'
  });

  const [yeastInputs, setYeastInputs] = useState<YeastInputs>({
    batchSize: '',
    originalGravity: '',
    yeastType: 'dry',
    viability: '97',
    cellCount: '20',
    pitchRate: '0.75',
    unitSystem: 'metric'
  });

  const [mashInfusionInputs, setMashInfusionInputs] = useState<MashInfusionInputs>({
    grainWeight: '',
    grainTemp: '',
    targetTemp: '',
    mashRatio: '2.5',
    unitSystem: 'metric'
  });

  const [carbonationInputs, setCarbonationInputs] = useState<CarbonationInputs>({
    temperature: '',
    co2Volumes: '',
    unitSystem: 'metric'
  });

  const [primingSugarInputs, setPrimingSugarInputs] = useState<PrimingSugarInputs>({
    beerVolume: '',
    currentCO2: '0.8',
    targetCO2: '',
    temperature: '',
    sugarType: 'corn',
    unitSystem: 'metric'
  });

  const [dilutionInputs, setDilutionInputs] = useState<DilutionInputs>({
    originalVolume: '',
    originalGravity: '',
    targetGravity: '',
    unitSystem: 'metric'
  });

  const [extractConversionInputs, setExtractConversionInputs] = useState<ExtractConversionInputs>({
    amount: '',
    conversionType: 'lme-to-dme',
    efficiency: '75',
    unitSystem: 'metric'
  });

  const [brewhouseEfficiencyInputs, setBrewhouseEfficiencyInputs] = useState<BrewhouseEfficiencyInputs>({
    grainWeight: '',
    grainPotential: '37',
    batchSize: '',
    originalGravity: '',
    unitSystem: 'metric'
  });

  const [caloriesInputs, setCaloriesInputs] = useState<CaloriesInputs>({
    originalGravity: '',
    finalGravity: '',
    volume: '',
    unitSystem: 'metric'
  });

  const [boilOffInputs, setBoilOffInputs] = useState<BoilOffInputs>({
    preBoilVolume: '',
    boilTime: '',
    evaporationRate: '10',
    unitSystem: 'metric'
  });

  const [beerLineInputs, setBeerLineInputs] = useState<BeerLineInputs>({
    temperature: '',
    co2Pressure: '',
    verticalRise: '0',
    lineID: '4',
    unitSystem: 'metric'
  });

  const [mashSpargeInputs, setMashSpargeInputs] = useState<MashSpargeInputs>({
    grainWeight: '',
    mashRatio: '2.5',
    spargeRatio: '3.5',
    grainTemp: '',
    targetMashTemp: '',
    unitSystem: 'metric'
  });

  const [maltExtractInputs, setMaltExtractInputs] = useState<MaltExtractInputs>({
    targetGravity: '',
    batchSize: '',
    extractType: 'lme',
    extractPotential: '37',
    unitSystem: 'metric'
  });

  const [hopExtractInputs, setHopExtractInputs] = useState<HopExtractInputs>({
    targetIBU: '',
    batchSize: '',
    boilGravity: '',
    extractAlphaAcid: '45',
    unitSystem: 'metric'
  });

  // Unit conversion functions
  const convertVolume = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 0.264172 : value * 3.78541; // L to gal or gal to L
  };

  const convertWeight = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 2.20462 : value * 0.453592; // kg to lbs or lbs to kg
  };

  const convertTemperature = (value: number, toCelsius: boolean): number => {
    return toCelsius ? (value - 32) * 5/9 : (value * 9/5) + 32;
  };

  const convertPressure = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 0.145038 : value * 6.89476; // kPa to PSI or PSI to kPa
  };

  const convertLength = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 3.28084 : value * 0.3048; // m to ft or ft to m
  };

  const convertSmallVolume = (value: number, fromMetric: boolean): number => {
    return fromMetric ? value * 0.033814 : value * 29.5735; // mL to fl oz or fl oz to mL
  };

  // Helper functions for unit labels
  const getVolumeUnit = (unitSystem: string) => unitSystem === 'metric' ? 'L' : 'gal';
  const getWeightUnit = (unitSystem: string) => unitSystem === 'metric' ? 'kg' : 'lbs';
  const getTempUnit = (unitSystem: string) => unitSystem === 'metric' ? '°C' : '°F';
  const getPressureUnit = (unitSystem: string) => unitSystem === 'metric' ? 'kPa' : 'PSI';
  const getLengthUnit = (unitSystem: string) => unitSystem === 'metric' ? 'm' : 'ft';
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
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-amber-600 hover:bg-white'
          }`}
        >
          Metric
        </button>
        <button
          onClick={() => onChange('sae')}
          className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
            unitSystem === 'sae'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-amber-600 hover:bg-white'
          }`}
        >
          SAE
        </button>
      </div>
    </div>
  );

  // ABV Calculator
  const calculateABV = (): string => {
    if (abvInputs.calculatorType === 'gravity') {
      const og = parseFloat(abvInputs.originalGravity);
      const fg = parseFloat(abvInputs.finalGravity);
      if (isNaN(og) || isNaN(fg)) return '';
      return ((og - fg) * 131.25).toFixed(2);
    } else {
      const sg = parseFloat(abvInputs.specificGravity);
      if (isNaN(sg) || sg < 0.7 || sg > 1.0) return '';
      return ((1 - sg) * 129.8).toFixed(2);
    }
  };

  // Brix/Plato/SG Converter
  const convertBrixPlato = (): string => {
    const { brix, plato, specificGravity, conversionType } = brixInputs;
    
    switch (conversionType) {
      case 'brix-to-sg':
        const brixVal = parseFloat(brix);
        if (isNaN(brixVal)) return '';
        return (1 + (brixVal / (258.6 - ((brixVal / 258.2) * 227.1)))).toFixed(3);
      
      case 'plato-to-sg':
        const platoVal = parseFloat(plato);
        if (isNaN(platoVal)) return '';
        return (1 + (platoVal / (258.6 - ((platoVal / 258.2) * 227.1)))).toFixed(3);
      
      case 'sg-to-brix':
        const sgVal = parseFloat(specificGravity);
        if (isNaN(sgVal)) return '';
        return (((sgVal - 1) * 1000) * 0.25).toFixed(1);
      
      default:
        return '';
    }
  };

  // Hydrometer Temperature Correction
  const calculateHydrometerCorrection = (): string => {
    const reading = parseFloat(hydrometerInputs.reading);
    const temp = parseFloat(hydrometerInputs.temperature);
    const calibTemp = parseFloat(hydrometerInputs.calibrationTemp);
    
    if (isNaN(reading) || isNaN(temp) || isNaN(calibTemp)) return '';
    
    // Convert to Celsius if needed
    const tempC = hydrometerInputs.unitSystem === 'sae' ? convertTemperature(temp, true) : temp;
    const calibTempC = hydrometerInputs.unitSystem === 'sae' ? convertTemperature(calibTemp, true) : calibTemp;
    
    // Temperature correction formula
    const correction = 0.00130346 * (tempC - calibTempC);
    const correctedReading = reading + correction;
    
    return correctedReading.toFixed(3);
  };

  // IBU Calculator (Tinseth Formula)
  const calculateIBU = (): string => {
    const batchSize = parseFloat(ibuInputs.batchSize);
    const boilGravity = parseFloat(ibuInputs.boilGravity);
    
    if (isNaN(batchSize) || isNaN(boilGravity)) return '';
    
    // Convert batch size to liters if needed
    const batchSizeL = ibuInputs.unitSystem === 'sae' ? convertVolume(batchSize, false) : batchSize;
    
    let totalIBU = 0;
    
    ibuInputs.hops.forEach(hop => {
      const weight = parseFloat(hop.weight);
      const alphaAcid = parseFloat(hop.alphaAcid);
      const boilTime = parseFloat(hop.boilTime);
      
      if (!isNaN(weight) && !isNaN(alphaAcid) && !isNaN(boilTime)) {
        // Convert weight to grams if needed
        const weightG = ibuInputs.unitSystem === 'sae' ? convertWeight(weight, false) * 1000 : weight;
        
        // Tinseth formula
        const utilizationFactor = 1.65 * Math.pow(0.000125, boilGravity - 1);
        const timeFactor = (1 - Math.exp(-0.04 * boilTime)) / 4.15;
        const utilization = utilizationFactor * timeFactor;
        
        const hopIBU = (weightG * alphaAcid * utilization * 1000) / (batchSizeL * 100);
        totalIBU += hopIBU;
      }
    });
    
    return totalIBU.toFixed(1);
  };

  // SRM Calculator (Morey's Formula)
  const calculateSRM = (): { srm: string; color: string } => {
    const batchSize = parseFloat(srmInputs.batchSize);
    if (isNaN(batchSize)) return { srm: '', color: '' };
    
    // Convert batch size to liters if needed
    const batchSizeL = srmInputs.unitSystem === 'sae' ? convertVolume(batchSize, false) : batchSize;
    
    let totalMCU = 0;
    
    srmInputs.malts.forEach(malt => {
      const weight = parseFloat(malt.weight);
      const lovibond = parseFloat(malt.lovibond);
      
      if (!isNaN(weight) && !isNaN(lovibond)) {
        // Convert weight to kg if needed
        const weightKg = srmInputs.unitSystem === 'sae' ? convertWeight(weight, false) : weight;
        
        const mcu = (weightKg * lovibond) / batchSizeL;
        totalMCU += mcu;
      }
    });
    
    // Morey's Formula
    const srm = 1.4922 * Math.pow(totalMCU, 0.6859);
    
    // Color approximation
    const getColor = (srmValue: number): string => {
      if (srmValue < 2) return '#FFE699';
      if (srmValue < 3) return '#FFD878';
      if (srmValue < 4) return '#FFCA5A';
      if (srmValue < 6) return '#FFBF42';
      if (srmValue < 9) return '#FBB123';
      if (srmValue < 12) return '#EA8F00';
      if (srmValue < 15) return '#D2691E';
      if (srmValue < 18) return '#CC6600';
      if (srmValue < 22) return '#B45F04';
      if (srmValue < 30) return '#8B4513';
      return '#654321';
    };
    
    return {
      srm: srm.toFixed(1),
      color: getColor(srm)
    };
  };

  // Yeast Pitch Rate Calculator
  const calculateYeastPitchRate = (): { cellsNeeded: string; starterVolume: string; packetsNeeded: string } => {
    const batchSize = parseFloat(yeastInputs.batchSize);
    const og = parseFloat(yeastInputs.originalGravity);
    const viability = parseFloat(yeastInputs.viability);
    const cellCount = parseFloat(yeastInputs.cellCount);
    const pitchRate = parseFloat(yeastInputs.pitchRate);
    
    if (isNaN(batchSize) || isNaN(og) || isNaN(viability) || isNaN(cellCount) || isNaN(pitchRate)) {
      return { cellsNeeded: '', starterVolume: '', packetsNeeded: '' };
    }
    
    // Convert batch size to liters if needed
    const batchSizeL = yeastInputs.unitSystem === 'sae' ? convertVolume(batchSize, false) : batchSize;
    
    // Calculate cells needed (billion cells)
    const cellsNeeded = batchSizeL * pitchRate * og;
    
    // Calculate viable cells from package
    const viableCells = (cellCount * viability) / 100;
    
    // Calculate starter volume needed (simplified)
    const additionalCells = Math.max(0, cellsNeeded - viableCells);
    const starterVolume = additionalCells * 0.1; // Simplified calculation
    
    // Calculate packets needed
    const packetsNeeded = Math.ceil(cellsNeeded / viableCells);
    
    return {
      cellsNeeded: cellsNeeded.toFixed(1),
      starterVolume: starterVolume > 0 ? starterVolume.toFixed(1) : '0',
      packetsNeeded: packetsNeeded.toString()
    };
  };

  // Mash Infusion Calculator
  const calculateMashInfusion = (): { strikeWaterTemp: string; strikeWaterVolume: string } => {
    const grainWeight = parseFloat(mashInfusionInputs.grainWeight);
    const grainTemp = parseFloat(mashInfusionInputs.grainTemp);
    const targetTemp = parseFloat(mashInfusionInputs.targetTemp);
    const mashRatio = parseFloat(mashInfusionInputs.mashRatio);
    
    if (isNaN(grainWeight) || isNaN(grainTemp) || isNaN(targetTemp) || isNaN(mashRatio)) {
      return { strikeWaterTemp: '', strikeWaterVolume: '' };
    }
    
    // Convert temperatures to Celsius if needed
    const grainTempC = mashInfusionInputs.unitSystem === 'sae' ? convertTemperature(grainTemp, true) : grainTemp;
    const targetTempC = mashInfusionInputs.unitSystem === 'sae' ? convertTemperature(targetTemp, true) : targetTemp;
    
    // Convert grain weight and ratio based on unit system
    let grainWeightKg = grainWeight;
    let ratioLperKg = mashRatio;
    
    if (mashInfusionInputs.unitSystem === 'sae') {
      grainWeightKg = convertWeight(grainWeight, false); // lbs to kg
      ratioLperKg = mashRatio * 2.08635; // qt/lb to L/kg
    }
    
    // Strike water temperature calculation
    const strikeWaterTempC = (0.2 / ratioLperKg) * (targetTempC - grainTempC) + targetTempC;
    
    // Strike water volume
    const strikeWaterVolumeL = grainWeightKg * ratioLperKg;
    
    // Convert back to display units
    const strikeWaterTemp = mashInfusionInputs.unitSystem === 'sae' ? 
      convertTemperature(strikeWaterTempC, false) : strikeWaterTempC;
    const strikeWaterVolume = mashInfusionInputs.unitSystem === 'sae' ? 
      convertVolume(strikeWaterVolumeL, true) : strikeWaterVolumeL;
    
    return {
      strikeWaterTemp: strikeWaterTemp.toFixed(1),
      strikeWaterVolume: strikeWaterVolume.toFixed(1)
    };
  };

  // Force Carbonation Calculator
  const calculateCarbonation = (): string => {
    const temp = parseFloat(carbonationInputs.temperature);
    const co2Vols = parseFloat(carbonationInputs.co2Volumes);
    
    if (isNaN(temp) || isNaN(co2Vols)) return '';
    
    // Convert temperature to Celsius if needed
    const tempC = carbonationInputs.unitSystem === 'sae' ? convertTemperature(temp, true) : temp;
    
    // Henry's Law calculation for CO2 solubility
    const pressure = (co2Vols - 0.5) * (tempC * 0.2 + 6.8);
    
    // Convert pressure to display units
    const displayPressure = carbonationInputs.unitSystem === 'sae' ? 
      convertPressure(pressure, true) : pressure;
    
    return displayPressure.toFixed(1);
  };

  // Priming Sugar Calculator
  const calculatePrimingSugar = (): string => {
    const volume = parseFloat(primingSugarInputs.beerVolume);
    const currentCO2 = parseFloat(primingSugarInputs.currentCO2);
    const targetCO2 = parseFloat(primingSugarInputs.targetCO2);
    const temp = parseFloat(primingSugarInputs.temperature);
    
    if (isNaN(volume) || isNaN(currentCO2) || isNaN(targetCO2) || isNaN(temp)) return '';
    
    // Convert volume to liters if needed
    const volumeL = primingSugarInputs.unitSystem === 'sae' ? convertVolume(volume, false) : volume;
    
    // Convert temperature to Celsius if needed
    const tempC = primingSugarInputs.unitSystem === 'sae' ? convertTemperature(temp, true) : temp;
    
    // Calculate CO2 needed
    const co2Needed = targetCO2 - currentCO2;
    
    // Sugar factors (grams per liter per volume of CO2)
    const sugarFactors = {
      corn: 4.0,
      table: 3.8,
      dme: 4.6,
      honey: 3.5
    };
    
    const sugarNeeded = volumeL * co2Needed * sugarFactors[primingSugarInputs.sugarType];
    
    return sugarNeeded.toFixed(1);
  };

  // Dilution Calculator
  const calculateDilution = (): { waterNeeded: string; finalVolume: string } => {
    const originalVolume = parseFloat(dilutionInputs.originalVolume);
    const originalGravity = parseFloat(dilutionInputs.originalGravity);
    const targetGravity = parseFloat(dilutionInputs.targetGravity);
    
    if (isNaN(originalVolume) || isNaN(originalGravity) || isNaN(targetGravity) || targetGravity >= originalGravity) {
      return { waterNeeded: '', finalVolume: '' };
    }
    
    // Convert volume to liters if needed
    const originalVolumeL = dilutionInputs.unitSystem === 'sae' ? convertVolume(originalVolume, false) : originalVolume;
    
    // Calculate final volume needed
    const finalVolumeL = (originalVolumeL * (originalGravity - 1)) / (targetGravity - 1);
    const waterNeededL = finalVolumeL - originalVolumeL;
    
    // Convert back to display units
    const finalVolume = dilutionInputs.unitSystem === 'sae' ? convertVolume(finalVolumeL, true) : finalVolumeL;
    const waterNeeded = dilutionInputs.unitSystem === 'sae' ? convertVolume(waterNeededL, true) : waterNeededL;
    
    return {
      waterNeeded: waterNeeded.toFixed(2),
      finalVolume: finalVolume.toFixed(2)
    };
  };

  // Extract Conversion Calculator
  const calculateExtractConversion = (): string => {
    const amount = parseFloat(extractConversionInputs.amount);
    const efficiency = parseFloat(extractConversionInputs.efficiency);
    
    if (isNaN(amount)) return '';
    
    // Convert amount based on unit system
    const amountKg = extractConversionInputs.unitSystem === 'sae' ? convertWeight(amount, false) : amount;
    
    let result = 0;
    
    switch (extractConversionInputs.conversionType) {
      case 'lme-to-dme':
        result = amountKg * 0.8; // LME is ~80% solids
        break;
      case 'dme-to-lme':
        result = amountKg * 1.25; // DME is ~100% solids
        break;
      case 'extract-to-grain':
        result = amountKg * 1.5 * (100 / efficiency); // Approximate conversion
        break;
      case 'grain-to-extract':
        result = amountKg * 0.67 * (efficiency / 100); // Approximate conversion
        break;
    }
    
    // Convert back to display units
    const displayResult = extractConversionInputs.unitSystem === 'sae' ? convertWeight(result, true) : result;
    
    return displayResult.toFixed(2);
  };

  // Brewhouse Efficiency Calculator
  const calculateBrewhouseEfficiency = (): string => {
    const grainWeight = parseFloat(brewhouseEfficiencyInputs.grainWeight);
    const grainPotential = parseFloat(brewhouseEfficiencyInputs.grainPotential);
    const batchSize = parseFloat(brewhouseEfficiencyInputs.batchSize);
    const og = parseFloat(brewhouseEfficiencyInputs.originalGravity);
    
    if (isNaN(grainWeight) || isNaN(grainPotential) || isNaN(batchSize) || isNaN(og)) return '';
    
    // Convert to metric if needed
    const grainWeightKg = brewhouseEfficiencyInputs.unitSystem === 'sae' ? convertWeight(grainWeight, false) : grainWeight;
    const batchSizeL = brewhouseEfficiencyInputs.unitSystem === 'sae' ? convertVolume(batchSize, false) : batchSize;
    
    // Calculate potential points
    const potentialPoints = (grainWeightKg * grainPotential) / batchSizeL;
    const actualPoints = (og - 1) * 1000;
    
    const efficiency = (actualPoints / potentialPoints) * 100;
    
    return efficiency.toFixed(1);
  };

  // Beer Calories Calculator
  const calculateCalories = (): { totalCalories: string; caloriesPerServing: string } => {
    const og = parseFloat(caloriesInputs.originalGravity);
    const fg = parseFloat(caloriesInputs.finalGravity);
    const volume = parseFloat(caloriesInputs.volume);
    
    if (isNaN(og) || isNaN(fg) || isNaN(volume)) {
      return { totalCalories: '', caloriesPerServing: '' };
    }
    
    // Convert volume to liters if needed
    const volumeL = caloriesInputs.unitSystem === 'sae' ? convertVolume(volume, false) : volume;
    
    // Calculate ABV
    const abv = (og - fg) * 131.25;
    
    // Calculate calories (simplified formula)
    const alcoholCalories = volumeL * 1000 * (abv / 100) * 0.789 * 7; // 7 cal/g alcohol
    const residualSugarCalories = volumeL * 1000 * ((fg - 1) * 1000) * 0.004 * 4; // 4 cal/g sugar
    
    const totalCalories = alcoholCalories + residualSugarCalories;
    const servingSize = caloriesInputs.unitSystem === 'sae' ? 355 : 330; // mL per serving
    const caloriesPerServing = (totalCalories / volumeL) * (servingSize / 1000);
    
    return {
      totalCalories: totalCalories.toFixed(0),
      caloriesPerServing: caloriesPerServing.toFixed(0)
    };
  };

  // Boil-Off Calculator
  const calculateBoilOff = (): { postBoilVolume: string; postBoilGravity: string } => {
    const preBoilVolume = parseFloat(boilOffInputs.preBoilVolume);
    const boilTime = parseFloat(boilOffInputs.boilTime);
    const evaporationRate = parseFloat(boilOffInputs.evaporationRate);
    
    if (isNaN(preBoilVolume) || isNaN(boilTime) || isNaN(evaporationRate)) {
      return { postBoilVolume: '', postBoilGravity: '' };
    }
    
    // Convert volume to liters if needed
    const preBoilVolumeL = boilOffInputs.unitSystem === 'sae' ? convertVolume(preBoilVolume, false) : preBoilVolume;
    
    // Calculate volume loss
    const volumeLoss = preBoilVolumeL * (evaporationRate / 100) * (boilTime / 60);
    const postBoilVolumeL = preBoilVolumeL - volumeLoss;
    
    // Convert back to display units
    const postBoilVolume = boilOffInputs.unitSystem === 'sae' ? convertVolume(postBoilVolumeL, true) : postBoilVolumeL;
    
    return {
      postBoilVolume: postBoilVolume.toFixed(2),
      postBoilGravity: 'Depends on pre-boil gravity'
    };
  };

  // Beer Line Length Calculator
  const calculateBeerLineLength = (): string => {
    const temp = parseFloat(beerLineInputs.temperature);
    const pressure = parseFloat(beerLineInputs.co2Pressure);
    const verticalRise = parseFloat(beerLineInputs.verticalRise);
    const lineID = parseFloat(beerLineInputs.lineID);
    
    if (isNaN(temp) || isNaN(pressure) || isNaN(verticalRise) || isNaN(lineID)) return '';
    
    // Convert units to metric for calculation
    const tempC = beerLineInputs.unitSystem === 'sae' ? convertTemperature(temp, true) : temp;
    const pressureKPa = beerLineInputs.unitSystem === 'sae' ? convertPressure(pressure, false) : pressure;
    const verticalRiseM = beerLineInputs.unitSystem === 'sae' ? convertLength(verticalRise, false) : verticalRise;
    const lineIDmm = beerLineInputs.unitSystem === 'sae' ? lineID * 25.4 : lineID; // inches to mm
    
    // Simplified beer line calculation
    const targetPressure = 1.5; // Target serving pressure in PSI
    const pressureDrop = pressureKPa - convertPressure(targetPressure, false);
    const verticalPressure = verticalRiseM * 2.31; // PSI per foot of rise
    
    // Line resistance calculation (simplified)
    const lineResistance = 2.2; // PSI per foot for 3/16" line
    const requiredLength = (pressureDrop - verticalPressure) / lineResistance;
    
    // Convert back to display units
    const displayLength = beerLineInputs.unitSystem === 'sae' ? requiredLength : convertLength(requiredLength, false);
    
    return Math.max(0, displayLength).toFixed(1);
  };

  // Mash and Sparge Water Calculator
  const calculateMashSpargeWater = (): { 
    strikeWaterVolume: string; 
    strikeWaterTemp: string; 
    spargeWaterVolume: string; 
    totalWaterVolume: string 
  } => {
    const grainWeight = parseFloat(mashSpargeInputs.grainWeight);
    const mashRatio = parseFloat(mashSpargeInputs.mashRatio);
    const spargeRatio = parseFloat(mashSpargeInputs.spargeRatio);
    const grainTemp = parseFloat(mashSpargeInputs.grainTemp);
    const targetMashTemp = parseFloat(mashSpargeInputs.targetMashTemp);
    
    if (isNaN(grainWeight) || isNaN(mashRatio) || isNaN(spargeRatio) || isNaN(grainTemp) || isNaN(targetMashTemp)) {
      return { strikeWaterVolume: '', strikeWaterTemp: '', spargeWaterVolume: '', totalWaterVolume: '' };
    }
    
    // Convert units for calculation
    let grainWeightKg = grainWeight;
    let mashRatioLperKg = mashRatio;
    let spargeRatioLperKg = spargeRatio;
    
    if (mashSpargeInputs.unitSystem === 'sae') {
      grainWeightKg = convertWeight(grainWeight, false); // lbs to kg
      mashRatioLperKg = mashRatio * 2.08635; // qt/lb to L/kg
      spargeRatioLperKg = spargeRatio * 2.08635; // qt/lb to L/kg
    }
    
    // Convert temperatures to Celsius if needed
    const grainTempC = mashSpargeInputs.unitSystem === 'sae' ? convertTemperature(grainTemp, true) : grainTemp;
    const targetMashTempC = mashSpargeInputs.unitSystem === 'sae' ? convertTemperature(targetMashTemp, true) : targetMashTemp;
    
    // Calculate volumes
    const strikeWaterVolumeL = grainWeightKg * mashRatioLperKg;
    const spargeWaterVolumeL = grainWeightKg * spargeRatioLperKg;
    const totalWaterVolumeL = strikeWaterVolumeL + spargeWaterVolumeL;
    
    // Calculate strike water temperature
    const strikeWaterTempC = (0.2 / mashRatioLperKg) * (targetMashTempC - grainTempC) + targetMashTempC;
    
    // Convert back to display units
    const strikeWaterVolume = mashSpargeInputs.unitSystem === 'sae' ? convertVolume(strikeWaterVolumeL, true) : strikeWaterVolumeL;
    const spargeWaterVolume = mashSpargeInputs.unitSystem === 'sae' ? convertVolume(spargeWaterVolumeL, true) : spargeWaterVolumeL;
    const totalWaterVolume = mashSpargeInputs.unitSystem === 'sae' ? convertVolume(totalWaterVolumeL, true) : totalWaterVolumeL;
    const strikeWaterTemp = mashSpargeInputs.unitSystem === 'sae' ? convertTemperature(strikeWaterTempC, false) : strikeWaterTempC;
    
    return {
      strikeWaterVolume: strikeWaterVolume.toFixed(1),
      strikeWaterTemp: strikeWaterTemp.toFixed(1),
      spargeWaterVolume: spargeWaterVolume.toFixed(1),
      totalWaterVolume: totalWaterVolume.toFixed(1)
    };
  };

  // Malt Extract Calculator
  const calculateMaltExtract = (): string => {
    const targetGravity = parseFloat(maltExtractInputs.targetGravity);
    const batchSize = parseFloat(maltExtractInputs.batchSize);
    const extractPotential = parseFloat(maltExtractInputs.extractPotential);
    
    if (isNaN(targetGravity) || isNaN(batchSize) || isNaN(extractPotential)) return '';
    
    // Convert batch size to liters if needed
    const batchSizeL = maltExtractInputs.unitSystem === 'sae' ? convertVolume(batchSize, false) : batchSize;
    
    // Calculate extract needed
    const gravityPoints = (targetGravity - 1) * 1000;
    const extractNeededKg = (gravityPoints * batchSizeL) / extractPotential;
    
    // Convert to display units
    const extractNeeded = maltExtractInputs.unitSystem === 'sae' ? convertWeight(extractNeededKg, true) : extractNeededKg;
    
    return extractNeeded.toFixed(2);
  };

  // Hop Extract Calculator
  const calculateHopExtract = (): string => {
    const targetIBU = parseFloat(hopExtractInputs.targetIBU);
    const batchSize = parseFloat(hopExtractInputs.batchSize);
    const boilGravity = parseFloat(hopExtractInputs.boilGravity);
    const extractAlphaAcid = parseFloat(hopExtractInputs.extractAlphaAcid);
    
    if (isNaN(targetIBU) || isNaN(batchSize) || isNaN(boilGravity) || isNaN(extractAlphaAcid)) return '';
    
    // Convert batch size to liters if needed
    const batchSizeL = hopExtractInputs.unitSystem === 'sae' ? convertVolume(batchSize, false) : batchSize;
    
    // Calculate extract needed (simplified)
    const extractNeededmL = (targetIBU * batchSizeL) / (extractAlphaAcid * 10);
    
    // Convert to display units
    const extractNeeded = hopExtractInputs.unitSystem === 'sae' ? convertSmallVolume(extractNeededmL, true) : extractNeededmL;
    
    return extractNeeded.toFixed(1);
  };

  // Helper functions for hop and malt management
  const addHop = () => {
    const newHop = {
      id: Date.now().toString(),
      weight: '',
      alphaAcid: '',
      boilTime: '',
      hopType: 'pellet' as const
    };
    setIbuInputs(prev => ({
      ...prev,
      hops: [...prev.hops, newHop]
    }));
  };

  const removeHop = (id: string) => {
    setIbuInputs(prev => ({
      ...prev,
      hops: prev.hops.filter(hop => hop.id !== id)
    }));
  };

  const updateHop = (id: string, field: string, value: string) => {
    setIbuInputs(prev => ({
      ...prev,
      hops: prev.hops.map(hop =>
        hop.id === id ? { ...hop, [field]: value } : hop
      )
    }));
  };

  const addMalt = () => {
    const newMalt = {
      id: Date.now().toString(),
      weight: '',
      lovibond: ''
    };
    setSrmInputs(prev => ({
      ...prev,
      malts: [...prev.malts, newMalt]
    }));
  };

  const removeMalt = (id: string) => {
    setSrmInputs(prev => ({
      ...prev,
      malts: prev.malts.filter(malt => malt.id !== id)
    }));
  };

  const updateMalt = (id: string, field: string, value: string) => {
    setSrmInputs(prev => ({
      ...prev,
      malts: prev.malts.map(malt =>
        malt.id === id ? { ...malt, [field]: value } : malt
      )
    }));
  };

  // Get calculation results
  const dilutionResult = calculateDilution();
  const yeastResult = calculateYeastPitchRate();
  const mashInfusionResult = calculateMashInfusion();
  const srmResult = calculateSRM();
  const caloriesResult = calculateCalories();
  const boilOffResult = calculateBoilOff();
  const mashSpargeResult = calculateMashSpargeWater();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* ABV Calculator */}
      <CalculatorCard
        title="ABV Calculator"
        description="Calculate alcohol content from gravity readings or specific gravity"
        icon={<Calculator className="w-6 h-6 text-amber-600" />}
        result={calculateABV() ? `${calculateABV()}% ABV` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={abvInputs.unitSystem} 
            onChange={(unit) => setAbvInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculator Type
            </label>
            <select
              value={abvInputs.calculatorType}
              onChange={(e) => setAbvInputs(prev => ({ ...prev, calculatorType: e.target.value as 'gravity' | 'sg' }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            >
              <option value="gravity">Original & Final Gravity</option>
              <option value="sg">Specific Gravity Only</option>
            </select>
          </div>

          {abvInputs.calculatorType === 'gravity' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Gravity
                </label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="1.050"
                  value={abvInputs.originalGravity}
                  onChange={(e) => setAbvInputs(prev => ({ ...prev, originalGravity: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Final Gravity
                </label>
                <input
                  type="number"
                  step="0.001"
                  placeholder="1.010"
                  value={abvInputs.finalGravity}
                  onChange={(e) => setAbvInputs(prev => ({ ...prev, finalGravity: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Gravity
              </label>
              <input
                type="number"
                step="0.001"
                placeholder="0.990"
                value={abvInputs.specificGravity}
                onChange={(e) => setAbvInputs(prev => ({ ...prev, specificGravity: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>
      </CalculatorCard>

      {/* Brix/Plato/SG Converter */}
      <CalculatorCard
        title="Brix/Plato/SG Converter"
        description="Convert between Brix, Plato, and Specific Gravity"
        icon={<Droplets className="w-6 h-6 text-amber-600" />}
        result={convertBrixPlato() || ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={brixInputs.unitSystem} 
            onChange={(unit) => setBrixInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Type
            </label>
            <select
              value={brixInputs.conversionType}
              onChange={(e) => setBrixInputs(prev => ({ ...prev, conversionType: e.target.value as any }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            >
              <option value="brix-to-sg">Brix to Specific Gravity</option>
              <option value="plato-to-sg">Plato to Specific Gravity</option>
              <option value="sg-to-brix">Specific Gravity to Brix</option>
            </select>
          </div>

          {brixInputs.conversionType === 'brix-to-sg' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brix
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="12.0"
                value={brixInputs.brix}
                onChange={(e) => setBrixInputs(prev => ({ ...prev, brix: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          {brixInputs.conversionType === 'plato-to-sg' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plato
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="12.0"
                value={brixInputs.plato}
                onChange={(e) => setBrixInputs(prev => ({ ...prev, plato: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          {brixInputs.conversionType === 'sg-to-brix' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Gravity
              </label>
              <input
                type="number"
                step="0.001"
                placeholder="1.048"
                value={brixInputs.specificGravity}
                onChange={(e) => setBrixInputs(prev => ({ ...prev, specificGravity: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>
      </CalculatorCard>

      {/* Hydrometer Temperature Correction */}
      <CalculatorCard
        title="Hydrometer Temperature Correction"
        description="Adjust hydrometer readings for temperature variations"
        icon={<Thermometer className="w-6 h-6 text-amber-600" />}
        result={calculateHydrometerCorrection() ? `Corrected SG: ${calculateHydrometerCorrection()}` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={hydrometerInputs.unitSystem} 
            onChange={(unit) => setHydrometerInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hydrometer Reading
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.050"
              value={hydrometerInputs.reading}
              onChange={(e) => setHydrometerInputs(prev => ({ ...prev, reading: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample Temperature ({getTempUnit(hydrometerInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={hydrometerInputs.unitSystem === 'metric' ? '25' : '77'}
              value={hydrometerInputs.temperature}
              onChange={(e) => setHydrometerInputs(prev => ({ ...prev, temperature: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calibration Temperature ({getTempUnit(hydrometerInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              value={hydrometerInputs.calibrationTemp}
              onChange={(e) => setHydrometerInputs(prev => ({ ...prev, calibrationTemp: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* IBU Calculator */}
      <CalculatorCard
        title="IBU Calculator"
        description="Calculate International Bitterness Units using Tinseth formula"
        icon={<FlaskConical className="w-6 h-6 text-amber-600" />}
        result={calculateIBU() ? `${calculateIBU()} IBU` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={ibuInputs.unitSystem} 
            onChange={(unit) => setIbuInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Size ({getVolumeUnit(ibuInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={ibuInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={ibuInputs.batchSize}
              onChange={(e) => setIbuInputs(prev => ({ ...prev, batchSize: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Boil Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.050"
              value={ibuInputs.boilGravity}
              onChange={(e) => setIbuInputs(prev => ({ ...prev, boilGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Hop Additions */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Hop Additions
              </label>
              <button
                onClick={addHop}
                className="text-sm bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 transition-colors"
              >
                Add Hop
              </button>
            </div>
            
            {ibuInputs.hops.map((hop, index) => (
              <div key={hop.id} className="border border-gray-200 rounded-lg p-3 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Hop {index + 1}</span>
                  {ibuInputs.hops.length > 1 && (
                    <button
                      onClick={() => removeHop(hop.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Weight ({getWeightUnit(ibuInputs.unitSystem)})
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={ibuInputs.unitSystem === 'metric' ? '30' : '1.1'}
                      value={hop.weight}
                      onChange={(e) => updateHop(hop.id, 'weight', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Alpha Acid %</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="5.5"
                      value={hop.alphaAcid}
                      onChange={(e) => updateHop(hop.id, 'alphaAcid', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Boil Time (min)</label>
                    <input
                      type="number"
                      step="1"
                      placeholder="60"
                      value={hop.boilTime}
                      onChange={(e) => updateHop(hop.id, 'boilTime', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Hop Type</label>
                    <select
                      value={hop.hopType}
                      onChange={(e) => updateHop(hop.id, 'hopType', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="pellet">Pellet</option>
                      <option value="whole">Whole</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CalculatorCard>

      {/* SRM Calculator */}
      <CalculatorCard
        title="SRM Calculator"
        description="Calculate beer color using Morey's formula"
        icon={<Eye className="w-6 h-6 text-amber-600" />}
        result={srmResult.srm ? (
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: srmResult.color }}
            />
            <span>{srmResult.srm} SRM</span>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={srmInputs.unitSystem} 
            onChange={(unit) => setSrmInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Size ({getVolumeUnit(srmInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={srmInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={srmInputs.batchSize}
              onChange={(e) => setSrmInputs(prev => ({ ...prev, batchSize: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Malt Additions */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Malt Additions
              </label>
              <button
                onClick={addMalt}
                className="text-sm bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 transition-colors"
              >
                Add Malt
              </button>
            </div>
            
            {srmInputs.malts.map((malt, index) => (
              <div key={malt.id} className="border border-gray-200 rounded-lg p-3 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Malt {index + 1}</span>
                  {srmInputs.malts.length > 1 && (
                    <button
                      onClick={() => removeMalt(malt.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Weight ({getWeightUnit(srmInputs.unitSystem)})
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={srmInputs.unitSystem === 'metric' ? '4.5' : '10'}
                      value={malt.weight}
                      onChange={(e) => updateMalt(malt.id, 'weight', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Lovibond</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="2.5"
                      value={malt.lovibond}
                      onChange={(e) => updateMalt(malt.id, 'lovibond', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CalculatorCard>

      {/* Yeast Pitch Rate Calculator */}
      <CalculatorCard
        title="Yeast Pitch Rate Calculator"
        description="Calculate optimal yeast pitching rates and starter volumes"
        icon={<Activity className="w-6 h-6 text-amber-600" />}
        result={yeastResult.cellsNeeded ? (
          <div className="space-y-1">
            <div>Cells needed: {yeastResult.cellsNeeded} billion</div>
            <div>Starter volume: {yeastResult.starterVolume} {getVolumeUnit(yeastInputs.unitSystem)}</div>
            <div>Packets needed: {yeastResult.packetsNeeded}</div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={yeastInputs.unitSystem} 
            onChange={(unit) => setYeastInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Size ({getVolumeUnit(yeastInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={yeastInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={yeastInputs.batchSize}
              onChange={(e) => setYeastInputs(prev => ({ ...prev, batchSize: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.050"
              value={yeastInputs.originalGravity}
              onChange={(e) => setYeastInputs(prev => ({ ...prev, originalGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yeast Type
              </label>
              <select
                value={yeastInputs.yeastType}
                onChange={(e) => setYeastInputs(prev => ({ ...prev, yeastType: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              >
                <option value="dry">Dry Yeast</option>
                <option value="liquid">Liquid Yeast</option>
                <option value="slurry">Yeast Slurry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Viability (%)
              </label>
              <input
                type="number"
                step="1"
                value={yeastInputs.viability}
                onChange={(e) => setYeastInputs(prev => ({ ...prev, viability: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cell Count (billion)
              </label>
              <input
                type="number"
                step="1"
                value={yeastInputs.cellCount}
                onChange={(e) => setYeastInputs(prev => ({ ...prev, cellCount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pitch Rate (M cells/mL/°P)
              </label>
              <input
                type="number"
                step="0.25"
                value={yeastInputs.pitchRate}
                onChange={(e) => setYeastInputs(prev => ({ ...prev, pitchRate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Mash Infusion Calculator */}
      <CalculatorCard
        title="Mash Infusion Calculator"
        description="Calculate strike water temperature and volume"
        icon={<Thermometer className="w-6 h-6 text-amber-600" />}
        result={mashInfusionResult.strikeWaterTemp ? (
          <div className="space-y-1">
            <div>Strike water temp: {mashInfusionResult.strikeWaterTemp}{getTempUnit(mashInfusionInputs.unitSystem)}</div>
            <div>Strike water volume: {mashInfusionResult.strikeWaterVolume} {getVolumeUnit(mashInfusionInputs.unitSystem)}</div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={mashInfusionInputs.unitSystem} 
            onChange={(unit) => setMashInfusionInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grain Weight ({getWeightUnit(mashInfusionInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={mashInfusionInputs.unitSystem === 'metric' ? '5' : '11'}
              value={mashInfusionInputs.grainWeight}
              onChange={(e) => setMashInfusionInputs(prev => ({ ...prev, grainWeight: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grain Temperature ({getTempUnit(mashInfusionInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={mashInfusionInputs.unitSystem === 'metric' ? '20' : '68'}
              value={mashInfusionInputs.grainTemp}
              onChange={(e) => setMashInfusionInputs(prev => ({ ...prev, grainTemp: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Mash Temperature ({getTempUnit(mashInfusionInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={mashInfusionInputs.unitSystem === 'metric' ? '66' : '151'}
              value={mashInfusionInputs.targetTemp}
              onChange={(e) => setMashInfusionInputs(prev => ({ ...prev, targetTemp: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mash Ratio ({mashInfusionInputs.unitSystem === 'metric' ? 'L/kg' : 'qt/lb'})
            </label>
            <input
              type="number"
              step="0.1"
              value={mashInfusionInputs.mashRatio}
              onChange={(e) => setMashInfusionInputs(prev => ({ ...prev, mashRatio: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Force Carbonation Calculator */}
      <CalculatorCard
        title="Force Carbonation Calculator"
        description="Calculate pressure needed for keg carbonation"
        icon={<Gauge className="w-6 h-6 text-amber-600" />}
        result={calculateCarbonation() ? `${calculateCarbonation()} ${getPressureUnit(carbonationInputs.unitSystem)}` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={carbonationInputs.unitSystem} 
            onChange={(unit) => setCarbonationInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beer Temperature ({getTempUnit(carbonationInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={carbonationInputs.unitSystem === 'metric' ? '4' : '39'}
              value={carbonationInputs.temperature}
              onChange={(e) => setCarbonationInputs(prev => ({ ...prev, temperature: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target CO₂ Volumes
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="2.4"
              value={carbonationInputs.co2Volumes}
              onChange={(e) => setCarbonationInputs(prev => ({ ...prev, co2Volumes: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Priming Sugar Calculator */}
      <CalculatorCard
        title="Priming Sugar Calculator"
        description="Calculate sugar needed for bottle conditioning"
        icon={<Scale className="w-6 h-6 text-amber-600" />}
        result={calculatePrimingSugar() ? `${calculatePrimingSugar()} g ${primingSugarInputs.sugarType} sugar` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={primingSugarInputs.unitSystem} 
            onChange={(unit) => setPrimingSugarInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beer Volume ({getVolumeUnit(primingSugarInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={primingSugarInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={primingSugarInputs.beerVolume}
              onChange={(e) => setPrimingSugarInputs(prev => ({ ...prev, beerVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current CO₂ Volumes
            </label>
            <input
              type="number"
              step="0.1"
              value={primingSugarInputs.currentCO2}
              onChange={(e) => setPrimingSugarInputs(prev => ({ ...prev, currentCO2: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target CO₂ Volumes
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="2.4"
              value={primingSugarInputs.targetCO2}
              onChange={(e) => setPrimingSugarInputs(prev => ({ ...prev, targetCO2: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sugar Type
              </label>
              <select
                value={primingSugarInputs.sugarType}
                onChange={(e) => setPrimingSugarInputs(prev => ({ ...prev, sugarType: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              >
                <option value="corn">Corn Sugar</option>
                <option value="table">Table Sugar</option>
                <option value="dme">DME</option>
                <option value="honey">Honey</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature ({getTempUnit(primingSugarInputs.unitSystem)})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={primingSugarInputs.unitSystem === 'metric' ? '20' : '68'}
                value={primingSugarInputs.temperature}
                onChange={(e) => setPrimingSugarInputs(prev => ({ ...prev, temperature: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Dilution Calculator */}
      <CalculatorCard
        title="Dilution Calculator"
        description="Calculate water needed to reduce wort gravity"
        icon={<Droplets className="w-6 h-6 text-amber-600" />}
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
              Original Volume ({getVolumeUnit(dilutionInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={dilutionInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={dilutionInputs.originalVolume}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, originalVolume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.060"
              value={dilutionInputs.originalGravity}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, originalGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.050"
              value={dilutionInputs.targetGravity}
              onChange={(e) => setDilutionInputs(prev => ({ ...prev, targetGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Extract Conversion Calculator */}
      <CalculatorCard
        title="Extract Conversion Calculator"
        description="Convert between LME, DME, and base grain"
        icon={<Blend className="w-6 h-6 text-amber-600" />}
        result={calculateExtractConversion() ? `${calculateExtractConversion()} ${getWeightUnit(extractConversionInputs.unitSystem)}` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={extractConversionInputs.unitSystem} 
            onChange={(unit) => setExtractConversionInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Type
            </label>
            <select
              value={extractConversionInputs.conversionType}
              onChange={(e) => setExtractConversionInputs(prev => ({ ...prev, conversionType: e.target.value as any }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            >
              <option value="lme-to-dme">LME to DME</option>
              <option value="dme-to-lme">DME to LME</option>
              <option value="extract-to-grain">Extract to Base Grain</option>
              <option value="grain-to-extract">Base Grain to Extract</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ({getWeightUnit(extractConversionInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={extractConversionInputs.unitSystem === 'metric' ? '3' : '6.6'}
              value={extractConversionInputs.amount}
              onChange={(e) => setExtractConversionInputs(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          {(extractConversionInputs.conversionType === 'extract-to-grain' || extractConversionInputs.conversionType === 'grain-to-extract') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Efficiency (%)
              </label>
              <input
                type="number"
                step="1"
                value={extractConversionInputs.efficiency}
                onChange={(e) => setExtractConversionInputs(prev => ({ ...prev, efficiency: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          )}
        </div>
      </CalculatorCard>

      {/* Brewhouse Efficiency Calculator */}
      <CalculatorCard
        title="Brewhouse Efficiency Calculator"
        description="Calculate mash extraction efficiency"
        icon={<BarChart3 className="w-6 h-6 text-amber-600" />}
        result={calculateBrewhouseEfficiency() ? `${calculateBrewhouseEfficiency()}% efficiency` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={brewhouseEfficiencyInputs.unitSystem} 
            onChange={(unit) => setBrewhouseEfficiencyInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grain Weight ({getWeightUnit(brewhouseEfficiencyInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={brewhouseEfficiencyInputs.unitSystem === 'metric' ? '5' : '11'}
              value={brewhouseEfficiencyInputs.grainWeight}
              onChange={(e) => setBrewhouseEfficiencyInputs(prev => ({ ...prev, grainWeight: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grain Potential (ppg)
            </label>
            <input
              type="number"
              step="1"
              value={brewhouseEfficiencyInputs.grainPotential}
              onChange={(e) => setBrewhouseEfficiencyInputs(prev => ({ ...prev, grainPotential: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Size ({getVolumeUnit(brewhouseEfficiencyInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={brewhouseEfficiencyInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={brewhouseEfficiencyInputs.batchSize}
              onChange={(e) => setBrewhouseEfficiencyInputs(prev => ({ ...prev, batchSize: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.050"
              value={brewhouseEfficiencyInputs.originalGravity}
              onChange={(e) => setBrewhouseEfficiencyInputs(prev => ({ ...prev, originalGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Beer Calories Calculator */}
      <CalculatorCard
        title="Beer Calories Calculator"
        description="Calculate caloric content based on gravity readings"
        icon={<Percent className="w-6 h-6 text-amber-600" />}
        result={caloriesResult.totalCalories ? (
          <div className="space-y-1">
            <div>Total calories: {caloriesResult.totalCalories}</div>
            <div>Per serving: {caloriesResult.caloriesPerServing} cal</div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={caloriesInputs.unitSystem} 
            onChange={(unit) => setCaloriesInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.050"
              value={caloriesInputs.originalGravity}
              onChange={(e) => setCaloriesInputs(prev => ({ ...prev, originalGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Final Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.010"
              value={caloriesInputs.finalGravity}
              onChange={(e) => setCaloriesInputs(prev => ({ ...prev, finalGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volume ({getVolumeUnit(caloriesInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={caloriesInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={caloriesInputs.volume}
              onChange={(e) => setCaloriesInputs(prev => ({ ...prev, volume: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Boil-Off Calculator */}
      <CalculatorCard
        title="Boil-Off Calculator"
        description="Calculate volume loss during boiling"
        icon={<Zap className="w-6 h-6 text-amber-600" />}
        result={boilOffResult.postBoilVolume ? (
          <div className="space-y-1">
            <div>Post-boil volume: {boilOffResult.postBoilVolume} {getVolumeUnit(boilOffInputs.unitSystem)}</div>
            <div>Gravity: {boilOffResult.postBoilGravity}</div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={boilOffInputs.unitSystem} 
            onChange={(unit) => setBoilOffInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pre-Boil Volume ({getVolumeUnit(boilOffInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={boilOffInputs.unitSystem === 'metric' ? '25' : '6.6'}
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
              step="1"
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
              step="0.1"
              value={boilOffInputs.evaporationRate}
              onChange={(e) => setBoilOffInputs(prev => ({ ...prev, evaporationRate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Beer Line Length Calculator */}
      <CalculatorCard
        title="Beer Line Length Calculator"
        description="Calculate optimal beer line length for draft systems"
        icon={<Wind className="w-6 h-6 text-amber-600" />}
        result={calculateBeerLineLength() ? `${calculateBeerLineLength()} ${getLengthUnit(beerLineInputs.unitSystem)}` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={beerLineInputs.unitSystem} 
            onChange={(unit) => setBeerLineInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beer Temperature ({getTempUnit(beerLineInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={beerLineInputs.unitSystem === 'metric' ? '4' : '39'}
              value={beerLineInputs.temperature}
              onChange={(e) => setBeerLineInputs(prev => ({ ...prev, temperature: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CO₂ Pressure ({getPressureUnit(beerLineInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={beerLineInputs.unitSystem === 'metric' ? '138' : '20'}
              value={beerLineInputs.co2Pressure}
              onChange={(e) => setBeerLineInputs(prev => ({ ...prev, co2Pressure: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vertical Rise ({getLengthUnit(beerLineInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              value={beerLineInputs.verticalRise}
              onChange={(e) => setBeerLineInputs(prev => ({ ...prev, verticalRise: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Line Inner Diameter ({beerLineInputs.unitSystem === 'metric' ? 'mm' : 'inches'})
            </label>
            <input
              type="number"
              step="0.1"
              value={beerLineInputs.lineID}
              onChange={(e) => setBeerLineInputs(prev => ({ ...prev, lineID: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Mash and Sparge Water Calculator */}
      <CalculatorCard
        title="Mash and Sparge Water Calculator"
        description="Calculate water volumes and temperatures for mashing and sparging"
        icon={<Beaker className="w-6 h-6 text-amber-600" />}
        result={mashSpargeResult.strikeWaterVolume ? (
          <div className="space-y-1">
            <div>Strike water: {mashSpargeResult.strikeWaterVolume} {getVolumeUnit(mashSpargeInputs.unitSystem)} at {mashSpargeResult.strikeWaterTemp}{getTempUnit(mashSpargeInputs.unitSystem)}</div>
            <div>Sparge water: {mashSpargeResult.spargeWaterVolume} {getVolumeUnit(mashSpargeInputs.unitSystem)}</div>
            <div>Total water: {mashSpargeResult.totalWaterVolume} {getVolumeUnit(mashSpargeInputs.unitSystem)}</div>
          </div>
        ) : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={mashSpargeInputs.unitSystem} 
            onChange={(unit) => setMashSpargeInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grain Weight ({getWeightUnit(mashSpargeInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={mashSpargeInputs.unitSystem === 'metric' ? '5' : '11'}
              value={mashSpargeInputs.grainWeight}
              onChange={(e) => setMashSpargeInputs(prev => ({ ...prev, grainWeight: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mash Ratio ({mashSpargeInputs.unitSystem === 'metric' ? 'L/kg' : 'qt/lb'})
              </label>
              <input
                type="number"
                step="0.1"
                value={mashSpargeInputs.mashRatio}
                onChange={(e) => setMashSpargeInputs(prev => ({ ...prev, mashRatio: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sparge Ratio ({mashSpargeInputs.unitSystem === 'metric' ? 'L/kg' : 'qt/lb'})
              </label>
              <input
                type="number"
                step="0.1"
                value={mashSpargeInputs.spargeRatio}
                onChange={(e) => setMashSpargeInputs(prev => ({ ...prev, spargeRatio: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grain Temp ({getTempUnit(mashSpargeInputs.unitSystem)})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={mashSpargeInputs.unitSystem === 'metric' ? '20' : '68'}
                value={mashSpargeInputs.grainTemp}
                onChange={(e) => setMashSpargeInputs(prev => ({ ...prev, grainTemp: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Mash Temp ({getTempUnit(mashSpargeInputs.unitSystem)})
              </label>
              <input
                type="number"
                step="0.1"
                placeholder={mashSpargeInputs.unitSystem === 'metric' ? '66' : '151'}
                value={mashSpargeInputs.targetMashTemp}
                onChange={(e) => setMashSpargeInputs(prev => ({ ...prev, targetMashTemp: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Malt Extract Calculator */}
      <CalculatorCard
        title="Malt Extract Calculator"
        description="Calculate extract needed for target gravity"
        icon={<TestTube className="w-6 h-6 text-amber-600" />}
        result={calculateMaltExtract() ? `${calculateMaltExtract()} ${getWeightUnit(maltExtractInputs.unitSystem)} ${maltExtractInputs.extractType.toUpperCase()}` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={maltExtractInputs.unitSystem} 
            onChange={(unit) => setMaltExtractInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.050"
              value={maltExtractInputs.targetGravity}
              onChange={(e) => setMaltExtractInputs(prev => ({ ...prev, targetGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Size ({getVolumeUnit(maltExtractInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={maltExtractInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={maltExtractInputs.batchSize}
              onChange={(e) => setMaltExtractInputs(prev => ({ ...prev, batchSize: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extract Type
              </label>
              <select
                value={maltExtractInputs.extractType}
                onChange={(e) => setMaltExtractInputs(prev => ({ ...prev, extractType: e.target.value as 'lme' | 'dme' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              >
                <option value="lme">LME</option>
                <option value="dme">DME</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extract Potential (ppg)
              </label>
              <input
                type="number"
                step="1"
                value={maltExtractInputs.extractPotential}
                onChange={(e) => setMaltExtractInputs(prev => ({ ...prev, extractPotential: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </CalculatorCard>

      {/* Hop Extract Calculator */}
      <CalculatorCard
        title="Hop Extract Calculator"
        description="Calculate CO₂ hop extract dosage for target IBU"
        icon={<Snowflake className="w-6 h-6 text-amber-600" />}
        result={calculateHopExtract() ? `${calculateHopExtract()} ${getSmallVolumeUnit(hopExtractInputs.unitSystem)} extract` : ''}
      >
        <div className="space-y-4">
          <UnitToggle 
            unitSystem={hopExtractInputs.unitSystem} 
            onChange={(unit) => setHopExtractInputs(prev => ({ ...prev, unitSystem: unit }))} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target IBU
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="30"
              value={hopExtractInputs.targetIBU}
              onChange={(e) => setHopExtractInputs(prev => ({ ...prev, targetIBU: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Size ({getVolumeUnit(hopExtractInputs.unitSystem)})
            </label>
            <input
              type="number"
              step="0.1"
              placeholder={hopExtractInputs.unitSystem === 'metric' ? '20' : '5.3'}
              value={hopExtractInputs.batchSize}
              onChange={(e) => setHopExtractInputs(prev => ({ ...prev, batchSize: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Boil Gravity
            </label>
            <input
              type="number"
              step="0.001"
              placeholder="1.050"
              value={hopExtractInputs.boilGravity}
              onChange={(e) => setHopExtractInputs(prev => ({ ...prev, boilGravity: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extract Alpha Acid (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={hopExtractInputs.extractAlphaAcid}
              onChange={(e) => setHopExtractInputs(prev => ({ ...prev, extractAlphaAcid: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </CalculatorCard>
    </div>
  );
}

export default BrewingCalculators;