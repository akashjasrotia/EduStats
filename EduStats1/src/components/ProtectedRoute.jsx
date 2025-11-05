import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function ProtectedRoute({children}) {
    const [auth, setAuth] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();
    const fetchAuthStatus = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/home", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        });
        const data = await res.json();
        setResponseData(data);
        if (res.ok) {
            setAuth(true);
        }
    } catch (error) {
        console.error("Error fetching auth status:", error);
    }
    useEffect(()=>{
        fetchAuthStatus();
    }, []);
    useEffect(()=>{
        if(!auth) {
            toast.error("Please login first");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
    }, [auth]);
  };
  useEffect(()=>{
    toast.success(responseData?.message);
  },[responseData]);
  return (
    children
  )
}
