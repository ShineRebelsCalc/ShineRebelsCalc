import React from 'react';
import { useUserSettings } from '../hooks/useUserSettings';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  result?: React.ReactNode;
}

function CalculatorCard({ title, description, icon, children, result }: CalculatorCardProps) {
  const { settings } = useUserSettings();
  const isCompact = settings?.display?.compactMode || false;

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${isCompact ? 'text-sm' : ''}`}>
      <div className={isCompact ? 'p-4' : 'p-6'}>
        {/* Header */}
        <div className={`flex items-center ${isCompact ? 'mb-3' : 'mb-4'}`}>
          <div className={`${isCompact ? 'p-1.5' : 'p-2'} bg-gray-50 rounded-lg mr-3`}>
            {icon}
          </div>
          <div>
            <h3 className={`${isCompact ? 'text-base' : 'text-lg'} font-semibold text-gray-800`}>{title}</h3>
            <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-gray-600`}>{description}</p>
          </div>
        </div>

        {/* Inputs */}
        <div className={isCompact ? 'mb-4' : 'mb-6'}>
          {children}
        </div>

        {/* Result */}
        {result && (
          <div className={`${isCompact ? 'pt-3' : 'pt-4'} border-t border-gray-100`}>
            <div className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg ${isCompact ? 'p-3' : 'p-4'}`}>
              <h4 className={`${isCompact ? 'text-xs' : 'text-sm'} font-medium text-gray-700 mb-2`}>Result:</h4>
              <div className={`${isCompact ? 'text-base' : 'text-lg'} font-bold text-gray-800`}>
                {result}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalculatorCard;