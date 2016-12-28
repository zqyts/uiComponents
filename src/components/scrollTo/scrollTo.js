/**
 * [scrollTo description]返回到顶部组件原生js
 * @type {[type]}
 */
define(function() {
  var scrolldelay = null;

  function pageScroll() {
    //解决浏览器document.body.scrollTop与document.documentElement.scrollTop兼容性问题
    var sTop = document.body.scrollTop + document.documentElement.scrollTop;
    window.scrollBy(0, -300); //滚动速度
    scrolldelay = setTimeout(arguments.callee, 16);
    sTop === 0 && clearTimeout(scrolldelay);
  }

  return {
    scrollTop: pageScroll
  }
});
