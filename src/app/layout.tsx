import type { Metadata } from "next";
import { Inter, Space_Mono, League_Gothic } from "next/font/google";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CartProvider } from "@/lib/commerce/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PRELOADER_SESSION_KEY } from "@/lib/motion/preloaderTokens";
import "./globals.css";

// Load prototype fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

const leagueGothic = League_Gothic({
  weight: "400",
  variable: "--font-league-gothic",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CHAKSU | Premium Streetwear",
  description: "Statement silhouettes. Proof in every detail.",
};

const preloaderBootstrapScript = `(function(){if(location.pathname!=="/")return;var m=new URLSearchParams(location.search).get("intro");var d=${process.env.NODE_ENV !== "production"};var f=d&&(m==="replay"||m==="hold");if(d&&m==="static")return;var r=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;var c=navigator.connection;var s=c&&(c.saveData===true||c.effectiveType==="slow-2g"||c.effectiveType==="2g");var v=false;try{v=sessionStorage.getItem(${JSON.stringify(PRELOADER_SESSION_KEY)})==="true"}catch(e){}if(!r&&!s&&(f||!v)){document.documentElement.dataset.chaksuIntro="eligible";setTimeout(function(){delete document.documentElement.dataset.chaksuIntro},1600)}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceMono.variable} ${leagueGothic.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: preloaderBootstrapScript }} />
        <CartProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" tabIndex={-1} style={{ minHeight: "calc(100vh - 64px - 200px)", paddingTop: "64px" }}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
