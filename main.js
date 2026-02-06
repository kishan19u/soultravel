// nav bar
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    const menuBtnIcon = menuBtn.querySelector("i");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.className = isOpen ? "ri-close-line" : "ri-menu-line";
    });
  }
});

// contact us 
function openContactInfo() {
  document.getElementById("contactInfoModal").style.display = "flex";
}
function closeContactInfo() {
  document.getElementById("contactInfoModal").style.display = "none";
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeContactInfo();
});

// about us
function openAboutUs() {
  document.getElementById("aboutUsModal").style.display = "flex";
}
function closeAboutUs() {
  document.getElementById("aboutUsModal").style.display = "none";
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeAboutUs();
});

// book now function
function openBookingForm(button) {
  const destination = button.getAttribute("data-destination");
  document.getElementById("destination-input").value = destination;
  document.getElementById("requestForm").style.display = "flex";
}

// 🔍 Search bar functionality
function initializeSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  const workCards = document.querySelectorAll("#destinations .work");
  const headings = document.querySelectorAll("#destinations h1");
  const noResultMsg = document.getElementById("no-result");
  const slider = document.querySelector(".container");
  const sectionsToHide = slider ? [slider] : [];

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let anyMatch = false;

    workCards.forEach(card => {
      const title = card.getAttribute("data-title")?.toLowerCase() || "";
      if (title.includes(searchTerm) && searchTerm.length > 0) {
        card.style.display = "block";
        anyMatch = true;
      } else {
        card.style.display = "none";
      }
    });

    if (searchTerm.length > 0) {
      sectionsToHide.forEach(section => section?.classList.add("hidden-on-search"));
      headings.forEach(h => h.classList.add("hidden-on-search"));

      if (anyMatch) {
        noResultMsg?.classList.add("hidden-on-search");
        const firstVisible = Array.from(workCards).find(c => c.style.display === "block");
        if (firstVisible) firstVisible.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        noResultMsg?.classList.remove("hidden-on-search");
        noResultMsg?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      sectionsToHide.forEach(section => section?.classList.remove("hidden-on-search"));
      headings.forEach(h => h.classList.remove("hidden-on-search"));
      noResultMsg?.classList.add("hidden-on-search");
      workCards.forEach(card => (card.style.display = "block"));
    }
  });
}

// 📞 Modal show/hide
function openRequestForm() {
  const modal = document.getElementById("requestForm");
  if (modal) modal.style.display = "flex";
}
function closeRequestForm() {
  const modal = document.getElementById("requestForm");
  if (modal) modal.style.display = "none";
}

// ✅ Bind request callback button (AFTER header is loaded)
function bindRequestBtn() {
  const tryBind = () => {
    const btn = document.querySelector(".request-btn");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openRequestForm();
      });
    } else {
      setTimeout(tryBind, 100);
    }
  };
  tryBind();
}

// Show current destination tag
function showCurrentDestinationTag() {
  const params = new URLSearchParams(window.location.search);
  const dest = params.get("dest");
  const tagContainer = document.getElementById("package-highlight");
  const tag = tagContainer?.querySelector("span");

  if (!dest || !tagContainer || !tag) return;

  const formatted = dest.charAt(0).toUpperCase() + dest.slice(1);
  tag.textContent = `✨ You're viewing: ${formatted} Tour`;
  tagContainer.style.display = "flex";
}

// DOM Ready Initializers
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    bindRequestBtn();
    bindCallbackForm();
    bindEnquiryForm();
    initializeSearch();
    showCurrentDestinationTag();
  }, 300);
});

// Bind callback modal form
function bindCallbackForm() {
  const form = document.getElementById("callbackForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await submitForm({
      destination: document.getElementById("callback-destination").value,
      name: document.getElementById("callback-name").value,
      email: document.getElementById("callback-email").value,
      phone: document.getElementById("callback-phone").value,
      travel_date: document.getElementById("callback-date").value,
      people: document.getElementById("callback-people").value,
      remarks: document.getElementById("callback-remarks").value,
    });
    form.reset();
    closeRequestForm();
  });
}

// Bind visible enquiry form
function bindEnquiryForm() {
  const form = document.getElementById("enquiryForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await submitForm({
      destination: document.getElementById("form-destination").value,
      name: document.getElementById("enquiry-name").value,
      email: document.getElementById("enquiry-email").value,
      phone: document.getElementById("enquiry-phone").value,
      travel_date: document.getElementById("enquiry-date").value,
      people: document.getElementById("enquiry-people").value,
      remarks: document.getElementById("enquiry-remarks").value,
    });
    form.reset();
  });
}

// Form submit function
async function submitForm(data) {
  try {
    const response = await fetch("http://localhost:5000/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.error) {
      alert("❌ Error: " + result.error);
    } else {
      alert("✔️ Submitted successfully!");
    }
  } catch (error) {
    console.error("Submit failed", error);
    alert("⚠️ Failed to submit. Please check the server.");
  }
}
