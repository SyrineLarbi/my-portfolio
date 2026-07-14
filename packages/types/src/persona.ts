export const PERSONAS = ['fullstack', 'data', 'manager'] as const
export type Persona = (typeof PERSONAS)[number]

export const personaMeta: Record<Persona, { label: string; subtitle: string }> = {
  fullstack: {
    label: 'Full-Stack Developer',
    subtitle: 'TypeScript · NestJS · Next.js · Prisma · BullMQ',
  },
  data: {
    label: 'Data Scientist',
    subtitle: 'Python · pandas · XGBoost · Claude · ETL',
  },
  manager: {
    label: 'Manager',
    subtitle: '4y8m at Jumia · KPIs · Process · Training',
  },
}