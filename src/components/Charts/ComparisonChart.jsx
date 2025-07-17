import React from 'react';
import ReactECharts from 'echarts-for-react';
import { formatCurrency, formatNumber, formatPercentage } from '../../utils/calculations';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGitCompare } = FiIcons;

const ComparisonChart = ({ data, comparisonData, metric = 'totalRevenue', format = 'currency', title = 'Comparison' }) => {
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

  // Get the data series for the chart
  const currentData = data.map(d => ({
    year: d.year,
    value: d[metric] || 0
  }));

  const comparisonSeriesData = comparisonData.map(d => ({
    year: d.year,
    value: d[metric] || 0
  }));

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
          result += `<div>${colorSpan} ${param.seriesName}: ${formatValue(param.value)}</div>`;
        });
        return result;
      },
      extraCssText: 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);'
    },
    legend: {
      data: ['Current', 'Comparison'],
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
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: currentData.map(d => d.year),
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
          return formatValue(value);
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
        name: 'Current',
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
          color: '#0A3466',
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#0A3466',
            shadowBlur: 10,
            shadowColor: 'rgba(10,52,102,0.3)'
          }
        },
        data: currentData.map(d => d.value)
      },
      {
        name: 'Comparison',
        type: 'bar',
        barWidth: '30%',
        barGap: '0%',
        itemStyle: {
          color: '#3083DC',
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#3083DC',
            shadowBlur: 10,
            shadowColor: 'rgba(48,131,220,0.3)'
          }
        },
        data: comparisonSeriesData.map(d => d.value)
      }
    ]
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
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </div>
  );
};

export default ComparisonChart;