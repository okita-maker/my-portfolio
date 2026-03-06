// src/app/api/diagnostic/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const generatedPrompt = `
あなたは「接客ガチトレ」と組織マネジメントの知識に精通した、最高峰の実店舗コンサルタントです。
以下の診断フォームの回答をもとに、オーナーに提出するための「無料診断レポート」を作成してください。

# クライアントの現状データ
・業種：${data.industry}
・最大の悩み：${data.mainWorry}
・主力商品（看板メニュー）：${data.mainProduct}
・現在の平均客単価：${data.averageSpend}
・現場のストレス：${data.operationStress}
・最も待ち時間が発生するタイミング：${data.waitingTime}
・Google口コミの現状スコアと件数：${data.googleReviewStatus}
・理想の成長方向：${data.targetCustomer}

# 出力条件（厳守）
1. 宛先は「店舗オーナー様」とし、提出者である「沖田」が直接語りかけるような、丁寧で温かみのある敬語（です・ます調）で記述してください。
2. お客様の現状の努力を否定せず、まずは承認と共感から入ってください。
3. AIが書いたような無機質な表現や、コンサルタント同士の専門用語（顕在ニーズ、潜在ニーズなど）は避け、店舗オーナーが直感的に理解できる優しい言葉に変換してください。

# 出力形式（以下の4点で構成してください）
1. 現状の分析と現場の改善点：お客様が気づいていない課題を優しく提示し、基本行動（挨拶や清掃など）の徹底で現場のストレスを減らせることを伝えます。
2. 客単価を上げるための商品提案：現在の「平均客単価」と「主力商品」のデータを元に、松竹梅の3つの選択肢を用意し、自然と客単価が上がるセット提案の具体例を提示します。
3. 口コミが集まる仕組み作り：現状の口コミスコアと「待ち時間」のデータを掛け合わせ、スタッフが無理なく「写真付きの口コミ」をお願いできる具体的なトークスクリプトを提案します。
4. Web戦略（次へのステップ）：美しい映像体験（Cinematic Experience）とモダンなWebサイトが、これらの課題をどう解決するかを提示し、「このレポートの続きは、ぜひ一度オンラインでお話しさせてください」という前向きな提案で締めくくります。
`;

    const toOwnerOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `【無料診断依頼】${data.industry}様より`,
      text: `
診断フォームから新しい依頼がありました。
以下のプロンプトをコピーして、Geminiに入力し、お客様に提出する診断レポートを作成してください。

--------------------------------------------------
${generatedPrompt}
--------------------------------------------------
      `,
    };

    await transporter.sendMail(toOwnerOptions);

    return NextResponse.json({ success: true, message: '送信成功' });
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json({ success: false, message: '送信失敗' }, { status: 500 });
  }
}