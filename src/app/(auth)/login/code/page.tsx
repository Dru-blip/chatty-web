import LoginCodeForm from "@/components/auth/login-otp-form";
import { cookies } from "next/headers";

export default function LoginCode() {
    const email=cookies().get("email")!
    return (
        //         Enter the code we just sent
        // We sent a sign-in code to druvabiduduri7@gmail.com. The code will expire in 15 minutes.
        // Did not receive a code?
        <div className="min-h-screen flex items-center justify-center">
           <LoginCodeForm email={email.value}/>
        </div>
    );
}
