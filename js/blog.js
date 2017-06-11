/**
 * Created by yan on 2017/6/4.
 */
window.onload = function(){
    //dropdown
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
    //login
    var login = $().getClass('panel');
    var modal = $().getClass('modal');
    // login.center(350,250).resize(function(){      //直接通过css进行居中
    //     login.center(350,250);
    // });
    $().getClass('login').click(function(){
        login.css('display','block');
        modal.css('display','block');
    });
    $().getClass('close').click(function(){
        login.css('display','none');
        modal.css('display','none');
    });
}