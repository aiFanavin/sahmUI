import MainSidebar from "@/components/main layout components/mainSidebar";
import React from "react";

import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/utils/authOptions";

import Login from "@/components/Login";

export default async function Home() {

    const session: Session | null = await getServerSession(authOptions)
    console.log("asdasdasd")
    if (session) {
        return <div>

            <MainSidebar Name={session.user?.name} email={session.user?.email}/>
        </div>
    }else {
        return( <Login />)

    }


}
