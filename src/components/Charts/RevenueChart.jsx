import React from 'react';
import ReactECharts from 'echarts-for-react';
import { getRevenueBreakdown, formatCurrency } from '../../utils/calculations';

const RevenueChart = ({ data }) => {
  const revenueData = getRevenueBreakdown(data);
  
  // Enhanced color palette
  const colors = [
    '#0A3466', // Primary
    '#3083DC', // Secondary
    '#AAD6FF', // Accent
    '#10B981', // Green
    '#F59E0B', // Orange
    '#8B5CF6', // Purple
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        return `${params.name}: ${formatCurrency(params.value)} (${params.percent}%)`;
      },
      backgroundColor: '#fff',
      borderColor: '#0A3466',
      borderWidth: 1,
      textStyle: {
        color: '#333',
        fontFamily: 'Open Sans'
      },
      extraCssText: 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center',
      textStyle: {
        fontSize: 12,
        fontFamily: 'Open Sans',
        color: '#333'
      },
      itemGap: 12,
      formatter: function(name) {
        const item = revenueData.find(d => d.name === name);
        return `${name}: ${formatCurrency(item?.value || 0)}`;
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['65%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
            fontFamily: 'Montserrat',
            formatter: '{b}\n{c} ({d}%)'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        },
        labelLine: {
          show: false
        },
        data: revenueData.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: colors[index % colors.length]
          }
        }))
      }
    ]
  };

  return (
    <div className="w-full h-80">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default RevenueChart;