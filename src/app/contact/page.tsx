"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen font-serif text-slate-800 bg-white flex flex-col relative overflow-hidden">
      
      {/* 背景の淡いグラデーション（白ベースの明るい色調に修正） */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none"></div>

      {/* 左上の戻るボタン（白背景で見えやすいダークトーンに変更） */}
      <nav className="absolute top-8 left-8 z-50">
        <Link href="/" className="text-sm tracking-[0.2em] text-slate-500 hover:text-slate-900 transition font-medium flex items-center gap-2">
          <span>←</span> HOME
        </Link>
      </nav>

      {/* フォームエリア */}
      <main className="flex-grow flex items-center justify-center py-24 px-6 relative z-10">
        {/* カード部分を白背景＋繊細なシャドウに変更して清潔感を演出 */}
        <div className="w-full max-w-2xl bg-white border border-slate-200 p-10 md:p-16 rounded-sm shadow-xl">
          <div className="text-center mb-12">
            <h1 className="text-2xl text-slate-800 tracking-[0.3em] mb-3 ml-[0.3em]">
              ・ CONTACT ・
            </h1>
            <p className="text-xs text-slate-400 tracking-widest">お問い合わせ</p>
          </div>

          {status === "success" ? (
            <div className="text-center py-10 space-y-6">
              <p className="text-4xl">✨</p>
              <p className="text-slate-800 tracking-widest text-lg">メッセージを送信しました。</p>
              <p className="text-slate-500 text-sm leading-loose">
                お問い合わせありがとうございます。<br/>
                自動返信の確認メールをお送りいたしました。
              </p>
              <div className="pt-8">
                <Link href="/" className="inline-block border border-slate-300 hover:bg-slate-50 text-slate-700 px-10 py-3 text-sm tracking-widest transition duration-300 rounded-sm">
                  ホームに戻る
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 入力欄の背景・枠線・文字色・プレースホルダーの色調を調整して視認性を大幅UP */}
              <div>
                <label className="block text-xs text-slate-400 tracking-widest mb-3">NAME</label>
                <input required name="name" type="text" value={formData.name} onChange={handleChange} 
                       className="w-full bg-slate-50 border border-slate-200 rounded-sm p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition" 
                       placeholder="お名前" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 tracking-widest mb-3">EMAIL</label>
                <input required name="email" type="email" value={formData.email} onChange={handleChange} 
                       className="w-full bg-slate-50 border border-slate-200 rounded-sm p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition" 
                       placeholder="メールアドレス" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 tracking-widest mb-3">MESSAGE</label>
                <textarea required name="message" rows={5} value={formData.message} onChange={handleChange} 
                          className="w-full bg-slate-50 border border-slate-200 rounded-sm p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white transition resize-none" 
                          placeholder="お問い合わせ内容をご記入ください"></textarea>
              </div>
              
              {/* ボタンも白ベースのモダンなデザインに反転 */}
              <button type="submit" disabled={status === "loading"} 
                      className={`w-full py-5 text-sm tracking-[0.3em] transition duration-300 border rounded-sm mt-8
                        ${status === "loading" ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"}`}>
                {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
              </button>

              {status === "error" && (
                <p className="text-red-500 text-center text-xs tracking-widest mt-4">送信に失敗しました。時間をおいてお試しください。</p>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
}