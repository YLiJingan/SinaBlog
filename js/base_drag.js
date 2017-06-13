/**
 * Created by yan on 2017/6/13.
 */

$().extend('darg',function(){
    for(var i =0;i<this.elements.length;i++){
        this.elements[i].onmousedown = function(e){
            if(trim(this.innerHTML).length == 0) e.preventDefault();
            var _this = this;
            var diffX = e.clientX - _this.offsetLeft;
            var diffY = e.clientY - _this.offsetTop;

            document.onmousemove = function(e){
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;

                if(e.target.tagName == 'h1'){
                    alert(111);
                }

                if(left<0){
                    left = 0;
                }else if(left>getInner().width- _this.offsetWidth){
                    left = getInner().width - _this.offsetWidth;
                }
                if(top<0){
                    top = 0;
                }else if(top>getInner().height- _this.offsetHeight){
                    top = getInner().height- _this.offsetHeight;
                }

                _this.style.left = left + 'px';
                _this.style.top = top + 'px';
                if(typeof _this.setCapture != 'undefined'){
                    _this.setCapture();
                }
            }
            document.onmouseup = function(){
                this.onmousemove = null;
                this.onmouseup = null;
                if(typeof _this.releaseCapture != 'undefined'){
                    _this.releaseCapture();
                }
            }
        }
    }
    return this;
});
