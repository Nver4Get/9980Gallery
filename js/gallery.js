const galleryImages = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const previousButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function showImage(index) {
  currentIndex = index;
  lightboxImage.src = galleryImages[currentIndex].src;
  lightbox.classList.add("active");
}

galleryImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    showImage(index);
  });
});

previousButton.addEventListener("click", (event) => {
  event.stopPropagation();

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = galleryImages.length - 1;
  }

  showImage(currentIndex);
});

nextButton.addEventListener("click", (event) => {
  event.stopPropagation();

  currentIndex++;

  if (currentIndex >= galleryImages.length) {
    currentIndex = 0;
  }

  showImage(currentIndex);
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    lightbox.classList.remove("active");
  }

  if (event.key === "ArrowLeft") {
    previousButton.click();
  }

  if (event.key === "ArrowRight") {
    nextButton.click();
  }
});

lightbox.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].screenX;
  },
  { passive: true },
);

lightbox.addEventListener(
  "touchend",
  (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;

    // Abaikan gerakan yang terlalu pendek
    if (Math.abs(swipeDistance) < 50) {
      return;
    }
    if (swipeDistance < 0) {
      nextButton.click();
    } else {
      previousButton.click();
    }
  },
  { passive: true },
);

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
}
