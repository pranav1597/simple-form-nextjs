"use client"

import React, { useState, useEffect, useCallback} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [newPassword, setNewPassword] = useState({
        password: "",})
    const [confirmPassword, setConfirmPassword] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [token, setToken] = useState("")

    const onForgotPassword = useCallback(async () => {
        try {
            const response = await axios.post('/api/users/verifyForgotPassword', { token, newPassword: newPassword.password})
            console.log(response.data)
            toast.success("Password changed successfully")
            router.push('/login')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "Something went wrong"
                );
                console.log(error.response?.data);
                } else {
                toast.error("An unexpected error occurred");
                console.log(error);
            }
        }
    }, [token, newPassword.password, router])

    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      console.log("urlToken:  ", urlToken);
      setToken(urlToken || "");
    }, []);

    useEffect(() => {
      if (token.length > 0) {
        onForgotPassword();
      }
    }, [token, onForgotPassword]);

    useEffect(() => {
        if(newPassword.password === confirmPassword && newPassword.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    },[newPassword, confirmPassword])

    return (
        <div className="flex flex-col min-h-screen items-center justify-center py-2">
            <h1 className="text-4xl ">Forgot Password</h1>
            <hr />
            <label htmlFor="password">New Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={newPassword.password}
                onChange={(e) => setNewPassword({...newPassword, password: e.target.value})}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"    
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-red-500"
                onClick={onForgotPassword}
                disabled={buttonDisabled}
            >
                Reset Password
            </button>
            <Link href="/login">Login</Link>
        </div>
    )
}
