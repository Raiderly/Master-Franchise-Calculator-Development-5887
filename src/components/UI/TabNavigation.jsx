import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEdit3, FiBarChart2, FiCalendar, FiGitCompare } = FiIcons;

const TabNavigation = ({ activeTab, setActiveTab, selectedYear, setSelectedYear }) => {
  const tabs = [
    { id: 'inputs', label: 'Inputs', icon: FiEdit3 },
    { id: 'outputs', label: 'Outputs', icon: FiBarChart2 }
  ];
  
  const years = [1, 2, 3, 4, 5]; // Added all 5 years

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-md font-medium transition-all font-open-sans flex items-center space-x-2 ${activeTab === tab.id ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Year Selection (show for outputs and comparisons) */}
        {(activeTab === 'outputs' || activeTab === 'comparison') && (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 font-open-sans flex items-center">
              <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
              View Year:
            </span>
            <div className="flex flex-wrap justify-center gap-1 bg-gray-100 rounded-lg p-1">
              {years.map((year) => (
                <motion.button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded-md font-medium transition-all font-open-sans ${selectedYear === year ? 'bg-secondary text-white shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Year {year}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavigation;