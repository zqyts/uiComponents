# Dialog: Dialog components

a very good reputation web bullet layer components base layui, it has a full range of solutions, committed to the development of various levels of service developers, your page will easily have a rich and friendly operation experience.

You can see api here: http://www.layui.com/doc/modules/layer.html

## Usage

modified by layui,remove unnecessary features and make it smaller and faster

Here is more detailed example:

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Dialog</title>
  <script src="http://cdn.bootcss.com/jquery/1.12.1/jquery.js"></script>
  <link rel="stylesheet" href="./skin/Dialog.css">
</head>

<body>
  <div>
    <!-- eg -->
    <a href="javascript:;" id="alert">alert</a>
    <a href="javascript:;" id="confirm">confirm</a>
    <a href="javascript:;" id="html">自定义html内容</a>
    <a href="javascript:;" id="iframe">iframe新窗口</a>
    <a href="javascript:;" id="loading">loading</a>
    <a href="javascript:;" id="tab">tab层</a>
  </div>
  <!-- <script src="../../../lib/require.js" data-main="./main.js"></script> -->
  <script type="text/javascript">
  $("#alert").on('click', function() {
    //信息框
    Dialog.alert('我是alert', {
      skin: 'layui-Dialog-blue',
      // icon: 1,
      // anim: 1,
      // area: ['400px', '200px'],
      closeBtn: 0
    }, function() {
      Dialog.msg('你点击了确定', {
        icon: 1
      });
    });
  });
  $("#confirm").on('click', function() {
    //询问框
    Dialog.confirm('我是confirm', {
      btn: ['确定', '取消'], //按钮
      cancel: function(index) { //右上角x关闭触发
        console.log(index);
      }
    }, function() {
      Dialog.msg('你点击了确定', {
        icon: 1,
        time: 2000 //2s后自动关闭
      });
    }, function() {
      Dialog.msg('你点击了取消', {
        time: 2000 //2s后自动关闭
      });
    });
  });

  </script>
</body>

</html>
```
