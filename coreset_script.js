// ==================== NAVIGATION ====================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    // Animate hamburger
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
}

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(12, 14, 22, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(12, 14, 22, 0.95)";
    navbar.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// ==================== ACTIVE NAVIGATION ====================
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
// Disabled to show all content immediately

// Observe elements for animation - smooth scroll-in effects
const animateElements = document.querySelectorAll(`
  .feature-card,
  .legacy-card,
  .step-card,
  .problem-card-main,
  .price-box
`);

// Cards are visible by default for immediate display
animateElements.forEach((el) => {
  el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
});

// ==================== BUTTON RIPPLE EFFECT ====================
document
  .querySelectorAll(".btn-participate, .btn-whitepaper, .btn-connect-wallet")
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

// Add ripple styles
const style = document.createElement("style");
style.textContent = `
  .btn-participate, .btn-whitepaper, .btn-connect-wallet {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
`;
document.head.appendChild(style);

// ==================== SCROLL TO TOP ====================
let scrollTopBtn;

function createScrollTopButton() {
  scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(scrollTopBtn);
}

createScrollTopButton();

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.visibility = "visible";
  } else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.visibility = "hidden";
  }
});

scrollTopBtn.addEventListener("mouseenter", () => {
  scrollTopBtn.style.transform = "translateY(-5px)";
  scrollTopBtn.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
});

scrollTopBtn.addEventListener("mouseleave", () => {
  scrollTopBtn.style.transform = "translateY(0)";
  scrollTopBtn.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-bg");
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
  }
});

// ==================== CARD HOVER EFFECTS ====================
const cards = document.querySelectorAll(
  ".feature-card, .legacy-card, .step-card, .problem-card-main"
);

cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transition = "all 0.3s ease";
  });
});

// ==================== TABLE ROW HOVER ====================
const tableRows = document.querySelectorAll(".tokenomics-table tbody tr");

tableRows.forEach((row) => {
  row.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
    this.style.transition = "all 0.3s ease";
  });

  row.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// ==================== INITIALIZE ====================
document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "%c🚀 CORESET Korean Website",
    "font-size: 24px; font-weight: bold; color: #667eea;"
  );
  console.log(
    "%c세계 최초 소프트웨어 저작권 토큰화",
    "font-size: 14px; color: #a8b2d1;"
  );
  console.log("%cLoaded Successfully ✓", "font-size: 12px; color: #00b894;");

  // Sections are visible by default without animation delays

  // Animate progress bars on load
  setTimeout(() => {
    const progressBars = document.querySelectorAll(
      ".progress-bar, .progress-fill"
    );
    progressBars.forEach((bar) => {
      bar.style.transition = "width 2s ease";
    });
  }, 500);
});

// ==================== WALLET CONNECTION DEMO ====================
const connectWalletBtn = document.querySelector(".btn-connect-wallet");

if (connectWalletBtn) {
  connectWalletBtn.addEventListener("click", () => {
    // Show loading state
    const originalText = connectWalletBtn.textContent;
    connectWalletBtn.textContent = "연결 중...";
    connectWalletBtn.disabled = true;

    setTimeout(() => {
      connectWalletBtn.textContent = originalText;
      connectWalletBtn.disabled = false;
      alert(
        "지갑 연결 기능은 데모 버전입니다.\n실제 환경에서는 MetaMask 또는 다른 Web3 지갑과 연동됩니다."
      );
    }, 1000);
  });
}

// ==================== PARTICIPATE BUTTON ====================
const participateBtn = document.querySelector(".btn-participate");

if (participateBtn) {
  participateBtn.addEventListener("click", () => {
    alert(
      "ICO 참여 기능은 데모 버전입니다.\n실제 환경에서는 토큰 구매 페이지로 이동합니다."
    );
  });
}

// ==================== WHITEPAPER BUTTON ====================
const whitepaperBtn = document.querySelector(".btn-whitepaper");

if (whitepaperBtn) {
  whitepaperBtn.addEventListener("click", () => {
    alert(
      "백서 다운로드 기능은 데모 버전입니다.\n실제 환경에서는 백서 PDF 파일이 다운로드됩니다."
    );
  });
}

// ==================== IMAGE LAZY LOADING ====================
// Images are loaded normally without lazy loading opacity effects

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Trigger counter animation when presale section is visible
const presaleSection = document.querySelector(".presale-section");
if (presaleSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const priceValues = entry.target.querySelectorAll(".price-value");
          priceValues.forEach((value) => {
            if (value.textContent.includes("%")) {
              const num = parseInt(value.textContent);
              animateCounter(value, num);
              value.textContent = num + "%";
            }
          });
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counterObserver.observe(presaleSection);
}

// ==================== EXPORT FOR DEBUGGING ====================
window.CoResetKorean = {
  version: "2.0.0",
  language: "Korean",
  features: [
    "Navigation",
    "Smooth Scrolling",
    "Animations",
    "Wallet Connection",
    "Token Sale",
    "Parallax",
    "Ripple Effects",
    "Image Lazy Loading",
    "Counter Animation",
  ],
};

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    console.log("Contact form submitted:", data);
    
    // Demo alert
    alert("문의가 접수되었습니다!\n빠른 시일 내에 답변 드리겠습니다.");
    
    // Reset form
    contactForm.reset();
  });
}
