interface ImportMetaEnv {
  /** Supabase project URL. Unset on the public simulated demo. */
  readonly VITE_SUPABASE_URL?: string;
  /** Supabase public anon key (safe in browsers; RLS protects data). */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
