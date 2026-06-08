document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for scroll animation triggers
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // Client Intercept for Lead / Inquiry Forms (Mock Action Processing)
  const structuralForms = document.querySelectorAll("form");
  structuralForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      // Allow specific form customizations if explicitly declared
      if (form.dataset.customSubmit === "true") return;

      e.preventDefault();
      
      // Animate form outwards, reveal local confirmation alerts
      form.style.opacity = "0.4";
      form.style.pointerEvents = "none";
      
      const targetSuccessBox = form.parentElement.querySelector(".form-success-alert") || 
                               document.getElementById("contactSuccess") || 
                               document.getElementById("partnerSuccess");
                               
      if (targetSuccessBox) {
        form.style.display = "none";
        targetSuccessBox.style.display = "flex";
        targetSuccessBox.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        alert("Thank you. Your request was securely processed within our simulated interface sandbox.");
        form.reset();
        form.style.opacity = "1";
        form.style.pointerEvents = "auto";
      }
    });
  });
});
