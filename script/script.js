'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');    
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let key = prompt(
        'Введите обязательную статью расходов',
        'Садик Государственный'
        ),
        amount = prompt('Во сколько это обойдется?');
      while (!isNumber(amount)) {
        amount = prompt('Во сколько это обойдется?');
      }
      appData.expenses[key] = +amount;
    }
    return appData.expenses;
  },
  getExpensesMonth: function() {
    let sum = 0;

    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    return sum;
  },
  getBudget: function () {
    appData.expensesMonth = appData.getExpensesMonth();
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return appData.budgetMonth > 0 ? 
    'Цель будет достигнута за ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяцев':
    'Цель не будет достигнута';
  },
  getStatusIncome: function () {
  if (appData.budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
    return 'У вас средний уровень дохода';
  } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return ('Что-то пошло не так');
  }
  }
};
appData.asking();
appData.getBudget();
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
