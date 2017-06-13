/**
 * Created by yan on 2017/6/11.
 */
//跨浏览器事件绑定
function addEvent(obj,type,fn){
    if(typeof obj.addEventListener != 'undefined'){
        obj.addEventListener(type,fn,false);
    }else{
        if(!obj.events) obj.events = {};
        if(!obj.events[type]){
            obj.events[type] = [];
            if(obj['on' + type]) obj.events[type][0] = fn;
        }else{
            if(addEvent.equal(obj.events[type], fn)) return false;
        }
        obj.events[type][addEvent.ID++] =fn;
        obj['on' + type] = addEvent.exec;
    }
}
addEvent.ID = 1;
//执行事件处理函数
addEvent.exec = function(event){
    var e = event || addEvent.fixEvent(window.event);
    var es = this.events[e.type];
    for(var i in es){
        es[i].call(this,e);
    }
};
//同一个注册函数进行屏蔽
addEvent.equal = function(es,fn){
    for(var i in es){
        if(es[i] == fn) return true;
    }
    return false;
}
//把IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function(event){
    event.preventDefault = addEvent.fixEvent.preventDefault;
    event.stopPropagation = addEvent.fixEvent.stopPropagation;
    event.target = event.srcElement;
    return event;
};
//IE阻止默认行为
addEvent.fixEvent.preventDefault = function (){
    this.returnValue = false;
};
//IE取消冒泡
addEvent.fixEvent.stopPropagation = function(){
    this.cancelBubble = true;
};
//跨浏览器取消事件
function removeEvent(obj,type,fn){
    if(typeof obj.removeEventListener != 'undefined'){
        obj.removeEventListener(type,fn,false);
    }else{
        if(obj.events){
            for(var i in obj.events[type]){
                if(obj.events[type][i] == fn){
                    delete obj.events[type][i];
                }
            }
        }
    }
}

//跨浏览器获取视口大小
function getInner(){
    if(typeof window.innerWidth != 'undefined') {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else{
            return{
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            }
        }
}
//获取Event对象
function getEvent(e){
    return e || window.e;
}
//删除左右空格
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,'');
}