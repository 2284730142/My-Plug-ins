$(function () {
    // 这种事要填参数的对应
    // var config = new RouteConfig({box: document.getElementsByClassName('container')[0]});
    // 这种是不用填参数的对应
    var config = new RouteConfig();

    config.init('home')
        .when({
            name: 'home',
            jsUrl: './js/home.js',
            cssUrl: './css/home.css',
            htmlUrl: './view/home.html'
        })
        .when({
            name: 'page1',
            jsUrl: './js/page1.js',
            cssUrl: './css/page1.css',
            htmlUrl: './view/page1.html'
        })
        .when({
            name: 'page2',
            jsUrl: './js/page2.js',
            cssUrl: './css/page2.css',
            htmlUrl: './view/page2.html'
        })
        .when({
            name: 'page3',
            jsUrl: './js/page3.js',
            cssUrl: './css/page3.css',
            htmlUrl: './view/page3.html'
        })
        .start();
});