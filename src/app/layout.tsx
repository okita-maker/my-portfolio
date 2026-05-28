import type { Metadata } from "next";
// Interではなく、Shippori_Mincho をインポート
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";

// フォントの設定を作成
const mincho = Shippori_Mincho({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mincho",
});

// タイトルと説明文をエンジニアポートフォリオ用に変更
export const metadata: Metadata = {
  title: "SANGA Portfolio", 
  description: "Web Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* bodyタグに変数と font-serif を設定 */}
      <body className={`${mincho.variable} font-serif antialiased`}>{children}</body>
    </html>
  );
}