// Theme toggler
const toggleBtn = document.getElementById("theme-toggle");

// Default: dark mode
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light");
    toggleBtn.textContent = "Dark mode";
}
if (toggleBtn){
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight = document.body.classList.contains("light");
    toggleBtn.textContent = isLight ? "Dark mode" : "Light mode";
    localStorage.setItem("theme", isLight ? "light" : "dark");
});
}


// Reveal de .card hacia arriba
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
        });
    },
    {
        threshold: 0.15
    }
);

reveals.forEach(el => observer.observe(el));

// Image Carousel
const carousel = document.querySelector(".carousel");

if (carousel){
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = carousel.querySelector(".carousel-btn.next");
const prevBtn = carousel.querySelector(".carousel-btn.prev");
const captionEl = carousel.querySelector(".carousel-caption");
const counterEl = carousel.querySelector(".carousel-counter");

let currentIndex = 0;
let autoScrollInterval = null;

function updateCarousel() {
    const carouselWidth = carousel.getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * carouselWidth}px)`;

    const caption = slides[currentIndex].querySelector("figcaption").textContent;
    captionEl.style.opacity = 0;
    setTimeout(() => {
        captionEl.textContent = caption;
        captionEl.style.opacity = 1;
    }, 500);
    counterEl.style.opacity = 0;
    setTimeout(()=>{
        counterEl.textContent = `${currentIndex + 1}/${slides.length}`;
        counterEl.style.opacity = 1;
    },500);
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    currentIndex =
        (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 4000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

carousel.addEventListener("mouseenter", stopAutoScroll);
carousel.addEventListener("mouseleave", startAutoScroll);

window.addEventListener("load", () => {
    updateCarousel();
    startAutoScroll();
});

}
