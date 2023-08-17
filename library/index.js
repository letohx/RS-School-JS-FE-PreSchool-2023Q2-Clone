console.log('\n\n');


// Burger handler

(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header-nav');
    const burgerBg = document.querySelector('.open-burger-bg');
    const profileIcon = document.querySelector('.icon-profile');
    const burgerIcon = document.querySelector('.header-burger');
    const burgerLine1 = document.querySelector('.burger-line-first');
    const burgerLine2 = document.querySelector('.burger-line-second');
    const burgerLine3 = document.querySelector('.burger-line-third');
    const burgerItems = document.querySelectorAll('.header-item');
  
    const toggleBurger = () =>{
        menu.classList.toggle('header-nav-active');
        burgerBg.classList.toggle('open-burger-bg-active');
        burgerIcon.classList.toggle('header-burger-active');
        burgerLine1.classList.toggle('burger-line-first-active');
        burgerLine2.classList.toggle('burger-line-second-active');
        burgerLine3.classList.toggle('burger-line-third-active');
        document.body.classList.toggle("body-scroll-stop");
    };

    const removeBurger = () =>{
        menu.classList.remove('header-nav-active');
        burgerBg.classList.remove('open-burger-bg-active');
        burgerIcon.classList.remove('header-burger-active');
        burgerLine1.classList.remove('burger-line-first-active');
        burgerLine2.classList.remove('burger-line-second-active');
        burgerLine3.classList.remove('burger-line-third-active');
        document.body.classList.remove("body-scroll-stop");
    };

    burgerItem.addEventListener('click', () => toggleBurger());
    burgerBg.addEventListener('click', () => toggleBurger());
    profileIcon.addEventListener('click', () => removeBurger());
    burgerItems.forEach((item) => item.addEventListener('click', () => removeBurger()));
}());



// Slider

(function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.about-img');
    const paginationItems = document.querySelectorAll('.pagination-item');
    const paginationFive = document.querySelectorAll('.pagination-item-five-element');
    const btnPrev = document.querySelector('.slider-button-prev');
    const btnNext = document.querySelector('.slider-button-next');
    let activeIndex = 1;
    
    const getPosition = () => {
        const windowWidth = window.innerWidth;
        const activeSlide = document.querySelector('.pagination-item-clicked');   
        activeIndex = Array.from(paginationItems).indexOf(activeSlide);
        
        if (windowWidth >= 770) {     
            if (activeIndex === 0) activeIndex = 1;
            if (activeIndex === 4) activeIndex = 3;
        }
         
        const slideWidth = slides[0].offsetWidth;
        
        if (activeIndex === 0) {
            btnPrev.classList.add('slider-button-hide')
            btnNext.classList.remove('slider-button-hide')
        } else if (activeIndex === 4) {
            btnNext.classList.add('slider-button-hide')
            btnPrev.classList.remove('slider-button-hide')
        } else {
            btnPrev.classList.remove('slider-button-hide')
            btnNext.classList.remove('slider-button-hide')
        }
        
        if (windowWidth >= 770) {
            return (-activeIndex + 1) * (slideWidth + 25);
        }
        if (windowWidth < 770) {
            return (-activeIndex) * (slideWidth + 25);
        }
    }
    
    paginationItems.forEach((item) => item.addEventListener('click', () => {
        paginationItems.forEach((item) => item.classList.remove('pagination-item-clicked'));
        item.classList.add('pagination-item-clicked');
        getPosition();
        setPosition();
    }));
    
    function setActivePagination() {
        paginationItems.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add('pagination-item-clicked');            
            } else {
                item.classList.remove('pagination-item-clicked');
            }
        });
    }
    
    function resizeSlides() {
        const windowWidth = window.innerWidth;
        const slideWidth = (windowWidth >= 770) ? sliderWrapper.offsetWidth / 3 - 20 : 450;
        
        if (windowWidth >= 770) {
            paginationFive.forEach((item) => item.classList.add('hidden'));
            sliderWrapper.style.width = 'auto';
        } else {
            paginationFive.forEach((item) => item.classList.remove('hidden'));
            sliderWrapper.style.width = '450px';
        }
        
        slides.forEach((slide) => slide.style.width = `${slideWidth}px`);
        getPosition();
        setPosition();
        setActivePagination();
    }
    
    window.addEventListener('resize', resizeSlides);
    window.addEventListener('load', () => {
        resizeSlides();
        setPosition();
    });
    
    const setPosition = () => {
        const newPosition = getPosition();
        track.style.transform = `translateX(${newPosition}px)`;
    }
    
    btnPrev.addEventListener('click', () => {
        activeIndex = (activeIndex === 0) ? activeIndex : activeIndex - 1;
        setActivePagination();
        getPosition();
        setPosition();
    });
    
    btnNext.addEventListener('click', () => {
        activeIndex = (activeIndex + 1 >= slides.length) ? 4 : activeIndex + 1;
        setActivePagination();
        getPosition();
        setPosition();
    });
}());



// favorites slider

(function () {
    let radioBtn = document.querySelectorAll('.favorites-label');
    let favoritesItem = document.querySelectorAll('.favorites-items-wrapper');
    
    radioBtn.forEach(function(item, index){
        item.addEventListener('click', function(elem){
      
          radioBtn.forEach(function(btn){ btn.classList.remove('selected')});
          elem.currentTarget.classList.add('selected');
      
        favoritesItem.forEach(function(item){item.classList.add('favorites-hide')});
        setTimeout(function () {
          favoritesItem[index].classList.remove('favorites-hide');
        }, 500); 
      })
    })
}());



// profile menu

const profileIcon = document.querySelector('.icon-profile');
const profileMenu = document.querySelector('.profile-menu');
const burgerItem = document.querySelector('.burger');

const toggleProfileMenu = () =>{
    profileMenu.classList.toggle('profile-menu-active');    
};

profileIcon.addEventListener('click', () => toggleProfileMenu());

profileMenu.addEventListener('click', (e) => {
    if (!e.target) {
        profileMenu.classList.remove('profile-menu-active'); 
    };
  });