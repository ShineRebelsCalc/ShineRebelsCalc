import { useAuth } from '../contexts/AuthContext';

export function useUserSettings() {
  const { settings } = useAuth();

  const convertVolume = (value: number, fromUnit: 'liters' | 'gallons' = 'liters'): number => {
    if (!settings?.units?.volume) return value;
    
    if (settings.units.volume === 'gallons' && fromUnit === 'liters') {
      return value * 0.264172; // Convert liters to gallons
    }
    if (settings.units.volume === 'liters' && fromUnit === 'gallons') {
      return value * 3.78541; // Convert gallons to liters
    }
    return value;
  };

  const convertWeight = (value: number, fromUnit: 'grams' | 'ounces' = 'grams'): number => {
    if (!settings?.units?.weight) return value;
    
    if (settings.units.weight === 'ounces' && fromUnit === 'grams') {
      return value * 0.035274; // Convert grams to ounces
    }
    if (settings.units.weight === 'grams' && fromUnit === 'ounces') {
      return value * 28.3495; // Convert ounces to grams
    }
    return value;
  };

  const convertTemperature = (value: number, fromUnit: 'celsius' | 'fahrenheit' = 'celsius'): number => {
    if (!settings?.units?.temperature) return value;
    
    if (settings.units.temperature === 'fahrenheit' && fromUnit === 'celsius') {
      return (value * 9/5) + 32; // Convert Celsius to Fahrenheit
    }
    if (settings.units.temperature === 'celsius' && fromUnit === 'fahrenheit') {
      return (value - 32) * 5/9; // Convert Fahrenheit to Celsius
    }
    return value;
  };

  const convertPressure = (value: number, fromUnit: 'psi' | 'bar' = 'psi'): number => {
    if (!settings?.units?.pressure) return value;
    
    if (settings.units.pressure === 'bar' && fromUnit === 'psi') {
      return value * 0.0689476; // Convert PSI to Bar
    }
    if (settings.units.pressure === 'psi' && fromUnit === 'bar') {
      return value * 14.5038; // Convert Bar to PSI
    }
    return value;
  };

  const getVolumeUnit = (): string => {
    return settings?.units?.volume === 'gallons' ? 'gal' : 'L';
  };

  const getWeightUnit = (): string => {
    return settings?.units?.weight === 'ounces' ? 'oz' : 'g';
  };

  const getTemperatureUnit = (): string => {
    return settings?.units?.temperature === 'fahrenheit' ? '°F' : '°C';
  };

  const getPressureUnit = (): string => {
    return settings?.units?.pressure === 'bar' ? 'bar' : 'psi';
  };

  const formatNumber = (value: number, decimals: number = 2): string => {
    return value.toFixed(decimals);
  };

  return {
    settings,
    convertVolume,
    convertWeight,
    convertTemperature,
    convertPressure,
    getVolumeUnit,
    getWeightUnit,
    getTemperatureUnit,
    getPressureUnit,
    formatNumber
  };
}