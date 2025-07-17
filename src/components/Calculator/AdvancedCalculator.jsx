import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InputPanel from './InputPanel';
import KPIDashboard from './KPIDashboard';
import RevenueStackedBar from '../Charts/RevenueStackedBar';
import RevenueDonut from '../Charts/RevenueDonut';
import RevenueLine from '../Charts/RevenueLine';
import CashFlowChart from '../Charts/CashFlowChart';
import BreakevenChart from '../Charts/BreakevenChart';
import { calculateKPIs, buildChartData } from '../../utils/businessLogic';
import ScenarioManager from '../Scenarios/ScenarioManager';
import ScenarioComparison from '../Scenarios/ScenarioComparison';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiInfo, FiBarChart2, FiTrendingUp } = FiIcons;

// Find first year where cumulativeProfit >= 0 (breakeven)
function findBreakevenYear(breakevenData) {
  if (!breakevenData || breakevenData.length === 0) return null;
  const found = breakevenData.find(d => d.cumulativeProfit >= 0);
  return found ? found.year : null;
}

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
    // Supply Chain & Vendor defaults
    supplyChainEnabled: false,
    vendorRebateRate: 2,
    franchiseeShare: 50,
    annualSupplyRevenue: 100000,
    // Marketing & Events defaults
    corpMarketing: 150000,
    localAreaMarketing: 30000,
    lamEnabled: false,
    eventRevenue: 20000,
    eventsEnabled: false,
    eventsBudget: 50000,
    // Operational Costs defaults
    staffPayroll: 300000,
    legalCompliance: 75000,
    techInfrastructure: 100000,
    trainingDevelopment: 50000,
    otherCosts: 25000,
    officeAdmin: 40000,
    // Advanced Controls defaults
    inflationRate: 3,
    leadConversion: 15,
    masterCapex: 500000,
    workingCapital: 150000,
    territoryDevFee: 25000,
    advancedControlsEnabled: false,
    tieredRoyaltyStructure: '',
    // Base inputs
    avgUnitRevenue: 500000,
    newFranchiseesPerYear: 10,
    initialFranchisees: 5
  });

  const [kpis, setKpis] = useState({});
  const [chartData, setChartData] = useState({});
  const [previousKpis, setPreviousKpis] = useState(null);
  const [comparisonScenarios, setComparisonScenarios] = useState(null);
  const [outputs, setOutputs] = useState({});

  useEffect(() => {
    const kpiData = calculateKPIs(inputs);
    const charts = buildChartData(inputs);
    
    setPreviousKpis(kpis);
    setKpis(kpiData);
    setChartData(charts);
    
    // Store outputs for scenario saving
    setOutputs(charts);
  }, [inputs]);

  const handleLoadScenario = (scenarioInputs) => {
    setInputs(scenarioInputs);
  };

  const handleCompareScenarios = (selectedScenarios) => {
    setComparisonScenarios(selectedScenarios);
  };

  const breakevenYear = findBreakevenYear(chartData.breakeven);

  // If in comparison mode, show comparison view
  if (comparisonScenarios) {
    return (
      <ScenarioComparison 
        scenarios={comparisonScenarios} 
        onClose={() => setComparisonScenarios(null)} 
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
              outputs={outputs} 
              onLoadScenario={handleLoadScenario}
              onCompareScenarios={handleCompareScenarios}
            />
          </motion.div>

          {/* Input Panel */}
          <motion.div variants={itemVariants}>
            <InputPanel inputs={inputs} setInputs={setInputs} />
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
              <RevenueStackedBar data={chartData.stackedBar || []} />
              <RevenueDonut data={chartData.donut || []} />
              <RevenueLine data={chartData.line || []} />
              <CashFlowChart data={chartData.cashFlow || []} />
              <BreakevenChart 
                data={chartData.breakeven || []} 
                breakevenYear={breakevenYear}
              />
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
                  {kpis.activeFranchisees || 0}
                </div>
                <div className="text-sm text-gray-600 font-open-sans">
                  Active Franchisees
                </div>
              </div>
              <div className="text-center p-4 bg-secondary/5 rounded-lg">
                <div className="text-2xl font-montserrat font-bold text-secondary">
                  {(kpis.totalRevenue || 0).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </div>
                <div className="text-sm text-gray-600 font-open-sans">
                  Annual Revenue
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-montserrat font-bold text-green-600">
                  {(kpis.netProfit || 0).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </div>
                <div className="text-sm text-gray-600 font-open-sans">
                  Net Profit
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-montserrat font-bold text-purple-600">
                  {`${(kpis.profitMargin || 0).toFixed(1)}%`}
                </div>
                <div className="text-sm text-gray-600 font-open-sans">
                  Profit Margin
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedCalculator;