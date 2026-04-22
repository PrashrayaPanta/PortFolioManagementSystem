
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";

import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import ContactData from "../../ContactData.json"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"

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

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const formSchema = z.object({
    title: z
        .string()
        .min(5, "Bug title must be at least 5 characters.")
        .max(32, "Bug title must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
})


const Create = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
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
                                <SectionCards pathname="hjabsfdhjbdhj" />
                                {/* <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div> */}

                                <Card className="w-full">
                                    <CardHeader>
                                        <CardTitle>Bug Report</CardTitle>
                                        <CardDescription>
                                            Help us improve by reporting bugs you encounter.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                                            <FieldGroup>
                                                <Controller
                                                    name="title"
                                                    control={form.control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor="form-rhf-demo-title">
                                                                Bug Title
                                                            </FieldLabel>
                                                            <Input
                                                                {...field}
                                                                id="form-rhf-demo-title"
                                                                aria-invalid={fieldState.invalid}
                                                                placeholder="Login button not working on mobile"
                                                                autoComplete="off"
                                                            />
                                                            {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]} />
                                                            )}
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name="description"
                                                    control={form.control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor="form-rhf-demo-description">
                                                                Description
                                                            </FieldLabel>
                                                            <InputGroup>
                                                                <InputGroupTextarea
                                                                    {...field}
                                                                    id="form-rhf-demo-description"
                                                                    placeholder="I'm having an issue with the login button on mobile."
                                                                    rows={6}
                                                                    className="min-h-24 resize-none"
                                                                    aria-invalid={fieldState.invalid}
                                                                />
                                                                <InputGroupAddon align="block-end">
                                                                    <InputGroupText className="tabular-nums">
                                                                        {field.value.length}/100 characters
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                            </InputGroup>
                                                            <FieldDescription>
                                                                Include steps to reproduce, expected behavior, and what
                                                                actually happened.
                                                            </FieldDescription>
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


export default Create