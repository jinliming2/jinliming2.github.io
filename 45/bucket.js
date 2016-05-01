/**
 * Created by Liming on 2016/4/30.
 */
"use strict";
(function() {
    /**
     * 木桶布局
     * @param id 容器id
     * @returns object 木桶布局对象
     * @constructor
     */
    window.Bucket = function(id) {
        /**
         * 木桶布局构造器
         * @param id 容器id
         * @returns {bucket} 木桶布局对象
         */
        var bucket = function(id) {
            //获取元素
            var _element = document.getElementById(id);
            //容器信息
            var _width, _height, _minWidth, _maxWidth, _margin;
            //图片列表
            var _imgLibrary = [];
            //暂存图片列表
            var _committed = {
                images: [],
                width: 0
            };
            //正在加载图片
            var _loading = 0;
            /**
             * 初始化
             * @param width 容器宽度
             * @param margin 图片边距
             * @param height 行基准高度
             * @param deviation 行高误差最大值
             */
            this.init = function(width, margin, height, deviation) {
                //初始化参数
                _width = width;
                _element.style.width = _width + "px";
                _margin = margin || 5;
                _height = height || 200;
                deviation = deviation || 50;
                if(deviation > _height) {
                    deviation = _height - 1;
                }
                _minWidth = _width * _height / (_height + deviation);
                _maxWidth = _width * _height / (_height - deviation);
            };
            /**
             * 图片加载完成回调
             */
            var _callback = null;
            /**
             * 设置图片加载完成回调
             * 可以设置这个函数，在后台加载的图片全部加载完成后自动回调。
             * @param callback 回调函数
             */
            this.setCallback = function(callback) {
                _callback = callback;
            };
            /**
             * 添加图片
             * @param src 链接
             * @param title 标题
             * @param alt 注释
             */
            this.addImage = function(src, title, alt) {
                _loading++;
                title = title || "";
                alt = alt || "";
                //创建图片
                var img = new Image();
                img.onload = function() {
                    //加入图片列表
                    _imgLibrary[_imgLibrary.length] = {
                        obj: img,
                        width: img.width * _height / img.height
                    };
                    //布局整理
                    calculate();
                    if(--_loading == 0 && _callback instanceof Function) {
                        _callback();
                    }
                };
                img.onerror = function() {
                    if(--_loading == 0 && _callback instanceof Function) {
                        _callback();
                    }
                };
                img.title = title;
                img.alt = alt;
                img.src = src;
            };
            /**
             * 计算图片大小进行布局管理
             */
            var calculate = function() {
                //已加载图片总宽度
                var total = 0;
                for(var i = 0; i < _imgLibrary.length; i++) {
                    if(_committed.width + _imgLibrary[i].width <= _maxWidth) {
                        //可以加入当前行
                        _committed.images[_committed.images.length] = _imgLibrary[i];
                        _committed.width += _imgLibrary[i].width + _margin;
                        _imgLibrary.splice(i--, 1);
                        //已达到当前行极限
                        if(_committed.width >= _maxWidth) {
                            break;
                        }
                    } else {
                        total += _imgLibrary[i].width;
                    }
                }
                //当前行满足一行条件
                if(_committed.width >= _minWidth || total >= _minWidth) {
                    disp(true);
                }
            };
            var disp = function(resize) {
                //创建行
                var div = document.createElement("div");
                if(resize) {
                    var margin = (_committed.images.length - 1) * _margin;
                    var scale = (_width - margin) / (_committed.width - margin - _margin);
                    var h = Math.round(_height * scale);
                    //图像缩放
                    for(i = 0; i < _committed.images.length; i++) {
                        _committed.images[i].obj.width = Math.round(_committed.images[i].width * scale);
                        _committed.images[i].obj.height = h;
                        _committed.images[i].obj.style.margin = Math.floor(_margin / 2) + "px " + Math.floor(_margin / 2) + "px "
                            + Math.ceil(_margin / 2) + "px " + Math.ceil(_margin / 2) + "px ";
                        if(i == 0) {
                            _committed.images[i].obj.style.marginLeft = "0";
                        } else if(i == _committed.images.length - 1) {
                            _committed.images[i].obj.style.marginRight = "0";
                        }
                        _committed.images[i].obj.style.mozOpacity = _committed.images[i].obj.style.opacity = 0;
                        div.appendChild(_committed.images[i].obj);
                    }
                    //图像大小微调
                    var w = 0;
                    for(i = 0; i < _committed.images.length; i++) {
                        w += _committed.images[i].obj.width;
                    }
                    for(w = _width - (w + margin); w != 0; w += -w / Math.abs(w)) {
                        _committed.images[--i].obj.width -= -w / Math.abs(w);
                    }
                } else {
                    for(i = 0; i < _committed.images.length; i++) {
                        _committed.images[i].obj.height = _height;
                        _committed.images[i].obj.style.margin = Math.floor(_margin / 2) + "px "
                            + Math.floor(_margin / 2) + "px "
                            + Math.ceil(_margin / 2) + "px " + Math.ceil(_margin / 2) + "px ";
                        if(i == 0) {
                            _committed.images[i].obj.style.marginLeft = "0";
                        } else if(i == _committed.images.length - 1) {
                            _committed.images[i].obj.style.marginRight = "0";
                        }
                        _committed.images[i].obj.style.mozOpacity = _committed.images[i].obj.style.opacity = 0;
                        div.appendChild(_committed.images[i].obj);
                    }
                }
                _element.appendChild(div);
                for(i = 0; i < _committed.images.length; i++) {
                    fadeIn(_committed.images[i].obj);
                }
                //完成当前行，进行下一行布局
                _committed.images = [];
                _committed.width = 0;
            };
            this.flush = function() {
                disp(false);
            };
            /**
             * 淡入效果
             * @param img 图片淡入显示
             */
            var fadeIn = function(img) {
                if(img.style.mozOpacity && img.style.mozOpacity - 0 < 1) {
                    img.style.mozOpacity = img.style.mozOpacity - 0 + 0.1;
                }
                if(img.style.opacity && img.style.opacity - 0 < 1) {
                    img.style.opacity = img.style.opacity - 0 + 0.1;
                }
                if(
                    (img.style.mozOpacity && img.style.mozOpacity - 0 < 1) ||
                    (img.style.opacity && img.style.opacity - 0 < 1)
                ) {
                    setTimeout(function() {
                        fadeIn(img);
                    }, 100);
                }
            };
            /**
             * 获取行加载进度
             * 虽然是个没用的功能。。。因为网速慢，给个进度
             * @returns {number}
             */
            this.getProgress = function() {
                return Math.round(_committed.width / _maxWidth * 10000) / 100;
            };
            /**
             * 是否正在加载图片
             * @returns {boolean}
             */
            this.loading = function() {
                return _loading > 0;
            };
            return this;
        };
        //返回构造的对象
        return new bucket(id);
    };
})();
