# VerificationCode: VerificationCode components

.图形、短信验证码组件

You can see demo at this components：demo.html

## Usage

Here is more detailed example:

```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>短信、图形验证码组件demo</title>
</head>

<body>
	<h3>验证码组件</h3>
	<div id="verificationCode-image"></div>

	<div id="verificationCode-message"></div>
	<script src="http://cdn.bootcss.com/require.js/2.1.10/require.min.js" data-main="./main"></script>
  <!-- 不用requirejs则直接引入 -->
  <!-- <script src="http://cdn.bootcss.com/reqwest/2.0.1/reqwest.min.js"></script>
	<script src="./VerificationCode.js"></script>
	<script src="./main.js"></script> -->
  <script type="text/javascript">
  require(['./dist/js/VerificationCode.min'], function(VerificationCode) {
    // console.log(VerificationCode);
    VerificationCode.get("verificationCode-image", {
      api: "/api/..."//图形验证码api 不传用默认值
    });

    VerificationCode.get("verificationCode-message", {
      //e.g.
      countTime: 5, //倒计时
      telNum: "", //电话号码
      api: "api/message/.." //发送短信api 不传用默认值
    });
  });
  </script>
</body>

</html>
```
### api Options:

the first params is DOM id.the second params is object,the full list of available options is the following:

* **api** (string): 后端请求api.
* **countTime** (number): 倒计时秒数.
* **telNum** (string): 用户输入的电话号码.

```javascript
VerificationCode.get("verificationCode-image", {
  api: "/api/..."
});

VerificationCode.get("verificationCode-message", {
  //e.g.
  countTime: 5,
  telNum: "",
  api: "api/message/.."
});
```
