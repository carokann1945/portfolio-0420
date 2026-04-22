'use client';

import { type FormEvent, useState } from 'react';

import { cn } from '@/shared/style/utils';

type FormStatus = { message: string; tone: 'idle' | 'error' | 'info' | 'success' };

type ContactResponse = { ok: true } | { ok: false; message?: string };

function getResponseMessage(data: unknown) {
  if (typeof data !== 'object' || data === null || !('message' in data)) {
    return '메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
  }

  const message = data.message;
  return typeof message === 'string' && message ? message : '메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ message: '', tone: 'idle' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const subject = String(formData.get('subject') ?? '').trim() || '포트폴리오 문의';
    const message = String(formData.get('message') ?? '').trim();
    const website = String(formData.get('website') ?? '').trim();

    if (!name || !email || !message) {
      setStatus({ message: '이름 · 이메일 · 메시지를 채워주세요.', tone: 'error' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: '메일을 보내는 중입니다.', tone: 'info' });

    try {
      const response = await fetch('/api/contact', {
        body: JSON.stringify({ email, message, name, subject, website }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const data: unknown = await response.json().catch(() => null);

      if (!response.ok || !(data as ContactResponse | null)?.ok) {
        setStatus({ message: getResponseMessage(data), tone: 'error' });
        return;
      }

      form.reset();
      setStatus({ message: '메일이 전송되었습니다. 확인 후 답장드릴게요.', tone: 'success' });
    } catch {
      setStatus({ message: '네트워크 상태를 확인한 뒤 다시 시도해주세요.', tone: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = cn(
    'h-12 border border-white/15 bg-white/[0.03] px-3 text-[15px] text-white placeholder-white/30',
    'outline-none focus:border-accent',
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-jetbrains-mono text-[10px] tracking-[0.24em] text-white/50">NAME</span>
          <input name="name" type="text" required placeholder="이름" className={inputCls} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-jetbrains-mono text-[10px] tracking-[0.24em] text-white/50">EMAIL</span>
          <input name="email" type="email" required placeholder="you@domain.com" className={inputCls} />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-jetbrains-mono text-[10px] tracking-[0.24em] text-white/50">SUBJECT</span>
        <input name="subject" type="text" placeholder="제목" className={inputCls} />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-jetbrains-mono text-[10px] tracking-[0.24em] text-white/50">MESSAGE</span>
        <textarea
          name="message"
          rows={6}
          required
          placeholder="편하게 남겨주세요."
          className={cn(
            'resize-y border border-white/15 bg-white/[0.03] p-3 text-[15px] leading-[1.7] text-white placeholder-white/30',
            'outline-none focus:border-accent',
          )}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={cn(
            'inline-flex cursor-pointer items-center gap-2 bg-accent px-5 py-3 text-[14px] font-semibold text-black',
            'transition-transform hover:-translate-y-0.5 md:text-[15px]',
            'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0',
          )}>
          {isSubmitting ? '전송 중' : '메일 보내기'} <span aria-hidden="true">→</span>
        </button>
        <span
          role="status"
          aria-live="polite"
          className={cn(
            'font-jetbrains-mono text-[11px] tracking-[0.14em]',
            status.tone === 'error' && 'text-[#ffb4b4]',
            status.tone === 'success' && 'text-accent',
            (status.tone === 'idle' || status.tone === 'info') && 'text-white/50',
          )}>
          {status.message}
        </span>
      </div>

      <p className="font-jetbrains-mono text-[11px] leading-[1.7] text-white/40">
        전송 버튼을 누르면 입력한 내용이 포트폴리오 문의 메일로 전송됩니다.
      </p>
    </form>
  );
}
