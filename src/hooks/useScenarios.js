import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useScenarios = () => {
  const { user } = useAuth();
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchScenarios = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scenarios')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScenarios(data || []);
    } catch (error) {
      toast.error('Error fetching scenarios');
    } finally {
      setLoading(false);
    }
  };

  const saveScenario = async (scenarioData) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('scenarios')
        .insert([{
          user_id: user.id,
          name: scenarioData.name,
          inputs: scenarioData.inputs,
          outputs: scenarioData.outputs,
        }])
        .select()
        .single();

      if (error) throw error;
      
      setScenarios(prev => [data, ...prev]);
      toast.success('Scenario saved successfully');
      return data;
    } catch (error) {
      toast.error('Error saving scenario');
      throw error;
    }
  };

  const deleteScenario = async (id) => {
    try {
      const { error } = await supabase
        .from('scenarios')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setScenarios(prev => prev.filter(s => s.id !== id));
      toast.success('Scenario deleted');
    } catch (error) {
      toast.error('Error deleting scenario');
    }
  };

  useEffect(() => {
    fetchScenarios();
  }, [user]);

  return {
    scenarios,
    loading,
    saveScenario,
    deleteScenario,
    refetch: fetchScenarios,
  };
};