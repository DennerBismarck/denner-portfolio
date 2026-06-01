# Portfólio Denner França — Design / Spec

**Data:** 2026-06-01
**Autor do design:** Denner Bismarck de Lucena França (com Claude)
**Status:** Aguardando aprovação

---

## 1. Objetivo

Site de portfólio pessoal, bilíngue (PT/EN), que apresente o Denner como **Tech Lead & Fullstack Engineer** de forma profissional e confiável, com detalhamento real dos projetos e uma camada de personalidade autêntica. Serve tanto para recrutadores no Brasil quanto para empresas internacionais (vagas remotas em inglês).

### Critérios de sucesso
- Um recrutador entende em ~5s "quem é, o que faz, nível de senioridade".
- Os projetos de destaque têm profundidade técnica real (arquitetura, decisões, stack) — não só uma frase.
- O site reflete a personalidade do Denner sem comprometer o tom profissional.
- Carrega rápido, funciona em mobile, tem bom SEO e é fácil de manter/atualizar.
- Deploy simples na Vercel; trocar foto/CV/textos é trivial.

### Público-alvo
1. Recrutadores tech brasileiros (CLT/PJ).
2. Empresas internacionais / vagas remotas em inglês.

---

## 2. Identidade visual

- **Tema:** escuro (dark slate). Base `#0f172a` / `#0b1120`, superfícies `#1e293b`.
- **Acento:** Roxo Real **`#9333ea`** (com variações `#a855f7` / `#c084fc` para hover/realces e texto sobre escuro). Gradientes sutis de roxo permitidos em detalhes (botão, faixas, glow leve).
- **Texto:** `#f1f5f9` (títulos), `#cbd5e1` / `#94a3b8` (corpo/secundário).
- **Tipografia:** sans-serif moderna. Títulos com peso forte (ex.: *Space Grotesk* ou *Sora*); corpo legível (ex.: *Inter*). Carregadas via `next/font` (sem custo de layout shift).
- **Movimento:** animações sutis com framer-motion — fade/slide-up ao entrar na viewport, hover nos cards (leve elevação + borda roxa), transição suave do modal. Nada exagerado. Respeitar `prefers-reduced-motion`.
- **Tom de voz do texto:** pragmático, claro, com bom humor pontual. Sem jargão vazio. Bilíngue com naturalidade nos dois idiomas (não tradução literal).

---

## 3. Stack técnica & arquitetura

- **Framework:** Next.js (App Router) + TypeScript.
- **Estilo:** Tailwind CSS (tokens de tema via CSS variables para as cores acima).
- **Animação:** framer-motion.
- **Ícones:** lucide-react.
- **i18n:** dicionário próprio leve (objeto `pt`/`en`) + Context/hook `useLang()` com toggle no header e persistência em `localStorage`. (Evita o peso de libs de roteamento i18n; o conteúdo é estático e conhecido.)
- **Deploy:** Vercel (subdomínio `*.vercel.app` por enquanto; pronto pra apontar domínio próprio depois).
- **Sem backend:** site 100% estático/SSG. Sem formulário com envio de e-mail nesta versão (ver Não-objetivos).

### Estrutura de pastas (proposta)
```
portfolio/
  app/
    layout.tsx           # html, fontes, metadata, providers
    page.tsx             # monta as seções
  components/
    Header.tsx           # nav âncora + toggle idioma + toggle CV
    Hero.tsx
    About.tsx
    Experience.tsx       # timeline
    Projects.tsx         # grid de cards
    ProjectModal.tsx     # modal de case detalhado
    Skills.tsx
    Interests.tsx
    Contact.tsx
    Footer.tsx
    LangToggle.tsx
    ui/                  # primitivos (Section, Pill, Card, Button)
  lib/
    i18n.ts              # dicionário pt/en + hook useLang
    data/
      projects.ts        # dados dos projetos (bilíngue)
      experience.ts      # timeline (bilíngue)
      skills.ts          # skills por categoria
      interests.ts       # interesses
      profile.ts         # nome, títulos, métricas, contatos, links
  public/
    denner.jpg           # FOTO (placeholder até o Denner enviar)
    cv/
      denner-franca-pt.pdf
      denner-franca-en.pdf
    og-image.png         # imagem de compartilhamento
```

Cada seção é um componente isolado, consome dados de `lib/data/*` e strings de `lib/i18n.ts`. Trocar conteúdo = editar dados, não JSX.

---

## 4. Estrutura do site (single-page + âncoras)

Header fixo com: logo/nome, links âncora (Sobre · Experiência · Projetos · Skills · Contato), **toggle PT/EN** e botão **Baixar CV** (baixa o PDF do idioma ativo).

1. **Hero**
   - Eyebrow: "TECH LEAD & FULLSTACK ENGINEER"
   - Headline forte + subheadline (1–2 linhas, pragmática/bom humor)
   - Foto (à direita/lado), CTAs: "Ver projetos" (primário roxo) + "Baixar CV"
   - Cards de métricas: anos de experiência, nº de projetos, principais stacks. (Números configuráveis em `profile.ts` — Denner confirma os valores.)
   - Links rápidos: GitHub, LinkedIn.

2. **Sobre**
   - Bio em 2 parágrafos: origem (Caicó/RN), jornada IFRN → UFRN (Sistemas de Informação), o que move ele como dev (pragmatismo, comunicação, construir coisas que resolvem problema real), e a pegada de arquitetura/liderança técnica.
   - Tom: humano e direto, com leve bom humor.

3. **Experiência** (timeline vertical)
   - Freela (Tech Lead & Fullstack, 2026–atual) · REPARA+ (Backend/Eng. de Software, ago/2025–jan/2026) · TBL/UFRN (Fullstack, mai–jul/2025) · BaoBah/LABENS (Backend, ago/2024–fev/2025) · Byte Seridó Jr (Backend, mar–dez/2023) · PNN (Analista, jul–dez/2022) · LIT (Game Designer/Dev, mai–dez/2021).
   - Cada item: cargo, empresa, período, 2–3 bullets, chips de tech.
   - PNN e LIT entram condensados (não estão no CV EN); incluídos para mostrar trajetória.

4. **Projetos** (grid de cards; clique → modal com case completo)
   - **Card:** thumbnail/ícone + nome + 1 linha + chips de stack + selo de categoria. Hover roxo.
   - **Modal (ProjectModal):** título, contexto/problema, papel do Denner, **arquitetura & decisões**, stack detalhada, destaques técnicos, aprendizados, e (quando houver) links GitHub/demo.
   - Acessibilidade do modal: foco preso, fecha com Esc/overlay, `aria-modal`.

5. **Skills** (pills agrupadas por categoria)
   - Linguagens · Frameworks · Arquitetura · Banco de Dados · DevOps · Segurança · IA · Liderança técnica.

6. **Interesses** (camada de personalidade)
   - Bloco leve e visual: Música (trompetista, rock — Ghost & Disturbed), Games (Zelda: Breath of the Wild), Geek (Homem-Aranha, Dragon Ball, Gundam: Iron-Blooded Orphans, "robôs gigantes/mechs"). Tratamento com ícones/cards pequenos e um toque de roxo. Curto e charmoso — não ocupa o protagonismo.

7. **Contato**
   - E-mail (`dennerbismarck@gmail.com`), LinkedIn, GitHub, WhatsApp (`+55 84 99697-3162`, botão wa.me), e download do CV (PT/EN). Localização: Rio Grande do Norte, Brasil.

8. **Footer** — copyright, "feito com Next.js", links rápidos.

---

## 5. Conteúdo dos projetos (curadoria aprovada)

> Profundidade vai no **modal**. Honestidade é regra: nada de inflar.

**🌟 Destaques**
- **Freela — Marketplace de freelancers (Tech Lead).** Foco no papel de liderança técnica e nas decisões de arquitetura: NestJS modular monolith, Hexagonal + CQRS por módulo, event bus interno, isolamento de schema, Next.js (web), Expo/React Native (mobile), pagamentos OpenPix, auth com refresh token. **Restrição:** é código de produção do empregador — descrever arquitetura/papel em alto nível, **sem expor código, prints internos ou links proprietários**.
- **REPARA+ — Plataforma de enfermagem / cuidado de feridas.** Django + DRF, modelagem clínica rica (anamnese, evoluções, prescrições), controle de acesso por papel (enfermeiro/paciente), endpoints mobile, **202 testes**. **CNN de análise de feridas: apresentar honestamente como pesquisa / TCC em andamento** (ainda não implementado; será treinado sobre base catalogada conforme demanda das clientes). Não afirmar que está pronto.
- **TBL Platform — Plataforma educacional (Team-Based Learning).** Backend em Python **sem framework** (HTTP/roteamento próprio, bcrypt, JWT), frontend PWA, PostgreSQL/Docker, camada de segurança + pentest, deploy em servidor da universidade.

**➕ Secundários**
- **StrataSec — Sistema de treinamentos full-stack.** Django + DRF + React + Material-UI; permissões por papel, ciclo de vida de recursos (draft/early-access/publicado), upload de arquivos, docs Swagger. (Origem: desafio técnico — enquadrar como "entrega completa de feature sob restrição de tempo".)
- **IA_search — Visualizador de algoritmos de busca.** Python + GTK3; A*, BFS, DFS, Flood Fill sobre labirintos, com benchmark (matplotlib/pandas). Mostra fundamentos de CS/algoritmos.
- **Encurtador de URL — Full-stack TypeScript.** Express 5 + Prisma + SQLite + React/Vite; camada de serviços, validação de URL, health check.

**🔗 Mais no GitHub (mini-lista, link externo):** dopaminator-extension (Chrome, Manifest v3), git-user-activity-CLI (Python), FITree (Flutter), Hamburgueria_NodeJS (NestJS/TS).

---

## 6. Assets & dados a confirmar com o Denner

- **Foto:** Denner vai enviar. Até lá, placeholder elegante (monograma "DF" em roxo). Caminho de troca: `public/denner.jpg`.
- **CVs:** já existem — copiar para `public/cv/`:
  - PT: `/home/doutor/Documentos/Currículo- Denner Bismarck de Lucena França - PTBR.pdf`
  - EN: `/home/doutor/Documentos/CV___Denner_Bismarck_de_Lucena_França___EN.pdf`
- **Métricas do hero:** anos de experiência (desde ~2021), nº de projetos, stacks principais — Denner confirma os números exatos.
- **Textos bilíngues:** Claude escreve PT e EN; Denner revisa antes do deploy (principalmente bio e interesses).

---

## 7. Acessibilidade, SEO e performance

- HTML semântico, contraste AA sobre o tema escuro, navegação por teclado, foco visível, `prefers-reduced-motion`.
- Metadata completa (title, description, OpenGraph/Twitter, `og-image`), `lang` dinâmico, sitemap/robots.
- Imagens via `next/image`; fontes via `next/font`; alvo Lighthouse 95+.

---

## 8. Testes & verificação

- Build de produção (`next build`) sem erros/warnings de tipo.
- Checagem manual: toggle PT/EN troca todo o conteúdo + o CV baixado; modais abrem/fecham (mouse + teclado); responsivo (mobile/tablet/desktop); links de contato corretos.
- Lighthouse (performance/a11y/SEO) como gate final antes do deploy.

---

## 9. Não-objetivos (YAGNI nesta versão)

- Sem formulário de contato com backend/envio de e-mail (contato via mailto/WhatsApp/LinkedIn).
- Sem CMS/blog.
- Sem domínio próprio agora (subdomínio Vercel; deixar pronto pra apontar depois).
- Sem dark/light toggle (o site já nasce dark por escolha de identidade).
- Sem expor código proprietário do Freela.

---

## 10. Pontos em aberto / dependem do Denner

1. Enviar a foto profissional (`public/denner.jpg`).
2. Confirmar os números das métricas do hero.
3. Revisar os textos PT/EN (bio e interesses) antes do deploy.
4. (Opcional/futuro) decidir domínio próprio.
