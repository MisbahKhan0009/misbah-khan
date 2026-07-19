// Supabase removed — all data is now static/local
// This stub exists to prevent import errors during migration
export const supabase = {
  from: (_table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    upsert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
    eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
    order: () => ({ data: [], error: null }),
    limit: () => ({ data: [], error: null }),
    single: () => Promise.resolve({ data: null, error: null }),
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  functions: {
    invoke: () => Promise.resolve({ data: null, error: null }),
  },
};
