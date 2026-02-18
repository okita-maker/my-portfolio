import Image from "next/image";
import Link from "next/link"; // 👈 別ページへ飛ぶための機能を追加
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="min-h-screen font-serif text-slate-200 bg-[#080d1a]">
      
      {/* ナビゲーション（CONTACTリンクを追加） */}
      <nav className="absolute top-8 left-8 z-50">
        <ul className="flex gap-6 text-sm tracking-[0.2em] text-white/60 font-medium">
          <li><a href="#works" className="hover:text-white transition">WORKS</a></li>
          <li><a href="#about" className="hover:text-white transition">ABOUT</a></li>
          {/* 別のページに飛ぶ時は Link を使います */}
          <li><Link href="/contact" className="hover:text-white transition">CONTACT</Link></li>
        </ul>
      </nav>

      {/* ヒーローエリア */}
      <section className="relative h-screen min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-space.jpg"
            alt="Space background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#080d1a]"></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl text-white tracking-[0.3em] ml-[0.3em] font-medium drop-shadow-lg">
            Portfolio
          </h1>
          <p className="text-white/70 tracking-[0.5em] mt-4 ml-[0.5em] text-lg">
            OKITA WEB WORKS
          </p>
        </div>
      </section>

      {/* WORKSエリア */}
      <section id="works" className="py-24 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl text-white tracking-[0.3em] mb-4 ml-[0.3em]">・ WORKS ・</h2>
            <p className="text-sm text-white/50 tracking-widest">制作実績</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div className="relative h-64 w-full overflow-hidden bg-white/5 border border-white/10 rounded-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition duration-500">
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                  <Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full text-sm tracking-widest hover:bg-white/20 transition backdrop-blur-md">
                      サイトを見る ↗
                    </span>
                  </a>
                </div>
                <div className="pt-8 text-center">
                  <h3 className="text-xl font-bold text-white/90 tracking-wider mb-4">{project.title}</h3>
                  <div className="flex flex-wrap justify-center gap-3 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-white/60 border border-white/20 px-3 py-1 rounded-full tracking-wider bg-white/5">{tag}</span>
                    ))}
                  </div>
                  <p className="text-sm text-white/60 leading-loose max-w-sm mx-auto">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT エリア（フォームを消して、スッキリ中央揃えに） */}
      <section id="about" className="py-32 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl text-white tracking-[0.3em] mb-4 ml-[0.3em]">・ ABOUT ・</h2>
            <p className="text-sm text-white/50 tracking-widest">私について</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-4xl mx-auto">
            
            {/* プロフィール画像 */}
            <div className="relative w-56 h-56 rounded-full overflow-hidden shrink-0 border border-white/20 bg-white/5 p-2">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image src="/profile.jpg" alt="Profile" fill className="object-cover opacity-90" />
              </div>
            </div>

            {/* プロフィール文章 */}
            <div className="text-center md:text-left flex-1">
              <p className="text-base text-white/60 mb-2 tracking-widest">Web Creator</p>
              <p className="text-3xl font-bold tracking-widest mb-8 text-white/90">沖田</p>
              
              <div className="space-y-4 text-base text-white/70 leading-loose">
                <p>はじめまして。Webクリエイターの沖田です。</p>
                <p>Next.jsなどのモダンな技術を用い、<br />透明感のあるデザインと、使い心地の良いWebサイトを制作しています。</p>
                <p>「誰に、何を伝えたいか」という想いを大切にし、<br />あなたのビジネスを輝かせるお手伝いをします。</p>
              </div>
              
              <div className="mt-10">
                {/* 👈 ボタンを押すと /contact ページに飛びます */}
                <Link 
                  href="/contact" 
                  className="inline-block border border-white/30 hover:bg-white/10 text-white px-10 py-4 text-sm tracking-[0.2em] transition duration-300 rounded-sm"
                >
                  お問い合わせ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-12 text-center text-white/30 text-xs tracking-widest border-t border-white/5">
        &copy; {new Date().getFullYear()} OKITA WEB WORKS.
      </footer>
    </div>
  );
}