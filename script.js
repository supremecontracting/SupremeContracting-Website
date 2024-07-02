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
const headerShrink = 45;

window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;
    if (scrollPosition >= headerShrink) {
        header.classList.add("nav-scrolling");
    } else {
        header.classList.remove("nav-scrolling");
    }
    /*
    if (scrollPosition >= headerShrink) {
        topnav.classList.add("topnav-scrolling");
    } else {
        topnav.classList.remove("topnav-scrolling");
    }
    */
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

document.addEventListener("DOMContentLoaded", function () {
    // Get all roofing items and sidebar links
    var roofingItems = document.querySelectorAll('.roofing-item');
    var sidebarLinks = document.querySelectorAll('.scrolling-sidebar a');

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
        );
    }

    // Function to add or remove the "active" class based on the viewport
    function updateActiveLink() {
        var activeLinkId = null;

        roofingItems.forEach(function (item, index) {
            var link = sidebarLinks[index];

            if (isInViewport(item)) {
                activeLinkId = link.getAttribute('href');
            }
        });

        // Remove "active" class from all links
        sidebarLinks.forEach(function (link) {
            link.classList.remove('active-sidebar-link');
        });

        // Add "active" class to the link with the corresponding ID
        if (activeLinkId) {
            document.querySelector('a[href="' + activeLinkId + '"]').classList.add('active-sidebar-link');
        }
    }

    // Add click event listener to update the "active" class when a link is clicked
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll event listener to update the "active" class on scroll
    window.addEventListener('scroll', function () {
        updateActiveLink(); // Update active link on scroll
    });

    // Call the function initially to set the "active" class on page load
    updateActiveLink();
});

// animate transitions only after loaded

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
  });

  let lastScrollTop = 0;

  window.addEventListener("scroll", function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 45) {
      // Only apply the effect when scrolled down by at least 45px
      if (scrollTop > lastScrollTop) {
        // Scrolling down, hide the top navigation
        document.querySelector(".top-nav").style = "top: -54px;";
      } else {
        // Scrolling up, reveal the top navigation
        document.querySelector(".top-nav").style = "top: 0;";
      }
      if (scrollTop > lastScrollTop) {
        // Scrolling down, hide the top navigation
        document.getElementById("header").style = "top: 0; border-color: transparent !important;";
      } else {
        // Scrolling up, reveal the top navigation
        document.getElementById("header").style = "top: 53.9px;";
      }
    }

    lastScrollTop = scrollTop;
  });

  /* lazy loading */
  document.addEventListener("DOMContentLoaded", function() {
    function initializeLazyLoading(tab) {
      let lazyImages = [].slice.call(tab.querySelectorAll("img.lazy[data-src]"));
  
      if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute("data-src");
              lazyImage.classList.remove("lazy");
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });
  
        lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
        });
      } else {
        // Fallback for browsers that do not support IntersectionObserver
        let lazyLoad = function() {
          let active = false;
  
          if (active === false) {
            active = true;
  
            setTimeout(function() {
              lazyImages.forEach(function(lazyImage) {
                if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.removeAttribute("data-src");
                  lazyImage.classList.remove("lazy");
  
                  lazyImages = lazyImages.filter(function(image) {
                    return image !== lazyImage;
                  });
  
                  if (lazyImages.length === 0) {
                    document.removeEventListener("scroll", lazyLoad);
                    window.removeEventListener("resize", lazyLoad);
                    window.removeEventListener("orientationchange", lazyLoad);
                  }
                }
              });
  
              active = false;
            }, 200);
          }
        };
  
        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
      }
    }
  
    // Initialize lazy loading on the initially active tab
    let activeTab = document.querySelector('.tab.active');
    initializeLazyLoading(activeTab);
  
    // Reinitialize lazy loading when a new tab is clicked
    document.querySelectorAll('.tabs-nav a').forEach((link) => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        let targetId = this.getAttribute('href').substring(1);
        document.querySelector('.tabs-nav a.active').classList.remove('active');
        this.classList.add('active');
  
        document.querySelector('.tab.active').classList.remove('active');
        let newActiveTab = document.getElementById(targetId);
        newActiveTab.classList.add('active');
  
        initializeLazyLoading(newActiveTab);
      });
    });
  });
  

