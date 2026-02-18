import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // 📩 1通目：あなた（沖田さん）宛て
    const toOwnerOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `【ポートフォリオ】${name}様よりお問い合わせ`,
      text: `
ポートフォリオサイトからお問い合わせがありました！

■お名前: ${name}
■メールアドレス: ${email}
■メッセージ:
${message}
      `,
    };

    // 📩 2通目：相手（お客様）宛て
    const toCustomerOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "【自動返信】お問い合わせありがとうございます",
      text: `
${name} 様

この度は、お問い合わせいただき誠にありがとうございます。
以下の内容でメッセージを承りました。

内容を確認次第、折り返しご連絡させていただきます。

--------------------------------------------------
■お問い合わせ内容:
${message}
--------------------------------------------------

※このメールは自動送信されています。

━━━━━━━━━━━━━━━━━━━━━━━━━━
OKITA WEB WORKS
Web Creator : 沖田
━━━━━━━━━━━━━━━━━━━━━━━━━━
      `,
    };

    // 2通とも送信！
    await transporter.sendMail(toOwnerOptions);
    await transporter.sendMail(toCustomerOptions);

    return NextResponse.json({ success: true, message: '送信成功' });
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json({ success: false, message: '送信失敗' }, { status: 500 });
  }
}