"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showRules, setShowRules] = useState(false);


  // Email validation regex
  const isValidEmail = (email : string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Password validation (e.g., at least 6 characters)
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  useEffect(() => {
    const isValidForm =
      user.username.length > 0 &&
      isValidEmail(user.email) &&
      isValidPassword(user.password);

    setButtonDisabled(!isValidForm);
  }, [user]);

  const onSignup = async () => {
    try {
        const response = await axios.post('/api/users/signup', user)
        console.log("Signup success", response.data)
        router.push('/login')
    } catch (error: any) {
        toast.error(error.message)
    }
  };

  
  return (
    

    <div className="flex flex-col min-h-screen items-center justify-center p-3 bg-slate-500">
      <h1 className="text-2xl text-cyan-200 ">Signup</h1>

      <span
        onClick={() => setShowRules(!showRules)}
        className="cursor-pointer text-blue-500 mt-2 mb-2 text-xl"
      >
        ℹ️ Info
      </span>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 border border-gray-300 rounded shadow-md text-sm text-gray-600 max-w-xs">
            <h3 className="font-semibold">Validation Rules</h3>
            <ul className="list-disc ml-4 mt-2">
              <li>Username must be at least 3 characters long.</li>
              <li>Username can contain letters, numbers, and underscores.</li>
              <li>
                Email should be in a valid format (e.g., user@example.com).
              </li>
              <li>Password must be at least 6 characters long.</li>
              <li>Password should contain a mix of letters and numbers.</li>
            </ul>
            <button
              className="mt-2 p-2 bg-red-500 text-white rounded"
              onClick={() => setShowRules(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <hr />
      <label htmlFor="username"></label>

      <input
        className="p-2 rounded-lg mb-2 text-slate-800"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 rounded-lg mb-2 text-slate-800"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 rounded-lg mb-2 text-slate-800"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        style={buttonDisabled ? { opacity: 0.5 } : {}}
        disabled={buttonDisabled}
        onClick={onSignup}
        className="p-2 bg-green-600 rounded-lg mb-2"
      >
        Signup
      </button>
      <Link href="/login" className="p-2  rounded-lg mb-2">
        To Login, Click Here{" "}
      </Link>
    </div>
    )


}