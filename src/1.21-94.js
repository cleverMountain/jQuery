; (function (window) {
  // 21 -- 94
  // let _$ = window.$,
  //   _jquery = window.jQuery
  function jQuery() {
    return new jQuery.prototype.init()
  }
  jQuery.prototype.init = function () { }
  jQuery.prototype.css = function () { }
  // new jQuery.prototype.init() -> new jQuery -> 返回的是Jquery的实例 -> 实现链式调用
  jQuery.prototype.init.prototype = jQuery.prototype;
  jQuery().css()


  window.$ = window.jQuery = new jQuery()
})(window);