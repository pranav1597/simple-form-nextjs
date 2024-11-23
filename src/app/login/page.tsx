"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success")
      router.push('/profile')
    } catch (error: any) {
      console.log("Login failed ", error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  };

  

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-5 bg-slate-800">
      <h1 className="text-2xl text-cyan-200 mb-2">Login</h1>
      <hr />
      {/* <label htmlFor="email" className="text-left">email</label> */}
      <input
        className="p-2 rounded-lg mb-5 text-slate-800"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      {/* <label htmlFor="password">password</label> */}
      <input
        className="p-2 rounded-lg mb-2 text-slate-800"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      {loading ? (
        <button
          disabled={buttonDisabled}
          type="button"
          className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 inline-flex items-center mt-2"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline mr-3 w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            ></path>
          </svg>
          Loading...
        </button>
      ) : (
        <button
          disabled={buttonDisabled}
          onClick={onLogin}
          className={`p-2 rounded-lg mb-2 ${
            buttonDisabled
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          Login
        </button>
      )}

      {/* signup link */}
      <Link href="/signup" className="p-2  rounded-lg mb-2 text-blue-600">
        To Signup, Click Here{" "}
      </Link>
      <Link href="/forgotPassword" className="p-2  rounded-lg mb-2 text-blue-600">
        Forgot Password?{" "}
      </Link>
    </div>
  );
}