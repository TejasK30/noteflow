import { createClient } from "@supabase/supabase-js"
import { z } from "zod"
import { formSchema } from "../types"

export async function loginUser({
  email,
  password,
}: z.infer<typeof formSchema>) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return response
}

export async function signupUser({
  email,
  password,
}: z.infer<typeof formSchema>) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)

  if (data?.length) return { error: { message: "User already exists" } }
  const response = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL },
  })
  return response
}
