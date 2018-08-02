function Slider(el, opt) {
    this.wrap = el;
    this.opt = Object.assign({}, {
        autoplay: true,
        rotateY: 0
    }, opt);

    this.children = []; // wrap的所有子元素
    this.imgs = []; // wrap中的所有图片
    this.currentImg = {}; // 当前选中的图片

    // 初始化
    this.init();
}

Slider.prototype.init = function () {
    this.children = [...this.wrap.children];
    this.imgs = this.children.filter(child => child.tagName === 'IMG'); // 获取wrap中的所有图片
    // 如果不满9张，则填充原有img
    if (this.imgs.length < 9) {
        let imgsHtml = "";
        let lenSrc = len = this.imgs.length;
        while (len < 9 || len % lenSrc !== 0) {
            let copyIndex = len % lenSrc;
            imgsHtml += `<img src="${this.imgs[copyIndex].src}"></img>`;
            len++;
        }
        this.wrap.innerHTML += imgsHtml;
    }
    this.children = [...this.wrap.children];
    this.imgs = this.children.filter(child => child.tagName === 'IMG'); // 再次获取wrap中的所有图片

    this.wrap.classList.add('wrap');
    this.moveTo(this.imgs[0]); // 从第一张图片开始
    this.wrap.style.height = this.currentImg.height + 'px'; // 改变wrap的高
    this.imgs.forEach(img => {
        // 添加动画效果
        img.style.transition = 'all .5s linear';
        img.style.webkitTransform = img.style.transform;
        img.style.MozTransform = img.style.transform;
        img.style.msTransform = img.style.transform;
        img.style.OTransform = img.style.transform;
    });

    // 为图片添加点击事件
    this.imgs.forEach(img => {
        img.onclick = () => this.moveTo(img);
    });

    // 自动播放
    if (this.opt.autoplay) {
        this.autoplay();
    }

    // 动态改变wrap的高
    window.addEventListener("resize", () => {
        if (this.currentImg) {
            this.wrap.style.height = this.currentImg.height + 'px';
            this.moveTo(this.currentImg);
        }
    }, false);
}

Slider.prototype.moveTo = function (img) {
    let imgIndex = this.imgs.indexOf(img);

    // 把需要展示的图片保存起来备用
    let displayImgs = [];
    for (let i = -4; i < 5; i++) {
        let displayImgIndex = (imgIndex + i) % this.imgs.length;
        if (displayImgIndex < 0) {
            displayImgIndex += this.imgs.length;
        }
        displayImgs.push(this.imgs[displayImgIndex]);
    }

    this.currentImg = img;
    // 渲染
    this.render(displayImgs);
}

Slider.prototype.render = function (displayImgs) {
    this.imgs.forEach(img => {
        img.style.opacity = 0;
        img.style.zIndex = -10000;
    });

    let rotateY = this.opt.rotateY;
    displayImgs.forEach((img, index) => {
        // 中间的5张图片是展示图片，其余的是备用图片，为了保证动画流畅
        if (index > 1 && index < 7) img.style.opacity = 1;
        img.style.transform = `translateX(${this.getLinearFuntionY(index, document.body.clientWidth / 5)}px) 
                               translateZ(${this.getQuadraticFunctionY(index, 100)}px) 
                               rotateY(${index < 4 ? rotateY : index === 4 ? 0 : -rotateY}deg)`;
        img.style.webkitTransform = img.style.transform;
        img.style.MozTransform = img.style.transform;
        img.style.msTransform = img.style.transform;
        img.style.OTransform = img.style.transform;
        img.style.zIndex = this.getQuadraticFunctionY(index);
    });
}

// 一次函数 y=x-2
Slider.prototype.getLinearFuntionY = function (index, n = 1) {
    let midWidth = this.currentImg.width / 2;
    return (index - 4) * n - midWidth;
}

// 二次函数 y=-x^2+8x-16
Slider.prototype.getQuadraticFunctionY = function (index, n = 1) {
    return (-(index * index) + 8 * index - 16) * n;
}

Slider.prototype.autoplay = function () {
    let setTimer = function () {
        return setInterval(() => {
            let imgIndex = this.imgs.indexOf(this.currentImg);
            imgIndex++;
            this.moveTo(this.imgs[imgIndex % this.imgs.length]);
        }, 2000);
    }
    let timer = setTimer.call(this);

    this.imgs.forEach(img => {
        img.addEventListener('mouseenter', () => {
            clearInterval(timer);
        });
        img.addEventListener('mouseleave', () => {
            timer = setTimer.call(this);
        });
    });
}