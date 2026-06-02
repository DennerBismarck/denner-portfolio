type L = { pt: string; en: string }
export const skills: { label: L; items: string[] }[] = [
  { label: { pt: 'Linguagens', en: 'Languages' }, items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'C#'] },
  { label: { pt: 'Frameworks', en: 'Frameworks' }, items: ['React', 'React Native', 'Next.js', 'NestJS', 'Node.js', 'Django', 'DRF', 'FastAPI', 'Expo', 'Spring'] },
  { label: { pt: 'Arquitetura', en: 'Architecture' }, items: ['REST APIs', 'Clean Architecture', 'Hexagonal', 'DDD', 'CQRS', 'Monólito Modular'] },
  { label: { pt: 'Banco de Dados', en: 'Databases' }, items: ['PostgreSQL', 'MySQL', 'Redis', 'Prisma'] },
  { label: { pt: 'DevOps', en: 'DevOps' }, items: ['Docker', 'CI/CD', 'Git', 'GitHub', 'Vercel'] },
  { label: { pt: 'Segurança', en: 'Security' }, items: ['Pentesting', 'Segurança de Aplicações Web'] },
  { label: { pt: 'IA', en: 'AI' }, items: ['Redes Neurais Convolucionais', 'Processamento de Imagens'] },
  { label: { pt: 'Liderança Técnica', en: 'Tech Leadership' }, items: ['Tech Lead', 'Code Review', 'Revisão de Arquitetura'] },
]
