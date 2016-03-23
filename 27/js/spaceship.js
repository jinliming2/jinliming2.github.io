/**
 * Created by Liming on 2016/3/21.
 */
/**
 * 常量：停止状态
 * @type {number}
 */
var STOP = 0;
/**
 * 常量：飞行状态
 * @type {number}
 */
var START = 1;

/**
 * 飞船类
 * @param {number} orbit 所在轨道
 * @param {number} drive 动力系统型号
 * @param {number} energy 能源系统型号
 */
function SpaceShip(orbit, drive, energy) {
    var obj = {
        //所在轨道
        _orbit: orbit,
        //动力系统
        drive: {
            //飞行
            start: function() {
                if(obj.__energy > 0) {
                    obj.__status = START;
                }
            },
            //停止飞行
            stop: function() {
                obj.__status = STOP;
            },
            //由宇宙管理员操作的飞行功能
            _fly: function() {
                if(obj.__status == START) {
                    obj._angle += obj.__rate;
                }
                obj._angle = obj._angle % 360;
            }
        },
        //能源系统
        energy: {
            //添加能源
            add: function() {
                obj.__energy += obj.__charge;
                if(obj.__energy > 100) {
                    obj.__energy = 100;
                }
            },
            //消耗能源
            consume: function() {
                //仅在飞行状态消耗
                if(obj.__status == START) {
                    obj.__energy -= obj.__consume;
                }
                if(obj.__energy <= 0) {
                    obj.__status = STOP;
                    obj.__energy = 0;
                }
            },
            //取当前能源值
            get: function() {
                return obj.__energy;
            }
        },
        //信号系统
        telegraph: {
            /**  这是废弃的信号接收装置，现在被展示在 *** 历史博物馆 ***
            /**
             * 向飞船发送信号
             * @param message 信号内容
             * /
            sendMessage: function(message) {
                //检查消息是否是发给自己的
                if(message.id != obj._orbit) {
                    return;
                }
                //执行命令
                switch(message.command) {
                    //开始飞行
                    case 'start':
                        obj.drive.start();
                        break;
                    //停止飞行
                    case 'stop':
                        obj.drive.stop();
                        break;
                    //自爆
                    case 'destroy':
                        obj.destroy.destroy();
                        break;
                }
            }
            */
            /**
             * 向飞船发送信号
             * @param message 信号内容
             */
            sendMessage: function(message) {
                //消息解码
                var msg =this.Adapter.decoder(message);
                //检查消息是否是发给自己的
                if(msg.message.id != obj._orbit) {
                    return;
                }
                //执行命令
                switch(msg.message.command) {
                    //开始飞行
                    case 'start':
                        obj.drive.start();
                        break;
                    //停止飞行
                    case 'stop':
                        obj.drive.stop();
                        break;
                    //自爆
                    case 'destroy':
                        obj.destroy.destroy();
                        break;
                }
            },
            Adapter: spaceManager.BUS.Adapter
        },
        //自爆系统
        destroy: {
            //立即销毁自身
            destroy: function() {
                obj._destroyed = true;
            }
        },
        //当前状态
        __status: STOP,
        //当前能源
        __energy: 100,
        //已经销毁
        _destroyed: false,
        //速度
        __rate: driverModel[drive].rate,
        //所在位置（旋转角度)
        _angle: 0,
        //能耗
        __consume: driverModel[drive].consume,
        //充能速度
        __charge: energyModel[energy].energy
    };
    return obj;
}
