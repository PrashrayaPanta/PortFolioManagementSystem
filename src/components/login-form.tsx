import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoaderCircle } from 'lucide-react';

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { LogIn } from 'lucide-react';

import { Toaster } from "@/components/ui/sonner"




import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Lock, Mail, MailIcon } from "lucide-react"
import { useState } from "react";
import { userLogin } from "@/api";


import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useLocation, useNavigate } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"


const formSchema = z.object({
  email: z
    .string()
    .email(),
 password: z.string()
  .min(6, "Password must be at least 6 characters")
  .max(100, "Password must be at most 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
})


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {


  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({


    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {


    console.log("The form is submitt");
    
    console.log("The value setSubmititng is", submitting);
    

    setSubmitting(true)

    



    console.log("Helo we have clicked the submit");




    const { email, password } = values

    try {

      console.log("I am inside the try block");
      
      
      await userLogin({ email, password })

      navigate("/dashboard")
      

    } catch (error: any) {
      
      console.log("I am inside the catch block");
      

      console.log("Errror is", error.response.data.error);

      toast(`Login failed: ${error.response.data.error}`, {

        position: "top-right",
        style: {
          backgroundColor: "#f56565", // Red background
          color: "#fff", // White text
          borderRadius: "16px",
          padding: "12px 16px",
        }
      })
      

    } finally {
      setSubmitting(false)
      form.reset() 
      console.log("The valkue os submmitng is ", submitting);
    }

    console.log("The value is ", submitting);
    
      // console.log(response.error);
      
      

      


    
    
    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
    //       <code>{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
    //   style: {
    //     "--border-radius": "calc(var(--radius)  + 4px)",
    //   } as React.CSSProperties,
    // })
  }

  // console.log(useLocation());
  


  return (
    <>
      
      <div className={cn("flex items-center justify-center min-h-screen w-full bg-amber-200 p-2", className)} {...props}>
      <Toaster/>

        <Card className="max-w-md  container mx-auto ">
          <CardHeader>
            <CardTitle className="text-4xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
{/* 
                  Email Field */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-email" className="text-2xl">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Email"
                        autoComplete="off"
                        icon={<MailIcon className="w-4 h-4"/>}
                   
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {/* Password Field */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-password" className="text-2xl">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Password"
                        autoComplete="off"
                        icon={<Lock className="w-4 h-4" />}
                        // type="password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]}  />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              {/* <Button type="button" variant="outline" onClick={() => form.reset()}>
                Reset
              </Button> */}
              <Button type="submit" form="form-rhf-demo" className="w-full h-10 text-md" disabled={submitting}>
                {submitting ? <LoaderCircle className="animate-spin mr-2" /> : <LogIn />}
      
                {
                  submitting ? "Logging in..." : "Login"
                }
                {/* Login */}              </Button>
            </Field>
          </CardFooter>
        </Card>
      </div>




    </>
 
  )
}
