import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FilterProvider } from "@/context/FilterContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "SplendShop - Modern E-commerce",
  description: "Your one-stop shop for modern, elegant products",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-foreground bg-background`}>
        <AuthProvider>
          <CartProvider>
            <FilterProvider>
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </FilterProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
