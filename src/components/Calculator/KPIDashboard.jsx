import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/calculations';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiDollarSign, 
  FiTrendingUp, 
  FiUsers, 
  FiPercent, 
  FiActivity, 
  FiPieChart, 
  FiBarChart2, 
  FiTarget, 
  FiArrowUp, 
  FiArrowDown, 
  FiMinus 
} = FiIcons;

const kpiList = [
  { label: 'Total Network Revenue', key: 'totalRevenue', color: 'from-primary to-primary/90', icon: FiDollarSign, format: 'currency' },
  { label: 'Royalty Income', key: 'royaltyIncome', color: 'from-secondary to-secondary/90', icon: FiTrendingUp, format: 'currency' },
  { label: 'Franchise Fee Revenue', key: 'franchiseFeeRevenue', color: 'from-accent to-accent/90', icon: FiDollarSign, format: 'currency' },
  { label: 'Net Profit', key: 'netProfit', color: 'from-green-500 to-green-500/90', icon: FiTrendingUp, format: 'currency' },
  { label: 'Company Store Profit', key: 'companyProfit', color: 'from-purple-500 to-purple-500/90', icon: FiActivity, format: 'currency' },
  { label: 'Active Franchisees', key: 'activeFranchisees', color: 'from-orange-500 to-orange-500/90', icon: FiUsers, format: 'number' },
  { label: 'Profit Margin', key: 'profitMargin', color: 'from-pink-500 to-pink-500/90', icon: FiPercent, format: 'percentage' },
  { label: 'Revenue Per Unit', key: 'perUnitRevenue', color: 'from-indigo-500 to-indigo-500/90', icon: FiTarget, format: 'currency' },
  { label: 'Marketing Fund', key: 'marketingFund', color: 'from-teal-500 to-teal-500/90', icon: FiPieChart, format: 'currency' },
  { label: 'Tech Fee Revenue', key: 'techFeeRevenue', color: 'from-cyan-500 to-cyan-500/90', icon: FiBarChart2, format: 'currency' }
];

export default function KPIDashboard({ kpis, previousKpis = null }) {
  const formatValue = (value, format) => {
    if (value === null || value === undefined || isNaN(value)) return '$0';
    
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
        return formatNumber(value);
      default:
        return value.toString();
    }
  };

  const getChangeIndicator = (current, previous) => {
    if (!previous || current === previous || isNaN(current) || isNaN(previous)) {
      return { icon: FiMinus, color: 'text-gray-400', change: '0%' };
    }
    
    const change = ((current - previous) / Math.abs(previous)) * 100;
    const isPositive = change > 0;
    
    return {
      icon: isPositive ? FiArrowUp : FiArrowDown,
      color: isPositive ? 'text-green-300' : 'text-red-300',
      change: `${isPositive ? '+' : ''}${change.toFixed(1)}%`
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-montserrat font-bold text-primary">
          Key Performance Indicators
        </h2>
        <div className="text-sm text-gray-600 font-open-sans">
          Live calculations based on your inputs
        </div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        {kpiList.map((kpi) => {
          const currentValue = kpis[kpi.key] || 0;
          const previousValue = previousKpis?.[kpi.key];
          const changeIndicator = getChangeIndicator(currentValue, previousValue);
          
          return (
            <motion.div
              key={kpi.key}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-xl p-6 shadow-lg bg-gradient-to-r ${kpi.color} text-white`}
            >
              {/* Background Icon */}
              <div className="absolute top-0 right-0 opacity-10">
                <SafeIcon icon={kpi.icon} className="w-20 h-20 transform translate-x-4 -translate-y-4" />
              </div>
              
              {/* Header */}
              <div className="flex items-center space-x-3 mb-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-full">
                  <SafeIcon icon={kpi.icon} className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-open-sans font-medium text-sm opacity-90 leading-tight">
                  {kpi.label}
                </h3>
              </div>
              
              {/* Value */}
              <div className="relative z-10">
                <p className="text-2xl font-montserrat font-bold mb-2">
                  {formatValue(currentValue, kpi.format)}
                </p>
                
                {/* Change Indicator */}
                {previousValue !== null && previousValue !== undefined && (
                  <div className={`flex items-center space-x-1 ${changeIndicator.color}`}>
                    <SafeIcon icon={changeIndicator.icon} className="w-3 h-3" />
                    <span className="text-xs font-semibold">
                      {changeIndicator.change}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}