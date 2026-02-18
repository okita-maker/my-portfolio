import type { Metadata } from "next";
// ▼ Interではなく、Shippori_Mincho をインポート
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";

// ▼ フォントの設定を作成
const mincho = Shippori_Mincho({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mincho",
});

export const metadata: Metadata = {
  title: "OKITA Portfolio", // タイトルも少し変えました
  description: "Web Creator Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* ▼ bodyタグに変数と font-serif を設定 */}
      <body className={`${mincho.variable} font-serif antialiased`}>{children}</body>
    </html>
  );
}