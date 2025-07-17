import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/calculations';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart2, FiPieChart, FiTrendingUp, FiActivity } = FiIcons;

const COLORS = ['#0A3466', '#3083DC', '#AAD6FF', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6B7280'];

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatter ? formatter(entry.value) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueStackedBar = ({ data, title = "Revenue Breakdown by Year" }) => {
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
          <Tooltip content={<CustomTooltip formatter={formatCurrency} />} />
          <Legend />
          <Bar dataKey="royalty" stackId="a" fill="#0A3466" name="Royalty Income" />
          <Bar dataKey="fees" stackId="a" fill="#3083DC" name="Franchise Fees" />
          <Bar dataKey="company" stackId="a" fill="#AAD6FF" name="Company Stores" />
          <Bar dataKey="other" stackId="a" fill="#10B981" name="Other Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const RevenueDonut = ({ data, title = "Revenue Distribution" }) => {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <SafeIcon icon={FiPieChart} className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-montserrat font-semibold text-primary">{title}</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const RevenueLine = ({ data, title = "Revenue Projections" }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-montserrat font-semibold text-primary">{title}</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Tooltip content={<CustomTooltip formatter={formatCurrency} />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="totalRevenue" 
            stroke="#3083DC" 
            strokeWidth={3}
            name="Total Revenue"
            dot={{ fill: '#3083DC', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="netProfit" 
            stroke="#0A3466" 
            strokeWidth={3}
            name="Net Profit"
            dot={{ fill: '#0A3466', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BreakevenChart = ({ data, title = "Breakeven Analysis" }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <SafeIcon icon={FiActivity} className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-montserrat font-semibold text-primary">{title}</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Tooltip content={<CustomTooltip formatter={formatCurrency} />} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            fill="#AAD6FF" 
            stroke="#3083DC"
            name="Revenue"
          />
          <Area 
            type="monotone" 
            dataKey="costs" 
            fill="#FEE2E2" 
            stroke="#EF4444"
            name="Costs"
          />
          <Line 
            type="monotone" 
            dataKey="breakeven" 
            stroke="#10B981" 
            strokeWidth={3}
            strokeDasharray="5 5"
            name="Breakeven Point"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SensitivityChart = ({ data, title = "Sensitivity Analysis" }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <SafeIcon icon={FiBarChart2} className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-montserrat font-semibold text-primary">{title}</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={data} 
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            type="number"
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={{ stroke: '#ccc' }}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis 
            type="category"
            dataKey="variable"
            tick={{ fontSize: 12, fill: '#666' }}
            tickLine={{ stroke: '#ccc' }}
            width={80}
          />
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Impact']}
            labelStyle={{ color: '#333' }}
          />
          <Bar 
            dataKey="impact" 
            fill="#3083DC"
            name="Impact on Profit"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CashFlowChart = ({ data, title = "Cash Flow Analysis" }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-montserrat font-semibold text-primary">{title}</h3>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Tooltip content={<CustomTooltip formatter={formatCurrency} />} />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="inflows" 
            stackId="1"
            stroke="#10B981" 
            fill="#10B981"
            name="Cash Inflows"
          />
          <Area 
            type="monotone" 
            dataKey="outflows" 
            stackId="1"
            stroke="#EF4444" 
            fill="#EF4444"
            name="Cash Outflows"
          />
          <Line 
            type="monotone" 
            dataKey="net" 
            stroke="#0A3466" 
            strokeWidth={3}
            name="Net Cash Flow"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};