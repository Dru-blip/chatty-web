"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AuthActions } from "@/lib/actions";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
    email: string;
}

export default function LoginCodeForm({ email }: Props) {
    const [code, setCode] = useState<string>();
    const router = useRouter();
    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        //         Enter the code we just sent
        // We sent a sign-in code to druvabiduduri7@gmail.com. The code will expire in 15 minutes.
        // Did not receive a code?

        <Card>
            <p>{message}</p>
            <CardHeader>
                <CardTitle>Enter the code we just sent</CardTitle>
                <CardDescription>code wast sent to {email} The code will expire in 10 minutes.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
                <InputOTP maxLength={6} value={code} onChange={(value) => setCode(value)} className="w-full">
                    <InputOTPGroup className="w-full">
                        <InputOTPSlot index={0} className="w-full" />
                        <InputOTPSlot index={1} className="w-full"/>
                        <InputOTPSlot index={2} className="w-full"/>
                        <InputOTPSlot index={3} className="w-full"/>
                        <InputOTPSlot index={4} className="w-full"/>
                        <InputOTPSlot index={5} className="w-full"/>
                    </InputOTPGroup>
                </InputOTP>
                <Button
                    onClick={async () => {
                        setIsLoading(true);
                        const res = await AuthActions.verifyLoginCode({ email, otp: code! });
                        setMessage(res?.data.verification?.message);
                        if (res?.data.verification?.verified) {
                            router.push("/");
                        }
                        setIsLoading(false);
                    }}
                >
                    {isLoading ? <Loader2Icon className="mr-2 w-4 h-4 animate-spin" /> : <></>}
                    Sign in
                </Button>

                <div>
                    <Link href={"/login"} className="w-full">
                        <Button className="w-full" variant={"outline"}>
                            Use password instead
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
