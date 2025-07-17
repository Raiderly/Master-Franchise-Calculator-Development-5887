import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Tooltip from '../UI/Tooltip';

const { FiInfo } = FiIcons;

const InputsTab = ({ inputs, setInputs }) => {
  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const inputFields = [
    {
      key: 'initialFranchisees',
      label: 'Initial Franchisees',
      value: inputs.initialFranchisees,
      tooltip: 'Number of franchisees at the start of Year 1',
      type: 'number',
      min: 0
    },
    {
      key: 'newFranchiseesPerYear',
      label: 'New Franchisees Per Year',
      value: inputs.newFranchiseesPerYear,
      tooltip: 'Expected number of new franchisees recruited annually',
      type: 'number',
      min: 0
    },
    {
      key: 'masterFranchiseFee',
      label: 'Master Franchise Fee',
      value: inputs.masterFranchiseFee,
      tooltip: 'Initial fee paid by each new franchisee',
      type: 'number',
      min: 0,
      prefix: '$'
    },
    {
      key: 'royaltyRate',
      label: 'Royalty Rate',
      value: inputs.royaltyRate,
      tooltip: 'Percentage of franchisee revenue paid as royalties',
      type: 'number',
      min: 0,
      max: 100,
      suffix: '%'
    },
    {
      key: 'avgUnitRevenue',
      label: 'Average Unit Revenue',
      value: inputs.avgUnitRevenue,
      tooltip: 'Average annual revenue per franchisee unit',
      type: 'number',
      min: 0,
      prefix: '$'
    },
    {
      key: 'churnRate',
      label: 'Churn Rate',
      value: inputs.churnRate,
      tooltip: 'Percentage of franchisees who leave the system annually',
      type: 'number',
      min: 0,
      max: 100,
      suffix: '%'
    },
    {
      key: 'trainingFee',
      label: 'Training Fee',
      value: inputs.trainingFee,
      tooltip: 'One-time training fee per new franchisee',
      type: 'number',
      min: 0,
      prefix: '$'
    },
    {
      key: 'marketingLevyRate',
      label: 'Marketing Levy Rate',
      value: inputs.marketingLevyRate,
      tooltip: 'Percentage of franchisee revenue for marketing fund',
      type: 'number',
      min: 0,
      max: 100,
      suffix: '%'
    },
    {
      key: 'techFeePerUnit',
      label: 'Tech Fee Per Unit (Monthly)',
      value: inputs.techFeePerUnit,
      tooltip: 'Monthly technology fee per franchisee',
      type: 'number',
      min: 0,
      prefix: '$'
    },
    {
      key: 'operatingCostRate',
      label: 'Operating Cost Rate',
      value: inputs.operatingCostRate,
      tooltip: 'Operating costs as percentage of total revenue',
      type: 'number',
      min: 0,
      max: 100,
      suffix: '%'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-montserrat font-semibold text-primary mb-6">
          Master Franchise Parameters
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700 font-open-sans">
                  {field.label}
                </label>
                <Tooltip content={field.tooltip}>
                  <SafeIcon icon={FiInfo} className="w-4 h-4 text-gray-400 cursor-help" />
                </Tooltip>
              </div>
              
              <div className="relative">
                {field.prefix && (
                  <span className="absolute left-3 top-3 text-gray-500 font-open-sans">
                    {field.prefix}
                  </span>
                )}
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  min={field.min}
                  max={field.max}
                  className={`w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans ${
                    field.prefix ? 'pl-8' : ''
                  } ${field.suffix ? 'pr-8' : ''}`}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
                {field.suffix && (
                  <span className="absolute right-3 top-3 text-gray-500 font-open-sans">
                    {field.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InputsTab;