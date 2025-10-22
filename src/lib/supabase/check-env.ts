// Supabase URL
let supabaseUrl: string;
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing Supabase URL");
} else {
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
}

// Supabase Service Role Key
let supabaseServiceRoleKey: string;
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase service role key");
} else {
  supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
}

// Supabase Anon Key
let supabaseAnonKey: string;
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase anon key");
} else {
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export { supabaseAnonKey, supabaseServiceRoleKey, supabaseUrl };
