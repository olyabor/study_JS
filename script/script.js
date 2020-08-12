'use strict';
let money = +prompt('Ваш месячный доход?', 30000),
  income = 'фриланс',
  addExpenses = prompt(
    'Перечислите возможные расходы за рассчитываемый период через запятую'
  ),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 100000,
  period = 3;

let showTypeOf = function (data) {
  console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(income.length);

let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько это обойдется?');

console.log(addExpenses.toLowerCase().split(', '));

let getExpensesMonth = function (amount1, amount2) {
   return amount1 + amount2;
};

let getAccumulatedMonth = function () {
  return(money - getExpensesMonth(amount1, amount2));
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
    return ('Что то пошло не так');
  }
};

let getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};

console.log('Цель будет достигнута за ', getTargetMonth(), 'месяцев');
console.log('Бюджет на день ', budgetDay);
console.log(getStatusIncome());