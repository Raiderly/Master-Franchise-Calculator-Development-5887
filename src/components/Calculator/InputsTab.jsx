import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Tooltip from '../UI/Tooltip';
import NumberInput from '../UI/NumberInput';

const { FiInfo, FiDollarSign, FiPercent, FiUsers, FiTrendingUp, FiSettings } = FiIcons;

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
      min: 0,
      icon: FiUsers
    },
    {
      key: 'newFranchiseesPerYear',
      label: 'New Franchisees Per Year',
      value: inputs.newFranchiseesPerYear,
      tooltip: 'Expected number of new franchisees recruited annually',
      type: 'number',
      min: 0,
      icon: FiTrendingUp
    },
    {
      key: 'masterFranchiseFee',
      label: 'Master Franchise Fee',
      value: inputs.masterFranchiseFee,
      tooltip: 'Initial fee paid by each new franchisee',
      type: 'number',
      min: 0,
      prefix: '$',
      icon: FiDollarSign
    },
    {
      key: 'royaltyRate',
      label: 'Royalty Rate',
      value: inputs.royaltyRate,
      tooltip: 'Percentage of franchisee revenue paid as royalties',
      type: 'number',
      min: 0,
      max: 100,
      suffix: '%',
      icon: FiPercent
    },
    {
      key: 'avgUnitRevenue',
      label: 'Average Unit Revenue',
      value: inputs.avgUnitRevenue,
      tooltip: 'Average annual revenue per franchisee unit',
      type: 'number',
      min: 0,
      prefix: '$',
      icon: FiDollarSign
    },
    {
      key: 'churnRate',
      label: 'Churn Rate',
      value: inputs.churnRate,
      tooltip: 'Percentage of franchisees who leave the system annually',
      type: 'number',
      min: 0,
      max: 100,
      suffix: '%',
      icon: FiPercent
    },
    {
      key: 'trainingFee',
      label: 'Training Fee',
      value: inputs.trainingFee,
      tooltip: 'One-time training fee per new franchisee',
      type: 'number',
      min: 0,
      prefix: '$',
      icon: FiDollarSign
    },
    {
      key: 'marketingLevyRate',
      label: 'Marketing Levy Rate',
      value: inputs.marketingLevyRate,
      tooltip: 'Percentage of franchisee revenue for marketing fund',
      type: 'number',
      min: 0,
      max: 100,
      suffix: '%',
      icon: FiPercent
    },
    {
      key: 'techFeePerUnit',
      label: 'Tech Fee Per Unit (Monthly)',
      value: inputs.techFeePerUnit,
      tooltip: 'Monthly technology fee per franchisee',
      type: 'number',
      min: 0,
      prefix: '$',
      icon: FiSettings
    },
    {
      key: 'operatingCostRate',
      label: 'Operating Cost Rate',
      value: inputs.operatingCostRate,
      tooltip: 'Operating costs as percentage of total revenue',
      type: 'number',
      min: 0,
      max: 100,
      suffix: '%',
      icon: FiPercent
    }
  ];

  // Group fields into categories
  const fieldGroups = [
    {
      title: 'Network Development',
      icon: FiUsers,
      fields: ['initialFranchisees', 'newFranchiseesPerYear', 'churnRate']
    },
    {
      title: 'Revenue Structure',
      icon: FiDollarSign,
      fields: ['masterFranchiseFee', 'royaltyRate', 'avgUnitRevenue', 'trainingFee', 'techFeePerUnit']
    },
    {
      title: 'Operations',
      icon: FiSettings,
      fields: ['marketingLevyRate', 'operatingCostRate']
    }
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {fieldGroups.map((group) => (
        <motion.div
          key={group.title}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-full">
              <SafeIcon icon={group.icon} className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-montserrat font-semibold text-primary">
              {group.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields
              .filter(field => group.fields.includes(field.key))
              .map((field) => (
                <motion.div 
                  key={field.key} 
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={field.icon} className="w-4 h-4 text-gray-500" />
                    <label className="block text-sm font-medium text-gray-700 font-open-sans">
                      {field.label}
                    </label>
                    <Tooltip content={field.tooltip}>
                      <SafeIcon icon={FiInfo} className="w-4 h-4 text-gray-400 cursor-help" />
                    </Tooltip>
                  </div>
                  <NumberInput
                    value={field.value}
                    onChange={(value) => handleInputChange(field.key, value)}
                    min={field.min}
                    max={field.max}
                    prefix={field.prefix}
                    suffix={field.suffix}
                  />
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default InputsTab;