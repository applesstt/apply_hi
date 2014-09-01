var Apply = (function() {
  var ids = [{id: 'name', name: '姓名'},
    {id: 'mobile', name: '手机', reg: /^(((13[0-9]{1})|159|153)+\d{8})$/},
    {id: 'mail', name: '邮箱', reg: /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/},
    {id: 'school', name: '学校'},
    {id: 'trade', name: '专业'}];

  var _checkParams = function() {
    var flag = true;
    for(var i = 0; i < ids.length; i++) {
      var posFlag = true;
      var elm = $('#' + ids[i]['id']);
      var error = elm.parent().find('.apply_label_error')
      if($.trim(elm.val()) == '') {
        flag = false;
        posFlag = false;
        error.text(ids[i]['name'] + '不能为空，请重新填写');
      } else {
        error.text('');
      }
      if(posFlag && typeof ids[i]['reg'] !== 'undefined') {
        if(!ids[i]['reg'].test(elm.val())) {
          flag = false;
          error.text(ids[i]['name'] + '格式错误，请重新填写')
        }
      }
    }
    return flag;
  }

  var _validDes = function(flag) {
    if(flag) {
      $('.apply_des').removeClass('apply_des_error').text('欢迎加入，请填写您的信息');
    } else {
      $('.apply_des').addClass('apply_des_error').text('您提交的信息有错误');
    }
    return;
  }

  var check = function() {
    var flag = _checkParams();
    _validDes(flag);
    return flag;
  }
  return {
    check: check
  }
}).call(this);

$(function() {
  //scroll magic
  var controller = new ScrollMagic();

  //scene.addIndicators();

  $(document).on("click", "a[href^=#]", function (e) {
    var id = $(this).attr("href"), $elem = $(id);
    if ($elem.length > 0) {
      e.preventDefault();
      //TweenMax.to($(_getWinTarget()), 0.5, {scrollTo: {y: $elem.offset().top}});
      $('html,body').animate({scrollTop: $elem.offset().top}, 1000);
    }
  });


  var sceneOptions = {duration: 1000, offset: -300};
  var sections = $('section');

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[0])
    .setTween(TweenMax.from($('.design_project'), 1, {left: "-200%", delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[0])
    .setTween(TweenMax.from($('.design_ux'), 1, {top: "-200%", delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[0])
    .setTween(TweenMax.from($('.design_img'), 1, {right: "-200%", delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[0])
    .setTween(TweenMax.from($('.design_bottom'), 1, {bottom: "-200%", delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[1])
    .setTween(TweenMax.from($('.steps_des_wrap'), 1, {right: '-200%', delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[1])
    .setTween(TweenMax.from($('.map_wrap'), 1, {bottom: '-200%', delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[2])
    .setTween(TweenMax.from($('.location_org_icon'), 1, {left: '-200%', delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[2])
    .setTween(TweenMax.from($('.tel_org_icon'), 1, {left: '-200%', delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[2])
    .setTween(TweenMax.from($('.mail_org_icon'), 1, {left: '-200%', delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[2])
    .setTween(TweenMax.from($('.apply_show_btn'), 1, {right: '-200%', delay: 3}));

  new ScrollScene(sceneOptions)
    .addTo(controller)
    .triggerHook("onCenter")
    .triggerElement(sections[2])
    .setTween(TweenMax.from($('#pop_btm'), 1, {bottom: '-200%', delay: 3}));

  //resize
  var resize = function() {
    $('section').height($(window).height());
    $('.step').each(function() {
      $(this).height($(this).width());
      if(!$(this).hasClass('step_sel')) {
        $(this).css('margin-top', $(this).width()/4);
      }
    });
    $('.steps_des_left_bg, .steps_des_right_bg').height($('.steps_des_left_bg').width() * 1.2);
  }

  resize();

  //bind click
  $('.apply_show_btn').click(function() {
    $('#apply_show').slideUp(500);
    $('#apply_form').slideDown(500);
  });
  $('.apply_close').click(function() {
    $('#apply_show').slideDown(500);
    $('#apply_form').slideUp(500);
  });

  $('.pop_btm_toggle').click(function() {
    $('.pop_btm_content').slideToggle(300);
  });

  var selStep = function(elm, index) {
    var selWidth = $('.step_sel').width();
    var normalStepTop = 0;
    var normalWidth = 0;
    $('.step').each(function() {
      if(!$(this).hasClass('step_sel')) {
        normalStepTop = $(this).css('marginTop');
        normalWidth = $(this).width();
      }
    });
    $('.step').removeClass('step_sel').css('marginTop', normalStepTop).height(normalWidth);
    $(elm).addClass('step_sel').height(selWidth).css('marginTop', 0);
    stepsSwipe.slide(index);
  }

  $('.step').each(function(index) {
    $(this).click(function() {
      selStep($(this), index);
    })
  })
  window.stepsSwipe = new Swipe(document.getElementById('stepsSwipe'), {
    callback: function(pos, e) {
      $('.step').each(function(index, elm) {
        if(index === pos) {
          selStep($(this), index);
        }
      })
    }
  });

  var uxTextList = ['逻辑、推理、分析','创意、灵感、激情','以需求为核心的商业设计师','优化的用户体验'];
  window.uxSwipe = new Swipe(document.getElementById('ux_swipe'), {
    callback: function(pos, e) {
      $('.ux_bullets_text').text(uxTextList[pos]);
      $('.ux_bullet').each(function(index, em) {
        $(em).removeClass('ux_bullet_on');
        if(index === pos) {
          $(em).addClass('ux_bullet_on');
        }
      });
    }
  });
  $('.pop_btm_content').hide();
  $('.ux_arrow_left').click(function() { uxSwipe.prev(); });
  $('.ux_arrow_right').click(function() { uxSwipe.next(); });
});