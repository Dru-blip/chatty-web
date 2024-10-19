"use client";

import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Link from "next/link";
import { AuthActions } from "@/lib/actions";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
    name: z.string({ message: "username should be atleast 5 characters" }).min(5),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8),
});

export function RegisterForm() {
    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const router=useRouter()
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
    });

    const onFormSubmit = async (values: z.infer<typeof registerSchema>) => {
        setIsLoading(true);
        const response = await AuthActions.register(values);
        if (!response?.status) {
            setMessage(response?.message);
        }
        setIsLoading(false);
        router.push("/")
    };

    return (
        <Card className="w-[400px]">
            <p className="text-red-700 font-bold text-center p-2">{message ?? " "}</p>
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="grid grid-cols-1 gap-3" onSubmit={form.handleSubmit(onFormSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter Username" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter Email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter Password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <></>}
                            Register
                        </Button>
                        <Link href={"/login"}>already have an account? Login</Link>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
