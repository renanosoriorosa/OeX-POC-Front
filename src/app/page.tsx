"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Dashboard");
  }, []);

  return null; // Retorna nada porque vai redirecionar automaticamente
}

export default Home;
