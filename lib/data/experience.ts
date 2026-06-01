type L = { pt: string; en: string }
type Exp = {
  company: string
  role: L
  period: L
  bullets: { pt: string[]; en: string[] }
  tech: string[]
}

export const experience: Exp[] = [
  {
    company: 'Freela Serviços',
    role: { pt: 'Tech Lead & Desenvolvedor Fullstack', en: 'Tech Lead & Fullstack Developer' },
    period: { pt: '2026 – Atual · Remoto', en: '2026 – Present · Remote' },
    bullets: {
      pt: [
        'Liderança técnica da plataforma: decisões de arquitetura, organização de branches e revisão de fluxos.',
        'Implementação de features em web, mobile e API; integração entre os times.',
        'Fluxos críticos: currículo do freelancer, ciclo de vida de vagas, pagamento e repasse.',
        'Code reviews, melhorias de UX/UI e responsividade.',
      ],
      en: [
        'Technical leadership of the platform: architecture decisions, branch organization and flow reviews.',
        'Feature delivery across web, mobile and API; cross-team integration.',
        'Critical flows: freelancer résumé, job lifecycle, payment and payout.',
        'Code reviews, UX/UI improvements and responsiveness.',
      ],
    },
    tech: ['TypeScript', 'NestJS', 'Next.js', 'React Native', 'Expo', 'Prisma', 'PostgreSQL'],
  },
  {
    company: 'REPARA+',
    role: { pt: 'Desenvolvedor Backend & Engenheiro de Software', en: 'Backend Developer & Software Engineer' },
    period: { pt: 'Ago 2025 – Jan 2026', en: 'Aug 2025 – Jan 2026' },
    bullets: {
      pt: [
        'Modelagem, planejamento e arquitetura completa do sistema.',
        'Liderança do desenvolvimento técnico e da API em Django.',
        'Pesquisa de modelo CNN para análise de feridas (em andamento / TCC).',
      ],
      en: [
        'System modeling, planning and full architecture.',
        'Led technical development and the Django backend API.',
        'Research on a CNN model for wound analysis (in progress / thesis).',
      ],
    },
    tech: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Docker'],
  },
  {
    company: 'TBL Project — UFRN',
    role: { pt: 'Desenvolvedor Fullstack', en: 'Fullstack Developer' },
    period: { pt: 'Mai 2025 – Jul 2025', en: 'May 2025 – Jul 2025' },
    bullets: {
      pt: [
        'API backend em Python sem frameworks (HTTP/roteamento próprios).',
        'Plataforma híbrida PWA em HTML/CSS/JS.',
        'Camadas de segurança, pentesting e deploy em servidor da universidade.',
      ],
      en: [
        'Backend API in pure Python with no frameworks (custom HTTP/routing).',
        'Hybrid PWA platform in HTML/CSS/JS.',
        'Security layers, pentesting and deployment to the university server.',
      ],
    },
    tech: ['Python', 'PWA', 'JavaScript', 'PostgreSQL', 'Pentest'],
  },
  {
    company: 'BaoBah — LABENS/UFRN',
    role: { pt: 'Desenvolvedor Backend', en: 'Backend Developer' },
    period: { pt: 'Ago 2024 – Fev 2025', en: 'Aug 2024 – Feb 2025' },
    bullets: {
      pt: [
        'Refatoração e otimização de rotas, views e serializers de APIs.',
        'Melhorias de lógica de negócio e estrutura.',
        'Melhorias de segurança aplicando conhecimentos de pentest.',
      ],
      en: [
        'Refactoring and optimization of API routes, views and serializers.',
        'Business logic and structure improvements.',
        'Security improvements applying pentesting knowledge.',
      ],
    },
    tech: ['Python', 'Django', 'DRF'],
  },
  {
    company: 'Byte Seridó Jr',
    role: { pt: 'Desenvolvedor Backend', en: 'Backend Developer' },
    period: { pt: 'Mar 2023 – Dez 2023', en: 'Mar 2023 – Dec 2023' },
    bullets: {
      pt: [
        'Sistemas reais para clientes com Django Rest Framework e Node.js.',
        'Versionamento com Git/GitHub e trabalho em equipe com SCRUM.',
      ],
      en: [
        'Real client systems with Django Rest Framework and Node.js.',
        'Version control with Git/GitHub and teamwork using SCRUM.',
      ],
    },
    tech: ['Django', 'DRF', 'Node.js', 'Git', 'SCRUM'],
  },
  {
    company: 'PNN',
    role: { pt: 'Analista de Sistemas', en: 'Systems Analyst' },
    period: { pt: 'Jul 2022 – Dez 2022', en: 'Jul 2022 – Dec 2022' },
    bullets: {
      pt: [
        'Revisão de processos de desenvolvimento e modelagem de banco/arquitetura.',
        'Documentação técnica e QA.',
      ],
      en: [
        'Development process review and database/architecture modeling.',
        'Technical documentation and QA.',
      ],
    },
    tech: ['Modelagem', 'QA', 'Documentação'],
  },
  {
    company: 'LIT — Plataforma de Acessibilidade',
    role: { pt: 'Game Designer & Desenvolvedor', en: 'Game Designer & Developer' },
    period: { pt: 'Mai 2021 – Dez 2021', en: 'May 2021 – Dec 2021' },
    bullets: {
      pt: [
        'Jogo em Unity (C#), design de níveis e storyboard.',
        'Integração com plataforma de acessibilidade para mobilidade reduzida.',
      ],
      en: [
        'Unity game (C#), level design and storyboard.',
        'Integration with an accessibility platform for reduced mobility.',
      ],
    },
    tech: ['Unity', 'C#', 'Game Design'],
  },
]
