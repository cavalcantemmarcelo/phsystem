import { useEffect } from 'react';

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

    function gtag_report_conversion(url) {
      var callback = function () {
        if (typeof(url) != 'undefined') {
          setTimeout(function(){
            window.location = url;
          }, 500)
        }
      };
      gtag('event', 'conversion', {
        'send_to': 'AW-11341131988/bfmOCO66--IYENTh758q',
        'transaction_id': '',
        'event_callback': callback
      });
      return false;
    }

    var checkoutButtons = document.querySelectorAll('.checkout-button'); 
    for (var i = 0; i < checkoutButtons.length; i++) {
      checkoutButtons[i].addEventListener('click', function(e) {
        // e.preventDefault();
        var url = window.location.href;
        gtag_report_conversion(url);
      });
    }
  }, []);

  return null;
}

export default CustomScripts;
