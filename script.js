$(document).ready(function() {
  // Your jQuery code here
  $('#header').prepend('<div id="menu-icon"><span class="first"></span><span class="second"></span><span class="third"></span></div>');
  
  $("#menu-icon").on("click", function() {
    $("nav").slideToggle();
    $(this).toggleClass("active");
  });

  // Add event listeners to each menu link to close the menu on click or tap
  $("nav ul li a").on("click", function() {
    $("nav").slideUp();
    $("#menu-icon").removeClass("active");
  });
}); 


let scrollPosition = window.scrollY;
const header = document.querySelector("#header");
const topnav = document.querySelector(".top-nav");
const headerShrink = 45;

window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;
    if (header) {
      if (scrollPosition >= headerShrink) {
          header.classList.add("nav-scrolling");
      } else {
          header.classList.remove("nav-scrolling");
      }
    }
    /*
    if (topnav) {
      if (scrollPosition >= headerShrink) {
          topnav.classList.add("topnav-scrolling");
      } else {
          topnav.classList.remove("topnav-scrolling");
      }
    }
    */
});

// Get the current year
const currentYear = new Date().getFullYear();

// Select the footer element
const footer = document.querySelector('.footer-copyright');

// Create elements
const copyrightParagraph = document.createElement('p');
copyrightParagraph.textContent = `© ${currentYear} Supreme Contracting VA. All Rights Reserved.`;

// Append only if footer exists (and clean up any pre-existing sitemap link added by older scripts)
if (footer) {
  const existingSitemap = footer.querySelector('a[href$="/sitemap.html"], a[href="/sitemap.html"]');
  if (existingSitemap) existingSitemap.remove();
  footer.appendChild(copyrightParagraph);
}
document.addEventListener("DOMContentLoaded", function () {
    // Get all roofing items and sidebar links
    var roofingItems = document.querySelectorAll('.roofing-item');
    var sidebarLinks = document.querySelectorAll('.scrolling-sidebar a');

    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
        );
    }

    function updateActiveLink() {
        var activeLinkId = null;

        roofingItems.forEach(function (item, index) {
            var link = sidebarLinks[index];
            if (!link) return; // guard if counts mismatch
            if (isInViewport(item)) {
                activeLinkId = link.getAttribute('href');
            }
        });

        // Remove "active" class from all links
        sidebarLinks.forEach(function (link) {
            link.classList.remove('active-sidebar-link');
        });

        if (activeLinkId) {
            var toActivate = document.querySelector('a[href="' + activeLinkId + '"]');
            if (toActivate) {
              toActivate.classList.add('active-sidebar-link');
            }
        }
    }

    // Add click listener to update the "active" class when a link is clicked
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = link.getAttribute('href');
            var targetEl = document.querySelector(targetId);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', function () {
        updateActiveLink();
    });

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
    var topNavEl = document.querySelector(".top-nav");
    var headerEl = document.getElementById("header");

    // Only apply the effect when scrolled down by at least 45px
    if (scrollTop > lastScrollTop) {
      // Scrolling down, hide the top navigation
      if (topNavEl) topNavEl.style = "top: -54px;";
    } else {
      // Scrolling up, reveal the top navigation
      if (topNavEl) topNavEl.style = "top: 0;";
    }
    if (scrollTop > lastScrollTop) {
      // Scrolling down, hide the top navigation
      if (headerEl) headerEl.style = "top: 0; border-color: transparent !important;";
    } else {
      // Scrolling up, reveal the top navigation
      if (headerEl) headerEl.style = "top: 53.9px;";
    }
  }

  lastScrollTop = scrollTop;
});

/* lazy loading */
document.addEventListener("DOMContentLoaded", function() {
  function initializeLazyLoading(tab) {
    // If no tab provided, default to document to support pages without tabs
    var scope = (tab && tab.querySelectorAll) ? tab : document;
    let lazyImages = [].slice.call(scope.querySelectorAll("img.lazy[data-src]"));

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
      let active = false;
      let lazyLoad = function() {
        if (active) return;
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
      };

      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
      // Kick once in case above-the-fold images exist
      lazyLoad();
    }
  }

  // Initialize lazy loading on the initially active tab (or whole document if no tabs exist)
  let activeTab = document.querySelector('.tab.active');
  if (activeTab) {
    initializeLazyLoading(activeTab);
  } else {
    initializeLazyLoading(document);
  }

  // Reinitialize lazy loading when a new tab is clicked (guarded for missing elements)
  document.querySelectorAll('.tabs-nav a').forEach((link) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      let hrefVal = this.getAttribute('href');
      let targetId = hrefVal ? hrefVal.substring(1) : null;

      const currentActiveLink = document.querySelector('.tabs-nav a.active');
      if (currentActiveLink) currentActiveLink.classList.remove('active');
      this.classList.add('active');

      const currentActiveTab = document.querySelector('.tab.active');
      if (currentActiveTab) currentActiveTab.classList.remove('active');

      let newActiveTab = targetId ? document.getElementById(targetId) : null;
      if (newActiveTab) {
        newActiveTab.classList.add('active');
        initializeLazyLoading(newActiveTab);
      }
    });
  });
});

// menu links on click tap 

  

