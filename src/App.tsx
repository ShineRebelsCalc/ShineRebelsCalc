import React, { useState } from 'react';
import { Calculator, Beaker, FlaskConical, Droplet } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthScreen from './components/auth/AuthScreen';
import UserMenu from './components/UserMenu';
import BrewingCalculators from './components/BrewingCalculators';
import DistillationCalculators from './components/DistillationCalculators';
import WaterChemistryCalculators from './components/WaterChemistryCalculators';

type TabType = 'brewing' | 'distillation' | 'water';

function AppContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('brewing');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Calculator className="w-16 h-16 text-amber-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="flex items-center mb-4">
              <Calculator className="w-8 h-8 text-amber-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">
                Brewing & Distillation Calculators
              </h1>
            </div>
          </div>
          <UserMenu />
        </div>
        
        <div className="text-center mb-8">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600">
              Professional calculation tools for brewers and distillers. 
              Accurate, reliable, and easy to use.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 border border-gray-200 overflow-x-auto">
            <div className="flex space-x-2 min-w-max">
              <button
                onClick={() => setActiveTab('brewing')}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'brewing'
                    ? 'bg-amber-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                }`}
              >
                <Beaker className="w-5 h-5 mr-2" />
                Brewing
              </button>
              <button
                onClick={() => setActiveTab('distillation')}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'distillation'
                    ? 'bg-orange-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <FlaskConical className="w-5 h-5 mr-2" />
                Distillation
              </button>
              <button
                onClick={() => setActiveTab('water')}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'water'
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Droplet className="w-5 h-5 mr-2" />
                Water Chemistry
              </button>
            </div>
          </div>
        </div>

        {/* Calculator Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'brewing' && <BrewingCalculators />}
          {activeTab === 'distillation' && <DistillationCalculators />}
          {activeTab === 'water' && <WaterChemistryCalculators />}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;