import React, { useState } from 'react';
import { Calculator, Beaker, FlaskConical } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-8">
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <div className="p-3 bg-amber-500 rounded-2xl">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Brewing & Distillation
              <br />
              <span className="text-amber-600">Calculators</span>
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-lg">
            Professional calculation tools for brewers and distillers. 
            Accurate, reliable, and easy to use.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <Beaker className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Brewing</h3>
              <p className="text-sm text-gray-600">ABV, gravity, and recipe calculations</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <FlaskConical className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Distillation</h3>
              <p className="text-sm text-gray-600">Proof, dilution, and yield calculations</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Water Chemistry</h3>
              <p className="text-sm text-gray-600">pH, minerals, and profile matching</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-lg mx-auto lg:mx-0">
            <h4 className="font-semibold text-blue-800 mb-2">Try the Demo Account</h4>
            <p className="text-blue-700 text-sm">
              Experience all features with our demo account. No registration required - 
              just click "Try Demo Account" to get started immediately.
            </p>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex justify-center">
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;