// script.js
document.addEventListener("scroll", (event) => {
    let overlay = document.getElementById('splashscreen');
    if (window.scrollY > 1) { // Ajustez ce nombre selon vos besoins
        // Pour faire disparaître graduellement
        overlay.style.opacity = '0';
        setTimeout(function() { overlay.style.display = 'none'; }, 600); // Ajustez le timing si nécessaire

    }
});
