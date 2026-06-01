# Portfólio Denner França — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um site de portfólio pessoal bilíngue (PT/EN), tema escuro + roxo, em Next.js, com seções Hero/Sobre/Experiência/Projetos(modal)/Skills/Interesses/Contato, pronto pra deploy na Vercel.

**Architecture:** Next.js App Router + TypeScript, 100% estático (SSG, sem backend). Conteúdo e strings centralizados em `lib/data/*` e `lib/i18n.ts`; cada seção é um componente isolado que consome esses dados. Idioma via Context (`useLang`) com persistência em localStorage. Estilo com Tailwind + CSS variables de tema; animações sutis com framer-motion respeitando `prefers-reduced-motion`.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, framer-motion, lucide-react, next/font. Testes: Vitest + @testing-library/react para integridade de dados e smoke tests.

**Referência:** spec em `docs/superpowers/specs/2026-06-01-portfolio-denner-design.md`.

**Assets já no repo:** `public/denner.jpg` (foto), `public/cv/denner-franca-pt.pdf`, `public/cv/denner-franca-en.pdf`.

**Convenção de cores (tokens):**
- `bg` `#0b1120` · `surface` `#0f172a` · `surface-2` `#1e293b` · `border` `#243049`
- `text` `#f1f5f9` · `muted` `#cbd5e1` · `muted-2` `#94a3b8`
- `accent` `#9333ea` · `accent-bright` `#a855f7` · `accent-soft` `#c084fc`

---

## Task 1: Scaffold do projeto Next.js

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `app/`, etc. (via create-next-app)

- [ ] **Step 1: Gerar o projeto Next.js na pasta atual**

O repo `portfolio/` já existe (git + `public/` + `docs/`). Gerar o Next dentro dele:

Run:
```bash
cd /home/doutor/coding/portfolio
npx --yes create-next-app@latest . --ts --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack --yes
```
Expected: scaffolding criado. Se o CLI reclamar de diretório não-vazio, confirmar manter os arquivos existentes (`public/`, `docs/`, `.git`). Se ele recusar, gerar em `/tmp/pf` e copiar os arquivos gerados (exceto `public/` e `.git`) para cá.

- [ ] **Step 2: Instalar dependências adicionais**

Run:
```bash
cd /home/doutor/coding/portfolio
npm install framer-motion lucide-react
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```
Expected: instala sem erros.

- [ ] **Step 3: Verificar build inicial**

Run: `cd /home/doutor/coding/portfolio && npm run build`
Expected: build do template padrão passa (PASS). 

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js + Tailwind + deps"
```

---

## Task 2: Configurar Vitest

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (script `test`)

- [ ] **Step 1: Criar `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
})
```

- [ ] **Step 2: Criar `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 3: Adicionar script em `package.json`**

Em `"scripts"`, adicionar: `"test": "vitest run"`.

- [ ] **Step 4: Smoke test do runner**

Create `lib/__tests__/sanity.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
describe('sanity', () => { it('runs', () => { expect(1 + 1).toBe(2) }) })
```
Run: `npm test`
Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: configurar Vitest + Testing Library"
```

---

## Task 3: Tema, fontes e estilos globais

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Estender o tema no `tailwind.config.ts`**

No `theme.extend`, adicionar as cores e fontes:
```ts
extend: {
  colors: {
    bg: '#0b1120', surface: '#0f172a', 'surface-2': '#1e293b', borderc: '#243049',
    text: '#f1f5f9', muted: '#cbd5e1', 'muted-2': '#94a3b8',
    accent: '#9333ea', 'accent-bright': '#a855f7', 'accent-soft': '#c084fc',
  },
  fontFamily: {
    sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    display: ['var(--font-display)', 'system-ui', 'sans-serif'],
  },
},
```
Garantir que `content` inclui `./app/**/*.{ts,tsx}` e `./components/**/*.{ts,tsx}`.

- [ ] **Step 2: Definir `app/globals.css`**

Substituir o conteúdo por:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: dark; }
html { scroll-behavior: smooth; }
body { background-color: #0b1120; color: #f1f5f9; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
}

.bg-grid {
  background-image: radial-gradient(rgba(147,51,234,.08) 1px, transparent 1px);
  background-size: 22px 22px;
}
```

- [ ] **Step 3: Carregar fontes via `next/font` no `app/layout.tsx`**

```tsx
import { Inter, Sora } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const display = Sora({ subsets: ['latin'], weight: ['600','700','800'], variable: '--font-display' })
```
Aplicar `className={`${inter.variable} ${display.variable} font-sans antialiased bg-bg text-text`}` no `<body>`.

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: tema escuro + roxo, fontes e estilos globais"
```

---

## Task 4: Dados de perfil (`lib/data/profile.ts`)

**Files:**
- Create: `lib/data/profile.ts`
- Test: `lib/__tests__/profile.test.ts`

- [ ] **Step 1: Escrever o teste de integridade**

```ts
import { describe, it, expect } from 'vitest'
import { profile } from '@/lib/data/profile'

describe('profile', () => {
  it('tem contatos essenciais', () => {
    expect(profile.email).toContain('@')
    expect(profile.github).toMatch(/github\.com/)
    expect(profile.linkedin).toMatch(/linkedin\.com/)
    expect(profile.whatsapp).toMatch(/^\+?\d/)
    expect(profile.cv.pt).toMatch(/\.pdf$/)
    expect(profile.cv.en).toMatch(/\.pdf$/)
  })
  it('tem 3 métricas', () => { expect(profile.metrics).toHaveLength(3) })
})
```

- [ ] **Step 2: Rodar o teste (deve falhar)**

Run: `npm test -- profile`
Expected: FAIL (módulo não existe).

- [ ] **Step 3: Criar `lib/data/profile.ts`**

```ts
export const profile = {
  name: 'Denner França',
  fullName: 'Denner Bismarck de Lucena França',
  location: { pt: 'Rio Grande do Norte, Brasil', en: 'Rio Grande do Norte, Brazil' },
  email: 'dennerbismarck@gmail.com',
  whatsapp: '+5584996973162',
  github: 'https://github.com/DennerBismarck',
  linkedin: 'https://www.linkedin.com/in/denner-bismarck-de-lucena-fran%C3%A7a-35a091244',
  photo: '/denner.jpg',
  cv: { pt: '/cv/denner-franca-pt.pdf', en: '/cv/denner-franca-en.pdf' },
  // Métricas do hero — Denner pode ajustar os valores
  metrics: [
    { value: '5+', label: { pt: 'anos codando', en: 'years coding' } },
    { value: '15+', label: { pt: 'projetos', en: 'projects' } },
    { value: 'TS · Python', label: { pt: 'stack principal', en: 'main stack' } },
  ],
} as const
```

- [ ] **Step 4: Rodar o teste (deve passar)**

Run: `npm test -- profile`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: dados de perfil"
```

---

## Task 5: i18n — dicionário e provider (`lib/i18n.ts`)

**Files:**
- Create: `lib/i18n.ts`
- Test: `lib/__tests__/i18n.test.ts`

- [ ] **Step 1: Escrever o teste de completude**

```ts
import { describe, it, expect } from 'vitest'
import { dict } from '@/lib/i18n'

describe('i18n', () => {
  it('pt e en têm exatamente as mesmas chaves', () => {
    const pt = Object.keys(dict.pt).sort()
    const en = Object.keys(dict.en).sort()
    expect(pt).toEqual(en)
  })
  it('nenhum valor está vazio', () => {
    for (const lang of ['pt','en'] as const)
      for (const [k, v] of Object.entries(dict[lang]))
        expect(v, `${lang}.${k}`).toBeTruthy()
  })
})
```

- [ ] **Step 2: Rodar o teste (deve falhar)**

Run: `npm test -- i18n`
Expected: FAIL.

- [ ] **Step 3: Criar `lib/i18n.ts`**

```ts
'use client'
import { createContext, useContext } from 'react'

export type Lang = 'pt' | 'en'

export const dict = {
  pt: {
    'nav.about': 'Sobre', 'nav.experience': 'Experiência', 'nav.projects': 'Projetos',
    'nav.skills': 'Skills', 'nav.contact': 'Contato', 'nav.downloadCv': 'Baixar CV',
    'hero.eyebrow': 'Tech Lead & Fullstack Engineer',
    'hero.title': 'Construo software robusto, escalável e que resolve problema de verdade.',
    'hero.subtitle': 'Liderança técnica, arquitetura e entrega — de APIs e backends a web e mobile. Pragmático, direto e de bom humor.',
    'hero.ctaProjects': 'Ver projetos', 'hero.ctaCv': 'Baixar CV',
    'about.title': 'Sobre mim',
    'about.p1': 'Sou Denner, dev fullstack e tech lead de Caicó, no Rio Grande do Norte. Vim do Técnico em Informática no IFRN e hoje curso Sistemas de Informação na UFRN. No meio do caminho descobri que o que mais me empolga é desenhar a arquitetura de um sistema e ver ele aguentar o mundo real.',
    'about.p2': 'Trabalho principalmente com TypeScript e Python — React, React Native, Next.js, NestJS, Django — sempre com olho em arquitetura limpa (DDD, hexagonal, monólito modular), segurança e boas práticas. Gosto de comunicação clara, decisão pragmática e de resolver o problema certo, não o mais bonito.',
    'experience.title': 'Experiência',
    'experience.present': 'Atual',
    'projects.title': 'Projetos',
    'projects.subtitle': 'Clique num card para ver o case completo: contexto, arquitetura e decisões.',
    'projects.role': 'Meu papel', 'projects.context': 'Contexto', 'projects.architecture': 'Arquitetura & decisões',
    'projects.highlights': 'Destaques técnicos', 'projects.stack': 'Stack', 'projects.viewGithub': 'Ver no GitHub',
    'projects.close': 'Fechar', 'projects.moreOnGithub': 'Mais projetos no GitHub',
    'skills.title': 'Competências',
    'interests.title': 'Além do código',
    'interests.subtitle': 'Porque dev também é gente.',
    'contact.title': 'Vamos conversar',
    'contact.subtitle': 'Aberto a oportunidades — CLT, PJ ou remoto internacional. Me chama.',
    'contact.email': 'E-mail', 'contact.whatsapp': 'WhatsApp',
    'footer.built': 'Feito com Next.js, Tailwind e bastante roxo.',
    'footer.rights': 'Todos os direitos reservados.',
  },
  en: {
    'nav.about': 'About', 'nav.experience': 'Experience', 'nav.projects': 'Projects',
    'nav.skills': 'Skills', 'nav.contact': 'Contact', 'nav.downloadCv': 'Download CV',
    'hero.eyebrow': 'Tech Lead & Fullstack Engineer',
    'hero.title': 'I build robust, scalable software that solves real problems.',
    'hero.subtitle': 'Technical leadership, architecture and delivery — from APIs and backends to web and mobile. Pragmatic, direct and good-humored.',
    'hero.ctaProjects': 'View projects', 'hero.ctaCv': 'Download CV',
    'about.title': 'About me',
    'about.p1': "I'm Denner, a fullstack developer and tech lead from Caicó, in Rio Grande do Norte, Brazil. I started with a Technical Degree in IT at IFRN and I'm now studying Information Systems at UFRN. Along the way I found out what excites me most: designing a system's architecture and watching it hold up in the real world.",
    'about.p2': 'I work mainly with TypeScript and Python — React, React Native, Next.js, NestJS, Django — always with an eye on clean architecture (DDD, hexagonal, modular monolith), security and best practices. I value clear communication, pragmatic decisions, and solving the right problem rather than the prettiest one.',
    'experience.title': 'Experience',
    'experience.present': 'Present',
    'projects.title': 'Projects',
    'projects.subtitle': 'Click a card for the full case: context, architecture and decisions.',
    'projects.role': 'My role', 'projects.context': 'Context', 'projects.architecture': 'Architecture & decisions',
    'projects.highlights': 'Technical highlights', 'projects.stack': 'Stack', 'projects.viewGithub': 'View on GitHub',
    'projects.close': 'Close', 'projects.moreOnGithub': 'More projects on GitHub',
    'skills.title': 'Skills',
    'interests.title': 'Beyond the code',
    'interests.subtitle': 'Because devs are people too.',
    'contact.title': "Let's talk",
    'contact.subtitle': 'Open to opportunities — full-time, contract or international remote. Reach out.',
    'contact.email': 'Email', 'contact.whatsapp': 'WhatsApp',
    'footer.built': 'Built with Next.js, Tailwind and a lot of purple.',
    'footer.rights': 'All rights reserved.',
  },
} as const

export type DictKey = keyof typeof dict.pt

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: DictKey) => string }>({
  lang: 'pt', setLang: () => {}, t: (k) => k,
})

export function useLang() { return useContext(LangContext) }

export { LangContext }
```

- [ ] **Step 4: Rodar o teste (deve passar)**

Run: `npm test -- i18n`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: dicionário i18n PT/EN + contexto de idioma"
```

---

## Task 6: Provider de idioma (`components/LangProvider.tsx`)

**Files:**
- Create: `components/LangProvider.tsx`

- [ ] **Step 1: Criar o provider**

```tsx
'use client'
import { useEffect, useState, useCallback } from 'react'
import { LangContext, dict, type Lang, type DictKey } from '@/lib/i18n'

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt')

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('lang')) as Lang | null
    if (saved === 'pt' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', l)
      document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en'
    }
  }, [])

  const t = useCallback((k: DictKey) => dict[lang][k], [lang])

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}
```

- [ ] **Step 2: Embrulhar a app no `app/layout.tsx`**

Importar `LangProvider` e envolver `{children}` no `<body>`: `<LangProvider>{children}</LangProvider>`.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: LangProvider com persistência de idioma"
```

---

## Task 7: Dados de experiência (`lib/data/experience.ts`)

**Files:**
- Create: `lib/data/experience.ts`
- Test: `lib/__tests__/experience.test.ts`

- [ ] **Step 1: Escrever o teste**

```ts
import { describe, it, expect } from 'vitest'
import { experience } from '@/lib/data/experience'

describe('experience', () => {
  it('tem 7 cargos, todos bilíngues', () => {
    expect(experience).toHaveLength(7)
    for (const e of experience) {
      expect(e.role.pt && e.role.en).toBeTruthy()
      expect(e.bullets.pt.length).toBeGreaterThan(0)
      expect(e.bullets.en.length).toBe(e.bullets.pt.length)
      expect(e.tech.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Rodar (deve falhar)**

Run: `npm test -- experience`
Expected: FAIL.

- [ ] **Step 3: Criar `lib/data/experience.ts`**

```ts
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
```

- [ ] **Step 4: Rodar (deve passar)**

Run: `npm test -- experience`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: dados de experiência (timeline bilíngue)"
```

---

## Task 8: Dados de skills e interesses (`lib/data/skills.ts`, `lib/data/interests.ts`)

**Files:**
- Create: `lib/data/skills.ts`, `lib/data/interests.ts`
- Test: `lib/__tests__/skills.test.ts`

- [ ] **Step 1: Escrever o teste**

```ts
import { describe, it, expect } from 'vitest'
import { skills } from '@/lib/data/skills'
import { interests } from '@/lib/data/interests'

describe('skills & interests', () => {
  it('skills têm categorias com itens', () => {
    expect(skills.length).toBeGreaterThan(4)
    for (const c of skills) { expect(c.label.pt && c.label.en).toBeTruthy(); expect(c.items.length).toBeGreaterThan(0) }
  })
  it('interesses são bilíngues', () => {
    expect(interests.length).toBeGreaterThan(2)
    for (const i of interests) { expect(i.title.pt && i.title.en).toBeTruthy(); expect(i.items.pt.length).toBe(i.items.en.length) }
  })
})
```

- [ ] **Step 2: Rodar (deve falhar)**

Run: `npm test -- skills`
Expected: FAIL.

- [ ] **Step 3: Criar `lib/data/skills.ts`**

```ts
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
```

- [ ] **Step 4: Criar `lib/data/interests.ts`**

```ts
type L = { pt: string; en: string }
export const interests: { icon: string; title: L; items: { pt: string[]; en: string[] } }[] = [
  {
    icon: 'Music',
    title: { pt: 'Música', en: 'Music' },
    items: {
      pt: ['Trompetista', 'Rock no sangue', 'Ghost & Disturbed'],
      en: ['Trumpet player', 'Rock at heart', 'Ghost & Disturbed'],
    },
  },
  {
    icon: 'Gamepad2',
    title: { pt: 'Games', en: 'Games' },
    items: {
      pt: ['Zelda: Breath of the Wild', 'Mundos abertos', 'Exploração'],
      en: ['Zelda: Breath of the Wild', 'Open worlds', 'Exploration'],
    },
  },
  {
    icon: 'Bot',
    title: { pt: 'Geek & Mechs', en: 'Geek & Mechs' },
    items: {
      pt: ['Homem-Aranha', 'Dragon Ball', 'Gundam: Iron-Blooded Orphans', 'Robôs gigantes'],
      en: ['Spider-Man', 'Dragon Ball', 'Gundam: Iron-Blooded Orphans', 'Giant robots'],
    },
  },
]
```

- [ ] **Step 5: Rodar (deve passar)**

Run: `npm test -- skills`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: dados de skills e interesses"
```

---

## Task 9: Dados dos projetos (`lib/data/projects.ts`)

**Files:**
- Create: `lib/data/projects.ts`
- Test: `lib/__tests__/projects.test.ts`

- [ ] **Step 1: Escrever o teste**

```ts
import { describe, it, expect } from 'vitest'
import { projects } from '@/lib/data/projects'

describe('projects', () => {
  it('tem 6 projetos detalhados', () => { expect(projects).toHaveLength(6) })
  it('cada projeto é completo e bilíngue', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy()
      expect(p.name).toBeTruthy()
      expect(p.tagline.pt && p.tagline.en).toBeTruthy()
      expect(p.context.pt && p.context.en).toBeTruthy()
      expect(p.role.pt && p.role.en).toBeTruthy()
      expect(p.architecture.pt && p.architecture.en).toBeTruthy()
      expect(p.highlights.pt.length).toBe(p.highlights.en.length)
      expect(p.highlights.pt.length).toBeGreaterThan(0)
      expect(p.stack.length).toBeGreaterThan(0)
    }
  })
  it('Freela não tem link de código (proprietário)', () => {
    const freela = projects.find(p => p.slug === 'freela')!
    expect(freela.github).toBeNull()
  })
})
```

- [ ] **Step 2: Rodar (deve falhar)**

Run: `npm test -- projects`
Expected: FAIL.

- [ ] **Step 3: Criar `lib/data/projects.ts`** (conteúdo completo, honesto)

```ts
type L = { pt: string; en: string }
type LL = { pt: string[]; en: string[] }
export type Project = {
  slug: string
  name: string
  featured: boolean
  category: L
  tagline: L
  context: L
  role: L
  architecture: L
  highlights: LL
  stack: string[]
  github: string | null
  demo: string | null
}

export const projects: Project[] = [
  {
    slug: 'freela', name: 'Freela', featured: true,
    category: { pt: 'Marketplace · Tech Lead', en: 'Marketplace · Tech Lead' },
    tagline: { pt: 'Plataforma de contratação de freelancers (web + mobile + API).', en: 'Freelancer hiring platform (web + mobile + API).' },
    context: {
      pt: 'Plataforma em produção que conecta contratantes e freelancers, com app mobile, painel web e uma API robusta. Atuo como liderança técnica do backend e da evolução do produto.',
      en: 'Production platform connecting clients and freelancers, with a mobile app, web dashboard and a robust API. I act as technical lead for the backend and product evolution.',
    },
    role: {
      pt: 'Tech Lead: decisões de arquitetura, organização do código, revisão de fluxos e implementação de funcionalidades ponta a ponta (web, mobile e API).',
      en: 'Tech Lead: architecture decisions, code organization, flow reviews and end-to-end feature delivery (web, mobile and API).',
    },
    architecture: {
      pt: 'Monólito modular em NestJS com módulos isolados em estilo hexagonal + CQRS (domínio → aplicação → portas → adaptadores). Comunicação entre módulos por event bus interno, sem imports diretos, e isolamento de schema no PostgreSQL. Web em Next.js, mobile em Expo/React Native, persistência via Prisma e pagamentos integrados com webhooks. Foco em regras de negócio reais, versionamento de API e fluxos de autenticação seguros.',
      en: 'Modular monolith in NestJS with isolated modules in a hexagonal + CQRS style (domain → application → ports → adapters). Cross-module communication via an internal event bus, no direct imports, and PostgreSQL schema isolation. Web in Next.js, mobile in Expo/React Native, persistence via Prisma, and payments integrated through webhooks. Focused on real business rules, API versioning and secure auth flows.',
    },
    highlights: {
      pt: [
        'Arquitetura modular orientada a domínio com event bus e handlers idempotentes.',
        'Fluxo de check-in/check-out de vagas com confirmação por código.',
        'Autenticação com refresh token e integração de pagamento/repasse.',
      ],
      en: [
        'Domain-oriented modular architecture with an event bus and idempotent handlers.',
        'Job check-in/check-out flow with code confirmation.',
        'Refresh-token authentication and payment/payout integration.',
      ],
    },
    stack: ['TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Next.js', 'React Native', 'Expo'],
    github: null, demo: null,
  },
  {
    slug: 'repara', name: 'REPARA+', featured: true,
    category: { pt: 'Healthtech · Backend', en: 'Healthtech · Backend' },
    tagline: { pt: 'Plataforma de enfermagem para cuidado e acompanhamento de feridas.', en: 'Nursing platform for wound care and follow-up.' },
    context: {
      pt: 'Sistema clínico para acompanhamento de pacientes e feridas por equipes de enfermagem, com prontuário rico e app para pacientes. Responsável pela modelagem, arquitetura e desenvolvimento do backend.',
      en: 'Clinical system for nursing teams to follow up on patients and wounds, with a rich medical record and a patient app. Responsible for modeling, architecture and backend development.',
    },
    role: {
      pt: 'Engenheiro de software/backend: modelagem do domínio clínico, arquitetura da API e liderança técnica. A análise de feridas por CNN é minha pesquisa de TCC, ainda em desenvolvimento.',
      en: 'Software/backend engineer: clinical domain modeling, API architecture and technical leadership. The CNN-based wound analysis is my thesis research, still in development.',
    },
    architecture: {
      pt: 'API em Django + Django REST Framework organizada por domínio (usuários, pacientes, feridas, consultas, prescrições, app do paciente). Controle de acesso por papel (enfermeiro/paciente), endpoints específicos para mobile, autenticação JWT e documentação OpenAPI. Disciplina de testes forte: 202 testes de unidade e integração.',
      en: 'Django + Django REST Framework API organized by domain (users, patients, wounds, appointments, prescriptions, patient app). Role-based access (nurse/patient), mobile-specific endpoints, JWT auth and OpenAPI docs. Strong testing discipline: 202 unit and integration tests.',
    },
    highlights: {
      pt: [
        'Modelo de dados clínico completo (anamnese, evoluções, prescrições, agendamento de medicação).',
        '202 testes automatizados cobrindo auth, permissões e regras de negócio.',
        'Pesquisa de CNN para análise de feridas a partir de base catalogada (TCC, em andamento).',
      ],
      en: [
        'Complete clinical data model (anamnesis, evolutions, prescriptions, medication scheduling).',
        '202 automated tests covering auth, permissions and business rules.',
        'CNN research for wound analysis over a cataloged dataset (thesis, in progress).',
      ],
    },
    stack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Docker'],
    github: null, demo: null,
  },
  {
    slug: 'tbl', name: 'TBL Platform', featured: true,
    category: { pt: 'Edtech · Fullstack', en: 'Edtech · Fullstack' },
    tagline: { pt: 'Plataforma para o método educacional Team-Based Learning.', en: 'Platform for the Team-Based Learning method.' },
    context: {
      pt: 'Sistema web completo para apoiar o método TBL na UFRN, com backend próprio, frontend PWA e deploy em servidor da universidade.',
      en: 'Full web system to support the TBL method at UFRN, with a custom backend, a PWA frontend and deployment to the university server.',
    },
    role: {
      pt: 'Desenvolvedor fullstack: backend, frontend, segurança e deploy.',
      en: 'Fullstack developer: backend, frontend, security and deployment.',
    },
    architecture: {
      pt: 'Backend em Python sem frameworks — roteamento e tratamento HTTP próprios, hashing com bcrypt e autenticação JWT — o que exigiu entender o protocolo a fundo. Frontend híbrido em PWA (HTML/CSS/JS), PostgreSQL via Docker e camada de segurança validada com testes de invasão.',
      en: 'Backend in pure Python with no frameworks — custom routing and HTTP handling, bcrypt hashing and JWT auth — which required a deep understanding of the protocol. Hybrid PWA frontend (HTML/CSS/JS), PostgreSQL via Docker, and a security layer validated with penetration testing.',
    },
    highlights: {
      pt: [
        'Backend HTTP/roteamento implementado do zero, sem framework.',
        'Modelo de turmas/coortes com seeds de dados.',
        'Camada de segurança com pentesting e deploy em servidor real.',
      ],
      en: [
        'HTTP/routing backend built from scratch, no framework.',
        'Cohort/class model with data seeding.',
        'Security layer with pentesting and deployment to a real server.',
      ],
    },
    stack: ['Python', 'PWA', 'JavaScript', 'PostgreSQL', 'Docker', 'JWT'],
    github: null, demo: null,
  },
  {
    slug: 'stratasec', name: 'StrataSec', featured: false,
    category: { pt: 'LMS · Fullstack', en: 'LMS · Fullstack' },
    tagline: { pt: 'Sistema de gestão de treinamentos (admin + portal do aluno).', en: 'Training management system (admin + student portal).' },
    context: {
      pt: 'Plataforma de treinamentos com painel administrativo e portal do aluno, controle de matrículas e materiais. Entrega completa de feature sob restrição de tempo (desafio técnico).',
      en: 'Training platform with an admin dashboard and student portal, enrollment control and learning materials. A complete feature delivery under time constraints (technical challenge).',
    },
    role: { pt: 'Desenvolvedor fullstack (backend + frontend).', en: 'Fullstack developer (backend + frontend).' },
    architecture: {
      pt: 'Backend Django + DRF com permissões por papel (admin/aluno) e ciclo de vida de recursos (rascunho, acesso antecipado, publicado), upload de arquivos por tipo e documentação Swagger. Frontend React + Vite com Material-UI, dockerizado.',
      en: 'Django + DRF backend with role-based permissions (admin/student) and resource lifecycle (draft, early-access, published), type-based file upload and Swagger docs. React + Vite frontend with Material-UI, dockerized.',
    },
    highlights: {
      pt: [
        'Controle de acesso granular por papel e por datas do curso.',
        'Gestão de arquivos (vídeo/PDF/ZIP) com player e download.',
        'Docs de API automáticas (Swagger/ReDoc).',
      ],
      en: [
        'Granular access control by role and by course dates.',
        'File management (video/PDF/ZIP) with player and download.',
        'Automatic API docs (Swagger/ReDoc).',
      ],
    },
    stack: ['Django', 'DRF', 'React', 'Vite', 'Material-UI', 'Docker'],
    github: 'https://github.com/DennerBismarck/StrataSec_Recrutamento_DennerFranca', demo: null,
  },
  {
    slug: 'ia-search', name: 'IA_search', featured: false,
    category: { pt: 'Algoritmos · Visualização', en: 'Algorithms · Visualization' },
    tagline: { pt: 'Visualizador de algoritmos de busca em labirintos.', en: 'Search-algorithm visualizer over mazes.' },
    context: {
      pt: 'Aplicação de estudo que gera labirintos e visualiza, passo a passo, algoritmos de busca, com benchmark comparativo.',
      en: 'Study app that generates mazes and visualizes search algorithms step by step, with comparative benchmarking.',
    },
    role: { pt: 'Autor (projeto acadêmico).', en: 'Author (academic project).' },
    architecture: {
      pt: 'Python com GUI em GTK3. Implementa A*, BFS, DFS e Flood Fill sobre uma classe Graph (listas de adjacência, heurística para o A*). Suíte de benchmark mede comprimento do caminho, nós visitados e tempo, com gráficos em matplotlib/pandas.',
      en: 'Python with a GTK3 GUI. Implements A*, BFS, DFS and Flood Fill over a Graph class (adjacency lists, heuristic for A*). A benchmark suite measures path length, visited nodes and time, with matplotlib/pandas charts.',
    },
    highlights: {
      pt: [
        'A* com heurística e busca em grafos implementados do zero.',
        'GUI animada mostrando a exploração do algoritmo.',
        'Benchmark com exportação CSV e gráficos comparativos.',
      ],
      en: [
        'A* with heuristic and graph search implemented from scratch.',
        'Animated GUI showing the algorithm exploration.',
        'Benchmark with CSV export and comparative charts.',
      ],
    },
    stack: ['Python', 'GTK3', 'matplotlib', 'pandas'],
    github: 'https://github.com/DennerBismarck/IA_search', demo: null,
  },
  {
    slug: 'encurtador', name: 'Encurtador de URL', featured: false,
    category: { pt: 'Full-stack · TypeScript', en: 'Full-stack · TypeScript' },
    tagline: { pt: 'Encurtador de links full-stack em TypeScript.', en: 'Full-stack URL shortener in TypeScript.' },
    context: {
      pt: 'Projeto de estudo: criar links curtos e redirecionar por slug, com API e frontend próprios.',
      en: 'Study project: create short links and redirect by slug, with a custom API and frontend.',
    },
    role: { pt: 'Autor.', en: 'Author.' },
    architecture: {
      pt: 'Backend Express 5 + TypeScript com Prisma sobre SQLite, camada de serviços (criar link, buscar por slug, listar), validação de URL, CORS e health check. Frontend React + Vite.',
      en: 'Express 5 + TypeScript backend with Prisma over SQLite, a service layer (create link, get by slug, list), URL validation, CORS and a health check. React + Vite frontend.',
    },
    highlights: {
      pt: [
        'API limpa com camada de serviços e validação de URL.',
        'Prisma com adapter SQLite e tipos fim a fim.',
        'Frontend React + Vite consumindo a API.',
      ],
      en: [
        'Clean API with a service layer and URL validation.',
        'Prisma with a SQLite adapter and end-to-end types.',
        'React + Vite frontend consuming the API.',
      ],
    },
    stack: ['TypeScript', 'Express', 'Prisma', 'SQLite', 'React', 'Vite'],
    github: 'https://github.com/DennerBismarck/encurtador-links', demo: null,
  },
]

export const moreProjects = [
  { name: 'dopaminator-extension', desc: { pt: 'Extensão Chrome (Manifest v3) de foco/produtividade.', en: 'Chrome extension (Manifest v3) for focus/productivity.' }, github: 'https://github.com/DennerBismarck/dopaminator-extension' },
  { name: 'git-user-activity-CLI', desc: { pt: 'CLI em Python para atividade no GitHub.', en: 'Python CLI for GitHub activity.' }, github: 'https://github.com/DennerBismarck/git-user-activity-CLI' },
  { name: 'FITree', desc: { pt: 'App de saúde em Flutter (UFRN).', en: 'Flutter health app (UFRN).' }, github: 'https://github.com/DennerBismarck/FITree' },
  { name: 'Hamburgueria_NodeJS', desc: { pt: 'API de hamburgueria em NestJS/TS.', en: 'Burger-shop API in NestJS/TS.' }, github: 'https://github.com/DennerBismarck/Hamburgueria_NodeJS' },
]
```

- [ ] **Step 4: Rodar (deve passar)**

Run: `npm test -- projects`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: dados completos dos projetos (bilíngue, honesto)"
```

---

## Task 10: Primitivos de UI (`components/ui/`)

**Files:**
- Create: `components/ui/Section.tsx`, `components/ui/Pill.tsx`, `components/ui/Reveal.tsx`

- [ ] **Step 1: Criar `components/ui/Section.tsx`**

```tsx
export function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      {children}
    </section>
  )
}

export function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <header className="mb-12">
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
        <span className="text-accent-soft">#</span> {children}
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted-2">{subtitle}</p>}
    </header>
  )
}
```

- [ ] **Step 2: Criar `components/ui/Pill.tsx`**

```tsx
export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-borderc bg-surface-2/60 px-3 py-1 text-sm text-muted">
      {children}
    </span>
  )
}
```

- [ ] **Step 3: Criar `components/ui/Reveal.tsx`** (animação sutil reutilizável)

```tsx
'use client'
import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 4: Verificar build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: primitivos de UI (Section, Pill, Reveal)"
```

---

## Task 11: Header com navegação, toggle de idioma e CV

**Files:**
- Create: `components/Header.tsx`
- Test: `components/__tests__/Header.test.tsx`

- [ ] **Step 1: Escrever smoke test**

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '@/components/Header'
import { LangProvider } from '@/components/LangProvider'

describe('Header', () => {
  it('renderiza nome e nav', () => {
    render(<LangProvider><Header /></LangProvider>)
    expect(screen.getByText('Denner França')).toBeInTheDocument()
    expect(screen.getByText('Projetos')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Rodar (deve falhar)**

Run: `npm test -- Header`
Expected: FAIL.

- [ ] **Step 3: Criar `components/Header.tsx`**

```tsx
'use client'
import { useLang } from '@/lib/i18n'
import { profile } from '@/lib/data/profile'
import { Download } from 'lucide-react'

const links: { href: string; key: 'nav.about' | 'nav.experience' | 'nav.projects' | 'nav.skills' | 'nav.contact' }[] = [
  { href: '#about', key: 'nav.about' },
  { href: '#experience', key: 'nav.experience' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#skills', key: 'nav.skills' },
  { href: '#contact', key: 'nav.contact' },
]

export function Header() {
  const { t, lang, setLang } = useLang()
  return (
    <header className="sticky top-0 z-40 border-b border-borderc/60 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-lg font-extrabold text-text">Denner França</a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-accent-soft">{t(l.key)}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex overflow-hidden rounded-full border border-borderc text-xs">
            <button onClick={() => setLang('pt')} className={`px-2.5 py-1 ${lang === 'pt' ? 'bg-accent text-white' : 'text-muted-2'}`}>PT</button>
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 ${lang === 'en' ? 'bg-accent text-white' : 'text-muted-2'}`}>EN</button>
          </div>
          <a href={profile.cv[lang]} download className="hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright sm:inline-flex">
            <Download size={15} /> {t('nav.downloadCv')}
          </a>
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 4: Rodar (deve passar)**

Run: `npm test -- Header`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Header com nav, toggle PT/EN e download de CV"
```

---

## Task 12: Hero

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Criar `components/Hero.tsx`**

```tsx
'use client'
import Image from 'next/image'
import { useLang } from '@/lib/i18n'
import { profile } from '@/lib/data/profile'
import { Github, Linkedin, Download, ArrowDown } from 'lucide-react'

export function Hero() {
  const { t, lang } = useLang()
  return (
    <div id="top" className="bg-grid border-b border-borderc/60">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-accent-soft">{t('hero.eyebrow')}</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-text sm:text-5xl">{t('hero.title')}</h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-white transition-colors hover:bg-accent-bright">{t('hero.ctaProjects')} <ArrowDown size={16} /></a>
            <a href={profile.cv[lang]} download className="inline-flex items-center gap-2 rounded-full border border-borderc px-5 py-2.5 font-medium text-muted transition-colors hover:border-accent hover:text-accent-soft"><Download size={16} /> {t('hero.ctaCv')}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-borderc p-2.5 text-muted transition-colors hover:border-accent hover:text-accent-soft"><Github size={18} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-borderc p-2.5 text-muted transition-colors hover:border-accent hover:text-accent-soft"><Linkedin size={18} /></a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {profile.metrics.map((m) => (
              <div key={m.value} className="rounded-xl border border-borderc bg-surface-2/50 p-3 text-center">
                <dt className="font-display text-xl font-bold text-accent-soft">{m.value}</dt>
                <dd className="mt-1 text-xs text-muted-2">{m.label[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto">
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-accent/40 shadow-[0_0_40px_-10px_rgba(147,51,234,.5)] sm:h-72 sm:w-72">
            <Image src={profile.photo} alt={profile.fullName} fill sizes="288px" className="object-cover" priority />
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: seção Hero"
```

---

## Task 13: Sobre

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Criar `components/About.tsx`**

```tsx
'use client'
import { useLang } from '@/lib/i18n'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function About() {
  const { t } = useLang()
  return (
    <Section id="about">
      <SectionTitle>{t('about.title')}</SectionTitle>
      <Reveal>
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
        </div>
      </Reveal>
    </Section>
  )
}
```

- [ ] **Step 2: Build + Commit**

Run: `npm run build` (Expected: PASS), depois:
```bash
git add -A && git commit -m "feat: seção Sobre"
```

---

## Task 14: Experiência (timeline)

**Files:**
- Create: `components/Experience.tsx`

- [ ] **Step 1: Criar `components/Experience.tsx`**

```tsx
'use client'
import { useLang } from '@/lib/i18n'
import { experience } from '@/lib/data/experience'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Pill } from '@/components/ui/Pill'

export function Experience() {
  const { t, lang } = useLang()
  return (
    <Section id="experience" className="bg-surface/40">
      <SectionTitle>{t('experience.title')}</SectionTitle>
      <div className="relative border-l border-borderc pl-6">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.04}>
            <div className="mb-10 last:mb-0">
              <div className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
              <p className="text-sm text-muted-2">{e.period[lang]}</p>
              <h3 className="font-display text-xl font-bold text-text">{e.role[lang]}</h3>
              <p className="text-accent-soft">{e.company}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                {e.bullets[lang].map((b) => <li key={b}>{b}</li>)}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {e.tech.map((tch) => <Pill key={tch}>{tch}</Pill>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Build + Commit**

Run: `npm run build` (Expected: PASS), depois:
```bash
git add -A && git commit -m "feat: seção Experiência (timeline)"
```

---

## Task 15: Projetos (grid + modal)

**Files:**
- Create: `components/ProjectModal.tsx`, `components/Projects.tsx`

- [ ] **Step 1: Criar `components/ProjectModal.tsx`**

```tsx
'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import type { Project } from '@/lib/data/projects'
import { Pill } from '@/components/ui/Pill'

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { t, lang } = useLang()

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    if (project) { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden' }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} role="dialog" aria-modal="true" aria-label={project.name}
        >
          <motion.div
            className="relative my-auto w-full max-w-2xl rounded-2xl border border-borderc bg-surface p-6 sm:p-8"
            initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label={t('projects.close')} className="absolute right-4 top-4 rounded-full p-1.5 text-muted-2 hover:bg-surface-2 hover:text-text"><X size={20} /></button>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-soft">{project.category[lang]}</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold text-text">{project.name}</h3>
            <p className="mt-1 text-muted">{project.tagline[lang]}</p>

            <Block title={t('projects.context')}>{project.context[lang]}</Block>
            <Block title={t('projects.role')}>{project.role[lang]}</Block>
            <Block title={t('projects.architecture')}>{project.architecture[lang]}</Block>

            <h4 className="mt-5 font-display text-sm font-bold uppercase tracking-wide text-muted-2">{t('projects.highlights')}</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              {project.highlights[lang].map((h) => <li key={h}>{h}</li>)}
            </ul>

            <h4 className="mt-5 font-display text-sm font-bold uppercase tracking-wide text-muted-2">{t('projects.stack')}</h4>
            <div className="mt-2 flex flex-wrap gap-2">{project.stack.map((s) => <Pill key={s}>{s}</Pill>)}</div>

            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-bright">
                <Github size={16} /> {t('projects.viewGithub')}
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h4 className="font-display text-sm font-bold uppercase tracking-wide text-muted-2">{title}</h4>
      <p className="mt-2 leading-relaxed text-muted">{children}</p>
    </div>
  )
}
```

- [ ] **Step 2: Criar `components/Projects.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { useLang } from '@/lib/i18n'
import { projects, moreProjects, type Project } from '@/lib/data/projects'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ProjectModal } from '@/components/ProjectModal'
import { Github, ArrowUpRight } from 'lucide-react'

export function Projects() {
  const { t, lang } = useLang()
  const [active, setActive] = useState<Project | null>(null)
  return (
    <Section id="projects">
      <SectionTitle subtitle={t('projects.subtitle')}>{t('projects.title')}</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <button
              onClick={() => setActive(p)}
              className="group flex h-full w-full flex-col rounded-2xl border border-borderc bg-surface-2/40 p-5 text-left transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_30px_-12px_rgba(147,51,234,.6)]"
            >
              {p.featured && <span className="mb-2 self-start rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent-soft">★ {lang === 'pt' ? 'Destaque' : 'Featured'}</span>}
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-soft">{p.category[lang]}</p>
              <h3 className="mt-1 font-display text-lg font-bold text-text">{p.name}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{p.tagline[lang]}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => <span key={s} className="rounded bg-surface px-2 py-0.5 text-xs text-muted-2">{s}</span>)}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent-soft opacity-0 transition-opacity group-hover:opacity-100">
                {lang === 'pt' ? 'Ver case' : 'View case'} <ArrowUpRight size={14} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-muted-2">{t('projects.moreOnGithub')}</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          {moreProjects.map((m) => (
            <a key={m.name} href={m.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-borderc px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent-soft">
              <Github size={14} /> {m.name}
            </a>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </Section>
  )
}
```

- [ ] **Step 3: Build + Commit**

Run: `npm run build` (Expected: PASS), depois:
```bash
git add -A && git commit -m "feat: seção Projetos com modal de case"
```

---

## Task 16: Skills

**Files:**
- Create: `components/Skills.tsx`

- [ ] **Step 1: Criar `components/Skills.tsx`**

```tsx
'use client'
import { useLang } from '@/lib/i18n'
import { skills } from '@/lib/data/skills'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export function Skills() {
  const { t, lang } = useLang()
  return (
    <Section id="skills" className="bg-surface/40">
      <SectionTitle>{t('skills.title')}</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((c, i) => (
          <Reveal key={c.label.en} delay={i * 0.03}>
            <div className="rounded-2xl border border-borderc bg-surface-2/40 p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-accent-soft">{c.label[lang]}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.items.map((it) => <span key={it} className="rounded-full border border-borderc bg-surface px-3 py-1 text-sm text-muted">{it}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Build + Commit**

Run: `npm run build` (Expected: PASS), depois:
```bash
git add -A && git commit -m "feat: seção Skills"
```

---

## Task 17: Interesses

**Files:**
- Create: `components/Interests.tsx`

- [ ] **Step 1: Criar `components/Interests.tsx`**

```tsx
'use client'
import { useLang } from '@/lib/i18n'
import { interests } from '@/lib/data/interests'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Music, Gamepad2, Bot } from 'lucide-react'

const icons = { Music, Gamepad2, Bot } as const

export function Interests() {
  const { t, lang } = useLang()
  return (
    <Section id="interests">
      <SectionTitle subtitle={t('interests.subtitle')}>{t('interests.title')}</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-3">
        {interests.map((it, i) => {
          const Icon = icons[it.icon as keyof typeof icons]
          return (
            <Reveal key={it.title.en} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-borderc bg-gradient-to-b from-surface-2/60 to-surface p-6">
                <Icon className="text-accent-soft" size={28} />
                <h3 className="mt-3 font-display text-lg font-bold text-text">{it.title[lang]}</h3>
                <ul className="mt-2 space-y-1 text-muted">
                  {it.items[lang].map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
```

- [ ] **Step 2: Build + Commit**

Run: `npm run build` (Expected: PASS), depois:
```bash
git add -A && git commit -m "feat: seção Interesses (personalidade)"
```

---

## Task 18: Contato e Footer

**Files:**
- Create: `components/Contact.tsx`, `components/Footer.tsx`

- [ ] **Step 1: Criar `components/Contact.tsx`**

```tsx
'use client'
import { useLang } from '@/lib/i18n'
import { profile } from '@/lib/data/profile'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react'

export function Contact() {
  const { t, lang } = useLang()
  const wa = `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`
  const items = [
    { icon: Mail, label: t('contact.email'), value: profile.email, href: `mailto:${profile.email}` },
    { icon: MessageCircle, label: t('contact.whatsapp'), value: '+55 84 99697-3162', href: wa },
    { icon: Linkedin, label: 'LinkedIn', value: '/denner-bismarck', href: profile.linkedin },
    { icon: Github, label: 'GitHub', value: '/DennerBismarck', href: profile.github },
  ]
  return (
    <Section id="contact" className="bg-surface/40">
      <SectionTitle subtitle={t('contact.subtitle')}>{t('contact.title')}</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <a key={it.label} href={it.href} target="_blank" rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-borderc bg-surface-2/40 p-5 transition-all hover:-translate-y-0.5 hover:border-accent">
            <span className="rounded-xl bg-accent/15 p-3 text-accent-soft"><it.icon size={22} /></span>
            <span>
              <span className="block text-xs uppercase tracking-wide text-muted-2">{it.label}</span>
              <span className="block text-text">{it.value}</span>
            </span>
          </a>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-2">{profile.location[lang]}</p>
    </Section>
  )
}
```

- [ ] **Step 2: Criar `components/Footer.tsx`**

```tsx
'use client'
import { useLang } from '@/lib/i18n'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-borderc/60 py-8 text-center text-sm text-muted-2">
      <p>{t('footer.built')}</p>
      <p className="mt-1">© 2026 Denner França. {t('footer.rights')}</p>
    </footer>
  )
}
```

- [ ] **Step 3: Build + Commit**

Run: `npm run build` (Expected: PASS), depois:
```bash
git add -A && git commit -m "feat: seções Contato e Footer"
```

---

## Task 19: Montar a página e metadata/SEO

**Files:**
- Modify: `app/page.tsx`, `app/layout.tsx`

- [ ] **Step 1: Montar `app/page.tsx`**

```tsx
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Interests } from '@/components/Interests'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Definir metadata em `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://denner-franca.vercel.app'),
  title: 'Denner França — Tech Lead & Fullstack Engineer',
  description: 'Portfólio de Denner França: Tech Lead e desenvolvedor fullstack (TypeScript, Python, React, Next.js, NestJS, Django). Arquitetura de software, APIs, web e mobile.',
  keywords: ['Denner França', 'Tech Lead', 'Fullstack', 'TypeScript', 'Python', 'Next.js', 'NestJS', 'Django'],
  authors: [{ name: 'Denner Bismarck de Lucena França' }],
  openGraph: {
    title: 'Denner França — Tech Lead & Fullstack Engineer',
    description: 'Arquitetura de software, APIs, web e mobile. Pragmático, direto e de bom humor.',
    type: 'website', locale: 'pt_BR',
  },
  twitter: { card: 'summary_large_image', title: 'Denner França — Tech Lead & Fullstack Engineer' },
}
```
Garantir `<html lang="pt-BR">` no layout (o LangProvider atualiza dinamicamente ao trocar idioma).

- [ ] **Step 3: Build + Commit**

Run: `npm run build` (Expected: PASS, todas as rotas estáticas), depois:
```bash
git add -A && git commit -m "feat: montar página + metadata/SEO"
```

---

## Task 20: Verificação manual e responsividade

**Files:** nenhum (verificação)

- [ ] **Step 1: Subir o dev server e revisar**

Run: `npm run dev` e abrir http://localhost:3000

Checklist:
- [ ] Toggle PT/EN troca TODO o conteúdo (inclui hero, projetos, footer) e o CV baixado muda de idioma.
- [ ] Cada card de projeto abre o modal; fecha por X, Esc e clique fora.
- [ ] Foto aparece no hero; links de contato (mailto, wa.me, LinkedIn, GitHub) corretos.
- [ ] Responsivo em mobile (≤375px), tablet e desktop — sem overflow horizontal.
- [ ] Animações suaves; com `prefers-reduced-motion` ativo, sem movimento.

- [ ] **Step 2: Lighthouse**

Run: `npm run build && npm run start`, rodar Lighthouse (Chrome DevTools) em mobile.
Expected: Performance/Best Practices/SEO/A11y ≥ 90 (alvo 95+). Corrigir o que ficar abaixo.

- [ ] **Step 3: Commit de ajustes (se houver)**

```bash
git add -A && git commit -m "fix: ajustes de responsividade/a11y pós-revisão"
```

---

## Task 21: Deploy na Vercel

**Files:** nenhum (deploy — passos do Denner)

- [ ] **Step 1: Subir o repo pro GitHub**

Criar repositório (privado ou público) e push:
```bash
gh repo create denner-portfolio --public --source=. --remote=origin --push
```

- [ ] **Step 2: Importar na Vercel**

No painel da Vercel: "Add New → Project" → importar `denner-portfolio` → framework Next.js (auto) → Deploy. URL final: `denner-franca.vercel.app` (ou ajustar o slug no projeto). Atualizar `metadataBase` se o domínio final for outro.

- [ ] **Step 3: Smoke test em produção**

Abrir a URL da Vercel: conferir toggle de idioma, download dos CVs e abertura dos modais.

---

## Pendências do Denner (pós-build)
1. Revisar textos PT/EN (bio, hero, interesses) — ajustar tom se quiser.
2. Confirmar números das métricas do hero.
3. (Opcional) trocar a foto por uma versão recortada/quadrada se preferir enquadramento diferente.
4. (Opcional/futuro) apontar domínio próprio.
