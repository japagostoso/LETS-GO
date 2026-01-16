import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";

  // Ajuda a não bloquear iPadOS (às vezes vem como "Macintosh" + "Mobile")
  const chUaMobile = request.headers.get("sec-ch-ua-mobile") === "?1";

  const isMobileOrTablet =
    chUaMobile ||
    /Android|iPhone|iPad|iPod|IEMobile|Windows Phone|Opera Mini|Mobile|Tablet/i.test(ua) ||
    (/Macintosh/i.test(ua) && /Mobile/i.test(ua));

  if (!isMobileOrTablet) {
    return NextResponse.redirect("https://tecladoymouse.shop/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|mp4|webm|woff2?|ttf|otf)$).*)",
  ],
};
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";

  // Ajuda a não bloquear iPadOS (às vezes vem como "Macintosh" + "Mobile")
  const chUaMobile = request.headers.get("sec-ch-ua-mobile") === "?1";

  const isMobileOrTablet =
    chUaMobile ||
    /Android|iPhone|iPad|iPod|IEMobile|Windows Phone|Opera Mini|Mobile|Tablet/i.test(ua) ||
    (/Macintosh/i.test(ua) && /Mobile/i.test(ua));

  if (!isMobileOrTablet) {
    return NextResponse.redirect("https://tecladoymouse.shop/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml|mp4|webm|woff2?|ttf|otf)$).*)",
  ],
};