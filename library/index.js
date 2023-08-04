console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3. На ширине экрана 768рх реализовано адаптивное меню +12 (Рекомендуется сделать появление бургер-меню на ширине 1024px)\n        ↓\nИтого: 50 баллов');

// Burger handler

(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header-nav');
    const burgerBg = document.querySelector('.open-burger-bg');
    const burgerBg2 = document.querySelector('.open-burger-bg2');
    const burgerIcon = document.querySelector('.header-burger');
    const burgerLine1 = document.querySelector('.burger-line-first');
    const burgerLine2 = document.querySelector('.burger-line-second');
    const burgerLine3 = document.querySelector('.burger-line-third');
    const burgerItems = document.querySelectorAll('.header-item');
   
    burgerItem.addEventListener('click', () => {
        menu.classList.toggle('header-nav-active');
        burgerBg.classList.toggle('open-burger-bg-active');
        burgerBg2.classList.toggle('open-burger-bg2-active');
        burgerIcon.classList.toggle('header-burger-active');
        burgerLine1.classList.toggle('burger-line-first-active');
        burgerLine2.classList.toggle('burger-line-second-active');
        burgerLine3.classList.toggle('burger-line-third-active');
    });
    burgerBg.addEventListener('click', () => {
        menu.classList.toggle('header-nav-active');
        burgerBg.classList.toggle('open-burger-bg-active');
        burgerBg2.classList.toggle('open-burger-bg2-active');
        burgerIcon.classList.toggle('header-burger-active');
        burgerLine1.classList.toggle('burger-line-first-active');
        burgerLine2.classList.toggle('burger-line-second-active');
        burgerLine3.classList.toggle('burger-line-third-active');
    });
    burgerBg2.addEventListener('click', () => {
        menu.classList.toggle('header-nav-active');
        burgerBg.classList.toggle('open-burger-bg-active');
        burgerBg2.classList.toggle('open-burger-bg2-active');
        burgerIcon.classList.toggle('header-burger-active');
        burgerLine1.classList.toggle('burger-line-first-active');
        burgerLine2.classList.toggle('burger-line-second-active');
        burgerLine3.classList.toggle('burger-line-third-active');
    });
    burgerItems.forEach((item) => {
        item.addEventListener('click', () => {
            menu.classList.toggle('header-nav-active');
            burgerBg.classList.remove('open-burger-bg-active');
            burgerBg2.classList.remove('open-burger-bg2-active');
            burgerIcon.classList.remove('header-burger-active');
            burgerLine1.classList.remove('burger-line-first-active');
            burgerLine2.classList.remove('burger-line-second-active');
            burgerLine3.classList.remove('burger-line-third-active');
        });
    });
}());