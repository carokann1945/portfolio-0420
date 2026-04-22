import { Resend } from 'resend';

import { CONTACT_EMAIL } from '@/features/contact/data/contact';

export const runtime = 'nodejs';

const DEFAULT_SUBJECT = '포트폴리오 문의';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 5000,
} as const;

type ContactPayload = {
  email: string;
  message: string;
  name: string;
  subject: string;
  website: string;
};

type ContactResponse = { ok: true } | { ok: false; message: string };

function createResponse(body: ContactResponse, init?: ResponseInit) {
  return Response.json(body, init);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function parsePayload(body: unknown): ContactPayload {
  const record = isRecord(body) ? body : {};

  return {
    email: readString(record.email),
    message: readString(record.message),
    name: readString(record.name),
    subject: readString(record.subject) || DEFAULT_SUBJECT,
    website: readString(record.website),
  };
}

function validatePayload(payload: ContactPayload) {
  if (!payload.name || !payload.email || !payload.message) {
    return '이름 · 이메일 · 메시지를 채워주세요.';
  }

  if (payload.name.length > LIMITS.name) {
    return `이름은 ${LIMITS.name}자 이내로 입력해주세요.`;
  }

  if (payload.email.length > LIMITS.email || !EMAIL_PATTERN.test(payload.email)) {
    return '이메일 형식을 확인해주세요.';
  }

  if (payload.subject.length > LIMITS.subject) {
    return `제목은 ${LIMITS.subject}자 이내로 입력해주세요.`;
  }

  if (payload.message.length > LIMITS.message) {
    return `메시지는 ${LIMITS.message}자 이내로 입력해주세요.`;
  }

  return null;
}

function getMailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const fromName = process.env.CONTACT_FROM_NAME?.trim() || 'Portfolio Contact';
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || CONTACT_EMAIL;

  if (!apiKey || !fromEmail || !EMAIL_PATTERN.test(fromEmail) || !EMAIL_PATTERN.test(toEmail)) {
    return null;
  }

  return {
    apiKey,
    from: `${fromName.replace(/[<>]/g, '')} <${fromEmail}>`,
    to: toEmail,
  };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char] ?? char;
  });
}

function formatMessage(payload: ContactPayload, receivedAt: string) {
  return [
    `이름: ${payload.name}`,
    `이메일: ${payload.email}`,
    `제목: ${payload.subject}`,
    `수신 시각: ${receivedAt}`,
    '',
    payload.message,
  ].join('\n');
}

function formatHtmlMessage(payload: ContactPayload, receivedAt: string) {
  const lines = [
    ['이름', payload.name],
    ['이메일', payload.email],
    ['제목', payload.subject],
    ['수신 시각', receivedAt],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">포트폴리오 문의</h2>
      <dl>
        ${lines
          .map(
            ([label, value]) => `
              <dt style="font-weight: 700;">${escapeHtml(label)}</dt>
              <dd style="margin: 0 0 12px;">${escapeHtml(value)}</dd>
            `,
          )
          .join('')}
      </dl>
      <div style="white-space: pre-wrap; border-top: 1px solid #e5e7eb; margin-top: 20px; padding-top: 20px;">${escapeHtml(
        payload.message,
      )}</div>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return createResponse({ ok: false, message: '요청 형식을 확인해주세요.' }, { status: 400 });
  }

  const payload = parsePayload(body);

  if (payload.website) {
    return createResponse({ ok: true });
  }

  const validationMessage = validatePayload(payload);

  if (validationMessage) {
    return createResponse({ ok: false, message: validationMessage }, { status: 400 });
  }

  const mailConfig = getMailConfig();

  if (!mailConfig) {
    return createResponse({ ok: false, message: '메일 전송 설정을 확인해주세요.' }, { status: 500 });
  }

  const receivedAt = new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'Asia/Seoul',
  }).format(new Date());

  try {
    const resend = new Resend(mailConfig.apiKey);
    const { error } = await resend.emails.send({
      from: mailConfig.from,
      html: formatHtmlMessage(payload, receivedAt),
      replyTo: payload.email,
      subject: payload.subject,
      text: formatMessage(payload, receivedAt),
      to: mailConfig.to,
    });

    if (error) {
      console.error('Resend email send failed', error);
      return createResponse(
        { ok: false, message: '메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 502 },
      );
    }

    return createResponse({ ok: true });
  } catch (error) {
    console.error('Contact email route failed', error);
    return createResponse(
      { ok: false, message: '메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 502 },
    );
  }
}
