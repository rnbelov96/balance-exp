/* eslint-disable no-param-reassign */
export {};

const checkRangeEl = document.querySelector(
  '.calc__range_check',
) as HTMLInputElement;
const caseRangeEl = document.querySelector(
  '.calc__range_case',
) as HTMLInputElement;

let checkRangeValue = Number(checkRangeEl.value);
let caseRangeValue = Number(caseRangeEl.value);
let resultValue = checkRangeValue * caseRangeValue;

const formatResult = (result: string) => `${result.substring(0, 1)}\xA0${result.substr(1, 3)}\xA0${result.substr(
  4,
  3,
)} рублей`;

const resultsElList = document.querySelectorAll('.calc__result-number');
resultsElList.forEach(el => {
  if (el) {
    el.textContent = formatResult(String(resultValue));
  }
});

checkRangeEl.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;
  checkRangeValue = Number(rangeEl.value);
  resultValue = checkRangeValue * caseRangeValue;

  resultsElList.forEach(el => {
    if (el) {
      el.textContent = formatResult(String(resultValue));
    }
  });
});

caseRangeEl.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;
  caseRangeValue = Number(rangeEl.value);
  resultValue = checkRangeValue * caseRangeValue;

  resultsElList.forEach(el => {
    if (el) {
      el.textContent = formatResult(String(resultValue));
    }
  });
});
