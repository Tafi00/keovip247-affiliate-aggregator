'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQ } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org FAQPage structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="w-full my-12">
      {/* Inject JSON-LD Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Giải Đáp Thắc Mắc
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Câu Hỏi Thường Gặp (FAQ)
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2">
          Tổng hợp câu hỏi và giải đáp chi tiết về tiêu chí đánh giá, đăng ký và bảo mật cá cược trực tuyến.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.id || index}
              className={cn(
                'rounded-xl border transition-all duration-200 overflow-hidden',
                isOpen
                  ? 'bg-slate-900 border-amber-400/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              )}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full py-4 px-5 flex items-center justify-between gap-4 text-left transition"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle
                    className={cn(
                      'w-5 h-5 flex-shrink-0 transition-colors',
                      isOpen ? 'text-amber-400' : 'text-slate-500'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm sm:text-base font-bold transition-colors',
                      isOpen ? 'text-white' : 'text-slate-300'
                    )}
                  >
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200',
                    isOpen && 'transform rotate-180 text-amber-400'
                  )}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
