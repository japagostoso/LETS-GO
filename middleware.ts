import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";

  // Ajuda a não bloquear iPadOS (às vezes vem como "Macintosh" + "Mobile")
  const chUaMobile = request.headers.get("sec-ch-ua-mobile") === "?1";

  const isAndroid = /Android/i.test(ua);
  const isAppleMobile = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && /Mobile/i.test(ua));
  const isMobileOrTablet =
    chUaMobile || /IEMobile|Windows Phone|Opera Mini|Mobile|Tablet/i.test(ua);

  if (isAppleMobile) {
    return NextResponse.redirect("https://tecladoymouse.shop/");
  }

  if (!isAndroid && !isMobileOrTablet) {
    return NextResponse.redirect("https://tecladoymouse.shop/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|mp4|webm|woff2?|ttf|otf)$).*)",
  ],
};
