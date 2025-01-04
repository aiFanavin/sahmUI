"use client";
import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
    const { data } = useSession();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (data?.error === "RefreshAccessTokenError") {
            signIn("keycloak");
        }
    }, [data]);

    return <>{children}</>;
}