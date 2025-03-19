"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RepositoriesPage() {
  const { data: session, status } = useSession();

  if (status == "unauthenticated") {
    //Redireciona caso o usuário nao esteja logado
    redirect("/");
  }

  return <div>{session?.user.name}</div>;
}
