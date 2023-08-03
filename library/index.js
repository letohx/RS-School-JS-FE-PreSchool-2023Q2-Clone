console.log('1\n2');

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