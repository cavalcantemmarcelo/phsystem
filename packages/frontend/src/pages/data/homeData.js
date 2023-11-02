const ctaLinkDefault = "#";

const homeData = {
  authorData: {
    title: "Autor: PH System",
    teacherName: "PH System",
    teacherDescription:
      "A PH System está comprometida com a qualidade e inovação na gestão de saúde pública.",
    teacherImageSrc: "./sua-imagem.jpg",
    ctaLink: ctaLinkDefault,
    ctaText: "Descubra Nossos Sistemas",
  },

  featuresData: {
    title: "Recursos do Sistema",
    subtitle: "Descubra por que nosso Sistema é a melhor escolha.",
    features: [
      {
        iconClass: "fas fa-cogs",
        title: "Recursos Avançados",
        description: "Explore os recursos avançados do PH System.",
      },
      {
        iconClass: "fas fa-chart-line",
        title: "Medição Precisa",
        description:
          "Obtenha informações sobre a precisão de medição do PH System.",
      },
      {
        iconClass: "fas fa-wrench",
        title: "Fácil de Usar",
        description: "Descubra como o PH System é fácil de usar.",
      },
      {
        iconClass: "fas fa-check",
        title: "Compromisso",
        description: "Desenvolvimento com melhorias contínuas.",
      },
    ],
    ctaLink: ctaLinkDefault,
    ctaText: "Explore em Detalhes",
  },

  headerData: {
    title: "PH System: A Melhor Escolha",
    subtitle:
      "Uma descrição convincente do motivo pelo qual o PH System se destaca.",
    productImage: "./ph-system.jpg",
    sections: [
      {
        iconClass: "fas fa-check-circle",
        iconColor: "text-primary",
        title: "Precisão Garantida",
        description:
          "Saiba como o PH System oferece precisão e confiabilidade incomparáveis.",
      },
      {
        iconClass: "fas fa-wrench",
        title: "Fácil de Usar",
        description:
          "Descubra como o PH System é projetado para facilitar o uso e garantir testes fáceis.",
      },
      {
        iconClass: "fas fa-cogs",
        iconColor: "text-primary",
        title: "Resultados Rápidos",
        description:
          "Veja como o PH System oferece resultados de teste rápidos e precisos.",
      },
    ],
    ctaHeading: "Saiba Mais Sobre Nosso Sistema",
    ctaLink: ctaLinkDefault,
    ctaText: "Conheça Nossos Sistemas",
  },

  forWhomData: {
    title: "Para Quem é o Sistema?",
    points: [
      "Destinado a usuários do sistema público de saúde.",
      "Ideal para pessoas em busca de mais qualidade nos serviços públicos de saúde.",
      "Perfeito para quem precisa agendar atendimentos de forma eficiente.",
    ],
    ctaLink: ctaLinkDefault,
    ctaText: "Faça seu agendamento",
  },

  modulesData: {
    title: "Especificações do Sistema",
    subtitle: "Conheça os detalhes técnicos do PH System.",
    modules: [
      {
        title: "Arquitetura",
        description: "Detalhes técnicos completos sobre o PH System.",
        points: [
          "Desenvolvido com tecnologias modernas.",
          "Focado em alto desempenho e eficiência.",
          "Aplicação de princípios SOLID.",
        ],
      },
      {
        title: "SPA",
        description: "Single Page Application",
        points: ["React.js", "Next.js (SSR)", "TailwindCSS"],
      },
      {
        title: "MVC",
        description: "Model View Controller",
        points: [
          "Back-end em Node.js",
          "Separação de camadas.",
          "Projeto monorepo.",
        ],
      },
    ],
    ctaLink: ctaLinkDefault,
    ctaText: "Faça seu agendamento",
  },

  toolsData: {
    title: "PH System: A Ferramenta Necessária",
    paragraphs: [
      {
        subtitle: "Mais Eficiência",
        description:
          "Descubra como o PH System aumenta a eficiência no setor de saúde pública.",
      },
      {
        subtitle: "Atendimento mais humanizado e com hora marcada",
        description:
          "Uma necessidade que cada vez mais se torna mais evidente nos dias atuais.",
      },
    ],
    ctaLink: ctaLinkDefault,
    ctaText: "Faça seu agendamento",
    imageSrc: "./ph-system.jpg",
    imageAlt: "PH System",
  },

  faqData: {
    qas: [
      {
        question: "O que é o PH System?",
        answer:
          "O PH System é um sistema online para o agendamento de atendimentos hospitalares, visando facilitar o acesso aos serviços de saúde pública.",
      },
      {
        question: "Como funciona?",
        answer:
          "O PH System permite o agendamento de procedimentos de acordo com a disponibilidade dos serviços de saúde pública, proporcionando um atendimento mais eficiente.",
      },
      {
        question: "Quem somos?",
        answer:
          "Somos uma equipe de profissionais de tecnologia e engenharia de software, dedicados a encontrar soluções para melhorar o sistema de saúde pública.",
      },
      {
        question: "Em que fase o projeto está?",
        answer:
          "O projeto encontra-se em fase inicial, focando na validação das funcionalidades básicas por meio de seu MVP (Minimum Viable Product).",
      },
    ],
    ctaLink: ctaLinkDefault,
    ctaText: "Saiba mais sobre o sistema",
  },
};

export default homeData;
