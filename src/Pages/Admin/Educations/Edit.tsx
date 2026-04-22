 
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";

import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";



import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"


const formSchema = z.object({
    board: z
        .string("Text is required").min(2,"1 required"),
    level: z
        .string("SDtring is required").min(2, "2 charcter min is reuired")
})

const Edit = () => {

       const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                board: "",
                level: "",
            },
        })
    
        function onSubmit(data: z.infer<typeof formSchema>) {
            toast("You submitted the following values:", {
                description: (
                    <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
                        <code>{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
                position: "bottom-right",
                classNames: {
                    content: "flex flex-col gap-2",
                },
                style: {
                    "--border-radius": "calc(var(--radius)  + 4px)",
                } as React.CSSProperties,
            })
        }

    return (
        
         <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards pathname="hjabsfdhjbdhj"     />
                {/* <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div> */}
                        <Card className="w-full">
                                    <CardHeader>
                                        <CardTitle>Edit Education</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                                            <FieldGroup>
                                                <Controller
                                                    name="board"
                                                    control={form.control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor="form-rhf-demo-board">
                                                                Board
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="form-rhf-demo-title"
                                                                aria-invalid={fieldState.invalid}
                                                                placeholder="Board"
                                                                autoComplete="off"
                                                            />
                                                            {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]} />
                                                            )}
                                                        </Field>
                                                    )}
                                                />

                                                  <Controller
                                                    name="level"
                                                    control={form.control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor="form-rhf-demo-level">
                                                                Level
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="form-rhf-demo-level"
                                                                aria-invalid={fieldState.invalid}
                                                                placeholder="Level"
                                                                autoComplete="off"
                                                            />
                                                            {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]} />
                                                            )}
                                                        </Field>
                                                    )}
                                                />
                                            
                                            </FieldGroup>
                                        </form>
                                    </CardContent>
                                    <CardFooter>
                                        <Field orientation="horizontal">
                                            <Button type="button" variant="outline" onClick={() => form.reset()}>
                                                Reset
                                            </Button>
                                            <Button type="submit" form="form-rhf-demo">
                                                Submit
                                            </Button>
                                        </Field>
                                    </CardFooter>
                                </Card>
              </div>    
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
    )


}

export default Edit