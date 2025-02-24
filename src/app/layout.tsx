import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { StarknetProvider } from "@/providers/starknet-provider";
import { AuthProvider } from "@/providers/login-provider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Staknet Basecamp",
  description: "Staknet Basecamp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StarknetProvider>
          <AuthProvider>{children}</AuthProvider>
        </StarknetProvider>
      </body>
    </html>
  );
}
