window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';

    // Tabs
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    const hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i += 1) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    const showTabcontent = (b) => {
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

    // Timer

    let deadline = '2019-10-16';

    const getTimeRemaining = (endtime) => {
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

    const setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');

        const updateClock = () => {
            let timeData = getTimeRemaining(endtime);
            hours.textContent = timeData.hours;
            minutes.textContent = timeData.minutes;
            seconds.textContent = timeData.seconds;

            if (timeData.total <= 0) {
                clearInterval(interval);

            }
        }

        let interval = setInterval(updateClock, 1000);
        
    }
    
    setClock('timer', deadline);

    //Modals

    let more = document.querySelector('.more'),
        moreTab = [...document.querySelectorAll('.description-btn')],
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
        
    const requestModal = (element) => {
        element.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        })
    
        close.addEventListener('click', function() {
            overlay.style.display = 'none';
            element.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
    };

    requestModal(more);
    moreTab.forEach(function (element) {
        requestModal(element);
    });

    //AJAX Forms
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо, мы скоро свяжемся с вами!',
        failure: 'Что-то пошло не так'
    };

    let form = document.querySelector('.main-form'),
        formBottom = document.querySelector('#form'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');


    const sendForm = (element) => {
        element.addEventListener('submit', function(event) {
            event.preventDefault();
            element.appendChild(statusMessage);

            let formData = new FormData(element);
            let convertedData = {};
            formData.forEach(function(key, value) {
                convertedData[key] = value;
            });
            let json = JSON.stringify(convertedData);
    
            const postData = data => {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    request.send(data);
            
                    request.addEventListener('readystatechange', function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                })
            };
            
            let inputForm = element.getElementsByTagName('input');
            const clearInput = () => {
                for (let i = 0; i < inputForm.length; i += 1) {
                    inputForm[i].value = '';
                }
            };

            postData(json)
                .then(() => {
                    statusMessage.innerHTML = message.loading;
                })
                .then(() => {
                    statusMessage.innerHTML = message.success;
                })
                .catch(() => {
                    statusMessage.innerHTML = message.failure;
                })
                .then(clearInput)
        });
    };
    sendForm(form);
    sendForm(formBottom);

    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWarp = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    const showSlides = (number) => {
        
        if (number > slides.length) {
            slideIndex = 1;
        }
        if (number < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((element) => element.style.display = 'none');
        dots.forEach((element) => element.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');

    }

    showSlides(slideIndex);

    const plusSlide = (number) => {
        showSlides(slideIndex += number);
    }

    const currentSlide = (number) => {
        showSlides(slideIndex = number);
    }

    prev.addEventListener('click', function() {
        plusSlide(-1);
    });

    next.addEventListener('click', function() {
        plusSlide(1);
    });

    dotsWarp.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i += 1) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    //Calc
    let inputPersons = document.querySelectorAll('.counter-block-input')[0],
        inputDays = document.querySelectorAll('.counter-block-input')[1],
        inputPlace = document.getElementById('select'),
        inputTotal = document.getElementById('total'),
        amountPersons = 0,
        amountDays = 0,
        amountTotal = 0;
    
    inputTotal.innerHTML = 0;

    inputPersons.addEventListener('change', function() {
        amountPersons = this.value;
        amountTotal = 4000 * amountPersons * amountDays;

        if (amountDays == '') {
            inputTotal.innerHTML = 0;
        } else {
            inputTotal.innerHTML = amountTotal;
        }
    });

    inputDays.addEventListener('change', function() {
        amountDays = this.value;
        amountTotal = 4000 * amountPersons * amountDays;

        if (amountPersons == '') {
            inputTotal.innerHTML = 0;
        } else {
            inputTotal.innerHTML = amountTotal;
        }
    });

    inputPlace.addEventListener('change', function() {
        if (amountDays == '' || amountPersons == '') {
            inputTotal.innerHTML = 0;
        } else {
            // let a = amountTotal;
            inputTotal.innerHTML = amountTotal * this.options[this.selectedIndex].value;
        }
    });

});