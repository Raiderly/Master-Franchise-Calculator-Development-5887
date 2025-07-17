import React from 'react';
import ReactECharts from 'echarts-for-react';
import { formatCurrency } from '../../utils/calculations';

const ProjectionChart = ({ data }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#0A3466'
        }
      },
      backgroundColor: '#fff',
      borderColor: '#0A3466',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      },
      formatter: function(params) {
        let result = `Year ${params[0].axisValue}<br/>`;
        params.forEach(param => {
          result += `${param.seriesName}: ${formatCurrency(param.value)}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['Total Revenue', 'Net Profit'],
      textStyle: {
        fontFamily: 'Open Sans'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(d => d.year),
      axisLabel: {
        fontFamily: 'Open Sans'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function(value) {
          return formatCurrency(value);
        },
        fontFamily: 'Open Sans'
      }
    },
    series: [
      {
        name: 'Total Revenue',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#0A3466'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(10, 52, 102, 0.3)'
            }, {
              offset: 1, color: 'rgba(10, 52, 102, 0.1)'
            }]
          }
        },
        data: data.map(d => d.totalRevenue)
      },
      {
        name: 'Net Profit',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#3083DC'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(48, 131, 220, 0.3)'
            }, {
              offset: 1, color: 'rgba(48, 131, 220, 0.1)'
            }]
          }
        },
        data: data.map(d => d.netProfit)
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

export default ProjectionChart;