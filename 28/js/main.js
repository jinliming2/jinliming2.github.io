/**
 * Created by Liming on 2016/3/22.
 */
/**
 * 常量：动能系统型号
 * @type {*[]}
 */
var driverModel = [
    {model: '前进号', rate: 3, consume: 5},
    {model: '奔腾号', rate: 5, consume: 7},
    {model: '超越号', rate: 8, consume: 9}
];
/**
 * 常量：能源系统型号
 * @type {*[]}
 */
var energyModel = [
    {model: '劲量型', energy: 2},
    {model: '光能型', energy: 3},
    {model: '永久型', energy: 4}
];

/**
 * 获取时间
 */
function getTime() {
    var date = new Date();
    var year = ("0000" + date.getFullYear()).substr(-4);
    var month = ("00" + (date.getMonth() + 1)).substr(-2);
    var day = ("00" + date.getDay()).substr(-2);
    var hour = ("00" + date.getHours()).substr(-2);
    var minute = ("00" + date.getMinutes()).substr(-2);
    var second = ("00" + date.getSeconds()).substr(-2);
    var millisecond = ("000" + date.getMilliseconds()).substr(-3);
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + millisecond;
}

/**
 * 控制台输出
 * @param message 消息
 * @param colour 颜色
 */
var consoleText = document.getElementById("console-text");
function log(message, colour) {
    var date = new Date();
    var p = document.createElement("p");
    p.innerHTML = getTime() + " ";
    var span = document.createElement("span");
    span.innerHTML = message;
    span.style.color = colour;
    p.appendChild(span);
    consoleText.appendChild(p);
    console.log("%c" + message, "background-color:" + colour);
    consoleText.scrollTop = consoleText.scrollHeight;
}

/**
 * 操作面板拖动
 */
(function() {
    //获取对象元素
    var control = document.getElementById("control");
    var title = document.getElementById("control-title");
    //初始位置
    control.style.left = 0;
    control.style.top = 0;
    var draggingControl = false;
    var start = [0, 0];
    var position = [
        control.style.left.substr(0, control.style.left.length - 2) - 0,
        control.style.top.substr(0, control.style.top.length - 2) - 0
    ];
    //绑定事件
    title.addEventListener("mousedown", function(e) {  //鼠标按下事件
        start[0] = e.clientX - position[0];
        start[1] = e.clientY - position[1];
        draggingControl = true;
    });
    addEventListener("mouseup", function() {  //鼠标抬起事件
        draggingControl = false;
    });
    addEventListener("mousemove", function(e) {  //鼠标移动事件
        if(draggingControl) {
            position[0] = e.clientX - start[0];
            position[1] = e.clientY - start[1];
            if(position[0] > window.innerWidth - control.offsetWidth) {
                position[0] = window.innerWidth - control.offsetWidth;
            }
            if(position[0] < 0) {
                position[0] = 0;
            }
            if(position[1] > window.innerHeight - control.offsetHeight) {
                position[1] = window.innerHeight - control.offsetHeight;
            }
            if(position[1] < 0) {
                position[1] = 0;
            }
            control.style.left = position[0] + "px";
            control.style.top = position[1] + "px";
        }
    });
})();

/**
 * 监视面板拖动
 */
(function() {
    //获取对象元素
    var watch = document.getElementById("watch");
    var title = document.getElementById("watch-title");
    //初始位置
    watch.style.left = (window.innerWidth - watch.offsetWidth) + "px";
    watch.style.top = 0;
    var draggingControl = false;
    var start = [0, 0];
    var position = [
        watch.style.left.substr(0, watch.style.left.length - 2) - 0,
        watch.style.top.substr(0, watch.style.top.length - 2) - 0
    ];
    //绑定事件
    title.addEventListener("mousedown", function(e) {  //鼠标按下事件
        start[0] = e.clientX - position[0];
        start[1] = e.clientY - position[1];
        draggingControl = true;
    });
    addEventListener("mouseup", function() {  //鼠标抬起事件
        draggingControl = false;
    });
    addEventListener("mousemove", function(e) {  //鼠标移动事件
        if(draggingControl) {
            position[0] = e.clientX - start[0];
            position[1] = e.clientY - start[1];
            if(position[0] > window.innerWidth - watch.offsetWidth) {
                position[0] = window.innerWidth - watch.offsetWidth;
            }
            if(position[0] < 0) {
                position[0] = 0;
            }
            if(position[1] > window.innerHeight - watch.offsetHeight) {
                position[1] = window.innerHeight - watch.offsetHeight;
            }
            if(position[1] < 0) {
                position[1] = 0;
            }
            watch.style.left = position[0] + "px";
            watch.style.top = position[1] + "px";
        }
    });
})();

/**
 * 控制台拖动
 */
(function() {
    //获取对象元素
    var consoleDiv = document.getElementById("console");
    var title = document.getElementById("console-title");
    //初始位置
    consoleDiv.style.left = (window.innerWidth - consoleDiv.offsetWidth) + "px";
    consoleDiv.style.top = (window.innerHeight - consoleDiv.offsetHeight) + "px";
    var draggingControl = false;
    var start = [0, 0];
    var position = [
        consoleDiv.style.left.substr(0, consoleDiv.style.left.length - 2) - 0,
        consoleDiv.style.top.substr(0, consoleDiv.style.top.length - 2) - 0
    ];
    //绑定事件
    title.addEventListener("mousedown", function(e) {  //鼠标按下事件
        start[0] = e.clientX - position[0];
        start[1] = e.clientY - position[1];
        draggingControl = true;
    });
    addEventListener("mouseup", function() {  //鼠标抬起事件
        draggingControl = false;
    });
    addEventListener("mousemove", function(e) {  //鼠标移动事件
        if(draggingControl) {
            position[0] = e.clientX - start[0];
            position[1] = e.clientY - start[1];
            if(position[0] > window.innerWidth - consoleDiv.offsetWidth) {
                position[0] = window.innerWidth - consoleDiv.offsetWidth;
            }
            if(position[0] < 0) {
                position[0] = 0;
            }
            if(position[1] > window.innerHeight - consoleDiv.offsetHeight) {
                position[1] = window.innerHeight - consoleDiv.offsetHeight;
            }
            if(position[1] < 0) {
                position[1] = 0;
            }
            consoleDiv.style.left = position[0] + "px";
            consoleDiv.style.top = position[1] + "px";
        }
    });
})();

/**
 * 操作面板
 */
(function() {
    //按钮事件
    var buttonClick = function() {
        var orbit = this.parentNode.dataset.id - 0;
        var message = this.dataset.type;
        switch(message) {
            case 'create':
                var drive = this.previousElementSibling.previousElementSibling;
                var energy = this.previousElementSibling;
                if(this.dataset.status == 'create') {
                    commander.createSpaceShip(orbit, drive.value - 0, energy.value - 0);
                    this.dataset.status = 'created';
                    this.innerHTML = '自爆销毁';
                    this.nextElementSibling.disabled = false;
                    drive.disabled = true;
                    energy.disabled = true;
                } else {
                    commander.destroy(orbit);
                    this.dataset.status = 'create';
                    this.innerHTML = '创建飞船';
                    this.nextElementSibling.disabled = true;
                    this.nextElementSibling.dataset.status = 'start';
                    this.nextElementSibling.innerHTML = '飞行';
                    drive.disabled = false;
                    energy.disabled = false;
                }
                break;
            case 'drive':
                if(this.dataset.status == 'start') {
                    commander.start(orbit);
                    this.dataset.status = 'stop';
                    this.innerHTML = '停止';
                } else {
                    commander.stop(orbit);
                    this.dataset.status = 'start';
                    this.innerHTML = '飞行';
                }
                break;
        }
    };
    //绑定按钮事件
    var buttons = document.getElementsByTagName("button");
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", buttonClick);
    }
})();

/**
 * 动力系统、能源系统列表输出
 */
(function() {
    //操作面板
    var selects = document.getElementById("control-main").getElementsByTagName("select");
    var option;
    for(var i = 0; i < selects.length; i++) {
        var j;
        if(selects[i].dataset.type == 'drive') {
            for(j = 0; j < driverModel.length; j++) {
                option = document.createElement("option");
                option.setAttribute("value", j.toString());
                option.innerHTML = driverModel[j].model +
                    "（rate: " + driverModel[j].rate +
                    "&#176;&#47;s，consume: " + driverModel[j].consume + "&#37;&#47;s）";
                selects[i].appendChild(option);
            }
        } else {
            for(j = 0; j < energyModel.length; j++) {
                option = document.createElement("option");
                option.setAttribute("value", j.toString());
                option.innerHTML = energyModel[j].model +
                    "（charge: " + energyModel[j].energy + "&#37;&#47;s）";
                selects[i].appendChild(option);
            }
        }
    }
})();
