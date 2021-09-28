function popup() {
  let form = document.querySelector('.booking'),
    closeButton = document.querySelector('.booking__close > svg'),
    openButton = document.querySelector('.buy-tickets__amount > button');
  form.addEventListener('click', (event) => {
    if (event.target === form || event.target === closeButton) {
      form.style.transform = 'translate(0)';
    }
  });
  openButton.addEventListener('click', (event) => {
    form.style.transform = 'translate(-200vh)';
  });
}
export default popup