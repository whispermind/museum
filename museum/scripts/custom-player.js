export default function customPlayer() {
  const container = document.querySelector('.player'),
    player = document.querySelector('.player__preview video'),
    controls = document.querySelector('.player__controls'),
    progress = document.querySelectorAll('.player__range'),
    startMainButton = document.querySelector('.player__play'),
    startButton = document.querySelector('.player__stop'),
    soundButton = document.querySelector('.player__volume'),
    duration = document.querySelector('.player__duration-range'),
    volume = document.querySelector('.volume__range'),
    fullscreenButton = document.querySelector('.player__fullscreen');

  container.addEventListener('click', controlsHandler);
  duration.addEventListener('input', (event) => {
    player.currentTime = event.target.value;
    duration.style.background = `linear-gradient(to right, #710707 0%, #710707 ${event.target.value}%, #C4C4C4 ${event.target.value}%)`
  });
  volume.addEventListener('input', (event) => {
    player.volume = event.target.value / 10;
    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${event.target.value * 10}%, #C4C4C4 ${event.target.value * 10}%)`;
    if (!player.volume) { player.muted = false; soundToggler(); }
    if (player.volume) { player.muted = true; soundToggler(); }
  });
  document.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
      fullscreenButton.innerHTML = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.2554 7.74495H35.9764V12.8119H23.1874V0.0229492H28.2544V7.74395L28.2554 7.74495ZM23.1884 35.976V23.1869H35.9774V28.2539H28.2564V35.9749H23.1894L23.1884 35.976ZM7.74544 7.74495V0.0239492H12.8124V12.8129H0.0234375V7.74595H7.74444L7.74544 7.74495ZM0.0244375 28.2549V23.1879H12.8134V35.977H7.74644V28.2559H0.0254375L0.0244375 28.2549Z" fill="#B3B3B3"/>
    </svg>`;
    } else {
      fullscreenButton.innerHTML = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.48 31.6299H23.05V35.8599H35.7001V23.1499H31.48V31.6299Z" fill="#B3B3B3"/>
    <path d="M4.22 23.1499H0V35.8599H12.65V31.6299H4.22V23.1499Z" fill="#B3B3B3"/>
    <path d="M0 12.71H4.22V4.24H12.65V0H0V12.71Z" fill="#B3B3B3"/>
    <path d="M23.05 0V4.24H31.48V12.71H35.7001V0H23.05Z" fill="#B3B3B3"/>
    </svg>
    `;
      controls.style.justifyContent = '';
      player.style.height = '';
    }
  });
  player.addEventListener('timeupdate', event => {
    duration.value = player.currentTime;
    duration.style.background = `linear-gradient(to right, #710707 0%, #710707 ${player.currentTime * (100 / player.duration)}%, #C4C4C4 ${player.currentTime * (100 / player.duration)}%)`
  });
  player.addEventListener('ended', (event) => {
    playToggler();
  });
  document.addEventListener('keypress', (event) => {
    if (document.querySelector('.form-active')) return;
    if (event.code === 'Space') playToggler();
    if (event.code === 'KeyM') soundToggler();
    if (event.code === 'KeyF') fullscreenToggler();
    if (event.shiftKey && event.code === 'Comma') player.playbackRate++;
    if (event.shiftKey && event.code === 'Period') player.playbackRate--;
  });
  duration.max = player.duration;

  function controlsHandler(event) {
    let target = event.target;
    if (target.closest('.player__play') || target.closest('.player__preview')) playToggler();
    if (target.closest('.player__stop')) playToggler();
    if (target.closest('.player__volume')) soundToggler();
    if (target.closest('.player__fullscreen')) fullscreenToggler();
  }
  function play() {
    startMainButton.style.display = 'none';
    startButton.classList.add('player__active');
    startButton.innerHTML = `<svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 29.0471V0.944802C8 0.421605 7.55026 0 6.98347 0H1.01653C0.449742 0 0 0.421605 0 0.944802V29.0471C0 29.5703 0.449742 30 1.01653 30H6.98347C7.55026 30 8 29.5784 8 29.0471Z" fill="#B3B3B3"/>
    <path d="M19.9835 0H14.0165C13.4584 0 13 0.421605 13 0.944802V29.0471C13 29.5703 13.4497 30 14.0165 30H19.9835C20.5416 30 21 29.5784 21 29.0471V0.944802C21 0.421605 20.5503 0 19.9835 0Z" fill="#B3B3B3"/>
    </svg>`;
    player.play();
  }
  function playToggler() {
    if (startButton.classList.contains('player__active')) {
      player.pause();
      startButton.classList.remove('player__active');
      startButton.innerHTML = `<svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.35 14.75L0 0C0 22.23 0 11.32 0 29.49L22.35 14.75Z" fill="#B3B3B3"/>
      </svg>`
      startMainButton.style.display = 'block';
      return;
    } else {
      play();
      duration.max = player.duration;
    }
  }
  function soundToggler() {
    if (player.muted) {
      soundButton.innerHTML = `<svg width="38" height="30" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.86 0L3.63 10.42V19.07L17.86 29.49C17.83 7.26 17.86 18.17 17.86 0Z" fill="#B3B3B3"/>
      <path d="M0 21.9198H7.47V7.55981H0V21.9198Z" fill="#B3B3B3"/>
      <path d="M27 29.1399C26.6559 29.1407 26.3193 29.0395 26.0328 28.849C25.7462 28.6586 25.5225 28.3874 25.39 28.0699C25.2993 27.8572 25.2514 27.6286 25.249 27.3974C25.2467 27.1661 25.2899 26.9367 25.3763 26.7221C25.4627 26.5076 25.5905 26.3122 25.7524 26.1471C25.9143 25.982 26.1072 25.8504 26.32 25.7599C27.7344 25.1603 29.0184 24.2907 30.1 23.1999C32.3328 20.9541 33.5873 17.9167 33.59 14.7499C33.5793 11.5788 32.3138 8.5408 30.07 6.29988C28.9863 5.20894 27.7031 4.33644 26.29 3.72988C25.8627 3.547 25.5251 3.20251 25.3509 2.7716C25.1766 2.3407 25.1799 1.85837 25.36 1.42988C25.4463 1.21604 25.5746 1.02173 25.7375 0.858495C25.9003 0.695259 26.0943 0.566432 26.308 0.479673C26.5216 0.392914 26.7505 0.349995 26.9811 0.353466C27.2116 0.356938 27.4391 0.406729 27.65 0.49988C31.3419 2.07523 34.2782 5.02222 35.84 8.71988C36.6452 10.6177 37.0601 12.6583 37.06 14.7199C37.059 16.7804 36.6477 18.82 35.85 20.7199C35.077 22.5565 33.9526 24.2244 32.54 25.6299C31.1475 27.0638 29.4858 28.209 27.65 28.9999C27.4453 29.0907 27.224 29.1384 27 29.1399Z" fill="#B3B3B3"/>
      <path d="M23.69 22.0801C23.3094 22.0796 22.9406 21.9476 22.6462 21.7064C22.3518 21.4652 22.1499 21.1297 22.0746 20.7566C21.9992 20.3835 22.0551 19.9959 22.2329 19.6594C22.4106 19.3229 22.6993 19.0581 23.0499 18.9101C23.8655 18.5635 24.5605 17.9838 25.048 17.2438C25.5354 16.5037 25.7936 15.6362 25.79 14.7501C25.7935 14.149 25.6744 13.5535 25.44 13.0001C25.2031 12.4627 24.8634 11.9769 24.44 11.5701C24.0312 11.1489 23.5458 10.8095 23.01 10.5701C22.6564 10.3727 22.3883 10.0515 22.2574 9.66825C22.1264 9.28504 22.1418 8.86693 22.3008 8.49445C22.4597 8.12197 22.7508 7.82146 23.118 7.6508C23.4853 7.48013 23.9028 7.45138 24.29 7.57008C25.4625 8.07189 26.495 8.8522 27.2977 9.84332C28.1005 10.8344 28.6493 12.0064 28.8966 13.2577C29.1439 14.5089 29.0822 15.8016 28.7168 17.0235C28.3515 18.2455 27.6934 19.3599 26.7999 20.2701C26.0941 20.9834 25.2548 21.5508 24.3299 21.9401C24.1281 22.0293 23.9106 22.0769 23.69 22.0801Z" fill="#B3B3B3"/>
      </svg>`;
      player.muted = false;
    } else {
      soundButton.innerHTML = `<svg width="36" height="30" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.2053 15L35.6703 11.535C35.8901 11.3152 36 11.0474 36 10.7337C36 10.4199 35.8901 10.1522 35.6703 9.93234L34.0677 8.32972C33.8478 8.10991 33.5801 8 33.2663 8C32.9526 8 32.6848 8.10991 32.465 8.32972L29 11.7947L25.535 8.32972C25.3152 8.10991 25.0474 8 24.7337 8C24.4199 8 24.1522 8.10991 23.9323 8.32972L22.3297 9.93234C22.1099 10.1522 22 10.4199 22 10.7337C22 11.0474 22.1099 11.3152 22.3297 11.535L25.7947 15L22.3297 18.465C22.1099 18.6848 22 18.9526 22 19.2663C22 19.5801 22.1099 19.8478 22.3297 20.0677L23.9323 21.6703C24.1522 21.8901 24.4199 22 24.7337 22C25.0474 22 25.3152 21.8901 25.535 21.6703L29 18.2053L32.465 21.6703C32.6848 21.8901 32.9516 22 33.2663 22C33.5811 22 33.8478 21.8901 34.0677 21.6703L35.6703 20.0677C35.8901 19.8478 36 19.5801 36 19.2663C36 18.9526 35.8901 18.6848 35.6703 18.465L32.2053 15Z" fill="#B3B3B3"/>
      <path d="M18.3326 0C17.8816 0 17.4905 0.156374 17.1604 0.469123L8.48928 8.68426H1.66737C1.21531 8.68426 0.825273 8.84064 0.495164 9.15339C0.165055 9.46614 0 9.83665 0 10.2639V19.7361C0 20.1633 0.165055 20.5339 0.495164 20.8466C0.825273 21.1594 1.21636 21.3157 1.66737 21.3157H8.48928L17.1604 29.5309C17.4905 29.8436 17.8806 30 18.3326 30C18.7847 30 19.1747 29.8436 19.5048 29.5309C19.8349 29.2181 20 28.8486 20 28.4203V1.57968C20 1.15239 19.8349 0.781873 19.5059 0.469123C19.1768 0.156374 18.7857 0 18.3337 0H18.3326Z" fill="#B3B3B3"/>
      </svg>`;
      player.muted = true;
    }
  }
  function fullscreenToggler() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    else {
      const height = getComputedStyle(controls).height;
      container.requestFullscreen();
      controls.style.justifyContent = 'space-around';
      player.style.height = `calc(100vh - ${height})`;
    }
  }
}