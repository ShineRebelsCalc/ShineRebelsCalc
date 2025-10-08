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
