"use client"
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

export default function ProfilePage() {
    const [data,setData] = useState('Null')

    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logged out successfully")
            router.push('/login')
        } catch (error: any) {
            console.log("Error logging out", error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        try {
            const response = await axios.get('/api/users/tokenData')
            console.log(response.data)
            const userId = await response.data.data._id
            setData(userId)
        } catch (error:any) {
            throw new Error("Error getting user details ", error.message) 
        }
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center ">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2>{data === 'Null' ? 'Get user details by clicking the button' : <Link className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded' href={`/profile/${data}`}>{data}</Link>}</h2>
            <button 
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>
            <button
            onClick={getUserDetails}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >Get User Details</button>
        </div>
    )
}