/**
 *@Name：Dialog v1.0 弹层(对话框)组件
 *@description:支持script标签直接引入和require模块
 *@Author：zhouqiyuan
 *@Create：2016/12/02
 *          .----.
 *       _.'__    `.
 *   .--(@)(@)----/#\
 * .' @          /###\
 * :         ,   #####
 *  `-..__.-' _.-\###/
 *        `;_:    `"'
 *      .'"""""`.
 *     //哈哈哈哈哈\
 *    // I'm Dialog\
 *    `-._______.-'
 *    ___`. | .'___
 *   (______|______)
 */
! function(win, undefined) {
  "use strict";

  var ready = {
    getPath: function() {
      var js = document.scripts,
        script = js[js.length - 1],
        jsPath = script.src;
      if (script.getAttribute('merge')) return;
      return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
    }(),

    config: {},
    end: {},
    minIndex: 0,
    minLeft: [],
    btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],

    //五种原始层模式
    type: ['dialog', 'page', 'iframe', 'loading', 'tips']
  };

  //默认内置方法。
  var Dialog = {
    v: '1.0',
    ie: function() { //ie版本
      var agent = navigator.userAgent.toLowerCase();
      return (!!window.ActiveXObject || "ActiveXObject" in window) ? (
        (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
      ) : false;
    }(),
    index: (window.Dialog && window.Dialog.v) ? 100000 : 0,
    path: ready.getPath,
    config: function(options, fn) {
      options = options || {};
      Dialog.cache = ready.config = $.extend({}, ready.config, options);
      Dialog.path = ready.config.path || Dialog.path;
      typeof options.extend === 'string' && (options.extend = [options.extend]);
      if (ready.config.path) Dialog.ready();
      if (!options.extend) return this;
      Dialog.link('skin/' + options.extend);
      return this;
    },

    //载入CSS配件
    link: function(href, fn, cssname) {

      //未设置路径，则不主动加载css
      if (!Dialog.path) return;

      var head = $('head')[0],
        link = document.createElement('link');
      if (typeof fn === 'string') cssname = fn;
      var app = (cssname || href).replace(/\.|\//g, '');
      var id = 'Dialoguicss-' + app,
        timeout = 0;

      link.rel = 'stylesheet';
      link.href = Dialog.path + href;
      link.id = id;

      if (!$('#' + id)[0]) {
        head.appendChild(link);
      }

      if (typeof fn !== 'function') return;

      //轮询css是否加载完毕
      (function poll() {
        if (++timeout > 8 * 1000 / 100) {
          return window.console && console.error('Dialog.css: Invalid');
        };
        parseInt($('#' + id).css('width')) === 2016 ? fn() : setTimeout(
          poll, 100);
      }());
    },

    ready: function(callback) {
      var cssname = 'skinDialogcss',
        ver = '1110';
      Dialog.link('skin/default/Dialog.css?v=' + Dialog.v + ver, callback,
        cssname);
      return this;
    },

    //各种快捷引用
    alert: function(content, options, yes) {
      var type = typeof options === 'function';
      if (type) yes = options;
      return Dialog.open($.extend({
        content: content,
        yes: yes
      }, type ? {} : options));
    },

    confirm: function(content, options, yes, cancel) {
      var type = typeof options === 'function';
      if (type) {
        cancel = yes;
        yes = options;
      }
      return Dialog.open($.extend({
        content: content,
        btn: ready.btn,
        yes: yes,
        btn2: cancel
      }, type ? {} : options));
    },

    msg: function(content, options, end) { //最常用提示层
      var type = typeof options === 'function',
        rskin = ready.config.skin;
      var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '') ||
        'Dialogui-Dialog-msg';
      var anim = doms.anim.length - 1;
      if (type) end = options;
      return Dialog.open($.extend({
        content: content,
        time: 3000,
        shade: false,
        skin: skin,
        title: false,
        closeBtn: false,
        btn: false,
        resize: false,
        end: end
      }, (type && !ready.config.skin) ? {
        skin: skin + ' Dialogui-Dialog-hui',
        anim: anim
      } : function() {
        options = options || {};
        if (options.icon === -1 || options.icon === undefined && !
          ready.config.skin) {
          options.skin = skin + ' ' + (options.skin ||
            'Dialogui-Dialog-hui');
        }
        return options;
      }()));
    },

    load: function(icon, options) {
      return Dialog.open($.extend({
        type: 3,
        icon: icon || 0,
        resize: false,
        shade: 0.01
      }, options));
    },

    tips: function(content, follow, options) {
      return Dialog.open($.extend({
        type: 4,
        content: [content, follow],
        closeBtn: false,
        time: 3000,
        shade: false,
        resize: false,
        fixed: false,
        maxWidth: 210
      }, options));
    }
  };

  var Class = function(setings) {
    var that = this;
    that.index = ++Dialog.index;
    that.config = $.extend({}, that.config, ready.config, setings);
    document.body ? that.creat() : setTimeout(function() {
      that.creat();
    }, 50);
  };

  Class.pt = Class.prototype;

  //缓存常用字符
  var doms = ['Dialogui-Dialog', '.Dialogui-Dialog-title',
    '.Dialogui-Dialog-main',
    '.Dialogui-Dialog-dialog', 'Dialogui-Dialog-iframe',
    'Dialogui-Dialog-content',
    'Dialogui-Dialog-btn', 'Dialogui-Dialog-close'
  ];
  doms.anim = ['Dialog-anim', 'Dialog-anim-01', 'Dialog-anim-02',
    'Dialog-anim-03',
    'Dialog-anim-04', 'Dialog-anim-05', 'Dialog-anim-06'
  ];

  //默认配置
  Class.pt.config = {
    type: 0,
    shade: 0.3,
    fixed: true,
    move: doms[1],
    title: '&#x4FE1;&#x606F;',
    offset: 'auto',
    area: 'auto',
    closeBtn: 1,
    time: 0, //0表示不自动关闭
    zIndex: 20160000,
    maxWidth: 360,
    anim: 0,
    icon: -1,
    moveType: 1,
    resize: true,
    scrollbar: true, //是否允许浏览器滚动条
    tips: 2
  };

  //容器
  Class.pt.vessel = function(conType, callback) {
    var that = this,
      times = that.index,
      config = that.config;
    var zIndex = config.zIndex + times,
      titype = typeof config.title === 'object';
    var ismax = config.maxmin && (config.type === 1 || config.type === 2);
    var titleHTML = (config.title ?
      '<div class="Dialogui-Dialog-title" style="' +
      (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] :
        config.title) + '</div>' : '');

    config.zIndex = zIndex;
    callback([
      //遮罩
      config.shade ? (
        '<div class="Dialogui-Dialog-shade" id="Dialogui-Dialog-shade' +
        times +
        '" times="' + times + '" style="' + ('z-index:' + (zIndex - 1) +
          '; background-color:' + (config.shade[1] || '#000') +
          '; opacity:' + (config.shade[0] || config.shade) +
          '; filter:alpha(opacity=' + (config.shade[0] * 100 || config.shade *
            100) + ');') + '"></div>') : '',

      //主体
      '<div class="' + doms[0] + (' Dialogui-Dialog-' + ready.type[config
        .type]) +
      (((config.type === 0 || config.type === 2) && !config.shade) ?
        ' Dialogui-Dialog-border' : '') + ' ' + (config.skin || '') +
      '" id="' + doms[0] + times + '" type="' + ready.type[config.type] +
      '" times="' + times + '" showtime="' + config.time + '" conType="' +
      (conType ? 'object' : 'string') + '" style="z-index: ' + zIndex +
      '; width:' + config.area[0] + ';height:' + config.area[1] + (config
        .fixed ? '' : ';position:absolute;') + '">' + (conType && config.type !=
        2 ? '' : titleHTML) + '<div id="' + (config.id || '') +
      '" class="Dialogui-Dialog-content' + ((config.type === 0 && config.icon !==
        -1) ? ' Dialogui-Dialog-padding' : '') + (config.type == 3 ?
        ' Dialogui-Dialog-loading' + config.icon : '') + '">' + (config.type ===
        0 && config.icon !== -1 ?
        '<i class="Dialogui-Dialog-ico Dialogui-Dialog-ico' + config.icon +
        '"></i>' : '') + (config.type == 1 && conType ? '' : (config.content ||
        '')) + '</div>' + '<span class="Dialogui-Dialog-setwin">' +
      function() {
        var closebtn = ismax ?
          '<a class="Dialogui-Dialog-min" href="javascript:;"><cite></cite></a><a class="Dialogui-Dialog-ico Dialogui-Dialog-max" href="javascript:;"></a>' :
          '';
        config.closeBtn && (closebtn += '<a class="Dialogui-Dialog-ico ' +
          doms[7] + ' ' + doms[7] + (config.title ? config.closeBtn : (
            config.type == 4 ? '1' : '2')) +
          '" href="javascript:;"></a>');
        return closebtn;
      }() + '</span>' + (config.btn ? function() {
        var button = '';
        typeof config.btn === 'string' && (config.btn = [config.btn]);
        for (var i = 0, len = config.btn.length; i < len; i++) {
          button += '<a class="' + doms[6] + '' + i + '">' + config.btn[
            i] + '</a>';
        }
        return '<div class="' + doms[6] + ' Dialogui-Dialog-btn-' + (
          config.btnAlign || '') + '">' + button + '</div>';
      }() : '') + (config.resize ?
        '<span class="Dialogui-Dialog-resize"></span>' : '') + '</div>'
    ], titleHTML, $('<div class="Dialogui-Dialog-move"></div>'));
    return that;
  };

  //创建骨架
  Class.pt.creat = function() {
    var that = this,
      config = that.config,
      times = that.index,
      nodeIndex, content = config.content,
      conType = typeof content === 'object',
      body = $('body');

    if ($('#' + config.id)[0]) return;

    if (typeof config.area === 'string') {
      config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
    }

    //anim兼容旧版shift
    if (config.shift) {
      config.anim = config.shift;
    }

    if (Dialog.ie == 6) {
      config.fixed = false;
    }

    switch (config.type) {
      case 0:
        config.btn = ('btn' in config) ? config.btn : ready.btn[0];
        Dialog.closeAll('dialog');
        break;
      case 2:
        var content = config.content = conType ? config.content : [config.content ||
          '', 'auto'
        ];
        config.content = '<iframe scrolling="' + (config.content[1] || 'auto') +
          '" allowtransparency="true" id="' + doms[4] + '' + times +
          '" name="' + doms[4] + '' + times +
          '" onload="this.className=\'\';" class="Dialogui-Dialog-load" frameborder="0" src="' +
          config.content[0] + '"></iframe>';
        break;
      case 3:
        delete config.title;
        delete config.closeBtn;
        config.icon === -1 && (config.icon === 0);
        Dialog.closeAll('loading');
        break;
      case 4:
        conType || (config.content = [config.content, 'body']);
        config.follow = config.content[1];
        config.content = config.content[0] +
          '<i class="Dialogui-Dialog-TipsG"></i>';
        delete config.title;
        config.tips = typeof config.tips === 'object' ? config.tips : [config
          .tips, true
        ];
        config.tipsMore || Dialog.closeAll('tips');
        break;
    }

    //建立容器
    that.vessel(conType, function(html, titleHTML, moveElem) {
      body.append(html[0]);
      conType ? function() {
        (config.type == 2 || config.type == 4) ? function() {
          $('body').append(html[1]);
        }() : function() {
          if (!content.parents('.' + doms[0])[0]) {
            content.data('display', content.css('display')).show().addClass(
              'Dialogui-Dialog-wrap').wrap(html[1]);
            $('#' + doms[0] + times).find('.' + doms[5]).before(
              titleHTML);
          }
        }();
      }() : body.append(html[1]);
      $('.Dialogui-Dialog-move')[0] || body.append(ready.moveElem =
        moveElem);
      that.Dialogo = $('#' + doms[0] + times);
      config.scrollbar || doms.html.css('overflow', 'hidden').attr(
        'Dialog-full', times);
    }).auto(times);

    config.type == 2 && Dialog.ie == 6 && that.Dialogo.find('iframe').attr(
      'src', content[0]);

    //坐标自适应浏览器窗口尺寸
    config.type == 4 ? that.tips() : that.offset();
    if (config.fixed) {
      win.on('resize', function() {
        that.offset();
        (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) &&
        that.auto(times);
        config.type == 4 && that.tips();
      });
    }

    config.time <= 0 || setTimeout(function() {
      Dialog.close(that.index)
    }, config.time);
    that.move().callback();

    //为兼容jQuery3.0的css动画影响元素尺寸计算
    if (doms.anim[config.anim]) {
      that.Dialogo.addClass(doms.anim[config.anim]).data('anim', true);
    };
  };

  //自适应
  Class.pt.auto = function(index) {
    var that = this,
      config = that.config,
      Dialogo = $('#' + doms[0] + index);
    if (config.area[0] === '' && config.maxWidth > 0) {
      //为了修复IE7下一个让人难以理解的bug
      if (Dialog.ie && Dialog.ie < 8 && config.btn) {
        Dialogo.width(Dialogo.innerWidth());
      }
      Dialogo.outerWidth() > config.maxWidth && Dialogo.width(config.maxWidth);
    }
    var area = [Dialogo.innerWidth(), Dialogo.innerHeight()];
    var titHeight = Dialogo.find(doms[1]).outerHeight() || 0;
    var btnHeight = Dialogo.find('.' + doms[6]).outerHeight() || 0;

    function setHeight(elem) {
      elem = Dialogo.find(elem);
      elem.height(area[1] - titHeight - btnHeight - 2 * (parseFloat(elem.css(
        'padding')) | 0));
    }
    switch (config.type) {
      case 2:
        setHeight('iframe');
        break;
      default:
        if (config.area[1] === '') {
          if (config.fixed && area[1] >= win.height()) {
            area[1] = win.height();
            setHeight('.' + doms[5]);
          }
        } else {
          setHeight('.' + doms[5]);
        }
        break;
    }
    return that;
  };

  //计算坐标
  Class.pt.offset = function() {
    var that = this,
      config = that.config,
      Dialogo = that.Dialogo;
    var area = [Dialogo.outerWidth(), Dialogo.outerHeight()];
    var type = typeof config.offset === 'object';
    that.offsetTop = (win.height() - area[1]) / 2;
    that.offsetLeft = (win.width() - area[0]) / 2;

    if (type) {
      that.offsetTop = config.offset[0];
      that.offsetLeft = config.offset[1] || that.offsetLeft;
    } else if (config.offset !== 'auto') {

      if (config.offset === 't') { //上
        that.offsetTop = 0;
      } else if (config.offset === 'r') { //右
        that.offsetLeft = win.width() - area[0];
      } else if (config.offset === 'b') { //下
        that.offsetTop = win.height() - area[1];
      } else if (config.offset === 'l') { //左
        that.offsetLeft = 0;
      } else if (config.offset === 'lt') { //左上角
        that.offsetTop = 0;
        that.offsetLeft = 0;
      } else if (config.offset === 'lb') { //左下角
        that.offsetTop = win.height() - area[1];
        that.offsetLeft = 0;
      } else if (config.offset === 'rt') { //右上角
        that.offsetTop = 0;
        that.offsetLeft = win.width() - area[0];
      } else if (config.offset === 'rb') { //右下角
        that.offsetTop = win.height() - area[1];
        that.offsetLeft = win.width() - area[0];
      } else {
        that.offsetTop = config.offset;
      }

    }

    if (!config.fixed) {
      that.offsetTop = /%$/.test(that.offsetTop) ?
        win.height() * parseFloat(that.offsetTop) / 100 : parseFloat(that.offsetTop);
      that.offsetLeft = /%$/.test(that.offsetLeft) ?
        win.width() * parseFloat(that.offsetLeft) / 100 : parseFloat(that.offsetLeft);
      that.offsetTop += win.scrollTop();
      that.offsetLeft += win.scrollLeft();
    }

    if (Dialogo.attr('minLeft')) {
      that.offsetTop = win.height() - (Dialogo.find(doms[1]).outerHeight() ||
        0);
      that.offsetLeft = Dialogo.css('left');
    }

    Dialogo.css({
      top: that.offsetTop,
      left: that.offsetLeft
    });
  };

  //Tips
  Class.pt.tips = function() {
    var that = this,
      config = that.config,
      Dialogo = that.Dialogo;
    var layArea = [Dialogo.outerWidth(), Dialogo.outerHeight()],
      follow = $(config.follow);
    if (!follow[0]) follow = $('body');
    var goal = {
        width: follow.outerWidth(),
        height: follow.outerHeight(),
        top: follow.offset().top,
        left: follow.offset().left
      },
      tipsG = Dialogo.find('.Dialogui-Dialog-TipsG');

    var guide = config.tips[0];
    config.tips[1] || tipsG.remove();

    goal.autoLeft = function() {
      if (goal.left + layArea[0] - win.width() > 0) {
        goal.tipLeft = goal.left + goal.width - layArea[0];
        tipsG.css({
          right: 12,
          left: 'auto'
        });
      } else {
        goal.tipLeft = goal.left;
      };
    };

    //辨别tips的方位
    goal.where = [function() { //上
      goal.autoLeft();
      goal.tipTop = goal.top - layArea[1] - 10;
      tipsG.removeClass('Dialogui-Dialog-TipsB').addClass(
          'Dialogui-Dialog-TipsT')
        .css('border-right-color', config.tips[1]);
    }, function() { //右
      goal.tipLeft = goal.left + goal.width + 10;
      goal.tipTop = goal.top;
      tipsG.removeClass('Dialogui-Dialog-TipsL').addClass(
          'Dialogui-Dialog-TipsR')
        .css('border-bottom-color', config.tips[1]);
    }, function() { //下
      goal.autoLeft();
      goal.tipTop = goal.top + goal.height + 10;
      tipsG.removeClass('Dialogui-Dialog-TipsT').addClass(
          'Dialogui-Dialog-TipsB')
        .css('border-right-color', config.tips[1]);
    }, function() { //左
      goal.tipLeft = goal.left - layArea[0] - 10;
      goal.tipTop = goal.top;
      tipsG.removeClass('Dialogui-Dialog-TipsR').addClass(
          'Dialogui-Dialog-TipsL')
        .css('border-bottom-color', config.tips[1]);
    }];
    goal.where[guide - 1]();

    /* 8*2为小三角形占据的空间 */
    if (guide === 1) {
      goal.top - (win.scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
    } else if (guide === 2) {
      win.width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 || goal
        .where[3]()
    } else if (guide === 3) {
      (goal.top - win.scrollTop() + goal.height + layArea[1] + 8 * 2) - win.height() >
        0 && goal.where[0]();
    } else if (guide === 4) {
      layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]()
    }

    Dialogo.find('.' + doms[5]).css({
      'background-color': config.tips[1],
      'padding-right': (config.closeBtn ? '30px' : '')
    });
    Dialogo.css({
      left: goal.tipLeft - (config.fixed ? win.scrollLeft() : 0),
      top: goal.tipTop - (config.fixed ? win.scrollTop() : 0)
    });
  }

  //拖拽层
  Class.pt.move = function() {
    var that = this,
      config = that.config,
      _DOC = $(document),
      Dialogo = that.Dialogo,
      moveElem = Dialogo.find(config.move),
      resizeElem = Dialogo.find('.Dialogui-Dialog-resize'),
      dict = {};

    if (config.move) {
      moveElem.css('cursor', 'move');
    }

    moveElem.on('mousedown', function(e) {
      e.preventDefault();
      if (config.move) {
        dict.moveStart = true;
        dict.offset = [
          e.clientX - parseFloat(Dialogo.css('left')), e.clientY -
          parseFloat(Dialogo.css('top'))
        ];
        ready.moveElem.css('cursor', 'move').show();
      }
    });

    resizeElem.on('mousedown', function(e) {
      e.preventDefault();
      dict.resizeStart = true;
      dict.offset = [e.clientX, e.clientY];
      dict.area = [
        Dialogo.outerWidth(), Dialogo.outerHeight()
      ];
      ready.moveElem.css('cursor', 'se-resize').show();
    });

    _DOC.on('mousemove', function(e) {

      //拖拽移动
      if (dict.moveStart) {
        var X = e.clientX - dict.offset[0],
          Y = e.clientY - dict.offset[1],
          fixed = Dialogo.css('position') === 'fixed';

        e.preventDefault();

        dict.stX = fixed ? 0 : win.scrollLeft();
        dict.stY = fixed ? 0 : win.scrollTop();

        //控制元素不被拖出窗口外
        if (!config.moveOut) {
          var setRig = win.width() - Dialogo.outerWidth() + dict.stX,
            setBot = win.height() - Dialogo.outerHeight() + dict.stY;
          X < dict.stX && (X = dict.stX);
          X > setRig && (X = setRig);
          Y < dict.stY && (Y = dict.stY);
          Y > setBot && (Y = setBot);
        }

        Dialogo.css({
          left: X,
          top: Y
        });
      }

      //Resize
      if (config.resize && dict.resizeStart) {
        var X = e.clientX - dict.offset[0],
          Y = e.clientY - dict.offset[1];

        e.preventDefault();

        Dialog.style(that.index, {
          width: dict.area[0] + X,
          height: dict.area[1] + Y
        })
        dict.isResize = true;
      }
    }).on('mouseup', function(e) {
      if (dict.moveStart) {
        delete dict.moveStart;
        ready.moveElem.hide();
        config.moveEnd && config.moveEnd();
      }
      if (dict.resizeStart) {
        delete dict.resizeStart;
        ready.moveElem.hide();
      }
    });

    return that;
  };

  Class.pt.callback = function() {
    var that = this,
      Dialogo = that.Dialogo,
      config = that.config;
    that.openDialog();
    if (config.success) {
      if (config.type == 2) {
        Dialogo.find('iframe').on('load', function() {
          config.success(Dialogo, that.index);
        });
      } else {
        config.success(Dialogo, that.index);
      }
    }
    Dialog.ie == 6 && that.IE6(Dialogo);

    //按钮
    Dialogo.find('.' + doms[6]).children('a').on('click', function() {
      var index = $(this).index();
      if (index === 0) {
        if (config.yes) {
          config.yes(that.index, Dialogo)
        } else if (config['btn1']) {
          config['btn1'](that.index, Dialogo)
        } else {
          Dialog.close(that.index);
        }
      } else {
        var close = config['btn' + (index + 1)] && config['btn' + (index +
          1)](that.index, Dialogo);
        close === false || Dialog.close(that.index);
      }
    });

    //取消
    function cancel() {
      var close = config.cancel && config.cancel(that.index, Dialogo);
      close === false || Dialog.close(that.index);
    }

    //右上角关闭回调
    Dialogo.find('.' + doms[7]).on('click', cancel);

    //点遮罩关闭
    if (config.shadeClose) {
      $('#Dialogui-Dialog-shade' + that.index).on('click', function() {
        Dialog.close(that.index);
      });
    }

    //最小化
    Dialogo.find('.Dialogui-Dialog-min').on('click', function() {
      var min = config.min && config.min(Dialogo);
      min === false || Dialog.min(that.index, config);
    });

    //全屏/还原
    Dialogo.find('.Dialogui-Dialog-max').on('click', function() {
      if ($(this).hasClass('Dialogui-Dialog-maxmin')) {
        Dialog.restore(that.index);
        config.restore && config.restore(Dialogo);
      } else {
        Dialog.full(that.index, config);
        setTimeout(function() {
          config.full && config.full(Dialogo);
        }, 100);
      }
    });

    config.end && (ready.end[that.index] = config.end);
  };

  //for ie6 恢复select
  ready.reselect = function() {
    $.each($('select'), function(index, value) {
      var sthis = $(this);
      if (!sthis.parents('.' + doms[0])[0]) {
        (sthis.attr('Dialog') == 1 && $('.' + doms[0]).length < 1) &&
        sthis.removeAttr('Dialog').show();
      }
      sthis = null;
    });
  };

  Class.pt.IE6 = function(Dialogo) {
    //隐藏select
    $('select').each(function(index, value) {
      var sthis = $(this);
      if (!sthis.parents('.' + doms[0])[0]) {
        sthis.css('display') === 'none' || sthis.attr({
          'Dialog': '1'
        }).hide();
      }
      sthis = null;
    });
  };

  //需依赖原型的对外方法
  Class.pt.openDialog = function() {
    var that = this;

    //置顶当前窗口
    Dialog.zIndex = that.config.zIndex;
    Dialog.setTop = function(Dialogo) {
      var setZindex = function() {
        Dialog.zIndex++;
        Dialogo.css('z-index', Dialog.zIndex + 1);
      };
      Dialog.zIndex = parseInt(Dialogo[0].style.zIndex);
      Dialogo.on('mousedown', setZindex);
      return Dialog.zIndex;
    };
  };

  ready.record = function(Dialogo) {
    var area = [
      Dialogo.width(),
      Dialogo.height(),
      Dialogo.position().top,
      Dialogo.position().left + parseFloat(Dialogo.css('margin-left'))
    ];
    Dialogo.find('.Dialogui-Dialog-max').addClass('Dialogui-Dialog-maxmin');
    Dialogo.attr({
      area: area
    });
  };

  ready.rescollbar = function(index) {
    if (doms.html.attr('Dialog-full') == index) {
      if (doms.html[0].style.removeProperty) {
        doms.html[0].style.removeProperty('overflow');
      } else {
        doms.html[0].style.removeAttribute('overflow');
      }
      doms.html.removeAttr('Dialog-full');
    }
  };

  /** 内置成员 */

  window.Dialog = Dialog;

  //获取子iframe的DOM
  Dialog.getChildFrame = function(selector, index) {
    index = index || $('.' + doms[4]).attr('times');
    return $('#' + doms[0] + index).find('iframe').contents().find(selector);
  };

  //得到当前iframe层的索引，子iframe时使用
  Dialog.getFrameIndex = function(name) {
    return $('#' + name).parents('.' + doms[4]).attr('times');
  };

  //iframe层自适应宽高
  Dialog.iframeAuto = function(index) {
    if (!index) return;
    var heg = Dialog.getChildFrame('html', index).outerHeight();
    var Dialogo = $('#' + doms[0] + index);
    var titHeight = Dialogo.find(doms[1]).outerHeight() || 0;
    var btnHeight = Dialogo.find('.' + doms[6]).outerHeight() || 0;
    Dialogo.css({
      height: heg + titHeight + btnHeight
    });
    Dialogo.find('iframe').css({
      height: heg
    });
  };

  //重置iframe url
  Dialog.iframeSrc = function(index, url) {
    $('#' + doms[0] + index).find('iframe').attr('src', url);
  };

  //设定层的样式
  Dialog.style = function(index, options, limit) {
    var Dialogo = $('#' + doms[0] + index),
      contElem = Dialogo.find('.Dialogui-Dialog-content'),
      type = Dialogo.attr('type'),
      titHeight = Dialogo.find(doms[1]).outerHeight() || 0,
      btnHeight = Dialogo.find('.' + doms[6]).outerHeight() || 0,
      minLeft = Dialogo.attr('minLeft');

    if (type === ready.type[3] || type === ready.type[4]) {
      return;
    }

    if (!limit) {
      if (parseFloat(options.width) <= 260) {
        options.width = 260;
      };

      if (parseFloat(options.height) - titHeight - btnHeight <= 64) {
        options.height = 64 + titHeight + btnHeight;
      };
    }

    Dialogo.css(options);
    btnHeight = Dialogo.find('.' + doms[6]).outerHeight();

    if (type === ready.type[2]) {
      Dialogo.find('iframe').css({
        height: parseFloat(options.height) - titHeight - btnHeight
      });
    } else {
      contElem.css({
        height: parseFloat(options.height) - titHeight - btnHeight -
          parseFloat(contElem.css('padding-top')) - parseFloat(contElem.css(
            'padding-bottom'))
      })
    }
  };

  //最小化
  Dialog.min = function(index, options) {
    var Dialogo = $('#' + doms[0] + index),
      titHeight = Dialogo.find(doms[1]).outerHeight() || 0,
      left = Dialogo.attr('minLeft') || (181 * ready.minIndex) + 'px',
      position = Dialogo.css('position');

    ready.record(Dialogo);

    if (ready.minLeft[0]) {
      left = ready.minLeft[0];
      ready.minLeft.shift();
    }

    Dialogo.attr('position', position);

    Dialog.style(index, {
      width: 180,
      height: titHeight,
      left: left,
      top: win.height() - titHeight,
      position: 'fixed',
      overflow: 'hidden'
    }, true);

    Dialogo.find('.Dialogui-Dialog-min').hide();
    Dialogo.attr('type') === 'page' && Dialogo.find(doms[4]).hide();
    ready.rescollbar(index);

    if (!Dialogo.attr('minLeft')) {
      ready.minIndex++;
    }
    Dialogo.attr('minLeft', left);
  };

  //还原
  Dialog.restore = function(index) {
    var Dialogo = $('#' + doms[0] + index),
      area = Dialogo.attr('area').split(',');
    var type = Dialogo.attr('type');
    Dialog.style(index, {
      width: parseFloat(area[0]),
      height: parseFloat(area[1]),
      top: parseFloat(area[2]),
      left: parseFloat(area[3]),
      position: Dialogo.attr('position'),
      overflow: 'visible'
    }, true);
    Dialogo.find('.Dialogui-Dialog-max').removeClass('Dialogui-Dialog-maxmin');
    Dialogo.find('.Dialogui-Dialog-min').show();
    Dialogo.attr('type') === 'page' && Dialogo.find(doms[4]).show();
    ready.rescollbar(index);
  };

  //全屏
  Dialog.full = function(index) {
    var Dialogo = $('#' + doms[0] + index),
      timer;
    ready.record(Dialogo);
    if (!doms.html.attr('Dialog-full')) {
      doms.html.css('overflow', 'hidden').attr('Dialog-full', index);
    }
    clearTimeout(timer);
    timer = setTimeout(function() {
      var isfix = Dialogo.css('position') === 'fixed';
      Dialog.style(index, {
        top: isfix ? 0 : win.scrollTop(),
        left: isfix ? 0 : win.scrollLeft(),
        width: win.width(),
        height: win.height()
      }, true);
      Dialogo.find('.Dialogui-Dialog-min').hide();
    }, 100);
  };

  //改变title
  Dialog.title = function(name, index) {
    var title = $('#' + doms[0] + (index || Dialog.index)).find(doms[1]);
    title.html(name);
  };

  //关闭Dialog总方法
  Dialog.close = function(index) {
    var Dialogo = $('#' + doms[0] + index),
      type = Dialogo.attr('type'),
      closeAnim = 'Dialog-anim-close';
    if (!Dialogo[0]) return;
    var WRAP = 'Dialogui-Dialog-wrap',
      remove = function() {
        if (type === ready.type[1] && Dialogo.attr('conType') === 'object') {
          Dialogo.children(':not(.' + doms[5] + ')').remove();
          var wrap = Dialogo.find('.' + WRAP);
          for (var i = 0; i < 2; i++) {
            wrap.unwrap();
          }
          wrap.css('display', wrap.data('display')).removeClass(WRAP);
        } else {
          //低版本IE 回收 iframe
          if (type === ready.type[2]) {
            try {
              var iframe = $('#' + doms[4] + index)[0];
              iframe.contentWindow.document.write('');
              iframe.contentWindow.close();
              Dialogo.find('.' + doms[5])[0].removeChild(iframe);
            } catch (e) {}
          }
          Dialogo[0].innerHTML = '';
          Dialogo.remove();
        }
        typeof ready.end[index] === 'function' && ready.end[index]();
        delete ready.end[index];
      };

    if (Dialogo.data('anim')) {
      Dialogo.addClass(closeAnim);
    }

    $('#Dialogui-Dialog-moves, #Dialogui-Dialog-shade' + index).remove();
    Dialog.ie == 6 && ready.reselect();
    ready.rescollbar(index);

    if (Dialogo.attr('minLeft')) {
      ready.minIndex--;
      ready.minLeft.push(Dialogo.attr('minLeft'));
    }
    setTimeout(function() {
      remove();
    }, ((Dialog.ie && Dialog.ie < 10) || !Dialogo.data('anim')) ? 0 : 200);
  };

  //关闭所有层
  Dialog.closeAll = function(type) {
    $.each($('.' + doms[0]), function() {
      var othis = $(this);
      var is = type ? (othis.attr('type') === type) : 1;
      is && Dialog.close(othis.attr('times'));
      is = null;
    });
  };

  /**

    拓展模块，Dialogui开始合并在一起

   */

  var cache = Dialog.cache || {},
    skin = function(type) {
      return (cache.skin ? (' ' + cache.skin + ' ' + cache.skin + '-' + type) :
        '');
    };

  //tab层
  Dialog.tab = function(options) {
    options = options || {};
    var tab = options.tab || {};
    return Dialog.open($.extend({
      type: 1,
      skin: 'Dialogui-Dialog-tab' + skin('tab'),
      resize: false,
      title: function() {
        var len = tab.length,
          ii = 1,
          str = '';
        if (len > 0) {
          str = '<span class="Dialogui-Dialog-tabnow">' + tab[0].title +
            '</span>';
          for (; ii < len; ii++) {
            str += '<span>' + tab[ii].title + '</span>';
          }
        }
        return str;
      }(),
      content: '<ul class="Dialogui-Dialog-tabmain">' + function() {
        var len = tab.length,
          ii = 1,
          str = '';
        if (len > 0) {
          str = '<li class="Dialogui-Dialog-tabli xubox_tab_Dialog">' +
            (
              tab[0].content || 'no content') + '</li>';
          for (; ii < len; ii++) {
            str += '<li class="Dialogui-Dialog-tabli">' + (tab[ii].content ||
              'no  content') + '</li>';
          }
        }
        return str;
      }() + '</ul>',
      success: function(Dialogo) {
        var btn = Dialogo.find('.Dialogui-Dialog-title').children();
        var main = Dialogo.find('.Dialogui-Dialog-tabmain').children();
        btn.on('mousedown', function(e) {
          e.stopPropagation ? e.stopPropagation() : e.cancelBubble =
            true;
          var othis = $(this),
            index = othis.index();
          othis.addClass('Dialogui-Dialog-tabnow').siblings().removeClass(
            'Dialogui-Dialog-tabnow');
          main.eq(index).show().siblings().hide();
          typeof options.change === 'function' && options.change(
            index);
        });
      }
    }, options));
  };

  //主入口
  ready.run = function(_$) {
    $ = _$;
    win = $(window);
    doms.html = $('html');
    Dialog.open = function(deliver) {
      var o = new Class(deliver);
      return o.index;
    };
  };

  //加载方式
  window.Dialogui && Dialogui.define ? (
    Dialog.ready(), Dialogui.define('jquery', function(exports) { //Dialogui加载
      Dialog.path = Dialogui.cache.dir;
      ready.run(Dialogui.jquery);

      //暴露模块
      window.Dialog = Dialog;
      exports('Dialog', Dialog);
    })
  ) : (
    typeof define === 'function' ? define(['jquery'], function() { //requirejs加载
      ready.run(window.jQuery);
      return Dialog;
    }) : function() { //普通script标签加载
      ready.run(window.jQuery);
      Dialog.ready();
    }()
  );

}(window);
