'use strict';
let money = 60000;
let income = 'фриланс';
let addExpenses = 'Интернет, такси, коммуналка';
let deposit = true;
let mission = 100000;
let period = 3;

// тип данных значений переменных money, income, deposit;
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
// длина строки addExpenses
console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');
// Привести строку addExpenses к нижнему регистру и разбить строку на массив
console.log(addExpenses.toLowerCase().split(', '));

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц ',budgetMonth);
console.log('Цель будет достигнута за ', Math.ceil(mission / budgetMonth), 'месяцев');
let budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день ',budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else console.log('Что то пошло не так');