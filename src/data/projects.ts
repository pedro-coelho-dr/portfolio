export type PortfolioItem = {
  description: string
  eyebrow: string
  meta: string[]
  title: string
  to?: string
  tone?: 'amber' | 'neutral' | 'red'
}

export const projects: PortfolioItem[] = [
  {
    description: 'Deliberately vulnerable Flask lab for practicing web exploitation.',
    eyebrow: 'vulnerable lab',
    meta: ['Flask', 'Python', 'Docker'],
    title: 'GLHF',
    to: '/project/glhf',
    tone: 'red',
  },
  {
    description: 'Compact tracker concept for CVE triage, notes, and remediation context.',
    eyebrow: 'security tooling',
    meta: ['CVE', 'triage', 'research'],
    title: 'CVE Tracker',
    tone: 'amber',
  },
  {
    description: 'Network probe experiment for host checks, service hints, and lab notes.',
    eyebrow: 'network lab',
    meta: ['Python', 'CLI', 'networking'],
    title: 'NetProbe',
  },
  {
    description: 'Operational notes and scripts for controlled red-team style exercises.',
    eyebrow: 'lab operations',
    meta: ['ops', 'scripts', 'reports'],
    title: 'RedOps',
  },
]
