"use server"
import { z } from "zod"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { formSchema } from "../types"
import { cookies } from "next/headers"

export async function loginUser({
  email,
  password,
}: z.infer<typeof formSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return response
}

export async function signUpUser({
  email,
  password,
}: z.infer<typeof formSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)

  if (data?.length) return { error: { message: "User already exists", data } }
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  })
  return response
}
