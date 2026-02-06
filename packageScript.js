function loadPackage() {
  const params = new URLSearchParams(window.location.search);
  const dest = params.get("dest");
  const data = packages[dest?.toLowerCase()];

  if (!data) {
    document.body.innerHTML =
      '<h2 style="text-align:center;margin-top:100px;color:red">Destination not found ❌</h2>';
    return;
  }

  // Set Page Title
  document.title = `${data.title} - SoulTravel`;
  document.getElementById("package-title").innerText = data.title;
  document.getElementById("package-duration").innerText = `${data.duration} • ${data.price}`;
  document.getElementById("form-destination").value = data.destination;

  // Main & Sub Images
  document.getElementById("main-img").src = data.heroImages[0];
  const subImageDiv = document.getElementById("sub-images");
  subImageDiv.innerHTML = "";
  data.heroImages.slice(1).forEach((img) => {
    const image = document.createElement("img");
    image.className = "sub-img";
    image.src = img;
    subImageDiv.appendChild(image);
  });

  // Itinerary
  const itineraryBox = document.getElementById("itinerary");
  itineraryBox.innerHTML = "";
  data.itinerary.forEach((day) => {
    const dayBox = document.createElement("div");
    dayBox.className = "day-box";

    const heading = document.createElement("h3");
    heading.innerHTML = `<span class='highlight'>${day.day}:</span> ${day.title}`;
    dayBox.appendChild(heading);

    day.description.forEach((p) => {
      const para = document.createElement("p");
      para.innerText = `• ${p}`;
      dayBox.appendChild(para);
    });

    if (day.features) {
      const featuresWrap = document.createElement("div");
      featuresWrap.className = "features";
      day.features.forEach((f) => {
        const card = document.createElement("div");
        card.className = "feature-card";
        card.innerHTML = `<strong>✔️</strong> ${f}`;
        featuresWrap.appendChild(card);
      });
      dayBox.appendChild(featuresWrap);
    }

    itineraryBox.appendChild(dayBox);
  });

  // Inclusions & Exclusions
  document.getElementById("inclusions").innerHTML = data.inclusions
    .map((item) => `<li>${item}</li>`)
    .join("");
  document.getElementById("exclusions").innerHTML = data.exclusions
    .map((item) => `<li>${item}</li>`)
    .join("");
}

// ✅ Fixed: Correct destination input field for modal
function openCallbackModal() {
  document.getElementById("requestForm").style.display = "flex";
  const params = new URLSearchParams(window.location.search);
  const dest = params.get("dest");
  if (dest && packages[dest]) {
    document.getElementById("callback-destination").value = packages[dest].destination;
  }
}

// ✅ Show tag like "You're viewing: Shimla Tour"
function showCurrentDestinationTag() {
  const params = new URLSearchParams(window.location.search);
  const dest = params.get("dest");

  if (!dest) return;

  const tagContainer = document.getElementById("package-highlight");
  const tag = tagContainer?.querySelector("span");

  if (tagContainer && tag) {
    const formatted = dest.charAt(0).toUpperCase() + dest.slice(1);
    tag.textContent = `✨ You're viewing: ${formatted} Tour`;
    tagContainer.style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", showCurrentDestinationTag);
