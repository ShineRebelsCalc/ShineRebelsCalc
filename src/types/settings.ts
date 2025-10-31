export interface UserSettings {
  id: string;
  userId: number;
  units: {
    volume: 'liters' | 'gallons';
    weight: 'grams' | 'ounces';
    temperature: 'celsius' | 'fahrenheit';
    pressure: 'psi' | 'bar';
  };
  defaultValues: {
    batchSize: number;
    efficiency: number;
    boilTime: number;
    fermentationTemp: number;
  };
  display: {
    theme: 'light' | 'dark' | 'auto';
    compactMode: boolean;
    showAdvancedCalculators: boolean;
    defaultTab: 'brewing' | 'distillation' | 'water';
  };
  notifications: {
    calculationReminders: boolean;
    tipOfTheDay: boolean;
    updateNotifications: boolean;
  };
  privacy: {
    saveCalculationHistory: boolean;
    shareUsageData: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_SETTINGS: Omit<UserSettings, 'id' | 'userId' | 'createdAt' | 'updatedAt'> = {
  units: {
    volume: 'liters',
    weight: 'grams',
    temperature: 'celsius',
    pressure: 'psi'
  },
  defaultValues: {
    batchSize: 20,
    efficiency: 75,
    boilTime: 60,
    fermentationTemp: 20
  },
  display: {
    theme: 'light',
    compactMode: false,
    showAdvancedCalculators: true,
    defaultTab: 'brewing'
  },
  notifications: {
    calculationReminders: true,
    tipOfTheDay: true,
    updateNotifications: true
  },
  privacy: {
    saveCalculationHistory: true,
    shareUsageData: false
  }
};