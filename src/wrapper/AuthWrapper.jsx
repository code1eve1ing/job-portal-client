import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosConfig";
import authStore from "../store/userStore";

const AuthWrapper = () => {

    const token = localStorage.getItem("Authorization");
    const [loading, setLoading] = useState(true);
    const { setUserDetails, setIsAuthenticated } = authStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const fetchUserDetails = async () => {
                try {
                    const response = await axiosInstance.get("/user", {
                        headers: {
                            Authorization: token
                        }
                    });
                    const { user } = response.data;
                    setIsAuthenticated(true);
                    setUserDetails(user);
                } catch (err) {
                    navigate("/login");
                    setIsAuthenticated(false);
                    localStorage.removeItem("Authorization");
                } finally {
                    setLoading(false);
                }
            }
            fetchUserDetails();
        }
    }, [])

    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <>
            {loading ? <p>loading...</p> : <Outlet />}
        </>
    )
}

export default AuthWrapper