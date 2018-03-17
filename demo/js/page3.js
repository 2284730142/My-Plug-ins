$(function () {
    console.log(1);
    var page3 = document.getElementsByClassName('page3')[0];
    setTimeout(function () {
        // page3.style.background = 'blue';
        $(page3).css({
            background: 'blue'
        });
    }, 1000);
});

