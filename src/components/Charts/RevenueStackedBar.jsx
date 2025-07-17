import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/calculations';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart2 } = FiIcons;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueStackedBar({ data, title = "Revenue Breakdown by Year" }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <SafeIcon icon={FiBarChart2} className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-montserrat font-semibold text-primary">{title}</h3>
        </div>
        <div className="h-80 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <SafeIcon icon={FiBarChart2} className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-montserrat font-semibold text-primary">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={{ stroke: '#ccc' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={{ stroke: '#ccc' }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="royalty" stackId="a" fill="#0A3466" name="Royalty Income" />
          <Bar dataKey="fees" stackId="a" fill="#3083DC" name="Franchise Fees" />
          <Bar dataKey="company" stackId="a" fill="#AAD6FF" name="Company Stores" />
          <Bar dataKey="other" stackId="a" fill="#10B981" name="Other Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}