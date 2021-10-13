export default function randomizer() {
  let container = document.querySelector('.art-gallery__container');
  let images = [];
  for (let i = 1; i <= 15; i++) {
    let elem = document.createElement('img');
    elem.src = `./assets/pictures/gallery/${i}.webp`;
    elem.alt = 'gallery picture';
    elem.classList.add('gallery-image');
    images.push(elem);
  }
  images.sort(() => Math.random() - 0.5);
  images.forEach((elem) => container.append(elem));
  applyAnimation();
};
function applyAnimation() {
  window.addEventListener('scroll', debounce(animationHandler));
  let galleryImages = document.querySelectorAll('.gallery-image');
  function animationHandler(event) {
    galleryImages.forEach((img) => {
      let coords = img.getBoundingClientRect();
      if (coords.top < window.innerHeight - (img.height / 4)) {
        img.classList.add('gallery-image-active');
      };
      if (coords.top < 0 || coords.top > window.innerHeight) img.classList.remove('gallery-image-active');
    });
  }
}
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};