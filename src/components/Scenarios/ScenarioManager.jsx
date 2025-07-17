import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScenarios } from '../../hooks/useScenarios';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { 
  FiSave, 
  FiFolderOpen, 
  FiTrash2, 
  FiPlus, 
  FiX, 
  FiFile, 
  FiClock, 
  FiCheck, 
  FiAlertCircle, 
  FiEdit2, 
  FiRefreshCw, 
  FiCopy, 
  FiGitCompare 
} = FiIcons;

const ScenarioManager = ({ inputs, outputs, onLoadScenario, onCompareScenarios }) => {
  const { user } = useAuth();
  const { 
    scenarios, 
    saveScenario, 
    updateScenario, 
    deleteScenario, 
    loading,
    fetchScenarios
  } = useScenarios();
  
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  const [description, setDescription] = useState('');
  const [editingScenario, setEditingScenario] = useState(null);
  const [selectedForComparison, setSelectedForComparison] = useState([]);

  // Reset form when closing modal
  useEffect(() => {
    if (!showSaveModal) {
      setScenarioName('');
      setDescription('');
      setEditingScenario(null);
    }
  }, [showSaveModal]);

  // Reset selection when closing compare modal
  useEffect(() => {
    if (!showCompareModal) {
      setSelectedForComparison([]);
    }
  }, [showCompareModal]);

  // Fetch scenarios when component mounts
  useEffect(() => {
    if (user) {
      fetchScenarios();
    }
  }, [user, fetchScenarios]);

  const handleSaveScenario = async () => {
    if (!scenarioName.trim()) {
      toast.error('Please enter a scenario name');
      return;
    }
    
    try {
      if (editingScenario) {
        await updateScenario(editingScenario.id, {
          name: scenarioName,
          description: description,
          input_data: inputs,
          output_data: outputs
        });
        setEditingScenario(null);
        toast.success('Scenario updated successfully');
      } else {
        await saveScenario({
          name: scenarioName,
          description: description,
          input_data: inputs,
          output_data: outputs
        });
        toast.success('Scenario saved successfully');
      }
      
      setScenarioName('');
      setDescription('');
      setShowSaveModal(false);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleEditScenario = (scenario) => {
    setEditingScenario(scenario);
    setScenarioName(scenario.name);
    setDescription(scenario.description || '');
    setShowSaveModal(true);
  };

  const handleLoadScenario = (scenario) => {
    onLoadScenario(scenario.input_data, scenario.output_data);
    setShowLoadModal(false);
    toast.success(`Loaded scenario: ${scenario.name}`);
  };

  const handleDeleteScenario = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteScenario(id);
      // Remove from selection if it was selected for comparison
      setSelectedForComparison(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleDuplicateScenario = async (scenario) => {
    try {
      const duplicatedScenario = {
        name: `${scenario.name} (Copy)`,
        description: scenario.description,
        input_data: scenario.input_data,
        output_data: scenario.output_data
      };
      
      await saveScenario(duplicatedScenario);
      toast.success(`Duplicated scenario: ${scenario.name}`);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const toggleScenarioSelection = (scenario) => {
    setSelectedForComparison(prev => {
      const isSelected = prev.some(s => s.id === scenario.id);
      
      if (isSelected) {
        return prev.filter(s => s.id !== scenario.id);
      } else if (prev.length < 2) {
        return [...prev, scenario];
      }
      
      return prev;
    });
  };

  const handleCompareScenarios = () => {
    if (selectedForComparison.length === 2) {
      onCompareScenarios(selectedForComparison);
      setShowCompareModal(false);
    } else {
      toast.error('Please select exactly 2 scenarios to compare');
    }
  };

  const handleRefresh = () => {
    fetchScenarios();
    toast.success('Scenarios refreshed');
  };

  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="text-center py-6">
          <SafeIcon icon={FiAlertCircle} className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">Please Sign In</h3>
          <p className="text-gray-600">You need to be logged in to save and manage scenarios.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiFile} className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-montserrat font-semibold text-primary">
            Scenario Management
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefresh}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Refresh scenarios"
          >
            <SafeIcon icon={FiRefreshCw} className="w-4 h-4 text-gray-500" />
          </motion.button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSaveModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-open-sans"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLoadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-open-sans"
          >
            <SafeIcon icon={FiFolderOpen} className="w-4 h-4" />
            <span>Load</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCompareModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors font-open-sans"
          >
            <SafeIcon icon={FiGitCompare} className="w-4 h-4" />
            <span>Compare</span>
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-montserrat font-semibold text-primary flex items-center">
                  <SafeIcon icon={editingScenario ? FiEdit2 : FiSave} className="w-5 h-5 mr-2 text-secondary" />
                  {editingScenario ? 'Edit Scenario' : 'Save Scenario'}
                </h4>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">
                    Scenario Name *
                  </label>
                  <input
                    type="text"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                    placeholder="Enter scenario name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-open-sans">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent font-open-sans"
                    placeholder="Add a brief description"
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveScenario}
                    className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold font-open-sans hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={editingScenario ? FiEdit2 : FiSave} className="w-4 h-4" />
                    <span>{editingScenario ? 'Update' : 'Save'}</span>
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-montserrat font-semibold text-primary flex items-center">
                  <SafeIcon icon={FiFolderOpen} className="w-5 h-5 mr-2 text-primary" />
                  Load Scenario
                </h4>
                <button
                  onClick={() => setShowLoadModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
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
                    <button
                      onClick={() => {
                        setShowLoadModal(false);
                        setShowSaveModal(true);
                      }}
                      className="mt-4 text-secondary hover:text-primary font-medium flex items-center space-x-2 mx-auto"
                    >
                      <SafeIcon icon={FiPlus} className="w-4 h-4" />
                      <span>Create your first scenario</span>
                    </button>
                  </div>
                ) : (
                  scenarios.map((scenario) => (
                    <motion.div
                      key={scenario.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors overflow-hidden shadow-sm"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold text-gray-800 font-open-sans text-lg">
                              {scenario.name}
                            </h5>
                            <div className="flex items-center text-sm text-gray-500 font-open-sans mt-1">
                              <SafeIcon icon={FiClock} className="w-3.5 h-3.5 mr-1" />
                              Created: {new Date(scenario.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleLoadScenario(scenario)}
                              className="px-3 py-1.5 bg-secondary text-white rounded-lg font-open-sans hover:bg-secondary/90 transition-colors flex items-center space-x-1"
                            >
                              <SafeIcon icon={FiFolderOpen} className="w-4 h-4" />
                              <span>Load</span>
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEditScenario(scenario)}
                              className="p-1.5 bg-gray-100 text-gray-600 rounded-lg font-open-sans hover:bg-gray-200 transition-colors"
                              aria-label="Edit scenario"
                            >
                              <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDuplicateScenario(scenario)}
                              className="p-1.5 bg-gray-100 text-gray-600 rounded-lg font-open-sans hover:bg-gray-200 transition-colors"
                              aria-label="Duplicate scenario"
                            >
                              <SafeIcon icon={FiCopy} className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeleteScenario(scenario.id, scenario.name)}
                              className="p-1.5 bg-red-100 text-red-600 rounded-lg font-open-sans hover:bg-red-200 transition-colors"
                              aria-label="Delete scenario"
                            >
                              <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        
                        {scenario.description && (
                          <p className="text-sm text-gray-600 font-open-sans mt-2 border-t pt-2">
                            {scenario.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-montserrat font-semibold text-primary flex items-center">
                  <SafeIcon icon={FiGitCompare} className="w-5 h-5 mr-2 text-primary" />
                  Compare Scenarios
                </h4>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 font-open-sans mb-4">
                  Select exactly 2 scenarios to compare ({selectedForComparison.length}/2 selected):
                </p>
                
                <div className="space-y-3">
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-gray-500 mt-2 font-open-sans">Loading scenarios...</p>
                    </div>
                  ) : scenarios.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500 font-open-sans">No saved scenarios to compare</p>
                    </div>
                  ) : (
                    scenarios.map((scenario) => {
                      const isSelected = selectedForComparison.some(s => s.id === scenario.id);
                      return (
                        <div
                          key={scenario.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-secondary/10 border-secondary'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => toggleScenarioSelection(scenario)}
                        >
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                              isSelected
                                ? 'bg-secondary'
                                : 'border border-gray-400'
                            }`}>
                              {isSelected && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <SafeIcon icon={FiCheck} className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-gray-800">{scenario.name}</h5>
                              {scenario.description && (
                                <p className="text-sm text-gray-500 mt-1">{scenario.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCompareScenarios}
                  disabled={selectedForComparison.length !== 2}
                  className={`flex-1 py-2 rounded-lg font-semibold font-open-sans flex items-center justify-center space-x-2 ${
                    selectedForComparison.length === 2
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <SafeIcon icon={FiGitCompare} className="w-4 h-4" />
                  <span>Compare Selected</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCompareModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold font-open-sans hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScenarioManager;