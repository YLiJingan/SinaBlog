/**
 * Created by yan on 2017/6/4.
 */

$().ready(function() {
    //dropdown
    $('#member1').hover(function () {
        $('#menu1').show();
    }, function () {
        $('#menu1').hide();
    });
    $('#member2').hover(function () {
        $('#menu2').show();
    }, function () {
        $('#menu2').hide();
    });
    $('#member3').hover(function () {
        $('#menu3').show();
    }, function () {
        $('#menu3').hide();
    });
    //login && signup
    var login = $('#login');
    var modal = $('.modal');
    var signup = $('.login-footer a');
    var panel_signup = $('.panel-signup');
    login.center(350, 250).resize(function () {
        login.center(350, 250);
    });
    panel_signup.center(350, 450).resize(function () {
        login.center(350, 450);
    });
    $('.login').click(function () {
        login.center(350, 250);
        login.css('display', 'block');
        modal.css('display', 'block');
        panel_signup.css('display','none');
        document.documentElement.style.overflow = 'hidden';
    });

    $('.close').click(function () {
        login.css('display', 'none');
        panel_signup.css('display','none');
        modal.css('display', 'none');
        document.documentElement.style.overflow = 'auto';
    });

    signup.click(function(){
        panel_signup.css('display','block');
        modal.css('display', 'block');
        login.css('display','none');
    });

    login.darg($('.panel .login-header').first());
    panel_signup.darg($('.panel .login-header').first());


    //百度分享收缩功能
    $('.share').css('top', getScroll().top + (getInner().height-parseInt(getStyle($('.share').first(), 'height')))/2 +'px');


    addEvent(window,'scroll',function(){
        $('.share').animate({
            attr:'y',
            target: getScroll().top + (getInner().height-parseInt(getStyle($('.share').first(), 'height')))/2
        });
    });

    $('.share').hover(function () {
        $(this).animate({
            attr: 'x',
            target: 0
        })}, function () {
            $(this).animate({
                attr: 'x',
                target: -221
            })
        });

//滑动导航
    $('#main_nav ul li').hover(function(){
        var target = $(this).first().offsetLeft;
        $('#main_nav span').animate(
            {
                attr:'x',
                target:target + 20,
                step:10,
                t:40
            }
        )
    },function(){
        $('#main_nav span').animate(
            {
                attr:'x',
                target:20,
                step:5,
                t:40
            }
        )
    })

});
