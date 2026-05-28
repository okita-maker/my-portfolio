"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, ReactNode } from "react";
import { projects } from "@/data/projects";
import { useInView } from "react-intersection-observer";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

const FadeIn = ({ children, delay = 0 }: FadeInProps) => {
  const { ref, inView } = useInView({
    rootMargin: "-100px",
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-serif text-slate-200 bg-[#080d1a] scroll-smooth relative">
      
      {/* 背景の星空レイヤー */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none animate-twinkle"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 50px 50px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 200px 150px, rgba(255,255,255,0.8), rgba(0,0,0,0)),
            radial-gradient(1px 1px at 400px 80px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 120px 300px, rgba(255,255,255,0.6), rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 350px 400px, #ffffff, rgba(0,0,0,0))
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '450px 450px',
        }}
      ></div>

      <div className="relative z-10">
        
        {/* ナビゲーション（スマホ見切れ修正済） */}
        <nav 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 md:py-6 px-4 md:px-8 ${
            scrolled ? "bg-[#080d1a]/90 backdrop-blur-md shadow-lg" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto max-w-7xl flex justify-center">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] md:text-sm tracking-[0.2em] text-white/60 font-medium">
              <li><a href="#message" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">MESSAGE</a></li>
              <li><a href="#skills" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">SKILLS</a></li>
              <li><a href="#works" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">WORKS</a></li>
              <li><a href="#about" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">ABOUT</a></li>
              <li><Link href="/contact" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">CONTACT</Link></li>
            </ul>
          </div>
        </nav>

        {/* 1. ヒーローエリア */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-[#080d1a]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-space.jpg"
              alt="Space background"
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a]/40 via-[#080d1a]/60 to-[#080d1a]"></div>
          </div>

          <div className="relative z-10 text-center px-6 mt-12 transition-opacity duration-1000 ease-in opacity-100">
            <p className="text-white/80 tracking-[0.4em] mb-6 text-sm md:text-base drop-shadow-md">
              ユーザー体験を追求し、モダンな技術で課題を解決する。
            </p>
            {/* メインタイトルをお名前に変更 */}
            <h1 className="text-4xl md:text-6xl text-white tracking-[0.2em] font-medium drop-shadow-xl mb-8">
              SANGA<br className="md:hidden"/> PORTFOLIO
            </h1>
            <a href="#message" className="inline-block mt-8 text-white/50 hover:text-white transition animate-bounce">
              <span className="block text-xs tracking-widest mb-2">スクロール</span>
              ↓
            </a>
          </div>
        </section>

        {/* 2. MESSAGE エリア */}
        <section id="message" className="py-24 px-6">
          <FadeIn>
            <div className="container mx-auto max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-12 ml-[0.3em] font-light">
                ・ MESSAGE ・
              </h2>
              <div className="space-y-8 text-sm md:text-base text-white/70 tracking-wider leading-loose font-light">
                <p>
                  「使いやすい」の裏側にある、確かな技術と対話力。
                </p>
                <p>
                  これまでコーディネーターとして、多くの方との面談や細やかな調整業務を経験してきました。<br />
                  そこで培った「相手の真のニーズを引き出すヒアリング力」は、<br className="hidden md:block"/>
                  エンジニアリングにおける要件定義やチーム開発において、強力な武器になると確信しています。
                </p>
                <p>
                  最新のAI技術によるワークフローの最適化から、<br className="hidden md:block"/>
                  Next.jsを用いたモダンなフロントエンド開発まで。<br />
                  技術力とコミュニケーション力の両輪で、価値あるプロダクトを創り出します。
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 3. SKILLS エリア */}
        <section id="skills" className="py-24 px-6 bg-white/5 border-y border-white/5">
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ SKILLS ・</h2>
                <p className="text-xs text-white/50 tracking-widest">技術スタックと提供できる価値</p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
              
              {/* フロントエンド */}
              <FadeIn delay={100}>
                <div className="h-full w-full bg-[#0a1122]/80 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col justify-between hover:bg-white/5 transition duration-500">
                  <span className="text-[10px] tracking-widest text-indigo-300">01 / Front-end</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-widest mb-2">React / Next.js</h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      コンポーネント指向に基づいたUI構築。Tailwind CSSを用いたレスポンシブでモダンなスタイリングの実装が可能です。
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* バックエンド */}
              <FadeIn delay={200}>
                <div className="h-full w-full bg-[#0a1122]/80 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col justify-between hover:bg-white/5 transition duration-500">
                  <span className="text-[10px] tracking-widest text-indigo-300">02 / Back-end & API</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-widest mb-2">API Routes / Node.js</h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      Next.jsのAPI Routesを活用したサーバーサイド処理、Nodemailerを用いた非同期メール送信機能などの実装経験があります。
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* AI & 効率化 */}
              <FadeIn delay={300}>
                <div className="h-full w-full bg-[#0a1122]/80 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col justify-between hover:bg-white/5 transition duration-500">
                  <span className="text-[10px] tracking-widest text-indigo-300">03 / AI & Workflow</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-widest mb-2">生成AI / プロンプト構築</h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      高品質な画像・動画生成AIの活用や、業務効率化のためのカスタムAI指示書（プロンプト）の構築・運用が得意です。
                    </p>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* 4. WORKS エリア */}
        <section id="works" className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <FadeIn>
              <div className="text-center mb-20">
                <h2 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ PROJECTS ・</h2>
                <p className="text-xs text-white/50 tracking-widest">これまでの開発実績・ポートフォリオ</p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {projects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 100}>
                  <div className="group flex flex-col">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5 border border-white/10 rounded-sm hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] transition duration-500 mb-6">
                      <Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                        <span className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full text-xs tracking-[0.2em] hover:bg-white hover:text-[#080d1a] transition duration-300 backdrop-blur-md">
                          プロジェクトを見る ↗
                        </span>
                      </a>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl text-white/90 tracking-widest mb-4 font-medium">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] md:text-xs text-white/70 border border-white/20 px-3 py-1 rounded-sm tracking-widest bg-white/5">{tag}</span>
                        ))}
                      </div>
                      <p className="text-sm text-white/60 tracking-wider leading-loose">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ABOUT エリア */}
        <section id="about" className="py-24 px-6 border-t border-white/5">
          <div className="container mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center mb-20">
                <h2 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ ABOUT ・</h2>
                <p className="text-xs text-white/50 tracking-widest">私について</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shrink-0 border border-white/10 bg-white/5 p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image src="/profile.png" alt="Profile" fill className="object-cover opacity-80 hover:opacity-100 transition duration-500" />
                  </div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <p className="text-xs text-white/50 mb-2 tracking-[0.2em]">Web Engineer</p>
                  {/* 自己紹介のお名前を修正 */}
                  <p className="text-2xl md:text-3xl font-medium tracking-[0.3em] mb-6 text-white/90 ml-[0.3em]">三箇</p>
                  
                  <div className="space-y-4 text-sm md:text-base text-white/70 tracking-wider leading-loose font-light">
                    <p>はじめまして。Webエンジニアを目指している三箇です。</p>
                    <p>
                      現在コーディネーターとして、お客様との面接や撮影ディレクション、細かい日程調整などを担当しています。
                      そこで磨いた「相手の状況を理解し、的確に動く力」は、開発チーム内でのコミュニケーションやユーザー視点でのUI/UX設計に活かせると考えています。
                    </p>
                    <p>
                      自ら課題を見つけ、最新のAIツールを取り入れながら効率的に解決策を形にする「自走力」を大切にしています。
                      技術と人間力の両面からチームに貢献できるエンジニアとして成長し続けます。
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 6. CONTACT CTAエリア */}
        <section className="py-32 px-6 border-t border-white/5 text-center">
          <FadeIn>
            <div className="container mx-auto max-w-2xl">
              <h2 className="text-2xl text-white tracking-[0.2em] mb-6 font-light">
                お気軽にお問い合わせください。
              </h2>
              <p className="text-sm text-white/60 tracking-wider leading-loose mb-12 font-light">
                面談の機会をいただけますと幸いです。<br className="hidden md:block"/>
                ポートフォリオに関するご質問なども、こちらからお願いいたします。
              </p>
              <Link 
                href="/contact" 
                className="inline-block border border-white text-white px-12 py-5 text-sm md:text-base tracking-[0.2em] transition duration-500 rounded-sm hover:bg-white hover:text-[#080d1a] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                お問い合わせはこちら
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* フッター */}
        <footer className="py-12 text-center text-white/30 text-[10px] tracking-[0.3em] border-t border-white/5">
          &copy; {new Date().getFullYear()} Sanga Portfolio. All rights reserved.
        </footer>
        
      </div> 
    </div>
  );
}