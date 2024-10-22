"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { formSchema } from "@/lib/types"
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
import { LoginUser } from "@/lib/server-actions/auth-action"

const LoginPage = () => {
  const router = useRouter()
  const [submitError, setSubmitError] = useState<string>("")
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    formData
  ) => {
    const { error } = await LoginUser(formData)
    if (error) {
      form.reset()
      setSubmitError(error.message)
      router.replace("/dashboard")
    }
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
            render={(field) => (
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
            render={(field) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
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
            {!isLoading ? "Login" : "Loading"}
          </Button>
          <span className="self-container">
            Don&apos;t have an account ?
            <Link href="/signup" className="text-primary">
              {" "}
              Sign Up
            </Link>
          </span>
        </form>
      </Form>
    </>
  )
}

export default LoginPage
