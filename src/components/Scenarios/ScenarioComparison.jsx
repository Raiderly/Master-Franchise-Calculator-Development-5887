import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, formatPercentage } from '../../utils/calculations';
import { calculateKPIs, buildChartData } from '../../utils/businessLogic';
import KPIDashboard from '../Calculator/KPIDashboard';
import RevenueStackedBar from '../Charts/RevenueStackedBar';
import RevenueDonut from '../Charts/RevenueDonut';
import RevenueLine from '../Charts/RevenueLine';
import CashFlowChart from '../Charts/CashFlowChart';
import BreakevenChart from '../Charts/BreakevenChart';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGitCompare, FiX, FiArrowUp, FiArrowDown, FiMinus, FiDollarSign, FiUsers, FiPercent } = FiIcons;

function findBreakevenYear(breakevenData) {
  if (!breakevenData || breakevenData.length === 0) return null;
  const found = breakevenData.find(d => d.cumulativeProfit >= 0);
  return found ? found.year : null;
}

export default function ScenarioComparison({ scenarios, onClose }) {
  if (!scenarios || scenarios.length !== 2) return null;

  const [scenarioA, scenarioB] = scenarios;
  
  // Calculate KPIs and chart data for both scenarios
  const kpisA = calculateKPIs(scenarioA.input_data);
  const kpisB = calculateKPIs(scenarioB.input_data);
  const chartsA = buildChartData(scenarioA.input_data);
  const chartsB = buildChartData(scenarioB.input_data);
  const breakevenA = findBreakevenYear(chartsA.breakeven);
  const breakevenB = findBreakevenYear(chartsB.breakeven);

  // Calculate differences for key metrics
  const getDifference = (valueA, valueB) => {
    if (valueB === undefined || valueB === 0) return { diff: 0, percentage: 0, isPositive: false };
    
    const diff = valueA - valueB;
    const percentage = (diff / Math.abs(valueB)) * 100;
    return { 
      diff, 
      percentage, 
      isPositive: diff > 0 
    };
  };

  const keyMetrics = [
    { label: 'Total Revenue', keyA: kpisA.totalRevenue, keyB: kpisB.totalRevenue, format: 'currency', icon: FiDollarSign },
    { label: 'Net Profit', keyA: kpisA.netProfit, keyB: kpisB.netProfit, format: 'currency', icon: FiDollarSign },
    { label: 'Active Franchisees', keyA: kpisA.activeFranchisees, keyB: kpisB.activeFranchisees, format: 'number', icon: FiUsers },
    { label: 'Profit Margin', keyA: kpisA.profitMargin, keyB: kpisB.profitMargin, format: 'percentage', icon: FiPercent }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-accent/20 to-secondary/20 p-4"
    >
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <SafeIcon icon={FiGitCompare} className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-montserrat font-bold text-primary">
                  Scenario Comparison
                </h1>
                <p className="text-gray-600 font-open-sans">
                  Side-by-side analysis of your selected scenarios
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-4 h-4" />
              <span>Close Comparison</span>
            </motion.button>
          </div>
        </div>

        {/* Quick Comparison Metrics */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {keyMetrics.map((metric, index) => {
            const diff = getDifference(metric.keyA, metric.keyB);
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-montserrat font-semibold text-primary mb-4 flex items-center">
                  <SafeIcon icon={metric.icon} className="w-5 h-5 mr-2" />
                  {metric.label}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Scenario A:</span>
                    <span className="font-semibold">
                      {metric.format === 'currency' ? formatCurrency(metric.keyA) : 
                       metric.format === 'percentage' ? formatPercentage(metric.keyA) : 
                       metric.keyA.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Scenario B:</span>
                    <span className="font-semibold">
                      {metric.format === 'currency' ? formatCurrency(metric.keyB) : 
                       metric.format === 'percentage' ? formatPercentage(metric.keyB) : 
                       metric.keyB.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className={`flex items-center justify-between ${
                      diff.isPositive ? 'text-green-600' : diff.percentage === 0 ? 'text-gray-600' : 'text-red-600'
                    }`}>
                      <span className="text-sm">Difference:</span>
                      <div className="flex items-center space-x-1">
                        <SafeIcon 
                          icon={diff.percentage === 0 ? FiMinus : diff.isPositive ? FiArrowUp : FiArrowDown} 
                          className="w-4 h-4" 
                        />
                        <span className="font-semibold text-sm">
                          {diff.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scenario A */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <h2 className="text-xl font-montserrat font-bold text-primary">
                  {scenarioA.name}
                </h2>
              </div>
              {scenarioA.description && (
                <p className="text-gray-600 font-open-sans mb-4">{scenarioA.description}</p>
              )}
              <KPIDashboard kpis={kpisA} />
            </div>
            
            <RevenueStackedBar 
              data={chartsA.stackedBar} 
              title="Revenue Breakdown - Scenario A"
            />
            <RevenueDonut 
              data={chartsA.donut} 
              title="Revenue Distribution - Scenario A"
            />
            <RevenueLine 
              data={chartsA.line} 
              title="Revenue Projections - Scenario A"
            />
            <CashFlowChart 
              data={chartsA.cashFlow} 
              title="Cash Flow - Scenario A"
            />
            <BreakevenChart 
              data={chartsA.breakeven} 
              breakevenYear={breakevenA}
              title="Breakeven Analysis - Scenario A"
            />
          </motion.div>

          {/* Scenario B */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-4 h-4 bg-secondary rounded-full"></div>
                <h2 className="text-xl font-montserrat font-bold text-secondary">
                  {scenarioB.name}
                </h2>
              </div>
              {scenarioB.description && (
                <p className="text-gray-600 font-open-sans mb-4">{scenarioB.description}</p>
              )}
              <KPIDashboard kpis={kpisB} />
            </div>
            
            <RevenueStackedBar 
              data={chartsB.stackedBar} 
              title="Revenue Breakdown - Scenario B"
            />
            <RevenueDonut 
              data={chartsB.donut} 
              title="Revenue Distribution - Scenario B"
            />
            <RevenueLine 
              data={chartsB.line} 
              title="Revenue Projections - Scenario B"
            />
            <CashFlowChart 
              data={chartsB.cashFlow} 
              title="Cash Flow - Scenario B"
            />
            <BreakevenChart 
              data={chartsB.breakeven} 
              breakevenYear={breakevenB}
              title="Breakeven Analysis - Scenario B"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}