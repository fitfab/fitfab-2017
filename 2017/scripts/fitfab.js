/* global document*/
/* eslint no-undef: "error"*/

require('./../styles/styles.less');

// active element
let activeElement;

function toggle(event) {

    // if it's active return
    if (event.target.classList.contains('panel') &&
        event.target.classList.contains('active')) {

        return;

    }

    // if the right target
    if (event.target.classList.contains('panel')) {

        // remove active class from the previous element
        activeElement.classList.remove('active');
        // add active class
        event.target.classList.add('active');
        activeElement = event.target;

    }

}

document.addEventListener('DOMContentLoaded', () => {

    activeElement = document.querySelectorAll('.panel')[0];
    const view = document.querySelectorAll('.wrapper');
    view[0].addEventListener('click', toggle);

});
