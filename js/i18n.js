/* ==========================================================================
   Translations
   English is written directly in index.html (default language, and what
   visitors without JavaScript see). Portuguese lives here, keyed by the
   element's data-i18n / data-i18n-attr key.

   The "en" block only holds strings that are set from JavaScript and
   therefore don't exist in the markup.
   ========================================================================== */

const TRANSLATIONS = {
    en: {
        "menu.open": "Open menu",
        "menu.close": "Close menu",
        "lang.switch": "Mudar para português",
        "copy.done": "Email address copied to clipboard",
    },

    pt: {
        // JavaScript-only strings
        "menu.open": "Abrir menu",
        "menu.close": "Fechar menu",
        "lang.switch": "Switch to English",
        "copy.done": "Endereço de email copiado",

        // Meta & global
        "meta.description":
            "Pedro Costa, Web Developer em Sintra, Portugal. React, Next.js, Vue.js e design UI/UX — projetos, experiência e contacto.",
        "skip": "Saltar para o conteúdo",
        "logo.label": "Pedro Costa, voltar ao topo",
        "theme.toggle": "Alternar modo escuro",
        "cv.file": "./assets/docs/Pedro-Costa-CV-PT.pdf",

        // Navigation
        "nav.label": "Principal",
        "nav.about": "Sobre",
        "nav.experience": "Experiência",
        "nav.skills": "Competências",
        "nav.projects": "Projetos",
        "nav.contact": "Contacto",

        // Hero
        "hero.badge": "Web Developer na ActiveMedia",
        "hero.lead":
            "Levo ideias desde protótipos em Figma até código front-end em produção, com React, Next.js, Vue.js e WordPress.",
        "hero.cta": "Ver projetos",
        "hero.cv": "Descarregar CV",
        "hero.photoAlt": "Retrato de Pedro Costa",
        "hero.stackLabel": "Principais tecnologias",
        "socials.label": "Redes sociais",
        "socials.github": "Perfil no GitHub",
        "socials.linkedin": "Perfil no LinkedIn",
        "socials.email": "Enviar-me um email",

        // About
        "about.eyebrow": "Fica a conhecer-me",
        "about.title": "Sobre mim",
        "about.photoAlt": "Pedro Costa a sorrir, de t-shirt branca",
        "about.expTitle": "Experiência",
        "about.expText": "Web Developer na ActiveMedia",
        "about.eduTitle": "Formação",
        "about.eduText": "Curso de Web Development + 5 certificações Udemy",
        "about.langTitle": "Línguas",
        "about.langText": "Português (nativo), Inglês (C1)",
        "about.p1":
            "Sou web developer com experiência profissional em WordPress e académica em React, Next.js e Vue.js — da prototipagem em Figma até código front-end em produção. Dou importância aos pequenos detalhes que tornam uma interface clara, rápida e agradável de usar.",
        "about.p2":
            "Antes de entrar no desenvolvimento web, passei quase seis anos como técnico de telecomunicações. Essa experiência deu-me a disciplina e a capacidade analítica que hoje aplico na resolução de problemas de código.",

        // Experience
        "exp.eyebrow": "O meu percurso",
        "exp.title": "Experiência",
        "exp.work": "Profissional",
        "exp.job1.date": "jul 2026 — atual",
        "exp.job1.p1":
            "Desenvolvimento de websites em WordPress: da implementação a partir de design em Figma à adaptação de templates para clientes.",
        "exp.job1.p2": "Identificação e implementação de melhorias de UX/UI e estrutura em projetos existentes.",
        "exp.job2.date": "nov 2024 — jun 2025",
        "exp.job2.title": "Pré-Oficial de Eletricista",
        "exp.job2.p1":
            "Função exercida em paralelo com o Curso de Formação Profissional de Web Development, conciliando trabalho técnico prático com estudo a tempo inteiro.",
        "exp.job3.date": "dez 2018 — jul 2024",
        "exp.job3.title": "Técnico de Telecomunicações",
        "exp.job3.p1":
            "Realização de diagnósticos técnicos, documentação e atendimento ao cliente em ambientes de alta pressão e prazos.",
        "exp.job3.p2": "Gestão de prioridades de forma autónoma em sistemas de infraestrutura crítica.",
        "exp.education": "Formação e certificações",
        "exp.cert.wp.date": "set 2026",
        "exp.cert.view": "Ver certificado",
        "exp.edu1.title": "Curso de Formação Profissional em Web Development",
        "exp.edu2.title": "Curso Técnico Profissional de Gestão de Equipamentos Informáticos",

        // Skills
        "skills.eyebrow": "Com o que trabalho",
        "skills.title": "Competências",
        "skills.backend": "Backend e Dados",
        "skills.prototyping": "Prototipagem",
        "skills.responsive": "Design Responsivo e Mobile-First",
        "skills.tools": "Ferramentas e Práticas",
        "skills.agile": "Metodologias Agile",

        // Projects
        "projects.eyebrow": "Trabalho recente",
        "projects.title": "Projetos",
        "projects.tech": "Tecnologias",
        "projects.live": "Demo ao vivo",
        "projects.github": "Ver no GitHub",
        "projects.demo": "Ver demo",
        "projects.oasis.alt": "Dashboard de administração do The Wild Oasis com estatísticas de reservas e gráfico de vendas",
        "projects.oasis.demoWebsite": "Demo do website",
        "projects.oasis.demoDashboard": "Demo do dashboard",
        "projects.oasis.kind": "Full-stack · Gestão hoteleira e reservas",
        "projects.oasis.desc":
            "Plataforma dupla — painel de administração para a equipa e site de reservas para os clientes — com backend sincronizado, autenticação segura e gestão de dados em tempo real.",
        "projects.oasis.dashboardCode": "Código do dashboard",
        "projects.oasis.websiteCode": "Código do website",
        "projects.contacts.cover": "Gestor de Contactos",
        "projects.contacts.kind": "Avaliação técnica",
        "projects.contacts.desc":
            "Aplicação de gestão de contactos entregue do zero a produto funcional e testado: autenticação, guardas de rota, validação de formulários e testes automatizados.",
        "projects.beats.alt": "Hero da landing page SF Beats com o título Beats that hit different",
        "projects.beats.kind": "Landing page · Produtor musical",
        "projects.beats.desc":
            "Landing page totalmente responsiva para um produtor musical, com catálogo de beats, detalhe de cada beat e uma secção de contacto protegida por login Google.",
        "projects.eventhive.alt": "Página inicial da plataforma de gestão de eventos Eventhive",
        "projects.eventhive.kind": "Full-stack · Projeto final de curso",
        "projects.eventhive.desc":
            "Sistema de gestão de eventos com login seguro, painel de administração, CRUD completo de eventos e carrinho de compras funcional para bilhetes.",

        // More projects
        "more.title": "Mais projetos",
        "more.intro": "Projetos de curso e de prática — todos com vídeo de demonstração.",
        "more.quiz.alt": "Ecrã inicial do React Quiz",
        "more.quiz.kind": "Projeto do curso de React",
        "more.quiz.desc":
            "Quiz interativo com perguntas cronometradas, acompanhamento de progresso e pontuação dinâmica, com o estado gerido através de useReducer e Context API.",
        "more.artist.alt": "Página inicial do website do artista musical",
        "more.artist.kind": "Caso prático do curso",
        "more.artist.title": "Website de Artista Musical",
        "more.artist.desc":
            "Website completo para um artista musical, com apresentação visual, elementos de e-commerce e promoção de eventos, com integração PHP.",
        "more.wp.alt": "Website do artista musical recriado em WordPress",
        "more.wp.title": "Artista Musical em WordPress",
        "more.wp.desc":
            "O mesmo website do artista musical recriado em WordPress com o editor Gutenberg, para praticar outra tecnologia.",
        "more.js.alt": "Pig Game, um jogo de dados para dois jogadores",
        "more.js.title": "Mini-projetos em JavaScript",
        "more.js.desc":
            "Três pequenos projetos focados em manipulação do DOM, gestão de eventos e estado de jogo: um jogo de adivinhar números, uma janela modal e um jogo de dados para dois jogadores.",
        "video.close": "Fechar vídeo",

        // UX/UI case studies
        "cases.title": "Casos de estudo de design UX/UI",
        "cases.intro":
            "Três casos de estudo em Figma, cada um desde a investigação até protótipos de alta fidelidade totalmente interligados e uma biblioteca de componentes.",
        "cases.speakers": "E-commerce de áudio",
        "cases.wavground": "App mobile de beats",
        "cases.pulse": "Painel SaaS",

        // Contact & footer
        "contact.eyebrow": "Fala comigo",
        "contact.title": "Vamos construir algo juntos",
        "contact.intro":
            "Tens um projeto em mente, uma pergunta, ou só queres dizer olá? A minha caixa de email está sempre aberta.",
        "contact.copy": "Copiar endereço de email",
        "footer.label": "Rodapé",
        "footer.rights": "Todos os direitos reservados.",
    },
};
