var swiper = new Swiper(".mySwiper", {
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
  loopedSlides: 13,
  speed: 600,
  preventInteractionOnTransition: true,
  spaceBetween: 20,
  keyboard: { enabled: true, onlyInViewport: true },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

window.addEventListener('load', () => swiper.update());
window.addEventListener('resize', () => swiper.update());

const galleryImages = document.querySelectorAll(".gallery img");
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Array.from(galleryImages).indexOf(entry.target) * 0.1}s`;
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
      entry.target.style.transitionDelay = "0s";
    }
  });
}, { threshold: 0.2 });

galleryImages.forEach(img => galleryObserver.observe(img));

const footerLine = document.querySelector('.footer-line');
if (footerLine) {
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footerLine.classList.add('show');
      } else {
        footerLine.classList.remove('show');
      }
    });
  }, { threshold: 0.2 });

  footerObserver.observe(footerLine);
}

(function() {
  function initPhotoCircle() {
    const photoCircle = document.getElementById('photoCircle');
    if (!photoCircle) return;

    photoCircle.addEventListener('click', function(e) {
      e.stopPropagation();
      photoCircle.classList.toggle('active');

      const encourageLine = document.querySelector('.encourage-line');
      if (encourageLine) {
        encourageLine.style.opacity = photoCircle.classList.contains('active') ? '1' : '0';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhotoCircle);
  } else {
    initPhotoCircle();
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');
  const prevBtn = document.querySelector('.lightbox-nav .prev');
  const nextBtn = document.querySelector('.lightbox-nav .next');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.style.display = 'flex';
  }

  function showImage(index) {
    if (index < 0) index = galleryImages.length - 1;
    if (index >= galleryImages.length) index = 0;
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

  prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') {
        lightbox.style.display = 'none';
      } else if (e.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showImage(currentIndex + 1);
      }
    }
  });
});
