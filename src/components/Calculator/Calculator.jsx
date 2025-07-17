import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { calculateProjections } from '../../utils/calculations';
import TabNavigation from '../UI/TabNavigation';
import InputsTab from './InputsTab';
import OutputsTab from './OutputsTab';
import ScenarioManager from '../Scenarios/ScenarioManager';
import ComparisonView from '../Scenarios/ComparisonView';
import { useScenarios } from '../../hooks/useScenarios';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiInfo } = FiIcons;

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('inputs');
  const [selectedYear, setSelectedYear] = useState(1);
  const [inputs, setInputs] = useState({
    initialFranchisees: 5,
    newFranchiseesPerYear: 10,
    masterFranchiseFee: 50000,
    royaltyRate: 6,
    avgUnitRevenue: 500000,
    churnRate: 10,
    trainingFee: 15000,
    marketingLevyRate: 2,
    techFeePerUnit: 200,
    operatingCostRate: 40
  });
  const [projections, setProjections] = useState([]);
  const { comparing, comparisonData } = useScenarios();

  useEffect(() => {
    const results = calculateProjections(inputs);
    setProjections(results);
  }, [inputs]);

  const handleLoadScenario = (scenarioInputs) => {
    setInputs(scenarioInputs);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h2 className="text-2xl font-montserrat font-bold text-primary">
                Master Franchise Calculator
              </h2>
              <p className="text-gray-600 font-open-sans flex items-center mt-1">
                <SafeIcon icon={FiInfo} className="w-4 h-4 mr-2 text-secondary" />
                Analyze and project your franchise network's growth and financial performance
              </p>
            </div>
          </div>
        </div>

        <ScenarioManager 
          inputs={inputs} 
          outputs={projections} 
          onLoadScenario={handleLoadScenario} 
        />
        
        <TabNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          selectedYear={selectedYear} 
          setSelectedYear={setSelectedYear} 
        />
        
        {comparing && comparisonData ? (
          <ComparisonView 
            currentData={projections} 
            comparisonData={comparisonData.scenario1.outputs}
            selectedYear={selectedYear}
          />
        ) : (
          <>
            {activeTab === 'inputs' && (
              <InputsTab inputs={inputs} setInputs={setInputs} />
            )}
            
            {activeTab === 'outputs' && (
              <OutputsTab selectedYear={selectedYear} projections={projections} />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Calculator;