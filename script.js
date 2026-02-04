// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = '#0f172a';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
});

// Simple form validation feedback
const form = document.querySelector('form');
const status = document.getElementById('form-status');

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevents the page from reloading
    
    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.style.display = "block"; // Show success message
            status.style.background = "#22c55e";
            status.innerText = "Thanks! We'll get back to you shortly.";
            form.reset(); // Clear the form
        } else {
            throw new Error();
        }
    } catch (error) {
        status.style.display = "block";
        status.style.background = "#ef4444";
        status.innerText = "Oops! There was a problem submitting your form.";
    }
});