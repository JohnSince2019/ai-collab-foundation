import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Collab Foundation",
  description: "Upstream AI collaboration foundation for diagnosis, configuration, and reusable AI operating rules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
