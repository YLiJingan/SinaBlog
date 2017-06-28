/**
 * Created by yan on 2017/6/4.
 * 封装库
 */
var $ = function(args){                           //前台调用
    return new Base(args);
}

function Base(args){                               //基础库
    this.elements = [];                 //创建一个数组，来保存获取的节点和节点数组  私有化
    if(typeof args == 'string'){
        if(args.indexOf(' ') != -1){
            var elements = args.split(' ');
            var childElements = [];
            var node =[];
            for(var i=0;i<elements.length;i++){
                if(node.length == 0) node.push(document);
                switch(elements[i].charAt(0)){
                    case '#':
                        childElements = [];
                        childElements.push(this.getId(elements[i].substring(1)));
                        node = childElements;
                        break;
                    case '.':
                        childElements = [];
                        for(var j=0;j<node.length;j++){
                            var temps = this.getClass(elements[i].substring(1),node[j]);
                            for(var k=0;k<temps.length;k++){
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                        break;
                    default:
                        childElements = [];
                        for(var j=0;j<node.length;j++){
                            var temps = this.getTagName(elements[i],node[j]);
                            for(var k=0;k<temps.length;k++){
                                childElements.push(temps[k]);
                            }
                        }
                        node = childElements;
                }
            }
            this.elements = childElements;
        }else {
            switch (args.charAt(0)) {
                case '#':
                    this.elements.push(this.getId(args.substring(1)));
                    break;
                case '.':
                    this.elements = this.getClass(args.substring(1));
                    break;
                default:
                    this.elements = this.getTagName(args);
            }
        }
    }else if(typeof args == 'object'){
        if(args != undefined){
            this.elements[0] = args;
        }
    }else if(typeof args == 'function'){
        this.ready(args);
    }
}

//addDomLoaded
Base.prototype.ready = function(fn){
    addDomLoaded(fn);
}
//ID获取节点方法
Base.prototype.getId = function(id){
    return document.getElementById(id);
}
//TagName获取节点数组
Base.prototype.getTagName = function(tag,parentNode){
    var node = null;
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var tags = document.getElementsByTagName(tag);
    for(var i=0;i<tags.length;i++){
        temps.push(tags[i]);
    }
    return temps;
}
//Class获取节点数组
Base.prototype.getClass = function(className,parentNode){
    var node = null;
    var temps = [];
    if(parentNode != undefined){
        node = parentNode;
    }else{
        node = document;
    }
    var all = node.getElementsByTagName("*");
    for(var i=0;i<all.length;i++){
        if(all[i].className == className){
            temps.push(all[i]);
        }
    }
    return temps;
}
//设置CSS选择器子节点
Base.prototype.find = function (str) {
    var childElements = [];
    for (var i = 0; i < this.elements.length; i ++) {
        switch (str.charAt(0)) {
            case '#' :
                childElements.push(this.getId(str.substring(1)));
                break;
            case '.' :
                var temps = this.getClass(str.substring(1), this.elements[i]);
                for (var j = 0; j < temps.length; j ++) {
                    childElements.push(temps[j]);
                }
                break;
            default :
                var temps = this.getTagName(str, this.elements[i]);
                for (var j = 0; j < temps.length; j ++) {
                    childElements.push(temps[j]);
                }
        }
    }
    this.elements = childElements;
    return this;
}

//获取某一个节点，并返回这个节点对象
Base.prototype.ge = function (num) {
    return this.elements[num];
};

//获取首个节点，并返回这个节点对象
Base.prototype.first = function () {
    return this.elements[0];
};

//获取末个节点，并返回这个节点对象
Base.prototype.last = function () {
    return this.elements[this.elements.length - 1];
};

//获取某一个节点，并且Base对象
Base.prototype.eq = function (num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}
//Base原型中添加方法
//设置CSS
Base.prototype.css = function(attr,value){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length == 1){                 //获取CSS
            if(typeof window.getComputedStyle != 'undefined'){      //W3C
                return window.getComputedStyle(this.elements[i],null)[attr];
            }  else if(typeof this.elements[i].currentStyle !='undefined'){  //IE
                return this.elements[i].currentStyle[attr];
            }
        }
        this.elements[i].style[attr] = value;
    }
    return this;
}
//添加Class
Base.prototype.addClass = function(className){
    for(var i=0;i<this.elements.length;i++){
        if(!this.elements[i].className.match(new RegExp('(\\s\^)'+className+'(\\s|$)'))){
            this.elements[i].className += className;
        }
    }
    return this;
}
//移除Class
Base.prototype.removeClass = function(className){
    for(var i=0;i<this.elements.length;i++){
        if(this.elements[i].className.match(new RegExp('(\\s\^)'+className+'(\\s|$)'))){
            this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s\^)'+className+'(\\s|$)'),'');
        }
    }
    return this;
}
//添加link或style的css规则
Base.prototype.addRule = function(num,selectorText,cssText,position){
    var sheet = document.styleSheets[num];
    if(typeof sheet.insertRule != 'undefined'){                 //w3c
        sheet.insertRule(selectorText + '{' + cssText + '}',position);
    }else if(typeof sheet.addRule != 'undefined'){              //IE
        sheet.addRule(selectorText,cssText,position);
    }
    return this;
}
//移除link或style的CSS规则
Base.prototype.removeRule = function(num,index){
    var sheet = document.styleSheets[num];
    if(typeof sheet.insertRule != 'undefined'){                 //w3c
        sheet.deleteRule(index);
    }else if(typeof sheet.addRule != 'undefined'){              //IE
        sheet.removeRule(index);
    }
    return this;
}
//设置innerHTML
Base.prototype.html = function(str){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length == 0){
            return this.elements[i].innerHTML;     //获取innerHTML
        }
        this.elements[i].innerHTML = str;
    }
    return this;
}
//设置显示方法
Base.prototype.show = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = "block";
    }
    return this;
}
//设置隐藏方法
Base.prototype.hide = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = "none";
    }
    return this;
}
//设置鼠标移入移除
Base.prototype.hover = function(over,out){
    for(var i=0;i<this.elements.length;i++){
        // this.elements[i].onmouseover = over;  //传统事件绑定改为现代事件绑定
        // this.elements[i].onmouseout = out;
        addEvent(this.elements[i],'mouseover',over);
        addEvent(this.elements[i],'mouseout',out);
    }
    return this;
}
//设置物体居中
Base.prototype.center = function(width,height){
    var top = (getInner().height - 350) / 2;
    var left = (getInner().width - 250) /2;
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.top = top + 'px';
        this.elements[i].style.left = left + 'px';
    }
    return this;
}
//触发点击事件
Base.prototype.click = function(fn){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick = fn;
    }
    return this;
}
//触发浏览器窗口事件
Base.prototype.resize = function(fn){
    window.onresize = fn;
    return this;
}

//设置动画
var timer = null;
Base.prototype.animate = function(obj){       //参数太多，使用对象传参
    for(var i=0;i<this.elements;i++){
        var element = this.elements[i];
        var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] =='y' ? 'top':
                   obj['attr'] == 'w' ? 'width' :obj['attr'] == 'h' ? 'height':
                   obj['attr'] == 'o' ? 'opacity' : 'left';
        var start = obj['start'] != 'undefined' ?obj['start'] :
                    attr == 'opacity'? parseFloat(getStyle(element,attr)) * 100:
                                       parseInt(getStyle(element,attr));   //默认为起始位置
        var time = obj['time'] != 'undefined' ?obj['timer'] : 50;
        var step = obj['step'] != 'undefined' ?obj['step'] : 10;
        var target = obj['alter'] + start;

        var alter = obj['alter'];
        var target = obj['target'];

        var speed = obj['speed'] != undefined ? obj['speed'] :6;
        var type = obj['type'] == 0 ? 'constant' :obj['type'] == 1 ? 'bufffer' : 'buffer';


        if(alter != undefined && target == undefined){
            target = alter + start;
        }else if(alter == undefined && target == undefined){
            throw new Error('alter增量或者target目标量缺失');
        }

        if(start > target) step = -step;

        if(attr == 'opacity'){
            element.style.opacity = parseInt(start)/100;
            element.style.filter = 'alpha(opacity = '+ start +')';
        }else{
            element.style[attr] = start + 'px';
        }

        clearInterval(timer);

        timer = setInterval(function(){
            if(type == 'buffer'){
                step = attr == 'opacity' ? (target - parseFloat(getStyle(element,attr)) *100)/speed:
                                            (target - parseInt(getStyle(element,attr))) / speed;
                step = step>0 ? Math.ceil(step) : Math.floor(step);
            }

            if(attr == 'opacity'){
                var temp = parseFloat(getStyle(element,attr)) *100;
                if(step == 0){
                    setOpacity();
                }else if(Math.abs(parseFloat(getStyle(element,attr))*100 - target) <= step && step>0) {
                    setOpacity()
                }else if(step<0 && parseFloat(getStyle(element,attr))*100 - target <= Math.abs(step)){
                    setTarget();
                }else{

                    element.style.opacity = parseInt(temp + step )/100;
                    element.style.filter = 'alpaha(opacity=' + parseInt(temp + step) + ')';
                }
            }else{
                if(step == 0){
                    setTarget();
                }else if(Math.abs(parseInt(getStyle(element,attr)) - target) <= step && step>0) {
                    setTarget();
                }else if(step<0 && parseInt(getStyle(element,attr)) - target <= Math.abs(step)){
                    setTarget();
                }else{
                    element.style[attr] = parseInt(getStyle(element,attr)) +step + 'px';
                }
            }

        },time);

        function setTarget(){
            element.style[attr] = target + 'px';
            clearInterval(timer);
        }
        function setOpacity(){
            element.style.opacity = parseInt(target)/100;
            element.style.filter = 'alpha(opacity='+parseInt(target)+')';
        }
        return this;
    }
}
//插件入口
Base.prototype.extend = function(name,fn){
    Base.prototype[name] = fn;
}


