import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, formatPercentage } from '../../utils/calculations';
import ComparisonChart from '../Charts/ComparisonChart';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGitCompare, FiArrowUp, FiArrowDown, FiMinus, FiDollarSign, FiUsers, FiPercent, FiBarChart2, FiPieChart } = FiIcons;

const ComparisonView = ({ currentData, comparisonData, selectedYear }) => {
  if (!currentData || !comparisonData) return null;

  // Get the data for the selected year
  const currentYearData = currentData.find(d => d.year === selectedYear);
  const comparisonYearData = comparisonData.find(d => d.year === selectedYear);

  if (!currentYearData || !comparisonYearData) return null;

  // Calculate differences
  const getDifference = (current, comparison) => {
    const diff = current - comparison;
    const percentage = comparison !== 0 ? (diff / comparison) * 100 : 0;
    return {
      absolute: diff,
      percentage,
      isPositive: diff > 0,
      isNeutral: diff === 0
    };
  };

  const metrics = [
    {
      key: 'totalRevenue',
      label: 'Total Revenue',
      current: currentYearData.totalRevenue,
      comparison: comparisonYearData.totalRevenue,
      format: 'currency',
      icon: FiDollarSign,
      color: 'from-primary to-primary/90'
    },
    {
      key: 'netProfit',
      label: 'Net Profit',
      current: currentYearData.netProfit,
      comparison: comparisonYearData.netProfit,
      format: 'currency',
      icon: FiDollarSign,
      color: 'from-secondary to-secondary/90'
    },
    {
      key: 'activeFranchisees',
      label: 'Active Franchisees',
      current: currentYearData.activeFranchisees,
      comparison: comparisonYearData.activeFranchisees,
      format: 'number',
      icon: FiUsers,
      color: 'from-accent to-accent/90'
    },
    {
      key: 'profitMargin',
      label: 'Profit Margin',
      current: currentYearData.profitMargin,
      comparison: comparisonYearData.profitMargin,
      format: 'percentage',
      icon: FiPercent,
      color: 'from-green-500 to-green-500/90'
    },
    {
      key: 'perUnitRevenue',
      label: 'Per Unit Revenue',
      current: currentYearData.perUnitRevenue,
      comparison: comparisonYearData.perUnitRevenue,
      format: 'currency',
      icon: FiDollarSign,
      color: 'from-purple-500 to-purple-500/90'
    },
    {
      key: 'royaltyIncome',
      label: 'Royalty Income',
      current: currentYearData.royaltyIncome,
      comparison: comparisonYearData.royaltyIncome,
      format: 'currency',
      icon: FiDollarSign,
      color: 'from-orange-500 to-orange-500/90'
    }
  ];

  // Calculate differences for each metric
  const metricsWithDiff = metrics.map(metric => {
    const diff = getDifference(metric.current, metric.comparison);
    return { ...metric, difference: diff };
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <div className="bg-accent/20 border border-accent rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-2">
          <SafeIcon icon={FiGitCompare} className="w-5 h-5 text-primary" />
          <h3 className="font-montserrat font-semibold text-primary text-lg">
            Scenario Comparison - Year {selectedYear}
          </h3>
        </div>
        <p className="text-gray-700 font-open-sans">
          Comparing current scenario with: <span className="font-semibold">{comparisonData[0]?.scenarioName || 'Saved Scenario'}</span>
        </p>
      </div>

      {/* Metrics Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricsWithDiff.map((metric) => (
          <motion.div
            key={metric.key}
            variants={itemVariants}
            className={`rounded-xl p-6 shadow-lg overflow-hidden relative bg-gradient-to-r ${metric.color} text-white`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-white/20 rounded-full">
                <SafeIcon icon={metric.icon} className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-open-sans font-medium">{metric.label}</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/70 mb-1">Current</p>
                <p className="text-xl font-montserrat font-bold">
                  {metric.format === 'currency'
                    ? formatCurrency(metric.current)
                    : metric.format === 'percentage'
                    ? formatPercentage(metric.current)
                    : metric.current.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/70 mb-1">Comparison</p>
                <p className="text-xl font-montserrat font-bold">
                  {metric.format === 'currency'
                    ? formatCurrency(metric.comparison)
                    : metric.format === 'percentage'
                    ? formatPercentage(metric.comparison)
                    : metric.comparison.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center space-x-2">
                <SafeIcon
                  icon={
                    metric.difference.isNeutral
                      ? FiMinus
                      : metric.difference.isPositive
                      ? FiArrowUp
                      : FiArrowDown
                  }
                  className={`w-4 h-4 ${
                    metric.difference.isNeutral
                      ? 'text-white/80'
                      : metric.difference.isPositive
                      ? 'text-green-300'
                      : 'text-red-300'
                  }`}
                />
                <span className="text-sm font-medium">
                  {metric.format === 'currency'
                    ? formatCurrency(Math.abs(metric.difference.absolute))
                    : metric.format === 'percentage'
                    ? formatPercentage(Math.abs(metric.difference.absolute))
                    : Math.abs(metric.difference.absolute).toLocaleString()}{' '}
                  ({metric.difference.isPositive ? '+' : ''}
                  {metric.difference.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6">
          <ComparisonChart
            data={currentData}
            comparisonData={comparisonData}
            metric="totalRevenue"
            format="currency"
            title="Revenue Comparison"
          />
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6">
          <ComparisonChart
            data={currentData}
            comparisonData={comparisonData}
            metric="netProfit"
            format="currency"
            title="Profit Comparison"
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <SafeIcon icon={FiBarChart2} className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-montserrat font-semibold text-primary">
            Network Growth Comparison
          </h3>
        </div>
        <ComparisonChart
          data={currentData}
          comparisonData={comparisonData}
          metric="activeFranchisees"
          format="number"
          title="Franchisee Growth"
        />
      </motion.div>
    </motion.div>
  );
};

export default ComparisonView;