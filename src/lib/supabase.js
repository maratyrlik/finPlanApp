import { createClient } from '@supabase/supabase-js'

// Pro server-side (API routes) - má více oprávnění
export const supabaseAdmin = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY
)
