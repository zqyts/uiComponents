requirejs.config({
	baseUrl: '../../', //基目录,框架，组件，工具类存放的目录
	paths: {
		jquery: 'lib/jquery',
		Dialog: 'components/Dialog/Dialog'
	}
});

require(['jquery', 'Dialog'], function($, Dialog) {

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

	$("#prompt").on('click', function() {
		//prompt层
		Dialog.prompt({
			title: '请输入',
			formType: 1
		}, function(text, index) {
			Dialog.close(index);
			Dialog.msg('你输入的内容是：' + text);
		});
	});

	$("#html").on('click', function() {
		//自定义html
		Dialog.open({
			type: 1,
			skin: 'layui-Dialog-rim', //加上边框
			// area: ['420px', '240px'], //宽高
			title: false,
			content: '<div><img src="./skin/default/code.png"/></div>'
		});
	});

	$("#iframe").on('click', function() {
		//类似于mini.open
		Dialog.open({
			type: 2,
			title: '很多时候，我们想最大化看，比如像这个页面。',
			shadeClose: true,
			shade: false,
			maxmin: true, //开启最大化最小化按钮
			area: ['900px', '600px'],
			content: 'http://baidu.com/'
		});
	});

	$("#loading").on('click', function() {
		//加载方式,支持0～2
		var index = Dialog.load(1);
		setTimeout(function() {
			Dialog.close(index);
		}, 2000);
	});

	$("#tab").on('click', function() {
		//信息框
		var index = Dialog.tab({
			area: ['600px', '300px'],
			btn: ['提交', '取消'],
			tab: [{
				title: '普通申请',
				content: '<div id="normalSubmit">内容1</div>'
			}, {
				title: '短信申请',
				content: '<div>内容2</div>'
			}, {
				title: 'CA电子签证',
				content: '<div>内容3</div>'
			}],
			yes: function(index, Dialogo) {
				//提交回调
				console.log(Dialogo.find('#normalSubmit').text());
				Dialog.close(index);
			}
		});
	});

});
