"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyEmail', {token})
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.message.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        console.log("urlToken:  ",urlToken)
        setToken(urlToken || '')
    },[])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
      <div className="flex flex-col min-h-screen items-center justify-center py-2 ">
        <h1 className="text-4xl ">Verify Email</h1>
        <h2 className="p-2 bg-violet-600 text-white break-words w-full max-w-xs sm:max-w-sm md:max-w-md overflow-hidden">
          {token ? `Token: ${token}` : "No token found"}
        </h2>

        {verified && (
          <div className="flex flex-col items-center mt-5">
            <h2 className="text-2xl">Email verified successfully</h2>
            <Link href="/login" className="p-2 bg-blue-500">Login</Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl bg-red-500">Error verifying email</h2>
          </div>
        )}
      </div>
    );
}