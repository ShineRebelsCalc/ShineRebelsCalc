import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, User, Sliders, Bell, Shield, Palette } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserSettings } from '../../lib/database';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings, user } = useAuth();
  const [localSettings, setLocalSettings] = useState<Partial<UserSettings>>({});
  const [activeTab, setActiveTab] = useState<'profile' | 'units' | 'defaults' | 'display' | 'notifications' | 'privacy'>('profile');
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
      setHasChanges(false);
    }
  }, [settings]);

  const handleInputChange = (section: keyof UserSettings, field: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateSettings(localSettings);
    if (result.success) {
      setHasChanges(false);
    }
    setSaving(false);
  };

  const handleReset = () => {
    if (settings) {
      setLocalSettings(settings);
      setHasChanges(false);
    }
  };

  if (!isOpen || !settings || !localSettings) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'units', label: 'Units', icon: Sliders },
    { id: 'defaults', label: 'Defaults', icon: RotateCcw },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ] as const;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-500 to-orange-500">
          <div className="flex items-center gap-3">
            <Sliders className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Settings & Preferences</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{user?.name}</div>
                          <div className="text-sm text-gray-600">{user?.email}</div>
                          {user?.is_demo && (
                            <div className="text-xs text-blue-600 font-medium">Demo Account</div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Profile management features will be available in a future update.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'units' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Unit Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Volume Units
                        </label>
                        <select
                          value={localSettings.units?.volume || 'liters'}
                          onChange={(e) => handleInputChange('units', 'volume', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="liters">Liters</option>
                          <option value="gallons">Gallons</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Weight Units
                        </label>
                        <select
                          value={localSettings.units?.weight || 'grams'}
                          onChange={(e) => handleInputChange('units', 'weight', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="grams">Grams</option>
                          <option value="ounces">Ounces</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Temperature Units
                        </label>
                        <select
                          value={localSettings.units?.temperature || 'celsius'}
                          onChange={(e) => handleInputChange('units', 'temperature', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="celsius">Celsius (°C)</option>
                          <option value="fahrenheit">Fahrenheit (°F)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pressure Units
                        </label>
                        <select
                          value={localSettings.units?.pressure || 'psi'}
                          onChange={(e) => handleInputChange('units', 'pressure', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="psi">PSI</option>
                          <option value="bar">Bar</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'defaults' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Default Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Batch Size ({localSettings.units?.volume || 'liters'})
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={localSettings.defaultValues?.batchSize || 20}
                          onChange={(e) => handleInputChange('defaultValues', 'batchSize', parseFloat(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Efficiency (%)
                        </label>
                        <input
                          type="number"
                          step="1"
                          min="50"
                          max="95"
                          value={localSettings.defaultValues?.efficiency || 75}
                          onChange={(e) => handleInputChange('defaultValues', 'efficiency', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Boil Time (minutes)
                        </label>
                        <input
                          type="number"
                          step="5"
                          min="30"
                          max="120"
                          value={localSettings.defaultValues?.boilTime || 60}
                          onChange={(e) => handleInputChange('defaultValues', 'boilTime', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Fermentation Temp ({localSettings.units?.temperature === 'fahrenheit' ? '°F' : '°C'})
                        </label>
                        <input
                          type="number"
                          step="1"
                          value={localSettings.defaultValues?.fermentationTemp || 20}
                          onChange={(e) => handleInputChange('defaultValues', 'fermentationTemp', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'display' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Display Preferences</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Theme
                        </label>
                        <select
                          value={localSettings.display?.theme || 'light'}
                          onChange={(e) => handleInputChange('display', 'theme', e.target.value)}
                          className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto (System)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Tab
                        </label>
                        <select
                          value={localSettings.display?.defaultTab || 'brewing'}
                          onChange={(e) => handleInputChange('display', 'defaultTab', e.target.value)}
                          className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                          <option value="brewing">Brewing</option>
                          <option value="distillation">Distillation</option>
                          <option value="water">Water Chemistry</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-700">Compact Mode</div>
                            <div className="text-sm text-gray-500">Use smaller cards and reduced spacing</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={localSettings.display?.compactMode || false}
                              onChange={(e) => handleInputChange('display', 'compactMode', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-700">Show Advanced Calculators</div>
                            <div className="text-sm text-gray-500">Display advanced calculation tools</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={localSettings.display?.showAdvancedCalculators !== false}
                              onChange={(e) => handleInputChange('display', 'showAdvancedCalculators', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-700">Calculation Reminders</div>
                          <div className="text-sm text-gray-500">Get reminders for brewing calculations</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSettings.notifications?.calculationReminders !== false}
                            onChange={(e) => handleInputChange('notifications', 'calculationReminders', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-700">Tip of the Day</div>
                          <div className="text-sm text-gray-500">Show daily brewing tips and tricks</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSettings.notifications?.tipOfTheDay !== false}
                            onChange={(e) => handleInputChange('notifications', 'tipOfTheDay', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-700">Update Notifications</div>
                          <div className="text-sm text-gray-500">Notify about new features and updates</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSettings.notifications?.updateNotifications !== false}
                            onChange={(e) => handleInputChange('notifications', 'updateNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-700">Save Calculation History</div>
                          <div className="text-sm text-gray-500">Store your calculation history locally</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSettings.privacy?.saveCalculationHistory !== false}
                            onChange={(e) => handleInputChange('privacy', 'saveCalculationHistory', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-700">Share Usage Data</div>
                          <div className="text-sm text-gray-500">Help improve the app by sharing anonymous usage data</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localSettings.privacy?.shareUsageData === true}
                            onChange={(e) => handleInputChange('privacy', 'shareUsageData', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Data Storage</h4>
                      <p className="text-sm text-gray-600">
                        All your data is stored locally in your browser. We do not collect or store any personal information on external servers.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            {hasChanges && 'You have unsaved changes'}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              disabled={!hasChanges}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;