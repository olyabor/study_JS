'use strict';
let start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
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
  incomeItems = document.querySelectorAll('.income-items'),
  periodAmount = document.querySelector('.period-amount');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isString = function (s) {
  return typeof s === 'string' && s.length !== 0;
};

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.check = function () {
  if (salaryAmount.value !== '') {
    start.removeAttribute('disabled');
  }
};

AppData.prototype.start = function () {
  if (salaryAmount.value === '') {
    start.disabled = true;
    return;
  }
    let input = document.querySelectorAll('input[type=text]');
    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getExpensesMonth();
    this.getIncome();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    start.style.display = 'none';
    cancel.style.display = 'block';
    start.disabled = salaryAmount.value === '';
    input.forEach(function (item) {
      item.disabled = true;
    });
};

AppData.prototype.reset = function () {
    let input = document.querySelectorAll('input[type=text]');
    let incomeItems = document.querySelectorAll('.income-items');
    let expensesItems = document.querySelectorAll('.expenses-items');

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].remove();
    }
    incomeAdd.style.display = 'block';
    salaryAmount.value = '';

    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].remove();
    }
    expensesAdd.style.display = 'block';
    additionalIncomeItem.forEach((item) => (item.value = ''));
    additionalExpensesItem.value = '';
    periodSelect.value = 1;
    periodAmount.innerHTML = 1;
    depositCheck.checked = false;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

    input.forEach(function (item) {
      item.disabled = false;
      item.value = '';
    });
    cancel.style.display = 'none';
    start.style.display = 'block';
    start.disabled = false;
};
AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.floor(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('input', function(){
    incomePeriodValue.value = _this.calcPeriod();
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector('.expenses-title').value = '';
  cloneExpensesItem.querySelector('.expenses-amount').value = '';
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
  expensesItems = document.querySelectorAll('.expenses-items');

  if (expensesItems.length === 3) {
    expensesAdd.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function () {
  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = cashIncome;
    }
  });
  this.incomeMonth = 0;
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector('.income-title').value = '';
  cloneIncomeItem.querySelector('.income-amount').value = '';
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
  incomeItems = document.querySelectorAll('.income-items');

  if (incomeItems.length === 3) {
    incomeAdd.style.display = 'none';
  }
};
AppData.prototype.getAddExpenses = function () {
  this.addExpenses = [];
  let addExpenses = additionalExpensesItem.value.split(', ');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  this.addIncome = [];
  additionalIncomeItem.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  this.expensesMonth = 0;
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = +this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    return 'У вас средний уровень дохода';
  } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что-то пошло не так';
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
    } while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventListeners = function () {
  expensesAdd.addEventListener('click', this.addExpensesBlock);
  incomeAdd.addEventListener('click', this.addIncomeBlock);

  periodSelect.addEventListener('input', function () {
    periodAmount.innerHTML = periodSelect.value;
  });

  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
  salaryAmount.addEventListener('keyup', this.check);
  document
    .querySelectorAll('input[placeholder = "Наименование"]')
    .forEach(function (item) {
      item.addEventListener('keyup', function () {
        item.value = item.value.replace(/[^а-яА-Я\s/,//.//!//?//://;/]/g, '');
      });
    });

  document
    .querySelectorAll('input[placeholder = "Сумма"]')
    .forEach(function (item) {
      item.addEventListener('keyup', function () {
        item.value = item.value.replace(/[^\d]/g, '');
      });
    });
};

const appData = new AppData();

console.log(appData);

appData.eventListeners();




