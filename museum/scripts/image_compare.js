export default function imageCompare() {
  const images = document.querySelectorAll('.picture-explore__image'),
    thumb = document.querySelector('.picture-explore__slider > svg'),
    slider = document.querySelector('.picture-explore__slider'),
    thumbWidth = parseInt(getComputedStyle(thumb).width) / 2;

  thumb.addEventListener('pointerdown', dragStart);
  function dragStart(event) {
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', dragEnd);
    const sliderRect = slider.getBoundingClientRect();
    function move(event) {
      setPosition(event.pageX, sliderRect);
    }
    function dragEnd(event) {
      document.removeEventListener('pointermove', move);
    }
  }
  function setPosition(pageX, sliderRect) {
    if (pageX > (sliderRect.left + images[0].clientWidth)) pageX = sliderRect.left + images[0].clientWidth;
    if (pageX < sliderRect.left) pageX = sliderRect.left;
    let thumbPosition = pageX - sliderRect.left;
    thumb.style.left = thumbPosition - thumbWidth;
    images[1].style.width = `${thumbPosition}px`;
  }
}