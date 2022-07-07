import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInputTextarea, 500));

const STORAGE_INPUTS_KEY = 'feedback-form-state';

let dataInput = {};

function onInputTextarea(event) {
  dataInput[event.target.name] = event.target.value;
  //console.log(dataInput)
  localStorage.setItem(STORAGE_INPUTS_KEY, JSON.stringify(dataInput));
}

initForm();

function initForm() {
  let filters = localStorage.getItem(STORAGE_INPUTS_KEY);
  if (filters) {
    filters = JSON.parse(filters);
    //console.log(filters);
    Object.entries(filters).forEach(([name, value]) => {
      // console.log(refs.form.elements);
      dataInput[name] = value;
      refs.form.elements[name].value = value;
    });
  }
}
function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(dataInput);
  localStorage.removeItem(STORAGE_INPUTS_KEY);
  event.currentTarget.reset();
  dataInput = {};
  refs.form.removeEventListener('submit', onFormSubmit);
  // console.log(refs.form);
}
