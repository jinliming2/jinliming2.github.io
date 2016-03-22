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
 */
function SpaceShip(orbit) {
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
            /**
             * 添加能源
             * @param num 添加量
             */
            add: function(num) {
                obj.__energy += num;
                if(obj.__energy > 100) {
                    obj.__energy = 100;
                }
            },
            consume: function(num) {
                if(obj.__status == START) {
                    obj.__energy -= num;
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
            /**
             * 向飞船发送信号
             * @param message 信号内容
             */
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
                    case 'rate':
                        obj.__rate = message.value;
                        break;
                }
            }
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
        __rate: 1,
        //所在位置（旋转角度)
        _angle: 0
    };
    return obj;
}
