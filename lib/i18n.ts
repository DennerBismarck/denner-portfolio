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
    'projects.title': 'Projetos',
    'projects.subtitle': 'Clique num card para ver o case completo: contexto, arquitetura e decisões.',
    'projects.role': 'Meu papel', 'projects.context': 'Contexto', 'projects.architecture': 'Arquitetura & decisões',
    'projects.highlights': 'Destaques técnicos', 'projects.stack': 'Stack', 'projects.viewGithub': 'Ver no GitHub',
    'projects.featured': 'Destaque', 'projects.viewCase': 'Ver case',
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
    'projects.title': 'Projects',
    'projects.subtitle': 'Click a card for the full case: context, architecture and decisions.',
    'projects.role': 'My role', 'projects.context': 'Context', 'projects.architecture': 'Architecture & decisions',
    'projects.highlights': 'Technical highlights', 'projects.stack': 'Stack', 'projects.viewGithub': 'View on GitHub',
    'projects.featured': 'Featured', 'projects.viewCase': 'View case',
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
