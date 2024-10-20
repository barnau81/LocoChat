import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import TopNavBar from "../Components/TopNavBar/TopNavBar";

const inter = Inter({ subsets: ["latin"] });
import styles from "./layout.module.sass";

export const metadata: Metadata = {
  title: "My Chat App",
  description: "A simple chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
