export const projects = [
  {
    id: "tsumugi",
    title: "古民家カフェ（非同期予約連携サイト）",
    image: "/tsumugi-site.png",
    demoUrl: "https://cafe-site-three-sigma.vercel.app/",
    tags: ["Next.js", "TypeScript", "API Routes", "Nodemailer"],
    description: "Next.jsのAPI RoutesとNodemailerを組み合わせ、サーバーサイドでの自動メール返信機能を備えたWeb予約システムの実装例です。フォーム入力値のバリデーションや非同期通信時のエラーハンドリングを徹底し、安全でユーザーにストレスを与えない動線を構築しました。"
  },
  {
    id: "salon-ciel",
    title: "美容サロン（コンポーネント指向・UI設計）",
    image: "/salon-site.png",
    demoUrl: "https://beauty-salon-lp.vercel.app/",
    tags: ["React", "Tailwind CSS", "レスポンシブデザイン", "UI/UX"],
    description: "モバイルファーストを意識したレスポンシブWebサイトです。Tailwind CSSのユーティリティクラスをフル活用し、スマートフォンやタブレットなど、あらゆるデバイスで一貫した操作性を保つUIを実現。コンポーネントを適切に細分化し、再利用性と保守性の高いコード設計を意識しました。"
  },
  {
    id: "ai-gym-pro",
    title: "AIパーソナルジム（パフォーマンス最適化LP）",
    image: "/gym-site.png",
    demoUrl: "https://ai-gym-pro.pages.dev/",
    tags: ["Next.js", "画像最適化", "Web Vitals", "高速表示"],
    description: "表示速度とコンバージョン率の向上を両立させたシングルページアプリケーションです。Next.jsのImageコンポーネントによる自動WebP変換やLazy Loading（遅延読み込み）を駆使し、画像の軽量化を徹底。Core Web Vitalsのスコア向上を意識した高速なレンダリングを追求しました。"
  },
  {
    id: "space-cafe",
    title: "宇宙カフェ（インタラクティブ・モーショングラフィックス）",
    image: "/space-cafe.png",
    demoUrl: "https://ai-monetize-web.pages.dev/",
    tags: ["CSS Animation", "Intersection Observer", "フロントエンド"],
    description: "JavaScriptのIntersection Observer API（交差監視）とCSSアニメーションを組み合わせ、スクロールに応じた動的な視覚効果を実装したコンセプトサイトです。ブラウザのレンダリング負荷（リフロー・リペイント）を最小限に抑え、滑らかで没入感のあるUXをフロントエンド側からアプローチしました。"
  }
];