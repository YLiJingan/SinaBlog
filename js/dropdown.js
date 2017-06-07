/**
 * Created by yan on 2017/6/6.
 */
window.onload = function(){
    $().getId('member1').hover(function(){
        $().getId('menu1').show();
    },function(){
        $().getId('menu1').hide();
    });
    $().getId('member2').hover(function(){
        $().getId('menu2').show();
    },function(){
        $().getId('menu2').hide();
    });;
    $().getId('member3').hover(function(){
        $().getId('menu3').show();
    },function(){
        $().getId('menu3').hide();
    });
};