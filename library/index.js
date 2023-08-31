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



// Favorites slider


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



// Profile menu


let profileIcon = document.querySelector('.icon-profile');
let profileMenu = document.querySelector('.profile-menu');
const burgerItem = document.querySelector('.burger');
let profileMenuButtons = document.querySelectorAll('.button-profile-menu');
let btnProfileMenuMyProfile = document.querySelector('.button-profile-menu-my-profile');
let btnProfileMenuLogOut = document.querySelector('.button-profile-menu-log-out');


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
  









document.querySelector('.form-card').addEventListener('submit', function(event) {
    event.preventDefault();
  });






// Before authorization ========================================================


const delimiter = '_ʕ ᵔᴥᵔ ʔ_';
let registeredUsers = JSON.parse(localStorage.getItem(`registeredUsers${delimiter}`)) || [];
let authorizedUser;


// Modal window LOGIN

let btnProfileMenuLogin = document.querySelector('.button-profile-menu-login');
const btnLogin = document.querySelector('.get-card-button-login');
const btnRegisterModalLogin = document.querySelector('.login-info-button-register');
const btnSubmitLoginModal = document.querySelector('.login-modal-submit-button');
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

btnSubmitLoginModal.addEventListener('submit', function(event) {
    event.preventDefault();
  });

function checkLoginModalInputs() {
    const emailLoginModal = document.querySelector('.login-modal-email-input');
    const passwordLoginModal = document.querySelector('.login-modal-password-input');
    const emailOrReadersCardLoginValue = emailLoginModal.value;
    const passwordLoginValue = passwordLoginModal.value;
    const conditionEmailOrReadersCardLoginValue = registeredUsers.includes(emailOrReadersCardLoginValue.toLowerCase()) || registeredUsers.some((user) => {
        return localStorage.getItem(`${user}${delimiter}cardNumber`) === emailOrReadersCardLoginValue.toUpperCase();
    });
    const conditionPasswordLoginValue = registeredUsers.some((user) => {
        return localStorage.getItem(`${user}${delimiter}password`) === passwordLoginValue;
    });

    function setInputBorderColor(condition, modalInput) {
        condition ? modalInput.style.borderColor = 'green' : modalInput.style.borderColor = 'red';
    }

    emailLoginModal.addEventListener('input', setInputBorderColor(conditionEmailOrReadersCardLoginValue, emailLoginModal));
    passwordLoginModal.addEventListener('input', setInputBorderColor(conditionPasswordLoginValue, passwordLoginModal));
};
const loginModalInputs = document.querySelectorAll('.login-modal-input');
loginModalInputs.forEach((item) => item.addEventListener('blur', () => checkLoginModalInputs()));



// Modal window REGISTER


let btnProfileMenuRegister = document.querySelector('.button-profile-menu-register');
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


registeredUsers.forEach((user) => {
    if (localStorage.getItem(`${user}${delimiter}authorized`) === 'true') {
        authorizedUser = user;
    }
});


// Registration stage ========================================================

btnSubmitRegisterModal.addEventListener('click', (e)=>{
    e.preventDefault();
    checkRegisterModalInputs();

    const emailUser = emailRegisterModal.value;

    if (registeredUsers.includes(emailUser)) {
        return;
    }
    
    if (firstNameRegisterModal.value.length > 0 &&
        lastNameRegisterModal.value.length > 0 &&
        EMAIL_REGEXP.test(emailRegisterModal.value) &&
        passwordRegisterModal.value.length > 7 ) {
            registeredUsers.push(emailUser.toLowerCase());
            localStorage.setItem(`registeredUsers${delimiter}`, JSON.stringify(registeredUsers));
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}firstName`, `${firstNameRegisterModal.value.charAt(0).toUpperCase() + firstNameRegisterModal.value.slice(1)}`);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}lastName`, `${lastNameRegisterModal.value.charAt(0).toUpperCase() + lastNameRegisterModal.value.slice(1)}`);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}email`, `${emailRegisterModal.value}`);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}password`, `${passwordRegisterModal.value}`);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}cardNumber`, generateRandomHexNumber());
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}visits`, 1);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}books`, 0);
            localStorage.setItem(`${emailRegisterModal.value}${delimiter}authorized`, true);
            
            setUserInitial();
            changeProfileMenu();
            changeFormLibraryCard();
            registerModalClose();
            location.reload();
        }
});

function generateRandomHexNumber() {
    const min = 0x100000000;
    const max = 0xFFFFFFFFF; 
    const randomHexNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomHexNumber.toString(16).toUpperCase();
};



// Authorization stage ========================================================


btnSubmitLoginModal.addEventListener('click', (e)=>{
    e.preventDefault();
    checkLoginModalInputs();
    const emailLoginModal = document.querySelector('.login-modal-email-input');
    const passwordLoginModal = document.querySelector('.login-modal-password-input');
    const emailOrReadersCardLoginValue = emailLoginModal.value;
    const passwordLoginValue = passwordLoginModal.value;
    const conditionEmailOrReadersCardLoginValue = registeredUsers.includes(emailOrReadersCardLoginValue.toLowerCase()) || registeredUsers.some((user) => {
        return localStorage.getItem(`${user}${delimiter}cardNumber`) === emailOrReadersCardLoginValue.toUpperCase();
    });
    const conditionPasswordLoginValue = registeredUsers.some((user) => {
        return localStorage.getItem(`${user}${delimiter}password`) === passwordLoginValue;
    });

    if (conditionEmailOrReadersCardLoginValue && conditionPasswordLoginValue) {
        registeredUsers.forEach((user) => {
            if (localStorage.getItem(`${user}${delimiter}cardNumber`) === emailOrReadersCardLoginValue.toUpperCase()) {
                localStorage.setItem(`${user}${delimiter}authorized`, true);
            } else if (registeredUsers.includes(emailOrReadersCardLoginValue.toLowerCase())) {
                localStorage.setItem(`${user}${delimiter}authorized`, true);
            };
        });
        
        registerModalClose();
        location.reload();
    };
});


// After authorization ========================================================

window.addEventListener('load', function() {
    setUserInitial();
    changeProfileMenu();
    changeFormLibraryCard();

});

function setUserInitial() {
    registeredUsers.forEach((user) => {
        if (localStorage.getItem(`${user}${delimiter}authorized`) === 'true') {
            authorizedUser = user;
        }
    });
    console.log(authorizedUser);
    let profileIcon = document.querySelector('.icon-profile');
    if (localStorage.getItem(`${authorizedUser}${delimiter}authorized`) === 'true') {
        const userFirstName = localStorage.getItem(`${authorizedUser}${delimiter}firstName`);
        const userLastName = localStorage.getItem(`${authorizedUser}${delimiter}lastName`);
        const userInitials = `${userFirstName[0].toUpperCase()}${userLastName[0].toUpperCase()}`;
        
        profileIcon.innerHTML = `<p class="icon-profile-initials" title="${userFirstName} ${userLastName}">${userInitials}</p>`;
    } else {
        profileIcon.innerHTML = `<img src="/letohx-JSFEPRESCHOOL2023Q2/library/img/svg/icon-profile.svg" alt="Icon profile" class="icon-profile-pic">`
    };
};

function changeProfileMenu() {
    let profileMenu = document.querySelector('.profile-menu');
    registeredUsers.forEach((user) => {
        if (localStorage.getItem(`${user}${delimiter}authorized`) === 'true') {
            authorizedUser = user;
        }
    });
    if (localStorage.getItem(`${authorizedUser}${delimiter}authorized`) === 'true') {
        const cardNumber = localStorage.getItem(`${authorizedUser}${delimiter}cardNumber`);
        profileMenu.innerHTML  = `
        <p class="profile-menu-text">${cardNumber}</p>
        <hr class="profile-menu-line">
        <button class="button-profile-menu button-profile-menu-my-profile">My profile</button>
        <button class="button-profile-menu button-profile-menu-log-out">Log Out</button>
        `;

        let profileMenuHex = document.querySelector('.profile-menu-text');
        profileMenuHex.classList.add('profile-menu-text-hex')
    } 
    btnProfileMenuRegister = document.querySelector('.button-profile-menu-register');
    btnProfileMenuMyProfile = document.querySelector('.button-profile-menu-my-profile');
    btnProfileMenuLogOut = document.querySelector('.button-profile-menu-log-out');

    btnProfileMenuLogOut.addEventListener('click', (e) => {
        registeredUsers.forEach((user) => {
            localStorage.setItem(`${user}${delimiter}authorized`, false);
        });
        location.reload();
    });
};

function changeFormLibraryCard() {
    const formLibraryCardOut = document.querySelector('.library-cards-wrapper-btn');
    const formLibraryCardIn = document.querySelector('.library-cards-wrapper-stats');
    const visitStatValue = document.querySelector('.visit-stat-value');
    const bonusesStatValue = document.querySelector('.bonuses-stat-value');
    const booksStatValue = document.querySelector('.books-stat-value');
    const inputFormName = document.querySelector('.input-form-name');
    const inputFormNumberCard = document.querySelector('.input-form-number-card');
    const userFirstName = localStorage.getItem(`${authorizedUser}${delimiter}firstName`);
    const userLastName = localStorage.getItem(`${authorizedUser}${delimiter}lastName`);
    if (authorizedUser) {
        formLibraryCardOut.classList.add('hidden-form');
        formLibraryCardIn.classList.remove('hidden-form');
        visitStatValue.innerHTML = localStorage.getItem(`${authorizedUser}${delimiter}visits`);
        booksStatValue.innerHTML = localStorage.getItem(`${authorizedUser}${delimiter}books`);
        inputFormName.placeholder = `${userFirstName} ${userLastName}`;
        inputFormNumberCard.placeholder = localStorage.getItem(`${authorizedUser}${delimiter}cardNumber`);
    }
}