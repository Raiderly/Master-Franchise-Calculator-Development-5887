import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdvancedInputPanel from './AdvancedInputPanel';
import KPIDashboard from './KPIDashboard';
import { 
  RevenueStackedBar, 
  RevenueDonut, 
  RevenueLine, 
  BreakevenChart, 
  SensitivityChart, 
  CashFlowChart 
} from '../Charts/AdvancedCharts';
import { calculateAdvancedKPIs, buildChartData, calculateKPIs } from '../../utils/advancedCalculations';
import ScenarioManager from '../Scenarios/ScenarioManager';
import ComparisonView from '../Scenarios/ComparisonView';
import { useScenarios } from '../../hooks/useScenarios';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiInfo, FiBarChart2, FiTrendingUp } = FiIcons;

const AdvancedCalculator = () => {
  const [inputs, setInputs] = useState({
    // Network Development defaults
    devSchedule: '5,10,15,20,25',
    franchiseSales: 0,
    pilotStores: 2,
    companyStores: 1,
    companyRev: 600000,
    companyExp: 450000,
    churnRate: 8,
    territoryGrowth: false,
    
    // Franchisee Economics defaults
    initFranchiseFee: 50000,
    feePromo: 0,
    transferFee: 15000,
    equipmentRevenue: 75000,
    trainingInitial: 15000,
    trainingOngoing: 5000,
    multiUnitDiscount: false,
    earlyBirdIncentive: false,
    
    // Royalties & Recurring Revenue defaults
    royaltyRate: 6,
    minRoyaltyAmount: 2000,
    marketingLevy: 2,
    techFee: 200,
    supportFee: 100,
    supplyChainRevenue: 50000,
    minRoyalty: true,
    tieredRoyalty: false,
    
    // Operational Costs defaults
    corpMarketing: 150000,
    staffPayroll: 300000,
    legalCompliance: 75000,
    techInfrastructure: 100000,
    trainingDevelopment: 50000,
    otherCosts: 25000,
    localAreaMarketing: 30000,
    eventRevenue: 20000,
    
    // Advanced Controls defaults
    inflationRate: 3,
    leadConversion: 15,
    masterCapex: 500000,
    workingCapital: 150000,
    vendorRebateRate: 2,
    territoryDevFee: 25000,
    tieredRoyaltyStructure: '',
    customRevenue: '',
    
    // Base inputs
    avgUnitRevenue: 500000,
    newFranchiseesPerYear: 10,
    initialFranchisees: 5
  });

  const [calculations, setCalculations] = useState([]);
  const [kpis, setKpis] = useState({});
  const [chartData, setChartData] = useState({});
  const [previousKpis, setPreviousKpis] = useState(null);
  
  const { comparing, comparisonData } = useScenarios();

  useEffect(() => {
    const results = calculateAdvancedKPIs(inputs);
    const kpiData = calculateKPIs(inputs);
    const charts = buildChartData(results);
    
    setPreviousKpis(kpis);
    setCalculations(results);
    setKpis(kpiData);
    setChartData(charts);
  }, [inputs]);

  const handleLoadScenario = (scenarioInputs) => {
    setInputs(scenarioInputs);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 to-secondary/20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <img 
                  src="https://app1.sharemyimage.com/2025/07/17/ufg-centered-stacked-logo-full-color-rgb-900px-w-72ppi.webp" 
                  alt="UFG Logo" 
                  className="h-16 w-auto"
                />
                <div>
                  <h1 className="text-3xl font-montserrat font-bold text-primary">
                    Advanced Master Franchise Calculator
                  </h1>
                  <p className="text-gray-600 font-open-sans flex items-center mt-2">
                    <SafeIcon icon={FiInfo} className="w-4 h-4 mr-2 text-secondary" />
                    Comprehensive franchise network modeling with advanced analytics
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-montserrat font-bold text-primary">
                  10-Year Projections
                </div>
                <div className="text-sm text-gray-600 font-open-sans">
                  Real-time calculations
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scenario Management */}
          <motion.div variants={itemVariants}>
            <ScenarioManager 
              inputs={inputs} 
              outputs={calculations} 
              onLoadScenario={handleLoadScenario} 
            />
          </motion.div>

          {comparing && comparisonData ? (
            <ComparisonView 
              currentData={calculations} 
              comparisonData={comparisonData.scenario1.outputs}
              selectedYear={1}
            />
          ) : (
            <>
              {/* Input Panel */}
              <motion.div variants={itemVariants}>
                <AdvancedInputPanel inputs={inputs} setInputs={setInputs} />
              </motion.div>

              {/* KPI Dashboard */}
              <motion.div variants={itemVariants}>
                <KPIDashboard kpis={kpis} previousKpis={previousKpis} />
              </motion.div>

              {/* Charts Section */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <SafeIcon icon={FiBarChart2} className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-montserrat font-bold text-primary">
                    Financial Analysis & Projections
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <RevenueStackedBar data={chartData.stackedBar} />
                  <RevenueDonut data={chartData.donut} />
                  <RevenueLine data={chartData.line} />
                  <BreakevenChart data={chartData.breakeven} />
                  <SensitivityChart data={chartData.sensitivity} />
                  <CashFlowChart data={chartData.cashFlow} />
                </div>
              </motion.div>

              {/* Summary Section */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-montserrat font-bold text-primary">
                    Executive Summary
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-montserrat font-bold text-primary">
                      {calculations.length > 0 ? calculations[calculations.length - 1].activeFranchisees : 0}
                    </div>
                    <div className="text-sm text-gray-600 font-open-sans">
                      Total Franchisees (Year 10)
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-secondary/5 rounded-lg">
                    <div className="text-2xl font-montserrat font-bold text-secondary">
                      {calculations.reduce((sum, calc) => sum + calc.totalRevenue, 0).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                    </div>
                    <div className="text-sm text-gray-600 font-open-sans">
                      Total Revenue (10 Years)
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-montserrat font-bold text-green-600">
                      {calculations.reduce((sum, calc) => sum + calc.netProfit, 0).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })}
                    </div>
                    <div className="text-sm text-gray-600 font-open-sans">
                      Total Net Profit (10 Years)
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-montserrat font-bold text-purple-600">
                      {calculations.length > 0 ? 
                        `${(calculations[calculations.length - 1].roiPercentage || 0).toFixed(1)}%` 
                        : '0%'}
                    </div>
                    <div className="text-sm text-gray-600 font-open-sans">
                      ROI (Year 10)
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedCalculator;