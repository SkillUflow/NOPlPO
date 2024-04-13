// Import nav, footer

fetch('/assets/header.html').then(response => response.text()).then(html => document.getElementsByTagName('header')[0].innerHTML = html);
fetch('/assets/footer.html').then(response => response.text()).then(html => document.getElementsByTagName('footer')[0].innerHTML = html);
