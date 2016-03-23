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
    }
};
