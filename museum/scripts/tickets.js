export default function ticketCounter() {
  let seniorContainer = document.querySelector('.senior'),
    seniorInput = seniorContainer.querySelector('input'),
    seniorButtons = seniorContainer.querySelectorAll('button'),
    basicContainer = document.querySelector('.basic'),
    basicInput = basicContainer.querySelector('input'),
    basicButtons = basicContainer.querySelectorAll('button');
  seniorContainer.addEventListener('click', (event) => {
    if (event.target === seniorButtons[0] && seniorInput.value >= 1) seniorInput.value--
    if (event.target === seniorButtons[1] && seniorInput.value < 20) seniorInput.value++
  });
  basicContainer.addEventListener('click', (event) => {
    if (event.target === basicButtons[0] && basicInput.value >= 1) basicInput.value--
    if (event.target === basicButtons[1] && basicInput.value < 20) basicInput.value++
  })
};