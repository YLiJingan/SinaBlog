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
    }
}
//ID获取节点方法
Base.prototype.getId = function(id){
    this.elements.push(document.getElementById(id));
    return this;
}
//TagName获取节点数组
Base.prototype.getTagName = function(tag){
    var tags = document.getElementsByTagName(tag);
    for(var i=0;i<tag.length;i++){
        this.elements.push(document.getElementsByTagName(tag));
    }
    return this;
}
//Class获取节点数组
Base.prototype.getClass = function(className,idname){
    var node = null;
    if(arguments.length == 2){
        node = document.getElementById('idName');
    }else{
        node = document;
    }
    var all = node.getElementsByTagName("*");
    for(var i=0;i<all.length;i++){
        if(all[i].className == className){
            this.elements.push(all[i]);
        }
    }
    return this;
}
//获取节点数组中的某个节点
Base.prototype.getElement = function(num){
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

//插件入口
Base.prototype.extend = function(name,fn){
    Base.prototype[name] = fn;
}


