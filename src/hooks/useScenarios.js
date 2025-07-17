import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useScenarios = () => {
  const { user } = useAuth();
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);

  const fetchScenarios = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scenarios_qwerty12345')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setScenarios(data || []);
    } catch (error) {
      console.error('Error fetching scenarios:', error);
      toast.error('Error fetching scenarios');
    } finally {
      setLoading(false);
    }
  };

  const saveScenario = async (scenarioData) => {
    if (!user) {
      toast.error('You must be logged in to save scenarios');
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('scenarios_qwerty12345')
        .insert([{
          user_id: user.id,
          name: scenarioData.name,
          description: scenarioData.description || null,
          inputs: scenarioData.inputs,
          outputs: scenarioData.outputs
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      setScenarios(prev => [data, ...prev]);
      toast.success('Scenario saved successfully');
      return data;
    } catch (error) {
      console.error('Error saving scenario:', error);
      toast.error(`Error saving scenario: ${error.message}`);
      throw error;
    }
  };

  const updateScenario = async (id, scenarioData) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('scenarios_qwerty12345')
        .update({
          name: scenarioData.name,
          description: scenarioData.description || null,
          inputs: scenarioData.inputs,
          outputs: scenarioData.outputs
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      
      setScenarios(prev => prev.map(s => s.id === id ? data : s));
      toast.success('Scenario updated successfully');
      return data;
    } catch (error) {
      console.error('Error updating scenario:', error);
      toast.error('Error updating scenario');
      throw error;
    }
  };

  const deleteScenario = async (id) => {
    try {
      const { error } = await supabase
        .from('scenarios_qwerty12345')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setScenarios(prev => prev.filter(s => s.id !== id));
      toast.success('Scenario deleted');
      
      // Clear comparison if one of the compared scenarios was deleted
      if (comparisonData && (comparisonData.scenario1.id === id || comparisonData.scenario2?.id === id)) {
        setComparing(false);
        setComparisonData(null);
      }
    } catch (error) {
      console.error('Error deleting scenario:', error);
      toast.error('Error deleting scenario');
    }
  };

  const compareScenarios = (scenario1, scenario2 = null) => {
    if (scenario2) {
      setComparisonData({ scenario1, scenario2 });
      setComparing(true);
    } else {
      // If only one scenario provided, just load it without comparison mode
      setComparing(false);
      setComparisonData(null);
    }
  };

  const clearComparison = () => {
    setComparing(false);
    setComparisonData(null);
  };

  useEffect(() => {
    if (user) {
      fetchScenarios();
    } else {
      setScenarios([]);
    }
  }, [user]);

  return {
    scenarios,
    loading,
    saveScenario,
    updateScenario,
    deleteScenario,
    fetchScenarios,
    comparing,
    comparisonData,
    compareScenarios,
    clearComparison
  };
};