/**
 *@Name：原生js 支持define模块化
 *@description:VerificationCode.js e.g.短信、图形验证码组件，ajax依赖jquery
 *@author：zhouqiyuan
 *@create：2016-11-23
 */
! function(win) {
  var _extend, _isObject, insertAfter;

  _isObject = function(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
  };

  _extend = function(destination, source) {
    var property;
    for (property in destination) {
      if (destination.hasOwnProperty(property)) {
        // 若destination[property]和sourc[property]都是对象，则递归调用
        if (_isObject(destination[property]) && _isObject(source[property])) {
          arguments.callee(destination[property], source[property]);
        }
        // 若sourc[property]已存在，则跳过
        if (source.hasOwnProperty(property)) {
          continue;
        } else {
          source[property] = destination[property];
        }
      }
    }
  };

  insertAfter = function(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
      // 如果最后的节点是目标元素，则直接添加。因为默认是最后
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
      //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    }
  };
  //创建验证码类
  function VerificationCode(el, options) {
    this.opt = this.extend({}, this.default, options);
    this.$element = document.getElementById(el);
    this.el = el;
    //组件初始化
    this.init();
    //绑定事件
    this.bind();
  }

  VerificationCode.prototype = {
    constructor: VerificationCode,
    //配置默认参数
    default: {
      len: 4, //需要产生的验证码长度,可传参数到后端生成多少位验证码
      chars: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ], //指定产生验证码的字典，若不给或数组长度为0则试用默认字典
      messageBtnValue: "短信验证码",
      api: "/JPEGServlet", //api
      el: "verificationCode-image", //target对象
      telNum: "", //手机号
      telErrInfo: "请输入正确的手机号",
      sendMessageApi: "api/", //发送短信api
      sendMsgData: {}, //请求参数
      countTime: 60,
      inputArea: "", //输入验证码的input对象绑定【  HTMLInputElement 】
      click2refresh: true, //是否点击验证码刷新验证码
      validateEven: "" //触发验证的方法名，如click，blur等
    },
    /**
     * [extend description]扩展对象方法
     * @return {[Object]} [description]
     */
    extend: function() {
      var arr = arguments,
        result = {},
        i;
      if (!arr.length) return {};
      for (i = arr.length - 1; i >= 0; i--) {
        if (_isObject(arr[i])) {
          _extend(arr[i], result);
        }
      }
      arr[0] = result;
      return result;
    },
    /**
     * [trim description]去除前后空格
     * @param  {[type]} str
     * @return {[string]}
     */
    trim: function(str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //往对象添加节点
    append: function(el, newEl) {
      el.innerHTML += newEl;
      return el;
    },
    /**
     * [children 获取子节点]
     * @param  {[Object]} curEle  [当前父节点]
     * @param  {[string]} tagName [要查找的目标的节点]
     * @return {[Object]}         [description]
     */
    children: function(curEle, tagName) {
      var nodeList = curEle.childNodes;
      var ary = [];
      if (/MSIE(6|7|8)/.test(navigator.userAgent)) {
        for (var i = 0; i < nodeList.length; i++) {
          var curNode = nodeList[i];
          if (curNode.nodeType === 1) {
            ary[ary.length] = curNode;
          }
        }
      } else {
        ary = Array.prototype.slice.call(curEle.children);
      }
      // 获取指定子元素
      if (typeof tagName === "string") {
        for (var k = 0; k < ary.length; k++) {
          curTag = ary[k];
          if (curTag.nodeName.toLowerCase() !== tagName.toLowerCase()) {
            ary.splice(k, 1);
            k--;
          }
        }
      }
      return ary;
    },

    // 初始化生成验证码
    init: function() {
      if (this.el === this.default.el) { //图形验证码
        this.append(this.$element,
          '<input type="text"/><img src="' +
          this.opt.api +
          '" alt="图形验证码"/>');
      } else {
        this.append(this.$element,
          '<input type="text"/><button type="button">' + this.opt.messageBtnValue +
          '</button>'
        );
      }
    },
    bind: function() {
      var self = this;
      var target;
      self.el === self.default.el ? target = "img" : target = "button";
      //刷新或发送验证码
      if (self.opt.click2refresh) {
        self.bindHandler(self.children(self.$element, target)[0],
          'click',
          function() {
            if (self.el === self.default.el) {
              self.refresh();
            } else {
              self.sendMessageCode();
            }
          });
      }
      /**
       * 绑定验证回调函数
       */
      // self.bindHandler(self.opt.validateObj || self.opt.inputArea, self.opt.validateEven, function() {
      //     self.opt.validateFn.call(self, self.validate(), self.myCode);
      //     if (self.opt.false2refresh && !self.validate()) {
      //         self.refresh();
      //         self.opt.inputArea.focus();
      //         self.opt.inputArea.select();
      //     }
      // });
    },
    /**
     * 绑定事件方法
     * @param elem
     * @param type
     * @param handler
     */
    bindHandler: function(elem, type, handler) {
      if (window.addEventListener) { // 支持html5标准浏览器
        elem.addEventListener(type, handler, false);
      } else if (window.attachEvent) { // IE浏览器
        elem.attachEvent("on" + type, handler);
      }
    },
    refresh: function() {
      this.children(this.$element, "img")[0].setAttribute("src", this.opt
        .api + '?' + Math.random());
    },
    sendMessageCode: function() {
      var tel = this.children(this.$element, "input")[0];
      var reg = /^1[34578]\d{9}$/;
      if (!reg.test(tel.value)) {
        if (tel.nextSibling.nodeName != "SPAN") {
          var node = document.createElement("span");
          var textnode = document.createTextNode(this.opt.telErrInfo);
          node.appendChild(textnode);
          node.style.color = "red";
          insertAfter(node, tel);
          tel.style.borderColor = "red";
        }
      } else {
        if (tel.nextSibling.nodeName != "BUTTON") {
          tel.nextSibling.remove();
        }
        tel.style.borderColor = "";
        this.timeCountDown(this.children(this.$element, "button")[0],
          this.opt.countTime);
        this.sendMsg();
      }
    },
    sendMsg: function() {
      reqwest({
        url: this.opt.api,
        type: 'json',
        method: 'post',
        contentType: 'application/json',
        // headers: {
        //   'X-My-Custom-Header': 'SomethingImportant'
        // },
        success: function(res) {

        },
        error: function(err) {}
      });
    },
    timeCountDown: function(obj, count) {
      var clear = null;
      var o = {
        timer: function() {
          clear = setTimeout(arguments.callee, 1000);
          if (count === 0) {
            clearTimeout(clear);
            obj.removeAttribute('disabled');
            obj.innerHTML = "重新发送";
          } else {
            obj.setAttribute('disabled', true);
            obj.innerHTML = "已发送(" + count + "s" + ")";
            count--;
          }
        }
      };
      o.timer();
    }
  };
  typeof define === 'function' ? define(function() { //requirejs加载
    return {
      get: function() {
        new VerificationCode(arguments[0], arguments[1]);
      }
    };
  }) : function() { //普通script标签加载
    var verificationObj = {
      get: function() {
        new VerificationCode(arguments[0], arguments[1]);
      }
    };
    window.VerificationCode = verificationObj;
  }();
}(window);
