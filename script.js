// Toggle navigation menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Handle form submission
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message. We will get back to you soon.');
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('There was an error sending your message. Please try again.');
                    }
                });
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        });
    });
}

// Handle custom package button click for packages page
const customPackageBtn = document.getElementById('custom-package-btn');
const customPackageCheckbox = document.getElementById('custom-package');
const packageSelect = document.getElementById('package');
const customPackageInfo = document.getElementById('custom-package-info');
const customPackageInfoMessage = document.getElementById('custom-package-info-message');

if (customPackageBtn && customPackageCheckbox && packageSelect) {
    customPackageBtn.addEventListener('click', () => {
        customPackageCheckbox.checked = !customPackageCheckbox.checked;
        if (customPackageCheckbox.checked) {
            customPackageBtn.classList.add('checked');
            packageSelect.disabled = true; // Disable package select
        } else {
            customPackageBtn.classList.remove('checked');
            packageSelect.disabled = false; // Enable package select
        }
    });
}

// Handle info icon hover
if (customPackageInfo && customPackageInfoMessage) {
    customPackageInfo.addEventListener('mouseover', () => {
        customPackageInfoMessage.style.display = 'block';
    });
    customPackageInfo.addEventListener('mouseout', () => {
        customPackageInfoMessage.style.display = 'none';
    });
}

// Theme toggle
const themeToggleButton = document.getElementById('theme-toggle-button');
const body = document.body;

themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light'); // Save theme preference
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); // Save theme preference
    }
});

// Set initial theme and animations
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(savedTheme + '-mode');
    // Apply animations on page load
    addAnimations();
    // Apply Intersection Observer for content sections
    applyIntersectionObserver();
});

function addAnimations() {
    const servicesHeading = document.querySelector('.services h2');
    const serviceContainer = document.querySelector('.service-container');
    const serviceItems = document.querySelectorAll('.service');
    const packageItems = document.querySelectorAll('.package');
    const contactSection = document.querySelector('.contact');

    if (servicesHeading) servicesHeading.classList.add('animate__fadeIn');
    if (serviceContainer) serviceContainer.classList.add('animate__fadeIn');
    if (serviceItems.length > 0) {
        serviceItems.forEach((service, index) => {
            setTimeout(() => {
                service.classList.add('animate__slideInUpSubtle');
            }, (index + 1) * 150);
        });
    }
    if (packageItems.length > 0) {
        packageItems.forEach((packageItem, index) => {
            setTimeout(() => {
                packageItem.classList.add('animate__slideInUp');
            }, (index + 1) * 100);
        });
    }
    if (contactSection) contactSection.classList.add('animate__slideInUp');
}

function applyIntersectionObserver() {
    const elements = document.querySelectorAll('.content, .service, .package, .contact');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Remove event listener that prevents default behavior for service links
document.querySelectorAll('a[href="services.html"], a[href="contact.html"]').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const servicesHeading = document.querySelector('.services h2');
        const serviceContainer = document.querySelector('.service-container');
        const serviceItems = document.querySelectorAll('.service');
        const packageItems = document.querySelectorAll('.package');
        const contactSection = document.querySelector('.contact');

        if (servicesHeading) servicesHeading.classList.remove('animate__fadeIn');
        if (serviceContainer) serviceContainer.classList.remove('animate__fadeIn');
        if (serviceItems.length > 0) {
            serviceItems.forEach(service => {
                service.classList.remove('animate__slideInUp');
            });
        }
        if (packageItems.length > 0) {
            packageItems.forEach(packageItem => {
                packageItem.classList.remove('animate__slideInUp');
            });
        }
        if (contactSection) contactSection.classList.remove('animate__slideInUp');

        setTimeout(() => {
            window.location.href = event.target.href;
        }, 100);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init("OQDQiFhJCZRl8zlVF");

    // Add event listener for form submission
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Send the form data using EmailJS
        emailjs.sendForm('rsbeatsdigitals', 'template_j69geck', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you for your message. We will get back to you soon.');
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.log('FAILED...', error);
                console.error('Detailed error:', error);
                alert('There was an error sending your message. Please try again.');
            });
    });

    // Custom package button toggle functionality
    const customPackageBtn = document.getElementById('custom-package-btn');
    const customPackageCheckbox = document.getElementById('custom-package');
    if (customPackageBtn && customPackageCheckbox) {
        customPackageBtn.addEventListener('click', function() {
            customPackageCheckbox.checked = !customPackageCheckbox.checked;
            customPackageBtn.classList.toggle('checked');
        });
    }

    // Info icon hover functionality
    const customPackageInfo = document.getElementById('custom-package-info');
    const customPackageInfoMessage = document.getElementById('custom-package-info-message');
    if (customPackageInfo && customPackageInfoMessage) {
        customPackageInfo.addEventListener('mouseover', function() {
            customPackageInfoMessage.style.display = 'block';
        });
        customPackageInfo.addEventListener('mouseout', function() {
            customPackageInfoMessage.style.display = 'none';
        });
    }

    // Theme toggle functionality
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', function() {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light'); // Save theme preference
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark'); // Save theme preference
            }
        });
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(savedTheme + '-mode');
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdownBtn.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });
});

document.addEventListener('click', function(event) {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const isClickInside = dropdownBtn.contains(event.target) || dropdownContent.contains(event.target);

    if (!isClickInside) {
        dropdownContent.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const contactInfo = document.getElementById('contact-info');

    if (burger && contactInfo) {
        burger.addEventListener('click', (event) => {
            event.stopPropagation();
            contactInfo.classList.toggle('show');
            burger.classList.toggle('toggle');
        });

        document.addEventListener('click', (event) => {
            if (contactInfo.classList.contains('show')) {
                contactInfo.classList.remove('show');
                burger.classList.remove('toggle');
            }
        });

        contactInfo.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    } else {
        console.error('Burger or contactInfo element not found');
    }
});

