import React from 'react';
import ReactECharts from 'echarts-for-react';
import { getRevenueBreakdown, formatCurrency } from '../../utils/calculations';

const RevenueChart = ({ data }) => {
  const revenueData = getRevenueBreakdown(data);

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: '#fff',
      borderColor: '#0A3466',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        fontSize: 12,
        fontFamily: 'Open Sans'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Montserrat'
          }
        },
        labelLine: {
          show: false
        },
        data: revenueData.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: [
              '#0A3466', // Primary
              '#3083DC', // Secondary
              '#AAD6FF', // Accent
              '#10B981', // Green
              '#F59E0B', // Orange
            ][index % 5]
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