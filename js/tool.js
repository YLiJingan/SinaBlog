/**
 * Created by yan on 2017/6/11.
 */

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
//阻止默认行为
function preDef(e){
    var e = getEvent(e);
    if (typeof e.preventDefault != 'undefined'){
        e.preventDefault();
    }
    else{
        e.returnValue = false;
    }
}