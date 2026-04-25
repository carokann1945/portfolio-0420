'use client';

import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image, { type StaticImageData } from 'next/image';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import readmeIcon from '@/shared/assets/images/readme.svg';

import { cn } from '../../../shared/style/utils';

type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; markdown: string; baseUrl: string }
  | { status: 'error'; message: string };

interface GitHubReadmeResponse {
  content: string;
  encoding: string;
  name: string;
  download_url: string;
}

interface ReadmeButtonProps {
  repo?: string;
  githubHref?: string;
  className?: string;
  icon?: string | StaticImageData;
  label?: string;
}

interface MarkdownRendererProps {
  markdown: string;
  baseUrl: string;
}

function getCodeText(children: ReactNode) {
  if (Array.isArray(children)) return children.join('');
  return typeof children === 'string' ? children : '';
}

function getRepoFromGithubHref(githubHref?: string) {
  if (!githubHref) return null;

  try {
    const url = new URL(githubHref);
    if (url.hostname !== 'github.com') return null;

    const [owner, repoName] = url.pathname.split('/').filter(Boolean);
    if (!owner || !repoName) return null;

    return `${owner}/${repoName.replace(/\.git$/, '')}`;
  } catch {
    return null;
  }
}

function ButtonIcon({ icon }: { icon: string | StaticImageData }) {
  if (typeof icon === 'string') return <span aria-hidden="true">{icon}</span>;

  return <Image src={icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" unoptimized />;
}

function MarkdownRenderer({ markdown, baseUrl }: MarkdownRendererProps) {
  return (
    <div className="font-pretendard font-normal text-[#1a1a1a]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          table: ({ children }) => (
            <div className={cn('mb-3 overflow-x-auto')}>
              <table className={cn('w-full border-collapse text-sm')}>{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className={cn('bg-gray-100 text-gray-700')}>{children}</thead>,
          tbody: ({ children }) => <tbody className={cn('divide-y divide-gray-200')}>{children}</tbody>,
          tr: ({ children }) => <tr>{children}</tr>,
          th: ({ children }) => (
            <th className={cn('border border-gray-200 px-3 py-2 text-left font-semibold')}>{children}</th>
          ),
          td: ({ children }) => <td className={cn('border border-gray-200 px-3 py-2 text-gray-700')}>{children}</td>,
          h1: ({ children }) => (
            <h1 className={cn('mt-1 border-b border-gray-400 pb-3 text-2xl font-bold text-gray-800')}>{children}</h1>
          ),
          h2: ({ children }) => <h2 className={cn('mt-4 mb-4 text-xl font-bold')}>{children}</h2>,
          h3: ({ children }) => <h3 className={cn('mt-3 mb-2 text-base font-semibold')}>{children}</h3>,
          p: ({ children }) => <p className={cn('mb-3 text-base leading-7')}>{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('text-blue-600 underline underline-offset-2 hover:text-blue-800')}>
              {children}
            </a>
          ),
          code: ({ children, className }) => {
            const isBlockCode = Boolean(className?.includes('language-')) || getCodeText(children).includes('\n');

            if (isBlockCode) {
              return <code className={cn(className)}>{children}</code>;
            }

            return <code className={cn('rounded bg-gray-100 px-1 py-0.5 text-sm text-gray-800')}>{children}</code>;
          },
          pre: ({ children }) => (
            <pre className={cn('mb-3 overflow-x-auto rounded-md bg-gray-100 p-4 text-sm text-gray-800')}>
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className={cn('mb-3 list-disc space-y-1 pl-5 text-base text-gray-700')}>{children}</ul>
          ),
          ol: ({ children, className, node, ...props }) => {
            void node;

            return (
              <ol {...props} className={cn('mb-3 list-decimal space-y-1 pl-5 text-base text-gray-700', className)}>
                {children}
              </ol>
            );
          },
          hr: () => <hr className={cn('my-4 border-gray-200')} />,
          img: ({ src, alt }) => {
            const resolvedSrc =
              typeof src === 'string' && !src.startsWith('http')
                ? new URL(src, baseUrl).href
                : (src as string | undefined);
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={resolvedSrc} alt={alt ?? ''} className={cn('my-2 max-w-full rounded-md')} />;
          },
        }}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export function ReadmeButton({ repo, githubHref, className, icon, label = 'README' }: ReadmeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fetchState, setFetchState] = useState<FetchState>({ status: 'idle' });
  const hasFetched = useRef(false);
  const previousBodyOverflow = useRef<string | null>(null);
  const pushedModalHistoryRef = useRef(false);
  const resolvedRepo = repo ?? getRepoFromGithubHref(githubHref);
  const buttonIcon = icon ?? readmeIcon;

  const fetchReadme = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setFetchState({ status: 'loading' });
    try {
      if (!resolvedRepo) throw new Error('GitHub repo URL is missing');

      const res = await fetch(`https://api.github.com/repos/${resolvedRepo}/readme`, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data: GitHubReadmeResponse = await res.json();
      const binary = atob(data.content.replace(/\n/g, ''));
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const markdown = new TextDecoder('utf-8').decode(bytes);
      const baseUrl = data.download_url.substring(0, data.download_url.lastIndexOf('/') + 1);
      setFetchState({ status: 'success', markdown, baseUrl });
    } catch (err) {
      hasFetched.current = false;
      setFetchState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Failed to load README',
      });
    }
  }, [resolvedRepo]);

  const handleOpen = () => {
    setIsOpen(true);
    fetchReadme();
  };

  const closeModal = useCallback(({ syncHistory }: { syncHistory: boolean }) => {
    setIsOpen(false);

    if (syncHistory && pushedModalHistoryRef.current) {
      pushedModalHistoryRef.current = false;
      window.history.back();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // 배경 스크롤 잠금
    previousBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 뒤로가기 감지를 위한 히스토리 엔트리 추가
    window.history.pushState({ readmeModal: true }, '', window.location.href);
    pushedModalHistoryRef.current = true;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal({ syncHistory: true });
    };
    const handlePopstate = () => {
      pushedModalHistoryRef.current = false;
      closeModal({ syncHistory: false });
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      document.body.style.overflow = previousBodyOverflow.current ?? '';
      previousBodyOverflow.current = null;
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [closeModal, isOpen]);

  const modal =
    typeof document === 'undefined'
      ? null
      : createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="readme-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => closeModal({ syncHistory: true })}
                className={cn('fixed inset-0 z-[100] h-dvh overflow-y-auto', 'bg-black/30 backdrop-blur-sm')}>
                <div className={cn('flex min-h-dvh items-start justify-center', 'px-4 py-8')}>
                  <motion.div
                    key="readme-panel"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className={cn(
                      'relative w-full max-w-[800px]',
                      'flex flex-col',
                      'rounded-lg bg-white',
                      'overflow-hidden shadow-xl',
                    )}>
                    <div
                      className={cn(
                        'w-full',
                        'flex items-center justify-between',
                        'px-5 py-4',
                        'bg-[#222]',
                        'shrink-0',
                      )}>
                      <span className={cn('font-semibold text-white')}>README.md</span>
                      <button
                        onClick={() => closeModal({ syncHistory: true })}
                        aria-label="Close README"
                        className={cn(
                          'flex items-center justify-center',
                          'h-7 w-7 rounded-md',
                          'text-gray-400 hover:text-gray-100',
                          'cursor-pointer',
                        )}>
                        <X size={25} />
                      </button>
                    </div>

                    <div className={cn('px-6 py-5')}>
                      {fetchState.status === 'loading' && (
                        <div className={cn('flex items-center justify-center py-16 text-gray-400')}>Loading…</div>
                      )}
                      {fetchState.status === 'error' && (
                        <div className={cn('py-8 text-center text-sm text-red-500')}>{fetchState.message}</div>
                      )}
                      {fetchState.status === 'success' && (
                        <MarkdownRenderer markdown={fetchState.markdown} baseUrl={fetchState.baseUrl} />
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        );

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={cn('flex items-center justify-center gap-[4px]', className)}>
        <ButtonIcon icon={buttonIcon} />
        <span>{label}</span>
      </button>
      {modal}
    </>
  );
}
