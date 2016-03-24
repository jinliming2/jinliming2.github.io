/**
 * Created by Liming on 2016/3/21.
 */
/**
 * 指挥官
 */
var commander = {
    //指挥官的记事本
    notebook: {
        //各个轨道的状态
        orbitStatus: [false, false, false, false]
    },
    //创建飞船
    createSpaceShip: function(orbitId, drive, energy) {
        //记录中该轨道已经有飞船了
        if(this.notebook.orbitStatus[orbitId]) {
            log("轨道" + (orbitId + 1) + "上已经存在飞船！", "blue");
            return;
        }
        this.notebook.orbitStatus[orbitId] = true;
        log("在轨道" + (orbitId + 1) + "上创建飞船！", "yellow");
        //spaceManager.Mediator.createSpaceShip(orbitId, drive, energy);
        spaceManager.BUS.sendMessage(spaceManager.BUS.Adapter.encoder(orbitId, {
            command: "create",
            drive: drive,
            energy: energy
        }));
    },
    //开始飞行
    start: function(orbitId) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (orbitId + 1) + "发送开始飞行指令！", "yellow");
        //发送广播消息
        /*spaceManager.Mediator.sendMessage({
            id: orbitId,
            command: 'start'
        });*/
        spaceManager.BUS.sendMessage(spaceManager.BUS.Adapter.encoder(orbitId, {
            command: 'start'
        }));
    },
    //停止飞行
    stop: function(orbitId) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        log("向轨道" + (orbitId + 1) + "发送停止飞行指令！", "yellow");
        //发送广播消息
        /*spaceManager.Mediator.sendMessage({
            id: orbitId,
            command: 'stop'
        });*/
        spaceManager.BUS.sendMessage(spaceManager.BUS.Adapter.encoder(orbitId, {
            command: 'stop'
        }));
    },
    //飞船自爆
    destroy: function(orbitId) {
        //记录中该轨道没有飞船
        if(!this.notebook.orbitStatus[orbitId]) {
            log("轨道" + (orbitId + 1) + "上不存在飞船！", "blue");
            return;
        }
        //从记录中删除飞船
        this.notebook.orbitStatus[orbitId] = false;
        log("向轨道" + (orbitId + 1) + "发送销毁指令！", "yellow");
        //发送广播消息
        /*spaceManager.Mediator.sendMessage({
            id: orbitId,
            command: 'destroy'
        });*/
        spaceManager.BUS.sendMessage(spaceManager.BUS.Adapter.encoder(orbitId, {
            command: 'destroy'
        }));
    },
    //数据处理中心
    DC: {
        Adapter: spaceManager.BUS.Adapter,
        //接收消息
        message: function(message) {
            //消息解码
            var msg =this.Adapter.decoder(message);
            //检查消息是否是发给自己的
            if(msg.receiver != '星球基地') {
                return;
            }
            //寻找记录
            var record = document.getElementById("record-" + msg.message._id);
            if(record === null) {
                //创建记录
                record = document.createElement("tr");
                record.id = "record-" + msg.message._id;
                for(var i = 0; i < 5; i++) {
                    record.appendChild(document.createElement("td"));
                }
                document.getElementsByTagName("table")[0].appendChild(record);
            }
            var items = record.getElementsByTagName("td");
            items[0].innerHTML = "轨道" + (msg.message._id + 1);
            items[1].innerHTML = driverModel[msg.message.driveModel].model;
            items[2].innerHTML = energyModel[msg.message.energyModel].model;
            items[3].innerHTML = msg.message.status == STOP ? '停止' : '飞行';
            items[4].innerHTML = msg.message.energy + "&#37;";
            //记录更新时间
            record.dataset.update = Date.now();
        }
    }
};

//记录更新
(function() {
    setInterval(function() {
        //所有记录
        var table = document.getElementsByTagName("table")[0];
        var records = table.getElementsByTagName("tr");
        //当前时间
        var t = Date.now();
        for(var i = 0; i < records.length; i++) {
            //表头
            if(!records[i].dataset.update) {
                continue;
            }
            //上次更新时间超过3秒删除记录，超过1秒标记为失联
            if(t - records[i].dataset.update > 3000) {
                table.removeChild(records[i]);
            } else if(t - records[i].dataset.update > 1000) {
                records[i].getElementsByTagName("td")[3].innerHTML = '失联';
            }
        }
    }, 1000);
})();
