/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/accardion.js":
/*!*********************************!*\
  !*** ./js/modules/accardion.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function accardion() {
    //Accordion
    const accordion = document.querySelectorAll(".accordion");

    accordion.forEach(acc => {
        acc.addEventListener("click", () => {
            acc.classList.toggle('active');
            const panel = acc.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (accardion);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    //CLASS

    const getResource = async(url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status:${res.status}`);
        }

        return await res.json();
    };



    class CarCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classess) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classess = classess;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 10700;
            this.changeToUSD();
        }
        changeToUSD() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement("div");
            if (this.classess.length === 0) {
                this.classess = "menu__item";
                element.classList.add(this.classess);
            } else {
                this.classess.forEach(className => element.classList.add(className));
            }


            element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                    ${this.descr}
                </div>  
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price} so'm</span> </div>
                </div>
            </div>`;
            this.parent.append(element);
        }

    }
    // carcad ni qisqa usulda yozish
    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({ img, altimg, title, descr, price }) => {
    //             new CarCard(img, altimg, title, descr, price, ".menu .container ").render();
    //         });




    //Kutubxona yordamida yozish
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new CarCard(img, altimg, title, descr, price, ".menu .container ").render();
            });
        });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/data.js":
/*!****************************!*\
  !*** ./js/modules/data.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function data() {
    //TIME 

    const didline = "2022-01-01";

    function getTime(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            seconds = Math.floor((total / 1000) % 60),
            minutes = Math.floor(((total / 1000) / 60) % 60),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        return {
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }



    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTime(endTime);
            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);
            if (time.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock(".timer", didline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function form(modalTimer) {
    //Serverda ishlash

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Murojatingiz qabul qilindi',
        failure: 'Error'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async(url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();

    };


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display:block; 
            margin:0 auto;
            `;

            //form.insertAdjacentElement('afterend', statusMessage);
            form.append(statusMessage);


            const formData = new FormData(form);
            //Eski yo'li
            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));




            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });

        });
    }


    //Yangi modal okno
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__title">${message}</div>
        <div class="modal__close" data-close>x</div>

        </div>`;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal', modalTimer);
        }, 4000);
    }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/loader.js":
/*!******************************!*\
  !*** ./js/modules/loader.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loader() {
    const loader = document.querySelector(".loader");
    //LOADER
    setTimeout(function() {
        loader.style.oppacity = "0";
        setTimeout(function() {
            loader.style.display = "none";
        }, 200);
    }, 500);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    if (modalTimer) {
        clearInterval(modalTimer);
    }
}


function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimer) {
    //MODAL
    const allModalBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);


    allModalBtn.forEach((btn) => {
        btn.addEventListener("click", () => openModal(modalSelector, modalTimer));
    });


    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener("scroll", showModalByScroll);
        }

    }
    window.addEventListener("scroll", showModalByScroll);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slid.js":
/*!****************************!*\
  !*** ./js/modules/slid.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slid() {
    //Slider second way
    const slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        prev = document.querySelector(".offer__slider-prev"),
        next = document.querySelector(".offer__slider-next"),
        current = document.querySelector("#current"),
        total = document.querySelector("#total"),
        slideWrapper = document.querySelector(".offer__slider-wrapper"),
        width = window.getComputedStyle(slideWrapper).width,
        slidesField = document.querySelector(".offer__slider-inner");

    let slideIndex = 1,
        officet = 0;

    if (slideIndex < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }
    slidesField.style.width = 101 * slides.length + '%';
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slideWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";
    let indicator = document.createElement("ol"),
        dots = [];

    indicator.style.cssText = `
        position:absolute;
        right:0;
        bottom:0;
        left:0;
        z-index:15;
        display:flex;
        justify-content:center;
        margin-right:15%;
        margin-left:15%;
        list-style:none;

        `;
    slider.append(indicator);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.style.cssText = `
        box-sizing:content-box;
        flex:0 1 auto;
        width:30px;
        height:6px;
        margin:0 3px;
        cursor:pointer;
        background-color:#fff;
        background-clip:padding-box;
        border-top:10px solid transparent;
        border-bottom:10px solid transparent;
        opacity:0.5s;
        transform:opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicator.append(dot);
        dots.push(dot);

    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, " ");
    }
    next.addEventListener("click", () => {
        if (officet == deleteNotDigits(width) * (slides.length - 1)) {
            officet = 0;
        } else {
            officet += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${officet}px)`;
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

    });
    prev.addEventListener("click", () => {
        if (officet == 1) {
            officet = deleteNotDigits(width) * (slides.length - 1);
        } else {
            officet -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${officet}px)`;
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            let slideIndex = 1,
                officet = 0;

            slideIndex = slideTo;
            officet = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${officet}px`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

        });
    });

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slid);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    //TABS
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabParent = document.querySelector(".tabheader__items"),
        tabContent = document.querySelectorAll(".tabcontent");

    function hideTabContent() {
        tabContent.forEach((item) => {
            item.style.display = "none";
        });
        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }
    hideTabContent();
    showTabContent();

    tabParent.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (event.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/data */ "./js/modules/data.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/loader */ "./js/modules/loader.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slid */ "./js/modules/slid.js");
/* harmony import */ var _modules_accardion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/accardion */ "./js/modules/accardion.js");









window.addEventListener("DOMContentLoaded", () => {
    const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__.openModal)('.modal', modalTimer), 20000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_data__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])(modalTimer);
    (0,_modules_loader__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__["default"])("[data-modal]", ".modal", modalTimer);
    (0,_modules_slid__WEBPACK_IMPORTED_MODULE_6__["default"])();
    (0,_modules_accardion__WEBPACK_IMPORTED_MODULE_7__["default"])();


});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map