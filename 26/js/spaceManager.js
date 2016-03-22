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
        solarManager: 0
    },
    /**
     * 创建宇宙飞船
     * @param orbitId 轨道ID
     */
    createSpaceShip: function(orbitId) {
        //创建飞船对象并保存到数组
        var shipId = this.notebook.spaceShipList.push(new SpaceShip(orbitId));
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
    //无线电，向宇宙中的飞船广播消息
    Mediator: {
        /**
         * 发送消息
         * @param message 消息
         */
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
         */
        createSpaceShip: function(orbitId) {
            //1秒后发送创建飞船消息
            setTimeout(function() {
                //一定概率（30%）丢包
                if(Math.random() <= 0.3) {
                    log("向轨道" + (orbitId + 1) + "发送的 create 指令丢包了！", "red");
                    return;
                }
                log("向轨道" + (orbitId + 1) + "发送 create 指令成功！", "green");
                spaceManager.createSpaceShip(orbitId);
            }, 1000);
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
            spaceManager.notebook.spaceShipList[i].energy.add(2);
            //飞行耗能
            spaceManager.notebook.spaceShipList[i].energy.consume(5);
        }
    }, 1000);
})();
