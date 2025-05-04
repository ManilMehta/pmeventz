let currentIndex = 0;
let autoSlideInterval;

function showSlide(index) {
  const track = document.querySelector('.carousel-track');
  const totalSlides = track.children.length;

  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  const offset = currentIndex * 600;
  track.style.transform = `translateX(-${offset}px)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Auto-play every 4 seconds
function startAutoplay() {
  autoSlideInterval = setInterval(nextSlide, 2000);
}

function stopAutoplay() {
  clearInterval(autoSlideInterval);
}

window.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
  startAutoplay();

  // Optional: pause on hover
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
});
