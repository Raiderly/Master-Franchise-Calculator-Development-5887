import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/calculations';
import RevenueChart from '../Charts/RevenueChart';
import ProjectionChart from '../Charts/ProjectionChart';

const OutputsTab = ({ selectedYear, projections }) => {
  const yearData = projections.find(p => p.year === selectedYear);
  
  if (!yearData) return null;

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(yearData.totalRevenue),
      color: 'bg-primary',
      textColor: 'text-white'
    },
    {
      title: 'Net Profit',
      value: formatCurrency(yearData.netProfit),
      color: 'bg-secondary',
      textColor: 'text-white'
    },
    {
      title: 'Active Franchisees',
      value: formatNumber(yearData.activeFranchisees),
      color: 'bg-accent',
      textColor: 'text-primary'
    },
    {
      title: 'Profit Margin',
      value: formatPercentage(yearData.profitMargin),
      color: 'bg-green-500',
      textColor: 'text-white'
    },
    {
      title: 'Per Unit Revenue',
      value: formatCurrency(yearData.perUnitRevenue),
      color: 'bg-purple-500',
      textColor: 'text-white'
    },
    {
      title: 'Royalty Income',
      value: formatCurrency(yearData.royaltyIncome),
      color: 'bg-orange-500',
      textColor: 'text-white'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${kpi.color} rounded-xl p-6 shadow-lg`}
          >
            <h3 className={`text-sm font-open-sans font-medium ${kpi.textColor} opacity-90 mb-2`}>
              {kpi.title}
            </h3>
            <p className={`text-2xl font-montserrat font-bold ${kpi.textColor}`}>
              {kpi.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-montserrat font-semibold text-primary mb-4">
            Revenue Breakdown - Year {selectedYear}
          </h3>
          <RevenueChart data={yearData} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-montserrat font-semibold text-primary mb-4">
            5-Year Projections
          </h3>
          <ProjectionChart data={projections} />
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-montserrat font-semibold text-primary mb-4">
          Detailed Financial Breakdown - Year {selectedYear}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 font-open-sans">Revenue Streams</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 font-open-sans">Master Franchise Fees:</span>
                <span className="font-semibold font-open-sans">{formatCurrency(yearData.masterFranchiseFees)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-open-sans">Royalty Income:</span>
                <span className="font-semibold font-open-sans">{formatCurrency(yearData.royaltyIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-open-sans">Training Fees:</span>
                <span className="font-semibold font-open-sans">{formatCurrency(yearData.trainingFees)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-open-sans">Marketing Levies:</span>
                <span className="font-semibold font-open-sans">{formatCurrency(yearData.marketingLevies)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-open-sans">Tech Fees:</span>
                <span className="font-semibold font-open-sans">{formatCurrency(yearData.techFees)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-primary font-open-sans">Total Revenue:</span>
                  <span className="text-primary font-open-sans">{formatCurrency(yearData.totalRevenue)}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3 font-open-sans">Costs & Profitability</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 font-open-sans">Operating Costs:</span>
                <span className="font-semibold font-open-sans">{formatCurrency(yearData.operatingCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-open-sans">Net Profit:</span>
                <span className="font-semibold text-green-600 font-open-sans">{formatCurrency(yearData.netProfit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-open-sans">Profit Margin:</span>
                <span className="font-semibold font-open-sans">{formatPercentage(yearData.profitMargin)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-open-sans">Revenue per Unit:</span>
                <span className="font-semibold font-open-sans">{formatCurrency(yearData.perUnitRevenue)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OutputsTab;