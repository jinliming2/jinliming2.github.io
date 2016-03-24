/**
 * Created by Liming on 2016/3/21.
 */
/**
 * 宇宙管理员（上帝）
 */
var spaceManager = {
    // 宇宙管理员（上帝）的记事本
    notebook: {
        //飞船列表
        spaceShipList: [],
        //飞船飞行管理ID
        spaceShipFlyManager: 0,
        //太阳能管理ID
        solarManager: 0,
        //飞船状态广播管理ID
        spaceShipStatusManager: 0
    },
    /**
     * 创建宇宙飞船
     * @param orbitId 轨道ID
     * @param drive 动力系统型号
     * @param energy 能源系统型号
     */
    createSpaceShip: function(orbitId, drive, energy) {
        //创建飞船对象并保存到数组
        var shipId = this.notebook.spaceShipList.push(new SpaceShip(orbitId, drive, energy));
        //创建飞船主体div
        var spaceshipDiv = document.createElement("div");
        spaceshipDiv.id = "spaceship" + shipId;
        spaceshipDiv.className = "space-ship orbit-ship" + orbitId;
        //创建能量条div
        var energyDiv = document.createElement("div");
        energyDiv.className = "energy";
        spaceshipDiv.appendChild(energyDiv);
        //创建能量文本div
        var textDiv = document.createElement("div");
        textDiv.className = "text";
        textDiv.innerHTML = "100%";
        spaceshipDiv.appendChild(textDiv);
        //将飞船显示到页面上
        document.body.appendChild(spaceshipDiv);
    },
    /** 这是被废弃的古董无线电设备，现在被展示在 *** 历史博物馆 ***
    //无线电，向宇宙中的飞船广播消息
    Mediator: {
        /**
         * 发送消息
         * @param message 消息
         * /
        sendMessage: function(message) {
            //1秒后发送消息
            setTimeout(function() {
                //一定概率（30%）丢包
                if(Math.random() <= 0.3) {
                    log("向轨道" + (message.id + 1) + "发送的 " + message.command + " 指令丢包了！", "red");
                    return;
                }
                log("向轨道" + (message.id + 1) + "发送 " + message.command + " 指令成功！", "green");
                for(var i = 0; i < spaceManager.notebook.spaceShipList.length; i++) {
                    //已销毁的飞船不处理
                    if(spaceManager.notebook.spaceShipList[i]._destroyed) {
                        continue;
                    }
                    //向飞船发送消息
                    spaceManager.notebook.spaceShipList[i].telegraph.sendMessage(message);
                }
            }, 1000);
        },
        /**
         * 创建宇宙飞船
         * @param orbitId 轨道ID
         * @param drive 动力系统型号
         * @param energy 能源系统型号
         * /
        createSpaceShip: function(orbitId, drive, energy) {
            //1秒后发送创建飞船消息
            setTimeout(function() {
                //一定概率（30%）丢包
                if(Math.random() <= 0.3) {
                    log("向轨道" + (orbitId + 1) + "发送的 create 指令丢包了！", "red");
                    return;
                }
                log("向轨道" + (orbitId + 1) + "发送 create 指令成功！", "green");
                spaceManager.createSpaceShip(orbitId, drive, energy);
            }, 1000);
        }
    }
    */
    //新世纪的无线电广播电台，向宇宙广播消息
    BUS: {
        /**
         * 发送消息
         * @param message 编码后的消息
         */
        sendMessage: function(message) {
            //300毫秒后广播消息
            setTimeout(function() {
                //解码
                var msg = spaceManager.BUS.Adapter.decoder(message);
                if(message.substr(0, 1) == 'r') {
                    message = message.substr(1);
                }
                //一定概率（10%）丢包
                if(Math.random() <= 0.1) {
                    log("向 " + msg.receiver + " 发送的 " + msg.message.command + " 指令丢包！重试……", "red");
                    spaceManager.BUS.sendMessage("r" + message);
                    return;
                }
                if(msg.retried) {
                    log("重试：向 " + msg.receiver + " 发送 " + msg.message.command + " 指令成功！", "greenYellow");
                } else {
                    log("向 " + msg.receiver + " 发送 " + msg.message.command + " 指令成功！", "green");
                }
                if(msg.message.command == "create") {
                    //创建飞船
                    spaceManager.createSpaceShip(msg.message.id, msg.message.drive, msg.message.energy);
                } else {
                    //向飞船广播消息
                    for(var i = 0; i < spaceManager.notebook.spaceShipList.length; i++) {
                        //已销毁的飞船不处理
                        if(spaceManager.notebook.spaceShipList[i]._destroyed) {
                            continue;
                        }
                        //向飞船发送消息
                        spaceManager.notebook.spaceShipList[i].telegraph.sendMessage(message);
                    }
                    //想星球基地发送消息
                    commander.DC.message(message);
                }
            }, 300);
        },
        Adapter: {
            /**
             * 编码器
             * @param receiver 接收者
             * @param message 消息
             * @returns {string} 编码后的数据
             */
            encoder: function(receiver, message) {
                var ret = "";
                switch(receiver.toString()) {
                    case '0': ret += "000"; break;
                    case '1': ret += "001"; break;
                    case '2': ret += "010"; break;
                    case '3': ret += "011"; break;
                    case 'captain': ret += "111"; break;
                }
                switch(message.command) {
                    case 'create':
                        ret += "00";
                        switch(message.drive) {
                            case 0: ret += "00"; break;
                            case 1: ret += "01"; break;
                            case 2: ret += "10"; break;
                        }
                        switch(message.energy) {
                            case 0: ret += "00"; break;
                            case 1: ret += "01"; break;
                            case 2: ret += "10"; break;
                        }
                        break;
                    case 'start': ret += "01"; break;
                    case 'stop': ret += "10"; break;
                    case 'destroy': ret += "11"; break;
                    case 'broadcast':
                        //轨道号
                        ret += ("0" + message.id.toString(2)).substr(-2);
                        //飞行状态
                        ret += message.status;
                        //能量百分比
                        ret += ("000000" + message.energy.toString(2)).substr(-7);
                        //动力引擎系统型号
                        ret += ("0" + message.driveModel.toString(2)).substr(-2);
                        //能源引擎系统型号
                        ret += ("0" + message.energyModel.toString(2)).substr(-2);
                        break;
                }
                return ret;
            },
            /**
             * 解码器
             * @param data 编码后的数据
             * @returns {*}
             */
            decoder: function(data) {
                if(data.length < 5 || (data.substr(0, 1) == 'r' && data.length < 6)) {
                    log("二进制码 " + data + " 解包出错！", "orange");
                    return {};
                }
                var ret = {receiver: null, message: {}, retried: false};
                if(data.substr(0, 1) == 'r') {
                    ret.retried = true;
                    data = data.substr(1);
                }
                switch(data.substr(0, 3)) {
                    case '000': ret.receiver = '轨道1'; ret.message.id = 0; break;
                    case '001': ret.receiver = '轨道2'; ret.message.id = 1; break;
                    case '010': ret.receiver = '轨道3'; ret.message.id = 2; break;
                    case '011': ret.receiver = '轨道4'; ret.message.id = 3; break;
                    case '111': ret.receiver = '星球基地'; break;
                }
                if(ret.receiver != '星球基地') {
                    switch(data.substr(3, 2)) {
                        case '00':
                            ret.message.command = 'create';
                            switch(data.substr(5, 2)) {
                                case '00': ret.message.drive = 0; break;
                                case '01': ret.message.drive = 1; break;
                                case '10': ret.message.drive = 2; break;
                            }
                            switch(data.substr(7, 2)) {
                                case '00': ret.message.energy = 0; break;
                                case '01': ret.message.energy = 1; break;
                                case '10': ret.message.energy = 2; break;
                            }
                            break;
                        case '01': ret.message.command = 'start'; break;
                        case '10': ret.message.command = 'stop'; break;
                        case '11': ret.message.command = 'destroy'; break;
                    }
                } else {
                    ret.message.command = 'broadcast';
                    //轨道号
                    ret.message._id = parseInt(data.substr(3, 2), 2);
                    //飞行状态
                    ret.message.status = parseInt(data.substr(5, 1), 2);
                    //能量百分比
                    ret.message.energy = parseInt(data.substr(6, 7), 2);
                    //动力引擎系统型号
                    ret.message.driveModel = parseInt(data.substr(13, 2), 2);
                    //能源引擎系统型号
                    ret.message.energyModel = parseInt(data.substr(15, 2), 2);
                }
                return ret;
            }
        }
    }
};

//飞船飞行及显示管理
(function() {
    spaceManager.notebook.spaceShipFlyManager = setInterval(function() {
        for(var i = 0; i < spaceManager.notebook.spaceShipList.length; i++) {
            //已销毁的飞船不处理
            if(spaceManager.notebook.spaceShipList[i]._destroyed) {
                //在界面显示中删除飞船
                if(!spaceManager.notebook.spaceShipList[i].clear) {
                    spaceManager.notebook.spaceShipList[i].clear = true;
                    document.body.removeChild(document.getElementById("spaceship" + (i + 1)));
                }
                continue;
            }
            //飞船飞行控制
            spaceManager.notebook.spaceShipList[i].drive._fly();
            //飞船Div
            var ship = document.getElementById("spaceship" + (i + 1));
            //修改飞船位置
            ship.style.webkitTransform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            ship.style.mozTransform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            ship.style.msTransform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            ship.style.oTransform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            ship.style.transform = "rotate(" + spaceManager.notebook.spaceShipList[i]._angle + "deg)";
            //能源显示
            ship.firstElementChild.style.width = spaceManager.notebook.spaceShipList[i].energy.get() + "%";
            ship.lastElementChild.innerHTML = spaceManager.notebook.spaceShipList[i].energy.get() + "%";
        }
    }, 100);
})();

//太阳能管理
(function() {
    spaceManager.notebook.solarManager = setInterval(function() {
        for(var i = 0; i < spaceManager.notebook.spaceShipList.length; i++) {
            //已销毁的飞船不处理
            if(spaceManager.notebook.spaceShipList[i]._destroyed) {
                continue;
            }
            //太阳能充能系统
            spaceManager.notebook.spaceShipList[i].energy.add();
            //飞行耗能
            spaceManager.notebook.spaceShipList[i].energy.consume();
        }
    }, 1000);
})();

//飞船状态广播
(function() {
    spaceManager.notebook.spaceShipStatusManager = setInterval(function() {
        for(var i = 0; i < spaceManager.notebook.spaceShipList.length; i++) {
            //已销毁的飞船不处理
            if(spaceManager.notebook.spaceShipList[i]._destroyed) {
                continue;
            }
            //飞船飞行状态广播
            spaceManager.notebook.spaceShipList[i].telegraph.sendStatus();
        }
    }, 1000);
})();
