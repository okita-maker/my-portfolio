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
    <div className="min-h-screen font-serif text-slate-200 bg-[#080d1a] flex flex-col relative overflow-hidden">
      
      {/* 背景の淡いグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

      {/* 左上の戻るボタン */}
      <nav className="absolute top-8 left-8 z-50">
        <Link href="/" className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition font-medium flex items-center gap-2">
          <span>←</span> HOME
        </Link>
      </nav>

      {/* フォームエリア */}
      <main className="flex-grow flex items-center justify-center py-24 px-6 relative z-10">
        <div className="w-full max-w-2xl bg-white/5 border border-white/10 p-10 md:p-16 rounded-sm backdrop-blur-md shadow-2xl">
          <div className="text-center mb-12">
            <h1 className="text-2xl text-white tracking-[0.3em] mb-3 ml-[0.3em]">
              ・ CONTACT ・
            </h1>
            <p className="text-xs text-white/50 tracking-widest">お問い合わせ</p>
          </div>

          {status === "success" ? (
            <div className="text-center py-10 space-y-6">
              <p className="text-4xl">✨</p>
              <p className="text-white/90 tracking-widest text-lg">メッセージを送信しました。</p>
              <p className="text-white/50 text-sm leading-loose">
                お問い合わせありがとうございます。<br/>
                自動返信の確認メールをお送りいたしました。
              </p>
              <div className="pt-8">
                <Link href="/" className="inline-block border border-white/30 hover:bg-white/10 text-white px-10 py-3 text-sm tracking-widest transition duration-300 rounded-sm">
                  ホームに戻る
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs text-white/50 tracking-widest mb-3">NAME</label>
                <input required name="name" type="text" value={formData.name} onChange={handleChange} 
                       className="w-full bg-white/5 border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-white/60 transition" 
                       placeholder="お名前" />
              </div>
              <div>
                <label className="block text-xs text-white/50 tracking-widest mb-3">EMAIL</label>
                <input required name="email" type="email" value={formData.email} onChange={handleChange} 
                       className="w-full bg-white/5 border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-white/60 transition" 
                       placeholder="メールアドレス" />
              </div>
              <div>
                <label className="block text-xs text-white/50 tracking-widest mb-3">MESSAGE</label>
                <textarea required name="message" rows={5} value={formData.message} onChange={handleChange} 
                          className="w-full bg-white/5 border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-white/60 transition resize-none" 
                          placeholder="お問い合わせ内容をご記入ください"></textarea>
              </div>
              
              <button type="submit" disabled={status === "loading"} 
                      className={`w-full py-5 text-sm tracking-[0.3em] transition duration-300 border rounded-sm mt-8
                        ${status === "loading" ? "border-white/20 text-white/30 cursor-not-allowed" : "border-white/40 text-white/90 hover:bg-white/10 hover:border-white/70"}`}>
                {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-center text-xs tracking-widest mt-4">送信に失敗しました。時間をおいてお試しください。</p>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
}