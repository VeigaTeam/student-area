// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tqkmwyiarnnrrlwdlbpl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxa213eWlhcm5ucnJsd2RsYnBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDA1NzAsImV4cCI6MjA2NTY3NjU3MH0.TqtjCRpVSz52THUXlX6-D5aArGZoqknYicn6I3Y2TqU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);