window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';

    // tabs
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i += 1) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabcontent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i += 1) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabcontent(i);
                    break;
                }
            }
        }
    });

    // timer

    let deadline = '2019-09-16';

    function getTimeRemaining(endtime) {
        let total = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((total / 1000) % 60),
            minutes = Math.floor((total / 1000/ 60) % 60),
            hours = Math.floor(total / (1000 * 60 * 60));
        
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (hours < 10) {
            hours = '0' + minutes;
        }


        return {
            'total' : total,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            interval = setInterval(updateClock, 1000);

        function updateClock() {
            let timeData = getTimeRemaining(endtime);
            hours.textContent = timeData.hours;
            minutes.textContent = timeData.minutes;
            seconds.textContent = timeData.seconds;

            if (timeData.total <= 0) {
                clearInterval(interval);

            }
        }
    }
    
    setClock('timer', deadline);

    //modal

    let more = document.querySelectorAll('.more, .description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    console.log(more);
        
    more.forEach(function(element) {
        element.addEventListener('click', function() {
            overlay.style.display = 'block';
            console.log(this);
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        })
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.forEach(function(element) {
            element.classList.remove('more-splash');
        })
        document.body.style.overflow = '';
    });
});