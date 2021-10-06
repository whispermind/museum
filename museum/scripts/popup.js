export default function popup() {
  let form = document.querySelector('.form-wrapper'),
    closeButton = document.querySelector('.booking__close > svg'),
    openButton = document.querySelector('.buy-tickets__amount > button'),
    wrapper = document.querySelector('.form-wrapper');
  form.addEventListener('click', (event) => {
    if (event.target === document.querySelector('.booking') || event.target === closeButton) {
      form.style.transform = '';
      wrapper.style.overflowY = '';
      form.addEventListener('transitionend', () => {
        form.style.display = 'none';
      }, { once: true });
    }
  });
  openButton.addEventListener('click', (event) => {
    form.style.display = 'flex';
    form.addEventListener('transitionend', () => wrapper.style.overflowY = 'auto', { once: true });
    setTimeout(() => form.style.transform = 'translate(0vh)', 0);
  });
}