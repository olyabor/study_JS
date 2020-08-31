window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    const body = document.querySelector('body');

    function clock(){
        function getDayTime(time){
            switch (Math.floor(time / 6)) {
                case 0: return 'Доброй ночи';
                case 1: return 'Доброе утро';
                case 2: return 'Добрый день';
                case 3: return 'Добрый вечер';
            }
        }      
        function getMessage(){
            const date = new Date(),
                newYear = new Date('01 Jan 2021').getTime(),
                greeting = getDayTime(date.getHours()),
                weekday = date.toLocaleString('ru', {weekday: 'long'}),
                time = date.toLocaleTimeString('en-GB'),
                dayRemainig = Math.floor((newYear - date) / 3600000 / 24);
            return{greeting, weekday, time, dayRemainig}
        }
        function formDay(n){
            if (n % 10 === 1 && n !== 11) {
                return 'день';
            } else if (n % 10 > 4 || (n > 4 && n < 20) || n % 10 === 0) {
                return 'дней';
                } else {
                         return 'дня';
                       }
        }
        function updateClock(){
            let message = getMessage();
            body.innerHTML = '';
            body.insertAdjacentHTML('afterbegin', `<div>${message.greeting}</div>
            <div>Сегодня: ${message.weekday}</div>
            <div>Текущее время: ${message.time}</div>
            <div>До нового года осталось ${message.dayRemainig} ${formDay(message.dayRemainig)}</div>`);
            
            if (message.dayRemainig > 0) {
                setInterval(updateClock, 1000);
            }
        }
        updateClock();
    }
    clock();
});
