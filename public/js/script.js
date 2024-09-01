window.addEventListener('DOMContentLoaded', (event) => {
    const textContainer = document.getElementById('textContainer');

    if (textContainer.scrollWidth > textContainer.clientWidth) {
        textContainer.innerHTML += ':';
    }
});