'use strict';
const startButton = document.getElementById('start'),
  [incomeAdd, expensesAdd] = document.getElementsByTagName('button'),
  depositCheck = document.getElementById('deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName(
    'expenses_month-value'
  )[0],
  additionalIncomeValue = document.getElementsByClassName(
    'additional_income-value'
  )[0],
  additionalExpensesValue = document.getElementsByClassName(
    'additional_expenses-value'
  )[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select');
  
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(s) {
  return typeof s === 'string' && s.length !== 0;
};

let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', 50000);
    } while (!isNumber(money));
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){

    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      //Проверить, является ли наименование дополнительного источника заработка непустой строкой
      while (!isString(itemIncome)) {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      }
      //Проверить, является ли сумма дополнительного заработка числом
      let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      while(!isNumber(cashIncome)) {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      }
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');    
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    appData.getInfoDeposit();

    for (let i = 0; i < 2; i++) {
      let key = prompt('Введите обязательную статью расходов', 'Садик Государственный');
      // Проверить, является ли наименование статьи обязательных расходов непустой строкой
      if (key !== null) {
        while (!isString(key)) {
          key = prompt(
            'Введите обязательную статью расходов',
            'Садик Государственный'
          );
        }
        let amount = prompt('Во сколько это обойдется?', 2500);
        while (!isNumber(amount)) {
          amount = prompt('Во сколько это обойдется?', 2500);
        }
        if (key in appData.expenses) {
          key += ' ' + i;
        }
        appData.expenses[key] = +amount;
      } else {break;}
    }
    return appData.expenses;
  },
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function () {
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
  },
  getInfoDeposit: function() {
    if(appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSaveMoney: function(){
    return appData.budgetMonth * appData.period;
  }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(
  appData.addExpenses
    .map(function (item) {
      return isString(item) ? item[0].toUpperCase() + item.slice(1) : item;
    })
    .join(', ')
);

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
  console.log(key + ': ' + appData[key]);
}


