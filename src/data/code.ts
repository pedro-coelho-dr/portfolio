import type { PortfolioItem } from './projects'

export const code: PortfolioItem[] = [
  {
    description: 'Speech and text workflow prototype for transcription and language analysis.',
    eyebrow: 'applied AI',
    meta: ['NLP', 'audio', 'prototype'],
    title: 'Verbalyst',
    tone: 'amber',
  },
  {
    description: 'Machine learning intrusion detection study with compact feature pipelines.',
    eyebrow: 'ml security',
    meta: ['ML', 'IDS', 'Python'],
    title: 'ML-IDS',
    tone: 'red',
  },
  {
    description: 'Markdown output helper for turning rough notes into cleaner deliverables.',
    eyebrow: 'writing tool',
    meta: ['Markdown', 'CLI', 'docs'],
    title: 'mdout',
  },
  {
    description: 'Benchmark harness for testing LLM behavior on spam classification tasks.',
    eyebrow: 'evaluation',
    meta: ['LLM', 'benchmark', 'data'],
    title: 'LLM Spam Benchmark',
  },
]
