let gallery = document.querySelector('.tovar-gallery');
let width = gallery.offsetWidth;
var gap = parseFloat(getComputedStyle(gallery).gap);
let width1 = width + gap;
let count = 1;
let list = tovarslider.querySelector('.tovar-gallery');
let listElems = tovarslider.querySelectorAll('.tovar-slide');
let position = 0;


tovarslider.querySelector('.arrow-prev').onclick = function () {
    position += width1 * count;
    position = Math.min(position, 0)
    list.style.marginLeft = position + 'px';
};

tovarslider.querySelector('.arrow-next').onclick = function () {
    position -= width1 * count;
    position = Math.max(position, -width1 * (listElems.length - count));
    list.style.marginLeft = position + 'px';
};
