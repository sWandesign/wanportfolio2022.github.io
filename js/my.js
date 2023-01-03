
$(function(){
    // top
    $(window).scroll(function(){
  
      var N = $(window).scrollTop();
      if(N > 600){
        // //加入class & 由上往下移動天的位置 & 透明度
        $('.top').addClass('smallTop').animate({top: 0, opacity: 1}, 500);
        //會有空白區塊的跳格問題,加上 margin
        $('.menu').css('marginTop',0);
        //Logo 使用 attr 更換
        // $('.topLogo').attr('src', 'logo_small.png');
      }else{
        //除了class外, 動畫使用 sytle 所以 stop 與移除 style 都要做
        $('.top').removeClass('smallTop').stop(true,false).removeAttr('style');
        $('.menu').removeAttr('style');
        // $('.topLogo').attr('src', 'logo_big.png');
      }
    })
    // topend
    // scroll

    //以整個網頁為相對位置來抓取座標

    var blockA = $('.block').offset().top;

    // scrollbtn
    $('.demo').click(function() {

      $('html,body').animate({scrollTop: 750}, 500)
      return false;
    });

    // toplogobtn
    $('.topLogo').click(function(){
      $('html,body').animate({scrollTop: 0}, 500)
      return false;
    })
    // tomenu
    $('.tomenu').click(function() {

      $('html,body').animate({scrollTop: 750}, 500)
      return false;
    });
    // uiux
    $('.uiux').click(function(){
      $('html,body').animate({scrollTop: 1400}, 500)
      return false;
    })
    // web
    $('.web').click(function(){
      $('html,body').animate({scrollTop: 2160}, 500)
      return true;
    })
    // graphic
    $('.graphic').click(function(){
      $('html,body').animate({scrollTop: 2920}, 500)
      return false;
    })
    // photography
    $('.photography').click(function(){
      $('html,body').animate({scrollTop: 3680}, 500)
      return false;
    })
    // illustration
    $('.illustration').click(function(){
      $('html,body').animate({scrollTop: 4440}, 500)
      return false;
    })

    // scrollend
})

