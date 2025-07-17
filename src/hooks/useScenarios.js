import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useScenarios = () => {
  const { user } = useAuth();
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all scenarios for the current user
  const fetchScenarios = useCallback(async () => {
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
  }, [user]);

  // Save a new scenario
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
          input_data: scenarioData.input_data,
          output_data: scenarioData.output_data || null
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      setScenarios(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error saving scenario:', error);
      toast.error(`Error saving scenario: ${error.message}`);
      throw error;
    }
  };

  // Update an existing scenario
  const updateScenario = async (id, scenarioData) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('scenarios_qwerty12345')
        .update({
          name: scenarioData.name,
          description: scenarioData.description || null,
          input_data: scenarioData.input_data,
          output_data: scenarioData.output_data || null
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      
      setScenarios(prev => prev.map(s => s.id === id ? data : s));
      return data;
    } catch (error) {
      console.error('Error updating scenario:', error);
      toast.error('Error updating scenario');
      throw error;
    }
  };

  // Delete a scenario
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
    } catch (error) {
      console.error('Error deleting scenario:', error);
      toast.error('Error deleting scenario');
    }
  };

  // Fetch scenarios when user changes
  useEffect(() => {
    if (user) {
      fetchScenarios();
    } else {
      setScenarios([]);
    }
  }, [user, fetchScenarios]);

  return {
    scenarios,
    loading,
    saveScenario,
    updateScenario,
    deleteScenario,
    fetchScenarios
  };
};