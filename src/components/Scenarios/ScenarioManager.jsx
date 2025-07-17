import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScenarios } from '../../hooks/useScenarios';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiSave, FiFolderOpen, FiTrash2, FiPlus, FiX } = FiIcons;

const ScenarioManager = ({ inputs, outputs, onLoadScenario }) => {
  const { scenarios, saveScenario, deleteScenario, loading } = useScenarios();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [scenarioName, setScenarioName] = useState('');

  const handleSaveScenario = async () => {
    if (!scenarioName.trim()) {
      toast.error('Please enter a scenario name');
      return;
    }

    try {
      await saveScenario({
        name: scenarioName,
        inputs,
        outputs
      });
      setScenarioName('');
      setShowSaveModal(false);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleLoadScenario = (scenario) => {
    onLoadScenario(scenario.inputs);
    setShowLoadModal(false);
    toast.success(`Loaded scenario: ${scenario.name}`);
  };

  const handleDeleteScenario = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteScenario(id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h3 className="text-lg font-montserrat font-semibold text-primary">
          Scenario Management
        </h3>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSaveModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-open-sans"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save Scenario</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLoadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-open-sans"
          >
            <SafeIcon icon={FiFolderOpen} className="w-4 h-4" />
            <span>Load Scenario</span>
          </motion.button>
        </div>
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-montserrat font-semibold text-primary">
                  Save Scenario
                </h4>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">
                    Scenario Name
                  </label>
                  <input
                    type="text"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                    placeholder="Enter scenario name"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveScenario}
                    className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold font-open-sans hover:bg-primary/90 transition-colors"
                  >
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSaveModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold font-open-sans hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load Modal */}
      <AnimatePresence>
        {showLoadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-montserrat font-semibold text-primary">
                  Load Scenario
                </h4>
                <button
                  onClick={() => setShowLoadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-gray-500 mt-2 font-open-sans">Loading scenarios...</p>
                  </div>
                ) : scenarios.length === 0 ? (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiFolderOpen} className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-open-sans">No saved scenarios found</p>
                  </div>
                ) : (
                  scenarios.map((scenario) => (
                    <motion.div
                      key={scenario.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h5 className="font-semibold text-gray-800 font-open-sans">
                          {scenario.name}
                        </h5>
                        <p className="text-sm text-gray-500 font-open-sans">
                          Created: {new Date(scenario.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLoadScenario(scenario)}
                          className="px-3 py-1 bg-secondary text-white rounded font-open-sans hover:bg-secondary/90 transition-colors"
                        >
                          Load
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteScenario(scenario.id, scenario.name)}
                          className="px-3 py-1 bg-red-500 text-white rounded font-open-sans hover:bg-red-600 transition-colors"
                        >
                          <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScenarioManager;