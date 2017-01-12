# Validator: 工具类

一些常用的工具函数

## Usage

### api:

attribute：

* **browser.ie** : ie版本.
* **browser.chrome** : chrome版本.
* **browser.Firefox** : firfox版本.
* **browser.safari** : safari版本.
* **os.android** : 此值为对应的android版本号，否则为undefined.
* **os.ios** : 此值为对应的ios版本号，否则为undefined.


functions:

* **isSupportTransition** : 是否支持css3@return {Boolean}.
* **isIE** : 是否是ie浏览器@return {Boolean}.
* **flashVersion** : 检测flash版本.
* **isSupportBase64** : 判断浏览器是否支持图片base64@return {Boolean}.
* **trim** : 去除前后空格.
* **extend** : 对象扩展或继承@return {Object}.

Here is single example:

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Tools</title>
</head>

<body>
  <script src="./Tools.js"></script>
  <script type="text/javascript">
  if (Tools.isIE() && Tools.browser.ie <= 8){
    alert("该浏览器是IE8以下浏览器");
  }else{
    alert("不是ie浏览器");
  }
  </script>
</body>

</html>
```

```javascript
//调用实例Tools的方法 e.g
Tools.isIE();
```
