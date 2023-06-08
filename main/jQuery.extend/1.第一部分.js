let jQuery = {
  expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""), // 获取唯一值
  // 防冲突
  noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
      // _$ = window.$
      // 将$赋值给_$,再将_$赋值给$
			window.$ = _$;
		}
    // 同理，jQuery重新赋值
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
    // 返回jQuery对象
		return jQuery;
	},
}



