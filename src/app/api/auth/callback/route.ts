import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(req: NextRequest) {
  const reqURL = new URL(req.url)
  const code = reqURL.searchParams.get("code")

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_KEY as string
    )
    await supabase.auth.exchangeCodeForSession(code)
  }
  return NextResponse.redirect(`${reqURL.origin}/dashboard`)
}
