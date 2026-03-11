// src/app/diagnostic/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";

export default function DiagnosticForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");
  const [stepError, setStepError] = useState("");

  const [formData, setFormData] = useState({
    storeName: "",
    industry: "",
    industryOther: "",
    mainProduct: "",
    averageSpend: "",
    averageSpendOther: "",
    mainWorry: [] as string[],
    mainWorryOther: "",
    operationStress: [] as string[],
    operationStressOther: "",
    waitingTime: "",
    waitingTimeOther: "",
    googleReviewStatus: "",
    googleReviewStatusOther: "",
    googleReviewScore: "",
    webAutomation: [] as string[],
    webAutomationOther: "",
    targetCustomer: "",
    targetCustomerOther: "",
    url: "",
    email: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStepError("");
  };

  const handleCheckboxChange = (e: any, field: "mainWorry" | "operationStress" | "webAutomation") => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const list = prev[field];
      if (checked) {
        return { ...prev, [field]: [...list, value] };
      } else {
        return { ...prev, [field]: list.filter((item) => item !== value) };
      }
    });
    setStepError("");
  };

  const handleNextStep = () => {
    setStepError("");

    if (step === 1) {
      if (!formData.storeName) return setStepError("「1. 店舗名」をご記入ください。");
      if (!formData.industry) return setStepError("「2. 業種」を選択してください。");
      if (formData.industry === "その他" && !formData.industryOther) return setStepError("「その他」の具体的な業種をご記入ください。");
      if (!formData.mainProduct) return setStepError("「3. 主力商品」をご記入ください。");
      if (!formData.averageSpend) return setStepError("「4. 平均客単価」を選択してください。");
      if (formData.averageSpend === "その他" && !formData.averageSpendOther) return setStepError("「その他」の客単価をご記入ください。");
    }

    if (step === 2) {
      if (formData.mainWorry.length === 0) return setStepError("「5. 集客や売上の悩み」を1つ以上選択してください。");
      if (formData.mainWorry.includes("その他") && !formData.mainWorryOther) return setStepError("「その他」の具体的なお悩みをご記入ください。");
      if (formData.operationStress.length === 0) return setStepError("「6. 現場のストレス」を1つ以上選択してください。");
      if (formData.operationStress.includes("その他") && !formData.operationStressOther) return setStepError("「その他」の具体的なストレスをご記入ください。");
      if (!formData.waitingTime) return setStepError("「7. 待ち時間」を選択してください。");
      if (formData.waitingTime === "その他" && !formData.waitingTimeOther) return setStepError("「その他」の待ち時間をご記入ください。");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStepError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStepError("");

    if (!formData.googleReviewStatus) return setStepError("「8. 口コミの現状」を選択してください。");
    if (formData.googleReviewStatus === "その他" && !formData.googleReviewStatusOther) return setStepError("「その他」の口コミの現状をご記入ください。");
    if (!formData.googleReviewScore) return setStepError("「9. 口コミの評価点」を選択してください。");
    if (formData.webAutomation.length === 0) return setStepError("「10. Webサイト・自動化」について1つ以上選択してください。");
    if (formData.webAutomation.includes("その他") && !formData.webAutomationOther) return setStepError("「その他」の思いをご記入ください。");
    if (!formData.targetCustomer) return setStepError("「11. 成長させたい方向」を選択してください。");
    if (formData.targetCustomer === "その他" && !formData.targetCustomerOther) return setStepError("「その他」の理想の未来をご記入ください。");
    if (!formData.url) return setStepError("「12. URL」をご記入ください（ない場合は「なし」）。");
    if (!formData.email) return setStepError("「13. メールアドレス」をご記入ください。");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return setStepError("有効なメールアドレスをご記入ください。");

    setStatus("loading");

    const payload = {
      storeName: formData.storeName,
      industry: formData.industry === "その他" ? `その他（${formData.industryOther}）` : formData.industry,
      mainProduct: formData.mainProduct,
      averageSpend: formData.averageSpend === "その他" ? `その他（${formData.averageSpendOther}）` : formData.averageSpend,
      mainWorry: formData.mainWorry.includes("その他") ? [...formData.mainWorry.filter(i => i !== "その他"), `その他（${formData.mainWorryOther}）`].join(" / ") : formData.mainWorry.join(" / "),
      operationStress: formData.operationStress.includes("その他") ? [...formData.operationStress.filter(i => i !== "その他"), `その他（${formData.operationStressOther}）`].join(" / ") : formData.operationStress.join(" / "),
      waitingTime: formData.waitingTime === "その他" ? `その他（${formData.waitingTimeOther}）` : formData.waitingTime,
      googleReviewStatus: formData.googleReviewStatus === "その他" ? `その他（${formData.googleReviewStatusOther}）` : formData.googleReviewStatus,
      googleReviewScore: formData.googleReviewScore,
      webAutomation: formData.webAutomation.includes("その他") ? [...formData.webAutomation.filter(i => i !== "その他"), `その他（${formData.webAutomationOther}）`].join(" / ") : formData.webAutomation.join(" / "),
      targetCustomer: formData.targetCustomer === "その他" ? `その他（${formData.targetCustomerOther}）` : formData.targetCustomer,
      url: formData.url,
      email: formData.email,
    };

    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const RadioOption = ({ name, value, label, checked }: any) => (
    <label className={`border p-4 rounded-sm cursor-pointer transition flex items-start gap-3 ${checked ? "border-indigo-400 bg-indigo-400/10" : "border-white/20 hover:border-white/50 bg-[#0a1122]"}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={handleChange} className="mt-1 w-4 h-4 accent-indigo-500 shrink-0" />
      <span className="text-sm text-white/90 leading-snug">{label}</span>
    </label>
  );

  const CheckboxOption = ({ name, value, label, checked, field }: any) => (
    <label className={`border p-4 rounded-sm cursor-pointer transition flex items-start gap-3 ${checked ? "border-indigo-400 bg-indigo-400/10" : "border-white/20 hover:border-white/50 bg-[#0a1122]"}`}>
      <input type="checkbox" name={name} value={value} checked={checked} onChange={(e) => handleCheckboxChange(e, field)} className="mt-1 w-4 h-4 accent-indigo-500 rounded-sm shrink-0" />
      <span className="text-sm text-white/90 leading-snug">{label}</span>
    </label>
  );

  if (status === "success") {
    return (
      <div className="min-h-screen font-serif text-slate-200 bg-[#080d1a] flex flex-col items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white/5 border border-white/10 p-10 rounded-sm text-center">
          <h2 className="text-xl tracking-widest text-white mb-6">診断の受付が完了しました</h2>
          <p className="text-sm text-white/60 leading-loose mb-8">
            ご入力いただいた内容をもとに、店舗の潜在的な課題と解決策を分析いたします。<br />
            後日、担当の沖田よりご指定のメールアドレス宛に診断レポートをお送りいたしますので、今しばらくお待ちください。
          </p>
          <Link href="/" className="text-xs text-indigo-300 hover:text-white transition tracking-widest">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-serif text-slate-200 bg-[#080d1a] py-20 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto relative">
        
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-widest text-indigo-300 mb-2 block font-medium">FREE DIAGNOSTIC</span>
          <h1 className="text-2xl md:text-3xl text-white tracking-[0.2em] mb-4 font-bold">
            店舗Web戦略・無料診断
          </h1>
          <p className="text-xs md:text-sm text-white/70 tracking-widest leading-loose font-medium">
            3つのステップでお店の現状をお聞かせください。<br />
            専門家の視点から、客単価と集客力を上げるための改善レポートを無料で作成いたします。
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-1 rounded-full transition-colors duration-500 ${step >= 1 ? "bg-indigo-400" : "bg-white/20"}`}></div>
            <div className={`w-10 h-1 rounded-full transition-colors duration-500 ${step >= 2 ? "bg-indigo-400" : "bg-white/20"}`}></div>
            <div className={`w-10 h-1 rounded-full transition-colors duration-500 ${step >= 3 ? "bg-indigo-400" : "bg-white/20"}`}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-sm relative grid">
          
          {/* STEP 1 */}
          <div className={`col-start-1 row-start-1 transition-all duration-700 p-6 md:p-12 ${step === 1 ? "opacity-100 translate-x-0 z-10 pointer-events-auto" : "opacity-0 -translate-x-10 z-0 pointer-events-none"}`}>
            <h2 className="text-lg text-white tracking-widest mb-8 border-b border-white/10 pb-4">STEP 1：お店の基本情報</h2>
            <div className="space-y-10">
              
              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">1. 店舗名（屋号）をご記入ください</label>
                <input type="text" name="storeName" value={formData.storeName} onChange={handleChange}
                       className="w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                       placeholder="例：Cafe Growth" />
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">2. お店の業種を教えてください（1つ選択）</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["カフェ・喫茶店", "美容室・サロン", "飲食店（レストラン・居酒屋など）", "アパレル・小売店", "その他"].map((opt) => (
                    <RadioOption key={opt} name="industry" value={opt} label={opt} checked={formData.industry === opt} />
                  ))}
                </div>
                {formData.industry === "その他" && (
                  <input type="text" name="industryOther" value={formData.industryOther} onChange={handleChange}
                         className="mt-3 w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                         placeholder="具体的な業種をご記入ください" />
                )}
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">3. お店の主力商品、または看板メニューは何ですか</label>
                <input type="text" name="mainProduct" value={formData.mainProduct} onChange={handleChange}
                       className="w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                       placeholder="例：自家焙煎コーヒー、カット＆カラーなど" />
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">4. 現在の平均的な客単価を教えてください（1つ選択）</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["1,000円未満", "1,000円〜3,000円未満", "3,000円〜5,000円未満", "5,000円〜10,000円未満", "10,000円以上", "その他"].map((opt) => (
                    <RadioOption key={opt} name="averageSpend" value={opt} label={opt} checked={formData.averageSpend === opt} />
                  ))}
                </div>
                {formData.averageSpend === "その他" && (
                  <input type="text" name="averageSpendOther" value={formData.averageSpendOther} onChange={handleChange}
                         className="mt-3 w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                         placeholder="現在の客単価をご記入ください" />
                )}
              </div>
            </div>
            
            <div className="mt-12 flex flex-col items-end">
              {stepError && <p className="text-red-400 text-xs mb-3 tracking-widest">{stepError}</p>}
              <button type="button" onClick={handleNextStep}
                      className="bg-white text-[#080d1a] px-8 py-4 text-sm tracking-widest rounded-sm hover:bg-white/80 transition">
次へ進む →
              </button>
            </div>
          </div>

          {/* STEP 2 */}
          <div className={`col-start-1 row-start-1 transition-all duration-700 p-6 md:p-12 ${step === 2 ? "opacity-100 translate-x-0 z-10 pointer-events-auto" : "opacity-0 translate-x-10 z-0 pointer-events-none"}`}>
            <h2 className="text-lg text-white tracking-widest mb-8 border-b border-white/10 pb-4">STEP 2：集客と現場の課題について</h2>
            <div className="space-y-10">
              
              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">5. 現在、集客や売上における一番の悩みは何ですか（複数選択可）</label>
                <div className="grid grid-cols-1 gap-3">
                  {["新規のお客様がなかなか増えない", "一度来店されても、リピートに繋がりにくい", "競合店やネット通販と価格で比べられてしまうことが多い", "売上を上げるために、スタッフにどう動いてもらえばいいか分からない", "広告費や販促費をかけているが、見合う効果が出ていない", "その他"].map((opt) => (
                    <CheckboxOption key={opt} name="mainWorry" value={opt} label={opt} checked={formData.mainWorry.includes(opt)} field="mainWorry" />
                  ))}
                </div>
                {formData.mainWorry.includes("その他") && (
                  <input type="text" name="mainWorryOther" value={formData.mainWorryOther} onChange={handleChange}
                         className="mt-3 w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                         placeholder="具体的なお悩みをご記入ください" />
                )}
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">6. 現場オペレーションでストレス（課題）に感じることは何ですか（複数選択可）</label>
                <div className="grid grid-cols-1 gap-3">
                  {["スタッフによって、接客や作業のレベルにバラつきがある", "掃除や挨拶など、当たり前のことが継続できないことがある", "忙しい時間帯になると、ミスやクレームが起きやすくなる", "人手不足で、スタッフの教育に十分な時間がとれない", "店長や責任者ばかりに負担が集中している", "その他"].map((opt) => (
                    <CheckboxOption key={opt} name="operationStress" value={opt} label={opt} checked={formData.operationStress.includes(opt)} field="operationStress" />
                  ))}
                </div>
                {formData.operationStress.includes("その他") && (
                  <input type="text" name="operationStressOther" value={formData.operationStressOther} onChange={handleChange}
                         className="mt-3 w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                         placeholder="具体的なストレスをご記入ください" />
                )}
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">7. お客様の「待ち時間」が最も発生するのはいつですか（1つ選択）</label>
                <div className="grid grid-cols-1 gap-3">
                  {["お会計のとき", "商品の準備や提供をお待ちいただいているとき", "お客様が商品選びで迷われているとき", "スタッフの手がふさがっており、お声がけに行けないとき", "その他"].map((opt) => (
                    <RadioOption key={opt} name="waitingTime" value={opt} label={opt} checked={formData.waitingTime === opt} />
                  ))}
                </div>
                {formData.waitingTime === "その他" && (
                  <input type="text" name="waitingTimeOther" value={formData.waitingTimeOther} onChange={handleChange}
                         className="mt-3 w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                         placeholder="待ち時間が発生するタイミングをご記入ください" />
                )}
              </div>
            </div>
            
            <div className="mt-12 flex flex-col items-end">
              {stepError && <p className="text-red-400 text-xs mb-3 tracking-widest">{stepError}</p>}
              <div className="flex justify-between items-center w-full">
                <button type="button" onClick={prevStep} className="text-white/50 hover:text-white text-sm tracking-widest transition">
                  ← 戻る
                </button>
                <button type="button" onClick={handleNextStep}
                        className="bg-white text-[#080d1a] px-8 py-4 text-sm tracking-widest rounded-sm hover:bg-white/80 transition">
                  次へ進む →
                </button>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className={`col-start-1 row-start-1 transition-all duration-700 p-6 md:p-12 ${step === 3 ? "opacity-100 translate-x-0 z-10 pointer-events-auto" : "opacity-0 translate-x-10 z-0 pointer-events-none"}`}>
            <h2 className="text-lg text-white tracking-widest mb-8 border-b border-white/10 pb-4">STEP 3：Web環境と未来について</h2>
            <div className="space-y-10">
              
              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">8. Google口コミの現状について教えてください（1つ選択）</label>
                <div className="grid grid-cols-1 gap-3">
                  {["まだ手をつけていない、またはやり方が分からない", "口コミは入るが、件数が少なく増え悩んでいる", "悪い口コミが書かれるのが怖くて、積極的にお願いできていない", "良い口コミも悪い口コミもあるが、どう返信していいか迷う", "順調に集まっており、特に悩みはない", "その他"].map((opt) => (
                    <RadioOption key={opt} name="googleReviewStatus" value={opt} label={opt} checked={formData.googleReviewStatus === opt} />
                  ))}
                </div>
                {formData.googleReviewStatus === "その他" && (
                  <input type="text" name="googleReviewStatusOther" value={formData.googleReviewStatusOther} onChange={handleChange}
                         className="mt-3 w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                         placeholder="口コミの現状をご記入ください" />
                )}
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">9. Google口コミの現在の「評価点（星の数）」を教えてください（1つ選択）</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["4.5 〜 5.0", "4.0 〜 4.4", "3.5 〜 3.9", "3.4 以下", "まだ登録していない・分からない"].map((opt) => (
                    <RadioOption key={opt} name="googleReviewScore" value={opt} label={opt} checked={formData.googleReviewScore === opt} />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">10. Webサイトや自動化ツール（予約システム等）の必要性について、どう感じていますか（複数選択可）</label>
                <div className="grid grid-cols-1 gap-3">
                  {["電話対応や事務作業が多く、Webツールで自動化・削減したい", "古いサイトしかなく、お店の魅力（世界観）が正しく伝わっていない気がする", "ITやWebに苦手意識があり、何から手をつければいいか分からない", "現状のWeb集客やツールで十分に満足している", "その他"].map((opt) => (
                    <CheckboxOption key={opt} name="webAutomation" value={opt} label={opt} checked={formData.webAutomation.includes(opt)} field="webAutomation" />
                  ))}
                </div>
                {formData.webAutomation.includes("その他") && (
                  <input type="text" name="webAutomationOther" value={formData.webAutomationOther} onChange={handleChange}
                         className="mt-3 w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                         placeholder="ご自由にご記入ください" />
                )}
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">11. 今後、お店をどのように成長させたいですか（1つ選択）</label>
                <div className="grid grid-cols-1 gap-3">
                  {["客数はそのままで、単価を上げてゆとりを持ちたい", "単価は維持して、とにかくたくさんのお客様に来てほしい", "まだ明確な方向性が決まっていない", "その他"].map((opt) => (
                    <RadioOption key={opt} name="targetCustomer" value={opt} label={opt} checked={formData.targetCustomer === opt} />
                  ))}
                </div>
                {formData.targetCustomer === "その他" && (
                  <input type="text" name="targetCustomerOther" value={formData.targetCustomerOther} onChange={handleChange}
                         className="mt-3 w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                         placeholder="理想の未来をご記入ください" />
                )}
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">
                  12. お店のWebサイト、Instagram、またはGoogleマップのURLをご記入ください<br/>
                  <span className="text-xs text-white/50 font-normal">（まだない場合は「なし」とご記入ください）</span>
                </label>
                <input name="url" type="text" value={formData.url} onChange={handleChange} 
                       className="w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                       placeholder="https://... または「なし」" />
              </div>

              <div>
                <label className="block text-sm text-white/80 tracking-widest mb-4">13. 診断レポートの送付先メールアドレスをご記入ください</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} 
                       className="w-full bg-[#0a1122] border border-white/20 rounded-sm p-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-400 transition text-sm" 
                       placeholder="example@email.com" />
              </div>

            </div>
            
            <div className="mt-12 flex flex-col items-end">
              {stepError && <p className="text-red-400 text-xs mb-3 tracking-widest">{stepError}</p>}
              <div className="flex justify-between items-center w-full">
                <button type="button" onClick={prevStep} className="text-white/50 hover:text-white text-sm tracking-widest transition">
                  ← 戻る
                </button>
                <button type="submit" disabled={status === "loading"} 
                        className={`px-10 py-4 text-sm tracking-[0.2em] transition duration-300 border rounded-sm font-bold
                          ${status === "loading" ? "border-white/20 text-white/30 cursor-not-allowed" : "bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.3)]"}`}>
                  {status === "loading" ? "送信中..." : "無料で診断を申し込む"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}