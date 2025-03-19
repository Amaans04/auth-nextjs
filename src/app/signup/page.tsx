"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");

  const [loading,setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success",response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response.data,"signup failed");
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-mono py-2">
      <h1>{loading ? "Loading..." : "SignUp"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="Username"
        className="p-2 border border-gray-300 rounded-md"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        className="p-2 border border-gray-300 rounded-md"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        className="p-2 border border-gray-300 rounded-md "
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={onSignup} className="p-2 mt-4 border border-gray-300 rounded-md">{buttonDisabled ? "Cant signUp" : "SignUp"}</button>    
      <Link href="/login" className="p-2 mt-4 border border-gray-300 rounded-md">Already have an account? Login here.</Link>
    </div>
  );
}
