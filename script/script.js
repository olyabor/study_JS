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
    start.disabled = salaryAmount.value === '';
    let input = document.querySelectorAll('input[type=text]');
    this.budget = +salaryAmount.value;
    if (!start.disabled) {
      appData.getExpenses();
      appData.getExpensesMonth();
      appData.getIncome();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();

      appData.showResult();
      start.style.display = 'none';
      cancel.style.display = 'block';
      input.forEach(function (item) {
        item.disabled = true;
      });
    }
  },
  reset: function () {
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
    periodSelect.removeEventListener('input', this.start);
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', this.start);
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  getIncome: function () {
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
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none'; 
    }
  },
  getAddExpenses: function () {
    this.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    this.addIncome = [];
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    this.expensesMonth = 0;
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = +this.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что-то пошло не так';
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
};

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function() {
  periodAmount.innerHTML = periodSelect.value;
});

salaryAmount.addEventListener('input', function () {
  start.disabled = salaryAmount.value === '';
  start.addEventListener('click', appData.start.bind(appData));
  cancel.addEventListener('click', appData.reset.bind(appData));
});

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


