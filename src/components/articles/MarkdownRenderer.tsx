'use client';

import React, { useMemo } from 'react';
import { marked } from 'marked';
import { slugify } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = useMemo(() => {
    if (!content) return '';

    // Custom renderer for marked to assign slugified IDs to headings
    const renderer = new marked.Renderer();

    renderer.heading = ({ tokens, depth }) => {
      const text = tokens.map((t) => ('text' in t ? t.text : '')).join('');
      const cleanText = text.replace(/[*_`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      const id = slugify(cleanText);

      return `<h${depth} id="${id}" class="heading-anchor group">${text} <a href="#${id}" class="opacity-0 group-hover:opacity-100 text-amber-400 text-sm ml-1 transition" aria-hidden="true">#</a></h${depth}>`;
    };

    // Style links
    renderer.link = ({ href, title, tokens }) => {
      const text = tokens.map((t) => ('text' in t ? t.text : '')).join('');
      const isExternal = href.startsWith('http') || href.startsWith('/go/');
      const target = isExternal ? ' target="_blank" rel="nofollow noopener noreferrer"' : '';
      const titleAttr = title ? ` title="${title}"` : '';
      return `<a href="${href}"${titleAttr}${target} class="text-amber-400 hover:text-amber-300 font-semibold underline decoration-amber-400/40 hover:decoration-amber-400 underline-offset-4">${text}</a>`;
    };

    marked.setOptions({
      renderer,
      gfm: true,
      breaks: true,
    });

    return marked.parse(content) as string;
  }, [content]);

  return (
    <div
      className="prose-custom max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
