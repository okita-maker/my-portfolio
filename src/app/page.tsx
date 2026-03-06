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
        
        {/* ナビゲーション（タブは英語で統一） */}
        <nav 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-8 ${
            scrolled ? "bg-[#080d1a]/80 backdrop-blur-md shadow-lg" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto max-w-7xl flex justify-center">
            <ul className="flex gap-8 text-[11px] md:text-sm tracking-[0.2em] text-white/60 font-medium">
              <li><a href="#message" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">MESSAGE</a></li>
              <li><a href="#services" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">SERVICES</a></li>
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
              お店の魅力と想いを、Webの力で形に。
            </p>
            {/* サイト名を日本語に変更 */}
            <h1 className="text-4xl md:text-6xl text-white tracking-[0.2em] font-medium drop-shadow-xl mb-8">
              OKITA DESIGN
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
                  「お店のこだわりをもっと伝えたいけれど、<br className="hidden md:block"/>日々の業務が忙しくてWeb集客まで手が回らない…」
                </p>
                <p>
                  そんなお悩みを抱えていませんか。
                </p>
                <p>
                  沖田ウェブワークスがお作りするのは、ただ綺麗なだけのサイトではありません。<br />
                  お店の世界観を美しく伝え、お客様とのご縁を優しくつなぐ。<br />
                  そして、予約の自動化などでスタッフの皆様の「日々の負担を減らす」ための<br className="hidden md:block"/>
                  頼れるパートナーとなるWebサイトをご提案します。
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 3. SERVICES エリア */}
        <section id="services" className="py-24 px-6 bg-white/5 border-y border-white/5">
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ SERVICES ・</h2>
                <p className="text-xs text-white/50 tracking-widest">売上と癒しを両立するアプローチ</p>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-6">
              
              {/* 最上部：横幅いっぱいの動画パネル */}
              <FadeIn delay={100}>
                <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden group border border-white/10">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 group-hover:scale-105 opacity-80"
                    src="/cafe-fantasy.mp4" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/30 to-transparent z-10"></div>
                  
                  <div className="relative z-20 p-8 h-full flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="text-xs tracking-widest text-white/60 mb-2 font-medium">01 / 映像制作</span>
                    <h3 className="text-2xl md:text-3xl font-medium tracking-widest mb-3 text-white drop-shadow-lg">
                      心を動かす映像体験
                    </h3>
                    <p className="text-sm text-white/80 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xl">
                      言葉では伝わらないお店の空気感を、まるで映画のワンシーンのような映像で表現。訪れる前からお客様の心を動かします。
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* 下部：3つの要素 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
                
                {/* Web制作 */}
                <FadeIn delay={200}>
                  <div className="h-full w-full bg-[#0a1122]/80 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col justify-between hover:bg-white/5 transition duration-500">
                    <span className="text-[10px] tracking-widest text-indigo-300">02 / Web設計</span>
                    <div>
                      <h3 className="text-lg font-medium tracking-widest mb-2">働く人に優しいサイト</h3>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        自動予約システムなどを組み込み、スタッフの業務負担を減らすWebサイトを構築します。
                      </p>
                    </div>
                  </div>
                </FadeIn>

                {/* マーケティング */}
                <FadeIn delay={300}>
                  <div className="h-full w-full bg-[#0a1122]/80 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col justify-between hover:bg-white/5 transition duration-500">
                    <span className="text-[10px] tracking-widest text-indigo-300">03 / 集客支援</span>
                    <div>
                      <h3 className="text-lg font-medium tracking-widest mb-2">Google口コミ集客</h3>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        美しいサイトを起点に、広告費に頼らずGoogle口コミを資産化する店舗オペレーションを提案します。
                      </p>
                    </div>
                  </div>
                </FadeIn>

                {/* コンサルティング */}
                <FadeIn delay={400}>
                  <div className="h-full w-full bg-gradient-to-br from-indigo-900/30 to-[#0a1122]/80 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col justify-between hover:border-indigo-500/30 transition duration-500">
                    <span className="text-[10px] tracking-widest text-indigo-300">04 / コンサルティング</span>
                    <div>
                      <h3 className="text-lg font-medium tracking-widest mb-2">期待を超える伴走支援</h3>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        単なる制作代行ではなく、オーナー様の悩みを引き出し、安心感をもたらす解決策を共に練り上げます。
                      </p>
                    </div>
                  </div>
                </FadeIn>

              </div>
            </div>
          </div>
        </section>

        {/* 4. WORKS エリア */}
        <section id="works" className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <FadeIn>
              <div className="text-center mb-20">
                <h2 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ WORKS ・</h2>
                <p className="text-xs text-white/50 tracking-widest">Web戦略パートナーとしてのコンセプト・学習用プロジェクト事例</p>
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
                          サイトを見る ↗
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
                    <Image src="/profile.jpg" alt="Profile" fill className="object-cover opacity-80 hover:opacity-100 transition duration-500" />
                  </div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <p className="text-xs text-white/50 mb-2 tracking-[0.2em]">実店舗のWeb戦略パートナー</p>
                  <p className="text-2xl md:text-3xl font-medium tracking-[0.3em] mb-6 text-white/90 ml-[0.3em]">沖田</p>
                  
                  <div className="space-y-4 text-sm md:text-base text-white/70 tracking-wider leading-loose font-light">
                    <p>はじめまして。Webクリエイターの沖田です。</p>
                    <p>
                      「お店の魅力を伝えたいけれど、どうすればいいか分からない」<br className="hidden md:block"/>
                      そんなオーナー様に寄り添い、二人三脚で課題を解決します。
                    </p>
                    <p>
                      最新のAI技術やモダンなWebの仕組みを取り入れながらも、<br className="hidden md:block"/>
                      一番大切にしているのは「人と人との温かいコミュニケーション」です。<br />
                      まずはお店の想いや、日頃のお悩みについてお聞かせください。
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
                まずはお気軽に、ご相談ください。
              </h2>
              <p className="text-sm text-white/60 tracking-wider leading-loose mb-12 font-light">
                「こんな機能はつけられるか」「今のサイトを見直したい」など、<br className="hidden md:block"/>
                どんな些細なことでも構いません。ご相談は無料です。
              </p>
              <Link 
                href="/contact" 
                className="inline-block border border-white text-white px-12 py-5 text-sm md:text-base tracking-[0.2em] transition duration-500 rounded-sm hover:bg-white hover:text-[#080d1a] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                無料相談・お問い合わせはこちら
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* フッター */}
        <footer className="py-12 text-center text-white/30 text-[10px] tracking-[0.3em] border-t border-white/5">
          &copy; {new Date().getFullYear()} 沖田ウェブワークス.
        </footer>
        
      </div> 
    </div>
  );
}