"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const onLogout = async () => {
    const response = await axios.get("/api/users/logout");
    console.log(response.data);
    router.push("/login");
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    if (res.data.data) {
      setData(res.data.data._id);
    } else {
      console.error("User details not found:", res.data);
      setData("User details not available");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Profile</h1>
      <p>Profile page</p>
      <h2 className="text-2xl font-bold text-center bg-green-500 text-white p-2 rounded-xl">{data === "nothing" ? "Loading..." : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <button onClick={onLogout} className="bg-red-500 mt-4 text-white p-2 rounded-md">
        Logout
      </button>
      <button onClick={getUserDetails} className="bg-blue-500 mt-4 text-white p-2 rounded-md">
        Get User Details
      </button>
    </div>
  );
}


