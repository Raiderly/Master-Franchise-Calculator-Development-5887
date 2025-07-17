import React from 'react';
import ReactECharts from 'echarts-for-react';
import { formatCurrency } from '../../utils/calculations';

const ProjectionChart = ({ data }) => {
  // Enhanced styling options
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      backgroundColor: '#fff',
      borderColor: '#0A3466',
      borderWidth: 1,
      textStyle: {
        color: '#333',
        fontFamily: 'Open Sans'
      },
      formatter: function(params) {
        let result = `<div style="font-weight: bold; margin-bottom: 5px;">Year ${params[0].axisValue}</div>`;
        params.forEach(param => {
          const colorSpan = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>`;
          result += `<div>${colorSpan} ${param.seriesName}: ${formatCurrency(param.value)}</div>`;
        });
        return result;
      },
      extraCssText: 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);'
    },
    legend: {
      data: ['Total Revenue', 'Net Profit'],
      textStyle: {
        fontFamily: 'Open Sans',
        color: '#333'
      },
      icon: 'roundRect',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 20,
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: data.map(d => d.year),
      axisLabel: {
        fontFamily: 'Open Sans',
        color: '#666'
      },
      axisLine: {
        lineStyle: {
          color: '#ddd'
        }
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function(value) {
          return formatCurrency(value);
        },
        fontFamily: 'Open Sans',
        color: '#666'
      },
      splitLine: {
        lineStyle: {
          color: '#eee',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'Total Revenue',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 4,
          color: '#0A3466',
          shadowColor: 'rgba(10,52,102,0.3)',
          shadowBlur: 10
        },
        itemStyle: {
          color: '#0A3466',
          borderWidth: 2,
          borderColor: '#fff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {offset: 0, color: 'rgba(10,52,102,0.3)'},
              {offset: 1, color: 'rgba(10,52,102,0.05)'}
            ]
          }
        },
        data: data.map(d => d.totalRevenue)
      },
      {
        name: 'Net Profit',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 4,
          color: '#3083DC',
          shadowColor: 'rgba(48,131,220,0.3)',
          shadowBlur: 10
        },
        itemStyle: {
          color: '#3083DC',
          borderWidth: 2,
          borderColor: '#fff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {offset: 0, color: 'rgba(48,131,220,0.3)'},
              {offset: 1, color: 'rgba(48,131,220,0.05)'}
            ]
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