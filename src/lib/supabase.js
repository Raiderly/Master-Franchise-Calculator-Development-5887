import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wxfminhtlhrnjmktbrpo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Zm1pbmh0bGhybmpta3RicnBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MjY2OTksImV4cCI6MjA2ODMwMjY5OX0.MNmNwvJ9GN_pgIrNEMsHayIYDfvaLPTgrhl2GqlAO2A';

if (supabaseUrl === 'https://<PROJECT-ID>.supabase.co' || supabaseAnonKey === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export default supabase;