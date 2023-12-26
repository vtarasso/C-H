document.addEventListener('DOMContentLoaded', function () {
    const popUp = document.querySelector('.pop-up');
    const popUpOpenElements = document.querySelectorAll('.pop-up-open');
    console.log('Number of pop-up-open elements:', popUpOpenElements.length);
    const popUpClose = document.getElementById('pop-up-close');
    console.log('1')


    popUpOpenElements.forEach(function (popUpOpen) {
        console.log('2')
        popUpOpen.onclick = function () {
            console.log('Открытие всплывающего окна');
            popUp.style.display = 'flex';
            console.log('3');
        };
    });
    console.log('4')
    popUpClose.onclick = function() {
        popUp.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == popUp) {
            popUp.style.display = 'none';
        }
    }
    console.log('5')
});

