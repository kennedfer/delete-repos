"use client";

import { redirect } from "next/navigation";
import styles from "./page.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
    };
  }
}

export default function Home() {
  const { data: session } = useSession();

  const accessRepositoriesPage = () => {
    redirect("/repositories");
  };

  const signToGithub = () => signIn("github", { callbackUrl: "/repositories" });

  const signOutFromGithub = () => signOut({ callbackUrl: "/" });

  return (
    <div className={styles.page}>
      <div>{session?.user.name ?? "Usuario deslogado"}</div>
      <button onClick={accessRepositoriesPage}>
        Ir para página de repositorios
      </button>
      <button onClick={signToGithub}>Logar</button>
      <button onClick={signOutFromGithub}>Sair</button>
    </div>
  );
}
