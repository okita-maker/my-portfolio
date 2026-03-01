import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="min-h-screen font-serif text-slate-200 bg-[#080d1a] scroll-smooth">
      
      {/* ナビゲーション */}
      <nav className="absolute top-8 left-8 z-50">
        <ul className="flex gap-6 text-xs md:text-sm tracking-[0.2em] text-white/60 font-medium">
          <li><a href="#message" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">MESSAGE</a></li>
          <li><a href="#works" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">WORKS</a></li>
          <li><a href="#about" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">ABOUT</a></li>
          <li><Link href="/contact" className="hover:text-white transition pb-1 border-b border-transparent hover:border-white">CONTACT</Link></li>
        </ul>
      </nav>

      {/* 1. ヒーローエリア（キャッチコピーを顧客目線に） */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
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

        <div className="relative z-10 text-center px-6 mt-12">
          <p className="text-white/80 tracking-[0.4em] mb-6 text-sm md:text-base drop-shadow-md">
            お店の魅力と想いを、Webの力で形に。
          </p>
          <h1 className="text-4xl md:text-7xl text-white tracking-[0.2em] font-medium drop-shadow-xl mb-8">
            OKITA WEB WORKS
          </h1>
          <a href="#message" className="inline-block mt-8 text-white/50 hover:text-white transition animate-bounce">
            <span className="block text-xs tracking-widest mb-2">SCROLL</span>
            ↓
          </a>
        </div>
      </section>

      {/* 2. MESSAGE エリア（共感と課題解決の提示） */}
      <section id="message" className="py-24 px-6 relative z-10 bg-[#080d1a]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-12 ml-[0.3em] font-light">
            ・ MESSAGE ・
          </h2>
          <div className="space-y-8 text-sm md:text-base text-white/70 tracking-wider leading-loose font-light">
            <p>
              「お店のこだわりをもっと伝えたいけれど、<br className="hidden md:block"/>日々の業務が忙しくてWeb集客まで手が回らない…」
            </p>
            <p>
              そんなお悩みを抱えていませんか？
            </p>
            <p>
              OKITA WEB WORKS がお作りするのは、ただ綺麗なだけのサイトではありません。<br />
              お店の世界観を美しく伝え、お客様とのご縁を優しくつなぐ。<br />
              そして、予約の自動化などでスタッフの皆様の「日々の負担を減らす」ための<br className="hidden md:block"/>
              頼れるパートナーとなるWebサイトをご提案します。
            </p>
          </div>
        </div>
      </section>

      {/* 3. WORKS エリア（実績） */}
      <section id="works" className="py-24 px-6 relative z-10 bg-gradient-to-b from-[#080d1a] to-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ WORKS ・</h2>
            <p className="text-xs text-white/50 tracking-widest">お手伝いさせていただいた実績</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {projects.map((project) => (
              <div key={project.id} className="group flex flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5 border border-white/10 rounded-sm hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] transition duration-500 mb-6">
                  <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                  <Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                    <span className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full text-xs tracking-[0.2em] hover:bg-white text-hover-[#080d1a] transition duration-300 backdrop-blur-md">
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
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT エリア */}
      <section id="about" className="py-24 px-6 border-t border-white/5 bg-[#080d1a]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-2xl md:text-3xl text-white tracking-[0.3em] mb-4 ml-[0.3em] font-light">・ ABOUT ・</h2>
            <p className="text-xs text-white/50 tracking-widest">私について</p>
          </div>

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
        </div>
      </section>

      {/* 5. CONTACT CTA（行動喚起）エリア */}
      <section className="py-32 px-6 border-t border-white/5 bg-gradient-to-t from-white/5 to-[#080d1a] relative z-10 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl text-white tracking-[0.2em] mb-6 font-light">
            まずはお気軽に、ご相談ください。
          </h2>
          <p className="text-sm text-white/60 tracking-wider leading-loose mb-12 font-light">
            「こんな機能はつけられる？」「今のサイトを見直したい」など、<br className="hidden md:block"/>
            どんな些細なことでも構いません。ご相談は無料です。
          </p>
          <Link 
            href="/contact" 
            className="inline-block border border-white text-white px-12 py-5 text-sm md:text-base tracking-[0.2em] transition duration-500 rounded-sm hover:bg-white hover:text-[#080d1a] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            無料相談・お問い合わせはこちら
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-12 text-center text-white/30 text-[10px] tracking-[0.3em] border-t border-white/5 bg-[#080d1a]">
        &copy; {new Date().getFullYear()} OKITA WEB WORKS.
      </footer>
      
    </div>
  );
}