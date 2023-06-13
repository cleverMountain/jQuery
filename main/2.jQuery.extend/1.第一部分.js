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
	ready: function( wait ) {
		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}
		// Remember that the DOM is ready
		jQuery.isReady = true;
		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}
		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},
	// 判断是否是function
	isFunction: function (obj) {
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
	isWindow: function (obj) {
		return obj != null && obj === obj.window;
	},
	isNumeric: function (obj) {
		return !isNaN(parseFloat(obj)) && isFinite(obj);
	},
	// 是否是普通对象
	isPlainObject: function( obj ) {
		// 不是对象 不是doucument对象  不是window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}
		try {
			// 是否有构造函数   构造函数的原型对象上是否有isPrototypeOf属性
			if ( obj.constructor &&
					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		return true;
	},
	// 是否是空对象
	isEmptyObject: function (obj) {
		var name;
		for (name in obj) {
			return false;
		}
		return true;
	},
	each: function (obj, callback, args) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike(obj);
		// 带参数
		if (args) {
			if (isArray) {
				for (; i < length; i++) {
					value = callback.apply(obj[i], args);

					if (value === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					value = callback.apply(obj[i], args);

					if (value === false) {
						break;
					}
				}
			}

		} else {
			// 数组
			if (isArray) {
				for (; i < length; i++) {
					value = callback.call(obj[i], i, obj[i]);

					if (value === false) {
						break;
					}
				}
			} else {
				// 不带参数，对象
				for (i in obj) {
					value = callback.call(obj[i], i, obj[i]);

					if (value === false) {
						break;
					}
				}
			}
		}

		return obj;
	},
	// 转成数组
	makeArray: function (arr, results) {
		var ret = results || [];

		if (arr != null) {
			// 类数组转化,OBject('123') => String('123') => 类数组
			if (isArraylike(Object(arr))) {
				jQuery.merge(ret,
					typeof arr === "string" ?
						[arr] : arr
				);
			} else {
				// 对象
				core_push.call(ret, arr);
			}
		}

		return ret;
	},
	// 合并
	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;
		// 合并到first上
		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},
	// 在数组中
	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : Array.prototype.call( arr, elem, i );
	},
	// 筛选满足条件的元素，类似filter
	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;
		for ( ; i < length; i++ ) {
			// cb的返回值
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				// 满足条件放进数组
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},
	// es6 map
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];
		// 数组
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		// 对象
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}
		return Array.prototype.concat.apply( [], ret );
	},
	// 改变函数上下文
	proxy: function( fn, context ) {
		var tmp, args, proxy;
		// 上下文对象是字符串，一般来说是对象
		if ( typeof context === "string" ) {
			// tmp是fn上的一个个属性
			tmp = fn[ context ];
			// 上下文是fn
			context = fn;
			// fn是
			fn = tmp;
		}

		// fn必须是函数
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// 获取参数
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			// 返回一个fn.apply并改变this指向
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// 设置guid用于删除,通过guid删除this指向
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},
}



