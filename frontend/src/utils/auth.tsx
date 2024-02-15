import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPIs } from "../api/user";

export const getUser = async () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        const response = await userAPIs.getProfile();
        if (response.data.success === true) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data.user;
        }
    }
}


export const setUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
}


export const withUser = (ReactComponent: React.FC) => {
    return (props: any) => {
        const [user, setUser] = useState(null);
        const navigate = useNavigate();
        useEffect(() => {
            const fetchUser = async () => {
                const user = await getUser();
                if (!user) {
                    navigate('/login');
                }
                setUser(user);
            }
            fetchUser();
        }
        , [])
        return <ReactComponent {...props} user={user} />
    }
}
