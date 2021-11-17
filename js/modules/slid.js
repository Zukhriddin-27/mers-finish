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
export default slid;