
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");
    const slides = document.querySelectorAll(".slider img, .slider video"); // Get all images & videos
    let index = 0;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    // ✅ **Right Arrow Click - Move Forward**
    rightArrow.addEventListener("click", function () {
        if (index < slides.length - 1) {
            index++;
        } else {
            index = 0; // Loop back to first image
        }
        updateSlider();
    });

    // ✅ **Left Arrow Click - Move Backward**
    leftArrow.addEventListener("click", function () {
        if (index > 0) {
            index--;
        } else {
            index = slides.length - 1; // Loop to last image
        }
        updateSlider();
    });

    // ✅ **Auto-Slide Every 5 Seconds (Optional)**
    setInterval(function () {
        if (index < slides.length - 1) {
            index++;
        } else {
            index = 0;
        }
        updateSlider();
    }, 5000); // Change slide every 5 seconds

    updateSlider(); // Start from first image
});
// 

// Wait till HTML is loaded
document.addEventListener("DOMContentLoaded", () => {
    const requestBtn = document.querySelector(".request-btn"); // ✅ Update class here
    const modal = document.getElementById("requestForm");

    if (requestBtn && modal) {
      requestBtn.addEventListener("click", (e) => {
        e.preventDefault(); // prevent link jump
        modal.style.display = "flex";
      });

      // ESC key closes form
      document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
          modal.style.display = "none";
        }
      });
    }
  });

  // ❌ button inside form
  function closeForm() {
    const modal = document.getElementById("requestForm");
    modal.style.display = "none";
  }