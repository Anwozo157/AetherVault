interface ImportMetaEnv {
  /** Supabase project URL. Unset on the public simulated demo. */
  readonly VITE_SUPABASE_URL?: string;
  /** Supabase public anon key (safe in browsers; RLS protects data). */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Short git commit of this build (vite.config.js). */
declare const __APP_VERSION__: string;
/** UTC build date, YYYY-MM-DD. */
declare const __BUILD_DATE__: string;
