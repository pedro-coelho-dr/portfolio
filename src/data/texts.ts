import type { PortfolioItem } from './projects'

export const texts: PortfolioItem[] = [
  {
    description: 'Philosophical reading of AI through Hannah Arendt — agents, identity, and what remains human.',
    eyebrow: 'essay',
    meta: ['AI', 'philosophy', 'agents'],
    title: 'Notes on AI',
    to: '/text/notes-on-ai',
    tone: 'pink',
  },
  {
    description: 'Web application pentest report — OWASP Top 10 identification, CWE mapping, CVSS scoring.',
    eyebrow: 'pentest report',
    meta: ['OWASP', 'web security', 'Burp Suite'],
    title: 'OWASP Juice Shop',
    to: '/text/juice-shop',
    tone: 'pink',
  },
  {
    description: 'Android pentest report — OWASP Mobile Top 10, dynamic analysis with Frida and MobSF.',
    eyebrow: 'mobile pentest',
    meta: ['Android', 'MobSF', 'Frida'],
    title: 'InsecureBankv2',
    to: '/text/insecurebankv2',
    tone: 'pink',
  },
]
