import Header from "@/sections/Header";
import ForWhomSection from "@/sections/ForWhomSection";
import BackToTopButton from "@/components/BackToTopButton";
import AuthorSection from "@/sections/AuthorSection";
import ToolsSection from "@/sections/ToolsSection";
import FeaturesSection from "@/sections/FeaturesSection";
import ModulesSection from "@/sections/ModulesSection";
import FaqSection from "@/sections/FaqSection";
import Footer from "@/sections/Footer";
import WithLogin from "@/scripts/WithLogin";
import homeData from "./data/homeData";

function Home() {
  return (
    <>
      <ToolsSection data={homeData.toolsData} />
      <ForWhomSection data={homeData.forWhomData} />
      <FeaturesSection data={homeData.featuresData} />
      <ModulesSection data={homeData.modulesData} />
      <FaqSection data={homeData.faqData} />
      <BackToTopButton />
    </>
  );
}

export default WithLogin(Home);
