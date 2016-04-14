/**
 * Created by Liming on 2016/4/12.
 */
"use strict";
(function() {
    /**
     * 拼图布局
     * @param id 容器id
     * @returns object 拼图布局对象
     * @constructor
     */
    window.PicJigsaw = function(id) {
        /**
         * 拼图布局构造器
         * @param id 容器id
         * @returns {picJigsaw} 拼图布局对象
         */
        var picJigsaw = function(id) {
            //获取元素
            var _element = document.getElementById(id);
            //获取图片div
            var _imagesDiv = _element.getElementsByTagName("div");
            /**
             * 初始化
             * @param width 总宽度
             * @param height 总高度
             */
            this.init = function(width, height) {
                //判断图片数量
                if(_imagesDiv.length > 6) {
                    throw "图片数太多，最多6个！";
                }
                //设置宽高
                width = width || 200;
                height = height || 200;
                _element.style.width = width + "px";
                _element.style.height = height + "px";
                //元素CSS
                _element.style.display = "flex";
                _element.style.webkitFlexFlow = _element.style.flexFlow = "row nowrap";
                _element.style.webkitJustifyContent = _element.style.justifyContent = "space-around";
                _element.style.webkitAlignItems = _element.style.alignItems = "stretch";
                for(var div = 0; div < _imagesDiv.length; div++) {
                    _imagesDiv[div].getElementsByTagName("img")[0].style.float = "right";
                }
                //执行设置
                switch(_imagesDiv.length) {
                    case 1:
                        //获取图片
                        var img = _imagesDiv[0].getElementsByTagName("img")[0];
                        //设置图片大小
                        img.style.width = width + "px";
                        img.style.height = height + "px";
                        break;
                    case 2:
                        //第一张图片
                        var img0 = _imagesDiv[0].getElementsByTagName("img")[0];
                        //第二张图片
                        var img1 = _imagesDiv[1].getElementsByTagName("img")[0];
                        //设置图片大小
                        img0.style.width = img1.style.width = Math.ceil(width * 2 / 3) + "px";
                        img0.style.height = img1.style.height = height + "px";
                        //右边图片包围框
                        _imagesDiv[1].style.width = width + "px";
                        //右边图片副盖左边
                        _imagesDiv[1].style.marginLeft = -Math.ceil(width * 2 / 3) + "px";
                        //裁剪线角度（1/3）
                        var deg = -Math.atan2(width / 6, height / 2) * 180 / Math.PI;
                        //右边图片裁剪
                        _imagesDiv[1].style.webkitMaskImage = "-webkit-linear-gradient(" + deg + "deg, transparent 50%, white 50%)";
                        _imagesDiv[1].style.maskImage = "linear-gradient(" + deg + "deg, transparent 50%, white 50%)";
                        break;
                    case 3:
                        //第一张图片
                        img0 = _imagesDiv[0].getElementsByTagName("img")[0];
                        //第二张图片
                        img1 = _imagesDiv[1].getElementsByTagName("img")[0];
                        //第三张图片
                        var img2 = _imagesDiv[2].getElementsByTagName("img")[0];
                        //设置图片大小
                        img1.style.width = img1.style.height = img2.style.width = img2.style.height = Math.round(height / 2) + "px";
                        img0.style.width = width - img1.width + "px";
                        img0.style.height = height + "px";
                        //创建右边容器
                        var right = document.createElement("div");
                        //将剩下后两张图片放到右边容器中
                        right.appendChild(_imagesDiv[1]);
                        right.appendChild(_imagesDiv[1]);
                        //右边容器样式
                        right.style.display = "flex";
                        right.style.webkitFlexFlow = right.style.flexFlow = "column nowrap";
                        right.style.webkitJustifyContent = right.style.justifyContent = "space-around";
                        right.style.webkitAlignItems = right.style.alignItems = "stretch";
                        //将右边容器添加进来
                        _element.appendChild(right);
                        break;
                    case 4:
                        //设置图片大小
                        //第一张图片
                        img0 = _imagesDiv[0].getElementsByTagName("img")[0];
                        //第二张图片
                        img1 = _imagesDiv[1].getElementsByTagName("img")[0];
                        //第三张图片
                        img2 = _imagesDiv[2].getElementsByTagName("img")[0];
                        //第四张图片
                        var img3 = _imagesDiv[3].getElementsByTagName("img")[0];
                        //设置图片大小
                        img0.style.width = img1.style.width = Math.round(width / 2) + "px";
                        img0.style.height = img1.style.height = Math.round(height / 2) + "px";
                        img2.style.width = img3.style.width = width - img0.width + "px";  //这样计算是防止非整数导致整体宽度偏差
                        img2.style.height = img3.style.height = height - img0.height + "px";
                        //创建左右容器
                        var left = document.createElement("div");
                        right = document.createElement("div");
                        //将图片加到容器中
                        left.appendChild(_imagesDiv[0]);
                        left.appendChild(_imagesDiv[0]);
                        right.appendChild(_imagesDiv[0]);
                        right.appendChild(_imagesDiv[0]);
                        //容器样式
                        left.style.display = right.style.display = "flex";
                        left.style.webkitFlexFlow = left.style.flexFlow = right.style.webkitFlexFlow = right.style.flexFlow = "column nowrap";
                        left.style.webkitJustifyContent = left.style.justifyContent = right.webkitJustifyContent = right.style.justifyContent = "space-around";
                        left.style.webkitAlignItems = left.style.alignItems = right.style.webkitAlignItems = right.style.alignItems = "stretch";
                        //将容器添加进来
                        _element.appendChild(left);
                        _element.appendChild(right);
                        break;
                    case 5:
                        //第一张图片
                        img0 = _imagesDiv[0].getElementsByTagName("img")[0];
                        //第二张图片
                        img1 = _imagesDiv[1].getElementsByTagName("img")[0];
                        //第三张图片
                        img2 = _imagesDiv[2].getElementsByTagName("img")[0];
                        //第四张图片
                        img3 = _imagesDiv[3].getElementsByTagName("img")[0];
                        //第五张图片
                        var img4 = _imagesDiv[4].getElementsByTagName("img")[0];
                        //设置图片大小
                        img0.style.width = Math.round(width * 2 / 3) + "px";
                        img0.style.height = Math.round(height * 2 / 3) + "px";
                        img1.style.width = Math.round(width / 3) + "px";
                        img2.style.width = img0.width - img1.width + "px";  //防止下面两张图片之间产生空白
                        img1.style.height = img2.style.height = height - img0.height + "px";
                        img3.style.width = img3.style.height = img4.style.width = width - img0.width + "px";
                        img4.style.height = height - img3.height + "px";
                        //创建容器
                        left = document.createElement("div");
                        var leftBottom = document.createElement("div");
                        right = document.createElement("div");
                        //将图片加到容器中
                        left.appendChild(_imagesDiv[0]);
                        leftBottom.appendChild(_imagesDiv[0]);
                        leftBottom.appendChild(_imagesDiv[0]);
                        right.appendChild(_imagesDiv[0]);
                        right.appendChild(_imagesDiv[0]);
                        //容器样式
                        left.style.display = right.style.display = leftBottom.style.display = "flex";
                        left.style.webkitFlexFlow = left.style.flexFlow = right.style.webkitFlexFlow = right.style.flexFlow = "column nowrap";
                        left.style.webkitJustifyContent = left.style.justifyContent = right.style.webkitJustifyContent = right.style.justifyContent = leftBottom.style.webkitJustifyContent = leftBottom.style.justifyContent = "space-around";
                        left.style.webkitAlignItems = left.style.alignItems = right.style.webkitAlignItems = right.style.alignItems = leftBottom.style.webkitAlignItems = leftBottom.style.alignItems = "stretch";
                        leftBottom.style.webkitFlexFlow = leftBottom.style.flexFlow = "row nowrap";
                        //将容器添加进来
                        left.appendChild(leftBottom);
                        _element.appendChild(left);
                        _element.appendChild(right);
                        break;
                    case 6:
                        //第一张图片
                        img0 = _imagesDiv[0].getElementsByTagName("img")[0];
                        //第二张图片
                        img1 = _imagesDiv[1].getElementsByTagName("img")[0];
                        //第三张图片
                        img2 = _imagesDiv[2].getElementsByTagName("img")[0];
                        //第四张图片
                        img3 = _imagesDiv[3].getElementsByTagName("img")[0];
                        //第五张图片
                        img4 = _imagesDiv[4].getElementsByTagName("img")[0];
                        //第六张图片
                        var img5 = _imagesDiv[5].getElementsByTagName("img")[0];
                        //设置图片大小
                        img0.style.width = Math.round(width * 2 / 3) + "px";
                        img0.style.height = Math.round(height * 2 / 3) + "px";
                        img1.style.width = Math.round(width / 3) + "px";
                        img2.style.width = img0.width - img1.width + "px";
                        img3.style.width = img4.style.width = img5.style.width = width - img0.width + "px";
                        img1.style.height = img2.style.height = height - img0.height + "px";
                        img3.style.height = Math.round(img0.height / 2) + "px";
                        img4.style.height = img0.height - img3.height + "px";
                        img5.style.height = height - img0.height + "px";
                        //创建容器
                        left = document.createElement("div");
                        leftBottom = document.createElement("div");
                        right = document.createElement("div");
                        //将图片加到容器中
                        left.appendChild(_imagesDiv[0]);
                        leftBottom.appendChild(_imagesDiv[0]);
                        leftBottom.appendChild(_imagesDiv[0]);
                        right.appendChild(_imagesDiv[0]);
                        right.appendChild(_imagesDiv[0]);
                        right.appendChild(_imagesDiv[0]);
                        //容器样式
                        left.style.display = right.style.display = leftBottom.style.display = "flex";
                        left.style.webkitFlexFlow = left.style.flexFlow = right.style.webkitFlexFlow = right.style.flexFlow = "column nowrap";
                        left.style.webkitJustifyContent = left.style.justifyContent = right.style.webkitJustifyContent = right.style.justifyContent = leftBottom.style.webkitJustifyContent = leftBottom.style.justifyContent = "space-around";
                        left.style.webkitAlignItems = left.style.alignItems = right.style.webkitAlignItems = right.style.alignItems = leftBottom.style.webkitAlignItems = leftBottom.style.alignItems = "stretch";
                        leftBottom.style.webkitFlexFlow = leftBottom.style.flexFlow = "row nowrap";
                        //将容器添加进来
                        left.appendChild(leftBottom);
                        _element.appendChild(left);
                        _element.appendChild(right);
                        break;
                }
            };
            return this;
        };
        //返回构造的对象
        return new picJigsaw(id);
    };
})();
