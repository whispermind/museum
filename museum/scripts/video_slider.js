const startMainButton = document.querySelector(".player__play"),
  startButton = document.querySelector(".player__stop"),
  duration = document.querySelector(".player__duration-range");

export default function videoSlider() {
  const slider = document.querySelector(".video-journey__slider-container"),
    sliderItems = document.querySelectorAll(".video-journey__slider-item"),
    butts = document.querySelector(".video-journey__slider-navigation"),
    paginationItems = Array.from(
      document.querySelectorAll(".video-journey__pagination-item")
    ),
    player = document.querySelector(".player video"),
    paginationContainer = document.querySelector(".video-journey__pagination");
  let position = 1,
    processed = false;

  butts.addEventListener("pointerdown", navigationHandler);
  paginationContainer.addEventListener("pointerdown", paginationHandler);

  function navigationHandler(event) {
    if (!event.target.closest(".video-journey__slider-navbutton") || processed)
      return;
    processed = true;
    const player = document.querySelector(".player__active");
    if (player) {
      duration.value = 0;
      duration.style.background = "";
      playToggler();
    }
    if (event.target.closest(".video-journey__slider-prev")) {
      position--;
    } else {
      position++;
    }
    move();
  }
  function paginationHandler(event) {
    if (paginationItems.includes(event.target))
      position = event.target.dataset.position;
    move();
  }
  function move(event) {
    stopper();
    slider.style.transition = "left .4s ease-in-out";
    slider.addEventListener("transitionend", afterMove, { once: true });
    setPosition();
    function afterMove() {
      processed = false;
      if (position === 0 || position === sliderItems.length - 3)
        checkPosition();
      document
        .querySelector(".video-journey__item-active")
        .classList.remove("video-journey__item-active");
      paginationItems[position - 1].classList.add("video-journey__item-active");
      slider.style.transition = "";
    }
  }
  function setPosition() {
    const item = getComputedStyle(
        document.querySelector(".video-journey__slider-item")
      ),
      width = parseInt(item.width, 10),
      gap = parseInt(getComputedStyle(slider).columnGap, 10);
    slider.style.left = `${-position * (width + gap)}px`;
    player.src = `./assets/pictures/video/video${position}.mp4`;
  }
  function checkPosition() {
    if (position === sliderItems.length - 3) position = 1;
    if (position === 0) position = sliderItems.length - 4;
    slider.style.transition = "";
    setPosition();
  }
  function stopper() {
    let iframes = slider.querySelectorAll(
      ".video-journey__slider-container iframe"
    );
    iframes.forEach((elem) => (elem.src = elem.src));
  }
  function playToggler() {
    if (startButton.classList.contains("player__active")) {
      player.pause();
      startButton.classList.remove("player__active");
      startButton.innerHTML = `<svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.35 14.75L0 0C0 22.23 0 11.32 0 29.49L22.35 14.75Z" fill="#B3B3B3"/>
      </svg>`;
      startMainButton.style.display = "block";
      return;
    } else {
      play();
      duration.max = player.duration;
    }
  }
  function play() {
    startMainButton.style.display = "none";
    startButton.classList.add("player__active");
    startButton.innerHTML = `<svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 29.0471V0.944802C8 0.421605 7.55026 0 6.98347 0H1.01653C0.449742 0 0 0.421605 0 0.944802V29.0471C0 29.5703 0.449742 30 1.01653 30H6.98347C7.55026 30 8 29.5784 8 29.0471Z" fill="#B3B3B3"/>
    <path d="M19.9835 0H14.0165C13.4584 0 13 0.421605 13 0.944802V29.0471C13 29.5703 13.4497 30 14.0165 30H19.9835C20.5416 30 21 29.5784 21 29.0471V0.944802C21 0.421605 20.5503 0 19.9835 0Z" fill="#B3B3B3"/>
    </svg>`;
    player.play();
  }
}
