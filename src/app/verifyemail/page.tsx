"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {

        const [token, setToken] = useState("");
        const [verified, setVerified] = useState(false);
        const [error, setError] = useState(false);

        const router = useRouter();

        const verifyUserEmail = async () => {
            try {
                await axios.post("/api/users/verifyemail", {token})
                setVerified(true);
            } catch (error: any) {
                setError(true);
                console.log(error.response.data);
            }
        }

        useEffect(() => {
            const urlToken = window.location.search.split("=")[1];
            setToken(urlToken || "");
        }, []);


        useEffect(() => {
            if(token.length > 0){
                verifyUserEmail();
            }
        }, [token]);
        
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Verify Email</h1>
                <h2 className="text-2xl font-bold">
                    {verified ? "Email verified successfully" : "Something went wrong"}
                </h2>
                <h2 className="text-2xl font-bold">
                    {error ? "Something went wrong" : "Please check your email for verification"}
                </h2>
                {/* error */}
                {error && <h2 className="text-red-500">Something went wrong</h2>}
                {verified && <h2 className="text-green-500">Email verified successfully</h2>}
                <h2 className="text-2xl font-bold">
                    {token? `Token: ${token}` : "No Token Available"}
                </h2>
                <Link href="/login">Login</Link>
            </div>
        )
        
}
