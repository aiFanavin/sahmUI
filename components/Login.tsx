// src/components/Login.tsx
"use client"
import {signIn} from "next-auth/react";
import React from "react";


const Login: React.FC = () => {


    React.useEffect(() => {
        signIn("keycloak")
    }, [])

    return (
        <>

        </>
    )
}

export default Login;