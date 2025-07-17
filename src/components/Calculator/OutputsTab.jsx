import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/calculations';
import RevenueChart from '../Charts/RevenueChart';
import ProjectionChart from '../Charts/ProjectionChart';
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
  FiArrowUpRight,
  FiArrowDownRight
} = FiIcons;

const OutputsTab = ({ selectedYear, projections }) => {
  const yearData = projections.find(p => p.year === selectedYear);
  
  if (!yearData) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(yearData.totalRevenue),
      color: 'bg-gradient-to-r from-primary to-primary/90',
      textColor: 'text-white',
      icon: FiDollarSign,
      change: '+12%', // Example - would be calculated
      isPositive: true
    },
    {
      title: 'Net Profit',
      value: formatCurrency(yearData.netProfit),
      color: 'bg-gradient-to-r from-secondary to-secondary/90',
      textColor: 'text-white',
      icon: FiTrendingUp,
      change: '+8%',
      isPositive: true
    },
    {
      title: 'Active Franchisees',
      value: formatNumber(yearData.activeFranchisees),
      color: 'bg-gradient-to-r from-accent to-accent/90',
      textColor: 'text-primary',
      icon: FiUsers,
      change: '+5',
      isPositive: true
    },
    {
      title: 'Profit Margin',
      value: formatPercentage(yearData.profitMargin),
      color: 'bg-gradient-to-r from-green-500 to-green-500/90',
      textColor: 'text-white',
      icon: FiPercent,
      change: '+1.2%',
      isPositive: true
    },
    {
      title: 'Per Unit Revenue',
      value: formatCurrency(yearData.perUnitRevenue),
      color: 'bg-gradient-to-r from-purple-500 to-purple-500/90',
      textColor: 'text-white',
      icon: FiActivity,
      change: '+3%',
      isPositive: true
    },
    {
      title: 'Royalty Income',
      value: formatCurrency(yearData.royaltyIncome),
      color: 'bg-gradient-to-r from-orange-500 to-orange-500/90',
      textColor: 'text-white',
      icon: FiPieChart,
      change: '+15%',
      isPositive: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            variants={itemVariants}
            className={`${kpi.color} rounded-xl p-6 shadow-lg overflow-hidden relative`}
          >
            <div className="absolute top-0 right-0 opacity-10">
              <SafeIcon icon={kpi.icon} className="w-24 h-24 transform translate-x-6 -translate-y-6" />
            </div>
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-full ${kpi.textColor === 'text-white' ? 'bg-white/20' : 'bg-primary/20'}`}>
                <SafeIcon icon={kpi.icon} className={`w-4 h-4 ${kpi.textColor}`} />
              </div>
              <h3 className={`text-sm font-open-sans font-medium ${kpi.textColor} opacity-90`}>
                {kpi.title}
              </h3>
            </div>
            <p className={`text-2xl font-montserrat font-bold ${kpi.textColor}`}>
              {kpi.value}
            </p>
            <div className={`mt-2 flex items-center space-x-1 ${kpi.isPositive ? 'text-green-100' : 'text-red-100'}`}>
              <SafeIcon 
                icon={kpi.isPositive ? FiArrowUpRight : FiArrowDownRight} 
                className="w-3 h-3"
              />
              <span className="text-xs font-semibold">{kpi.change} from prev year</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          variants={itemVariants} 
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <SafeIcon icon={FiPieChart} className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-montserrat font-semibold text-primary">
              Revenue Breakdown - Year {selectedYear}
            </h3>
          </div>
          <RevenueChart data={yearData} />
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <SafeIcon icon={FiBarChart2} className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-montserrat font-semibold text-primary">
              5-Year Projections
            </h3>
          </div>
          <ProjectionChart data={projections} />
        </motion.div>
      </div>

      {/* Detailed Breakdown */}
      <motion.div 
        variants={itemVariants} 
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-montserrat font-semibold text-primary">
            Detailed Financial Breakdown - Year {selectedYear}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3 font-open-sans flex items-center">
              <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-2 text-primary" />
              Revenue Streams
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Master Franchise Fees', value: yearData.masterFranchiseFees },
                { label: 'Royalty Income', value: yearData.royaltyIncome },
                { label: 'Training Fees', value: yearData.trainingFees },
                { label: 'Marketing Levies', value: yearData.marketingLevies },
                { label: 'Tech Fees', value: yearData.techFees }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 font-open-sans">{item.label}:</span>
                  <span className="font-semibold font-open-sans">{formatCurrency(item.value)}</span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span className="text-primary font-open-sans">Total Revenue:</span>
                  <span className="text-primary font-open-sans">{formatCurrency(yearData.totalRevenue)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3 font-open-sans flex items-center">
              <SafeIcon icon={FiActivity} className="w-4 h-4 mr-2 text-primary" />
              Costs & Profitability
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-open-sans">Operating Costs:</span>
                <span className="font-semibold font-open-sans">{formatCurrency(yearData.operatingCosts)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-open-sans">Net Profit:</span>
                <span className="font-semibold text-green-600 font-open-sans">{formatCurrency(yearData.netProfit)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-open-sans">Profit Margin:</span>
                <span className="font-semibold font-open-sans">{formatPercentage(yearData.profitMargin)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-open-sans">Revenue per Unit:</span>
                <span className="font-semibold font-open-sans">{formatCurrency(yearData.perUnitRevenue)}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OutputsTab;