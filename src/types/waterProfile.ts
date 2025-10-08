export interface WaterProfile {
  name: string;
  location: string;
  calcium: number;
  magnesium: number;
  sodium: number;
  sulfate: number;
  chloride: number;
  bicarbonate: number;
  description: string;
  category: 'brewing' | 'distillation';
}

export const WATER_PROFILES: WaterProfile[] = [
  {
    name: 'Pilsen',
    location: 'Czech Republic',
    calcium: 7,
    magnesium: 2,
    sodium: 2,
    sulfate: 5,
    chloride: 5,
    bicarbonate: 15,
    description: 'Very soft water, ideal for Pilsners and light lagers',
    category: 'brewing'
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
    description: 'Hard water with high sulfate, perfect for IPAs and pale ales',
    category: 'brewing'
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
    description: 'High bicarbonate, excellent for stouts and dark beers',
    category: 'brewing'
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
    description: 'Moderately hard water, great for export lagers',
    category: 'brewing'
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
    description: 'Moderately soft with carbonate, ideal for Dunkel and Märzen',
    category: 'brewing'
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
    description: 'Moderate hardness, suited for Vienna lagers and Amber beers',
    category: 'brewing'
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
    description: 'Balanced profile, good for bitters and milds',
    category: 'brewing'
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
    description: 'Well-suited for Scottish ales and strong ales',
    category: 'brewing'
  },
  {
    name: 'Soft Water',
    location: 'Distillation Standard',
    calcium: 10,
    magnesium: 2,
    sodium: 5,
    sulfate: 10,
    chloride: 10,
    bicarbonate: 20,
    description: 'Very soft water ideal for neutral grain spirits and vodka mashes',
    category: 'distillation'
  },
  {
    name: 'Moderate Mineral',
    location: 'Distillation Standard',
    calcium: 50,
    magnesium: 10,
    sodium: 15,
    sulfate: 30,
    chloride: 25,
    bicarbonate: 50,
    description: 'Balanced mineral content for whiskey and bourbon mashes',
    category: 'distillation'
  },
  {
    name: 'Kentucky Limestone',
    location: 'Kentucky, USA',
    calcium: 85,
    magnesium: 15,
    sodium: 8,
    sulfate: 20,
    chloride: 15,
    bicarbonate: 180,
    description: 'Classic Kentucky bourbon water profile with limestone character',
    category: 'distillation'
  },
  {
    name: 'Scottish Highlands',
    location: 'Scotland',
    calcium: 15,
    magnesium: 5,
    sodium: 12,
    sulfate: 12,
    chloride: 18,
    bicarbonate: 30,
    description: 'Soft peaty water ideal for single malt Scotch whisky',
    category: 'distillation'
  },
  {
    name: 'Tennessee Spring',
    location: 'Tennessee, USA',
    calcium: 65,
    magnesium: 8,
    sodium: 6,
    sulfate: 18,
    chloride: 12,
    bicarbonate: 140,
    description: 'Iron-free limestone water for Tennessee whiskey production',
    category: 'distillation'
  },
  {
    name: 'Rum Standard',
    location: 'Distillation Standard',
    calcium: 40,
    magnesium: 12,
    sodium: 25,
    sulfate: 20,
    chloride: 35,
    bicarbonate: 60,
    description: 'Mineral profile suitable for rum fermentation and distillation',
    category: 'distillation'
  }
];
