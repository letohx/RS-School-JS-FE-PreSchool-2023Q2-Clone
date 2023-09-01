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
  




const checkCardBtn = document.querySelector('.check-card-btn');

checkCardBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    const checkCardNameInput = document.querySelector('.check-card-name').value;
    const checkCardNumberInput = document.querySelector('.check-card-number').value;
    
    const userEmail = registeredUsers.find((user) => {
        const storedCardNumber = localStorage.getItem(`${user}${delimiter}cardNumber`);
        return storedCardNumber === checkCardNumberInput.toUpperCase();
    });
    
    if (userEmail) {
        const storedName = localStorage.getItem(`${userEmail}${delimiter}firstName`);
        const storedLastName = localStorage.getItem(`${userEmail}${delimiter}lastName`);
        
        if (storedName.toLowerCase() === checkCardNameInput.toLowerCase() || `${storedName} ${storedLastName}`.toLowerCase() === checkCardNameInput.toLowerCase() || `${storedLastName} ${storedName}`.toLowerCase() === checkCardNameInput.toLowerCase()) {
            authorizedUser = userEmail;

            const userFirstName = localStorage.getItem(`${authorizedUser}${delimiter}firstName`);
            const userLastName = localStorage.getItem(`${authorizedUser}${delimiter}lastName`);
            
            const formCardJS = document.querySelector('.form-card-js');

            formCardJS.innerHTML = `
            <div class="form-inputs-wrapper">
                  <p class="form-title">Brooklyn Public Library</p>
                  <input type="text" id="name" class="input-form input-form-name pointer-events-none" placeholder="${userFirstName} ${userLastName}">
                  <input type="text" id="number-card" class="input-form input-form-number-card pointer-events-none" placeholder="${localStorage.getItem(`${authorizedUser}${delimiter}cardNumber`)}">
                </div>
                <div class="user-statistics-wrapper">
                  <div class="visits-stat">
                    <p class="visit-stat-title visit-stat-text">visits</p>
                    <img src="img/svg/visits-profile.svg" alt="profile icon" class="visit-stat-img">
                    <p class="visit-stat-value visit-stat-text">${localStorage.getItem(`${authorizedUser}${delimiter}visits`)}</p>
                  </div>
                  <div class="bonuses-stat">
                    <p class="bonuses-stat-title visit-stat-text">bonuses</p>
                    <img src="img/svg/bonuses-profile.svg" alt="bonuses icon" class="bonuses-stat-img">
                    <p class="bonuses-stat-value visit-stat-text">1240</p>
                  </div>
                  <div class="books-stat">
                    <p class="books-stat-title visit-stat-text">books</p>
                    <img src="img/svg/books-profile.svg" alt="books icon" class="books-stat-img">
                    <p class="books-stat-value visit-stat-text">${JSON.parse(localStorage.getItem(`${authorizedUser}${delimiter}books`)).reduce((acc, current) => acc + current, 0)}</p>
                  </div>
                </div>
                `;


            setTimeout(() => {
                // formCardJS.innerHTML = `
                // <div class="form-inputs-wrapper">
                //     <p class="form-title">Brooklyn Public Library</p>
                //     <input type="text" id="name" class="input-form check-card-name" placeholder="Reader's name">
                //     <input type="text" id="number-card" class="input-form check-card-number" placeholder="Card number">
                // </div>
                // <button type="submit" class="button submit-button check-card-btn">Check the card</button>
                // `;

                location.reload();
            }, 10000);
            
            document.querySelector('.form-card').addEventListener('submit', function(event) {
                event.preventDefault();
            });
        } 
    }
});




// Before authorization ========================================================


const delimiter = '_ʕ ᵔᴥᵔ ʔ_';
let registeredUsers = JSON.parse(localStorage.getItem(`registeredUsers${delimiter}`)) || [];
let authorizedUser;
let rentedBooks;


// Modal window LOGIN

let btnProfileMenuLogin = document.querySelector('.button-profile-menu-login');
const btnLogin = document.querySelector('.get-card-button-login');
const btnRegisterModalLogin = document.querySelector('.login-info-button-register');
const btnSubmitLoginModal = document.querySelector('.login-modal-submit-button');
const modalLoginCloseBtn = document.querySelector('.login-modal-close');
const modalLoginOverlay = document.querySelector('.modal-login-overlay');
let buttonsBuy = document.querySelectorAll('.buy-button');

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

buttonsBuy.forEach((item) => item.addEventListener('click', () => {
    if (!authorizedUser) {
        loginModalOpen();
    }
}));

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

    const emailUser = emailRegisterModal.value.toLowerCase();
    const rentedBooks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    if (registeredUsers.includes(emailUser)) {
        return;
    }
    
    if (firstNameRegisterModal.value.length > 0 &&
        lastNameRegisterModal.value.length > 0 &&
        EMAIL_REGEXP.test(emailRegisterModal.value.toLowerCase()) &&
        passwordRegisterModal.value.length > 7 ) {
            registeredUsers.push(emailUser.toLowerCase());
            localStorage.setItem(`registeredUsers${delimiter}`, JSON.stringify(registeredUsers));
            localStorage.setItem(`${emailUser}${delimiter}firstName`, `${firstNameRegisterModal.value.charAt(0).toUpperCase() + firstNameRegisterModal.value.slice(1).toLowerCase()}`);
            localStorage.setItem(`${emailUser}${delimiter}lastName`, `${lastNameRegisterModal.value.charAt(0).toUpperCase() + lastNameRegisterModal.value.slice(1).toLowerCase()}`);
            localStorage.setItem(`${emailUser}${delimiter}email`, `${emailUser}`);
            localStorage.setItem(`${emailUser}${delimiter}password`, `${passwordRegisterModal.value}`);
            localStorage.setItem(`${emailUser}${delimiter}cardNumber`, generateCardNumber());
            localStorage.setItem(`${emailUser}${delimiter}visits`, 1);
            localStorage.setItem(`${emailUser}${delimiter}books`, JSON.stringify(rentedBooks).reduce((acc, current) => acc + current, 0));
            localStorage.setItem(`${emailUser}${delimiter}authorized`, true);
            
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
}

function generateCardNumber() {
    let hexNumber = generateRandomHexNumber();
    const exists = registeredUsers.some((user) => {
        return localStorage.getItem(`${user}${delimiter}cardNumber`) === hexNumber;
    });

    if (exists) {
        return generateCardNumber();
    }
    return hexNumber;
}



// Authorization stage ========================================================


btnSubmitLoginModal.addEventListener('click', (e) => {
    e.preventDefault();
    
    const emailLoginModalInput = document.querySelector('.login-modal-email-input').value;
    const passwordLoginModalInput = document.querySelector('.login-modal-password-input').value;
    
    const user = registeredUsers.find((user) => {
        const storedCardNumber = localStorage.getItem(`${user}${delimiter}cardNumber`);
        return user.toLowerCase() === emailLoginModalInput.toLowerCase() || storedCardNumber === emailLoginModalInput.toUpperCase();
    });
    
    if (user) {
        const storedPassword = localStorage.getItem(`${user}${delimiter}password`);
        
        if (storedPassword === passwordLoginModalInput) {
            localStorage.setItem(`${user}${delimiter}authorized`, true);

            let visits = localStorage.getItem(`${user}${delimiter}visits`);
            visits++;
            localStorage.setItem(`${user}${delimiter}visits`, visits);
        
            registerModalClose();
            location.reload();
        } 
    }
});



// After authorization ========================================================

window.addEventListener('load', function() {
    setUserInitial();
    changeProfileMenu();
    changeFormLibraryCard();
    changeModalMyProfile();
    rentedBooks = JSON.parse(localStorage.getItem(`${authorizedUser}${delimiter}books`)) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    changeButtonsBuyOwn()
});

function setUserInitial() {
    registeredUsers.forEach((user) => {
        if (localStorage.getItem(`${user}${delimiter}authorized`) === 'true') {
            authorizedUser = user;
        }
    });

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
    const formLibraryCardLogOut = document.querySelector('.library-cards-wrapper-btn');
    const formLibraryCardLogIn = document.querySelector('.library-cards-wrapper-stats');
    const visitStatValue = document.querySelector('.visit-stat-value');
    const bonusesStatValue = document.querySelector('.bonuses-stat-value');
    const booksStatValue = document.querySelector('.books-stat-value');
    const inputFormName = document.querySelector('.input-form-name');
    const inputFormNumberCard = document.querySelector('.input-form-number-card');
    const userFirstName = localStorage.getItem(`${authorizedUser}${delimiter}firstName`);
    const userLastName = localStorage.getItem(`${authorizedUser}${delimiter}lastName`);
    if (authorizedUser) {
        formLibraryCardLogOut.classList.add('hidden-form');
        formLibraryCardLogIn.classList.remove('hidden-form');
        visitStatValue.innerHTML = localStorage.getItem(`${authorizedUser}${delimiter}visits`);
        booksStatValue.innerHTML = JSON.parse(localStorage.getItem(`${authorizedUser}${delimiter}books`)).reduce((acc, current) => acc + current, 0);
        inputFormName.placeholder = `${userFirstName} ${userLastName}`;
        inputFormNumberCard.placeholder = localStorage.getItem(`${authorizedUser}${delimiter}cardNumber`);


        if (authorizedUser) {

            const btnProfileGetCard = document.querySelector('.get-card-button-profile');
        
            const modalMyProfileCloseBtn = document.querySelector('.my-profile-modal-close');
            const modalMyProfileOverlay = document.querySelector('.modal-my-profile-overlay');
        
        
            btnProfileMenuMyProfile.addEventListener('click', (e) => myProfileModalOpen());
            btnProfileGetCard.addEventListener('click', (e) => myProfileModalOpen());
        
            modalMyProfileCloseBtn.addEventListener('click', (e) => myProfileModalClose());
            modalMyProfileOverlay.addEventListener('click', (e) => {
                if (!e.target.closest('.my-profile-content')) {
                    myProfileModalClose()
                } });
        }
    }
}


// Modal window MY PROFILE

function myProfileModalOpen() {
    const modalMyProfile = document.querySelector('.modal-my-profile');
    modalMyProfile.classList.add('modal-my-profile-active');
    profileMenu.classList.remove('profile-menu-active');
    document.body.classList.add("body-scroll-stop");
}

function myProfileModalClose() {
    const modalMyProfile = document.querySelector('.modal-my-profile');
    modalMyProfile.classList.remove('modal-my-profile-active');
    document.body.classList.remove("body-scroll-stop");
}

function changeModalMyProfile() {

    const visitStatValue = document.querySelector('.visit-stat-value-big');
    const bonusesStatValue = document.querySelector('.bonuses-stat-value');
    const booksStatValue = document.querySelector('.books-stat-value-big');
    const myProfileModalCardNumber = document.querySelector('.my-profile-modal-card-number-number');
    const myProfileModalInitials = document.querySelector('.my-profile-initials');
    const myProfileModalName = document.querySelector('.my-profile-name');

    const userFirstName = localStorage.getItem(`${authorizedUser}${delimiter}firstName`);
    const userLastName = localStorage.getItem(`${authorizedUser}${delimiter}lastName`);
    const userInitials = `${userFirstName[0].toUpperCase()}${userLastName[0].toUpperCase()}`;
    if (authorizedUser) {
        visitStatValue.innerHTML = localStorage.getItem(`${authorizedUser}${delimiter}visits`);
        booksStatValue.innerHTML = JSON.parse(localStorage.getItem(`${authorizedUser}${delimiter}books`)).reduce((acc, current) => acc + current, 0);
        myProfileModalName.innerHTML = `${userFirstName} ${userLastName}`;
        myProfileModalInitials.innerHTML = userInitials;
        myProfileModalCardNumber.innerHTML = localStorage.getItem(`${authorizedUser}${delimiter}cardNumber`);
    }
}

function copyToClipboardCardNumber() {
    const cardNumber = document.querySelector(".my-profile-modal-card-number-number").textContent;
    navigator.clipboard.writeText(cardNumber).catch(console.error);
}

const btnCopyCardNumber = document.querySelector(".my-profile-modal-copy-number");
btnCopyCardNumber.addEventListener('click', () => copyToClipboardCardNumber());


buttonsBuy = document.querySelectorAll('.buy-button');
buttonsBuy.forEach((item, index) => item.addEventListener('click', () => {
    if (authorizedUser) {
        const ownButtons = document.querySelectorAll('.own-button'); 
        ownButtons[index].classList.remove('hide');
        item.classList.add('hide');
        rentedBooks[index] = 1;
        localStorage.setItem(`${authorizedUser}${delimiter}books`, JSON.stringify(rentedBooks));
        changeFormLibraryCard();
        changeModalMyProfile();
    }
}));

function changeButtonsBuyOwn() {
    buttonsBuy.forEach((item, index) => {
        if (authorizedUser && rentedBooks[index]) {
            const ownButtons = document.querySelectorAll('.own-button'); 
            ownButtons[index].classList.remove('hide');
            item.classList.add('hide');
        }
    });
}

