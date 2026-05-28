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
    <div className="min-h-screen font-serif text-slate-800 bg-white scroll-smooth relative">
      
      <div className="relative z-10">
        
        {/* ナビゲーション（文字はもとのシンプルな色・ホバーに変更） */}
        <nav 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 md:py-6 px-4 md:px-8 ${
            scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto max-w-7xl flex justify-center">
            <ul className={`flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] md:text-sm tracking-[0.2em] font-medium transition-colors duration-500 ${
              scrolled ? "text-slate-500" : "text-white/80"
            }`}>
              <li><a href="#message" className={`transition pb-1 border-b border-transparent ${scrolled ? "hover:text-slate-900 hover:border-slate-900" : "hover:text-white hover:border-white"}`}>MESSAGE</a></li>
              <li><a href="#skills" className={`transition pb-1 border-b border-transparent ${scrolled ? "hover:text-slate-900 hover:border-slate-900" : "hover:text-white hover:border-white"}`}>SKILLS</a></li>
              <li><a href="#works" className={`transition pb-1 border-b border-transparent ${scrolled ? "hover:text-slate-900 hover:border-slate-900" : "hover:text-white hover:border-white"}`}>WORKS</a></li>
              <li><a href="#about" className={`transition pb-1 border-b border-transparent ${scrolled ? "hover:text-slate-900 hover:border-slate-900" : "hover:text-white hover:border-white"}`}>ABOUT</a></li>
              <li><Link href="/contact" className={`transition pb-1 border-b border-transparent ${scrolled ? "hover:text-slate-900 hover:border-slate-900" : "hover:text-white hover:border-white"}`}>CONTACT</Link></li>
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
              className="object-cover opacity-85"
              priority
            />
            {/* 下のMESSAGEセクション（白）へ自然に繋がるグラデーション */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a]/40 via-[#080d1a]/20 to-white"></div>
          </div>

          <div className="relative z-10 text-center px-6 mt-12">
            <p className="text-white/90 tracking-[0.3em] mb-6 text-sm md:text-base drop-shadow-md">
              Web Engineer Portfolio
            </p>
            <h1 className="text-4xl md:text-6xl text-white tracking-[0.2em] font-medium mb-8 drop-shadow-xl">
              SANGA<br className="md:hidden"/> PORTFOLIO
            </h1>
            <a href="#message" className="inline-block mt-8 text-white/70 hover:text-white transition animate-bounce">
              <span className="block text-xs tracking-widest mb-2">SCROLL</span>
              ↓
            </a>
          </div>
        </section>

        {/* 2. MESSAGE エリア（背景：白） */}
        <section id="message" className="py-24 px-6 bg-white">
          <FadeIn>
            <div className="container mx-auto max-w-3xl text-center">
              {/* 文字はもとのシンプルなデザインに修正 */}
              <h2 className="text-2xl md:text-3xl text-slate-800 tracking-[0.3em] mb-12 ml-[0.3em] font-light">
                ・ MESSAGE ・
              </h2>
              <div className="space-y-8 text-sm md:text-base text-slate-600 tracking-wider leading-loose font-light">
                <p>
                  技術と対話で、使いやすいWebを形にする。
                </p>
                <p>
                  対人業務を通じて培ったヒアリング力や調整力を活かし、<br className="hidden md:block"/>
                  ユーザー視点に立ったUI/UX設計と、モダンな技術を用いた開発を目指しています。
                </p>
                <p>
                  現在はNext.jsやReactなどのフロントエンド技術を中心に、<br className="hidden md:block"/>
                  バックエンドとの連携も含めた幅広いスキルを身につけるため学習に取り組んでいます。
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 3. SKILLS エリア（背景：違和感のない上品な薄いグレー） */}
        <section id="skills" className="py-24 px-6 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl text-slate-800 tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ SKILLS ・</h2>
                <p className="text-xs text-slate-500 tracking-widest">学習中の技術スタック</p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
              <FadeIn delay={100}>
                <div className="h-full w-full bg-white rounded-xl p-6 border border-slate-200/60 flex flex-col justify-between hover:shadow-md transition duration-500">
                  <span className="text-[10px] tracking-widest text-slate-400 font-medium">01 / Front-end</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-widest mb-2 text-slate-800">React / Next.js</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      コンポーネント指向に基づいたUI構築。Tailwind CSSを用いたレスポンシブデザインの実装を学習しています。
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="h-full w-full bg-white rounded-xl p-6 border border-slate-200/60 flex flex-col justify-between hover:shadow-md transition duration-500">
                  <span className="text-[10px] tracking-widest text-slate-400 font-medium">02 / Back-end & API</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-widest mb-2 text-slate-800">API Routes</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      Next.jsのAPI Routesを活用したサーバーサイド処理や、非同期通信によるデータ連携の基礎を学んでいます。
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={300}>
                <div className="h-full w-full bg-white rounded-xl p-6 border border-slate-200/60 flex flex-col justify-between hover:shadow-md transition duration-500">
                  <span className="text-[10px] tracking-widest text-slate-400 font-medium">03 / Others</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-widest mb-2 text-slate-800">デザイン・AI活用</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      画像編集やライティングのスキルに加え、最新の生成AIツールを活用した業務効率化の手法を取り入れています。
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 4. WORKS エリア（文字をWORKSに戻し、背景：白） */}
        <section id="works" className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <FadeIn>
              <div className="text-center mb-20">
                <h2 className="text-2xl md:text-3xl text-slate-800 tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ WORKS ・</h2>
                <p className="text-xs text-slate-500 tracking-widest">制作物一覧</p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {projects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 100}>
                  <div className="group flex flex-col">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border border-slate-200 rounded-sm hover:shadow-md transition duration-500 mb-6">
                      <Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                        <span className="bg-slate-800 text-white px-8 py-3 rounded-full text-xs tracking-[0.2em] hover:bg-slate-900 transition duration-300">
                          プロジェクトを見る ↗
                        </span>
                      </a>
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl text-slate-800 tracking-widest mb-4 font-medium">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          /* タグをもとの落ち着いたスレートトーンに変更 */
                          <span key={tag} className="text-[10px] md:text-xs text-slate-600 border border-slate-200 px-3 py-1 rounded-sm tracking-widest bg-slate-50">{tag}</span>
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 tracking-wider leading-loose">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ABOUT エリア（背景：上品な薄いグレー） */}
        <section id="about" className="py-24 px-6 border-t border-slate-100 bg-slate-50">
          <div className="container mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center mb-20">
                <h2 className="text-2xl md:text-3xl text-slate-800 tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ ABOUT ・</h2>
                <p className="text-xs text-slate-500 tracking-widest">私について</p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
                {/* 枠線をもとのシンプルなグレー系に戻しました */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-white p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image src="/profile.png" alt="Profile" fill className="object-cover transition duration-500" />
                  </div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <p className="text-xs text-slate-500 mb-2 tracking-[0.2em]">Web Engineer</p>
                  <p className="text-2xl md:text-3xl font-medium tracking-[0.3em] mb-6 text-slate-800 ml-[0.3em]">三箇</p>
                  
                  <div className="space-y-4 text-sm md:text-base text-slate-600 tracking-wider leading-loose font-light">
                    <p>はじめまして。Webエンジニアを目指して学習中の三箇です。</p>
                    <p>
                      現在の仕事では、会員様との面談やデートのセッティング、撮影ディレクションなど、人と関わる調整業務を幅広く担当しています。
                      また、営業やライティング、画像編集の経験も重ねてきました。
                    </p>
                    <p>
                      これらを通じて培ったコミュニケーション力や課題解決への柔軟なアプローチを基盤に、技術面でもチームに貢献できるエンジニアになれるよう日々学習を続けています。
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 6. CONTACT CTAエリア（背景：白、ボタンをもとのシックな黒に戻しました） */}
        <section className="py-32 px-6 border-t border-slate-100 bg-white text-center">
          <FadeIn>
            <div className="container mx-auto max-w-2xl">
              <h2 className="text-2xl text-slate-800 tracking-[0.2em] mb-6 font-light">
                CONTACT
              </h2>
              <p className="text-sm text-slate-600 tracking-wider leading-loose mb-12 font-light">
                ご覧いただきありがとうございます。<br className="hidden md:block"/>
                ポートフォリオに関するお問い合わせ等はこちらからお願いいたします。
              </p>
              {/* ボタンをシンプルで清潔感のある元のダークトーンに戻しました */}
              <Link 
                href="/contact" 
                className="inline-block border border-slate-800 text-slate-800 px-12 py-5 text-sm md:text-base tracking-[0.2em] transition duration-500 rounded-sm hover:bg-slate-800 hover:text-white"
              >
                お問い合わせはこちら
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* フッター */}
        <footer className="py-12 text-center text-slate-400 text-[10px] tracking-[0.3em] border-t border-slate-100 bg-slate-50">
          &copy; {new Date().getFullYear()} Sanga Portfolio. All rights reserved.
        </footer>
        
      </div> 
    </div>
  );
}