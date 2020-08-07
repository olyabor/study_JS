let money = 600;
let income = 'фриланс';
let addExpenses = 'Интернет, такси, коммуналка';
let deposit = true;
let mission = 1000;
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
// дневной бюджет
let budgetDay = money/30;
console.log(budgetDay);