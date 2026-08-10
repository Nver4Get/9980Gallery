const galleryImages = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const previousButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");

const themeToggle = document.getElementById("theme-toggle");
const categoryFilter = document.getElementById("category-filter");

let currentIndex = 0;
let visibleImages = [];

let touchStartX = 0;
let touchEndX = 0;


function updateVisibleImages() {
  visibleImages = Array.from(galleryImages).filter((image) => {
    return image.style.display !== "none";
  });
}


function showImage(index) {
  updateVisibleImages();

  if (visibleImages.length === 0) {
    return;
  }

  currentIndex = index;

  if (currentIndex < 0) {
    currentIndex = visibleImages.length - 1;
  }

  if (currentIndex >= visibleImages.length) {
    currentIndex = 0;
  }

  lightboxImage.src = visibleImages[currentIndex].src;

  lightbox.classList.add("active");
}


galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    updateVisibleImages();

    showImage(visibleImages.indexOf(image));
  });
});


previousButton.addEventListener("click", (event) => {
  event.stopPropagation();

  updateVisibleImages();

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = visibleImages.length - 1;
  }

  showImage(currentIndex);
});


nextButton.addEventListener("click", (event) => {
  event.stopPropagation();

  updateVisibleImages();

  currentIndex++;

  if (currentIndex >= visibleImages.length) {
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


if (categoryFilter) {
  categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;

    galleryImages.forEach((image) => {
      const imageCategory = image.dataset.category;

      if (
        selectedCategory === "all" ||
        imageCategory === selectedCategory
      ) {
        image.style.display = "block";
      } else {
        image.style.display = "none";
      }
    });

    updateVisibleImages();

    lightbox.classList.remove("active");
  });
}


updateVisibleImages();
