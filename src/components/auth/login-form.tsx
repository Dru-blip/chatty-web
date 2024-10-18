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
import { use, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8).optional(),
});

export function LoginForm() {
    const [message, setMessage] = useState<string>();
    const [useCode, setUseCode] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>();
    const router=useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
    });

    const onFormSubmit = async (values: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        let response;
        if (useCode) {
            response = await AuthActions.loginWithCode(values)!;
            if(response?.data.success){
                router.push('/login/code')
            }
        } else {
            response = await AuthActions.loginWithPassword(values);
        }
        
        if (!response?.status) {
            setMessage(response?.message);
        }
        setIsLoading(false);
    };

    return (
        <Card className="w-[400px]">
            <p className="text-red-700 font-bold text-center p-2">{message ?? " "}</p>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Form {...form}>
                    <form className="grid grid-cols-1 gap-3" onSubmit={form.handleSubmit(onFormSubmit)}>
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
                        {useCode ? (
                            <></>
                        ) : (
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
                        )}

                        {useCode ? (
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <></>}
                                Send Sign in code
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <></>}
                                Sign in
                            </Button>
                        )}
                    </form>
                </Form>
                <p className="text-center font-bold">OR</p>
                {useCode ? (
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={() => {
                                setUseCode(false);
                            }}
                        >
                            Use password
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={() => {
                                setUseCode(true);
                            }}
                        >
                            Use a sign-in-code
                        </Button>
                    </div>
                )}

                <Link href={"/register"}>dont have an account? sign up</Link>
            </CardContent>
        </Card>
    );
}
