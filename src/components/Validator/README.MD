# Validator: 校验类

一些常用的正则校验

## Usage

### api Options:

the param is value you need,the full list of available functions are the following:

* **isNumeric** : 正整数.
* **isInteger** : 整型（负整数和正整数）.
* **isEmail** : 邮箱.
* **isDecimal** : 浮点型(整数和小数).
* **isAlpha** : 字母.
* **isAlphaNumeric** : 字母、数字或者数字字母组合.
* **isAlphaDash** : 可以含有下划线的字母、数字或者数字字母组合.
* **isNatural** : 自然数.
* **isChinese** : 中文.
* **isPhoneNum** : 手机号码.
* **isTelNum** : 固定电话.
* **isSfzhm** : 身份证号码.
* **isNoSpecialChar** : 特殊字符.
* **isUrl** : url.

```javascript
var validator = new Validator();
//调用实例validator的方法，e.g validator.isPhoneNum(value)
```
