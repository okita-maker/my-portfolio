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
・店舗名：${data.storeName}
・業種：${data.industry}
・主力商品（看板メニュー）：${data.mainProduct}
・現在の平均客単価：${data.averageSpend}
・集客や売上の悩み：${data.mainWorry}
・現場のストレス：${data.operationStress}
・待ち時間が発生するタイミング：${data.waitingTime}
・Google口コミの現状と悩み：${data.googleReviewStatus}
・Google口コミの現在の評価点：${data.googleReviewScore}
・Webサイトや自動化への意識：${data.webAutomation}
・理想の成長方向：${data.targetCustomer}
・店舗URL：${data.url}

# 沖田（あなた）が提供できる4つのコア価値
以下の4つから、クライアントの悩みを解決するのに最適なものを組み合わせて提案してください。すべてを無理に使う必要はありません。
1. シネマティックな映像・画像制作と、機能的なWebサイトの構築（価値を正しく伝え、期待値を高める）
2. Google口コミの資産化（待ち時間を活用した自然な声かけ、卓上POP、広告費削減）
3. 事務作業の自動化（Webツール導入による電話対応等の削減、スタッフの負担軽減）
4. 伴走型のコンサルティング（松竹梅メニューによる自然な単価アップ、ABC理論による現場のストレスフリー環境構築）

# 出力条件（厳守するトーン＆マナー）
1. 宛先は「${data.storeName} オーナー様」とし、提出者である「沖田」が直接語りかけるような、丁寧で温かみのある敬語（です・ます調）で記述してください。
2. 【最重要】相手の回答や理想（例：単価を維持したい等）を絶対に頭ごなしに否定しないでください。まずは現状の努力と想いに深く共感・承認し、その上で「こちらの方法を取り入れると、さらにオーナー様の理想に近づきやすくなります」という寄り添う姿勢で提案してください。
3. 解決策を提示する際は、「なぜそれが有効なのか」というプロとしての根拠（客観的理由や心理学など）を優しく添えてください。

# レポート構成
以下の構成で出力してください。見出しのタイトルはクライアントの悩みに合わせて魅力的にアレンジしてください。

■ はじめに
（ご挨拶と、アンケートから読み取れる店舗の強みやオーナーの努力に対する心からの承認）

■ 現状の課題と目指すべき方向性
（アンケートの「悩み」「ストレス」「理想の成長方向」から、現在お店で起きている課題の本質をプロの視点で優しく言語化する）

■ 【店舗名】様への具体的な改善アプローチ（2〜3つ程度）
（上記の「沖田が提供できる4つのコア価値」の中から、クライアントの課題解決に直結するものをピックアップし、具体的な解決策と根拠を提示する。※口コミ依頼は必ず「体験後」とすること。※単価アップを提案する場合は、売り込みではなく「顧客満足度を高める選択肢（松竹梅）」として提案すること。）

■ おわりに
（「このレポートの続きや、地域No.1の繁盛店を作るためのさらに深いお話は、ぜひ一度オンラインでさせてください」と優しく締めくくる）
`;

    const toOwnerOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `【無料診断依頼】${data.storeName} (${data.industry})様より`,
      text: `
診断フォームから新しい依頼がありました！

【連絡先情報】
・店舗名：${data.storeName}
・送付先メールアドレス：${data.email}

以下のプロンプトをコピーして、Geminiに入力し、お客様に提出する診断レポートを作成してください。
作成したレポートは、上記のメールアドレス宛にお送りください。

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