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



// before registration

document.querySelector('.form-card').addEventListener('submit', function(event) {
    event.preventDefault();
  });



// at the registration stage
    
  
  
  
  
  


// profile menu

const profileIcon = document.querySelector('.icon-profile');
const profileMenu = document.querySelector('.profile-menu');
const burgerItem = document.querySelector('.burger');
const profileMenuButtons = document.querySelectorAll('.button-profile-menu');

const toggleProfileMenu = () =>{
    profileMenu.classList.toggle('profile-menu-active');    
};

profileIcon.addEventListener('click', () => toggleProfileMenu());

document.addEventListener('click', (e) => {
    if (!profileMenu.contains(e.target) && !profileIcon.contains(e.target)) {
      profileMenu.classList.remove('profile-menu-active');
    }
  });

profileMenuButtons.forEach((item) => item.addEventListener('click', () => profileMenu.classList.remove('profile-menu-active')));
  


// Modal window REGISTER


const btnProfileMenuRegister = document.querySelector('.button-profile-menu-register');
const btnSingUp = document.querySelector('.get-card-button-sing-up');
const btnLoginModalRegister = document.querySelector('.register-info-button-login');
const btnSubmitRegisterModal = document.querySelector('.register-modal-submit-button');
const modalRegisterCloseBtn = document.querySelector('.register-modal-close');
const modalRegisterOverlay = document.querySelector('.modal-register-overlay');

function registerModalOpen() {
    const modalRegister = document.querySelector('.modal-register');
    modalRegister.classList.add('modal-register-active');
    document.body.classList.add("body-scroll-stop");
}

function registerModalClose() {
    const modalRegister = document.querySelector('.modal-register');
    modalRegister.classList.remove('modal-register-active');
    document.body.classList.remove("body-scroll-stop");
}

btnProfileMenuRegister.addEventListener('click', (e) => registerModalOpen());
btnSingUp.addEventListener('click', (e) => registerModalOpen());
modalRegisterCloseBtn.addEventListener('click', (e) => registerModalClose());
modalRegisterOverlay.addEventListener('click', (e) => {
    if (!e.target.closest('.register-content')) registerModalClose()});

btnLoginModalRegister.addEventListener('click', (e) => {
    registerModalClose();
    document.body.classList.add("body-scroll-stop");
    setTimeout(function () {loginModalOpen()}, 100); 
});


btnSubmitRegisterModal.addEventListener('submit', function(event) {
    event.preventDefault();
  });



const firstNameRegisterModal = document.querySelector('.register-modal-first-name-input');
const lastNameRegisterModal = document.querySelector('.register-modal-last-name-input');
const emailRegisterModal = document.querySelector('.register-modal-email-input');
const passwordRegisterModal = document.querySelector('.register-modal-password-input');
const registerModalInputs = document.querySelectorAll('.register-modal-input');
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
   


function checkRegisterModalInputs() {
    const firstNameRegisterValue = firstNameRegisterModal.value;
    const lastNameRegisterValue = lastNameRegisterModal.value;
    const emailNameRegisterValue = emailRegisterModal.value;
    const passwordRegisterValue = passwordRegisterModal.value;

    const conditionFirstNameRegisterValue = firstNameRegisterValue.length > 0;
    const conditionLastNameRegisterValue = lastNameRegisterValue.length > 0;
    const conditionEmailRegisterValue = EMAIL_REGEXP.test(emailNameRegisterValue);
    //  && !(localStorage.getItem(`arrUsers${delimiter}`).includes(emailNameRegisterValue));
    const conditionPasswordRegisterValue = passwordRegisterValue.length > 7;

    function setInputBorderColor(condition, modalInput) {
        condition ? modalInput.style.borderColor = 'green' : modalInput.style.borderColor = 'red';
    }

    firstNameRegisterModal.addEventListener('input', setInputBorderColor(conditionFirstNameRegisterValue, firstNameRegisterModal));
    lastNameRegisterModal.addEventListener('input', setInputBorderColor(conditionLastNameRegisterValue, lastNameRegisterModal));
    emailRegisterModal.addEventListener('input', setInputBorderColor(conditionEmailRegisterValue, emailRegisterModal));
    passwordRegisterModal.addEventListener('input', setInputBorderColor(conditionPasswordRegisterValue, passwordRegisterModal));
};
registerModalInputs.forEach((item) => item.addEventListener('blur', () => checkRegisterModalInputs()));


const delimiter = '_ʕ ᵔᴥᵔ ʔ_'
let arrUsers = JSON.parse(localStorage.getItem(`arrUsers${delimiter}`)) || [];


btnSubmitRegisterModal.addEventListener('click', (e)=>{
    e.preventDefault();
    checkRegisterModalInputs();

    const emailUser = emailRegisterModal.value;

    if (arrUsers.includes(emailUser)) {
        return;
    }
    
    if (firstNameRegisterModal.value.length > 0 &&
        lastNameRegisterModal.value.length > 0 &&
        EMAIL_REGEXP.test(emailRegisterModal.value) &&
        passwordRegisterModal.value.length > 7 ) {
            arrUsers.push(emailUser);
            localStorage.setItem(`arrUsers${delimiter}`, arrUsers);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}firstName`, `${firstNameRegisterModal.value}`);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}lastName`, `${lastNameRegisterModal.value}`);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}email`, `${emailRegisterModal.value}`);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}password`, `${passwordRegisterModal.value}`);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}registered`, true);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}authorized`, true);


            setUserInitial();
            registerModalClose();
        }
});



function setUserInitial() {
    let authorizedUser;
    arrUsers.forEach((user) => {
        if (localStorage.getItem(`${user}${delimiter}authorized`) === 'true') {
            authorizedUser = user;
        }
    });
    console.log(authorizedUser);
    if (localStorage.getItem(`${authorizedUser}${delimiter}authorized`) === 'true') {
        const userFirstNameInitial = localStorage.getItem(`${authorizedUser}${delimiter}firstName`);
        const userLastNameInitial = localStorage.getItem(`${authorizedUser}${delimiter}lastName`);
        const userInitials = `${userFirstNameInitial[0].toUpperCase()}${userLastNameInitial[0].toUpperCase()}`;

        let profileIcon = document.querySelector('.icon-profile');
        profileIcon.innerHTML = `<p class="icon-profile-initials">${userInitials}</p>`;
    }
};















// Modal window LOGIN


const btnProfileMenuLogin = document.querySelector('.button-profile-menu-login');
const btnLogin = document.querySelector('.get-card-button-login');
const btnRegisterModalLogin = document.querySelector('.login-info-button-register');
const modalLoginCloseBtn = document.querySelector('.login-modal-close');
const modalLoginOverlay = document.querySelector('.modal-login-overlay');

function loginModalOpen() {
    const modalLogin = document.querySelector('.modal-login');
    modalLogin.classList.add('modal-login-active');
    document.body.classList.add("body-scroll-stop");
}

function loginModalClose() {
    const modalLogin = document.querySelector('.modal-login');
    modalLogin.classList.remove('modal-login-active');
    document.body.classList.remove("body-scroll-stop");
}

btnProfileMenuLogin.addEventListener('click', (e) => loginModalOpen());
btnLogin.addEventListener('click', (e) => loginModalOpen());
modalLoginCloseBtn.addEventListener('click', (e) => loginModalClose());
modalLoginOverlay.addEventListener('click', (e) => {
    if (!e.target.closest('.login-content')) loginModalClose()});

btnRegisterModalLogin.addEventListener('click', (e) => {
    loginModalClose();
    document.body.classList.add("body-scroll-stop");
    setTimeout(function () {registerModalOpen()}, 100); 
});

