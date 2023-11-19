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



