document.addEventListener('DOMContentLoaded', () => {
    const expandButtons = document.querySelectorAll('.accordion');  // find all buttons (accordian class)

    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const expandContent = button.nextElementSibling;
            button.classList.toggle('active') // change symbol +/-
            if (expandContent.style.display === 'block') {
                expandContent.style.display = 'none';
            } else {
                expandContent.style.display = 'block';
            }
        });
    });
});