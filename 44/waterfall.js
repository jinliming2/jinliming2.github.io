/**
 * Created by Liming on 2016/4/13.
 */
"use strict";
(function() {
    /**
     * 瀑布布局
     * @param id 容器id
     * @returns object 瀑布布局对象
     * @constructor
     */
    window.Waterfall = function(id) {
        /**
         * 瀑布布局构造器
         * @param id 容器id
         * @returns {waterfall} 瀑布布局对象
         */
        var waterfall = function(id) {
            //获取元素
            var _element = document.getElementById(id), _totalWidth;
            var _columnCount, _margin, _columnWidth, _maxHeight;
            var _columnList, _imageList = [];
            /**
             * 取元素计算后样式
             * @param obj 元素
             * @param property 样式
             * @returns {string} 计算后的样式
             */
            var getProperty = function(obj, property) {
                if(obj.currentStyle) {
                    return obj.currentStyle.getAttribute(property);
                } else {
                    return getComputedStyle(obj, null).getPropertyValue(property);
                }
            };
            /**
             * 初始化
             * @param columnCount 列数
             * @param margin 边距
             */
            this.init = function(columnCount, margin) {
                _columnCount = columnCount || 4;
                _margin = margin || 16;
                _columnCount < 1 ? _columnCount = 1 : "";
                _margin < 0 ? _margin = 0 : "";
                _columnWidth = (parseFloat(getProperty(_element, "width")) - _margin * (_columnCount + 1)) / _columnCount;
                //元素CSS
                _element.style.position = "relative";
                //列列表
                _columnList = [];
                for(var i = 0; i < _columnCount; i++) {
                    _columnList[i] = _margin;
                }
                //元素尺寸
                _element.style.height = _margin + "px";
                _maxHeight = _margin;
                //图片列表
                _imageList = [];
            };
            /**
             * 添加图片
             * @param src 链接
             * @param title 标题
             * @param alt 注释
             */
            this.addImage = function(src, title, alt) {
                //创建图片元素
                var img = document.createElement("img");
                img.src = src;
                img.title = title || "";
                img.alt = alt || "";
                //图片加载
                img.onload = function() {
                    //图片大小
                    var w = img.width, h = img.height, height;
                    _imageList[_imageList.length] = {img: img, width: w, height: h};
                    img.style.width = _columnWidth + "px";
                    height = h * _columnWidth / w;
                    img.style.height = height + "px";
                    //图片样式
                    img.style.webkitTransition = img.style.mozTransition = img.style.oTransition = img.style.transition = "ease-out 0.25s";
                    //选择最矮的列
                    var col = 0;
                    for(var i = 0; i < _columnCount; i++) {
                        if(_columnList[col] > _columnList[i]) {
                            col = i;
                        }
                    }
                    //放置图片
                    img.style.position = "absolute";
                    img.style.left = _margin + col * (_columnWidth + _margin) + "px";
                    img.style.top = _columnList[col] + "px";
                    _columnList[col] += height + _margin;
                    if(_columnList[col] > _maxHeight) {
                        _maxHeight = _columnList[col];
                        _element.style.height = _maxHeight + "px";
                    }
                    _element.appendChild(img);
                };
                //图片加载失败
                img.onerror = function() {
                    console.log("图片" + src + "加载失败！");
                };
            };
            var init = this.init;
            /**
             * 重新布局
             * @param columnCount 列数
             * @param margin 边距
             */
            this.resize = function(columnCount, margin) {
                var tmp = _imageList;
                init(columnCount || _columnCount, margin || _margin);
                _imageList = tmp;
                for(var i = 0; i < _imageList.length; i++) {
                    //图片大小
                    var w = _imageList[i].width, h = _imageList[i].height, height;
                    _imageList[i].img.style.width = _columnWidth + "px";
                    height = h * _columnWidth / w;
                    _imageList[i].img.style.height = height + "px";
                    //选择最矮的列
                    var col = 0;
                    for(var j = 0; j < _columnCount; j++) {
                        if(_columnList[col] > _columnList[j]) {
                            col = j;
                        }
                    }
                    //放置图片
                    _imageList[i].img.style.position = "absolute";
                    _imageList[i].img.style.left = _margin + col * (_columnWidth + _margin) + "px";
                    _imageList[i].img.style.top = _columnList[col] + "px";
                    _columnList[col] += height + _margin;
                    if(_columnList[col] > _maxHeight) {
                        _maxHeight = _columnList[col];
                        _element.style.height = _maxHeight + "px";
                    }
                }
            };
            var resize = this.resize, _sizeChanged = function() {
                if(_totalWidth != parseFloat(getProperty(_element, "width"))) {
                    resize();
                }
                setTimeout(function() {
                    _sizeChanged();
                }, 250);
            };
            _sizeChanged();
            return this;
        };
        //返回构造的对象
        return new waterfall(id);
    };
})();
