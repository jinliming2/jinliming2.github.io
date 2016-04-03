/**
 * Created by Liming on 2016/4/3.
 */
"use strict";
var box = {
    body: document.createElement("div"),
    box: document.createElement("div"),
    title: document.createElement("div"),
    content: document.createElement("div"),
    close: document.createElement("div"),
    shadow: document.createElement("div")
};
box.body.id = "messageBody";
box.box.id = "messageBox";
box.title.id = "messageTitle";
box.content.id = "messageContent";
box.close.id = "messageClose";
box.close.innerHTML = "&#215;";
box.shadow.id = "messageShadow";
box.box.appendChild(box.close);
box.box.appendChild(box.title);
box.box.appendChild(box.content);
box.body.appendChild(box.box);
box.close.addEventListener('click', function() {
    setTimeout(function() {
        document.body.removeChild(box.shadow);
        document.body.removeChild(box.body);
    }, 500);
    box.shadow.style.opacity = 0;
    box.shadow.style.webkitAnimation = "fade-out 0.5s ease-out";
    box.shadow.style.oAnimation = "fade-out 0.5s ease-out";
    box.shadow.style.animation = "fade-out 0.5s ease-out";
    box.box.style.marginTop = "1000px";
    box.box.style.webkitAnimation = "close 0.2s ease-out";
    box.box.style.oAnimation = "close 0.2s ease-out";
    box.box.style.animation = "close 0.2s ease-out";
});
function msgbox(title, message, width, height) {
    box.shadow.style.webkitAnimation = "fade-in 0.5s ease-out";
    box.shadow.style.oAnimation = "fade-in 0.5s ease-out";
    box.shadow.style.animation = "fade-in 0.5s ease-out";
    box.box.style.webkitAnimation = "display 0.2s ease-out";
    box.box.style.oAnimation = "display 0.2s ease-out";
    box.box.style.animation = "display 0.2s ease-out";
    box.shadow.style.opacity = 0.75;
    box.box.style.marginTop = 0;
    if(!document.getElementById("messageShadow")) {
        document.body.appendChild(box.shadow);
    }
    if(document.getElementById("messageBody")) {
        document.body.removeChild(box.body);
    }
    box.title.innerHTML = title;
    box.content.innerHTML = message;
    box.box.style.width = width ? isNaN(width - 0) ? width : width + 'px' : '500px';
    box.box.style.height = height ? isNaN(height - 0) ? height : height + 'px' : 'auto';
    document.body.appendChild(box.body);
}
function aliPay() {
    var msg = '<img src="./img/AliPay.jpg" title="使用支付宝扫描二维码添加好友"/>';
    msgbox("支付宝 AliPay", msg, "auto");
}
function aliPayMobile() {
    var msg = '<input class="select" readonly="readonly" value="#吱口令#长按复制此条消息，打开支付宝即可添加我为好友ZsmOuO96CR"/>';
    msgbox("支付宝 AliPay", msg, "90%");
}
function weChat() {
    var msg = '<img src="./img/mmqrcode1459686420375.png" title="使用微信扫描二维码添加好友"/>';
    msgbox("微信 WeChat", msg, "auto");
}
