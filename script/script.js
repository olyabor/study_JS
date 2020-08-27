'use strict';
const start = document.getElementById('start'),
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
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items');

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);
const isString = (s) => typeof s === 'string' && s.length !== 0;

class AppData {
  constructor() {
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
  }

  check() {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    }
  }

  start() {
    if (salaryAmount.value === '') {
      start.disabled = true;
      return;
    }
    const input = document.querySelectorAll('input[type=text]');
    this.budget = +salaryAmount.value;

    this.getExpInc();
    this.getExpensesMonth();
    this.getAddIncExp();
    this.getBudget();

    this.showResult();
    start.style.display = 'none';
    cancel.style.display = 'block';
    start.disabled = salaryAmount.value === '';
    input.forEach((item) => {
      item.disabled = true;
    });
  }

  reset() {
    const input = document.querySelectorAll('input[type=text]');
    let incomeItems = document.querySelectorAll('.income-items'),
      expensesItems = document.querySelectorAll('.expenses-items');

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

    input.forEach((item) => {
      item.disabled = false;
      item.value = '';
    });
    cancel.style.display = 'none';
    start.style.display = 'block';
    start.disabled = false;
  }

  showResult() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function () {
      incomePeriodValue.value = _this.calcPeriod();
    });
  }

  addIncExpBlock() {
    const startStr = this.className.split(' ')[1].slice(0, -4);
    const item = document.querySelectorAll(`.${startStr}-items`)[0];
    const cloneItem = item.cloneNode(true);
    let items;
    cloneItem.querySelector(`.${startStr}-title`).value = '';
    cloneItem.querySelector(`.${startStr}-amount`).value = '';
    item.parentNode.insertBefore(cloneItem, this);

    expensesItems = document.querySelectorAll('.expenses-items');
    incomeItems = document.querySelectorAll('.income-items');

    if (expensesItems.length === 3 || incomeItems.length === 3) {
      this.style.display = 'none';
    }
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddIncExp() {
    const addExpenses = additionalExpensesItem.value.split(', ');
    const addIncome = [].map.call(additionalIncomeItem, (item) => item.value);
    const record = (item) => {
      item = item.trim();
      const index = addExpenses.includes(item) ? 'addExpenses' : 'addIncome';
      if (item !== '') {
        this[index].push(item);
      }
    };
    addExpenses.forEach(record);
    addIncome.forEach(record);
  }

  getExpensesMonth() {
    this.expensesMonth = 0;
    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = +this.budgetMonth / 30;
  }

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
      return 'Что-то пошло не так';
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(this.percentDeposit));
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  validation() {
    document
      .querySelectorAll('input[placeholder = "Наименование"]')
      .forEach((item) => {
        item.addEventListener('keyup', () => {
          item.value = item.value.replace(/[^а-яА-Я\s/,//.//!//?//://;/]/g, '');
        });
      });

    document
      .querySelectorAll('input[placeholder = "Сумма"]')
      .forEach((item) => {
        item.addEventListener('keyup', () => {
          item.value = item.value.replace(/[^\d]/g, '');
        });
      });
  }

  eventListeners() {
    expensesAdd.addEventListener('click', this.addIncExpBlock);
    incomeAdd.addEventListener('click', this.addIncExpBlock);

    periodSelect.addEventListener('input', () => {
      periodAmount.innerHTML = periodSelect.value;
    });

    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    salaryAmount.addEventListener('keyup', this.check);
    this.validation();
    expensesAdd.addEventListener('click', this.validation);
    incomeAdd.addEventListener('click', this.validation);
  }
}

const appData = new AppData();

appData.eventListeners();




