/**
 *@Name：Validator
 *@description:js校验通用类
 *@author：zhouqy
 *@create：2017-01-12
 */
! function(win) {
  var defaults = {
    messages: {
      required: '%s 不能为空',
    },
    callback: function(errors) {

    }
  };
  /*
   * Define the regular expressions
   */
  var numericReg = /^[0-9]+$/, //正整数
    integerReg = /^\-?[0-9]+$/, //整型（负整数和正整数）
    decimalReg = /^\-?[0-9]*\.?[0-9]+$/, //浮点型(整数和小数)
    emailReg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, //邮箱
    alphaReg = /^[a-z]+$/i, //字母
    alphaNumericReg = /^[a-z0-9]+$/i, //字母、数字或者数字字母组合
    alphaDashReg = /^[a-z0-9_\-]+$/i, //可以含有下划线的字母、数字或者数字字母组合
    naturalReg = /^[0-9]+$/i, //自然数
    chineseReg = /^[\u4e00-\u9fa5]+$/, //中文字符
    phoneNumReg = /^1[34578]\d{9}$/, //手机号码
    telNumReg = /^(0\d{2,3}-){0,1}\d{7,8}$/, //固定电话
    sfzhmReg = /(^\d{15}$)|(^\d{17}(\d|X)$)/, //身份证号码
    noSpecialChar = /^[\u4e00-\u9fa5a-zA-Z0-9_\(\)$#@!\-]+$/, //不允许特殊字符
    urlReg =
    /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/; //url
  var _extend, _isObject;

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
  //Validator 校验类
  function Validator() {}
  Validator.prototype = {
    //正整数
    isNumeric: function(val) {
      if (numericReg.test(val)) return true;
      return false;
    },
    //整型（负整数和正整数）
    isInteger: function(val) {
      if (integerReg.test(val)) return true;
      return false;
    },
    //浮点型(整数和小数)
    isDecimal: function(val) {
      if (decimalReg.test(val)) return true;
      return false;
    },
    //邮箱
    isEmail: function(val) {
      if (emailReg.test(val)) return true;
      return false;
    },
    //字母
    isAlpha: function(val) {
      if (alphaReg.test(val)) return true;
      return false;
    },
    //字母、数字或者数字字母组合
    isAlphaNumeric: function(val) {
      if (alphaNumericReg.test(val)) return true;
      return false;
    },
    //可以含有下划线的字母、数字或者数字字母组合
    isAlphaDash: function(val) {
      if (alphaDashReg.test(val)) return true;
      return false;
    },
    //自然数
    isNatural: function(val) {
      if (naturalReg.test(val)) return true;
      return false;
    },
    //中文
    isChinese: function(val) {
      if (chineseReg.test(val)) return true;
      return false;
    },
    //手机号码
    isPhoneNum: function(val) {
      if (phoneNumReg.test(val)) return true;
      return false;
    },
    //固定电话
    isTelNum: function(val) {
      if (telNumReg.test(val)) return true;
      return false;
    },
    //身份证号码
    isSfzhm: function(val) {
      if (sfzhmReg.test(val)) return true;
      return false;
    },
    //特殊字符
    isNoSpecialChar: function(val) {
      if (noSpecialChar.test(val)) return true;
      return false;
    },
    //url
    isUrl: function(val) {
      if (urlReg.test(val)) return true;
      return false;
    }

  };
  typeof define === 'function' && define.amd ? define(function() { //requirejs加载
    return Validator;
  }) : function() { //普通script标签加载
    window.Validator = Validator;
  }();
}(window);
