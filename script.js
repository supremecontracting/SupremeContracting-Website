$(document).ready(function() {
    // Your jQuery code here
$('#header').prepend('<div id="menu-icon"><span class="first"></span><span class="second"></span><span class="third"></span></div>');
	
$("#menu-icon").on("click", function(){
$("nav").slideToggle();
$(this).toggleClass("active");
});

});

let scrollPosition = window.scrollY;
const header = document.querySelector("#header");
const topnav = document.querySelector(".top-nav");
const headerShrink = 1;

window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;
    if (scrollPosition >= headerShrink) {
        header.classList.add("nav-scrolling");
    } else {
        header.classList.remove("nav-scrolling");
    }
    if (scrollPosition >= headerShrink) {
        topnav.classList.add("topnav-scrolling");
    } else {
        topnav.classList.remove("topnav-scrolling");
    }
});

// Get the current year
const currentYear = new Date().getFullYear();

// Select the footer element by its ID
const footer = document.querySelector('.footer-copyright');

// Create a new paragraph element
const copyrightParagraph = document.createElement('p');

// Set the content of the paragraph to the copyright notice
copyrightParagraph.textContent = `© ${currentYear} Supreme Contracting. All Rights Reserved.`;

// Append the paragraph to the footer
footer.appendChild(copyrightParagraph);

// slider

const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    const quotes = document.querySelectorAll('.quote');
    let currentIndex = 0;
    let isHovered = false;
    let touchStartX = 0;

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActiveSlide(index);
        });
    });

    quotes.forEach((quote) => {
        quote.addEventListener('mouseover', () => {
            isHovered = true;
        });

        quote.addEventListener('mouseout', () => {
            isHovered = false;
        });
    });

    slides.addEventListener('touchstart', handleTouchStart);
    slides.addEventListener('touchmove', handleTouchMove);

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        if (!isHovered) {
            const touchEndX = event.touches[0].clientX;
            const deltaX = touchEndX - touchStartX;

            // Set a threshold to determine a swipe
            if (Math.abs(deltaX) > 50) {
                // Swipe left
                if (deltaX < 0) {
                    nextSlide();
                }
                // Swipe right
                else {
                    prevSlide();
                }
            }
        }
    }

    function setActiveSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;

        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        slides.querySelectorAll('.slide').forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        if (!isHovered) {
            currentIndex = (currentIndex + 1) % dots.length;
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;

            updateDots();
        }
    }

    function prevSlide() {
        if (!isHovered) {
            currentIndex = (currentIndex - 1 + dots.length) % dots.length;
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;

            updateDots();
        }
    }

    setInterval(nextSlide, 5000);



