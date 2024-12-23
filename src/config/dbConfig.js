import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config()

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
        auth: {
            persistSession: false
        },
        db: {
            schema: 'public'
        },
    }
);

export default supabase;