import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/calculations';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGitCompare } = FiIcons;

const ComparisonChart = ({ 
  data, 
  comparisonData, 
  metric = 'totalRevenue', 
  format = 'currency', 
  title = 'Comparison' 
}) => {
  if (!data || !comparisonData) return null;

  // Format values based on the specified format type
  const formatValue = (value) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
      default:
        return formatNumber(value);
    }
  };

  // Prepare data for the chart
  const chartData = data.map(item => {
    const comparisonItem = comparisonData.find(c => c.year === item.year);
    return {
      year: item.year,
      current: item[metric] || 0,
      comparison: comparisonItem ? comparisonItem[metric] || 0 : 0
    };
  });

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-700 font-semibold mb-1">Year {label}</p>
          {payload.map((entry, index) => (
            <p 
              key={index} 
              className="text-sm" 
              style={{ color: entry.color }}
            >
              {entry.name}: {formatValue(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-full">
          <SafeIcon icon={FiGitCompare} className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-montserrat font-semibold text-primary">
          {title}
        </h3>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 12 }}
              tickFormatter={year => `Year ${year}`}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={value => {
                if (format === 'currency') {
                  return value >= 1000000 
                    ? `$${(value / 1000000).toFixed(1)}M` 
                    : value >= 1000 
                    ? `$${(value / 1000).toFixed(0)}K` 
                    : `$${value}`;
                } else if (format === 'percentage') {
                  return `${value}%`;
                } else {
                  return value;
                }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="current" 
              name="Current" 
              fill="#0A3466" 
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="comparison" 
              name="Comparison" 
              fill="#3083DC" 
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;