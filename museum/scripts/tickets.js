import { formDataSet } from "./form.js";
export default function ticketCounter() {
  const container = document.querySelector('.buy-tickets__order'),
    seniorInput = container.querySelector('.senior input'),
    seniorButtons = container.querySelectorAll('.senior button'),
    basicInput = container.querySelector('.basic input'),
    basicButtons = container.querySelectorAll('.basic button'),
    button = container.querySelector('.buy-tickets__amount > button'),
    storageBasic = localStorage.getItem('basicInput'),
    storageSenior = localStorage.getItem('seniorInput');
  if (storageSenior) seniorInput.value = storageSenior;
  if (storageBasic) basicInput.value = storageBasic;
  recount();
  container.addEventListener('click', (event) => {
    if (event.target === seniorButtons[0] && seniorInput.value >= 1) seniorInput.value--
    if (event.target === seniorButtons[1] && seniorInput.value < 20) seniorInput.value++
    if (event.target === basicButtons[0] && basicInput.value >= 1) basicInput.value--
    if (event.target === basicButtons[1] && basicInput.value < 20) basicInput.value++
    localStorage.setItem('seniorInput', seniorInput.value);
    localStorage.setItem('basicInput', basicInput.value);
    recount(event);
  });

  function recount(event) {
    const typePrice = document.querySelector('.buy-tickets__type input:checked').dataset.price,
      total = document.querySelector('.total'),
      basicAmount = document.querySelector('input[data-name = basic]').value,
      seniorAmount = document.querySelector('input[data-name = senior]').value,
      basicsPrice = basicAmount * typePrice,
      seniorsPrice = (seniorAmount * typePrice) / 2,
      totalPrice = seniorsPrice + basicsPrice;

    total.textContent = totalPrice;
    if (event && event.target === button) formDataSet({ basicsPrice, seniorsPrice, totalPrice, typePrice, basicAmount, seniorAmount });
  }
};