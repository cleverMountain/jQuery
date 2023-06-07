// 1.在jQuery的原型上绑定相关方法
// 调用构造函数的each方法
jQuery.each(("click").split(" "), function (i, name) {
  jQuery.fn[name] = function (data, fn) {
    return arguments.length > 0 ?
      this.on(name, null, data, fn) :
      this.trigger(name);
  };
});
jQuery.prototype.click = function (data, fn) {
  return this.on(name, null, data, fn)
}


// 2.$('div').click(() => {})调用时，执行this.on( name, null, data, fn )
// 扩展原型方法
jQuery.fn.extend({
  on: function (types, selector, data, fn, /*INTERNAL*/ one) {
    // types => click
    // fn => cb
    return this.each(function () {
      // 调用原型的each方法
      jQuery.event.add(this, types, fn, data, selector);
    });
  }
})
/**
 * 3.callback = function () { jQuery.event.add(this, types, fn, data, selector); }
 */
jQuery.prototype.each = function (callback, args) {
  // 调用构造函数的方法，this就是当前的div
  return jQuery.each(this, callback, args);
}

// callback.call
jQuery.each = function (obj, callback, args) {
  value = callback.call(obj[0], 0, obj[0]);
  return obj;
}

// 4.执行callback，绑定事件处理函数
jQuery.event.add(this, types, fn, data, selector)
jQuery.event.add = function (elem, types, handler, data, selector) {
  eventHandle = function (e) {
    return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
      jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
      undefined;
  };
  // 绑定事件处理函数
  eventHandle.elem = elem;
  elem.addEventListener(type, eventHandle, false);
}


// 5.绑定事件eventHandle后，点击触发eventHandle
jQuery.event.dispatch.apply(eventHandle.elem, arguments)

jQuery.event.dispatch = function (event) {
  var handlers = (data_priv.get(this, "events") || {})[event.type] || []
  handlerQueue = jQuery.event.handlers.call(this, event, handlers);
  ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler)
    .apply(matched.elem, args);
  return event.result;
}

