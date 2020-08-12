'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = 'фриланс',
  addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую'
  ),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 100000,
  period = 3;

let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();
money *= 1;
let showTypeOf = function (data) {
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(income.length);

console.log(addExpenses.toLowerCase().split(', '));

let expenses = [];

let getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов', "Садик Государственный");

    let amount = prompt('Во сколько это обойдется?');
    while (!isNumber(amount)) {
      amount = prompt('Во сколько это обойдется?');
    }
    sum += +amount;
  }
  return sum;
};

let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};
let accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.floor(accumulatedMonth / 30);

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return 'У вас средний уровень дохода';
  } else if (budgetDay >= 0 && budgetDay < 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return ('Что-то пошло не так');
  }
};

let getTargetMonth = function () {
  return accumulatedMonth > 0 ? 
  'Цель будет достигнута за ' + Math.ceil(mission / accumulatedMonth) + ' месяцев':
  'Цель не будет достигнута';
};

console.log(getTargetMonth());
console.log('Бюджет на день ', budgetDay);
console.log(getStatusIncome());