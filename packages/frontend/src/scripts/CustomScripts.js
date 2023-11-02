import { useEffect } from "react";

function CustomScripts() {
  useEffect(() => {
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  return null;
}

export default CustomScripts;
