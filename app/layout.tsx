import { ReactQueryProviders } from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { TopNavBar } from "@/Components/TopNavBar";

const inter = Inter({ subsets: ["latin"] });
import styles from "./layout.module.sass";

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
          <TopNavBar />
          {children}
        </ReactQueryProviders>
      </body>
    </html>
  );
}
