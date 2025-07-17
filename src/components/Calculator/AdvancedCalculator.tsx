import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdvancedCalculator } from '../../hooks/useAdvancedCalculator';
import NetworkDevelopment from './sections/NetworkDevelopment';
import FranchiseeEconomics from './sections/FranchiseeEconomics';
import RecurringRevenue from './sections/RecurringRevenue';
import SupplyChain from './sections/SupplyChain';
import Marketing from './sections/Marketing';
import Operations from './sections/Operations';
import AdvancedSettings from './sections/AdvancedSettings';
import Results from './sections/Results';
import { FranchiseInputs } from '../../types/calculator';

const defaultInputs: FranchiseInputs = {
  // Initialize with default values
};

const AdvancedCalculator = () => {
  const [inputs, setInputs] = useState<FranchiseInputs>(defaultInputs);
  const { outputs, loading, error } = useAdvancedCalculator(inputs);
  const [activeSection, setActiveSection] = useState('network');

  const sections = [
    { id: 'network', label: 'Network Development' },
    { id: 'economics', label: 'Franchisee Economics' },
    { id: 'recurring', label: 'Recurring Revenue' },
    { id: 'supply', label: 'Supply Chain' },
    { id: 'marketing', label: 'Marketing & Events' },
    { id: 'operations', label: 'Operations' },
    { id: 'advanced', label: 'Advanced Settings' },
    { id: 'results', label: 'Results & Analysis' }
  ];

  const handleInputChange = (section: string, data: Partial<FranchiseInputs>) => {
    setInputs(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex space-x-2 overflow-x-auto pb-4">
          {sections.map(section => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {section.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {activeSection === 'network' && (
          <NetworkDevelopment
            inputs={inputs}
            onChange={(data) => handleInputChange('network', data)}
          />
        )}
        {activeSection === 'economics' && (
          <FranchiseeEconomics
            inputs={inputs}
            onChange={(data) => handleInputChange('economics', data)}
          />
        )}
        {activeSection === 'recurring' && (
          <RecurringRevenue
            inputs={inputs}
            onChange={(data) => handleInputChange('recurring', data)}
          />
        )}
        {activeSection === 'supply' && (
          <SupplyChain
            inputs={inputs}
            onChange={(data) => handleInputChange('supply', data)}
          />
        )}
        {activeSection === 'marketing' && (
          <Marketing
            inputs={inputs}
            onChange={(data) => handleInputChange('marketing', data)}
          />
        )}
        {activeSection === 'operations' && (
          <Operations
            inputs={inputs}
            onChange={(data) => handleInputChange('operations', data)}
          />
        )}
        {activeSection === 'advanced' && (
          <AdvancedSettings
            inputs={inputs}
            onChange={(data) => handleInputChange('advanced', data)}
          />
        )}
        {activeSection === 'results' && (
          <Results
            inputs={inputs}
            outputs={outputs}
            loading={loading}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

export default AdvancedCalculator;