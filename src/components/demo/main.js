/**
 * [api.md description] 详见https://github.com/timdream/wordcloud2.js/blob/gh-pages/API.md
 * 基于wordcloud2.js二次封装增加的特性如下：
 * 支持tooltip提示，显示当前词的使用量。包括tooltip的开关和数据格式化formatter；
 * 支持showLoading和hideLoading加载数据loading；
 * 当词云数值相差过大时，对字体大小范围进行约束。
 * create: 2016.12.06
 */

require(['./js2wordcloud.min'], function(wordcloud) {
  //从后端获取的数据
  var dataSource = [
    ['申报', 50000],
    ['文书', 50],
    ['发票', 40],
    ['申报', 40],
    ['文书', 30],
    ['发票', 30],
    ['申报', 20],
    ['文书', 20],
    ['发票', 1],
    ['发票', 1],
    ['申报', 50000],
    ['文书', 50],
    ['发票', 40],
    ['申报', 40],
    ['文书', 30],
    ['发票', 30],
    ['申报', 20],
    ['文书', 20],
    ['发票', 1],
    ['发票', 1],
    ['申报', 50000],
    ['文书', 50],
    ['发票', 40],
    ['申报', 40],
    ['文书', 30],
    ['发票', 30],
    ['申报', 20],
    ['文书', 20],
    ['发票', 1],
    ['发票', 1],
    ['申报', 50000],
    ['文书', 50],
    ['发票', 40],
    ['申报', 40],
    ['文书', 30],
    ['发票', 30],
    ['申报', 20],
    ['文书', 20],
    ['发票', 1],
    ['发票', 1],
    ['申报', 50000],
    ['文书', 50],
    ['发票', 40],
    ['申报', 40],
    ['文书', 30],
    ['发票', 30],
    ['申报', 20],
    ['文书', 20],
    ['发票', 1],
    ['发票', 1]
  ];
  var option = {
    //fontSizeFactor: 0.1, // 当词云值相差太大，可设置此值进字体行大小微调，默认0.1
    //maxFontSize: 60, // 最大fontSize，用来控制weightFactor，默认60
    //minFontSize: 12, // 最小fontSize，用来控制weightFactor，默认12
    tooltip: {
      show: true, // 默认：false
      formatter: function(item) { // 数据格式化函数，item为list的一项
        return item[0] + ' ' + '使用量：' + item[1];
      }
    },
    list: dataSource,
    color: '#15a4fa' //字体颜色
  }
  var canvas = new wordcloud(document.getElementById('container'));
  canvas.showLoading({
    backgroundColor: '#fff',
    effect: 'spin' // 默认：null, { String | Function } 可选：'spin|normal'；也可为回调函数，回调函数生成HTML
  });
  //option必须通过此API进行设置，才能显示词云
  canvas.setOption(option);
  // setTimeout(function() {
  //   canvas.hideLoading()
  //   canvas.setOption(option)
  // }, 1000);

  //无数据时执行
  // setTimeout(function() {
  //   canvas.setOption({
  //     noDataLoadingOption: {// 无数据提示
  //       backgroundColor: '#fff',
  //       text: '暂无数据'
  //     }
  //   })
  //   console.log('changed')
  // }, 4000)
  document.getElementById("demoChange").onclick = function() {
    canvas.resize();
  }
  window.onresize = function() {
    //当容器大小变化时，调用此方法进行重绘
    canvas.resize();
  }
});
