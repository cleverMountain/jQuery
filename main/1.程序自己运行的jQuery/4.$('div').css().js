
// 1.调用jQuery.prototype.css
jQuery.prototype.css = function () {
  return jQuery.access(this, callback, name, value, arguments.length > 1)
}


// 2.执行jQuery构造函数的方法,jQuery.access
jQuery.access = function (elems, fn, key, value, chainable, emptyGet, raw) {
  var i = 0,
    length = elems.length,
    bulk = key == null;
  for (; i < length; i++) {
    // 元素 cssProp cssValue
    fn(elems[i], key, value);
  }
  return chainable ?
    elems :
    // Gets
    bulk ?
      fn.call(elems) :
      length ? fn(elems[0], key) : emptyGet;
}


// 3.执行fn/callback
function fn(elem, name, value) {
  var styles, len,
    map = {},
    i = 0;
  if (jQuery.isArray(name)) {
    styles = getStyles(elem);
    len = name.length;
    for (; i < len; i++) {
      map[name[i]] = jQuery.css(elem, name[i], false, styles);
    }
    return map;
  }
  return value !== undefined ?
    jQuery.style(elem, name, value) :
    jQuery.css(elem, name);
}



// 4.执行jQuery.style( elem, name, value )，渲染颜色
jQuery.style = function (elem, name, value, extra) {
  style = elem.style;
  style[name] = value;
  return style[name];
}