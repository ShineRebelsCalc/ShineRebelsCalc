import React from 'react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  result?: React.ReactNode;
}

function CalculatorCard({ title, description, icon, children, result }: CalculatorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gray-50 rounded-lg mr-3">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="mb-6">
          {children}
        </div>

        {/* Result */}
        {result && (
          <div className="pt-4 border-t border-gray-100">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Result:</h4>
              <div className="text-lg font-bold text-gray-800">
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