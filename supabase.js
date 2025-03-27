import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gpwdlqpybcifemxdnftc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwd2RscXB5YmNpZmVteGRuZnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MzgyNzEsImV4cCI6MjA1ODUxNDI3MX0.S6hjXOSPLcn6XY9sXkEVHZdLzl5jVaxTnOUQigAPASM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
