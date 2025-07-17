import React from 'react';
import { motion } from 'framer-motion';

const TabNavigation = ({ activeTab, setActiveTab, selectedYear, setSelectedYear }) => {
  const tabs = [
    { id: 'inputs', label: 'Inputs' },
    { id: 'outputs', label: 'Outputs' }
  ];

  const years = [1, 3, 5];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-md font-medium transition-all font-open-sans ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Year Selection (only show for outputs) */}
        {activeTab === 'outputs' && (
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 font-open-sans">
              View Year:
            </span>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {years.map((year) => (
                <motion.button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-1 rounded-md font-medium transition-all font-open-sans ${
                    selectedYear === year
                      ? 'bg-secondary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
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