"use client";

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

  const fetchGithubData = async () => {
    if (!session?.user?.accessToken) return;

    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className={styles.page}>
      <div>{session?.user.name ?? "Usuario deslogado"}</div>
      <button onClick={fetchGithubData}>Mostrar informações</button>
      <button onClick={() => signIn("github")}>Logar</button>
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
}
