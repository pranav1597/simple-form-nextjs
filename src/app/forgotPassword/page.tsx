"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function forgotPassword() {
    const [email, setEmail] = useState('')

    const onForgotPassword = async () => {
        try {
            const response = await axios.post('/api/users/forgotPassword', {email})
            console.log(response.data)
            toast.success("Email sent successfully")
        } catch (error: any) {
            toast.error(error.message)
            console.log(error.message.data)
        }
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center py-2 " >
            <h1 className="text-2xl">Enter email</h1>
            <hr />
            <input
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /> 
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onForgotPassword}>Reset Password</button>
                
        </div>
    )
}