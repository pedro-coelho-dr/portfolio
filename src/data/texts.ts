import type { PortfolioItem } from './projects'

export const texts: PortfolioItem[] = [
  {
    description: 'Short technical notes on model behavior, security posture, and applied use.',
    eyebrow: 'notes',
    meta: ['AI', 'security', 'research'],
    title: 'Notes on AI',
    tone: 'amber',
  },
  {
    description: 'Coursework report and observations from OWASP Juice Shop lab exercises.',
    eyebrow: 'lab report',
    meta: ['OWASP', 'web security', 'report'],
    title: 'OWASP Juice Shop',
    tone: 'red',
  },
  {
    description: 'Android security lab notes focused on weak patterns and remediation.',
    eyebrow: 'mobile lab',
    meta: ['Android', 'security', 'writeup'],
    title: 'InsecureBankv2',
  },
]
