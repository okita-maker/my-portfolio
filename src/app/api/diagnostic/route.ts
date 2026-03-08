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
以下の診断フォームの回答をもとに、オーナー様に提出するための「無料診断レポート」を作成してください。

# クライアントの現状データ
・業種：${data.industry}
・最大の悩み：${data.mainWorry}
・主力商品（看板メニュー）：${data.mainProduct}
・現在の平均客単価：${data.averageSpend}
・現場のストレス：${data.operationStress}
・最も待ち時間が発生するタイミング：${data.waitingTime}
・Google口コミの現状スコアと件数：${data.googleReviewStatus}
・理想の成長方向：${data.targetCustomer}
・店舗URL（Web/SNS/Googleマップ等）：${data.url}

# 出力条件（厳守）
1. 宛先は「店舗オーナー様」とし、提出者である「沖田」が直接語りかけるような、丁寧で温かみのある敬語（です・ます調）で記述してください。
2. お客様の現状の努力を否定せず、まずは承認と共感から入ってください。
3. 専門用語は避け、店舗オーナーが直感的に理解できる優しい言葉を使用してください。

# 出力形式（必ず以下の4つの見出しに沿って、具体的な改善案を記載してください）
1. 魅力と効率を両立する「シネマティックWebサイト」の可能性
（データをもとに、お店の空気感を伝える映像の重要性と、自動予約やFAQ導入で電話対応などの負担がどう減るかを提示）

2. スタッフに無理をさせない「客単価アップ」のメニュー設計
（「主力商品」と「平均客単価」のデータから、無理なく客単価が上がる具体的な「松竹梅のセットメニュー案」と、スタッフの自然な一言添えのトークを提示）

3. 広告費に頼らない「Google口コミ」の資産化
（「待ち時間が発生するタイミング」と「口コミの現状」のデータを掛け合わせ、その隙間時間を使ってスタッフが自然に口コミをお願いできる具体的なトークスクリプトを提示）

4. 事務作業を自動化し「接客に集中できる」現場作りと、今後のサポート
（「現場のストレス」データをもとに、事務作業（LINE連携やデジタルツール導入など）を自動化することで、接客（挨拶や清掃などのホスピタリティ）に集中できる環境が作れることを提示。最後に「このレポートの続きや、地域No.1の繁盛店を作るためのさらに深いお話は、ぜひ一度オンラインでさせてください」と優しく締めくくる）
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