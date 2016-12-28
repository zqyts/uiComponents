requirejs.config({
	baseUrl: '../../', //基目录,框架，组件，工具类存放的目录
	paths: {
		jquery: 'lib/jquery',
		viewer: 'components/viewer/viewer.min',
		Tools: 'components/common/Tools'
	}
});

require(['jquery', 'viewer', 'Tools'], function($, viewer, Tools) {
	var imagePreviewObj = {
		$images: null, //缓存图片对象
		imagesSource: ["./1.jpg", "./2.jpg", "./3.jpg"], //后续改成后端上传的图片数据
		setOptions: {
			url: 'src'
		},
		createImagesPreview: function(url, callback) {
			var strEl = '<div id="viewer-pictures" style="display:none">';
			$.each(url, function(i, v) {
				strEl += '<img src="' + v + '"/>';
			});
			$("body").append(strEl + '</div>');
			return callback();
		}
	}

	if (Tools.isIE() && Tools.browser.ie <= 8) {
		$.extend(imagePreviewObj.setOptions, {
			scalable: false,
			rotatable: false
		});
	} else {
		$.extend(imagePreviewObj.setOptions, {
			scalable: false
		});
	}
	// createImagesPreview(imagesSource);

	$('.docs-buttons').on('click', function() {
		if (!imagePreviewObj.$images) {
			imagePreviewObj.createImagesPreview(imagePreviewObj.imagesSource,
				function() {
					imagePreviewObj.$images = $('#viewer-pictures');
					//配置参数
					imagePreviewObj.$images.viewer(imagePreviewObj.setOptions).viewer(
						'show');
				});
		} else {
			imagePreviewObj.$images.viewer(imagePreviewObj.setOptions).viewer('show');
		}
	});
});
