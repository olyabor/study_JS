'use strict';
const bookCollection = document.querySelectorAll('.book'),
  body = document.querySelector('body'),
  adv = document.querySelector('.adv'),
  bookTwo = bookCollection[0].querySelectorAll('li'),
  bookFive = bookCollection[5].querySelectorAll('li');

bookCollection[0].insertAdjacentElement('beforebegin', bookCollection[1]);
bookCollection[2].insertAdjacentElement('beforebegin', bookCollection[4]);
bookCollection[5].insertAdjacentElement('afterend', bookCollection[2]);

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
document.querySelectorAll('a')[2].textContent =
  'Книга 3. this и Прототипы Объектов';
adv.remove();

bookTwo[3].insertAdjacentElement('afterend', bookTwo[6]);
bookTwo[6].insertAdjacentElement('afterend', bookTwo[8]);
bookTwo[9].insertAdjacentElement('afterend', bookTwo[2]);
bookFive[4].insertAdjacentElement('afterend', bookFive[2]);
bookFive[3].insertAdjacentElement('beforebegin', bookFive[9]);
bookFive[8].insertAdjacentElement('beforebegin', bookFive[5]);

bookCollection[2]
  .querySelectorAll('li')[8]
  .insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');