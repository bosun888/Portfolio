document.addEventListener("DOMContentLoaded", function () {

  // =====================================================
  // Reveal Animation on Scroll
  // =====================================================
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 120;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();



  // =====================================================
  // Dark / Light Mode Toggle
  // =====================================================
  const toggleBtn = document.getElementById("themeToggle");

  if (toggleBtn) {

    // load saved theme
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light");
      toggleBtn.textContent = "🌙";
    }

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");

      if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
      } else {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
      }
    });
  }



  // =====================================================
  // Contact Form (Spinner + AJAX + Popup)
  // =====================================================
  const form = document.getElementById("contactForm");
  const spinner = document.getElementById("spinner");
  const popup = document.getElementById("successPopup");
  const closeBtn = document.getElementById("closePopupBtn");

  let timer;

  // run ONLY if contact page elements exist
  if (form && spinner && popup) {

    // always hide popup on page load
    popup.classList.add("hidden");

    // submit form
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      spinner.classList.remove("hidden");

      const formData = new FormData(form);

      try {
        await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        spinner.classList.add("hidden");

        showPopup();
        form.reset();

      } catch (error) {
        spinner.classList.add("hidden");
        alert("Something went wrong. Please try again.");
      }
    });


    // close button click
    if (closeBtn) {
      closeBtn.addEventListener("click", closePopup);
    }


    // show popup
    function showPopup() {
      popup.classList.remove("hidden");

      timer = setTimeout(() => {
        closePopup();
      }, 3000);
    }


    // hide popup
    function closePopup() {
      popup.classList.add("hidden");
      clearTimeout(timer);
    }
  }

});
