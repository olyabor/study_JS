'use strict';
let start = document.getElementById('start'),
  [incomeAdd, expensesAdd] = document.getElementsByTagName('button'),
  depositCheck = document.getElementById('deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  incomeItems = document.querySelectorAll('.income-items');
  
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function(s) {
  return typeof s === 'string' && s.length !== 0;
};

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getIncome();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('change', appData.start);
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    appData.incomeMonth = 0;
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  },
  getAddExpenses: function () {
    appData.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    appData.addIncome = [];
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    appData.expensesMonth = 0;
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = +appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что-то пошло не так';
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function(){
  let periodAmount = document.querySelector('.period-amount');
  periodAmount.innerHTML = periodSelect.value;
});
salaryAmount.addEventListener('change', function(){
  if (salaryAmount.value !== '') {
    start.addEventListener('click', appData.start);
    start.disabled = false;
  } else {
    start.removeEventListener('click', appData.start);
    start.disabled = true;
  }
});

// console.log(
//   appData.addExpenses
//     .map(function (item) {
//       return isString(item) ? item[0].toUpperCase() + item.slice(1) : item;
//     })
//     .join(', ')
// );

// console.log('Наша программа включает в себя данные: ');
// for (let key in appData) {
//   console.log(key + ': ' + appData[key]);
// }

