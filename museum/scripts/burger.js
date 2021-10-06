export default function Burger() {
  let
    burger = document.querySelector('.header__burger-container'),
    nav = document.querySelector('.header__nav'),
    heading = document.querySelector('.welcome__description'),
    container = document.querySelector('.welcome__container'),
    gallery = document.querySelector('.header__burger-gallery');
  burger.addEventListener('click', burgerOpen, { once: true });
  function burgerOpen() {
    burger.innerHTML = `<svg class="hedaer__burger-icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect class="fill" width="33.2612" height="2.07882" transform="matrix(0.7068 0.707413 -0.7068 0.707413 1.47046 0)" fill="white"/>
    <rect class="fill" width="33.2612" height="2.07883" transform="matrix(0.707413 -0.706801 0.707413 0.706801 0 23.5093)" fill="white"/>
    </svg>`
    heading.style.display = 'none';
    nav.style.display = 'flex';
    burger.addEventListener('click', burgerClose, { once: true });
    nav.addEventListener('click', navValidation);
    setTimeout(() => nav.style.transform = 'translate(0)', 0);
    nav.addEventListener('transitionend', () => {
      document.body.addEventListener('click', (event) => {
        if (!event.target.closest('.header__nav-item')) { burgerClose(); };
      }, { once: true });
    }, { once: true });
    if (document.documentElement.clientWidth < 1024) smallResolutionOpen();
  }
  function burgerClose() {
    nav.addEventListener('transitionend', (event) => {
      heading.style.display = 'block';
      nav.style.display = '';
    }, { once: true });
    nav.style.transform = '';
    smallResolutionClose();
    burger.innerHTML = `<svg class="header__burger-icon" width="32" height="18" viewBox="0 0 32 18" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect class="fill" width="32" height="2" fill="white" />
      <rect class="fill" y="8" width="32" height="2" fill="white" />
      <rect class="fill" y="16" width="32" height="2" fill="white" />
    </svg>`
    nav.removeEventListener('click', navValidation);
    burger.removeEventListener('click', burgerClose);
    burger.addEventListener('click', burgerOpen, { once: true });
  }
  function smallResolutionOpen() {
    container.style.display = 'none';
    gallery.style.display = 'flex';
    setTimeout(() => gallery.style.transform = 'translate(0)', 0);
  }
  function smallResolutionClose() {
    nav.addEventListener('transitionend', () => { gallery.style.display = ''; container.style.display = ''; }, { once: true });
    gallery.style.transform = '';
  }
  function navValidation(event) {
    if (event.target.tagName === 'A') burgerClose();
  }
}






