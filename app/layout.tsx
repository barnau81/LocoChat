import { ReactQueryProviders } from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { TopNavBar } from "@/Components/TopNavBar";
import styles from "./layout.module.sass";
import ClientProviders from "./ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Chat App",
  description: "A chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>
        <ReactQueryProviders>
          <ClientProviders>
            <TopNavBar />
            {children}
          </ClientProviders>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
