<<<<<<< HEAD
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
  menuToggle.classList.toggle("active");

  const icon = menuToggle.querySelector("i");

  if (mobileMenu.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

// Close menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    menuToggle.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

// Close mobile menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    mobileMenu.classList.remove("show");
    menuToggle.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});
//search bar
const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Search button clicked!");
});
//images chances 
const cars = document.querySelectorAll(".hero-car-img");
const bgShape = document.getElementById("bgShape");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function updateSlider(index) {
  cars.forEach((car, i) => {
    car.classList.remove("active");
    dots[i].classList.remove("active");
  });

  cars[index].classList.add("active");
  dots[index].classList.add("active");

  const color = cars[index].getAttribute("data-color");

  bgShape.style.background = `linear-gradient(180deg, ${color}, ${shadeColor(color, -20)})`;
  bgShape.style.boxShadow = `0 28px 70px ${hexToRgba(color, 0.28)}`;
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= cars.length) {
    currentIndex = 0;
  }
  updateSlider(currentIndex);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateSlider(currentIndex);
  });
});

setInterval(nextSlide, 3500);

/* Helper: darker shade */
function shadeColor(color, percent) {
  let f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00FF,
    B = f & 0x0000FF;

  return (
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p / 100) + R) * 0x10000 +
      (Math.round((t - G) * p / 100) + G) * 0x100 +
      (Math.round((t - B) * p / 100) + B)
    )
      .toString(16)
      .slice(1)
  );
}

/* Helper: hex to rgba */
function hexToRgba(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* Start first slide properly */
updateSlider(currentIndex);

const words = [
  "rental car?",
  "next trip?",
  "business ride?",
  "family journey?",
  "luxury drive?"
];

const typingText = document.getElementById("typing-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 60;
let delayBetweenWords = 1600;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenWords);
      return;
    }

    setTimeout(typeEffect, typingSpeed);
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, deletingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
document.addEventListener("DOMContentLoaded", () => {
  const brandTrack = document.querySelector(".brand-track");

  if (window.innerWidth < 576) {
    brandTrack.style.animationDuration = "16s";
  } else if (window.innerWidth < 768) {
    brandTrack.style.animationDuration = "20s";
  } else {
    brandTrack.style.animationDuration = "24s";
  }
});
//dates 
const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");

const pickupText = document.getElementById("pickupText");
const returnText = document.getElementById("returnText");

const pickupItem = document.getElementById("pickupItem");
const returnItem = document.getElementById("returnItem");

const carSearchForm = document.getElementById("carSearchForm");

/* Open date picker when user clicks the nice visible field */
pickupItem.addEventListener("click", () => {
  if (pickupDate.showPicker) {
    pickupDate.showPicker();
  } else {
    pickupDate.focus();
    pickupDate.click();
  }
});

returnItem.addEventListener("click", () => {
  if (returnDate.showPicker) {
    returnDate.showPicker();
  } else {
    returnDate.focus();
    returnDate.click();
  }
});

/* Highlight active date item */
pickupDate.addEventListener("focus", () => pickupItem.classList.add("active"));
pickupDate.addEventListener("blur", () => pickupItem.classList.remove("active"));

returnDate.addEventListener("focus", () => returnItem.classList.add("active"));
returnDate.addEventListener("blur", () => returnItem.classList.remove("active"));

/* Show selected date nicely */
pickupDate.addEventListener("change", function () {
  if (this.value) {
    pickupText.value = formatDate(this.value);

    /* return date cannot be earlier than pickup date */
    returnDate.min = this.value;
  }
});

returnDate.addEventListener("change", function () {
  if (this.value) {
    returnText.value = formatDate(this.value);
  }
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

/* Optional submit test */
carSearchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const location = document.getElementById("locationSelect").value;
  const pickup = pickupDate.value;
  const returning = returnDate.value;

  if (!location || !pickup || !returning) {
    alert("Please choose location, pick-up date, and return date.");
    return;
  }

  if (new Date(returning) < new Date(pickup)) {
    alert("Return date cannot be earlier than pick-up date.");
    return;
  }

  alert(`Search submitted for ${location}\nPick-up: ${formatDate(pickup)}\nReturn: ${formatDate(returning)}`);
});

/* =========================
   HOW IT WORKS REVEAL
========================= */
const revealItems = document.querySelectorAll(".reveal-up, .reveal-line");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.2
});

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

/* =========================
   ABOUT SECTION REVEAL
========================= */
const aboutRevealItems = document.querySelectorAll(".reveal-left, .reveal-right");

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.2
});

aboutRevealItems.forEach((item) => {
  aboutObserver.observe(item);
});

/* =========================
   COUNTER ANIMATION
========================= */
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const speed = target / 80;

      const updateCounter = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
      observer.unobserve(counter);
    }
  });
}, {
  threshold: 0.5
});

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/* =========================
   FLEET SECTION REVEAL
========================= */
const fleetRevealItems = document.querySelectorAll(".fleet-section .reveal-up");

const fleetObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

fleetRevealItems.forEach((item) => {
  fleetObserver.observe(item);
});

/* Optional active fleet card hover focus */
const fleetCards = document.querySelectorAll(".fleet-card");

fleetCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    fleetCards.forEach((item) => item.classList.remove("active-fleet-card"));
    card.classList.add("active-fleet-card");
  });
});

/* =========================
   SERVICES SECTION REVEAL
========================= */
const serviceItems = document.querySelectorAll(".services-section .reveal-up");

const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

serviceItems.forEach((item) => {
  serviceObserver.observe(item);
});

/* Optional active card interaction */
const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    serviceCards.forEach((item) => item.classList.remove("active-service-card"));
    card.classList.add("active-service-card");
  });
});
/* =========================
   SERVICE MODAL POPUP
========================= */
const serviceLinks = document.querySelectorAll(".service-link");
const serviceModal = document.getElementById("serviceModal");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalBtn = document.getElementById("serviceModalBtn");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalText = document.getElementById("serviceModalText");

serviceLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const title = this.getAttribute("data-title");
    const text = this.getAttribute("data-text");

    serviceModalTitle.textContent = title;
    serviceModalText.textContent = text;

    serviceModal.classList.add("show");
    document.body.classList.add("modal-open");
  });
});

function closeServiceModal() {
  serviceModal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

serviceModalClose.addEventListener("click", closeServiceModal);
serviceModalOverlay.addEventListener("click", closeServiceModal);
serviceModalBtn.addEventListener("click", closeServiceModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeServiceModal();
  }
});

/* =========================
   FEATURED CARS REVEAL
========================= */
const featuredItems = document.querySelectorAll(".featured-cars-section .reveal-up");

const featuredObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

featuredItems.forEach((item) => {
  featuredObserver.observe(item);
});

/* Favorite button interaction */
const favButtons = document.querySelectorAll(".fav-btn");

favButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");

    const icon = button.querySelector("i");
    if (button.classList.contains("active")) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // reveal once only
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     REVEAL ON SCROLL
  ========================= */
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* =========================
     TESTIMONIAL SWITCHER
  ========================= */
  const avatarItems = document.querySelectorAll(".avatar-item");
  const testimonialText = document.getElementById("testimonialText");
  const testimonialName = document.getElementById("testimonialName");
  const testimonialRole = document.getElementById("testimonialRole");

  avatarItems.forEach((item) => {
    item.addEventListener("click", () => {
      avatarItems.forEach((avatar) => avatar.classList.remove("active"));
      item.classList.add("active");

      const text = item.getAttribute("data-text");
      const name = item.getAttribute("data-name");
      const role = item.getAttribute("data-role");

      testimonialText.textContent = text;
      testimonialName.textContent = name;
      testimonialRole.textContent = role;
    });
  });

  /* =========================
     FAQ ACCORDION
  ========================= */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active-faq");

      faqItems.forEach((faq) => faq.classList.remove("active-faq"));

      if (!isActive) {
        item.classList.add("active-faq");
      }
    });
  });
});
/* =========================
   CONTACT FORM
========================= */
const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById("contactFormMessage");

if (contactForm && contactFormMessage) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");

    contactFormMessage.textContent = `Thank you ${name}! Your message has been sent successfully.`;
    contactForm.reset();

    setTimeout(() => {
      contactFormMessage.textContent = "";
    }, 4000);
  });
}

=======
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
  menuToggle.classList.toggle("active");

  const icon = menuToggle.querySelector("i");

  if (mobileMenu.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

// Close menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
    menuToggle.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

// Close mobile menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    mobileMenu.classList.remove("show");
    menuToggle.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});
//search bar
const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Search button clicked!");
});
//images chances 
const cars = document.querySelectorAll(".hero-car-img");
const bgShape = document.getElementById("bgShape");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function updateSlider(index) {
  cars.forEach((car, i) => {
    car.classList.remove("active");
    dots[i].classList.remove("active");
  });

  cars[index].classList.add("active");
  dots[index].classList.add("active");

  const color = cars[index].getAttribute("data-color");

  bgShape.style.background = `linear-gradient(180deg, ${color}, ${shadeColor(color, -20)})`;
  bgShape.style.boxShadow = `0 28px 70px ${hexToRgba(color, 0.28)}`;
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= cars.length) {
    currentIndex = 0;
  }
  updateSlider(currentIndex);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateSlider(currentIndex);
  });
});

setInterval(nextSlide, 3500);

/* Helper: darker shade */
function shadeColor(color, percent) {
  let f = parseInt(color.slice(1), 16),
    t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent,
    R = f >> 16,
    G = (f >> 8) & 0x00FF,
    B = f & 0x0000FF;

  return (
    "#" +
    (
      0x1000000 +
      (Math.round((t - R) * p / 100) + R) * 0x10000 +
      (Math.round((t - G) * p / 100) + G) * 0x100 +
      (Math.round((t - B) * p / 100) + B)
    )
      .toString(16)
      .slice(1)
  );
}

/* Helper: hex to rgba */
function hexToRgba(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* Start first slide properly */
updateSlider(currentIndex);

const words = [
  "rental car?",
  "next trip?",
  "business ride?",
  "family journey?",
  "luxury drive?"
];

const typingText = document.getElementById("typing-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 60;
let delayBetweenWords = 1600;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenWords);
      return;
    }

    setTimeout(typeEffect, typingSpeed);
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, deletingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
document.addEventListener("DOMContentLoaded", () => {
  const brandTrack = document.querySelector(".brand-track");

  if (window.innerWidth < 576) {
    brandTrack.style.animationDuration = "16s";
  } else if (window.innerWidth < 768) {
    brandTrack.style.animationDuration = "20s";
  } else {
    brandTrack.style.animationDuration = "24s";
  }
});
//dates 
const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");

const pickupText = document.getElementById("pickupText");
const returnText = document.getElementById("returnText");

const pickupItem = document.getElementById("pickupItem");
const returnItem = document.getElementById("returnItem");

const carSearchForm = document.getElementById("carSearchForm");

/* Open date picker when user clicks the nice visible field */
pickupItem.addEventListener("click", () => {
  if (pickupDate.showPicker) {
    pickupDate.showPicker();
  } else {
    pickupDate.focus();
    pickupDate.click();
  }
});

returnItem.addEventListener("click", () => {
  if (returnDate.showPicker) {
    returnDate.showPicker();
  } else {
    returnDate.focus();
    returnDate.click();
  }
});

/* Highlight active date item */
pickupDate.addEventListener("focus", () => pickupItem.classList.add("active"));
pickupDate.addEventListener("blur", () => pickupItem.classList.remove("active"));

returnDate.addEventListener("focus", () => returnItem.classList.add("active"));
returnDate.addEventListener("blur", () => returnItem.classList.remove("active"));

/* Show selected date nicely */
pickupDate.addEventListener("change", function () {
  if (this.value) {
    pickupText.value = formatDate(this.value);

    /* return date cannot be earlier than pickup date */
    returnDate.min = this.value;
  }
});

returnDate.addEventListener("change", function () {
  if (this.value) {
    returnText.value = formatDate(this.value);
  }
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

/* Optional submit test */
carSearchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const location = document.getElementById("locationSelect").value;
  const pickup = pickupDate.value;
  const returning = returnDate.value;

  if (!location || !pickup || !returning) {
    alert("Please choose location, pick-up date, and return date.");
    return;
  }

  if (new Date(returning) < new Date(pickup)) {
    alert("Return date cannot be earlier than pick-up date.");
    return;
  }

  alert(`Search submitted for ${location}\nPick-up: ${formatDate(pickup)}\nReturn: ${formatDate(returning)}`);
});

/* =========================
   HOW IT WORKS REVEAL
========================= */
const revealItems = document.querySelectorAll(".reveal-up, .reveal-line");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.2
});

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

/* =========================
   ABOUT SECTION REVEAL
========================= */
const aboutRevealItems = document.querySelectorAll(".reveal-left, .reveal-right");

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.2
});

aboutRevealItems.forEach((item) => {
  aboutObserver.observe(item);
});

/* =========================
   COUNTER ANIMATION
========================= */
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const speed = target / 80;

      const updateCounter = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
      observer.unobserve(counter);
    }
  });
}, {
  threshold: 0.5
});

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/* =========================
   FLEET SECTION REVEAL
========================= */
const fleetRevealItems = document.querySelectorAll(".fleet-section .reveal-up");

const fleetObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

fleetRevealItems.forEach((item) => {
  fleetObserver.observe(item);
});

/* Optional active fleet card hover focus */
const fleetCards = document.querySelectorAll(".fleet-card");

fleetCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    fleetCards.forEach((item) => item.classList.remove("active-fleet-card"));
    card.classList.add("active-fleet-card");
  });
});

/* =========================
   SERVICES SECTION REVEAL
========================= */
const serviceItems = document.querySelectorAll(".services-section .reveal-up");

const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

serviceItems.forEach((item) => {
  serviceObserver.observe(item);
});

/* Optional active card interaction */
const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    serviceCards.forEach((item) => item.classList.remove("active-service-card"));
    card.classList.add("active-service-card");
  });
});
/* =========================
   SERVICE MODAL POPUP
========================= */
const serviceLinks = document.querySelectorAll(".service-link");
const serviceModal = document.getElementById("serviceModal");
const serviceModalOverlay = document.getElementById("serviceModalOverlay");
const serviceModalClose = document.getElementById("serviceModalClose");
const serviceModalBtn = document.getElementById("serviceModalBtn");
const serviceModalTitle = document.getElementById("serviceModalTitle");
const serviceModalText = document.getElementById("serviceModalText");

serviceLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const title = this.getAttribute("data-title");
    const text = this.getAttribute("data-text");

    serviceModalTitle.textContent = title;
    serviceModalText.textContent = text;

    serviceModal.classList.add("show");
    document.body.classList.add("modal-open");
  });
});

function closeServiceModal() {
  serviceModal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

serviceModalClose.addEventListener("click", closeServiceModal);
serviceModalOverlay.addEventListener("click", closeServiceModal);
serviceModalBtn.addEventListener("click", closeServiceModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeServiceModal();
  }
});

/* =========================
   FEATURED CARS REVEAL
========================= */
const featuredItems = document.querySelectorAll(".featured-cars-section .reveal-up");

const featuredObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

featuredItems.forEach((item) => {
  featuredObserver.observe(item);
});

/* Favorite button interaction */
const favButtons = document.querySelectorAll(".fav-btn");

favButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");

    const icon = button.querySelector("i");
    if (button.classList.contains("active")) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // reveal once only
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     REVEAL ON SCROLL
  ========================= */
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* =========================
     TESTIMONIAL SWITCHER
  ========================= */
  const avatarItems = document.querySelectorAll(".avatar-item");
  const testimonialText = document.getElementById("testimonialText");
  const testimonialName = document.getElementById("testimonialName");
  const testimonialRole = document.getElementById("testimonialRole");

  avatarItems.forEach((item) => {
    item.addEventListener("click", () => {
      avatarItems.forEach((avatar) => avatar.classList.remove("active"));
      item.classList.add("active");

      const text = item.getAttribute("data-text");
      const name = item.getAttribute("data-name");
      const role = item.getAttribute("data-role");

      testimonialText.textContent = text;
      testimonialName.textContent = name;
      testimonialRole.textContent = role;
    });
  });

  /* =========================
     FAQ ACCORDION
  ========================= */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active-faq");

      faqItems.forEach((faq) => faq.classList.remove("active-faq"));

      if (!isActive) {
        item.classList.add("active-faq");
      }
    });
  });
});
/* =========================
   CONTACT FORM
========================= */
const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById("contactFormMessage");

if (contactForm && contactFormMessage) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");

    contactFormMessage.textContent = `Thank you ${name}! Your message has been sent successfully.`;
    contactForm.reset();

    setTimeout(() => {
      contactFormMessage.textContent = "";
    }, 4000);
  });
}

>>>>>>> c8a6d77 (upload car rental website)
