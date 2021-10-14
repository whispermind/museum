export default function formCounter() {
  const tickets = document.querySelector('.booking__ticket-amount'),
    seniorButtons = document.querySelectorAll('.booking__senior-counter > button'),
    basicButtons = document.querySelectorAll('.booking__basic-counter > button'),
    seniorInput = document.querySelector('.booking__senior-counter > input'),
    basicInput = document.querySelector('.booking__basic-counter > input'),
    select = document.querySelector('select'),
    container = document.querySelector('.booking__form-datatime'),
    inputDate = document.querySelector('input[type="date"]'),
    inputTime = document.querySelector('input[type="time"]'),
    inputName = document.querySelector('input[name="form-name"]'),
    inputEmail = document.querySelector('input[type="email"]'),
    inputTel = document.querySelector('input[type="tel"]'),
    orderDate = document.querySelector('.form__order-day'),
    orderTime = document.querySelector('.form__order-time');
  let date = new Date();
  inputDate.min = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  tickets.addEventListener('click', counterHandler);
  select.addEventListener('change', counterHandler);
  inputTime.addEventListener('change', counterHandler);
  inputTime.addEventListener('change', (event) => {
    if (!/\d{2}:30|00/.test(event.target.value)) { event.target.classList.add('warning'); }
    else event.target.classList.remove('warning');
    warning()
  });
  inputDate.addEventListener('change', counterHandler);
  inputDate.addEventListener('change', (event) => {
    if (new Date(event.target.value) < Date.now()) event.target.classList.add('warning');
    else event.target.classList.remove('warning');
    warning()
  });
  inputName.addEventListener('change', (event) => {
    if (/[1-9!@#$%^&*()_+=-`~{};:'"<>,/.]/.test(event.target.value)) event.target.classList.add('warning');
    else event.target.classList.remove('warning');
    warning()
  })
  inputEmail.addEventListener('change', (event) => {
    if (!/[A-Z0-9_-]{3,15}@[A-Z]{4,}\.[A-Z]{2,}/i.test(event.target.value)) event.target.classList.add('warning');
    else event.target.classList.remove('warning');
    warning()
  });
  inputTel.addEventListener('change', event => {
    if (/\d{10,}/.test(event.target.value) || /[A-Z!@#$%^&*()_+=-`~{};:'"<>,/.]/.test(event.target.value)) event.target.classList.add('warning');
    else event.target.classList.remove('warning');
    warning()
  });
  function warning() {
    if (!document.querySelectorAll('.warning').length) container.classList.remove('wrong-input');
    else container.classList.add('wrong-input');
  }


  function counterHandler(event) {
    if (event.target === basicButtons[0] && basicInput.value >= 1) basicInput.value--
    if (event.target === basicButtons[1] && basicInput.value < 20) basicInput.value++
    if (event.target === seniorButtons[0] && seniorInput.value >= 1) seniorInput.value--
    if (event.target === seniorButtons[1] && seniorInput.value < 20) seniorInput.value++
    let typePrice = select.value,
      basicsPrice = typePrice * basicInput.value,
      seniorsPrice = (typePrice * seniorInput.value) / 2,
      totalPrice = basicsPrice + seniorsPrice,
      formatter = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        month: 'long',
        day: '2-digit',
      });
    if (inputDate.value) orderDate.textContent = formatter.format(new Date(inputDate.value));
    if (inputTime.value) orderTime.textContent = inputTime.value;

    formDataSet({
      basicAmount: basicInput.value,
      seniorAmount: seniorInput.value,
      basicsPrice,
      seniorsPrice,
      totalPrice,
      typePrice
    })
  }
}

export function formDataSet({ basicsPrice, seniorsPrice, totalPrice, typePrice, basicAmount, seniorAmount }) {
  const formBasic = document.querySelector('.booking__basic-counter > input'),
    orderType = document.querySelector('.form__order-type'),
    formSenior = document.querySelector('.booking__senior-counter > input'),
    selected = document.querySelector(`.booking__info  option[value = "${typePrice}"]`),
    formTotal = document.querySelector('.form__order-total > span'),
    formBasicAmount = document.querySelector('.form__basic-amount'),
    formSeniorAmount = document.querySelector('.form__senior-amount'),
    categoryPrice = document.querySelectorAll('.form__ticket-payment > span:last-child');
  orderType.textContent = document.querySelector(`.booking__info  option[value = "${typePrice}"]`).textContent;
  categoryPrice[0].textContent = basicsPrice ? basicsPrice + ' €' : categoryPrice[0].textContent;
  categoryPrice[1].textContent = seniorsPrice ? seniorsPrice + ' €' : categoryPrice[1].textContent;
  formTotal.textContent = totalPrice ? totalPrice + ' €' : formTotal.textContent;
  selected ? selected.selected = true : false;
  formBasic.value = basicAmount ? basicAmount : formBasic.value;
  formSenior.value = seniorAmount ? seniorAmount : formSenior.value;
  formBasicAmount.textContent = basicAmount ? basicAmount : formBasicAmount.textContent;
  formSeniorAmount.textContent = seniorAmount ? seniorAmount : formSeniorAmount.textContent;
}