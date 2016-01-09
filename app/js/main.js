'use strict';

function computeBackgroundOffset (element) {
    var scrollPosition = document.querySelector('body').scrollTop;
    element.style.backgroundPositionY = '-' + scrollPosition / 40 + 'px';
}

function mainController () {
    var backgroundElement = document.querySelector('.main-container');
    computeBackgroundOffset(backgroundElement);
    window.addEventListener("scroll", function () {
        computeBackgroundOffset(backgroundElement);
    });
}

document.addEventListener("DOMContentLoaded", mainController);
