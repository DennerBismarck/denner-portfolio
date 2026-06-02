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
