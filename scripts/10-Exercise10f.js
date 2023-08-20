function toggle(theButton) {
    buttonElement = document.querySelector(theButton)
    allButton = document.querySelector('.gaming-button', '.music-button' , '.tech-button');
    if (buttonElement.classList.contains('is-toggled')) {
        buttonElement.classList.remove('is-toggled')
    } else {
        document.querySelector('.gaming-button').classList.remove('is-toggled');
        document.querySelector('.music-button').classList.remove('is-toggled');
        document.querySelector('.tech-button').classList.remove('is-toggled');
        buttonElement.classList.add('is-toggled');
    }
}