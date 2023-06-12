let jQuery = {
	expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""), // 获取唯一值
	// 防冲突
	noConflict: function (deep) {
		if (window.$ === jQuery) {
			// _$ = window.$
			// 将$赋值给_$,再将_$赋值给$
			window.$ = _$;
		}
		// 同理，jQuery重新赋值
		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}
		// 返回jQuery对象
		return jQuery;
	},
	// 判断是否是function
	isFunctionisFunction: function (obj) {
		return jQuery.type(obj) === "function";
	},
	// 判断是什么类型
	type: function (obj) {
		if (obj == null) {
			return String(obj);
		}
		/**
		 * 
		 *	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		 *		class2type[ "[object " + name + "]" ] = name.toLowerCase();
		 *	});
		 *	// 变成函数方法
		 *	core_toString = class2type.toString => Object.prototype.toString([]) => [object Array]
		 *
		* */
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[core_toString.call(obj)] || "object" :
			typeof obj;
	},
	// 判断数组
	isArray: Array.isArray,
	// 判断window对象,window对象上会有window属性，通过该属性来判断
	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},
	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},
	// 是否是空对象
	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},
}



