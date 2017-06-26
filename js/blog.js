/**
 * Created by yan on 2017/6/4.
 */
window.onload = function(){
    //dropdown
    $('#member1').hover(function(){
        $('#menu1').show();
    },function(){
        $('#menu1').hide();
    });
    $('#member2').hover(function(){
        $('#menu2').show();
    },function(){
        $('#menu2').hide();
    });
    $('#member3').hover(function(){
        $('#menu3').show();
    },function(){
        $('#menu3').hide();
    });
    //login
    var login = $('.panel');
    var modal = $('.modal');
    login.center(350,250).resize(function(){
        login.center(350,250);
    });
    $('.login').click(function(){
        login.center(350,250);
        login.css('display','block');
        modal.css('display','block');
        document.documentElement.style.overflow = 'hidden';
    });
    $('.close').click(function(){
        login.css('display','none');
        modal.css('display','none');
        document.documentElement.style.overflow = 'auto';
    });
    login.darg();
}