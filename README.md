# Slider
Slider是一个基于CSS3和es6语法的响应式3D轮播插件，适用于PC端和移动端

优点
- 响应式
- 兼容CommonJS和ES6 Module

缺点
- 由于使用了CSS3动画，所以只能兼容IE10+
- 图片比例为16:9时为最佳效果

预览效果：[demo](https://huajiayi.github.io/Slider/)（图片加载可能稍慢）
## 使用方式
```html
<div id="wrap">
    <img src="img/dog1.jpg">
    <img src="img/dog2.jpg">
    <img src="img/dog3.jpg">
    <img src="img/dog4.jpg">
    <img src="img/dog5.jpg">
</div>

<script>
    let warp = document.getElementById('wrap');
    let slider = new Slider(warp, {
        autoplay: true, // 是否自动播放
        rotateY: 0 // 图片倾斜角度
    });
</script>
```
## 引入
可以直接引用js文件和css文件来使用
```html
<link rel="stylesheet" href="css/Slider.css">
<script src="js/Slider.js"></script>
```
### CommonJS
```js
let Slider = require('js/Slider');
```
### ES6 Module
```js
import Slider from 'js/Slider';
```