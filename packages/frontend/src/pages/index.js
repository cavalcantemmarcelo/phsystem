import Header from "@/sections/Header";
import ForWhomSection from "@/sections/ForWhomSection";
import BackToTopButton from "@/components/BackToTopButton";
import AuthorSection from "@/sections/AuthorSection";
import ToolsSection from "@/sections/ToolsSection";
import FeaturesSection from "@/sections/FeaturesSection";
import ModulesSection from "@/sections/ModulesSection";
import FaqSection from "@/sections/FaqSection";
import Footer from "@/sections/Footer";
import LogoutButton from "@/components/LogoutButton";

const ctaLinkDefault = "https://seusite.com/seu-link";
const faqData = {
  qas: [
    {
      question: "O que é o Produto?",
      answer: "Uma breve descrição do produto e para quem é destinado.",
    },
    {
      question: "Como funciona?",
      answer: "Explicação de como o produto opera e seus principais recursos.",
    },
    {
      question: "Quem somos?",
      answer:
        "Uma breve descrição de sua empresa e sua expertise na indústria.",
    },
  ],
  ctaLink: ctaLinkDefault,
  ctaText: "Saiba mais sobre nosso produto",
};

const authorData = {
  title: "Autor: Sua Empresa",
  teacherName: "Sua Empresa",
  teacherDescription:
    "Uma breve descrição de sua empresa e sua dedicação à qualidade e inovação.",
  teacherImageSrc: "./sua-imagem.jpg",
  ctaLink: ctaLinkDefault,
  ctaText: "Conheça nossos produtos",
};

const featuresData = {
  title: "Recursos do Produto",
  subtitle: "Descubra por que nosso produto é a melhor escolha.",
  features: [
    {
      iconClass: "fas fa-cogs",
      title: "Recursos Avançados",
      description: "Descrição dos recursos avançados de seu produto.",
    },
    {
      iconClass: "fas fa-chart-line",
      title: "Medição Precisa",
      description: "Informação sobre a precisão de medição de seu produto.",
    },
    {
      iconClass: "fas fa-wrench",
      title: "Fácil de Usar",
      description: "Como seu produto é fácil de usar e manter.",
    },
  ],
  ctaLink: ctaLinkDefault,
  ctaText: "Veja em detalhes",
};

const headerData = {
  title: "Seu Produto: A Melhor Escolha",
  subtitle: "Uma descrição convincente de por que seu produto se destaca.",
  productImage: "./seu-produto.jpg",
  sections: [
    {
      iconClass: "fas fa-check-circle",
      iconColor: "text-primary",
      title: "Precisão Garantida",
      description:
        "Como seu produto oferece precisão e confiabilidade incomparáveis.",
    },
    {
      iconClass: "fas fa-wrench",
      title: "Fácil de Usar",
      description:
        "Como seu produto é projetado para facilitar o uso e garantir testes fáceis.",
    },
    {
      iconClass: "fas fa-cogs",
      iconColor: "text-primary",
      title: "Resultados Rápidos",
      description:
        "Como seu produto oferece resultados de teste rápidos e precisos.",
    },
  ],
  ctaHeading: "Saiba mais sobre nosso produto",
  ctaLink: ctaLinkDefault,
  ctaText: "Conheça nossos produtos",
};

const forWhomData = {
  title: "Para quem é o Produto?",
  points: [
    "Descrição do público-alvo do seu produto.",
    "Quem pode se beneficiar com seu produto.",
    "Quem deve considerar adquirir seu produto.",
  ],
  ctaLink: ctaLinkDefault,
  ctaText: "Peça seu produto hoje",
};

const modulesData = {
  title: "Especificações do Produto",
  subtitle: "Conheça os detalhes técnicos do seu produto.",
  modules: [
    {
      title: "Especificações Técnicas",
      description: "Informações técnicas detalhadas sobre o seu produto.",
      points: [
        "Especificações técnicas específicas.",
        "Detalhes sobre o funcionamento técnico.",
        "Medidas, dimensões e capacidade do produto.",
      ],
    },
  ],
  ctaLink: ctaLinkDefault,
  ctaText: "Peça o seu produto hoje",
};

const toolsData = {
  title: "Seu Produto: A Ferramenta Necessária",
  paragraphs: [
    {
      subtitle: "Mais Eficiência",
      description: "Como seu produto oferece mais eficiência em seu domínio.",
    },
    {
      subtitle: "Suporte Técnico",
      description:
        "Destaque o suporte técnico e assistência que sua empresa oferece.",
    },
  ],
  ctaLink: ctaLinkDefault,
  ctaText: "Peça o seu produto hoje",
  imageSrc: "./seu-produto.jpg",
  imageAlt: "Seu Produto",
};

export default function Home() {
  return (
    <>
      <Header data={headerData} />
      <ToolsSection data={toolsData} />
      <ForWhomSection data={forWhomData} />
      <FeaturesSection data={featuresData} />
      <ModulesSection data={modulesData} />
      <AuthorSection data={authorData} />
      <FaqSection data={faqData} />
      <Footer />
      <BackToTopButton />
    </>
  );
}
