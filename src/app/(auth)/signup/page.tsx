"use client"
import { signupUser } from "@/lib/server-actions/auth-action"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import Image from "next/image"
import Logo from "../../../../public/cypresslogo.svg"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { MailCheck } from "lucide-react"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const signUpFormSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, { message: "Password must be of minimum 6 characters!" }),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, { message: "Password must be of minimum 6 characters!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const Signup = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [submitError, setSubmitError] = useState<string>("")
  const [confirmation, setConfirmation] = useState<boolean>(false)
  const exchangeError = useMemo(() => {
    if (!searchParams) return ""
    searchParams.get("error_description")
    // error_description is to get specific error message
  }, [searchParams])

  const errorStyles = useMemo(() => {
    clsx("bg-primary", {
      "bg-red-500/10": exchangeError,
      "border-red-500/10": exchangeError,
      "text-red-500": exchangeError,
    })
  }, [exchangeError])

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(signUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit: SubmitHandler<z.infer<typeof signUpFormSchema>> = async (
    formData
  ) => {
    const { error } = await signupUser(formData)
    if (error) {
      form.reset()
      setSubmitError(error.message)
      router.replace("/dashboard")
    }
    setConfirmation(true)
  }

  return (
    <>
      <Form {...form}>
        <form
          onChange={() => {
            if (submitError) setSubmitError("")
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full sm:justify-center sm:w-[400px] space-y-6"
        >
          <Link href="/" className="flex w-full justify-left items-center">
            <Image src={Logo} alt="brand logo" width={50} height={50} />
            <span className="font-semibold text-4xl ml-2 first-letter:ml-2 dark:text-white">
              Noteflow
            </span>
          </Link>
          <FormDescription className="text-foreground/60">
            All in one collaboration and productivity platform
          </FormDescription>
          <FormField
            disabled={isLoading}
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <Button
            type="submit"
            className="w-full p-6"
            size="lg"
            disabled={isLoading}
          >
            {!isLoading ? "Create Account" : "Loading"}
          </Button>
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <span className="self-container">
            Have an account ?
            <Link href="/login" className="text-primary">
              {" "}
              Log In
            </Link>
          </span>
          {(confirmation || exchangeError) && (
            <>
              <Alert className={`${errorStyles}`}>
                {!exchangeError && <MailCheck className="h-4 w-4" />}
                <AlertTitle>
                  {exchangeError ? "Invalid Link" : "Check your email."}
                </AlertTitle>
                <AlertDescription>
                  {exchangeError || "An email confirmation has been sent."}
                </AlertDescription>
              </Alert>
            </>
          )}
        </form>
      </Form>
    </>
  )
}

export default Signup
