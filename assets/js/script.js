gsap.to("#tree", {
    scrollTrigger: {
        scrub: 1
    },
    y: 200,
});

window.requestNextAnimationFrame = (function () {
    var originalWebkitRequestAnimationFrame = undefined,
        wrapper = undefined,
        callback = undefined,
        geckoVersion = 0,
        userAgent = navigator.userAgent,
        index = 0,
        self = this;
    if (window.webkitRequestAnimationFrame) { //Chrome
        wrapper = function (time) {
            if (time === undefined) time = +new Date();
            self.callback(time);
        };
        originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;
        window.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;
            originalWebkitRequestAnimationFrame(wrapper, element);
        }
    }
    if (window.mozRequestAnimationFrame) { //Gecko
        index = userAgent.indexOf('rv:');
        if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);
            if (geckoVersion === '2.0') window.mozRequestAnimationFrame = undefined;
        }
    }
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            var start, finish;
            window.setTimeout(function () {
                start = +new Date();
                callback(start);
                finish = +new Date();
                self.timeout = 1000 / 60 - (finish - start);
            }, self.timeout);
        };
})();

//Код этого примера
var canvas = document.getElementById('sky'),
    context = canvas.getContext('2d'),
    sky = new Image(),
    lastTime = 0,
    fps = 0,
    skyOffset = 0,
    skyVelocity = 60; //скорость, пикселов/сек.

function erase() { //очистить
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() { //отрисовать
    context.save();
    skyOffset = skyOffset < canvas.width ? skyOffset + skyVelocity / fps : 0;
    context.save();
    context.translate(-skyOffset, 0);
    context.drawImage(sky, 0, 0);
    context.drawImage(sky, sky.width - 2, 0); //определяем нужное место вывода
    context.restore();
};

function calculateFps(now) { //вычислить fps (фреймов в секунду)
    var fps = 1000 / (now - lastTime);
    lastTime = now;
    return fps;
}

function animate(now) { //анимировать с помощью requestNextAnimationFrame
    if (now === undefined) now = +new Date;
    fps = calculateFps(now);
    erase();
    draw();
    requestNextAnimationFrame(animate);
}

sky.src = 'assets/img/home/banner/sky.png'; //Прописать здесь путь к фоновой картинке!
sky.onload = function (e) { draw(); };

requestNextAnimationFrame(animate);

