'use client'
import { useSession, signIn, signOut  } from "next-auth/react"

export default function RepositoriesPage(){
    const {data: session, status} = useSession();

    if(status == "unauthenticated"){
        // signIn();
        // Redirecionar para a página de Login.
    }

    return <div></div>
}