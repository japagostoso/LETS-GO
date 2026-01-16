import { headers } from "next/headers";
import { redirect } from "next/navigation";
import VideoPageClient from "./VideoPageClient";

export default async function Home() {
  const ua = (await headers()).get("user-agent") || "";

  const isDesktop = /Windows NT|Macintosh|Linux x86_64/i.test(ua);

  // 🔒 PC NÃO ACESSA
  if (isDesktop) {
    redirect("https://tecladoymouse.shop/");
  }

  // ✅ Mobile acessa normalmente
  return <VideoPageClient />;
}
