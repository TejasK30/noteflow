import { createClient } from "@supabase/supabase-js"
import { z } from "zod"
import { formSchema } from "../types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

export async function LoginUser({
  email,
  password,
}: z.infer<typeof formSchema>) {
  const supabase = createClient(supabaseUrl, supabaseKey)
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return response
}
